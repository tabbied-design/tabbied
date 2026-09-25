import { TabbiedPattern } from 'tabbied/react';
import { petalcut, polkadot } from 'tabbied/patterns';
import s from './polish-nail-bar.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Polish: Nail salon, Carmine Street',
  description:
    'Polish is a nail bar with a wall of thirty shades, manicures from $28 and gel from $45, four nail artists and walk-ins until 4 pm. Book a chair online.',
};

/* Site colors. The petals and dots sit on `transparent`: on the pale arch
   in the hero, and on the paper in the band. */
const PINK = '#E0306D';
const VIOLET = '#7A5CFA';
const PAPER = '#FFF5F5';
const GRAY = '#A38D96';

const PETALS = ['transparent', PINK, VIOLET, PAPER];
const DOTS = ['transparent', PINK, VIOLET, GRAY];
const ART = ['transparent', PINK, VIOLET];

const NAV = [
  ['The wall', '#wall'],
  ['Services', '#services'],
  ['Artists', '#artists'],
  ['Book', '#book'],
  ['Visit', '#visit'],
];

/* Every shade is mixed from the palette, so a re-color repaints the wall. */
type Shade = { name: string; finish: string; mix: string };
type Family = { name: string; note: string; shades: Shade[] };

const WALL: Family[] = [
  {
    name: 'Pinks',
    note: 'From barely there to the one you will be asked about.',
    shades: [
      { name: 'First Blush', finish: 'Sheer', mix: 'color-mix(in srgb, var(--pink) 18%, var(--paper))' },
      { name: 'Ballet Slipper', finish: 'Creme', mix: 'color-mix(in srgb, var(--pink) 32%, var(--paper))' },
      { name: 'Peony', finish: 'Creme', mix: 'color-mix(in srgb, var(--pink) 52%, var(--paper))' },
      { name: 'Carmine Street', finish: 'Creme', mix: 'var(--pink)' },
      { name: 'Hot Gossip', finish: 'Jelly', mix: 'color-mix(in srgb, var(--pink) 85%, var(--violet))' },
      { name: 'Flamingo Hour', finish: 'Shimmer', mix: 'color-mix(in srgb, var(--pink) 72%, var(--paper))' },
    ],
  },
  {
    name: 'Berries',
    note: 'Deep, glossy reds that lean plum by lamplight.',
    shades: [
      { name: 'Cherry Stone', finish: 'Creme', mix: 'color-mix(in srgb, var(--pink) 80%, var(--ink))' },
      { name: 'Merlot', finish: 'Creme', mix: 'color-mix(in srgb, var(--pink) 55%, var(--ink))' },
      { name: 'Black Currant', finish: 'Jelly', mix: 'color-mix(in srgb, var(--pink) 35%, var(--ink))' },
      { name: 'Raspberry Jam', finish: 'Shimmer', mix: 'color-mix(in srgb, var(--pink) 65%, var(--violet))' },
      { name: 'Mulberry', finish: 'Creme', mix: 'color-mix(in srgb, color-mix(in srgb, var(--violet) 55%, var(--pink)) 62%, var(--ink))' },
      { name: 'Last Call', finish: 'Matte', mix: 'color-mix(in srgb, var(--pink) 45%, var(--ink))' },
    ],
  },
  {
    name: 'Violets',
    note: 'Lilac for spring, ultraviolet for everything else.',
    shades: [
      { name: 'Lilac Mist', finish: 'Sheer', mix: 'color-mix(in srgb, var(--violet) 22%, var(--paper))' },
      { name: 'Lavender Soap', finish: 'Creme', mix: 'color-mix(in srgb, var(--violet) 40%, var(--paper))' },
      { name: 'Iris', finish: 'Creme', mix: 'color-mix(in srgb, var(--violet) 68%, var(--paper))' },
      { name: 'Ultraviolet', finish: 'Creme', mix: 'var(--violet)' },
      { name: 'Grape Soda', finish: 'Jelly', mix: 'color-mix(in srgb, var(--violet) 70%, var(--pink))' },
      { name: 'Midnight Iris', finish: 'Shimmer', mix: 'color-mix(in srgb, var(--violet) 60%, var(--ink))' },
    ],
  },
  {
    name: 'Nudes',
    note: 'Matched to your hand in daylight, at the window.',
    shades: [
      { name: 'Oat Milk', finish: 'Creme', mix: 'color-mix(in srgb, var(--gray) 25%, var(--paper))' },
      { name: 'Linen', finish: 'Creme', mix: 'color-mix(in srgb, var(--gray) 42%, var(--pale))' },
      { name: 'Rosewood', finish: 'Creme', mix: 'color-mix(in srgb, var(--gray) 70%, var(--pink))' },
      { name: 'Mink', finish: 'Creme', mix: 'var(--gray)' },
      { name: 'Cocoa Butter', finish: 'Matte', mix: 'color-mix(in srgb, var(--gray) 60%, var(--ink))' },
      { name: 'Bare Minimum', finish: 'Sheer', mix: 'var(--pale)' },
    ],
  },
  {
    name: 'Darks',
    note: 'For the short, square nail and the long winter.',
    shades: [
      { name: 'Aubergine', finish: 'Creme', mix: 'color-mix(in srgb, var(--ink) 75%, var(--violet))' },
      { name: 'Oxblood', finish: 'Creme', mix: 'color-mix(in srgb, var(--ink) 70%, var(--pink))' },
      { name: 'Ink Well', finish: 'Creme', mix: 'var(--ink)' },
      { name: 'Smoke Show', finish: 'Matte', mix: 'color-mix(in srgb, var(--ink) 60%, var(--gray))' },
      { name: 'Night Swim', finish: 'Shimmer', mix: 'color-mix(in srgb, var(--ink) 55%, var(--violet))' },
      { name: 'After Hours', finish: 'Jelly', mix: 'color-mix(in srgb, var(--ink) 82%, var(--pink))' },
    ],
  },
];

type Service = { name: string; note: string; minutes: number; price: string };
type Group = { name: string; services: Service[] };

const MENU: Group[] = [
  {
    name: 'Hands',
    services: [
      { name: 'Classic manicure', note: 'Shape, cuticles, massage, regular polish', minutes: 30, price: '$28' },
      { name: 'Gel manicure', note: 'Two weeks of shine, cured under LED', minutes: 45, price: '$45' },
      { name: 'Builder gel overlay', note: 'Strength for soft or bitten nails', minutes: 60, price: '$62' },
      { name: 'Soft gel extensions', note: 'Any length and shape, gel color included', minutes: 90, price: '$85' },
    ],
  },
  {
    name: 'Feet',
    services: [
      { name: 'Classic pedicure', note: 'Soak, file, scrub, polish', minutes: 45, price: '$42' },
      { name: 'Gel pedicure', note: 'The classic with a gel finish', minutes: 60, price: '$55' },
      { name: 'Spa pedicure', note: 'Adds a sugar scrub, mask and hot towels', minutes: 75, price: '$68' },
    ],
  },
  {
    name: 'Art and extras',
    services: [
      { name: 'Nail art', note: 'Dots, lines, flowers, per nail', minutes: 5, price: '$5' },
      { name: 'French, chrome or ombre', note: 'On any gel set', minutes: 15, price: '$12' },
      { name: 'Gel removal', note: 'Soaked off gently, never pried', minutes: 15, price: '$10' },
      { name: 'Single nail repair', note: 'A snapped nail rebuilt to match', minutes: 10, price: '$8' },
    ],
  },
];

const ARTISTS = [
  {
    name: 'Dani Pham',
    role: 'Owner, extensions',
    note: 'Sculpted almond and coffin shapes. Books out two weeks.',
    days: 'Tuesday to Saturday',
    shade: 'Carmine Street',
    mix: 'var(--pink)',
  },
  {
    name: 'Marisol Cruz',
    role: 'Nail art',
    note: 'Hand-painted florals, tiny portraits and anything in chrome.',
    days: 'Wednesday to Sunday',
    shade: 'Ultraviolet',
    mix: 'var(--violet)',
  },
  {
    name: 'Kiki Adeyemi',
    role: 'Pedicures and care',
    note: 'The gentlest pedicure in town; ask about the spa one.',
    days: 'Monday, Thursday to Sunday',
    shade: 'Linen',
    mix: 'color-mix(in srgb, var(--gray) 42%, var(--pale))',
  },
  {
    name: 'Rae Lindgren',
    role: 'Gel and builder gel',
    note: 'Short, strong, square and perfect for two and a half weeks.',
    days: 'Monday to Friday',
    shade: 'Ink Well',
    mix: 'var(--ink)',
  },
];

const POLICIES = [
  ['Walk-ins', 'Welcome until 4 pm most days; the bar by the window is kept for them.'],
  ['Running late', 'Past fifteen minutes we may need to shorten the service or move you.'],
  ['Changing plans', 'Cancel or move up to 24 hours ahead at no charge.'],
  ['Extensions', 'A $15 deposit holds the chair, taken off the price on the day.'],
];

const HOURS = [
  ['Monday to Friday', '10 am to 8 pm'],
  ['Saturday', '9 am to 7 pm'],
  ['Sunday', '11 am to 5 pm'],
];

export default function PolishNailBarPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fff5f5',
        '--ink': '#2a1520',
        '--pink': '#e0306d',
        '--violet': '#7a5cfa',
        '--gray': '#a38d96',
        '--pale': '#f9e1e8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,pink,violet,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gloock&family=Outfit:wght@300..700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Polish</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Book a chair</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            An almond-shaped arch of petals, the hand resting across its
            foot and three bottles, each tinted a different shade. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Nail bar, 18 Carmine Street</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Pick a color.
              <br />
              <em>We'll do the rest.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Thirty shades on the wall, four artists at the bar and a
              manicure that lasts. Come in with a photo or come in with
              nothing: we will find it together.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Book a chair</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#wall">See the wall</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Manicure</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>from $28</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Gel</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>from $45</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Walk-ins</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>until 4 pm</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroArt}>
            <div className={s.arch}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,0" className={s.archField} aria-hidden="true">
                <TabbiedPattern
                  pattern={petalcut}
                  palette={PETALS}
                  options={{ frequency: 0.45 }}
                  fit="grid"
                  cellSize={56}
                  seed="polish-petals"
                  redrawInterval={8000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="polish-nail-bar-hand"
                alt="A hand resting flat, the nails freshly painted"
                mode="tint"
                inks={['var(--ink)', 'var(--paper)']}
                className={s.heroHand}
              />
            </div>
            <div className={s.heroBottles}>
              <Artwork
                slug="polish-nail-bar-bottle"
                alt="A bottle of pink polish"
                mode="tint"
                inks={['var(--pink)', 'var(--paper)']}
                className={s.bottle}
              />
              <Artwork
                slug="polish-nail-bar-bottle"
                alt="A bottle of violet polish"
                mode="tint"
                inks={['var(--violet)', 'var(--paper)']}
                className={s.bottle}
              />
              <Artwork
                slug="polish-nail-bar-bottle"
                alt="A bottle of dark plum polish"
                mode="tint"
                inks={['var(--ink)', 'var(--pale)']}
                className={s.bottle}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ WALL
            The shade wall: five rows of round swatches, each mixed from the
            palette, with its name and finish under it. */}
        <section id="wall" className={s.wall} aria-labelledby="wall-h">
          <div className={s.wallHead}>
            <p data-edit="wall.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The color wall</p>
            <h2 data-edit="wall.title" data-edit-max="60" id="wall-h">Thirty shades, all in stock, all in gel and regular</h2>
            <p data-edit="wall.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Point at one, or bring a photo and we will mix it. A new six
              arrives at the start of every season.
            </p>
          </div>
          <div className={s.wallBoard}>
            {WALL.map((f, i) => (
              <div key={f.name} className={s.family}>
                <div className={s.familyHead}>
                  <h3 data-edit={`wall.title2.${i}`} data-edit-max="40">{f.name}</h3>
                  <p data-edit={`wall.body.${i}`} data-edit-max="240" data-edit-multiline>{f.note}</p>
                </div>
                <ul className={s.swatches}>
                  {f.shades.map((sh, i2) => (
                    <li key={sh.name} className={s.swatch} style={{ '--sw': sh.mix } as React.CSSProperties}>
                      <span className={s.chip} data-finish={sh.finish} aria-hidden="true" />
                      <span data-edit={`wall.shadeName.${i}.${i2}`} data-edit-max="60" className={s.shadeName}>{sh.name}</span>
                      <span data-edit={`wall.shadeFinish.${i}.${i2}`} data-edit-max="60" className={s.shadeFinish}>{sh.finish}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES
            The menu by the minute: each bar is the time you will sit. */}
        <section id="services" className={s.services} aria-labelledby="services-h">
          <div className={s.servicesInner}>
            <div className={s.servicesHead}>
              <p data-edit="services.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Services</p>
              <h2 data-edit="services.title" data-edit-max="60" id="services-h">The menu, by the minute</h2>
              <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Every bar is how long you will be in the chair. Prices
                include polish from the wall and a hand or foot massage.
              </p>
              <div className={s.servicesNail}>
                <div className={s.nailField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={polkadot}
                    palette={DOTS}
                    fit="grid"
                    cellSize={26}
                    seed="nail-art"
                    options={{ frequency: 0.6 }}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              <Artwork
                slug="polish-nail-bar-bottle"
                alt=""
                mode="tint"
                inks={['var(--violet)', 'var(--paper)']}
                className={s.servicesBottle}
              />
              </div>
            </div>
            <div className={s.menu}>
              {MENU.map((g, i) => (
                <div key={g.name} className={s.group}>
                  <h3 data-edit={`services.groupName.${i}`} data-edit-max="40" className={s.groupName}>{g.name}</h3>
                  <ul className={s.rows}>
                    {g.services.map((sv, i2) => (
                      <li key={sv.name} className={s.row}>
                        <div className={s.rowText}>
                          <h4 data-edit={`services.rowName.${i}.${i2}`} data-edit-max="36" className={s.rowName}>{sv.name}</h4>
                          <p data-edit={`services.rowNote.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.rowNote}>{sv.note}</p>
                        </div>
                        <span className={s.rowBar} aria-hidden="true">
                          <span className={s.rowFill} style={{ width: `${(sv.minutes / 90) * 100}%` }} />
                        </span>
                        <span className={s.rowTime}>{`${sv.minutes} min`}</span>
                        <span data-edit={`services.rowPrice.${i}.${i2}`} data-edit-max="60" className={s.rowPrice}>{sv.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div className={s.band} aria-hidden="true">
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,4" className={s.bandField}>
            <TabbiedPattern
              pattern={polkadot}
              palette={DOTS}
              fit="grid"
              cellSize={52}
              seed="polish-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* --------------------------------------------------------- ARTISTS */}
        <section id="artists" className={s.artists} aria-labelledby="artists-h">
          <div className={s.secHead}>
            <p data-edit="artists.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The artists</p>
            <h2 data-edit="artists.title" data-edit-max="60" id="artists-h">Four at the bar, each with a favorite shade</h2>
          </div>
          <ul className={s.artistList}>
            {ARTISTS.map((a, i) => (
              <li key={a.name} className={s.artist} style={{ '--sw': a.mix } as React.CSSProperties}>
                <span className={s.artistChip} aria-hidden="true" />
                <h3 data-edit={`artists.artistName.${i}`} data-edit-max="40" className={s.artistName}>{a.name}</h3>
                <p data-edit={`artists.artistRole.${i}`} data-edit-max="240" data-edit-multiline className={s.artistRole}>{a.role}</p>
                <p data-edit={`artists.artistNote.${i}`} data-edit-max="240" data-edit-multiline className={s.artistNote}>{a.note}</p>
                <dl className={s.artistFacts}>
                  <div>
                    <dt data-edit={`artists.term.${i}`} data-edit-max="28">In</dt>
                    <dd data-edit={`artists.body.${i}`} data-edit-max="200" data-edit-multiline>{a.days}</dd>
                  </div>
                  <div>
                    <dt data-edit={`artists.term2.${i}`} data-edit-max="28">Wears</dt>
                    <dd data-edit={`artists.body2.${i}`} data-edit-max="200" data-edit-multiline>{a.shade}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookPetals} aria-hidden="true">
            <TabbiedPattern
              pattern={petalcut}
              palette={ART}
              fit="grid"
              cellSize={64}
              seed="book-petals"
              options={{ frequency: 0.4 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.bookInner}>
            <div className={s.bookText}>
              <p data-edit="book.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Book</p>
              <h2 data-edit="book.title" data-edit-max="60" id="book-h">Save a chair</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                We confirm by text within the hour, and remind you the day
                before.
              </p>
              <dl className={s.policies}>
                {POLICIES.map(([title, body], i) => (
                  <div key={title}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{title}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{body}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="pl-service">Service</label>
                <select id="pl-service" name="service" defaultValue="Gel manicure">
                  {MENU.map((g) => (
                    <optgroup key={g.name} label={g.name}>
                      {g.services.map((sv) => (
                        <option key={sv.name} value={sv.name}>{sv.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="pl-artist">Artist</label>
                <select id="pl-artist" name="artist" defaultValue="Anyone">
                  <option value="Anyone">Whoever is free first</option>
                  {ARTISTS.map((a) => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="pl-date">Day</label>
                <input id="pl-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="pl-time">Time</label>
                <select id="pl-time" name="time" defaultValue="Afternoon">
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">After 5 pm</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="pl-name">Name</label>
                <input id="pl-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label6" htmlFor="pl-phone">Mobile</label>
                <input id="pl-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <button data-edit="book.formBtn" data-edit-max="24" className={s.formBtn} type="submit">Request the chair</button>
            </form>
            <div className={s.bookArt} aria-hidden="true">
              <Artwork
                slug="polish-nail-bar-hand"
                alt=""
                mode="tint"
                inks={['var(--pink)', 'var(--paper)']}
                className={s.bookHand}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitCol}>
            <p data-edit="visit.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Visit</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">18 Carmine Street</h2>
            <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>Between the florist and the bakery, two doors up from the Carmine Street stop.</p>
            <dl className={s.hoursList}>
              {HOURS.map(([day, time], i) => (
                <div key={day}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.visitCol}>
            <h3 data-edit="visit.visitHead" data-edit-max="40" className={s.visitHead}>Clean, every time</h3>
            <ul className={s.cleanList}>
              <li data-edit="visit.item" data-edit-max="80">Metal tools are sterilized in an autoclave between every client.</li>
              <li data-edit="visit.item2" data-edit-max="80">Files and buffers are single use; you can take yours home.</li>
              <li data-edit="visit.item3" data-edit-max="80">Each pedicure bowl gets a fresh liner and no jets to hide in.</li>
              <li data-edit="visit.item4" data-edit-max="80">Ventilated tables pull the fumes down and away from you.</li>
            </ul>
          </div>
          <div className={s.visitCol}>
            <h3 data-edit="visit.visitHead2" data-edit-max="40" className={s.visitHead}>Get in touch</h3>
            <dl className={s.contact}>
              <div>
                <dt data-edit="visit.term2" data-edit-max="28">Call or text</dt>
                <dd>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550167720">(555) 016-7720</a>
                </dd>
              </div>
              <div>
                <dt data-edit="visit.term3" data-edit-max="28">Email</dt>
                <dd>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@polishnailbar.example">hello@polishnailbar.example</a>
                </dd>
              </div>
              <div>
                <dt data-edit="visit.term4" data-edit-max="28">Gift cards</dt>
                <dd data-edit="visit.body2" data-edit-max="200" data-edit-multiline>Any amount, at the desk or by email</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footEdge} aria-hidden="true">
          <TabbiedPattern
            pattern={petalcut}
            palette={ART}
            fit="grid"
            cellSize={28}
            seed="foot-petals"
            options={{ frequency: 0.8 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footTop}>
          <p data-edit="footer.footMark" data-edit-max="240" data-edit-multiline className={s.footMark}>Polish</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Nail bar, 18 Carmine Street. Pick a color.</p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional nail salon. Shades, prices, people and the address are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
