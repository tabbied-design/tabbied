import { TabbiedPattern } from 'tabbied/react';
import { dashfield, halftone } from 'tabbied/patterns';
import s from './maren-holt.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Maren Holt: Independent brand strategist, Port Aldine',
  description:
    'Maren Holt helps companies of 10 to 200 people decide what they stand for and say it plainly. Positioning, brand platforms and naming, at a published day rate.',
};

/* Site colors. Both fields take `transparent` in the background slot, so
   the dashes and dots are drawn straight onto the page. */
const INK = '#111111';
const SIGNAL = '#3B5BDB';
const GRAY = '#8C8C8C';

const PLATE = ['transparent', INK, SIGNAL, GRAY];
const DOTS = ['transparent', INK, SIGNAL];

const NAV = [
  ['Work', '#work'],
  ['Services', '#services'],
  ['Career', '#career'],
  ['Writing', '#writing'],
  ['Kind words', '#words'],
  ['Contact', '#contact'],
];

const FACTS = [
  ['17', 'years in brand work'],
  ['64', 'projects since 2019'],
  ['9', 'sectors, from ferries to software'],
  ['1', 'person, start to finish'],
];

type Work = {
  year: string;
  client: string;
  project: string;
  outcome: string;
  kind: string;
};

const WORK: Work[] = [
  {
    year: '2025',
    client: 'Northreach Ferries',
    project: 'Positioning and a new name for the island routes',
    outcome: 'Bookings up 22% in the first season under the new name.',
    kind: 'Naming',
  },
  {
    year: '2025',
    client: 'Tallowmere Coffee',
    project: 'Brand platform ahead of a wholesale push',
    outcome: 'Wholesale accounts went from 14 to 61 in twelve months.',
    kind: 'Platform',
  },
  {
    year: '2024',
    client: 'Calder Health',
    project: 'Messaging for a family doctor booking app',
    outcome: 'Sign-up completion rose from 38% to 57%.',
    kind: 'Messaging',
  },
  {
    year: '2024',
    client: 'Hollis & Wren',
    project: 'Voice and site copy for a twelve-lawyer firm',
    outcome: 'Two partners hired in a year, both citing the website.',
    kind: 'Voice',
  },
  {
    year: '2023',
    client: 'Pinefold Credit Union',
    project: 'Brand strategy for the merger of two credit unions',
    outcome: 'Member attrition after the merger held under 2%.',
    kind: 'Platform',
  },
  {
    year: '2023',
    client: 'Loomwork',
    project: 'Category and pricing story for scheduling software',
    outcome: 'Average sales cycle down from 94 to 61 days.',
    kind: 'Positioning',
  },
  {
    year: '2022',
    client: 'Brightwater Schools Trust',
    project: 'A name for a new group of seven schools',
    outcome: 'Adopted by all seven governing boards without a vote.',
    kind: 'Naming',
  },
  {
    year: '2021',
    client: 'Sable Outdoor',
    project: 'Repositioning from discount gear to repair and resale',
    outcome: 'Repairs are now 30% of revenue, up from 4%.',
    kind: 'Positioning',
  },
];

type Service = {
  name: string;
  time: string;
  price: string;
  body: string;
};

const SERVICES: Service[] = [
  {
    name: 'Positioning sprint',
    time: '2 weeks',
    price: '$9,600 fixed',
    body: 'Interviews with your team and six customers, a read of four competitors, and a one-page positioning statement you can hand to anyone you hire.',
  },
  {
    name: 'Brand platform',
    time: '5-7 weeks',
    price: 'from $22,000',
    body: 'Positioning, audience, voice and a messaging hierarchy, written up as a guide your designers and writers can build from without calling me.',
  },
  {
    name: 'Naming',
    time: '3-4 weeks',
    price: 'from $14,000',
    body: 'A long list of three hundred, a short list of twelve, trademark screening in two jurisdictions, and one recommendation I will defend in the room.',
  },
  {
    name: 'Workshop day',
    time: '1 day',
    price: '$2,400',
    body: 'A day with your leadership team on one question, with the preparation included and a written summary in your inbox within 48 hours.',
  },
  {
    name: 'Advisory retainer',
    time: 'Monthly',
    price: '$2,200 a month',
    body: 'Two days a month for founders who want a second opinion on the calls that shape the brand. Three months minimum, then month to month.',
  },
];

const RATES = [
  ['Day rate', '$1,200'],
  ['Half day', '$650'],
  ['Nonprofits', '20% off'],
  ['Travel', 'At cost'],
];

type Role = {
  when: string;
  title: string;
  where: string;
  note: string;
};

const CAREER: Role[] = [
  {
    when: '2019-now',
    title: 'Independent strategist',
    where: 'Maren Holt Strategy',
    note: 'Sixty-odd projects for companies of 10 to 200 people, most of them founder-led and most of them referred by the last one.',
  },
  {
    when: '2015-2019',
    title: 'Head of Strategy',
    where: 'Fieldnote Studio',
    note: 'Built the strategy team at a forty-person brand agency from one person to five, and wrote the process it still uses.',
  },
  {
    when: '2012-2015',
    title: 'Senior Strategist',
    where: 'Carrow & Lune',
    note: 'Research and positioning for retail and hospitality clients, including two national rebrands.',
  },
  {
    when: '2009-2012',
    title: 'Copywriter, then Strategist',
    where: 'Bellwether Advertising',
    note: 'Started by writing radio ads for car dealers, which is still the best training in saying one thing there is.',
  },
  {
    when: '2005-2009',
    title: 'BA, English and Linguistics',
    where: 'Eastmoor College',
    note: 'A thesis on how companies apologize in public. The short answer: badly, and at length.',
  },
];

type Piece = {
  title: string;
  kind: string;
  when: string;
};

const WRITING: Piece[] = [
  { title: 'Your tagline is not your strategy', kind: 'Essay, 8 min', when: 'Mar 2026' },
  { title: 'Naming without a committee', kind: 'Essay, 11 min', when: 'Nov 2025' },
  { title: 'The one-page brand', kind: 'Guide, free on request', when: 'Jun 2025' },
  { title: 'What customers say when you leave the room', kind: 'Essay, 6 min', when: 'Jan 2025' },
];

const TALKS: Piece[] = [
  { title: 'Positioning for people who hate positioning', kind: 'Brand Week North', when: 'Oct 2025' },
  { title: 'Six interviews are enough', kind: 'Small Studio Summit', when: 'May 2025' },
  { title: 'The merger nobody wanted to name', kind: 'The Margin podcast, ep. 112', when: 'Sep 2024' },
];

type Quote = {
  text: string;
  name: string;
  role: string;
};

const QUOTES: Quote[] = [
  {
    text: 'Maren asked the question none of us wanted to answer, and then helped us answer it in one sentence. Two years later we still use that sentence.',
    name: 'Priya Raman',
    role: 'Chief executive, Calder Health',
  },
  {
    text: 'The naming was the calmest part of the whole merger. She came with twelve names, argued for one, and was right.',
    name: 'Tom Ellery',
    role: 'Chief operating officer, Pinefold Credit Union',
  },
  {
    text: 'Worth the day rate for the customer interviews alone. We learned more in a week than in three years of surveys.',
    name: 'Ada Kowalczyk',
    role: 'Founder, Tallowmere Coffee',
  },
];

export default function MarenHoltPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#ffffff',
        '--ink': '#111111',
        '--signal': '#3b5bdb',
        '--gray': '#8c8c8c',
        '--pale': '#ededed',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,signal,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400..600&display=swap"
      />

      <div className={s.shell}>
        {/* ------------------------------------------------------- PROFILE
            The header is the whole left column: who, what, the plate, the
            sections, availability and the ways to get in touch. It stays in
            view while the record scrolls beside it. */}
        <header className={s.profile}>
          <div className={s.profileTop}>
            <a data-edit="profile.name" data-edit-max="28" className={s.name} href="#top">Maren Holt</a>
            <TemplateMenu className={s.siteMenu}>
              {NAV.map(([label, href], i) => (
                <a data-edit={`profile.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
              ))}
            </TemplateMenu>
          </div>
          <p data-edit="profile.role" data-edit-max="240" data-edit-multiline className={s.role}>Independent brand strategist</p>

          <div data-edit-pattern="profile.field" data-edit-roles="transparent,1,2,3" className={s.plate} aria-hidden="true">
            <TabbiedPattern
              pattern={dashfield}
              palette={PLATE}
              fit="grid"
              cellSize={44}
              seed="maren"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <p data-edit="profile.bio" data-edit-max="240" data-edit-multiline className={s.bio}>
            Seventeen years in agencies and on my own. I work with one client
            at a time on positioning, brand platforms and names, and I do the
            interviews, the thinking and the writing myself.
          </p>

          <div className={s.status}>
            <span className={s.statusDot} aria-hidden="true" />
            <p data-edit="profile.statusText" data-edit-max="240" data-edit-multiline className={s.statusText}>Booking from 3 November</p>
            <p data-edit="profile.statusNote" data-edit-max="240" data-edit-multiline className={s.statusNote}>Two sprint slots left before the new year</p>
          </div>

          <nav className={s.nav} aria-label="Sections">
            {NAV.map(([label, href], i) => (
              <a data-edit={`profile.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
            ))}
          </nav>

          <ul className={s.links}>
            <li>
              <a data-edit="profile.link3" data-edit-max="28" href="mailto:hello@marenholt.example">hello@marenholt.example</a>
            </li>
            <li>
              <a data-edit="profile.link4" data-edit-max="28" href="tel:+15555550142">+1 555 555 0142</a>
            </li>
            <li>
              <a data-edit="profile.writing" data-edit-max="28" href="#writing">Plain Positioning, the newsletter</a>
            </li>
          </ul>
        </header>

        <main id="top" className={s.main}>
          {/* ---------------------------------------------------------- INTRO */}
          <section className={s.intro} aria-labelledby="intro-h">
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Brand strategy for companies of 10 to 200 people</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="80" id="intro-h" className={s.title}>
              I help growing companies decide what they stand for,
              <br />
              <em>and then say it plainly.</em>
            </h1>
            <p data-edit="intro.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Most of my clients have outgrown the story they started with.
              The product changed, the team tripled, and nobody can explain
              the company in a sentence any more. I find that sentence with
              you, test it with your customers, and write down everything
              that follows from it.
            </p>
            <dl className={s.facts}>
              {FACTS.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`intro.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`intro.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ----------------------------------------------------------- WORK */}
          <section id="work" className={s.sec} aria-labelledby="work-h">
            <div className={s.secHead}>
              <span data-edit="work.secNo" data-edit-max="60" className={s.secNo}>01</span>
              <h2 data-edit="work.title" data-edit-max="60" id="work-h">Selected work</h2>
              <p data-edit="work.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Eight of the last sixty. Case studies with the numbers behind
                them are sent on request; three clients are under NDA and are
                not listed.
              </p>
            </div>
            <ol className={s.work}>
              {WORK.map((w, i) => (
                <li key={w.client} className={s.workRow}>
                  <span data-edit={`work.workYear.${i}`} data-edit-max="60" className={s.workYear}>{w.year}</span>
                  <div className={s.workMain}>
                    <h3 data-edit={`work.title2.${i}`} data-edit-max="40">{w.client}</h3>
                    <p data-edit={`work.workProject.${i}`} data-edit-max="240" data-edit-multiline className={s.workProject}>{w.project}</p>
                  </div>
                  <p data-edit={`work.workOutcome.${i}`} data-edit-max="240" data-edit-multiline className={s.workOutcome}>{w.outcome}</p>
                  <span data-edit={`work.workKind.${i}`} data-edit-max="60" className={s.workKind}>{w.kind}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* ------------------------------------------------------- SERVICES */}
          <section id="services" className={s.sec} aria-labelledby="services-h">
            <div className={s.secHead}>
              <span data-edit="services.secNo" data-edit-max="60" className={s.secNo}>02</span>
              <h2 data-edit="services.title" data-edit-max="60" id="services-h">Services and rates</h2>
              <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Fixed prices where the work has a known shape, a day rate
                where it does not. Half is invoiced at the start and half on
                delivery.
              </p>
            </div>
            <div className={s.services}>
              {SERVICES.map((sv, i) => (
                <article key={sv.name} className={s.service}>
                  <h3 data-edit={`service.title.${i}`} data-edit-max="40">{sv.name}</h3>
                  <span data-edit={`service.serviceTime.${i}`} data-edit-max="60" className={s.serviceTime}>{sv.time}</span>
                  <strong data-edit={`service.servicePrice.${i}`} className={s.servicePrice}>{sv.price}</strong>
                  <p data-edit={`service.body.${i}`} data-edit-max="240" data-edit-multiline>{sv.body}</p>
                </article>
              ))}
            </div>
            <dl className={s.rates}>
              {RATES.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`services.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`services.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="services.fine" data-edit-max="240" data-edit-multiline className={s.fine}>
              Prices exclude sales tax. Travel is billed at cost and only when
              you ask me to be in the room; most of the work is done on calls
              and in writing.
            </p>
          </section>

          {/* --------------------------------------------------------- CAREER */}
          <section id="career" className={s.sec} aria-labelledby="career-h">
            <div className={s.secHead}>
              <span data-edit="career.secNo" data-edit-max="60" className={s.secNo}>03</span>
              <h2 data-edit="career.title" data-edit-max="60" id="career-h">Career</h2>
              <p data-edit="career.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Copywriter first, strategist since 2011, independent since
                2019. The short version of a longer CV, which I am happy to
                send.
              </p>
            </div>
            <ol className={s.timeline}>
              {CAREER.map((r, i) => (
                <li key={r.when}>
                  <span data-edit={`career.tlWhen.${i}`} data-edit-max="60" className={s.tlWhen}>{r.when}</span>
                  <div className={s.tlBody}>
                    <h3 data-edit={`career.title2.${i}`} data-edit-max="40">{r.title}</h3>
                    <p data-edit={`career.tlWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.tlWhere}>{r.where}</p>
                    <p data-edit={`career.tlNote.${i}`} data-edit-max="240" data-edit-multiline className={s.tlNote}>{r.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* -------------------------------------------------------- WRITING */}
          <section id="writing" className={s.sec} aria-labelledby="writing-h">
            <div className={s.secHead}>
              <span data-edit="writing.secNo" data-edit-max="60" className={s.secNo}>04</span>
              <h2 data-edit="writing.title" data-edit-max="60" id="writing-h">Writing and talks</h2>
              <p data-edit="writing.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Plain Positioning is a monthly letter about brand decisions
                for people who have to make them. 3,400 readers, no tracking,
                one email a month.
              </p>
            </div>
            <div className={s.writing}>
              <div>
                <h3 data-edit="writing.listHead" data-edit-max="40" className={s.listHead}>Writing</h3>
                <ul className={s.pieces}>
                  {WRITING.map((p, i) => (
                    <li key={p.title}>
                      <p data-edit={`writing.pieceTitle.${i}`} data-edit-max="240" data-edit-multiline className={s.pieceTitle}>{p.title}</p>
                      <span data-edit={`writing.pieceMeta.${i}`} data-edit-max="60" className={s.pieceMeta}>{p.kind}</span>
                      <time data-edit={`writing.pieceWhen.${i}`} className={s.pieceWhen}>{p.when}</time>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 data-edit="writing.listHead2" data-edit-max="40" className={s.listHead}>Talks</h3>
                <ul className={s.pieces}>
                  {TALKS.map((p, i) => (
                    <li key={p.title}>
                      <p data-edit={`writing.pieceTitle2.${i}`} data-edit-max="240" data-edit-multiline className={s.pieceTitle}>{p.title}</p>
                      <span data-edit={`writing.pieceMeta2.${i}`} data-edit-max="60" className={s.pieceMeta}>{p.kind}</span>
                      <time data-edit={`writing.pieceWhen2.${i}`} className={s.pieceWhen}>{p.when}</time>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <form className={s.signup} action="#">
              <label data-edit="writing.signupLabel" className={s.signupLabel} htmlFor="mh-letter">Get the letter</label>
              <input id="mh-letter" name="email" type="email" placeholder="you@company.example" />
              <button data-edit="writing.buttonGhost" data-edit-max="24" type="submit" className={s.buttonGhost}>Subscribe</button>
            </form>
          </section>

          {/* ---------------------------------------------------------- WORDS */}
          <section id="words" className={s.sec} aria-labelledby="words-h">
            <div className={s.secHead}>
              <span data-edit="words.secNo" data-edit-max="60" className={s.secNo}>05</span>
              <h2 data-edit="words.title" data-edit-max="60" id="words-h">Kind words</h2>
            </div>
            <div className={s.quotes}>
              {QUOTES.map((q, i) => (
                <figure key={q.name} className={s.quote}>
                  <blockquote>
                    <p data-edit={`words.body.${i}`} data-edit-max="240" data-edit-multiline>{q.text}</p>
                  </blockquote>
                  <figcaption>
                    <cite data-edit={`words.attribution.${i}`} data-edit-max="48">{q.name}</cite>
                    <span data-edit={`words.text.${i}`} data-edit-max="60">{q.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* The one other field: dots that grow down the band, ink with the
              odd signal blue, a quiet full stop before the contact form. */}
          <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2" className={s.band} aria-hidden="true">
            <TabbiedPattern
              pattern={halftone}
              palette={DOTS}
              options={{ frequency: 0.7 }}
              fit="grid"
              cellSize={28}
              seed="holt"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          {/* -------------------------------------------------------- CONTACT */}
          <section id="contact" className={s.sec} aria-labelledby="contact-h">
            <div className={s.secHead}>
              <span data-edit="contact.secNo" data-edit-max="60" className={s.secNo}>06</span>
              <h2 data-edit="contact.title" data-edit-max="60" id="contact-h">Tell me what you are working on</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                I reply within two working days. If it is not a fit I will
                say so, and usually suggest someone who is.
              </p>
            </div>
            <div className={s.contact}>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label data-edit="contact.label" htmlFor="mh-name">Your name</label>
                  <input id="mh-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label2" htmlFor="mh-email">Email</label>
                  <input id="mh-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label3" htmlFor="mh-company">Company and size</label>
                  <input id="mh-company" name="company" type="text" placeholder="Tallowmere, 40 people" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label4" htmlFor="mh-need">What you need</label>
                  <select id="mh-need" name="need" defaultValue="">
                    <option value="" disabled>
                      Choose one
                    </option>
                    <option>Positioning sprint</option>
                    <option>Brand platform</option>
                    <option>Naming</option>
                    <option>Workshop day</option>
                    <option>Advisory retainer</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="contact.label5" htmlFor="mh-note">What is going on</label>
                  <textarea id="mh-note" name="note" rows={5} placeholder="A few sentences is plenty. What changed, and what you would like to be true in a year." />
                </div>
                <button data-edit="contact.button" data-edit-max="24" type="submit" className={s.button}>Send</button>
              </form>
              <dl className={s.direct}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="mailto:hello@marenholt.example">hello@marenholt.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>+1 555 555 0142</dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Hours</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Monday to Thursday, 9-5 Eastern</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Studio</dt>
                  <dd data-edit="contact.body3" data-edit-max="200" data-edit-multiline>
                    18 Ferry Lane, Studio 4
                    <br />
                    Port Aldine
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </main>
      </div>

      <footer className={s.footer}>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Maren Holt Strategy</p>
        <p data-edit="footer.footFine" data-edit-max="240" data-edit-multiline className={s.footFine}>A fictional consultancy. Clients, figures and people are invented.</p>
        <p className={s.footFine}>
          <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
          <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
        </p>
      </footer>
    </div>
  );
}
