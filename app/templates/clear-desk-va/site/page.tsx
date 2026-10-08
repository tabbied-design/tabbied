import { TabbiedPattern } from 'tabbied/react';
import { dotfield } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './clear-desk-va.module.css';

export const metadata = {
  title: 'Clear Desk: Virtual assistant for small businesses',
  description:
    'Clear Desk is Mina Corrigan, a virtual assistant who runs inboxes, calendars, invoices and travel for small business owners, in monthly packages of 10, 20 or 40 hours.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The dotfield
   is the empty inbox: an even field of ink, violet, apricot and mint dots
   on a transparent ground, so the lilac paper shows between them. It fills
   the inbox pane in the hero, runs as a band before the packages, backs
   the tools panel and closes the footer. */
const PAPER = '#f1eef7';
const INK = '#221d3a';
const VIOLET = '#6a4fd0';
const APRICOT = '#f2955e';
const MINT = '#8cc7b0';

const CALM = ['transparent', VIOLET, MINT, APRICOT, INK, MINT];
const BRIGHT = ['transparent', APRICOT, VIOLET, MINT, VIOLET, INK];
const SOFT = ['transparent', MINT, VIOLET, MINT, APRICOT, PAPER];

const NAV = [
  ['A week', '#week'],
  ['Packages', '#packages'],
  ['Tools', '#tools'],
  ['About', '#about'],
  ['Get in touch', '#contact'],
];

const FOLDERS = [
  ['Inbox', '0'],
  ['Waiting on you', '2'],
  ['Done this week', '46'],
];

type Mail = { from: string; subject: string; tag: string; label: string };

const MAIL: Mail[] = [
  { from: 'Fernhill Florists', subject: 'Can we move the supplier call?', tag: 'calendar', label: 'Moved to Thu 2:30' },
  { from: 'Tally & Co', subject: 'Invoice 2231 is 30 days overdue', tag: 'invoices', label: 'Chased, paid Tue' },
  { from: 'Northgate Tutors', subject: 'Welcome pack for new families', tag: 'clients', label: 'Sent to 4 families' },
  { from: 'Trade fair desk', subject: 'Your badge and hotel details', tag: 'travel', label: 'Filed, in calendar' },
];

type Day = { day: string; tasks: [string, string][] };

const WEEK: Day[] = [
  { day: 'Monday', tasks: [['inbox', 'Sort the weekend mail into done, waiting and needs you'], ['calendar', 'Your week on one page, in your inbox by 10:00']] },
  { day: 'Tuesday', tasks: [['invoices', 'Send this week\'s invoices; chase anything 14 days late'], ['travel', 'Trains and a hotel for the trade fair, receipts saved']] },
  { day: 'Wednesday', tasks: [['clients', 'Welcome emails and paperwork for two new clients'], ['inbox', 'Midweek sweep, replies drafted in your voice for a yes']] },
  { day: 'Thursday', tasks: [['calendar', 'Next week booked, with buffers and no back-to-backs'], ['invoices', 'Receipts matched and filed for your bookkeeper']] },
  { day: 'Friday', tasks: [['report', 'What got done, what waits on you, hours used'], ['inbox', 'Left at zero for the weekend']] },
];

const TAGS: Record<string, string> = {
  inbox: 'Inbox',
  calendar: 'Calendar',
  invoices: 'Invoices',
  travel: 'Travel',
  clients: 'Clients',
  report: 'Report',
};

type Package = { name: string; hours: string; price: string; rate: string; fit: string; meter: string };

const PACKAGES: Package[] = [
  { name: 'Light', hours: '10 hours a month', price: '$450', rate: '$45 an hour', fit: 'Inbox and calendar for one busy person.', meter: 'm10' },
  { name: 'Steady', hours: '20 hours a month', price: '$840', rate: '$42 an hour', fit: 'Most of my clients: inbox, calendar, invoices and travel.', meter: 'm20' },
  { name: 'Right hand', hours: '40 hours a month', price: '$1,560', rate: '$39 an hour', fit: 'A daily check-in and a second pair of hands for a small team.', meter: 'm40' },
];

const PACKAGE_NOTES = [
  'Unused hours roll over, up to five a month.',
  'Pay as you go at $52 an hour, three-hour minimum.',
  'Tracked to the quarter hour; the log is yours to read.',
  'Change or stop with a month\'s notice. No setup fee.',
];

const TOOLS = [
  ['Email', 'Any provider, through delegated access. Never your password.'],
  ['Calendars', 'Shared calendars and booking pages, kept in step.'],
  ['Documents', 'Docs, spreadsheets and e-signature for contracts.'],
  ['Invoicing', 'Your invoicing and bookkeeping app, send and chase only.'],
  ['Project boards', 'Whatever board your team already uses.'],
  ['Passwords', 'A shared vault, always. Nothing over email or chat.'],
  ['Video calls', 'Notes taken and actions sent within the hour.'],
  ['Social posts', 'Scheduled from what you wrote or approved.'],
];

const SAFE = [
  'A confidentiality agreement signed before day one',
  'Two-factor sign-in on every account I touch',
  'Access removed the same day if we stop working together',
];

const START = [
  ['Free call', 'Thirty minutes on what eats your week.'],
  ['Access list', 'A checklist of what to share, and how, safely.'],
  ['Two-week trial', 'Ten hours at the Light rate. Keep going or stop.'],
  ['Every Friday', 'A short report and the hours used so far.'],
];

const PACKAGE_CHOICES = ['Light, 10 h', 'Steady, 20 h', 'Right hand, 40 h', 'Not sure'];

export default function ClearDeskPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f1eef7',
        '--ink': '#221d3a',
        '--violet': '#6a4fd0',
        '--apricot': '#f2955e',
        '--mint': '#8cc7b0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,violet,apricot,mint"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Figtree:ital,wght@0,400;0,500;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Clear Desk</span>
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
        <section id="hero" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Virtual assistant for small business owners</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Hand me the inbox. <em>Keep the business.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I am Mina Corrigan. I run inboxes, calendars, invoices and travel
              for owners who would rather be doing the work they started the
              business for. Monthly packages from ten hours, and a report every
              Friday.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free call</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#packages">See the packages</a>
            </div>
          </div>

          <div className={s.window}>
            <div className={s.windowBar} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={s.windowBody}>
              <aside className={s.folders} aria-label="Sample inbox">
                <ul className={s.folderList}>
                  {FOLDERS.map(([name, count], i) => (
                    <li key={name}>
                      <span data-edit={`folders.text.${i}`} data-edit-max="60">{name}</span>
                      <span data-edit={`folders.count.${i}`} data-edit-max="60" className={s.count}>{count}</span>
                    </li>
                  ))}
                </ul>
                <ul className={s.mailList}>
                  {MAIL.map((m, i) => (
                    <li key={m.subject} className={`${s.mail} ${s[m.tag]}`}>
                      <span data-edit={`folders.mailFrom.${i}`} data-edit-max="60" className={s.mailFrom}>{m.from}</span>
                      <span data-edit={`folders.mailSubject.${i}`} data-edit-max="60" className={s.mailSubject}>{m.subject}</span>
                      <span data-edit={`folders.mailDone.${i}`} data-edit-max="60" className={s.mailDone}>{m.label}</span>
                    </li>
                  ))}
                </ul>
              </aside>
              <div className={s.pane}>
                <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,4,3,1,4" className={s.paneField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={dotfield}
                    palette={CALM}
                    fit="grid"
                    cellSize={88}
                    seed="clear-desk-hero"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.zero}>
                  <p data-edit="hero.zeroTitle" data-edit-max="240" data-edit-multiline className={s.zeroTitle}>Inbox zero</p>
                  <p data-edit="hero.zeroText" data-edit-max="240" data-edit-multiline className={s.zeroText}>46 messages handled this week. Two are waiting on you.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="week" className={s.sec} aria-labelledby="week-h">
          <div className={s.secHead}>
            <h2 data-edit="week.secTitle" data-edit-max="60" id="week-h" className={s.secTitle}>How a week of support works</h2>
            <p data-edit="week.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The same rhythm every week, so you always know what has been
              done and what is coming. This is a Steady client: about five
              hours a week.
            </p>
          </div>
          <ol className={s.board}>
            {WEEK.map((d, i) => (
              <li key={d.day} className={s.column}>
                <p data-edit={`week.columnHead.${i}`} data-edit-max="240" data-edit-multiline className={s.columnHead}>{d.day}</p>
                <ul className={s.cards}>
                  {d.tasks.map(([tag, task], i2) => (
                    <li key={task} className={`${s.task} ${s[tag]}`}>
                      <span data-edit={`week.tag.${i}.${i2}`} data-edit-max="60" className={s.tag}>{TAGS[tag]}</span>
                      <span data-edit={`week.taskText.${i}.${i2}`} data-edit-max="60" className={s.taskText}>{task}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,4,2,1" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={dotfield}
            palette={BRIGHT}
            fit="grid"
            cellSize={72}
            seed="clear-desk-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="packages" className={s.sec} aria-labelledby="packages-h">
          <div className={s.secHead}>
            <h2 data-edit="packages.secTitle" data-edit-max="60" id="packages-h" className={s.secTitle}>Hourly packages</h2>
            <p data-edit="packages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Billed monthly in advance. Most people start on Light for a
              couple of months, then find out how much they were carrying.
            </p>
          </div>
          <ul className={s.packages}>
            {PACKAGES.map((p, i) => (
              <li key={p.name} className={p.meter === 'm20' ? `${s.package} ${s.pick}` : s.package}>
                <h3 data-edit={`packages.packageName.${i}`} data-edit-max="40" className={s.packageName}>{p.name}</h3>
                <p data-edit={`packages.packageHours.${i}`} data-edit-max="240" data-edit-multiline className={s.packageHours}>{p.hours}</p>
                <span className={`${s.meter} ${s[p.meter]}`} aria-hidden="true" />
                <p data-edit={`packages.packagePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packagePrice}>{p.price}</p>
                <p data-edit={`packages.packageRate.${i}`} data-edit-max="240" data-edit-multiline className={s.packageRate}>{p.rate}</p>
                <p data-edit={`packages.packageFit.${i}`} data-edit-max="240" data-edit-multiline className={s.packageFit}>{p.fit}</p>
              </li>
            ))}
          </ul>
          <ul className={s.notes}>
            {PACKAGE_NOTES.map((note, i) => (
              <li data-edit={`packages.item.${i}`} data-edit-max="80" key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section id="tools" className={s.tools} aria-labelledby="tools-h">
          <div data-edit-pattern="tools.field" data-edit-roles="transparent,4,2,4,3,0" className={s.toolsField} aria-hidden="true">
            <TabbiedPattern
              pattern={dotfield}
              palette={SOFT}
              fit="grid"
              cellSize={80}
              seed="clear-desk-tools"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.toolsCard}>
            <div className={s.toolsHead}>
              <h2 data-edit="tools.secTitle" data-edit-max="60" id="tools-h" className={s.secTitle}>The tools I use</h2>
              <p data-edit="tools.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Yours, mostly. I work inside the accounts you already have, so
                nothing moves and nothing is lost when we stop.
              </p>
            </div>
            <dl className={s.toolList}>
              {TOOLS.map(([tool, how], i) => (
                <div key={tool}>
                  <dt data-edit={`tools.term.${i}`} data-edit-max="28">{tool}</dt>
                  <dd data-edit={`tools.body.${i}`} data-edit-max="200" data-edit-multiline>{how}</dd>
                </div>
              ))}
            </dl>
            <div className={s.safe}>
              <h3 data-edit="tools.safeTitle" data-edit-max="40" className={s.safeTitle}>Kept safe</h3>
              <ul className={s.safeList}>
                {SAFE.map((item, i) => (
                  <li data-edit={`tools.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="about" className={s.sec} aria-labelledby="about-h">
          <div className={s.about}>
            <div className={s.aboutText}>
              <h2 data-edit="about.secTitle" data-edit-max="60" id="about-h" className={s.secTitle}>Eight years running other people's offices</h2>
              <p data-edit="about.aboutLead" data-edit-max="240" data-edit-multiline className={s.aboutLead}>
                Before Clear Desk I managed the front office for a dental group
                and then a small law firm: four calendars, two inboxes and every
                invoice. I went on my own in 2021 and now look after nine
                clients, never more than ten.
              </p>
              <p data-edit="about.aboutLead2" data-edit-max="240" data-edit-multiline className={s.aboutLead}>
                I work Monday to Friday, 8:00-5:00 Eastern, and answer every
                message within two working hours.
              </p>
            </div>
            <ol className={s.start}>
              {START.map(([title, text], i) => (
                <li key={title} className={s.startStep}>
                  <span className={s.startNo}>{i + 1}</span>
                  <h3 data-edit={`about.startTitle.${i}`} data-edit-max="40" className={s.startTitle}>{title}</h3>
                  <p data-edit={`about.startText.${i}`} data-edit-max="240" data-edit-multiline className={s.startText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contact}>
            <div className={s.contactInfo}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a free call</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Thirty minutes, no slides. Tell me what eats your week and I
                will tell you honestly whether I can take it off you.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Email</dt>
                  <dd><a data-edit="contact.link" data-edit-max="28" href="mailto:mina@cleardesk.example">mina@cleardesk.example</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd><a data-edit="contact.link2" data-edit-max="28" href="tel:+15550193307">(555) 019-3307</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Hours</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Monday to Friday, 8:00-5:00 Eastern</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Post</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>PO Box 418, 9 Copper Beech Lane, Hollins Bay</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <p data-edit="contact.formHead" data-edit-max="240" data-edit-multiline className={s.formHead}>New message</p>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="contact.text" data-edit-max="60">Name</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <label className={s.field}>
                  <span data-edit="contact.text2" data-edit-max="60">Email</span>
                  <input type="email" name="email" autoComplete="email" />
                </label>
              </div>
              <fieldset className={s.choices}>
                <legend data-edit="contact.legend">Package</legend>
                {PACKAGE_CHOICES.map((c, i) => (
                  <label key={c} className={s.chip}>
                    <input type="radio" name="package" value={c} />
                    <span data-edit={`contact.text3.${i}`} data-edit-max="60">{c}</span>
                  </label>
                ))}
              </fieldset>
              <label className={s.field}>
                <span data-edit="contact.text4" data-edit-max="60">What eats your week</span>
                <textarea name="message" rows={5} />
              </label>
              <button data-edit="contact.button" data-edit-max="24" className={s.button} type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,3,1,4" className={s.footerField} aria-hidden="true">
          <TabbiedPattern
            pattern={dotfield}
            palette={CALM}
            fit="grid"
            cellSize={56}
            seed="clear-desk-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footerInner}>
          <p data-edit="footer.footerName" data-edit-max="240" data-edit-multiline className={s.footerName}>Clear Desk</p>
          <p data-edit="footer.footerLine" data-edit-max="240" data-edit-multiline className={s.footerLine}>Virtual assistance, PO Box 418, Hollins Bay.</p>
          <p data-edit="footer.footerLine2" data-edit-max="240" data-edit-multiline className={s.footerLine}>
            Clear Desk is a fictional business: the names, people, clients,
            prices and address on this page are invented.
          </p>
          <p className={s.footerCredit}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
