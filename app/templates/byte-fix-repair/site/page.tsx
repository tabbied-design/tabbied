import { TabbiedPattern } from 'tabbied/react';
import { dotmatrix, notch, tetro } from 'tabbied/patterns';
import s from './byte-fix-repair.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Byte Fix: Phone and computer repair, Wren Street',
  description:
    'Byte Fix repairs phones, laptops, tablets and consoles at the counter on Wren Street. Free diagnosis, a written quote, most screens in under two hours, and data recovery with no fee if nothing comes back.',
};

/* Site colors. Every field lays its blocks on a transparent ground, so the
   screen, the disk map and the wizard banner each show their own fill
   between the blocks. */
const DESK = '#d4d6d1';
const INK = '#16181c';
const BLUE = '#1f47a8';
const RED = '#d9432b';
const GREEN = '#2e8b57';

const SCREEN = ['transparent', BLUE, RED, GREEN, DESK];
const DISK = ['transparent', GREEN, GREEN, BLUE, GREEN, RED];
const BANNER = ['transparent', DESK, GREEN, INK];
const SAVER = ['transparent', BLUE, GREEN, RED, DESK];

const NAV = [
  ['Prices', '#prices'],
  ['Repair status', '#status'],
  ['Data recovery', '#recovery'],
  ['How it works', '#how'],
  ['Warranty', '#warranty'],
  ['Visit', '#visit'],
];

const ICONS = [
  ['prices.tbl', '#prices', 'iconDoc'],
  ['status.exe', '#status', 'iconApp'],
  ['Recovery', '#recovery', 'iconDisk'],
  ['visit.txt', '#visit', 'iconDoc'],
];

const STATS = [
  ['2 hrs', 'most screens and batteries'],
  ['$0', 'to diagnose, always'],
  ['12 mo', 'on parts and labor'],
];

type Repair = {
  name: string;
  device: string;
  time: string;
  price: string;
};

type Folder = {
  folder: string;
  id: string;
  rows: Repair[];
};

const FOLDERS: Folder[] = [
  {
    folder: 'Phones',
    id: 'prices-phones',
    rows: [
      { name: 'Screen', device: 'iPhone 12 to 15', time: '1-2 hrs', price: '$189-$329' },
      { name: 'Screen', device: 'Galaxy S and A series', time: 'Same day', price: '$159-$289' },
      { name: 'Screen', device: 'Pixel 6 to 9', time: 'Same day', price: '$149-$239' },
      { name: 'Battery', device: 'Any iPhone', time: '45 min', price: '$89' },
      { name: 'Charging port', device: 'Clean, or replace', time: '30 min', price: '$25 / $79' },
      { name: 'Back glass', device: 'iPhone, laser removal', time: 'Next day', price: '$119' },
      { name: 'Camera lens', device: 'Any phone', time: '30 min', price: '$49' },
    ],
  },
  {
    folder: 'Laptops',
    id: 'prices-laptops',
    rows: [
      { name: 'Battery', device: 'MacBook Air and Pro', time: 'Same day', price: '$179' },
      { name: 'Screen', device: 'Most Windows laptops', time: '2-3 days', price: '$149-$299' },
      { name: 'Keyboard', device: 'Keys, or the whole deck', time: '2-3 days', price: '$129-$249' },
      { name: 'Liquid clean', device: 'Board out, cleaned, dried', time: '24 hrs', price: '$95' },
      { name: 'SSD upgrade', device: 'Your files moved across', time: 'Same day', price: '$79 + drive' },
      { name: 'Fan and paste', device: 'For the loud, hot ones', time: 'Same day', price: '$69' },
    ],
  },
  {
    folder: 'Tablets and consoles',
    id: 'prices-other',
    rows: [
      { name: 'Glass', device: 'iPad, any size', time: '1-2 days', price: '$119-$199' },
      { name: 'Battery', device: 'iPad', time: '2 days', price: '$129' },
      { name: 'HDMI port', device: 'PlayStation, Xbox', time: '2 days', price: '$99' },
      { name: 'Stick drift', device: 'Joy-Con or controller', time: '30 min', price: '$29-$45' },
    ],
  },
];

const SIDE = [
  ['Diagnosis', 'Free, about fifteen minutes'],
  ['Quote', 'Written, and it holds for 14 days'],
  ['Payment', 'Card or cash, when you collect'],
  ['Students', '10% off labor with a card'],
];

type Stage = {
  step: string;
  time: string;
  note: string;
  state: string;
};

const STAGES: Stage[] = [
  { step: 'Checked in', time: '10:12', note: 'iPhone 14, cracked screen, touch dead on the left', state: 'done' },
  { step: 'Diagnosed', time: '10:26', note: 'Screen only. Face ID and cameras tested fine', state: 'done' },
  { step: 'Quote approved', time: '10:31', note: '$229 by text, part already on the shelf', state: 'done' },
  { step: 'On the bench', time: '10:40', note: 'With Dev at bench two', state: 'done' },
  { step: 'Testing', time: '11:52', note: 'Ten-minute screen test running now', state: 'now' },
  { step: 'Ready to collect', time: 'next', note: 'We text you the minute it is', state: 'next' },
];

const TIERS = [
  ['Deleted or formatted', 'Photos deleted by mistake, a formatted card, a laptop that will not start.', '$149-$299', '2-4 days'],
  ['Failing drive', 'A drive that clicks, an SSD that vanished, a phone stuck on its logo.', '$349-$690', '4-7 days'],
  ['Clean bench', 'Damaged heads or platters, opened in a clean room at our partner lab.', '$750-$1,400', '2-3 weeks'],
];

const LEGEND = [
  ['Recovered', 'keyGreen'],
  ['Read on a second pass', 'keyBlue'],
  ['Unreadable', 'keyRed'],
];

const STEPS = [
  ['Walk in', 'No appointment for phones and tablets. Book a laptop if you can; it saves you a wait at lunchtime.'],
  ['Free diagnosis', 'Fifteen minutes at the counter while you watch. You leave with a written quote, or with nothing to pay.'],
  ['We fix it', 'Most screens and batteries in under two hours. You get a text when it goes on the bench and when it comes off.'],
  ['Test it with us', 'Calls, cameras, charging and touch in every corner, together at the counter. Then you pay.'],
];

const BENCH = [
  ['Anita Osei', 'Owner. Board repair and microsoldering'],
  ['Dev Patel', 'Phones and tablets, bench two'],
  ['Marco Lind', 'Laptops and data recovery'],
];

const TERMS = [
  'Twelve months on every part we fit, and on the labor to fit it.',
  'Ninety days on anything we bring back from liquid damage.',
  'Your old parts back in a bag if you want them, recycled if not.',
  'We never open your photos or files. A passcode is only for testing.',
  'Unclaimed devices are kept ninety days, after three phone calls.',
];

const FAQ = [
  ['Should I back up first?', 'If it still turns on, yes. Screen and battery jobs do not touch your data, but a backup costs nothing and a lost photo costs a lot.'],
  ['Do you use original parts?', 'Where the maker sells them, yes, and the quote says so. Otherwise the best part we have tested, and the quote says that too.'],
  ['Will a repair void my warranty?', "If your device is still under the maker's warranty and the fault is theirs, go to them first. We will tell you so at the counter."],
  ['Can you fix water damage?', 'Often. Switch it off, do not charge it, skip the rice and bring it in the same day. Every hour counts.'],
];

const HOURS = [
  ['Monday to Friday', '9 am to 7 pm'],
  ['Saturday', '10 am to 5 pm'],
  ['Sunday', 'Closed'],
];

export default function ByteFixPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&family=Pixelify+Sans:wght@400..700&display=swap"
      />

      {/* The menu bar across the top of the desktop. */}
      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.logo} aria-hidden="true" />
          <span className={s.brandName}>Byte Fix</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p className={s.clock}>Open today, 9 to 7</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top" className={s.desktop}>
        {/* ------------------------------------------------------------ HERO */}
        <div className={s.heroRow}>
          <ul className={s.icons} aria-label="Shortcuts">
            {ICONS.map(([label, href, kind]) => (
              <li key={label}>
                <a className={`${s.icon} ${s[kind]}`} href={href}>{label}</a>
              </li>
            ))}
          </ul>

          <section className={`${s.win} ${s.heroWin}`} aria-labelledby="hero-h">
            <div className={s.titlebar}>
              <p className={s.titleText}>bytefix.exe</p>
              <span className={s.controls} aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className={s.body}>
              <p className={s.kicker}>Phone and computer repair, 311 Wren Street</p>
              <h1 id="hero-h" className={s.title}>
                Cracked it? Soaked it? <em>Bring it in.</em>
              </h1>
              <p className={s.lede}>
                Phones, laptops, tablets and consoles, fixed at the counter.
                A free diagnosis while you wait, a written price before we
                open anything, and most screens and batteries back in your
                hand the same afternoon.
              </p>
              <div className={s.actions}>
                <a className={`${s.btn} ${s.btnDefault}`} href="#prices">See the prices</a>
                <a className={s.btn} href="#status">Check a repair</a>
              </div>
              <dl className={s.stats}>
                {STATS.map(([v, k]) => (
                  <div key={k}>
                    <dt>{v}</dt>
                    <dd>{k}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <aside className={`${s.win} ${s.testWin}`} aria-label="Screen test">
            <div className={`${s.titlebar} ${s.titleIdle}`}>
              <p className={s.titleText}>scrntest.exe</p>
              <span className={s.controls} aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className={s.screen} aria-hidden="true">
              <TabbiedPattern
                pattern={tetro}
                palette={SCREEN}
                fit="grid"
                cellSize={40}
                seed="bytefix-screen"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.statusBar}>Every screen we fit runs this for ten minutes before it goes home.</p>
          </aside>
        </div>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={`${s.win} ${s.pricesWin}`} aria-labelledby="prices-h">
          <div className={s.titlebar}>
            <p className={s.titleText}>C:\BYTEFIX\PRICES</p>
            <span className={s.controls} aria-hidden="true"><i /><i /><i /></span>
          </div>
          <p className={s.address}>Address: C:\Byte Fix\Prices, parts, labor and tax included</p>
          <div className={s.explorer}>
            <div className={s.side}>
              <ul className={s.tree} aria-label="Folders">
                {FOLDERS.map((f) => (
                  <li key={f.id}>
                    <a className={s.treeLink} href={`#${f.id}`}>{f.folder}</a>
                  </li>
                ))}
              </ul>
              <dl className={s.sideInfo}>
                {SIDE.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.files}>
              <h2 id="prices-h" className={s.winHeading}>The price list</h2>
              <p className={s.winNote}>
                What you see is what you pay. If we find something else once
                it is open, we call you before we touch it.
              </p>
              <table className={s.fileTable}>
                <caption className={s.srOnly}>Repair prices by device, with turnaround times</caption>
                <thead>
                  <tr>
                    <th scope="col">Repair</th>
                    <th scope="col">Time</th>
                    <th scope="col" className={s.num}>Price</th>
                  </tr>
                </thead>
                {FOLDERS.map((f) => (
                  <tbody key={f.id} id={f.id}>
                    <tr className={s.folderRow}>
                      <th scope="rowgroup" colSpan={3}>{f.folder}</th>
                    </tr>
                    {f.rows.map((r) => (
                      <tr key={`${r.name}-${r.device}`}>
                        <td className={s.fileName}>
                          <strong>{r.name}</strong>
                          <small>{r.device}</small>
                        </td>
                        <td className={s.mono}>{r.time}</td>
                        <td className={`${s.mono} ${s.num}`}>{r.price}</td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          <p className={s.statusBar}>17 repairs listed. Diagnosis is free, and so is the quote.</p>
        </section>

        {/* ---------------------------------------------- STATUS + RECOVERY */}
        <div className={s.pairRow}>
          <section id="status" className={`${s.win} ${s.statusWin}`} aria-labelledby="status-h">
            <div className={s.titlebar}>
              <p className={s.titleText}>Repair status</p>
              <span className={s.controls} aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className={s.body}>
              <div className={s.statusHead}>
                <div>
                  <h2 id="status-h" className={s.winHeading}>Where is my phone?</h2>
                  <p className={s.winNote}>
                    Every repair gets a ticket and a text at each step. This is
                    what one looks like at ten to twelve on a Tuesday.
                  </p>
                  <div className={s.ticket}>
                    <p className={s.ticketNo}>Ticket BF-20417</p>
                    <p className={s.ticketWhat}>iPhone 14, screen replacement</p>
                  </div>
                </div>
                <figure className={s.preview}>
                  <div className={s.device}>
                    <Artwork
                      slug="byte-fix-repair-phone"
                      alt="A phone with a cracked screen and a small screwdriver, drawn in pixels"
                      inks={{ red: 'var(--text)', blue: 'var(--blue)' }}
                      className={s.phone}
                    />
                  </div>
                  <figcaption className={s.deviceName}>bf-20417.bmp</figcaption>
                </figure>
              </div>

              <div className={s.progress} aria-hidden="true">
                <div className={s.progressFill} />
              </div>
              <p className={s.progressText}>Step 5 of 6: testing</p>

              <ol className={s.stages}>
                {STAGES.map((st) => (
                  <li key={st.step} className={s[st.state]}>
                    <span className={s.stageTime}>{st.time}</span>
                    <strong className={s.stageName}>{st.step}</strong>
                    <span className={s.stageNote}>{st.note}</span>
                  </li>
                ))}
              </ol>

              <form className={s.lookup} action="#">
                <div className={s.field}>
                  <label htmlFor="bf-ticket">Ticket number</label>
                  <input id="bf-ticket" name="ticket" type="text" placeholder="BF-00000" />
                </div>
                <div className={s.field}>
                  <label htmlFor="bf-phone">Last four digits of your phone</label>
                  <input id="bf-phone" name="phone" type="text" inputMode="numeric" maxLength={4} />
                </div>
                <button className={`${s.btn} ${s.btnDefault}`} type="submit">Check status</button>
              </form>
            </div>
          </section>

          <section id="recovery" className={`${s.win} ${s.recoveryWin}`} aria-labelledby="recovery-h">
            <div className={s.titlebar}>
              <p className={s.titleText}>Surface scan: disk 0</p>
              <span className={s.controls} aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className={s.body}>
              <h2 id="recovery-h" className={s.winHeading}>Data recovery</h2>
              <p className={s.winNote}>
                No data, no fee. Before you pay, you get a list of every
                file we got back and choose what to keep.
              </p>
              <div className={s.diskMap} aria-hidden="true">
                <TabbiedPattern
                  pattern={dotmatrix}
                  palette={DISK}
                  options={{ frequency: 0.86 }}
                  fit="grid"
                  cellSize={30}
                  seed="bytefix-disk"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ul className={s.legend}>
                {LEGEND.map(([label, key]) => (
                  <li key={label} className={s[key]}>{label}</li>
                ))}
              </ul>
              <dl className={s.tiers}>
                {TIERS.map(([name, what, price, time]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd className={s.tierWhat}>{what}</dd>
                    <dd className={s.tierPrice}>{price}</dd>
                    <dd className={s.tierTime}>{time}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.small}>
                We copy what we recover to a new drive ($69 for 1 TB) or to
                one you bring. Your old drive comes back to you or is wiped
                and shredded, your choice.
              </p>
            </div>
          </section>
        </div>

        {/* ------------------------------------------------------------ HOW */}
        <section id="how" className={`${s.win} ${s.wizardWin}`} aria-labelledby="how-h">
          <div className={s.titlebar}>
            <p className={s.titleText}>Repair Wizard</p>
            <span className={s.controls} aria-hidden="true"><i /><i /><i /></span>
          </div>
          <div className={s.wizard}>
            <div className={s.banner} aria-hidden="true">
              <TabbiedPattern
                pattern={tetro}
                palette={BANNER}
                options={{ frequency: 0.7 }}
                fit="grid"
                cellSize={36}
                seed="bytefix-wizard"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.wizardBody}>
              <h2 id="how-h" className={s.winHeading}>How a repair works</h2>
              <p className={s.winNote}>Four steps, and you only pay at the last one.</p>
              <ol className={s.steps}>
                {STEPS.map(([title, body]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </li>
                ))}
              </ol>
              <div className={s.wizardFoot}>
                <a className={s.btn} href="#prices">Back to prices</a>
                <a className={`${s.btn} ${s.btnDefault}`} href="#visit">Find the shop</a>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ WARRANTY + FAQ */}
        <div className={s.pairRow}>
          <section id="warranty" className={`${s.win} ${s.aboutWin}`} aria-labelledby="warranty-h">
            <div className={s.titlebar}>
              <p className={s.titleText}>About Byte Fix</p>
              <span className={s.controls} aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className={s.body}>
              <p className={s.version}>Version 12. Repairing on Wren Street since 2014.</p>
              <h2 id="warranty-h" className={s.winHeading}>Warranty and the small print</h2>
              <ul className={s.terms}>
                {TERMS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <h3 className={s.subHead}>On the bench</h3>
              <dl className={s.bench}>
                {BENCH.map(([who, what]) => (
                  <div key={who}>
                    <dt>{who}</dt>
                    <dd>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className={s.faqStack} aria-labelledby="faq-h">
            <h2 id="faq-h" className={s.srOnly}>Questions people ask at the counter</h2>
            {FAQ.map(([q, a], i) => (
              <details key={q} className={s.dialog} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>
        </div>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={`${s.win} ${s.visitWin}`} aria-labelledby="visit-h">
          <div className={s.titlebar}>
            <p className={s.titleText}>Control Panel: Location</p>
            <span className={s.controls} aria-hidden="true"><i /><i /><i /></span>
          </div>
          <div className={s.visit}>
            <div className={s.visitText}>
              <h2 id="visit-h" className={s.winHeading}>311 Wren Street, Fallow Park</h2>
              <p className={s.winNote}>
                Two doors from the Wren Street tram stop, next to the
                launderette. Street parking is free after six.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a href="tel:+15550138844">(555) 013-8844</a>
              </p>
              <p className={s.contact}>
                <a href="mailto:bench@bytefix.example">bench@bytefix.example</a>
              </p>
              <p className={s.small}>
                Office accounts get a priority bench, collection and drop-off,
                and one invoice a month. Ask for Anita.
              </p>
            </div>
            <div className={s.monitorWrap}>
              <div className={s.monitor}>
                <div className={s.saver} aria-hidden="true">
                  <TabbiedPattern
                    pattern={notch}
                    palette={SAVER}
                    fit="grid"
                    cellSize={34}
                    seed="bytefix-saver"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <p className={s.monitorCaption}>
                After hours the monitor in our window runs this. Drop a device
                through the slot with a note and your number.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* The taskbar. */}
      <footer className={s.taskbar}>
        <p className={s.start}>Byte Fix</p>
        <p className={s.footNote}>A fictional phone and computer repair shop. The prices, tickets, people and address are invented.</p>
        <p className={s.trayNote}>
          Patterns by <a href="https://tabbied.com">Tabbied</a>; the phone is a generated picture drawn in the page's own colors.
        </p>
      </footer>
    </div>
  );
}
