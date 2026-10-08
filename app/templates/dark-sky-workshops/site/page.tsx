import { TabbiedPattern } from 'tabbied/react';
import { milkyway } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './dark-sky-workshops.module.css';

export const metadata = {
  title: 'Dark Sky Workshops: Astrophotography nights at Kestrel Hollow',
  description:
    'Small-group astrophotography workshops on the darkest nights of each month: a moon-phase calendar, a gear list, what a night out looks like, and prints from the ridge for sale.',
};

/* Site colors, the same hexes as the stylesheet's root rule: the night,
   starlight, the violet haze of the band, a warm star and a cold one. The
   Milky Way is the sky over the ridge in the hero and the three prints
   for sale, and closes the page above the footer. */
const NIGHT = '#0e0d24';
const STAR = '#f3eee2';
const HAZE = '#5b4d9c';
const GOLD = '#f0c26a';
const FROST = '#a3c0f0';

const SKY = ['transparent', HAZE, STAR, GOLD, FROST, STAR];
const COLD_SKY = ['transparent', HAZE, FROST, STAR, FROST, GOLD];
const WARM_SKY = ['transparent', HAZE, GOLD, STAR, GOLD, FROST];

const NAV = [
  ['Calendar', '#calendar'],
  ['A night out', '#night'],
  ['Gear', '#gear'],
  ['Prints', '#prints'],
  ['Book', '#book'],
];

/* The lunar month, two nights a step: we only go out in the dark week. */
const PHASES = [
  ['full', 'Full moon'],
  ['gibbousWane', 'Waning gibbous'],
  ['quarterWane', 'Last quarter'],
  ['crescentWane', 'Waning crescent'],
  ['newMoon', 'New moon'],
  ['crescentWax', 'Waxing crescent'],
  ['quarterWax', 'First quarter'],
  ['gibbousWax', 'Waxing gibbous'],
];

const WORKSHOPS = [
  { dates: 'Fri 9 and Sat 10 Oct', theme: 'The last core of the year', note: 'The galactic center sets by 10 pm; we shoot it low over Lake Wren.', seats: '2 seats left', price: '$185 a night' },
  { dates: 'Fri 13 and Sat 14 Nov', theme: 'Andromeda and the Pleiades', note: 'Tracked deep-sky frames: our mounts, your camera, a long lens.', seats: '5 seats left', price: '$195 a night' },
  { dates: 'Fri 11 and Sat 12 Dec', theme: 'Orion and the winter band', note: 'The faint winter Milky Way, and how to keep batteries alive at -5 C.', seats: '6 seats left', price: '$185 a night' },
  { dates: 'Fri 8 and Sat 9 Jan', theme: 'Cold-night essentials', note: 'For first-timers: focus, exposure and the 500 rule, without frostbite.', seats: '6 seats left', price: '$165 a night' },
  { dates: 'Fri 5 and Sat 6 Feb', theme: 'Zodiacal light', note: 'The faint cone of light after dusk in the west, best in late winter.', seats: '4 seats left', price: '$185 a night' },
  { dates: 'Fri 12 and Sat 13 Mar', theme: 'First core of the season', note: 'A 3 am start for the core rising over Saddle Ridge. Breakfast after.', seats: '6 seats left', price: '$210 a night' },
];

const NIGHT_OUT = [
  ['6:30 pm', 'Meet at the barn', 'Tea, name tags, and a check of every camera: manual mode, raw files, the screen dimmed.'],
  ['7:15 pm', 'Drive to the ridge', 'Fifteen minutes in convoy, no headlights for the last stretch. We park facing away.'],
  ['7:45 pm', 'Blue hour foregrounds', 'Light is still in the sky: the time to frame the pine, the rock and the lake.'],
  ['8:40 pm', 'Astronomical dark', 'Focus on a bright star, first test frames, and the histogram explained in the dark.'],
  ['9:30 pm', 'The main event', 'Tracked frames of the night\'s target, one person at a time on the big mount.'],
  ['11:00 pm', 'Soup and a sit-down', 'Hot soup from the van. Everyone shares their best frame on the tablet.'],
  ['12:00 am', 'Panorama of the arch', 'Twelve frames, overlapped by a third, for the whole band from horizon to horizon.'],
  ['1:30 am', 'Back at the barn', 'Stacking and editing one image together. The bunk room is open for anyone driving far.'],
];

const BRING = [
  'A camera with manual mode and raw files',
  'A wide lens, f/2.8 or faster (14-24 mm is ideal)',
  'A sturdy tripod; we lend a few',
  'Two spare batteries, kept in a pocket',
  'Warm layers, a hat and boots for wet grass',
  'A red headlamp, or we give you one',
];

const PROVIDE = [
  'Star tracker mounts and intervalometers',
  'Lens heaters against dew',
  'Folding chairs, blankets and hot drinks',
  'A dark site with permission to park',
  'A laptop with stacking software',
  'A ride from the barn if you prefer not to drive',
];

const FAQ = [
  ['What if it is cloudy?', 'We decide by 3 pm on the day from the forecast. If we cancel, you move to any other night or get your money back.'],
  ['Do I need an expensive camera?', 'No. Any camera that shoots raw in manual mode will do, and a phone with a night mode can come along too.'],
  ['How cold does it get?', 'The ridge is 400 m up. Expect 10 degrees colder than town, and dress for standing still.'],
  ['Can I come on my own?', 'Most people do. Six people a night, two guides, and the soup is shared.'],
];

export default function DarkSkyWorkshopsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#0e0d24',
        '--star': '#f3eee2',
        '--haze': '#5b4d9c',
        '--gold': '#f0c26a',
        '--frost': '#a3c0f0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,star,haze,gold,frost"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMoon} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Dark Sky Workshops</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Book a night</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,1,3,4,1" className={s.sky} aria-hidden="true">
            <TabbiedPattern
              pattern={milkyway}
              palette={SKY}
              fit="grid"
              cellSize={64}
              seed="darksky-hero"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.ridge} aria-hidden="true" />
          <div className={s.heroBody}>
            <div className={s.heroText}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Astrophotography workshops, Kestrel Hollow</p>
              <h1 data-edit="ticket.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Photograph the night <em>you cannot see from town.</em>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Six people, two guides, one ridge four hundred meters above the
                streetlights. We go out on the darkest nights of each month and
                come back with the Milky Way on your memory card.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#calendar">See the dark nights</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#night">What a night looks like</a>
              </div>
            </div>
            <aside className={s.ticket} aria-label="Next workshop">
              <p data-edit="ticket.ticketLabel" data-edit-max="240" data-edit-multiline className={s.ticketLabel}>Next new moon</p>
              <p data-edit="ticket.ticketDate" data-edit-max="240" data-edit-multiline className={s.ticketDate}>Fri 9 and Sat 10 October</p>
              <p data-edit="ticket.ticketTheme" data-edit-max="240" data-edit-multiline className={s.ticketTheme}>The last core of the year</p>
              <dl className={s.ticketFacts}>
                <div>
                  <dt data-edit="ticket.term" data-edit-max="28">Moon</dt>
                  <dd data-edit="ticket.body" data-edit-max="200" data-edit-multiline>Under 4% lit</dd>
                </div>
                <div>
                  <dt data-edit="ticket.term2" data-edit-max="28">Dark from</dt>
                  <dd data-edit="ticket.body2" data-edit-max="200" data-edit-multiline>8:40 pm</dd>
                </div>
                <div>
                  <dt data-edit="ticket.term3" data-edit-max="28">Seats</dt>
                  <dd data-edit="ticket.body3" data-edit-max="200" data-edit-multiline>2 left</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section id="calendar" className={s.sec} aria-labelledby="calendar-h">
          <div className={s.secHead}>
            <h2 data-edit="calendar.title" data-edit-format="emphasis" data-edit-max="60" id="calendar-h" className={s.secTitle}>
              A calendar <em>set by the moon</em>
            </h2>
            <p data-edit="calendar.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Moonlight washes out the Milky Way, so we only go out in the dark week
              either side of each new moon. Every workshop is two nights; come to
              one or both.
            </p>
          </div>

          <div className={s.lunarWrap}>
            <ol className={s.lunar} aria-label="The lunar month">
              {PHASES.map(([cls, label], i) => (
                <li key={cls} className={s.lunarStep}>
                  <span className={`${s.moon} ${s[cls]}`} aria-hidden="true" />
                  <span data-edit={`calendar.lunarLabel.${i}`} data-edit-max="60" className={s.lunarLabel}>{label}</span>
                </li>
              ))}
            </ol>
            <p data-edit="calendar.darkWeek" data-edit-max="240" data-edit-multiline className={s.darkWeek}>The dark week: workshop nights</p>
          </div>

          <ol className={s.workshops}>
            {WORKSHOPS.map((w, i) => (
              <li key={w.dates} className={s.workshop}>
                <span className={`${s.moon} ${s.newMoon} ${s.rowMoon}`} aria-hidden="true" />
                <p data-edit={`calendar.wDates.${i}`} data-edit-max="240" data-edit-multiline className={s.wDates}>{w.dates}</p>
                <div className={s.wBody}>
                  <h3 data-edit={`calendar.wTheme.${i}`} data-edit-max="40" className={s.wTheme}>{w.theme}</h3>
                  <p data-edit={`calendar.wNote.${i}`} data-edit-max="240" data-edit-multiline className={s.wNote}>{w.note}</p>
                </div>
                <p data-edit={`calendar.wSeats.${i}`} data-edit-max="240" data-edit-multiline className={s.wSeats}>{w.seats}</p>
                <p data-edit={`calendar.wPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.wPrice}>{w.price}</p>
              </li>
            ))}
          </ol>
          <p data-edit="calendar.calFoot" data-edit-max="240" data-edit-multiline className={s.calFoot}>
            Both nights with the editing morning after: $420. A private night for
            two, any dark date: $650.
          </p>
        </section>

        <section id="night" className={s.sec} aria-labelledby="night-h">
          <div className={s.nightGrid}>
            <div className={s.nightIntro}>
              <h2 data-edit="night.title" data-edit-format="emphasis" data-edit-max="60" id="night-h" className={s.secTitle}>
                What a night out <em>looks like</em>
              </h2>
              <p data-edit="night.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                An October night on Saddle Ridge, from tea at the barn to the first
                stacked image. Summer nights start later; winter ones end earlier.
              </p>
            </div>
            <ol className={s.timeline}>
              {NIGHT_OUT.map(([time, title, text], i) => (
                <li key={time} className={s.tStep}>
                  <p data-edit={`night.tTime.${i}`} data-edit-max="240" data-edit-multiline className={s.tTime}>{time}</p>
                  <h3 data-edit={`night.tTitle.${i}`} data-edit-max="40" className={s.tTitle}>{title}</h3>
                  <p data-edit={`night.tText.${i}`} data-edit-max="240" data-edit-multiline className={s.tText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="gear" className={s.sec} aria-labelledby="gear-h">
          <div className={s.secHead}>
            <h2 data-edit="gear.title" data-edit-format="emphasis" data-edit-max="60" id="gear-h" className={s.secTitle}>
              The gear <em>list</em>
            </h2>
            <p data-edit="gear.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              You do not need much, and you do not need it new. If you are unsure
              about a lens, send us the model and we will tell you honestly.
            </p>
          </div>
          <div className={s.gear}>
            <div className={s.gearCol}>
              <h3 data-edit="gear.gearHead" data-edit-max="40" className={s.gearHead}>You bring</h3>
              <ul className={s.gearList}>
                {BRING.map((item, i) => (
                  <li data-edit={`gear.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={s.gearCol}>
              <h3 data-edit="gear.gearHead2" data-edit-max="40" className={s.gearHead}>We provide</h3>
              <ul className={s.gearList}>
                {PROVIDE.map((item, i) => (
                  <li data-edit={`gear.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <dl className={s.settings}>
              <div>
                <dt data-edit="gear.term" data-edit-max="28">Starting settings</dt>
                <dd data-edit="gear.body" data-edit-max="200" data-edit-multiline>ISO 3200, f/2.8, 20 seconds</dd>
              </div>
              <div>
                <dt data-edit="gear.term2" data-edit-max="28">Focus</dt>
                <dd data-edit="gear.body2" data-edit-max="200" data-edit-multiline>Manual, on the brightest star, at 10x live view</dd>
              </div>
              <div>
                <dt data-edit="gear.term3" data-edit-max="28">White balance</dt>
                <dd data-edit="gear.body3" data-edit-max="200" data-edit-multiline>3900 K, fixed for every frame</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="prints" className={s.sec} aria-labelledby="prints-h">
          <div className={s.secHead}>
            <h2 data-edit="prints.title" data-edit-format="emphasis" data-edit-max="60" id="prints-h" className={s.secTitle}>
              Prints from <em>the ridge</em>
            </h2>
            <p data-edit="prints.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Archival pigment on cotton rag, signed and numbered in editions of
              fifty. Framed in ash for $90 more. Shipped flat, or collect at a
              workshop.
            </p>
          </div>
          <ul className={s.prints}>
            <li className={s.print}>
              <div className={s.frame}>
                <div data-edit-pattern="prints.field" data-edit-roles="transparent,2,1,3,4,1" className={s.printSky} aria-hidden="true">
                  <TabbiedPattern
                    pattern={milkyway}
                    palette={SKY}
                    fit="grid"
                    cellSize={40}
                    seed="darksky-print-arch"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <h3 data-edit="prints.printTitle" data-edit-max="40" className={s.printTitle}>Arch over Saddle Ridge</h3>
              <p data-edit="prints.printWhere" data-edit-max="240" data-edit-multiline className={s.printWhere}>Twelve-frame panorama, August</p>
              <p data-edit="prints.printSizes" data-edit-max="240" data-edit-multiline className={s.printSizes}>30 x 45 cm $120, 50 x 75 cm $260</p>
            </li>
            <li className={s.print}>
              <div className={s.frame}>
                <div data-edit-pattern="prints.field2" data-edit-roles="transparent,2,3,1,3,4" className={s.printSky} aria-hidden="true">
                  <TabbiedPattern
                    pattern={milkyway}
                    palette={WARM_SKY}
                    fit="grid"
                    cellSize={36}
                    seed="darksky-print-core"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <h3 data-edit="prints.printTitle2" data-edit-max="40" className={s.printTitle}>Core above Lake Wren</h3>
              <p data-edit="prints.printWhere2" data-edit-max="240" data-edit-multiline className={s.printWhere}>Tracked, forty frames, July</p>
              <p data-edit="prints.printSizes2" data-edit-max="240" data-edit-multiline className={s.printSizes}>30 x 45 cm $120, 70 x 100 cm $480</p>
            </li>
            <li className={s.print}>
              <div className={s.frame}>
                <div data-edit-pattern="prints.field3" data-edit-roles="transparent,2,4,1,4,3" className={s.printSky} aria-hidden="true">
                  <TabbiedPattern
                    pattern={milkyway}
                    palette={COLD_SKY}
                    fit="grid"
                    cellSize={44}
                    options={{ frequency: 0.7 }}
                    seed="darksky-print-zodiacal"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <h3 data-edit="prints.printTitle3" data-edit-max="40" className={s.printTitle}>Zodiacal light, February</h3>
              <p data-edit="prints.printWhere3" data-edit-max="240" data-edit-multiline className={s.printWhere}>Single frame, 25 seconds</p>
              <p data-edit="prints.printSizes3" data-edit-max="240" data-edit-multiline className={s.printSizes}>30 x 45 cm $120, 50 x 75 cm $260</p>
            </li>
          </ul>
        </section>

        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <h2 data-edit="book.title" data-edit-format="emphasis" data-edit-max="60" id="book-h" className={s.secTitle}>
                Book a <em>dark night</em>
              </h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Pay a $50 deposit to hold a seat; the rest is due on the night. We
                confirm the go or no-go by 3 pm on the day.
              </p>
              <dl className={s.faq}>
                {FAQ.map(([q, a], i) => (
                  <div key={q} className={s.faqItem}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{q}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{a}</dd>
                  </div>
                ))}
              </dl>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">The barn</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>12 Quarry Lane, Kestrel Hollow</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550184410">(555) 018-4410</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:nights@darkskyworkshops.example">nights@darkskyworkshops.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term5" data-edit-max="28">Office hours</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>Tuesday to Friday, 1:00-6:00 pm</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="ds-name">Name</label>
                <input id="ds-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="ds-email">Email</label>
                <input id="ds-email" name="email" type="email" autoComplete="email" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="book.legend">Which nights</legend>
                <div className={s.picks}>
                  <input id="ds-w1" type="radio" name="workshop" value="oct" />
                  <label data-edit="book.label3" htmlFor="ds-w1">October</label>
                  <input id="ds-w2" type="radio" name="workshop" value="nov" />
                  <label data-edit="book.label4" htmlFor="ds-w2">November</label>
                  <input id="ds-w3" type="radio" name="workshop" value="dec" />
                  <label data-edit="book.label5" htmlFor="ds-w3">December</label>
                  <input id="ds-w4" type="radio" name="workshop" value="jan" />
                  <label data-edit="book.label6" htmlFor="ds-w4">January</label>
                  <input id="ds-w5" type="radio" name="workshop" value="feb" />
                  <label data-edit="book.label7" htmlFor="ds-w5">February</label>
                  <input id="ds-w6" type="radio" name="workshop" value="mar" />
                  <label data-edit="book.label8" htmlFor="ds-w6">March</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label9" htmlFor="ds-camera">Camera and widest lens</label>
                <input id="ds-camera" name="camera" type="text" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="book.legend2">Night sky experience</legend>
                <div className={s.picks}>
                  <input id="ds-x1" type="radio" name="experience" value="none" />
                  <label data-edit="book.label10" htmlFor="ds-x1">Never tried</label>
                  <input id="ds-x2" type="radio" name="experience" value="some" />
                  <label data-edit="book.label11" htmlFor="ds-x2">A few attempts</label>
                  <input id="ds-x3" type="radio" name="experience" value="tracker" />
                  <label data-edit="book.label12" htmlFor="ds-x3">I use a tracker</label>
                </div>
              </fieldset>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Hold my seat</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,1,4,3" className={s.footSky} aria-hidden="true">
          <TabbiedPattern
            pattern={milkyway}
            palette={COLD_SKY}
            fit="grid"
            cellSize={48}
            seed="darksky-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Dark Sky Workshops</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional astrophotography school. The names, people, prices, places
            and prints are invented.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
