import { TabbiedPattern } from 'tabbied/react';
import { weave } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './pile-weave-rug-care.module.css';

export const metadata = {
  title: 'Pile & Weave Rug Care: Hand washing for rugs and carpets, Tannery Lane',
  description:
    'Pile & Weave washes rugs by hand in a full immersion pit on Tannery Lane and cleans carpets in the home. Priced by the square foot, with free pickup and delivery within fifteen miles.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   care label sewn to the back of a rug: undyed wool for the ground, then
   the four vegetable dyes a dyer keeps in pots, indigo, madder, weld
   saffron and an olive from walnut and iron. The weave is the rug itself,
   on a transparent ground so the wool shows between the threads. It is the
   rug in the hero, a runner laid between the sections, and the doormat at
   the foot of the page. */
const WOOL = '#f4ecdc';
const INDIGO = '#23325a';
const MADDER = '#b5392f';
const SAFFRON = '#e0a13a';
const OLIVE = '#6f7a3a';

const KILIM = ['transparent', INDIGO, MADDER, SAFFRON, OLIVE, MADDER];
const RUNNER = ['transparent', MADDER, SAFFRON, INDIGO, SAFFRON, OLIVE];
const MAT = ['transparent', OLIVE, INDIGO, SAFFRON, MADDER, INDIGO];

const NAV = [
  ['Fibers', '#fibers'],
  ['Methods', '#methods'],
  ['Prices', '#prices'],
  ['Pickup', '#pickup'],
  ['Stains', '#stains'],
];

type Fiber = { code: string; name: string; how: string; watch: string };

const FIBERS: Fiber[] = [
  { code: 'WO', name: 'Wool', how: 'Dusted, then a full immersion wash in cool water with a wool shampoo that leaves the lanolin in.', watch: 'Shrinks and browns if it is dried hot or slowly. Ours dry flat in a day.' },
  { code: 'SE', name: 'Silk', how: 'Washed by hand, a section at a time, with a pH-neutral rinse and a vinegar set for the dyes.', watch: 'Water marks and dye run. Tested on the back before any water touches the front.' },
  { code: 'CO', name: 'Cotton and flatweave', how: 'Immersion wash for kilims and dhurries; the foundation of most knotted rugs is cotton too.', watch: 'Browning at the fringe. We dry fast and comb the fringe straight.' },
  { code: 'VI', name: 'Viscose and art silk', how: 'Professional wet clean only: cold water, no brushing, the pile laid by hand.', watch: 'Loses strength wet and yellows at spills. We say so before we start.' },
  { code: 'JU', name: 'Jute, sisal and seagrass', how: 'Dry cleaned: compound brushed in and vacuumed out, never soaked.', watch: 'Water leaves brown rings that do not come out. Blot only.' },
  { code: 'PP', name: 'Synthetics', how: 'Polypropylene, nylon and polyester wash like wool but take a little more heat.', watch: 'Oily stains bond to the fiber. Tell us what it was.' },
];

type Method = { symbol: string; mark: string; name: string; text: string };

/* Each method is drawn as the care symbol a label would carry. */
const METHODS: Method[] = [
  { symbol: 'tub', mark: '30', name: 'Full immersion wash', text: 'The rug lies in a shallow pit and is washed through, front and back, at 30 degrees. Grit at the base of the pile is what wears a rug out; this is the only way to reach it.' },
  { symbol: 'circle', mark: 'W', name: 'Professional wet clean', text: 'For viscose, fugitive dyes and rugs older than their owners: cold water, a pH-neutral rinse, and no machine brushing at all.' },
  { symbol: 'square', mark: '', name: 'Dry flat', text: 'Every rug dries flat on racks in a warm room with dehumidifiers, 24 to 48 hours, then the pile is groomed by hand in the direction it lies.' },
  { symbol: 'triangle', mark: '', name: 'Do not bleach', text: 'No bleach, no optical brighteners, nothing that strips the lanolin. A rug should come back the color it was, only cleaner.' },
  { symbol: 'dot', mark: '', name: 'Low moisture, in your home', text: 'Wall-to-wall carpet cleaned where it lies with hot water extraction at low flow. Dry to walk on in about four hours.' },
];

const PRICES = [
  ['Machine-made wool or synthetic', '$2.50', '$100'],
  ['Hand-tufted wool', '$3.25', '$130'],
  ['Flatweave, kilim, dhurrie', '$3.75', '$150'],
  ['Hand-knotted wool', '$4.50', '$180'],
  ['Jute, sisal, seagrass (dry clean)', '$3.00', '$120'],
  ['Silk and viscose', '$7.00', '$280'],
];

const EXTRAS = [
  ['Moth treatment and wrap for storage', '$0.75 / sq ft'],
  ['Pet urine decontamination soak', '$1.50 / sq ft'],
  ['New felt-and-rubber pad, cut to size', '$1.25 / sq ft'],
  ['Fringe and edge repair', 'quoted on sight'],
  ['Wall-to-wall carpet, in your home', '$0.45 / sq ft, $185 minimum'],
];

const STEPS = [
  ['Book a round', 'Choose a Tuesday or Friday collection. We confirm a two-hour window the evening before.'],
  ['We roll it and tag it', 'Measured, photographed front and back, and tagged with your name. You get the quote before we drive away.'],
  ['Seven to ten days', 'Dusting, the wash, two days on the drying racks, then a last look in daylight before it is rolled again.'],
  ['Laid back down', 'Brought back on the next round, unrolled on its pad, and turned so it wears evenly. Furniture moved and put back.'],
];

const ZONES = [
  ['Within 15 miles of the workshop', 'Free'],
  ['15 to 25 miles', '$35 each way'],
  ['Further out', 'Bring it to us, or ask'],
];

type Stain = { stain: string; steps: string[]; never: string };

const STAINS: Stain[] = [
  { stain: 'Red wine', steps: ['Blot with a white cloth, from the edge in.', 'Dab cold water, blot again. Repeat.'], never: 'Salt. It sets the dye in wool.' },
  { stain: 'Pet urine', steps: ['Blot hard with paper towels, standing on them.', 'Rinse with cold water and blot dry.'], never: 'Ammonia cleaners. They smell like more urine to the pet.' },
  { stain: 'Coffee and tea', steps: ['Blot up as much as you can.', 'A teaspoon of white vinegar in a cup of cold water, dabbed and blotted.'], never: 'Hot water. Tannin sets with heat.' },
  { stain: 'Candle wax', steps: ['Let it harden, or chill it with a bag of ice.', 'Lift off what you can with a blunt knife.'], never: 'An iron. It drives the wax and the dye deeper.' },
  { stain: 'Mud', steps: ['Leave it to dry completely.', 'Break it up with your fingers and vacuum.'], never: 'Rubbing it wet. That pushes it into the base of the pile.' },
  { stain: 'Anything else', steps: ['Blot, do not rub.', 'Call us and say what it was.'], never: 'Carpet spray from the supermarket. Its residue attracts dirt.' },
];

export default function PileWeaveRugCarePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--wool': '#f4ecdc',
        '--indigo': '#23325a',
        '--madder': '#b5392f',
        '--saffron': '#e0a13a',
        '--olive': '#6f7a3a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="wool,indigo,madder,saffron,olive"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Work+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Pile &amp; Weave</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Rug care since 1998</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#book">Book a pickup</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The rug on the workshop floor, with its care label turned up. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.rug}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,2" className={s.rugField} aria-hidden="true">
              <TabbiedPattern
                pattern={weave}
                palette={KILIM}
                fit="grid"
                cellSize={56}
                seed="pile-weave-hero"
                options={{ frequency: 0.9 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.label}>
            <p data-edit="hero.labelTop" data-edit-max="240" data-edit-multiline className={s.labelTop}>Care label, read before washing</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Rugs washed by hand, <em>the way they were made.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We collect your rug, wash it through in a full immersion pit, dry
              it flat for two days and bring it back with the fringe combed.
              Priced by the square foot, and quoted before we lift it.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a pickup</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#prices">Prices per square foot</a>
            </div>
            <dl className={s.labelFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Workshop</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>18 Tannery Lane</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Rounds</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>Tue and Fri</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Back in</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>7-10 days</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- FIBERS */}
        <section id="fibers" className={s.sec} aria-labelledby="fibers-h">
          <div className={s.secHead}>
            <p data-edit="fibers.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Fiber content</p>
            <h2 data-edit="fibers.secTitle" data-edit-max="60" id="fibers-h" className={s.secTitle}>First we find out what it is made of</h2>
            <p data-edit="fibers.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Turn a rug over and the back tells you most of what you need: the
              knots, the foundation, sometimes a label. We burn-test a loose
              thread when it does not, because the fiber decides the wash.
            </p>
          </div>
          <ul className={s.fibers}>
            {FIBERS.map((f, i) => (
              <li key={f.code} className={s.fiber}>
                <span className={s.fiberCode} aria-hidden="true">{f.code}</span>
                <h3 data-edit={`fibers.fiberName.${i}`} data-edit-max="40" className={s.fiberName}>{f.name}</h3>
                <p data-edit={`fibers.fiberHow.${i}`} data-edit-max="240" data-edit-multiline className={s.fiberHow}>{f.how}</p>
                <p data-edit={`fibers.fiberWatch.${i}`} data-edit-max="240" data-edit-multiline className={s.fiberWatch}>{f.watch}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- METHODS */}
        <section id="methods" className={s.secTint} aria-labelledby="methods-h">
          <div className={s.inner}>
            <div className={s.secHead}>
              <p data-edit="methods.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Care instructions</p>
              <h2 data-edit="methods.secTitle" data-edit-max="60" id="methods-h" className={s.secTitle}>Five symbols, five ways of cleaning</h2>
              <p data-edit="methods.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The symbols are the ones you would find on a garment label, and
                they mean what they say. Most rugs get the first, third and
                fourth; we tell you which before we begin.
              </p>
            </div>
            <ol className={s.methods}>
              {METHODS.map((m, i) => (
                <li key={m.name} className={s.method}>
                  <span className={`${s.symbol} ${s[m.symbol]}`} aria-hidden="true">
                    <span data-edit={`methods.symbolMark.${i}`} data-edit-max="60" className={s.symbolMark}>{m.mark}</span>
                  </span>
                  <h3 data-edit={`methods.methodName.${i}`} data-edit-max="40" className={s.methodName}>{m.name}</h3>
                  <p data-edit={`methods.methodText.${i}`} data-edit-max="240" data-edit-multiline className={s.methodText}>{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.priceGrid}>
            <div className={s.priceIntro}>
              <p data-edit="prices.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Price per square foot</p>
              <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>Length times width, times the rate</h2>
              <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                A 5 by 8 foot hand-knotted wool rug is 40 square feet: 40 times
                $4.50 is $180, with pickup and delivery included. The minimum
                order is $95.
              </p>
              <div className={s.sum}>
                <p data-edit="prices.sumLine" data-edit-max="240" data-edit-multiline className={s.sumLine}>5 ft x 8 ft = 40 sq ft</p>
                <p data-edit="prices.sumLine2" data-edit-max="240" data-edit-multiline className={s.sumLine}>40 sq ft x $4.50</p>
                <p data-edit="prices.sumTotal" data-edit-max="240" data-edit-multiline className={s.sumTotal}>$180</p>
              </div>
            </div>
            <div className={s.priceCard}>
              <table className={s.prices}>
                <caption data-edit="prices.srOnly" className={s.srOnly}>Cleaning prices per square foot by rug type</caption>
                <thead>
                  <tr>
                    <th data-edit="prices.heading" scope="col">Rug</th>
                    <th data-edit="prices.heading2" scope="col">Per sq ft</th>
                    <th data-edit="prices.heading3" scope="col">A 5 x 8</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map(([rug, rate, eg], i) => (
                    <tr key={rug}>
                      <th data-edit={`prices.heading4.${i}`} scope="row">{rug}</th>
                      <td data-edit={`prices.cell.${i}`}>{rate}</td>
                      <td data-edit={`prices.cell2.${i}`}>{eg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 data-edit="prices.extrasTitle" data-edit-max="40" className={s.extrasTitle}>As well, if it needs it</h3>
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

        <div className={s.runner} aria-hidden="true">
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,1,3,4" className={s.runnerField}>
            <TabbiedPattern
              pattern={weave}
              palette={RUNNER}
              fit="grid"
              cellSize={44}
              seed="pile-weave-runner"
              options={{ frequency: 0.85 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ---------------------------------------------------------- PICKUP */}
        <section id="pickup" className={s.sec} aria-labelledby="pickup-h">
          <div className={s.secHead}>
            <p data-edit="pickup.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Pickup and delivery</p>
            <h2 data-edit="pickup.secTitle" data-edit-max="60" id="pickup-h" className={s.secTitle}>From your floor to ours and back</h2>
            <p data-edit="pickup.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Two of us come in the van, roll the rug, move the furniture off it
              and back on, and carry it down the stairs. You do not need to do
              anything but be in.
            </p>
          </div>
          <div className={s.pickupGrid}>
            <ol className={s.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t} className={s.step}>
                  <span className={s.stepNo}>{i + 1}</span>
                  <h3 data-edit={`pickup.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                  <p data-edit={`pickup.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                </li>
              ))}
            </ol>
            <div className={s.zones}>
              <h3 data-edit="pickup.zonesTitle" data-edit-max="40" className={s.zonesTitle}>Delivery zones</h3>
              <dl className={s.zoneList}>
                {ZONES.map(([where, cost], i) => (
                  <div key={where}>
                    <dt data-edit={`pickup.term.${i}`} data-edit-max="28">{where}</dt>
                    <dd data-edit={`pickup.body.${i}`} data-edit-max="200" data-edit-multiline>{cost}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="pickup.zonesNote" data-edit-max="240" data-edit-multiline className={s.zonesNote}>Collection rounds run Tuesdays and Fridays, 8:00 to 4:00.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- STAINS */}
        <section id="stains" className={s.secTint} aria-labelledby="stains-h">
          <div className={s.inner}>
            <div className={s.secHead}>
              <p data-edit="stains.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Stain first aid</p>
              <h2 data-edit="stains.secTitle" data-edit-max="60" id="stains-h" className={s.secTitle}>In the first ten minutes</h2>
              <p data-edit="stains.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                What you do before you call us matters more than anything we do
                after. Keep a white cotton cloth under the sink for this.
              </p>
            </div>
            <ul className={s.stains}>
              {STAINS.map((st, i) => (
                <li key={st.stain} className={s.stain}>
                  <h3 data-edit={`stains.stainName.${i}`} data-edit-max="40" className={s.stainName}>{st.stain}</h3>
                  <ol className={s.stainSteps}>
                    {st.steps.map((step, i2) => (
                      <li data-edit={`stains.item.${i}.${i2}`} data-edit-max="80" key={step}>{step}</li>
                    ))}
                  </ol>
                  <p data-edit={`stains.neverLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.neverLabel}>Never</p>
                  <p data-edit={`stains.never.${i}`} data-edit-max="240" data-edit-multiline className={s.never}>{st.never}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div className={s.visit}>
              <p data-edit="book.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Book a pickup</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Tell us about the rug</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Measure it roughly, say what it is if you know, and we will send a
                quote and the next free collection window the same day.
              </p>
              <dl className={s.hours}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Workshop</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>18 Tannery Lane, Millbrook</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Open</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Monday to Friday 8:00-5:00, Saturday 9:00-1:00</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Drop-off</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>The yard gate, any time we are open</dd>
                </div>
              </dl>
              <p className={s.contact}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550147730">(555) 014-7730</a>
              </p>
              <p className={s.contact}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:workshop@pileandweave.example">workshop@pileandweave.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="pw-name">Name</label>
                <input id="pw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="pw-phone">Phone</label>
                <input id="pw-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="pw-type">What kind of rug</label>
                <select id="pw-type" name="type" defaultValue="unsure">
                  <option value="wool">Wool, machine-made</option>
                  <option value="knotted">Hand-knotted</option>
                  <option value="flat">Flatweave or kilim</option>
                  <option value="silk">Silk or viscose</option>
                  <option value="natural">Jute, sisal or seagrass</option>
                  <option value="carpet">Wall-to-wall carpet</option>
                  <option value="unsure">Not sure</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="pw-size">Size, roughly</label>
                <input id="pw-size" name="size" type="text" placeholder="5 x 8 ft" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="pw-zip">Zip code</label>
                <input id="pw-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label6" htmlFor="pw-round">Preferred round</label>
                <select id="pw-round" name="round" defaultValue="either">
                  <option value="tue">Tuesday</option>
                  <option value="fri">Friday</option>
                  <option value="either">Either</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label7" htmlFor="pw-note">Stains, pets, anything we should know</label>
                <textarea id="pw-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request a pickup</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,1,3,2,1" className={s.mat} aria-hidden="true">
          <TabbiedPattern
            pattern={weave}
            palette={MAT}
            fit="grid"
            cellSize={36}
            seed="pile-weave-mat"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Pile &amp; Weave Rug Care</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional rug cleaning workshop. The people, prices and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
