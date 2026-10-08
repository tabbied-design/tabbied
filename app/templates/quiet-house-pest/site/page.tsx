import { TabbiedPattern } from 'tabbied/react';
import { spray } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './quiet-house-pest.module.css';

export const metadata = {
  title: 'Quiet House Pest Control: Identify it first, then treat it quietly',
  description:
    'Quiet House is a licensed pest control company in Ashgrove County. An identification chart for what you are seeing, quarterly plans from $119 a visit, and plain notes on keeping children and pets safe.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Spray is the
   company's mark: a cone of color thrown from one edge, like the fan from a
   nozzle. It fills the magnifying lens in the hero, runs as a band under
   the chart, sits beside the safety notes, and edges the footer. */
const PAPER = '#f4f1e4';
const FOREST = '#1f3d2b';
const SIGNAL = '#e8b51e';
const RUST = '#c4502a';
const MOSS = '#6f8f4e';

const LENS = ['transparent', SIGNAL, RUST, MOSS, PAPER, MOSS];
const BAND = ['transparent', MOSS, SIGNAL, PAPER, RUST, MOSS];
const LIGHT = ['transparent', FOREST, MOSS, SIGNAL, RUST, FOREST];

const NAV = [
  ['Identify it', '#identify'],
  ['Plans', '#plans'],
  ['The year', '#year'],
  ['Children and pets', '#safe'],
  ['Book', '#book'],
];

type Pest = { no: string; seen: string; name: string; latin: string; means: string; treat: string; takes: string; level: string; kind: string };

/* The chart: what a caller describes, and what it turns out to be. */
const PESTS: Pest[] = [
  { no: 'No. 01', seen: 'A trail of tiny black ants along the counter, smelling of coconut when crushed', name: 'Odorous house ant', latin: 'Tapinoma sessile', means: 'A nest in a wall or under the slab, after sugar and water.', treat: 'Slow gel bait on the trail. No spray: it splits the colony.', takes: '7-10 days', level: 'Nuisance', kind: 'low' },
  { no: 'No. 02', seen: 'Small piles of sawdust under a window frame, large black ants at night', name: 'Carpenter ant', latin: 'Camponotus', means: 'Damp wood somewhere close. The ants are a moisture report.', treat: 'Find the nest, dust it, and show you the leak to fix.', takes: '1-2 visits', level: 'Damage', kind: 'mid' },
  { no: 'No. 03', seen: 'Droppings like dark rice grains in a drawer, scratching in the ceiling', name: 'House mouse', latin: 'Mus musculus', means: 'A gap the width of a pencil. Autumn is when they move in.', treat: 'Seal the entry points, then locked bait stations outside.', takes: '2-3 weeks', level: 'Health', kind: 'high' },
  { no: 'No. 04', seen: 'Pencil-wide mud tubes running up the foundation wall', name: 'Subterranean termite', latin: 'Reticulitermes', means: 'An active colony feeding on the house. Call this week.', treat: 'Soil treatment or a ring of monitored bait stations.', takes: 'Ongoing', level: 'Damage', kind: 'mid' },
  { no: 'No. 05', seen: 'Small brown insects running when the kitchen light goes on', name: 'German cockroach', latin: 'Blattella germanica', means: 'They live indoors near heat and water: under the fridge, the dishwasher.', treat: 'Gel bait in hinges and cracks, plus a growth regulator.', takes: '2-4 weeks', level: 'Health', kind: 'high' },
  { no: 'No. 06', seen: 'Itchy bites in a line, small rust spots on the mattress seams', name: 'Bed bug', latin: 'Cimex lectularius', means: 'Not dirt. They travel in luggage and second-hand furniture.', treat: 'Heat treatment of the room, a check of every bed.', takes: '1 day, rechecked', level: 'Health', kind: 'high' },
  { no: 'No. 07', seen: 'A grey paper comb under the eaves, wasps at the deck', name: 'Paper wasp', latin: 'Polistes', means: 'One queen in spring, a hundred workers by August.', treat: 'Nest removed at dusk, when they are all home.', takes: 'One visit', level: 'Nuisance', kind: 'low' },
  { no: 'No. 08', seen: 'Silver, fish-shaped insects in the bath or among old books', name: 'Silverfish', latin: 'Lepisma saccharina', means: 'Humidity above 75 percent. Harmless, but a sign of damp.', treat: 'Dust in the voids and a dehumidifier, more than a spray.', takes: '2-3 weeks', level: 'Nuisance', kind: 'low' },
];

type Plan = { name: string; price: string; per: string; lead: string; covers: string; note: string; pick: boolean };

const PLANS: Plan[] = [
  { name: 'Quarterly Home', price: '$119', per: 'a visit, four a year', lead: 'The everyday insects, kept outside the walls.', covers: 'Ants, spiders, cockroaches, silverfish, earwigs and centipedes. An exterior band every visit, inside on request.', note: 'Free return visits between quarters.', pick: false },
  { name: 'Quarterly Plus', price: '$149', per: 'a visit, four a year', lead: 'Everything in Home, plus what bites, stings and gnaws.', covers: 'Mice and rats with six locked bait stations, wasp and hornet nests, and a yearly termite inspection with a written report.', note: 'Our most chosen plan.', pick: true },
  { name: 'One visit', price: '$189', per: 'one pest, no contract', lead: 'A single problem, dealt with once.', covers: 'Identification, treatment and a follow-up call. If it comes back within 30 days, so do we, free.', note: 'Bed bugs and termites priced on inspection.', pick: false },
];

const YEAR = [
  ['Spring', 'March to May', 'Ants wake and trail indoors, wasp queens start nests, termites swarm on the first warm wet day.'],
  ['Summer', 'June to August', 'Wasp nests at full size, fleas in the yard, mosquitoes breeding in anything that holds water.'],
  ['Autumn', 'September to November', 'Mice look for a way in, spiders and stink bugs gather at sunny windows.'],
  ['Winter', 'December to February', 'Cockroaches near the heat, an attic and crawlspace check, every bait station refilled.'],
];

const SAFE = [
  ['Before we come', 'Put away pet bowls and toys. Cover the fish tank and switch off its air pump. Tell us about anyone pregnant, asthmatic or under two.'],
  ['While we work', 'Inside, gel baits go into cracks and locked stations, never a room spray. Outside, a band three feet up the wall. Children and pets stay in while we spray out.'],
  ['After we leave', 'The outside band dries in 30 minutes, then the yard is theirs again. Rooms treated with bait are usable straight away.'],
];

const HOURS = [
  ['Monday to Friday', '7:30-6:00'],
  ['Saturday', '8:00-1:00'],
  ['Wasp nests, May to September', 'Same day'],
];

export default function QuietHousePestPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f4f1e4',
        '--forest': '#1f3d2b',
        '--signal': '#e8b51e',
        '--rust': '#c4502a',
        '--moss': '#6f8f4e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,forest,signal,rust,moss"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,500;0,700;1,500&family=Archivo:wght@400;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Quiet House</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Pest Control</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550173300">(555) 017-3300</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: a magnifying lens over the pattern, and the specimen label. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Licensed pest control, Ashgrove County, since 2009</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Name the pest first. <em>Then</em> treat it quietly.
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Most calls describe the same dozen things. We identify yours on the
              phone or from a photo, tell you what it means for the house, and
              treat it with the least product that will work, where children and
              pets cannot reach it.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#book">Book an inspection, $65</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#identify">Use the chart</a>
            </div>
            <ul className={s.heroFacts}>
              <li data-edit="intro.item" data-edit-max="80">Inspection fee credited to any treatment</li>
              <li data-edit="intro.item2" data-edit-max="80">Six licensed applicators, no subcontractors</li>
              <li data-edit="intro.item3" data-edit-max="80">Free return visits between quarters</li>
            </ul>
          </div>

          <div className={s.loupe}>
            <div className={s.lens}>
              <div data-edit-pattern="intro.field" data-edit-roles="transparent,2,3,4,0,4" className={s.lensField} aria-hidden="true">
                <TabbiedPattern
                  pattern={spray}
                  palette={LENS}
                  fit="grid"
                  cellSize={56}
                  seed="quiet-house-lens"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <span className={s.handle} aria-hidden="true" />
            <div className={s.label}>
              <p data-edit="intro.labelNo" data-edit-max="240" data-edit-multiline className={s.labelNo}>Specimen 05</p>
              <p data-edit="intro.labelName" data-edit-max="240" data-edit-multiline className={s.labelName}>German cockroach</p>
              <p data-edit="intro.labelLatin" data-edit-max="240" data-edit-multiline className={s.labelLatin}>Blattella germanica</p>
              <p data-edit="intro.labelNote" data-edit-max="240" data-edit-multiline className={s.labelNote}>Seen: running when the kitchen light goes on. Treated: gel bait, no spray.</p>
            </div>
          </div>
        </section>

        {/* IDENTIFY: the chart, one card per thing people actually see. */}
        <section id="identify" className={s.sec} aria-labelledby="identify-h">
          <div className={s.secHead}>
            <p data-edit="identify.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chart 1</p>
            <h2 data-edit="identify.secTitle" data-edit-max="60" id="identify-h" className={s.secTitle}>What are you seeing?</h2>
            <p data-edit="identify.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Start with the left-hand line on each card, the thing you noticed.
              Not sure? Email a photo with a coin beside it and we will name it
              the same day, free.
            </p>
          </div>

          <ul className={s.chart}>
            {PESTS.map((p, i) => (
              <li key={p.no} className={s.card}>
                <div className={s.cardTop}>
                  <span data-edit={`identify.cardNo.${i}`} data-edit-max="60" className={s.cardNo}>{p.no}</span>
                  <span data-edit={`identify.level.${i}`} data-edit-max="60" className={`${s.level} ${s[p.kind]}`}>{p.level}</span>
                </div>
                <p data-edit={`identify.seen.${i}`} data-edit-max="240" data-edit-multiline className={s.seen}>{p.seen}</p>
                <h3 data-edit={`identify.cardName.${i}`} data-edit-max="40" className={s.cardName}>{p.name}</h3>
                <p data-edit={`identify.latin.${i}`} data-edit-max="240" data-edit-multiline className={s.latin}>{p.latin}</p>
                <dl className={s.facts}>
                  <div>
                    <dt data-edit={`identify.term.${i}`} data-edit-max="28">What it means</dt>
                    <dd data-edit={`identify.body.${i}`} data-edit-max="200" data-edit-multiline>{p.means}</dd>
                  </div>
                  <div>
                    <dt data-edit={`identify.term2.${i}`} data-edit-max="28">How we treat it</dt>
                    <dd data-edit={`identify.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.treat}</dd>
                  </div>
                  <div>
                    <dt data-edit={`identify.term3.${i}`} data-edit-max="28">Usually takes</dt>
                    <dd data-edit={`identify.body3.${i}`} data-edit-max="200" data-edit-multiline>{p.takes}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <div className={s.band}>
          <div data-edit-pattern="top.field" data-edit-roles="transparent,4,2,0,3,4" className={s.bandField} aria-hidden="true">
            <TabbiedPattern
              pattern={spray}
              palette={BAND}
              fit="grid"
              cellSize={64}
              seed="quiet-house-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <p data-edit="top.bandNote" data-edit-max="240" data-edit-multiline className={s.bandNote}>If they come back between visits, so do we. Free, as often as it takes.</p>
        </div>

        {/* PLANS */}
        <section id="plans" className={s.sec} aria-labelledby="plans-h">
          <div className={s.secHead}>
            <p data-edit="plans.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chart 2</p>
            <h2 data-edit="plans.secTitle" data-edit-max="60" id="plans-h" className={s.secTitle}>Quarterly plans</h2>
            <p data-edit="plans.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A visit every season, timed to what is waking up. Cancel any time
              with a month&apos;s notice; there is no annual contract.
            </p>
          </div>
          <ul className={s.plans}>
            {PLANS.map((p, i) => (
              <li key={p.name} className={p.pick ? `${s.plan} ${s.pick}` : s.plan}>
                <h3 data-edit={`plans.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                <p data-edit={`plans.planPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.planPrice}>{p.price}</p>
                <p data-edit={`plans.planPer.${i}`} data-edit-max="240" data-edit-multiline className={s.planPer}>{p.per}</p>
                <p data-edit={`plans.planLead.${i}`} data-edit-max="240" data-edit-multiline className={s.planLead}>{p.lead}</p>
                <p data-edit={`plans.planCovers.${i}`} data-edit-max="240" data-edit-multiline className={s.planCovers}>{p.covers}</p>
                <p data-edit={`plans.planNote.${i}`} data-edit-max="240" data-edit-multiline className={s.planNote}>{p.note}</p>
              </li>
            ))}
          </ul>
          <p data-edit="plans.plansFoot" data-edit-max="240" data-edit-multiline className={s.plansFoot}>
            The first visit on either plan is a longer service, $159, with a full
            inspection and every entry point sealed.
          </p>
        </section>

        {/* YEAR: what each quarterly visit looks for. */}
        <section id="year" className={s.sec} aria-labelledby="year-h">
          <div className={s.secHead}>
            <p data-edit="year.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chart 3</p>
            <h2 data-edit="year.secTitle" data-edit-max="60" id="year-h" className={s.secTitle}>What each visit looks for</h2>
            <p data-edit="year.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Pests keep a calendar. So do we: each visit is planned around what
              the season brings to an Ashgrove house.
            </p>
          </div>
          <ol className={s.year}>
            {YEAR.map(([season, months, text], i) => (
              <li key={season} className={s.season}>
                <h3 data-edit={`year.seasonName.${i}`} data-edit-max="40" className={s.seasonName}>{season}</h3>
                <p data-edit={`year.seasonMonths.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonMonths}>{months}</p>
                <p data-edit={`year.seasonText.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* SAFE: children and pets. */}
        <section id="safe" className={s.safe} aria-labelledby="safe-h">
          <div className={s.safeInner}>
            <div className={s.safeHead}>
              <h2 data-edit="safe.safeTitle" data-edit-max="60" id="safe-h" className={s.safeTitle}>Children, pets and the products we use</h2>
              <p data-edit="safe.safeLead" data-edit-max="240" data-edit-multiline className={s.safeLead}>
                Cats, birds and fish are more sensitive than dogs or people. Tell
                us who lives in the house and we change the products, not just the
                timing.
              </p>
              <div data-edit-pattern="safe.field" data-edit-roles="transparent,2,3,4,0,4" className={s.safeField} aria-hidden="true">
                <TabbiedPattern
                  pattern={spray}
                  palette={LENS}
                  fit="grid"
                  cellSize={44}
                  seed="quiet-house-safe"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ol className={s.safeSteps}>
              {SAFE.map(([title, text], i) => (
                <li key={title}>
                  <h3 data-edit={`safe.safeStep.${i}`} data-edit-max="40" className={s.safeStep}>{title}</h3>
                  <p data-edit={`safe.safeText.${i}`} data-edit-max="240" data-edit-multiline className={s.safeText}>{text}</p>
                </li>
              ))}
            </ol>
            <p data-edit="safe.safeNote" data-edit-max="240" data-edit-multiline className={s.safeNote}>
              Every product we use is named in your visit report, and its label
              and safety data sheet are left on your counter.
            </p>
          </div>
        </section>

        {/* BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.book}>
            <div>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book an inspection</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                $65, credited to any treatment you go ahead with. We usually come
                within two working days, sooner for wasps and anything biting.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Depot</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>Unit 4, 220 Fennimore Road, Ashgrove</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550173300">(555) 017-3300</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Photos</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:photos@quiethousepest.example">photos@quiethousepest.example</a>
                  </dd>
                </div>
              </dl>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="qh-name">Name</label>
                <input id="qh-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="qh-phone">Phone</label>
                <input id="qh-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label3" htmlFor="qh-address">Address of the house</label>
                <input id="qh-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="qh-pest">What you are seeing</label>
                <select id="qh-pest" name="pest" defaultValue="unsure">
                  <option value="unsure">Not sure yet</option>
                  <option value="ants">Ants</option>
                  <option value="mice">Mice or rats</option>
                  <option value="termites">Mud tubes or termites</option>
                  <option value="roaches">Cockroaches</option>
                  <option value="bedbugs">Bed bugs</option>
                  <option value="wasps">Wasps</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="qh-since">Since when</label>
                <input id="qh-since" name="since" type="text" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label6" htmlFor="qh-who">Children, pets or anyone sensitive at home</label>
                <textarea id="qh-who" name="who" rows={3} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request a visit</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,4,2,3,1" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={spray}
            palette={LIGHT}
            fit="grid"
            cellSize={36}
            seed="quiet-house-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Quiet House Pest Control</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional pest control company. The people, prices, license and
            address are invented. Always read a product&apos;s label before use.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
