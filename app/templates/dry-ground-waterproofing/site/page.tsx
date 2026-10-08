import { TabbiedPattern } from 'tabbied/react';
import { downpour } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './dry-ground-waterproofing.module.css';

export const metadata = {
  title: 'Dry Ground Waterproofing: Basement waterproofing with a lifetime warranty',
  description:
    'Dry Ground fixes wet basements: crack injection, interior and exterior drain tile, membranes and sump pumps with battery backup. Free inspections, written prices, and a lifetime warranty that transfers with the house.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page reads
   from the sky down to the footing, like a cross-section dug beside a
   house. Downpour is the weather that starts every job: it fills the storm
   over the hero, falls on the drawing of the wall, and soaks the warranty
   band, always on the storm role so the streaks stay pale on dark. */
const CONCRETE = '#e9e7e1';
const STORM = '#15202b';
const RAIN = '#4f9bd0';
const CLAY = '#b0602c';
const SKY = '#c5d6e2';

const HERO_RAIN = ['transparent', CONCRETE, RAIN, SKY];
const DIAGRAM_RAIN = ['transparent', SKY, RAIN, CONCRETE];
const WARRANTY_RAIN = ['transparent', RAIN, SKY, CLAY];
const FOOT_RAIN = ['transparent', RAIN, SKY, CONCRETE];

const NAV = [
  ['Signs', '#signs'],
  ['The system', '#system'],
  ['Prices', '#prices'],
  ['Warranty', '#warranty'],
  ['How it goes', '#process'],
  ['Contact', '#contact'],
];

/* What people notice first, and what it usually means. */
const SIGNS = [
  ['A musty smell that comes back', 'Humidity above 60 percent, usually water vapor wicking through the block. Mold follows within a season.'],
  ['White, chalky lines on the wall', 'Efflorescence: salts left behind as water passes through masonry. The wall is wet from the outside.'],
  ['Water at the floor-wall joint', 'Hydrostatic pressure. The soil around the footing is full and the water is taking the shortest way in.'],
  ['Stair-step cracks in the block', 'Settling or frost push. Small ones leak; ones wider than a quarter inch need a structural look first.'],
  ['Peeling paint or bubbling drywall', 'Moisture trapped behind a finish. Waterproof paint hides the symptom and fails in two winters.'],
  ['Rust at the base of the water heater', 'Standing water you have not seen yet, usually overnight after a heavy rain.'],
];

/* The cross-section's legend, keyed to the numbered circles. */
const PARTS = [
  ['1', 'Grading and downspouts', 'Soil sloped away from the wall and downspouts carried ten feet out. The cheapest fix, and it comes first.', '$35 per extension'],
  ['2', 'Exterior membrane', 'A rubberized coat and dimpled drainage board on the outside face, so water never reaches the block.', '$190-$260 per foot'],
  ['3', 'Exterior drain tile', 'Perforated pipe in washed stone at the footing, carrying ground water around the house to daylight.', 'with the membrane'],
  ['4', 'Crack injection', 'Polyurethane injected under pressure fills a poured-wall crack from the inside to the soil.', '$650 per crack'],
  ['5', 'Interior drain channel', 'Cut into the slab along the footing, it catches water at the floor-wall joint before it spreads.', '$85-$110 per foot'],
  ['6', 'Sump pump and battery backup', 'A cast-iron pump in a sealed pit, a battery that runs it for a day when the power goes out with the storm.', '$2,350 installed'],
];

const PRICES = [
  ['Crack injection, poured wall', 'per crack, up to 8 ft', '$650'],
  ['Interior drain channel', 'per linear foot, slab restored', '$85-$110'],
  ['Sump pump with battery backup', 'pit, pump, check valve, discharge', '$2,350'],
  ['Exterior excavation and membrane', 'per linear foot, drain tile included', '$190-$260'],
  ['Window well drains and covers', 'per window', '$480'],
  ['Dehumidifier, ducted', 'installed with condensate line', '$1,900'],
];

const TERMS = [
  'Covers every foot of drain, membrane and injection we install, for as long as you own the house.',
  'Transfers once to the next owner at no charge. Buyers and their inspectors ask for it.',
  'A leak through our work is fixed free, labor and materials, within five working days.',
  'Pumps carry the maker\'s seven-year warranty; we replace them at cost after that.',
];

const STEPS = [
  ['Free inspection', '45 minutes. We read moisture levels on every wall, look at the grading and downspouts outside, and photograph what we find.'],
  ['A written plan', 'The cause in plain words, the fix, and one price. If gutters and grading will do it, we say so and leave.'],
  ['Two or three days of work', 'Most interior systems are finished in two days. We bag the dust, protect the stairs and haul away every bucket.'],
  ['A yearly sump check', 'Every spring we test the pump and the battery, free for the first five years. The calendar is ours to keep.'],
];

const FAQ = [
  ['Do you dig up the yard?', 'Only for an exterior membrane. Most basements are kept dry from the inside, with no digging at all.'],
  ['Can you work in a finished basement?', 'Yes. We remove the bottom two feet of drywall, install the channel, and leave a clean edge for your drywaller.'],
  ['Is a basement ever too wet to fix?', 'We have not met one. We have met a few that needed a structural engineer first, and we will tell you when.'],
  ['Do you offer financing?', 'Twelve months at no interest on jobs over $3,000, with a soft credit check.'],
];

export default function DryGroundWaterproofingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--concrete': '#e9e7e1',
        '--storm': '#15202b',
        '--rain': '#4f9bd0',
        '--clay': '#b0602c',
        '--sky': '#c5d6e2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="concrete,storm,rain,clay,sky"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.drop} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Dry Ground</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Waterproofing</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550137720">(555) 013-7720</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Above grade: the storm, and the card that says what we do. */}
        <section id="hero" className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,0,2,4" className={s.heroRain} aria-hidden="true">
            <TabbiedPattern
              pattern={downpour}
              palette={HERO_RAIN}
              fit="grid"
              cellSize={46}
              seed="dryground-hero"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroCard}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Basement waterproofing since 2004</p>
              <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                A dry basement, <span>for the life of the house.</span>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                We find where the water gets in, fix it once, and put a lifetime
                warranty on the work. Free inspections, one written price, and
                most jobs finished in two days.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free inspection</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#system">See how it works</a>
              </div>
            </div>
            <aside className={s.gauge} aria-labelledby="gauge-h">
              <p data-edit="gauge.gaugeLabel" data-edit-max="240" data-edit-multiline className={s.gaugeLabel}>Rain gauge</p>
              <p data-edit="gauge.gaugeFigure" data-edit-max="240" data-edit-multiline id="gauge-h" className={s.gaugeFigure}>935 gallons</p>
              <p data-edit="gauge.gaugeText" data-edit-max="240" data-edit-multiline className={s.gaugeText}>
                One inch of rain on a 1,500 square foot roof sends that much
                water toward your foundation. Where it goes next is our job.
              </p>
              <dl className={s.gaugeFacts}>
                <div>
                  <dt data-edit="gauge.term" data-edit-max="28">Basements dried</dt>
                  <dd data-edit="gauge.body" data-edit-max="200" data-edit-multiline>3,140</dd>
                </div>
                <div>
                  <dt data-edit="gauge.term2" data-edit-max="28">Warranty</dt>
                  <dd data-edit="gauge.body2" data-edit-max="200" data-edit-multiline>Lifetime</dd>
                </div>
              </dl>
            </aside>
          </div>
          <div className={s.grade}>
            <span data-edit="hero.gradeLabel" data-edit-max="60" className={s.gradeLabel}>Grade, 0 ft</span>
          </div>
        </section>

        {/* ----------------------------------------------------------- SIGNS */}
        <section id="signs" className={`${s.stratum} ${s.topsoil}`} aria-labelledby="signs-h">
          <div className={s.depth}>
            <span data-edit="signs.depthFt" data-edit-max="60" className={s.depthFt}>-1 ft</span>
            <span data-edit="signs.depthName" data-edit-max="60" className={s.depthName}>Topsoil</span>
          </div>
          <div className={s.stratumBody}>
            <div className={s.head}>
              <h2 data-edit="signs.title" data-edit-max="60" id="signs-h" className={s.title}>Signs of a wet basement</h2>
              <p data-edit="signs.note" data-edit-max="240" data-edit-multiline className={s.note}>
                Water rarely arrives as a puddle first. These are the six things
                homeowners tell us they noticed, and what each one usually means.
              </p>
            </div>
            <ul className={s.signs}>
              {SIGNS.map(([sign, meaning], i) => (
                <li key={sign} className={s.sign}>
                  <span className={s.signNo}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 data-edit={`signs.signTitle.${i}`} data-edit-max="40" className={s.signTitle}>{sign}</h3>
                  <p data-edit={`signs.signText.${i}`} data-edit-max="240" data-edit-multiline className={s.signText}>{meaning}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- SYSTEM
            The cross-section: the wall, the soil, the pipes, numbered. */}
        <section id="system" className={`${s.stratum} ${s.backfill}`} aria-labelledby="system-h">
          <div className={s.depth}>
            <span data-edit="system.depthFt" data-edit-max="60" className={s.depthFt}>-4 ft</span>
            <span data-edit="system.depthName" data-edit-max="60" className={s.depthName}>Backfill</span>
          </div>
          <div className={s.stratumBody}>
            <div className={s.head}>
              <h2 data-edit="system.title" data-edit-max="60" id="system-h" className={s.title}>The wall, in cross-section</h2>
              <p data-edit="system.note" data-edit-max="240" data-edit-multiline className={s.note}>
                Six parts keep a basement dry. Few houses need all six; the
                inspection tells us which ones yours does.
              </p>
            </div>
            <div className={s.systemGrid}>
              <figure className={s.xs}>
                <div data-edit-pattern="system.field" data-edit-roles="transparent,4,2,0" className={s.xsSky} aria-hidden="true">
                  <TabbiedPattern
                    pattern={downpour}
                    palette={DIAGRAM_RAIN}
                    fit="grid"
                    cellSize={34}
                    seed="dryground-diagram"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.xsSoil} aria-hidden="true" />
                <div className={s.xsRoom}>
                  <span data-edit="system.xsTag" data-edit-max="60" className={s.xsTag}>Basement</span>
                </div>
                <div className={s.xsFloor} aria-hidden="true" />
                <div className={s.xsSlab} aria-hidden="true" />
                <div className={s.xsFooting} aria-hidden="true" />
                <div className={s.xsWall} aria-hidden="true" />
                <div className={s.xsCrack} aria-hidden="true" />
                <div className={s.xsMembrane} aria-hidden="true" />
                <div className={s.xsGravel} aria-hidden="true" />
                <div className={s.xsTile} aria-hidden="true" />
                <div className={s.xsChannel} aria-hidden="true" />
                <div className={s.xsPit} aria-hidden="true" />
                <div className={s.xsPump} aria-hidden="true" />
                <div className={s.xsRiser} aria-hidden="true" />
                <div className={s.xsOutlet} aria-hidden="true" />
                <div className={s.xsSpout} aria-hidden="true" />
                <span data-edit="system.xsChip" data-edit-max="60" className={s.xsChip}>Outside</span>
                <span data-edit="system.pin" data-edit-max="60" className={`${s.pin} ${s.pin1}`}>1</span>
                <span data-edit="system.pin2" data-edit-max="60" className={`${s.pin} ${s.pin2}`}>2</span>
                <span data-edit="system.pin3" data-edit-max="60" className={`${s.pin} ${s.pin3}`}>3</span>
                <span data-edit="system.pin4" data-edit-max="60" className={`${s.pin} ${s.pin4}`}>4</span>
                <span data-edit="system.pin5" data-edit-max="60" className={`${s.pin} ${s.pin5}`}>5</span>
                <span data-edit="system.pin6" data-edit-max="60" className={`${s.pin} ${s.pin6}`}>6</span>
                <figcaption data-edit="system.srOnly" data-edit-max="120" data-edit-multiline className={s.srOnly}>
                  A foundation wall in cross-section, with rain above grade, soil
                  outside, the basement inside and six numbered parts.
                </figcaption>
              </figure>
              <ol className={s.parts}>
                {PARTS.map(([no, name, text, price], i) => (
                  <li key={no} className={s.part}>
                    <span data-edit={`system.partNo.${i}`} data-edit-max="60" className={s.partNo}>{no}</span>
                    <div>
                      <h3 data-edit={`system.partName.${i}`} data-edit-max="40" className={s.partName}>{name}</h3>
                      <p data-edit={`system.partText.${i}`} data-edit-max="240" data-edit-multiline className={s.partText}>{text}</p>
                      <p data-edit={`system.partPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.partPrice}>{price}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={`${s.stratum} ${s.clayLayer}`} aria-labelledby="prices-h">
          <div className={s.depth}>
            <span data-edit="prices.depthFt" data-edit-max="60" className={s.depthFt}>-6 ft</span>
            <span data-edit="prices.depthName" data-edit-max="60" className={s.depthName}>Clay</span>
          </div>
          <div className={s.stratumBody}>
            <div className={s.pricesGrid}>
              <div className={s.head}>
                <h2 data-edit="prices.title" data-edit-max="60" id="prices-h" className={s.title}>What it costs</h2>
                <p data-edit="prices.note" data-edit-max="240" data-edit-multiline className={s.note}>
                  Typical prices for this county. Your price comes in writing after
                  the inspection, and it does not change once we start digging.
                </p>
                <p data-edit="prices.example" data-edit-max="240" data-edit-multiline className={s.example}>
                  A typical 120-foot basement with an interior channel and one
                  sump pump comes to about $13,100.
                </p>
              </div>
              <table className={s.prices}>
                <caption data-edit="prices.srOnly" className={s.srOnly}>Typical prices for waterproofing work</caption>
                <thead>
                  <tr>
                    <th data-edit="prices.heading" scope="col">Work</th>
                    <th data-edit="prices.heading2" scope="col">Counted</th>
                    <th data-edit="prices.heading3" scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map(([work, unit, price], i) => (
                    <tr key={work}>
                      <th data-edit={`prices.heading4.${i}`} scope="row">{work}</th>
                      <td data-edit={`prices.cell.${i}`}>{unit}</td>
                      <td data-edit={`prices.priceCell.${i}`} className={s.priceCell}>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- WARRANTY */}
        <section id="warranty" className={s.warranty} aria-labelledby="warranty-h">
          <div data-edit-pattern="warranty.field" data-edit-roles="transparent,2,4,3" className={s.warrantyRain} aria-hidden="true">
            <TabbiedPattern
              pattern={downpour}
              palette={WARRANTY_RAIN}
              fit="grid"
              cellSize={40}
              seed="dryground-warranty"
              options={{ frequency: 0.8 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.warrantyInner}>
            <div className={s.warrantyCard}>
              <p data-edit="warranty.warrantyKicker" data-edit-max="240" data-edit-multiline className={s.warrantyKicker}>Lifetime, transferable</p>
              <h2 data-edit="warranty.warrantyTitle" data-edit-max="60" id="warranty-h" className={s.warrantyTitle}>It rains on the warranty, not in the basement.</h2>
              <ul className={s.terms}>
                {TERMS.map((t, i) => (
                  <li data-edit={`warranty.item.${i}`} data-edit-max="80" key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- PROCESS */}
        <section id="process" className={`${s.stratum} ${s.gravelLayer}`} aria-labelledby="process-h">
          <div className={s.depth}>
            <span data-edit="process.depthFt" data-edit-max="60" className={s.depthFt}>-8 ft</span>
            <span data-edit="process.depthName" data-edit-max="60" className={s.depthName}>Footing</span>
          </div>
          <div className={s.stratumBody}>
            <div className={s.head}>
              <h2 data-edit="process.title" data-edit-max="60" id="process-h" className={s.title}>How it goes</h2>
              <p data-edit="process.note" data-edit-max="240" data-edit-multiline className={s.note}>
                From the first call to a dry floor is usually under three weeks,
                and in spring we keep two crews free for emergencies.
              </p>
            </div>
            <ol className={s.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t} className={s.step}>
                  <span className={s.stepNo}>Step {i + 1}</span>
                  <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                  <p data-edit={`process.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                </li>
              ))}
            </ol>
            <div className={s.faq}>
              {FAQ.map(([q, a], i) => (
                <details key={q} className={s.faqItem}>
                  <summary data-edit={`process.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`process.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactInner}>
            <div>
              <h2 data-edit="contact.contactTitle" data-edit-max="60" id="contact-h" className={s.contactTitle}>Book a free inspection</h2>
              <p data-edit="contact.contactLead" data-edit-max="240" data-edit-multiline className={s.contactLead}>
                Tell us what you are seeing. We call back the same working day,
                and if water is coming in right now, call the line below.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Phone, 24 hours in a storm</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>(555) 013-7720</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Email</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>dry@dryground.example</dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Yard and office</dt>
                  <dd data-edit="contact.body3" data-edit-max="200" data-edit-multiline>40 Culvert Road, Millbrook Flats</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Office hours</dt>
                  <dd data-edit="contact.body4" data-edit-max="200" data-edit-multiline>Monday to Friday 7:30-5:00, Saturday 8:00-12:00</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="dg-name">Name</label>
                <input id="dg-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="dg-phone">Phone</label>
                <input id="dg-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label3" htmlFor="dg-address">Address of the house</label>
                <input id="dg-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="dg-sign">What you see</label>
                <select id="dg-sign" name="sign" defaultValue="water">
                  <option value="water">Water on the floor</option>
                  <option value="damp">Damp walls or a smell</option>
                  <option value="cracks">Cracks in the wall</option>
                  <option value="sump">A failing sump pump</option>
                  <option value="selling">Selling the house</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="dg-finished">Basement is</label>
                <select id="dg-finished" name="finished" defaultValue="unfinished">
                  <option value="unfinished">Unfinished</option>
                  <option value="partly">Partly finished</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="dg-note">Anything else</label>
                <textarea id="dg-note" name="note" rows={3} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Request the inspection</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,0" className={s.footRain} aria-hidden="true">
          <TabbiedPattern
            pattern={downpour}
            palette={FOOT_RAIN}
            fit="grid"
            cellSize={30}
            seed="dryground-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Dry Ground Waterproofing</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional contractor. The company, crews, prices, warranty and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
