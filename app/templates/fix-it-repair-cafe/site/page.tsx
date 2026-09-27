import { TabbiedPattern } from 'tabbied/react';
import { halving, bracket, rebate, notch } from 'tabbied/patterns';
import s from './fix-it-repair-cafe.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Fix-It Saturday: Community repair cafe, St Anne\'s church hall, Millbrook',
  description:
    'A free repair cafe on the first Saturday of every month. Bring a broken toaster, lamp, bike or jacket and mend it with a volunteer fixer. Dates, house rules, the tool library and how to join the fixers.',
};

/* Site colors. The joinery patterns keep a transparent ground, so the
   paper of the manual shows between the blocks. */
const PAPER = '#f6f6f2';
const INK = '#121212';
const BLUE = '#1f57c3';
const YELLOW = '#f6c400';

const COVER = ['transparent', BLUE, YELLOW, BLUE, INK, BLUE];
const CREW = ['transparent', YELLOW, INK, BLUE, INK];
const PEGBOARD = ['transparent', INK, BLUE, INK, YELLOW, INK];
const STREETS = ['transparent', INK, INK, BLUE, INK, INK];
const HARDWARE = ['transparent', YELLOW, BLUE, INK, YELLOW, PAPER];

const NAV = [
  ['How it works', '#how'],
  ['What we fix', '#fix'],
  ['Dates', '#dates'],
  ['Fixers', '#fixers'],
  ['Rules', '#rules'],
  ['Tools', '#tools'],
  ['Find us', '#find'],
];

const COVER_FACTS = [
  ['When', 'First Saturday of the month, 10:00-13:00'],
  ['Where', 'St Anne\'s church hall, Bridge Road, Millbrook'],
  ['Cost', 'Nothing. The tea jar takes donations.'],
];

const KIT = [
  { count: 'x1', what: 'you', glyph: 'person' },
  { count: 'x1', what: 'broken thing', glyph: 'box' },
  { count: 'x0', what: 'money', glyph: 'coin' },
  { count: '3 h', what: 'on the day', glyph: 'clock' },
];

const STEPS = [
  { n: '1', title: 'Bring it', note: 'Carry it in, with its cable, charger or remote.', glyph: 'box' },
  { n: '2', title: 'Sign in', note: 'A host writes your repair ticket and finds a table.', glyph: 'ticket' },
  { n: '3', title: 'Fix it together', note: 'You sit with a fixer. You hold the torch; they explain.', glyph: 'pair' },
  { n: '4', title: 'Take it home', note: 'Working, or with the name of the part to order.', glyph: 'home' },
];

const PARTS = [
  { count: 'x1', name: 'Broken thing', note: 'Clean, please' },
  { count: 'x1', name: 'Its cable or charger', note: 'We cannot test without it' },
  { count: 'x1', name: 'The lost screw', note: 'If you still have it' },
  { count: 'x2', name: 'Items at most', note: 'So everyone gets a table' },
  { count: 'x0', name: 'Money', note: 'Parts at cost, if needed' },
];

type Panel = {
  n: string;
  title: string;
  slug: string;
  alt: string;
  fixed: string;
  of: string;
  caption: string;
};

const PANELS: Panel[] = [
  {
    n: '1',
    title: 'Toasters',
    slug: 'fix-it-repair-cafe-toaster',
    alt: 'An exploded drawing of a pop-up toaster: the casing lifted off, the heating elements and the lever',
    fixed: '45',
    of: '64',
    caption: 'Sticky levers, crumb trays, snapped elements. Kettles and irons at the same table.',
  },
  {
    n: '2',
    title: 'Lamps and cables',
    slug: 'fix-it-repair-cafe-lamp',
    alt: 'A table lamp with its base opened, the cord and a screwdriver beside it',
    fixed: '118',
    of: '134',
    caption: 'Rewiring, new switches and plugs, frayed flexes cut back and made safe.',
  },
  {
    n: '3',
    title: 'Bikes',
    slug: 'fix-it-repair-cafe-wheel',
    alt: 'A bicycle wheel with a tyre lever hooked under the tyre and a puncture patch',
    fixed: '97',
    of: '105',
    caption: 'Punctures, brakes, gears and chains. Bring the whole bike, not just the wheel.',
  },
  {
    n: '4',
    title: 'Clothes and textiles',
    slug: 'fix-it-repair-cafe-sewing',
    alt: 'A sewing machine with a folded jacket under its needle',
    fixed: '164',
    of: '172',
    caption: 'Zips, hems, holes and buttons. Two machines and a darning mushroom.',
  },
];

const RATES = [
  { table: 'Clothes and textiles', rate: 95, n: '172' },
  { table: 'Bikes', rate: 92, n: '105' },
  { table: 'Lamps and cables', rate: 88, n: '134' },
  { table: 'Toys', rate: 81, n: '37' },
  { table: 'Furniture', rate: 76, n: '29' },
  { table: 'Toasters and kettles', rate: 70, n: '64' },
  { table: 'Vacuum cleaners', rate: 61, n: '23' },
  { table: 'Laptops and phones', rate: 52, n: '48' },
];

const TOTALS = [
  ['612', 'things brought in during 2025'],
  ['498', 'went home working'],
  ['2.1 t', 'kept out of the bin'],
];

type Session = { d: string; m: string; note: string; crew: string; closed?: boolean };

const DATES: Session[] = [
  { d: '04', m: 'Oct', note: 'Autumn session, with a second bike stand in the car park.', crew: '14 fixers' },
  { d: '01', m: 'Nov', note: 'Lamps and lights table doubled for the dark evenings.', crew: '12 fixers' },
  { d: '06', m: 'Dec', note: 'Toys and fairy lights special. Carols at 12:30, optional.', crew: '16 fixers' },
  { d: '03', m: 'Jan', note: 'No session. The hall is booked for the pantomime.', crew: 'Closed', closed: true },
  { d: '07', m: 'Feb', note: 'Sewing and knitting, with the Millbrook Stitchers.', crew: '11 fixers' },
  { d: '07', m: 'Mar', note: 'Spring bikes. Bring the one that has been in the shed.', crew: '13 fixers' },
];

const SKILLS = [
  ['Electronics and soldering', 'x3'],
  ['Sewing machines', 'x2'],
  ['Hosts at the sign-in desk', 'x2'],
  ['Tea, cake and washing up', 'x2'],
  ['Bike mechanics', 'x1'],
  ['Woodwork and glue-ups', 'x1'],
];

const JOIN = [
  ['1', 'Come as a visitor', 'Bring something broken and watch how a table works.'],
  ['2', 'Shadow a fixer', 'One morning at somebody\'s elbow. No test at the end.'],
  ['3', 'Take a table', 'Your own table, your own tools or ours, once a month.'],
];

const RULES = [
  ['One or two items', 'Per visit, so everyone gets a table before 13:00.'],
  ['You stay with it', 'We mend with you, not for you. Nothing is left overnight.'],
  ['No guarantees', 'Fixers advise and you decide. A repair is at your own risk.'],
  ['Not at the tables', 'Gas appliances, microwaves, swollen batteries.'],
  ['Parts at cost', 'We say what a part costs before anybody fits it.'],
  ['Clean it first', 'Nobody wants to open a sticky blender.'],
];

type Tool = { name: string; stock: string; loan: string; kind: string };

const TOOLS: Tool[] = [
  { name: 'Cordless drill', stock: 'x3', loan: '7 days', kind: 'drill' },
  { name: 'Jigsaw', stock: 'x2', loan: '7 days', kind: 'jigsaw' },
  { name: 'Ladder, 3 m', stock: 'x2', loan: '3 days', kind: 'ladder' },
  { name: 'Hedge trimmer', stock: 'x1', loan: '3 days', kind: 'trimmer' },
  { name: 'Spirit level, 1 m', stock: 'x2', loan: '7 days', kind: 'level' },
  { name: 'Pipe wrench', stock: 'x2', loan: '7 days', kind: 'wrench' },
  { name: 'Sewing machine', stock: 'x1', loan: '14 days', kind: 'sewing' },
  { name: 'Paint roller kit', stock: 'x4', loan: '7 days', kind: 'roller' },
];

const LIBRARY = [
  ['Join', '$10 a year, at the desk on any Saturday.'],
  ['Borrow', 'Up to two tools at once, for the days shown.'],
  ['Collect', 'Saturdays at the hall, or Wednesdays 18:00-19:30 at the store.'],
];

const DIRECTIONS = [
  ['Bus', 'Routes 12 and 31 stop outside, at Bridge Road.'],
  ['Car', '20 spaces behind the hall, free on Saturdays.'],
  ['Bike', 'Racks by the door, and a pump you can use.'],
  ['Access', 'Step-free entrance on Church Lane; accessible toilet.'],
];

export default function FixItRepairCafePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f6f6f2',
        '--ink': '#121212',
        '--blue': '#1f57c3',
        '--yellow': '#f6c400',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,blue,yellow"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Encode+Sans:wdth,wght@75..125,100..900&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markGlyph} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Fix-It Saturday</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p className={s.barNext}>
          <span data-edit="bar.barNextLabel" data-edit-max="60" className={s.barNextLabel}>Next</span>
          <span data-edit="bar.text" data-edit-max="60">Sat 4 Oct</span>
        </p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ COVER
            The manual's cover: the name and the facts on the left, and on
            the right a panel of the lead pattern with the product drawing,
            the exploded toaster, in a white window. */}
        <section className={s.cover} aria-labelledby="cover-h">
          <div className={s.coverStrip}>
            <span data-edit="cover.text" data-edit-max="60">Repair cafe</span>
            <span data-edit="cover.text2" data-edit-max="60">Manual 09/2026</span>
            <span data-edit="cover.coverStripEnd" data-edit-max="60" className={s.coverStripEnd}>Millbrook</span>
          </div>

          <div className={s.coverGrid}>
            <div className={s.coverText}>
              <p data-edit="cover.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Community repair cafe</p>
              <h1 id="cover-h" className={s.title}>
                <span data-edit="cover.text3" data-edit-max="60">Fix-It</span>
                <span data-edit="cover.text4" data-edit-max="60">Saturday</span>
              </h1>
              <p data-edit="cover.lede" data-edit-max="240" data-edit-multiline className={s.lede}>Bring it broken. Mend it with a volunteer. Take it home working.</p>
              <dl className={s.coverFacts}>
                {COVER_FACTS.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`cover.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`cover.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.actions}>
                <a data-edit="cover.btn" data-edit-max="28" className={s.btn} href="#dates">See the next dates</a>
                <a data-edit="cover.btnLine" data-edit-max="28" className={s.btnLine} href="#fixers">Become a fixer</a>
              </div>
              <ul className={s.kit} aria-label="What the morning takes">
                {KIT.map((k, i) => (
                  <li key={k.what}>
                    <span className={`${s.glyph} ${s[k.glyph]}`} aria-hidden="true" />
                    <strong data-edit={`cover.emphasis.${i}`}>{k.count}</strong>
                    <span data-edit={`cover.text5.${i}`} data-edit-max="60">{k.what}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.coverPlate}>
              <div data-edit-pattern="cover.field" data-edit-roles="transparent,2,3,2,1,2" className={s.coverField} aria-hidden="true">
                <TabbiedPattern
                  pattern={halving}
                  palette={COVER}
                  options={{ frequency: 0.72 }}
                  fit="grid"
                  cellSize={40}
                  seed="fixit-cover"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figure className={s.coverWindow}>
                <span data-edit="cover.figNo" data-edit-max="60" className={s.figNo}>Fig. 1</span>
                <Artwork
                  slug="fix-it-repair-cafe-toaster"
                  alt="An exploded drawing of a pop-up toaster, its casing lifted above the heating elements and the lever"
                  inks={['var(--text)']}
                  className={s.coverArt}
                />
                <figcaption className={s.coverCaption}>
                  <span data-edit="cover.coverCaptionBig" data-edit-max="60" className={s.coverCaptionBig}>x64</span>
                  <span data-edit="cover.text6" data-edit-max="60">toasters came in last year. 45 went home.</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- HOW */}
        <section id="how" className={s.sec} aria-labelledby="how-h">
          <div className={s.secHead}>
            <p data-edit="how.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>02</p>
            <h2 data-edit="how.secTitle" data-edit-max="60" id="how-h" className={s.secTitle}>How it works</h2>
            <p data-edit="how.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Four steps, about an hour. No booking: sign in at the desk until 12:15.</p>
          </div>

          <ol className={s.steps}>
            {STEPS.map((step, i) => (
              <li key={step.n} className={s.step}>
                <span data-edit={`how.circled.${i}`} data-edit-max="60" className={s.circled}>{step.n}</span>
                <span className={`${s.picto} ${s[`p_${step.glyph}`]}`} aria-hidden="true">
                  <span />
                  <span />
                </span>
                <h3 data-edit={`how.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{step.title}</h3>
                <p data-edit={`how.stepNote.${i}`} data-edit-max="240" data-edit-multiline className={s.stepNote}>{step.note}</p>
                <span className={s.arrow} aria-hidden="true" />
              </li>
            ))}
          </ol>

          <div className={s.parts}>
            <h3 data-edit="how.partsTitle" data-edit-max="40" className={s.partsTitle}>Parts list</h3>
            <p data-edit="how.partsNote" data-edit-max="240" data-edit-multiline className={s.partsNote}>Check before you set off.</p>
            <ul className={s.partsList}>
              {PARTS.map((p, i) => (
                <li key={p.name}>
                  <strong data-edit={`how.partCount.${i}`} className={s.partCount}>{p.count}</strong>
                  <span data-edit={`how.partName.${i}`} data-edit-max="60" className={s.partName}>{p.name}</span>
                  <span data-edit={`how.partNote.${i}`} data-edit-max="60" className={s.partNote}>{p.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------- FIX
            The step sequence: four framed panels, one drawing each, the
            way a manual walks through its sub-assemblies. */}
        <section id="fix" className={`${s.sec} ${s.fixSec}`} aria-labelledby="fix-h">
          <div className={s.secHead}>
            <p data-edit="fix.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>03</p>
            <h2 data-edit="fix.secTitle" data-edit-max="60" id="fix-h" className={s.secTitle}>What we fix</h2>
            <p data-edit="fix.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Four tables every month, and a floating fixer for everything else. The counts are last year&apos;s.</p>
          </div>

          <ol className={s.panels}>
            {PANELS.map((p, i) => (
              <li key={p.slug} className={s.panel}>
                <div className={s.panelTop}>
                  <span data-edit={`fix.circledSm.${i}`} data-edit-max="60" className={s.circledSm}>{p.n}</span>
                  <h3 data-edit={`fix.panelTitle.${i}`} data-edit-max="40" className={s.panelTitle}>{p.title}</h3>
                </div>
                <div className={s.panelArt}>
                  <Artwork slug={p.slug} alt={p.alt} inks={['var(--text)']} className={s.panelPic} />
                </div>
                <p className={s.panelCount}>
                  <strong>x{p.fixed}</strong>
                  <span>fixed of {p.of}</span>
                </p>
                <p data-edit={`fix.panelCaption.${i}`} data-edit-max="240" data-edit-multiline className={s.panelCaption}>{p.caption}</p>
              </li>
            ))}
          </ol>

          <div className={s.ratesWrap}>
            <div className={s.ratesHead}>
              <h3 data-edit="fix.ratesTitle" data-edit-max="40" className={s.ratesTitle}>Fixed, by table</h3>
              <p data-edit="fix.ratesNote" data-edit-max="240" data-edit-multiline className={s.ratesNote}>Share of items that went home working in 2025, with how many came in.</p>
            </div>
            <ul className={s.rates}>
              {RATES.map((r, i) => (
                <li key={r.table} style={{ '--rate': `${r.rate}%` } as React.CSSProperties}>
                  <span data-edit={`fix.rateName.${i}`} data-edit-max="60" className={s.rateName}>{r.table}</span>
                  <span className={s.rateTrack} aria-hidden="true">
                    <span className={s.rateFill} />
                  </span>
                  <strong className={s.rateValue}>{r.rate}%</strong>
                  <span className={s.rateN}>of {r.n}</span>
                </li>
              ))}
            </ul>
            <dl className={s.totals}>
              {TOTALS.map(([n, what], i) => (
                <div key={what}>
                  <dt data-edit={`fix.term.${i}`} data-edit-max="28">{n}</dt>
                  <dd data-edit={`fix.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- DATES */}
        <section id="dates" className={s.sec} aria-labelledby="dates-h">
          <div className={s.secHead}>
            <p data-edit="dates.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>04</p>
            <h2 data-edit="dates.secTitle" data-edit-max="60" id="dates-h" className={s.secTitle}>Next dates</h2>
            <p data-edit="dates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Every first Saturday, 10:00-13:00. Last sign-in at 12:15, or earlier if every table is full.</p>
          </div>

          <ol className={s.dates}>
            {DATES.map((d, i) => (
              <li key={`${d.d}-${d.m}`} className={d.closed ? s.dateClosed : s.date}>
                <p className={s.dateBlock}>
                  <span data-edit={`dates.dateDay.${i}`} data-edit-max="60" className={s.dateDay}>{d.d}</span>
                  <span data-edit={`dates.dateMon.${i}`} data-edit-max="60" className={s.dateMon}>{d.m}</span>
                </p>
                <p className={s.dateTime}>{d.closed ? 'No session' : 'Sat 10:00-13:00'}</p>
                <p data-edit={`dates.dateNote.${i}`} data-edit-max="240" data-edit-multiline className={s.dateNote}>{d.note}</p>
                <p data-edit={`dates.dateCrew.${i}`} data-edit-max="240" data-edit-multiline className={s.dateCrew}>{d.crew}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- FIXERS */}
        <section id="fixers" className={`${s.sec} ${s.fixersSec}`} aria-labelledby="fixers-h">
          <div className={s.secHead}>
            <p data-edit="fixers.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>05</p>
            <h2 data-edit="fixers.secTitle" data-edit-max="60" id="fixers-h" className={s.secTitle}>Fixers wanted</h2>
            <p data-edit="fixers.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Thirty-one volunteers keep the tables going. These are the gaps on the rota this winter.</p>
          </div>

          <div className={s.fixersGrid}>
            <div className={s.skills}>
              <h3 data-edit="fixers.boxTitle" data-edit-max="40" className={s.boxTitle}>Skills needed</h3>
              <ul className={s.skillList}>
                {SKILLS.map(([skill, n], i) => (
                  <li key={skill}>
                    <span data-edit={`fixers.text.${i}`} data-edit-max="60">{skill}</span>
                    <strong data-edit={`fixers.emphasis.${i}`}>{n}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.join}>
              <h3 data-edit="fixers.boxTitle2" data-edit-max="40" className={s.boxTitle}>How to join</h3>
              <ol className={s.joinList}>
                {JOIN.map(([n, title, note], i) => (
                  <li key={n}>
                    <span data-edit={`fixers.circledSm.${i}`} data-edit-max="60" className={s.circledSm}>{n}</span>
                    <div>
                      <p data-edit={`fixers.joinTitle.${i}`} data-edit-max="240" data-edit-multiline className={s.joinTitle}>{title}</p>
                      <p data-edit={`fixers.joinNote.${i}`} data-edit-max="240" data-edit-multiline className={s.joinNote}>{note}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label data-edit="fixers.label" htmlFor="fx-name">Name</label>
                  <input id="fx-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="fixers.label2" htmlFor="fx-email">Email</label>
                  <input id="fx-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="fixers.label3" htmlFor="fx-skill">I can help with</label>
                  <select id="fx-skill" name="skill" defaultValue="electronics">
                    <option value="electronics">Electronics and soldering</option>
                    <option value="sewing">Sewing machines</option>
                    <option value="host">Hosting the desk</option>
                    <option value="tea">Tea and cake</option>
                    <option value="bikes">Bikes</option>
                    <option value="wood">Woodwork</option>
                  </select>
                </div>
                <button data-edit="fixers.btn" data-edit-max="24" className={s.btn} type="submit">Put me on the rota</button>
              </form>
            </div>

            <aside className={s.briefing} aria-labelledby="brief-h">
              <div data-edit-pattern="brief.field" data-edit-roles="transparent,3,1,2,1" className={s.crewField} aria-hidden="true">
                <TabbiedPattern
                  pattern={notch}
                  palette={CREW}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={34}
                  seed="fixit-crew"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.briefCard}>
                <h3 data-edit="brief.briefTitle" data-edit-max="40" id="brief-h" className={s.briefTitle}>Fixers&apos; briefing</h3>
                <p data-edit="brief.briefWhen" data-edit-max="240" data-edit-multiline className={s.briefWhen}>Thu 2 Oct, 19:30</p>
                <p data-edit="brief.briefNote" data-edit-max="240" data-edit-multiline className={s.briefNote}>In the hall kitchen. Safety testing, the ticket book and who brings the soldering station.</p>
                <p className={s.briefNote}>
                  <a data-edit="brief.link" data-edit-max="28" href="mailto:fixers@fixitsaturday.example">fixers@fixitsaturday.example</a>
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* ----------------------------------------------------------- RULES
            The manual's right-and-wrong pair: the same lamp twice, a tick
            on one and a cross on the other, both drawn in CSS. */}
        <section id="rules" className={s.sec} aria-labelledby="rules-h">
          <div className={s.secHead}>
            <p data-edit="rules.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>06</p>
            <h2 data-edit="rules.secTitle" data-edit-max="60" id="rules-h" className={s.secTitle}>House rules</h2>
            <p data-edit="rules.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Six of them, on the wall by the desk. Hosts will point at them kindly.</p>
          </div>

          <div className={s.rulesGrid}>
            <div className={s.pair}>
              <figure className={`${s.verdict} ${s.verdictDo}`}>
                <Artwork slug="fix-it-repair-cafe-lamp" alt="A lamp opened up on the table, unplugged, with its cord coiled beside it" inks={['var(--text)']} className={s.verdictArt} />
                <span className={s.tick} aria-hidden="true" />
                <figcaption data-edit="rules.caption" data-edit-max="120" data-edit-multiline>Unplugged, then opened, with a fixer.</figcaption>
              </figure>
              <figure className={`${s.verdict} ${s.verdictDont}`}>
                <Artwork slug="fix-it-repair-cafe-lamp" alt="" inks={['var(--text)']} className={s.verdictArt} />
                <span className={s.cross} aria-hidden="true" />
                <span className={s.warn} aria-hidden="true" />
                <figcaption data-edit="rules.caption2" data-edit-max="120" data-edit-multiline>Never opened while it is plugged in.</figcaption>
              </figure>
            </div>

            <ol className={s.rules}>
              {RULES.map(([rule, note], i) => (
                <li key={rule}>
                  <span className={s.ruleNo}>{String(i + 1).padStart(2, '0')}</span>
                  <p data-edit={`rules.ruleTitle.${i}`} data-edit-max="240" data-edit-multiline className={s.ruleTitle}>{rule}</p>
                  <p data-edit={`rules.ruleNote.${i}`} data-edit-max="240" data-edit-multiline className={s.ruleNote}>{note}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- TOOLS
            The tool library as a pegboard of brackets, with a silhouette in
            a box for every tool on loan. */}
        <section id="tools" className={`${s.sec} ${s.toolsSec}`} aria-labelledby="tools-h">
          <div className={s.secHead}>
            <p data-edit="tools.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>07</p>
            <h2 data-edit="tools.secTitle" data-edit-max="60" id="tools-h" className={s.secTitle}>The tool library</h2>
            <p data-edit="tools.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Why buy a drill you will use for ten minutes? Borrow one of ours, and bring it back clean.</p>
          </div>

          <div className={s.toolsGrid}>
            <div className={s.pegboard}>
              <div data-edit-pattern="tools.field" data-edit-roles="transparent,1,2,1,3,1" className={s.pegField} aria-hidden="true">
                <TabbiedPattern
                  pattern={rebate}
                  palette={PEGBOARD}
                  options={{ frequency: 0.55 }}
                  fit="grid"
                  cellSize={28}
                  seed="fixit-pegboard"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ul className={s.tools}>
                {TOOLS.map((t, i) => (
                  <li key={t.name} className={s.tool}>
                    <span className={s.silBox} aria-hidden="true">
                      <span className={`${s.sil} ${s[`t_${t.kind}`]}`} />
                    </span>
                    <span data-edit={`tools.toolName.${i}`} data-edit-max="60" className={s.toolName}>{t.name}</span>
                    <span className={s.toolMeta}>
                      <strong data-edit={`tools.emphasis.${i}`}>{t.stock}</strong>
                      <span data-edit={`tools.text.${i}`} data-edit-max="60">{t.loan}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.libraryInfo}>
              <p className={s.libraryPrice}>
                <strong data-edit="tools.emphasis2">$10</strong>
                <span data-edit="tools.text2" data-edit-max="60">a year, every tool</span>
              </p>
              <dl className={s.libraryList}>
                {LIBRARY.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`tools.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`tools.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <a data-edit="tools.btnLine" data-edit-max="28" className={s.btnLine} href="mailto:tools@fixitsaturday.example">Reserve a tool</a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FIND
            A plan of the streets: the lead pattern again, as the blocks of
            Millbrook, with the roads and the river laid over it. */}
        <section id="find" className={s.sec} aria-labelledby="find-h">
          <div className={s.secHead}>
            <p data-edit="find.pageNo" data-edit-max="240" data-edit-multiline className={s.pageNo}>08</p>
            <h2 data-edit="find.secTitle" data-edit-max="60" id="find-h" className={s.secTitle}>Find the hall</h2>
            <p data-edit="find.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>St Anne&apos;s church hall is the low brick building behind the church, on the corner of Bridge Road and Church Lane.</p>
          </div>

          <div className={s.findGrid}>
            <div className={s.map}>
              <div data-edit-pattern="find.field" data-edit-roles="transparent,1,1,2,1,1" className={s.mapField} aria-hidden="true">
                <TabbiedPattern
                  pattern={halving}
                  palette={STREETS}
                  options={{ frequency: 0.5 }}
                  fit="grid"
                  cellSize={30}
                  seed="fixit-streets"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.river} aria-hidden="true" />
              <span className={`${s.road} ${s.roadBridge}`}>
                <span data-edit="find.roadName" data-edit-max="60" className={s.roadName}>Bridge Road</span>
              </span>
              <span className={`${s.road} ${s.roadChurch}`}>
                <span data-edit="find.roadName2" data-edit-max="60" className={s.roadName}>Church Lane</span>
              </span>
              <span className={s.pin}>
                <span className={s.pinDot} aria-hidden="true" />
                <span data-edit="find.pinLabel" data-edit-max="60" className={s.pinLabel}>St Anne&apos;s hall</span>
              </span>
              <span data-edit="find.busStop" data-edit-max="60" className={s.busStop}>Bus 12, 31</span>
              <span data-edit="find.text" data-edit-max="60" className={s.north} aria-hidden="true">N</span>
            </div>

            <div className={s.findInfo}>
              <p data-edit="find.body" data-edit-max="240" data-edit-multiline className={s.address}>St Anne&apos;s church hall<br />Bridge Road, Millbrook</p>
              <dl className={s.directions}>
                {DIRECTIONS.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`find.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`find.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="find.link" data-edit-max="28" href="tel:+15550132748">(555) 013-2748</a>
                <a data-edit="find.link2" data-edit-max="28" href="mailto:hello@fixitsaturday.example">hello@fixitsaturday.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,1,3,0" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={bracket}
            palette={HARDWARE}
            options={{ frequency: 0.7 }}
            fit="grid"
            cellSize={32}
            seed="fixit-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Fix-It Saturday</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>St Anne&apos;s church hall, Bridge Road, Millbrook. First Saturday of every month, 10:00-13:00.</p>
          <p data-edit="footer.footLine2" data-edit-max="240" data-edit-multiline className={s.footLine}>A fictional repair cafe; the volunteers, dates and numbers are invented.</p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footLine3" data-edit-max="240" data-edit-multiline className={s.footLine}>The drawings are generated images, drawn in the page&apos;s own colors.</p>
          <p data-edit="footer.footPage" data-edit-max="240" data-edit-multiline className={s.footPage}>End of manual</p>
        </div>
      </footer>
    </div>
  );
}
