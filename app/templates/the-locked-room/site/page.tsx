import { TabbiedPattern } from 'tabbied/react';
import { maze } from 'tabbied/patterns';
import s from './the-locked-room.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'The Locked Room: Escape rooms, Lower Marsh',
  description:
    'The Locked Room runs four sixty-minute escape rooms on Foundry Lane. Each case file with its players, difficulty and escape rate, how a game works, rates by group size, parties and booking.',
};

/* Site colors. The maze is the security tint inside an evidence envelope:
   typewriter ink and carbon blue on manila, with the odd dot in stamp red. */
const MANILA = '#e8d6a8';
const INK = '#221e19';
const STAMP = '#b1261f';
const CARBON = '#2e4a7a';

const LINING = [MANILA, INK, CARBON, INK, STAMP];
const TINT = ['transparent', CARBON, INK, CARBON];
const PLAN = ['transparent', CARBON, CARBON, INK];
const STRIP = [STAMP, MANILA, MANILA, INK];

const NAV = [
  ['Case files', '#cases'],
  ['How it works', '#how'],
  ['Rates', '#rates'],
  ['Groups', '#parties'],
  ['Book', '#book'],
  ['Questions', '#questions'],
];

type Line = {
  text: string;
  redacted?: boolean;
};

type Case = {
  no: string;
  title: string;
  filed: string;
  stamp: string;
  level: number;
  levelWord: string;
  stats: [string, string][];
  lines: Line[];
  art: string;
  artAlt: string;
  exhibit: string;
};

const CASES: Case[] = [
  {
    no: 'Case 01',
    title: 'The Hollow Mill',
    filed: 'Filed 1931. Hollow Mill, on the river road.',
    stamp: 'Start here',
    art: 'the-locked-room-sack',
    artAlt: 'A tied flour sack stamped with a windmill',
    exhibit: 'Exhibit A. The flour sack',
    level: 2,
    levelWord: 'Difficulty 2 of 5',
    stats: [
      ['Players', '2 to 6'],
      ['Escaped', '46 in 100'],
      ['Record', '38:50'],
      ['Ages', '10 and up'],
    ],
    lines: [
      { text: 'The miller\'s daughter went up to the grain loft at nine.' },
      { text: 'The loft door was bolted from the inside. She was not in it.' },
      { text: 'the name written on the flour sack in the corner', redacted: true },
      { text: 'Search the loft, work the hoist, and find where she went.' },
    ],
  },
  {
    no: 'Case 02',
    title: 'Room 414',
    filed: 'Filed 1968. The Carlton Hotel, fourth floor.',
    stamp: 'Most booked',
    art: 'the-locked-room-hotelkey',
    artAlt: 'A hotel key on a tag numbered 414',
    exhibit: 'Exhibit A. The key to 414',
    level: 3,
    levelWord: 'Difficulty 3 of 5',
    stats: [
      ['Players', '2 to 5'],
      ['Escaped', '31 in 100'],
      ['Record', '44:07'],
      ['Ages', '12 and up'],
    ],
    lines: [
      { text: 'A courier checked in at 4:10 with one brown case.' },
      { text: 'He never checked out. The case never left the room.' },
      { text: 'what the night porter saw at the service lift', redacted: true },
      { text: 'You have the key to 414 and an hour before housekeeping.' },
    ],
  },
  {
    no: 'Case 03',
    title: 'The Cartographer',
    filed: 'Filed 1894. A study above a chart shop.',
    stamp: 'New this year',
    art: 'the-locked-room-map',
    artAlt: 'A half-unrolled map with a compass rose',
    exhibit: 'Exhibit A. The chart',
    level: 4,
    levelWord: 'Difficulty 4 of 5',
    stats: [
      ['Players', '3 to 6'],
      ['Escaped', '24 in 100'],
      ['Record', '47:30'],
      ['Ages', '14 and up'],
    ],
    lines: [
      { text: 'Every map in this study leaves out the same small island.' },
      { text: 'The mapmaker drew it once, then hid the only copy.' },
      { text: 'the latitude, and the reason he would not print it', redacted: true },
      { text: 'Find the copy. The study locks itself at the hour.' },
    ],
  },
  {
    no: 'Case 04',
    title: 'Blackout at the Exchange',
    filed: 'Filed 1977. Central Telephone Exchange.',
    stamp: 'Experts only',
    art: 'the-locked-room-plug',
    artAlt: 'A switchboard jack plug on a coiled cord',
    exhibit: 'Exhibit A. A switchboard plug',
    level: 5,
    levelWord: 'Difficulty 5 of 5',
    stats: [
      ['Players', '4 to 8'],
      ['Escaped', '12 in 100'],
      ['Record', '52:18'],
      ['Ages', '16 and up'],
    ],
    lines: [
      { text: 'At 9:14 pm every line in the city went dead at once.' },
      { text: 'One switchboard is still lit. Someone is on the line.' },
      { text: 'the number they are calling from, and who answers', redacted: true },
      { text: 'Two rooms, one team split between them. Talk by wire only.' },
    ],
  },
];

const SCALE = [1, 2, 3, 4, 5];

const STEPS = [
  ['Arrive fifteen minutes early', 'Your game master briefs you on the case, the rules and the one thing you must never force.'],
  ['Phones go in the locker', 'Photos give puzzles away. We take one of the team at the end, with the sign.'],
  ['Sixty minutes on the clock', 'We watch on camera and send up to three hints by the old telephone on the wall. More if you ask.'],
  ['Out, one way or the other', 'Escape or not, we walk you through what you missed. Most teams want to know.'],
];

const RATES = [
  ['2 players', '$38', '$33'],
  ['3 players', '$34', '$29'],
  ['4 or 5 players', '$30', '$25'],
  ['6 to 8 players', '$27', '$22'],
];

const PARTIES = [
  {
    title: 'Birthdays',
    tag: 'Ages 10 and up',
    body: 'Any room for the team, then forty-five minutes in the back office with the table laid. Bring a cake; we bring plates, candles and a case file with the birthday name typed on it.',
    price: 'Room rate, plus $80 for the back office',
  },
  {
    title: 'Teams and offices',
    tag: 'Up to 28 people',
    body: 'Hire all four rooms at once, split into teams, and race. Times go up on the board and the debrief is in the back office with coffee. Weekdays before 5 are the cheapest.',
    price: 'All four rooms, $720 an hour slot',
  },
];

const TIMES = ['12:00', '1:30', '3:00', '4:30', '6:00', '7:30', '9:00'];

const QUESTIONS = [
  ['Are we really locked in?', 'No. The door looks locked, and the game is to find the way out, but the handle opens from the inside the whole time. You can leave, and come back in, whenever you like.'],
  ['How scary is it?', 'Not at all. There are no actors and nothing jumps out. The Exchange is dark for the first ten minutes and loud once, which we tell you about in the briefing.'],
  ['What if we are late?', 'We can hold the room for ten minutes, then the next team goes in. Late teams play the time that is left.'],
  ['Can we play with children?', 'From ten, with an adult in the room. The Hollow Mill is the one we would choose for a first game.'],
  ['Is it accessible?', 'The Hollow Mill and Room 414 are step-free, with nothing to crawl through. Tell us when you book and we will adjust the high shelves.'],
];

const HOURS = [
  ['Wednesday to Friday', 'Noon to 11 pm'],
  ['Saturday and Sunday', '10 am to 11 pm'],
  ['Monday and Tuesday', 'Private hire only'],
];

export default function TheLockedRoomPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Archivo:wdth,wght@62..125,400..800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">The Locked Room</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The cover of the dossier on the left; on the right an evidence
            envelope torn open, its security tint the maze. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.cover}>
            <p className={s.coverStamp}>Confidential</p>
            <p className={s.typed}>Escape rooms. 88 Foundry Lane, Lower Marsh.</p>
            <h1 id="hero-h" className={s.title}>Four rooms. Sixty minutes. One way out.</h1>
            <dl className={s.coverFacts}>
              <div>
                <dt>Subject</dt>
                <dd>You, and two to seven others</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Unit 4, 88 Foundry Lane</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Open Wednesday to Sunday</dd>
              </div>
            </dl>
            <div className={s.actions}>
              <a className={s.button} href="#book">Book a room</a>
              <a className={s.textLink} href="#cases">Read the case files</a>
            </div>
          </div>

          <div className={s.envelope}>
            <div className={s.lining} aria-hidden="true">
              <TabbiedPattern
                pattern={maze}
                palette={LINING}
                options={{ thickness: 6 }}
                fit="grid"
                cellSize={30}
                seed="locked-lining"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="the-locked-room-key"
              alt="A large iron key with an ornate bow, lying across the envelope"
              inks={['var(--text)']}
              className={s.heroKey}
            />
            <div className={s.label}>
              <p className={s.labelHead}>Evidence</p>
              <p className={s.labelLine}>Item: floor plan, Unit 4</p>
              <p className={s.labelLine}>Found: 9:14 pm</p>
              <p className={s.labelLine}>Do not bend</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ CASE FILES
            One folder per room. The tab moves along the top edge from folder
            to folder, the way they sit in a drawer. */}
        <section id="cases" className={s.section} aria-labelledby="cases-h">
          <div className={s.head}>
            <h2 id="cases-h" className={s.stampHead}>Case files</h2>
            <p className={s.headNote}>
              Four rooms, each a case that was never closed. Every one runs for
              sixty minutes, and every one has been solved, by somebody.
            </p>
          </div>

          <div className={s.cases}>
            {CASES.map((c) => (
              <article key={c.no} className={s.folder} aria-label={c.title}>
                <p className={s.folderTab}>{c.no}</p>
                <div className={s.folderBody}>
                  <div className={s.card}>
                    <p className={s.cardHead}>Particulars</p>
                    <div className={s.cardBody}>
                      <dl className={s.stats}>
                        {c.stats.map(([k, v]) => (
                          <div key={k}>
                            <dt>{k}</dt>
                            <dd>{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className={s.exhibit}>
                        <Artwork slug={c.art} alt={c.artAlt} inks={['var(--text)']} className={s.exhibitArt} />
                        <p className={s.exhibitNote}>{c.exhibit}</p>
                      </div>
                    </div>
                    <div className={s.meter} aria-hidden="true">
                      {SCALE.map((n) => (
                        <span key={n} className={n <= c.level ? s.on : s.off} />
                      ))}
                    </div>
                    <p className={s.meterWord}>{c.levelWord}</p>
                  </div>
                  <div className={s.report}>
                    <h3>{c.title}</h3>
                    <p className={s.filed}>{c.filed}</p>
                    <div className={s.lines}>
                      {c.lines.map((l) => (
                        <p key={l.text} className={l.redacted ? s.redacted : undefined} aria-hidden={l.redacted ? true : undefined}>{l.text}</p>
                      ))}
                    </div>
                    <p className={s.caseStamp}>{c.stamp}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* The inside of a security envelope, laid across the page. */}
        <div className={s.tint} aria-hidden="true">
          <TabbiedPattern
            pattern={maze}
            palette={TINT}
            options={{ thickness: 4 }}
            fit="grid"
            cellSize={24}
            seed="locked-tint"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ HOW */}
        <section id="how" className={s.section} aria-labelledby="how-h">
          <div className={s.head}>
            <h2 id="how-h" className={s.stampHead}>Procedure</h2>
            <p className={s.headNote}>
              The door is never locked. It only looks it. Anyone can step out at
              any time, and nobody will think less of them.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([t, d]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- RATES */}
        <section id="rates" className={`${s.section} ${s.ratesSection}`} aria-labelledby="rates-h">
          <div className={s.head}>
            <h2 id="rates-h" className={s.stampHead}>Rates</h2>
            <p className={s.headNote}>
              Priced per player, by the size of your team. The whole room is
              yours; we never put strangers together.
            </p>
          </div>
          <div className={s.schedule}>
            <table className={s.rates}>
              <caption className={s.caption}>Fee schedule, per player, per room</caption>
              <thead>
                <tr>
                  <th scope="col">Team</th>
                  <th scope="col">Evenings and weekends</th>
                  <th scope="col">Weekdays before 5</th>
                </tr>
              </thead>
              <tbody>
                {RATES.map(([team, full, early]) => (
                  <tr key={team}>
                    <th scope="row">{team}</th>
                    <td className={s.rate}>{full}</td>
                    <td className={s.rate}>{early}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className={s.rateNotes}>
              <li>Gift vouchers for any room, any team size, good for a year.</li>
              <li>Students and anyone over 65, $4 off each, any time.</li>
              <li>Pay when you book. Move your time free up to 48 hours before.</li>
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- PARTIES */}
        <section id="parties" className={`${s.section} ${s.parties}`} aria-labelledby="parties-h">
          <div className={s.partiesText}>
            <div className={s.head}>
              <h2 id="parties-h" className={s.stampHead}>Groups</h2>
            </div>
            {PARTIES.map((p) => (
              <div className={s.party} key={p.title}>
                <p className={s.partyTag}>{p.tag}</p>
                <h3>{p.title}</h3>
                <p className={s.partyBody}>{p.body}</p>
                <p className={s.partyPrice}>{p.price}</p>
              </div>
            ))}
          </div>
          <figure className={s.plan}>
            <div className={s.planField} aria-hidden="true">
              <TabbiedPattern
                pattern={maze}
                palette={PLAN}
                options={{ thickness: 5, frequency: 0.9 }}
                fit="grid"
                cellSize={36}
                seed="locked-plan"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <figcaption className={s.planCaption}>Unit 4, all four rooms. Not to scale, on purpose.</figcaption>
          </figure>
        </section>

        {/* ----------------------------------------------------------- BOOK */}
        <section id="book" className={`${s.section} ${s.book}`} aria-labelledby="book-h">
          <form className={s.form} action="#">
            <div className={s.formTint} aria-hidden="true">
              <TabbiedPattern
                pattern={maze}
                palette={STRIP}
                options={{ thickness: 5 }}
                fit="grid"
                cellSize={24}
                seed="locked-strip"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.formNo}>Form LR-7</p>
            <h2 id="book-h" className={s.formTitle}>Request for a room</h2>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="lr-room">Case</label>
                <select id="lr-room" name="room" defaultValue="Room 414">
                  {CASES.map((c) => (
                    <option key={c.no} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="lr-players">Players</label>
                <input id="lr-players" name="players" type="number" min={2} max={8} defaultValue={4} />
              </div>
              <div className={s.field}>
                <label htmlFor="lr-date">Date</label>
                <input id="lr-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="lr-time">Start time</label>
                <select id="lr-time" name="time" defaultValue="6:00">
                  {TIMES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="lr-name">Name</label>
                <input id="lr-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="lr-email">Email</label>
                <input id="lr-email" name="email" type="email" autoComplete="email" />
              </div>
            </div>
            <div className={s.formFoot}>
              <button className={s.button} type="submit">File the request</button>
              <p className={s.small}>We confirm by email within the hour, noon to 11. Start times are the same every open day.</p>
            </div>
          </form>
        </section>

        {/* ------------------------------------------------------ QUESTIONS */}
        <section id="questions" className={`${s.section} ${s.questions}`} aria-labelledby="questions-h">
          <div>
            <div className={s.head}>
              <h2 id="questions-h" className={s.stampHead}>Questions</h2>
            </div>
            <div className={s.faq}>
              {QUESTIONS.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className={s.visit}>
            <p className={s.visitHead}>Where to find us</p>
            <p className={s.address}>Unit 4, 88 Foundry Lane</p>
            <p className={s.typed}>Lower Marsh. The red door at the end of the yard, under the loading crane.</p>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <p className={s.contact}>
              <a href="tel:+15550129144">(555) 012-9144</a>
            </p>
            <p className={s.contact}>
              <a href="mailto:cases@thelockedroom.example">cases@thelockedroom.example</a>
            </p>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>The Locked Room</p>
        <p>A fictional escape room. The cases, records and rates are invented; the key and the evidence sketches are generated images drawn in the page's colors.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
