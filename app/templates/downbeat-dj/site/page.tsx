import { TabbiedPattern } from 'tabbied/react';
import { quaver } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './downbeat-dj.module.css';

export const metadata = {
  title: 'Downbeat: Wedding and party DJ, Harbor County',
  description:
    'Downbeat plays weddings and parties in Harbor County. A run of show written with you, a setlist shaped to the night, ceremony sound, an MC, and first-dance edits.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Quaver is the
   mark: quarter discs tucked into turning corners, like notes on a beat.
   It is pressed into the record in the hero, runs as a band after the run
   of show, fills the first-dance panel and edges the footer. */
const NIGHT = '#15121e';
const CREAM = '#f3ece0';
const PINK = '#ff4f8b';
const CYAN = '#3fd0e0';
const YELLOW = '#f4d23c';

const RECORD = ['transparent', PINK, CYAN, YELLOW, CREAM, CYAN];
const BAND = ['transparent', CYAN, YELLOW, PINK, CREAM, PINK];
const SOFT = ['transparent', YELLOW, PINK, CYAN, CREAM, YELLOW];

const NAV = [
  ['Run of show', '#run'],
  ['Setlist', '#setlist'],
  ['Packages', '#packages'],
  ['Equipment', '#kit'],
  ['Requests', '#requests'],
  ['Check a date', '#book'],
];

const RUN = [
  ['3:30', 'Guests arrive', 'Strings and piano, low under the chatter', 'Officiant on a lapel mic'],
  ['4:00', 'Processional', 'Your song, cued to the doors opening', 'We watch for the planner\'s nod'],
  ['4:25', 'Recessional', 'Up and loud, the first smile of the day', 'Mic off, music straight in'],
  ['4:30', 'Cocktail hour', 'Jazz and soul on the patio speakers', 'Second system, so the hall stays set'],
  ['5:45', 'Grand entrance', 'Your entrance song, names said right', 'MC introduces the wedding party'],
  ['6:00', 'Dinner', 'Quiet enough to talk across the table', 'Tables called up one by one'],
  ['7:10', 'Toasts', 'Music out, wireless mic handed over', 'Order agreed the week before'],
  ['7:30', 'First dance', 'Your edit, faded where you chose', 'Everyone invited in at the chorus'],
  ['7:40', 'Floor opens', 'Three songs every generation knows', 'House lights down, uplights up'],
  ['9:15', 'Cake', 'A breather, then straight back', 'Announced once, not shouted'],
  ['10:50', 'Last dance', 'The song you picked, never skipped', 'Send-off cued to the exit'],
];

/* The setlist as an energy curve: one bar per half hour, height by tempo. */
const ENERGY = [
  ['6:00', '84', 'e1', 'dinner'],
  ['6:30', '92', 'e1', 'dinner'],
  ['7:00', '96', 'e2', 'dinner'],
  ['7:30', '72', 'e1', 'first'],
  ['7:45', '104', 'e3', 'floor'],
  ['8:15', '112', 'e3', 'floor'],
  ['8:45', '118', 'e4', 'floor'],
  ['9:15', '100', 'e2', 'floor'],
  ['9:30', '122', 'e4', 'peak'],
  ['10:00', '126', 'e5', 'peak'],
  ['10:15', '128', 'e5', 'peak'],
  ['10:30', '124', 'e4', 'peak'],
  ['10:45', '96', 'e2', 'first'],
  ['11:00', '72', 'e1', 'first'],
];

const PHASES = [
  ['dinner', 'Dinner', 'Under the conversation, 80-96 bpm. Nothing anyone has to talk over.'],
  ['floor', 'The floor opens', 'Songs the grandparents and the cousins both know, rising a few beats at a time.'],
  ['peak', 'The peak', 'The room\'s own requests, read from the floor, not from a list.'],
  ['first', 'Your moments', 'First dance, the slow one at cake, and the last song. Yours, timed to the second.'],
];

type Pack = { name: string; price: string; hours: string; items: string[]; pick: boolean };

const PACKS: Pack[] = [
  { name: 'Party', price: '$1,200', hours: '4 hours', items: ['Birthdays, anniversaries, office nights', 'One DJ, dance floor lighting', 'Wireless mic for speeches', 'A planning call the week before'], pick: false },
  { name: 'Wedding', price: '$1,850', hours: '6 hours', items: ['Ceremony sound and reception', 'MC and the run of show', 'Eight uplights in your colors', 'Two planning meetings', 'First-dance edit'], pick: true },
  { name: 'The full day', price: '$2,450', hours: '8 hours', items: ['Everything in Wedding', 'Second DJ and a second system', 'Cocktail hour on the patio', 'Dance floor wash and haze', 'Late-night hour at $180'], pick: false },
];

const KIT = [
  ['2 x 12 in. powered tops', 'Enough for 250 guests, small enough for a barn loft'],
  ['1 x 18 in. subwoofer', 'Turned down for dinner, up for the floor'],
  ['3 wireless microphones', 'Two handheld for toasts, one lapel for the officiant'],
  ['Mixer and two decks', 'Plus a backup laptop running the same set'],
  ['16 battery uplights', 'No cables across the floor, matched to your colors'],
  ['Spare everything', 'Every cable, mic and power lead has a twin in the van'],
];

const REQUESTS = [
  ['Must-plays', 'Up to fifteen songs you want to hear. We fit them where they work best.'],
  ['Do-not-plays', 'As many as you like. A guest request for one of them is politely declined.'],
  ['Guest requests', 'A line on the RSVP card, or a card at the booth on the night. Played if they fit.'],
  ['Clean versions', 'Radio edits until the children go home, or all night if you ask.'],
];

const FIRST_DANCE = [
  'Most first dances run 2:30. We edit yours to length and send it two weeks ahead.',
  'Fade out, hard stop, or a mash into the first party song: you choose.',
  'We can invite everyone onto the floor at the last chorus.',
  'Taking lessons? We give your teacher the exact edit to rehearse to.',
];

export default function DownbeatDjPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#15121e',
        '--cream': '#f3ece0',
        '--pink': '#ff4f8b',
        '--cyan': '#3fd0e0',
        '--yellow': '#f4d23c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,cream,pink,cyan,yellow"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDot} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Downbeat</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: a record pulled half out of its sleeve. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Wedding and party DJ, Harbor County</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              The night has a <em>shape.</em> We play to it.
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Downbeat is two DJs, a van of spare everything, and a run of show we
              write with you. Ceremony sound, an MC who says every name right, and
              a floor that fills at the first song and stays for the last.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#book">Check your date</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#run">See a run of show</a>
            </div>
          </div>

          <div className={s.deck}>
            <div className={s.sleeve}>
              <p data-edit="intro.sleeveSide" data-edit-max="240" data-edit-multiline className={s.sleeveSide}>Side A</p>
              <p data-edit="intro.sleeveText" data-edit-max="240" data-edit-multiline className={s.sleeveText}>Ceremony, cocktails, dinner</p>
              <p data-edit="intro.sleeveSide2" data-edit-max="240" data-edit-multiline className={s.sleeveSide}>Side B</p>
              <p data-edit="intro.sleeveText2" data-edit-max="240" data-edit-multiline className={s.sleeveText}>First dance to the last song</p>
            </div>
            <div className={s.record}>
              <div data-edit-pattern="intro.field" data-edit-roles="transparent,2,3,4,1,3" className={s.recordField} aria-hidden="true">
                <TabbiedPattern
                  pattern={quaver}
                  palette={RECORD}
                  fit="grid"
                  cellSize={46}
                  seed="downbeat-record"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.grooves} aria-hidden="true" />
              <div className={s.label}>
                <p data-edit="intro.labelName" data-edit-max="240" data-edit-multiline className={s.labelName}>Downbeat</p>
                <p data-edit="intro.labelSide" data-edit-max="240" data-edit-multiline className={s.labelSide}>Side B, 33 rpm</p>
              </div>
            </div>
          </div>
        </section>

        {/* RUN OF SHOW */}
        <section id="run" className={s.sec} aria-labelledby="run-h">
          <div className={s.secHead}>
            <p data-edit="run.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>01 / Run of show</p>
            <h2 data-edit="run.secTitle" data-edit-max="60" id="run-h" className={s.secTitle}>A wedding, cue by cue</h2>
            <p data-edit="run.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The sheet we hand your planner, venue and photographer, built in two
              meetings with you. This one is from a September wedding in a
              converted boathouse.
            </p>
          </div>
          <ol className={s.run}>
            {RUN.map(([time, moment, music, mic], i) => (
              <li key={time} className={s.cue}>
                <span data-edit={`run.cueTime.${i}`} data-edit-max="60" className={s.cueTime}>{time}</span>
                <h3 data-edit={`run.cueMoment.${i}`} data-edit-max="40" className={s.cueMoment}>{moment}</h3>
                <p data-edit={`run.cueMusic.${i}`} data-edit-max="240" data-edit-multiline className={s.cueMusic}>{music}</p>
                <p data-edit={`run.cueMic.${i}`} data-edit-max="240" data-edit-multiline className={s.cueMic}>{mic}</p>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,4,2,1,2" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={quaver}
            palette={BAND}
            fit="grid"
            cellSize={60}
            seed="downbeat-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* SETLIST: the night's energy, bar by bar. */}
        <section id="setlist" className={s.sec} aria-labelledby="setlist-h">
          <div className={s.secHead}>
            <p data-edit="setlist.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>02 / Setlist</p>
            <h2 data-edit="setlist.secTitle" data-edit-max="60" id="setlist-h" className={s.secTitle}>A setlist, not a playlist</h2>
            <p data-edit="setlist.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Tempo across the same night, half hour by half hour. The floor
              fills because it is never asked to jump: it climbs, rests at the
              cake, peaks at ten, and comes home slow.
            </p>
          </div>
          <div className={s.curveWrap}>
            <ol className={s.curve}>
              {ENERGY.map(([time, bpm, level, phase], i) => (
                <li key={time} className={`${s.beat} ${s[level]} ${s[phase]}`}>
                  <span className={s.meter}>
                    <span data-edit={`setlist.bpm.${i}`} data-edit-max="60" className={s.bpm}>{bpm}</span>
                  </span>
                  <span data-edit={`setlist.beatTime.${i}`} data-edit-max="60" className={s.beatTime}>{time}</span>
                </li>
              ))}
            </ol>
          </div>
          <p data-edit="setlist.curveNote" data-edit-max="240" data-edit-multiline className={s.curveNote}>Beats per minute, by the clock.</p>
          <ul className={s.phases}>
            {PHASES.map(([key, name, text], i) => (
              <li key={key} className={`${s.phase} ${s[key]}`}>
                <h3 data-edit={`setlist.phaseName.${i}`} data-edit-max="40" className={s.phaseName}>{name}</h3>
                <p data-edit={`setlist.phaseText.${i}`} data-edit-max="240" data-edit-multiline className={s.phaseText}>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* PACKAGES */}
        <section id="packages" className={s.sec} aria-labelledby="packages-h">
          <div className={s.secHead}>
            <p data-edit="packages.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>03 / Packages</p>
            <h2 data-edit="packages.secTitle" data-edit-max="60" id="packages-h" className={s.secTitle}>Three ways to book us</h2>
            <p data-edit="packages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A 25 percent deposit holds the date; the rest is due a week before.
              Travel inside Harbor County is free, beyond it $1 a mile.
            </p>
          </div>
          <ul className={s.packs}>
            {PACKS.map((p, i) => (
              <li key={p.name} className={p.pick ? `${s.pack} ${s.pick}` : s.pack}>
                <h3 data-edit={`packages.packName.${i}`} data-edit-max="40" className={s.packName}>{p.name}</h3>
                <p data-edit={`packages.packPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{p.price}</p>
                <p data-edit={`packages.packHours.${i}`} data-edit-max="240" data-edit-multiline className={s.packHours}>{p.hours}</p>
                <ul className={s.packItems}>
                  {p.items.map((item, i2) => (
                    <li data-edit={`packages.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* EQUIPMENT: the rack, one unit per line. */}
        <section id="kit" className={s.sec} aria-labelledby="kit-h">
          <div className={s.kit}>
            <div>
              <p data-edit="kit.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>04 / Equipment</p>
              <h2 data-edit="kit.secTitle" data-edit-max="60" id="kit-h" className={s.secTitle}>What comes in the van</h2>
              <p data-edit="kit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Set up in ninety minutes, before the first guest arrives, and
                packed away after the last. We carry our own insurance and a
                venue-approved electrical test certificate.
              </p>
            </div>
            <ul className={s.rack}>
              {KIT.map(([item, note], i) => (
                <li key={item} className={s.unit}>
                  <span data-edit={`kit.unitName.${i}`} data-edit-max="60" className={s.unitName}>{item}</span>
                  <span data-edit={`kit.unitNote.${i}`} data-edit-max="60" className={s.unitNote}>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* REQUESTS AND THE FIRST DANCE */}
        <section id="requests" className={s.sec} aria-labelledby="requests-h">
          <div className={s.secHead}>
            <p data-edit="requests.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>05 / Requests</p>
            <h2 data-edit="requests.secTitle" data-edit-max="60" id="requests-h" className={s.secTitle}>Requests and the first dance</h2>
            <p data-edit="requests.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Your lists arrive through a shared planning page, open until the
              Monday before the wedding.
            </p>
          </div>
          <div className={s.reqGrid}>
            <ol className={s.requests}>
              {REQUESTS.map(([title, text], i) => (
                <li key={title} className={s.request}>
                  <h3 data-edit={`requests.requestTitle.${i}`} data-edit-max="40" className={s.requestTitle}>{title}</h3>
                  <p data-edit={`requests.requestText.${i}`} data-edit-max="240" data-edit-multiline className={s.requestText}>{text}</p>
                </li>
              ))}
            </ol>
            <div className={s.firstDance}>
              <div data-edit-pattern="requests.field" data-edit-roles="transparent,4,2,3,1,4" className={s.firstField} aria-hidden="true">
                <TabbiedPattern
                  pattern={quaver}
                  palette={SOFT}
                  fit="grid"
                  cellSize={40}
                  seed="downbeat-first"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.firstCard}>
                <h3 data-edit="requests.firstTitle" data-edit-max="40" className={s.firstTitle}>Planning the first dance</h3>
                <ul className={s.firstList}>
                  {FIRST_DANCE.map((line, i) => (
                    <li data-edit={`requests.item.${i}`} data-edit-max="80" key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.book}>
            <div>
              <p data-edit="book.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>06 / Check a date</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Is your date free?</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Saturdays from May to October go a year ahead. Tell us the date
                and the venue and we answer within a day, with a quote.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>Unit 9, 44 Kettle Row, Harbor City</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550196633">(555) 019-6633</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:book@downbeat.example">book@downbeat.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Office</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Tuesday to Friday, 11:00-6:00. Weekends we are playing.</dd>
                </div>
              </dl>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="db-date">Date</label>
                <input id="db-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="db-kind">Event</label>
                <select id="db-kind" name="kind" defaultValue="wedding">
                  <option value="wedding">Wedding</option>
                  <option value="party">Party</option>
                  <option value="corporate">Office or club night</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label3" htmlFor="db-venue">Venue</label>
                <input id="db-venue" name="venue" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="db-guests">Guests</label>
                <input id="db-guests" name="guests" type="number" min="1" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="db-name">Your name</label>
                <input id="db-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label6" htmlFor="db-email">Email</label>
                <input id="db-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label7" htmlFor="db-songs">Three songs that have to happen</label>
                <textarea id="db-songs" name="songs" rows={3} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Check the date</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,2,1,2" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={quaver}
            palette={BAND}
            fit="grid"
            cellSize={36}
            seed="downbeat-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Downbeat</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional wedding and party DJ. The people, venues, prices and
            address are invented.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
