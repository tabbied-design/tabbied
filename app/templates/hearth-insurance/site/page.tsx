import { TabbiedPattern } from 'tabbied/react';
import { quilt } from 'tabbied/patterns';
import s from './hearth-insurance.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Hearth Insurance Agency: Independent insurance broker, Linden Street',
  description:
    'Hearth is an independent insurance agency on Linden Street. We compare eleven insurers for home, auto, business and life cover, explain what each policy leaves out, and stand beside you when you claim.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The quilt is
   the agency's mark: half-square patches in forest, brick, lamp ochre and
   sage, laid on a transparent ground so the cream between the patches reads
   as the stitching. It fills the house in the hero, runs as a band between
   the comparison and the claims desk, and edges the footer. */
const CREAM = '#f5efe2';
const FOREST = '#1f3b2d';
const BRICK = '#a8482f';
const OCHRE = '#d4a246';
const SAGE = '#8ea58c';

const PATCHES = ['transparent', FOREST, BRICK, OCHRE, SAGE];
const BAND = ['transparent', FOREST, SAGE, OCHRE, BRICK, SAGE];
const NIGHT = ['transparent', SAGE, BRICK, OCHRE, SAGE, CREAM];

const NAV = [
  ['Room by room', '#house'],
  ['Compare cover', '#compare'],
  ['Claims', '#claims'],
  ['Our agents', '#agents'],
  ['Insurers', '#insurers'],
  ['Get a quote', '#quote'],
];

type Room = { cover: string; pays: string; from: string; place: string };

/* The cross-section: each room of the house is the cover that protects it. */
const ROOMS: Room[] = [
  { place: 'bedroom', cover: 'Life and income', pays: 'Keeps the mortgage paid and the family in the house if you cannot work.', from: 'from $31 / mo' },
  { place: 'office', cover: 'Home business', pays: 'The laptop, the client files, and the courier who slips on your step.', from: 'from $18 / mo' },
  { place: 'living', cover: 'Contents', pays: 'Sofa to spoons, at what it costs to buy new, not what it would sell for.', from: 'from $22 / mo' },
  { place: 'kitchen', cover: 'Liability', pays: 'A guest burns a hand, a tree falls on next door. Legal costs included.', from: 'in every home policy' },
  { place: 'garage', cover: 'Auto', pays: 'Every car in the drive on one policy, teenage drivers included.', from: 'from $96 / mo' },
];

type Row = { label: string; basic: string; standard: string; full: string };

/* y = covered, n = not covered, a = add-on, s = separate policy. */
const COMPARE: Row[] = [
  { label: 'Fire, smoke and lightning', basic: 'y', standard: 'y', full: 'y' },
  { label: 'Wind, hail and falling trees', basic: 'y', standard: 'y', full: 'y' },
  { label: 'Theft and vandalism', basic: 'y', standard: 'y', full: 'y' },
  { label: 'Burst and frozen pipes', basic: 'y', standard: 'y', full: 'y' },
  { label: 'Anything not excluded by name', basic: 'n', standard: 'y', full: 'y' },
  { label: 'Contents at replacement cost', basic: 'n', standard: 'a', full: 'y' },
  { label: 'Accidental damage to contents', basic: 'n', standard: 'n', full: 'y' },
  { label: 'Sewer and drain backup', basic: 'a', standard: 'a', full: 'y' },
  { label: 'Hotel while the house is repaired', basic: 'y', standard: 'y', full: 'y' },
  { label: 'Flood', basic: 's', standard: 's', full: 's' },
  { label: 'Earthquake', basic: 's', standard: 's', full: 's' },
];

const MARK: Record<string, string> = {
  y: 'Covered',
  n: 'Not covered',
  a: 'Add-on',
  s: 'Separate policy',
};

const LEVELS = [
  { name: 'Basic', form: 'Form HO-2, named perils', price: '$64', liability: '$300,000' },
  { name: 'Standard', form: 'Form HO-3, the usual choice', price: '$81', liability: '$300,000' },
  { name: 'Complete', form: 'Form HO-5, open perils', price: '$112', liability: '$500,000' },
];

const CLAIM_STEPS = [
  ['Make it safe', 'Turn off the water or the power, get everyone out, call 911 if it is a fire or a break-in. Nothing else matters yet.'],
  ['Call us, not the insurer', 'Our claims line is answered day and night. We open the claim for you, in the right words, and give you a claim number within the hour.'],
  ['Photograph before you tidy', 'Every room, every damaged thing, the serial numbers where you can find them. Then move what you must to stop more damage.'],
  ['Keep every receipt', 'Hotel, meals, a plumber at 3 am, a tarp for the roof. Loss-of-use cover pays these back, but only with the paper.'],
  ['We come to the adjuster visit', 'One of us sits in when the insurer\'s adjuster walks the house, and reads the settlement offer before you sign it.'],
];

type Agent = { initials: string; name: string; role: string; license: string; knows: string; speaks: string; line: string; tel: string };

const AGENTS: Agent[] = [
  { initials: 'RM', name: 'Ruth Maddox', role: 'Principal agent, founded Hearth in 1987', license: '0044812', knows: 'Older houses, listed buildings, anything with a thatched or slate roof', speaks: 'English', line: '(555) 012-4411', tel: '+15550124411' },
  { initials: 'DO', name: 'Daniel Okafor', role: 'Commercial lines', license: '0391177', knows: 'Shops, cafes, contractors, and the home business that outgrew the spare room', speaks: 'English, Igbo', line: '(555) 012-4412', tel: '+15550124412' },
  { initials: 'LV', name: 'Lucia Vargas', role: 'Auto and home', license: '0527730', knows: 'Young drivers, second cars, bundling a house and three cars into one bill', speaks: 'English, Spanish', line: '(555) 012-4413', tel: '+15550124413' },
  { initials: 'TK', name: 'Tom Keller', role: 'Claims advocate', license: '0615029', knows: 'Fifteen years as an adjuster before he switched sides. He knows the other script.', speaks: 'English, German', line: '(555) 012-4414', tel: '+15550124414' },
];

const INSURERS = [
  ['Granite Mutual', 'Homes, since 1902'],
  ['Northfield Casualty', 'Auto and home'],
  ['Bayleaf Insurance', 'Older houses'],
  ['Prairie State', 'Farms and acreage'],
  ['Harbor & Main', 'Small business'],
  ['Clearwater Life', 'Term life'],
  ['Keystone General', 'High-value homes'],
  ['Union Fidelity', 'Renters'],
  ['Evergreen Auto', 'Young drivers'],
  ['Lantern Specialty', 'Flood policies'],
  ['Meridian Re', 'Umbrella policies'],
];

const HOURS = [
  ['Monday to Thursday', '8:30-5:30'],
  ['Friday', '8:30-4:00'],
  ['Saturday', '9:00-12:00, by appointment'],
  ['Claims line', 'Every hour of every day'],
];

export default function HearthInsurancePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&family=Libre+Franklin:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markName}>Hearth</span>
          <span className={s.markSub}>Insurance Agency</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barClaim} href="tel:+15550124400">Claims, 24 hours: (555) 012-4400</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The house is the quilt: a gabled silhouette with a chimney,
            cut out of the patchwork. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Independent insurance agency, 214 Linden Street, since 1987</p>
            <h1 id="hero-h" className={s.heroTitle}>
              We read the small print <em>so you can sleep.</em>
            </h1>
            <p className={s.heroLead}>
              Hearth is not an insurer. We work for you, not for them: we
              compare eleven companies, tell you plainly what each policy leaves
              out, and when something goes wrong, we are the ones who pick up.
            </p>
            <div className={s.heroActions}>
              <a className={s.button} href="#quote">Ask for a quote</a>
              <a className={s.ghost} href="#claims">Report a claim</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt>Insurers compared</dt>
                <dd>11</dd>
              </div>
              <div>
                <dt>Licensed agents</dt>
                <dd>4</dd>
              </div>
              <div>
                <dt>Average claim paid</dt>
                <dd>19 days</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroHouse}>
            <div className={s.houseQuilt} aria-hidden="true">
              <TabbiedPattern
                pattern={quilt}
                palette={PATCHES}
                fit="grid"
                cellSize={52}
                seed="hearth-house"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.houseCaption}>One policy per household, stitched together.</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOUSE
            A cross-section: the roof, two floors and a basement, each room
            labeled with the cover that looks after it. */}
        <section id="house" className={s.sec} aria-labelledby="house-h">
          <div className={s.secHead}>
            <h2 id="house-h" className={s.secTitle}>What is covered, room by room</h2>
            <p className={s.secNote}>
              Most households need four or five of these. Nobody needs all of
              them, and the right mix changes when you add a teenager, a home
              office or a basement flat.
            </p>
          </div>

          <div className={s.section}>
            <div className={s.roof}>
              <h3 className={s.roofCover}>Dwelling</h3>
              <p className={s.roofPays}>Rebuilds the house itself, roof to foundations, after fire, storm or a burst pipe.</p>
              <p className={s.roofFrom}>from $64 / mo</p>
            </div>
            <div className={s.floors}>
              {ROOMS.map((r) => (
                <div key={r.place} className={`${s.room} ${s[r.place]}`}>
                  <h3 className={s.roomCover}>{r.cover}</h3>
                  <p className={s.roomPays}>{r.pays}</p>
                  <p className={s.roomFrom}>{r.from}</p>
                </div>
              ))}
            </div>
            <div className={s.basement}>
              <h3 className={s.roomCover}>Flood and sewer backup</h3>
              <p className={s.roomPays}>
                Not in any standard home policy. Flood is a separate federal
                policy with a 30-day wait, so do not leave it until the forecast.
              </p>
              <p className={s.roomFrom}>from $38 / mo</p>
            </div>
          </div>
          <p className={s.umbrella}>
            Over the whole house: an umbrella policy adds $1,000,000 of liability
            on top of everything else, from $22 a month.
          </p>
        </section>

        {/* --------------------------------------------------------- COMPARE */}
        <section id="compare" className={s.sec} aria-labelledby="compare-h">
          <div className={s.secHead}>
            <h2 id="compare-h" className={s.secTitle}>Three levels of home cover, side by side</h2>
            <p className={s.secNote}>
              Monthly prices are for a three-bedroom house on Linden Street that
              would cost $350,000 to rebuild, with a $1,000 deductible. Yours
              will differ; the gaps between the columns will not.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.compare}>
              <caption className={s.srOnly}>What each level of home insurance covers</caption>
              <thead>
                <tr>
                  <th scope="col" className={s.rowHead}>Cover</th>
                  {LEVELS.map((l, i) => (
                    <th key={l.name} scope="col" className={i === 1 ? s.pick : undefined}>
                      <span className={s.levelName}>{l.name}</span>
                      <span className={s.levelForm}>{l.form}</span>
                      <span className={s.levelPrice}>{l.price}</span>
                      <span className={s.levelPer}>a month</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className={s.rowHead}>{r.label}</th>
                    <td className={s[`m${r.basic}`]}>{MARK[r.basic]}</td>
                    <td className={`${s[`m${r.standard}`]} ${s.pickCell}`}>{MARK[r.standard]}</td>
                    <td className={s[`m${r.full}`]}>{MARK[r.full]}</td>
                  </tr>
                ))}
                <tr className={s.liabilityRow}>
                  <th scope="row" className={s.rowHead}>Liability limit</th>
                  {LEVELS.map((l, i) => (
                    <td key={l.name} className={i === 1 ? s.pickCell : undefined}>{l.liability}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className={s.tableNote}>
            Most of our clients choose Standard with the replacement-cost and
            sewer backup add-ons: about $93 a month for the house above.
          </p>
        </section>

        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={quilt}
            palette={BAND}
            fit="grid"
            cellSize={44}
            seed="hearth-band-2"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- CLAIMS
            The dark room of the house: the claims desk, open all night. */}
        <section id="claims" className={s.claims} aria-labelledby="claims-h">
          <div className={s.claimsGrid}>
            <div className={s.claimsHead}>
              <h2 id="claims-h" className={s.claimsTitle}>When something goes wrong</h2>
              <p className={s.claimsLead}>
                A claim is where an agent earns the commission. Call us before you
                call anyone else, at any hour.
              </p>
              <p className={s.claimLine}>
                <a href="tel:+15550124400">(555) 012-4400</a>
              </p>
              <p className={s.claimSmall}>Answered by one of us, not a call center, 24 hours a day.</p>
              <div className={s.nightQuilt} aria-hidden="true">
                <TabbiedPattern
                  pattern={quilt}
                  palette={NIGHT}
                  fit="grid"
                  cellSize={40}
                  seed="hearth-night"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ol className={s.claimSteps}>
              {CLAIM_STEPS.map(([t, d], i) => (
                <li key={t}>
                  <span className={s.claimNo}>{i + 1}</span>
                  <h3 className={s.claimStep}>{t}</h3>
                  <p className={s.claimText}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- AGENTS */}
        <section id="agents" className={s.sec} aria-labelledby="agents-h">
          <div className={s.secHead}>
            <h2 id="agents-h" className={s.secTitle}>The agents</h2>
            <p className={s.secNote}>
              Four of us, each licensed in the state, each with a direct line.
              You will talk to the same person at renewal as at the first quote.
            </p>
          </div>
          <ul className={s.agents}>
            {AGENTS.map((a) => (
              <li key={a.name} className={s.agent}>
                <span className={s.monogram} aria-hidden="true">{a.initials}</span>
                <h3 className={s.agentName}>{a.name}</h3>
                <p className={s.agentRole}>{a.role}</p>
                <p className={s.agentKnows}>{a.knows}</p>
                <dl className={s.agentFacts}>
                  <div>
                    <dt>Speaks</dt>
                    <dd>{a.speaks}</dd>
                  </div>
                  <div>
                    <dt>License</dt>
                    <dd>{a.license}</dd>
                  </div>
                </dl>
                <a className={s.agentLine} href={`tel:${a.tel}`}>{a.line}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- INSURERS */}
        <section id="insurers" className={s.sec} aria-labelledby="insurers-h">
          <div className={s.insurersGrid}>
            <div>
              <h2 id="insurers-h" className={s.secTitle}>Who we compare</h2>
              <p className={s.secNote}>
                We hold agency contracts with eleven insurers, all rated A- or
                better. We are paid by them, a commission of 8 to 15 percent of
                your premium, and it is the same whichever one you choose.
                You pay nothing extra for us.
              </p>
            </div>
            <ul className={s.insurers}>
              {INSURERS.map(([n, d]) => (
                <li key={n}>
                  <span className={s.insName}>{n}</span>
                  <span className={s.insNote}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.sec} aria-labelledby="quote-h">
          <div className={s.quoteGrid}>
            <div className={s.quoteIntro}>
              <h2 id="quote-h" className={s.secTitle}>Ask for a quote</h2>
              <p className={s.secNote}>
                Send the basics and one of us calls within a working day. Or come
                to the kitchen-table review: once a year, forty minutes, every
                policy you hold, at our table or yours.
              </p>
              <h3 className={s.readyTitle}>Have these to hand</h3>
              <ul className={s.ready}>
                <li>Your current policy, or its declarations page</li>
                <li>The year the house was built, and when the roof was last replaced</li>
                <li>Every driver's license number and the cars' VINs</li>
                <li>Any claims in the last five years</li>
              </ul>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="hi-name">Name</label>
                <input id="hi-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="hi-phone">Phone</label>
                <input id="hi-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend>What to insure</legend>
                <div className={s.picks}>
                  <input id="hi-p1" type="checkbox" name="cover" value="home" />
                  <label htmlFor="hi-p1">Home</label>
                  <input id="hi-p2" type="checkbox" name="cover" value="renters" />
                  <label htmlFor="hi-p2">Renters</label>
                  <input id="hi-p3" type="checkbox" name="cover" value="auto" />
                  <label htmlFor="hi-p3">Auto</label>
                  <input id="hi-p4" type="checkbox" name="cover" value="business" />
                  <label htmlFor="hi-p4">Business</label>
                  <input id="hi-p5" type="checkbox" name="cover" value="life" />
                  <label htmlFor="hi-p5">Life</label>
                  <input id="hi-p6" type="checkbox" name="cover" value="umbrella" />
                  <label htmlFor="hi-p6">Umbrella</label>
                </div>
              </fieldset>
              <div className={s.field}>
                <label htmlFor="hi-zip">Zip code</label>
                <input id="hi-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" />
              </div>
              <div className={s.field}>
                <label htmlFor="hi-renew">Current policy renews</label>
                <input id="hi-renew" name="renews" type="date" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="hi-note">Anything worrying you</label>
                <textarea id="hi-note" name="note" rows={4} />
              </div>
              <button className={s.submit} type="submit">Send to the agency</button>
              <p className={s.formNote}>We never sell your details, and a quote commits you to nothing.</p>
            </form>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visit}>
            <h2 id="visit-h" className={s.visitTitle}>The office</h2>
            <div>
              <p className={s.address}>214 Linden Street, Old Mill District</p>
              <p className={s.addressNote}>The green door beside the bakery. Parking behind, step-free entrance from the lot.</p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <div>
              <p className={s.contact}>
                <a href="tel:+15550124410">(555) 012-4410</a>
              </p>
              <p className={s.contact}>
                <a href="mailto:office@hearthagency.example">office@hearthagency.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footQuilt} aria-hidden="true">
          <TabbiedPattern
            pattern={quilt}
            palette={PATCHES}
            fit="grid"
            cellSize={36}
            seed="hearth-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p className={s.footName}>Hearth Insurance Agency</p>
          <p>A fictional independent insurance agency. The agents, insurers, prices and address are invented, and nothing here is advice.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
