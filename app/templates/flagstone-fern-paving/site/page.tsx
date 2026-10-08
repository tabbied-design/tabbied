import { TabbiedPattern } from 'tabbied/react';
import { crazypaving, cobblestone } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './flagstone-fern-paving.module.css';

export const metadata = {
  title: 'Flagstone & Fern: Patios, paths and driveways laid by hand',
  description:
    'Flagstone & Fern lays crazy paving, sandstone flags, granite setts and resin bound patios and drives. Prices by the square meter, a fixed written quote and five days on site.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   garden plan on pale sand: fern green for the drawing ink, and the three
   stone colors the yard stocks most (terracotta, sandstone, slate). The
   crazy paving is laid on a transparent ground, so the page itself is the
   mortar in the joints. */
const SAND = '#f2ede1';
const FERN = '#24392c';
const CLAY = '#bf6440';
const OCHRE = '#d6b273';
const SLATE = '#66706b';

const PATIO = ['transparent', OCHRE, SLATE, CLAY, FERN, OCHRE];
const PATH = ['transparent', SLATE, OCHRE, FERN, CLAY, SLATE];
const SETTS = ['transparent', SLATE, FERN, OCHRE, SLATE, SAND];

const NAV = [
  ['Surfaces', '#surfaces'],
  ['Prices', '#prices'],
  ['Five days', '#days'],
  ['Questions', '#questions'],
  ['Site visit', '#visit'],
];

type Surface = { id: string; letter: string; name: string; line: string; rate: string; days: string; look: string; care: string; best: string };

const SURFACES: Surface[] = [
  { id: 'crazy', letter: 'A', name: 'Crazy paving', line: 'Broken flagstone, every joint different.', rate: '$112', days: '5 days', look: 'Cottage, relaxed, no two the same', care: 'Brush the joints each spring', best: 'Curved patios, paths, awkward corners' },
  { id: 'flags', letter: 'B', name: 'Sandstone flags', line: 'Riven slabs in three sizes, laid at random.', rate: '$128', days: '4 days', look: 'Warm, even, quietly formal', care: 'Clean once a year, seal if you like', best: 'Square patios next to the house' },
  { id: 'setts', letter: 'C', name: 'Granite setts', line: 'Small square blocks in staggered courses.', rate: '$164', days: '6 days', look: 'Old street, hard wearing', care: 'Almost none, they outlast us', best: 'Driveways, edges, steps and borders' },
  { id: 'resin', letter: 'D', name: 'Resin bound', line: 'Stone chips in clear resin, poured smooth.', rate: '$96', days: '3 days', look: 'Seamless, modern, gravel without the mess', care: 'Sweep and hose down', best: 'Drives that must drain, wheelchair routes' },
];

const SIZES = ['10 sq m', '20 sq m', '30 sq m', '50 sq m'];

const PRICES = [
  ['Crazy paving', '$1,600', '$2,720', '$3,840', '$6,080'],
  ['Sandstone flags', '$1,760', '$3,040', '$4,320', '$6,880'],
  ['Granite setts', '$2,120', '$3,760', '$5,400', '$8,680'],
  ['Resin bound', '$1,440', '$2,400', '$3,360', '$5,280'],
];

const RECEIPT = [
  ['Crazy paving, 25.2 sq m at $112', '$2,822'],
  ['Setup, skip and site protection', '$480'],
  ['Stone step down to the lawn, 4.2 m at $55', '$231'],
];

type Day = { day: string; title: string; text: string; stage: string };

const DAYS: Day[] = [
  { day: 'Monday', title: 'Mark out and dig', text: 'String lines, levels and a fall of 1 in 60 away from the house. We dig out 200 mm and take the soil away the same day.', stage: 'stage1' },
  { day: 'Tuesday', title: 'Lay the base', text: '150 mm of crushed rock, compacted in two passes with a plate. This is the part you never see and the part we guarantee for ten years.', stage: 'stage2' },
  { day: 'Wednesday', title: 'Bed and lay the stone', text: 'Each stone on a full bed of mortar, never on five dots. Crazy paving is laid like a jigsaw, big pieces at the edges.', stage: 'stage3' },
  { day: 'Thursday', title: 'Cut, edge and step', text: 'Edges cut clean, the step to the lawn set, drainage channels and the threshold at the door checked twice.', stage: 'stage4' },
  { day: 'Friday', title: 'Point and clean', text: 'Joints filled with a firm mortar, the stone washed down, the site swept. Walk on it after 48 hours, a table after a week.', stage: 'stage5' },
];

const QUESTIONS = [
  ['Do I need permission for a new driveway?', 'Not for a permeable surface draining onto your own ground. Resin bound and setts on an open base qualify; we tell you at the site visit if yours does not.'],
  ['Can you lay over my old concrete?', 'Sometimes, if it is sound and the new level clears the damp course by 150 mm. Most of the time it has to come up, and the quote says which.'],
  ['What about weeds in the joints?', 'Weeds grow in sand joints. Ours are mortar, full depth, so there is nowhere for a seed to root.'],
  ['When do you need paying?', 'Nothing up front. 30 percent when the stone is delivered, the rest when you are happy with it.'],
  ['Where does the stone come from?', 'Sandstone and setts from two quarries we have visited, with the paperwork to say no child labor was involved. Crazy paving is often reclaimed.'],
];

const HOURS = [
  ['Monday to Friday', '7:30-5:00'],
  ['Saturday', '8:00-12:00, yard open'],
  ['Sunday', 'Closed'],
];

export default function FlagstoneFernPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sand': '#f2ede1',
        '--fern': '#24392c',
        '--clay': '#bf6440',
        '--ochre': '#d6b273',
        '--slate': '#66706b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sand,fern,clay,ochre,slate"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Public+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Flagstone &amp; Fern</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#visit">Free site visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Patios, paths and driveways, laid by hand since 2006</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Pick the stone. <em>We lay it in five days.</em>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Four surfaces, one price per square meter, and the same three
              people on your site from the first string line to the last brush
              of the joints. The quote you sign is the bill you pay.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#prices">Price your patio</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#surfaces">Compare the four surfaces</a>
            </div>
            <ul className={s.promises}>
              <li data-edit="intro.item" data-edit-max="80">Free site visit</li>
              <li data-edit="intro.item2" data-edit-max="80">Fixed written quote</li>
              <li data-edit="intro.item3" data-edit-max="80">10-year guarantee on the base</li>
            </ul>
          </div>

          <figure className={s.plan}>
            <p data-edit="intro.planTitle" data-edit-max="240" data-edit-multiline className={s.planTitle}>Plan 1:50, rear garden</p>
            <div className={s.planSheet}>
              <span data-edit="intro.house" data-edit-max="60" className={s.house}>House wall</span>
              <span data-edit="intro.door" data-edit-max="60" className={s.door}>Door</span>
              <div data-edit-pattern="intro.field" data-edit-roles="transparent,3,4,2,1,3" className={s.patio} aria-hidden="true">
                <TabbiedPattern
                  pattern={crazypaving}
                  palette={PATIO}
                  fit="grid"
                  cellSize={58}
                  seed="flagstone-hero"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span data-edit="intro.dimLength" data-edit-max="60" className={s.dimLength}>6.0 m</span>
              <span data-edit="intro.dimDepth" data-edit-max="60" className={s.dimDepth}>4.2 m</span>
              <span data-edit="intro.lawn" data-edit-max="60" className={s.lawn}>Lawn</span>
            </div>
            <figcaption data-edit="intro.planCaption" data-edit-max="120" data-edit-multiline className={s.planCaption}>
              25.2 sq m of crazy paving on Ashby Road, laid in May: $3,533 all in.
            </figcaption>
          </figure>
        </section>

        <section id="surfaces" className={s.sec} aria-labelledby="surfaces-h">
          <div className={s.secHead}>
            <p data-edit="surfaces.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01</p>
            <h2 data-edit="surfaces.secTitle" data-edit-max="60" id="surfaces-h" className={s.secTitle}>Choose your surface</h2>
            <p data-edit="surfaces.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every one is laid on the same 150 mm compacted base. What changes
              is the look, the price and how long we are in your garden.
            </p>
          </div>
          <div className={s.board}>
            <figure className={s.sample}>
              <div data-edit-pattern="surfaces.field" data-edit-roles="transparent,3,4,2,1,3" className={s.swatch} aria-hidden="true">
                <TabbiedPattern
                  pattern={crazypaving}
                  palette={PATIO}
                  fit="grid"
                  cellSize={44}
                  seed="flagstone-swatch"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="surfaces.sampleName" data-edit-max="120" data-edit-multiline className={s.sampleName}>A. Crazy paving</figcaption>
            </figure>
            <figure className={s.sample}>
              <div className={`${s.swatch} ${s.flags}`} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <figcaption data-edit="surfaces.sampleName2" data-edit-max="120" data-edit-multiline className={s.sampleName}>B. Sandstone flags</figcaption>
            </figure>
            <figure className={s.sample}>
              <div data-edit-pattern="surfaces.field2" data-edit-roles="transparent,4,1,3,4,0" className={`${s.swatch} ${s.setts}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={cobblestone}
                  palette={SETTS}
                  fit="grid"
                  cellSize={30}
                  seed="flagstone-setts"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="surfaces.sampleName3" data-edit-max="120" data-edit-multiline className={s.sampleName}>C. Granite setts</figcaption>
            </figure>
            <figure className={s.sample}>
              <div className={`${s.swatch} ${s.resin}`} aria-hidden="true" />
              <figcaption data-edit="surfaces.sampleName4" data-edit-max="120" data-edit-multiline className={s.sampleName}>D. Resin bound</figcaption>
            </figure>
          </div>
          <ul className={s.surfaces}>
            {SURFACES.map((v, i) => (
              <li key={v.id} className={s.surface}>
                <p data-edit={`surfaces.surfaceLetter.${i}`} data-edit-max="240" data-edit-multiline className={s.surfaceLetter}>{v.letter}</p>
                <h3 data-edit={`surfaces.surfaceName.${i}`} data-edit-max="40" className={s.surfaceName}>{v.name}</h3>
                <p data-edit={`surfaces.surfaceLine.${i}`} data-edit-max="240" data-edit-multiline className={s.surfaceLine}>{v.line}</p>
                <p className={s.rate}>
                  <span data-edit={`surfaces.rateFig.${i}`} data-edit-max="60" className={s.rateFig}>{v.rate}</span>
                  <span data-edit={`surfaces.rateUnit.${i}`} data-edit-max="60" className={s.rateUnit}>per sq m, laid</span>
                </p>
                <dl className={s.specs}>
                  <div>
                    <dt data-edit={`surfaces.term.${i}`} data-edit-max="28">On site</dt>
                    <dd data-edit={`surfaces.body.${i}`} data-edit-max="200" data-edit-multiline>{v.days}</dd>
                  </div>
                  <div>
                    <dt data-edit={`surfaces.term2.${i}`} data-edit-max="28">Looks</dt>
                    <dd data-edit={`surfaces.body2.${i}`} data-edit-max="200" data-edit-multiline>{v.look}</dd>
                  </div>
                  <div>
                    <dt data-edit={`surfaces.term3.${i}`} data-edit-max="28">Upkeep</dt>
                    <dd data-edit={`surfaces.body3.${i}`} data-edit-max="200" data-edit-multiline>{v.care}</dd>
                  </div>
                  <div>
                    <dt data-edit={`surfaces.term4.${i}`} data-edit-max="28">Best for</dt>
                    <dd data-edit={`surfaces.body4.${i}`} data-edit-max="200" data-edit-multiline>{v.best}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,3,1,2,4" className={s.path} aria-hidden="true">
          <TabbiedPattern
            pattern={crazypaving}
            palette={PATH}
            fit="grid"
            cellSize={50}
            seed="flagstone-path"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
            <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>Priced by the square meter</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Measure the space, find the row, and you are within ten percent
              of our quote. Driveways need a deeper base: add $22 per sq m.
            </p>
          </div>
          <div className={s.priceGrid}>
            <div className={s.tableWrap}>
              <table className={s.prices}>
                <caption data-edit="prices.srOnly" className={s.srOnly}>Price of a finished patio by surface and size</caption>
                <thead>
                  <tr>
                    <th data-edit="prices.heading" scope="col">Surface</th>
                    {SIZES.map((z, i) => (
                      <th data-edit={`prices.heading2.${i}`} key={z} scope="col">{z}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map(([name, ...cells], i) => (
                    <tr key={name}>
                      <th data-edit={`prices.heading3.${i}`} scope="row">{name}</th>
                      {cells.map((c, k) => (
                        <td data-edit={`prices.cell.${i}.${k}`} key={SIZES[k]}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="prices.tableNote" data-edit-max="240" data-edit-multiline className={s.tableNote}>
                Every price includes digging out, the base, bedding, laying,
                pointing, taking the spoil away and a $480 setup charge for
                the skip and protecting your lawn and drive.
              </p>
            </div>
            <div className={s.receipt}>
              <p data-edit="prices.receiptHead" data-edit-max="240" data-edit-multiline className={s.receiptHead}>Worked example</p>
              <h3 data-edit="prices.receiptTitle" data-edit-max="40" className={s.receiptTitle}>The Ashby Road patio</h3>
              <ul className={s.receiptLines}>
                {RECEIPT.map(([what, cost], i) => (
                  <li key={what}>
                    <span data-edit={`prices.text.${i}`} data-edit-max="60">{what}</span>
                    <span data-edit={`prices.text2.${i}`} data-edit-max="60">{cost}</span>
                  </li>
                ))}
              </ul>
              <p className={s.receiptTotal}>
                <span data-edit="prices.text3" data-edit-max="60">Total, fixed</span>
                <span data-edit="prices.text4" data-edit-max="60">$3,533</span>
              </p>
              <p data-edit="prices.receiptNote" data-edit-max="240" data-edit-multiline className={s.receiptNote}>Sales tax included. No day rates, and nothing extra for rain days.</p>
            </div>
          </div>
        </section>

        <section id="days" className={s.sec} aria-labelledby="days-h">
          <div className={s.secHead}>
            <p data-edit="days.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
            <h2 data-edit="days.secTitle" data-edit-max="60" id="days-h" className={s.secTitle}>The five days of a patio</h2>
            <p data-edit="days.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A typical 25 sq m job, seen in section. The layers build up
              through the week; on Friday you have a patio.
            </p>
          </div>
          <ol className={s.days}>
            {DAYS.map((d, i) => (
              <li key={d.day} className={`${s.dayCard} ${s[d.stage]}`}>
                <div className={s.xsec} aria-hidden="true">
                  <span className={s.lStone} />
                  <span className={s.lBed} />
                  <span className={s.lBase} />
                  <span className={s.lSoil} />
                </div>
                <p data-edit={`days.dayName.${i}`} data-edit-max="240" data-edit-multiline className={s.dayName}>{d.day}</p>
                <h3 data-edit={`days.dayTitle.${i}`} data-edit-max="40" className={s.dayTitle}>{d.title}</h3>
                <p data-edit={`days.dayText.${i}`} data-edit-max="240" data-edit-multiline className={s.dayText}>{d.text}</p>
              </li>
            ))}
          </ol>
          <ul className={s.legend} aria-label="Section key">
            <li data-edit="days.keyStone" data-edit-max="80" className={s.keyStone}>Stone</li>
            <li data-edit="days.keyBed" data-edit-max="80" className={s.keyBed}>Mortar bed</li>
            <li data-edit="days.keyBase" data-edit-max="80" className={s.keyBase}>Crushed rock base</li>
            <li data-edit="days.keySoil" data-edit-max="80" className={s.keySoil}>Subsoil</li>
          </ul>
        </section>

        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.qaGrid}>
            <div className={s.qaIntro}>
              <p data-edit="questions.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
              <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>Questions at the gate</h2>
              <p data-edit="questions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The five things people ask before they let us dig. Ask us
                anything else at the site visit.
              </p>
            </div>
            <dl className={s.qa}>
              {QUESTIONS.map(([q, a], i) => (
                <div key={q}>
                  <dt data-edit={`questions.term.${i}`} data-edit-max="28">{q}</dt>
                  <dd data-edit={`questions.body.${i}`} data-edit-max="200" data-edit-multiline>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitGrid}>
            <div className={s.visitInfo}>
              <h2 data-edit="visit.visitTitle" data-edit-max="60" id="visit-h" className={s.visitTitle}>Book a free site visit</h2>
              <p data-edit="visit.visitLead" data-edit-max="240" data-edit-multiline className={s.visitLead}>
                Forty minutes in your garden with a tape and a level. You get a
                written, fixed quote by email within three working days.
              </p>
              <p data-edit="visit.yard" data-edit-max="240" data-edit-multiline className={s.yard}>The yard, 12 Quarry Lane, Fernbrook ST 30251</p>
              <p className={s.visitLine}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550364410">(555) 036-4410</a>
              </p>
              <p className={s.visitLine}>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:dig@flagstonefern.example">dig@flagstonefern.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="visit.label" htmlFor="ff-name">Name</label>
                <input id="ff-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label2" htmlFor="ff-phone">Phone</label>
                <input id="ff-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label3" htmlFor="ff-email">Email</label>
                <input id="ff-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label4" htmlFor="ff-size">Rough size, sq m</label>
                <input id="ff-size" name="size" type="text" inputMode="decimal" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="visit.legend">Surface you are thinking of</legend>
                <div className={s.picks}>
                  <input id="ff-crazy" name="surface" type="radio" value="crazy" />
                  <label data-edit="visit.label5" htmlFor="ff-crazy">Crazy paving</label>
                  <input id="ff-flags" name="surface" type="radio" value="flags" />
                  <label data-edit="visit.label6" htmlFor="ff-flags">Flags</label>
                  <input id="ff-setts" name="surface" type="radio" value="setts" />
                  <label data-edit="visit.label7" htmlFor="ff-setts">Setts</label>
                  <input id="ff-resin" name="surface" type="radio" value="resin" />
                  <label data-edit="visit.label8" htmlFor="ff-resin">Resin</label>
                  <input id="ff-unsure" name="surface" type="radio" value="unsure" />
                  <label data-edit="visit.label9" htmlFor="ff-unsure">Not sure yet</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="visit.label10" htmlFor="ff-address">Address of the job</label>
                <input id="ff-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="visit.label11" htmlFor="ff-note">What is there now</label>
                <textarea id="ff-note" name="note" rows={3} />
              </div>
              <button data-edit="visit.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a site visit</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,2,1,3" className={s.footPaving} aria-hidden="true">
          <TabbiedPattern
            pattern={crazypaving}
            palette={PATIO}
            fit="grid"
            cellSize={40}
            seed="flagstone-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Flagstone &amp; Fern</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Patios, paths and driveways. 12 Quarry Lane, Fernbrook.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>
            Flagstone &amp; Fern is a fictional business: the names, people,
            prices and address on this page are invented.
          </p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
