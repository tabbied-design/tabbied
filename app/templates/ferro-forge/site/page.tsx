import { TabbiedPattern } from 'tabbied/react';
import { comet, sliver, radiance, drybrush } from 'tabbied/patterns';
import s from './ferro-forge.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Ferro Forge: Blacksmith and forging classes, Tannery Yard, Ironbridge Road',
  description:
    'Ferro Forge is a working smithy in Unit 4, Tannery Yard. Make a hook in a day, a knife in a weekend, or commission a gate. Classes, commissions, the forge, safety, gift vouchers and booking.',
};

/* Site colors: soot for the ground, ember and straw for the fire, steel
   for the cooled metal and ash for the light. The spark fields keep a
   transparent ground so the soot, or the shadow, shows between them. */
const SOOT = '#131110';
const EMBER = '#f2682b';
const STRAW = '#f0c85e';
const STEEL = '#4f6f8f';
const ASH = '#e8e1d5';

const SPARKS = ['transparent', EMBER, STRAW, STRAW, EMBER];
const SHADOW_SPARKS = ['transparent', EMBER, ASH, STRAW, EMBER];
const FILINGS = ['transparent', STRAW, EMBER, ASH, STRAW, STEEL];
const GLOW = ['transparent', EMBER, STRAW, EMBER, STEEL, EMBER];
const SCALE = ['transparent', STEEL, ASH, STEEL, SOOT, STEEL];
const TAG_SPARKS = ['transparent', STRAW, SOOT, EMBER, STRAW];
const FOOT_SPARKS = ['transparent', STEEL, ASH, EMBER, STEEL];

const NAV = [
  ['Classes', '#classes'],
  ['Commissions', '#commissions'],
  ['The forge', '#forge'],
  ['Safety', '#safety'],
  ['Vouchers', '#vouchers'],
  ['Book', '#book'],
];

/* The temper chart: the color polished steel turns as it is reheated,
   and what each is for. The page descends through it. */
const TEMPER = [
  { c: '220', name: 'Pale straw', use: 'razors and scrapers', band: 'tPale', href: '#classes', part: 'Classes' },
  { c: '240', name: 'Dark straw', use: 'drills and punches', band: 'tStraw', href: '#commissions', part: 'Commissions' },
  { c: '255', name: 'Bronze', use: 'axes and wood chisels', band: 'tBronze', href: '#forge', part: 'The forge' },
  { c: '270', name: 'Purple', use: 'cold chisels and knives', band: 'tPurple', href: '#safety', part: 'Safety' },
  { c: '290', name: 'Dark blue', use: 'springs and screwdrivers', band: 'tBlue', href: '#vouchers', part: 'Vouchers' },
  { c: '310', name: 'Pale blue', use: 'saws and spanners', band: 'tPaleBlue', href: '#book', part: 'Book' },
];

const HERO_FACTS = [
  ['4', 'coal and gas forges'],
  ['6', 'anvils, one each'],
  ['1 cwt', 'Massey power hammer'],
];

type Course = {
  code: string;
  name: string;
  length: string;
  make: string;
  price: string;
  dates: string[];
  left: string;
  steps: string[];
};

const COURSES: Course[] = [
  {
    code: 'CL-01',
    name: 'Make a hook',
    length: 'One day, 09:30-16:30',
    make: 'Three S-hooks and a twisted poker, drawn, scrolled and twisted from 10 mm bar.',
    price: '$120',
    dates: ['Sat 11 Oct', 'Sat 25 Oct', 'Sat 8 Nov', 'Sat 22 Nov'],
    left: '2 places on 11 Oct',
    steps: ['Light the fire', 'Draw a taper', 'Scroll and twist', 'Wax finish'],
  },
  {
    code: 'CL-02',
    name: 'Knife making',
    length: 'Two days, Sat and Sun',
    make: 'A 120 mm kitchen or camp knife from 1095 steel, hardened, tempered and handled in oak.',
    price: '$360',
    dates: ['18-19 Oct', '15-16 Nov', '6-7 Dec'],
    left: 'Full on 18-19 Oct',
    steps: ['Forge the blade', 'Normalise', 'Harden and temper', 'Grind and handle'],
  },
  {
    code: 'CL-03',
    name: 'Bladesmithing weekend',
    length: 'Three days, Fri to Sun',
    make: 'A pattern-welded blade: stack, forge-weld, fold and etch your own billet of 64 layers.',
    price: '$520',
    dates: ['31 Oct-2 Nov', '28-30 Nov'],
    left: '3 places on 31 Oct',
    steps: ['Stack and weld', 'Draw and fold', 'Forge to shape', 'Etch the pattern'],
  },
];

const COMMISSIONS = [
  { no: '01', name: 'Gates', note: 'Garden and drive gates, hung on forged pintles. Hot-dip galvanised and painted, or left to rust to a brown.', from: 'from $1,400', lead: '8-12 weeks' },
  { no: '02', name: 'Railings', note: 'Stair and balcony rails, and the missing lengths on old ones matched bar for bar.', from: 'from $380 a metre', lead: '6-10 weeks' },
  { no: '03', name: 'Fireplace tools', note: 'Poker, shovel, brush and tongs on a stand, with twisted or plain stems.', from: 'from $290 a set', lead: '3-4 weeks' },
  { no: '04', name: 'Door hardware', note: 'Thumb latches, strap hinges, pulls and knockers, drawn to your door.', from: 'from $85', lead: '3-6 weeks' },
];

const PROCESS = [
  ['Visit', 'Bring a drawing, a photograph or the measurements. We sketch it with you at the bench.'],
  ['Quote', 'A fixed price in writing within a week, with a drawing to scale.'],
  ['Forge', 'A deposit of a third starts the work. You can come and watch it made.'],
  ['Fit', 'We deliver and fit within 30 miles, or crate it for a courier.'],
];

const KIT = [
  { name: 'Coal forge', spec: 'Two side-blast hearths on welsh coke, hand-cranked blowers', note: 'Where every beginner starts.' },
  { name: 'Gas forges', spec: 'Two venturi forges, 1,300 C in fifteen minutes', note: 'For knives: an even heat along the blade.' },
  { name: 'Power hammer', spec: 'Massey 1 cwt, built in 1948, rebuilt in 2019', note: 'For drawing down bar the arm would take an hour over.' },
  { name: 'Anvils', spec: 'Six, from 75 to 150 kg, on oak stumps', note: 'One each, and each at your knuckle height.' },
];

const TOOLS = [
  'Cross-peen hammers, 800 g to 1.5 kg',
  'Flat, V-bit and wolf-jaw tongs',
  'Hardy cutters and fullers',
  'Swage block and cone mandrel',
  'Scroll wrenches and twisting forks',
  'Quench tank of warm canola',
  'Kiln for tempering, to 1 degree',
  'Belt grinder, 2 x 72',
];

const WEAR = [
  'Cotton or wool, long sleeves and long trousers',
  'Leather boots, steel toes if you have them',
  'Hair tied back, no loose scarves',
  'Old clothes: sparks leave little holes',
];

const PROVIDE = [
  'Safety glasses, which stay on all day',
  'Ear defenders for the power hammer',
  'A leather apron',
  'Gloves for handling only, never at the anvil',
];

const NEVER = [
  'Synthetics: fleece and nylon melt onto skin',
  'Open shoes or trainers with mesh',
  'Rings and watches at the anvil',
  'Picking up anything without asking if it is hot',
];

const VOUCHERS = [
  { amount: '$120', for: 'Make a hook', note: 'One day, one person' },
  { amount: '$360', for: 'Knife making', note: 'Two days, one person' },
  { amount: '$50+', for: 'Any amount', note: 'Toward any class or commission' },
];

export default function FerroForgePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--soot': '#131110',
        '--ember': '#f2682b',
        '--straw': '#f0c85e',
        '--steel': '#4f6f8f',
        '--ash': '#e8e1d5',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="soot,ember,straw,steel,ash"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Saira+Stencil+One&family=Kanit:wght@300;400;600&family=Sometype+Mono:wght@400;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Ferro Forge</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Unit 4, Tannery Yard</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Book a class</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The anvil by the fire, and its long shadow on the floor, cut out
            of the sparks. */}
        <section className={s.hero} aria-labelledby="ff-hero-h">
          <div data-edit-pattern="ffHero.field" data-edit-roles="transparent,1,2,2,1" className={s.sparks} aria-hidden="true">
            <TabbiedPattern
              pattern={comet}
              palette={SPARKS}
              options={{ frequency: 0.5 }}
              fit="grid"
              cellSize={40}
              seed="ferro-sparks"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <span className={s.glow} aria-hidden="true" />

          <div className={s.heroInner}>
            <div className={s.heroCopy}>
              <p data-edit="ffHero.tag" data-edit-max="240" data-edit-multiline className={s.tag}>Blacksmith and forging classes</p>
              <h1 id="ff-hero-h" className={s.title}>
                <span data-edit="ffHero.text" data-edit-max="60">Ferro</span>
                <span data-edit="ffHero.text2" data-edit-max="60">Forge</span>
              </h1>
              <p data-edit="ffHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                A working smithy under the railway arches in Tannery Yard. We
                make gates, railings and door hardware to order, and on
                weekends we hand you the hammer: a hook in a day, a knife in
                two.
              </p>
              <p className={s.actions}>
                <a data-edit="ffHero.btn" data-edit-max="28" className={s.btn} href="#classes">See the classes</a>
                <a data-edit="ffHero.btnLine" data-edit-max="28" className={s.btnLine} href="#commissions">Commission a piece</a>
              </p>
              <dl className={s.heroFacts}>
                {HERO_FACTS.map(([figure, what], i) => (
                  <div key={what}>
                    <dt data-edit={`ffHero.term.${i}`} data-edit-max="28">{figure}</dt>
                    <dd data-edit={`ffHero.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={s.stage}>
              <Artwork data-edit-pattern="ffHero.field2" data-edit-roles="transparent,1,4,2,1"
                slug="ferro-forge-anvil"
                alt=""
                mode="fill"
                inks={[]}
                className={s.shadow}>
                <TabbiedPattern
                  pattern={comet}
                  palette={SHADOW_SPARKS}
                  options={{ frequency: 0.9 }}
                  fit="grid"
                  cellSize={34}
                  seed="ferro-shadow"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </Artwork>
              <Artwork
                slug="ferro-forge-anvil"
                alt="A blacksmith's anvil on a thick wooden stump, a cross-peen hammer resting on its face"
                inks={['var(--anvil-dark)', 'var(--anvil-light)']}
                className={s.anvil}
              />
              <span className={s.floor} aria-hidden="true" />
            </div>
          </div>

          <nav className={s.chart} aria-label="The temper chart">
            <p data-edit="ffHero.chartHead" data-edit-max="240" data-edit-multiline className={s.chartHead}>Temper chart, polished steel</p>
            <ol className={s.chartList}>
              {TEMPER.map((t, i) => (
                <li key={t.c}>
                  <a className={`${s.swatch} ${s[t.band]}`} href={t.href}>
                    <span className={s.swC}>{`${t.c} C`}</span>
                    <span data-edit={`ffHero.swName.${i}`} data-edit-max="60" className={s.swName}>{t.name}</span>
                    <span data-edit={`ffHero.swPart.${i}`} data-edit-max="60" className={s.swPart}>{t.part}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="ff-classes-h">
          <p className={`${s.band} ${s.tPale}`}>
            <span data-edit="classes.bandC" data-edit-max="60" className={s.bandC}>220 C</span>
            <span data-edit="classes.bandName" data-edit-max="60" className={s.bandName}>Pale straw</span>
            <span data-edit="classes.bandUse" data-edit-max="60" className={s.bandUse}>For razors and scrapers</span>
          </p>
          <div className={s.inner}>
            <div className={s.head}>
              <h2 data-edit="classes.face" data-edit-max="60" id="ff-classes-h" className={s.face}>Classes</h2>
              <p data-edit="classes.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Six people, six anvils, two smiths. Every class starts with
                lighting the fire and ends with something you made, still warm
                in a paper bag. Ages 16 and up; no experience needed.
              </p>
            </div>

            <ul className={s.courses}>
              {COURSES.map((c, i) => (
                <li key={c.code} className={i === 0 ? `${s.course} ${s.courseHook}` : s.course}>
                  {i === 0 ? (
                    <div className={s.hookPanel}>
                      <div data-edit-pattern={`classes.field.${i}`} data-edit-roles="transparent,2,1,4,2,3" className={s.filings} aria-hidden="true">
                        <TabbiedPattern
                          pattern={sliver}
                          palette={FILINGS}
                          options={{ frequency: 0.5 }}
                          fit="grid"
                          cellSize={26}
                          seed="ferro-filings"
                          style={{ position: 'absolute', inset: 0 }}
                        />
                      </div>
                      <Artwork
                        slug="ferro-forge-hook"
                        alt="A hand-forged iron S-hook and a twisted fire poker lying side by side"
                        inks={['var(--ink-on-panel)']}
                        className={s.hook}
                      />
                    </div>
                  ) : null}
                  <div className={s.courseBody}>
                    <p data-edit={`classes.stencilTag.${i}`} data-edit-max="240" data-edit-multiline className={s.stencilTag}>{c.code}</p>
                    <h3 data-edit={`classes.courseName.${i}`} data-edit-max="40" className={s.courseName}>{c.name}</h3>
                    <p data-edit={`classes.courseLen.${i}`} data-edit-max="240" data-edit-multiline className={s.courseLen}>{c.length}</p>
                    <p data-edit={`classes.courseMake.${i}`} data-edit-max="240" data-edit-multiline className={s.courseMake}>{c.make}</p>
                    <ol className={s.steps}>
                      {c.steps.map((st, j) => (
                        <li key={st}>
                          <span className={s.stepN}>{String(j + 1)}</span>
                          <span data-edit={`classes.text.${i}.${j}`} data-edit-max="60">{st}</span>
                        </li>
                      ))}
                    </ol>
                    <ul className={s.dates}>
                      {c.dates.map((d, i2) => (
                        <li data-edit={`classes.item.${i}.${i2}`} data-edit-max="80" key={d}>{d}</li>
                      ))}
                    </ul>
                    <p className={s.coursePrice}>
                      <strong data-edit={`classes.emphasis.${i}`}>{c.price}</strong>
                      <span data-edit={`classes.text2.${i}`} data-edit-max="60">{c.left}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------- COMMISSIONS */}
        <section id="commissions" className={s.sec} aria-labelledby="ff-comm-h">
          <p className={`${s.band} ${s.tStraw}`}>
            <span data-edit="commissions.bandC" data-edit-max="60" className={s.bandC}>240 C</span>
            <span data-edit="commissions.bandName" data-edit-max="60" className={s.bandName}>Dark straw</span>
            <span data-edit="commissions.bandUse" data-edit-max="60" className={s.bandUse}>For drills and punches</span>
          </p>
          <div className={s.inner}>
            <div className={s.head}>
              <h2 data-edit="commissions.face" data-edit-max="60" id="ff-comm-h" className={s.face}>Commissions</h2>
              <p data-edit="commissions.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Everything is forged here, by hand and hammer, from bar we
                buy from the rolling mill at Wednesbury. No castings, no
                laser-cut blanks, no catalogue.
              </p>
            </div>

            <div className={s.commGrid}>
              <ul className={s.orders}>
                {COMMISSIONS.map((c, i) => (
                  <li key={c.no} className={s.order}>
                    <p data-edit={`commissions.orderNo.${i}`} data-edit-max="240" data-edit-multiline className={s.orderNo}>{c.no}</p>
                    <h3 data-edit={`commissions.orderName.${i}`} data-edit-max="40" className={s.orderName}>{c.name}</h3>
                    <p data-edit={`commissions.orderNote.${i}`} data-edit-max="240" data-edit-multiline className={s.orderNote}>{c.note}</p>
                    <p className={s.orderMeta}>
                      <span data-edit={`commissions.text.${i}`} data-edit-max="60">{c.from}</span>
                      <span data-edit={`commissions.text2.${i}`} data-edit-max="60">{c.lead}</span>
                    </p>
                  </li>
                ))}
              </ul>

              <aside className={s.process} aria-labelledby="ff-process-h">
                <div data-edit-pattern="ffProcess.field" data-edit-roles="transparent,1,2,1,3,1" className={s.mouth} aria-hidden="true">
                  <TabbiedPattern
                    pattern={radiance}
                    palette={GLOW}
                    fit="grid"
                    cellSize={36}
                    seed="ferro-mouth"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.processBody}>
                  <h3 data-edit="ffProcess.plate" data-edit-max="40" id="ff-process-h" className={s.plate}>How a commission goes</h3>
                  <ol className={s.processList}>
                    {PROCESS.map(([step, text], i) => (
                      <li key={step}>
                        <span className={s.processN}>{String(i + 1)}</span>
                        <span data-edit={`ffProcess.processStep.${i}`} data-edit-max="60" className={s.processStep}>{step}</span>
                        <span data-edit={`ffProcess.processText.${i}`} data-edit-max="60" className={s.processText}>{text}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- THE FORGE */}
        <section id="forge" className={s.sec} aria-labelledby="ff-forge-h">
          <p className={`${s.band} ${s.tBronze}`}>
            <span data-edit="forge.bandC" data-edit-max="60" className={s.bandC}>255 C</span>
            <span data-edit="forge.bandName" data-edit-max="60" className={s.bandName}>Bronze</span>
            <span data-edit="forge.bandUse" data-edit-max="60" className={s.bandUse}>For axes and wood chisels</span>
          </p>
          <div className={s.inner}>
            <div className={s.head}>
              <h2 data-edit="forge.face" data-edit-max="60" id="ff-forge-h" className={s.face}>The forge</h2>
              <p data-edit="forge.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Two railway arches knocked into one: 140 square metres of brick
                floor, a roller door onto the yard, and a chimney that has not
                gone out on a Saturday since 2016.
              </p>
            </div>

            <ul className={s.kit}>
              {KIT.map((k, i) => (
                <li key={k.name} className={s.kitItem}>
                  <p className={s.kitNo}>{`0${i + 1}`}</p>
                  <h3 data-edit={`forge.kitName.${i}`} data-edit-max="40" className={s.kitName}>{k.name}</h3>
                  <p data-edit={`forge.kitSpec.${i}`} data-edit-max="240" data-edit-multiline className={s.kitSpec}>{k.spec}</p>
                  <p data-edit={`forge.kitNote.${i}`} data-edit-max="240" data-edit-multiline className={s.kitNote}>{k.note}</p>
                </li>
              ))}
            </ul>

            <div className={s.rack}>
              <div data-edit-pattern="forge.field" data-edit-roles="transparent,3,4,3,0,3" className={s.scale} aria-hidden="true">
                <TabbiedPattern
                  pattern={drybrush}
                  palette={SCALE}
                  fit="grid"
                  cellSize={32}
                  seed="ferro-scale"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.rackBody}>
                <h3 data-edit="forge.plate" data-edit-max="40" className={s.plate}>On the tool wall</h3>
                <ul className={s.tools}>
                  {TOOLS.map((t, i) => (
                    <li data-edit={`forge.item.${i}`} data-edit-max="80" key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- SAFETY */}
        <section id="safety" className={s.sec} aria-labelledby="ff-safety-h">
          <p className={`${s.band} ${s.tPurple}`}>
            <span data-edit="safety.bandC" data-edit-max="60" className={s.bandC}>270 C</span>
            <span data-edit="safety.bandName" data-edit-max="60" className={s.bandName}>Purple</span>
            <span data-edit="safety.bandUse" data-edit-max="60" className={s.bandUse}>For cold chisels and knives</span>
          </p>
          <div className={s.inner}>
            <div className={s.head}>
              <h2 data-edit="safety.face" data-edit-max="60" id="ff-safety-h" className={s.face}>What to wear</h2>
              <p data-edit="safety.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Iron at a working heat looks black long before it is safe to
                touch. We run a short safety talk at the start of every class,
                and these are the rules of the arch.
              </p>
            </div>
            <div className={s.rules}>
              <div className={s.ruleCol}>
                <h3 data-edit="safety.ruleHead" data-edit-max="40" className={s.ruleHead}>Wear</h3>
                <ul>
                  {WEAR.map((w, i) => (
                    <li data-edit={`safety.item.${i}`} data-edit-max="80" key={w}>{w}</li>
                  ))}
                </ul>
              </div>
              <div className={s.ruleCol}>
                <h3 data-edit="safety.ruleHead2" data-edit-max="40" className={s.ruleHead}>We provide</h3>
                <ul>
                  {PROVIDE.map((w, i) => (
                    <li data-edit={`safety.item2.${i}`} data-edit-max="80" key={w}>{w}</li>
                  ))}
                </ul>
              </div>
              <div className={`${s.ruleCol} ${s.ruleNever}`}>
                <h3 data-edit="safety.ruleHead3" data-edit-max="40" className={s.ruleHead}>Never</h3>
                <ul>
                  {NEVER.map((w, i) => (
                    <li data-edit={`safety.item3.${i}`} data-edit-max="80" key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={s.warn}>
              <span className={s.warnSign} aria-hidden="true" />
              <span data-edit="safety.text" data-edit-max="60">Assume everything on the bench is hot. It usually is.</span>
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- VOUCHERS */}
        <section id="vouchers" className={s.sec} aria-labelledby="ff-vouchers-h">
          <p className={`${s.band} ${s.tBlue}`}>
            <span data-edit="vouchers.bandC" data-edit-max="60" className={s.bandC}>290 C</span>
            <span data-edit="vouchers.bandName" data-edit-max="60" className={s.bandName}>Dark blue</span>
            <span data-edit="vouchers.bandUse" data-edit-max="60" className={s.bandUse}>For springs and screwdrivers</span>
          </p>
          <div className={s.inner}>
            <div className={s.head}>
              <h2 data-edit="vouchers.face" data-edit-max="60" id="ff-vouchers-h" className={s.face}>Gift vouchers</h2>
              <p data-edit="vouchers.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Stamped by hand on a steel tag and posted in a paper envelope,
                or emailed the same day. Good for a year, for any class or
                toward a commission.
              </p>
            </div>
            <ul className={s.vouchers}>
              {VOUCHERS.map((v, i) => (
                <li key={v.for} className={s.voucher}>
                  {i === 1 ? (
                    <div data-edit-pattern={`vouchers.field.${i}`} data-edit-roles="transparent,2,0,1,2" className={s.tagSparks} aria-hidden="true">
                      <TabbiedPattern
                        pattern={comet}
                        palette={TAG_SPARKS}
                        options={{ frequency: 0.45 }}
                        fit="grid"
                        cellSize={30}
                        seed="ferro-tag"
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </div>
                  ) : null}
                  <span className={s.tagHole} aria-hidden="true" />
                  <p data-edit={`vouchers.tagAmount.${i}`} data-edit-max="240" data-edit-multiline className={s.tagAmount}>{v.amount}</p>
                  <p data-edit={`vouchers.tagFor.${i}`} data-edit-max="240" data-edit-multiline className={s.tagFor}>{v.for}</p>
                  <p data-edit={`vouchers.tagNote.${i}`} data-edit-max="240" data-edit-multiline className={s.tagNote}>{v.note}</p>
                  <p className={s.tagStamp}>{`FF-${String(2601 + i)}`}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="ff-book-h">
          <p className={`${s.band} ${s.tPaleBlue}`}>
            <span data-edit="book.bandC" data-edit-max="60" className={s.bandC}>310 C</span>
            <span data-edit="book.bandName" data-edit-max="60" className={s.bandName}>Pale blue</span>
            <span data-edit="book.bandUse" data-edit-max="60" className={s.bandUse}>For saws and spanners</span>
          </p>
          <div className={s.inner}>
            <div className={s.bookGrid}>
              <div className={s.bookText}>
                <h2 data-edit="book.face" data-edit-max="60" id="ff-book-h" className={s.face}>Book</h2>
                <p data-edit="book.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                  Tell us which class and which date. We hold your place for
                  three days while you pay the deposit, and send the kit list
                  and directions a week before.
                </p>
                <dl className={s.where}>
                  <div>
                    <dt data-edit="book.term" data-edit-max="28">Address</dt>
                    <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>Unit 4, Tannery Yard, Ironbridge Road</dd>
                  </div>
                  <div>
                    <dt data-edit="book.term2" data-edit-max="28">Getting here</dt>
                    <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Through the yard gate by the Tannery Arms; we are the arch with the roller door open. Parking in the yard.</dd>
                  </div>
                  <div>
                    <dt data-edit="book.term3" data-edit-max="28">Open</dt>
                    <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>Tuesday to Friday 08:00-17:00 for commissions; classes on weekends</dd>
                  </div>
                  <div>
                    <dt data-edit="book.term4" data-edit-max="28">Phone</dt>
                    <dd><a data-edit="book.link" data-edit-max="28" href="tel:+15550173390">(555) 017-3390</a></dd>
                  </div>
                  <div>
                    <dt data-edit="book.term5" data-edit-max="28">Email</dt>
                    <dd><a data-edit="book.link2" data-edit-max="28" href="mailto:anvil@ferroforge.example">anvil@ferroforge.example</a></dd>
                  </div>
                </dl>
              </div>

              <form className={s.form} action="#">
                <p data-edit="book.stencilTag" data-edit-max="240" data-edit-multiline className={s.stencilTag}>Booking slip</p>
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label data-edit="book.label" htmlFor="ff-name">Name</label>
                    <input id="ff-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label2" htmlFor="ff-email">Email</label>
                    <input id="ff-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label3" htmlFor="ff-class">Class</label>
                    <select id="ff-class" name="class" defaultValue="hook">
                      <option value="hook">Make a hook, $120</option>
                      <option value="knife">Knife making, $360</option>
                      <option value="blade">Bladesmithing weekend, $520</option>
                      <option value="voucher">A gift voucher</option>
                      <option value="commission">A commission</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label4" htmlFor="ff-date">Preferred date</label>
                    <input id="ff-date" name="date" type="date" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label5" htmlFor="ff-people">People</label>
                    <input id="ff-people" name="people" type="number" min={1} max={6} defaultValue={1} />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label6" htmlFor="ff-hand">Left or right handed</label>
                    <select id="ff-hand" name="hand" defaultValue="right">
                      <option value="right">Right</option>
                      <option value="left">Left</option>
                    </select>
                  </div>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label data-edit="book.label7" htmlFor="ff-notes">Anything we should know</label>
                    <textarea id="ff-notes" name="notes" rows={3} />
                  </div>
                </div>
                <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Strike while it is hot</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={`${s.band} ${s.tGrey}`}>
          <span data-edit="footer.bandC" data-edit-max="60" className={s.bandC}>330 C</span>
          <span data-edit="footer.bandName" data-edit-max="60" className={s.bandName}>Grey</span>
          <span data-edit="footer.bandUse" data-edit-max="60" className={s.bandUse}>Too soft for anything: harden and start again</span>
        </p>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,1,3" className={s.footSparks} aria-hidden="true">
          <TabbiedPattern
            pattern={comet}
            palette={FOOT_SPARKS}
            options={{ frequency: 0.4 }}
            fit="grid"
            cellSize={32}
            seed="ferro-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Ferro Forge</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional smithy. The classes, commissions, prices and dates are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The anvil and the hook are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
