import { TabbiedPattern } from 'tabbied/react';
import { stepramp, perforate, dimmer, rungs, diminuendo } from 'tabbied/patterns';
import s from './lumen-film-festival.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Lumen Short Film Festival: 13-16 November, Harbourtown',
  description:
    'Four days of short films in four Harbourtown venues: eight programme blocks, a jury of three, submissions, passes and the Lumen awards.',
};

/* Site colors: the SAME hexes as the root roles in the stylesheet. */
const BLACK = '#0f0f10';
const WHITE = '#edebe4';
const AMBER = '#f2a93b';
const MAGENTA = '#d93a7a';

/* The step wedge: every level of a fall from white to black. */
const WEDGE = ['transparent', WHITE, WHITE, AMBER, WHITE, MAGENTA];
/* The step wedge again, thrown by the projector onto the screen. */
const THROW = [BLACK, WHITE, AMBER, WHITE, AMBER, WHITE];
/* Venue frames: perforated film stock. */
const STOCK = ['transparent', WHITE, AMBER, WHITE, MAGENTA, WHITE];
/* The awards spotlight: one ink fading across another. */
const SPOT = ['transparent', AMBER, MAGENTA, WHITE, AMBER, MAGENTA];
/* The clapper sticks on the volunteer slate. */
const CLAPPER = [BLACK, WHITE, WHITE, AMBER, WHITE, WHITE];
/* The fade to black under the credits. */
const FADE = ['transparent', WHITE, AMBER, WHITE, MAGENTA, WHITE];

const NAV = [
  ['Programme', '#programme'],
  ['Jury', '#jury'],
  ['Submit', '#submit'],
  ['Tickets', '#tickets'],
  ['Venues', '#venues'],
  ['Awards', '#awards'],
  ['Volunteer', '#volunteer'],
];

const HERO_FACTS = [
  ['8', 'programme blocks'],
  ['54', 'films, none over 20 minutes'],
  ['4', 'venues on the harbour'],
  ['31', 'countries on the sheet'],
];

type Block = {
  letter: string;
  title: string;
  kind: string;
  films: string;
  runtime: string;
  venue: string;
  time: string;
  note: string;
};

type Day = { day: string; date: string; code: string; end: string; blocks: Block[] };

const DAYS: Day[] = [
  {
    day: 'Thu',
    date: '13 Nov',
    code: '01',
    end: 'Lights up 23:50',
    blocks: [
      { letter: 'A', title: 'Low Tide', kind: 'Opening night', films: '6 films', runtime: '92 min', venue: 'The Palace', time: '19:30', note: 'Party at the Quayside after' },
      { letter: 'B', title: 'Night Shift', kind: 'Midnight shorts', films: '8 films', runtime: '78 min', venue: 'Quayside No. 4', time: '22:30', note: 'Horror and worse, 18+' },
    ],
  },
  {
    day: 'Fri',
    date: '14 Nov',
    code: '02',
    end: 'Lights up 19:20',
    blocks: [
      { letter: 'C', title: 'Home Movies', kind: 'Documentary', films: '5 films', runtime: '86 min', venue: 'Library Theatre', time: '14:00', note: 'Q&A with three directors' },
      { letter: 'D', title: 'Drawn Lines', kind: 'Animation', films: '9 films', runtime: '74 min', venue: 'Harbour Arts', time: '18:00', note: 'Suitable from age 10' },
    ],
  },
  {
    day: 'Sat',
    date: '15 Nov',
    code: '03',
    end: 'Lights up 21:40',
    blocks: [
      { letter: 'E', title: 'Harbourtown Lens', kind: 'Local makers', films: '7 films', runtime: '95 min', venue: 'The Palace', time: '11:00', note: 'Every film made within 30 miles' },
      { letter: 'F', title: 'First Films', kind: 'Student', films: '8 films', runtime: '88 min', venue: 'Library Theatre', time: '15:00', note: 'Pay what you like' },
      { letter: 'G', title: 'Strangers', kind: 'International fiction', films: '6 films', runtime: '97 min', venue: 'The Palace', time: '20:00', note: 'Subtitled, captions on screen' },
    ],
  },
  {
    day: 'Sun',
    date: '16 Nov',
    code: '04',
    end: 'Lights up 20:00',
    blocks: [
      { letter: 'H', title: 'The Winners', kind: 'Awards night', films: '5 films', runtime: '110 min', venue: 'The Palace', time: '18:00', note: 'The awards, then the films again' },
    ],
  },
];

type Juror = {
  slug: string;
  alt: string;
  name: string;
  role: string;
  bio: string;
  roll: string;
  codes: string[];
  select: number;
  reject: number;
  note: string;
};

const JURY: Juror[] = [
  {
    slug: 'lumen-film-festival-ines',
    alt: 'Ines Alvarado, a woman in her fifties with short silver hair and a black turtleneck',
    name: 'Ines Alvarado',
    role: 'Director, president of the jury',
    bio: 'Four features and more than twenty shorts, most of them shot within sight of the sea. Her Salt Year took the Golden Gull at Porthaven. Second year in the chair.',
    roll: 'Roll 07',
    codes: ['14', '14A', '15', '15A', '16'],
    select: 2,
    reject: 4,
    note: 'Print',
  },
  {
    slug: 'lumen-film-festival-kofi',
    alt: 'Kofi Mensah-Hart, a man in his thirties with a shaved head and a denim jacket, half smiling',
    name: 'Kofi Mensah-Hart',
    role: 'Editor and programmer',
    bio: 'Cut three documentaries for the harbour broadcaster and programmes the late shorts at the Quayside. He watches everything twice and the second time with the sound off.',
    roll: 'Roll 11',
    codes: ['22', '22A', '23', '23A', '24'],
    select: 1,
    reject: 3,
    note: 'This one',
  },
  {
    slug: 'lumen-film-festival-mei',
    alt: 'Mei Takamura, a young woman with a sharp bob and large hoop earrings, looking over her shoulder',
    name: 'Mei Takamura',
    role: 'Animator',
    bio: 'Her hand-drawn Paper Moths played at forty festivals and took four years to draw. She runs the Saturday animation workshop at the Arts Centre.',
    roll: 'Roll 12',
    codes: ['30', '30A', '31', '31A', '32'],
    select: 2,
    reject: 0,
    note: 'Yes',
  },
];

const FRAMES = [0, 1, 2, 3, 4];

type Category = { name: string; length: string; note: string };

const CATEGORIES: Category[] = [
  { name: 'Fiction', length: 'Up to 15 min', note: 'Any genre, any language, subtitled in English.' },
  { name: 'Documentary', length: 'Up to 20 min', note: 'True stories, essays and portraits.' },
  { name: 'Animation', length: 'Up to 12 min', note: 'Drawn, stop-motion, computer, cut paper, sand.' },
  { name: 'Harbourtown Lens', length: 'Up to 20 min', note: 'Made within 30 miles of the harbour. Free to enter.' },
  { name: 'Student', length: 'Up to 15 min', note: 'Made while enrolled, in the last two years.' },
];

type Deadline = { count: string; label: string; date: string; fee: string; sweep: string; closed: boolean };

const DEADLINES: Deadline[] = [
  { count: '3', label: 'Early', date: '1 May', fee: '$20', sweep: '100%', closed: true },
  { count: '2', label: 'Regular', date: '1 July', fee: '$35', sweep: '66%', closed: false },
  { count: '1', label: 'Late', date: '15 August', fee: '$50', sweep: '33%', closed: false },
];

const SUBMIT_TERMS = [
  ['Students', '$10 at any deadline, with a student card'],
  ['Harbourtown Lens', 'Free, always'],
  ['Format', 'A private link for viewing; DCP or ProRes if selected'],
  ['We tell you', 'By 10 October, win or lose, by email'],
];

type Ticket = { kind: string; price: string; per: string; note: string; serial: string; tone: 'amber' | 'magenta' | 'plain' };

const TICKETS: Ticket[] = [
  { kind: 'Single block', price: '$12', per: 'one block', note: 'Any one block, A to H, at any of the four venues.', serial: 'No. 004417', tone: 'plain' },
  { kind: 'Day pass', price: '$36', per: 'one day', note: 'Every block on the day you choose. Thursday includes the party.', serial: 'No. 001208', tone: 'amber' },
  { kind: 'Festival pass', price: '$90', per: 'all four days', note: 'All eight blocks, the opening party and a seat kept at the awards.', serial: 'No. 000063', tone: 'magenta' },
  { kind: 'Concession', price: '$8', per: 'one block', note: 'Students, over 65s and under 18s. Carers go free.', serial: 'No. 007731', tone: 'plain' },
];

type Venue = { code: string; name: string; what: string; address: string; seats: string; access: string; blocks: string; seed: string };

const VENUES: Venue[] = [
  { code: 'P', name: 'The Palace', what: 'A picture house of 1928, restored', address: '2 Esplanade', seats: '410 seats', access: 'Step-free stalls, hearing loop', blocks: 'A, E, G, H', seed: 'lumen-venue-palace' },
  { code: 'H', name: 'Harbour Arts Centre', what: 'Studio 2, the black box', address: '18 Custom House Quay', seats: '120 seats', access: 'Step-free, lift to all floors', blocks: 'D', seed: 'lumen-venue-arts' },
  { code: 'Q', name: 'Quayside No. 4', what: 'A bonded warehouse with a bar', address: 'Pier Road, by the ferry', seats: '200, some standing', access: 'Step-free, ramped doorway', blocks: 'B', seed: 'lumen-venue-quay' },
  { code: 'L', name: 'Library Theatre', what: 'Under the central library', address: 'Market Square', seats: '96 seats', access: 'Lift from Market Square', blocks: 'C, F', seed: 'lumen-venue-library' },
];

type Award = { name: string; prize: string; note: string };

const AWARDS: Award[] = [
  { name: 'Best documentary', prize: '$2,000', note: 'For a true story told short.' },
  { name: 'Best animation', prize: '$2,000', note: 'Any technique, judged by Mei Takamura and a class of ten-year-olds.' },
  { name: 'Harbourtown Lens', prize: '$1,500', note: 'The best film made near the harbour, and a slot before a feature at the Palace.' },
  { name: 'Audience award', prize: 'A brass lamp', note: 'Voted on paper slips after every block. Counted on Sunday afternoon.' },
  { name: 'Jury mention', prize: 'A year pass', note: 'For a film the jury could not stop talking about.' },
];

const PAST_WINNERS = [
  ['2025', 'The Weight of Gulls, dir. Anna Sorrell'],
  ['2024', 'Kiln, dir. Tomasz Wrona'],
  ['2023', 'Nobody Swims in March, dir. Leila Haddad'],
];

type Role = { role: string; shift: string };

const ROLES: Role[] = [
  { role: 'Usher', shift: 'One block, about 2 hours' },
  { role: 'Box office', shift: 'Half a day at the Palace' },
  { role: 'Projection assist', shift: 'With our projectionist, Sat and Sun' },
  { role: 'Runner', shift: 'Between venues, on a bicycle' },
  { role: 'Q&A microphone', shift: 'After the blocks with guests' },
];

const PERKS = [
  'A festival pass for every two shifts',
  'Hot dinner in the green room',
  'The crew t-shirt, black, obviously',
  'The volunteers party, the Monday after',
];

export default function LumenFilmFestivalPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--black': '#0f0f10',
        '--white': '#edebe4',
        '--amber': '#f2a93b',
        '--magenta': '#d93a7a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="black,white,amber,magenta"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Antonio:wght@300..700&family=Share+Tech+Mono&family=Encode+Sans:wdth,wght@75..100,300..700&family=Permanent+Marker&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markWord" data-edit-max="60" className={s.markWord}>Lumen</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Short Film Festival</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#tickets">Passes</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="lf-title">
          <div className={s.strip}>
            <span className={s.holes} aria-hidden="true" />
            <p className={s.edge} aria-hidden="true">
              <span data-edit="lf.text" data-edit-max="60">Lumen 5222</span>
              <span data-edit="lf.text2" data-edit-max="60">14</span>
              <span data-edit="lf.text3" data-edit-max="60">14A</span>
              <span data-edit="lf.text4" data-edit-max="60">Harbourtown</span>
              <span data-edit="lf.text5" data-edit-max="60">15</span>
              <span data-edit="lf.text6" data-edit-max="60">15A</span>
            </p>
            <div className={s.heroFrames}>
              <div className={s.titleFrame}>
                <p data-edit="lf.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The eleventh Lumen</p>
                <h1 data-edit="lf.title" data-edit-max="70" id="lf-title" className={s.title}>Lumen</h1>
                <p data-edit="lf.titleSub" data-edit-max="240" data-edit-multiline className={s.titleSub}>Short Film Festival</p>
                <p className={s.dates}>
                  <span data-edit="lf.datesMark" data-edit-max="60" className={s.datesMark}>13-16 November</span>
                </p>
                <p data-edit="lf.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
                  Fifty-four short films in eight blocks, shown in four rooms
                  around Harbourtown&apos;s harbour: a 1928 picture house, a
                  black box, a warehouse with a bar and the theatre under the
                  library.
                </p>
                <div className={s.heroActions}>
                  <a data-edit="lf.btn" data-edit-max="28" className={s.btn} href="#tickets">Get a pass</a>
                  <a data-edit="lf.btnLine" data-edit-max="28" className={s.btnLine} href="#programme">The programme</a>
                </div>
              </div>
              <div className={s.wedgeFrame} aria-hidden="true">
                <div data-edit-pattern="lf.field" data-edit-roles="transparent,1,1,2,1,3" className={s.wedgeField}>
                  <TabbiedPattern pattern={stepramp} palette={WEDGE} fit="grid" cellSize={64} seed="lumen-wedge-hero" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <span className={s.wedgeCrop} />
              </div>
            </div>
            <p className={s.edge} aria-hidden="true">
              <span data-edit="lf.text7" data-edit-max="60">Safety film</span>
              <span data-edit="lf.text8" data-edit-max="60">&#x25B8; 14</span>
              <span data-edit="lf.text9" data-edit-max="60">Lumen 5222</span>
              <span data-edit="lf.text10" data-edit-max="60">&#x25B8; 15</span>
              <span data-edit="lf.text11" data-edit-max="60">Harbourtown</span>
            </p>
            <span className={s.holes} aria-hidden="true" />
          </div>

          <dl className={s.heroFacts}>
            {HERO_FACTS.map(([figure, what], i) => (
              <div key={what}>
                <dt data-edit={`lf.term.${i}`} data-edit-max="28">{figure}</dt>
                <dd data-edit={`lf.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------- PROGRAMME */}
        <section id="programme" className={s.sec} aria-labelledby="prog-h">
          <div className={s.secHead}>
            <p data-edit="programme.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Reel 1</p>
            <h2 data-edit="programme.h2" data-edit-max="60" id="prog-h" className={s.h2}>The programme</h2>
            <p data-edit="programme.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Eight blocks, lettered A to H, each loaded like a reel: five to
              nine films, one after another, with the lights up only at the
              end. Every block opens with the step wedge, so the projectionist
              can check the whites.
            </p>
          </div>

          <div className={s.days}>
            {DAYS.map((d, i) => (
              <div key={d.date} className={s.day}>
                <p className={s.dayHead}>
                  <span data-edit={`programme.dayName.${i}`} data-edit-max="60" className={s.dayName}>{d.day}</span>
                  <span data-edit={`programme.dayDate.${i}`} data-edit-max="60" className={s.dayDate}>{d.date}</span>
                  <span className={s.dayCode}>Day {d.code}</span>
                </p>
                <ol className={s.reels}>
                  {d.blocks.map((b, i2) => (
                    <li key={b.letter} className={s.reel}>
                      <span className={s.reelSpool} aria-hidden="true">
                        <span data-edit={`programme.text.${i}.${i2}`} data-edit-max="60">{b.letter}</span>
                      </span>
                      <div className={s.reelBody}>
                        <p data-edit={`programme.reelKind.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.reelKind}>{b.kind}</p>
                        <h3 data-edit={`programme.reelTitle.${i}.${i2}`} data-edit-max="40" className={s.reelTitle}>{b.title}</h3>
                        <p className={s.reelMeta}>
                          <span data-edit={`programme.text2.${i}.${i2}`} data-edit-max="60">{b.time}</span>
                          <span data-edit={`programme.text3.${i}.${i2}`} data-edit-max="60">{b.runtime}</span>
                          <span data-edit={`programme.text4.${i}.${i2}`} data-edit-max="60">{b.films}</span>
                        </p>
                        <p data-edit={`programme.reelVenue.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.reelVenue}>{b.venue}</p>
                        <p data-edit={`programme.reelNote.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.reelNote}>{b.note}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className={s.dayEnd}>
                  <span>End of day {d.code}</span>
                  <span data-edit={`programme.text5.${i}`} data-edit-max="60">{d.end}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ JURY */}
        <section id="jury" className={`${s.sec} ${s.jurySec}`} aria-labelledby="jury-h">
          <div className={s.secHead}>
            <p data-edit="jury.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Reel 2</p>
            <h2 data-edit="jury.h2" data-edit-max="60" id="jury-h" className={s.h2}>The jury</h2>
            <p data-edit="jury.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Three people watch all fifty-four films in a locked room with a
              pot of coffee and decide the Golden Lumen by Sunday lunchtime.
              Here is the proof sheet from their portraits, with the frames we
              printed marked in grease pencil.
            </p>
          </div>

          <div className={s.sheet}>
            <p className={s.sheetLabel}>
              <span data-edit="jury.text" data-edit-max="60">Proof sheet</span>
              <span data-edit="jury.text2" data-edit-max="60">Jury 26</span>
              <span data-edit="jury.text3" data-edit-max="60">Ilford, 3 rolls</span>
            </p>
            {JURY.map((j, i) => (
              <article key={j.name} className={s.juror}>
                <div className={s.jScroll}>
                  <div className={s.jStrip}>
                    <span className={s.holes} aria-hidden="true" />
                    <p className={s.jEdge} aria-hidden="true">
                      <span data-edit={`juror.text.${i}`} data-edit-max="60">{j.roll}</span>
                      <span data-edit={`juror.text2.${i}`} data-edit-max="60">Lumen 5222</span>
                      <span data-edit={`juror.text3.${i}`} data-edit-max="60">{j.roll}</span>
                    </p>
                    <ol className={s.frames}>
                      {FRAMES.map((k, i2) => (
                        <li
                          key={k}
                          className={`${s.frame} ${s[`crop${k}`]} ${k === j.select ? s.select : ''} ${k === j.reject ? s.reject : ''}`}>
                          <span className={s.shotBox}>
                            <Artwork
                              slug={j.slug}
                              alt={k === j.select ? j.alt : ''}
                              inks={['var(--black)', 'var(--on-black)']}
                              className={s.shot}
                            />
                          </span>
                          <span data-edit={`juror.frameNo.${i}.${i2}`} data-edit-max="60" className={s.frameNo}>{j.codes[k]}</span>
                          {k === j.select ? <span data-edit={`juror.greaseNote.${i}.${i2}`} data-edit-max="60" className={s.greaseNote}>{j.note}</span> : null}
                        </li>
                      ))}
                    </ol>
                    <span className={s.holes} aria-hidden="true" />
                  </div>
                </div>
                <div className={s.jText}>
                  <h3 data-edit={`juror.jName.${i}`} data-edit-max="40" className={s.jName}>{j.name}</h3>
                  <p data-edit={`juror.jRole.${i}`} data-edit-max="240" data-edit-multiline className={s.jRole}>{j.role}</p>
                  <p data-edit={`juror.jBio.${i}`} data-edit-max="240" data-edit-multiline className={s.jBio}>{j.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- SUBMIT */}
        <section id="submit" className={s.sec} aria-labelledby="submit-h">
          <div className={s.secHead}>
            <p data-edit="submit.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Reel 3</p>
            <h2 data-edit="submit.h2" data-edit-max="60" id="submit-h" className={s.h2}>Submissions</h2>
            <p data-edit="submit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Short means short: nothing over twenty minutes, credits
              included. Every film is watched to the end by two screeners,
              and the ones that split them go to a third.
            </p>
          </div>

          <div className={s.submitGrid}>
            <ul className={s.cats}>
              {CATEGORIES.map((c, i) => (
                <li key={c.name}>
                  <span className={s.catNo}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 data-edit={`submit.catName.${i}`} data-edit-max="40" className={s.catName}>{c.name}</h3>
                  <p data-edit={`submit.catLength.${i}`} data-edit-max="240" data-edit-multiline className={s.catLength}>{c.length}</p>
                  <p data-edit={`submit.catNote.${i}`} data-edit-max="240" data-edit-multiline className={s.catNote}>{c.note}</p>
                </li>
              ))}
            </ul>

            <div className={s.leader}>
              <p data-edit="submit.leaderLabel" data-edit-max="240" data-edit-multiline className={s.leaderLabel}>Deadlines and fees, counted down like a leader</p>
              <ol className={s.countdown}>
                {DEADLINES.map((d, i) => (
                  <li key={d.label} className={d.closed ? s.closed : undefined}>
                    <span className={s.dial} style={{ '--sweep': d.sweep } as React.CSSProperties} aria-hidden="true">
                      <span data-edit={`submit.dialCount.${i}`} data-edit-max="60" className={s.dialCount}>{d.count}</span>
                    </span>
                    <p data-edit={`submit.dlLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.dlLabel}>{d.label}</p>
                    <p data-edit={`submit.dlDate.${i}`} data-edit-max="240" data-edit-multiline className={s.dlDate}>{d.date}</p>
                    <p data-edit={`submit.dlFee.${i}`} data-edit-max="240" data-edit-multiline className={s.dlFee}>{d.fee}</p>
                    {d.closed ? <p data-edit={`submit.dlClosed.${i}`} data-edit-max="240" data-edit-multiline className={s.dlClosed}>Closed</p> : null}
                  </li>
                ))}
              </ol>
              <dl className={s.terms}>
                {SUBMIT_TERMS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`submit.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`submit.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- TICKETS */}
        <section id="tickets" className={`${s.sec} ${s.ticketSec}`} aria-labelledby="tickets-h">
          <div className={s.secHead}>
            <p data-edit="tickets.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Reel 4</p>
            <h2 data-edit="tickets.h2" data-edit-max="60" id="tickets-h" className={s.h2}>Tickets and passes</h2>
            <p data-edit="tickets.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              On sale now at the Palace box office and here. Seats are
              unreserved except for pass holders at the awards; doors open
              twenty minutes before each block.
            </p>
          </div>

          <div className={s.booth}>
            <div className={s.projection}>
              <div className={s.screen} aria-hidden="true">
                <div data-edit-pattern="tickets.field" data-edit-roles="0,1,2,1,2,1" className={s.screenField}>
                  <TabbiedPattern pattern={stepramp} palette={THROW} fit="grid" cellSize={40} seed="lumen-wedge-screen" style={{ position: 'absolute', inset: 0 }} />
                </div>
              </div>
              <span className={s.beam} aria-hidden="true" />
              <Artwork
                slug="lumen-film-festival-projector"
                alt="A vintage film projector with two reels on its arms"
                inks={['var(--text)']}
                className={s.projector}
              />
              <p data-edit="tickets.boothNote" data-edit-max="240" data-edit-multiline className={s.boothNote}>The Palace&apos;s 1954 projector runs the opening block on 35mm. Everything else is digital, and nobody can tell.</p>
            </div>

            <ul className={s.tickets}>
              {TICKETS.map((t, i) => (
                <li key={t.kind} className={`${s.ticket} ${s[t.tone]}`}>
                  <div className={s.ticketMain}>
                    <p data-edit={`tickets.admit.${i}`} data-edit-max="240" data-edit-multiline className={s.admit}>Admit one</p>
                    <h3 data-edit={`tickets.ticketKind.${i}`} data-edit-max="40" className={s.ticketKind}>{t.kind}</h3>
                    <p data-edit={`tickets.ticketNote.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketNote}>{t.note}</p>
                  </div>
                  <div className={s.stub}>
                    <p data-edit={`tickets.ticketPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketPrice}>{t.price}</p>
                    <p data-edit={`tickets.ticketPer.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketPer}>{t.per}</p>
                    <p data-edit={`tickets.serial.${i}`} data-edit-max="240" data-edit-multiline className={s.serial}>{t.serial}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- VENUES */}
        <section id="venues" className={s.sec} aria-labelledby="venues-h">
          <div className={s.secHead}>
            <p data-edit="venues.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Reel 5</p>
            <h2 data-edit="venues.h2" data-edit-max="60" id="venues-h" className={s.h2}>Four venues</h2>
            <p data-edit="venues.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              All four are within twelve minutes&apos; walk of each other along
              the harbour. The free festival shuttle, a green minibus, loops
              between them every twenty minutes on Saturday.
            </p>
          </div>

          <div className={s.venueStrip}>
            <span className={s.holes} aria-hidden="true" />
            <ul className={s.venues}>
              {VENUES.map((v, i) => (
                <li key={v.code} className={s.venue}>
                  <div className={s.venueTop}>
                    <div data-edit-pattern={`venues.field.${i}`} data-edit-roles="transparent,1,2,1,3,1" className={s.venueField} aria-hidden="true">
                      <TabbiedPattern pattern={perforate} palette={STOCK} options={{ frequency: 0.55 }} fit="grid" cellSize={28} seed={v.seed} style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    <span data-edit={`venues.venueCode.${i}`} data-edit-max="60" className={s.venueCode}>{v.code}</span>
                  </div>
                  <h3 data-edit={`venues.venueName.${i}`} data-edit-max="40" className={s.venueName}>{v.name}</h3>
                  <p data-edit={`venues.venueWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.venueWhat}>{v.what}</p>
                  <dl className={s.venueFacts}>
                    <div>
                      <dt data-edit={`venues.term.${i}`} data-edit-max="28">Where</dt>
                      <dd data-edit={`venues.body.${i}`} data-edit-max="200" data-edit-multiline>{v.address}</dd>
                    </div>
                    <div>
                      <dt data-edit={`venues.term2.${i}`} data-edit-max="28">Seats</dt>
                      <dd data-edit={`venues.body2.${i}`} data-edit-max="200" data-edit-multiline>{v.seats}</dd>
                    </div>
                    <div>
                      <dt data-edit={`venues.term3.${i}`} data-edit-max="28">Access</dt>
                      <dd data-edit={`venues.body3.${i}`} data-edit-max="200" data-edit-multiline>{v.access}</dd>
                    </div>
                    <div>
                      <dt data-edit={`venues.term4.${i}`} data-edit-max="28">Blocks</dt>
                      <dd data-edit={`venues.body4.${i}`} data-edit-max="200" data-edit-multiline>{v.blocks}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
            <span className={s.holes} aria-hidden="true" />
          </div>
        </section>

        {/* ---------------------------------------------------------- AWARDS */}
        <section id="awards" className={s.sec} aria-labelledby="awards-h">
          <div className={s.secHead}>
            <p data-edit="awards.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Reel 6</p>
            <h2 data-edit="awards.h2" data-edit-max="60" id="awards-h" className={s.h2}>The Lumen awards</h2>
            <p data-edit="awards.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Given on Sunday night at the Palace, and then the winning films
              are shown again, in order, so the room can argue with the jury.
            </p>
          </div>

          <div className={s.awardsGrid}>
            <div className={s.golden}>
              <div data-edit-pattern="awards.field" data-edit-roles="transparent,2,3,1,2,3" className={s.spot} aria-hidden="true">
                <TabbiedPattern pattern={dimmer} palette={SPOT} fit="grid" cellSize={48} seed="lumen-spot" style={{ position: 'absolute', inset: 0 }} />
              </div>
              <div className={s.goldenCard}>
                <p data-edit="awards.goldenLabel" data-edit-max="240" data-edit-multiline className={s.goldenLabel}>The first prize</p>
                <h3 data-edit="awards.goldenName" data-edit-max="40" className={s.goldenName}>The Golden Lumen</h3>
                <p data-edit="awards.goldenPrize" data-edit-max="240" data-edit-multiline className={s.goldenPrize}>$5,000</p>
                <p data-edit="awards.goldenNote" data-edit-max="240" data-edit-multiline className={s.goldenNote}>
                  And a week of grading at Tidemark Post for the next film. Chosen
                  by the jury from all five categories.
                </p>
                <dl className={s.winners}>
                  {PAST_WINNERS.map(([year, film], i) => (
                    <div key={year}>
                      <dt data-edit={`awards.term.${i}`} data-edit-max="28">{year}</dt>
                      <dd data-edit={`awards.body.${i}`} data-edit-max="200" data-edit-multiline>{film}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <ul className={s.awards}>
              {AWARDS.map((a, i) => (
                <li key={a.name}>
                  <div>
                    <h3 data-edit={`awards.awardName.${i}`} data-edit-max="40" className={s.awardName}>{a.name}</h3>
                    <p data-edit={`awards.awardNote.${i}`} data-edit-max="240" data-edit-multiline className={s.awardNote}>{a.note}</p>
                  </div>
                  <p data-edit={`awards.awardPrize.${i}`} data-edit-max="240" data-edit-multiline className={s.awardPrize}>{a.prize}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- VOLUNTEER */}
        <section id="volunteer" className={s.sec} aria-labelledby="vol-h">
          <div className={s.secHead}>
            <p data-edit="volunteer.secCode" data-edit-max="240" data-edit-multiline className={s.secCode}>Reel 7</p>
            <h2 data-edit="volunteer.h2" data-edit-max="60" id="vol-h" className={s.h2}>Volunteer</h2>
            <p data-edit="volunteer.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Lumen runs on about ninety volunteers. Give us two shifts and
              you see the rest of the festival free.
            </p>
          </div>

          <div className={s.volGrid}>
            <div className={s.volInfo}>
              <h3 data-edit="volunteer.volTitle" data-edit-max="40" className={s.volTitle}>The crew call</h3>
              <ul className={s.roles}>
                {ROLES.map((r, i) => (
                  <li key={r.role}>
                    <span data-edit={`volunteer.roleName.${i}`} data-edit-max="60" className={s.roleName}>{r.role}</span>
                    <span data-edit={`volunteer.roleShift.${i}`} data-edit-max="60" className={s.roleShift}>{r.shift}</span>
                  </li>
                ))}
              </ul>
              <h3 data-edit="volunteer.volTitle2" data-edit-max="40" className={s.volTitle}>What you get</h3>
              <ul className={s.perks}>
                {PERKS.map((p, i) => (
                  <li data-edit={`volunteer.item.${i}`} data-edit-max="80" key={p}>{p}</li>
                ))}
              </ul>
            </div>

            <form className={s.slate} action="#">
              <div data-edit-pattern="volunteer.field" data-edit-roles="0,1,1,2,1,1" className={s.clapper} aria-hidden="true">
                <TabbiedPattern pattern={rungs} palette={CLAPPER} fit="grid" cellSize={28} seed="lumen-clapper" style={{ position: 'absolute', inset: 0 }} />
              </div>
              <div className={s.slateBody}>
                <p className={s.slateHead}>
                  <span data-edit="volunteer.text" data-edit-max="60">Prod. Lumen 26</span>
                  <span data-edit="volunteer.text2" data-edit-max="60">Scene: crew</span>
                  <span data-edit="volunteer.text3" data-edit-max="60">Take 1</span>
                </p>
                <div className={s.slateGrid}>
                  <div className={s.field}>
                    <label data-edit="volunteer.label" htmlFor="lf-name">Name</label>
                    <input id="lf-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="volunteer.label2" htmlFor="lf-email">Email</label>
                    <input id="lf-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="volunteer.label3" htmlFor="lf-role">Role you would like</label>
                    <select id="lf-role" name="role" defaultValue="usher">
                      <option value="usher">Usher</option>
                      <option value="box">Box office</option>
                      <option value="projection">Projection assist</option>
                      <option value="runner">Runner</option>
                      <option value="mic">Q&amp;A microphone</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="volunteer.label4" htmlFor="lf-days">Days you can give</label>
                    <select id="lf-days" name="days" defaultValue="sat">
                      <option value="thu">Thursday 13</option>
                      <option value="fri">Friday 14</option>
                      <option value="sat">Saturday 15</option>
                      <option value="sun">Sunday 16</option>
                      <option value="all">All four</option>
                    </select>
                  </div>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label data-edit="volunteer.label5" htmlFor="lf-note">Anything we should know</label>
                    <textarea id="lf-note" name="note" rows={3} />
                  </div>
                </div>
                <button data-edit="volunteer.submit" data-edit-max="24" className={s.submit} type="submit">Mark it, send</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,1,3,1" className={s.fade} aria-hidden="true">
          <TabbiedPattern pattern={diminuendo} palette={FADE} fit="grid" cellSize={40} seed="lumen-fade" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.credits}>
          <p data-edit="footer.theEnd" data-edit-max="240" data-edit-multiline className={s.theEnd}>The end</p>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Lumen Short Film Festival</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>13-16 November, Harbourtown. Box office at the Palace, 2 Esplanade.</p>
          <p className={s.footLine}>
            <a data-edit="footer.link" data-edit-max="28" href="tel:+15550167720">(555) 016-7720</a>
            {' / '}
            <a data-edit="footer.link2" data-edit-max="28" href="mailto:boxoffice@lumenfest.example">boxoffice@lumenfest.example</a>
          </p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional festival; the films, jury, venues and prices are invented.</p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>The portraits and the projector are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
