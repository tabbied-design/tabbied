import { TabbiedPattern } from 'tabbied/react';
import { hitandmiss } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './black-flue-chimney.module.css';

export const metadata = {
  title: 'Black Flue Chimney Sweeps: Sweeping, inspection and a certificate for every flue',
  description:
    'Black Flue sweeps and inspects chimneys, wood stoves and inserts across Harrow Mill and the valley. Level 1, 2 and 3 inspections explained, a booking calendar by season, a fireplace safety checklist and plain prices.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The brick
   screen is the trade's own material: open courses of brick laid hit and
   miss. It frames the sample certificate in the hero, builds the chimney in
   the cross-section, stands as a row of stacks over the safety checklist and
   lays the footer course. */
const SOOT = '#1d1a18';
const BONE = '#efe5d3';
const BRICK = '#b4482f';
const EMBER = '#e3934a';
const RUST = '#7e3424';
const SAND = '#d9b48a';

const FRAME = ['transparent', BRICK, EMBER, RUST, SAND, BRICK];
const STACK = ['transparent', RUST, BRICK, SAND, BRICK, EMBER];
const ROOFS = ['transparent', BRICK, RUST, EMBER, SAND, RUST];
const COURSE = ['transparent', RUST, BRICK, BRICK, EMBER, SAND];

const NAV = [
  ['Inspections', '#levels'],
  ['Seasons', '#seasons'],
  ['Safety', '#safety'],
  ['Prices', '#prices'],
  ['Book', '#book'],
];

const CERT = [
  ['Property', '14 Wren Close, Harrow Mill'],
  ['Appliance', 'Open fireplace, clay-lined flue'],
  ['Work done', 'Swept, Level 1 inspection'],
  ['Found', 'Sound. Light glaze, stage 1 creosote.'],
  ['Next sweep due', 'October 2027'],
];

/* The cross-section's callouts, top to bottom, each placed by its class. */
const PARTS = [
  ['partCap', 'Crown and cap', 'Keeps out rain, birds and leaves. Level 1, from the roof.'],
  ['partFlue', 'Flue liner', 'Seen in full only by camera. Level 2.'],
  ['partChamber', 'Smoke chamber', 'Where creosote collects first. Level 1.'],
  ['partDamper', 'Damper', 'Opened, closed and checked for rust. Level 1.'],
  ['partFirebox', 'Firebox and hearth', 'Cracked bricks, gaps, clearances. Level 1.'],
];

const LEVELS = [
  {
    no: '1',
    name: 'The annual look',
    when: 'Every year, for a chimney used the same way as last year, with no changes and no problems.',
    checks: ['Firebox, damper and smoke chamber', 'The visible flue, by light and mirror', 'The outside of the stack, from the roof', 'Clearances to woodwork in the room'],
    time: 'About 45 minutes',
    price: '$95, or $189 with a sweep',
  },
  {
    no: '2',
    name: 'The camera survey',
    when: 'When you buy or sell a house, change fuel or stove, or after a chimney fire, a storm or a quake.',
    checks: ['Everything in Level 1', 'The whole flue on camera, recorded for you', 'Attic, crawl space and basement runs', 'Cracks and liner gaps hidden from below'],
    time: 'Two hours, video the same day',
    price: '$295',
  },
  {
    no: '3',
    name: 'The opening up',
    when: 'Only when a Level 2 finds a hidden hazard that cannot be judged without removing part of the building.',
    checks: ['Everything in Level 2', 'Removing a panel of wall, ceiling or crown', 'A written report with a repair quote', 'Making good what we opened'],
    time: 'Usually a day, after a Level 2',
    price: 'Quoted, from $650',
  },
];

type Season = { name: string; range: string; note: string; months: [string, string, string][] };

/* Demand runs 1 (quiet) to 4 (booked solid); the third value is how far
   ahead to book. */
const SEASONS: Season[] = [
  { name: 'Spring', range: 'March to May', note: 'The best time to book. Sweeps are free within days, and spring visits are 10% off.', months: [['Mar', '2', 'a week'], ['Apr', '1', 'days'], ['May', '1', 'days']] },
  { name: 'Summer', range: 'June to August', note: 'Quiet for sweeping, so this is when we rebuild crowns, fit caps and reline flues.', months: [['Jun', '1', 'days'], ['Jul', '1', 'days'], ['Aug', '2', 'a week']] },
  { name: 'Autumn', range: 'September to November', note: 'Everyone remembers at once. Book three to five weeks ahead, or join the cancellation list.', months: [['Sep', '3', '3 weeks'], ['Oct', '4', '5 weeks'], ['Nov', '4', '4 weeks']] },
  { name: 'Winter', range: 'December to February', note: 'Smoke in the room and chimney fires come first. Routine sweeps fit around them.', months: [['Dec', '3', '2 weeks'], ['Jan', '2', 'a week'], ['Feb', '2', 'a week']] },
];

const BEFORE = [
  'Have the flue swept and inspected',
  'Open the damper and look up with a torch for nests and daylight',
  'Test the smoke and carbon monoxide alarms',
  'Check the cap is on and the spark screen is whole',
  'Clear anything that can burn from a yard around the hearth',
];

const EVERY = [
  'Burn only dry, seasoned wood, under 20% moisture',
  'Never burn cardboard, wrapping paper or painted wood',
  'Keep the screen closed and never leave the fire alone',
  'Cool ashes for three days in a metal bin with a lid',
  'Close the damper only when the fire is completely out',
];

const FIRE_SIGNS = [
  'A roar like a train in the chimney',
  'Dense smoke or sparks from the top of the stack',
  'Popping and cracking from inside the flue',
  'A hot smell, and a chimney breast hot to the touch',
];

const PRICES = [
  ['Sweep and Level 1 inspection', 'Open fireplace or stove, one flue', '$189'],
  ['Level 1 inspection only', 'With the written certificate', '$95'],
  ['Level 2 camera inspection', 'Recorded video and report', '$295'],
  ['Level 3 inspection', 'After a Level 2, quoted in writing', 'from $650'],
  ['Wood stove or insert sweep', 'Including the connector pipe', '$175'],
  ['Second flue, same visit', 'Any type of appliance', '$85'],
  ['Stainless cap fitted', 'Standard flue sizes', '$165'],
  ['Crown sealed', 'Cracks filled and coated', '$240'],
];

const HOURS = [
  ['Monday to Friday', '7:30 to 4:30'],
  ['Saturday, September to February', '8:00 to 12:00'],
  ['Chimney fire or smoke in the room', 'Any hour'],
];

export default function BlackFlueChimneyPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--soot': '#1d1a18',
        '--bone': '#efe5d3',
        '--brick': '#b4482f',
        '--ember': '#e3934a',
        '--rust': '#7e3424',
        '--sand': '#d9b48a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="soot,bone,brick,ember,rust,sand"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,500;0,700;1,500&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Black Flue</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Chimney Sweeps</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550133300">(555) 013-3300</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* -------------------------------------------------------------- HERO
            The words, and a sample certificate framed in the brick screen. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Sweeps and inspectors for Harrow Mill and the valley</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Swept, inspected and <em>signed for.</em>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Every flue we sweep leaves with a written certificate: what we
              found, the photographs, and the month the next sweep is due. Your
              insurer will ask for it, and the next buyer of the house will too.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#book">Book a sweep</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#levels">What each level means</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="intro.term" data-edit-max="28">Flues swept since 2009</dt>
                <dd data-edit="intro.body" data-edit-max="200" data-edit-multiline>4,200</dd>
              </div>
              <div>
                <dt data-edit="intro.term2" data-edit-max="28">Vans, each with a camera</dt>
                <dd data-edit="intro.body2" data-edit-max="200" data-edit-multiline>3</dd>
              </div>
              <div>
                <dt data-edit="intro.term3" data-edit-max="28">Dust left behind</dt>
                <dd data-edit="intro.body3" data-edit-max="200" data-edit-multiline>None</dd>
              </div>
            </dl>
          </div>

          <div className={s.certFrame}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,2,3,4,5,2" className={s.certBricks} aria-hidden="true">
              <TabbiedPattern
                pattern={hitandmiss}
                palette={FRAME}
                fit="grid"
                cellSize={44}
                seed="blackflue-frame"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.cert}>
              <p data-edit="intro.certNo" data-edit-max="240" data-edit-multiline className={s.certNo}>Certificate No. 2611</p>
              <p data-edit="intro.certTitle" data-edit-max="240" data-edit-multiline className={s.certTitle}>Certificate of Chimney Sweeping</p>
              <p data-edit="intro.certIntro" data-edit-max="240" data-edit-multiline className={s.certIntro}>This is to say that the flue named below was swept and inspected, and found as written.</p>
              <dl className={s.certRows}>
                {CERT.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`intro.term4.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`intro.body4.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.certFoot}>
                <p data-edit="intro.certSign" data-edit-max="240" data-edit-multiline className={s.certSign}>J. Ashdown, sweep</p>
                <p data-edit="intro.certStamp" data-edit-max="240" data-edit-multiline className={s.certStamp}>Swept clean</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ LEVELS
            A chimney in section, labeled with what each level reaches. */}
        <section id="levels" className={s.levels} aria-labelledby="levels-h">
          <div className={s.secHead}>
            <p data-edit="levels.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Inspection levels 1 to 3</p>
            <h2 data-edit="levels.secTitle" data-edit-max="60" id="levels-h" className={s.secTitle}>How far into the chimney each level goes</h2>
            <p data-edit="levels.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most homes need a Level 1 every year and nothing more. We will
              never sell you a Level 2 you do not need, and we write down why if
              we think you do.
            </p>
          </div>
          <div className={s.levelsGrid}>
            <figure className={s.section}>
              <div className={s.chimney}>
                <div data-edit-pattern="levels.field" data-edit-roles="transparent,4,2,5,2,3" className={s.masonry} aria-hidden="true">
                  <TabbiedPattern
                    pattern={hitandmiss}
                    palette={STACK}
                    fit="grid"
                    cellSize={34}
                    seed="blackflue-stack"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.flue} aria-hidden="true" />
                <div className={s.hearth} aria-hidden="true" />
                <ul className={s.parts}>
                  {PARTS.map(([pos, name, note], i) => (
                    <li key={name} className={s[pos]}>
                      <span data-edit={`levels.partName.${i}`} data-edit-max="60" className={s.partName}>{name}</span>
                      <span data-edit={`levels.partNote.${i}`} data-edit-max="60" className={s.partNote}>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption data-edit="levels.sectionCaption" data-edit-max="120" data-edit-multiline className={s.sectionCaption}>A masonry chimney in section, from the crown down to the hearth.</figcaption>
            </figure>
            <ol className={s.levelCards}>
              {LEVELS.map((l, i) => (
                <li key={l.no} className={s.levelCard}>
                  <div className={s.levelTop}>
                    <span data-edit={`levels.levelNo.${i}`} data-edit-max="60" className={s.levelNo}>{l.no}</span>
                    <div>
                      <h3 data-edit={`levels.levelName.${i}`} data-edit-max="40" className={s.levelName}>{l.name}</h3>
                      <p data-edit={`levels.levelWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.levelWhen}>{l.when}</p>
                    </div>
                  </div>
                  <ul className={s.levelChecks}>
                    {l.checks.map((c, j) => (
                      <li data-edit={`levels.item.${i}.${j}`} data-edit-max="80" key={`${i}-${j}`}>{c}</li>
                    ))}
                  </ul>
                  <div className={s.levelFoot}>
                    <span data-edit={`levels.levelTime.${i}`} data-edit-max="60" className={s.levelTime}>{l.time}</span>
                    <span data-edit={`levels.levelPrice.${i}`} data-edit-max="60" className={s.levelPrice}>{l.price}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- SEASONS
            The year as a booking calendar: how busy each month runs. */}
        <section id="seasons" className={s.seasons} aria-labelledby="seasons-h">
          <div className={s.secHead}>
            <p data-edit="seasons.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Booking calendar</p>
            <h2 data-edit="seasons.secTitle" data-edit-max="60" id="seasons-h" className={s.secTitle}>Book in spring, not in October</h2>
            <p data-edit="seasons.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The bars show how full the diary runs each month, and the line
              under each one how far ahead to call.
            </p>
          </div>
          <ol className={s.year}>
            {SEASONS.map((season, i) => (
              <li key={season.name} className={s.season}>
                <h3 data-edit={`seasons.seasonName.${i}`} data-edit-max="40" className={s.seasonName}>{season.name}</h3>
                <p data-edit={`seasons.seasonRange.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonRange}>{season.range}</p>
                <ul className={s.months}>
                  {season.months.map(([m, d, ahead], j) => (
                    <li key={`${i}-${j}`} className={s.month}>
                      <span className={`${s.barTrack} ${s[`d${d}`]}`} aria-hidden="true" />
                      <span data-edit={`seasons.monthName.${i}.${j}`} data-edit-max="60" className={s.monthName}>{m}</span>
                      <span data-edit={`seasons.monthAhead.${i}.${j}`} data-edit-max="60" className={s.monthAhead}>{ahead}</span>
                    </li>
                  ))}
                </ul>
                <p data-edit={`seasons.seasonNote.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonNote}>{season.note}</p>
              </li>
            ))}
          </ol>
          <p data-edit="seasons.legend" data-edit-max="240" data-edit-multiline className={s.legend}>Short bars, a quiet diary. Full bars, booked solid. Spring and summer visits are 10% off.</p>
        </section>

        {/* The row of stacks over the safety checklist. */}
        <div className={s.roofline} aria-hidden="true">
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,3,5,4" className={s.stacks}>
            <TabbiedPattern
              pattern={hitandmiss}
              palette={ROOFS}
              fit="grid"
              cellSize={30}
              seed="blackflue-roofs"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------ SAFETY */}
        <section id="safety" className={s.safety} aria-labelledby="safety-h">
          <div className={s.secHead}>
            <p data-edit="safety.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Fireplace safety checklist</p>
            <h2 data-edit="safety.secTitle" data-edit-max="60" id="safety-h" className={s.secTitle}>Ten things to do, and four to listen for</h2>
            <p data-edit="safety.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Print it and pin it beside the wood basket. Most chimney fires
              we see start with wet wood and a damper closed too soon.
            </p>
          </div>
          <div className={s.safetyGrid}>
            <div className={s.checklist}>
              <h3 data-edit="safety.checkTitle" data-edit-max="40" className={s.checkTitle}>Before the first fire of the season</h3>
              <ul className={s.checks}>
                {BEFORE.map((c, i) => (
                  <li data-edit={`safety.item.${i}`} data-edit-max="80" key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className={s.checklist}>
              <h3 data-edit="safety.checkTitle2" data-edit-max="40" className={s.checkTitle}>Every time you light one</h3>
              <ul className={s.checks}>
                {EVERY.map((c, i) => (
                  <li data-edit={`safety.item2.${i}`} data-edit-max="80" key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <aside className={s.warning} aria-labelledby="warning-h">
              <h3 data-edit="warning.warningTitle" data-edit-max="40" id="warning-h" className={s.warningTitle}>The signs of a chimney fire</h3>
              <ul className={s.warningList}>
                {FIRE_SIGNS.map((c, i) => (
                  <li data-edit={`warning.item.${i}`} data-edit-max="80" key={c}>{c}</li>
                ))}
              </ul>
              <p data-edit="warning.warningDo" data-edit-max="240" data-edit-multiline className={s.warningDo}>Get everyone out and call 911. Then call us, at any hour.</p>
              <p className={s.warningLine}>
                <a data-edit="warning.link" data-edit-max="28" href="tel:+15550133399">(555) 013-3399</a>
              </p>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------------ PRICES */}
        <section id="prices" className={s.prices} aria-labelledby="prices-h">
          <div className={s.pricesGrid}>
            <div>
              <p data-edit="prices.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Prices</p>
              <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>One price, said before we climb</h2>
              <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Prices are per flue and include travel within twenty miles of
                the yard, dust sheets, the vacuum, the certificate and the
                photographs. No call-out fee, ever.
              </p>
            </div>
            <table className={s.priceTable}>
              <caption data-edit="prices.srOnly" className={s.srOnly}>Prices for sweeping and inspection</caption>
              <thead>
                <tr>
                  <th data-edit="prices.heading" scope="col">Work</th>
                  <th data-edit="prices.heading2" scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map(([work, note, price], i) => (
                  <tr key={work}>
                    <th scope="row">
                      <span data-edit={`prices.priceWork.${i}`} data-edit-max="60" className={s.priceWork}>{work}</span>
                      <span data-edit={`prices.priceNote.${i}`} data-edit-max="60" className={s.priceNote}>{note}</span>
                    </th>
                    <td data-edit={`prices.cell.${i}`}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------------------------------------------------------------- BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div className={s.bookInfo}>
              <p data-edit="book.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Book a sweep</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Tell us about the fire</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>We reply within a working day with two dates to choose from.</p>
              <p className={s.bookPhone}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550133300">(555) 013-3300</a>
              </p>
              <p className={s.bookMail}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:book@blackflue.example">book@blackflue.example</a>
              </p>
              <p data-edit="book.bookYard" data-edit-max="240" data-edit-multiline className={s.bookYard}>The yard: 9 Kiln Lane, Harrow Mill</p>
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
              <p data-edit="book.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Booking slip</p>
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="bf-name">Name</label>
                <input id="bf-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="bf-phone">Phone</label>
                <input id="bf-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label3" htmlFor="bf-address">Address of the chimney</label>
                <input id="bf-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <fieldset className={`${s.fieldset} ${s.wide}`}>
                <legend data-edit="book.legend">What do you burn in</legend>
                <div className={s.picks}>
                  <input id="bf-a1" type="radio" name="appliance" value="fireplace" />
                  <label data-edit="book.label4" htmlFor="bf-a1">Open fireplace</label>
                  <input id="bf-a2" type="radio" name="appliance" value="stove" />
                  <label data-edit="book.label5" htmlFor="bf-a2">Wood stove</label>
                  <input id="bf-a3" type="radio" name="appliance" value="insert" />
                  <label data-edit="book.label6" htmlFor="bf-a3">Insert</label>
                  <input id="bf-a4" type="radio" name="appliance" value="oil-gas" />
                  <label data-edit="book.label7" htmlFor="bf-a4">Oil or gas</label>
                </div>
              </fieldset>
              <div className={s.field}>
                <label data-edit="book.label8" htmlFor="bf-last">Last swept</label>
                <input id="bf-last" name="last" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label9" htmlFor="bf-month">Month you would like</label>
                <input id="bf-month" name="month" type="text" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label10" htmlFor="bf-note">Anything we should know</label>
                <textarea id="bf-note" name="note" rows={3} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a date</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,2,2,3,5" className={s.course} aria-hidden="true">
          <TabbiedPattern
            pattern={hitandmiss}
            palette={COURSE}
            fit="grid"
            cellSize={36}
            seed="blackflue-course"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Black Flue Chimney Sweeps</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>9 Kiln Lane, Harrow Mill. (555) 013-3300.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional chimney sweep. The sweeps, prices, certificate and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
