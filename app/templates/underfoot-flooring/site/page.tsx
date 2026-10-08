import { TabbiedPattern } from 'tabbied/react';
import { fustian } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './underfoot-flooring.module.css';

export const metadata = {
  title: 'Underfoot Flooring: Wood, vinyl, carpet and tile, measured and laid',
  description:
    'Underfoot lays solid oak, engineered wood, vinyl plank, carpet and tile. A free measure at home, a fixed written quote in two days, and a crew that comes back after a year to check.',
};

/* Site colors, the same hexes as the stylesheet's root rule: linen walls,
   walnut type, oak and terracotta, a sage and a honey. Fustian, the hard
   rib, is the floor itself: laid in perspective under the hero, cut into
   the five swatches of the sample book, run as a threshold strip and along
   the footer. */
const LINEN = '#f3ece0';
const WALNUT = '#2e241e';
const OAK = '#b06f37';
const TERRA = '#c25a3a';
const SAGE = '#7f9471';
const HONEY = '#e3b35f';

const FLOOR = [LINEN, OAK, HONEY, WALNUT, TERRA, SAGE];
const SWATCH = ['transparent', WALNUT, OAK, LINEN, TERRA, HONEY];
const STRIP = ['transparent', OAK, HONEY, SAGE, TERRA, LINEN];

const NAV = [
  ['Sample book', '#samples'],
  ['Measure and quote', '#measure'],
  ['Prices', '#prices'],
  ['Aftercare', '#care'],
  ['Showroom', '#showroom'],
];

type Sample = {
  id: string;
  name: string;
  price: string;
  pitch: string;
  thick: string;
  rooms: string;
  avoid: string;
  life: string;
  lead: string;
};

/* The sample book: one divider tab per material, read like the binder on
   the showroom counter. Prices are per square foot, laid and finished. */
const SAMPLES: Sample[] = [
  { id: 'oak', name: 'Solid oak', price: '$11.80', pitch: 'Three-quarter inch white oak boards, nailed down and finished on site in matte or satin. The floor that outlives the house, sanded back every fifteen years.', thick: '3/4 in, sands 5-6 times', rooms: 'Living rooms, bedrooms, halls', avoid: 'Basements, full bathrooms', life: '80 years and up', lead: '2-3 weeks' },
  { id: 'engineered', name: 'Engineered wood', price: '$9.40', pitch: 'A real oak top layer on a stable plywood core. It floats or glues over concrete, so it goes where solid wood would cup.', thick: '5/8 in, 4 mm oak top', rooms: 'Condos, over radiant heat, on slab', avoid: 'Standing water', life: '30-40 years', lead: '1-2 weeks' },
  { id: 'vinyl', name: 'Vinyl plank', price: '$6.20', pitch: 'Rigid-core luxury vinyl that clicks together over almost anything. Waterproof, quiet with the pad we fit, and easy on a dog.', thick: '7 mm, 20 mil wear layer', rooms: 'Kitchens, basements, rentals', avoid: 'Sunrooms with no blinds', life: '15-25 years', lead: '3-5 days' },
  { id: 'carpet', name: 'Carpet', price: '$5.40', pitch: 'Wool, nylon and wool-blend broadloom on a half-inch pad, stretched with a power stretcher so it never ripples.', thick: 'Pile 3/8 to 3/4 in', rooms: 'Bedrooms, stairs, playrooms', avoid: 'Kitchens, entries', life: '10-15 years', lead: '1 week' },
  { id: 'tile', name: 'Porcelain tile', price: '$14.60', pitch: 'Through-body porcelain on an uncoupling membrane, so a moving subfloor never cracks the grout. Any size up to 24 by 48.', thick: '3/8 in on membrane', rooms: 'Baths, mudrooms, kitchens', avoid: 'Bouncy joists, until fixed', life: '50 years and up', lead: '1-2 weeks' },
];

const STEPS = [
  ['Free measure', '45 minutes at your house. We laser-measure every room, check the subfloor for moisture and bounce, and leave samples overnight so you see them in your own light.', 'Day 1'],
  ['Written quote', 'Itemized: material, removal, prep, trims and labor, one fixed price. It holds for 60 days and it is the price you pay, unless we find rot under the old floor.', 'Within 48 hours'],
  ['Order and acclimate', 'Wood sits in your house for three days before it goes down, so it settles to your heating and humidity first. Vinyl and tile skip this.', '1-3 weeks'],
  ['Lay and walk through', 'We move the furniture, lay the floor, fit the trims and vacuum. Then we walk every room with you before we are paid.', 'Most rooms in 1-2 days'],
];

const JOBS = [
  ['Bedroom, 12 by 14 ft', 'Wool-blend carpet on new pad', '$1,350'],
  ['Kitchen, 180 sq ft', 'Vinyl plank, old sheet vinyl removed', '$1,620'],
  ['Bathroom, 45 sq ft', 'Porcelain tile, membrane, new threshold', '$1,480'],
  ['Living room and hall, 420 sq ft', 'Engineered oak, glued to slab', '$4,900'],
  ['Stairs, 13 steps', 'Oak treads and painted risers', '$2,340'],
  ['Downstairs, 900 sq ft', 'Sand and refinish existing oak, three coats', '$3,150'],
];

const INCLUDED = [
  'Taking up and hauling away the old floor',
  'Moving furniture out and back, pianos aside',
  'Underlayment, transitions and thresholds',
  'Shoe molding, painted or stained to match',
  'A vacuum and a damp mop when we leave',
];

const EXTRAS = [
  ['Subfloor leveling', '$2.50 / sq ft'],
  ['Stair nosing on vinyl', '$65 / step'],
  ['Door trimmed to clear', '$40 / door'],
  ['Floor vent to match', '$35 each'],
];

const CARE = [
  ['Solid and engineered wood', 'Felt pads under every chair leg. Sweep or vacuum, then a damp mop with a pH-neutral cleaner. No steam mops, ever. A screen and recoat every five to eight years keeps the finish from wearing through.'],
  ['Vinyl plank', 'Any mop and any household cleaner. Avoid rubber-backed rugs, which stain the surface yellow, and lift heavy furniture rather than dragging it.'],
  ['Carpet', 'Vacuum twice a week where you walk the most. Blot spills, never rub. Hot-water extraction every 18 months keeps the warranty valid.'],
  ['Porcelain tile', 'Seal the grout at one year and every three after. Tile itself needs nothing but water and a little dish soap.'],
];

const HOURS = [
  ['Tuesday to Friday', '9:00-6:00'],
  ['Saturday', '9:00-3:00'],
  ['Sunday and Monday', 'Closed, measures by appointment'],
];

export default function UnderfootFlooringPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--linen': '#f3ece0',
        '--walnut': '#2e241e',
        '--oak': '#b06f37',
        '--terra': '#c25a3a',
        '--sage': '#7f9471',
        '--honey': '#e3b35f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="linen,walnut,oak,terra,sage,honey"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Instrument+Sans:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Underfoot</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="#showroom">Book a free measure</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A room: the wall carries the words, a skirting board runs under
            them, and the floor goes back to the horizon. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.wall}>
            <div className={s.heroText}>
              <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Flooring installers, Mill Lane, since 2004</p>
              <h1 data-edit="intro.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Floors laid flat, quiet <span>and square.</span>
              </h1>
              <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Oak, engineered wood, vinyl plank, carpet and tile, supplied and
                laid by the same crew of five. A free measure, a written price
                that does not move, and a visit after a year to check our work.
              </p>
              <div className={s.heroActions}>
                <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#showroom">Book a free measure</a>
                <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#samples">Open the sample book</a>
              </div>
            </div>
            <aside className={s.tag}>
              <p data-edit="tag.tagLabel" data-edit-max="240" data-edit-multiline className={s.tagLabel}>On this floor</p>
              <p data-edit="tag.tagName" data-edit-max="240" data-edit-multiline className={s.tagName}>Rib carpet tile, in four colors</p>
              <p data-edit="tag.tagPrice" data-edit-max="240" data-edit-multiline className={s.tagPrice}>$5.40 / sq ft, laid</p>
            </aside>
          </div>
          <div className={s.skirting} aria-hidden="true" />
          <div className={s.floor}>
            <div data-edit-pattern="intro.field" data-edit-roles="0,2,5,1,3,4" className={s.floorPlane} aria-hidden="true">
              <TabbiedPattern
                pattern={fustian}
                palette={FLOOR}
                fit="grid"
                cellSize={72}
                seed="uf-floor"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- SAMPLE BOOK */}
        <section id="samples" className={s.sec} aria-labelledby="samples-h">
          <div className={s.secHead}>
            <p data-edit="samples.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The sample book</p>
            <h2 data-edit="samples.secTitle" data-edit-max="60" id="samples-h" className={s.secTitle}>Five floors, one page each</h2>
            <p data-edit="samples.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The binder on our counter, laid out here. Prices are per square
              foot with material, underlay and labor, before trims and extras.
            </p>
          </div>
          <nav className={s.tabIndex} aria-label="Materials">
            {SAMPLES.map((m, i) => (
              <a data-edit={`samples.link.${i}`} data-edit-max="28" key={m.id} href={`#${m.id}`} className={s[`dot_${m.id}`]}>{m.name}</a>
            ))}
          </nav>
          <div className={s.book}>
            {SAMPLES.map((m, i) => (
              <article key={m.id} id={m.id} className={`${s.sample} ${s[m.id]}`} aria-labelledby={`${m.id}-h`}>
                <h3 data-edit={`sample.tab.${i}`} data-edit-max="40" id={`${m.id}-h`} className={s.tab}>{m.name}</h3>
                <div data-edit-pattern={`sample.field.${i}`} data-edit-roles="transparent,1,2,0,3,5" className={s.swatch} aria-hidden="true">
                  <TabbiedPattern
                    pattern={fustian}
                    palette={SWATCH}
                    fit="grid"
                    cellSize={44}
                    seed={`uf-swatch-${m.id}`}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.sampleBody}>
                  <p data-edit={`sample.price.${i}`} data-edit-max="240" data-edit-multiline className={s.price}>{m.price}</p>
                  <p data-edit={`sample.per.${i}`} data-edit-max="240" data-edit-multiline className={s.per}>per sq ft, laid</p>
                  <p data-edit={`sample.pitch.${i}`} data-edit-max="240" data-edit-multiline className={s.pitch}>{m.pitch}</p>
                  <dl className={s.specs}>
                    <div>
                      <dt data-edit={`sample.term.${i}`} data-edit-max="28">Thickness</dt>
                      <dd data-edit={`sample.body.${i}`} data-edit-max="200" data-edit-multiline>{m.thick}</dd>
                    </div>
                    <div>
                      <dt data-edit={`sample.term2.${i}`} data-edit-max="28">Best in</dt>
                      <dd data-edit={`sample.body2.${i}`} data-edit-max="200" data-edit-multiline>{m.rooms}</dd>
                    </div>
                    <div>
                      <dt data-edit={`sample.term3.${i}`} data-edit-max="28">Not for</dt>
                      <dd data-edit={`sample.body3.${i}`} data-edit-max="200" data-edit-multiline>{m.avoid}</dd>
                    </div>
                    <div>
                      <dt data-edit={`sample.term4.${i}`} data-edit-max="28">Lasts</dt>
                      <dd data-edit={`sample.body4.${i}`} data-edit-max="200" data-edit-multiline>{m.life}</dd>
                    </div>
                    <div>
                      <dt data-edit={`sample.term5.${i}`} data-edit-max="28">Lead time</dt>
                      <dd data-edit={`sample.body5.${i}`} data-edit-max="200" data-edit-multiline>{m.lead}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------- MEASURE AND QUOTE
            Four steps marked off along a tape measure. */}
        <section id="measure" className={s.measure} aria-labelledby="measure-h">
          <div className={s.measureInner}>
            <div className={s.secHead}>
              <p data-edit="measure.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Measure and quote</p>
              <h2 data-edit="measure.secTitle" data-edit-max="60" id="measure-h" className={s.secTitle}>From tape measure to finished floor</h2>
            </div>
            <div className={s.tape} aria-hidden="true" />
            <ol className={s.steps}>
              {STEPS.map(([title, text, when], i) => (
                <li key={title} className={s.step}>
                  <span className={s.stepNo}>{`0${i + 1}`}</span>
                  <h3 data-edit={`measure.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                  <p data-edit={`measure.stepWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.stepWhen}>{when}</p>
                  <p data-edit={`measure.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Prices</p>
            <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>What recent jobs cost, all in</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six jobs from this spring, fitted and finished, removal and trims
              included. Your quote is written for your rooms and holds for 60
              days.
            </p>
          </div>
          <div className={s.priceGrid}>
            <ul className={s.jobs}>
              {JOBS.map(([room, what, cost], i) => (
                <li key={room} className={s.job}>
                  <span data-edit={`prices.jobRoom.${i}`} data-edit-max="60" className={s.jobRoom}>{room}</span>
                  <span data-edit={`prices.jobWhat.${i}`} data-edit-max="60" className={s.jobWhat}>{what}</span>
                  <span data-edit={`prices.jobCost.${i}`} data-edit-max="60" className={s.jobCost}>{cost}</span>
                </li>
              ))}
            </ul>
            <div className={s.included}>
              <h3 data-edit="prices.includedTitle" data-edit-max="40" className={s.includedTitle}>In every quote</h3>
              <ul className={s.includedList}>
                {INCLUDED.map((item, i) => (
                  <li data-edit={`prices.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
              <h3 data-edit="prices.includedTitle2" data-edit-max="40" className={s.includedTitle}>Only if needed</h3>
              <dl className={s.extras}>
                {EXTRAS.map(([what, cost], i) => (
                  <div key={what}>
                    <dt data-edit={`prices.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{cost}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,5,4,3,0" className={s.threshold} aria-hidden="true">
          <TabbiedPattern
            pattern={fustian}
            palette={STRIP}
            fit="grid"
            cellSize={36}
            seed="uf-threshold"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- AFTERCARE */}
        <section id="care" className={s.sec} aria-labelledby="care-h">
          <div className={s.careGrid}>
            <div className={s.careHead}>
              <p data-edit="care.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Aftercare</p>
              <h2 data-edit="care.secTitle" data-edit-max="60" id="care-h" className={s.secTitle}>Look after it and it looks after you</h2>
              <p data-edit="care.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                A care card goes in the kitchen drawer the day we finish. Twelve
                months on we come back, free, to fix a squeak, re-glue a lifted
                edge or reset a cracked grout line.
              </p>
              <p data-edit="care.warranty" data-edit-max="240" data-edit-multiline className={s.warranty}>Workmanship guaranteed for 5 years</p>
            </div>
            <ul className={s.cards}>
              {CARE.map(([title, text], i) => (
                <li key={title} className={s.card}>
                  <h3 data-edit={`care.cardTitle.${i}`} data-edit-max="40" className={s.cardTitle}>{title}</h3>
                  <p data-edit={`care.cardText.${i}`} data-edit-max="240" data-edit-multiline className={s.cardText}>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- SHOWROOM */}
        <section id="showroom" className={s.showroom} aria-labelledby="showroom-h">
          <div className={s.showroomInner}>
            <div className={s.visit}>
              <p data-edit="showroom.eyebrowDark" data-edit-max="240" data-edit-multiline className={s.eyebrowDark}>Showroom</p>
              <h2 data-edit="showroom.visitTitle" data-edit-max="60" id="showroom-h" className={s.visitTitle}>Walk on it before you buy it</h2>
              <p data-edit="showroom.visitLine" data-edit-max="240" data-edit-multiline className={s.visitLine}>88 Mill Lane, Unit 4, behind the timber yard</p>
              <p data-edit="showroom.visitLine2" data-edit-max="240" data-edit-multiline className={s.visitLine}>Every floor in the book, laid out full size</p>
              <p className={s.visitLink}>
                <a data-edit="showroom.link" data-edit-max="28" href="tel:+15550173360">(555) 017-3360</a>
              </p>
              <p className={s.visitLink}>
                <a data-edit="showroom.link2" data-edit-max="28" href="mailto:measure@underfoot.example">measure@underfoot.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`showroom.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`showroom.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <h3 data-edit="showroom.formTitle" data-edit-max="40" className={s.formTitle}>Book a free measure</h3>
              <div className={s.field}>
                <label data-edit="showroom.label" htmlFor="uf-name">Name</label>
                <input id="uf-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="showroom.label2" htmlFor="uf-phone">Phone</label>
                <input id="uf-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="showroom.label3" htmlFor="uf-address">Address</label>
                <input id="uf-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="showroom.label4" htmlFor="uf-floor">Floor you are thinking of</label>
                <select id="uf-floor" name="floor" defaultValue="unsure">
                  <option value="unsure">Not sure yet</option>
                  <option value="oak">Solid oak</option>
                  <option value="engineered">Engineered wood</option>
                  <option value="vinyl">Vinyl plank</option>
                  <option value="carpet">Carpet</option>
                  <option value="tile">Porcelain tile</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="showroom.label5" htmlFor="uf-area">Rough area, sq ft</label>
                <input id="uf-area" name="area" type="text" inputMode="numeric" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="showroom.label6" htmlFor="uf-rooms">Which rooms, and what is down now</label>
                <textarea id="uf-rooms" name="rooms" rows={3} />
              </div>
              <button data-edit="showroom.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a visit</button>
              <p data-edit="showroom.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We call back the same day to set a time.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,5,4,3,0" className={s.footFloor} aria-hidden="true">
          <TabbiedPattern
            pattern={fustian}
            palette={STRIP}
            fit="grid"
            cellSize={48}
            seed="uf-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Underfoot Flooring</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional flooring company. The crew, prices, jobs and address
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
