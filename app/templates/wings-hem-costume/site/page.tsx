import { TabbiedPattern } from 'tabbied/react';
import { bobbin } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './wings-hem-costume.module.css';

export const metadata = {
  title: 'Wings & Hem: Theatre costume design, builds and rentals',
  description:
    'Delphine Arkwright designs, builds and fits costumes for theatre, opera and dance. A costume plot scene by scene, past productions, a rental stock of 1,155 pieces and a workshop for builds, alterations and breakdown.',
};

/* Site colors, the same hexes as the stylesheet's root rule. A dark stage,
   a cream program, a scarlet house curtain, and the gold and sage of the
   thread wall. The bobbins are the workshop's thread, a wall of spools on
   a transparent ground so the stage shows between them. */
const STAGE = '#1e1716';
const CREAM = '#f1e6d2';
const SCARLET = '#d4483a';
const GOLD = '#e2a73a';
const SAGE = '#7fa886';

const THREADS = ['transparent', SCARLET, GOLD, SAGE, CREAM, SAGE];
const SELVEDGE = ['transparent', GOLD, SCARLET, CREAM, SAGE, GOLD];
const SPOOLS = ['transparent', CREAM, SCARLET, GOLD, SAGE, SCARLET];

const NAV = [
  ['Costume plot', '#plot'],
  ['Productions', '#productions'],
  ['Rentals', '#rentals'],
  ['Workshop', '#workshop'],
  ['Stage door', '#contact'],
];

const SCENES = ['I.2', 'I.3', 'I.5', 'II.3', 'II.5', 'III.4', 'V.1'];

type PlotRow = { who: string; actor: string; cells: string[]; qc: number[] };

/* Twelfth Night, scene by scene. An empty cell is a scene the character
   is not in; qc marks a quick change, under a minute in the wings. */
const PLOT: PlotRow[] = [
  { who: 'Viola', actor: 'R. Amadi', cells: ['V1 Shipwreck dress, wet', '', 'V2 Cesario livery', '', '', 'V2 + sword belt', 'V2, cap off'], qc: [] },
  { who: 'Olivia', actor: 'J. Sorensen', cells: ['', '', 'O1 Mourning, veiled', '', '', 'O2 Half-mourning lilac', 'O3 Wedding ivory'], qc: [6] },
  { who: 'Malvolio', actor: 'P. Hartigan', cells: ['', '', 'M1 Steward black', 'M2 Nightshirt and cap', 'M1', 'M3 Yellow, cross-gartered', 'M4 Released, torn'], qc: [3, 5] },
  { who: 'Sir Toby', actor: 'D. Mensah', cells: ['', 'T1 Doublet, undone', 'T1', 'T2 Shirtsleeves', 'T1 + hat', 'T1', 'T3 Bandaged head'], qc: [6] },
  { who: 'Maria', actor: 'C. Bell', cells: ['', 'Ma1 Housekeeper', 'Ma1', 'Ma2 Night wrapper', 'Ma1', 'Ma1', 'Ma3 Sunday best'], qc: [3] },
  { who: 'Feste', actor: 'L. Ortiz', cells: ['', '', 'F1 Motley', 'F1', '', '', 'F2 Motley, rain cloak'], qc: [] },
];

const PRODUCTIONS = [
  { year: '2025', title: 'The Importance of Being Earnest', company: 'Lantern Theatre Company', count: '38 costumes', note: 'Edwardian, built in six weeks. Gwendolen\'s hats got their own curtain call.' },
  { year: '2025', title: 'The Cherry Orchard', company: 'Northgate Repertory', count: '41 costumes', note: 'Every fabric aged by hand, so the family looks like money running out.' },
  { year: '2024', title: 'Die Fledermaus', company: 'Riverside Opera Workshop', count: '64 costumes', note: 'A ballroom of 30 in two weeks, half of it from our own rental stock.' },
  { year: '2024', title: 'A Midsummer Night\'s Dream', company: 'Saltmarsh Shakespeare, outdoors', count: '52 costumes', note: 'Fairies in hand-dyed silk, proofed against three weeks of coastal rain.' },
  { year: '2023', title: 'The Pirates of Penzance', company: 'Bellwether Players', count: '47 costumes', note: 'Twelve policemen, twelve daughters, one very fast change for Frederic.' },
  { year: '2023', title: 'Giselle', company: 'Eastbank Dance Company', count: '30 costumes', note: 'Romantic tutus, eleven layers of tulle each, built to survive the lifts.' },
];

const RAILS = [
  { era: 'Elizabethan and Jacobean', count: '160 pieces', price: 'from $45' },
  { era: 'Georgian and Regency', count: '120 pieces', price: 'from $40' },
  { era: 'Victorian and Edwardian', count: '310 pieces', price: 'from $40' },
  { era: 'The 1920s to the 1940s', count: '280 pieces', price: 'from $35' },
  { era: 'Uniforms and livery', count: '190 pieces', price: 'from $30' },
  { era: 'Fairies, beasts and fantasy', count: '95 pieces', price: 'from $55' },
];

const SERVICES = [
  ['Costume design', 'Script to opening night: research board, renderings, the costume plot, fittings and dress parade.', 'from $2,800 a show'],
  ['Made-to-measure builds', 'Bodices, frock coats, gowns and doublets, cut from our own blocks and fitted twice.', 'from $380 a costume'],
  ['Alterations and fittings', 'At the workshop or at your theatre, rented stock and your own wardrobe alike.', '$30 an hour'],
  ['Dyeing and breakdown', 'Aging, dirt, sweat and blood, matched to the lights you are using.', '$25-120 a piece'],
  ['Millinery', 'Toppers, bonnets, tricorns and anything with a feather on it.', 'from $90 a hat'],
  ['Running wardrobe', 'Laundry, repairs and quick-change rigging through the run.', '$160 a week'],
];

const HOURS = [
  ['Tuesday to Friday', '10:00-6:00'],
  ['Saturday', '10:00-2:00, rental pickups'],
  ['Tech week', 'By phone, any hour'],
];

export default function WingsHemPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--stage': '#1e1716',
        '--cream': '#f1e6d2',
        '--scarlet': '#d4483a',
        '--gold': '#e2a73a',
        '--sage': '#7fa886',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="stage,cream,scarlet,gold,sage"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,500;0,700;1,500&family=Jost:wght@400;500;600&family=Courier+Prime&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Wings &amp; Hem</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Costume design and workshop</span>
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
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.stage}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,2,3,4,1,4" className={s.backdrop} aria-hidden="true">
              <TabbiedPattern
                pattern={bobbin}
                palette={THREADS}
                fit="grid"
                cellSize={58}
                seed="wingshem-backdrop"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.curtainLeft} aria-hidden="true" />
            <span className={s.curtainRight} aria-hidden="true" />
            <div className={s.program}>
              <p data-edit="intro.programKicker" data-edit-max="240" data-edit-multiline className={s.programKicker}>Theatre, opera and dance, since 2009</p>
              <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Dressed for <em>every scene.</em>
              </h1>
              <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Bring me a script and a budget. I bring back a costume plot,
                the renderings, and a rail of clothes your actors can sing,
                fight and change in.
              </p>
              <div className={s.heroActions}>
                <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#plot">Read a costume plot</a>
                <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#rentals">Rent from the stock</a>
              </div>
              <p data-edit="intro.signature" data-edit-max="240" data-edit-multiline className={s.signature}>Delphine Arkwright, designer and cutter</p>
            </div>
          </div>
          <dl className={s.facts}>
            <div>
              <dt data-edit="intro.term" data-edit-max="28">Productions dressed</dt>
              <dd data-edit="intro.body" data-edit-max="200" data-edit-multiline>64</dd>
            </div>
            <div>
              <dt data-edit="intro.term2" data-edit-max="28">Pieces in the rental stock</dt>
              <dd data-edit="intro.body2" data-edit-max="200" data-edit-multiline>1,155</dd>
            </div>
            <div>
              <dt data-edit="intro.term3" data-edit-max="28">Fastest change rigged</dt>
              <dd data-edit="intro.body3" data-edit-max="200" data-edit-multiline>11 sec</dd>
            </div>
            <div>
              <dt data-edit="intro.term4" data-edit-max="28">Thread colors on the wall</dt>
              <dd data-edit="intro.body4" data-edit-max="200" data-edit-multiline>412</dd>
            </div>
          </dl>
        </section>

        <section id="plot" className={s.sec} aria-labelledby="plot-h">
          <div className={s.secHead}>
            <p data-edit="plot.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Act by act</p>
            <h2 data-edit="plot.secTitle" data-edit-max="60" id="plot-h" className={s.secTitle}>The costume plot</h2>
            <p data-edit="plot.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every show starts with this sheet: who wears what, in which scene,
              and where a change has to happen in the dark in under a minute.
              This one is from last spring.
            </p>
          </div>
          <div className={s.sheet}>
            <div className={s.sheetHead}>
              <p data-edit="plot.sheetShow" data-edit-max="240" data-edit-multiline className={s.sheetShow}>Twelfth Night</p>
              <p data-edit="plot.sheetMeta" data-edit-max="240" data-edit-multiline className={s.sheetMeta}>Harbor Street Players, spring 2026. Plot rev. 4, after dress parade.</p>
            </div>
            <div className={s.plotWrap}>
              <table className={s.plot}>
                <caption data-edit="plot.srOnly" className={s.srOnly}>Costume plot for Twelfth Night, characters by scene</caption>
                <thead>
                  <tr>
                    <th data-edit="plot.heading" scope="col">Character</th>
                    {SCENES.map((sc, i) => (
                      <th data-edit={`plot.heading2.${i}`} key={sc} scope="col">{sc}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PLOT.map((r, i) => (
                    <tr key={r.who}>
                      <th scope="row">
                        <span data-edit={`plot.plotWho.${i}`} data-edit-max="60" className={s.plotWho}>{r.who}</span>
                        <span data-edit={`plot.plotActor.${i}`} data-edit-max="60" className={s.plotActor}>{r.actor}</span>
                      </th>
                      {r.cells.map((c, k) => (
                        <td data-edit={`plot.qc.${i}.${k}`} key={SCENES[k]} className={c ? (r.qc.includes(k) ? s.qc : s.on) : s.off}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className={s.plotKey}>
              <li data-edit="plot.keyOn" data-edit-max="80" className={s.keyOn}>In the scene, costume code and note</li>
              <li data-edit="plot.keyQc" data-edit-max="80" className={s.keyQc}>Quick change, under 60 seconds in the wings</li>
              <li data-edit="plot.keyOff" data-edit-max="80" className={s.keyOff}>Not in the scene</li>
            </ul>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,1,4,3" className={s.selvedge} aria-hidden="true">
          <TabbiedPattern
            pattern={bobbin}
            palette={SELVEDGE}
            fit="grid"
            cellSize={40}
            seed="wingshem-selvedge"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="productions" className={s.sec} aria-labelledby="productions-h">
          <div className={s.secHead}>
            <p data-edit="productions.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Credits</p>
            <h2 data-edit="productions.secTitle" data-edit-max="60" id="productions-h" className={s.secTitle}>Past productions</h2>
            <p data-edit="productions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Sixty-four shows since 2009, from school halls to a 900-seat opera
              house. The last six:
            </p>
          </div>
          <ol className={s.credits}>
            {PRODUCTIONS.map((p, i) => (
              <li key={p.title} className={s.credit}>
                <p data-edit={`productions.creditYear.${i}`} data-edit-max="240" data-edit-multiline className={s.creditYear}>{p.year}</p>
                <h3 data-edit={`productions.creditTitle.${i}`} data-edit-max="40" className={s.creditTitle}>{p.title}</h3>
                <p data-edit={`productions.creditCompany.${i}`} data-edit-max="240" data-edit-multiline className={s.creditCompany}>{p.company}</p>
                <p data-edit={`productions.creditCount.${i}`} data-edit-max="240" data-edit-multiline className={s.creditCount}>{p.count}</p>
                <p data-edit={`productions.creditNote.${i}`} data-edit-max="240" data-edit-multiline className={s.creditNote}>{p.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="rentals" className={s.sec} aria-labelledby="rentals-h">
          <div className={s.secHead}>
            <p data-edit="rentals.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The stock room</p>
            <h2 data-edit="rentals.secTitle" data-edit-max="60" id="rentals-h" className={s.secTitle}>Rentals, rail by rail</h2>
            <p data-edit="rentals.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Rentals run Monday to Monday. Prices are per costume per week,
              cleaning included, with a 25 percent deposit.
            </p>
          </div>
          <div className={s.rail}>
            <ul className={s.tags}>
              {RAILS.map((r, i) => (
                <li key={r.era} className={s.tag}>
                  <h3 data-edit={`rentals.tagEra.${i}`} data-edit-max="40" className={s.tagEra}>{r.era}</h3>
                  <p data-edit={`rentals.tagCount.${i}`} data-edit-max="240" data-edit-multiline className={s.tagCount}>{r.count}</p>
                  <p data-edit={`rentals.tagPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.tagPrice}>{r.price}</p>
                  <p data-edit={`rentals.tagPer.${i}`} data-edit-max="240" data-edit-multiline className={s.tagPer}>a week</p>
                </li>
              ))}
            </ul>
          </div>
          <p data-edit="rentals.railNote" data-edit-max="240" data-edit-multiline className={s.railNote}>
            Need it to fit? We alter rented stock at $30 an hour and let it all
            out again when it comes back.
          </p>
        </section>

        <section id="workshop" className={s.sec} aria-labelledby="workshop-h">
          <div className={s.workGrid}>
            <div className={s.workIntro}>
              <p data-edit="workshop.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The workroom</p>
              <h2 data-edit="workshop.secTitle" data-edit-max="60" id="workshop-h" className={s.secTitle}>Workshop services</h2>
              <p data-edit="workshop.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Two cutting tables, four machines, a dye kitchen and a fitting
                room with a full-length mirror. Hire one service or all of them.
              </p>
              <div data-edit-pattern="workshop.field" data-edit-roles="transparent,1,2,3,4,2" className={s.spools} aria-hidden="true">
                <TabbiedPattern
                  pattern={bobbin}
                  palette={SPOOLS}
                  fit="grid"
                  cellSize={48}
                  seed="wingshem-spools"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <dl className={s.services}>
              {SERVICES.map(([name, what, price], i) => (
                <div key={name}>
                  <dt data-edit={`workshop.term.${i}`} data-edit-max="28">{name}</dt>
                  <dd data-edit={`workshop.serviceWhat.${i}`} data-edit-max="200" data-edit-multiline className={s.serviceWhat}>{what}</dd>
                  <dd data-edit={`workshop.servicePrice.${i}`} data-edit-max="200" data-edit-multiline className={s.servicePrice}>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.door}>
              <p data-edit="contact.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Stage door</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Tell me about the show</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The earlier the better: a full design wants twelve weeks before
                first tech. Rentals can go out the same day.
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>Unit 4, Cordwainer Yard</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>9 Tannery Row, Eastbank, ST 50718. Ring the bell marked W&amp;H.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550761180">(555) 076-1180</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:cue@wingsandhem.example">cue@wingsandhem.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="wh-name">Name</label>
                <input id="wh-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="wh-company">Company</label>
                <input id="wh-company" name="company" type="text" autoComplete="organization" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="wh-show">Show</label>
                <input id="wh-show" name="show" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="wh-opening">Opening night</label>
                <input id="wh-opening" name="opening" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="wh-email">Email</label>
                <input id="wh-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label6" htmlFor="wh-cast">Cast size</label>
                <input id="wh-cast" name="cast" type="text" inputMode="numeric" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">What you need</legend>
                <div className={s.picks}>
                  <input id="wh-design" name="need" type="radio" value="design" />
                  <label data-edit="contact.label7" htmlFor="wh-design">Full design</label>
                  <input id="wh-build" name="need" type="radio" value="build" />
                  <label data-edit="contact.label8" htmlFor="wh-build">Builds</label>
                  <input id="wh-rent" name="need" type="radio" value="rent" />
                  <label data-edit="contact.label9" htmlFor="wh-rent">Rentals</label>
                  <input id="wh-alter" name="need" type="radio" value="alter" />
                  <label data-edit="contact.label10" htmlFor="wh-alter">Alterations</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label11" htmlFor="wh-note">The period, the budget, the hard part</label>
                <textarea id="wh-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send it to the workshop</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,1,4" className={s.footThreads} aria-hidden="true">
          <TabbiedPattern
            pattern={bobbin}
            palette={THREADS}
            fit="grid"
            cellSize={36}
            seed="wingshem-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Wings &amp; Hem</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Costume design, builds and rentals. Unit 4, Cordwainer Yard, Eastbank.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>
            Wings &amp; Hem is a fictional business: the names, people,
            companies, prices and address on this page are invented.
          </p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
