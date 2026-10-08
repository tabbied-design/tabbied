import { TabbiedPattern } from 'tabbied/react';
import { crease } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './sharp-crease-cleaners.module.css';

export const metadata = {
  title: 'Sharp Crease Cleaners: Dry cleaning, pressing and alterations, Pressley Avenue',
  description:
    'Sharp Crease is a dry cleaner on Pressley Avenue. In by 9:30, ready by 5:00. Prices by garment, alterations with fittings, and wedding gown cleaning and boxing.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Crease is the
   shop's mark: the mountain and valley lines of a fold, drawn before
   anything is pressed. It is the shirt on the hanger in the hero, the band
   under the counter clock, the gown in the bridal section, and the hem of
   the footer. */
const TICKET = '#f5ded5';
const NAVY = '#1d2340';
const RED = '#c4302b';
const STEEL = '#4f79a8';
const MUSTARD = '#e3a73b';
const STOCK = '#fbf6ee';

const SHIRT = ['transparent', NAVY, RED, STEEL, MUSTARD, NAVY];
const BAND = ['transparent', STEEL, NAVY, RED, MUSTARD, STEEL];
const GOWN = ['transparent', STOCK, MUSTARD, STEEL, TICKET, RED];

const NAV = [
  ['Prices', '#prices'],
  ['Same day', '#sameday'],
  ['Alterations', '#alterations'],
  ['Wedding gowns', '#gowns'],
  ['Pickup', '#pickup'],
];

type Ticket = { no: string; title: string; tone: string; items: string[][] };

const TICKETS: Ticket[] = [
  {
    no: 'No. 1101',
    title: 'Shirts and blouses',
    tone: 'red',
    items: [
      ['Shirt, pressed on a hanger', '$3.75'],
      ['Shirt, folded in a box', '$4.50'],
      ['Blouse, silk or rayon', '$8.50'],
      ['Polo or knit top', '$6.25'],
      ['Sweater, hand finished', '$9.00'],
    ],
  },
  {
    no: 'No. 2202',
    title: 'Suits and trousers',
    tone: 'steel',
    items: [
      ['Two-piece suit', '$19.50'],
      ['Three-piece suit', '$26.00'],
      ['Jacket or blazer', '$11.75'],
      ['Trousers, with a crease', '$8.75'],
      ['Jeans, pressed', '$7.50'],
    ],
  },
  {
    no: 'No. 3303',
    title: 'Dresses and skirts',
    tone: 'navy',
    items: [
      ['Dress, plain', '$16.00'],
      ['Dress, pleated or lined', 'from $22'],
      ['Skirt', '$8.75'],
      ['Jumpsuit', '$18.00'],
      ['Evening gown', 'from $45'],
    ],
  },
  {
    no: 'No. 4404',
    title: 'Coats and household',
    tone: 'mustard',
    items: [
      ['Wool overcoat', '$24.00'],
      ['Down jacket', '$28.00'],
      ['Raincoat, reproofed', '$26.00'],
      ['Duvet, queen', '$36.00'],
      ['Curtains, lined, per panel', '$18.00'],
    ],
  },
];

const DAY = [
  ['7:00-9:30', 'On the counter for the same day'],
  ['9:30-5:00', 'Cleaned, pressed, checked and bagged'],
  ['5:00-7:00', 'Ready to collect'],
];

const RULES = [
  ['Saturday', 'In by 9:00, ready at 2:00. Shirts and trousers only.'],
  ['Express', 'In by noon, ready at 6:00. Add $5 to the ticket.'],
  ['Never same day', 'Leather, suede, gowns, curtains, and any stain we need to test first.'],
];

const ALTERATIONS = [
  ['Hem trousers, plain', '$16'],
  ['Hem trousers with a cuff', '$22'],
  ['Hem jeans, original hem kept', '$24'],
  ['Take in or let out a waist', '$24'],
  ['Shorten jacket sleeves', '$38'],
  ['Taper a shirt', '$22'],
  ['Replace a zip', '$20-35'],
  ['Hem a dress', 'from $28'],
];

const GOWN_STEPS = [
  ['We look it over together', 'Every mark, bead and loose seam goes on a stain map that you sign before we start.'],
  ['One person cleans it by hand', 'Cold solvent, the beading covered, the lace on a screen. Never in a machine.'],
  ['Pressed on a form', 'Steamed in shape on a dress form, the train last, laid out on a clean table.'],
  ['Boxed for keeping', 'Acid-free tissue in the folds, a window in the lid, sealed. We recheck it free at one year.'],
];

const GOWN_PRICES = [
  ['Clean and box', 'from $245'],
  ['Clean and press to wear', 'from $175'],
  ['Steam and bustle before the day', 'from $85'],
];

const HOURS = [
  ['Monday to Friday', '7:00-7:00'],
  ['Saturday', '8:00-3:00'],
  ['Sunday', 'Closed'],
];

export default function SharpCreaseCleanersPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--ticket': '#f5ded5',
        '--navy': '#1d2340',
        '--red': '#c4302b',
        '--steel': '#4f79a8',
        '--mustard': '#e3a73b',
        '--stock': '#fbf6ee',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="ticket,navy,red,steel,mustard,stock"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Work+Sans:wght@400;600&family=Courier+Prime:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Sharp Crease</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Cleaners and pressing since 1974</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550184471">(555) 018-4471</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: a shirt on a hanger, cut from the crease pattern, with its
            claim ticket pinned to the cuff. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Dry cleaning, pressing, alterations</p>
            <h1 data-edit="intro.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              In by 9:30. <span>Pressed</span> by 5.
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              A family counter on Pressley Avenue for fifty years. Shirts finished
              by hand, trousers with a crease you could cut paper on, and the
              wedding gown you will want to look at again in thirty years.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#prices">See the prices</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#pickup">Book a free pickup</a>
            </div>
          </div>

          <div className={s.garment}>
            <span className={s.hook} aria-hidden="true" />
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,1,2,3,4,1" className={s.shirt} aria-hidden="true">
              <TabbiedPattern
                pattern={crease}
                palette={SHIRT}
                fit="grid"
                cellSize={44}
                seed="sharp-crease-shirt"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.claim}>
              <p data-edit="intro.claimHead" data-edit-max="240" data-edit-multiline className={s.claimHead}>Claim ticket</p>
              <p data-edit="intro.claimNo" data-edit-max="240" data-edit-multiline className={s.claimNo}>No. 4471</p>
              <dl className={s.claimLines}>
                <div>
                  <dt data-edit="intro.term" data-edit-max="28">Shirts, hanger</dt>
                  <dd data-edit="intro.body" data-edit-max="200" data-edit-multiline>5</dd>
                </div>
                <div>
                  <dt data-edit="intro.term2" data-edit-max="28">Suit, two-piece</dt>
                  <dd data-edit="intro.body2" data-edit-max="200" data-edit-multiline>1</dd>
                </div>
                <div>
                  <dt data-edit="intro.term3" data-edit-max="28">Ready</dt>
                  <dd data-edit="intro.body3" data-edit-max="200" data-edit-multiline>Today 5:00</dd>
                </div>
              </dl>
              <p data-edit="intro.claimTotal" data-edit-max="240" data-edit-multiline className={s.claimTotal}>Paid $38.25</p>
            </div>
          </div>
        </section>

        {/* PRICES: one claim ticket per kind of garment. */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>Prices by garment</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Cleaned and pressed, buttons checked and tightened, returned on a
              hanger with a paper shoulder guard. Press only is about half the
              price. Every tenth shirt is free.
            </p>
          </div>
          <ul className={s.tickets}>
            {TICKETS.map((t, i) => (
              <li key={t.no} className={s.ticket}>
                <div className={`${s.stub} ${s[t.tone]}`}>
                  <span data-edit={`prices.stubNo.${i}`} data-edit-max="60" className={s.stubNo}>{t.no}</span>
                  <h3 data-edit={`prices.stubTitle.${i}`} data-edit-max="40" className={s.stubTitle}>{t.title}</h3>
                </div>
                <dl className={s.priceList}>
                  {t.items.map(([item, price], i2) => (
                    <div key={item}>
                      <dt data-edit={`prices.term.${i}.${i2}`} data-edit-max="28">{item}</dt>
                      <dd data-edit={`prices.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* SAME DAY: the counter's day as a clock strip. */}
        <section id="sameday" className={s.sec} aria-labelledby="sameday-h">
          <div className={s.secHead}>
            <h2 data-edit="sameday.secTitle" data-edit-max="60" id="sameday-h" className={s.secTitle}>The same-day cutoff</h2>
            <p data-edit="sameday.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Anything on the counter by 9:30 on a weekday is cleaned, pressed
              and hanging by 5:00. After 9:30 it is ready the next afternoon.
            </p>
          </div>
          <ol className={s.day}>
            {DAY.map(([time, what], i) => (
              <li key={time}>
                <span data-edit={`sameday.dayTime.${i}`} data-edit-max="60" className={s.dayTime}>{time}</span>
                <span data-edit={`sameday.dayWhat.${i}`} data-edit-max="60" className={s.dayWhat}>{what}</span>
              </li>
            ))}
          </ol>
          <dl className={s.rules}>
            {RULES.map(([k, v], i) => (
              <div key={k}>
                <dt data-edit={`sameday.term.${i}`} data-edit-max="28">{k}</dt>
                <dd data-edit={`sameday.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,1,2,4,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={crease}
            palette={BAND}
            fit="grid"
            cellSize={52}
            seed="sharp-crease-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ALTERATIONS: under a tape measure. */}
        <section id="alterations" className={s.sec} aria-labelledby="alterations-h">
          <div className={s.tape} aria-hidden="true" />
          <div className={s.alter}>
            <div>
              <h2 data-edit="alterations.secTitle" data-edit-max="60" id="alterations-h" className={s.secTitle}>Alterations</h2>
              <p data-edit="alterations.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Rosa Lindqvist pins and fits on Tuesday and Thursday evenings,
                4:00-7:00, and Saturday mornings. Most alterations are ready in
                five working days, cleaned and pressed at no extra charge.
              </p>
              <p data-edit="alterations.fitting" data-edit-max="240" data-edit-multiline className={s.fitting}>Bring the shoes you will wear with it.</p>
            </div>
            <dl className={s.alterList}>
              {ALTERATIONS.map(([job, price], i) => (
                <div key={job}>
                  <dt data-edit={`alterations.term.${i}`} data-edit-max="28">{job}</dt>
                  <dd data-edit={`alterations.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* GOWNS: the one room with the lights low. */}
        <section id="gowns" className={s.gowns} aria-labelledby="gowns-h">
          <div className={s.gownsInner}>
            <div className={s.gownFigure}>
              <div data-edit-pattern="gowns.field" data-edit-roles="transparent,5,4,3,0,2" className={s.gown} aria-hidden="true">
                <TabbiedPattern
                  pattern={crease}
                  palette={GOWN}
                  fit="grid"
                  cellSize={38}
                  seed="sharp-crease-gown"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div className={s.gownText}>
              <h2 data-edit="gowns.gownTitle" data-edit-max="60" id="gowns-h" className={s.gownTitle}>Wedding gown care</h2>
              <p data-edit="gowns.gownLead" data-edit-max="240" data-edit-multiline className={s.gownLead}>
                Bring it within a month of the wedding, before sugar and
                champagne have time to brown. We have cleaned and boxed more than
                two thousand gowns.
              </p>
              <ol className={s.gownSteps}>
                {GOWN_STEPS.map(([title, text], i) => (
                  <li key={title}>
                    <h3 data-edit={`gowns.gownStep.${i}`} data-edit-max="40" className={s.gownStep}>{title}</h3>
                    <p data-edit={`gowns.gownStepText.${i}`} data-edit-max="240" data-edit-multiline className={s.gownStepText}>{text}</p>
                  </li>
                ))}
              </ol>
              <dl className={s.gownPrices}>
                {GOWN_PRICES.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`gowns.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`gowns.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* PICKUP AND VISIT */}
        <section id="pickup" className={s.sec} aria-labelledby="pickup-h">
          <div className={s.visit}>
            <div>
              <h2 data-edit="pickup.secTitle" data-edit-max="60" id="pickup-h" className={s.secTitle}>Free pickup, or come to the counter</h2>
              <p data-edit="pickup.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                We collect and deliver on Tuesdays and Fridays within three miles
                of the shop. Leave the bag on the porch if you are out.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="pickup.term" data-edit-max="28">Counter</dt>
                  <dd data-edit="pickup.body" data-edit-max="200" data-edit-multiline>312 Pressley Avenue, Old Market</dd>
                </div>
                <div>
                  <dt data-edit="pickup.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="pickup.link" data-edit-max="28" href="tel:+15550184471">(555) 018-4471</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="pickup.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="pickup.link2" data-edit-max="28" href="mailto:counter@sharpcrease.example">counter@sharpcrease.example</a>
                  </dd>
                </div>
              </dl>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`pickup.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`pickup.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.form} action="#">
              <p data-edit="pickup.formHead" data-edit-max="240" data-edit-multiline className={s.formHead}>Pickup ticket</p>
              <div className={s.field}>
                <label data-edit="pickup.label" htmlFor="sc-name">Name</label>
                <input id="sc-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="pickup.label2" htmlFor="sc-phone">Phone</label>
                <input id="sc-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="pickup.label3" htmlFor="sc-address">Address</label>
                <input id="sc-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="pickup.label4" htmlFor="sc-day">Pickup day</label>
                <select id="sc-day" name="day" defaultValue="tuesday">
                  <option value="tuesday">Tuesday</option>
                  <option value="friday">Friday</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="pickup.label5" htmlFor="sc-bags">Bags</label>
                <input id="sc-bags" name="bags" type="number" min="1" defaultValue="1" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="pickup.label6" htmlFor="sc-note">Stains, repairs or anything delicate</label>
                <textarea id="sc-note" name="note" rows={3} />
              </div>
              <button data-edit="pickup.submit" data-edit-max="24" className={s.submit} type="submit">Book the pickup</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,3,4,1" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={crease}
            palette={SHIRT}
            fit="grid"
            cellSize={32}
            seed="sharp-crease-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Sharp Crease Cleaners</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional dry cleaner. The people, prices and address are invented.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
