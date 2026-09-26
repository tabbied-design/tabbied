import { TabbiedPattern } from 'tabbied/react';
import { gimbal } from 'tabbied/patterns';
import s from './velvet-cat-grooming.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Velvet: Grooming salon for cats only, Old Quarry',
  description:
    'Velvet is a quiet grooming salon for cats, and only cats, in Saffron Mews. The menu of baths, combs and trims with prices, the appointment book with its quiet hours, how we handle a nervous cat, and how to book.',
};

/* Site colors. The rings are drawn in the page's mauve, blush and cream on
   a transparent ground, so each field takes the plum of the panel it sits
   in; the menu card's band is the same rings on cream. */
const PLUM = '#3a2533';
const CREAM = '#f3e9e1';
const MAUVE = '#b58ca2';
const BLUSH = '#e3c7c8';

const COVER = ['transparent', MAUVE, BLUSH, CREAM, MAUVE];
const CARDBAND = ['transparent', MAUVE, PLUM, BLUSH];
const PLATE = ['transparent', BLUSH, MAUVE];

const NAV = [
  ['The menu', '#menu'],
  ['Appointments', '#appointments'],
  ['Handling', '#handling'],
  ['No dogs', '#no-dogs'],
  ['Groomers', '#groomers'],
  ['Book', '#book'],
];

type Service = { name: string; note: string; time: string; price: string };

const BATHS: Service[] = [
  { name: 'The short coat bath', note: 'Warm bath, blow-dry on the quiet setting, a full comb-out and nails', time: '75 min', price: '$85' },
  { name: 'The long coat bath', note: 'For Persians, Maine Coons and the like: bath, towel-dry, a slow dry by hand and a comb to the skin', time: '2 hr', price: '$120' },
  { name: 'The lion cut', note: 'Clipped short to the body, mane, boots and a tuft at the tail left long', time: '90 min', price: '$110' },
  { name: 'The comb and de-shed', note: 'No water: loose undercoat lifted with a rake, then a finishing comb', time: '45 min', price: '$60' },
  { name: 'Mat removal', note: 'Mats teased or clipped out, one at a time, with breaks', time: 'per 15 min', price: '$22' },
  { name: 'The senior visit', note: 'For cats of twelve and over: a heated table, a short sitting and a gentle comb', time: '40 min', price: '$55' },
];

const TOUCHES: Service[] = [
  { name: 'Nail trim', note: 'Front and back, and the dewclaws', time: '10 min', price: '$18' },
  { name: 'Soft nail caps', note: 'Glued over the claws, clear or plum, last about six weeks', time: '25 min', price: '$35' },
  { name: 'Sanitary trim', note: 'A tidy under the tail for long coats', time: '15 min', price: '$20' },
  { name: 'Paw pads', note: 'Fur between the toes trimmed flush', time: '10 min', price: '$15' },
  { name: 'Ears and eyes', note: 'Wiped clean with a warm cloth, nothing poked', time: '10 min', price: '$12' },
  { name: 'Face and chin', note: 'For flat-faced breeds, the folds cleaned and dried', time: '15 min', price: '$18' },
];

const DAYS = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* The week's book: one cat an hour and a half. "quiet" is a quiet-hours
   slot, "open" an ordinary one, "none" a slot we keep empty. */
const SLOTS: { time: string; days: ('quiet' | 'open' | 'none')[] }[] = [
  { time: '9:00', days: ['quiet', 'open', 'quiet', 'open', 'open'] },
  { time: '10:30', days: ['quiet', 'open', 'quiet', 'open', 'open'] },
  { time: '12:00', days: ['open', 'open', 'open', 'open', 'open'] },
  { time: '1:30', days: ['none', 'open', 'none', 'open', 'none'] },
  { time: '3:00', days: ['open', 'open', 'open', 'open', 'none'] },
];

const HANDLING = [
  {
    title: 'We read the cat first',
    body: 'Ten minutes with the carrier door open and nobody reaching in. Most cats walk out on their own. The ones who do not are lifted out in their towel.',
  },
  {
    title: 'Towels, never loops',
    body: 'No grooming nooses, no muzzles, no clamps. A nervous cat is wrapped in a warm towel and we work on one paw at a time.',
  },
  {
    title: 'Three pauses, then we stop',
    body: 'Flattened ears, a low growl, a swishing tail: we pause. On the third pause we stop for the day, you pay only for what was done, and we plan the rest.',
  },
  {
    title: 'No sedation on the premises',
    body: 'If a cat truly cannot be groomed awake, we arrange it with Dr. Hale at Quarry Vets, who sedates and we groom there.',
  },
  {
    title: 'No cages, no waiting',
    body: 'Your cat is never boarded with us. We call you twenty minutes before the end, and your cat waits for you in the carrier, in the quiet room.',
  },
];

const BEFORE = [
  ['A carrier', 'with a towel from home in it, so it smells of somewhere safe'],
  ['Vaccinations', 'a current rabies certificate, on paper or a photo'],
  ['No breakfast', 'nothing to eat for two hours before; water is fine'],
  ['A first meeting', 'twenty minutes, free, before any first groom over $60'],
];

const GROOMERS = [
  {
    name: 'Margot Lindqvist',
    role: 'Owner, certified feline master groomer',
    note: 'Eleven years grooming, the last seven for cats only. Does the long coats and every nervous first visit.',
  },
  {
    name: 'Eli Okafor',
    role: 'Groomer',
    note: 'Came from a veterinary nursing course. Does lion cuts, seniors and the Saturday book.',
  },
];

const HOURS = [
  ['Tuesday to Friday', '9 am to 4:30 pm'],
  ['Saturday', '9 am to 1 pm'],
  ['Sunday and Monday', 'Closed'],
  ['Quiet hours', 'Tuesday and Thursday mornings'],
];

export default function VelvetPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--plum': '#3a2533',
        '--cream': '#f3e9e1',
        '--mauve': '#b58ca2',
        '--blush': '#e3c7c8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="plum,cream,mauve,blush"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..600;1,300..600&family=Tenor+Sans&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Velvet</a>
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
        {/* -------------------------------------------------------------- HERO
            The front of the printed menu: rings on plum, a cream label. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Saffron Mews, Old Quarry. Since 2019.</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>
              Grooming for cats, <em>and only cats</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              One cat in the salon at a time, a dryer no louder than a
              conversation, and two groomers who have never once had to shout
              over a barking dog. Book an hour and a half; most visits need
              less.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book an appointment</a>
              <a data-edit="hero.textLink" data-edit-max="28" className={s.textLink} href="#menu">Read the menu</a>
            </div>
          </div>
          <div className={s.cover}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,1,2" className={s.coverField} aria-hidden="true">
              <TabbiedPattern
                pattern={gimbal}
                palette={COVER}
                fit="grid"
                cellSize={48}
                seed="velvet-cover"
                options={{ frequency: 0.8 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.coverLabel}>
              <p data-edit="hero.coverName" data-edit-max="240" data-edit-multiline className={s.coverName}>Velvet</p>
              <p data-edit="hero.coverSub" data-edit-max="240" data-edit-multiline className={s.coverSub}>The menu</p>
              <p data-edit="hero.coverSeason" data-edit-max="240" data-edit-multiline className={s.coverSeason}>Autumn and winter</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- MENU */}
        <section id="menu" className={s.menuSec} aria-labelledby="menu-h">
          <div className={s.card}>
            <div data-edit-pattern="menu.field" data-edit-roles="transparent,2,0,3" className={s.cardBand} aria-hidden="true">
              <TabbiedPattern
                pattern={gimbal}
                palette={CARDBAND}
                fit="grid"
                cellSize={28}
                seed="velvet-band"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.cardHead}>
              <p data-edit="menu.cardKicker" data-edit-max="240" data-edit-multiline className={s.cardKicker}>Velvet</p>
              <h2 data-edit="menu.cardTitle" data-edit-max="60" id="menu-h" className={s.cardTitle}>The menu</h2>
              <p data-edit="menu.cardNote" data-edit-max="240" data-edit-multiline className={s.cardNote}>
                Every visit starts with ten minutes of settling in, which is
                not on the bill. Prices include a comb-out and a bow, which
                you may remove in the car.
              </p>
            </div>
            <div className={s.columns}>
              <div className={s.column}>
                <h3 data-edit="menu.columnTitle" data-edit-max="40" className={s.columnTitle}>Baths and coats</h3>
                <ul className={s.services}>
                  {BATHS.map((b, i) => (
                    <li key={b.name} className={s.service}>
                      <p className={s.line}>
                        <span data-edit={`menu.serviceName.${i}`} data-edit-max="60" className={s.serviceName}>{b.name}</span>
                        <span className={s.leader} aria-hidden="true" />
                        <span data-edit={`menu.servicePrice.${i}`} data-edit-max="60" className={s.servicePrice}>{b.price}</span>
                      </p>
                      <p data-edit={`menu.serviceNote.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceNote}>{b.note}</p>
                      <p data-edit={`menu.serviceTime.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceTime}>{b.time}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={s.column}>
                <h3 data-edit="menu.columnTitle2" data-edit-max="40" className={s.columnTitle}>Finishing touches</h3>
                <ul className={s.services}>
                  {TOUCHES.map((t, i) => (
                    <li key={t.name} className={s.service}>
                      <p className={s.line}>
                        <span data-edit={`menu.serviceName2.${i}`} data-edit-max="60" className={s.serviceName}>{t.name}</span>
                        <span className={s.leader} aria-hidden="true" />
                        <span data-edit={`menu.servicePrice2.${i}`} data-edit-max="60" className={s.servicePrice}>{t.price}</span>
                      </p>
                      <p data-edit={`menu.serviceNote2.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceNote}>{t.note}</p>
                      <p data-edit={`menu.serviceTime2.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceTime}>{t.time}</p>
                    </li>
                  ))}
                </ul>
                <p data-edit="menu.cardAside" data-edit-max="240" data-edit-multiline className={s.cardAside}>
                  Touches may be added to any bath, or booked on their own in
                  a twenty-minute visit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- APPOINTMENTS */}
        <section id="appointments" className={s.sec} aria-labelledby="appointments-h">
          <div className={s.secHead}>
            <p data-edit="appointments.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The appointment book</p>
            <h2 data-edit="appointments.title" data-edit-format="emphasis" data-edit-max="60" id="appointments-h" className={s.h2}>
              Five cats a day, <em>never two at once</em>
            </h2>
            <p data-edit="appointments.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Each slot is an hour and a half, with the room aired and wiped
              down between cats so nobody walks into another cat's smell. The
              early slots on Tuesday and Thursday are quiet hours: lights low,
              no clippers, no doorbell, for cats who find the world a lot.
            </p>
          </div>
          <table className={s.book}>
            <caption data-edit="appointments.srOnly" className={s.srOnly}>Appointment slots by day, Tuesday to Saturday</caption>
            <thead>
              <tr>
                <th data-edit="appointments.bookCorner" scope="col" className={s.bookCorner}>Slot</th>
                {DAYS.map((d, i) => (
                  <th data-edit={`appointments.heading.${i}`} key={d} scope="col">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((row, i) => (
                <tr key={row.time}>
                  <th data-edit={`appointments.bookTime.${i}`} scope="row" className={s.bookTime}>{row.time}</th>
                  {row.days.map((kind, j) => (
                    <td key={DAYS[j]} className={s[kind]}>
                      <span className={s.slotLabel}>{kind === 'quiet' ? 'Quiet hour' : kind === 'open' ? 'Open' : 'Kept free'}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <ul className={s.key}>
            <li data-edit="appointments.keyQuiet" data-edit-max="80" className={s.keyQuiet}>Quiet hour: no other sounds in the building</li>
            <li data-edit="appointments.keyOpen" data-edit-max="80" className={s.keyOpen}>Open: an ordinary appointment</li>
            <li data-edit="appointments.keyNone" data-edit-max="80" className={s.keyNone}>Kept free for overruns and lunch</li>
          </ul>
        </section>

        {/* --------------------------------------------------------- HANDLING */}
        <section id="handling" className={s.sec} aria-labelledby="handling-h">
          <div className={s.handling}>
            <div className={s.handlingHead}>
              <p data-edit="handling.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Temperament and handling</p>
              <h2 data-edit="handling.title" data-edit-format="emphasis" data-edit-max="60" id="handling-h" className={s.h2}>
                How we hold <em>a cat who would rather not</em>
              </h2>
              <div data-edit-pattern="handling.field" data-edit-roles="transparent,3,2" className={s.plate} aria-hidden="true">
                <TabbiedPattern
                  pattern={gimbal}
                  palette={PLATE}
                  fit="grid"
                  cellSize={36}
                  seed="velvet-plate"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ol className={s.notes}>
              {HANDLING.map((h, i) => (
                <li key={h.title} className={s.noteItem}>
                  <h3 data-edit={`handling.title.${i}`} data-edit-max="40">{h.title}</h3>
                  <p data-edit={`handling.body.${i}`} data-edit-max="240" data-edit-multiline>{h.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- NO DOGS */}
        <section id="no-dogs" className={s.noDogs} aria-labelledby="no-dogs-h">
          <div className={s.noDogsInner}>
            <Artwork
              slug="velvet-cat-grooming-cat"
              alt="A long-haired cat sitting upright, tail curled round its paws"
              inks={['var(--on-cream)']}
              className={s.cat}
            />
            <div className={s.noDogsText}>
              <p data-edit="noDogs.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>House rule, the only one</p>
              <h2 data-edit="noDogs.noDogsTitle" data-edit-max="60" id="no-dogs-h" className={s.noDogsTitle}>No dogs. Ever.</h2>
              <p data-edit="noDogs.noDogsBody" data-edit-max="240" data-edit-multiline className={s.noDogsBody}>
                Not in the lobby, not in a carrier, not the very quiet one. A
                cat can smell a dog on a floor for days, and this floor has
                never had one on it. If you have come straight from the dog
                park, we will ask you to wait outside while we fetch your cat.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- BEFORE, TEAM */}
        <section id="groomers" className={s.sec} aria-labelledby="groomers-h">
          <div className={s.twin}>
            <div>
              <p data-edit="groomers.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Before you come</p>
              <h2 data-edit="groomers.h3" data-edit-max="60" className={s.h3}>Four things to bring or know</h2>
              <dl className={s.before}>
                {BEFORE.map(([what, why], i) => (
                  <div key={what}>
                    <dt data-edit={`groomers.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`groomers.body.${i}`} data-edit-max="200" data-edit-multiline>{why}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p data-edit="groomers.kicker2" data-edit-max="240" data-edit-multiline className={s.kicker}>The groomers</p>
              <h2 data-edit="groomers.h32" data-edit-max="60" id="groomers-h" className={s.h3}>Two pairs of hands</h2>
              <ul className={s.groomers}>
                {GROOMERS.map((g, i) => (
                  <li key={g.name}>
                    <h3 data-edit={`groomers.title.${i}`} data-edit-max="40">{g.name}</h3>
                    <p data-edit={`groomers.groomerRole.${i}`} data-edit-max="240" data-edit-multiline className={s.groomerRole}>{g.role}</p>
                    <p data-edit={`groomers.groomerNote.${i}`} data-edit-max="240" data-edit-multiline className={s.groomerNote}>{g.note}</p>
                  </li>
                ))}
              </ul>
              <p data-edit="groomers.aside" data-edit-max="240" data-edit-multiline className={s.aside}>There is no salon cat. Yours is the only cat in the room.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookWrap}>
            <form className={s.form} action="#">
              <h2 data-edit="book.formTitle" data-edit-max="60" id="book-h" className={s.formTitle}>Book an appointment</h2>
              <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Margot replies within a working day with two or three slots to choose from.</p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="book.label" htmlFor="vv-name">Your name</label>
                  <input id="vv-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label2" htmlFor="vv-phone">Telephone</label>
                  <input id="vv-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label3" htmlFor="vv-cat">Your cat's name</label>
                  <input id="vv-cat" name="cat" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label4" htmlFor="vv-age">Age</label>
                  <input id="vv-age" name="age" type="text" placeholder="in years" />
                </div>
                <div className={s.field}>
                  <label data-edit="book.label5" htmlFor="vv-coat">Coat</label>
                  <select id="vv-coat" name="coat" defaultValue="short">
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                    <option value="none">Hairless</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="book.label6" htmlFor="vv-temper">Temperament</label>
                  <select id="vv-temper" name="temper" defaultValue="easy">
                    <option value="easy">Easygoing</option>
                    <option value="nervous">Nervous</option>
                    <option value="opinionated">Opinionated</option>
                    <option value="bitten">Has bitten a groomer before</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="book.label7" htmlFor="vv-service">What you would like</label>
                  <select id="vv-service" name="service" defaultValue="short">
                    <option value="meet">A first meeting, free</option>
                    <option value="short">The short coat bath</option>
                    <option value="long">The long coat bath</option>
                    <option value="lion">The lion cut</option>
                    <option value="comb">The comb and de-shed</option>
                    <option value="senior">The senior visit</option>
                    <option value="touches">Finishing touches only</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="book.label8" htmlFor="vv-notes">Anything we should know about them</label>
                  <textarea id="vv-notes" name="notes" rows={3} />
                </div>
              </div>
              <label className={s.quietTick}>
                <input type="checkbox" name="quiet" />
                <span data-edit="book.text" data-edit-max="60">Please offer me a quiet-hours slot</span>
              </label>
              <button data-edit="book.button" data-edit-max="24" className={s.button} type="submit">Send the request</button>
            </form>
            <div className={s.visit}>
              <p data-edit="book.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Find us</p>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline className={s.address}>
                2B Saffron Mews
                <br />
                Old Quarry
              </p>
              <p data-edit="book.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>The plum door at the end of the mews, past the frame shop. Parking in the mews for drop-off.</p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550126604">(555) 012-6604</a>
              </p>
              <p className={s.contact}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:margot@velvetcats.example">margot@velvetcats.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,1,2" className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={gimbal}
            palette={COVER}
            fit="grid"
            cellSize={32}
            seed="velvet-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Velvet</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional cat grooming salon. The groomers, prices and address are invented.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The cat is a generated image, drawn in the page's own colors.</p>
          <p>
            Patterns by{' '}
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
