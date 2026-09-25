import { TabbiedPattern } from 'tabbied/react';
import { ogee, petalcut } from 'tabbied/patterns';
import s from './veil-and-vow.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Veil & Vow: Bridal boutique, Orchard Lane',
  description:
    'Veil & Vow is a bridal boutique on Orchard Lane: private ninety-minute appointments, gowns from six designers in sizes 2-30, and fittings in our own workroom until the week of the wedding.',
};

/* Site colors. The petals sit on `transparent` inside the hero arch, so
   the arch's own rose shows between them. */
const IVORY = '#FBF8F4';
const TAUPE = '#B08A6E';
const ROSE = '#C9A7B8';
const PALE = '#EFE8E1';

const PETALS = ['transparent', IVORY, PALE, TAUPE];
const LACE = ['transparent', ROSE, PALE, TAUPE];

const NAV = [
  ['The appointment', '#appointment'],
  ['Gowns', '#gowns'],
  ['Designers', '#designers'],
  ['Fittings', '#fittings'],
  ['Book', '#book'],
];

const STEPS = [
  { no: '01', title: 'Book a time', when: 'Two minutes', body: 'Choose a date and tell us a little about the day: the season, the place, what you have liked so far.' },
  { no: '02', title: 'Arrive', when: 'The suite is yours', body: 'A private fitting room for ninety minutes, up to four guests, and something cold to drink.' },
  { no: '03', title: 'Try on', when: 'Eight to ten gowns', body: 'Your stylist pulls from what you described and adds one you would not have chosen. It is often the one.' },
  { no: '04', title: 'Decide, or do not', when: 'No pressure', body: 'We hold a gown for 48 hours. When you are sure, we measure you and place the order with the designer.' },
];

/* Each arch is a different ground and a different pair of inks for the
   picture, always a dark and a light the ground keeps readable. */
type Gown = {
  name: string;
  line: string;
  designer: string;
  price: string;
  art: string;
  tone: 'rose' | 'pale' | 'ink' | 'taupe' | 'gray';
  inks: string[];
};

const GOWNS: Gown[] = [
  { name: 'Alder', line: 'A-line, lace over tulle', designer: 'Maison Clairet', price: '$2,400', art: 'veil-and-vow-gown', tone: 'rose', inks: ['var(--deep)', 'var(--ivory)'] },
  { name: 'Lune', line: 'Ball gown, silk faille', designer: 'Hollis Rowe', price: '$3,100', art: 'veil-and-vow-gown', tone: 'ink', inks: ['var(--taupe)', 'var(--ivory)'] },
  { name: 'Sorrel', line: 'Sheath, crepe', designer: 'Atelier Noor', price: '$1,850', art: 'veil-and-vow-gown', tone: 'pale', inks: ['var(--ink)', 'var(--ivory)'] },
  { name: 'Wren', line: 'Fit and flare, beaded', designer: 'Vow, our own label', price: '$2,750', art: 'veil-and-vow-gown', tone: 'taupe', inks: ['var(--ink)', 'var(--pale)'] },
  { name: 'The finishing', line: 'Veils, belts and bouquets', designer: 'Made to match', price: 'From $180', art: 'veil-and-vow-bouquet', tone: 'gray', inks: ['var(--ink)', 'var(--ivory)'] },
];

const DESIGNERS = [
  { name: 'Maison Clairet', from: 'Lyon', known: 'French lace, long sleeves, a back full of buttons', sizes: '2-24', price: 'From $2,200' },
  { name: 'Hollis Rowe', from: 'New York', known: 'Structured ball gowns in silk faille and mikado', sizes: '0-28', price: 'From $2,800' },
  { name: 'Atelier Noor', from: 'Lisbon', known: 'Clean crepe sheaths and bias-cut slips', sizes: '2-26', price: 'From $1,600' },
  { name: 'Birch and Bell', from: 'Portland', known: 'Light, relaxed gowns for gardens and beaches', sizes: '2-30', price: 'From $1,400' },
  { name: 'Sato Bridal', from: 'Kyoto', known: 'Minimal lines, pleating, and extraordinary fabric', sizes: '0-20', price: 'From $3,200' },
  { name: 'Vow', from: 'Our workroom', known: 'Our own label, cut and sewn in the back room', sizes: '2-30', price: 'From $1,900' },
];

const TIMELINE = [
  { when: '9-12 months before', title: 'Find the dress', body: 'Order at least eight months ahead. Most designers take 16-20 weeks to make a gown.' },
  { when: '4-5 months before', title: 'The gown arrives', body: 'We check every seam and bead against the order, then call you in to see it.' },
  { when: '3 months before', title: 'First fitting', body: 'Hem, straps and the shape of the bodice, pinned on you. Your quote is written that day.' },
  { when: '6 weeks before', title: 'Second fitting', body: 'Bring the shoes and whatever you will wear underneath. This is where it starts to fit like yours.' },
  { when: '2 weeks before', title: 'Final fitting', body: 'The bustle lesson too. Bring whoever will be doing it on the day, and we will teach them twice.' },
  { when: 'The week of', title: 'Pressed and ready', body: 'Steamed, bagged and collected, or delivered to a venue within twenty miles for $60.' },
];

const ALTERATIONS = [
  ['Hem, one layer', '$180'],
  ['Hem, several layers or lace edge', '$240-$320'],
  ['Bustle', '$95-$180'],
  ['Take in the bodice', '$150'],
  ['Add straps or sleeves', '$220-$400'],
  ['Steam and press', '$85'],
];

const HOURS = [
  ['Tuesday-Friday', '11 am-7 pm'],
  ['Saturday', '10 am-5 pm'],
  ['Sunday and Monday', 'Closed'],
];

export default function VeilAndVowPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Libre+Bodoni:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Mulish:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span>Veil</span>
          <span className={s.markAmp}>&amp;</span>
          <span>Vow</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#book">Book an appointment</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The gown in a tall arch of falling petals, the bouquet at its
            foot. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Bridal boutique, 9 Orchard Lane</p>
            <h1 id="hero-h" className={s.title}>
              Find the dress <em>in one unhurried afternoon.</em>
            </h1>
            <p className={s.lede}>
              Private appointments, ninety minutes each, with a stylist who
              has read your notes before you arrive. Gowns from six designers,
              sizes 2-30, and a workroom that fits them until the week of the
              wedding.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#book">Book an appointment</a>
              <a className={s.textLink} href="#gowns">See the gowns</a>
            </div>
            <dl className={s.facts}>
              <div>
                <dt>90 min</dt>
                <dd>private, up to four guests</dd>
              </div>
              <div>
                <dt>140</dt>
                <dd>gowns to try on</dd>
              </div>
              <div>
                <dt>2-30</dt>
                <dd>sample sizes in store</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroArt}>
            <div className={s.heroArch}>
              <div className={s.archField} aria-hidden="true">
                <TabbiedPattern
                  pattern={petalcut}
                  palette={PETALS}
                  fit="grid"
                  cellSize={64}
                  seed="veil-petals"
                  options={{ frequency: 0.4 }}
                  redrawInterval={9000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="veil-and-vow-gown"
                alt="A lace wedding gown on a dress form"
                mode="tint"
                inks={['var(--deep)', 'var(--ivory)']}
                className={s.heroGown}
              />
            </div>
            <Artwork
              slug="veil-and-vow-bouquet"
              alt="A bridal bouquet of roses"
              mode="tint"
              inks={['var(--ink)', 'var(--pale)']}
              className={s.heroBouquet}
            />
          </div>
        </section>

        {/* ----------------------------------------------------- APPOINTMENT
            The visit in four steps, read across the page. */}
        <section id="appointment" className={s.journey} aria-labelledby="journey-h">
          <div className={s.secHead}>
            <p className={s.secKick}>The appointment</p>
            <h2 id="journey-h">
              Four steps, <em>and only one decision.</em>
            </h2>
          </div>
          <ol className={s.steps}>
            {STEPS.map((st) => (
              <li key={st.no} className={s.step}>
                <span className={s.stepNo}>{st.no}</span>
                <h3>{st.title}</h3>
                <span className={s.stepWhen}>{st.when}</span>
                <p>{st.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- GOWNS
            A row of tall arches, the same photograph in each ground's inks. */}
        <section id="gowns" className={s.gowns} aria-labelledby="gowns-h">
          <div className={s.gownsHead}>
            <div className={s.secHead}>
              <p className={s.secKick}>Gowns</p>
              <h2 id="gowns-h">
                A few from the rail <em>this season.</em>
              </h2>
            </div>
            <p className={s.secNote}>
              Every gown is a sample to try on; yours is made to order in your
              size. Prices include the first fitting.
            </p>
          </div>
          <ul className={s.arches}>
            {GOWNS.map((g) => (
              <li key={g.name} className={s.archItem}>
                <div className={s.arch} data-tone={g.tone}>
                  <Artwork slug={g.art} alt={`${g.name}, ${g.line}`} mode="tint" inks={g.inks} className={s.archArt} />
                </div>
                <h3>{g.name}</h3>
                <p className={s.archLine}>{g.line}</p>
                <p className={s.archMeta}>{g.designer}</p>
                <span className={s.archPrice}>{g.price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={ogee}
            palette={LACE}
            fit="grid"
            cellSize={56}
            seed="veil-lace"
            options={{ frequency: 0.5 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- DESIGNERS */}
        <section id="designers" className={s.designers} aria-labelledby="designers-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Designers</p>
            <h2 id="designers-h">Six houses, and our own label</h2>
            <p className={s.secNote}>
              Chosen for how their gowns are made on the inside as much as how
              they look. Every one makes to order in the full size range.
            </p>
          </div>
          <ul className={s.houses}>
            {DESIGNERS.map((d) => (
              <li key={d.name}>
                <h3>{d.name}</h3>
                <span className={s.houseFrom}>{d.from}</span>
                <p className={s.houseKnown}>{d.known}</p>
                <span className={s.houseSizes}>{`Sizes ${d.sizes}`}</span>
                <span className={s.housePrice}>{d.price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- FITTINGS */}
        <section id="fittings" className={s.fittings} aria-labelledby="fittings-h">
          <div className={s.fitInner}>
            <div className={s.fitSide}>
              <div className={s.secHead}>
                <p className={s.secKick}>Fittings and alterations</p>
                <h2 id="fittings-h">
                  From the order <em>to the aisle.</em>
                </h2>
                <p className={s.secNote}>
                  All alterations are done in our own workroom, by the two
                  seamstresses who will know your gown by the third fitting.
                </p>
              </div>
              <Artwork
                slug="veil-and-vow-bouquet"
                alt=""
                mode="tint"
                inks={['var(--ink)', 'var(--rose)']}
                className={s.fitBouquet}
              />
            </div>

            <div className={s.fitMain}>
              <ol className={s.timeline}>
                {TIMELINE.map((t) => (
                  <li key={t.when}>
                    <span className={s.tlWhen}>{t.when}</span>
                    <h3>{t.title}</h3>
                    <p>{t.body}</p>
                  </li>
                ))}
              </ol>

              <div className={s.alter}>
                <h3 className={s.alterHead}>Alteration prices</h3>
                <dl className={s.alterList}>
                  {ALTERATIONS.map(([what, price]) => (
                    <div key={what}>
                      <dt>{what}</dt>
                      <dd>{price}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.alterNote}>Most gowns need three items. The total is written on your quote at the first fitting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookCard}>
            <div className={s.bookInfo}>
              <p className={s.secKick}>Book</p>
              <h2 id="book-h">
                Book an appointment <em>at the boutique.</em>
              </h2>
              <p className={s.bookLede}>
                Weekday appointments are free. Saturdays are $40, taken off
                your gown if you order. We confirm within a day.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.addr}>9 Orchard Lane, upstairs from the florist. There is a lift, and parking on Mercer Street.</p>
              <ul className={s.contact}>
                <li>
                  <a href="tel:+15550167720">(555) 016-7720</a>
                </li>
                <li>
                  <a href="mailto:hello@veilandvow.example">hello@veilandvow.example</a>
                </li>
              </ul>
            </div>

            <form className={s.form} action="#">
              <label className={s.field}>
                <span>Your name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label className={s.field}>
                <span>Wedding date</span>
                <input type="date" name="wedding" />
              </label>
              <label className={s.field}>
                <span>Appointment date</span>
                <input type="date" name="visit" required />
              </label>
              <label className={s.field}>
                <span>Guests coming</span>
                <select name="guests" defaultValue="2">
                  <option value="0">Just me</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                </select>
              </label>
              <label className={s.field}>
                <span>Budget for the gown</span>
                <select name="budget" defaultValue="mid">
                  <option value="low">Under $1,800</option>
                  <option value="mid">$1,800-$2,800</option>
                  <option value="high">Over $2,800</option>
                  <option value="open">Not sure yet</option>
                </select>
              </label>
              <label className={`${s.field} ${s.wide}`}>
                <span>What you have liked so far</span>
                <textarea name="notes" rows={3} />
              </label>
              <button className={s.btn} type="submit">Request the appointment</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Veil &amp; Vow</p>
          <p className={s.footTag}>Bridal gowns, veils and fittings, 9 Orchard Lane.</p>
          <nav className={s.footNav} aria-label="Footer">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className={s.footFine}>
          <p>A fictional bridal boutique. Gowns, designers and prices are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
