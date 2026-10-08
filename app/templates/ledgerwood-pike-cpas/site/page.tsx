import { TabbiedPattern } from 'tabbied/react';
import { guilloche } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './ledgerwood-pike-cpas.module.css';

export const metadata = {
  title: 'Ledgerwood & Pike: Certified Public Accountants, Tallow Street',
  description:
    'Ledgerwood & Pike is a two-partner CPA firm on Tallow Street. Individual and small business tax returns, monthly books, payroll and IRS letters, at fixed fees printed in full.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is an
   engraved banknote: ivory paper, engraving green, a seal red, gilt and a
   steel blue. The guilloche is the engraving itself, linked rings on a
   transparent ground so the paper shows between them. It fills the note in
   the hero, frames the services like a certificate border, and runs along
   the foot of the page. */
const PAPER = '#f3eee1';
const INK = '#1d3a31';
const SEAL = '#7e2d27';
const GILT = '#b08a3e';
const STEEL = '#46627a';

const ENGRAVING = ['transparent', INK, SEAL, GILT, STEEL];
const BORDER = ['transparent', STEEL, INK, GILT, INK];
const FOOT = ['transparent', GILT, STEEL, SEAL, GILT];

const NAV = [
  ['Services', '#services'],
  ['Tax calendar', '#calendar'],
  ['Fees', '#fees'],
  ['Partners', '#partners'],
  ['Contact', '#contact'],
];

const SERVICES = [
  {
    no: 'I',
    name: 'Individual tax returns',
    text: 'Federal and state returns for wages, investments, rentals and side income. A partner signs every one, and we keep seven years of copies.',
    from: 'from $340',
  },
  {
    no: 'II',
    name: 'Business tax returns',
    text: 'S corporations, partnerships, C corporations and sole proprietors. Prepared from your books or from a shoebox, quoted before we start.',
    from: 'from $1,350',
  },
  {
    no: 'III',
    name: 'Monthly bookkeeping',
    text: 'Bank and card reconciliations, a profit and loss each month by the 12th, and books that are ready for the return in January.',
    from: 'from $325 a month',
  },
  {
    no: 'IV',
    name: 'Payroll and filings',
    text: 'Pay runs, direct deposit, quarterly 941s, W-2s and 1099s, and the state unemployment returns nobody remembers.',
    from: 'from $120 a month',
  },
  {
    no: 'V',
    name: 'IRS and state letters',
    text: 'Send us the notice unopened if you like. Samuel Pike is an enrolled agent and answers the IRS for you, in writing and by phone.',
    from: '$185 a letter',
  },
  {
    no: 'VI',
    name: 'Planning and estates',
    text: 'Quarterly estimates, retirement contributions, the sale of a house or a business, and returns for estates and trusts.',
    from: '$210 an hour',
  },
];

type Month = { m: string; dates: { d: string; what: string }[]; key?: boolean };

const MONTHS: Month[] = [
  { m: 'Jan', dates: [{ d: '15', what: 'Fourth-quarter estimated tax' }, { d: '31', what: 'W-2s and 1099-NECs to workers and the IRS' }] },
  { m: 'Feb', dates: [{ d: '28', what: 'Paper 1099-MISC forms to the IRS' }] },
  { m: 'Mar', key: true, dates: [{ d: '15', what: 'S corporation and partnership returns, or extension' }] },
  { m: 'Apr', key: true, dates: [{ d: '15', what: 'Individual returns, or extension' }, { d: '15', what: 'First-quarter estimate, last IRA and HSA deposits' }] },
  { m: 'May', dates: [{ d: '15', what: 'Nonprofit returns, Form 990' }] },
  { m: 'Jun', dates: [{ d: '15', what: 'Second-quarter estimated tax' }] },
  { m: 'Jul', dates: [{ d: '31', what: 'Retirement plan returns, Form 5500' }] },
  { m: 'Aug', dates: [{ d: '', what: 'The quiet month: mid-year reviews' }] },
  { m: 'Sep', dates: [{ d: '15', what: 'Third-quarter estimate and extended business returns' }] },
  { m: 'Oct', key: true, dates: [{ d: '15', what: 'Extended individual returns, the last call' }] },
  { m: 'Nov', dates: [{ d: '', what: 'Year-end planning meetings begin' }] },
  { m: 'Dec', dates: [{ d: '31', what: 'Last day for gifts, 401(k) deferrals and RMDs' }] },
];

const INDIVIDUAL_FEES = [
  ['Form 1040 with wages and the standard deduction', '$340'],
  ['Form 1040 with itemized deductions', '$495'],
  ['Each state return', '$110'],
  ['Self-employment, Schedule C', '+ $260'],
  ['Each rental property, Schedule E', '+ $180'],
  ['Amended return, Form 1040-X', '$275'],
  ['Reply to an IRS or state notice', '$185'],
];

const BUSINESS_FEES = [
  ['Monthly books, up to 150 transactions', '$325 / mo'],
  ['Payroll, up to 10 employees', '$120 / mo'],
  ['S corporation return, Form 1120-S', '$1,450'],
  ['Partnership return, Form 1065', '$1,350'],
  ['C corporation return, Form 1120', '$1,800'],
  ['Sales tax filing', '$65 each'],
  ['Choosing and setting up an entity', '$400'],
];

const PARTNERS = [
  {
    sign: 'Margaret Ledgerwood',
    name: 'Margaret Ledgerwood, CPA',
    role: 'Founding partner',
    text: 'Licensed in 1984. Individuals, families, estates and trusts, and anyone selling a house or a business this year.',
    facts: [['License', 'CPA 0018842'], ['Clients since', '1987']],
  },
  {
    sign: 'Samuel Pike',
    name: 'Samuel Pike, CPA, EA',
    role: 'Partner',
    text: 'Small businesses, payroll and the IRS. As an enrolled agent he can represent you at audits, collections and appeals.',
    facts: [['License', 'CPA 0031907'], ['Enrolled agent', 'EA 00-114562']],
  },
];

const BRING = [
  'Last year\'s federal and state returns, if we did not prepare them',
  'Every W-2, 1099 and 1098 that arrived in January',
  'Receipts for childcare, charity and medical costs over $500',
  'For a business: bank statements and the year\'s sales total',
];

const HOURS = [
  ['Jan 15 to Apr 15', 'Mon-Fri 8-7, Sat 9-2'],
  ['The rest of the year', 'Mon-Fri 9-5'],
  ['Evening appointments', 'Tuesdays, by request'],
];

export default function LedgerwoodPikePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f3eee1',
        '--ink': '#1d3a31',
        '--seal': '#7e2d27',
        '--gilt': '#b08a3e',
        '--steel': '#46627a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,seal,gilt,steel"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Pinyon+Script&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Ledgerwood &amp; Pike</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Certified Public Accountants</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550132207">(555) 013-2207</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* The banknote: the engraving fills the note, the face is laid over
            it with a frame of rings showing round its edge and an oval window
            cut where a note keeps its watermark. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.note}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4" className={s.noteField} aria-hidden="true">
              <TabbiedPattern
                pattern={guilloche}
                palette={ENGRAVING}
                fit="grid"
                cellSize={46}
                seed="ledgerwood-note"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.face}>
              <span className={s.window} aria-hidden="true" />
              <div className={s.faceTop}>
                <span data-edit="hero.series" data-edit-max="60" className={s.series}>Series 2027</span>
                <span data-edit="hero.serial" data-edit-max="60" className={s.serial}>No. LP 041587</span>
              </div>
              <div className={s.faceBody}>
                <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Certified Public Accountants, 212 Tallow Street, since 1987</p>
                <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                  Returns, books and advice, <em>signed by a partner.</em>
                </h1>
                <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                  Two partners and five staff accountants, for households and
                  for businesses with up to fifty people. Every fee is fixed
                  and printed below, and every return is checked twice before
                  it leaves the building.
                </p>
                <div className={s.actions}>
                  <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a tax review</a>
                  <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#fees">Read the fee table</a>
                </div>
              </div>
              <div className={s.signatures}>
                <div className={s.signature}>
                  <span data-edit="hero.signHand" data-edit-max="60" className={s.signHand}>M. Ledgerwood</span>
                  <span data-edit="hero.signRole" data-edit-max="60" className={s.signRole}>Founding partner</span>
                </div>
                <div className={s.signature}>
                  <span data-edit="hero.signHand2" data-edit-max="60" className={s.signHand}>S. Pike</span>
                  <span data-edit="hero.signRole2" data-edit-max="60" className={s.signRole}>Partner, enrolled agent</span>
                </div>
              </div>
            </div>
          </div>
          <dl className={s.tallies}>
            <div>
              <dt data-edit="hero.term" data-edit-max="28">Returns filed last season</dt>
              <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>1,184</dd>
            </div>
            <div>
              <dt data-edit="hero.term2" data-edit-max="28">Businesses on monthly books</dt>
              <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>212</dd>
            </div>
            <div>
              <dt data-edit="hero.term3" data-edit-max="28">Notices settled without an audit</dt>
              <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>97%</dd>
            </div>
          </dl>
        </section>

        {/* The services, framed like a certificate: a border of rings round
            a sheet of six numbered clauses. */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <p data-edit="services.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Article I</p>
            <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>What we do for you</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six services, one office. Most clients use two or three of them,
              and all of them are handled by the same small team that knows
              your file.
            </p>
          </div>
          <div className={s.certificate}>
            <div data-edit-pattern="services.field" data-edit-roles="transparent,4,1,3,1" className={s.certField} aria-hidden="true">
              <TabbiedPattern
                pattern={guilloche}
                palette={BORDER}
                fit="grid"
                cellSize={34}
                seed="ledgerwood-border"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <ol className={s.services}>
              {SERVICES.map((v, i) => (
                <li key={v.no} className={s.service}>
                  <span data-edit={`services.serviceNo.${i}`} data-edit-max="60" className={s.serviceNo}>{v.no}</span>
                  <h3 data-edit={`services.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{v.name}</h3>
                  <p data-edit={`services.serviceText.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceText}>{v.text}</p>
                  <p data-edit={`services.serviceFrom.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceFrom}>{v.from}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The tax year as a strip of twelve stubs, the three dates that
            matter most stamped in seal red. */}
        <section id="calendar" className={s.sec} aria-labelledby="calendar-h">
          <div className={s.secHead}>
            <p data-edit="calendar.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Article II</p>
            <h2 data-edit="calendar.secTitle" data-edit-max="60" id="calendar-h" className={s.secTitle}>The tax year, month by month</h2>
            <p data-edit="calendar.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Federal dates for a calendar-year taxpayer. When one falls on a
              weekend it moves to the next business day, and we send a reminder
              two weeks before each one that applies to you.
            </p>
          </div>
          <ol className={s.months}>
            {MONTHS.map((mo, i) => (
              <li key={mo.m} className={mo.key ? `${s.month} ${s.monthKey}` : s.month}>
                <h3 data-edit={`calendar.monthName.${i}`} data-edit-max="40" className={s.monthName}>{mo.m}</h3>
                <ul className={s.dates}>
                  {mo.dates.map((dt, i2) => (
                    <li key={dt.what}>
                      {dt.d ? <span data-edit={`calendar.day.${i}.${i2}`} data-edit-max="60" className={s.day}>{dt.d}</span> : null}
                      <span data-edit={`calendar.what.${i}.${i2}`} data-edit-max="60" className={s.what}>{dt.what}</span>
                    </li>
                  ))}
                </ul>
                {mo.key ? <span data-edit={`calendar.stamp.${i}`} data-edit-max="60" className={s.stamp}>Due</span> : null}
              </li>
            ))}
          </ol>
        </section>

        {/* Fees, as a plain two-column schedule. */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <p data-edit="fees.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Article III</p>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>Fees, printed in full</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Fixed fees, quoted in writing before we begin. If a return turns
              out simpler than we quoted, the bill goes down. It never goes up
              without a phone call first.
            </p>
          </div>
          <div className={s.feeGrid}>
            <table className={s.fees}>
              <caption data-edit="fees.feeCaption" className={s.feeCaption}>For individuals and families</caption>
              <thead>
                <tr>
                  <th data-edit="fees.heading" scope="col">Service</th>
                  <th data-edit="fees.feeCol" scope="col" className={s.feeCol}>Fee</th>
                </tr>
              </thead>
              <tbody>
                {INDIVIDUAL_FEES.map(([what, fee], i) => (
                  <tr key={what}>
                    <th data-edit={`fees.heading2.${i}`} scope="row">{what}</th>
                    <td data-edit={`fees.feeCol2.${i}`} className={s.feeCol}>{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className={s.fees}>
              <caption data-edit="fees.feeCaption2" className={s.feeCaption}>For small businesses</caption>
              <thead>
                <tr>
                  <th data-edit="fees.heading3" scope="col">Service</th>
                  <th data-edit="fees.feeCol3" scope="col" className={s.feeCol}>Fee</th>
                </tr>
              </thead>
              <tbody>
                {BUSINESS_FEES.map(([what, fee], i) => (
                  <tr key={what}>
                    <th data-edit={`fees.heading4.${i}`} scope="row">{what}</th>
                    <td data-edit={`fees.feeCol4.${i}`} className={s.feeCol}>{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-edit="fees.feeNote" data-edit-max="240" data-edit-multiline className={s.feeNote}>
            Payment is due when the return is signed. We take checks, cards
            and bank transfers, and spread a business fee over three months on
            request.
          </p>
        </section>

        {/* The partners, as the two signatures on the note. */}
        <section id="partners" className={s.sec} aria-labelledby="partners-h">
          <div className={s.secHead}>
            <p data-edit="partners.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Article IV</p>
            <h2 data-edit="partners.secTitle" data-edit-max="60" id="partners-h" className={s.secTitle}>The two signatures</h2>
            <p data-edit="partners.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A partner reviews and signs every return the firm files. You will
              meet the one who signs yours.
            </p>
          </div>
          <div className={s.partners}>
            {PARTNERS.map((p, i) => (
              <article key={p.name} className={s.partner}>
                <p data-edit={`partner.partnerSign.${i}`} data-edit-max="240" data-edit-multiline className={s.partnerSign}>{p.sign}</p>
                <h3 data-edit={`partner.partnerName.${i}`} data-edit-max="40" className={s.partnerName}>{p.name}</h3>
                <p data-edit={`partner.partnerRole.${i}`} data-edit-max="240" data-edit-multiline className={s.partnerRole}>{p.role}</p>
                <p data-edit={`partner.partnerText.${i}`} data-edit-max="240" data-edit-multiline className={s.partnerText}>{p.text}</p>
                <dl className={s.partnerFacts}>
                  {p.facts.map(([k, v], i2) => (
                    <div key={k}>
                      <dt data-edit={`partner.term.${i}.${i2}`} data-edit-max="28">{k}</dt>
                      <dd data-edit={`partner.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
            <aside className={s.medal} aria-hidden="true">
              <div data-edit-pattern="medal.field" data-edit-roles="transparent,1,2,3,4" className={s.medalField} aria-hidden="true">
                <TabbiedPattern
                  pattern={guilloche}
                  palette={ENGRAVING}
                  fit="grid"
                  cellSize={30}
                  seed="ledgerwood-seal"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.medalCore}>
                <span data-edit="medal.medalTop" data-edit-max="60" className={s.medalTop}>Est.</span>
                <span data-edit="medal.medalYear" data-edit-max="60" className={s.medalYear}>1987</span>
              </span>
            </aside>
          </div>
        </section>

        {/* Contact: the office, the season's hours, and the form. */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <p data-edit="contact.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Article V</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a tax review</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                A first meeting is forty minutes and free. Bring what you have;
                we will tell you what is missing and what the work will cost.
              </p>
              <div className={s.office}>
                <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>212 Tallow Street, Suite 3</p>
                <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Old Exchange district, above the stationer. Lift from the side door.</p>
                <p className={s.contactLine}>
                  <a data-edit="contact.link" data-edit-max="28" href="tel:+15550132207">(555) 013-2207</a>
                </p>
                <p className={s.contactLine}>
                  <a data-edit="contact.link2" data-edit-max="28" href="mailto:office@ledgerwoodpike.example">office@ledgerwoodpike.example</a>
                </p>
              </div>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <h3 data-edit="contact.bringTitle" data-edit-max="40" className={s.bringTitle}>What to bring</h3>
              <ul className={s.bring}>
                {BRING.map((b, i) => (
                  <li data-edit={`contact.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="lp-name">Name</label>
                <input id="lp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="lp-email">Email</label>
                <input id="lp-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="lp-phone">Phone</label>
                <input id="lp-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="lp-need">I need help with</label>
                <select id="lp-need" name="need" defaultValue="individual">
                  <option value="individual">My own tax return</option>
                  <option value="business">A business return</option>
                  <option value="books">Monthly books or payroll</option>
                  <option value="notice">A letter from the IRS</option>
                  <option value="planning">Planning or an estate</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="lp-note">Anything we should know</label>
                <textarea id="lp-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Request an appointment</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We reply within one working day, two in the first week of April.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,2,3" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={guilloche}
            palette={FOOT}
            fit="grid"
            cellSize={38}
            seed="ledgerwood-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Ledgerwood &amp; Pike</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional accounting firm. The partners, fees, dates, license
            numbers and address are invented, and nothing here is financial
            or tax advice.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
