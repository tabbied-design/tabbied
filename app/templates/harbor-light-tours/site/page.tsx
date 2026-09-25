import { TabbiedPattern } from 'tabbied/react';
import { sail, tidewashbands } from 'tabbied/patterns';
import s from './harbor-light-tours.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Harbor Light Tours: Boat tours, Gull Harbor',
  description:
    'Harbor Light Tours runs boat trips from Pier 3 in Gull Harbor: the hour-long harbor loop, seal rocks and the sea caves, the lighthouse run and a sunset sail. Departures all day, seats bookable online.',
};

/* Site colors. Both fields sit on `transparent`, the sails on the fog of
   the page and the swell on the pale route. */
const INK = '#14222D';
const SIGNAL = '#D8503C';
const SEA = '#3B6A87';
const GRAY = '#8997A1';
const PALE = '#D3DDE3';

const SAILS = ['transparent', SEA, SIGNAL, PALE, INK];
const SWELL = ['transparent', SEA, GRAY];

const NAV = [
  ['Departures', '#departures'],
  ['What you will see', '#sights'],
  ['Good to know', '#know'],
  ['Charters', '#charters'],
  ['Book', '#book'],
];

type Tour = {
  name: string;
  length: string;
  times: string[];
  days: string;
  price: string;
  status: 'boarding' | 'ontime' | 'few' | 'full';
  statusLabel: string;
};

const TOURS: Tour[] = [
  { name: 'Harbor Loop', length: '60 min', times: ['10:00', '11:30', '13:00', '14:30', '16:00'], days: 'Daily', price: '$28', status: 'boarding', statusLabel: 'Boarding' },
  { name: 'Seal Rocks and Caves', length: '90 min', times: ['12:00', '15:30'], days: 'Daily', price: '$38', status: 'ontime', statusLabel: 'On time' },
  { name: 'Lighthouse Run', length: '2 hr', times: ['10:30', '14:00'], days: 'Daily', price: '$46', status: 'few', statusLabel: '6 seats left' },
  { name: 'Sunset Sail', length: '2 hr', times: ['18:45'], days: 'Daily', price: '$58', status: 'ontime', statusLabel: 'On time' },
  { name: 'Fish Market Breakfast', length: '90 min', times: ['07:30'], days: 'Sat, Sun', price: '$44', status: 'ontime', statusLabel: 'On time' },
  { name: 'Night Lights', length: '60 min', times: ['20:30'], days: 'Fri, Sat', price: '$32', status: 'full', statusLabel: 'Full' },
];

const SIGHTS = [
  { at: '0', name: 'Pier 3 and the fish market', note: 'The boats come in with the night catch as the first loop leaves.' },
  { at: '10', name: 'The customs house', note: 'Past the swing bridge, which the captain will ask to open for us.' },
  { at: '25', name: 'Seal Rocks', note: 'About sixty harbor seals, most of them asleep. Binoculars on board.' },
  { at: '45', name: 'Gull Point lighthouse', note: 'Lit since 1868 and still working. We stop the engine under it.' },
  { at: '60', name: 'The sea caves', note: 'Into the mouth of Hollow Head on a calm day, round it on a rough one.' },
  { at: '90', name: 'The breakwater', note: 'The whole town ahead of you on the way home.' },
];

const FAQS = [
  {
    q: 'What if the weather turns?',
    a: 'The captain decides an hour before each departure. If we cancel, you get a full refund or a seat on another day, your choice. A little rain is not a reason to cancel; bring a jacket.',
  },
  {
    q: 'Is the boat accessible?',
    a: 'The Gannet has a level ramp at Pier 3, space for two wheelchairs on the main deck and an accessible restroom. Tell us when you book and we will board you first.',
  },
  {
    q: 'Can children and dogs come?',
    a: 'Children under 12 are half price and under 3 free, with life jackets in every size. Well-behaved dogs are welcome on the Harbor Loop and the Sunset Sail.',
  },
  {
    q: 'Is there food and drink on board?',
    a: 'A small bar sells coffee, soft drinks, beer and wine, and pastries in the morning. The Fish Market Breakfast includes breakfast.',
  },
  {
    q: 'Where do I park, and when do I arrive?',
    a: 'The Harbor Street garage is two minutes away and gives three hours for $6. Collect your tickets at the kiosk on Pier 3 fifteen minutes before departure.',
  },
];

const CHARTERS = [
  ['Up to 12 guests, two hours', '$480'],
  ['Up to 30 guests, two hours', '$680'],
  ['Each extra hour', '$220'],
  ['Sunset charter', '+$120'],
  ['Catering from the fish market', 'From $18 a guest'],
];

export default function HarborLightToursPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markLight} aria-hidden="true" />
          <span>Harbor Light Tours</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#book">Book seats</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The harbor across the whole width, its sky the section's own
            color, the words in the sky. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroArt} aria-hidden="true">
            <Artwork slug="harbor-light-tours-harbor" alt="" fit="cover" inks={['var(--ink)', 'var(--pale)']} className={s.heroPicture} />
          </div>
          <div className={s.heroText}>
            <p className={s.kicker}>Boat tours from Pier 3, Gull Harbor</p>
            <h1 id="hero-h" className={s.title}>
              See the harbor <em>from the water.</em>
            </h1>
            <div className={s.heroLead}>
              <p className={s.lede}>
                Six trips a day on the Gannet, a forty-seat launch with a warm
                cabin and an open top deck: the harbor loop, the seals, the
                lighthouse, and the sun going down behind the breakwater.
              </p>
              <div className={s.heroActions}>
                <a className={s.btn} href="#departures">Today's departures</a>
                <a className={s.btnGhost} href="#book">Book seats</a>
              </div>
            </div>
          </div>
          <div className={s.nextUp}>
            <span className={s.nextLabel}>Next out</span>
            <strong className={s.nextTime}>11:30</strong>
            <span className={s.nextTour}>Harbor Loop, 14 seats left</span>
          </div>
        </section>

        {/* ------------------------------------------------------ DEPARTURES
            The trips as the board at the end of the pier. */}
        <section id="departures" className={s.departures} aria-labelledby="departures-h">
          <div className={s.boardHead}>
            <div>
              <p className={s.secKick}>Departures</p>
              <h2 id="departures-h">Today from Pier 3</h2>
            </div>
            <p className={s.boardNote}>Adult fares shown. Children under 12 half price, under 3 free. Seats can be booked until ten minutes before sailing.</p>
          </div>
          <div className={s.board}>
            <div className={s.boardRow} data-head="yes" aria-hidden="true">
              <span>Tour</span>
              <span>Length</span>
              <span>Departs</span>
              <span>Adult</span>
              <span>Status</span>
            </div>
            <ul className={s.boardList}>
              {TOURS.map((t) => (
                <li key={t.name} className={s.boardRow}>
                  <strong className={s.tourName}>{t.name}</strong>
                  <span className={s.tourLength}>{t.length}</span>
                  <div className={s.tourTimes}>
                    {t.times.map((tm) => (
                      <time key={tm} className={s.time}>{tm}</time>
                    ))}
                    <small className={s.tourDays}>{t.days}</small>
                  </div>
                  <span className={s.tourPrice}>{t.price}</span>
                  <span className={s.status} data-status={t.status}>{t.statusLabel}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ SAILS */}
        <div className={s.sails} aria-hidden="true">
          <TabbiedPattern
            pattern={sail}
            palette={SAILS}
            fit="grid"
            cellSize={56}
            seed="harbor-sails"
            options={{ frequency: 0.55 }}
            redrawInterval={8500}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- SIGHTS */}
        <section id="sights" className={s.sights} aria-labelledby="sights-h">
          <div className={s.secHead}>
            <p className={s.secKick}>What you will see</p>
            <h2 id="sights-h">The Lighthouse Run, minute by minute</h2>
            <p className={s.secNote}>
              The longest of our trips, and the one that takes in everything.
              The Harbor Loop turns back after the customs house; Seal Rocks
              and Caves skips the lighthouse.
            </p>
          </div>
          <div className={s.route}>
            <div className={s.routeSwell} aria-hidden="true">
              <TabbiedPattern
                pattern={tidewashbands}
                palette={SWELL}
                fit="grid"
                cellSize={48}
                seed="harbor-swell"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <ol className={s.stops}>
              {SIGHTS.map((st) => (
                <li key={st.at} className={s.stop}>
                  <span className={s.stopAt}>{`${st.at} min`}</span>
                  <h3>{st.name}</h3>
                  <p>{st.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ KNOW */}
        <section id="know" className={s.know} aria-labelledby="know-h">
          <div className={s.knowInner}>
            <div className={s.secHead}>
              <p className={s.secKick}>Good to know</p>
              <h2 id="know-h">Before you come aboard</h2>
              <p className={s.secNote}>
                It is always colder on the water than on the pier. The cabin is
                heated, and there are blankets on the top deck.
              </p>
            </div>
            <div className={s.faqs}>
              {FAQS.map((f) => (
                <details key={f.q} className={s.faq}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- CHARTERS */}
        <section id="charters" className={s.charters} aria-labelledby="charters-h">
          <div className={s.charterCard}>
            <div>
              <p className={s.secKick}>Charters</p>
              <h2 id="charters-h">The Gannet, just for you</h2>
              <p className={s.secNote}>
                Birthdays, weddings, a company afternoon, or ashes scattered
                past the lighthouse with care. The captain and a deckhand come
                with the boat.
              </p>
            </div>
            <dl className={s.charterList}>
              {CHARTERS.map(([what, price]) => (
                <div key={what}>
                  <dt>{what}</dt>
                  <dd>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK
            The coast and the lighthouse behind the booking form. */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookArt} aria-hidden="true">
            <Artwork slug="harbor-light-tours-coast" alt="" fit="cover" mode="tint" inks={['var(--sea)', 'var(--pale)']} className={s.bookPicture} />
          </div>
          <div className={s.bookInner}>
            <div className={s.bookPanel}>
              <p className={s.secKick}>Book</p>
              <h2 id="book-h">Save your seats</h2>
              <p className={s.bookLede}>Pay now, or at the kiosk on Pier 3. Free changes up to a day before.</p>
              <form className={s.form} action="#">
                <label className={`${s.field} ${s.wide}`}>
                  <span>Tour</span>
                  <select name="tour" defaultValue="loop">
                    <option value="loop">Harbor Loop, 60 min, $28</option>
                    <option value="seals">Seal Rocks and Caves, 90 min, $38</option>
                    <option value="lighthouse">Lighthouse Run, 2 hr, $46</option>
                    <option value="sunset">Sunset Sail, 2 hr, $58</option>
                    <option value="breakfast">Fish Market Breakfast, 90 min, $44</option>
                    <option value="night">Night Lights, 60 min, $32</option>
                  </select>
                </label>
                <label className={s.field}>
                  <span>Date</span>
                  <input type="date" name="date" required />
                </label>
                <label className={s.field}>
                  <span>Time</span>
                  <input type="time" name="time" defaultValue="11:30" />
                </label>
                <label className={s.field}>
                  <span>Adults</span>
                  <input type="number" name="adults" min="1" max="40" defaultValue="2" />
                </label>
                <label className={s.field}>
                  <span>Children</span>
                  <input type="number" name="children" min="0" max="40" defaultValue="0" />
                </label>
                <label className={`${s.field} ${s.wide}`}>
                  <span>Email for the tickets</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <button className={s.btn} type="submit">Book the seats</button>
              </form>
            </div>
            <div className={s.bookInfo}>
              <h3>Pier 3, Harbor Street</h3>
              <p>The blue kiosk at the end of the pier opens 30 minutes before the first sailing.</p>
              <ul className={s.contact}>
                <li>
                  <a href="tel:+15550148852">(555) 014-8852</a>
                </li>
                <li>
                  <a href="mailto:ahoy@harborlighttours.example">ahoy@harborlighttours.example</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Harbor Light Tours</p>
          <p className={s.footTag}>Boat trips from Pier 3, Gull Harbor, April to November.</p>
          <nav className={s.footNav} aria-label="Footer">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className={s.footFine}>
          <p>A fictional boat tour company. Trips, fares and times are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
