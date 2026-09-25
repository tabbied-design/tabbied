import { TabbiedPattern } from 'tabbied/react';
import { lobe, teardropleaves } from 'tabbied/patterns';
import s from './fernhill-gardens.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Fernhill Gardens: Landscaping and garden design, Fernhill',
  description:
    'Fernhill Gardens designs, builds and looks after gardens within fifteen miles of the Potting Yard. Month-by-month care, fixed-price maintenance plans and a free first visit.',
};

/* Site colors, the same hexes as the root rule. The leaf fields keep a
   transparent ground so the paper shows at their edges. */
const PAPER = '#F3F2EB';
const MOSS = '#4E7A3A';
const STONE = '#9A9A8A';
const PALE = '#E1E3D6';

const ARCH = ['transparent', PALE, MOSS];
const HEDGE = ['transparent', MOSS, PALE];
const BED = ['transparent', MOSS, PAPER, STONE];

const NAV = [
  ['The year', '#seasons'],
  ['Services', '#services'],
  ['Process', '#process'],
  ['Plans', '#plans'],
  ['Area', '#area'],
  ['Book a visit', '#contact'],
];

const FACTS = [
  ['2009', 'Planting since'],
  ['340', 'Gardens looked after'],
  ['15 mi', 'From the Potting Yard'],
];

/* The garden year. `now` marks the season the page is written in; move it
   when the season turns. */
const SEASONS = [
  { name: 'Winter', span: 2, now: false },
  { name: 'Spring', span: 3, now: false },
  { name: 'Summer', span: 3, now: false },
  { name: 'Autumn, now', span: 3, now: true },
  { name: 'Winter', span: 1, now: false },
];

const MONTHS = [
  { name: 'January', short: 'Jan', season: 'Winter', now: false, tasks: ['Drawings and plans', 'Prune fruit trees', 'Order bare-root stock'] },
  { name: 'February', short: 'Feb', season: 'Winter', now: false, tasks: ['Plant bare-root hedges', 'Lay paths and walls', 'Cut back grasses'] },
  { name: 'March', short: 'Mar', season: 'Spring', now: false, tasks: ['Mulch the borders', 'Divide perennials', 'Seed new lawns'] },
  { name: 'April', short: 'Apr', season: 'Spring', now: false, tasks: ['Plant shrubs and borders', 'First mow and feed', 'Sow meadows'] },
  { name: 'May', short: 'May', season: 'Spring', now: false, tasks: ['Plant summer pots', 'Stake tall perennials', 'Weed while it is small'] },
  { name: 'June', short: 'Jun', season: 'Summer', now: false, tasks: ['Clip hedges', 'Water new planting', 'Deadhead roses'] },
  { name: 'July', short: 'Jul', season: 'Summer', now: false, tasks: ['Build terraces', 'Summer-prune wisteria', 'Check irrigation'] },
  { name: 'August', short: 'Aug', season: 'Summer', now: false, tasks: ['Cut and rake meadows', 'Take cuttings', 'Survey autumn work'] },
  { name: 'September', short: 'Sep', season: 'Autumn', now: true, tasks: ['Sod and seed lawns', 'Plant perennials', 'Order spring bulbs'] },
  { name: 'October', short: 'Oct', season: 'Autumn', now: true, tasks: ['Plant bulbs', 'Plant new trees', 'Clear leaves weekly'] },
  { name: 'November', short: 'Nov', season: 'Autumn', now: true, tasks: ['Bare-root season opens', 'Mulch and protect', 'Last hedge cut'] },
  { name: 'December', short: 'Dec', season: 'Winter', now: false, tasks: ['Winter pruning', 'Check the drainage', 'Design visits'] },
];

type Service = {
  no: string;
  title: string;
  body: string;
  includes: string[];
  price: string;
  when: string;
  seed: string;
  frequency: number;
};

const SERVICES: Service[] = [
  {
    no: '01',
    title: 'Garden design',
    body: 'A measured survey, a planting plan and drawings you can build from, whether we do the building or someone else does. We design for the light your garden actually gets and the time you actually have.',
    includes: ['Site survey and soil test', 'Two layouts to choose between', 'Final plan at 1:50 with a planting list'],
    price: 'From $1,800',
    when: '3-5 weeks, any month',
    seed: 'fernhill-bed-01',
    frequency: 0.45,
  },
  {
    no: '02',
    title: 'Planting',
    body: 'Borders, hedges, trees and bulbs from two nurseries in the valley. The soil is improved before anything goes in, and every plant we put in the ground is guaranteed for a year.',
    includes: ['Plants chosen for your soil', 'Beds dug, fed and mulched', '12-month replacement guarantee'],
    price: 'From $14 per sq ft, plants included',
    when: 'Best September to April',
    seed: 'fernhill-bed-02',
    frequency: 0.6,
  },
  {
    no: '03',
    title: 'Paths, walls and terraces',
    body: 'Stone, brick and gravel laid to last, with the drainage worked out first so nothing puddles by the back door. We use local fieldstone wherever we can find enough of it.',
    includes: ['Dry-stone and mortared walls', 'Gravel and permeable paver paths', 'Raised beds in oak or stone'],
    price: 'Terraces from $95 per sq ft',
    when: '2-6 weeks, dry months',
    seed: 'fernhill-bed-03',
    frequency: 0.35,
  },
  {
    no: '04',
    title: 'Lawns and meadows',
    body: 'A new lawn from seed or sod, or a meadow that is mown twice a year and hums all summer. We level, grade and feed the ground first, which is most of the work and all of the difference.',
    includes: ['Ground leveled and graded', 'Seed, sod or wildflower mixes', 'First cut and feed included'],
    price: 'Sod from $3.20 per sq ft',
    when: 'September or April',
    seed: 'fernhill-bed-04',
    frequency: 0.75,
  },
  {
    no: '05',
    title: 'Trees and hedges',
    body: 'Formative pruning, crown lifting, new hedges and careful removals by a certified arborist. Everything we cut is chipped and taken away, or left in a neat pile for your own compost if you ask.',
    includes: ['ISA-certified arborist on every job', 'All waste chipped and removed', 'Stump grinding on request'],
    price: 'From $420 a day for two',
    when: 'Pruning November to March',
    seed: 'fernhill-bed-05',
    frequency: 0.55,
  },
];

const STEPS = [
  {
    no: '1',
    title: 'First visit',
    time: 'Free, about an hour',
    body: 'We walk the garden with you, look at the soil and the light, and listen. You get a short note afterward with what we would do first.',
  },
  {
    no: '2',
    title: 'Survey and brief',
    time: 'Week 1-2',
    body: 'Levels, boundaries, drains and trees are measured, and we agree a written brief and a budget range before any drawing starts.',
  },
  {
    no: '3',
    title: 'Design and quote',
    time: 'Week 3-5',
    body: 'Two layouts, then one plan. The quote is itemized and fixed, and it only changes if you change the plan.',
  },
  {
    no: '4',
    title: 'Build',
    time: 'Week 6-10',
    body: 'Groundwork, drainage, paths and walls. The same crew stays on the job from start to finish, and the site is swept every evening.',
  },
  {
    no: '5',
    title: 'Planting and aftercare',
    time: 'In season',
    body: 'Planting goes in when the weather is right, not when the calendar says. We come back at six weeks and at six months to check on it.',
  },
];

const PLANS = [
  {
    name: 'Tidy',
    blurb: 'Lawn, edges and a general tidy, for a small garden that is mostly grass.',
    visits: '1 visit a month',
    hours: '3 hours',
    price: '$145',
    featured: false,
  },
  {
    name: 'Seasonal',
    blurb: 'Borders weeded, deadheaded and cut back in season, hedges twice a year, lawn cut and fed.',
    visits: '2 visits a month',
    hours: '4 hours',
    price: '$290',
    featured: true,
  },
  {
    name: 'Kept',
    blurb: 'A gardener who knows your garden, every week, with pruning, planting and pots included.',
    visits: 'Weekly',
    hours: '4 hours',
    price: '$560',
    featured: false,
  },
];

const PLAN_NOTES = [
  'Green waste removal is included on every plan.',
  'Plants, mulch and feed are charged at nursery cost, no markup.',
  'Pause the plan for up to two months a year at no charge.',
  'Cancel with one month of notice. There is no minimum term.',
];

const AREA_FREE = ['Fernhill', 'Ashby Cross', 'Millbrook', 'Low Common', 'Dene Valley', 'Orchard End'];
const AREA_FAR = ['Harlow Green', 'Stoneleigh', 'Upper Weald', 'Cressing', 'Marsh Lane', 'Kettle Bridge'];

const HOURS = [
  ['Monday-Friday', '8am-5pm'],
  ['Saturday, March-October', '9am-noon'],
  ['Sunday', 'Closed'],
];

export default function FernhillGardensPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Young+Serif&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markName}>Fernhill Gardens</span>
          <span className={s.markSub}>Landscaping and design</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The words on the left, and an arch of outlined leaves on the
            right, like a view through a garden gate. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Landscaping and garden design in Fernhill and the valley</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Gardens planned for <em>every month of the year.</em>
            </h1>
            <p className={s.heroLede}>
              We design, build and look after gardens within fifteen miles of
              the Potting Yard. A garden is a year-long thing, so we plan it
              that way: what grows, what flowers, and what needs doing, month
              by month.
            </p>
            <div className={s.actions}>
              <a className={s.btn} href="#contact">Book a free garden visit</a>
              <a className={s.btnQuiet} href="#seasons">See the garden year</a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([v, k]) => (
                <div key={k}>
                  <dt>{v}</dt>
                  <dd>{k}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.arch} aria-hidden="true">
            <TabbiedPattern
              pattern={teardropleaves}
              palette={ARCH}
              options={{ frequency: 0.8 }}
              fit="grid"
              cellSize={120}
              seed="fernhill-arch"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* --------------------------------------------------------- SEASONS
            Twelve months in one strip, the season running above them, and
            the season we are in picked out in the pale tint. */}
        <section id="seasons" className={s.seasons} aria-labelledby="seasons-h">
          <div className={s.secHead}>
            <span className={s.secNo}>01</span>
            <h2 id="seasons-h">The garden year</h2>
            <p className={s.secNote}>
              What we are doing in gardens like yours, month by month. It is
              autumn now, the best time of year to plant trees, lay a lawn and
              put in next spring's bulbs.
            </p>
          </div>
          <ol className={s.seasonRow} aria-hidden="true">
            {SEASONS.map((se, i) => (
              <li key={i} className={se.now ? s.seasonNow : s.season} style={{ gridColumn: `span ${se.span}` }}>
                <span>{se.name}</span>
              </li>
            ))}
          </ol>
          <ol className={s.months}>
            {MONTHS.map((m) => (
              <li key={m.name} className={m.now ? s.monthNow : s.month}>
                <h3 className={s.monthName} title={m.name}>{m.short}</h3>
                <span className={s.monthSeason}>{m.season}</span>
                <ul className={s.tasks}>
                  {m.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- SERVICES
            The zigzag: each service a row, its leaf bed on alternate sides. */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <span className={s.secNo}>02</span>
            <h2 id="services-h">What we do</h2>
            <p className={s.secNote}>
              Five kinds of work, usually in some combination. Prices are
              starting points; every job gets a fixed, itemized quote after
              the first visit.
            </p>
          </div>
          <div className={s.zigzag}>
            {SERVICES.map((sv) => (
              <article key={sv.no} className={s.svc}>
                <div className={s.svcPanel} aria-hidden="true">
                  <TabbiedPattern
                    pattern={lobe}
                    palette={BED}
                    options={{ frequency: sv.frequency }}
                    fit="grid"
                    cellSize={56}
                    seed={sv.seed}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.svcBody}>
                  <span className={s.svcNo}>{sv.no}</span>
                  <h3 className={s.svcTitle}>{sv.title}</h3>
                  <p className={s.svcText}>{sv.body}</p>
                  <ul className={s.svcList}>
                    {sv.includes.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <dl className={s.svcMeta}>
                    <div>
                      <dt>Price</dt>
                      <dd>{sv.price}</dd>
                    </div>
                    <div>
                      <dt>When</dt>
                      <dd>{sv.when}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- PROCESS */}
        <section id="process" className={s.sec} aria-labelledby="process-h">
          <div className={s.secHead}>
            <span className={s.secNo}>03</span>
            <h2 id="process-h">From first visit to planting</h2>
            <p className={s.secNote}>
              A new garden usually takes ten to twelve weeks from the first
              visit, and planting waits for the right weather.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map((st) => (
              <li key={st.no}>
                <span className={s.stepNo}>{st.no}</span>
                <h3>{st.title}</h3>
                <span className={s.stepTime}>{st.time}</span>
                <p>{st.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- PLANS */}
        <section id="plans" className={s.sec} aria-labelledby="plans-h">
          <div className={s.secHead}>
            <span className={s.secNo}>04</span>
            <h2 id="plans-h">Maintenance plans</h2>
            <p className={s.secNote}>
              The same gardener at every visit, on a day that suits you. Prices
              are per month for a garden up to a quarter acre; larger gardens
              are quoted.
            </p>
          </div>
          <ul className={s.plans}>
            <li className={s.planHead} aria-hidden="true">
              <span>Plan</span>
              <span>Visits</span>
              <span>Time each visit</span>
              <span>Per month</span>
            </li>
            {PLANS.map((p) => (
              <li key={p.name} className={p.featured ? s.planFeatured : s.plan}>
                <div className={s.planName}>
                  <h3>{p.name}</h3>
                  <p>{p.blurb}</p>
                </div>
                <span className={s.planVisits}>{p.visits}</span>
                <span className={s.planHours}>{p.hours}</span>
                <div className={s.planPrice}>
                  <strong>{p.price}</strong>
                  <span>per month</span>
                </div>
              </li>
            ))}
          </ul>
          <ul className={s.planNotes}>
            {PLAN_NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ AREA */}
        <section id="area" className={s.sec} aria-labelledby="area-h">
          <div className={s.secHead}>
            <span className={s.secNo}>05</span>
            <h2 id="area-h">Where we work</h2>
            <p className={s.secNote}>
              Everywhere within fifteen miles of the Potting Yard on Orchard
              Lane. Further out, we take on design work and larger builds.
            </p>
          </div>
          <div className={s.area}>
            <div>
              <h3 className={s.areaHead}>No travel charge</h3>
              <ul className={s.places}>
                {AREA_FREE.map((pl) => (
                  <li key={pl}>{pl}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={s.areaHead}>$30 a visit for travel</h3>
              <ul className={s.places}>
                {AREA_FAR.map((pl) => (
                  <li key={pl}>{pl}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={s.areaHead}>The Potting Yard</h3>
              <p className={s.yardAddr}>
                48 Orchard Lane
                <br />
                Fernhill
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactInner}>
            <div className={s.contactIntro}>
              <span className={s.secNo}>06</span>
              <h2 id="contact-h">Book a garden visit</h2>
              <p className={s.contactLede}>
                The first visit is free and takes about an hour. Tell us a
                little about the garden and we will call within two working
                days to find a time.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt>Call</dt>
                  <dd>(555) 014-2290</dd>
                </div>
                <div>
                  <dt>Write</dt>
                  <dd>
                    <a href="mailto:hello@fernhillgardens.example">hello@fernhillgardens.example</a>
                  </dd>
                </div>
                <div>
                  <dt>Visit</dt>
                  <dd>48 Orchard Lane, Fernhill</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="fg-name">Your name</label>
                <input id="fg-name" name="name" type="text" autoComplete="name" required />
              </div>
              <div className={s.field}>
                <label htmlFor="fg-phone">Phone</label>
                <input id="fg-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label htmlFor="fg-email">Email</label>
                <input id="fg-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className={s.field}>
                <label htmlFor="fg-town">Town or ZIP code</label>
                <input id="fg-town" name="town" type="text" autoComplete="postal-code" />
              </div>
              <div className={s.field}>
                <label htmlFor="fg-work">What you have in mind</label>
                <select id="fg-work" name="work" defaultValue="design">
                  <option value="design">A new garden design</option>
                  <option value="planting">Planting</option>
                  <option value="hard">Paths, walls or a terrace</option>
                  <option value="lawn">A lawn or meadow</option>
                  <option value="trees">Trees and hedges</option>
                  <option value="plan">A maintenance plan</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="fg-size">Size of the garden</label>
                <select id="fg-size" name="size" defaultValue="medium">
                  <option value="small">Small, a courtyard or yard</option>
                  <option value="medium">Medium, up to a quarter acre</option>
                  <option value="large">Large, more than a quarter acre</option>
                </select>
              </div>
              <div className={s.fieldWide}>
                <label htmlFor="fg-note">About the garden</label>
                <textarea id="fg-note" name="note" rows={4} />
              </div>
              <button className={s.btn} type="submit">Request a visit</button>
            </form>
          </div>
        </section>
      </main>

      {/* A hedge: the hero's leaves again, full width, before the footer. */}
      <div className={s.hedge} aria-hidden="true">
        <TabbiedPattern
          pattern={teardropleaves}
          palette={HEDGE}
          options={{ frequency: 0.9 }}
          fit="grid"
          cellSize={120}
          seed="fernhill-hedge"
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>Fernhill Gardens</p>
            <p className={s.footTag}>
              Landscaping and garden design, planned a month at a time.
            </p>
          </div>
          <ul className={s.footLinks}>
            <li><a href="#seasons">The garden year</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#process">How it works</a></li>
          </ul>
          <ul className={s.footLinks}>
            <li><a href="#plans">Maintenance plans</a></li>
            <li><a href="#area">Where we work</a></li>
            <li><a href="#contact">Book a visit</a></li>
          </ul>
          <p className={s.footAddr}>
            48 Orchard Lane, Fernhill
            <br />
            (555) 014-2290
            <br />
            hello@fernhillgardens.example
          </p>
        </div>
        <div className={s.footFine}>
          <p>A fictional landscaping company. Prices, places and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
