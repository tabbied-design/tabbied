import { TabbiedPattern } from 'tabbied/react';
import { bokeh, grainfall } from 'tabbied/patterns';
import s from './grain-and-glow.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Grain & Glow: Skincare studio, Orchard Street',
  description:
    'Grain & Glow is a one-room skincare studio on Orchard Street. The facials with their lengths and prices, the products on the shelf, the esthetician, and how to book.',
};

/* Site colors, the same five as the stylesheet's root rule. The glow takes
   `transparent` first so its lights sit on the rose disc; the grain sits on
   the wall. */
const ROSE = '#C07A6B';
const GRAY = '#9C8F8A';
const PALE = '#EEDFDA';
const BLUSH = '#F8F2EF';

const GLOW = ['transparent', BLUSH, PALE];
const GRAIN = ['transparent', ROSE, GRAY, PALE];

const NAV = [
  ['Facials', '#menu'],
  ['The shelf', '#shelf'],
  ['Esthetician', '#esthetician'],
  ['Questions', '#questions'],
  ['Book', '#book'],
];

type Item = { name: string; time: string; price: string; note: string };

const FACIALS: Item[] = [
  {
    name: 'The Grain & Glow facial',
    time: '60 min',
    price: '$110',
    note: 'Double cleanse, enzyme exfoliation, steam, extractions only where needed, a mask chosen on the day and a long face, neck and shoulder massage.',
  },
  {
    name: 'Calm facial',
    time: '50 min',
    price: '$95',
    note: 'For sensitive, reactive or rosacea-prone skin. No steam, no scrubs, cool stones and a soothing oat mask.',
  },
  {
    name: 'Deep clean facial',
    time: '75 min',
    price: '$125',
    note: 'Our longest facial, for congested skin: a softening peel, careful extractions and a clay mask to finish.',
  },
  {
    name: 'Brightening facial',
    time: '60 min',
    price: '$120',
    note: 'A lactic acid exfoliation and a vitamin C serum for dull or uneven skin, with massage.',
  },
  {
    name: 'Express facial',
    time: '30 min',
    price: '$60',
    note: 'Cleanse, exfoliate, mask and moisturize, for a lunch break or the day before an event.',
  },
  {
    name: 'Back facial',
    time: '45 min',
    price: '$85',
    note: 'The same care as a facial, for the skin you cannot reach. Popular before weddings.',
  },
];

const ADDONS: Item[] = [
  { name: 'LED light', time: '15 min', price: '$30', note: 'Red for calm, blue for breakouts.' },
  { name: 'Lymphatic massage', time: '15 min', price: '$25', note: 'For puffiness around the eyes and jaw.' },
  { name: 'Hand and arm massage', time: '10 min', price: '$15', note: 'While the mask sets.' },
  { name: 'Brow tidy', time: '10 min', price: '$18', note: 'Tweezers only, no wax.' },
];

const SERIES: Item[] = [
  { name: 'Lactic peel', time: '45 min', price: '$140', note: 'Gentle and hydrating; no downtime.' },
  { name: 'Mandelic peel', time: '45 min', price: '$150', note: 'For darker skin tones and breakouts.' },
  { name: 'Four facials, booked together', time: 'Any four', price: '$400', note: 'Use them within six months. Saves $40.' },
];

const SHELF = [
  {
    art: 'grain-and-glow-pump',
    alt: 'A pump bottle of cleanser',
    inks: ['var(--ink)', 'var(--blush)'],
    name: 'Oat milk cleanser',
    size: '200 ml',
    price: '$34',
    note: 'Used in every facial',
  },
  {
    art: 'grain-and-glow-jar',
    alt: 'A small glass jar of barrier cream',
    inks: ['var(--ink)', 'var(--pale)'],
    name: 'Barrier cream',
    size: '50 ml',
    price: '$48',
    note: 'For dry and sensitive skin',
  },
  {
    art: 'grain-and-glow-pump',
    alt: 'A pump bottle of daily lotion',
    inks: ['var(--rose)', 'var(--blush)'],
    name: 'Daily lotion SPF 30',
    size: '100 ml',
    price: '$38',
    note: 'Mineral filters, no white cast',
  },
  {
    art: 'grain-and-glow-jar',
    alt: 'A small glass jar of night balm',
    inks: ['var(--rose)', 'var(--blush)'],
    name: 'Night balm',
    size: '30 ml',
    price: '$52',
    note: 'Squalane and shea',
  },
  {
    art: 'grain-and-glow-pump',
    alt: 'A pump bottle of body lotion',
    inks: ['var(--ink)', 'var(--rose)'],
    name: 'Body lotion',
    size: '300 ml',
    price: '$30',
    note: 'Unscented, for the whole family',
  },
  {
    art: 'grain-and-glow-jar',
    alt: 'A small glass jar of eye cream',
    inks: ['var(--ink)', 'var(--rose)'],
    name: 'Eye cream',
    size: '15 ml',
    price: '$40',
    note: 'Caffeine and peptides',
  },
];

const QUESTIONS = [
  {
    q: 'It is my first facial. Which one should I book?',
    a: 'The Grain & Glow facial. We look at your skin at the start and adjust it on the day, so there is no wrong choice.',
  },
  {
    q: 'Can I have a facial while pregnant?',
    a: 'Yes. Tell us when you book and we leave out retinoids, strong acids and LED, and prop you up with pillows.',
  },
  {
    q: 'Will you try to sell me products?',
    a: 'No. We write down what we used and what we would suggest, and you can buy it here, somewhere else, or not at all.',
  },
  {
    q: 'Should I come with makeup on?',
    a: 'It is fine either way; the first step is a cleanse. Skip retinol for two nights before a peel.',
  },
];

const HOURS = [
  ['Tuesday - Friday', '10 am - 7 pm'],
  ['Saturday', '9 am - 4 pm'],
  ['Sunday and Monday', 'Closed'],
];

export default function GrainAndGlowPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span>Grain</span>
          <em>&amp;</em>
          <span>Glow</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#book">Book a facial</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------- HERO
            A rose disc with a slow glow drawn in it, and two of the house
            products standing on a ledge in front. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Skincare studio, 14 Orchard Street</p>
            <h1 className={s.heroTitle} id="hero-h">
              Skin care,
              <br />
              <em>slowly.</em>
            </h1>
            <p className={s.lede}>
              One room, one esthetician and an hour where nothing is rushed.
              Facials for real skin, with the products we use on the shelf by
              the door if you want to take them home.
            </p>
            <div className={s.heroActions}>
              <a className={s.button} href="#book">Book a facial</a>
              <a className={s.textLink} href="#menu">Read the menu</a>
            </div>
          </div>

          <div className={s.heroArt}>
            <div className={s.glow} aria-hidden="true">
              <TabbiedPattern
                pattern={bokeh}
                palette={GLOW}
                options={{ frequency: 0.9 }}
                fit="grid"
                cellSize={64}
                seed="grain-glow"
                redrawInterval={8800}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.ledge}>
              <Artwork
                slug="grain-and-glow-pump"
                alt="A pump bottle of the house cleanser"
                mode="tint"
                inks={['var(--ink)', 'var(--blush)']}
                className={s.heroPump}
              />
              <Artwork
                slug="grain-and-glow-jar"
                alt="A glass jar of the house barrier cream"
                mode="tint"
                inks={['var(--ink)', 'var(--pale)']}
                className={s.heroJar}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- MENU
            Set like a printed card: dotted leaders from each facial to its
            length and price, and a short line under each in italic. */}
        <section id="menu" className={s.menuSec} aria-labelledby="menu-h">
          <div className={s.card}>
            <div className={s.cardHead}>
              <p className={s.kicker}>The treatment menu</p>
              <h2 id="menu-h">Facials, add-ons and peels</h2>
              <p className={s.cardNote}>Prices include tax. Every facial ends with SPF and a cup of tea.</p>
            </div>

            <div className={s.cardCols}>
              <div className={s.course}>
                <h3>Facials</h3>
                <ul className={s.items}>
                  {FACIALS.map((f) => (
                    <li key={f.name} className={s.item}>
                      <div className={s.itemLine}>
                        <span className={s.itemName}>{f.name}</span>
                        <span className={s.itemTime}>{f.time}</span>
                        <span className={s.itemPrice}>{f.price}</span>
                      </div>
                      <p className={s.itemNote}>{f.note}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={s.courseStack}>
                <div className={s.course}>
                  <h3>Add to any facial</h3>
                  <ul className={s.items}>
                    {ADDONS.map((a) => (
                      <li key={a.name} className={s.item}>
                        <div className={s.itemLine}>
                          <span className={s.itemName}>{a.name}</span>
                          <span className={s.itemTime}>{a.time}</span>
                          <span className={s.itemPrice}>{a.price}</span>
                        </div>
                        <p className={s.itemNote}>{a.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.course}>
                  <h3>Peels and series</h3>
                  <ul className={s.items}>
                    {SERIES.map((p) => (
                      <li key={p.name} className={s.item}>
                        <div className={s.itemLine}>
                          <span className={s.itemName}>{p.name}</span>
                          <span className={s.itemTime}>{p.time}</span>
                          <span className={s.itemPrice}>{p.price}</span>
                        </div>
                        <p className={s.itemNote}>{p.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ SHELF
            The house line on a plank against a grained wall. The same two
            photographs, tinted six ways, one per product. */}
        <section id="shelf" className={s.shelfSec} aria-labelledby="shelf-h">
          <div className={s.wall} aria-hidden="true">
            <TabbiedPattern
              pattern={grainfall}
              palette={GRAIN}
              options={{ frequency: 0.6 }}
              fit="grid"
              cellSize={56}
              seed="grain-wall"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.shelfHead}>
            <p className={s.kicker}>The shelf</p>
            <h2 id="shelf-h">Six things we make, and use on you</h2>
            <p className={s.shelfNote}>
              Mixed in small batches by a lab two towns over, unscented unless
              the name says otherwise. Ask for a sample of anything.
            </p>
          </div>
          <ul className={s.shelf}>
            {SHELF.map((p) => (
              <li key={p.name} className={s.product}>
                <div className={s.productStage}>
                  <Artwork slug={p.art} alt={p.alt} mode="tint" inks={p.inks} className={s.productArt} />
                </div>
                <div className={s.label}>
                  <h3>{p.name}</h3>
                  <p className={s.labelMeta}>
                    <span>{p.size}</span>
                    <span className={s.labelPrice}>{p.price}</span>
                  </p>
                  <p className={s.labelNote}>{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ ESTHETICIAN */}
        <section id="esthetician" className={s.sec} aria-labelledby="esthetician-h">
          <div className={s.about}>
            <div className={s.portraitFrame}>
              <Artwork
                slug="grain-and-glow-esthetician"
                alt="Noor Haddad, the esthetician, smiling, her hair tied back"
                mode="tint"
                inks={['var(--ink)', 'var(--blush)']}
                className={s.portrait}
              />
            </div>
            <div className={s.aboutText}>
              <p className={s.kicker}>Your esthetician</p>
              <h2 id="esthetician-h">Noor Haddad</h2>
              <p className={s.aboutRole}>Licensed esthetician, twelve years in practice</p>
              <blockquote className={s.quote}>
                <p>Most skin needs less than it is given. My job is to work out which less.</p>
              </blockquote>
              <p>
                Noor trained in a dermatology clinic before opening Grain &amp;
                Glow in 2019, and every facial here is hers. She keeps notes
                on each visit, so the second facial starts where the first one
                ended.
              </p>
              <ul className={s.creds}>
                <li>State licensed esthetician</li>
                <li>Advanced chemical peels</li>
                <li>Skin of color certificate</li>
                <li>Oncology esthetics trained</li>
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.qHead}>
            <p className={s.kicker}>Before you come</p>
            <h2 id="questions-h">Questions people ask</h2>
          </div>
          <div className={s.faq}>
            {QUESTIONS.map((item) => (
              <details key={item.q} className={s.faqItem}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- BOOK */}
        <section id="book" className={s.bookSec} aria-labelledby="book-h">
          <div className={s.book}>
            <div className={s.bookInfo}>
              <p className={s.kicker}>Book</p>
              <h2 id="book-h">Book a facial</h2>
              <p className={s.bookLede}>
                Send the form and we confirm by text within the day. A $25
                deposit holds the time and comes off the bill.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.address}>
                14 Orchard Street, upstairs from the florist
              </p>
              <p className={s.contactLine}>
                <a href="tel:+15550175512">(555) 017-5512</a>
              </p>
              <p className={s.contactLine}>
                <a href="mailto:hello@grainandglow.example">hello@grainandglow.example</a>
              </p>
              <p className={s.policy}>
                Free to move or cancel with 48 hours notice. Later than that,
                the deposit is kept.
              </p>
            </div>
            <form className={s.form} action="#">
              <label className={s.field}>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span>Mobile</span>
                  <input type="tel" name="phone" autoComplete="tel" required />
                </label>
                <label className={s.field}>
                  <span>Preferred day</span>
                  <input type="date" name="date" />
                </label>
              </div>
              <label className={s.field}>
                <span>Facial</span>
                <select name="facial" defaultValue="signature">
                  <option value="signature">The Grain &amp; Glow facial, 60 min</option>
                  <option value="calm">Calm facial, 50 min</option>
                  <option value="deep">Deep clean facial, 75 min</option>
                  <option value="bright">Brightening facial, 60 min</option>
                  <option value="express">Express facial, 30 min</option>
                  <option value="back">Back facial, 45 min</option>
                  <option value="peel">A peel</option>
                </select>
              </label>
              <label className={s.field}>
                <span>Anything we should know about your skin</span>
                <textarea name="notes" rows={3} />
              </label>
              <button className={s.button} type="submit">Request the time</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footMark}>Grain &amp; Glow</p>
        <p className={s.footAddr}>14 Orchard Street, upstairs from the florist</p>
        <div className={s.footFine}>
          <p>A fictional skincare studio. Treatments, prices, products and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live; the bottles and the portrait are tinted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
