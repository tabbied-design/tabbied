import { TabbiedPattern } from 'tabbied/react';
import { moire, fluting, dotmatrix, ribline, grosgrain } from 'tabbied/patterns';
import s from './warm-valve-audio.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Warm Valve Audio: Hi-fi and valve amplifier repair, Harlow Cross',
  description:
    'Valve amplifiers, receivers, turntables, reel-to-reel decks and speakers, mended and bench-tested at 11 Wireless Row. Matched valve pairs, turntable setup, restorations and a shelf of restored hi-fi for sale.',
};

/* Site colors. The page is a hi-fi faceplate: brushed aluminium, black
   glass, amber backlight and a red pointer. The speaker grille, the heat
   sink, the pegboard, the turntable mat and the grille cloth all draw on a
   transparent ground so the metal or the wood shows between the lines. */
const ALU = '#e4e3de';
const BLACK = '#121212';
const AMBER = '#f2a93b';
const RED = '#d23a2e';

const GRILLE = ['transparent', BLACK, BLACK, BLACK, BLACK, BLACK];
const GRILLE_FOOT = ['transparent', BLACK, BLACK, BLACK, BLACK, BLACK];
const FINS = ['transparent', BLACK, BLACK, ALU, BLACK, BLACK];
const PEGBOARD = ['transparent', BLACK, BLACK, BLACK, BLACK, BLACK];
const MAT = ['transparent', BLACK, BLACK, BLACK, BLACK, BLACK];
const CLOTH = ['transparent', AMBER, AMBER, AMBER, AMBER, AMBER];

const NAV = [
  ['Repairs', '#repair'],
  ['The bench', '#bench'],
  ['Restorations', '#restore'],
  ['Valves', '#valves'],
  ['Turntables', '#turntables'],
  ['Buy and sell', '#buysell'],
  ['Drop off', '#dropoff'],
];

const FREQS = ['88', '90', '92', '94', '96', '98', '100', '102', '104', '106', '108'];

/* The VU scale, computed once: a pivot below the face, the arc 46 degrees
   either side of upright, the red zone from 0 VU to +3. */
const rad = (a: number) => (a * Math.PI) / 180;
const pt = (a: number, r: number) => [
  Number((100 + r * Math.sin(rad(a))).toFixed(2)),
  Number((150 - r * Math.cos(rad(a))).toFixed(2)),
];
const arc = (from: number, to: number, r: number) => {
  const [x1, y1] = pt(from, r);
  const [x2, y2] = pt(to, r);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
};
const VU_ARC = arc(-46, 46, 100);
const VU_RED = arc(20, 46, 103);
const VU_TICKS = [-46, -39, -33, -28, -23, -18, -14, -9, -4, 0, 3, 6, 10, 15, 20, 24, 28, 32, 36, 41, 46].map((a) => {
  const major = [-46, -33, -23, -14, -4, 3, 10, 20, 28, 36, 46].includes(a);
  const [x1, y1] = pt(a, 100);
  const [x2, y2] = pt(a, major ? 112 : 107);
  return { a, major, x1, y1, x2, y2 };
});
const VU_LABELS = [
  ['20', -46],
  ['10', -33],
  ['7', -23],
  ['5', -14],
  ['3', -4],
  ['1', 10],
  ['0', 20],
  ['1', 28],
  ['3', 46],
].map(([t, a]) => {
  const [x, y] = pt(Number(a), 121);
  return { t: String(t), a: Number(a), x, y, red: Number(a) >= 20 };
});

type Meter = { label: string; kind: 'vuLeft' | 'vuRight' };

const METERS: Meter[] = [
  { label: 'Left', kind: 'vuLeft' },
  { label: 'Right', kind: 'vuRight' },
];

const KNOBS = ['Bass', 'Treble', 'Volume'];

const HERO_READOUTS = [
  ['Since', '1979'],
  ['Amps mended', '4,200+'],
  ['Warranty', '90 days'],
];

type Repair = { no: string; name: string; kind: string; note: string; from: string };

const REPAIRS: Repair[] = [
  {
    no: '01',
    name: 'Valve amplifiers',
    kind: 'Integrated, power and pre',
    note: 'Recapped, retubed with pairs matched on our tester, bias set and the hum chased out. Output transformers rewound when they have to be.',
    from: '$180',
  },
  {
    no: '02',
    name: 'Receivers',
    kind: 'Valve and solid state, 1955-1990',
    note: 'Dial cords restrung, lamps changed, switches and pots cleaned, and the tuner realigned on the signal generator.',
    from: '$160',
  },
  {
    no: '03',
    name: 'Turntables',
    kind: 'Belt, idler and direct drive',
    note: 'Motors serviced, bearings cleaned and oiled, speed set to the strobe, tonearms rewired and cartridges aligned.',
    from: '$120',
  },
  {
    no: '04',
    name: 'Reel-to-reel',
    kind: 'Two and four track',
    note: 'Heads cleaned, demagnetised and aligned, pinch rollers replaced, brakes and tension adjusted.',
    from: '$220',
  },
  {
    no: '05',
    name: 'Speakers',
    kind: 'Cones, surrounds and crossovers',
    note: 'Foam surrounds replaced, crossovers recapped, and a torn cone reconed by hand.',
    from: '$140',
  },
];

const NOT_SURE = [
  'Cassette decks, on Thursdays only',
  'Jukeboxes and valve radios, by appointment',
  'Guitar amplifiers, if they are valve',
];

type Fee = { label: string; value: string; note: string };

const FEES: Fee[] = [
  { label: 'Bench fee', value: '$65', note: 'To open it up, find the fault and write an estimate. Taken off the bill if you go ahead.' },
  { label: 'Labour', value: '$78/h', note: 'Most amplifier repairs take two to four hours on the bench.' },
  { label: 'Estimate', value: '5 days', note: 'In writing, by email, with photographs of what we found inside.' },
  { label: 'Parts', value: 'Cost+10', note: 'Film capacitors, carbon film resistors, new or new-old-stock valves.' },
  { label: 'Warranty', value: '90 days', note: 'On the work and on every part we fit.' },
];

const BENCH_KIT = [
  'A Hickok valve tester, calibrated each spring',
  'A 100 MHz scope and a distortion analyser',
  'A variac, so nothing old is switched straight on',
  'Two technicians: Mo Adeyemi and Ruth Calder',
];

const STEPS = [
  ['Strip', 'Every valve, knob and board out, photographed and bagged.'],
  ['Recap', 'All the electrolytic and coupling capacitors, not just the swollen ones.'],
  ['Rewire', 'Perished rubber wire swapped for cloth-covered, the way it left the factory.'],
  ['Retube', 'Matched pairs from our stock, measured and logged.'],
  ['Align', 'Bias, balance and the tuner set on the scope.'],
  ['Soak', 'Forty-eight hours playing on the burn-in shelf.'],
];

type Resto = {
  name: string;
  year: string;
  weeks: string;
  price: string;
  rows: string[][];
};

const RESTOS: Resto[] = [
  {
    name: 'Leak Stereo 20',
    year: '1959 stereo power amplifier',
    weeks: '3 weeks',
    price: '$640',
    rows: [
      ['Output', '8 W', '12 W'],
      ['Hum', '-52 dB', '-80 dB'],
      ['Distortion', '2.1%', '0.1%'],
    ],
  },
  {
    name: 'Marantz 2270',
    year: '1972 receiver',
    weeks: '4 weeks',
    price: '$890',
    rows: [
      ['Output', '41 W', '70 W'],
      ['Dial lamps', '3 of 8', '8 of 8'],
      ['FM sensitivity', '9 uV', '2 uV'],
    ],
  },
  {
    name: 'Revox A77',
    year: '1974 tape recorder',
    weeks: '2 weeks',
    price: '$560',
    rows: [
      ['Wow and flutter', '0.35%', '0.07%'],
      ['Speed error', '-2.8%', '0.2%'],
      ['Head wear', 'Worn', 'Lapped'],
    ],
  },
];

type Valve = { type: string; use: string; make: string; pair: string; stock: string; level: 'full' | 'low' | 'ask' };

const VALVES: Valve[] = [
  { type: 'EL34', use: 'Power pentode, the classic output valve', make: 'JJ, Slovakia', pair: '$58', stock: 'In stock', level: 'full' },
  { type: 'KT88', use: 'Beam tetrode for big output stages', make: 'Gold Lion reissue', pair: '$142', stock: 'In stock', level: 'full' },
  { type: '12AX7', use: 'Twin triode, preamp and phase splitter', make: 'Tung-Sol reissue', pair: '$44', stock: 'In stock', level: 'full' },
  { type: 'EL84', use: 'Small power pentode, 10-17 W amps', make: 'Electro-Harmonix', pair: '$36', stock: '4 pairs left', level: 'low' },
  { type: '6L6GC', use: 'Beam tetrode, American amplifiers', make: 'JJ, Slovakia', pair: '$62', stock: 'In stock', level: 'full' },
  { type: 'ECC82', use: 'Twin triode driver, also 12AU7', make: 'Mullard, new old stock', pair: '$96', stock: 'Ask first', level: 'ask' },
  { type: 'GZ34', use: 'Rectifier, sold singly', make: 'JJ, Slovakia', pair: '$26', stock: 'In stock', level: 'full' },
];

const TT_SERVICES = [
  ['Cartridge alignment', '$45', 'Overhang, azimuth, tracking force and anti-skate, set with a protractor and a test record.'],
  ['Belt or idler service', '$120', 'New belt or idler tyre, bearing cleaned and oiled, speed set to the strobe.'],
  ['Tonearm rewire', '$95', 'Litz wire from the cartridge clips to new phono plugs.'],
  ['Plinth build', 'from $380', 'Walnut or birch ply, for idler decks that deserve better than their box.'],
];

type Sale = { item: string; note: string; price: string; grade: number; kind: 'g5' | 'g4' };

const SALE: Sale[] = [
  { item: 'Leak Stereo 20', note: 'Restored here in 2025. New EL84s, 12 W a side.', price: '$1,150', grade: 5, kind: 'g5' },
  { item: 'Quad 33 and 303', note: 'Pre and power pair, recapped, with the manuals.', price: '$780', grade: 4, kind: 'g4' },
  { item: 'Garrard 301', note: 'Grease bearing, in a walnut plinth we built.', price: '$1,400', grade: 5, kind: 'g5' },
  { item: 'Revox A77 Mk III', note: 'Two track, new pinch roller, fully aligned.', price: '$950', grade: 4, kind: 'g4' },
];

const WE_BUY = [
  'Valve amplifiers, working or not',
  'Receivers and tuners from before 1985',
  'Idler turntables and good tonearms',
  'Boxes of valves from an old workshop',
];

const HOURS = [
  ['Tue-Fri', '10:00-18:00'],
  ['Saturday', '10:00-16:00'],
  ['Sun-Mon', 'Off air'],
];

export default function WarmValveAudioPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--alu': '#e4e3de',
        '--black': '#121212',
        '--amber': '#f2a93b',
        '--red': '#d23a2e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="alu,black,amber,red"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Michroma&family=Syncopate:wght@400;700&family=Share+Tech+Mono&family=Red+Hat+Text:ital,wght@0,300..700;1,400&display=swap"
      />

      {/* The header is the tuning dial: the sections are its stations. */}
      <header className={s.bar}>
        <a className={s.badge} href="#top">
          <span data-edit="bar.badgeMark" data-edit-max="60" className={s.badgeMark}>WV</span>
          <span data-edit="bar.badgeName" data-edit-max="60" className={s.badgeName}>Warm Valve Audio</span>
        </a>
        <div className={s.dial}>
          <p className={s.dialFreqs} aria-hidden="true">
            {FREQS.map((f, i) => (
              <span data-edit={`bar.text.${i}`} data-edit-max="60" key={f}>{f}</span>
            ))}
          </p>
          <nav className={s.stations} aria-label="Sections">
            {NAV.map(([label, href], i) => (
              <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
            ))}
          </nav>
          <span className={s.pointer} aria-hidden="true" />
        </div>
        <span className={s.tuner} aria-hidden="true" />
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="wv-hero-h">
          <div className={s.faceplate}>
            <div data-edit-pattern="wvHero.field" data-edit-roles="transparent,1,1,1,1,1" className={s.grille} aria-hidden="true">
              <TabbiedPattern
                pattern={moire}
                palette={GRILLE}
                fit="grid"
                cellSize={64}
                seed="warm-valve-grille"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div className={s.window}>
              <Artwork
                slug="warm-valve-audio-valve"
                alt="A large vacuum tube glowing amber, its glass envelope and metal plates filling the dial window"
                inks={['var(--black)', 'var(--glow)']}
                className={s.valve}
              />
              <div className={s.windowText}>
                <p data-edit="wvHero.windowKicker" data-edit-max="240" data-edit-multiline className={s.windowKicker}>Service department, est. 1979</p>
                <h1 id="wv-hero-h" className={s.heroName}>
                  <span data-edit="wvHero.heroWarm" data-edit-max="60" className={s.heroWarm}>Warm Valve</span>
                  <span data-edit="wvHero.heroAudio" data-edit-max="60" className={s.heroAudio}>Audio</span>
                </h1>
                <p data-edit="wvHero.windowSub" data-edit-max="240" data-edit-multiline className={s.windowSub}>Hi-fi and valve amplifier repair</p>
              </div>
              <div className={s.windowScale} aria-hidden="true">
                <p className={s.scaleNums}>
                  {FREQS.map((f, i) => (
                    <span data-edit={`wvHero.text.${i}`} data-edit-max="60" key={f}>{f}</span>
                  ))}
                </p>
                <span className={s.scaleTicks} />
                <span data-edit="wvHero.scaleBand" data-edit-max="60" className={s.scaleBand}>FM MHz</span>
                <span className={s.scalePointer} />
              </div>
            </div>

            <div className={s.controls}>
              <div className={s.heroCopy}>
                <p data-edit="wvHero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
                  We mend the amplifiers, receivers, turntables and tape decks
                  that were built to be mended. Every repair plays on the
                  bench for two days before it goes home, and every valve we
                  fit is measured and matched.
                </p>
                <p data-edit="wvHero.heroAddress" data-edit-max="240" data-edit-multiline className={s.heroAddress}>11 Wireless Row, Harlow Cross</p>
                <div className={s.heroActions}>
                  <a data-edit="wvHero.pushRed" data-edit-max="28" className={s.pushRed} href="#dropoff">Book a slot</a>
                  <a data-edit="wvHero.pushBlack" data-edit-max="28" className={s.pushBlack} href="#valves">Valve stock</a>
                </div>
              </div>

              <div className={s.meters}>
                {METERS.map((m, i) => (
                  <figure key={m.kind} className={`${s.vu} ${s[m.kind]}`}>
                    <svg className={s.vuSvg} viewBox="0 0 200 120" aria-hidden="true">
                      <path className={s.vuArc} d={VU_ARC} />
                      <path className={s.vuRed} d={VU_RED} />
                      {VU_TICKS.map((t) => (
                        <line key={t.a} className={t.major ? s.vuMajor : s.vuMinor} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
                      ))}
                      {VU_LABELS.map((l) => (
                        <text key={l.a} className={l.red ? s.vuNumRed : s.vuNum} x={l.x} y={l.y}>
                          {l.t}
                        </text>
                      ))}
                      <text className={s.vuSign} x="14" y="98">-</text>
                      <text className={s.vuSignRed} x="186" y="98">+</text>
                      <text className={s.vuUnit} x="100" y="100">VU</text>
                      <g className={s.needle}>
                        <line x1="100" y1="150" x2="100" y2="34" />
                      </g>
                    </svg>
                    <figcaption data-edit={`wvHero.vuCap.${i}`} data-edit-max="120" data-edit-multiline className={s.vuCap}>{m.label}</figcaption>
                  </figure>
                ))}
              </div>

              <div className={s.knobRow}>
                {KNOBS.map((k, i) => (
                  <div key={k} className={s.knobUnit}>
                    <span className={s.knob} aria-hidden="true" />
                    <span data-edit={`wvHero.knobLabel.${i}`} data-edit-max="60" className={s.knobLabel}>{k}</span>
                  </div>
                ))}
                <div className={s.knobUnit}>
                  <span className={s.toggle} aria-hidden="true" />
                  <span data-edit="wvHero.knobLabel2" data-edit-max="60" className={s.knobLabel}>Power</span>
                </div>
              </div>

              <dl className={s.readouts}>
                {HERO_READOUTS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`wvHero.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`wvHero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- REPAIR */}
        <section id="repair" className={s.sec} aria-labelledby="wv-repair-h">
          <div className={s.secHead}>
            <p data-edit="repair.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Station 1</p>
            <h2 data-edit="repair.secTitle" data-edit-max="60" id="wv-repair-h" className={s.secTitle}>What we repair</h2>
            <p data-edit="repair.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Five kinds of machine, one bench. If it glows, hums, spins or
              has a dial, we have probably had one apart before.
            </p>
          </div>

          <div className={s.repairGrid}>
            <ol className={s.rack}>
              {REPAIRS.map((r, i) => (
                <li key={r.no} className={s.unit}>
                  <p data-edit={`repair.unitNo.${i}`} data-edit-max="240" data-edit-multiline className={s.unitNo}>{r.no}</p>
                  <div className={s.unitName}>
                    <h3 data-edit={`repair.title.${i}`} data-edit-max="40">{r.name}</h3>
                    <p data-edit={`repair.body.${i}`} data-edit-max="240" data-edit-multiline>{r.kind}</p>
                  </div>
                  <p data-edit={`repair.unitNote.${i}`} data-edit-max="240" data-edit-multiline className={s.unitNote}>{r.note}</p>
                  <p className={s.unitFrom}>
                    <span data-edit={`repair.text.${i}`} data-edit-max="60">From</span>
                    <strong data-edit={`repair.emphasis.${i}`}>{r.from}</strong>
                  </p>
                </li>
              ))}
            </ol>

            <aside className={s.notSure} aria-labelledby="wv-notsure-h">
              <div data-edit-pattern="wvNotsure.field" data-edit-roles="transparent,1,1,0,1,1" className={s.fins} aria-hidden="true">
                <TabbiedPattern
                  pattern={fluting}
                  palette={FINS}
                  fit="grid"
                  cellSize={28}
                  seed="warm-valve-fins"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="wvNotsure.notSureTitle" data-edit-max="40" id="wv-notsure-h" className={s.notSureTitle}>Not on the list?</h3>
              <p data-edit="wvNotsure.notSureText" data-edit-max="240" data-edit-multiline className={s.notSureText}>Ring before you carry it in. We also take on:</p>
              <ul className={s.ledList}>
                {NOT_SURE.map((n, i) => (
                  <li data-edit={`wvNotsure.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                ))}
              </ul>
              <p data-edit="wvNotsure.notSurePhone" data-edit-max="240" data-edit-multiline className={s.notSurePhone}>(555) 016-4410</p>
            </aside>
          </div>
        </section>

        {/* ----------------------------------------------------------- BENCH */}
        <section id="bench" className={`${s.sec} ${s.benchSec}`} aria-labelledby="wv-bench-h">
          <div className={s.benchGrid}>
            <figure className={s.benchPhoto}>
              <div className={s.benchScene}>
                <div data-edit-pattern="bench.field" data-edit-roles="transparent,1,1,1,1,1" className={s.pegboard} aria-hidden="true">
                  <TabbiedPattern
                    pattern={dotmatrix}
                    palette={PEGBOARD}
                    fit="grid"
                    cellSize={30}
                    seed="warm-valve-pegboard"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <span className={s.benchTop} aria-hidden="true" />
                <Artwork
                  slug="warm-valve-audio-amp"
                  alt="A valve amplifier on the bench, seen from the front at an angle, its glass tubes standing on top"
                  inks={['var(--text)', 'var(--alu)']}
                  className={s.amp}
                />
              </div>
              <figcaption data-edit="bench.benchCaption" data-edit-max="120" data-edit-multiline className={s.benchCaption}>On the bench this week: a 1961 integrated, in for new coupling caps and a pair of EL84s.</figcaption>
            </figure>

            <div className={s.benchText}>
              <div className={s.secHead}>
                <p data-edit="bench.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Station 2</p>
                <h2 data-edit="bench.secTitle" data-edit-max="60" id="wv-bench-h" className={s.secTitle}>Bench fees and estimates</h2>
                <p data-edit="bench.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  Nothing is fixed until you have said yes to a written price.
                  Here is what the bench costs, before and after.
                </p>
              </div>
              <dl className={s.fees}>
                {FEES.map((f, i) => (
                  <div key={f.label} className={s.fee}>
                    <dt data-edit={`bench.term.${i}`} data-edit-max="28">{f.label}</dt>
                    <dd data-edit={`bench.feeValue.${i}`} data-edit-max="200" data-edit-multiline className={s.feeValue}>{f.value}</dd>
                    <dd data-edit={`bench.feeNote.${i}`} data-edit-max="200" data-edit-multiline className={s.feeNote}>{f.note}</dd>
                  </div>
                ))}
              </dl>
              <ul className={s.kit}>
                {BENCH_KIT.map((k, i) => (
                  <li data-edit={`bench.item.${i}`} data-edit-max="80" key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- RESTORE */}
        <section id="restore" className={s.sec} aria-labelledby="wv-restore-h">
          <div className={s.secHead}>
            <p data-edit="restore.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Station 3</p>
            <h2 data-edit="restore.secTitle" data-edit-max="60" id="wv-restore-h" className={s.secTitle}>Full restorations</h2>
            <p data-edit="restore.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              For a machine you mean to keep another fifty years. It comes
              apart completely, and goes back together the way it left the
              factory, measured at both ends.
            </p>
          </div>

          <ol className={s.path}>
            {STEPS.map(([name, text], i) => (
              <li key={name}>
                <h3 data-edit={`restore.pathName.${i}`} data-edit-max="40" className={s.pathName}>{name}</h3>
                <p data-edit={`restore.pathText.${i}`} data-edit-max="240" data-edit-multiline className={s.pathText}>{text}</p>
              </li>
            ))}
          </ol>

          <div className={s.restos}>
            {RESTOS.map((r, i) => (
              <article key={r.name} className={s.resto}>
                <div className={s.restoHead}>
                  <h3 data-edit={`resto.restoName.${i}`} data-edit-max="40" className={s.restoName}>{r.name}</h3>
                  <p data-edit={`resto.restoYear.${i}`} data-edit-max="240" data-edit-multiline className={s.restoYear}>{r.year}</p>
                </div>
                <table className={s.restoTable}>
                  <caption className={s.srOnly}>{`${r.name}, measured before and after`}</caption>
                  <thead>
                    <tr>
                      <th data-edit={`resto.heading.${i}`} scope="col">Measured</th>
                      <th data-edit={`resto.heading2.${i}`} scope="col">In</th>
                      <th data-edit={`resto.heading3.${i}`} scope="col">Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.rows.map(([what, before, after], i2) => (
                      <tr key={what}>
                        <th data-edit={`resto.heading4.${i}.${i2}`} scope="row">{what}</th>
                        <td data-edit={`resto.cell.${i}.${i2}`}>{before}</td>
                        <td data-edit={`resto.after.${i}.${i2}`} className={s.after}>{after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className={s.restoFoot}>
                  <span data-edit={`resto.text.${i}`} data-edit-max="60">{r.weeks}</span>
                  <strong data-edit={`resto.emphasis.${i}`}>{r.price}</strong>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- VALVES */}
        <section id="valves" className={s.sec} aria-labelledby="wv-valves-h">
          <div className={s.valvePanel}>
            <div className={s.valveHead}>
              <div>
                <p data-edit="valves.panelNo" data-edit-max="240" data-edit-multiline className={s.panelNo}>Station 4</p>
                <h2 data-edit="valves.panelTitle" data-edit-max="60" id="wv-valves-h" className={s.panelTitle}>Valve stock</h2>
              </div>
              <p data-edit="valves.panelNote" data-edit-max="240" data-edit-multiline className={s.panelNote}>
                Every pair matched on the tester to within 5% and burned in
                for a day. Quads and matched sets to order. Post anywhere,
                or collect from the counter.
              </p>
            </div>
            <div className={s.tableWrap}>
              <table className={s.valveTable}>
                <caption data-edit="valves.srOnly" className={s.srOnly}>Valves in stock, what they do, who makes them and the price of a matched pair</caption>
                <thead>
                  <tr>
                    <th data-edit="valves.heading" scope="col">Type</th>
                    <th data-edit="valves.heading2" scope="col">What it does</th>
                    <th data-edit="valves.heading3" scope="col">Make</th>
                    <th data-edit="valves.num" scope="col" className={s.num}>Matched pair</th>
                    <th data-edit="valves.heading4" scope="col">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {VALVES.map((v, i) => (
                    <tr key={v.type}>
                      <th data-edit={`valves.valveType.${i}`} scope="row" className={s.valveType}>{v.type}</th>
                      <td data-edit={`valves.cell.${i}`}>{v.use}</td>
                      <td data-edit={`valves.valveMake.${i}`} className={s.valveMake}>{v.make}</td>
                      <td data-edit={`valves.num2.${i}`} className={s.num}>{v.pair}</td>
                      <td>
                        <span data-edit={`valves.stock.${i}`} data-edit-max="60" className={`${s.stock} ${s[v.level]}`}>{v.stock}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ TURNTABLES */}
        <section id="turntables" className={s.sec} aria-labelledby="wv-tt-h">
          <div className={s.ttGrid}>
            <div className={s.deck} aria-hidden="true">
              <div className={s.platter}>
                <div data-edit-pattern="turntables.field" data-edit-roles="transparent,1,1,1,1,1" className={s.mat}>
                  <TabbiedPattern
                    pattern={ribline}
                    palette={MAT}
                    fit="grid"
                    cellSize={22}
                    seed="warm-valve-mat"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <span className={s.spindle} />
              </div>
              <span className={s.armBase} />
              <span className={s.arm} />
              <span className={s.speed}>
                <span data-edit="turntables.text" data-edit-max="60">33</span>
                <span data-edit="turntables.text2" data-edit-max="60">45</span>
              </span>
            </div>

            <div className={s.ttText}>
              <div className={s.secHead}>
                <p data-edit="turntables.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Station 5</p>
                <h2 data-edit="turntables.secTitle" data-edit-max="60" id="wv-tt-h" className={s.secTitle}>Turntable setup</h2>
                <p data-edit="turntables.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  Most turntables that sound tired are only out of
                  adjustment. We set them up the slow way, with a protractor,
                  a scale and a test record.
                </p>
              </div>
              <dl className={s.services}>
                {TT_SERVICES.map(([name, price, note], i) => (
                  <div key={name}>
                    <dt data-edit={`turntables.term.${i}`} data-edit-max="28">{name}</dt>
                    <dd data-edit={`turntables.servicePrice.${i}`} data-edit-max="200" data-edit-multiline className={s.servicePrice}>{price}</dd>
                    <dd data-edit={`turntables.serviceNote.${i}`} data-edit-max="200" data-edit-multiline className={s.serviceNote}>{note}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- BUY/SELL */}
        <section id="buysell" className={s.sec} aria-labelledby="wv-buy-h">
          <div className={s.secHead}>
            <p data-edit="buysell.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Station 6</p>
            <h2 data-edit="buysell.secTitle" data-edit-max="60" id="wv-buy-h" className={s.secTitle}>Buying and selling</h2>
            <p data-edit="buysell.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              A short shelf of hi-fi we have restored ourselves, each with the
              same 90 days as a repair. It changes every week or two.
            </p>
          </div>

          <div className={s.buyGrid}>
            <ul className={s.shelf}>
              {SALE.map((item, i) => (
                <li key={item.item} className={s.tag}>
                  <h3 data-edit={`buysell.tagName.${i}`} data-edit-max="40" className={s.tagName}>{item.item}</h3>
                  <p data-edit={`buysell.tagNote.${i}`} data-edit-max="240" data-edit-multiline className={s.tagNote}>{item.note}</p>
                  <p className={s.tagGrade}>
                    <span data-edit={`buysell.gradeLabel.${i}`} data-edit-max="60" className={s.gradeLabel}>Condition</span>
                    <span className={`${s.gradeBar} ${s[item.kind]}`} aria-hidden="true" />
                    <span className={s.gradeText}>{`${item.grade} of 5`}</span>
                  </p>
                  <p data-edit={`buysell.tagPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.tagPrice}>{item.price}</p>
                </li>
              ))}
            </ul>

            <aside className={s.weBuy} aria-labelledby="wv-webuy-h">
              <div data-edit-pattern="wvWebuy.field" data-edit-roles="transparent,2,2,2,2,2" className={s.cloth} aria-hidden="true">
                <TabbiedPattern
                  pattern={grosgrain}
                  palette={CLOTH}
                  fit="grid"
                  options={{ frequency: 0.8 }}
                  cellSize={18}
                  seed="warm-valve-cloth"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="wvWebuy.weBuyTitle" data-edit-max="40" id="wv-webuy-h" className={s.weBuyTitle}>We buy, too</h3>
              <ul className={s.ledList}>
                {WE_BUY.map((w, i) => (
                  <li data-edit={`wvWebuy.item.${i}`} data-edit-max="80" key={w}>{w}</li>
                ))}
              </ul>
              <p data-edit="wvWebuy.weBuyNote" data-edit-max="240" data-edit-multiline className={s.weBuyNote}>Send a photograph and the model number. We pay on the day, or give you more against a repair.</p>
            </aside>
          </div>
        </section>

        {/* -------------------------------------------------------- DROP OFF */}
        <section id="dropoff" className={s.sec} aria-labelledby="wv-drop-h">
          <div className={s.dropGrid}>
            <div className={s.dropInfo}>
              <div className={s.secHead}>
                <p data-edit="dropoff.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Station 7</p>
                <h2 data-edit="dropoff.secTitle" data-edit-max="60" id="wv-drop-h" className={s.secTitle}>Drop off</h2>
                <p data-edit="dropoff.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  Book a bench slot and bring it in any time we are open.
                  Parking in the yard behind the shop, and a trolley if it is
                  heavy.
                </p>
              </div>
              <dl className={s.clock}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`dropoff.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`dropoff.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="dropoff.dropAddress" data-edit-max="240" data-edit-multiline className={s.dropAddress}>11 Wireless Row, Harlow Cross</p>
              <p className={s.dropContact}>
                <a data-edit="dropoff.link" data-edit-max="28" href="tel:+15550164410">(555) 016-4410</a>
              </p>
              <p className={s.dropContact}>
                <a data-edit="dropoff.link2" data-edit-max="28" href="mailto:bench@warmvalve.example">bench@warmvalve.example</a>
              </p>
            </div>

            <form className={s.form} action="#">
              <h3 data-edit="dropoff.formTitle" data-edit-max="40" className={s.formTitle}>Book a bench slot</h3>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="dropoff.label" htmlFor="wv-name">Name</label>
                  <input id="wv-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="dropoff.label2" htmlFor="wv-email">Email</label>
                  <input id="wv-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="dropoff.label3" htmlFor="wv-kind">What is it</label>
                  <select id="wv-kind" name="kind" defaultValue="amp">
                    <option value="amp">A valve amplifier</option>
                    <option value="receiver">A receiver or tuner</option>
                    <option value="turntable">A turntable</option>
                    <option value="tape">A tape deck</option>
                    <option value="speakers">Speakers</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="dropoff.label4" htmlFor="wv-model">Make and model</label>
                  <input id="wv-model" name="model" type="text" placeholder="Leak Stereo 20" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="dropoff.label5" htmlFor="wv-fault">What it does, or does not do</label>
                  <textarea id="wv-fault" name="fault" rows={4} placeholder="Hums in the left channel when warm" />
                </div>
              </div>
              <div className={s.switches}>
                <div className={s.switch}>
                  <input id="wv-restore" name="restore" type="checkbox" />
                  <label data-edit="dropoff.label6" htmlFor="wv-restore">Quote for a full restoration too</label>
                </div>
                <div className={s.switch}>
                  <input id="wv-collect" name="collect" type="checkbox" />
                  <label data-edit="dropoff.label7" htmlFor="wv-collect">Collect it from me, within 15 miles</label>
                </div>
              </div>
              <button data-edit="dropoff.submit" data-edit-max="24" className={s.submit} type="submit">Book the slot</button>
              <p data-edit="dropoff.formSmall" data-edit-max="240" data-edit-multiline className={s.formSmall}>We confirm by email within a day with your slot and a job number.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,1,1,1,1" className={s.footGrille} aria-hidden="true">
          <TabbiedPattern
            pattern={moire}
            palette={GRILLE_FOOT}
            fit="grid"
            cellSize={40}
            seed="warm-valve-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div className={s.footBrand}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Warm Valve Audio</p>
            <p data-edit="footer.footSub" data-edit-max="240" data-edit-multiline className={s.footSub}>Hi-fi and valve amplifier repair</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel" data-edit-max="240" data-edit-multiline className={s.footLabel}>Shop</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>11 Wireless Row, Harlow Cross. Yard parking behind.</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel2" data-edit-max="240" data-edit-multiline className={s.footLabel}>Bench</p>
            <p><a data-edit="footer.link" data-edit-max="28" href="tel:+15550164410">(555) 016-4410</a></p>
            <p><a data-edit="footer.link2" data-edit-max="28" href="mailto:bench@warmvalve.example">bench@warmvalve.example</a></p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel3" data-edit-max="240" data-edit-multiline className={s.footLabel}>Small print</p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional repair shop; the people, prices, stock and jobs are invented.</p>
            <p>Patterns by <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
            <p data-edit="footer.body3" data-edit-max="240" data-edit-multiline>The valve and the amplifier are generated images, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
