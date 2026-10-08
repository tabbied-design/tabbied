import { TabbiedPattern } from 'tabbied/react';
import { bias } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './bias-cut-styling.module.css';

export const metadata = {
  title: 'Bias Cut Styling: Personal stylist and wardrobe consultant',
  description:
    'Bias Cut builds capsule wardrobes: a closet edit at home, a shopping trip with a list, styling for the occasions that matter, and a lookbook of every outfit. Packages from $280.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Bias is cloth
   cut corner to corner: it fills the hero on a diagonal, sits beside the
   packages as a swatch trimmed with pinking shears, runs as a band cut on
   the slant and edges the footer. Everything else is cut at the same 45
   degrees in CSS. */
const OAT = '#efe6da';
const INK = '#1a1820';
const COBALT = '#2a46b0';
const VERMILION = '#e0532f';
const BLUSH = '#f1b2b8';

const BOLT = ['transparent', INK, COBALT, VERMILION, BLUSH, COBALT];
const SWATCH = ['transparent', COBALT, BLUSH, OAT, COBALT, VERMILION];
const SELVEDGE = ['transparent', VERMILION, BLUSH, COBALT, OAT, INK];

const NAV = [
  ['The capsule', '#capsule'],
  ['Services', '#services'],
  ['Packages', '#packages'],
  ['How it works', '#process'],
  ['Book', '#book'],
];

/* The capsule: twelve pieces, each with a swatch cut on the bias. */
const PIECES = [
  { name: 'Navy wool blazer', kind: 'Jacket', swatch: 'inkCobalt' },
  { name: 'Camel overcoat', kind: 'Coat', swatch: 'oatVermilion' },
  { name: 'White poplin shirt', kind: 'Top', swatch: 'oatBlush' },
  { name: 'Striped breton', kind: 'Top', swatch: 'cobaltOat' },
  { name: 'Black fine-knit crew', kind: 'Knit', swatch: 'inkOat' },
  { name: 'Cream cable cardigan', kind: 'Knit', swatch: 'blushOat' },
  { name: 'Straight dark jeans', kind: 'Trousers', swatch: 'cobaltInk' },
  { name: 'Wide-leg charcoal trousers', kind: 'Trousers', swatch: 'inkBlush' },
  { name: 'Bias-cut slip skirt', kind: 'Skirt', swatch: 'vermilionBlush' },
  { name: 'Silk shirt dress', kind: 'Dress', swatch: 'blushVermilion' },
  { name: 'White leather trainers', kind: 'Shoes', swatch: 'oatInk' },
  { name: 'Black loafers', kind: 'Shoes', swatch: 'inkVermilion' },
];

const SERVICES = [
  ['Closet edit', '3 hours, at home', 'We try everything on and sort it four ways: keep, tailor, sell, donate. What stays is photographed in the outfits it already makes.', 'from $280'],
  ['Shopping trip', '4 hours, in town', 'With a list from the edit. Fitting rooms booked ahead at four or five shops, and no commission from any of them, ever.', 'from $360'],
  ['Event styling', 'One occasion', 'A wedding, an interview, a speech, a gala. One outfit planned head to toe, a fitting with the tailor, and a backup.', 'from $240'],
  ['Color and fit', '90 minutes, daylight', 'Fabric drapes by the window: which colors, necklines, rises and lengths work for you, written on one card for your wallet.', '$180'],
];

const PACKAGES = [
  { name: 'The Edit', price: '$280', time: 'One visit', cta: 'Book The Edit', items: ['Closet edit, 3 hours', 'A list of the ten gaps worth filling', 'Tailoring notes for every keep', 'Donation drop-off arranged'] },
  { name: 'The Capsule', price: '$690', time: 'About two weeks', cta: 'Book The Capsule', items: ['Everything in The Edit', 'A 4-hour shopping trip', 'A 30-piece capsule with 40 outfits', 'Lookbook, photographed on you'] },
  { name: 'The Season', price: '$1,450', time: 'Three months', cta: 'Book The Season', items: ['Two capsules, spring and autumn', 'Event styling for one occasion', 'Tailor and alterations managed', 'Text support for the season'] },
];

const STEPS = [
  ['Questionnaire', 'Your work, your week, what you are tired of wearing, and three photos of outfits you liked yourself in.'],
  ['The edit', 'At your closet, with coffee. Most people keep about half and love it more afterwards.'],
  ['The trip', 'Short, planned and booked. We buy fewer things than you expect and better than you planned.'],
  ['The lookbook', 'Every outfit photographed on you, sorted by occasion, delivered within a week.'],
];

const QUOTES = [
  ['I own half as many clothes and get dressed in four minutes.', 'Dana R., architect'],
  ['She found the trousers I had been looking for since 2014, in a shop I walk past daily.', 'Priya M., barrister'],
];

const SERVICE_PICKS = ['The Edit', 'The Capsule', 'The Season', 'Event styling', 'Color and fit'];

export default function BiasCutStylingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--oat': '#efe6da',
        '--ink': '#1a1820',
        '--cobalt': '#2a46b0',
        '--vermilion': '#e0532f',
        '--blush': '#f1b2b8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="oat,ink,cobalt,vermilion,blush"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;1,400&family=Jost:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Bias Cut</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Styling</span>
        </a>
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
        {/* HERO: the words on the left, a bolt of cloth cut on the bias. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="intro.field" data-edit-roles="transparent,1,2,3,4,2" className={s.heroField} aria-hidden="true">
            <TabbiedPattern pattern={bias} palette={BOLT} fit="grid" cellSize={76} seed="biascut-bolt" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Personal stylist and wardrobe consultant</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Fewer clothes, <em>better worn.</em>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I edit what you own, shop for what is missing, and leave you with
              a capsule: thirty pieces that all go together, photographed in
              every outfit they make.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#book">Book a closet edit</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#packages">See the packages</a>
            </div>
          </div>
          <div className={s.tag}>
            <p data-edit="intro.tagNo" data-edit-max="240" data-edit-multiline className={s.tagNo}>Capsule no. 214</p>
            <p data-edit="intro.tagBig" data-edit-max="240" data-edit-multiline className={s.tagBig}>32 pieces, 61 outfits</p>
            <p data-edit="intro.tagNote" data-edit-max="240" data-edit-multiline className={s.tagNote}>Autumn, for a lawyer who cycles to work.</p>
          </div>
        </section>

        {/* CAPSULE: twelve pieces on a grid, each a swatch on the bias. */}
        <section id="capsule" className={s.capsule} aria-labelledby="capsule-h">
          <div className={s.capsuleHead}>
            <p data-edit="capsule.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The capsule</p>
            <h2 data-edit="capsule.title" data-edit-format="emphasis" data-edit-max="60" id="capsule-h" className={s.secTitle}>
              Twelve pieces, <em>forty outfits.</em>
            </h2>
            <p data-edit="capsule.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
              A real capsule from last spring, for an architect who travels twice
              a month. Every top works with every bottom; every layer goes over
              every top. That is the whole trick, and it takes an afternoon to
              get right.
            </p>
          </div>
          <ol className={s.pieces}>
            {PIECES.map((p, i) => (
              <li key={p.name} className={s.piece}>
                <span className={`${s.swatch} ${s[p.swatch]}`} aria-hidden="true" />
                <p className={s.pieceNo}>{String(i + 1).padStart(2, '0')}</p>
                <h3 data-edit={`capsule.pieceName.${i}`} data-edit-max="40" className={s.pieceName}>{p.name}</h3>
                <p data-edit={`capsule.pieceKind.${i}`} data-edit-max="240" data-edit-multiline className={s.pieceKind}>{p.kind}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* SERVICES */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.servicesGrid}>
            <div className={s.servicesHead}>
              <p data-edit="services.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Services</p>
              <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>Booked one at a time, or as a package</h2>
              <p data-edit="services.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
                I am Odile Varga. I spent eleven years buying womenswear and
                menswear for department stores before I started dressing people
                instead of rails.
              </p>
            </div>
            <ul className={s.services}>
              {SERVICES.map(([name, time, text, price], i) => (
                <li key={name} className={s.service}>
                  <p className={s.serviceNo}>{String(i + 1).padStart(2, '0')}</p>
                  <h3 data-edit={`services.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{name}</h3>
                  <p data-edit={`services.serviceTime.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceTime}>{time}</p>
                  <p data-edit={`services.serviceText.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceText}>{text}</p>
                  <p data-edit={`services.servicePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.servicePrice}>{price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,3,4,2" className={s.band} aria-hidden="true">
          <TabbiedPattern pattern={bias} palette={BOLT} fit="grid" cellSize={56} seed="biascut-band" style={{ position: 'absolute', inset: 0 }} />
        </div>

        {/* PACKAGES */}
        <section id="packages" className={s.packages} aria-labelledby="packages-h">
          <div className={s.packagesInner}>
            <div className={s.packagesHead}>
              <div>
                <p data-edit="packages.eyebrowDark" data-edit-max="240" data-edit-multiline className={s.eyebrowDark}>Packages</p>
                <h2 data-edit="packages.title" data-edit-format="emphasis" data-edit-max="60" id="packages-h" className={s.packagesTitle}>
                  Three ways to <em>start over.</em>
                </h2>
                <p data-edit="packages.packagesLead" data-edit-max="240" data-edit-multiline className={s.packagesLead}>
                  Prices are for one person within ten miles of the studio. Pay half
                  to book and half when the lookbook arrives.
                </p>
              </div>
              <div data-edit-pattern="packages.field" data-edit-roles="transparent,2,4,0,2,3" className={s.pinked} aria-hidden="true">
                <TabbiedPattern pattern={bias} palette={SWATCH} fit="grid" cellSize={44} seed="biascut-swatch" style={{ position: 'absolute', inset: 0 }} />
              </div>
            </div>
            <ul className={s.packList}>
              {PACKAGES.map((p, i) => (
                <li key={p.name} className={i === 1 ? `${s.pack} ${s.packPick}` : s.pack}>
                  <h3 data-edit={`packages.packName.${i}`} data-edit-max="40" className={s.packName}>{p.name}</h3>
                  <p data-edit={`packages.packPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{p.price}</p>
                  <p data-edit={`packages.packTime.${i}`} data-edit-max="240" data-edit-multiline className={s.packTime}>{p.time}</p>
                  <ul className={s.packItems}>
                    {p.items.map((it, i2) => (
                      <li data-edit={`packages.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                    ))}
                  </ul>
                  <a data-edit={`packages.packLink.${i}`} data-edit-max="28" className={s.packLink} href="#book">{p.cta}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className={s.sec} aria-labelledby="process-h">
          <p data-edit="process.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>How it works</p>
          <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>From the questionnaire to the lookbook</h2>
          <ol className={s.steps}>
            {STEPS.map(([title, text], i) => (
              <li key={title} className={s.step}>
                <p className={s.stepNo}>{i + 1}</p>
                <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                <p data-edit={`process.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
              </li>
            ))}
          </ol>
          <div className={s.quotes}>
            {QUOTES.map(([q, who], i) => (
              <figure key={who} className={s.quote}>
                <blockquote data-edit={`process.quote.${i}`} data-edit-max="240" data-edit-multiline>{q}</blockquote>
                <figcaption data-edit={`process.caption.${i}`} data-edit-max="120" data-edit-multiline>{who}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <p data-edit="book.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Book</p>
              <h2 data-edit="book.title" data-edit-format="emphasis" data-edit-max="60" id="book-h" className={s.secTitle}>
                Start with a <em>twenty-minute call.</em>
              </h2>
              <p data-edit="book.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
                Free, by phone or video. We talk about your week and your wardrobe,
                and I tell you honestly whether you need me.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>Studio 3, 21 Garnet Yard, by appointment</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>(555) 017-2246</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>hello@biascut.example</dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Hours</dt>
                  <dd data-edit="book.body4" data-edit-max="200" data-edit-multiline>Monday to Saturday, 9-6; Thursday until 8</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="bc-name">Name</label>
                <input id="bc-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="bc-email">Email</label>
                <input id="bc-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="bc-phone">Phone</label>
                <input id="bc-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="bc-date">A good day for the call</label>
                <input id="bc-date" name="date" type="date" />
              </div>
              <fieldset className={`${s.field} ${s.wide} ${s.fieldset}`}>
                <legend data-edit="book.legend">Interested in</legend>
                <div className={s.picks}>
                  {SERVICE_PICKS.map((p, i) => (
                    <div key={p} className={s.pick}>
                      <input id={`bc-pick-${i}`} type="checkbox" name="service" value={p} />
                      <label data-edit={`book.label5.${i}`} htmlFor={`bc-pick-${i}`}>{p}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label6" htmlFor="bc-note">Your week, and what you are tired of wearing</label>
                <textarea id="bc-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request a call</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,2,0,1" className={s.selvedge} aria-hidden="true">
          <TabbiedPattern pattern={bias} palette={SELVEDGE} fit="grid" cellSize={32} seed="biascut-foot" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Bias Cut Styling</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional styling studio. The names, people, clients, prices and
            address are invented for this template.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
