import { TabbiedPattern } from 'tabbied/react';
import { lantern, picket } from 'tabbied/patterns';
import s from './the-rialto-cinema.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'The Rialto: Independent cinema, Palace Row',
  description:
    'The Rialto is a two-screen independent cinema on Palace Row, open since 1931. This week\'s films and times, the two screens, membership, the bar, and hiring a screen.',
};

/* Site colors. The marquee lights and the curtain both sit on
   `transparent`, so they glow straight out of the dark of the house. */
const GOLD = '#D4A64A';
const VELVET = '#C9302C';
const CREAM = '#F2E8DA';
const PLUM = '#1F191C';

const BULBS = ['transparent', GOLD, VELVET, PLUM];
const CURTAIN = ['transparent', VELVET, PLUM];

const NAV = [
  ['This week', '#programme'],
  ['Screens', '#screens'],
  ['Membership', '#membership'],
  ['Bar', '#bar'],
  ['Private hire', '#hire'],
];

type Showing = {
  title: string;
  year: string;
  length: string;
  rating: string;
  screen: string;
  note: string;
  times: { t: string; left: string }[];
};

type Day = {
  day: string;
  date: string;
  films: Showing[];
};

/* `left` is what the stub says under the time: seats left, or sold out. */
const WEEK: Day[] = [
  {
    day: 'Friday',
    date: 'Sep 26',
    films: [
      {
        title: 'The Long Harbor',
        year: '2025',
        length: '118 min',
        rating: 'PG-13',
        screen: 'Screen One, 35mm',
        note: 'A lighthouse keeper and the last ferry of the season. Opening night, with a talk from the editor.',
        times: [
          { t: '4:15', left: '62 left' },
          { t: '7:00', left: 'Sold out' },
          { t: '9:40', left: '140 left' },
        ],
      },
      {
        title: 'Paper Moons',
        year: '1954',
        length: '96 min',
        rating: 'PG',
        screen: 'Screen Two, restored',
        note: 'A traveling magician and his daughter on the back roads. The new restoration, first week.',
        times: [
          { t: '6:10', left: '9 left' },
          { t: '8:45', left: '22 left' },
        ],
      },
    ],
  },
  {
    day: 'Saturday',
    date: 'Sep 27',
    films: [
      {
        title: 'Summer of the Swifts',
        year: '2026',
        length: '99 min',
        rating: 'PG',
        screen: 'Screen One',
        note: 'The family matinee. Kids under twelve for $5, and the lights stay half up.',
        times: [
          { t: '11:00', left: '180 left' },
          { t: '1:30', left: '96 left' },
        ],
      },
      {
        title: 'The Long Harbor',
        year: '2025',
        length: '118 min',
        rating: 'PG-13',
        screen: 'Screen One, 35mm',
        note: 'On film, from the only 35mm print in the state.',
        times: [
          { t: '4:15', left: '31 left' },
          { t: '7:00', left: 'Sold out' },
          { t: '9:40', left: '88 left' },
        ],
      },
      {
        title: 'Double Exposure',
        year: '1947',
        length: '101 min',
        rating: 'NR',
        screen: 'Screen Two',
        note: 'Late noir: a photographer, a negative that should not exist, and a very long night.',
        times: [{ t: '10:30', left: '14 left' }],
      },
    ],
  },
  {
    day: 'Sunday',
    date: 'Sep 28',
    films: [
      {
        title: 'Lanterns',
        year: '1931',
        length: '72 min',
        rating: 'NR',
        screen: 'Screen One, live piano',
        note: 'The silent the Rialto opened with, 95 years ago this week, with the house pianist.',
        times: [{ t: '2:00', left: '44 left' }],
      },
      {
        title: 'A House on Tern Street',
        year: '2025',
        length: '131 min',
        rating: 'R',
        screen: 'Screen Two',
        note: 'Three sisters sell the family house. Funny for an hour, then not.',
        times: [
          { t: '5:20', left: '18 left' },
          { t: '8:15', left: '30 left' },
        ],
      },
    ],
  },
  {
    day: 'Monday',
    date: 'Sep 29',
    films: [
      {
        title: 'Nightjar',
        year: '2026',
        length: '104 min',
        rating: 'R',
        screen: 'Screen One',
        note: 'Cheap Monday: every seat $8. A bird recordist hears something in the marsh.',
        times: [
          { t: '6:30', left: '201 left' },
          { t: '9:00', left: '240 left' },
        ],
      },
    ],
  },
];

const SCREENS = [
  {
    name: 'Screen One',
    nick: 'The Grand',
    seats: '412',
    body: 'The 1931 auditorium, with the balcony, the gilded proscenium and a 40-foot screen behind a curtain that still opens on a hand winch. Two 35mm projectors and a 4K digital one.',
    facts: ['412 seats, 96 in the balcony', '35mm, 70mm and 4K', 'Step-free to the stalls'],
  },
  {
    name: 'Screen Two',
    nick: 'The Snug',
    seats: '48',
    body: 'The old tea room upstairs, fitted with 48 velvet seats in pairs and a little table for each. Drinks are brought to you before the lights go down.',
    facts: ['48 seats in pairs', '4K digital, Dolby sound', 'Lift from the foyer'],
  },
];

const TIERS = [
  {
    name: 'Friend',
    price: '$60',
    per: 'a year',
    perks: ['$2 off every ticket', 'Book a week before everyone else', 'Free popcorn on your birthday'],
  },
  {
    name: 'Regular',
    price: '$150',
    per: 'a year',
    perks: ['12 free tickets a year', '$2 off every other ticket', '10% off at the bar', 'Two guest passes'],
    featured: 'Most members',
  },
  {
    name: 'Patron',
    price: '$400',
    per: 'a year',
    perks: ['Every film, as often as you like', 'Your name on a seat in Screen One', 'The members\' preview nights', 'Keeps the 35mm running'],
  },
];

const BAR = [
  { name: 'Popcorn, salted or sweet', price: '$5 / $7' },
  { name: 'Hot butter, real', price: '+$1' },
  { name: 'Candy from the jars', price: '$3' },
  { name: 'Local beer on tap', price: '$7' },
  { name: 'Red or white wine', price: '$9' },
  { name: 'The Projectionist (rye, vermouth, cherry)', price: '$13' },
  { name: 'Coffee, tea, hot chocolate', price: '$3.50' },
];

const HIRE = [
  ['Screen Two, up to 48', 'From $450 for three hours'],
  ['Screen One, weekday mornings', 'From $1,800'],
  ['Your own film, any format', 'Tested with you the day before'],
  ['Bar and snacks', 'By the head, or on a tab'],
];

export default function TheRialtoCinemaPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&family=Limelight&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">The Rialto</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barBtn} href="#programme">Book seats</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The house before the film: marquee lights drifting in the dark
            and the projector throwing its beam across the words. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.lights} aria-hidden="true">
            <TabbiedPattern
              pattern={lantern}
              palette={BULBS}
              fit="grid"
              cellSize={104}
              seed="marquee"
              options={{ frequency: 0.3 }}
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p className={s.kicker}>Two screens on Palace Row, since 1931</p>
              <h1 id="hero-h" className={s.title}>
                Films worth <em>leaving the house</em> for.
              </h1>
              <p className={s.lede}>
                New films, restored old ones, and the odd silent with the house
                pianist, on a 40-foot screen and in a 48-seat snug upstairs.
                Tickets from $12, and the popcorn is popped in real butter.
              </p>
              <div className={s.actions}>
                <a className={s.btn} href="#programme">This week's films</a>
                <a className={s.btnLine} href="#membership">Become a member</a>
              </div>
            </div>
            <div className={s.heroArt}>
              <div className={s.projWrap}>
                <span className={s.beam} aria-hidden="true" />
                <Artwork
                  slug="the-rialto-cinema-projector"
                  alt="A vintage film projector with two reels"
                  inks={['var(--velvet)', 'var(--gold)']}
                  className={s.projector}
                />
              </div>
              <p className={s.nowShowing}>
                <span>Tonight on 35mm</span>
                <strong>The Long Harbor, 7:00</strong>
              </p>
            </div>
          </div>
        </section>

        {/* The curtain's hem, between the hero and the programme. */}
        <div className={s.curtain} aria-hidden="true">
          <TabbiedPattern
            pattern={picket}
            palette={CURTAIN}
            fit="grid"
            cellSize={36}
            seed="house-curtain"
            options={{ frequency: 0.9 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- PROGRAMME
            The week as a column of tickets, one day at a time. Each ticket
            is the film; the times are stubs you tear off. */}
        <section id="programme" className={s.programme} aria-labelledby="programme-h">
          <div className={s.secHead}>
            <p className={s.secKick}>This week, Friday to Monday</p>
            <h2 id="programme-h">Now showing</h2>
            <p className={s.secNote}>
              Tickets $12, members $10, Cheap Monday $8. Book online, at the box
              office from an hour before the first film, or by phone. Seats in
              Screen One are unreserved; Screen Two is booked by the pair.
            </p>
          </div>

          <ol className={s.days}>
            {WEEK.map((d) => (
              <li key={d.day} className={s.day}>
                <div className={s.dayHead}>
                  <h3 className={s.dayName}>{d.day}</h3>
                  <span className={s.dayDate}>{d.date}</span>
                </div>
                <ul className={s.tickets}>
                  {d.films.map((f) => (
                    <li key={`${d.day}-${f.title}`} className={s.ticket}>
                      <div className={s.ticketMain}>
                        <span className={s.admit}>{f.screen}</span>
                        <h4 className={s.filmTitle}>{f.title}</h4>
                        <p className={s.filmMeta}>
                          <span>{f.year}</span>
                          <span>{f.length}</span>
                          <span>{f.rating}</span>
                        </p>
                        <p className={s.filmNote}>{f.note}</p>
                      </div>
                      <ul className={s.stubs} aria-label="Showtimes">
                        {f.times.map((tm) => (
                          <li key={tm.t} className={s.stub} data-sold={tm.left === 'Sold out' ? 'yes' : 'no'}>
                            <time className={s.stubTime}>{tm.t}</time>
                            <span className={s.stubLeft}>{tm.left}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className={s.weekNote}>
            Tuesday to Thursday goes up on Monday at noon. Members can book from
            the Friday before.
          </p>
        </section>

        {/* --------------------------------------------------------- SCREENS */}
        <section id="screens" className={s.screens} aria-labelledby="screens-h">
          <div className={s.screensArt}>
            <Artwork
              slug="the-rialto-cinema-seats"
              alt="A row of three folding velvet cinema seats"
              inks={['var(--night)', 'var(--velvet)']}
              className={s.seats}
            />
            <p className={s.seatsNote}>Row F, Screen One. Every seat was reupholstered in 2019.</p>
          </div>
          <div className={s.screensBody}>
            <p className={s.secKick}>The two screens</p>
            <h2 id="screens-h">A palace and a snug</h2>
            <div className={s.screenList}>
              {SCREENS.map((sc) => (
                <article key={sc.name} className={s.screen}>
                  <div className={s.screenHead}>
                    <h3>{sc.name}</h3>
                    <span className={s.screenNick}>{sc.nick}</span>
                    <p className={s.screenSeats}>
                      <strong>{sc.seats}</strong>
                      <span>seats</span>
                    </p>
                  </div>
                  <p className={s.screenBody}>{sc.body}</p>
                  <ul className={s.screenFacts}>
                    {sc.facts.map((fa) => (
                      <li key={fa}>{fa}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ MEMBERSHIP */}
        <section id="membership" className={s.membership} aria-labelledby="membership-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Membership</p>
            <h2 id="membership-h">Keep the lights on</h2>
            <p className={s.secNote}>
              The Rialto is run by a nonprofit trust, and members pay for about
              a third of it. Join at the box office or online; it starts the day
              you join.
            </p>
          </div>
          <ul className={s.tiers}>
            {TIERS.map((t) => (
              <li key={t.name} className={s.tier} data-featured={t.featured ? 'yes' : 'no'}>
                <span className={s.tierFlag}>{t.featured}</span>
                <h3 className={s.tierName}>{t.name}</h3>
                <p className={s.tierPrice}>
                  <strong>{t.price}</strong>
                  <span>{t.per}</span>
                </p>
                <ul className={s.tierPerks}>
                  {t.perks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <a className={s.tierBtn} href="mailto:members@rialto.example">{`Join as a ${t.name}`}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- BAR */}
        <section id="bar" className={s.barSec} aria-labelledby="bar-h">
          <div className={s.barInner}>
            <div className={s.barText}>
              <p className={s.secKick}>The bar and snacks</p>
              <h2 id="bar-h">Take your drink in</h2>
              <p className={s.barLede}>
                The bar in the foyer opens an hour before the first film and
                closes after the last. Glasses are welcome in both screens; we
                only ask for quiet ice.
              </p>
              <ul className={s.menu}>
                {BAR.map((b) => (
                  <li key={b.name}>
                    <span className={s.menuName}>{b.name}</span>
                    <span className={s.menuDots} aria-hidden="true" />
                    <strong className={s.menuPrice}>{b.price}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.barArt}>
              <Artwork
                slug="the-rialto-cinema-popcorn"
                alt="A striped paper box of popcorn"
                inks={['var(--velvet)', 'var(--cream)']}
                className={s.popcorn}
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- PRIVATE HIRE */}
        <section id="hire" className={s.hire} aria-labelledby="hire-h">
          <div className={s.hireText}>
            <p className={s.secKick}>Private hire</p>
            <h2 id="hire-h">Your own screening</h2>
            <p className={s.hireLede}>
              Birthdays, premieres, a proposal before the trailers, a company
              showing its film to the people who made it. We have done all of
              them, and a wedding.
            </p>
            <dl className={s.hireList}>
              {HIRE.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <form className={s.form} action="#">
            <h3 className={s.formHead}>Ask about a date</h3>
            <div className={s.formRow}>
              <div className={s.field}>
                <label htmlFor="rialto-name">Name</label>
                <input id="rialto-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="rialto-email">Email</label>
                <input id="rialto-email" name="email" type="email" autoComplete="email" />
              </div>
            </div>
            <div className={s.formRow}>
              <div className={s.field}>
                <label htmlFor="rialto-date">Date</label>
                <input id="rialto-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="rialto-guests">Guests</label>
                <select id="rialto-guests" name="guests" defaultValue="up-to-48">
                  <option value="up-to-48">Up to 48</option>
                  <option value="up-to-150">49 to 150</option>
                  <option value="up-to-412">151 to 412</option>
                </select>
              </div>
            </div>
            <div className={s.field}>
              <label htmlFor="rialto-note">What are you planning?</label>
              <textarea id="rialto-note" name="note" rows={4} />
            </div>
            <button className={s.submit} type="submit">Send the request</button>
            <small className={s.formNote}>We reply within two days with dates and a price.</small>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div>
            <p className={s.footName}>The Rialto</p>
            <p className={s.footTag}>An independent cinema, run by the Rialto Trust since 1987.</p>
          </div>
          <div>
            <h2 className={s.footHead}>Find us</h2>
            <p className={s.footText}>
              14 Palace Row
              <br />
              Two blocks from the station
            </p>
          </div>
          <div>
            <h2 className={s.footHead}>Box office</h2>
            <p className={s.footText}>
              From an hour before the first film
              <br />
              (555) 016-1931
              <br />
              boxoffice@rialto.example
            </p>
          </div>
        </div>
        <div className={s.footFine}>
          <p>A fictional cinema. Films, times and prices are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
