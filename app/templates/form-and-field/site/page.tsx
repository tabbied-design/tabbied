import { TabbiedPattern } from 'tabbied/react';
import { isometricweave, circuit } from 'tabbied/patterns';
import s from './form-and-field.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Form & Field: Architects, Alder Valley',
  description:
    'Form & Field is a practice of seven architects and landscape designers in Alder Valley. Houses, extensions and small public buildings, with the fees published before the first meeting.',
};

/* Site colors, for the pattern fields. Each field starts from `transparent`
   so the lines sit on the page's own concrete ground. */
const BLUE = '#3D5A80';
const GRAY = '#8D8C88';
const PALE = '#D8D6D0';
const INK = '#151515';
const PAPER = '#EEEDEA';

const WEAVE = ['transparent', PALE, PAPER, GRAY, PALE];
const BOARDS = ['transparent', BLUE, GRAY, PALE, BLUE];
const PLAN = ['transparent', GRAY, BLUE, INK, BLUE, INK];

const NAV = [
  ['Projects', '#projects'],
  ['Practice', '#practice'],
  ['Services', '#services'],
  ['Process', '#process'],
  ['Questions', '#questions'],
  ['Contact', '#contact'],
];

/* The gallery. Each plate is a building cut out of its sky, drawn in two of
   the page's colors; the plate behind it is the sky. */
const PROJECTS = [
  {
    id: 'hollow-lane',
    no: '01',
    art: 'form-and-field-house',
    alt: 'A two-story concrete house with deep glazed openings, drawn in two tones',
    sky: 'skyPale',
    inks: ['var(--ink)', 'var(--paper)'],
    name: 'Hollow Lane House',
    year: '2023',
    place: 'North ridge, Alder Valley',
    kind: 'Private house',
    area: '2,280 sq ft',
    note: 'Board-marked concrete, and an upper floor cantilevered over the slope so the old orchard below could stay where it was.',
  },
  {
    id: 'eastgate',
    no: '02',
    art: 'form-and-field-library',
    alt: 'A brick library with tall arched windows and stone steps, drawn in two tones',
    sky: 'skyBlue',
    inks: ['var(--ink)', 'var(--pale)'],
    name: 'Eastgate Library',
    year: '2021',
    place: 'Eastgate, Alder Valley',
    kind: 'Public library, renovation',
    area: '11,400 sq ft',
    note: 'A 1912 library rewired, re-roofed and made step-free, then opened at the back onto a reading garden that used to be the parking lot.',
  },
  {
    id: 'mill-pond',
    no: '03',
    art: 'form-and-field-pavilion',
    alt: 'A timber garden pavilion with a shingled pyramid roof, drawn in two tones',
    sky: 'skyPaper',
    inks: ['var(--blue)', 'var(--paper)'],
    name: 'Mill Pond Pavilion',
    year: '2024',
    place: 'Mill Pond Park',
    kind: 'Garden pavilion',
    area: '410 sq ft',
    note: 'Green oak frame, cedar shingles, pegged joints and not one visible fixing. The town rents it for weddings from May to September.',
  },
];

const FACTS = [
  ['2009', 'Founded'],
  ['7', 'People'],
  ['46', 'Buildings finished'],
  ['60 mi', 'Furthest site'],
];

const PEOPLE = [
  ['Ada Morrow', 'Architect, partner'],
  ['Theo Lind', 'Architect, partner'],
  ['June Okafor', 'Landscape designer'],
  ['Sam Reyes', 'Architect'],
];

const SERVICES = [
  {
    name: 'New houses',
    fee: '10-12% of build cost',
    body: 'From the first sketch to the keys. Most of our houses are between 1,800 and 3,200 sq ft and take about two years from brief to moving in.',
  },
  {
    name: 'Extensions and renovations',
    fee: '12-14%, or fixed from $9,500',
    body: 'Kitchens, attics, a room onto the garden. Smaller jobs get a fixed fee, so the number you agree to is the number you pay.',
  },
  {
    name: 'Public and community buildings',
    fee: 'By tender',
    body: 'Libraries, halls, a school wing. We work with the town from the feasibility study and through the public consultation.',
  },
  {
    name: 'Gardens and landscape',
    fee: 'Fixed, from $3,800',
    body: 'Planting plans, paths, walls and garden structures, drawn by June and built by the landscapers we trust.',
  },
  {
    name: 'Feasibility study',
    fee: '$2,400, fixed',
    body: 'A site visit, three options in sketch, a cost range from our surveyor and what the planners are likely to say. Two weeks.',
  },
];

const STEPS = [
  {
    no: '1',
    title: 'First visit',
    time: 'Free, about two hours',
    body: 'We walk the site with you and listen to the brief, then tell you honestly whether you need an architect at all.',
  },
  {
    no: '2',
    title: 'Feasibility',
    time: '2 weeks, $2,400',
    body: 'Three options in sketch, a budget range from our surveyor and a view on planning, so you can decide before spending more.',
  },
  {
    no: '3',
    title: 'Design',
    time: '6-10 weeks',
    body: 'Drawings and a card model, revised twice. You sign off one scheme and its cost before we draw a single detail.',
  },
  {
    no: '4',
    title: 'Permits and tender',
    time: '8-12 weeks',
    body: 'Planning and building permits, the full set of drawings, and prices from three builders who know how we work.',
  },
  {
    no: '5',
    title: 'On site',
    time: 'Through to handover',
    body: 'A visit every week and a written note after each one. We come back a year after you move in to check on it.',
  },
];

const FAQS = [
  {
    q: 'Do you work outside the valley?',
    a: 'Within about an hour of the studio, because we visit every site once a week while it is being built. Further than that, we will recommend someone good.',
  },
  {
    q: 'What is the smallest job you take?',
    a: 'A garden room or a single-story extension. Below about $80,000 of building work our fee stops making sense for you, and we will say so.',
  },
  {
    q: 'How is the fee worked out?',
    a: 'As a percentage of the build cost at first, then fixed as a sum once the design is signed off, so it does not rise if the builder\'s price does.',
  },
  {
    q: 'Can we use our own builder?',
    a: 'Yes. We will still ask two others to price the same drawings, so you know the number you are given is a fair one.',
  },
  {
    q: 'Do you draw in 3D?',
    a: 'We model every building, and we still make a card model of the design you sign off. Most people understand the model faster than any drawing.',
  },
];

export default function FormAndFieldPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#eeedea',
        '--ink': '#151515',
        '--blue': '#3d5a80',
        '--gray': '#8d8c88',
        '--pale': '#d8d6d0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,blue,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300..700&family=Red+Hat+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markBox} aria-hidden="true" />
          <span data-edit="bar.text" data-edit-max="60">Form &amp; Field</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#contact">Start a project</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.intro} aria-labelledby="intro-h">
          <div className={s.introText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Architects, Alder Valley, since 2009</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="intro-h" className={s.title}>
              Buildings that sit <em>lightly</em> on their ground.
            </h1>
          </div>
          <div className={s.introSide}>
            <p data-edit="intro.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              A practice of seven. We design houses, extensions and small public
              buildings within an hour of the studio, and we stay on every job
              until the builder leaves.
            </p>
            <a data-edit="intro.introLink" data-edit-max="28" className={s.introLink} href="#projects">See the work</a>
          </div>
        </section>

        {/* ------------------------------------------------------ PROJECTS
            The gallery: a row of plates that scrolls sideways and snaps. */}
        <section id="projects" className={s.projects} aria-labelledby="projects-h">
          <div className={s.galleryHead}>
            <h2 data-edit="projects.galleryTitle" data-edit-max="60" id="projects-h" className={s.galleryTitle}>Selected work, 2019-2024</h2>
            <p data-edit="projects.galleryHint" data-edit-max="240" data-edit-multiline className={s.galleryHint}>Scroll sideways</p>
          </div>

          <ol className={s.gallery}>
            {PROJECTS.map((p, i) => (
              <li key={p.id} id={p.id} className={s.card}>
                <div className={`${s.plate} ${s[p.sky]}`}>
                  <span data-edit={`projects.plateNo.${i}`} data-edit-max="60" className={s.plateNo}>{p.no}</span>
                  <Artwork slug={p.art} alt={p.alt} inks={p.inks} className={s.building} />
                </div>
                <div className={s.caption}>
                  <h3 data-edit={`projects.cardName.${i}`} data-edit-max="40" className={s.cardName}>{p.name}</h3>
                  <dl className={s.cardFacts}>
                    <div>
                      <dt data-edit={`projects.term.${i}`} data-edit-max="28">Year</dt>
                      <dd data-edit={`projects.body.${i}`} data-edit-max="200" data-edit-multiline>{p.year}</dd>
                    </div>
                    <div>
                      <dt data-edit={`projects.term2.${i}`} data-edit-max="28">Place</dt>
                      <dd data-edit={`projects.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.place}</dd>
                    </div>
                    <div>
                      <dt data-edit={`projects.term3.${i}`} data-edit-max="28">Type</dt>
                      <dd data-edit={`projects.body3.${i}`} data-edit-max="200" data-edit-multiline>{p.kind}</dd>
                    </div>
                    <div>
                      <dt data-edit={`projects.term4.${i}`} data-edit-max="28">Area</dt>
                      <dd data-edit={`projects.body4.${i}`} data-edit-max="200" data-edit-multiline>{p.area}</dd>
                    </div>
                  </dl>
                  <p data-edit={`projects.cardNote.${i}`} data-edit-max="240" data-edit-multiline className={s.cardNote}>{p.note}</p>
                </div>
              </li>
            ))}
            <li id="on-the-boards" className={s.card}>
              <div className={`${s.plate} ${s.boards}`}>
                <span data-edit="projects.plateNo2" data-edit-max="60" className={s.plateNo}>04</span>
                <div data-edit-pattern="projects.field" data-edit-roles="transparent,2,3,4,2" className={s.boardsField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={isometricweave}
                    palette={BOARDS}
                    fit="grid"
                    cellSize={64}
                    seed="ff-boards"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <p data-edit="projects.boardsStamp" data-edit-max="240" data-edit-multiline className={s.boardsStamp}>On the boards</p>
              </div>
              <div className={s.caption}>
                <h3 data-edit="projects.cardName2" data-edit-max="40" className={s.cardName}>Valley School, phase two</h3>
                <dl className={s.cardFacts}>
                  <div>
                    <dt data-edit="projects.term5" data-edit-max="28">Year</dt>
                    <dd data-edit="projects.body5" data-edit-max="200" data-edit-multiline>On site 2027</dd>
                  </div>
                  <div>
                    <dt data-edit="projects.term6" data-edit-max="28">Place</dt>
                    <dd data-edit="projects.body6" data-edit-max="200" data-edit-multiline>School Lane, Alder Valley</dd>
                  </div>
                  <div>
                    <dt data-edit="projects.term7" data-edit-max="28">Type</dt>
                    <dd data-edit="projects.body7" data-edit-max="200" data-edit-multiline>Eight classrooms</dd>
                  </div>
                  <div>
                    <dt data-edit="projects.term8" data-edit-max="28">Area</dt>
                    <dd data-edit="projects.body8" data-edit-max="200" data-edit-multiline>14,800 sq ft</dd>
                  </div>
                </dl>
                <p data-edit="projects.cardNote2" data-edit-max="240" data-edit-multiline className={s.cardNote}>
                  Eight classrooms around a courtyard, each with its own door to
                  the outside. The drawings are at the town hall for comment
                  until November 14.
                </p>
              </div>
            </li>
          </ol>

          <ol className={s.index} aria-label="Projects in the gallery">
            {PROJECTS.map((p, i) => (
              <li key={p.id}>
                <a data-edit={`projects.link.${i}`} data-edit-max="28" href={`#${p.id}`}>{p.name}</a>
              </li>
            ))}
            <li>
              <a data-edit="projects.onTheBoards" data-edit-max="28" href="#on-the-boards">Valley School</a>
            </li>
          </ol>
        </section>

        {/* ------------------------------------------------------ PRACTICE
            The lattice panel is the page's one loud field. */}
        <section id="practice" className={s.practice} aria-labelledby="practice-h">
          <div data-edit-pattern="practice.field" data-edit-roles="transparent,4,0,3,4" className={s.weave} aria-hidden="true">
            <TabbiedPattern
              pattern={isometricweave}
              palette={WEAVE}
              fit="grid"
              cellSize={72}
              seed="ff-weave"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.practiceText}>
            <p data-edit="practice.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>The practice</p>
            <h2 data-edit="practice.secTitle" data-edit-max="60" id="practice-h" className={s.secTitle}>Seven people, one studio, and a site visit every week.</h2>
            <p data-edit="practice.body" data-edit-max="240" data-edit-multiline className={s.body}>
              We started in a room above the hardware store on Quarry Row and
              have not moved far. Everything we build is close enough to visit
              in an afternoon, which is the point: an architect who is on site
              every week catches the mistakes that cost money.
            </p>
            <p data-edit="practice.body2" data-edit-max="240" data-edit-multiline className={s.body}>
              We like concrete that shows how it was poured, brick that is
              repaired rather than replaced, and timber that is allowed to go
              gray. We do not have a house style, but people say they can tell.
            </p>
            <dl className={s.facts}>
              {FACTS.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`practice.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`practice.body3.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
            <ul className={s.people}>
              {PEOPLE.map(([n, r], i) => (
                <li key={n}>
                  <span data-edit={`practice.personName.${i}`} data-edit-max="60" className={s.personName}>{n}</span>
                  <span data-edit={`practice.personRole.${i}`} data-edit-max="60" className={s.personRole}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ SERVICES */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <p data-edit="services.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>What we take on</p>
            <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>Services and fees</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Fees are published because nobody should have to ask. Percentages
              are of the builder&apos;s price, before sales tax.
            </p>
          </div>
          <ul className={s.services}>
            {SERVICES.map((sv, i) => (
              <li key={sv.name} className={s.service}>
                <h3 data-edit={`services.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{sv.name}</h3>
                <p data-edit={`services.serviceFee.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceFee}>{sv.fee}</p>
                <p data-edit={`services.serviceBody.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceBody}>{sv.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- PROCESS */}
        <section id="process" className={s.process} aria-labelledby="process-h">
          <div data-edit-pattern="process.field" data-edit-roles="transparent,3,2,1,2,1" className={s.planBand} aria-hidden="true">
            <TabbiedPattern
              pattern={circuit}
              palette={PLAN}
              options={{ frequency: 0.75 }}
              fit="grid"
              cellSize={56}
              seed="ff-plan"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.processInner}>
            <div className={s.secHead}>
              <p data-edit="process.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>How we work</p>
              <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>Five stages, and a price at each one</h2>
              <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                You can stop after any stage and keep the drawings. About one
                client in ten does, usually after the feasibility study.
              </p>
            </div>
            <ol className={s.steps}>
              {STEPS.map((st, i) => (
                <li key={st.no} className={s.step}>
                  <span data-edit={`process.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{st.no}</span>
                  <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{st.title}</h3>
                  <p data-edit={`process.stepTime.${i}`} data-edit-max="240" data-edit-multiline className={s.stepTime}>{st.time}</p>
                  <p data-edit={`process.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{st.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.faqGrid}>
            <div className={s.faqSide}>
              <p data-edit="questions.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Questions</p>
              <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>Before you call</h2>
              <Artwork
                slug="form-and-field-pavilion"
                alt=""
                inks={['var(--ink)', 'var(--paper)']}
                className={s.faqArt}
              />
            </div>
            <div className={s.faqs}>
              {FAQS.map((f, i) => (
                <details key={f.q} className={s.faq}>
                  <summary data-edit={`questions.question.${i}`} data-edit-max="80">{f.q}</summary>
                  <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactText}>
            <p data-edit="contact.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Start a project</p>
            <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Tell us about the site</h2>
            <p data-edit="contact.body" data-edit-max="240" data-edit-multiline className={s.body}>
              A paragraph is enough. We reply within three working days to book
              the first visit, which is free.
            </p>
            <dl className={s.studio}>
              <div>
                <dt data-edit="contact.term" data-edit-max="28">Studio</dt>
                <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>14 Quarry Row, Alder Valley</dd>
              </div>
              <div>
                <dt data-edit="contact.term2" data-edit-max="28">Open</dt>
                <dd data-edit="contact.body3" data-edit-max="200" data-edit-multiline>Monday to Friday, 9 to 5:30</dd>
              </div>
              <div>
                <dt data-edit="contact.term3" data-edit-max="28">Call</dt>
                <dd data-edit="contact.body4" data-edit-max="200" data-edit-multiline>(555) 014-2290</dd>
              </div>
              <div>
                <dt data-edit="contact.term4" data-edit-max="28">Write</dt>
                <dd>
                  <a data-edit="contact.link" data-edit-max="28" href="mailto:studio@formandfield.example">studio@formandfield.example</a>
                </dd>
              </div>
            </dl>
          </div>
          <form className={s.form} action="#">
            <p className={s.field}>
              <label data-edit="contact.label" htmlFor="ff-name">Name</label>
              <input id="ff-name" name="name" type="text" autoComplete="name" />
            </p>
            <p className={s.field}>
              <label data-edit="contact.label2" htmlFor="ff-email">Email</label>
              <input id="ff-email" name="email" type="email" autoComplete="email" />
            </p>
            <p className={s.field}>
              <label data-edit="contact.label3" htmlFor="ff-kind">Project</label>
              <select id="ff-kind" name="kind" defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option>A new house</option>
                <option>An extension or renovation</option>
                <option>A garden or landscape</option>
                <option>A public or community building</option>
                <option>A feasibility study</option>
              </select>
            </p>
            <p className={s.field}>
              <label data-edit="contact.label4" htmlFor="ff-budget">Building budget</label>
              <select id="ff-budget" name="budget" defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option>Under $150,000</option>
                <option>$150,000 to $400,000</option>
                <option>$400,000 to $900,000</option>
                <option>Over $900,000</option>
                <option>Not sure yet</option>
              </select>
            </p>
            <p className={`${s.field} ${s.fieldWide}`}>
              <label data-edit="contact.label5" htmlFor="ff-site">Where is the site?</label>
              <input id="ff-site" name="site" type="text" placeholder="A street, or a description" />
            </p>
            <p className={`${s.field} ${s.fieldWide}`}>
              <label data-edit="contact.label6" htmlFor="ff-brief">The brief</label>
              <textarea id="ff-brief" name="brief" rows={5} placeholder="What you want to build, and why now" />
            </p>
            <button data-edit="contact.submit" data-edit-max="24" type="submit" className={s.submit}>Send the brief</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Form &amp; Field</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Architects and landscape designers. 14 Quarry Row, Alder Valley.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
            (555) 014-2290
            <br />
            studio@formandfield.example
          </p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional architecture practice. Projects, people and fees are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
