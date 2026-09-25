import { TabbiedPattern } from 'tabbied/react';
import { hilbert, paintscribble } from 'tabbied/patterns';
import s from './parallel-studio.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Parallel Studio: Design and marketing studio, Millbrook',
  description:
    'Parallel is an eleven-person studio for brand, web and campaign work. The index of every project since 2014, three of them in detail, and how to start one.',
};

/* Studio colors. The featured panels are inked on a dark plate set in CSS,
   so the scribbles take `transparent` as their ground and let it through. */
const PAPER = '#EDEBE6';
const VIOLET = '#6246EA';
const GRAY = '#8A8780';
const PALE = '#D8D5CD';

const SCRIBBLE = ['transparent', PAPER, VIOLET, PALE];
const MARKS = ['transparent', GRAY, PALE, VIOLET];

const NAV = [
  ['Index', '#work'],
  ['Featured', '#featured'],
  ['Capabilities', '#capabilities'],
  ['Team', '#team'],
  ['Clients', '#clients'],
  ['Contact', '#contact'],
];

type Row = {
  no: string;
  client: string;
  project: string;
  discipline: string;
  year: string;
  featured: boolean;
};

const INDEX: Row[] = [
  { no: '024', client: 'Harlow Rowing Club', project: 'Identity, kit and boathouse signs', discipline: 'Brand', year: '2026', featured: false },
  { no: '023', client: 'Fennick Opticians', project: 'Website and appointment booking', discipline: 'Digital', year: '2026', featured: false },
  { no: '022', client: 'Tern Energy', project: 'Product site and design system', discipline: 'Digital', year: '2025', featured: true },
  { no: '021', client: 'Coldharbour Film Festival', project: 'Tenth edition campaign', discipline: 'Campaign', year: '2025', featured: true },
  { no: '020', client: 'Mossgiel Dairy', project: 'Packaging for fourteen products', discipline: 'Brand', year: '2025', featured: true },
  { no: '019', client: 'Eastfield Library Service', project: 'Wayfinding across nine branches', discipline: 'Brand', year: '2025', featured: false },
  { no: '018', client: 'Pollard & Sons', project: 'Rebrand for a fourth-generation builder', discipline: 'Brand', year: '2024', featured: false },
  { no: '017', client: 'Quayside Theatre', project: 'Season campaign, autumn and spring', discipline: 'Campaign', year: '2024', featured: false },
  { no: '016', client: 'Brambling Wines', project: 'Online shop and subscription', discipline: 'Digital', year: '2024', featured: false },
  { no: '015', client: 'Northgate Housing Co-op', project: 'Recruitment campaign for new members', discipline: 'Campaign', year: '2024', featured: false },
  { no: '014', client: 'Kiln & Co. Ceramics', project: 'Identity and a small shop', discipline: 'Brand', year: '2023', featured: false },
  { no: '013', client: 'Millbrook City Council', project: 'Recycling campaign, 38 languages', discipline: 'Campaign', year: '2023', featured: false },
  { no: '012', client: 'Ledgerline', project: 'Marketing site for a payroll app', discipline: 'Digital', year: '2023', featured: false },
  { no: '011', client: 'Seaton Bicycle Works', project: 'Brand and first catalogue', discipline: 'Brand', year: '2022', featured: false },
];

const COUNTS = [
  ['Brand', '6'],
  ['Digital', '4'],
  ['Campaign', '4'],
];

type Feature = {
  no: string;
  client: string;
  title: string;
  body: string;
  facts: [string, string][];
  credits: string;
};

const FEATURED: Feature[] = [
  {
    no: '022',
    client: 'Tern Energy',
    title: 'A heat pump installer that explains itself',
    body: 'Tern had a good product and a website written by engineers for engineers. We rebuilt the site around the three questions every homeowner asks, and gave the in-house team a design system small enough to keep up with.',
    facts: [
      ['+64%', 'quote requests in six months'],
      ['380 KB', 'average page weight'],
      ['11 weeks', 'from brief to launch'],
    ],
    credits: 'Strategy, writing, design, build. Four people.',
  },
  {
    no: '021',
    client: 'Coldharbour Film Festival',
    title: 'Ten years, one poster a day',
    body: 'For the tenth edition we made a poster for every one of the 44 screenings, all from one grid and one typeface, and a ticketing site that works on the phone in the queue.',
    facts: [
      ['31 of 44', 'screenings sold out'],
      ['44', 'posters in six weeks'],
    ],
    credits: 'Campaign, print, web. Five people.',
  },
  {
    no: '020',
    client: 'Mossgiel Dairy',
    title: 'Fourteen products, one shelf',
    body: 'A family dairy moving from farm shops into supermarkets. One packaging system across milk, butter and yogurt that reads at four meters and still looks like the farm.',
    facts: [
      ['14', 'products across 3 sizes'],
      ['+2', 'regional supermarket chains'],
    ],
    credits: 'Brand, packaging, photography direction. Three people.',
  },
];

type Capability = {
  name: string;
  items: string[];
  typical: string;
};

const CAPABILITIES: Capability[] = [
  {
    name: 'Brand',
    items: ['Positioning and naming', 'Identity systems', 'Packaging', 'Signage and wayfinding', 'Guidelines people use'],
    typical: '8-14 weeks, from $38,000',
  },
  {
    name: 'Digital',
    items: ['Marketing sites', 'Online shops', 'Design systems', 'Accessibility audits', 'Build and hosting'],
    typical: '10-16 weeks, from $45,000',
  },
  {
    name: 'Campaign',
    items: ['Launches and seasons', 'Posters and print', 'Social and video', 'Media planning', 'Copywriting'],
    typical: '4-10 weeks, from $24,000',
  },
  {
    name: 'Ongoing',
    items: ['Design retainers', 'Content and editing', 'Site care and updates', 'Training your team'],
    typical: 'Monthly, from $4,800',
  },
];

const PHASES = [
  ['01', 'Listen', '1-2 weeks', 'Interviews, a look at everything you already have, and a written brief we both sign.'],
  ['02', 'Decide', '2-3 weeks', 'Two or three directions, shown in use rather than on mood boards, and one choice.'],
  ['03', 'Make', '4-10 weeks', 'The work itself, reviewed with you every Thursday at ten, in the studio or on a call.'],
  ['04', 'Hand over', '1 week', 'Files, guidelines and a morning with your team. Thirty days of fixes are included.'],
];

type Person = {
  name: string;
  role: string;
  since: string;
};

const TEAM: Person[] = [
  { name: 'Ines Calloway', role: 'Founder, creative director', since: '2014' },
  { name: 'Theo Marchetti', role: 'Founder, managing director', since: '2014' },
  { name: 'Priya Venkat', role: 'Head of strategy', since: '2016' },
  { name: 'Jonah Albers', role: 'Design director', since: '2017' },
  { name: 'Mei Lindqvist', role: 'Senior designer', since: '2019' },
  { name: 'Oskar Brandt', role: 'Lead developer', since: '2019' },
  { name: 'Adaeze Okafor', role: 'Developer', since: '2021' },
  { name: 'Sam Whitcombe', role: 'Writer', since: '2021' },
  { name: 'Lucia Ferreira', role: 'Designer, motion', since: '2022' },
  { name: 'Kit Harrow', role: 'Producer', since: '2023' },
  { name: 'Noor Haddad', role: 'Designer', since: '2025' },
];

const CLIENTS = [
  'Brambling Wines',
  'Coldharbour Film Festival',
  'Eastfield Library Service',
  'Fennick Opticians',
  'Harlow Rowing Club',
  'Kiln & Co. Ceramics',
  'Ledgerline',
  'Millbrook City Council',
  'Mossgiel Dairy',
  'Northgate Housing Co-op',
  'Pollard & Sons',
  'Quayside Theatre',
  'Seaton Bicycle Works',
  'Tern Energy',
  'The Weir Hotel',
  'Upland Trails Trust',
  'Vesper Chocolate',
  'Wexcombe School',
];

export default function ParallelStudioPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..700&family=DM+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markRule} aria-hidden="true" />
          <span className={s.markWord}>Parallel</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#contact">Start a project</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            One sentence, set big, and the studio's particulars in mono. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <p className={s.eyebrow}>Parallel Studio, Millbrook, since 2014</p>
          <h1 id="hero-h" className={s.heroTitle}>
            Eleven people making brands, websites and campaigns
            <br />
            <em>for companies with something real to say.</em>
          </h1>
          <dl className={s.heroMeta}>
            <div>
              <dt>Projects</dt>
              <dd>142 since 2014</dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>Riverside Works, Unit 9</dd>
            </div>
            <div>
              <dt>Booking</dt>
              <dd>From February 2027</dd>
            </div>
            <div>
              <dt>New business</dt>
              <dd>
                <a href="mailto:hello@parallel.example">hello@parallel.example</a>
              </dd>
            </div>
          </dl>
        </section>

        {/* ----------------------------------------------------------- INDEX
            The work as a table. The rows are the picture. */}
        <section id="work" className={s.index} aria-labelledby="work-h">
          <div className={s.indexHead}>
            <span className={s.secNo}>01</span>
            <h2 id="work-h">Index</h2>
            <p className={s.indexNote}>The last fourteen projects, newest first. Marked rows are written up below.</p>
            <ul className={s.counts}>
              {COUNTS.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <span className={s.countNo}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <caption className={s.srOnly}>Projects by number, client, project, discipline and year</caption>
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Client</th>
                  <th scope="col">Project</th>
                  <th scope="col">Discipline</th>
                  <th scope="col">Year</th>
                </tr>
              </thead>
              <tbody>
                {INDEX.map((r) => (
                  <tr key={r.no} className={r.featured ? s.rowFeatured : s.row}>
                    <td className={s.cNo}>{r.no}</td>
                    <th scope="row" className={s.cClient}>{r.client}</th>
                    <td className={s.cProject}>{r.project}</td>
                    <td className={s.cDisc}>{r.discipline}</td>
                    <td className={s.cYear}>{r.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={s.indexMore}>Projects 001-010, 2014-2022, and the work under NDA are shown in person at the studio.</p>
        </section>

        {/* -------------------------------------------------------- FEATURED
            Three rows from the index, each with a scribbled plate in place
            of a picture. */}
        <section id="featured" className={s.featured} aria-labelledby="featured-h">
          <div className={s.secHead}>
            <span className={s.secNo}>02</span>
            <h2 id="featured-h">Featured</h2>
          </div>
          <div className={s.features}>
            {FEATURED.map((f, i) => (
              <article key={f.no} className={i === 0 ? s.featureLead : s.feature}>
                <div className={s.panel} aria-hidden="true">
                  <TabbiedPattern
                    pattern={paintscribble}
                    palette={SCRIBBLE}
                    fit="grid"
                    cellSize={132}
                    seed={`parallel-${f.no}`}
                    redrawInterval={8600 + i * 700}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.featureText}>
                  <p className={s.featureMeta}>
                    <span className={s.featureNo}>{f.no}</span>
                    <span>{f.client}</span>
                  </p>
                  <h3>{f.title}</h3>
                  <p className={s.featureBody}>{f.body}</p>
                  <dl className={s.featureFacts}>
                    {f.facts.map(([v, k]) => (
                      <div key={k}>
                        <dt>{v}</dt>
                        <dd>{k}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className={s.featureCredits}>{f.credits}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- CAPABILITIES */}
        <section id="capabilities" className={s.sec} aria-labelledby="cap-h">
          <div className={s.secHead}>
            <span className={s.secNo}>03</span>
            <h2 id="cap-h">Capabilities</h2>
            <p className={s.secNote}>
              Everything is made in the studio by the people on this page.
              Budgets are fixed once the brief is signed, and published here
              so nobody has to ask.
            </p>
          </div>
          <div className={s.caps}>
            {CAPABILITIES.map((c) => (
              <div key={c.name} className={s.cap}>
                <h3>{c.name}</h3>
                <ul>
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <p className={s.capTypical}>{c.typical}</p>
              </div>
            ))}
          </div>
          <ol className={s.phases}>
            {PHASES.map(([no, name, time, body]) => (
              <li key={no}>
                <span className={s.phaseNo}>{no}</span>
                <h3>{name}</h3>
                <span className={s.phaseTime}>{time}</span>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* A strip of square marks between the work and the people. */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={hilbert}
            palette={MARKS}
            options={{ frequency: 0.4 }}
            fit="grid"
            cellSize={28}
            seed="parallel-band"
            redrawInterval={9400}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.sec} aria-labelledby="team-h">
          <div className={s.secHead}>
            <span className={s.secNo}>04</span>
            <h2 id="team-h">Team</h2>
            <p className={s.secNote}>
              Eleven people, one room, no account managers. The person who
              presents the work is a person who made it.
            </p>
          </div>
          <ol className={s.team}>
            {TEAM.map((p) => (
              <li key={p.name}>
                <h3>{p.name}</h3>
                <p className={s.teamRole}>{p.role}</p>
                <span className={s.teamSince}>{`Since ${p.since}`}</span>
              </li>
            ))}
          </ol>
          <p className={s.hiring}>We hire once or twice a year and say so here first. Nothing open right now.</p>
        </section>

        {/* --------------------------------------------------------- CLIENTS */}
        <section id="clients" className={s.sec} aria-labelledby="clients-h">
          <div className={s.secHead}>
            <span className={s.secNo}>05</span>
            <h2 id="clients-h">Clients</h2>
            <p className={s.secNote}>A selection from twelve years. Two out of three come back for a second project.</p>
          </div>
          <ul className={s.clients}>
            {CLIENTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <figure className={s.quote}>
            <blockquote>
              <p>
                They asked better questions in the first meeting than our
                last agency did in three years, and then they made the
                answers look good.
              </p>
            </blockquote>
            <figcaption>
              <cite>Hollie Tern</cite>
              <span>Founder, Tern Energy</span>
            </figcaption>
          </figure>
        </section>
      </main>

      {/* ---------------------------------------------------------- FOOTER
          The last thing on the page is the invitation, as big as it goes. */}
      <footer className={s.footer}>
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <h2 id="contact-h" className={s.huge}>Start a project</h2>
          <div className={s.contactGrid}>
            <div>
              <h3 className={s.contactHead}>New business</h3>
              <p className={s.contactLine}>Theo Marchetti</p>
              <a className={s.contactLink} href="mailto:hello@parallel.example">hello@parallel.example</a>
              <p className={s.contactLine}>+1 555 555 0187</p>
            </div>
            <div>
              <h3 className={s.contactHead}>What to send</h3>
              <p className={s.contactText}>
                A paragraph about the problem, a budget range and a date. We
                answer every brief within three working days, including the
                ones we turn down.
              </p>
            </div>
            <div>
              <h3 className={s.contactHead}>Studio</h3>
              <p className={s.contactText}>
                Riverside Works, Unit 9
                <br />
                40 Canal Street, Millbrook
                <br />
                Monday to Friday, 9:30-6
              </p>
            </div>
          </div>
        </section>
        <div className={s.fine}>
          <p>Parallel Studio Ltd.</p>
          <p>A fictional studio. Clients, projects, people and figures are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
