import { TabbiedPattern } from 'tabbied/react';
import { louvre } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './upswing-garage-doors.module.css';

export const metadata = {
  title: 'Upswing Garage Doors: Spring, cable and opener repair',
  description:
    'Upswing repairs garage doors the same day: broken springs, snapped cables, dead openers and doors off their tracks. Prices on the page, an evening emergency truck, and new doors fitted in a morning.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   sectional door running in its tracks: every section of the page is a door
   panel with rollers at its edges. The louvre slats are the door itself in
   the hero, the shutter beside the emergency line, the sample on the new
   doors, and the threshold under the footer. */
const CONCRETE = '#e7e4dd';
const SLATE = '#1f2a30';
const ORANGE = '#e8641c';
const STEEL = '#4a7088';
const SKY = '#9cc7d9';
const SUN = '#f2b632';

const SLATS = ['transparent', STEEL, ORANGE, SKY, SUN, CONCRETE];
const SHUTTER = ['transparent', ORANGE, SUN, SKY, STEEL, CONCRETE];
const SAMPLE = ['transparent', STEEL, SKY, CONCRETE, STEEL, SKY];

const NAV = [
  ['Springs', '#springs'],
  ['Cables and tracks', '#cables'],
  ['Openers', '#openers'],
  ['New doors', '#doors'],
  ['Book a visit', '#book'],
];

type Price = { job: string; price: string };

const SPRINGS: Price[] = [
  { job: 'Torsion springs, pair, 10,000 cycles', price: '$265' },
  { job: 'Torsion springs, pair, 25,000 cycles', price: '$325' },
  { job: 'Extension springs, pair', price: '$185' },
  { job: 'Safety cables through extension springs', price: '$45' },
];

const CABLES: Price[] = [
  { job: 'Lift cables, both sides', price: '$145' },
  { job: 'Nylon rollers, set of ten', price: '$165' },
  { job: 'Door off its track, reset and squared', price: '$175' },
  { job: 'Bent track section replaced', price: '$120' },
  { job: 'Bottom seal, 16-foot door', price: '$85' },
];

const OPENERS: Price[] = [
  { job: 'Diagnostic visit, waived with any repair', price: '$79' },
  { job: 'Safety sensors realigned, on any visit', price: 'Free' },
  { job: 'Gear and sprocket kit', price: '$140' },
  { job: 'Logic board replaced', price: '$165' },
  { job: 'New belt-drive opener, fitted', price: '$485' },
  { job: 'Wall-mount opener, fitted', price: '$725' },
];

const DOORS = [
  { name: 'Ribbed steel', spec: 'Two-layer steel, 25 gauge, ten colors', r: 'R-6.3', price: 'from $1,350' },
  { name: 'Flush insulated', spec: 'Three-layer steel with a foam core, quiet to run', r: 'R-12.9', price: 'from $1,890' },
  { name: 'Carriage house', spec: 'Composite overlay boards, strap hinges and handles', r: 'R-9.0', price: 'from $2,650' },
];

const VISIT = [
  ['You call or book', 'Tell us what the door does, or does not do. A photo by text helps.'],
  ['A two-hour window', 'Most repairs are seen the same day; we text when the van is twenty minutes out.'],
  ['A written price', 'The technician quotes from this page before touching anything.'],
  ['Balanced and tested', 'Springs set to the door weight, the auto-reverse tested with a board.'],
];

export default function UpswingGarageDoors() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--concrete': '#e7e4dd',
        '--slate': '#1f2a30',
        '--orange': '#e8641c',
        '--steel': '#4a7088',
        '--sky': '#9cc7d9',
        '--sun': '#f2b632',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="concrete,slate,orange,steel,sky,sun"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#main">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Upswing</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Garage Doors</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550134800">(555) 013-4800</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ HERO
            A garage opening, the door raised two thirds of the way: the
            slats above, the dark of the garage below, and the offer
            standing in the gap. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.opening}>
            <div className={s.lintel}>
              <p data-edit="hero.lintelText" data-edit-max="240" data-edit-multiline className={s.lintelText}>Garage door repair and new doors, Millrace and the east side</p>
            </div>
            <div className={s.raised}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,4,5,0" className={s.doorField} aria-hidden="true">
                <TabbiedPattern
                  pattern={louvre}
                  palette={SLATS}
                  fit="grid"
                  cellSize={46}
                  seed="upswing-door"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.doorSeams} aria-hidden="true" />
              <div className={s.doorEdge} aria-hidden="true" />
            </div>
            <div className={s.inside}>
              <div className={s.insideText}>
                <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                  Stuck door? <span>Up and running by tonight.</span>
                </h1>
                <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                  Broken springs, snapped cables, an opener that hums and does
                  nothing. One of our two vans is usually on your street the same
                  day, with the part already on board.
                </p>
              </div>
              <div className={s.insideSide}>
                <div className={s.heroActions}>
                  <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a repair</a>
                  <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="tel:+15550134800">Call (555) 013-4800</a>
                </div>
                <dl className={s.heroFacts}>
                  <div>
                    <dt data-edit="hero.term" data-edit-max="28">Same-day repairs</dt>
                    <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>8 in 10</dd>
                  </div>
                  <div>
                    <dt data-edit="hero.term2" data-edit-max="28">Spring warranty</dt>
                    <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>5 years</dd>
                  </div>
                  <div>
                    <dt data-edit="hero.term3" data-edit-max="28">Evening truck</dt>
                    <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>to 11 pm</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ DOOR
            The rest of the page is the door itself, one panel per section,
            rolling in a track down both sides. */}
        <div className={s.door}>
          <section id="springs" className={s.panel} aria-labelledby="springs-h">
            <div className={s.panelInner}>
              <div className={s.panelHead}>
                <p data-edit="springs.panelTag" data-edit-max="240" data-edit-multiline className={s.panelTag}>Panel 1 of 5</p>
                <h2 data-edit="springs.panelTitle" data-edit-max="60" id="springs-h" className={s.panelTitle}>Springs</h2>
                <p data-edit="springs.panelNote" data-edit-max="240" data-edit-multiline className={s.panelNote}>
                  The spring lifts the door; the opener only steers it. When a
                  spring snaps the door weighs 150 pounds or more, so please do
                  not try to lift it, and do not keep pressing the button.
                </p>
                <p data-edit="springs.panelAside" data-edit-max="240" data-edit-multiline className={s.panelAside}>
                  Standard springs last about 10,000 cycles, seven years at four
                  openings a day. We fit both sides at once, because the other one
                  is the same age.
                </p>
              </div>
              <ul className={s.prices}>
                {SPRINGS.map((p, i) => (
                  <li key={p.job} className={s.priceRow}>
                    <span data-edit={`springs.job.${i}`} data-edit-max="60" className={s.job}>{p.job}</span>
                    <span data-edit={`springs.price.${i}`} data-edit-max="60" className={s.price}>{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="cables" className={s.panel} aria-labelledby="cables-h">
            <div className={s.panelInner}>
              <div className={s.panelHead}>
                <p data-edit="cables.panelTag" data-edit-max="240" data-edit-multiline className={s.panelTag}>Panel 2 of 5</p>
                <h2 data-edit="cables.panelTitle" data-edit-max="60" id="cables-h" className={s.panelTitle}>Cables, rollers and tracks</h2>
                <p data-edit="cables.panelNote" data-edit-max="240" data-edit-multiline className={s.panelNote}>
                  A door hanging crooked, or one side stuck at the top, is
                  almost always a cable off its drum. Leave it down and we will
                  bring it back square.
                </p>
              </div>
              <ul className={s.prices}>
                {CABLES.map((p, i) => (
                  <li key={p.job} className={s.priceRow}>
                    <span data-edit={`cables.job.${i}`} data-edit-max="60" className={s.job}>{p.job}</span>
                    <span data-edit={`cables.price.${i}`} data-edit-max="60" className={s.price}>{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="openers" className={s.panel} aria-labelledby="openers-h">
            <div className={s.panelInner}>
              <div className={s.panelHead}>
                <p data-edit="openers.panelTag" data-edit-max="240" data-edit-multiline className={s.panelTag}>Panel 3 of 5</p>
                <h2 data-edit="openers.panelTitle" data-edit-max="60" id="openers-h" className={s.panelTitle}>Openers</h2>
                <p data-edit="openers.panelNote" data-edit-max="240" data-edit-multiline className={s.panelNote}>
                  We repair every common brand, and say so when an opener is
                  past saving. A new one comes with two remotes, a keypad and
                  the old unit taken away.
                </p>
              </div>
              <ul className={s.prices}>
                {OPENERS.map((p, i) => (
                  <li key={p.job} className={s.priceRow}>
                    <span data-edit={`openers.job.${i}`} data-edit-max="60" className={s.job}>{p.job}</span>
                    <span data-edit={`openers.price.${i}`} data-edit-max="60" className={s.price}>{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="emergency" className={s.emergency} aria-labelledby="emergency-h">
            <div data-edit-pattern="emergency.field" data-edit-roles="transparent,2,5,4,3,0" className={s.shutter} aria-hidden="true">
              <TabbiedPattern
                pattern={louvre}
                palette={SHUTTER}
                fit="grid"
                cellSize={40}
                seed="upswing-shutter"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.emergencyText}>
              <p data-edit="emergency.emergencyTag" data-edit-max="240" data-edit-multiline className={s.emergencyTag}>Panel 4 of 5, the one with the lights on</p>
              <h2 data-edit="emergency.emergencyTitle" data-edit-max="60" id="emergency-h" className={s.emergencyTitle}>Door stuck open at night?</h2>
              <p data-edit="emergency.emergencyLead" data-edit-max="240" data-edit-multiline className={s.emergencyLead}>
                A garage that will not close is a house that will not lock. Our
                evening truck runs until 11 pm, every night including Sunday.
              </p>
              <p className={s.emergencyNumber}>
                <a data-edit="emergency.link" data-edit-max="28" href="tel:+15550134911">(555) 013-4911</a>
              </p>
              <p data-edit="emergency.emergencySmall" data-edit-max="240" data-edit-multiline className={s.emergencySmall}>After 6 pm the call-out is $95, on top of the repair price.</p>
            </div>
          </section>

          <section id="doors" className={s.panel} aria-labelledby="doors-h">
            <div className={s.panelInner}>
              <div className={s.panelHead}>
                <p data-edit="doors.panelTag" data-edit-max="240" data-edit-multiline className={s.panelTag}>Panel 5 of 5</p>
                <h2 data-edit="doors.panelTitle" data-edit-max="60" id="doors-h" className={s.panelTitle}>New doors</h2>
                <p data-edit="doors.panelNote" data-edit-max="240" data-edit-multiline className={s.panelNote}>
                  Prices are for a 16 by 7 foot double door, fitted in a morning,
                  with new tracks, springs and the old door hauled away.
                </p>
                <div data-edit-pattern="doors.field" data-edit-roles="transparent,3,4,0,3,4" className={s.sample} aria-hidden="true">
                  <TabbiedPattern
                    pattern={louvre}
                    palette={SAMPLE}
                    fit="grid"
                    cellSize={30}
                    seed="upswing-sample"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <ul className={s.doorList}>
                {DOORS.map((d, i) => (
                  <li key={d.name} className={s.doorCard}>
                    <h3 data-edit={`doors.doorName.${i}`} data-edit-max="40" className={s.doorName}>{d.name}</h3>
                    <p data-edit={`doors.doorSpec.${i}`} data-edit-max="240" data-edit-multiline className={s.doorSpec}>{d.spec}</p>
                    <p data-edit={`doors.doorR.${i}`} data-edit-max="240" data-edit-multiline className={s.doorR}>{d.r}</p>
                    <p data-edit={`doors.doorPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.doorPrice}>{d.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <h2 data-edit="visit.visitTitle" data-edit-max="60" id="visit-h" className={s.visitTitle}>How a visit goes</h2>
          <ol className={s.steps}>
            {VISIT.map(([title, body], i) => (
              <li key={title} className={s.step}>
                <h3 data-edit={`visit.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                <p data-edit={`visit.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookInfo}>
            <h2 data-edit="book.visitTitle" data-edit-max="60" id="book-h" className={s.visitTitle}>Book a visit</h2>
            <p data-edit="book.bookLead" data-edit-max="240" data-edit-multiline className={s.bookLead}>
              Tell us what the door is doing and when someone will be home.
              We answer within the hour during the day.
            </p>
            <dl className={s.contactList}>
              <div>
                <dt data-edit="book.term" data-edit-max="28">Phone</dt>
                <dd>
                  <a data-edit="book.link" data-edit-max="28" href="tel:+15550134800">(555) 013-4800</a>
                </dd>
              </div>
              <div>
                <dt data-edit="book.term2" data-edit-max="28">Evening line</dt>
                <dd>
                  <a data-edit="book.link2" data-edit-max="28" href="tel:+15550134911">(555) 013-4911</a>
                </dd>
              </div>
              <div>
                <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                <dd>
                  <a data-edit="book.link3" data-edit-max="28" href="mailto:jobs@upswingdoors.example">jobs@upswingdoors.example</a>
                </dd>
              </div>
              <div>
                <dt data-edit="book.term4" data-edit-max="28">Yard</dt>
                <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>2280 Millrace Road, Unit 4</dd>
              </div>
              <div>
                <dt data-edit="book.term5" data-edit-max="28">Hours</dt>
                <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Monday to Saturday, 7 to 7. Evening truck to 11 pm daily.</dd>
              </div>
              <div>
                <dt data-edit="book.term6" data-edit-max="28">We cover</dt>
                <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>Millrace, Eastgate, Copper Hill and Lower Ferris</dd>
              </div>
            </dl>
          </div>
          <form className={s.form} action="#">
            <label className={s.field}>
              <span data-edit="book.text" data-edit-max="60">Name</span>
              <input type="text" name="name" autoComplete="name" />
            </label>
            <label className={s.field}>
              <span data-edit="book.text2" data-edit-max="60">Phone</span>
              <input type="tel" name="phone" autoComplete="tel" />
            </label>
            <label className={s.fieldWide}>
              <span data-edit="book.text3" data-edit-max="60">Street address</span>
              <input type="text" name="address" autoComplete="street-address" />
            </label>
            <label className={s.field}>
              <span data-edit="book.text4" data-edit-max="60">What is wrong?</span>
              <select name="problem" defaultValue="spring">
                <option value="spring">Broken spring, loud bang</option>
                <option value="cable">Cable off, door crooked</option>
                <option value="opener">Opener will not run</option>
                <option value="track">Door off its track</option>
                <option value="new">Quote for a new door</option>
              </select>
            </label>
            <label className={s.field}>
              <span data-edit="book.text5" data-edit-max="60">Best day</span>
              <input type="date" name="day" />
            </label>
            <label className={s.fieldWide}>
              <span data-edit="book.text6" data-edit-max="60">Anything else</span>
              <textarea name="message" rows={3} />
            </label>
            <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request a time</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,4,5,0" className={s.threshold} aria-hidden="true">
          <TabbiedPattern
            pattern={louvre}
            palette={SLATS}
            fit="grid"
            cellSize={34}
            seed="upswing-threshold"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Upswing Garage Doors</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>A fictional business: the names, prices and address are invented.</p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
