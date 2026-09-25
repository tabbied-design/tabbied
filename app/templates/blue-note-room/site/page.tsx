import { TabbiedPattern } from 'tabbied/react';
import { gyre, spiralrosette } from 'tabbied/patterns';
import s from './blue-note-room.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Blue Note Room: Jazz club, Canal Street',
  description:
    'Blue Note Room is a ninety-seat jazz club downstairs on Canal Street, with live music seven nights a week. The month\'s listings, set times and prices, membership, the room and the bar.',
};

/* Site colors, for the pattern fields. Both fields are drawn on
   `transparent`, over the club's own night. */
const GOLD = '#E3B04B';
const CREAM = '#F1ECE2';
const BLUE = '#5D6BD6';
const GRAY = '#6E7185';
const DEEP = '#1A1F33';

const HALO = ['transparent', GOLD, BLUE, GOLD, CREAM];
const GROOVES = ['transparent', GRAY, BLUE, DEEP];

const NAV = [
  ['Listings', '#listings'],
  ['Membership', '#membership'],
  ['The room', '#room'],
  ['Bar', '#bar'],
  ['Visit', '#visit'],
];

type Gig = {
  day: string;
  wd: string;
  artist: string;
  note: string;
  sets: string;
  price: string;
  status: string;
  tone: 'onSale' | 'fewLeft' | 'soldOut';
};

/* October 2026. The first falls on a Thursday. */
const GIGS: Gig[] = [
  { day: '01', wd: 'Thu', artist: 'Ansel Ward Quartet', note: 'Tenor saxophone, piano, bass and drums. Standards, and a new suite for the river.', sets: '8:00 and 10:30', price: '$25, late set $15', status: 'On sale', tone: 'onSale' },
  { day: '02', wd: 'Fri', artist: 'Marguerite Olu Trio', note: 'A piano trio playing the Ellington songbook, from the bottom of the drawer.', sets: '8:00 and 10:30', price: '$30', status: 'Few left', tone: 'fewLeft' },
  { day: '03', wd: 'Sat', artist: 'Marguerite Olu Trio', note: 'The second night, with a guest on alto for the late set.', sets: '8:00 and 10:30', price: '$30', status: 'Early set sold out', tone: 'soldOut' },
  { day: '04', wd: 'Sun', artist: 'The Sunday Jam', note: 'The house rhythm section, then whoever brought a horn. Sign up at the bar from 6:30.', sets: '7:00 to 11:00', price: '$10, members free', status: 'On sale', tone: 'onSale' },
  { day: '05', wd: 'Mon', artist: 'Canal Street Orchestra', note: 'Seventeen pieces on a stage built for five. Count Basie charts and their own.', sets: '8:00', price: '$20', status: 'On sale', tone: 'onSale' },
  { day: '06', wd: 'Tue', artist: 'Dee Hollis Sings', note: 'Voice, piano and bass, and a whole set of Abbey Lincoln.', sets: '8:00 and 10:00', price: '$25', status: 'On sale', tone: 'onSale' },
  { day: '07', wd: 'Wed', artist: 'New Voices', note: 'Three student groups from the conservatory, twenty minutes each.', sets: '8:00', price: '$12', status: 'On sale', tone: 'onSale' },
  { day: '08', wd: 'Thu', artist: 'Ruben Castell Sextet', note: 'Latin jazz with two percussionists. There will be dancing at the back.', sets: '8:00 and 10:30', price: '$28', status: 'On sale', tone: 'onSale' },
  { day: '09', wd: 'Fri', artist: 'Lina Park and Theo Brand', note: 'A guitar and double bass duo, quiet enough to hear the room breathe.', sets: '8:00 and 10:30', price: '$25', status: 'On sale', tone: 'onSale' },
  { day: '10', wd: 'Sat', artist: 'Ansel Ward with Strings', note: 'The quartet with a string quartet, and arrangements written for this weekend only.', sets: '8:00 and 10:30', price: '$35', status: 'Few left', tone: 'fewLeft' },
];

const TIERS = [
  {
    name: 'Regular',
    price: '$12',
    per: 'a month',
    perks: ['$5 off every ticket', 'The Sunday jam, free', 'Tickets a week before everyone else'],
    featured: false,
  },
  {
    name: 'Night Owl',
    price: '$30',
    per: 'a month',
    perks: ['Two tickets a month, any night', 'Every late set, free', 'Your table held until the downbeat'],
    featured: true,
  },
  {
    name: 'Patron',
    price: '$900',
    per: 'a year',
    perks: ['Four guests a month', 'Your name on a chair', 'Soundcheck, on the nights you ask'],
    featured: false,
  },
];

const ROOM = [
  ['Doors', '7:00, sets at 8:00 and 10:30'],
  ['Seats', 'Ninety, at tables and along the bar'],
  ['Piano', 'A 1962 Steinway B, tuned every Monday'],
  ['Ages', 'All ages for the early set; 21 and over after 10'],
  ['Access', 'A lift from the street, and a step-free restroom'],
  ['Minimum', 'None. Nobody has to drink to stay.'],
];

const DRINKS = [
  { name: 'Blue Train', what: 'Gin, blueberry, lemon, soda', price: '$14' },
  { name: 'Round Midnight', what: 'Rye, amaro, a twist of orange', price: '$15' },
  { name: 'Take Five', what: 'Mezcal, pineapple, lime, a little chili', price: '$14' },
  { name: 'Blue in Green', what: 'Cucumber, mint, tonic. No alcohol', price: '$8' },
  { name: 'Draft lager or IPA', what: 'From the brewery two doors down', price: '$7' },
  { name: 'Wine by the glass', what: 'A red, a white and something sparkling', price: '$11' },
];

const PLATES = [
  ['Fries with garlic mayonnaise', '$8'],
  ['Warm olives and almonds', '$7'],
  ['Grilled cheese with pickles', '$12'],
  ['Chocolate pot, sea salt', '$9'],
];

export default function BlueNoteRoomPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#0f1220',
        '--cream': '#f1ece2',
        '--gold': '#e3b04b',
        '--blue': '#5d6bd6',
        '--gray': '#6e7185',
        '--deep': '#1a1f33',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,cream,gold,blue,gray,deep"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:ital,wght@0,600..900;1,800&family=Sofia+Sans:wght@400..700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Blue Note Room</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.tickets" data-edit-max="28" className={s.tickets} href="#visit">Reserve</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ---------------------------------------------------------- POSTER
            A gig poster pasted on the night: gold paper for the words, a
            dark panel where the saxophonist comes out of the shadow in two
            inks, and a halo of dashes turning around his head. */}
        <section className={s.poster} aria-labelledby="poster-h">
          <div className={s.sheet}>
            <div className={s.posterType}>
              <p data-edit="poster.presents" data-edit-max="240" data-edit-multiline className={s.presents}>Downstairs at 212 Canal Street</p>
              <h1 data-edit="poster.title" data-edit-format="emphasis" data-edit-max="70" id="poster-h" className={s.title}>
                Live jazz, <em>seven nights</em> a week
              </h1>
              <div className={s.tonight}>
                <p data-edit="poster.tonightLabel" data-edit-max="240" data-edit-multiline className={s.tonightLabel}>Tonight</p>
                <p data-edit="poster.tonightAct" data-edit-max="240" data-edit-multiline className={s.tonightAct}>Ansel Ward Quartet</p>
                <p data-edit="poster.tonightSets" data-edit-max="240" data-edit-multiline className={s.tonightSets}>Sets at 8:00 and 10:30. Doors 7:00. $25</p>
              </div>
              <a data-edit="poster.posterLink" data-edit-max="28" className={s.posterLink} href="#listings">October listings</a>
            </div>
            <div className={s.posterArt}>
              <div data-edit-pattern="poster.field" data-edit-roles="transparent,2,3,2,1" className={s.halo} aria-hidden="true">
                <TabbiedPattern
                  pattern={gyre}
                  palette={HALO}
                  options={{ frequency: 0.85 }}
                  fit="grid"
                  cellSize={40}
                  seed="bnr-halo"
                  redrawInterval={8000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="blue-note-room-sax"
                alt="A saxophonist playing with his eyes closed"
                inks={['var(--night)', 'var(--gold)']}
                className={s.sax}
              />
            </div>
            <p className={s.posterFoot}>
              <span data-edit="poster.text" data-edit-max="60">The Blue Note Room</span>
              <span data-edit="poster.text2" data-edit-max="60">October 2026</span>
              <span data-edit="poster.text3" data-edit-max="60">No talking during the music</span>
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- LISTINGS */}
        <section id="listings" className={s.listings} aria-labelledby="listings-h">
          <div className={s.listHead}>
            <p data-edit="listings.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>This month</p>
            <h2 data-edit="listings.secTitle" data-edit-max="60" id="listings-h" className={s.secTitle}>October at the Room</h2>
            <p data-edit="listings.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Tickets are for a seat, not a table. Book the early set for dinner
              and the late one for the music; both are the full show.
            </p>
          </div>
          <div className={s.listGrid}>
            <ol className={s.gigs}>
              {GIGS.map((g, i) => (
                <li key={`${g.day}-${g.artist}`} className={s.gig}>
                  <p className={s.date}>
                    <span data-edit={`listings.dateDay.${i}`} data-edit-max="60" className={s.dateDay}>{g.day}</span>
                    <span data-edit={`listings.dateWd.${i}`} data-edit-max="60" className={s.dateWd}>{g.wd}</span>
                  </p>
                  <div className={s.gigMain}>
                    <h3 data-edit={`listings.artist.${i}`} data-edit-max="40" className={s.artist}>{g.artist}</h3>
                    <p data-edit={`listings.gigNote.${i}`} data-edit-max="240" data-edit-multiline className={s.gigNote}>{g.note}</p>
                  </div>
                  <dl className={s.gigFacts}>
                    <div>
                      <dt data-edit={`listings.term.${i}`} data-edit-max="28">Sets</dt>
                      <dd data-edit={`listings.body.${i}`} data-edit-max="200" data-edit-multiline>{g.sets}</dd>
                    </div>
                    <div>
                      <dt data-edit={`listings.term2.${i}`} data-edit-max="28">Tickets</dt>
                      <dd data-edit={`listings.body2.${i}`} data-edit-max="200" data-edit-multiline>{g.price}</dd>
                    </div>
                  </dl>
                  <div className={s.gigAct}>
                    <p data-edit={`listings.status.${i}`} data-edit-max="240" data-edit-multiline className={`${s.status} ${s[g.tone]}`}>{g.status}</p>
                    <a data-edit={`listings.book.${i}`} data-edit-max="28" className={s.book} href="#visit">Book</a>
                  </div>
                </li>
              ))}
            </ol>
            <aside className={s.listAside} aria-labelledby="aside-h">
              <div className={s.bassPanel}>
                <Artwork
                  slug="blue-note-room-bass"
                  alt="An upright double bass"
                  inks={['var(--night)', 'var(--cream)']}
                  className={s.bass}
                />
              </div>
              <h3 data-edit="aside.asideTitle" data-edit-max="40" id="aside-h" className={s.asideTitle}>Every week</h3>
              <ul className={s.weekly}>
                <li>
                  <span data-edit="aside.weeklyDay" data-edit-max="60" className={s.weeklyDay}>Monday</span>
                  <span data-edit="aside.text" data-edit-max="60">Big band, 17 pieces</span>
                </li>
                <li>
                  <span data-edit="aside.weeklyDay2" data-edit-max="60" className={s.weeklyDay}>Wednesday</span>
                  <span data-edit="aside.text2" data-edit-max="60">New voices from the conservatory</span>
                </li>
                <li>
                  <span data-edit="aside.weeklyDay3" data-edit-max="60" className={s.weeklyDay}>Sunday</span>
                  <span data-edit="aside.text3" data-edit-max="60">The jam, bring your horn</span>
                </li>
              </ul>
              <p data-edit="aside.asideNote" data-edit-max="240" data-edit-multiline className={s.asideNote}>The rest of October goes on sale on the 11th.</p>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------ MEMBERSHIP */}
        <section id="membership" className={s.sec} aria-labelledby="membership-h">
          <div className={s.secHead}>
            <p data-edit="membership.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Membership</p>
            <h2 data-edit="membership.secTitle" data-edit-max="60" id="membership-h" className={s.secTitle}>Come more often, pay less</h2>
            <p data-edit="membership.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Members keep the lights on and the piano tuned. Cancel whenever you
              like, from the bar or by email.
            </p>
          </div>
          <ul className={s.tiers}>
            {TIERS.map((t, i) => (
              <li key={t.name} className={t.featured ? `${s.tier} ${s.tierFeatured}` : s.tier}>
                <h3 data-edit={`membership.tierName.${i}`} data-edit-max="40" className={s.tierName}>{t.name}</h3>
                <p className={s.tierPrice}>
                  <span data-edit={`membership.tierAmount.${i}`} data-edit-max="60" className={s.tierAmount}>{t.price}</span>
                  <span data-edit={`membership.tierPer.${i}`} data-edit-max="60" className={s.tierPer}>{t.per}</span>
                </p>
                <ul className={s.perks}>
                  {t.perks.map((p, i2) => (
                    <li data-edit={`membership.item.${i}.${i2}`} data-edit-max="80" key={p}>{p}</li>
                  ))}
                </ul>
                <a data-edit={`membership.join.${i}`} data-edit-max="28" className={s.join} href="#visit">Join at the bar or by email</a>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ ROOM */}
        <section id="room" className={s.room} aria-labelledby="room-h">
          <div className={s.roomInner}>
            <div className={s.spot}>
              <Artwork
                slug="blue-note-room-mic"
                alt="A vintage chrome microphone on a stand"
                inks={['var(--night)', 'var(--cream)']}
                className={s.mic}
              />
            </div>
            <div className={s.roomText}>
              <p data-edit="room.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The room</p>
              <h2 data-edit="room.secTitle" data-edit-max="60" id="room-h" className={s.secTitle}>Ninety seats, a low ceiling, and one rule</h2>
              <p data-edit="room.body" data-edit-max="240" data-edit-multiline className={s.body}>
                The rule is quiet while the band plays. Talk between songs, order
                between songs, and the musicians will play to you as if the room
                were full of friends, which by the second set it usually is.
              </p>
              <dl className={s.facts}>
                {ROOM.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`room.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`room.body2.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- BAR */}
        <section id="bar" className={s.sec} aria-labelledby="bar-h">
          <div className={s.barGrid}>
            <div className={s.record} aria-hidden="true">
              <div data-edit-pattern="bar.field" data-edit-roles="transparent,4,3,5" className={s.grooves} aria-hidden="true">
                <TabbiedPattern
                  pattern={spiralrosette}
                  palette={GROOVES}
                  fit="grid"
                  cellSize={24}
                  seed="bnr-record"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span data-edit="bar.label" data-edit-max="60" className={s.label}>BNR</span>
            </div>
            <div className={s.menu}>
              <p data-edit="bar.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The bar</p>
              <h2 data-edit="bar.secTitle" data-edit-max="60" id="bar-h" className={s.secTitle}>Drinks named after the records</h2>
              <ul className={s.drinks}>
                {DRINKS.map((d, i) => (
                  <li key={d.name}>
                    <span data-edit={`bar.drinkName.${i}`} data-edit-max="60" className={s.drinkName}>{d.name}</span>
                    <span data-edit={`bar.drinkPrice.${i}`} data-edit-max="60" className={s.drinkPrice}>{d.price}</span>
                    <span data-edit={`bar.drinkWhat.${i}`} data-edit-max="60" className={s.drinkWhat}>{d.what}</span>
                  </li>
                ))}
              </ul>
              <h3 data-edit="bar.platesHead" data-edit-max="40" className={s.platesHead}>Something to eat, until 11</h3>
              <ul className={s.plates}>
                {PLATES.map(([n, p], i) => (
                  <li key={n}>
                    <span data-edit={`bar.text.${i}`} data-edit-max="60">{n}</span>
                    <span data-edit={`bar.drinkPrice2.${i}`} data-edit-max="60" className={s.drinkPrice}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitText}>
            <p data-edit="visit.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Visit and reserve</p>
            <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>212 Canal Street, downstairs</h2>
            <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.body}>
              Look for the blue door beside the tailor. The box office opens at
              5:00 every night, and unsold seats go at the door from 7:00.
            </p>
            <dl className={s.contact}>
              <div>
                <dt data-edit="visit.term" data-edit-max="28">Box office</dt>
                <dd data-edit="visit.body2" data-edit-max="200" data-edit-multiline>(555) 019-5282</dd>
              </div>
              <div>
                <dt data-edit="visit.term2" data-edit-max="28">Email</dt>
                <dd>
                  <a data-edit="visit.link" data-edit-max="28" href="mailto:tickets@bluenoteroom.example">tickets@bluenoteroom.example</a>
                </dd>
              </div>
              <div>
                <dt data-edit="visit.term3" data-edit-max="28">Getting here</dt>
                <dd data-edit="visit.body3" data-edit-max="200" data-edit-multiline>Canal Street stop, then two minutes on foot</dd>
              </div>
            </dl>
          </div>
          <form className={s.form} action="#">
            <p className={s.field}>
              <label data-edit="visit.label" htmlFor="bn-name">Name</label>
              <input id="bn-name" name="name" type="text" autoComplete="name" />
            </p>
            <p className={s.field}>
              <label data-edit="visit.label2" htmlFor="bn-email">Email</label>
              <input id="bn-email" name="email" type="email" autoComplete="email" />
            </p>
            <p className={s.field}>
              <label data-edit="visit.label3" htmlFor="bn-night">Night</label>
              <select id="bn-night" name="night" defaultValue="">
                <option value="" disabled>
                  Choose a night
                </option>
                {GIGS.map((g) => (
                  <option key={`${g.day}-${g.wd}`}>{`${g.wd} ${g.day}: ${g.artist}`}</option>
                ))}
              </select>
            </p>
            <p className={s.field}>
              <label data-edit="visit.label4" htmlFor="bn-set">Set</label>
              <select id="bn-set" name="set" defaultValue="early">
                <option value="early">Early set</option>
                <option value="late">Late set</option>
              </select>
            </p>
            <p className={s.field}>
              <label data-edit="visit.label5" htmlFor="bn-seats">Seats</label>
              <input id="bn-seats" name="seats" type="number" min={1} max={8} defaultValue={2} />
            </p>
            <button data-edit="visit.submit" data-edit-max="24" type="submit" className={s.submit}>Hold my seats</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p data-edit="footer.footMark" data-edit-max="240" data-edit-multiline className={s.footMark}>Blue Note Room</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p data-edit="footer.footAddr" data-edit-max="240" data-edit-multiline className={s.footAddr}>212 Canal Street, downstairs. Open nightly from 5.</p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional jazz club. Musicians, prices and dates are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
