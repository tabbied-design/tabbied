import { TabbiedPattern } from 'tabbied/react';
import { slashbar, sliver, bothways, raking } from 'tabbied/patterns';
import s from './riposte-fencing.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Riposte Fencing Club: Foil, epee and sabre at the Drill Hall, Northgate',
  description:
    'Riposte Fencing Club fences four nights a week on six electric pistes in the Drill Hall on Garrison Street. A six-week beginner course, club nights, monthly competitions, kit hire and membership.',
};

/* Site colors. The piste is the ground; black is the hall and the scoring
   box, red and green are the two touch lamps. Pattern grounds are
   transparent so the plate or the panel behind them shows through. */
const PISTE = '#f1f2f0';
const BLACK = '#111317';
const RED = '#e0282e';
const GREEN = '#1fae5b';

const BLADES = ['transparent', PISTE, RED, PISTE, GREEN, PISTE];
const SLIVERS = ['transparent', PISTE, RED, GREEN, PISTE];
const CROSSINGS = ['transparent', BLACK, RED, BLACK, GREEN];
const RAKE = ['transparent', RED, PISTE, GREEN, PISTE, BLACK];
const GUARD = ['transparent', RED, GREEN, RED, PISTE];

const NAV = [
  ['Try fencing', '#try'],
  ['Weapons', '#weapons'],
  ['Club nights', '#nights'],
  ['Competitions', '#comps'],
  ['Coaches', '#coaches'],
  ['Kit and fees', '#kit'],
  ['Join', '#join'],
];

/* The five exposures of one lunge, faintest first: a Marey plate. */
const EXPOSURES = ['e1', 'e2', 'e3', 'e4'];

/* The piste, 14 m end to end, with the lines a referee reads. */
const PISTE_LINES = [
  { m: 0, label: 'Rear limit', kind: 'end' },
  { m: 2, label: 'Warning', kind: 'warn' },
  { m: 5, label: 'En garde', kind: 'guard' },
  { m: 7, label: 'Centre', kind: 'centre' },
  { m: 9, label: 'En garde', kind: 'guard' },
  { m: 12, label: 'Warning', kind: 'warn' },
  { m: 14, label: 'Rear limit', kind: 'end' },
];

const HERO_FACTS = [
  ['6', 'electric pistes'],
  ['4', 'nights a week'],
  ['1972', 'fencing in the Drill Hall'],
];

const WEEKS = [
  { n: '01', m: '2 m', title: 'En garde', note: 'Stance, the salute, and how to hold a foil without strangling it.' },
  { n: '02', m: '4 m', title: 'Advance, retreat', note: 'Footwork up and down the piste until it stops feeling like dancing.' },
  { n: '03', m: '6 m', title: 'The lunge', note: 'Extend the arm first, then the leg. Distance, and why it is everything.' },
  { n: '04', m: '8 m', title: 'Parry four', note: 'Your first defence, and the riposte the club is named after.' },
  { n: '05', m: '10 m', title: 'On the wire', note: 'Body wires, the scoring box, and your first touches that light a lamp.' },
  { n: '06', m: '12 m', title: 'First bout', note: 'Five touches against a classmate, refereed, with the whole club watching.' },
];

const COURSE = [
  ['Starts', 'Tue 7 October, or Tue 13 January'],
  ['Time', '18:30-20:00, six Tuesdays'],
  ['Ages', '14 and over; juniors 9-13 on Saturdays'],
  ['Price', '$140, all kit lent'],
  ['Bring', 'Tracksuit bottoms, indoor trainers, water'],
];

type Weapon = {
  name: string;
  kind: 'foil' | 'epee' | 'sabre';
  target: string;
  scores: string;
  weight: string;
  blade: string;
  rule: string;
};

const WEAPONS: Weapon[] = [
  {
    name: 'Foil',
    kind: 'foil',
    target: 'The trunk, from collar to groin, back included. Arms, legs and mask are off target.',
    scores: 'Point only',
    weight: '500 g',
    blade: '90 cm',
    rule: 'Right of way: whoever attacks first has priority until the attack is parried or misses.',
  },
  {
    name: 'Epee',
    kind: 'epee',
    target: 'Everything, from the top of the mask to the soles of the shoes.',
    scores: 'Point only',
    weight: '770 g',
    blade: '90 cm',
    rule: 'No right of way: whoever lands first scores, and if both land within 1/25 of a second, both do.',
  },
  {
    name: 'Sabre',
    kind: 'sabre',
    target: 'Everything above the waist: trunk, arms and mask, but not the hands.',
    scores: 'Point and edge',
    weight: '500 g',
    blade: '88 cm',
    rule: 'Right of way, as in foil, but fast: most sabre bouts are decided on the first step.',
  },
];

type Session = {
  day: string;
  start: number;
  span: number;
  name: string;
  who: string;
  kind: 'begin' | 'open' | 'junior' | 'squad' | 'vets';
};

/* Start is in half hours from 17:00, span in half hours. */
const NIGHTS: Session[] = [
  { day: 'Mon', start: 2, span: 3, name: 'Juniors, foil', who: 'Ages 9-13', kind: 'junior' },
  { day: 'Mon', start: 5, span: 5, name: 'Open piste', who: 'All weapons, members', kind: 'open' },
  { day: 'Tue', start: 3, span: 3, name: 'Beginner course', who: 'Six weeks, booked', kind: 'begin' },
  { day: 'Tue', start: 6, span: 4, name: 'Epee night', who: 'Improvers and up', kind: 'squad' },
  { day: 'Wed', start: 2, span: 4, name: 'Sabre', who: 'Lessons, then bouts', kind: 'squad' },
  { day: 'Wed', start: 6, span: 4, name: 'Veterans', who: '40 and over, all weapons', kind: 'vets' },
  { day: 'Thu', start: 3, span: 7, name: 'Open piste and lessons', who: 'Book a 20 minute lesson at the desk', kind: 'open' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu'];
const HOURS = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

/* Half hours from 17:00, as a clock. */
const clock = (half: number) => `${17 + Math.floor(half / 2)}:${half % 2 ? '30' : '00'}`;

const LEGEND = [
  ['begin', 'Beginners'],
  ['junior', 'Juniors'],
  ['squad', 'Weapon nights'],
  ['open', 'Open piste'],
  ['vets', 'Veterans'],
];

type PoolRow = {
  name: string;
  cells: string[];
  v: number;
  ts: number;
  tr: number;
  ind: string;
  pl: number;
};

/* Club epee open, pool 3. Every bout is consistent both ways. */
const POOL: PoolRow[] = [
  { name: 'Hale, M.', cells: ['', 'V5', 'V5', 'V5', 'V5', 'V5', 'D3'], v: 5, ts: 28, tr: 18, ind: '+10', pl: 1 },
  { name: 'Okonjo, T.', cells: ['D4', '', 'V5', 'V5', 'V5', 'D4', 'V5'], v: 4, ts: 28, tr: 23, ind: '+5', pl: 2 },
  { name: 'Brandt, E.', cells: ['D3', 'D4', '', 'V5', 'V5', 'V5', 'D2'], v: 3, ts: 24, tr: 24, ind: '0', pl: 3 },
  { name: 'Sousa, R.', cells: ['D3', 'D2', 'D1', '', 'V5', 'V5', 'V5'], v: 3, ts: 21, tr: 22, ind: '-1', pl: 4 },
  { name: 'Lindqvist, A.', cells: ['D3', 'D3', 'D4', 'D4', '', 'V5', 'V5'], v: 2, ts: 24, tr: 23, ind: '+1', pl: 6 },
  { name: 'Fairweather, J.', cells: ['D1', 'V5', 'D4', 'D3', 'D1', '', 'D4'], v: 1, ts: 18, tr: 29, ind: '-11', pl: 7 },
  { name: 'Mbeki, N.', cells: ['V4', 'D4', 'V5', 'D0', 'D2', 'V5', ''], v: 3, ts: 20, tr: 24, ind: '-4', pl: 5 },
];

const TABLEAU = [
  { round: 'Semi-final', a: 'Hale', as: '15', b: 'Mbeki', bs: '11' },
  { round: 'Semi-final', a: 'Okonjo', as: '15', b: 'Brandt', bs: '13' },
  { round: 'Final', a: 'Hale', as: '15', b: 'Okonjo', bs: '12' },
];

const FIXTURES = [
  { date: '12 Oct', name: 'Club foil open', note: 'Pools and direct elimination to 15', fee: '$12' },
  { date: '09 Nov', name: 'Northgate sabre cup', note: 'Visiting clubs welcome, 40 places', fee: '$20' },
  { date: '14 Dec', name: 'The Christmas handicap', note: 'All weapons, beginners get a three-touch start', fee: '$5' },
  { date: '18 Jan', name: 'Club epee open', note: 'Bring a second body wire', fee: '$12' },
];

const COACHES = [
  { name: 'Dora Achterberg', weapon: 'Epee', role: 'Head coach', years: '22', note: 'Fenced epee for the national team for eight seasons. Runs Tuesday and Thursday nights and the competition squad.', lamp: 'red' },
  { name: 'Marcus Oyelaran', weapon: 'Sabre', role: 'Sabre coach', years: '11', note: 'Former university champion. Teaches sabre on Wednesdays and will explain right of way as often as it takes.', lamp: 'green' },
  { name: 'Ines Carvalho', weapon: 'Foil', role: 'Beginners and juniors', years: '9', note: 'Runs the six-week course and the Saturday juniors. Every one of our current squad started in her class.', lamp: 'red' },
  { name: 'Walt Pemberton', weapon: 'All three', role: 'Armourer', years: '31', note: 'Fixes blades, rewires body cords and tests every mask on the first Monday of the month. Coaches the veterans.', lamp: 'green' },
];

const KIT = [
  ['Mask, with bib', '$3'],
  ['Jacket and plastron', '$3'],
  ['Glove', '$1'],
  ['Foil, epee or sabre', '$4'],
  ['Body wire and mask wire', '$2'],
  ['Full electric kit, a season', '$95'],
];

const MEMBERSHIPS = [
  { name: 'Adult', price: '$38', per: 'a month', note: 'All club nights, all weapons, the monthly competition.' },
  { name: 'Student', price: '$24', per: 'a month', note: 'The same, with a current student card.' },
  { name: 'Junior', price: '$18', per: 'a month', note: 'Saturday mornings and Monday juniors, ages 9-17.' },
  { name: 'Family', price: '$70', per: 'a month', note: 'Two adults and any number of juniors at one address.' },
];

const MASK_NOTES = [
  'Mesh tested to 12 kg at the punch test, every month',
  'Bib conductive for foil and sabre',
  'Sizes XS to XL, and junior sizes',
];

export default function RiposteFencingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--piste': '#f1f2f0',
        '--black': '#111317',
        '--red': '#e0282e',
        '--green': '#1fae5b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="piste,black,red,green"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@700;900&family=Saira+Semi+Condensed:wght@400;600&family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markSlash} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Riposte</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Fencing Club</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#join">Free first night</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A Marey plate: one lunge exposed five times along the piste, the
            last exposure landing on the scoring box's red lamp. */}
        <section className={s.hero} aria-labelledby="rf-hero-h">
          <div data-edit-pattern="rfHero.field" data-edit-roles="transparent,0,2,0,3,0" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={slashbar}
              palette={BLADES}
              options={{ frequency: 0.55 }}
              fit="grid"
              cellSize={36}
              seed="riposte-blades"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.stage}>
            <div className={s.heroCopy}>
              <p data-edit="rfHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Fencing club, the Drill Hall, Garrison Street, Northgate</p>
              <h1 id="rf-hero-h" className={s.title}>
                <span data-edit="rfHero.titleBig" data-edit-max="60" className={s.titleBig}>Riposte</span>
                <span data-edit="rfHero.titleSmall" data-edit-max="60" className={s.titleSmall}>Fencing Club</span>
              </h1>
              <p data-edit="rfHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Foil, epee and sabre for adults and juniors, four nights a week
                on six electric pistes. Your first night is free, and we lend
                you everything but the trainers.
              </p>
              <p className={s.actions}>
                <a data-edit="rfHero.btnLit" data-edit-max="28" className={s.btnLit} href="#try">Six-week beginner course</a>
                <a data-edit="rfHero.btnLine" data-edit-max="28" className={s.btnLine} href="#nights">See club nights</a>
              </p>
            </div>

            <div className={s.flight}>
              {EXPOSURES.map((e) => (
                <Artwork
                  key={e}
                  slug="riposte-fencing-lunge"
                  alt=""
                  inks={['var(--black)', 'var(--on-black)']}
                  className={`${s.lunge} ${s[e]}`}
                />
              ))}
              <Artwork
                slug="riposte-fencing-lunge"
                alt="A fencer in white kit and mask lunging with the foil fully extended, photographed five times along the piste"
                inks={['var(--black)', 'var(--on-black)']}
                className={`${s.lunge} ${s.e5}`}
              />
              <span className={s.tipLamp} aria-hidden="true" />

              <div className={s.board} role="group" aria-label="Scoring box, piste 2">
                <p className={s.boardHead}>
                  <span data-edit="rfHero.text" data-edit-max="60">Piste 2</span>
                  <span data-edit="rfHero.text2" data-edit-max="60">Epee, pool 3</span>
                </p>
                <p className={s.boardNames}>
                  <span data-edit="rfHero.text3" data-edit-max="60">Hale</span>
                  <span data-edit="rfHero.text4" data-edit-max="60">Okonjo</span>
                </p>
                <p className={s.boardDigits}>
                  <span data-edit="rfHero.digit" data-edit-max="60" className={s.digit}>05</span>
                  <span data-edit="rfHero.clock" data-edit-max="60" className={s.clock}>0:38</span>
                  <span data-edit="rfHero.digit2" data-edit-max="60" className={s.digit}>04</span>
                </p>
                <p className={s.lamps}>
                  <span data-edit="rfHero.lampRed" data-edit-max="60" className={s.lampRed}>Touch left</span>
                  <span className={s.lampWhite} />
                  <span className={s.lampWhite} />
                  <span data-edit="rfHero.lampGreen" data-edit-max="60" className={s.lampGreen}>Right</span>
                </p>
              </div>
            </div>

            <div className={s.piste} aria-hidden="true">
              <div className={s.strip}>
                <span className={s.warnL} />
                <span className={s.warnR} />
                {PISTE_LINES.map((l) => (
                  <span key={`${l.m}-${l.kind}`} className={`${s.line} ${s[l.kind]}`} style={{ left: `${(l.m / 14) * 100}%` }} />
                ))}
              </div>
              <ol className={s.pisteLabels}>
                {PISTE_LINES.map((l, i) => (
                  <li key={`${l.m}-${l.label}`} className={s[l.kind]} style={{ left: `${(l.m / 14) * 100}%` }}>
                    <span className={s.pisteM}>{`${l.m} m`}</span>
                    <span data-edit={`rfHero.pisteName.${i}`} data-edit-max="60" className={s.pisteName}>{l.label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([figure, what], i) => (
                <div key={what}>
                  <dt data-edit={`rfHero.term.${i}`} data-edit-max="28">{figure}</dt>
                  <dd data-edit={`rfHero.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------- TRY */}
        <section id="try" className={s.sec} aria-labelledby="rf-try-h">
          <div className={s.ruler} aria-hidden="true">
            <span className={s.rulerMark} style={{ left: `${(2 / 14) * 100}%` }} />
          </div>
          <div className={s.secHead}>
            <p data-edit="try.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>01 / Try fencing</p>
            <h2 data-edit="try.title" data-edit-max="60" id="rf-try-h">Six Tuesdays, from en garde to your first bout</h2>
            <p data-edit="try.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Twelve people, two coaches, one piste each. Every week moves you
              two metres further up the strip, and in week six you fence a
              real bout on the electric box.
            </p>
          </div>

          <ol className={s.weeks}>
            {WEEKS.map((w, i) => (
              <li key={w.n} className={s.week}>
                <p className={s.weekTop}>
                  <span data-edit={`try.weekN.${i}`} data-edit-max="60" className={s.weekN}>{w.n}</span>
                  <span data-edit={`try.weekM.${i}`} data-edit-max="60" className={s.weekM}>{w.m}</span>
                </p>
                <h3 data-edit={`try.weekTitle.${i}`} data-edit-max="40" className={s.weekTitle}>{w.title}</h3>
                <p data-edit={`try.weekNote.${i}`} data-edit-max="240" data-edit-multiline className={s.weekNote}>{w.note}</p>
              </li>
            ))}
          </ol>

          <div className={s.courseRow}>
            <dl className={s.course}>
              {COURSE.map(([term, text], i) => (
                <div key={term}>
                  <dt data-edit={`try.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`try.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
            <aside className={s.priceCard} aria-labelledby="rf-price-h">
              <div data-edit-pattern="rfPrice.field" data-edit-roles="transparent,0,2,3,0" className={s.priceField} aria-hidden="true">
                <TabbiedPattern
                  pattern={sliver}
                  palette={SLIVERS}
                  options={{ frequency: 0.7 }}
                  fit="grid"
                  cellSize={30}
                  seed="riposte-slivers"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.priceBody}>
                <p data-edit="rfPrice.priceLabel" data-edit-max="240" data-edit-multiline className={s.priceLabel}>The beginner course</p>
                <h3 data-edit="rfPrice.priceBig" data-edit-max="40" id="rf-price-h" className={s.priceBig}>$140</h3>
                <p data-edit="rfPrice.priceNote" data-edit-max="240" data-edit-multiline className={s.priceNote}>Six sessions, all kit lent, and your first month of membership free when you finish.</p>
                <a data-edit="rfPrice.btnLit" data-edit-max="28" className={s.btnLit} href="#join">Book a place</a>
                <p className={s.seats}>
                  <span className={s.seatLamp} aria-hidden="true" />
                  <span data-edit="rfPrice.text" data-edit-max="60">October course: 4 places left</span>
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* --------------------------------------------------------- WEAPONS */}
        <section id="weapons" className={`${s.sec} ${s.weaponsSec}`} aria-labelledby="rf-weapons-h">
          <div className={s.ruler} aria-hidden="true">
            <span className={s.rulerMark} style={{ left: `${(4 / 14) * 100}%` }} />
          </div>
          <div className={s.secHead}>
            <p data-edit="weapons.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>02 / Three weapons</p>
            <h2 data-edit="weapons.title" data-edit-max="60" id="rf-weapons-h">Where a touch counts</h2>
            <p data-edit="weapons.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The same piste, three different games. Beginners start on foil;
              by the end of the course most people know which one they are.
            </p>
          </div>

          <ul className={s.weapons}>
            {WEAPONS.map((w, i) => (
              <li key={w.kind} className={`${s.weapon} ${s[w.kind]}`}>
                <h3 data-edit={`weapons.weaponName.${i}`} data-edit-max="40" className={s.weaponName}>{w.name}</h3>
                <div className={s.figure} aria-hidden="true">
                  <span className={`${s.part} ${s.head}`} />
                  <span className={`${s.part} ${s.trunk}`} />
                  <span className={`${s.part} ${s.armL}`} />
                  <span className={`${s.part} ${s.armR}`} />
                  <span className={`${s.part} ${s.legL}`} />
                  <span className={`${s.part} ${s.legR}`} />
                  <span className={s.blade} />
                </div>
                <p data-edit={`weapons.target.${i}`} data-edit-max="240" data-edit-multiline className={s.target}>{w.target}</p>
                <dl className={s.specs}>
                  <div>
                    <dt data-edit={`weapons.term.${i}`} data-edit-max="28">Scores with</dt>
                    <dd data-edit={`weapons.body.${i}`} data-edit-max="200" data-edit-multiline>{w.scores}</dd>
                  </div>
                  <div>
                    <dt data-edit={`weapons.term2.${i}`} data-edit-max="28">Weight</dt>
                    <dd data-edit={`weapons.body2.${i}`} data-edit-max="200" data-edit-multiline>{w.weight}</dd>
                  </div>
                  <div>
                    <dt data-edit={`weapons.term3.${i}`} data-edit-max="28">Blade</dt>
                    <dd data-edit={`weapons.body3.${i}`} data-edit-max="200" data-edit-multiline>{w.blade}</dd>
                  </div>
                </dl>
                <p data-edit={`weapons.rule.${i}`} data-edit-max="240" data-edit-multiline className={s.rule}>{w.rule}</p>
              </li>
            ))}
          </ul>
          <p className={s.keyNote}>
            <span className={s.keySwatch} aria-hidden="true" />
            <span data-edit="weapons.text" data-edit-max="60">Target area, shown in red on each figure.</span>
          </p>
        </section>

        {/* ---------------------------------------------------------- NIGHTS */}
        <section id="nights" className={s.sec} aria-labelledby="rf-nights-h">
          <div className={s.ruler} aria-hidden="true">
            <span className={s.rulerMark} style={{ left: `${(6 / 14) * 100}%` }} />
          </div>
          <div className={s.secHead}>
            <p data-edit="nights.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>03 / Club nights</p>
            <h2 data-edit="nights.title" data-edit-max="60" id="rf-nights-h">The hall is open four nights and Saturday morning</h2>
            <p data-edit="nights.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Members come to any session that fits their weapon. The first
              half hour of every night is a warm-up and footwork, together.
            </p>
          </div>

          <div className={s.timetable}>
            <div className={s.ttHours} aria-hidden="true">
              {HOURS.map((h, i) => (
                <span data-edit={`nights.text.${i}`} data-edit-max="60" key={h}>{h}</span>
              ))}
            </div>
            {DAYS.map((day, i) => (
              <div key={day} className={s.ttRow}>
                <p data-edit={`nights.ttDay.${i}`} data-edit-max="240" data-edit-multiline className={s.ttDay}>{day}</p>
                <ul className={s.ttTrack}>
                  {NIGHTS.filter((n) => n.day === day).map((n, i2) => (
                    <li
                      key={`${n.day}-${n.start}`}
                      className={`${s.slot} ${s[n.kind]}`}
                      style={{ gridColumn: `${n.start + 1} / span ${n.span}` }}>
                      <span className={s.slotTime}>{`${clock(n.start)}-${clock(n.start + n.span)}`}</span>
                      <span data-edit={`nights.slotName.${i}.${i2}`} data-edit-max="60" className={s.slotName}>{n.name}</span>
                      <span data-edit={`nights.slotWho.${i}.${i2}`} data-edit-max="60" className={s.slotWho}>{n.who}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={`${s.ttRow} ${s.ttSat}`}>
              <p data-edit="nights.ttDay2" data-edit-max="240" data-edit-multiline className={s.ttDay}>Sat</p>
              <p className={`${s.slot} ${s.junior} ${s.satSlot}`}>
                <span data-edit="nights.slotTime" data-edit-max="60" className={s.slotTime}>09:00-11:00</span>
                <span data-edit="nights.slotName2" data-edit-max="60" className={s.slotName}>Juniors, all weapons</span>
                <span data-edit="nights.slotWho2" data-edit-max="60" className={s.slotWho}>Ages 9-17, with the junior course on the other piste</span>
              </p>
            </div>
          </div>
          <ul className={s.legend}>
            {LEGEND.map(([kind, label], i) => (
              <li key={kind}>
                <span className={`${s.legendSwatch} ${s[kind]}`} aria-hidden="true" />
                <span data-edit={`nights.text2.${i}`} data-edit-max="60">{label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- COMPS */}
        <section id="comps" className={`${s.sec} ${s.compsSec}`} aria-labelledby="rf-comps-h">
          <div className={s.ruler} aria-hidden="true">
            <span className={s.rulerMark} style={{ left: `${(8 / 14) * 100}%` }} />
          </div>
          <div className={s.secHead}>
            <p data-edit="comps.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>04 / Competitions</p>
            <h2 data-edit="comps.title" data-edit-max="60" id="rf-comps-h">Last month&apos;s pool sheet</h2>
            <p data-edit="comps.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A club competition on the second Sunday of every month: pools of
              seven, everyone fences everyone to five, then the top eight go
              through to direct elimination.
            </p>
          </div>

          <div className={s.compsGrid}>
            <div data-edit-pattern="comps.field" data-edit-roles="transparent,1,2,1,3" className={s.compsField} aria-hidden="true">
              <TabbiedPattern
                pattern={bothways}
                palette={CROSSINGS}
                options={{ frequency: 0.6 }}
                fit="grid"
                cellSize={32}
                seed="riposte-crossings"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.sheet}>
              <div className={s.sheetHead}>
                <p data-edit="comps.sheetTitle" data-edit-max="240" data-edit-multiline className={s.sheetTitle}>Club epee open, Sunday 14 September</p>
                <p className={s.sheetMeta}>
                  <span data-edit="comps.text" data-edit-max="60">Pool 3 of 4</span>
                  <span data-edit="comps.text2" data-edit-max="60">Piste 2</span>
                  <span data-edit="comps.text3" data-edit-max="60">Referee: D. Achterberg</span>
                </p>
              </div>
              <div className={s.sheetScroll}>
                <table className={s.pool}>
                  <caption data-edit="comps.srOnly" className={s.srOnly}>Pool 3 results: each row is one fencer, each numbered column their bout against that opponent, V for a win and D for a loss with touches scored</caption>
                  <thead>
                    <tr>
                      <th data-edit="comps.pName" scope="col" className={s.pName}>Fencer</th>
                      <th data-edit="comps.pNo" scope="col" className={s.pNo}>No.</th>
                      {POOL.map((_, i) => (
                        <th key={`c${i}`} scope="col" className={s.pCol}>{String(i + 1)}</th>
                      ))}
                      <th data-edit="comps.pTot" scope="col" className={s.pTot}>V</th>
                      <th data-edit="comps.pTot2" scope="col" className={s.pTot}>TS</th>
                      <th data-edit="comps.pTot3" scope="col" className={s.pTot}>TR</th>
                      <th data-edit="comps.pTot4" scope="col" className={s.pTot}>Ind</th>
                      <th data-edit="comps.pTot5" scope="col" className={s.pTot}>Pl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {POOL.map((r, i) => (
                      <tr key={r.name} className={r.pl === 1 ? s.poolWin : undefined}>
                        <th data-edit={`comps.pName2.${i}`} scope="row" className={s.pName}>{r.name}</th>
                        <td className={s.pNo}>{String(i + 1)}</td>
                        {r.cells.map((c, j) => (
                          <td data-edit={`comps.pSelf.${i}.${j}`}
                            key={`${r.name}-${j}`}
                            className={c === '' ? s.pSelf : c.startsWith('V') ? s.pV : s.pD}>
                            {c}
                          </td>
                        ))}
                        <td className={s.pTot}>{String(r.v)}</td>
                        <td className={s.pTot}>{String(r.ts)}</td>
                        <td className={s.pTot}>{String(r.tr)}</td>
                        <td data-edit={`comps.pTot6.${i}`} className={s.pTot}>{r.ind}</td>
                        <td className={`${s.pTot} ${s.pPl}`}>{String(r.pl)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p data-edit="comps.sheetFoot" data-edit-max="240" data-edit-multiline className={s.sheetFoot}>V: victory, D: defeat, with touches scored. TS and TR: touches scored and received. Ind: the index, TS minus TR, which breaks ties on victories.</p>
            </div>

            <div className={s.compsSide}>
              <div className={s.tableau}>
                <h3 data-edit="comps.sideTitle" data-edit-max="40" className={s.sideTitle}>The tableau</h3>
                <ol className={s.bouts}>
                  {TABLEAU.map((b, i) => (
                    <li key={`${b.round}-${b.a}`} className={b.round === 'Final' ? s.final : undefined}>
                      <p data-edit={`comps.round.${i}`} data-edit-max="240" data-edit-multiline className={s.round}>{b.round}</p>
                      <p className={s.boutLine}>
                        <span data-edit={`comps.boutName.${i}`} data-edit-max="60" className={s.boutName}>{b.a}</span>
                        <span data-edit={`comps.boutScore.${i}`} data-edit-max="60" className={s.boutScore}>{b.as}</span>
                      </p>
                      <p className={`${s.boutLine} ${s.boutLose}`}>
                        <span data-edit={`comps.boutName2.${i}`} data-edit-max="60" className={s.boutName}>{b.b}</span>
                        <span data-edit={`comps.boutScore2.${i}`} data-edit-max="60" className={s.boutScore}>{b.bs}</span>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className={s.fixtures}>
                <h3 data-edit="comps.sideTitle2" data-edit-max="40" className={s.sideTitle}>Coming up</h3>
                <ul>
                  {FIXTURES.map((f, i) => (
                    <li key={f.date}>
                      <span data-edit={`comps.fxDate.${i}`} data-edit-max="60" className={s.fxDate}>{f.date}</span>
                      <span data-edit={`comps.fxName.${i}`} data-edit-max="60" className={s.fxName}>{f.name}</span>
                      <span data-edit={`comps.fxNote.${i}`} data-edit-max="60" className={s.fxNote}>{f.note}</span>
                      <span data-edit={`comps.fxFee.${i}`} data-edit-max="60" className={s.fxFee}>{f.fee}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- COACHES */}
        <section id="coaches" className={s.sec} aria-labelledby="rf-coaches-h">
          <div className={s.ruler} aria-hidden="true">
            <span className={s.rulerMark} style={{ left: `${(10 / 14) * 100}%` }} />
          </div>
          <div className={s.secHead}>
            <p data-edit="coaches.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>05 / Coaches</p>
            <h2 data-edit="coaches.title" data-edit-max="60" id="rf-coaches-h">Four coaches and an armourer</h2>
            <p data-edit="coaches.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              All qualified, all checked, all still fencing. Private lessons
              are twenty minutes and $15, booked at the desk on the night.
            </p>
          </div>
          <ul className={s.coaches}>
            {COACHES.map((c, i) => (
              <li key={c.name} className={s.coach}>
                <p className={s.coachTop}>
                  <span className={c.lamp === 'red' ? s.coachLampRed : s.coachLampGreen} aria-hidden="true" />
                  <span data-edit={`coaches.coachWeapon.${i}`} data-edit-max="60" className={s.coachWeapon}>{c.weapon}</span>
                  <span data-edit={`coaches.coachYears.${i}`} data-edit-max="60" className={s.coachYears}>{c.years}</span>
                </p>
                <h3 data-edit={`coaches.coachName.${i}`} data-edit-max="40" className={s.coachName}>{c.name}</h3>
                <p data-edit={`coaches.coachRole.${i}`} data-edit-max="240" data-edit-multiline className={s.coachRole}>{c.role}</p>
                <p data-edit={`coaches.coachNote.${i}`} data-edit-max="240" data-edit-multiline className={s.coachNote}>{c.note}</p>
                <p className={s.coachFoot}>{`${c.years} years coaching`}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- KIT */}
        <section id="kit" className={s.sec} aria-labelledby="rf-kit-h">
          <div className={s.ruler} aria-hidden="true">
            <span className={s.rulerMark} style={{ left: `${(12 / 14) * 100}%` }} />
          </div>
          <div className={s.secHead}>
            <p data-edit="kit.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>06 / Kit hire and membership</p>
            <h2 data-edit="kit.title" data-edit-max="60" id="rf-kit-h">Borrow the kit, then decide</h2>
            <p data-edit="kit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Nobody buys a mask before they know they like fencing. Hire
              by the night from the kit room, or for the season once you are
              hooked.
            </p>
          </div>

          <div className={s.kitGrid}>
            <figure className={s.maskFig}>
              <Artwork
                slug="riposte-fencing-mask"
                alt="A fencing mask with its steel mesh face and padded bib, in three-quarter view"
                inks={['var(--text)']}
                className={s.mask}
              />
              <figcaption className={s.maskCap}>
                <span data-edit="kit.maskCapTitle" data-edit-max="60" className={s.maskCapTitle}>The kit room mask</span>
                <span data-edit="kit.text" data-edit-max="60">350 N, with a removable bib</span>
              </figcaption>
              <ul className={s.maskNotes}>
                {MASK_NOTES.map((n, i) => (
                  <li data-edit={`kit.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                ))}
              </ul>
            </figure>

            <div className={s.kitHire}>
              <h3 data-edit="kit.sideTitle" data-edit-max="40" className={s.sideTitle}>Kit hire, per night</h3>
              <table className={s.kitTable}>
                <caption data-edit="kit.srOnly" className={s.srOnly}>Kit hire prices</caption>
                <tbody>
                  {KIT.map(([item, price], i) => (
                    <tr key={item}>
                      <th data-edit={`kit.heading.${i}`} scope="row">{item}</th>
                      <td data-edit={`kit.cell.${i}`}>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="kit.small" data-edit-max="240" data-edit-multiline className={s.small}>Everything in the kit room is lent free on your first night and throughout the beginner course.</p>
            </div>

            <div className={s.members}>
              <h3 data-edit="kit.sideTitle2" data-edit-max="40" className={s.sideTitle}>Membership</h3>
              <ul className={s.tiers}>
                {MEMBERSHIPS.map((m, i) => (
                  <li key={m.name} className={s.tier}>
                    <p data-edit={`kit.tierName.${i}`} data-edit-max="240" data-edit-multiline className={s.tierName}>{m.name}</p>
                    <p className={s.tierPrice}>
                      <strong data-edit={`kit.emphasis.${i}`}>{m.price}</strong>
                      <span data-edit={`kit.text2.${i}`} data-edit-max="60">{m.per}</span>
                    </p>
                    <p data-edit={`kit.tierNote.${i}`} data-edit-max="240" data-edit-multiline className={s.tierNote}>{m.note}</p>
                  </li>
                ))}
              </ul>
              <p data-edit="kit.small2" data-edit-max="240" data-edit-multiline className={s.small}>Plus national federation licence, $30 a year, which insures you on any piste in the country.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ JOIN */}
        <section id="join" className={s.sec} aria-labelledby="rf-join-h">
          <div className={s.ruler} aria-hidden="true">
            <span className={s.rulerMark} style={{ left: '100%' }} />
          </div>
          <div className={s.joinGrid}>
            <form className={s.form} action="#">
              <p data-edit="join.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>07 / Join</p>
              <h2 data-edit="join.title" data-edit-max="60" id="rf-join-h">Come for a free first night</h2>
              <p data-edit="join.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Tell us who is coming and we will have a jacket in your size on the bench.</p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="join.label" htmlFor="rf-name">Name</label>
                  <input id="rf-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="join.label2" htmlFor="rf-email">Email</label>
                  <input id="rf-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="join.label3" htmlFor="rf-age">Who is fencing</label>
                  <select id="rf-age" name="age" defaultValue="adult">
                    <option value="adult">An adult, 18 and over</option>
                    <option value="teen">A teenager, 14-17</option>
                    <option value="junior">A junior, 9-13</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="join.label4" htmlFor="rf-night">Which night</label>
                  <select id="rf-night" name="night" defaultValue="tue">
                    <option value="mon">Monday</option>
                    <option value="tue">Tuesday, the beginner course</option>
                    <option value="wed">Wednesday</option>
                    <option value="thu">Thursday</option>
                    <option value="sat">Saturday morning, juniors</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="join.label5" htmlFor="rf-before">Fenced before?</label>
                  <textarea id="rf-before" name="before" rows={3} placeholder="Never, or at school, or twenty years ago at university" />
                </div>
              </div>
              <button data-edit="join.submit" data-edit-max="24" className={s.submit} type="submit">Save me a jacket</button>
            </form>

            <aside className={s.hall} aria-labelledby="rf-hall-h">
              <div data-edit-pattern="rfHall.field" data-edit-roles="transparent,2,3,2,0" className={s.hallField} aria-hidden="true">
                <TabbiedPattern
                  pattern={slashbar}
                  palette={GUARD}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={28}
                  seed="riposte-hall"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.hallBody}>
                <h3 data-edit="rfHall.hallTitle" data-edit-max="40" id="rf-hall-h" className={s.hallTitle}>The Drill Hall</h3>
                <p data-edit="rfHall.hallAddr" data-edit-max="240" data-edit-multiline className={s.hallAddr}>Garrison Street, Northgate</p>
                <p data-edit="rfHall.hallNote" data-edit-max="240" data-edit-multiline className={s.hallNote}>
                  The red-brick hall behind the old barracks gate. Park on
                  Garrison Street after 18:00; the number 9 bus stops at the
                  gate. The door is round the side, under the lamp.
                </p>
                <p className={s.hallLine}>
                  <a data-edit="rfHall.link" data-edit-max="28" href="tel:+15550167720">(555) 016-7720</a>
                </p>
                <p className={s.hallLine}>
                  <a data-edit="rfHall.link2" data-edit-max="28" href="mailto:salle@riposte.example">salle@riposte.example</a>
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,0,3,0,1" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={raking}
            palette={RAKE}
            fit="grid"
            cellSize={30}
            seed="riposte-rake"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Riposte Fencing Club</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional fencing club. The coaches, fencers, scores, prices and times are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The fencer and the mask are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
