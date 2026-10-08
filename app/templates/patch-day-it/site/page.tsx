import { TabbiedPattern } from 'tabbied/react';
import { notch } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './patch-day-it.module.css';

export const metadata = {
  title: 'Patch Day IT: IT support for small offices',
  description:
    'Patch Day IT runs the computers, email, backups and Wi-Fi for offices of five to fifty people, for a flat monthly price per seat, with response times written down and a status page you can check.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Notch is the
   rack: square tiles with one corner bitten away, like a wall of patch
   panels with a port missing. It fills the hero, runs as the band before
   the ticket queue, and edges the footer. */
const NIGHT = '#12161c';
const CHALK = '#e6ebf0';
const SIGNAL = '#3ccf7e';
const AMBER = '#f2a93b';
const STEEL = '#56657a';

const RACK = ['transparent', STEEL, STEEL, AMBER, CHALK];
const BAND = ['transparent', STEEL, CHALK, SIGNAL, STEEL];
const FOOT = ['transparent', NIGHT, STEEL, AMBER, NIGHT];

const NAV = [
  ['Status', '#status'],
  ['Plans', '#plans'],
  ['Response times', '#response'],
  ['Coverage', '#coverage'],
  ['Ticket queue', '#queue'],
];

type Service = { name: string; up: string; note: string; incident: number | null };

/* incident: how far along the 90-day strip the one bad day was, in percent. */
const SERVICES: Service[] = [
  { name: 'Email and calendars', up: '100%', note: 'Microsoft 365 and Google Workspace', incident: null },
  { name: 'File backups', up: '99.99%', note: 'Nightly, verified at 6:00', incident: 78 },
  { name: 'Office Wi-Fi', up: '99.94%', note: 'Eleven offices, 46 access points', incident: 41 },
  { name: 'Printers and scanners', up: '99.71%', note: 'Printers, as ever', incident: 13 },
  { name: 'Laptops and phones', up: '100%', note: '412 devices under management', incident: null },
  { name: 'Security monitoring', up: '100%', note: 'Watched day and night', incident: null },
];

type Plan = { name: string; price: string; who: string; items: string[]; reply: string };

const PLANS: Plan[] = [
  {
    name: 'Essentials',
    price: '$39',
    who: 'Offices of five to fifteen that mostly need someone to call.',
    items: ['Help desk by phone, email and chat', 'Patching every second Tuesday', 'Microsoft 365 or Google admin', 'Antivirus on every device'],
    reply: 'First reply within 2 hours',
  },
  {
    name: 'Standard',
    price: '$59',
    who: 'Most of our clients: a practice, a studio, a small firm.',
    items: ['Everything in Essentials', 'Nightly backups, test-restored monthly', 'Four hours on site each month', 'Phishing drills every quarter'],
    reply: 'First reply within 30 minutes',
  },
  {
    name: 'Complete',
    price: '$89',
    who: 'Offices that cannot stop: clinics, law firms, anyone with an insurer asking.',
    items: ['Everything in Standard', 'Unlimited on-site visits', 'Monitoring and response, any hour', 'A yearly security review for your insurer'],
    reply: 'First reply within 15 minutes, any hour',
  },
];

const RESPONSE = [
  ['P1', 'Office down', 'Nobody can work: the internet is out, the server is down, ransomware is on a screen.', '15 min', '4 hours'],
  ['P2', 'Person down', 'One person cannot work: a dead laptop, a locked account, email bouncing.', '30 min', 'Same day'],
  ['P3', 'Broken, with a workaround', 'A printer offline, a slow shared drive, a phone that will not sync.', '2 hours', 'Next working day'],
  ['P4', 'Request', 'A new starter, a leaver, new software, a desk that moved.', '1 day', 'Three days, or the date you set'],
];

type Cover = { code: string; title: string; items: string[]; not: string };

const COVERAGE: Cover[] = [
  { code: 'COV-01', title: 'Backups', items: ['Nightly copies of every shared drive and mailbox', 'Kept 90 days, off site and encrypted', 'A test restore each month, with the report sent to you'], not: 'Not covered: personal phones and home computers' },
  { code: 'COV-02', title: 'Email', items: ['Microsoft 365 or Google Workspace, set up and run', 'Spam and phishing filtering on every inbox', 'New starters and leavers handled the same day'], not: 'Not covered: newsletters and marketing email' },
  { code: 'COV-03', title: 'Devices', items: ['Laptops, desktops, phones and tablets', 'Patches on the second Tuesday of every month', 'Printers, scanners, the router and the Wi-Fi'], not: 'Not covered: repairs out of warranty, billed at cost' },
  { code: 'COV-04', title: 'Security', items: ['Antivirus and disk encryption everywhere', 'Two-step sign-in on every account', 'Quarterly phishing drills and a ten-minute lesson'], not: 'Not covered: penetration tests, which we arrange' },
];

type Ticket = { id: string; title: string; client: string; pri: string; state: string; kind: string; tech: string; age: string };

const QUEUE: Ticket[] = [
  { id: 'T-4127', title: 'Second-floor printer shows offline', client: 'Harbor Dental', pri: 'P3', state: 'In progress', kind: 'working', tech: 'Dana', age: '18 min' },
  { id: 'T-4126', title: 'New starter Monday: laptop and accounts', client: 'Lowell & Finch', pri: 'P4', state: 'Scheduled', kind: 'scheduled', tech: 'Marcus', age: '2 h' },
  { id: 'T-4125', title: 'Cannot sign in after a password change', client: 'Greywater Architects', pri: 'P2', state: 'Waiting on you', kind: 'waiting', tech: 'Dana', age: '41 min' },
  { id: 'T-4124', title: 'Suspicious invoice email, reported by staff', client: 'Brightside Vet', pri: 'P2', state: 'Resolved', kind: 'resolved', tech: 'Priya', age: '1 h' },
  { id: 'T-4123', title: 'Wi-Fi drops in the back meeting room', client: 'Harbor Dental', pri: 'P3', state: 'Resolved', kind: 'resolved', tech: 'Marcus', age: '3 h' },
];

const HOURS = [
  ['Help desk', 'Monday to Friday, 7:30-6:30'],
  ['P1 line', 'Every hour, every day'],
  ['Patch night', 'Second Tuesday, 8:00 pm-midnight'],
];

export default function PatchDayItPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#12161c',
        '--chalk': '#e6ebf0',
        '--signal': '#3ccf7e',
        '--amber': '#f2a93b',
        '--steel': '#56657a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,chalk,signal,amber,steel"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Patch Day IT</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barTicket" data-edit-max="28" className={s.barTicket} href="#contact">Open a ticket</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <div className={s.statusStrip}>
          <p data-edit="top.statusOk" data-edit-max="240" data-edit-multiline className={s.statusOk}>All systems operational</p>
          <p data-edit="top.statusMeta" data-edit-max="240" data-edit-multiline className={s.statusMeta}>Last incident 19 days ago, resolved in 41 minutes</p>
          <p data-edit="top.statusMeta2" data-edit-max="240" data-edit-multiline className={s.statusMeta}>Next patch night: Tuesday, 8:00 pm</p>
        </div>

        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.prompt" data-edit-max="240" data-edit-multiline className={s.prompt}>IT support for small offices</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Your office IT, fixed <span>before you notice.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Patch Day runs the laptops, email, backups and Wi-Fi for offices
              of five to fifty people. One flat price per seat, response times
              in writing, and a status page that tells you the truth.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#plans">See plans per seat</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#contact">Open a ticket</a>
            </div>
            <dl className={s.heroStats}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Median first reply</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>11 min</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Offices looked after</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>37</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Closed last month</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>612</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroRack}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,4,4,3,1" className={s.rackField} aria-hidden="true">
              <TabbiedPattern
                pattern={notch}
                palette={RACK}
                fit="grid"
                cellSize={58}
                seed="patchday-rack"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.terminal}>
              <p data-edit="hero.termHead" data-edit-max="240" data-edit-multiline className={s.termHead}>patchday status --this-week</p>
              <ul className={s.termLines}>
                <li data-edit="hero.item" data-edit-max="80">214 devices patched</li>
                <li data-edit="hero.item2" data-edit-max="80">37 of 37 backups verified</li>
                <li data-edit="hero.item3" data-edit-max="80">58 phishing emails stopped</li>
                <li data-edit="hero.item4" data-edit-max="80">0 open P1 tickets</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- STATUS */}
        <section id="status" className={s.sec} aria-labelledby="status-h">
          <div className={s.secHead}>
            <p data-edit="status.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>01 / status</p>
            <h2 data-edit="status.secTitle" data-edit-max="60" id="status-h" className={s.secTitle}>Uptime, the last 90 days</h2>
            <p data-edit="status.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Across every office on a plan. One bar per day; a marked bar is a
              day something broke, and every one of those has a written report.
            </p>
          </div>
          <ul className={s.services}>
            {SERVICES.map((sv, i) => (
              <li key={sv.name} className={s.service}>
                <div className={s.serviceHead}>
                  <h3 data-edit={`status.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{sv.name}</h3>
                  <p data-edit={`status.serviceNote.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceNote}>{sv.note}</p>
                </div>
                <span className={s.strip} aria-hidden="true">
                  {sv.incident !== null && <span className={s.incident} style={{ left: `${sv.incident}%` }} />}
                </span>
                <p data-edit={`status.serviceUp.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceUp}>{sv.up}</p>
                <p data-edit={`status.serviceState.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceState}>Operational</p>
              </li>
            ))}
          </ul>
          <p data-edit="status.stripKey" data-edit-max="240" data-edit-multiline className={s.stripKey}>Each strip runs from 90 days ago, on the left, to today.</p>
        </section>

        {/* ----------------------------------------------------------- PLANS */}
        <section id="plans" className={s.sec} aria-labelledby="plans-h">
          <div className={s.secHead}>
            <p data-edit="plans.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>02 / plans</p>
            <h2 data-edit="plans.secTitle" data-edit-max="60" id="plans-h" className={s.secTitle}>One price per seat, per month</h2>
            <p data-edit="plans.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A seat is a person, with every device they use. Five seats
              minimum, no contract longer than a year, and onboarding is a flat
              $300 for the whole office.
            </p>
          </div>
          <div className={s.plans}>
            {PLANS.map((p, i) => (
              <article key={p.name} className={i === 1 ? `${s.plan} ${s.planPick}` : s.plan}>
                <h3 data-edit={`plan.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                <p data-edit={`plan.planPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.planPrice}>{p.price}</p>
                <p data-edit={`plan.planPer.${i}`} data-edit-max="240" data-edit-multiline className={s.planPer}>per seat, per month</p>
                <p data-edit={`plan.planWho.${i}`} data-edit-max="240" data-edit-multiline className={s.planWho}>{p.who}</p>
                <ul className={s.planItems}>
                  {p.items.map((it, i2) => (
                    <li data-edit={`plan.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
                <p data-edit={`plan.planReply.${i}`} data-edit-max="240" data-edit-multiline className={s.planReply}>{p.reply}</p>
              </article>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- RESPONSE */}
        <section id="response" className={s.sec} aria-labelledby="response-h">
          <div className={s.secHead}>
            <p data-edit="response.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>03 / response times</p>
            <h2 data-edit="response.secTitle" data-edit-max="60" id="response-h" className={s.secTitle}>How fast, in writing</h2>
            <p data-edit="response.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              First reply means a person who has read your ticket, not an
              automatic email. Times are for the Standard plan; miss one and
              that seat is free next month.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.response}>
              <caption data-edit="response.srOnly" className={s.srOnly}>Response times by priority</caption>
              <thead>
                <tr>
                  <th data-edit="response.heading" scope="col">Priority</th>
                  <th data-edit="response.heading2" scope="col">What it looks like</th>
                  <th data-edit="response.heading3" scope="col">First reply</th>
                  <th data-edit="response.heading4" scope="col">Fixed by</th>
                </tr>
              </thead>
              <tbody>
                {RESPONSE.map(([p, name, looks, reply, fixed], i) => (
                  <tr key={p}>
                    <th scope="row">
                      <span data-edit={`response.pri.${i}`} data-edit-max="60" className={s.pri}>{p}</span>
                      <span data-edit={`response.priName.${i}`} data-edit-max="60" className={s.priName}>{name}</span>
                    </th>
                    <td data-edit={`response.looks.${i}`} className={s.looks}>{looks}</td>
                    <td data-edit={`response.time.${i}`} className={s.time}>{reply}</td>
                    <td data-edit={`response.fixed.${i}`} className={s.fixed}>{fixed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------------------------------------------------------- COVERAGE */}
        <section id="coverage" className={s.sec} aria-labelledby="coverage-h">
          <div className={s.secHead}>
            <p data-edit="coverage.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>04 / coverage</p>
            <h2 data-edit="coverage.secTitle" data-edit-max="60" id="coverage-h" className={s.secTitle}>What every plan covers</h2>
            <p data-edit="coverage.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Four things every office needs and few look after until the day
              they fail. Each plan covers all four; the plans differ in speed
              and in how often we are on site.
            </p>
          </div>
          <div className={s.coverage}>
            {COVERAGE.map((c, i) => (
              <article key={c.code} className={s.cover}>
                <p data-edit={`cover.coverCode.${i}`} data-edit-max="240" data-edit-multiline className={s.coverCode}>{c.code}</p>
                <h3 data-edit={`cover.coverTitle.${i}`} data-edit-max="40" className={s.coverTitle}>{c.title}</h3>
                <ul className={s.coverItems}>
                  {c.items.map((it, i2) => (
                    <li data-edit={`cover.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
                <p data-edit={`cover.coverNot.${i}`} data-edit-max="240" data-edit-multiline className={s.coverNot}>{c.not}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={s.band}>
          <div data-edit-pattern="top.field" data-edit-roles="transparent,4,1,2,4" className={s.bandField} aria-hidden="true">
            <TabbiedPattern
              pattern={notch}
              palette={BAND}
              fit="grid"
              cellSize={46}
              seed="patchday-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <p data-edit="top.bandCard" data-edit-max="240" data-edit-multiline className={s.bandCard}>Second Tuesday, 8:00 pm: every device in every office, patched while you sleep.</p>
        </div>

        {/* ----------------------------------------------------------- QUEUE */}
        <section id="queue" className={s.sec} aria-labelledby="queue-h">
          <div className={s.secHead}>
            <p data-edit="queue.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>05 / ticket queue</p>
            <h2 data-edit="queue.secTitle" data-edit-max="60" id="queue-h" className={s.secTitle}>This morning, in the queue</h2>
            <p data-edit="queue.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every ticket has a number, a priority, a named technician and a
              state you can see. You get an email at each change, and nothing
              closes until you say it is fixed.
            </p>
          </div>
          <ol className={s.queue}>
            {QUEUE.map((t, i) => (
              <li key={t.id} className={s.ticket}>
                <span data-edit={`queue.ticketId.${i}`} data-edit-max="60" className={s.ticketId}>{t.id}</span>
                <span data-edit={`queue.ticketPri.${i}`} data-edit-max="60" className={s.ticketPri}>{t.pri}</span>
                <span data-edit={`queue.ticketTitle.${i}`} data-edit-max="60" className={s.ticketTitle}>{t.title}</span>
                <span data-edit={`queue.ticketClient.${i}`} data-edit-max="60" className={s.ticketClient}>{t.client}</span>
                <span data-edit={`queue.ticketTech.${i}`} data-edit-max="60" className={s.ticketTech}>{t.tech}</span>
                <span data-edit={`queue.ticketAge.${i}`} data-edit-max="60" className={s.ticketAge}>{t.age}</span>
                <span data-edit={`queue.chip.${i}`} data-edit-max="60" className={`${s.chip} ${s[t.kind]}`}>{t.state}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>06 / contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Open a ticket, or ask for a quote</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Clients can open a ticket here or by email. If you are not a
                client yet, tell us how many people you have and what keeps
                breaking; a quote takes one working day.
              </p>
              <dl className={s.office}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Floor 2, 300 Ferris Street, Eastgate</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Help desk</dt>
                  <dd><a data-edit="contact.link" data-edit-max="28" href="tel:+15550134400">(555) 013-4400</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd><a data-edit="contact.link2" data-edit-max="28" href="mailto:help@patchday.example">help@patchday.example</a></dd>
                </div>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="pd-name">Name</label>
                <input id="pd-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="pd-company">Office or company</label>
                <input id="pd-company" name="company" type="text" autoComplete="organization" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="pd-email">Email</label>
                <input id="pd-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="pd-pri">How bad is it</label>
                <select id="pd-pri" name="priority" defaultValue="P3">
                  <option value="P1">P1, the office is down</option>
                  <option value="P2">P2, one person is down</option>
                  <option value="P3">P3, broken with a workaround</option>
                  <option value="P4">P4, a request or a quote</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="pd-note">What is happening</label>
                <textarea id="pd-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send ticket</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>For a P1, call as well. A form is read in minutes; a phone rings now.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,4,3,0" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={notch}
            palette={FOOT}
            fit="grid"
            cellSize={34}
            seed="patchday-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Patch Day IT</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional IT support company. The technicians, clients, tickets, prices and address are invented.</p>
          <p>Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
        </div>
      </footer>
    </div>
  );
}
