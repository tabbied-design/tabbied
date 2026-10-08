import { TabbiedPattern } from 'tabbied/react';
import { grain } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './reel-story-films.module.css';

export const metadata = {
  title: 'Reel Story Films: Wedding and event films, priced by the minute',
  description:
    'Reel Story Films makes wedding and event films priced by the minutes of finished film: a 4-minute highlight, a 12-minute short and a 40-minute feature. The shot list, the turnaround and what to expect on the day.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The grain is
   the film itself: silver specks breathing on the dark, with the odd red
   frame like a tally light. It fills the viewfinder in the hero, runs as a
   reel between the films and the shot list, is the picture in each frame
   of the turnaround strip, and the footer's last reel. */
const NIGHT = '#141312';
const SILVER = '#ece6da';
const RED = '#d8452f';
const BRASS = '#c7a25a';

const FILM = ['transparent', SILVER, RED];
const WARM = ['transparent', BRASS, RED];

const NAV = [
  ['Films', '#films'],
  ['Shot list', '#shots'],
  ['Turnaround', '#turnaround'],
  ['On the day', '#day'],
  ['Book', '#book'],
];

type Pkg = { key: string; name: string; minutes: string; price: string; cover: string; crew: string; weeks: string; note: string };

const PACKAGES: Pkg[] = [
  { key: 'vow', name: 'The vow', minutes: '2', price: '$1,200', cover: '2 hours', crew: 'One filmmaker', weeks: '4 weeks', note: 'For the courthouse, the elopement, the twelve guests in a garden.' },
  { key: 'highlight', name: 'The highlight', minutes: '4', price: '$2,400', cover: '6 hours', crew: 'One filmmaker', weeks: '6 weeks', note: 'The day in one song, from the buttons to the last dance.' },
  { key: 'short', name: 'The short film', minutes: '12', price: '$3,900', cover: '9 hours', crew: 'Two filmmakers', weeks: '8 weeks', note: 'Our most booked. Your vows and the best of the speeches cut into the story.' },
  { key: 'feature', name: 'The feature', minutes: '40', price: '$5,600', cover: 'Getting ready to first dance', crew: 'Two filmmakers', weeks: '10 weeks', note: 'The whole story, plus the ceremony and every speech uncut, as separate files.' },
];

const ADDONS = [
  ['Same-day edit, shown at the reception', '$900'],
  ['Three minutes on Super 8 film', '$650'],
  ['Every raw clip, on a drive', '$300'],
  ['An extra hour of coverage', '$280'],
];

const SHOTS = [
  ['01', '09:30', 'INT. GETTING READY', 'Light through the window, the dress on its hanger, the letter you wrote.'],
  ['02', '11:00', 'INT. GETTING READY', 'Last look in the mirror. Whoever cries first.'],
  ['03', '13:15', 'EXT. VENUE', 'Wide shot of the place, guests arriving, the empty aisle.'],
  ['04', '14:00', 'INT. CEREMONY', 'Two cameras, locked off: one on you, one on the face watching you walk in.'],
  ['05', '14:20', 'INT. CEREMONY', 'Vows on the officiant\'s mic, with a backup recorder in a pocket.'],
  ['06', '15:00', 'EXT. PORTRAITS', 'Twenty minutes, the two of you. Direction only if you ask for it.'],
  ['07', '17:30', 'INT. DINNER', 'Speeches start to finish, and the room\'s reactions to them.'],
  ['08', '19:00', 'INT. DANCE FLOOR', 'First dance from three angles, then the floor filling up.'],
  ['09', '21:00', 'EXT. NIGHT', 'Sparklers, the getaway car, or five quiet minutes outside.'],
  ['10', 'Any', 'YOUR SHOTS', 'Grandma\'s ring, the dog, the bar your parents met in. Add them here.'],
];

const SLATE = [
  ['Production', 'Your wedding'],
  ['Roll', '001'],
  ['Scene', '4. The aisle'],
  ['Take', '1, only ever 1'],
  ['Director', 'Ines Calder'],
  ['Date', 'Yours'],
];

const FRAMES = [
  ['Next morning', 'A 60-second teaser, sent to your phone before brunch.'],
  ['Week 3', 'We choose the music with you and send a first cut to watch.'],
  ['Week 6', 'The highlight film, color graded and the sound mixed.'],
  ['Week 10', 'The full film, the ceremony and the speeches, online and on a drive.'],
];

const CALL_SHEET = [
  ['Crew', 'Ines Calder, director. Theo Marsh, second camera.'],
  ['We arrive', 'Thirty minutes before your getting-ready start time.'],
  ['We wear', 'Black, and shoes that make no noise on a wooden floor.'],
  ['Lights', 'None during the ceremony. One small lamp for the speeches, if the room is dark.'],
  ['Sound', 'A tiny mic on the officiant, and a recorder on the speech mic.'],
  ['We need', 'Two seats and two plates at dinner, out of sight of the top table.'],
];

const FAQ = [
  ['Will you get in the way?', 'No. We use small cameras and long lenses, and stand where your guests are not. Most couples say they forgot we were there.'],
  ['What if it rains?', 'Rain looks good on film. We carry clear umbrellas for portraits and plan an indoor shot list with you the week before.'],
  ['Can we choose the music?', 'Yes. We send three licensed tracks that suit your film, and you can swap any of them for another from our library.'],
  ['Do you film other events?', 'Anniversaries, milestone birthdays and small company evenings. Same pricing, by the minute of finished film.'],
];

const HOURS = [
  ['Studio', 'Tuesday to Friday, 10:00-6:00'],
  ['Calls and viewings', 'By appointment, evenings too'],
  ['Booking ahead', 'Usually 9 to 14 months'],
];

export default function ReelStoryFilmsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#141312',
        '--silver': '#ece6da',
        '--red': '#d8452f',
        '--brass': '#c7a25a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,silver,red,brass"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800&family=Instrument+Sans:wght@400;500;600&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDot} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Reel Story</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Films</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Check your date</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The viewfinder: grain filling the frame, with the camera's own
            readouts set over it on solid chips. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Wedding and event films, since 2014</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Your wedding, <span>cut like a film.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Two quiet filmmakers, no lights in your face, and a film you
              will want to watch again. Priced by the minutes of finished film
              you get back, not by the hours we stand in the room.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Check your date</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#films">See the films and prices</a>
            </div>
          </div>
          <div className={s.finder}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2" className={s.finderField} aria-hidden="true">
              <TabbiedPattern
                pattern={grain}
                palette={FILM}
                fit="grid"
                cellSize={30}
                seed="reel-finder"
                redrawInterval={5200}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.brackets} aria-hidden="true" />
            <p data-edit="hero.readout" data-edit-max="240" data-edit-multiline className={`${s.readout} ${s.rec}`}>Rec</p>
            <p data-edit="hero.readout2" data-edit-max="240" data-edit-multiline className={`${s.readout} ${s.tc}`}>00:14:32:07</p>
            <p data-edit="hero.readout3" data-edit-max="240" data-edit-multiline className={`${s.readout} ${s.lens}`}>A cam, 35mm, f/2</p>
            <p data-edit="hero.readout4" data-edit-max="240" data-edit-multiline className={`${s.readout} ${s.iso}`}>ISO 800</p>
          </div>
        </section>

        <div className={s.clapper} aria-hidden="true" />

        {/* ----------------------------------------------------------- FILMS
            Each film drawn to length on a 45-minute ruler. */}
        <section id="films" className={s.sec} aria-labelledby="films-h">
          <div className={s.secHead}>
            <p data-edit="films.label" data-edit-max="240" data-edit-multiline className={s.label}>Scene 1. The films</p>
            <h2 data-edit="films.secTitle" data-edit-max="60" id="films-h" className={s.secTitle}>Priced by the minute you keep</h2>
            <p data-edit="films.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The length is the finished film. Every package includes
              licensed music, color grading, a private online screening room
              and a download that is yours to keep.
            </p>
          </div>
          <div className={s.ruler} aria-hidden="true">
            <span data-edit="films.text" data-edit-max="60">0</span>
            <span data-edit="films.text2" data-edit-max="60">10</span>
            <span data-edit="films.text3" data-edit-max="60">20</span>
            <span data-edit="films.text4" data-edit-max="60">30</span>
            <span data-edit="films.text5" data-edit-max="60">40 min</span>
          </div>
          <ol className={s.films}>
            {PACKAGES.map((p, i) => (
              <li key={p.key} className={`${s.film} ${s[p.key]}`}>
                <div className={s.filmTrack}>
                  <span className={s.filmBar} />
                </div>
                <div className={s.filmHead}>
                  <h3 data-edit={`films.filmName.${i}`} data-edit-max="40" className={s.filmName}>{p.name}</h3>
                  <p className={s.filmMinutes}>{`${p.minutes} minutes`}</p>
                  <p data-edit={`films.filmPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.filmPrice}>{p.price}</p>
                </div>
                <dl className={s.filmFacts}>
                  <div>
                    <dt data-edit={`films.term.${i}`} data-edit-max="28">Coverage</dt>
                    <dd data-edit={`films.body.${i}`} data-edit-max="200" data-edit-multiline>{p.cover}</dd>
                  </div>
                  <div>
                    <dt data-edit={`films.term2.${i}`} data-edit-max="28">Crew</dt>
                    <dd data-edit={`films.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.crew}</dd>
                  </div>
                  <div>
                    <dt data-edit={`films.term3.${i}`} data-edit-max="28">Delivered in</dt>
                    <dd data-edit={`films.body3.${i}`} data-edit-max="200" data-edit-multiline>{p.weeks}</dd>
                  </div>
                </dl>
                <p data-edit={`films.filmNote.${i}`} data-edit-max="240" data-edit-multiline className={s.filmNote}>{p.note}</p>
              </li>
            ))}
          </ol>
          <div className={s.addons}>
            <h3 data-edit="films.addonsTitle" data-edit-max="40" className={s.addonsTitle}>Add to any film</h3>
            <ul className={s.addonList}>
              {ADDONS.map(([item, price], i) => (
                <li key={item}>
                  <span data-edit={`films.text6.${i}`} data-edit-max="60">{item}</span>
                  <span data-edit={`films.addonPrice.${i}`} data-edit-max="60" className={s.addonPrice}>{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2" className={s.reel} aria-hidden="true">
          <TabbiedPattern
            pattern={grain}
            palette={WARM}
            fit="grid"
            cellSize={26}
            seed="reel-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- SHOT LIST
            A page from the script: the shots we plan, by time of day. */}
        <section id="shots" className={s.sec} aria-labelledby="shots-h">
          <div className={s.shotsGrid}>
            <div className={s.shotsIntro}>
              <p data-edit="shots.label" data-edit-max="240" data-edit-multiline className={s.label}>Scene 2. The shot list</p>
              <h2 data-edit="shots.secTitle" data-edit-max="60" id="shots-h" className={s.secTitle}>Planned like a shoot, filmed like a guest</h2>
              <p data-edit="shots.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Three weeks before, we sit down with your timeline and write
                this list together. On the day it lives in our pockets, and
                you never have to think about it.
              </p>
              <div className={s.slate}>
                <div className={s.slateSticks} aria-hidden="true" />
                <dl className={s.slateBody}>
                  {SLATE.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`shots.term.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`shots.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className={s.script}>
              <p data-edit="shots.scriptHead" data-edit-max="240" data-edit-multiline className={s.scriptHead}>Shot list. Draft 2. Your names here.</p>
              <table className={s.shotTable}>
                <caption data-edit="shots.srOnly" className={s.srOnly}>A sample wedding shot list</caption>
                <thead>
                  <tr>
                    <th data-edit="shots.heading" scope="col">Shot</th>
                    <th data-edit="shots.heading2" scope="col">Time</th>
                    <th data-edit="shots.heading3" scope="col">Scene and what we film</th>
                  </tr>
                </thead>
                <tbody>
                  {SHOTS.map(([no, time, scene, what], i) => (
                    <tr key={no}>
                      <td data-edit={`shots.shotNo.${i}`} className={s.shotNo}>{no}</td>
                      <td data-edit={`shots.shotTime.${i}`} className={s.shotTime}>{time}</td>
                      <td>
                        <strong data-edit={`shots.shotScene.${i}`} className={s.shotScene}>{scene}</strong>
                        <span data-edit={`shots.shotWhat.${i}`} data-edit-max="60" className={s.shotWhat}>{what}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ TURNAROUND
            A strip of film, one frame per delivery. */}
        <section id="turnaround" className={s.sec} aria-labelledby="turnaround-h">
          <div className={s.secHead}>
            <p data-edit="turnaround.label" data-edit-max="240" data-edit-multiline className={s.label}>Scene 3. Turnaround</p>
            <h2 data-edit="turnaround.secTitle" data-edit-max="60" id="turnaround-h" className={s.secTitle}>From the morning after to week ten</h2>
            <p data-edit="turnaround.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The dates go in your contract. If we are late, the Super 8 reel
              is on us.
            </p>
          </div>
          <ol className={s.strip}>
            {FRAMES.map(([when, what], i) => (
              <li key={when} className={s.frame}>
                <div data-edit-pattern={`turnaround.field.${i}`} data-edit-roles="transparent,1,2" className={s.framePic} aria-hidden="true">
                  <TabbiedPattern
                    pattern={grain}
                    palette={FILM}
                    fit="grid"
                    cellSize={24}
                    seed={`reel-frame-${i}`}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.frameText}>
                  <h3 data-edit={`turnaround.frameWhen.${i}`} data-edit-max="40" className={s.frameWhen}>{when}</h3>
                  <p data-edit={`turnaround.frameWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.frameWhat}>{what}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ ON THE DAY */}
        <section id="day" className={s.day} aria-labelledby="day-h">
          <div className={s.dayInner}>
            <div>
              <p data-edit="day.label" data-edit-max="240" data-edit-multiline className={s.label}>Scene 4. On the day</p>
              <h2 data-edit="day.secTitle" data-edit-max="60" id="day-h" className={s.secTitle}>The call sheet</h2>
              <dl className={s.sheet}>
                {CALL_SHEET.map(([term, detail], i) => (
                  <div key={term}>
                    <dt data-edit={`day.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`day.body.${i}`} data-edit-max="200" data-edit-multiline>{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 data-edit="day.faqTitle" data-edit-max="40" className={s.faqTitle}>What couples ask</h3>
              <div className={s.faq}>
                {FAQ.map(([q, a], i) => (
                  <details key={q} className={s.faqItem}>
                    <summary data-edit={`day.question.${i}`} data-edit-max="80">{q}</summary>
                    <p data-edit={`day.body2.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <p data-edit="book.label" data-edit-max="240" data-edit-multiline className={s.label}>Scene 5. Booking</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Check your date</h2>
              <p data-edit="book.bookLead" data-edit-max="240" data-edit-multiline className={s.bookLead}>
                We film one wedding a weekend, and about forty a year. Tell us
                the date and we will reply within a day, with a link to two
                full films to watch.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>7 Projector Lane, Studio 4, Harbourside</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550184470">(555) 018-4470</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:hello@reelstory.example">hello@reelstory.example</a>
                  </dd>
                </div>
                {HOURS.map(([term, detail], i) => (
                  <div key={term}>
                    <dt data-edit={`book.term4.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`book.body2.${i}`} data-edit-max="200" data-edit-multiline>{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="rs-names">Your names</label>
                <input id="rs-names" name="names" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="rs-email">Email</label>
                <input id="rs-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="rs-date">The date</label>
                <input id="rs-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="rs-venue">Venue, or town</label>
                <input id="rs-venue" name="venue" type="text" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="book.legend">Which film</legend>
                <div className={s.picks}>
                  {PACKAGES.map((p, i) => (
                    <span key={p.key} className={s.pick}>
                      <input id={`rs-film-${i}`} type="radio" name="film" value={p.key} />
                      <label data-edit={`book.label6.${i}`} htmlFor={`rs-film-${i}`}>{p.name}</label>
                    </span>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label7" htmlFor="rs-note">Tell us about the day</label>
                <textarea id="rs-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send it to the studio</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2" className={s.footReel} aria-hidden="true">
          <TabbiedPattern
            pattern={grain}
            palette={FILM}
            fit="grid"
            cellSize={24}
            seed="reel-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Reel Story Films</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>
            A fictional film studio: the names, people, prices and address
            are invented.
          </p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
