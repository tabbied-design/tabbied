import { TabbiedPattern } from 'tabbied/react';
import { globe } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './harbor-gate-immigration.module.css';

export const metadata = {
  title: 'Harbor Gate Immigration Law: Family, work, citizenship and asylum, Pier Street',
  description:
    'Harbor Gate is a four-attorney immigration practice on Pier Street. Family petitions, work visas, citizenship and asylum, at flat fees quoted before we start, with honest waits and nine languages spoken.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   terminal: warm floor-white paper, a harbor-navy departures board, the
   amber of a split flap, sea blue and a pale sky. The globe is the firm's
   mark, dots swelling into a sphere, on a transparent ground so the paper
   or the board shows between them. It turns in the hero, rises over the
   horizon in a band, sits on the stub of the boarding pass and in the foot. */
const PAPER = '#f2efe6';
const NAVY = '#13243f';
const AMBER = '#f0b429';
const HARBOR = '#2f6f9f';
const SKY = '#9cc3e0';

const DAY = ['transparent', NAVY, HARBOR, SKY];
const DUSK = ['transparent', HARBOR, AMBER, NAVY];
const NIGHT = ['transparent', SKY, AMBER, PAPER];

const NAV = [
  ['Departures', '#departures'],
  ['Gates', '#gates'],
  ['Languages', '#languages'],
  ['Attorneys', '#attorneys'],
  ['Book', '#book'],
];

type Flight = { route: string; to: string; forms: string; wait: string; fee: string; gate: string; status: string; tone: string };

/* The board: every route the firm files, with a typical wait and a flat fee. */
const BOARD: Flight[] = [
  { route: 'Family', to: 'Green card through a spouse', forms: 'I-130, I-485', wait: '10-16 months', fee: '$3,400', gate: 'A1', status: 'Boarding', tone: 'boarding' },
  { route: 'Family', to: 'Parent or child of a citizen', forms: 'I-130, consular', wait: '12-20 months', fee: '$2,900', gate: 'A2', status: 'On time', tone: 'ontime' },
  { route: 'Family', to: 'Fiance visa', forms: 'I-129F', wait: '9-14 months', fee: '$2,600', gate: 'A3', status: 'On time', tone: 'ontime' },
  { route: 'Work', to: 'Specialty occupation', forms: 'H-1B', wait: '6-9 months', fee: '$4,200', gate: 'B1', status: 'Lottery in March', tone: 'held' },
  { route: 'Work', to: 'Extraordinary ability', forms: 'O-1, EB-1', wait: '3-8 months', fee: '$7,500', gate: 'B2', status: 'On time', tone: 'ontime' },
  { route: 'Work', to: 'Employer green card', forms: 'PERM, EB-2, EB-3', wait: '2-4 years', fee: '$9,800', gate: 'B3', status: 'Delayed', tone: 'held' },
  { route: 'Citizenship', to: 'Naturalization', forms: 'N-400', wait: '6-10 months', fee: '$1,450', gate: 'C1', status: 'Boarding', tone: 'boarding' },
  { route: 'Citizenship', to: 'Certificate of citizenship', forms: 'N-600', wait: '8-12 months', fee: '$1,600', gate: 'C2', status: 'On time', tone: 'ontime' },
  { route: 'Asylum', to: 'Affirmative asylum', forms: 'I-589', wait: '1-4 years', fee: '$5,500', gate: 'D1', status: 'File within 1 year', tone: 'held' },
  { route: 'Asylum', to: 'Defense in immigration court', forms: 'EOIR', wait: 'Varies', fee: 'Quoted', gate: 'D2', status: 'Call today', tone: 'boarding' },
];

type Gate = { letter: string; name: string; who: string; steps: string[]; bring: string };

const GATES: Gate[] = [
  {
    letter: 'A',
    name: 'Family',
    who: 'Spouses, fiances, parents, children and siblings of citizens and green card holders.',
    steps: ['Petition filed for your relative', 'Wait for the priority date', 'Adjustment here or a consular interview'],
    bring: 'Marriage and birth certificates, passports, the sponsor\'s last tax return.',
  },
  {
    letter: 'B',
    name: 'Work',
    who: 'Employers and professionals: H-1B, L-1, O-1, TN, and the green card after them.',
    steps: ['We choose the category with you', 'Employer petition and labor filings', 'Visa stamp abroad or change of status'],
    bring: 'Degrees and transcripts, a current CV, the offer letter.',
  },
  {
    letter: 'C',
    name: 'Citizenship',
    who: 'Green card holders of five years, or three if married to a citizen and living together.',
    steps: ['Eligibility check, travel and record', 'N-400 filed with evidence', 'Interview, civics test and the oath'],
    bring: 'Your green card, five years of trips abroad, any arrest or court papers.',
  },
  {
    letter: 'D',
    name: 'Asylum and humanitarian',
    who: 'People afraid to return home, survivors of crime or trafficking, young people without status.',
    steps: ['A private first conversation', 'Your declaration and the evidence', 'Asylum interview or court hearing'],
    bring: 'Whatever you have. Many of our clients arrive with no documents at all.',
  },
];

const LANGUAGES = [
  { lang: 'Spanish', hello: 'Hola', who: 'Ana Restrepo, Luis Ortega' },
  { lang: 'Haitian Creole', hello: 'Bonjou', who: 'Marie-Claire Joseph' },
  { lang: 'French', hello: 'Bonjour', who: 'Marie-Claire Joseph' },
  { lang: 'Mandarin', hello: 'Ni hao', who: 'Wei Chen' },
  { lang: 'Tagalog', hello: 'Kumusta', who: 'Paolo Reyes' },
  { lang: 'Arabic', hello: 'Marhaba', who: 'Samir Haddad' },
  { lang: 'Hindi', hello: 'Namaste', who: 'Priya Nair' },
  { lang: 'Swahili', hello: 'Jambo', who: 'Grace Mwangi' },
];

type Attorney = { initials: string; name: string; role: string; focus: string; admitted: string; speaks: string };

const ATTORNEYS: Attorney[] = [
  { initials: 'AR', name: 'Ana Restrepo', role: 'Founding partner', focus: 'Family petitions and defense in immigration court. Opened Harbor Gate in 2009 in one room over the ferry office.', admitted: 'Admitted 2004', speaks: 'English, Spanish' },
  { initials: 'WC', name: 'Wei Chen', role: 'Partner', focus: 'Work visas and employer green cards, for start-ups, hospitals and the university labs up the hill.', admitted: 'Admitted 2010', speaks: 'English, Mandarin' },
  { initials: 'MJ', name: 'Marie-Claire Joseph', role: 'Senior attorney', focus: 'Asylum, U and T visas, and special immigrant juvenile cases. Former legal aid supervising attorney.', admitted: 'Admitted 2013', speaks: 'English, Haitian Creole, French' },
  { initials: 'SH', name: 'Samir Haddad', role: 'Attorney', focus: 'Citizenship, naturalization and the certificate cases nobody else wants to untangle.', admitted: 'Admitted 2018', speaks: 'English, Arabic' },
];

const HOURS = [
  ['Monday to Friday', '8:30-6:00'],
  ['Citizenship clinic', 'First Saturday, 9:00-12:00'],
  ['Detention line', 'Every hour, every day'],
];

export default function HarborGateImmigrationPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f2efe6',
        '--navy': '#13243f',
        '--amber': '#f0b429',
        '--harbor': '#2f6f9f',
        '--sky': '#9cc3e0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,navy,amber,harbor,sky"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;700&family=Barlow:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Harbor Gate</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Immigration Law</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550132200">(555) 013-2200</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Immigration law, 40 Pier Street, Harborview</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Every route to staying, <em>on one board.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Harbor Gate is a four-attorney immigration practice. We file
              family petitions, work visas, citizenship and asylum cases, quote
              one flat fee before we start, and tell you plainly how long the
              wait is likely to be.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a consultation</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#departures">Read the board</a>
            </div>
            <dl className={s.flaps}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Cases filed in 2025</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>640</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Languages spoken</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>9</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">First consultation</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>$150</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroGlobe}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,3,4" className={s.globeField} aria-hidden="true">
              <TabbiedPattern
                pattern={globe}
                palette={DAY}
                fit="grid"
                cellSize={46}
                seed="harbor-gate-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.nowCard}>
              <p data-edit="hero.nowLabel" data-edit-max="240" data-edit-multiline className={s.nowLabel}>Now boarding</p>
              <p data-edit="hero.nowRoute" data-edit-max="240" data-edit-multiline className={s.nowRoute}>Free citizenship clinic</p>
              <p data-edit="hero.nowMeta" data-edit-max="240" data-edit-multiline className={s.nowMeta}>Gate C, first Saturday of the month, 9:00-12:00</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ DEPARTURES */}
        <section id="departures" className={s.board} aria-labelledby="board-h">
          <div className={s.boardInner}>
            <div className={s.boardHead}>
              <h2 data-edit="departures.boardTitle" data-edit-max="60" id="board-h" className={s.boardTitle}>Departures</h2>
              <p data-edit="departures.boardSub" data-edit-max="240" data-edit-multiline className={s.boardSub}>Salidas</p>
              <p data-edit="departures.boardNote" data-edit-max="240" data-edit-multiline className={s.boardNote}>
                Every route we file, with a typical wait and one flat fee for our
                work. Waits are updated each Monday from published processing
                times; government filing fees are paid on top.
              </p>
            </div>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <caption data-edit="departures.srOnly" className={s.srOnly}>Visa and citizenship routes, typical waits and flat fees</caption>
                <thead>
                  <tr>
                    <th data-edit="departures.heading" scope="col">Route</th>
                    <th data-edit="departures.heading2" scope="col">Destination</th>
                    <th data-edit="departures.heading3" scope="col">Forms</th>
                    <th data-edit="departures.heading4" scope="col">Typical wait</th>
                    <th data-edit="departures.heading5" scope="col">Flat fee</th>
                    <th data-edit="departures.heading6" scope="col">Gate</th>
                    <th data-edit="departures.heading7" scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {BOARD.map((f, i) => (
                    <tr key={f.gate}>
                      <td data-edit={`departures.route.${i}`} className={s.route}>{f.route}</td>
                      <th data-edit={`departures.dest.${i}`} scope="row" className={s.dest}>{f.to}</th>
                      <td data-edit={`departures.mono.${i}`} className={s.mono}>{f.forms}</td>
                      <td data-edit={`departures.mono2.${i}`} className={s.mono}>{f.wait}</td>
                      <td data-edit={`departures.mono3.${i}`} className={s.mono}>{f.fee}</td>
                      <td className={s.gateCell}>
                        <span data-edit={`departures.flap.${i}`} data-edit-max="60" className={s.flap}>{f.gate}</span>
                      </td>
                      <td>
                        <span data-edit={`departures.status.${i}`} data-edit-max="60" className={`${s.status} ${s[f.tone]}`}>{f.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- GATES */}
        <section id="gates" className={s.sec} aria-labelledby="gates-h">
          <div className={s.secHead}>
            <h2 data-edit="gates.secTitle" data-edit-max="60" id="gates-h" className={s.secTitle}>Four gates, one front desk</h2>
            <p data-edit="gates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most people come in knowing their destination but not the route.
              Tell the front desk where you want to end up; we walk you to the
              right gate and an attorney who works it every day.
            </p>
          </div>
          <ol className={s.gates}>
            {GATES.map((g, i) => (
              <li key={g.letter} className={s.gate}>
                <span className={s.gateLetter} aria-hidden="true">{g.letter}</span>
                <h3 data-edit={`gates.gateName.${i}`} data-edit-max="40" className={s.gateName}>{g.name}</h3>
                <p data-edit={`gates.gateWho.${i}`} data-edit-max="240" data-edit-multiline className={s.gateWho}>{g.who}</p>
                <ol className={s.steps}>
                  {g.steps.map((step, i2) => (
                    <li data-edit={`gates.item.${i}.${i2}`} data-edit-max="80" key={step}>{step}</li>
                  ))}
                </ol>
                <p data-edit={`gates.bringLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.bringLabel}>Bring</p>
                <p data-edit={`gates.bring.${i}`} data-edit-max="240" data-edit-multiline className={s.bring}>{g.bring}</p>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,1" className={s.horizon} aria-hidden="true">
          <TabbiedPattern
            pattern={globe}
            palette={DUSK}
            fit="grid"
            cellSize={40}
            seed="harbor-gate-horizon"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- LANGUAGES */}
        <section id="languages" className={s.sec} aria-labelledby="lang-h">
          <div className={s.langGrid}>
            <div>
              <h2 data-edit="languages.secTitle" data-edit-max="60" id="lang-h" className={s.secTitle}>Arrivals: the languages we speak</h2>
              <p data-edit="languages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Nine languages across the attorneys and paralegals, so your first
                conversation can be in your own words. For any other language we
                book a certified interpreter at no charge to you.
              </p>
            </div>
            <ul className={s.langs}>
              {LANGUAGES.map((l, i) => (
                <li key={l.lang} className={s.lang}>
                  <span data-edit={`languages.hello.${i}`} data-edit-max="60" className={s.hello}>{l.hello}</span>
                  <span data-edit={`languages.langName.${i}`} data-edit-max="60" className={s.langName}>{l.lang}</span>
                  <span data-edit={`languages.langWho.${i}`} data-edit-max="60" className={s.langWho}>{l.who}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- ATTORNEYS */}
        <section id="attorneys" className={s.secTint} aria-labelledby="att-h">
          <div className={s.secHead}>
            <h2 data-edit="attorneys.secTitle" data-edit-max="60" id="att-h" className={s.secTitle}>The attorneys</h2>
            <p data-edit="attorneys.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Immigration law is federal, so we take cases from any state. Every
              attorney here is a member of the state bar in good standing, and
              the one you meet is the one who signs your filing.
            </p>
          </div>
          <ul className={s.attorneys}>
            {ATTORNEYS.map((a, i) => (
              <li key={a.name} className={s.attorney}>
                <span className={s.mono2} aria-hidden="true">{a.initials}</span>
                <h3 data-edit={`attorneys.attName.${i}`} data-edit-max="40" className={s.attName}>{a.name}</h3>
                <p data-edit={`attorneys.attRole.${i}`} data-edit-max="240" data-edit-multiline className={s.attRole}>{a.role}</p>
                <p data-edit={`attorneys.attFocus.${i}`} data-edit-max="240" data-edit-multiline className={s.attFocus}>{a.focus}</p>
                <dl className={s.attFacts}>
                  <div>
                    <dt data-edit={`attorneys.term.${i}`} data-edit-max="28">Bar</dt>
                    <dd data-edit={`attorneys.body.${i}`} data-edit-max="200" data-edit-multiline>{a.admitted}</dd>
                  </div>
                  <div>
                    <dt data-edit={`attorneys.term2.${i}`} data-edit-max="28">Speaks</dt>
                    <dd data-edit={`attorneys.body2.${i}`} data-edit-max="200" data-edit-multiline>{a.speaks}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.secHead}>
            <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book a consultation</h2>
            <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Forty-five minutes with an attorney, in person or by video, for
              $150. If you hire us, the $150 comes off the flat fee.
            </p>
          </div>
          <div className={s.bookGrid}>
            <div className={s.pass}>
              <form className={s.form} action="#">
                <p data-edit="book.passHead" data-edit-max="240" data-edit-multiline className={s.passHead}>Boarding pass: consultation</p>
                <div className={s.field}>
                  <label data-edit="book.label" htmlFor="hg-name">Full name</label>
                  <input id="hg-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label2" htmlFor="hg-phone">Phone</label>
                  <input id="hg-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label3" htmlFor="hg-email">Email</label>
                  <input id="hg-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label4" htmlFor="hg-route">Route</label>
                  <select id="hg-route" name="route" defaultValue="unsure">
                    <option value="family">Family</option>
                    <option value="work">Work</option>
                    <option value="citizenship">Citizenship</option>
                    <option value="asylum">Asylum or humanitarian</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label5" htmlFor="hg-lang">Language for the meeting</label>
                  <input id="hg-lang" name="language" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label6" htmlFor="hg-date">Preferred day</label>
                  <input id="hg-date" name="date" type="date" />
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label data-edit="book.label7" htmlFor="hg-note">Anything we should know first</label>
                  <textarea id="hg-note" name="note" rows={3} />
                </div>
                <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request a seat</button>
                <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>What you tell us is confidential from the first message, whether or not you hire us.</p>
              </form>
              <div className={s.stub}>
                <div className={s.stubText}>
                  <p data-edit="book.stubLabel" data-edit-max="240" data-edit-multiline className={s.stubLabel}>Seat</p>
                  <p data-edit="book.stubBig" data-edit-max="240" data-edit-multiline className={s.stubBig}>45 min</p>
                  <p data-edit="book.stubLabel2" data-edit-max="240" data-edit-multiline className={s.stubLabel}>Fare</p>
                  <p data-edit="book.stubBig2" data-edit-max="240" data-edit-multiline className={s.stubBig}>$150</p>
                </div>
                <div data-edit-pattern="book.field" data-edit-roles="transparent,1,3,4" className={s.stubGlobe} aria-hidden="true">
                  <TabbiedPattern
                    pattern={globe}
                    palette={DAY}
                    fit="grid"
                    cellSize={28}
                    seed="harbor-gate-stub"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
            </div>
            <div className={s.visit}>
              <h3 data-edit="book.visitTitle" data-edit-max="40" className={s.visitTitle}>The office</h3>
              <p data-edit="book.address" data-edit-max="240" data-edit-multiline className={s.address}>40 Pier Street, Suite 3, Harborview</p>
              <p data-edit="book.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Above the ferry ticket hall. Elevator from the Pier Street door, two minutes from the Harborview tram stop.</p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550132200">(555) 013-2200</a>
              </p>
              <p className={s.contact}>
                <a data-edit="book.link2" data-edit-max="28" href="tel:+15550132299">Detention line (555) 013-2299</a>
              </p>
              <p className={s.contact}>
                <a data-edit="book.link3" data-edit-max="28" href="mailto:desk@harborgate.example">desk@harborgate.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <div className={s.footText}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Harbor Gate Immigration Law</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional immigration practice. The attorneys, fees, waits and address are invented, and nothing here is legal advice.</p>
            <p>
              Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
          </div>
          <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,2,0" className={s.footGlobe} aria-hidden="true">
            <TabbiedPattern
              pattern={globe}
              palette={NIGHT}
              fit="grid"
              cellSize={26}
              seed="harbor-gate-foot"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
