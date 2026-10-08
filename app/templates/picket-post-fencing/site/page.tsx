import { TabbiedPattern } from 'tabbied/react';
import { slitlattice } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './picket-post-fencing.module.css';

export const metadata = {
  title: 'Picket & Post Fencing: Wood, vinyl and aluminum fences, Ridgeway',
  description:
    'Picket & Post builds and repairs fences in Ridgeway and the Tri-Lakes towns: picket, privacy, lattice-top, post and rail, horizontal slat and aluminum, priced by the linear foot with posts set in concrete.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The slit
   lattice is the trellis panel: one sheet of a single color with diamonds
   pulled open, on a transparent ground so the sky or the section shows
   through. Cedar in the hero's fence panel, slate in the band, paint white
   over the footer. */
const PAINT = '#f4f5f0';
const SLATE = '#1f2a30';
const CEDAR = '#b4602e';
const LAWN = '#3e7a4a';
const SKY = '#a9cbe3';

const PANEL = ['transparent', CEDAR, CEDAR, CEDAR, CEDAR, CEDAR];
const BAND = ['transparent', SLATE, SLATE, SLATE, SLATE, SLATE];
const TRIM = ['transparent', PAINT, PAINT, PAINT, PAINT, PAINT];

const NAV = [
  ['Styles', '#styles'],
  ['A typical yard', '#estimate'],
  ['How it goes', '#process'],
  ['Materials', '#materials'],
  ['Get a quote', '#quote'],
];

type Style = { kind: string; name: string; height: string; wood: string; price: string; note: string };

/* Each style is drawn in CSS from its own class: the boards, the points,
   the rails. Prices are installed, per linear foot, posts included. */
const STYLES: Style[] = [
  { kind: 'picket', name: 'Picket', height: '3 or 4 ft', wood: 'Cedar or vinyl', price: '$34', note: 'Front yards, cottage gardens and keeping a dog off the flower beds.' },
  { kind: 'privacy', name: 'Privacy', height: '6 ft', wood: 'Cedar, board on board', price: '$52', note: 'Overlapped boards, so there is no gap to see through as the wood shrinks.' },
  { kind: 'lattice', name: 'Lattice top', height: '6 ft, 1 ft of lattice', wood: 'Cedar', price: '$62', note: 'Privacy below eye level, light and climbing roses above it.' },
  { kind: 'rail', name: 'Post and rail', height: '3 or 4 ft, two or three rails', wood: 'Split cedar or pine', price: '$24', note: 'Pasture lines, long driveways and marking a boundary without hiding it.' },
  { kind: 'slat', name: 'Horizontal slat', height: '5 or 6 ft', wood: 'Cedar or composite', price: '$74', note: 'Modern houses and pool decks. Gaps of a half inch or an inch, your choice.' },
  { kind: 'metal', name: 'Aluminum', height: '4 or 5 ft', wood: 'Powder-coated, black or bronze', price: '$48', note: 'Pool code compliant, never rots, and does not block the view.' },
];

const ITEMS = [
  ['Cedar privacy fence, 6 ft, 146 linear ft', '$7,592'],
  ['One 4 ft walk gate with spring closer', '$480'],
  ['Remove and haul away the old chain link', '$590'],
  ['City fence permit and the 811 utility locate', '$85'],
  ['Clear stain on both sides, applied after 60 days', '$910'],
];

const STEPS = [
  ['Day 0', 'Measure', 'We walk the line with you, mark the corners and gates with flags, and send a fixed price by the next day.'],
  ['Days 1-10', 'Locate and permit', 'We call 811 so buried lines are painted, and pull the city permit. Three to ten working days.'],
  ['Day 1 on site', 'Set the posts', 'Holes 36 inches deep, below the frost line, and every post set in concrete.'],
  ['Days 2-3', 'Let it cure', 'Two days for the concrete to take the weight. Nothing is hung on a green post.'],
  ['Day 4', 'Hang and finish', 'Rails, boards and gates, then a walk-through together and the warranty letter.'],
];

const MATERIALS = [
  ['Western red cedar', '15-20 years', 'Stain every 3 years', 'The baseline'],
  ['Pressure-treated pine', '12-15 years', 'Seal every 2 years', 'About 20% less'],
  ['Vinyl', '25-30 years', 'Hose it down in spring', 'About 30% more'],
  ['Aluminum', '30 years and more', 'None', 'About 15% more'],
];

const HOURS = [
  ['Office, Monday to Friday', '8:00-4:30'],
  ['Crews on site', '7:00-5:00'],
  ['Saturday measures', '8:00-12:00'],
];

export default function PicketPostFencingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paint': '#f4f5f0',
        '--slate': '#1f2a30',
        '--cedar': '#b4602e',
        '--lawn': '#3e7a4a',
        '--sky': '#a9cbe3',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paint,slate,cedar,lawn,sky"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Picket & Post</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550137720">Free measure: (555) 013-7720</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A fence section against the sky: two capped posts, a top rail,
            the lattice panel between them and the kick board at the foot. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Fence builders in Ridgeway and the Tri-Lakes towns since 1994</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Fences built <span>to stay square.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Picket, privacy, lattice, rail and metal, priced by the linear foot
              and built by the same four-person crew. Every post goes 36 inches
              down in concrete, so the gate still latches in ten years.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#quote">Book a free measure</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#styles">Styles and prices</a>
            </div>
            <ul className={s.heroFacts}>
              <li>
                <strong data-edit="hero.emphasis">36 in</strong>
                <span data-edit="hero.text2" data-edit-max="60">post depth, below the frost line</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis2">10 yr</strong>
                <span data-edit="hero.text3" data-edit-max="60">workmanship warranty, in writing</span>
              </li>
              <li>
                <strong data-edit="hero.emphasis3">4 days</strong>
                <span data-edit="hero.text4" data-edit-max="60">for most backyards, start to gate</span>
              </li>
            </ul>
          </div>

          <div className={s.fence}>
            <div className={s.postLeft} aria-hidden="true" />
            <div className={s.postRight} aria-hidden="true" />
            <div className={s.topRail} aria-hidden="true" />
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,2,2,2,2" className={s.panel} aria-hidden="true">
              <TabbiedPattern
                pattern={slitlattice}
                palette={PANEL}
                fit="grid"
                cellSize={38}
                seed="picket-hero-panel"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.kick} aria-hidden="true" />
            <div className={s.tag}>
              <p data-edit="hero.tagName" data-edit-max="240" data-edit-multiline className={s.tagName}>Cedar trellis panel</p>
              <p data-edit="hero.tagPrice" data-edit-max="240" data-edit-multiline className={s.tagPrice}>$62 a linear foot, installed</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- STYLES
            The catalog: each style drawn in CSS, with its price per foot. */}
        <section id="styles" className={s.sec} aria-labelledby="styles-h">
          <div className={s.secHead}>
            <h2 data-edit="styles.secTitle" data-edit-max="60" id="styles-h" className={s.secTitle}>Six fences, priced by the foot</h2>
            <p data-edit="styles.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Installed prices per linear foot, with posts every eight feet in
              concrete, on level ground. Slopes, rock and tree roots are priced
              at the measure, never after.
            </p>
          </div>
          <ul className={s.styles}>
            {STYLES.map((f, i) => (
              <li key={f.kind} className={s.style}>
                <div className={s.drawing} aria-hidden="true">
                  <div className={`${s.draw} ${s[f.kind]}`} />
                </div>
                <div className={s.styleHead}>
                  <h3 data-edit={`styles.styleName.${i}`} data-edit-max="40" className={s.styleName}>{f.name}</h3>
                  <p data-edit={`styles.stylePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.stylePrice}>{f.price}</p>
                </div>
                <p data-edit={`styles.styleUnit.${i}`} data-edit-max="240" data-edit-multiline className={s.styleUnit}>per linear foot</p>
                <dl className={s.styleFacts}>
                  <div>
                    <dt data-edit={`styles.term.${i}`} data-edit-max="28">Height</dt>
                    <dd data-edit={`styles.body.${i}`} data-edit-max="200" data-edit-multiline>{f.height}</dd>
                  </div>
                  <div>
                    <dt data-edit={`styles.term2.${i}`} data-edit-max="28">Made of</dt>
                    <dd data-edit={`styles.body2.${i}`} data-edit-max="200" data-edit-multiline>{f.wood}</dd>
                  </div>
                </dl>
                <p data-edit={`styles.styleNote.${i}`} data-edit-max="240" data-edit-multiline className={s.styleNote}>{f.note}</p>
              </li>
            ))}
          </ul>
          <p data-edit="styles.gates" data-edit-max="240" data-edit-multiline className={s.gates}>Gates: a 4 ft walk gate is $480, a 10 ft double drive gate $1,350, both with hardware that adjusts.</p>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,1,1,1,1" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={slitlattice}
            palette={BAND}
            fit="grid"
            cellSize={30}
            seed="picket-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- ESTIMATE
            A real backyard, drawn as a plan and priced line by line. */}
        <section id="estimate" className={s.sec} aria-labelledby="estimate-h">
          <div className={s.estimate}>
            <div className={s.planWrap}>
              <div className={s.plan}>
                <p data-edit="estimate.house" data-edit-max="240" data-edit-multiline className={s.house}>House</p>
                <p data-edit="estimate.dim" data-edit-max="240" data-edit-multiline className={`${s.dim} ${s.dimLeft}`}>58 ft</p>
                <p data-edit="estimate.dim2" data-edit-max="240" data-edit-multiline className={`${s.dim} ${s.dimBack}`}>30 ft</p>
                <p data-edit="estimate.dim3" data-edit-max="240" data-edit-multiline className={`${s.dim} ${s.dimRight}`}>58 ft</p>
                <p data-edit="estimate.gateMark" data-edit-max="240" data-edit-multiline className={s.gateMark}>Gate</p>
              </div>
              <p data-edit="estimate.planCaption" data-edit-max="240" data-edit-multiline className={s.planCaption}>Plan of the yard on Orchard Court: 146 feet of fence on three sides, one gate.</p>
            </div>
            <div>
              <h2 data-edit="estimate.secTitle" data-edit-max="60" id="estimate-h" className={s.secTitle}>A typical backyard, priced line by line</h2>
              <p data-edit="estimate.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The quote we sent the Abernathys last spring, with their
                permission. Yours will list the same lines; nothing is added on
                the day.
              </p>
              <table className={s.quoteTable}>
                <caption data-edit="estimate.srOnly" className={s.srOnly}>Itemized fence quote</caption>
                <tbody>
                  {ITEMS.map(([item, cost], i) => (
                    <tr key={item}>
                      <th data-edit={`estimate.heading.${i}`} scope="row">{item}</th>
                      <td data-edit={`estimate.cell.${i}`}>{cost}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th data-edit="estimate.heading2" scope="row">Total, with the 10-year warranty</th>
                    <td data-edit="estimate.cell2">$9,657</td>
                  </tr>
                </tfoot>
              </table>
              <p data-edit="estimate.terms" data-edit-max="240" data-edit-multiline className={s.terms}>A third at signing, the rest when the gate swings. No interest plans, no surprises.</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- PROCESS
            Five steps standing on a rail, each one a post. */}
        <section id="process" className={s.sec} aria-labelledby="process-h">
          <div className={s.secHead}>
            <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>How a fence job goes</h2>
            <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most backyards take four working days on site, after one to two
              weeks for the permit and the utility locate.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([day, t, d], i) => (
              <li key={t} className={s.step}>
                <span data-edit={`process.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{day}</span>
                <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                <p data-edit={`process.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------- MATERIALS */}
        <section id="materials" className={s.materials} aria-labelledby="materials-h">
          <div className={s.materialsInner}>
            <div>
              <h2 data-edit="materials.secTitle" data-edit-max="60" id="materials-h" className={s.secTitle}>Wood, vinyl or metal</h2>
              <p data-edit="materials.materialsNote" data-edit-max="240" data-edit-multiline className={s.materialsNote}>
                Cedar is what most of our customers choose, and what we build our
                own fences from. Here is how the others compare, honestly.
              </p>
              <ul className={s.promises}>
                <li data-edit="materials.item" data-edit-max="80">Stainless screws and ring-shank nails, never plain steel</li>
                <li data-edit="materials.item2" data-edit-max="80">Posts every 8 feet, gate posts in 4 x 6</li>
                <li data-edit="materials.item3" data-edit-max="80">A gap under the boards so they do not wick water</li>
              </ul>
            </div>
            <div className={s.tableWrap}>
              <table className={s.matTable}>
                <caption data-edit="materials.srOnly" className={s.srOnly}>Fence materials compared</caption>
                <thead>
                  <tr>
                    <th data-edit="materials.heading" scope="col">Material</th>
                    <th data-edit="materials.heading2" scope="col">Lasts</th>
                    <th data-edit="materials.heading3" scope="col">Upkeep</th>
                    <th data-edit="materials.heading4" scope="col">Price against cedar</th>
                  </tr>
                </thead>
                <tbody>
                  {MATERIALS.map(([m, life, care, cost], i) => (
                    <tr key={m}>
                      <th data-edit={`materials.heading5.${i}`} scope="row">{m}</th>
                      <td data-edit={`materials.cell.${i}`}>{life}</td>
                      <td data-edit={`materials.cell2.${i}`}>{care}</td>
                      <td data-edit={`materials.cell3.${i}`}>{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.sec} aria-labelledby="quote-h">
          <div className={s.quoteGrid}>
            <div>
              <h2 data-edit="quote.secTitle" data-edit-max="60" id="quote-h" className={s.secTitle}>Book a free measure</h2>
              <p data-edit="quote.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us roughly what you have in mind and we will come out within
                the week, measure, and send a fixed price the next day.
              </p>
              <address className={s.address}>
                <span data-edit="quote.text" data-edit-max="60">Picket & Post Fencing</span>
                <span data-edit="quote.text2" data-edit-max="60">1407 Sawmill Lane, Ridgeway</span>
              </address>
              <p className={s.contactLine}>
                <a data-edit="quote.link" data-edit-max="28" href="tel:+15550137720">(555) 013-7720</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="quote.link2" data-edit-max="28" href="mailto:quotes@picketandpost.example">quotes@picketandpost.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`quote.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`quote.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="quote.label" htmlFor="pp-name">Name</label>
                <input id="pp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label2" htmlFor="pp-phone">Phone</label>
                <input id="pp-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="quote.label3" htmlFor="pp-address">Street address of the job</label>
                <input id="pp-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <fieldset className={`${s.field} ${s.wide} ${s.fieldset}`}>
                <legend data-edit="quote.legend">Style you are thinking of</legend>
                <div className={s.picks}>
                  {STYLES.map((f, i) => (
                    <label key={f.kind} className={s.pick}>
                      <input type="radio" name="style" value={f.kind} />
                      <span data-edit={`quote.text3.${i}`} data-edit-max="60">{f.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className={s.field}>
                <label data-edit="quote.label4" htmlFor="pp-feet">Rough length in feet</label>
                <input id="pp-feet" name="feet" type="text" inputMode="numeric" />
              </div>
              <div className={s.field}>
                <label data-edit="quote.label5" htmlFor="pp-gates">Gates</label>
                <input id="pp-gates" name="gates" type="text" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="quote.label6" htmlFor="pp-note">Anything we should know (dogs, slopes, a pool)</label>
                <textarea id="pp-note" name="note" rows={4} />
              </div>
              <button data-edit="quote.submit" data-edit-max="24" className={s.submit} type="submit">Request the measure</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,0,0,0,0" className={s.footLattice} aria-hidden="true">
          <TabbiedPattern
            pattern={slitlattice}
            palette={TRIM}
            fit="grid"
            cellSize={28}
            seed="picket-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Picket & Post Fencing</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional fence contractor. The crew, the customers, the prices and the address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
