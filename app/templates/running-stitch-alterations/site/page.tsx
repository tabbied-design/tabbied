import { TabbiedPattern } from 'tabbied/react';
import { crossstitch } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './running-stitch-alterations.module.css';

export const metadata = {
  title: 'Running Stitch: Bridal and formalwear alterations, Mercer Row',
  description:
    'Running Stitch alters wedding gowns, bridesmaid dresses, suits and tuxedos upstairs on Mercer Row. A fitting schedule that counts down to the day, a written price list, and a clear rush policy.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The cross
   stitch is the studio's sampler: garnet and wine diamonds with aubergine
   and violet hearts, worked on a transparent ground so the blush linen of
   the page is the cloth. In the embroidery hoop, as a sampler border
   between the prices and the rush policy, and along the footer's hem. */
const LINEN = '#f6ece8';
const AUBERGINE = '#2b1d24';
const GARNET = '#a3243b';
const WINE = '#6b1f35';
const VIOLET = '#4c3f78';

const SAMPLER = ['transparent', GARNET, WINE, AUBERGINE, VIOLET];
const BORDER = ['transparent', WINE, GARNET, VIOLET, AUBERGINE];
const HEM = ['transparent', LINEN, LINEN, LINEN, GARNET];

const NAV = [
  ['Fitting schedule', '#schedule'],
  ['Prices', '#prices'],
  ['Rush policy', '#rush'],
  ['The studio', '#studio'],
  ['Book a fitting', '#book'],
];

const FITTINGS = [
  ['12', 'weeks to go', 'Consultation', 'Bring the gown, the shoes and what you will wear under it. We pin, talk it through and send a written quote.'],
  ['8', 'weeks to go', 'First fitting', 'Hem, side seams and the bustle style. Most of the cutting happens after this hour.'],
  ['4', 'weeks to go', 'Second fitting', 'Bodice, straps and sleeves checked on you. The bustle is sewn and tried.'],
  ['2', 'weeks to go', 'Final fitting', 'Walk, sit, dance. Bring whoever will bustle you, and we teach them twice.'],
  ['1', 'week to go', 'Pressed and collected', 'Steamed, bagged and hung, with a card that shows the bustle point by point.'],
  ['0', 'the day', 'On call', 'Our wedding-day line is open 7 am to noon on Saturdays, for a popped seam or a lost button.'],
];

const GOWNS = [
  ['Hem, one layer', '$95'],
  ['Hem, each further layer', '$45'],
  ['Hem with lace or a beaded edge', 'from $160'],
  ['Take in the side seams', '$110'],
  ['Bustle, one to five points', '$85'],
  ['Bustle, French or Austrian', '$140'],
  ['Add straps or a halter', '$60'],
  ['Add sleeves', 'from $180'],
  ['Bodice reshaped', 'from $240'],
  ['Steam and press, the week of', '$75'],
];

const SUITS = [
  ['Trouser hem, plain', '$25'],
  ['Trouser hem, cuffed', '$35'],
  ['Waist in or out', '$35'],
  ['Jacket sleeves, from the cuff', '$45'],
  ['Jacket sleeves, working buttonholes', '$85'],
  ['Take in the jacket body', '$70'],
  ['Bridesmaid dress hem', '$65'],
  ['Mother of the bride, fit and hem', 'from $120'],
  ['Tuxedo press, collected', '$30'],
];

const RUSH = [
  ['4 weeks or more', 'Our usual prices. No rush fee.'],
  ['2 to 4 weeks', 'Plus 25%. All work still possible.'],
  ['Under 2 weeks', 'Plus 50%. Hems, bustles and taking in only.'],
  ['Under 7 days', 'We look at the gown first and say yes or no that day.'],
];

const BRING = [
  'The shoes you will wear, heel height matters most',
  'The undergarments, or the same style',
  'The veil, belt or jewelry if it sits on the dress',
  'The person who will bustle you on the day',
];

const HOURS = [
  ['Tuesday to Friday', '10:00-6:00'],
  ['Thursday', 'until 8:00'],
  ['Saturday', '9:00-2:00, fittings only'],
  ['Wedding-day line, Saturday', '7:00-12:00'],
];

export default function RunningStitchPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--linen': '#f6ece8',
        '--aubergine': '#2b1d24',
        '--garnet': '#a3243b',
        '--wine': '#6b1f35',
        '--violet': '#4c3f78',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="linen,aubergine,garnet,wine,violet"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Running Stitch</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Bridal and formalwear alterations</span>
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
        {/* ------------------------------------------------------------ HERO
            An embroidery hoop on a square of linen, the sampler stretched
            in it, the clasp at the top. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Upstairs at 31 Mercer Row, by appointment</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Fitted to you, <em>stitch by stitch.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Wedding gowns, bridesmaid dresses, suits and tuxedos, altered by
              hand in a studio of three. We plan your fittings back from the
              date, price every job in writing, and press the gown the week
              you wear it.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a consultation</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#prices">See the price list</a>
            </div>
            <p data-edit="hero.heroNote" data-edit-max="240" data-edit-multiline className={s.heroNote}>Gowns from any shop, any year. The first consultation is free.</p>
          </div>
          <div className={s.hoopWrap}>
            <div className={s.cloth} aria-hidden="true" />
            <div className={s.clasp} aria-hidden="true" />
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,1,4" className={s.hoop} aria-hidden="true">
              <TabbiedPattern
                pattern={crossstitch}
                palette={SAMPLER}
                fit="grid"
                cellSize={64}
                seed="running-stitch-hoop"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- SCHEDULE
            The countdown, read along a tape measure from twelve weeks out
            to the morning of the wedding. */}
        <section id="schedule" className={s.sec} aria-labelledby="schedule-h">
          <div className={s.secHead}>
            <h2 data-edit="schedule.title" data-edit-format="emphasis" data-edit-max="60" id="schedule-h" className={s.secTitle}>
              The fitting schedule, <em>counting down</em>
            </h2>
            <p data-edit="schedule.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Four visits for most gowns, planned back from your date at the
              first appointment. Suits need two, a week apart.
            </p>
          </div>
          <div className={s.tape} aria-hidden="true" />
          <ol className={s.fittings}>
            {FITTINGS.map(([n, unit, title, text], i) => (
              <li key={title} className={s.fitting}>
                <p className={s.weeks}>
                  <span data-edit={`schedule.weeksNo.${i}`} data-edit-max="60" className={s.weeksNo}>{n}</span>
                  <span data-edit={`schedule.weeksUnit.${i}`} data-edit-max="60" className={s.weeksUnit}>{unit}</span>
                </p>
                <h3 data-edit={`schedule.fitTitle.${i}`} data-edit-max="40" className={s.fitTitle}>{title}</h3>
                <p data-edit={`schedule.fitText.${i}`} data-edit-max="240" data-edit-multiline className={s.fitText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <h2 data-edit="prices.title" data-edit-format="emphasis" data-edit-max="60" id="prices-h" className={s.secTitle}>
              The price list, <em>in writing</em>
            </h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              What most jobs cost. Your quote at the consultation is fixed,
              unless you change your mind about the dress.
            </p>
          </div>
          <div className={s.priceGrid}>
            <div className={s.priceCol}>
              <h3 data-edit="prices.priceHead" data-edit-max="40" className={s.priceHead}>Gowns</h3>
              <ul className={s.prices}>
                {GOWNS.map(([item, cost], i) => (
                  <li key={item}>
                    <span data-edit={`prices.item.${i}`} data-edit-max="60" className={s.item}>{item}</span>
                    <span className={s.leader} aria-hidden="true" />
                    <span data-edit={`prices.cost.${i}`} data-edit-max="60" className={s.cost}>{cost}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.priceCol}>
              <h3 data-edit="prices.priceHead2" data-edit-max="40" className={s.priceHead}>Suits and the wedding party</h3>
              <ul className={s.prices}>
                {SUITS.map(([item, cost], i) => (
                  <li key={item}>
                    <span data-edit={`prices.item2.${i}`} data-edit-max="60" className={s.item}>{item}</span>
                    <span className={s.leader} aria-hidden="true" />
                    <span data-edit={`prices.cost2.${i}`} data-edit-max="60" className={s.cost}>{cost}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="prices.package" data-edit-max="240" data-edit-multiline className={s.package}>The whole gown, all four fittings, hem, bustle, side seams and pressing: usually $380-520.</p>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,4,1" className={s.border} aria-hidden="true">
          <TabbiedPattern
            pattern={crossstitch}
            palette={BORDER}
            fit="grid"
            cellSize={44}
            seed="running-stitch-border"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ RUSH */}
        <section id="rush" className={s.sec} aria-labelledby="rush-h">
          <div className={s.rush}>
            <div className={s.rushLabel}>
              <h2 data-edit="rush.rushTitle" data-edit-max="60" id="rush-h" className={s.rushTitle}>Rush policy</h2>
              <p data-edit="rush.rushLead" data-edit-max="240" data-edit-multiline className={s.rushLead}>
                Sometimes the dress arrives late. We take three rush gowns a week,
                so ask early, and we will tell you honestly what can be done.
              </p>
            </div>
            <dl className={s.rushTable}>
              {RUSH.map(([when, what], i) => (
                <div key={when}>
                  <dt data-edit={`rush.term.${i}`} data-edit-max="28">{when}</dt>
                  <dd data-edit={`rush.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- STUDIO */}
        <section id="studio" className={s.sec} aria-labelledby="studio-h">
          <div className={s.studio}>
            <div>
              <h2 data-edit="studio.title" data-edit-format="emphasis" data-edit-max="60" id="studio-h" className={s.secTitle}>
                Three seamstresses, <em>one fitting room</em>
              </h2>
              <p data-edit="studio.studioText" data-edit-max="240" data-edit-multiline className={s.studioText}>
                Ines Halloran opened Running Stitch in 2009 after twelve years
                in a couture workroom. Pilar and June joined her from the theater
                wardrobe at the Hollins Playhouse. The fitting room is private, with
                a three-way mirror, a step and a door that locks.
              </p>
              <p data-edit="studio.studioText2" data-edit-max="240" data-edit-multiline className={s.studioText}>
                Every hem on a gown is finished by hand, and every bustle is
                tried on you before it leaves the studio.
              </p>
            </div>
            <div className={s.bring}>
              <h3 data-edit="studio.bringTitle" data-edit-max="40" className={s.bringTitle}>Bring to your first fitting</h3>
              <ul className={s.bringList}>
                {BRING.map((b, i) => (
                  <li data-edit={`studio.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.book}>
            <div>
              <h2 data-edit="book.title" data-edit-format="emphasis" data-edit-max="60" id="book-h" className={s.secTitle}>
                Book a <em>consultation</em>
              </h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us the date and the dress. We reply within a day with three
                times for your first visit.
              </p>
              <address className={s.address}>
                <span data-edit="book.text" data-edit-max="60">Running Stitch, second floor</span>
                <span data-edit="book.text2" data-edit-max="60">31 Mercer Row, Hollins</span>
              </address>
              <p className={s.contactLine}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550183364">(555) 018-3364</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:fittings@runningstitch.example">fittings@runningstitch.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="rs-name">Your name</label>
                <input id="rs-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="rs-email">Email</label>
                <input id="rs-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="rs-date">Wedding date</label>
                <input id="rs-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="rs-shop">Where the dress is from</label>
                <input id="rs-shop" name="shop" type="text" />
              </div>
              <fieldset className={`${s.field} ${s.wide} ${s.fieldset}`}>
                <legend data-edit="book.legend">What needs altering</legend>
                <div className={s.picks}>
                  <label className={s.pick}>
                    <input type="checkbox" name="garment" value="gown" />
                    <span data-edit="book.text3" data-edit-max="60">Wedding gown</span>
                  </label>
                  <label className={s.pick}>
                    <input type="checkbox" name="garment" value="party" />
                    <span data-edit="book.text4" data-edit-max="60">Bridesmaid dresses</span>
                  </label>
                  <label className={s.pick}>
                    <input type="checkbox" name="garment" value="suit" />
                    <span data-edit="book.text5" data-edit-max="60">Suit or tuxedo</span>
                  </label>
                  <label className={s.pick}>
                    <input type="checkbox" name="garment" value="other" />
                    <span data-edit="book.text6" data-edit-max="60">Something else</span>
                  </label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label5" htmlFor="rs-note">What you would like changed</label>
                <textarea id="rs-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a consultation</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,0,0,2" className={s.footHem} aria-hidden="true">
          <TabbiedPattern
            pattern={crossstitch}
            palette={HEM}
            fit="grid"
            cellSize={36}
            seed="running-stitch-hem"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Running Stitch</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional alterations studio. The seamstresses, prices, playhouse and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
