import { TabbiedPattern } from 'tabbied/react';
import { arriccio, contourlines, concentricrings, terrain } from 'tabbied/patterns';
import s from './heartwood-arborists.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Heartwood Arborists: Tree surgery and surveys, Old Station Road, Brackenridge',
  description:
    'Crown reduction, deadwood, felling, stump grinding, hedges and cabling, tree surveys for planning and mortgages, and 24-hour storm callouts, from the yard on Old Station Road, Brackenridge.',
};

/* Site colors. Rings everywhere: stepped quarter rings behind the hero's
   slice and along the foot of the page, survey contours on the site plan,
   the end grain of a stacked log, and the map symbols over the price
   list. Fields keep a transparent ground so the bark or sawdust behind
   them shows through. */
const SAWDUST = '#f0e7d6';
const BARK = '#2c241b';
const MOSS = '#5d7a39';
const ORANGE = '#e2622c';

const RINGS = ['transparent', MOSS, BARK, MOSS, ORANGE, SAWDUST];
const CONTOURS = ['transparent', MOSS, ORANGE, BARK];
const END_GRAIN = [ORANGE, BARK, SAWDUST, MOSS];
const SYMBOLS = ['transparent', MOSS, BARK, ORANGE, MOSS, BARK];
const FOOT_RINGS = ['transparent', MOSS, ORANGE, SAWDUST, MOSS, ORANGE];

const NAV = [
  ['Services', '#services'],
  ['Surveys', '#surveys'],
  ['Storm callouts', '#storm'],
  ['The crew', '#crew'],
  ['Prices', '#prices'],
  ['Woodchip', '#woodchip'],
  ['Book', '#book'],
];

type Note = {
  year: string;
  text: string;
  x: string;
  y: string;
  side: 'left' | 'right';
};

const SLICE_NOTES: Note[] = [
  { year: '1911', text: 'The pith: an acorn on the railway embankment', x: '53%', y: '48%', side: 'left' },
  { year: '1976', text: 'Drought, and the narrowest ring', x: '64%', y: '33%', side: 'right' },
  { year: '2004', text: 'We lifted the crown; the rings widen after', x: '33%', y: '19%', side: 'left' },
  { year: '2021', text: 'The storm crack opens toward the heart', x: '68%', y: '72%', side: 'right' },
  { year: '2025', text: 'Felled at 114 rings, and read', x: '92%', y: '52%', side: 'right' },
];

const CORE = [
  { dec: '1910s', w: 11, ev: 'An acorn takes' },
  { dec: '1920s', w: 10, ev: '' },
  { dec: '1930s', w: 4, ev: 'The dry years' },
  { dec: '1940s', w: 9, ev: '' },
  { dec: '1950s', w: 10, ev: '' },
  { dec: '1960s', w: 7, ev: '' },
  { dec: '1970s', w: 3, ev: '1976 drought' },
  { dec: '1980s', w: 6, ev: '' },
  { dec: '1990s', w: 6, ev: 'Heartwood opens' },
  { dec: '2000s', w: 9, ev: 'Crown lifted' },
  { dec: '2010s', w: 8, ev: '' },
  { dec: '2020s', w: 5, ev: 'Storm, then felled' },
];

const OAK_NOTES: Note[] = [
  { year: 'Crown reduction', text: 'The whole outline brought in by two meters, cut back to growing points', x: '36%', y: '9%', side: 'left' },
  { year: 'Deadwood', text: 'Dead limbs over 25 mm taken out before they come down', x: '10%', y: '42%', side: 'left' },
  { year: 'Crown lift', text: 'Lower limbs removed to give 5.2 m over the road', x: '20%', y: '66%', side: 'left' },
  { year: 'Cabling', text: 'A flexible brace between two weak stems, checked yearly', x: '63%', y: '28%', side: 'right' },
  { year: 'Root protection zone', text: 'Twelve times the trunk width: no digging, parking or storing', x: '88%', y: '95%', side: 'right' },
];

type Service = {
  no: string;
  name: string;
  line: string;
  from: string;
};

const SERVICES: Service[] = [
  { no: '01', name: 'Crown reduction', line: 'A smaller, lighter crown with the tree\'s own shape, for light, clearance or safety.', from: 'From $650' },
  { no: '02', name: 'Deadwood removal', line: 'Climbed and cleared, with every limb lowered on a rope, not dropped.', from: 'From $300' },
  { no: '03', name: 'Felling', line: 'Straight down where there is room, or taken apart piece by piece where there is not.', from: 'From $400' },
  { no: '04', name: 'Stump grinding', line: 'Ground to 30 cm below the surface, the chips raked back or taken away.', from: 'From $120' },
  { no: '05', name: 'Hedge work', line: 'Cutting, reducing and laying, after the birds have finished nesting.', from: '$6-10 a meter' },
  { no: '06', name: 'Cabling', line: 'Flexible braces for split or weak unions, inspected every year after.', from: 'From $450' },
];

const SURVEY_TYPES = [
  ['For planning', 'Every tree on and near the site, root protection zones on a plan, and what can come out. Accepted by Brackenridge planners.', 'From $450'],
  ['For a mortgage', 'A condition report on the trees near a house, and what they mean for the walls, drains and insurance.', '$220'],
  ['For peace of mind', 'One visit, one tree or ten, and a plain letter saying which need work and which can be left.', '$140'],
];

type Row = {
  tag: string;
  species: string;
  dbh: string;
  height: string;
  cond: string;
  rec: string;
};

const SURVEY_ROWS: Row[] = [
  { tag: 'T1', species: 'English oak', dbh: '96', height: '18', cond: 'Good', rec: 'Retain; lift crown to 5.2 m' },
  { tag: 'T2', species: 'Ash', dbh: '54', height: '14', cond: 'Poor', rec: 'Fell within 6 months (dieback)' },
  { tag: 'T3', species: 'Beech', dbh: '71', height: '21', cond: 'Fair', rec: 'Remove deadwood; reduce by 2 m' },
  { tag: 'T4', species: 'Silver birch', dbh: '28', height: '11', cond: 'Good', rec: 'Retain' },
];

const STORM_STEPS = [
  ['Stay clear', 'Keep people and cars away from anything hanging or cracked, and away from wires.'],
  ['Call us', 'Day or night. A person answers, not a machine, and tells you when we will be there.'],
  ['We make it safe', 'First the danger, then the clearing. Insurance photos and a report the next morning.'],
];

type Crew = {
  name: string;
  role: string;
  years: string;
  quals: string[];
};

const CREW: Crew[] = [
  { name: 'Nell Garrity', role: 'Founder, consulting arborist', years: 'Climbing since 1991', quals: ['Certified arborist', 'Tree risk assessor', 'Planning surveys'] },
  { name: 'Owen Mbeki', role: 'Lead climber', years: 'With us since 2008', quals: ['Aerial rescue', 'Large tree felling', 'Cabling'] },
  { name: 'Rosa Lindqvist', role: 'Climber', years: 'With us since 2016', quals: ['Aerial rescue', 'Crown work', 'First aid'] },
  { name: 'Dev Kaur', role: 'Groundsman and grinder', years: 'With us since 2019', quals: ['Chipper and grinder', 'Traffic control', 'First aid'] },
  { name: 'Sam Pryor', role: 'Apprentice', years: 'Second year', quals: ['Ground work', 'Hedge laying', 'Learning to climb'] },
];

const COVER = [
  ['Public liability', '$5 million'],
  ['Employer\'s liability', '$10 million'],
  ['Professional indemnity', '$2 million, for surveys'],
  ['Member', 'Guild of Northern Arborists, approved contractor'],
];

const PRICES = [
  ['Crown reduction', 'A garden tree to 12 m', '$650-1,200'],
  ['Deadwood removal', 'One mature tree', '$300-700'],
  ['Felling, small', 'Under 8 m, room to drop', '$400-900'],
  ['Felling, large', 'Sectional, over buildings', '$1,500-4,000'],
  ['Stump grinding', 'Per stump, under 60 cm', '$120-260'],
  ['Hedge cutting', 'Per meter, both sides and top', '$6-10'],
  ['Cabling', 'Per brace, fitted and tagged', '$450'],
  ['Storm callout', 'First hour on site, any time', '$180'],
];

const YARD = [
  ['Woodchip', 'Free by the trailer load. Fresh, mixed, and good under paths and fruit trees.', 'Free'],
  ['Seasoned logs', 'Oak and ash split last spring, under 20% moisture, in a one cubic meter bag.', '$95'],
  ['Kindling', 'Dry softwood offcuts in a net.', '$6'],
  ['Rounds', 'Slices of trunk for tables, stools and cake stands, 30-70 cm across.', '$25-60'],
];

export default function HeartwoodArboristsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sawdust': '#f0e7d6',
        '--bark': '#2c241b',
        '--moss': '#5d7a39',
        '--orange': '#e2622c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sawdust,bark,moss,orange"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300..900&family=Martian+Mono:wdth,wght@75..112.5,400..800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markRings} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Heartwood</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Arborists</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550186600">24 h: (555) 018-6600</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A slice of the Old Station oak, read ring by ring, and the core
            taken from it laid out underneath. */}
        <section className={s.hero} aria-labelledby="hw-hero-h">
          <div data-edit-pattern="hwHero.field" data-edit-roles="transparent,2,1,2,3,0" className={s.heroField} aria-hidden="true">
            <TabbiedPattern pattern={arriccio} palette={RINGS} options={{ frequency: 0.55 }} fit="grid" cellSize={72} seed="heartwood-hero" style={{ position: 'absolute', inset: 0 }} />
          </div>

          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p data-edit="hwHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Tree surgery and surveys, Brackenridge</p>
              <h1 data-edit="hwHero.title" data-edit-max="70" id="hw-hero-h" className={s.title}>Heartwood Arborists</h1>
              <p data-edit="hwHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>We read trees the way you read a stump: ring by ring. Pruning, felling, surveys and storm work from the yard on Old Station Road since 1998.</p>
              <div className={s.heroActions}>
                <a data-edit="hwHero.btn" data-edit-max="28" className={s.btn} href="#book">Book a survey</a>
                <a data-edit="hwHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#storm">Storm damage?</a>
              </div>
            </div>

            <figure className={s.slice}>
              <div className={s.plate}>
                <div className={s.disc}>
                  <Artwork
                    slug="heartwood-arborists-rings"
                    alt="A cross-section of an oak trunk: growth rings, a crack running in from the bark, and the bark edge"
                    inks={['var(--bark)', 'var(--on-bark)']}
                    className={s.rings}
                  />
                  {SLICE_NOTES.map((n, i) => (
                    <span key={n.year} className={s.pin} style={{ '--x': n.x, '--y': n.y } as React.CSSProperties} aria-hidden="true">{i + 1}</span>
                  ))}
                </div>
                <ol className={s.notes}>
                  {SLICE_NOTES.map((n, i) => (
                    <li key={n.year} className={`${s.note} ${n.side === 'left' ? s.noteLeft : s.noteRight}`} style={{ '--x': n.x, '--y': n.y } as React.CSSProperties}>
                      <span data-edit={`hwHero.noteHead.${i}`} data-edit-max="60" className={s.noteHead}>{n.year}</span>
                      <span data-edit={`hwHero.noteText.${i}`} data-edit-max="60" className={s.noteText}>{n.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption data-edit="hwHero.sliceCaption" data-edit-max="120" data-edit-multiline className={s.sliceCaption}>English oak, Old Station Road. 114 rings, 96 cm across.</figcaption>
            </figure>
          </div>

          <div className={s.coreWrap}>
            <p data-edit="hwHero.coreHead" data-edit-max="240" data-edit-multiline className={s.coreHead}>The core, pith to bark</p>
            <ol className={s.core}>
              {CORE.map((c, i) => (
                <li key={c.dec} className={s.coreSeg}>
                  <span className={s.coreWood} style={{ '--w': `${c.w}px` } as React.CSSProperties} aria-hidden="true" />
                  <span data-edit={`hwHero.coreDec.${i}`} data-edit-max="60" className={s.coreDec}>{c.dec}</span>
                  {c.ev ? <span data-edit={`hwHero.coreEv.${i}`} data-edit-max="60" className={s.coreEv}>{c.ev}</span> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES
            Where on a tree the work happens, then the jobs on their tags. */}
        <section id="services" className={s.sec} aria-labelledby="hw-services-h">
          <div className={s.secHead}>
            <p data-edit="services.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Plate 1</p>
            <h2 data-edit="services.title" data-edit-max="60" id="hw-services-h">What we do, and where on the tree</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Most jobs are one of six. The drawing shows where each one happens on a mature oak; the tags below are what we nail to a tree we have surveyed.</p>
          </div>

          <figure className={s.diagram}>
            <div className={s.plate}>
              <div className={`${s.disc} ${s.oakDisc}`}>
                <Artwork slug="heartwood-arborists-oak" alt="A mature oak with a broad spreading crown, marked up with the work an arborist does" inks={['var(--text)']} className={s.oak} />
                <span className={s.reduceLine} aria-hidden="true" />
                <span className={s.liftLine} aria-hidden="true" />
                <span className={s.cable} aria-hidden="true" />
                <span className={s.rpz} aria-hidden="true" />
                {OAK_NOTES.map((n, i) => (
                  <span key={n.year} className={s.pin} style={{ '--x': n.x, '--y': n.y } as React.CSSProperties} aria-hidden="true">{i + 1}</span>
                ))}
              </div>
              <ol className={`${s.notes} ${s.oakNotes}`}>
                {OAK_NOTES.map((n, i) => (
                  <li key={n.year} className={`${s.note} ${n.side === 'left' ? s.noteLeft : s.noteRight}`} style={{ '--x': n.x, '--y': n.y } as React.CSSProperties}>
                    <span data-edit={`services.noteHead.${i}`} data-edit-max="60" className={s.noteHead}>{n.year}</span>
                    <span data-edit={`services.noteText.${i}`} data-edit-max="60" className={s.noteText}>{n.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </figure>

          <ul className={s.tags}>
            {SERVICES.map((sv, i) => (
              <li key={sv.no} className={s.tag}>
                <span className={s.nail} aria-hidden="true" />
                <p data-edit={`services.tagNo.${i}`} data-edit-max="240" data-edit-multiline className={s.tagNo}>{sv.no}</p>
                <h3 data-edit={`services.tagName.${i}`} data-edit-max="40" className={s.tagName}>{sv.name}</h3>
                <p data-edit={`services.tagLine.${i}`} data-edit-max="240" data-edit-multiline className={s.tagLine}>{sv.line}</p>
                <p data-edit={`services.tagFrom.${i}`} data-edit-max="240" data-edit-multiline className={s.tagFrom}>{sv.from}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- SURVEYS
            A survey sheet: the site plan with its contours, and the table. */}
        <section id="surveys" className={s.surveySec} aria-labelledby="hw-surveys-h">
          <div className={s.surveyInner}>
            <div className={s.surveyText}>
              <p data-edit="surveys.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Plate 2</p>
              <h2 data-edit="surveys.title" data-edit-max="60" id="hw-surveys-h">Tree surveys and reports</h2>
              <p data-edit="surveys.surveyLede" data-edit-max="240" data-edit-multiline className={s.surveyLede}>For planning applications, house sales and anyone who wants to know. Every tree is tagged, measured, assessed and put on a plan, and the report says plainly what to do.</p>
              <ul className={s.surveyTypes}>
                {SURVEY_TYPES.map(([what, text, price], i) => (
                  <li key={what}>
                    <h3 data-edit={`surveys.title2.${i}`} data-edit-max="40">{what}</h3>
                    <p data-edit={`surveys.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                    <p data-edit={`surveys.surveyPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.surveyPrice}>{price}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.sheet}>
              <div className={s.sheetHead}>
                <p data-edit="surveys.sheetTitle" data-edit-max="240" data-edit-multiline className={s.sheetTitle}>Tree survey</p>
                <p className={s.sheetMeta}>
                  <span data-edit="surveys.text" data-edit-max="60">Site: 14 Old Station Road</span>
                  <span data-edit="surveys.text2" data-edit-max="60">Surveyor: N. Garrity</span>
                  <span data-edit="surveys.text3" data-edit-max="60">Date: 09/2026</span>
                </p>
              </div>
              <div className={s.sitePlan}>
                <div data-edit-pattern="surveys.field" data-edit-roles="transparent,2,3,1" className={s.contours} aria-hidden="true">
                  <TabbiedPattern pattern={contourlines} palette={CONTOURS} options={{ frequency: 0.45 }} fit="grid" cellSize={40} seed="heartwood-plan" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <span data-edit="surveys.text4" data-edit-max="60" className={`${s.planTree} ${s.planT1}`} aria-hidden="true">T1</span>
                <span data-edit="surveys.text5" data-edit-max="60" className={`${s.planTree} ${s.planT2}`} aria-hidden="true">T2</span>
                <span data-edit="surveys.text6" data-edit-max="60" className={`${s.planTree} ${s.planT3}`} aria-hidden="true">T3</span>
                <span data-edit="surveys.text7" data-edit-max="60" className={`${s.planTree} ${s.planT4}`} aria-hidden="true">T4</span>
                <span className={s.planHouse} aria-hidden="true" />
                <p data-edit="surveys.planKey" data-edit-max="240" data-edit-multiline className={s.planKey}>Site plan, 1:200. Dashed rings are root protection zones.</p>
              </div>
              <div className={s.sheetTableWrap}>
                <table className={s.sheetTable}>
                  <caption data-edit="surveys.srOnly" className={s.srOnly}>Sample survey: each tree's tag, species, trunk diameter, height, condition and recommendation</caption>
                  <thead>
                    <tr>
                      <th data-edit="surveys.heading" scope="col">Tag</th>
                      <th data-edit="surveys.heading2" scope="col">Species</th>
                      <th data-edit="surveys.heading3" scope="col">DBH cm</th>
                      <th data-edit="surveys.heading4" scope="col">Ht m</th>
                      <th data-edit="surveys.heading5" scope="col">Condition</th>
                      <th data-edit="surveys.heading6" scope="col">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SURVEY_ROWS.map((r, i) => (
                      <tr key={r.tag}>
                        <th data-edit={`surveys.heading7.${i}`} scope="row">{r.tag}</th>
                        <td data-edit={`surveys.cell.${i}`}>{r.species}</td>
                        <td data-edit={`surveys.num.${i}`} className={s.num}>{r.dbh}</td>
                        <td data-edit={`surveys.num2.${i}`} className={s.num}>{r.height}</td>
                        <td data-edit={`surveys.cell2.${i}`}>{r.cond}</td>
                        <td data-edit={`surveys.cell3.${i}`}>{r.rec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- STORM
            The oak again, enormous and faint behind the number. */}
        <section id="storm" className={s.storm} aria-labelledby="hw-storm-h">
          <div className={s.stormArt} aria-hidden="true">
            <Artwork slug="heartwood-arborists-oak" alt="" inks={['var(--storm-ink)']} className={s.stormOak} />
          </div>
          <div className={s.stormInner}>
            <div className={s.stormHead}>
              <p data-edit="storm.stormKicker" data-edit-max="240" data-edit-multiline className={s.stormKicker}>24-hour storm callouts</p>
              <h2 data-edit="storm.stormTitle" data-edit-max="60" id="hw-storm-h" className={s.stormTitle}>A tree down at 3 am is our kind of emergency</h2>
              <a data-edit="storm.stormPhone" data-edit-max="28" className={s.stormPhone} href="tel:+15550186600">(555) 018-6600</a>
              <p data-edit="storm.stormPromise" data-edit-max="240" data-edit-multiline className={s.stormPromise}>On site within two hours anywhere in Brackenridge, and within four across the valley.</p>
            </div>
            <ol className={s.stormSteps}>
              {STORM_STEPS.map(([head, text], i) => (
                <li key={head}>
                  <span className={s.stormNo} aria-hidden="true">{i + 1}</span>
                  <h3 data-edit={`storm.title.${i}`} data-edit-max="40">{head}</h3>
                  <p data-edit={`storm.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ CREW */}
        <section id="crew" className={s.sec} aria-labelledby="hw-crew-h">
          <div className={s.secHead}>
            <p data-edit="crew.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Plate 3</p>
            <h2 data-edit="crew.title" data-edit-max="60" id="hw-crew-h">The crew</h2>
            <p data-edit="crew.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Five of us, all employed, none subcontracted. Every climber is trained in aerial rescue, and there is always a second one on the ground.</p>
          </div>

          <div className={s.crewGrid}>
            <ul className={s.crew}>
              {CREW.map((c, i) => (
                <li key={c.name} className={s.member}>
                  <h3 data-edit={`crew.title2.${i}`} data-edit-max="40">{c.name}</h3>
                  <p data-edit={`crew.memberRole.${i}`} data-edit-max="240" data-edit-multiline className={s.memberRole}>{c.role}</p>
                  <p data-edit={`crew.memberYears.${i}`} data-edit-max="240" data-edit-multiline className={s.memberYears}>{c.years}</p>
                  <ul className={s.quals}>
                    {c.quals.map((q, i2) => (
                      <li data-edit={`crew.item.${i}.${i2}`} data-edit-max="80" key={q}>{q}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <aside className={s.cover} aria-labelledby="hw-cover-h">
              <h3 data-edit="hwCover.coverHead" data-edit-max="40" id="hw-cover-h" className={s.coverHead}>Insured and checked</h3>
              <dl className={s.coverList}>
                {COVER.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`hwCover.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`hwCover.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="hwCover.coverNote" data-edit-max="240" data-edit-multiline className={s.coverNote}>Certificates are in the van and in your inbox before we start.</p>
            </aside>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.pricesSec} aria-labelledby="hw-prices-h">
          <div data-edit-pattern="prices.field" data-edit-roles="transparent,2,1,3,2,1" className={s.symbols} aria-hidden="true">
            <TabbiedPattern pattern={terrain} palette={SYMBOLS} fit="grid" cellSize={40} seed="heartwood-symbols" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.pricesInner}>
            <div className={s.pricesHead}>
              <p data-edit="prices.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Plate 4</p>
              <h2 data-edit="prices.title" data-edit-max="60" id="hw-prices-h">Pricing guide</h2>
              <p data-edit="prices.body" data-edit-max="240" data-edit-multiline>Every tree is different, so every quote is written after a visit, which is free. These are the ranges most jobs fall in.</p>
            </div>
            <table className={s.prices}>
              <caption data-edit="prices.srOnly" className={s.srOnly}>Typical price ranges by job</caption>
              <thead>
                <tr>
                  <th data-edit="prices.heading" scope="col">Job</th>
                  <th data-edit="prices.heading2" scope="col">Typically</th>
                  <th data-edit="prices.heading3" scope="col">Range</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map(([job, typical, range], i) => (
                  <tr key={job}>
                    <th data-edit={`prices.heading4.${i}`} scope="row">{job}</th>
                    <td data-edit={`prices.cell.${i}`}>{typical}</td>
                    <td data-edit={`prices.range.${i}`} className={s.range}>{range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------------------------------------------------------- WOODCHIP
            The log pile at the yard gate: one end grain, stacked. */}
        <section id="woodchip" className={s.sec} aria-labelledby="hw-yard-h">
          <div className={s.yardGrid}>
            <div className={s.log}>
              <div data-edit-pattern="woodchip.field" data-edit-roles="3,1,0,2" className={s.endGrain} aria-hidden="true">
                <TabbiedPattern pattern={concentricrings} palette={END_GRAIN} fit="grid" cellSize={46} seed="heartwood-log" style={{ position: 'absolute', inset: 0 }} />
              </div>
            </div>
            <div className={s.yardText}>
              <p data-edit="woodchip.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>At the yard gate</p>
              <h2 data-edit="woodchip.title" data-edit-max="60" id="hw-yard-h">Woodchip and logs for sale</h2>
              <p data-edit="woodchip.yardLede" data-edit-max="240" data-edit-multiline className={s.yardLede}>Everything we cut goes somewhere useful. Come to the yard on Old Station Road, weekdays 7:30 to 4, or ask us to drop it off on the next job near you.</p>
              <ul className={s.yard}>
                {YARD.map(([what, text, price], i) => (
                  <li key={what}>
                    <h3 data-edit={`woodchip.title2.${i}`} data-edit-max="40">{what}</h3>
                    <p data-edit={`woodchip.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                    <p data-edit={`woodchip.yardPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.yardPrice}>{price}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.bookSec} aria-labelledby="hw-book-h">
          <form className={s.order} action="#">
            <div className={s.orderHead}>
              <h2 data-edit="book.title" data-edit-max="60" id="hw-book-h">Book a survey or a quote</h2>
              <p data-edit="book.orderNo" data-edit-max="240" data-edit-multiline className={s.orderNo}>Work order no. 2026-</p>
            </div>
            <p data-edit="book.orderNote" data-edit-max="240" data-edit-multiline className={s.orderNote}>Visits and quotes are free. We come within a week, usually sooner, and write back within two days.</p>
            <div className={s.orderGrid}>
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="hw-name">Your name</label>
                <input id="hw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="hw-phone">Phone</label>
                <input id="hw-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label3" htmlFor="hw-where">Where the trees are</label>
                <input id="hw-where" name="where" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="hw-what">What you need</label>
                <select id="hw-what" name="what" defaultValue="quote">
                  <option value="quote">A quote for work</option>
                  <option value="planning">A survey for planning</option>
                  <option value="mortgage">A mortgage report</option>
                  <option value="look">Someone to take a look</option>
                  <option value="storm">Storm damage, not urgent</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="hw-count">How many trees</label>
                <select id="hw-count" name="count" defaultValue="1">
                  <option value="1">One</option>
                  <option value="2">Two to five</option>
                  <option value="6">Six to twenty</option>
                  <option value="21">More than twenty</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label6" htmlFor="hw-notes">Anything we should know</label>
                <textarea id="hw-notes" name="notes" rows={3} />
              </div>
            </div>
            <div className={s.orderFoot}>
              <button data-edit="book.btn" data-edit-max="24" className={s.btn} type="submit">Send the work order</button>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline>Storm damage right now? Call (555) 018-6600, any hour.</p>
            </div>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,0,2,3" className={s.footRings} aria-hidden="true">
          <TabbiedPattern pattern={arriccio} palette={FOOT_RINGS} fit="grid" cellSize={40} seed="heartwood-foot" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Heartwood Arborists</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional tree surgery. The crew, trees, prices, yard and Brackenridge itself are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The oak and the ring slice are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
