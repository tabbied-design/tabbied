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
const HEM = ['transparent', ROSE, TAUPE];

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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--ivory': '#fbf8f4',
        '--ink': '#26201f',
        '--taupe': '#b08a6e',
        '--rose': '#c9a7b8',
        '--gray': '#9d9491',
        '--pale': '#efe8e1',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="ivory,ink,taupe,rose,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Libre+Bodoni:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Mulish:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.text" data-edit-max="60">Veil</span>
          <span data-edit="bar.markAmp" data-edit-max="60" className={s.markAmp}>&amp;</span>
          <span data-edit="bar.text2" data-edit-max="60">Vow</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Book an appointment</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The gown in a tall arch of falling petals, the bouquet at its
            foot. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Bridal boutique, 9 Orchard Lane</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>
              Find the dress <em>in one unhurried afternoon.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Private appointments, ninety minutes each, with a stylist who
              has read your notes before you arrive. Gowns from six designers,
              sizes 2-30, and a workroom that fits them until the week of the
              wedding.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Book an appointment</a>
              <a data-edit="hero.textLink" data-edit-max="28" className={s.textLink} href="#gowns">See the gowns</a>
            </div>
            <dl className={s.facts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">90 min</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>private, up to four guests</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">140</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>gowns to try on</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">2-30</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>sample sizes in store</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroArt}>
            <div className={s.heroArch}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,0,5,2" className={s.archField} aria-hidden="true">
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
            <p data-edit="appointment.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>The appointment</p>
            <h2 data-edit="appointment.title" data-edit-format="emphasis" data-edit-max="60" id="journey-h">
              Four steps, <em>and only one decision.</em>
            </h2>
          </div>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.no} className={s.step}>
                <span data-edit={`appointment.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{st.no}</span>
                <h3 data-edit={`appointment.title.${i}`} data-edit-max="40">{st.title}</h3>
                <span data-edit={`appointment.stepWhen.${i}`} data-edit-max="60" className={s.stepWhen}>{st.when}</span>
                <p data-edit={`appointment.body.${i}`} data-edit-max="240" data-edit-multiline>{st.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- GOWNS
            A row of tall arches, the same photograph in each ground's inks. */}
        <section id="gowns" className={s.gowns} aria-labelledby="gowns-h">
          <div className={s.gownsHead}>
            <div className={s.secHead}>
              <p data-edit="gowns.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Gowns</p>
              <h2 data-edit="gowns.title" data-edit-format="emphasis" data-edit-max="60" id="gowns-h">
                A few from the rail <em>this season.</em>
              </h2>
            </div>
            <p data-edit="gowns.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every gown is a sample to try on; yours is made to order in your
              size. Prices include the first fitting.
            </p>
          </div>
          <ul className={s.arches}>
            {GOWNS.map((g, i) => (
              <li key={g.name} className={s.archItem}>
                <div className={s.arch} data-tone={g.tone}>
                  <Artwork slug={g.art} alt={`${g.name}, ${g.line}`} mode="tint" inks={g.inks} className={s.archArt} />
                </div>
                <h3 data-edit={`gowns.title.${i}`} data-edit-max="40">{g.name}</h3>
                <p data-edit={`gowns.archLine.${i}`} data-edit-max="240" data-edit-multiline className={s.archLine}>{g.line}</p>
                <p data-edit={`gowns.archMeta.${i}`} data-edit-max="240" data-edit-multiline className={s.archMeta}>{g.designer}</p>
                <span data-edit={`gowns.archPrice.${i}`} data-edit-max="60" className={s.archPrice}>{g.price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,5,2" className={s.band} aria-hidden="true">
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
            <p data-edit="designers.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Designers</p>
            <h2 data-edit="designers.title" data-edit-max="60" id="designers-h">Six houses, and our own label</h2>
            <p data-edit="designers.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Chosen for how their gowns are made on the inside as much as how
              they look. Every one makes to order in the full size range.
            </p>
          </div>
          <ul className={s.houses}>
            {DESIGNERS.map((d, i) => (
              <li key={d.name}>
                <h3 data-edit={`designers.title2.${i}`} data-edit-max="40">{d.name}</h3>
                <span data-edit={`designers.houseFrom.${i}`} data-edit-max="60" className={s.houseFrom}>{d.from}</span>
                <p data-edit={`designers.houseKnown.${i}`} data-edit-max="240" data-edit-multiline className={s.houseKnown}>{d.known}</p>
                <span className={s.houseSizes}>{`Sizes ${d.sizes}`}</span>
                <span data-edit={`designers.housePrice.${i}`} data-edit-max="60" className={s.housePrice}>{d.price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- FITTINGS */}
        <section id="fittings" className={s.fittings} aria-labelledby="fittings-h">
          <div className={s.fitInner}>
            <div className={s.fitSide}>
              <div className={s.secHead}>
                <p data-edit="fittings.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Fittings and alterations</p>
                <h2 data-edit="fittings.title" data-edit-format="emphasis" data-edit-max="60" id="fittings-h">
                  From the order <em>to the aisle.</em>
                </h2>
                <p data-edit="fittings.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  All alterations are done in our own workroom, by the two
                  seamstresses who will know your gown by the third fitting.
                </p>
              </div>
              <div className={s.fitArch}>
                <div data-edit-pattern="fittings.field" data-edit-roles="transparent,3,5,2" className={s.fitLace} aria-hidden="true">
                  <TabbiedPattern
                    pattern={ogee}
                    palette={LACE}
                    fit="grid"
                    cellSize={44}
                    seed="veil-veil"
                    options={{ frequency: 0.6 }}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="veil-and-vow-bouquet"
                  alt=""
                  mode="tint"
                  inks={['var(--ink)', 'var(--rose)']}
                  className={s.fitBouquet}
                />
              </div>
            </div>

            <div className={s.fitMain}>
              <ol className={s.timeline}>
                {TIMELINE.map((t, i) => (
                  <li key={t.when}>
                    <span data-edit={`fittings.tlWhen.${i}`} data-edit-max="60" className={s.tlWhen}>{t.when}</span>
                    <h3 data-edit={`fittings.title.${i}`} data-edit-max="40">{t.title}</h3>
                    <p data-edit={`fittings.body.${i}`} data-edit-max="240" data-edit-multiline>{t.body}</p>
                  </li>
                ))}
              </ol>

              <div className={s.alter}>
                <h3 data-edit="fittings.alterHead" data-edit-max="40" className={s.alterHead}>Alteration prices</h3>
                <dl className={s.alterList}>
                  {ALTERATIONS.map(([what, price], i) => (
                    <div key={what}>
                      <dt data-edit={`fittings.term.${i}`} data-edit-max="28">{what}</dt>
                      <dd data-edit={`fittings.body2.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="fittings.alterNote" data-edit-max="240" data-edit-multiline className={s.alterNote}>Most gowns need three items. The total is written on your quote at the first fitting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div data-edit-pattern="book.field" data-edit-roles="transparent,0,5,2" className={s.bookPetals} aria-hidden="true">
            <TabbiedPattern
              pattern={petalcut}
              palette={PETALS}
              fit="grid"
              cellSize={72}
              seed="book-petals"
              options={{ frequency: 0.35 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.bookCard}>
            <div className={s.bookInfo}>
              <p data-edit="book.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Book</p>
              <h2 data-edit="book.title" data-edit-format="emphasis" data-edit-max="60" id="book-h">
                Book an appointment <em>at the boutique.</em>
              </h2>
              <p data-edit="book.bookLede" data-edit-max="240" data-edit-multiline className={s.bookLede}>
                Weekday appointments are free. Saturdays are $40, taken off
                your gown if you order. We confirm within a day.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="book.addr" data-edit-max="240" data-edit-multiline className={s.addr}>9 Orchard Lane, upstairs from the florist. There is a lift, and parking on Mercer Street.</p>
              <ul className={s.contact}>
                <li>
                  <a data-edit="book.link" data-edit-max="28" href="tel:+15550167720">(555) 016-7720</a>
                </li>
                <li>
                  <a data-edit="book.link2" data-edit-max="28" href="mailto:hello@veilandvow.example">hello@veilandvow.example</a>
                </li>
              </ul>
            </div>

            <form className={s.form} action="#">
              <label className={s.field}>
                <span data-edit="book.text" data-edit-max="60">Your name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span data-edit="book.text2" data-edit-max="60">Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label className={s.field}>
                <span data-edit="book.text3" data-edit-max="60">Wedding date</span>
                <input type="date" name="wedding" />
              </label>
              <label className={s.field}>
                <span data-edit="book.text4" data-edit-max="60">Appointment date</span>
                <input type="date" name="visit" required />
              </label>
              <label className={s.field}>
                <span data-edit="book.text5" data-edit-max="60">Guests coming</span>
                <select name="guests" defaultValue="2">
                  <option value="0">Just me</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                </select>
              </label>
              <label className={s.field}>
                <span data-edit="book.text6" data-edit-max="60">Budget for the gown</span>
                <select name="budget" defaultValue="mid">
                  <option value="low">Under $1,800</option>
                  <option value="mid">$1,800-$2,800</option>
                  <option value="high">Over $2,800</option>
                  <option value="open">Not sure yet</option>
                </select>
              </label>
              <label className={`${s.field} ${s.wide}`}>
                <span data-edit="book.text7" data-edit-max="60">What you have liked so far</span>
                <textarea name="notes" rows={3} />
              </label>
              <button data-edit="book.btn" data-edit-max="24" className={s.btn} type="submit">Request the appointment</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2" className={s.footHem} aria-hidden="true">
          <TabbiedPattern
            pattern={petalcut}
            palette={HEM}
            fit="grid"
            cellSize={32}
            seed="hem"
            options={{ frequency: 0.7 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footTop}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Veil &amp; Vow</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Bridal gowns, veils and fittings, 9 Orchard Lane.</p>
          <nav className={s.footNav} aria-label="Footer">
            {NAV.map(([label, href], i) => (
              <a data-edit={`footer.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional bridal boutique. Gowns, designers and prices are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
