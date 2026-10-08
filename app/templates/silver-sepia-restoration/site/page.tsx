import { TabbiedPattern } from 'tabbied/react';
import { toning } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './silver-sepia-restoration.module.css';

export const metadata = {
  title: 'Silver & Sepia: Photograph restoration, scanning and archival prints',
  description:
    'Silver & Sepia repairs torn, faded and water-damaged photographs by hand, scans albums and slides, and prints on fiber paper. Prices by damage level from $35, by mail or at the counter.',
};

/* Site colors, the same hexes as the stylesheet's root rule: the darkroom,
   albumen cream, and the tones a print takes on: sepia, silver, a hand
   tint of rose, gilt from the mount. Toning, two inks fading past each
   other, is the photograph: silvered out on the left of the hero and
   restored on the right, thinned by damage in the price levels, laid out
   as a contact sheet, and along the footer. */
const DARK = '#1f1915';
const ALBUMEN = '#efe4d2';
const SEPIA = '#b9824f';
const SILVER = '#9aa7ad';
const ROSE = '#c47a6a';
const GOLD = '#d9b46a';

const FADED = ['transparent', SILVER, ALBUMEN, SILVER, ALBUMEN, SILVER];
const RESTORED = ['transparent', SEPIA, GOLD, ROSE, ALBUMEN, SEPIA];
const SHEET = ['transparent', SILVER, SEPIA, GOLD, ROSE, ALBUMEN];

const NAV = [
  ['Prices', '#prices'],
  ['Mail-in', '#mail'],
  ['Scanning', '#scanning'],
  ['Prints and care', '#prints'],
  ['Contact', '#contact'],
];

type Level = { level: string; name: string; price: string; damage: string[]; frequency: number };

/* Four levels, judged from the scan. The swatch in each loses more of
   itself as the damage gets worse. */
const LEVELS: Level[] = [
  { level: 'Level 1', name: 'Light', price: '$35', damage: ['Dust and specks', 'Fine scratches', 'Even fading'], frequency: 1 },
  { level: 'Level 2', name: 'Moderate', price: '$65', damage: ['Creases and cracks', 'Tape and glue stains', 'Small tears', 'A color cast'], frequency: 0.8 },
  { level: 'Level 3', name: 'Heavy', price: '$120', damage: ['Missing corners', 'Water rings and mold spots', 'Silvering-out', 'Heavy tears'], frequency: 0.55 },
  { level: 'Level 4', name: 'Severe', price: 'from $190', damage: ['Large missing areas', 'Faces to rebuild', 'Stuck to glass', 'Quoted after the scan'], frequency: 0.3 },
];

const EXTRAS = [
  ['Remove a person or a background', '$30'],
  ['Colorize a black and white print', '$45'],
  ['Hand-tinted look, rose cheeks and all', '$30'],
  ['Rush, ready in three working days', '$40'],
];

const MAIL_STEPS = [
  ['Print the order slip', 'One slip per parcel, with each photograph listed and the level you think it is. We will tell you if we disagree.'],
  ['Pack it flat', 'Between two pieces of card, in a paper sleeve. Never rolled, never paper-clipped, never taped to anything.'],
  ['Send it insured', 'To the studio, tracked. We photograph the parcel opened and email you a receipt with a picture of every print.'],
  ['Approve the proof', 'A restored scan by email inside ten working days, and one round of changes if a face is not quite right.'],
  ['Get it all back', 'Originals untouched in archival sleeves, the restored prints and a download link, posted insured.'],
];

const SCANS = [
  ['Loose prints', 'up to 8 x 10 in, 1200 dpi', '$1.50 each'],
  ['Album pages', 'scanned in place, nothing peeled', '$3.00 a page'],
  ['35 mm slides', 'cleaned, 4000 dpi', '$1.20 each'],
  ['Negatives', '35 mm and medium format', '$1.50 a frame'],
  ['Glass plates and tintypes', 'by hand, on a copy stand', '$9.00 each'],
];

const SIZES = [
  ['5 x 7 in', '$18'],
  ['8 x 10 in', '$28'],
  ['11 x 14 in', '$46'],
  ['16 x 20 in', '$78'],
];

const CARE = [
  ['Keep them out of the light', 'Sun fades a print in a summer. A north wall, or a box.'],
  ['Never laminate', 'It cannot be undone, and the glue yellows inside ten years.'],
  ['Out of sticky albums', 'Magnetic pages eat the print from the back. Lift them with dental floss, or bring the album in.'],
  ['Cool, dry, steady', 'Around 18 to 20 C and 30 to 50 percent humidity. Not the attic, not the basement.'],
  ['Hold by the edges', 'Clean dry hands or nitrile gloves. Cotton gloves snag on cracked emulsion.'],
];

const HOURS = [
  ['Tuesday to Friday', '10:00-5:30'],
  ['Saturday', '10:00-2:00'],
  ['Sunday and Monday', 'Closed, mail still read'],
];

export default function SilverSepiaRestorationPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--dark': '#1f1915',
        '--albumen': '#efe4d2',
        '--sepia': '#b9824f',
        '--silver': '#9aa7ad',
        '--rose': '#c47a6a',
        '--gold': '#d9b46a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="dark,albumen,sepia,silver,rose,gold"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.text" data-edit-format="emphasis" data-edit-max="60" className={s.brandName}>Silver <span>&amp;</span> Sepia</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Photograph restorers</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#contact">Send a photograph</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A cabinet card on its mount: the same photograph silvered out on
            the left and restored on the right, with the divider between. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Restoration by hand, since 1998</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              The photograph, <em>as it was the day it was printed.</em>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We repair torn, faded, stained and water-damaged photographs one
              at a time, at a desk, from a 1200 dpi scan. Your original never
              leaves our hands and never gets touched by a single chemical.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#prices">See prices by damage</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#mail">How to mail one in</a>
            </div>
          </div>
          <figure className={s.cabinet}>
            <div className={s.window}>
              <div data-edit-pattern="intro.field" data-edit-roles="transparent,3,1,3,1,3" className={s.before} aria-hidden="true">
                <TabbiedPattern
                  pattern={toning}
                  palette={FADED}
                  fit="grid"
                  cellSize={54}
                  seed="ss-portrait-before"
                  options={{ frequency: 0.6 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div data-edit-pattern="intro.field2" data-edit-roles="transparent,2,5,4,1,2" className={s.after} aria-hidden="true">
                <TabbiedPattern
                  pattern={toning}
                  palette={RESTORED}
                  fit="grid"
                  cellSize={54}
                  seed="ss-portrait-after"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.divider} aria-hidden="true" />
              <p data-edit="intro.tagBefore" data-edit-max="240" data-edit-multiline className={s.tagBefore}>Before</p>
              <p data-edit="intro.tagAfter" data-edit-max="240" data-edit-multiline className={s.tagAfter}>After</p>
            </div>
            <figcaption data-edit="intro.mountLine" data-edit-max="120" data-edit-multiline className={s.mountLine}>Silver and Sepia, restorers, 41 Copperplate Lane</figcaption>
          </figure>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Prices by damage level</p>
            <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>One price per photograph, set by the damage</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Each price includes the scan, the restoration, a proof, one round
              of changes, a digital file and one 8 x 10 print on fiber paper.
            </p>
          </div>
          <ol className={s.levels}>
            {LEVELS.map((l, i) => (
              <li key={l.level} className={s.levelCard}>
                <div data-edit-pattern={`prices.field.${i}`} data-edit-roles="transparent,2,5,4,1,2" className={s.swatch} aria-hidden="true">
                  <TabbiedPattern
                    pattern={toning}
                    palette={RESTORED}
                    fit="grid"
                    cellSize={30}
                    seed={`ss-level-${l.name}`}
                    options={{ frequency: l.frequency }}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <p data-edit={`prices.levelNo.${i}`} data-edit-max="240" data-edit-multiline className={s.levelNo}>{l.level}</p>
                <h3 data-edit={`prices.levelName.${i}`} data-edit-max="40" className={s.levelName}>{l.name}</h3>
                <p data-edit={`prices.levelPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.levelPrice}>{l.price}</p>
                <ul className={s.damage}>
                  {l.damage.map((d, i2) => (
                    <li data-edit={`prices.item.${i}.${i2}`} data-edit-max="80" key={d}>{d}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <dl className={s.extras}>
            {EXTRAS.map(([what, cost], i) => (
              <div key={what}>
                <dt data-edit={`prices.term.${i}`} data-edit-max="28">{what}</dt>
                <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{cost}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ MAIL */}
        <section id="mail" className={s.sec} aria-labelledby="mail-h">
          <div className={s.mailGrid}>
            <div className={s.secHead}>
              <p data-edit="mail.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Mail-in</p>
              <h2 data-edit="mail.secTitle" data-edit-max="60" id="mail-h" className={s.secTitle}>Sending a photograph you cannot replace</h2>
              <p data-edit="mail.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Most of our work arrives by post, from people who found a
                shoebox. Every parcel is opened on camera and logged before
                anything else happens.
              </p>
              <p data-edit="mail.address" data-edit-max="240" data-edit-multiline className={s.address}>Silver and Sepia, 41 Copperplate Lane, Studio B, Eastmoor</p>
            </div>
            <ol className={s.mailSteps}>
              {MAIL_STEPS.map(([title, text], i) => (
                <li key={title} className={s.mailStep}>
                  <span className={s.mailNo}>{`0${i + 1}`}</span>
                  <h3 data-edit={`mail.mailTitle.${i}`} data-edit-max="40" className={s.mailTitle}>{title}</h3>
                  <p data-edit={`mail.mailText.${i}`} data-edit-max="240" data-edit-multiline className={s.mailText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,5,4,1" className={s.filmstrip} aria-hidden="true">
          <TabbiedPattern
            pattern={toning}
            palette={SHEET}
            fit="grid"
            cellSize={46}
            seed="ss-contact-sheet"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- SCANNING */}
        <section id="scanning" className={s.sec} aria-labelledby="scanning-h">
          <div className={s.scanGrid}>
            <div>
              <p data-edit="scanning.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Scanning</p>
              <h2 data-edit="scanning.secTitle" data-edit-max="60" id="scanning-h" className={s.secTitle}>The whole shoebox, digitized</h2>
              <p data-edit="scanning.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Not every photograph needs restoring. Most just need saving.
                Scans come back named by year and place where the back of the
                print says, on a drive or by download.
              </p>
            </div>
            <table className={s.scans}>
              <caption data-edit="scanning.srOnly" className={s.srOnly}>Scanning prices</caption>
              <thead>
                <tr>
                  <th data-edit="scanning.heading" scope="col">Original</th>
                  <th data-edit="scanning.heading2" scope="col">How</th>
                  <th data-edit="scanning.num" scope="col" className={s.num}>Price</th>
                </tr>
              </thead>
              <tbody>
                {SCANS.map(([what, how, price], i) => (
                  <tr key={what}>
                    <th data-edit={`scanning.heading3.${i}`} scope="row">{what}</th>
                    <td data-edit={`scanning.cell.${i}`}>{how}</td>
                    <td data-edit={`scanning.num2.${i}`} className={s.num}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------------------------------------------- PRINTS AND CARE */}
        <section id="prints" className={s.sec} aria-labelledby="prints-h">
          <div className={s.secHead}>
            <p data-edit="prints.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Prints and archival care</p>
            <h2 data-edit="prints.secTitle" data-edit-max="60" id="prints-h" className={s.secTitle}>Printed to last another hundred years</h2>
            <p data-edit="prints.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Silver gelatin fiber paper or pigment on cotton rag, both rated
              for well over a century in a frame with UV glass.
            </p>
          </div>
          <div className={s.printGrid}>
            <div className={s.sizes}>
              <ul className={s.sizeChart}>
                {SIZES.map(([size, price], i) => (
                  <li key={size} className={s.size}>
                    <span data-edit={`prints.sizeName.${i}`} data-edit-max="60" className={s.sizeName}>{size}</span>
                    <span data-edit={`prints.sizePrice.${i}`} data-edit-max="60" className={s.sizePrice}>{price}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="prints.sizeNote" data-edit-max="240" data-edit-multiline className={s.sizeNote}>Prices per print. Framing in black ash with UV glass from $85.</p>
            </div>
            <ul className={s.care}>
              {CARE.map(([title, text], i) => (
                <li key={title} className={s.careItem}>
                  <h3 data-edit={`prints.careTitle.${i}`} data-edit-max="40" className={s.careTitle}>{title}</h3>
                  <p data-edit={`prints.careText.${i}`} data-edit-max="240" data-edit-multiline className={s.careText}>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.counter}>
              <p data-edit="contact.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Bring it in, or send a scan first</h2>
              <p data-edit="contact.counterText" data-edit-max="240" data-edit-multiline className={s.counterText}>
                Not sure how bad it is? Photograph it with your phone, in daylight,
                and email it. We reply with the level and the price.
              </p>
              <p data-edit="contact.counterLine" data-edit-max="240" data-edit-multiline className={s.counterLine}>41 Copperplate Lane, Studio B, Eastmoor</p>
              <p className={s.counterLink}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550114470">(555) 011-4470</a>
              </p>
              <p className={s.counterLink}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:prints@silversepia.example">prints@silversepia.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <h3 data-edit="contact.formTitle" data-edit-max="40" className={s.formTitle}>Ask for a price</h3>
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="ss-name">Name</label>
                <input id="ss-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="ss-email">Email</label>
                <input id="ss-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="ss-count">How many photographs</label>
                <input id="ss-count" name="count" type="text" inputMode="numeric" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="ss-level">Worst damage</label>
                <select id="ss-level" name="level" defaultValue="unsure">
                  <option value="unsure">Not sure</option>
                  <option value="1">Faded or dusty</option>
                  <option value="2">Creased or stained</option>
                  <option value="3">Torn or water damaged</option>
                  <option value="4">Pieces missing</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label5" htmlFor="ss-note">Who is in it, and what happened to it</label>
                <textarea id="ss-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Attach phone pictures in your reply to our first email.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,5,4,1" className={s.footStrip} aria-hidden="true">
          <TabbiedPattern
            pattern={toning}
            palette={SHEET}
            fit="grid"
            cellSize={34}
            seed="ss-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Silver &amp; Sepia</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional restoration studio. The studio, prices and address
            are invented.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
