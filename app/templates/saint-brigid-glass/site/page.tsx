import { TabbiedPattern } from 'tabbied/react';
import { vitrail, ogee, lattice, haunch } from 'tabbied/patterns';
import s from './saint-brigid-glass.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'St Brigid Glass: Stained glass studio and restoration, Kilbarry',
  description:
    'Stained glass made and mended by hand in the old schoolroom on Chapel Lane, Kilbarry. Domestic panels, church and memorial windows, restoration, weekend and evening classes, and open studio Saturdays.',
};

/* Site colors: the lead, the clear glass, and the three pot-metal colors
   every window in the studio is cut from. The same hexes as the root rule
   in the stylesheet. */
const LEAD = '#17161c';
const CLEAR = '#eeece2';
const COBALT = '#2a4db0';
const RUBY = '#b3283d';
const AMBER = '#e8a93a';

/* The side lights of the hero window: mostly cobalt, as the heron's is. */
const SIDELIGHT = ['transparent', COBALT, AMBER, COBALT, RUBY];
/* The commission panes, one glass each. */
const ONION = [LEAD, AMBER, COBALT, CLEAR, RUBY, COBALT];
const JEWEL = ['transparent', RUBY, COBALT, AMBER, CLEAR];
const SPANDREL = [LEAD, COBALT, AMBER, RUBY, COBALT, CLEAR];
/* Quarries: the diamond panes of the restored window. */
const QUARRY = [LEAD, CLEAR, AMBER, CLEAR, CLEAR, COBALT];
/* The rose over the studio door, and the border at the foot of the page. */
const ROSE = ['transparent', RUBY, AMBER, COBALT, AMBER];
const BORDER = ['transparent', COBALT, RUBY, AMBER, COBALT];

const NAV = [
  ['Commissions', '#commissions'],
  ['Restoration', '#restoration'],
  ['The making', '#making'],
  ['Classes', '#classes'],
  ['Visit', '#visit'],
  ['Enquire', '#enquire'],
];

const HERO_FACTS = [
  ['Since', '1998, in Kilbarry'],
  ['Windows restored', '140 and counting'],
  ['Open studio', 'Every Saturday'],
];

const DOMESTIC = [
  ['Door and fanlight panels', '$900-2,400'],
  ['A single window panel', '$1,200-3,800'],
  ['Screens and room dividers', 'from $4,000'],
];

const CHURCH = [
  ['A two-light window', '$14,000-26,000'],
  ['A three-light east window', '$32,000-60,000'],
  ['Tracery and quatrefoils', 'from $3,500'],
];

const MEMORIAL = [
  ['A small memorial panel', '$2,200-4,500'],
  ['A lancet, with lettering', '$9,000-16,000'],
  ['Painted and fired inscriptions', 'from $380'],
];

type Step = { n: string; name: string; body: string };

const RESTORE: Step[] = [
  { n: 'I', name: 'Survey and rubbing', body: 'Every piece photographed and rubbed onto paper in place, so each one goes back exactly where it came from.' },
  { n: 'II', name: 'Out of the stone', body: 'The five lights came down in a day, crated flat, and travelled to the schoolroom at walking pace.' },
  { n: 'III', name: 'Releading', body: 'The 1893 lead had crept and bowed. We stripped it, cleaned every piece and releaded to the rubbing in new H-section came.' },
  { n: 'IV', name: 'Fourteen new quarries', body: 'Cracked diamond panes were replaced in mouth-blown glass matched by eye; the originals are kept, labelled, in the parish chest.' },
  { n: 'V', name: 'Protective glazing', body: 'A ventilated outer pane now takes the weather, so the old glass hangs dry and the church sees it rather than the guard.' },
];

const RESTORE_FIGURES = [
  ['1893', 'the window, by Lyle & Harte of Dublin'],
  ['1,240', 'pieces of glass, all numbered'],
  ['14', 'cracked quarries replaced'],
  ['11 weeks', 'from scaffold down to scaffold up'],
];

type Making = { n: string; name: string; body: string; slug?: string; alt?: string };

/* Steps 1-3 have a picture of the tool in an arch-topped pane; 4-6 are
   panes of colored glass with the words alone. */
const MAKING: Making[] = [
  {
    n: '1',
    name: 'Cut',
    body: 'Each piece is scored over the full-size drawing with a steel wheel, then broken along the line with the fingers or a pair of grozing pliers.',
    slug: 'saint-brigid-glass-cutter',
    alt: 'A glass cutter with a steel wheel and a turned wooden handle',
  },
  {
    n: '2',
    name: 'Lead',
    body: 'Strips of H-section lead came are stretched, cut and wrapped round each piece in turn, and the panel is held square with horseshoe nails.',
    slug: 'saint-brigid-glass-came',
    alt: 'A coil of lead came beside a few horseshoe nails',
  },
  {
    n: '3',
    name: 'Solder',
    body: 'Every joint where two cames meet is brushed with flux and soldered on both sides of the panel: about four hundred joints in a door panel.',
    slug: 'saint-brigid-glass-iron',
    alt: 'A soldering iron resting in its stand beside a spool of solder',
  },
  { n: '4', name: 'Cement', body: 'A black linseed putty is brushed under the flanges of the lead to seal the panel and stiffen it against the wind.' },
  { n: '5', name: 'Clean', body: 'Whiting soaks up the oil, a stiff brush polishes the lead to a dark shine, and the panel rests flat for a week.' },
  { n: '6', name: 'Install', body: 'Into the frame on a bed of mastic, with copper ties to the saddle bars on anything taller than a metre.' },
];

type Course = {
  name: string;
  when: string;
  price: string;
  body: string;
  dates: string[];
  places: string;
  glass: 'cobalt' | 'ruby';
};

const COURSES: Course[] = [
  {
    name: 'Weekend taster',
    when: 'Saturday and Sunday, 10:00-16:00',
    price: '$165',
    body: 'Cut, lead and solder a small panel of your own design, about 20 by 30 cm, and carry it home on Sunday afternoon. Lunch both days.',
    dates: ['17-18 October', '14-15 November', '5-6 December'],
    places: 'Six at the bench',
    glass: 'cobalt',
  },
  {
    name: 'Eight-week evenings',
    when: 'Tuesdays, 19:00-21:30',
    price: '$480',
    body: 'The whole craft, slowly: design, cartoon, cutting, leading, soldering and cementing, ending with a window-sized panel ready to hang.',
    dates: ['From 13 October', 'From 12 January', 'From 9 March'],
    places: 'Eight at the bench',
    glass: 'ruby',
  },
];

const CLASS_NOTES = [
  'All glass, lead and tools are ours to lend',
  'Closed shoes and long sleeves, please',
  'Ages 16 and up; no experience needed',
  'Gift vouchers for either course',
];

const HOURS = [
  ['Open studio', 'Saturday 10:00-16:00'],
  ['By appointment', 'Tuesday to Friday'],
  ['Closed', 'Sunday and Monday'],
];

export default function SaintBrigidGlassPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--lead': '#17161c',
        '--clear': '#eeece2',
        '--cobalt': '#2a4db0',
        '--ruby': '#b3283d',
        '--amber': '#e8a93a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="lead,clear,cobalt,ruby,amber"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&family=Alegreya:ital,wght@0,400..900;1,400..900&family=Alegreya+SC:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>St Brigid Glass</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Chapel Lane, Kilbarry</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Open studio Saturdays</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The window: the heron in its lancet between two side lights of
            patterned glass, with daylight glowing behind it. */}
        <section className={s.hero} aria-labelledby="sb-hero-h">
          <div className={s.heroText}>
            <p data-edit="sbHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Stained glass studio &amp; restoration</p>
            <h1 data-edit="sbHero.title" data-edit-max="70" id="sb-hero-h" className={s.title}>St Brigid Glass</h1>
            <p data-edit="sbHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              New windows cut, leaded and soldered by hand, and old ones taken
              down, mended and put back for another century. Three glaziers
              and an apprentice in the old schoolroom on Chapel Lane.
            </p>
            <p className={s.ctas}>
              <a data-edit="sbHero.btn" data-edit-max="28" className={s.btn} href="#enquire">Start a commission</a>
              <a data-edit="sbHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#classes">Learn the craft</a>
            </p>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`sbHero.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`sbHero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className={s.window}>
            <span className={s.glow} aria-hidden="true" />
            <div className={s.lights}>
              <div data-edit-pattern="sbHero.field" data-edit-roles="transparent,2,4,2,3" className={s.sideLight} aria-hidden="true">
                <TabbiedPattern
                  pattern={vitrail}
                  palette={SIDELIGHT}
                  fit="grid"
                  cellSize={30}
                  seed="brigid-light-left"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="saint-brigid-glass-heron"
                alt="A lancet window of a grey heron standing among reeds and water lilies, a sun behind its head"
                inks={{ red: 'var(--ruby)', blue: 'var(--cobalt)', yellow: 'var(--amber)', black: 'var(--lead)' }}
                className={s.heron}
              />
              <div data-edit-pattern="sbHero.field2" data-edit-roles="transparent,2,4,2,3" className={s.sideLight} aria-hidden="true">
                <TabbiedPattern
                  pattern={vitrail}
                  palette={SIDELIGHT}
                  fit="grid"
                  cellSize={30}
                  seed="brigid-light-right"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <span className={s.sill} aria-hidden="true" />
            <figcaption data-edit="sbHero.windowCap" data-edit-max="120" data-edit-multiline className={s.windowCap}>The Heron Window, 2024: a stair window for a house on the Kilbarry road.</figcaption>
          </figure>
        </section>

        {/* ---------------------------------------------------- COMMISSIONS
            Three lancets: patterned glass in the head, the words in clear
            glass below, all held in the came. */}
        <section id="commissions" className={s.sec} aria-labelledby="sb-com-h">
          <div className={s.secHead}>
            <p data-edit="commissions.secKey" data-edit-max="240" data-edit-multiline className={s.secKey}>Commissions</p>
            <h2 data-edit="commissions.title" data-edit-max="60" id="sb-com-h">Glass made for one opening</h2>
            <p data-edit="commissions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every commission starts with a visit: we measure the opening,
              look at the light at the time of day you use the room, and come
              back with a coloured drawing at one-tenth scale. The design fee
              of $250 comes off the price if you go ahead.
            </p>
          </div>

          <ul className={s.lancets}>
            <li className={s.lancet}>
              <div data-edit-pattern="commissions.field" data-edit-roles="0,4,2,1,3,2" className={s.lancetHead} aria-hidden="true">
                <TabbiedPattern
                  pattern={ogee}
                  palette={ONION}
                  fit="grid"
                  cellSize={36}
                  seed="brigid-domestic"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.lancetBody}>
                <p data-edit="commissions.lancetKey" data-edit-max="240" data-edit-multiline className={s.lancetKey}>For the house</p>
                <h3 data-edit="commissions.lancetTitle" data-edit-max="40" className={s.lancetTitle}>Domestic panels</h3>
                <p data-edit="commissions.lancetText" data-edit-max="240" data-edit-multiline className={s.lancetText}>Front doors, fanlights, stair windows and bathroom screens, in period styles or your own. Double-glazed units made up for modern frames.</p>
                <dl className={s.prices}>
                  {DOMESTIC.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`commissions.term.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`commissions.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
            <li className={s.lancet}>
              <div data-edit-pattern="commissions.field2" data-edit-roles="transparent,3,2,4,1" className={s.lancetHead} aria-hidden="true">
                <TabbiedPattern
                  pattern={vitrail}
                  palette={JEWEL}
                  fit="grid"
                  cellSize={34}
                  seed="brigid-church"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.lancetBody}>
                <p data-edit="commissions.lancetKey2" data-edit-max="240" data-edit-multiline className={s.lancetKey}>For the parish</p>
                <h3 data-edit="commissions.lancetTitle2" data-edit-max="40" className={s.lancetTitle}>Church windows</h3>
                <p data-edit="commissions.lancetText2" data-edit-max="240" data-edit-multiline className={s.lancetText}>New lights for old tracery, figurative or abstract, painted and fired in our kiln. We work with the architect and the diocesan committee from the first drawing.</p>
                <dl className={s.prices}>
                  {CHURCH.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`commissions.term2.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`commissions.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
            <li className={s.lancet}>
              <div data-edit-pattern="commissions.field3" data-edit-roles="0,2,4,3,2,1" className={s.lancetHead} aria-hidden="true">
                <TabbiedPattern
                  pattern={haunch}
                  palette={SPANDREL}
                  fit="grid"
                  cellSize={36}
                  seed="brigid-memorial"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.lancetBody}>
                <p data-edit="commissions.lancetKey3" data-edit-max="240" data-edit-multiline className={s.lancetKey}>For a life</p>
                <h3 data-edit="commissions.lancetTitle3" data-edit-max="40" className={s.lancetTitle}>Memorial windows</h3>
                <p data-edit="commissions.lancetText3" data-edit-max="240" data-edit-multiline className={s.lancetText}>A window in a church, a school hall or a home, with a name, dates and a line of your choosing painted into the glass. We will take our time with you.</p>
                <dl className={s.prices}>
                  {MEMORIAL.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`commissions.term3.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`commissions.body3.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          </ul>
        </section>

        {/* ---------------------------------------------------- RESTORATION
            A case study: the east window of St Senan's, releaded. */}
        <section id="restoration" className={s.sec} aria-labelledby="sb-res-h">
          <div className={s.secHead}>
            <p data-edit="restoration.secKey" data-edit-max="240" data-edit-multiline className={s.secKey}>Restoration</p>
            <h2 data-edit="restoration.title" data-edit-max="60" id="sb-res-h">The east window at St Senan&apos;s</h2>
            <p data-edit="restoration.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Leaded glass lasts about a hundred years before the lead gives
              up. This is what we did for the five lights over the altar at
              St Senan&apos;s in Ballyfinn, over the winter of 2025.
            </p>
          </div>

          <div className={s.caseStudy}>
            <figure className={s.quarries}>
              <div data-edit-pattern="restoration.field" data-edit-roles="0,1,4,1,1,2" className={s.quarryLight} aria-hidden="true">
                <TabbiedPattern
                  pattern={lattice}
                  palette={QUARRY}
                  fit="grid"
                  cellSize={40}
                  seed="brigid-quarries"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="restoration.quarryCap" data-edit-max="120" data-edit-multiline className={s.quarryCap}>The quarry light, releaded: clear diamonds with a pip of amber in each.</figcaption>
            </figure>

            <div className={s.caseText}>
              <dl className={s.figures}>
                {RESTORE_FIGURES.map(([figure, what], i) => (
                  <div key={figure}>
                    <dt data-edit={`restoration.term.${i}`} data-edit-max="28">{figure}</dt>
                    <dd data-edit={`restoration.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
              <ol className={s.restore}>
                {RESTORE.map((step, i) => (
                  <li key={step.n}>
                    <span data-edit={`restoration.restoreNo.${i}`} data-edit-max="60" className={s.restoreNo}>{step.n}</span>
                    <div>
                      <h3 data-edit={`restoration.restoreName.${i}`} data-edit-max="40" className={s.restoreName}>{step.name}</h3>
                      <p data-edit={`restoration.restoreBody.${i}`} data-edit-max="240" data-edit-multiline className={s.restoreBody}>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <blockquote className={s.quote}>
                <p data-edit="restoration.body2" data-edit-max="240" data-edit-multiline>It is our window again. The children notice the colours before the adults do.</p>
                <cite data-edit="restoration.attribution" data-edit-max="48">Fr. Declan Moran, parish priest</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- MAKING
            Six steps in a came grid: the tools in arch-topped panes, then
            three panes of colored glass. */}
        <section id="making" className={s.sec} aria-labelledby="sb-make-h">
          <div className={s.secHead}>
            <p data-edit="making.secKey" data-edit-max="240" data-edit-multiline className={s.secKey}>The making</p>
            <h2 data-edit="making.title" data-edit-max="60" id="sb-make-h">How a panel is made</h2>
            <p data-edit="making.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The same six steps since the twelfth century, give or take the
              electric iron. A door panel takes about three weeks from the
              drawing to the fixing.
            </p>
          </div>

          <ol className={s.steps}>
            {MAKING.map((m, i) => (
              <li key={m.n} className={m.slug ? s.step : `${s.step} ${s.stepGlass}`}>
                {m.slug ? (
                  <div className={s.pane}>
                    <Artwork slug={m.slug} alt={m.alt ?? ''} inks={['var(--on-clear)']} className={s.tool} />
                    <span data-edit={`making.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{m.n}</span>
                  </div>
                ) : (
                  <span data-edit={`making.stepBig.${i}`} data-edit-max="60" className={s.stepBig}>{m.n}</span>
                )}
                <div className={s.stepBody}>
                  <h3 data-edit={`making.stepName.${i}`} data-edit-max="40" className={s.stepName}>{m.name}</h3>
                  <p data-edit={`making.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="sb-class-h">
          <div className={s.secHead}>
            <p data-edit="classes.secKey" data-edit-max="240" data-edit-multiline className={s.secKey}>Classes</p>
            <h2 data-edit="classes.title" data-edit-max="60" id="sb-class-h">At the bench with us</h2>
            <p data-edit="classes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Taught at the long bench under the schoolroom&apos;s east
              windows by Orla Keane, who has been cutting glass here since
              the studio opened.
            </p>
          </div>

          <div className={s.courses}>
            {COURSES.map((c, i) => (
              <article key={c.name} className={`${s.course} ${s[c.glass]}`}>
                <div className={s.courseHead}>
                  <h3 data-edit={`course.courseName.${i}`} data-edit-max="40" className={s.courseName}>{c.name}</h3>
                  <p data-edit={`course.coursePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.coursePrice}>{c.price}</p>
                </div>
                <p data-edit={`course.courseWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.courseWhen}>{c.when}</p>
                <p data-edit={`course.courseBody.${i}`} data-edit-max="240" data-edit-multiline className={s.courseBody}>{c.body}</p>
                <ul className={s.dates}>
                  {c.dates.map((d, i2) => (
                    <li data-edit={`course.item.${i}.${i2}`} data-edit-max="80" key={d}>{d}</li>
                  ))}
                </ul>
                <p data-edit={`course.places.${i}`} data-edit-max="240" data-edit-multiline className={s.places}>{c.places}</p>
              </article>
            ))}
            <ul className={s.classNotes}>
              {CLASS_NOTES.map((note, i) => (
                <li data-edit={`classes.item.${i}`} data-edit-max="80" key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="sb-visit-h">
          <div className={s.visit}>
            <div className={s.roseWrap}>
              <div data-edit-pattern="visit.field" data-edit-roles="transparent,3,4,2,4" className={s.rose} aria-hidden="true">
                <TabbiedPattern
                  pattern={vitrail}
                  palette={ROSE}
                  fit="grid"
                  cellSize={28}
                  seed="brigid-rose"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div className={s.visitText}>
              <p data-edit="visit.secKey" data-edit-max="240" data-edit-multiline className={s.secKey}>Visit the studio</p>
              <h2 data-edit="visit.visitTitle" data-edit-max="60" id="sb-visit-h" className={s.visitTitle}>Open studio Saturdays</h2>
              <p data-edit="visit.visitLede" data-edit-max="240" data-edit-multiline className={s.visitLede}>
                Come in off Chapel Lane any Saturday and watch the work on the
                benches: a window being releaded, a panel on the light table,
                glass going into the kiln. The morning light through the east
                windows is the best in Kilbarry.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.address}>
                <p data-edit="visit.addressLine" data-edit-max="240" data-edit-multiline className={s.addressLine}>The Old Schoolroom, Chapel Lane, Kilbarry</p>
                <p data-edit="visit.body2" data-edit-max="240" data-edit-multiline>Behind the church of St Brigid, through the green gate. Parking on the lane; the 22 bus stops at the church.</p>
                <p className={s.contactLine}>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550172216">(555) 017-2216</a>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:studio@stbrigidglass.example">studio@stbrigidglass.example</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- ENQUIRE */}
        <section id="enquire" className={s.sec} aria-labelledby="sb-enq-h">
          <form className={s.form} action="#">
            <div className={s.formHead}>
              <p data-edit="enquire.secKey" data-edit-max="240" data-edit-multiline className={s.secKey}>Enquire</p>
              <h2 data-edit="enquire.title" data-edit-max="60" id="sb-enq-h">Tell us about the window</h2>
              <p data-edit="enquire.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>A photograph of the opening, or of the damage, helps more than anything. We reply within a week and visit within the month.</p>
            </div>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label data-edit="enquire.label" htmlFor="sb-name">Name</label>
                <input id="sb-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label2" htmlFor="sb-email">Email</label>
                <input id="sb-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label3" htmlFor="sb-phone">Phone</label>
                <input id="sb-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label4" htmlFor="sb-kind">What is it</label>
                <select id="sb-kind" name="kind" defaultValue="domestic">
                  <option value="domestic">A domestic panel</option>
                  <option value="church">A church window</option>
                  <option value="memorial">A memorial window</option>
                  <option value="restore">Restoring an old window</option>
                  <option value="class">A class</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label5" htmlFor="sb-where">Where is the window</label>
                <input id="sb-where" name="where" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label6" htmlFor="sb-size">Roughly how big</label>
                <input id="sb-size" name="size" type="text" placeholder="e.g. 60 x 140 cm" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="enquire.label7" htmlFor="sb-message">Tell us more</label>
                <textarea id="sb-message" name="message" rows={4} />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="enquire.label8" htmlFor="sb-photo">Photographs</label>
                <input id="sb-photo" name="photo" type="file" accept="image/*" multiple />
              </div>
            </div>
            <button data-edit="enquire.submit" data-edit-max="24" className={s.submit} type="submit">Send the enquiry</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,2" className={s.footBorder} aria-hidden="true">
          <TabbiedPattern
            pattern={vitrail}
            palette={BORDER}
            fit="grid"
            cellSize={32}
            seed="brigid-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>St Brigid Glass</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional stained glass studio. The windows, churches, people and prices are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The heron window and the tools are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
