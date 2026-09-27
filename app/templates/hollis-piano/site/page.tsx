import { TabbiedPattern } from 'tabbied/react';
import { batiste, meridianhatch, stitch, reeding } from 'tabbied/patterns';
import s from './hollis-piano.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Hollis Piano Service: Piano tuning and repair, Linden Vale',
  description:
    'Ada Hollis, RPT, tunes, regulates and restores pianos from her workshop at 14 Organ Row, Linden Vale. Prices, how often to tune, humidity and moving advice, and online booking.',
};

/* Site colors: the paper of the score, the engraver's ink, the red of the
   hammer felt and the brass of the pedals. The same hexes as the root rule
   in the stylesheet. */
const PAPER = '#f7f3ea';
const INK = '#171513';
const FELT = '#a5232e';
const BRASS = '#b58b3f';

/* Manuscript paper: short staves, most of them level. */
const STAVES = ['transparent', INK, INK, BRASS, INK, FELT];
/* The hygrometer's dial. */
const DIAL = [PAPER, INK, BRASS, FELT];
/* The map of the round: a stitch for every piano on the books. */
const ROUND = ['transparent', INK, FELT, BRASS, INK, INK];
/* The reeded fall board along the foot of the page. */
const FALLBOARD = [INK, BRASS, PAPER, BRASS, FELT, BRASS];

const NAV = [
  ['Tuning', '#tuning'],
  ['Regulation', '#regulation'],
  ['Restoration', '#restoration'],
  ['Care', '#care'],
  ['Book', '#book'],
  ['Areas', '#areas'],
];

type Bar = { name: string; dyn: string; price: string; time: string; body: string };

/* The tuning price list, set as a score: one bar to each service. */
const TUNINGS: Bar[] = [
  { name: 'Standard tuning', dyn: 'mf', price: '$140', time: '90 min', body: 'Every string to A440, unisons clean, octaves stretched to the piano\'s own scale. Most pianos, once or twice a year.' },
  { name: 'Pitch raise', dyn: 'f', price: '$210', time: '2 h 15 min', body: 'For a piano left for years and sitting flat. A rough pass to bring the tension up, then a fine tuning over it.' },
  { name: 'Concert tuning', dyn: 'ff', price: '$220', time: '2 h, on the day', body: 'For a hall or a recording: tuned the afternoon of, touched up in the interval if you like.' },
  { name: 'Second visit', dyn: 'p', price: '$95', time: '1 hour', body: 'A follow-up six weeks after a pitch raise or a move, while the new tension settles.' },
];

type Part = { n: string; name: string; body: string; x: string; y: string; dir: 'up' | 'down' };

/* The callouts on the action drawing: where each part is, and which way
   its leader line runs to the numbers above or below the picture. */
const PARTS: Part[] = [
  { n: '1', name: 'Key', body: 'Level and dip: every key the same height at rest and the same 10 mm travel to the key bed.', x: '17%', y: '70%', dir: 'down' },
  { n: '2', name: 'Wippen', body: 'The lever that lifts the hammer. Its springs are set so a note repeats before the key is fully up.', x: '53%', y: '78%', dir: 'down' },
  { n: '3', name: 'Let-off', body: 'The button that lets the hammer escape 2 mm short of the string, so it strikes and falls away.', x: '66%', y: '60%', dir: 'down' },
  { n: '4', name: 'Hammer', body: 'Felt filed back to shape and voiced with needles; spacing set so it meets all three strings square.', x: '63%', y: '12%', dir: 'up' },
  { n: '5', name: 'Damper', body: 'Lifts as the key goes down and falls back in time, so notes stop together with no buzz or hang.', x: '84%', y: '27%', dir: 'up' },
  { n: '6', name: 'String', body: 'The note itself. Regulation leaves it alone; the tuning is what sets it.', x: '96%', y: '42%', dir: 'up' },
];

const REPAIRS = [
  ['Full regulation, upright', '$380'],
  ['Full regulation, grand', '$680'],
  ['A sticking key', '$25 a key'],
  ['A broken string, replaced', '$65-120'],
  ['Hammers reshaped and voiced', '$180'],
  ['New key tops, all 52', '$420'],
  ['A squeaking pedal', '$30'],
];

const RESTORE_STEPS = [
  ['I', 'Assessment', 'A morning at your house with a torch and a notebook, and a written estimate by post.'],
  ['II', 'To the workshop', 'Collected by our movers in a padded van; the action comes out on the first day.'],
  ['III', 'Strings and pins', 'New wire, new tuning pins if the old ones slip, the soundboard shimmed and sealed.'],
  ['IV', 'The action', 'New hammers and dampers, re-bushed keys, every centre pinned and every spring set.'],
  ['V', 'Home again', 'Four tunings in its first year back, which are included in the price.'],
];

type Plan = { who: string; note: string; months: number[] };

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const PLANNER: Plan[] = [
  { who: 'At home, played most days', note: 'Spring and autumn, as the heating goes off and on', months: [2, 9] },
  { who: 'Teaching studio', note: 'Once a term', months: [0, 3, 6, 9] },
  { who: 'New piano, first year', note: 'The new strings are still stretching', months: [1, 4, 7, 10] },
  { who: 'Church or school hall', note: 'And before the carol service', months: [2, 8, 11] },
  { who: 'Concert grand', note: 'Before every performance', months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
];

type Range = { from: string; name: string; body: string; kind: 'dry' | 'ok' | 'damp' };

const RANGES: Range[] = [
  { from: 'Under 30%', name: 'Too dry', body: 'The soundboard can crack, tuning pins loosen and keys click.', kind: 'dry' },
  { from: '30-40%', name: 'Dry', body: 'Pitch sinks flat through the winter.', kind: 'dry' },
  { from: '40-50%', name: 'Right', body: 'The piano holds its tuning and the action stays even.', kind: 'ok' },
  { from: '50-60%', name: 'Damp', body: 'Pitch rises sharp; keys slow to come back up.', kind: 'damp' },
  { from: 'Over 60%', name: 'Too damp', body: 'Keys stick, strings rust and the action turns sluggish.', kind: 'damp' },
];

const KEEP = [
  'Against an inside wall, not under a window',
  'A metre from radiators, stoves and vents',
  'Out of the afternoon sun',
  'A humidity control fitted inside the piano: $420, fitted',
];

type Tip = { mark: 'accent' | 'staccato' | 'tenuto' | 'fermata'; name: string; body: string };

const MOVING: Tip[] = [
  { mark: 'accent', name: 'Never on your own', body: 'An upright weighs 200 kg and a grand twice that. Stairs need a crew of three and a stair board.' },
  { mark: 'tenuto', name: 'Grands go on their side', body: 'Legs and lyre off, lid down, strapped to a skid. We can recommend two movers who know how.' },
  { mark: 'staccato', name: 'Short hops count too', body: 'Even across a room: lift, never drag. Casters were never meant to roll on a floor.' },
  { mark: 'fermata', name: 'Then let it rest', body: 'Wait two to three weeks in the new room before tuning, while the wood takes to the air.' },
];

type Area = { dyn: string; name: string; fee: string; towns: string[] };

const AREAS: Area[] = [
  { dyn: 'pp', name: 'Close by', fee: 'No travel charge', towns: ['Linden Vale', 'Organ Row and the Old Town', 'Marsh End', 'Stoke Linden'] },
  { dyn: 'mf', name: 'A short drive', fee: '$15 travel', towns: ['Harrowgate', 'Kestle', 'Upper Ashby', 'Wenmore', 'Fallowfield'] },
  { dyn: 'ff', name: 'Worth the trip', fee: '$30 travel', towns: ['Brackton', 'Cold Norton', 'St Anne\'s Bay', 'Hallam Cross'] },
];

export default function HollisPianoPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f7f3ea',
        '--ink': '#171513',
        '--felt': '#a5232e',
        '--brass': '#b58b3f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,felt,brass"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Spectral:ital@0;1&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Hollis Piano Service</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Ada Hollis, RPT</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p className={s.barNote}>
          <a data-edit="bar.link2" data-edit-max="28" href="tel:+15550186614">(555) 018-6614</a>
        </p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link3.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The title page of a score, beside a leaf of manuscript paper. */}
        <section className={s.hero} aria-labelledby="hp-hero-h">
          <div className={s.titlePage}>
            <p data-edit="hpHero.opus" data-edit-max="240" data-edit-multiline className={s.opus}>Tuning, regulation and restoration, Op. 14</p>
            <h1 id="hp-hero-h" className={s.title}>
              <span data-edit="hpHero.titleSmall" data-edit-max="60" className={s.titleSmall}>The</span>
              <span data-edit="hpHero.text" data-edit-max="60">Hollis Piano</span>
              <span data-edit="hpHero.text2" data-edit-max="60">Service</span>
            </h1>
            <p className={s.composer}>
              <span data-edit="hpHero.text3" data-edit-max="60">Ada Hollis, RPT</span>
              <span data-edit="hpHero.composerSub" data-edit-max="60" className={s.composerSub}>14 Organ Row, Linden Vale</span>
            </p>
            <p data-edit="hpHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              I tune, regulate and repair uprights and grands in homes, schools,
              churches and halls across the Vale, and restore them at the
              workshop on Organ Row. Twenty-two years at the keyboard, and a
              registered technician since 2009.
            </p>
            <p className={s.ctas}>
              <a data-edit="hpHero.btn" data-edit-max="28" className={s.btn} href="#book">Book a tuning</a>
              <a data-edit="hpHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#tuning">The price list</a>
            </p>
          </div>

          <figure className={s.leaf}>
            <p data-edit="hpHero.leafTempo" data-edit-max="240" data-edit-multiline className={s.leafTempo}>Moderato</p>
            <p data-edit="hpHero.leafNo" data-edit-max="240" data-edit-multiline className={s.leafNo}>1</p>
            <div data-edit-pattern="hpHero.field" data-edit-roles="transparent,1,1,3,1,2" className={s.manuscript} aria-hidden="true">
              <TabbiedPattern
                pattern={batiste}
                palette={STAVES}
                options={{ frequency: 0.7 }}
                fit="grid"
                cellSize={46}
                seed="hollis-manuscript"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <figcaption className={s.leafCap}>
              <span data-edit="hpHero.dyn" data-edit-max="60" className={s.dyn}>mp</span>
              <span data-edit="hpHero.text4" data-edit-max="60">Visits Monday to Saturday, 08:30-18:00. Evenings for concert work.</span>
            </figcaption>
          </figure>
        </section>

        {/* ---------------------------------------------------------- TUNING
            The price list set as a score: a bar to each service. */}
        <section id="tuning" className={s.sec} aria-labelledby="hp-tuning-h">
          <div className={s.secHead}>
            <p data-edit="tuning.measure" data-edit-max="240" data-edit-multiline className={s.measure}>m. 9</p>
            <h2 id="hp-tuning-h" className={s.tempo}>
              <span data-edit="tuning.tempoWord" data-edit-max="60" className={s.tempoWord}>Allegro:</span>
              <span data-edit="tuning.tempoRest" data-edit-max="60" className={s.tempoRest}>tunings</span>
            </h2>
            <p data-edit="tuning.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Prices for a visit anywhere in the Vale, travel below. Pay by card, cash or cheque on the day.</p>
          </div>

          <ol className={s.score}>
            {TUNINGS.map((b, i) => (
              <li key={b.name} className={s.scoreBar}>
                <div className={s.barTop}>
                  <p className={s.barNo}>{i + 1}</p>
                  <h3 data-edit={`tuning.barName.${i}`} data-edit-max="40" className={s.barName}>{b.name}</h3>
                </div>
                <div className={s.barStaff}>
                  <p data-edit={`tuning.barPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.barPrice}>{b.price}</p>
                  <p data-edit={`tuning.barTime.${i}`} data-edit-max="240" data-edit-multiline className={s.barTime}>{b.time}</p>
                </div>
                <p data-edit={`tuning.barDyn.${i}`} data-edit-max="240" data-edit-multiline className={s.barDyn}>{b.dyn}</p>
                <p data-edit={`tuning.barBody.${i}`} data-edit-max="240" data-edit-multiline className={s.barBody}>{b.body}</p>
              </li>
            ))}
          </ol>
          <p data-edit="tuning.scoreFoot" data-edit-max="240" data-edit-multiline className={s.scoreFoot}>A tuning includes a look at the pedals, a note of anything amiss, and a card with the date and the pitch it was left at.</p>
        </section>

        {/* ------------------------------------------------------ REGULATION
            The action of one key, with its parts called out by number. */}
        <section id="regulation" className={s.sec} aria-labelledby="hp-reg-h">
          <div className={s.secHead}>
            <p data-edit="regulation.measure" data-edit-max="240" data-edit-multiline className={s.measure}>m. 17</p>
            <h2 id="hp-reg-h" className={s.tempo}>
              <span data-edit="regulation.tempoWord" data-edit-max="60" className={s.tempoWord}>Andante:</span>
              <span data-edit="regulation.tempoRest" data-edit-max="60" className={s.tempoRest}>regulation and repairs</span>
            </h2>
            <p data-edit="regulation.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>A piano has about 9,000 moving parts, most of them in the action. Regulation sets every one of them, key by key, so the piano does what your fingers ask.</p>
          </div>

          <figure className={s.diagram}>
            <div className={s.diagramPic}>
              <Artwork
                slug="hollis-piano-action"
                alt="The action of one grand piano key in side view: the key lever, the wippen, the let-off button, the hammer, the damper and the string"
                inks={['var(--text)']}
                className={s.action}
              />
              {PARTS.map((p, i) => (
                <span
                  key={p.n}
                  className={`${s.callout} ${p.dir === 'up' ? s.calloutUp : s.calloutDown}`}
                  style={{ left: p.x, '--y': p.y } as React.CSSProperties}
                  aria-hidden="true">
                  <span data-edit={`regulation.calloutNo.${i}`} data-edit-max="60" className={s.calloutNo}>{p.n}</span>
                </span>
              ))}
            </div>
            <figcaption data-edit="regulation.diagramCap" data-edit-max="120" data-edit-multiline className={s.diagramCap}>One key of a grand, from the key at the left to the string at the right. Numbers keyed below.</figcaption>
          </figure>

          <div className={s.regGrid}>
            <ol className={s.parts}>
              {PARTS.map((p, i) => (
                <li key={p.n}>
                  <span data-edit={`regulation.partNo.${i}`} data-edit-max="60" className={s.partNo}>{p.n}</span>
                  <div>
                    <h3 data-edit={`regulation.partName.${i}`} data-edit-max="40" className={s.partName}>{p.name}</h3>
                    <p data-edit={`regulation.partBody.${i}`} data-edit-max="240" data-edit-multiline className={s.partBody}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className={s.repairs}>
              <h3 data-edit="regulation.boxTitle" data-edit-max="40" className={s.boxTitle}>Repairs, by the piece</h3>
              <dl className={s.priceList}>
                {REPAIRS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`regulation.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`regulation.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="regulation.small" data-edit-max="240" data-edit-multiline className={s.small}>Most repairs are done on the spot during a tuning. Parts are extra at cost.</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- RESTORATION
            Prose round the curve of a grand, like a magazine page. */}
        <section id="restoration" className={s.sec} aria-labelledby="hp-rest-h">
          <div className={s.secHead}>
            <p data-edit="restoration.measure" data-edit-max="240" data-edit-multiline className={s.measure}>m. 25</p>
            <h2 id="hp-rest-h" className={s.tempo}>
              <span data-edit="restoration.tempoWord" data-edit-max="60" className={s.tempoWord}>Adagio:</span>
              <span data-edit="restoration.tempoRest" data-edit-max="60" className={s.tempoRest}>restoration takes time</span>
            </h2>
            <p data-edit="restoration.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>From $4,800 for an upright and $9,500 for a grand, over three to five months. A written estimate first, always.</p>
          </div>

          <div className={s.essay}>
            <Artwork
              slug="hollis-piano-grand"
              alt="A grand piano with its lid propped open, seen from its curved side"
              inks={['var(--text)', 'var(--paper)']}
              className={s.grand}
            />
            <p data-edit="restoration.dropCap" data-edit-max="240" data-edit-multiline className={s.dropCap}>
              A piano that has sat silent in a front room for thirty years is
              rarely beyond saving. The case is usually sound; what has gone is
              the felt, the leather and the wire, the parts made to wear out.
              Restoration replaces those and keeps the rest, so the instrument
              you bring back is the one your grandmother played, with its own
              voice and its own marks on the fall board.
            </p>
            <p data-edit="restoration.body" data-edit-max="240" data-edit-multiline>
              The work happens at the bench on Organ Row, one piano at a time.
              The action comes out on the first day and goes into drawers, each
              part in order. The strings come off; the pinblock is tested pin by
              pin; the soundboard is shimmed where it has cracked and sealed
              where it has not. New wire goes on by hand and is pulled up to
              pitch over a week, a few turns at a time, so nothing is shocked.
            </p>
            <p data-edit="restoration.body2" data-edit-max="240" data-edit-multiline>
              Then the slow part. Every key is re-bushed and levelled; hammers
              are hung, filed and voiced; dampers are cut to fit their strings.
              The action is regulated twice, once on the bench and once in the
              piano, and the piano is tuned four times before it leaves.
            </p>
            <p data-edit="restoration.body3" data-edit-max="240" data-edit-multiline>
              I will not rush a restoration, and I will tell you honestly when a
              piano is not worth the money. About one in five is not, and for
              those I can usually find a school or a church that would be glad
              of it as it is.
            </p>
          </div>

          <ol className={s.restoreSteps}>
            {RESTORE_STEPS.map(([n, name, body], i) => (
              <li key={n}>
                <p data-edit={`restoration.restoreNo.${i}`} data-edit-max="240" data-edit-multiline className={s.restoreNo}>{n}</p>
                <h3 data-edit={`restoration.restoreName.${i}`} data-edit-max="40" className={s.restoreName}>{name}</h3>
                <p data-edit={`restoration.restoreBody.${i}`} data-edit-max="240" data-edit-multiline className={s.restoreBody}>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ CARE
            How often, humidity and moving: the planner, the dial, the marks. */}
        <section id="care" className={s.sec} aria-labelledby="hp-often-h">
          <div className={s.secHead}>
            <p data-edit="care.measure" data-edit-max="240" data-edit-multiline className={s.measure}>m. 33</p>
            <h2 id="hp-often-h" className={s.tempo}>
              <span data-edit="care.tempoWord" data-edit-max="60" className={s.tempoWord}>Tempo giusto:</span>
              <span data-edit="care.tempoRest" data-edit-max="60" className={s.tempoRest}>how often to tune</span>
            </h2>
            <p data-edit="care.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>A note on the staff is a tuning in that month. Most pianos drift with the seasons more than with playing.</p>
          </div>

          <div className={s.plannerWrap}>
            <table className={s.planner}>
              <caption data-edit="care.srOnly" className={s.srOnly}>Recommended tuning months for each kind of piano</caption>
              <thead>
                <tr>
                  <th data-edit="care.heading" scope="col">Piano</th>
                  {MONTHS.map((m, i) => (
                    <th data-edit={`care.heading2.${i}`} key={MONTH_NAMES[i]} scope="col" abbr={MONTH_NAMES[i]}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLANNER.map((row, i) => (
                  <tr key={row.who}>
                    <th scope="row">
                      <span data-edit={`care.planWho.${i}`} data-edit-max="60" className={s.planWho}>{row.who}</span>
                      <span data-edit={`care.planNote.${i}`} data-edit-max="60" className={s.planNote}>{row.note}</span>
                    </th>
                    {MONTHS.map((m, i) => (
                      <td key={MONTH_NAMES[i]}>
                        {row.months.includes(i) ? <span className={s.note} role="img" aria-label={`Tune in ${MONTH_NAMES[i]}`} /> : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="humidity" className={s.sec} aria-labelledby="hp-hum-h">
          <div className={s.secHead}>
            <p data-edit="humidity.measure" data-edit-max="240" data-edit-multiline className={s.measure}>m. 41</p>
            <h2 id="hp-hum-h" className={s.tempo}>
              <span data-edit="humidity.tempoWord" data-edit-max="60" className={s.tempoWord}>Sostenuto:</span>
              <span data-edit="humidity.tempoRest" data-edit-max="60" className={s.tempoRest}>humidity and your piano</span>
            </h2>
            <p data-edit="humidity.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>A piano is wood and felt under twenty tonnes of string tension. Keep the air steady and the tuning holds.</p>
          </div>

          <div className={s.humidity}>
            <figure className={s.gauge}>
              <div data-edit-pattern="humidity.field" data-edit-roles="0,1,3,2" className={s.dial} aria-hidden="true">
                <TabbiedPattern
                  pattern={meridianhatch}
                  palette={DIAL}
                  fit="grid"
                  cellSize={40}
                  seed="hollis-dial"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.needle} aria-hidden="true" />
              <span className={s.hub} aria-hidden="true" />
              <figcaption className={s.gaugeCap}>
                <span data-edit="humidity.gaugeRead" data-edit-max="60" className={s.gaugeRead}>45%</span>
                <span data-edit="humidity.text" data-edit-max="60">Where the needle should sit, all year</span>
              </figcaption>
            </figure>

            <div className={s.rangeCol}>
              <ol className={s.ranges}>
                {RANGES.map((r, i) => (
                  <li key={r.from} className={s[r.kind]}>
                    <p data-edit={`humidity.rangeFrom.${i}`} data-edit-max="240" data-edit-multiline className={s.rangeFrom}>{r.from}</p>
                    <p data-edit={`humidity.rangeName.${i}`} data-edit-max="240" data-edit-multiline className={s.rangeName}>{r.name}</p>
                    <p data-edit={`humidity.rangeBody.${i}`} data-edit-max="240" data-edit-multiline className={s.rangeBody}>{r.body}</p>
                  </li>
                ))}
              </ol>
              <h3 data-edit="humidity.boxTitle" data-edit-max="40" className={s.boxTitle}>Where to keep it</h3>
              <ul className={s.keep}>
                {KEEP.map((k, i) => (
                  <li data-edit={`humidity.item.${i}`} data-edit-max="80" key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="moving" className={s.sec} aria-labelledby="hp-move-h">
          <div className={s.secHead}>
            <p data-edit="moving.measure" data-edit-max="240" data-edit-multiline className={s.measure}>m. 49</p>
            <h2 id="hp-move-h" className={s.tempo}>
              <span data-edit="moving.tempoWord" data-edit-max="60" className={s.tempoWord}>Con cura:</span>
              <span data-edit="moving.tempoRest" data-edit-max="60" className={s.tempoRest}>moving a piano</span>
            </h2>
            <p data-edit="moving.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Four markings to play it by. I do not move pianos, but I will tell you who does, and tune it once it has settled.</p>
          </div>

          <ul className={s.moving}>
            {MOVING.map((t, i) => (
              <li key={t.name}>
                <span className={`${s.markSign} ${s[t.mark]}`} aria-hidden="true" />
                <p data-edit={`moving.markLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.markLabel}>{t.mark}</p>
                <h3 data-edit={`moving.moveName.${i}`} data-edit-max="40" className={s.moveName}>{t.name}</h3>
                <p data-edit={`moving.moveBody.${i}`} data-edit-max="240" data-edit-multiline className={s.moveBody}>{t.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="hp-book-h">
          <div className={s.secHead}>
            <p data-edit="book.measure" data-edit-max="240" data-edit-multiline className={s.measure}>m. 57</p>
            <h2 id="hp-book-h" className={s.tempo}>
              <span data-edit="book.tempoWord" data-edit-max="60" className={s.tempoWord}>Da capo:</span>
              <span data-edit="book.tempoRest" data-edit-max="60" className={s.tempoRest}>book a tuning</span>
            </h2>
            <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>I reply the same evening with two or three times that week. Regulars are sent a reminder when the next one is due.</p>
          </div>

          <div className={s.bookGrid}>
            <form className={s.form} action="#">
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="book.label" htmlFor="hp-name">Name</label>
                  <input id="hp-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label2" htmlFor="hp-phone">Phone</label>
                  <input id="hp-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label3" htmlFor="hp-email">Email</label>
                  <input id="hp-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label4" htmlFor="hp-town">Town</label>
                  <input id="hp-town" name="town" type="text" autoComplete="address-level2" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label5" htmlFor="hp-kind">The piano</label>
                  <select id="hp-kind" name="kind" defaultValue="upright">
                    <option value="upright">An upright</option>
                    <option value="grand">A grand or baby grand</option>
                    <option value="player">A player piano</option>
                    <option value="unsure">Not sure</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label6" htmlFor="hp-last">Last tuned</label>
                  <select id="hp-last" name="last" defaultValue="year">
                    <option value="year">Within the year</option>
                    <option value="few">Two to five years ago</option>
                    <option value="long">Longer than that</option>
                    <option value="never">Never, that I know of</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label7" htmlFor="hp-service">What it needs</label>
                  <select id="hp-service" name="service" defaultValue="tuning">
                    <option value="tuning">A standard tuning</option>
                    <option value="raise">A pitch raise</option>
                    <option value="concert">A concert tuning</option>
                    <option value="repair">A repair or regulation</option>
                    <option value="restore">A restoration estimate</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label8" htmlFor="hp-when">Best days</label>
                  <input id="hp-when" name="when" type="text" placeholder="e.g. weekday mornings" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="book.label9" htmlFor="hp-notes">The make, if you know it, and anything it is doing</label>
                  <textarea id="hp-notes" name="notes" rows={3} />
                </div>
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a time</button>
            </form>

            <aside className={s.diary} aria-labelledby="hp-diary-h">
              <div data-edit-pattern="hpDiary.field" data-edit-roles="transparent,1,1,3,1,2" className={s.diaryPaper} aria-hidden="true">
                <TabbiedPattern
                  pattern={batiste}
                  palette={STAVES}
                  options={{ frequency: 0.55 }}
                  fit="grid"
                  cellSize={40}
                  seed="hollis-diary"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.diaryCard}>
                <h3 data-edit="hpDiary.boxTitle" data-edit-max="40" id="hp-diary-h" className={s.boxTitle}>Or ring the workshop</h3>
                <p className={s.diaryPhone}>
                  <a data-edit="hpDiary.link" data-edit-max="28" href="tel:+15550186614">(555) 018-6614</a>
                </p>
                <p className={s.diaryMail}>
                  <a data-edit="hpDiary.link2" data-edit-max="28" href="mailto:ada@hollispiano.example">ada@hollispiano.example</a>
                </p>
                <dl className={s.priceList}>
                  <div>
                    <dt data-edit="hpDiary.term" data-edit-max="28">Visits</dt>
                    <dd data-edit="hpDiary.body" data-edit-max="200" data-edit-multiline>Mon-Sat 08:30-18:00</dd>
                  </div>
                  <div>
                    <dt data-edit="hpDiary.term2" data-edit-max="28">Workshop</dt>
                    <dd data-edit="hpDiary.body2" data-edit-max="200" data-edit-multiline>By appointment</dd>
                  </div>
                  <div>
                    <dt data-edit="hpDiary.term3" data-edit-max="28">Cancel</dt>
                    <dd data-edit="hpDiary.body3" data-edit-max="200" data-edit-multiline>24 hours, no charge</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {/* ----------------------------------------------------------- AREAS */}
        <section id="areas" className={s.sec} aria-labelledby="hp-areas-h">
          <div className={s.secHead}>
            <p data-edit="areas.measure" data-edit-max="240" data-edit-multiline className={s.measure}>m. 65</p>
            <h2 id="hp-areas-h" className={s.tempo}>
              <span data-edit="areas.tempoWord" data-edit-max="60" className={s.tempoWord}>Poco a poco:</span>
              <span data-edit="areas.tempoRest" data-edit-max="60" className={s.tempoRest}>areas served</span>
            </h2>
            <p data-edit="areas.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Marked by how loud the drive is. Further than these by arrangement, grouped with other pianos on the same day.</p>
          </div>

          <div className={s.areas}>
            <ul className={s.areaList}>
              {AREAS.map((a, i) => (
                <li key={a.dyn}>
                  <p data-edit={`areas.areaDyn.${i}`} data-edit-max="240" data-edit-multiline className={s.areaDyn}>{a.dyn}</p>
                  <div>
                    <h3 data-edit={`areas.areaName.${i}`} data-edit-max="40" className={s.areaName}>{a.name}</h3>
                    <p data-edit={`areas.areaFee.${i}`} data-edit-max="240" data-edit-multiline className={s.areaFee}>{a.fee}</p>
                    <p className={s.areaTowns}>{a.towns.join(', ')}</p>
                  </div>
                </li>
              ))}
            </ul>
            <figure className={s.roundMap}>
              <div data-edit-pattern="areas.field" data-edit-roles="transparent,1,2,3,1,1" className={s.roundField} aria-hidden="true">
                <TabbiedPattern
                  pattern={stitch}
                  palette={ROUND}
                  options={{ frequency: 0.35 }}
                  fit="grid"
                  cellSize={30}
                  seed="hollis-round"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="areas.roundCap" data-edit-max="120" data-edit-multiline className={s.roundCap}>Every stitch a piano on the books: 612 of them across the Vale.</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.coda}>
          <span className={s.repeat} aria-hidden="true" />
          <p data-edit="footer.codaText" data-edit-max="240" data-edit-multiline className={s.codaText}>D.C. al Coda</p>
          <span className={s.codaSign} aria-hidden="true" />
        </div>
        <div data-edit-pattern="footer.field" data-edit-roles="1,3,0,3,2,3" className={s.fallboard} aria-hidden="true">
          <TabbiedPattern
            pattern={reeding}
            palette={FALLBOARD}
            fit="grid"
            cellSize={28}
            seed="hollis-fallboard"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Hollis Piano Service</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional piano tuner. Ada Hollis, the workshop, the towns and the prices are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The action drawing and the grand are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
