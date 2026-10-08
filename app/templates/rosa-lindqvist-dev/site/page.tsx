import { TabbiedPattern } from 'tabbied/react';
import { matryoshka } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './rosa-lindqvist-dev.module.css';

export const metadata = {
  title: 'Rosa Lindqvist: Freelance web developer, Fenwick',
  description:
    'Rosa Lindqvist builds fast, accessible websites and small web apps for studios, shops and nonprofits. Services, the stack, a few projects, availability for the next six months, and rates.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   README: cool paper, near-black ink, and four bright colors for the
   blocks. The matryoshka (a grid inside every cell, only some of it
   switched on) reads as pixels and as nested components at once: it is the
   README's banner, the strip between the projects and the calendar, and
   the last line of the file. */
const PAPER = '#f4f5f7';
const INK = '#16161d';
const VIOLET = '#5b47d6';
const CORAL = '#f0604d';
const MINT = '#33b39b';
const LEMON = '#f2cf4a';

const BANNER = ['transparent', VIOLET, CORAL, MINT, LEMON, INK];
const STRIP = ['transparent', MINT, VIOLET, LEMON, VIOLET, CORAL];
const EOF = ['transparent', LEMON, CORAL, VIOLET, MINT, LEMON];

const NAV = [
  ['Services', '#services'],
  ['Stack', '#stack'],
  ['Projects', '#projects'],
  ['Availability', '#availability'],
  ['Rates', '#rates'],
  ['Contact', '#contact'],
];

const BADGES = [
  { k: 'available', v: 'from 3 March', tone: 'mint' },
  { k: 'rate', v: '$110 / hour', tone: 'violet' },
  { k: 'timezone', v: 'UTC+1', tone: 'lemon' },
  { k: 'replies', v: 'within a day', tone: 'coral' },
];

const SERVICES = [
  {
    name: 'Websites for small businesses',
    what: 'Your design or one we make together, built to load fast on a bad connection and to be edited by you, not by me.',
    from: 'from $6,500',
  },
  {
    name: 'Web apps and internal tools',
    what: 'Bookings, rotas, stock lists, dashboards: the spreadsheet that has outgrown itself, turned into something with a login.',
    from: 'from $12,000',
  },
  {
    name: 'Accessibility audits',
    what: 'A WCAG 2.2 AA review with a keyboard and a screen reader, a written report, and every fix ranked by who it helps.',
    from: '$1,200 fixed',
  },
  {
    name: 'Speed tune-ups',
    what: 'Images, fonts, scripts and caching. I measure before and after on a mid-range phone, and you get both numbers.',
    from: '$900 fixed',
  },
  {
    name: 'Care plan',
    what: 'Updates, backups, uptime alerts and four hours a month for small changes. Unused hours roll over once.',
    from: '$240 a month',
  },
];

const STACK = [
  { k: '{', v: '' },
  { k: '  "name": ', v: '"rosa-lindqvist",' },
  { k: '  "languages": ', v: '["TypeScript", "HTML", "CSS", "SQL"],' },
  { k: '  "frontend": ', v: '["React", "Astro", "Svelte"],' },
  { k: '  "backend": ', v: '["Node", "PostgreSQL", "SQLite"],' },
  { k: '  "testing": ', v: '["end-to-end in a real browser", "axe"],' },
  { k: '  "also": ', v: '["design systems", "content models", "plain CSS"],' },
  { k: '  "not": ', v: '["plugin soup", "crypto", "dark patterns"]' },
  { k: '}', v: '' },
];

const WHY = [
  'Plain HTML and CSS first. JavaScript where it earns its weight.',
  'One framework per project, picked for the people who maintain it after me.',
  'Every page tested with a keyboard, a screen reader and a slow phone.',
];

const PROJECTS = [
  {
    repo: 'harbor-street-bakery',
    kind: 'Ordering site',
    text: 'Pre-orders for collection at three shops, and a daily menu the staff edit from a phone at 5 am.',
    result: '38% of weekend orders now come in online',
    tags: ['Astro', 'Svelte', 'PostgreSQL'],
    tone: 'coral',
  },
  {
    repo: 'northfold-architects',
    kind: 'Portfolio',
    text: 'Large drawings and photographs for a twelve-person practice, fast on a site visit with one bar of signal.',
    result: 'Largest paint in 1.2 s on a slow 4G phone',
    tags: ['Astro', 'Image pipeline'],
    tone: 'violet',
  },
  {
    repo: 'pellam-food-bank',
    kind: 'Web app',
    text: 'A volunteer rota and a stock tracker for a food bank, working offline in a warehouse with no wifi.',
    result: '140 volunteers, one spreadsheet retired',
    tags: ['React', 'SQLite', 'Offline'],
    tone: 'mint',
  },
  {
    repo: 'kettle-and-kiln',
    kind: 'Shop',
    text: 'A small shop for a ceramics studio where every piece is one of a kind, so the stock count is always one.',
    result: 'The spring firing sold out in six hours',
    tags: ['Svelte', 'Payments'],
    tone: 'lemon',
  },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

/* Twenty-four weeks, Monday to Friday: 2 booked, 1 part-booked, 0 free. */
const WEEKS = [
  '22222', '22222', '22222', '22222',
  '22222', '22222', '22222', '22212',
  '22100', '22100', '22100', '22100',
  '22100', '11000', '00000', '00000',
  '00000', '00110', '00000', '00000',
  '00000', '00000', '11111', '11111',
];

const RATES = [
  ['Hourly', '$110', 'Billed in quarter hours, for small jobs and advice'],
  ['Day', '$780', 'Seven hours, for a focused piece of work'],
  ['Week', '$3,600', 'Five days, the usual unit for a build'],
  ['Care plan', '$240 / month', 'Four hours, updates, backups and alerts'],
];

const TERMS = [
  'Fixed quotes for anything with a clear end, hourly for anything without one.',
  '30% to book the dates, the rest in two invoices, each due in 14 days.',
  'You own the code and the content from the day each invoice is paid.',
  'Nonprofits and co-ops: 15% off, always.',
];

const ABOUT = [
  ['Based in', 'Fenwick, UTC+1'],
  ['Freelance since', '2019'],
  ['Projects shipped', '64'],
  ['A usual build', '6 to 10 weeks'],
];

const LANGS = [
  ['TypeScript', '58%', 'violet'],
  ['CSS', '22%', 'coral'],
  ['HTML', '12%', 'mint'],
  ['SQL', '8%', 'lemon'],
];

export default function RosaLindqvistPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f4f5f7',
        '--ink': '#16161d',
        '--violet': '#5b47d6',
        '--coral': '#f0604d',
        '--mint': '#33b39b',
        '--lemon': '#f2cf4a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,violet,coral,mint,lemon"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Instrument+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.avatar} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>rosa-lindqvist</span>
          <span data-edit="bar.brandFile" data-edit-max="60" className={s.brandFile}>/ README.md</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#contact">Hire me</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <div className={s.repo}>
        <main id="top" className={s.readme}>
          <div className={s.fileBar}>
            <p data-edit="top.fileName" data-edit-max="240" data-edit-multiline className={s.fileName}>README.md</p>
            <p data-edit="top.fileMeta" data-edit-max="240" data-edit-multiline className={s.fileMeta}>214 lines, last edited this week</p>
          </div>

          {/* The README's banner and its first lines. */}
          <section className={s.hero} aria-labelledby="hero-h">
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4,5,1" className={s.banner} aria-hidden="true">
              <TabbiedPattern
                pattern={matryoshka}
                palette={BANNER}
                fit="grid"
                cellSize={48}
                seed="rosa-banner"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.heroBody}>
              <h1 data-edit="hero.heroTitle" data-edit-max="70" id="hero-h" className={s.heroTitle}>Rosa Lindqvist</h1>
              <ul className={s.badges}>
                {BADGES.map((b, i) => (
                  <li key={b.k} className={s.badge}>
                    <span data-edit={`hero.badgeKey.${i}`} data-edit-max="60" className={s.badgeKey}>{b.k}</span>
                    <span data-edit={`hero.badgeVal.${i}`} data-edit-max="60" className={`${s.badgeVal} ${s[b.tone]}`}>{b.v}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Freelance web developer. I build fast, accessible websites and
                small web apps for studios, shops and nonprofits, and I leave
                them in a state the next person can work on.
              </p>
              <div className={s.actions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Start a project</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#projects">Read the projects</a>
              </div>
            </div>
          </section>

          <section id="services" className={s.sec} aria-labelledby="services-h">
            <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>Services</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Five things I do, and do often enough to quote for. If yours is
              not on the list, ask anyway.
            </p>
            <ul className={s.services}>
              {SERVICES.map((v, i) => (
                <li key={v.name} className={s.service}>
                  <h3 data-edit={`services.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{v.name}</h3>
                  <p data-edit={`services.serviceWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceWhat}>{v.what}</p>
                  <p data-edit={`services.serviceFrom.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceFrom}>{v.from}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="stack" className={s.sec} aria-labelledby="stack-h">
            <h2 data-edit="stack.secTitle" data-edit-max="60" id="stack-h" className={s.secTitle}>Stack</h2>
            <p data-edit="stack.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>What I reach for, as a config file, and why.</p>
            <div className={s.code}>
              <p data-edit="stack.codeName" data-edit-max="240" data-edit-multiline className={s.codeName}>stack.json</p>
              <div className={s.codeBody}>
                {STACK.map((l, i) => (
                  <div key={l.k + l.v} className={s.line}>
                    <span data-edit={`stack.key.${i}`} data-edit-max="60" className={s.key}>{l.k}</span>
                    {l.v ? <span data-edit={`stack.val.${i}`} data-edit-max="60" className={s.val}>{l.v}</span> : null}
                  </div>
                ))}
              </div>
            </div>
            <ul className={s.why}>
              {WHY.map((w, i) => (
                <li data-edit={`stack.item.${i}`} data-edit-max="80" key={w}>{w}</li>
              ))}
            </ul>
          </section>

          <section id="projects" className={s.sec} aria-labelledby="projects-h">
            <h2 data-edit="projects.secTitle" data-edit-max="60" id="projects-h" className={s.secTitle}>Projects</h2>
            <p data-edit="projects.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Four from the last two years, shared with the clients' blessing.</p>
            <ul className={s.projects}>
              {PROJECTS.map((p, i) => (
                <li key={p.repo} className={s.project}>
                  <span className={`${s.projectMark} ${s[p.tone]}`} aria-hidden="true" />
                  <p data-edit={`projects.projectKind.${i}`} data-edit-max="240" data-edit-multiline className={s.projectKind}>{p.kind}</p>
                  <h3 data-edit={`projects.projectRepo.${i}`} data-edit-max="40" className={s.projectRepo}>{p.repo}</h3>
                  <p data-edit={`projects.projectText.${i}`} data-edit-max="240" data-edit-multiline className={s.projectText}>{p.text}</p>
                  <p data-edit={`projects.projectResult.${i}`} data-edit-max="240" data-edit-multiline className={s.projectResult}>{p.result}</p>
                  <ul className={s.tags}>
                    {p.tags.map((t, i2) => (
                      <li data-edit={`projects.item.${i}.${i2}`} data-edit-max="80" key={t}>{t}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <div data-edit-pattern="top.field" data-edit-roles="transparent,4,2,5,2,3" className={s.strip} aria-hidden="true">
            <TabbiedPattern
              pattern={matryoshka}
              palette={STRIP}
              fit="grid"
              cellSize={32}
              seed="rosa-strip"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <section id="availability" className={s.sec} aria-labelledby="availability-h">
            <h2 data-edit="availability.secTitle" data-edit-max="60" id="availability-h" className={s.secTitle}>Availability</h2>
            <p data-edit="availability.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The next six months, a square per working day. Next open slot:
              3 March, three days a week. Fully open from 14 April.
            </p>
            <div className={s.calendar}>
              <div className={s.monthRow} aria-hidden="true">
                {MONTHS.map((m, i) => (
                  <span data-edit={`availability.text.${i}`} data-edit-max="60" key={m}>{m}</span>
                ))}
              </div>
              <div className={s.weeks} aria-hidden="true">
                {WEEKS.map((w, i) => (
                  <span key={`w${i}`} className={s.week}>
                    {w.split('').map((d, j) => (
                      <span key={`d${j}`} className={s[`d${d}`]} />
                    ))}
                  </span>
                ))}
              </div>
              <ul className={s.calKey}>
                <li data-edit="availability.k2" data-edit-max="80" className={s.k2}>Booked</li>
                <li data-edit="availability.k1" data-edit-max="80" className={s.k1}>Part booked</li>
                <li data-edit="availability.k0" data-edit-max="80" className={s.k0}>Free</li>
              </ul>
            </div>
          </section>

          <section id="rates" className={s.sec} aria-labelledby="rates-h">
            <h2 data-edit="rates.secTitle" data-edit-max="60" id="rates-h" className={s.secTitle}>Rates</h2>
            <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>In US dollars, before any sales tax. Fixed-price work is quoted from these.</p>
            <table className={s.rates}>
              <caption data-edit="rates.srOnly" className={s.srOnly}>Rates</caption>
              <thead>
                <tr>
                  <th data-edit="rates.heading" scope="col">Unit</th>
                  <th data-edit="rates.heading2" scope="col">Price</th>
                  <th data-edit="rates.heading3" scope="col">Good for</th>
                </tr>
              </thead>
              <tbody>
                {RATES.map(([unit, price, note], i) => (
                  <tr key={unit}>
                    <th data-edit={`rates.heading4.${i}`} scope="row">{unit}</th>
                    <td data-edit={`rates.price.${i}`} className={s.price}>{price}</td>
                    <td data-edit={`rates.cell.${i}`}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className={s.terms}>
              {TERMS.map((t, i) => (
                <li data-edit={`rates.item.${i}`} data-edit-max="80" key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section id="contact" className={s.sec} aria-labelledby="contact-h">
            <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Contact</h2>
            <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Tell me what you are making and roughly when. I reply within a
              working day, and the first call is always free.
            </p>
            <div className={s.contactGrid}>
              <dl className={s.contactFacts}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Desk 14, The Loom Works, 3 Weaver Row, Fenwick</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="mailto:hello@rosalindqvist.example">hello@rosalindqvist.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="tel:+15550174421">(555) 017-4421</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Hours</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Mon-Thu, 9:00-17:00, UTC+1</dd>
                </div>
              </dl>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label data-edit="contact.label" htmlFor="rl-name">Name</label>
                  <input id="rl-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label2" htmlFor="rl-email">Email</label>
                  <input id="rl-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label3" htmlFor="rl-kind">Kind of project</label>
                  <select id="rl-kind" name="kind" defaultValue="site">
                    <option value="site">A website</option>
                    <option value="app">A web app or tool</option>
                    <option value="audit">An accessibility audit</option>
                    <option value="speed">A speed tune-up</option>
                    <option value="care">A care plan</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label4" htmlFor="rl-budget">Budget</label>
                  <select id="rl-budget" name="budget" defaultValue="mid">
                    <option value="small">Under $5,000</option>
                    <option value="mid">$5,000 to $15,000</option>
                    <option value="large">Over $15,000</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label data-edit="contact.label5" htmlFor="rl-note">What are you making?</label>
                  <textarea id="rl-note" name="note" rows={5} />
                </div>
                <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send it</button>
              </form>
            </div>
          </section>
        </main>

        <aside className={s.about} aria-labelledby="about-h">
          <h2 data-edit="about.aboutTitle" data-edit-max="60" id="about-h" className={s.aboutTitle}>About</h2>
          <p data-edit="about.aboutText" data-edit-max="240" data-edit-multiline className={s.aboutText}>
            Web developer in Fenwick, working alone since 2019 and on teams for
            seven years before that.
          </p>
          <dl className={s.aboutFacts}>
            {ABOUT.map(([k, v], i) => (
              <div key={k}>
                <dt data-edit={`about.term.${i}`} data-edit-max="28">{k}</dt>
                <dd data-edit={`about.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
              </div>
            ))}
          </dl>
          <h3 data-edit="about.langTitle" data-edit-max="40" className={s.langTitle}>Languages</h3>
          <div className={s.langBar} aria-hidden="true">
            {LANGS.map(([name, share, tone]) => (
              <span key={name} className={s[tone]} style={{ width: share }} />
            ))}
          </div>
          <ul className={s.langList}>
            {LANGS.map(([name, share, tone], i) => (
              <li key={name} className={s[`dot${tone}`]}>
                <span data-edit={`about.text.${i}`} data-edit-max="60">{name}</span>
                <span data-edit={`about.langShare.${i}`} data-edit-max="60" className={s.langShare}>{share}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,5,3,2,4,5" className={s.eof} aria-hidden="true">
          <TabbiedPattern
            pattern={matryoshka}
            palette={EOF}
            fit="grid"
            cellSize={24}
            seed="rosa-eof"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Rosa Lindqvist</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional freelance developer. The person, clients, projects,
            figures and address are invented.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
