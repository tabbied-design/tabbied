import { TabbiedPattern } from 'tabbied/react';
import { doublebar, rungs, fustian, grosgrain } from 'tabbied/patterns';
import s from './terrace-tennis-club.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Terrace Lawn Tennis Club: Six grass and four hard courts, Kingsmead',
  description:
    'A members tennis club on Terrace Road, Kingsmead, with six grass and four hard courts. Membership fees, coaching for every age, Saturday court availability, the club championships draw and the social calendar.',
};

/* Site colors: the SAME hexes as the root roles in the stylesheet. */
const CREAM = '#f2efe3';
const GREEN = '#245235';
const PURPLE = '#5b2a6e';
const BALL = '#d8e34a';

/* Court lines and mower stripes along the foot of the hero. */
const LINES = [GREEN, CREAM, CREAM, BALL, CREAM, PURPLE];
/* The coaching ladder: rungs to climb, one ball colour at a time. */
const LADDER = ['transparent', GREEN, PURPLE, BALL, GREEN, PURPLE];
/* A hard-wearing rib behind the championship draw. */
const RIB = ['transparent', GREEN, GREEN, PURPLE, GREEN, BALL];
/* Grosgrain ribbon for the social calendar. */
const RIBBON = ['transparent', PURPLE, GREEN, BALL, PURPLE, GREEN];
/* The baseline again, under the footer. */
const BASELINE = [PURPLE, CREAM, CREAM, BALL, CREAM, GREEN];

const NAV = [
  ['Membership', '#membership'],
  ['Coaching', '#coaching'],
  ['Courts', '#courts'],
  ['Championships', '#championships'],
  ['Social', '#social'],
  ['Join', '#join'],
];

const HERO_FACTS = [
  ['1887', 'founded'],
  ['6', 'grass courts'],
  ['4', 'hard courts'],
  ['412', 'members'],
];

type Fee = { name: string; who: string; fee: string; joining: string };

const FEES: Fee[] = [
  { name: 'Full playing', who: 'Every court, every day', fee: '640', joining: '$150 to join' },
  { name: 'Weekday', who: 'Monday to Friday before 17:00', fee: '420', joining: '$150 to join' },
  { name: 'Young adult', who: 'Aged 18 to 25', fee: '290', joining: 'No joining fee' },
  { name: 'Junior', who: 'Under 18, with coaching discounts', fee: '120', joining: 'No joining fee' },
  { name: 'Family', who: 'Two adults and their children', fee: '1380', joining: '$250 to join' },
  { name: 'Social', who: 'The clubhouse, the teas, no courts', fee: '85', joining: 'No joining fee' },
];

type Group = { name: string; age: string; when: string; price: string; balls: number };

const JUNIORS: Group[] = [
  { name: 'Red ball', age: 'Ages 4-7', when: 'Saturday 09:00, 45 minutes', price: '$95', balls: 1 },
  { name: 'Orange ball', age: 'Ages 8-9', when: 'Saturday 10:00, one hour', price: '$120', balls: 2 },
  { name: 'Green ball', age: 'Ages 10-11', when: 'Tuesday 16:30, one hour', price: '$120', balls: 3 },
  { name: 'Yellow ball', age: 'Ages 12-17', when: 'Thursday 17:00, 90 minutes', price: '$160', balls: 4 },
];

const ADULTS: Group[] = [
  { name: 'Adult beginners', age: 'Never played, or not for years', when: 'Monday 19:00, one hour', price: '$140', balls: 0 },
  { name: 'Adult improvers', age: 'Can rally, want to win', when: 'Wednesday 19:00, 90 minutes', price: '$180', balls: 0 },
  { name: 'Cardio tennis', age: 'Any standard, all sweat', when: 'Friday 07:00 and Sunday 09:00', price: '$12 a class', balls: 0 },
];

const BALL_DOTS = [1, 2, 3, 4];

type Court = { no: string; surface: 'grass' | 'hard'; name: string; booked: string[] };

const SLOTS = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];

const GRASS: Court[] = [
  { no: '1', surface: 'grass', name: 'Centre', booked: ['10', '11', '12', '13', '14', '15', '16'] },
  { no: '2', surface: 'grass', name: 'The Terrace', booked: ['09', '10', '14', '15', '18'] },
  { no: '3', surface: 'grass', name: 'Elm', booked: ['08', '09', '11', '17', '18', '19'] },
  { no: '4', surface: 'grass', name: 'Orchard', booked: ['10', '13', '16'] },
  { no: '5', surface: 'grass', name: 'Lower lawn', booked: ['09', '12', '15', '16', '17'] },
  { no: '6', surface: 'grass', name: 'Pavilion', booked: ['11', '14'] },
];

const HARD: Court[] = [
  { no: '7', surface: 'hard', name: 'Floodlit', booked: ['08', '09', '10', '17', '18', '19'] },
  { no: '8', surface: 'hard', name: 'Floodlit', booked: ['09', '10', '11', '18', '19'] },
  { no: '9', surface: 'hard', name: 'Practice wall', booked: ['12', '13'] },
  { no: '10', surface: 'hard', name: 'Juniors', booked: ['09', '10', '11', '12'] },
];

type Player = { seed: string; name: string; sets: string[]; won: boolean };
type Match = { id: string; note: string; players: Player[] };

const QUARTERS: Match[][] = [
  [
    { id: 'qf1', note: 'Quarter-final', players: [
      { seed: '1', name: 'A. Okafor', sets: ['6', '6'], won: true },
      { seed: '', name: 'J. Lind', sets: ['3', '4'], won: false },
    ] },
    { id: 'qf2', note: 'Quarter-final', players: [
      { seed: '', name: 'P. Raman', sets: ['5', '2'], won: false },
      { seed: '4', name: 'T. Ashdown', sets: ['7', '6'], won: true },
    ] },
  ],
  [
    { id: 'qf3', note: 'Quarter-final', players: [
      { seed: '3', name: 'H. Fairweather', sets: ['6', '3', '6'], won: false },
      { seed: '', name: 'S. Pryce', sets: ['4', '6', '7'], won: true },
    ] },
    { id: 'qf4', note: 'Quarter-final', players: [
      { seed: '', name: 'M. Ruiz', sets: ['1', '2'], won: false },
      { seed: '2', name: 'C. Reid', sets: ['6', '6'], won: true },
    ] },
  ],
];

const SEMIS: Match[] = [
  { id: 'sf1', note: 'Semi-final', players: [
    { seed: '1', name: 'A. Okafor', sets: ['6', '3', '6'], won: true },
    { seed: '4', name: 'T. Ashdown', sets: ['4', '6', '3'], won: false },
  ] },
  { id: 'sf2', note: 'Semi-final, Sat 5 July', players: [
    { seed: '', name: 'S. Pryce', sets: [], won: false },
    { seed: '2', name: 'C. Reid', sets: [], won: false },
  ] },
];

const FINAL: Match = {
  id: 'final',
  note: 'Final, Sat 12 July, 14:00, Centre Court',
  players: [
    { seed: '1', name: 'A. Okafor', sets: [], won: false },
    { seed: '', name: 'Winner SF2', sets: [], won: false },
  ],
};

type Event = { day: string; month: string; name: string; what: string; price: string };

const EVENTS: Event[] = [
  { day: '15', month: 'Jun', name: 'Strawberry tea', what: 'Every Sunday in June on the pavilion lawn: strawberries, cream, scones and a pot of tea, served from 15:30.', price: '$6, members bring a guest free' },
  { day: '18', month: 'Jun', name: 'Mixed doubles night', what: 'Every Wednesday from 18:30. Partners drawn from a hat, new partner every twenty minutes, drinks on the terrace after.', price: '$4 including balls' },
  { day: '05', month: 'Jul', name: 'Finals on the big screen', what: 'The summer\'s grass-court finals shown in the clubhouse, with jugs of fruit cup at the bar.', price: 'Free for members' },
  { day: '20', month: 'Sep', name: 'End of season dinner', what: 'Three courses in the clubhouse, the championship cups presented, speeches kept short by tradition.', price: '$48 a head' },
];

export default function TerraceTennisClubPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#f2efe3',
        '--green': '#245235',
        '--purple': '#5b2a6e',
        '--ball': '#d8e34a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,green,purple,ball"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Rufina:wght@400;700&family=Alike+Angular&family=League+Gothic&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork slug="terrace-tennis-club-racket" alt="" inks={['var(--green-ink)']} className={s.markRacket} />
          <span className={s.markText}>
            <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Terrace</span>
            <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Lawn Tennis Club</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#courts">Book a court</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="tt-title">
          <div className={s.heroText}>
            <p data-edit="tt.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Terrace Road, Kingsmead. Since 1887</p>
            <h1 data-edit="tt.title" data-edit-max="70" id="tt-title" className={s.title}>Terrace Lawn Tennis Club</h1>
            <p data-edit="tt.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Six grass courts on three terraces above the river and four hard
              courts under lights. Members play all year; the grass opens on
              the first of May.
            </p>
            <div className={s.actions}>
              <a data-edit="tt.btn" data-edit-max="28" className={s.btn} href="#join">Join the club</a>
              <a data-edit="tt.btnLine" data-edit-max="28" className={s.btnLine} href="#coaching">Coaching for all ages</a>
            </div>
          </div>

          <div className={s.stage}>
            <p data-edit="tt.body" data-edit-max="240" data-edit-multiline className={s.giant} aria-hidden="true">Serve</p>
            <Artwork
              slug="terrace-tennis-club-serve"
              alt="A tennis player in whites at the top of a serve, racket raised high"
              inks={['var(--photo-dark)', 'var(--photo-light)']}
              className={s.server}
            />
            <p data-edit="tt.body2" data-edit-max="240" data-edit-multiline className={`${s.giant} ${s.giantFront}`} aria-hidden="true">Serve</p>
          </div>

          <div data-edit-pattern="tt.field" data-edit-roles="1,0,0,3,0,2" className={s.courtBand} aria-hidden="true">
            <TabbiedPattern pattern={doublebar} palette={LINES} fit="grid" cellSize={48} seed="tt-baseline" style={{ position: 'absolute', inset: 0 }} />
          </div>

          <dl className={s.heroFacts}>
            {HERO_FACTS.map(([figure, what], i) => (
              <div key={what}>
                <dt data-edit={`tt.term.${i}`} data-edit-max="28">{figure}</dt>
                <dd data-edit={`tt.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------ MEMBERSHIP */}
        <section id="membership" className={`${s.sec} ${s.lawn}`} aria-labelledby="mem-h">
          <div className={s.secHead}>
            <p data-edit="membership.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Membership</p>
            <h2 data-edit="membership.h2" data-edit-max="60" id="mem-h" className={s.h2}>The subscriptions board</h2>
            <p data-edit="membership.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Annual fees for the season from April, hung on the board the
              way the scores are: in plates, by hand, by the groundsman.
            </p>
          </div>

          <div className={s.board}>
            <div className={s.boardHead}>
              <span data-edit="membership.text" data-edit-max="60">Category</span>
              <span data-edit="membership.text2" data-edit-max="60">Per year, $</span>
            </div>
            <ul className={s.boardRows}>
              {FEES.map((f, i) => (
                <li key={f.name} className={s.boardRow}>
                  <div className={s.slat}>
                    <h3 data-edit={`membership.slatName.${i}`} data-edit-max="40" className={s.slatName}>{f.name}</h3>
                    <p data-edit={`membership.slatWho.${i}`} data-edit-max="240" data-edit-multiline className={s.slatWho}>{f.who}</p>
                  </div>
                  <p className={s.plates}>
                    <span className={s.srOnly}>{`$${f.fee} a year`}</span>
                    {f.fee.split('').map((digit, di) => (
                      <span key={di} className={s.plate} aria-hidden="true">{digit}</span>
                    ))}
                  </p>
                  <p data-edit={`membership.joining.${i}`} data-edit-max="240" data-edit-multiline className={s.joining}>{f.joining}</p>
                </li>
              ))}
            </ul>
            <p data-edit="membership.boardFoot" data-edit-max="240" data-edit-multiline className={s.boardFoot}>Pay by the year or in ten monthly instalments. Guests $8 a visit with a member.</p>
          </div>
        </section>

        {/* -------------------------------------------------------- COACHING */}
        <section id="coaching" className={s.sec} aria-labelledby="coach-h">
          <div className={s.secHead}>
            <p data-edit="coaching.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Coaching</p>
            <h2 data-edit="coaching.h2" data-edit-max="60" id="coach-h" className={s.h2}>From red ball to the first team</h2>
            <p data-edit="coaching.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Our head coach, Ros Adeyemi, and three assistant coaches teach
              in ten-week terms. Prices are per term; non-members welcome at
              $20 more.
            </p>
          </div>

          <div className={s.coachGrid}>
            <div data-edit-pattern="coaching.field" data-edit-roles="transparent,1,2,3,1,2" className={s.ladder} aria-hidden="true">
              <TabbiedPattern pattern={rungs} palette={LADDER} fit="grid" cellSize={40} seed="tt-ladder" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <div className={s.coachLists}>
              <h3 data-edit="coaching.listHead" data-edit-max="40" className={s.listHead}>Juniors, by ball</h3>
              <ul className={s.groups}>
                {JUNIORS.map((g, i) => (
                  <li key={g.name} className={s.group}>
                    <span className={s.balls} aria-hidden="true">
                      {BALL_DOTS.map((b) => (
                        <span key={b} className={b <= g.balls ? s.ballOn : s.ballOff} />
                      ))}
                    </span>
                    <div className={s.groupBody}>
                      <h4 data-edit={`coaching.groupName.${i}`} data-edit-max="36" className={s.groupName}>{g.name}</h4>
                      <p data-edit={`coaching.groupAge.${i}`} data-edit-max="240" data-edit-multiline className={s.groupAge}>{g.age}</p>
                    </div>
                    <p data-edit={`coaching.groupWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.groupWhen}>{g.when}</p>
                    <p data-edit={`coaching.groupPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.groupPrice}>{g.price}</p>
                  </li>
                ))}
              </ul>
              <h3 data-edit="coaching.listHead2" data-edit-max="40" className={s.listHead}>Adults</h3>
              <ul className={s.groups}>
                {ADULTS.map((g, i) => (
                  <li key={g.name} className={s.group}>
                    <span className={s.racketMark} aria-hidden="true" />
                    <div className={s.groupBody}>
                      <h4 data-edit={`coaching.groupName2.${i}`} data-edit-max="36" className={s.groupName}>{g.name}</h4>
                      <p data-edit={`coaching.groupAge2.${i}`} data-edit-max="240" data-edit-multiline className={s.groupAge}>{g.age}</p>
                    </div>
                    <p data-edit={`coaching.groupWhen2.${i}`} data-edit-max="240" data-edit-multiline className={s.groupWhen}>{g.when}</p>
                    <p data-edit={`coaching.groupPrice2.${i}`} data-edit-max="240" data-edit-multiline className={s.groupPrice}>{g.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- COURTS */}
        <section id="courts" className={`${s.sec} ${s.lawn}`} aria-labelledby="courts-h">
          <div className={s.secHead}>
            <p data-edit="courts.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Courts and booking</p>
            <h2 data-edit="courts.h2" data-edit-max="60" id="courts-h" className={s.h2}>Saturday on the courts</h2>
            <p data-edit="courts.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Members book up to a week ahead in the pavilion or by phone.
              Filled squares are taken; the open ones are yours. Grass until
              dusk, hard courts floodlit until 22:00.
            </p>
          </div>

          <div className={s.legend}>
            <span data-edit="courts.legendFree" data-edit-max="60" className={s.legendFree}>Free</span>
            <span data-edit="courts.legendTaken" data-edit-max="60" className={s.legendTaken}>Booked</span>
            <span data-edit="courts.legendHours" data-edit-max="60" className={s.legendHours}>Hours 08:00-20:00</span>
          </div>

          <h3 data-edit="courts.terraceHead" data-edit-max="40" className={s.terraceHead}>The grass terraces, courts 1-6</h3>
          <ul className={s.courts}>
            {GRASS.map((c, i) => (
              <li key={c.no} className={s.courtCard}>
                <div className={`${s.court} ${s.grass}`}>
                  <span className={s.courtLines} aria-hidden="true" />
                  <span data-edit={`courts.courtNo.${i}`} data-edit-max="60" className={s.courtNo}>{c.no}</span>
                </div>
                <p data-edit={`courts.courtName.${i}`} data-edit-max="240" data-edit-multiline className={s.courtName}>{c.name}</p>
                <ol className={s.slots} aria-label={`Court ${c.no}, booked at ${c.booked.join(', ')}`}>
                  {SLOTS.map((h) => (
                    <li key={h} className={c.booked.includes(h) ? s.taken : s.free} aria-hidden="true">{h}</li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>

          <h3 data-edit="courts.terraceHead2" data-edit-max="40" className={s.terraceHead}>The hard courts, 7-10</h3>
          <ul className={`${s.courts} ${s.hardCourts}`}>
            {HARD.map((c, i) => (
              <li key={c.no} className={s.courtCard}>
                <div className={`${s.court} ${s.hard}`}>
                  <span className={s.courtLines} aria-hidden="true" />
                  <span data-edit={`courts.courtNo2.${i}`} data-edit-max="60" className={s.courtNo}>{c.no}</span>
                </div>
                <p data-edit={`courts.courtName2.${i}`} data-edit-max="240" data-edit-multiline className={s.courtName}>{c.name}</p>
                <ol className={s.slots} aria-label={`Court ${c.no}, booked at ${c.booked.join(', ')}`}>
                  {SLOTS.map((h) => (
                    <li key={h} className={c.booked.includes(h) ? s.taken : s.free} aria-hidden="true">{h}</li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
          <p className={s.bookLine}>
            <a data-edit="courts.link" data-edit-max="28" href="tel:+15550143388">Pavilion (555) 014-3388</a>
          </p>
        </section>

        {/* --------------------------------------------------- CHAMPIONSHIPS */}
        <section id="championships" className={s.sec} aria-labelledby="champ-h">
          <div className={s.secHead}>
            <p data-edit="championships.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Club championships</p>
            <h2 data-edit="championships.h2" data-edit-max="60" id="champ-h" className={s.h2}>The open singles draw</h2>
            <p data-edit="championships.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Thirty-two entered in May. Eight are left, then four, then the
              two who will play for the Hollis Cup on Centre Court.
            </p>
          </div>

          <div className={s.drawWrap}>
            <div data-edit-pattern="championships.field" data-edit-roles="transparent,1,1,2,1,3" className={s.rib} aria-hidden="true">
              <TabbiedPattern pattern={fustian} palette={RIB} options={{ frequency: 0.5 }} fit="grid" cellSize={44} seed="tt-rib" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <div className={s.draw}>
              <div className={s.round}>
                <p data-edit="championships.roundName" data-edit-max="240" data-edit-multiline className={s.roundName}>Quarter-finals</p>
                {QUARTERS.map((pair, i) => (
                  <div key={pair[0].id} className={s.pair}>
                    {pair.map((m, i2) => (
                      <div key={m.id} className={s.match}>
                        {m.players.map((p, i3) => (
                          <p key={p.name} className={p.won ? s.winner : s.player}>
                            <span data-edit={`championships.seed.${i}.${i2}.${i3}`} data-edit-max="60" className={s.seed}>{p.seed}</span>
                            <span data-edit={`championships.pName.${i}.${i2}.${i3}`} data-edit-max="60" className={s.pName}>{p.name}</span>
                            <span className={s.sets}>{p.sets.join(' ')}</span>
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className={s.round}>
                <p data-edit="championships.roundName2" data-edit-max="240" data-edit-multiline className={s.roundName}>Semi-finals</p>
                <div className={s.pair}>
                  {SEMIS.map((m, i) => (
                    <div key={m.id} className={`${s.match} ${s.fromLeft}`}>
                      {m.players.map((p, i2) => (
                        <p key={p.name} className={p.won ? s.winner : s.player}>
                          <span data-edit={`championships.seed2.${i}.${i2}`} data-edit-max="60" className={s.seed}>{p.seed}</span>
                          <span data-edit={`championships.pName2.${i}.${i2}`} data-edit-max="60" className={s.pName}>{p.name}</span>
                          <span className={s.sets}>{p.sets.join(' ')}</span>
                        </p>
                      ))}
                      {m.players[0].sets.length === 0 ? <p data-edit={`championships.matchNote.${i}`} data-edit-max="240" data-edit-multiline className={s.matchNote}>{m.note}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${s.round} ${s.finalRound}`}>
                <p data-edit="championships.roundName3" data-edit-max="240" data-edit-multiline className={s.roundName}>Final</p>
                <div className={`${s.match} ${s.fromLeft} ${s.final}`}>
                  {FINAL.players.map((p, i) => (
                    <p key={p.name} className={s.player}>
                      <span data-edit={`championships.seed3.${i}`} data-edit-max="60" className={s.seed}>{p.seed}</span>
                      <span data-edit={`championships.pName3.${i}`} data-edit-max="60" className={s.pName}>{p.name}</span>
                    </p>
                  ))}
                  <p data-edit="championships.matchNote2" data-edit-max="240" data-edit-multiline className={s.matchNote}>{FINAL.note}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${s.board} ${s.liveBoard}`}>
            <div className={s.liveHead}>
              <span data-edit="championships.text" data-edit-max="60">Last year&apos;s final</span>
              <span data-edit="championships.text2" data-edit-max="60">Sets</span>
              <span data-edit="championships.text3" data-edit-max="60">Games</span>
              <span data-edit="championships.text4" data-edit-max="60">Points</span>
            </div>
            <div className={s.liveRow}>
              <p data-edit="championships.liveSlat" data-edit-max="240" data-edit-multiline className={s.liveSlat}>Okafor</p>
              <p className={s.livePlates}>
                <span data-edit="championships.plate" data-edit-max="60" className={s.plate}>6</span>
                <span data-edit="championships.plate2" data-edit-max="60" className={s.plate}>3</span>
              </p>
              <p className={s.livePlates}>
                <span data-edit="championships.plate3" data-edit-max="60" className={s.plate}>5</span>
              </p>
              <p className={s.livePlates}>
                <span data-edit="championships.plate4" data-edit-max="60" className={`${s.plate} ${s.plateWide}`}>Adv</span>
              </p>
            </div>
            <div className={s.liveRow}>
              <p data-edit="championships.liveSlat2" data-edit-max="240" data-edit-multiline className={s.liveSlat}>Fairweather</p>
              <p className={s.livePlates}>
                <span data-edit="championships.plate5" data-edit-max="60" className={s.plate}>4</span>
                <span data-edit="championships.plate6" data-edit-max="60" className={s.plate}>6</span>
              </p>
              <p className={s.livePlates}>
                <span data-edit="championships.plate7" data-edit-max="60" className={s.plate}>4</span>
              </p>
              <p className={s.livePlates}>
                <span data-edit="championships.plate8" data-edit-max="60" className={`${s.plate} ${s.plateWide}`}>40</span>
              </p>
            </div>
            <p data-edit="championships.boardFoot" data-edit-max="240" data-edit-multiline className={s.boardFoot}>Championship point at 5-4 in the third, left on the board all winter by the groundsman.</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- SOCIAL */}
        <section id="social" className={`${s.sec} ${s.socialSec}`} aria-labelledby="social-h">
          <div data-edit-pattern="social.field" data-edit-roles="transparent,2,1,3,2,1" className={s.ribbon} aria-hidden="true">
            <TabbiedPattern pattern={grosgrain} palette={RIBBON} fit="grid" cellSize={40} seed="tt-ribbon" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.secHead}>
            <p data-edit="social.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Social</p>
            <h2 data-edit="social.h2" data-edit-max="60" id="social-h" className={s.h2}>Tea on the lawn, and after</h2>
            <p data-edit="social.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Half of club life happens off the court. Everything below is
              open to members and their guests.
            </p>
          </div>
          <ul className={s.events}>
            {EVENTS.map((e, i) => (
              <li key={e.name} className={s.event}>
                <p className={s.eventDate}>
                  <span data-edit={`social.eventDay.${i}`} data-edit-max="60" className={s.eventDay}>{e.day}</span>
                  <span data-edit={`social.eventMonth.${i}`} data-edit-max="60" className={s.eventMonth}>{e.month}</span>
                </p>
                <div className={s.eventBody}>
                  <h3 data-edit={`social.eventName.${i}`} data-edit-max="40" className={s.eventName}>{e.name}</h3>
                  <p data-edit={`social.eventWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.eventWhat}>{e.what}</p>
                  <p data-edit={`social.eventPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.eventPrice}>{e.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ JOIN */}
        <section id="join" className={`${s.sec} ${s.lawn}`} aria-labelledby="join-h">
          <div className={s.joinGrid}>
            <div className={s.joinText}>
              <p data-edit="join.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Join</p>
              <h2 data-edit="join.h2" data-edit-max="60" id="join-h" className={s.h2}>New balls, please</h2>
              <p data-edit="join.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Come and play twice before you decide: book two free sessions
                with the club captain, borrow a racket if you need one, and
                stay for tea.
              </p>
              <dl className={s.joinFacts}>
                <div>
                  <dt data-edit="join.term" data-edit-max="28">Waiting list</dt>
                  <dd data-edit="join.body" data-edit-max="200" data-edit-multiline>None this season, for any category</dd>
                </div>
                <div>
                  <dt data-edit="join.term2" data-edit-max="28">Dress</dt>
                  <dd data-edit="join.body2" data-edit-max="200" data-edit-multiline>Predominantly white on the grass; anything on the hard courts</dd>
                </div>
                <div>
                  <dt data-edit="join.term3" data-edit-max="28">Pavilion</dt>
                  <dd data-edit="join.body3" data-edit-max="200" data-edit-multiline>Open 08:00 to dusk, bar from 17:00</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <p data-edit="join.formHead" data-edit-max="240" data-edit-multiline className={s.formHead}>Application for membership</p>
              <div className={s.field}>
                <label data-edit="join.label" htmlFor="tt-name">Full name</label>
                <input id="tt-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="join.label2" htmlFor="tt-email">Email</label>
                <input id="tt-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label data-edit="join.label3" htmlFor="tt-category">Category</label>
                  <select id="tt-category" name="category" defaultValue="full">
                    <option value="full">Full playing</option>
                    <option value="weekday">Weekday</option>
                    <option value="young">Young adult</option>
                    <option value="junior">Junior</option>
                    <option value="family">Family</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="join.label4" htmlFor="tt-standard">Your tennis</label>
                  <select id="tt-standard" name="standard" defaultValue="club">
                    <option value="new">New to it</option>
                    <option value="social">Social player</option>
                    <option value="club">Club standard</option>
                    <option value="match">Match play, league</option>
                  </select>
                </div>
              </div>
              <div className={s.field}>
                <label data-edit="join.label5" htmlFor="tt-note">Anything else</label>
                <textarea id="tt-note" name="note" rows={3} />
              </div>
              <button data-edit="join.btn" data-edit-max="24" className={s.btn} type="submit">Send my application</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="2,0,0,3,0,1" className={s.footBand} aria-hidden="true">
          <TabbiedPattern pattern={doublebar} palette={BASELINE} fit="grid" cellSize={36} seed="tt-baseline-foot" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <Artwork slug="terrace-tennis-club-racket" alt="The club emblem: a wooden racket and a ball" inks={['var(--on-green)']} className={s.footRacket} />
          <div className={s.footText}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Terrace Lawn Tennis Club</p>
            <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>Terrace Road, Kingsmead KM4 2TR</p>
            <p className={s.footLine}>
              <a data-edit="footer.link" data-edit-max="28" href="mailto:secretary@terraceltc.example">secretary@terraceltc.example</a>
            </p>
            <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional tennis club; the members, fees and fixtures are invented.</p>
            <p className={s.footSmall}>
              Patterns by <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
            <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>The player and the racket are generated images, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
