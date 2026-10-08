import { TabbiedPattern } from 'tabbied/react';
import { sandfield } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './fresh-slate-pressure-washing.module.css';

export const metadata = {
  title: 'Fresh Slate: Pressure and soft washing, Harlow Valley',
  description:
    'Fresh Slate washes driveways, decks, siding and roofs across the Harlow Valley, with a fixed price per surface, a soft wash for anything a pressure tip would hurt, and plants soaked before and after.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The sandfield
   is the grime: soot, moss and silt speckle over weathered concrete, the
   dirty half of every surface on the page. The clean half is the page's
   own ground, with nothing on it. */
const CLEAN = '#f2f5f3';
const INK = '#10232e';
const SPRAY = '#1f86c4';
const MOSS = '#5e6b44';
const SILT = '#8b7658';

const GRIME = ['transparent', INK, MOSS, SILT, MOSS, INK];
const SPECKLE = ['transparent', MOSS, INK, SILT, MOSS, SILT];
const MIST = ['transparent', SPRAY, CLEAN, SPRAY, MOSS, CLEAN];

const NAV = [
  ['Prices', '#prices'],
  ['Soft wash', '#softwash'],
  ['How it goes', '#how'],
  ['Questions', '#faq'],
  ['Get a price', '#book'],
];

const HERO_FACTS = [
  ['Fixed price', 'per surface, before we start'],
  ['Insured', '$2,000,000 liability'],
  ['Plants', 'soaked before and after'],
];

type Surface = { name: string; size: string; price: string; method: string; psi: string; note: string };

const SURFACES: Surface[] = [
  { name: 'Driveway', size: 'Two-car, up to 600 sq ft', price: '$149', method: 'Pressure wash', psi: '3,000 PSI, surface cleaner', note: 'Oil spots pre-treated. Sealing after is $0.45 a sq ft.' },
  { name: 'Deck', size: 'Up to 300 sq ft, rails included', price: '$229', method: 'Soft wash, low rinse', psi: '500 PSI fan tip', note: 'Brightener included, so it is ready to stain in two days.' },
  { name: 'Siding', size: 'Single-story house', price: '$289', method: 'Soft wash', psi: '100 PSI', note: 'Two-story from $379. Vinyl, fiber cement, stucco, painted wood.' },
  { name: 'Roof', size: 'Up to 2,000 sq ft of shingle', price: '$449', method: 'Soft wash only', psi: 'Under 60 PSI', note: 'Kills the algae behind the black streaks. Never a pressure tip.' },
  { name: 'Patio and walks', size: 'Up to 400 sq ft', price: '$119', method: 'Pressure wash', psi: '2,500 PSI', note: 'Pavers re-sanded with polymeric sand for $0.90 a sq ft.' },
  { name: 'Fence', size: 'Per 50 ft run, one side', price: '$89', method: 'Soft wash', psi: '300 PSI', note: 'Both sides $149 a run. Wood, vinyl and composite.' },
];

const BUNDLES = [
  ['The whole outside', 'House, driveway, walks and deck in one visit', 'from $649'],
  ['Spring and fall', 'Two visits a year, booked for you, 15% off each', 'from $255 a visit'],
  ['Moving out', 'Driveway, walks and siding before the listing photos', 'from $399'],
];

const COMPARE = [
  ['What does the work', 'Water at high pressure', 'A mild cleaning mix, then a gentle rinse'],
  ['Pressure at the surface', '2,500-3,500 PSI', '60-500 PSI, close to a garden hose'],
  ['Mold and algae', 'Blasted off the top, roots left', 'Killed at the roots'],
  ['Stays clean for', '6-12 months', '2-4 years on a roof or siding'],
  ['Right for', 'Concrete, brick, pavers, stone', 'Roofs, siding, stucco, wood, fences'],
];

/* The most each surface will take, against the 3,000 PSI a driveway gets. */
const PSI = [
  ['Roof shingles', '60 PSI'],
  ['Vinyl siding', '100 PSI'],
  ['Stucco', '300 PSI'],
  ['Wood deck', '500 PSI'],
  ['Pavers', '2,500 PSI'],
  ['Concrete', '3,000 PSI'],
];

const TANK = [
  ['About 97%', 'Water, from your outside tap'],
  ['1-3%', 'Sodium hypochlorite, household bleach diluted further'],
  ['A splash', 'Surfactant, so it clings to siding and does not run off'],
  ['A drop', 'Citrus scent, so the house does not smell like a pool'],
];

const STEPS = [
  ['Send three photos', 'Text the surfaces to (555) 015-0193. A fixed price comes back within the hour on weekdays.'],
  ['We prepare', 'Plants soaked, outlets and lamps taped, cars moved, the deck furniture carried onto the lawn.'],
  ['Top down', 'Roof first, then siding, then the ground, so nothing drips onto a surface we already did.'],
  ['Walk it with us', 'Anything we missed, we do again before a single hose is rolled up.'],
  ['Dry by lunch', 'Concrete dries in about two hours. A deck is ready to stain in two days.'],
];

const FAQ = [
  ['Do I need to be home?', 'No. Leave the outside tap on and the gates unlocked, and we text you before and after photos of every surface.'],
  ['How much water do you use?', 'About 90 gallons for a driveway and 150 for a house, from your outside tap. That is less than a garden hose left running for an hour.'],
  ['Is it safe for pets and plants?', 'Keep pets indoors while we work and for an hour after. Plants are soaked before and rinsed after, so the mix never dries on a leaf.'],
  ['Will a pressure washer damage my deck?', 'It can, at the wrong pressure. Wood gets a soft wash and a 500 PSI rinse through a wide fan tip, never a turbo nozzle.'],
  ['What if it rains?', 'Light rain does not matter for washing. If a storm is due, we move you to the next dry day at no charge.'],
];

const HOURS = [
  ['Washing', 'Monday to Saturday, 7:30-6:00'],
  ['Quotes by text', 'Every day, 8:00-8:00'],
  ['Area', 'Harlow and 25 miles around'],
];

const CHOICES = ['Driveway', 'Deck', 'Siding', 'Roof', 'Patio', 'Fence'];

export default function FreshSlatePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--clean': '#f2f5f3',
        '--ink': '#10232e',
        '--spray': '#1f86c4',
        '--moss': '#5e6b44',
        '--silt': '#8b7658',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="clean,ink,spray,moss,silt"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Fresh Slate</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="sms:+15550150193">Text (555) 015-0193</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section id="hero" className={s.hero} aria-labelledby="hero-h">
          <div className={s.dirty}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,3,4,3,1" className={s.grime} aria-hidden="true">
              <TabbiedPattern
                pattern={sandfield}
                palette={GRIME}
                fit="grid"
                cellSize={84}
                seed="fresh-slate-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="hero.before" data-edit-max="240" data-edit-multiline className={s.before}>Before, 9:40 am</p>
          </div>
          <div className={s.washed}>
            <p data-edit="hero.after" data-edit-max="240" data-edit-multiline className={s.after}>After, 9:50 am</p>
            <div className={s.heroText}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Pressure and soft washing, Harlow Valley</p>
              <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Same driveway, <span>ten minutes apart.</span>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                We wash driveways, decks, siding and roofs. Pressure where the
                surface can take it, a soft wash where it cannot, and a fixed
                price per surface before we unroll a hose.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Get a fixed price</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#prices">See the prices</a>
              </div>
              <dl className={s.heroFacts}>
                {HERO_FACTS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`hero.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>One price per surface</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices include the prep, the wash and the clean-up, and they do
              not change on the day. Bigger than the size listed? We price it
              from your photos before you book.
            </p>
          </div>
          <ul className={s.surfaces}>
            {SURFACES.map((surface, i) => (
              <li key={surface.name} className={s.surface}>
                <div className={s.patch}>
                  <div data-edit-pattern={`prices.field.${i}`} data-edit-roles="transparent,3,1,4,3,4" className={s.patchGrime} aria-hidden="true">
                    <TabbiedPattern
                      pattern={sandfield}
                      palette={SPECKLE}
                      fit="grid"
                      cellSize={64}
                      seed={`fresh-slate-${surface.name}`}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <p data-edit={`prices.patchPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.patchPrice}>{surface.price}</p>
                </div>
                <div className={s.surfaceBody}>
                  <h3 data-edit={`prices.surfaceName.${i}`} data-edit-max="40" className={s.surfaceName}>{surface.name}</h3>
                  <p data-edit={`prices.surfaceSize.${i}`} data-edit-max="240" data-edit-multiline className={s.surfaceSize}>{surface.size}</p>
                  <p className={s.surfaceMethod}>
                    <span data-edit={`prices.text.${i}`} data-edit-max="60">{surface.method}</span>
                    <span data-edit={`prices.text2.${i}`} data-edit-max="60">{surface.psi}</span>
                  </p>
                  <p data-edit={`prices.surfaceNote.${i}`} data-edit-max="240" data-edit-multiline className={s.surfaceNote}>{surface.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={s.bundles}>
            <h3 data-edit="prices.bundlesTitle" data-edit-max="40" className={s.bundlesTitle}>Booked together</h3>
            <ul className={s.bundleList}>
              {BUNDLES.map(([name, what, price], i) => (
                <li key={name}>
                  <strong data-edit={`prices.emphasis.${i}`}>{name}</strong>
                  <span data-edit={`prices.text3.${i}`} data-edit-max="60">{what}</span>
                  <em>{price}</em>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="softwash" className={s.soft} aria-labelledby="soft-h">
          <div className={s.softInner}>
            <div className={s.softHead}>
              <p data-edit="softwash.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Soft wash, explained</p>
              <h2 data-edit="softwash.softTitle" data-edit-max="60" id="soft-h" className={s.softTitle}>Most of a house should never meet a pressure tip.</h2>
              <p data-edit="softwash.softLead" data-edit-max="240" data-edit-multiline className={s.softLead}>
                At 3,000 PSI water cuts wood, strips paint and drives itself
                behind siding. A soft wash lets a mild mix do the cleaning, then
                rinses it off at the pressure of a garden hose.
              </p>
            </div>

            <div className={s.softGrid}>
              <div className={s.gauge}>
                <h3 data-edit="softwash.gaugeTitle" data-edit-max="40" className={s.gaugeTitle}>The most each surface will take</h3>
                <ul className={s.bars}>
                  {PSI.map(([surface, psi], i) => (
                    <li key={surface} className={s.barRow}>
                      <span data-edit={`softwash.barName.${i}`} data-edit-max="60" className={s.barName}>{surface}</span>
                      <span className={s.barTrack} aria-hidden="true">
                        <span className={`${s.barFill} ${s[`w${i}`]}`} />
                      </span>
                      <span data-edit={`softwash.barValue.${i}`} data-edit-max="60" className={s.barValue}>{psi}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={s.tableWrap}>
                <table className={s.compare}>
                  <caption data-edit="softwash.srOnly" className={s.srOnly}>Pressure washing and soft washing compared</caption>
                  <thead>
                    <tr>
                      <th scope="col"><span data-edit="softwash.srOnly2" data-edit-max="60" className={s.srOnly}>Question</span></th>
                      <th data-edit="softwash.heading" scope="col">Pressure wash</th>
                      <th data-edit="softwash.heading2" scope="col">Soft wash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE.map(([row, hard, soft], i) => (
                      <tr key={row}>
                        <th data-edit={`softwash.heading3.${i}`} scope="row">{row}</th>
                        <td data-edit={`softwash.cell.${i}`}>{hard}</td>
                        <td data-edit={`softwash.cell2.${i}`}>{soft}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={s.tank}>
              <h3 data-edit="softwash.tankTitle" data-edit-max="40" className={s.tankTitle}>What is in the tank</h3>
              <dl className={s.tankList}>
                {TANK.map(([share, what], i) => (
                  <div key={what}>
                    <dt data-edit={`softwash.term.${i}`} data-edit-max="28">{share}</dt>
                    <dd data-edit={`softwash.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,3,4,3,1" className={s.strip} aria-hidden="true">
          <TabbiedPattern
            pattern={sandfield}
            palette={GRIME}
            fit="grid"
            cellSize={72}
            seed="fresh-slate-strip"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="how" className={s.sec} aria-labelledby="how-h">
          <div className={s.secHead}>
            <h2 data-edit="how.secTitle" data-edit-max="60" id="how-h" className={s.secTitle}>From photos to dry</h2>
            <p data-edit="how.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A driveway takes about an hour, a whole house and its ground most
              of a morning. You do not need to be home for any of it.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([title, text], i) => (
              <li key={title} className={s.step}>
                <p className={s.stepNo}>{`0${i + 1}`}</p>
                <h3 data-edit={`how.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                <p data-edit={`how.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.faqGrid}>
            <div className={s.faqSide}>
              <h2 data-edit="faq.secTitle" data-edit-max="60" id="faq-h" className={s.secTitle}>Questions we hear on the drive</h2>
              <dl className={s.hours}>
                {HOURS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`faq.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`faq.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.faqList}>
              {FAQ.map(([q, a], i) => (
                <details key={q} className={s.faq}>
                  <summary data-edit={`faq.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`faq.body2.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className={s.book} aria-labelledby="book-h">
          <div data-edit-pattern="book.field" data-edit-roles="transparent,2,0,2,3,0" className={s.bookField} aria-hidden="true">
            <TabbiedPattern
              pattern={sandfield}
              palette={MIST}
              fit="grid"
              cellSize={30}
              seed="fresh-slate-book"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.bookCard}>
            <div className={s.bookInfo}>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Get a fixed price</h2>
              <p data-edit="book.bookLead" data-edit-max="240" data-edit-multiline className={s.bookLead}>
                Tell us what needs washing, or text three photos. You get one
                number back, and that is the number on the invoice.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Text or call</dt>
                  <dd><a data-edit="book.link" data-edit-max="28" href="tel:+15550150193">(555) 015-0193</a></dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Email</dt>
                  <dd><a data-edit="book.link2" data-edit-max="28" href="mailto:book@freshslate.example">book@freshslate.example</a></dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Yard</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>Unit 4, 220 Millrace Road, Harlow</dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Hours</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Monday to Saturday, 7:30-6:00</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="book.text" data-edit-max="60">Name</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <label className={s.field}>
                  <span data-edit="book.text2" data-edit-max="60">Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="book.text3" data-edit-max="60">Address</span>
                <input type="text" name="address" autoComplete="street-address" />
              </label>
              <fieldset className={s.choices}>
                <legend data-edit="book.legend">What needs washing</legend>
                {CHOICES.map((choice, i) => (
                  <label key={choice} className={s.choice}>
                    <input type="checkbox" name="surfaces" value={choice} />
                    <span data-edit={`book.text4.${i}`} data-edit-max="60">{choice}</span>
                  </label>
                ))}
              </fieldset>
              <label className={s.field}>
                <span data-edit="book.text5" data-edit-max="60">Anything else</span>
                <textarea name="notes" rows={3} />
              </label>
              <button data-edit="book.button" data-edit-max="24" className={s.button} type="submit">Send for a price</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footerInner}>
          <p data-edit="footer.footerName" data-edit-max="240" data-edit-multiline className={s.footerName}>Fresh Slate</p>
          <p data-edit="footer.footerLine" data-edit-max="240" data-edit-multiline className={s.footerLine}>Pressure and soft washing, Unit 4, 220 Millrace Road, Harlow.</p>
          <p data-edit="footer.footerLine2" data-edit-max="240" data-edit-multiline className={s.footerLine}>
            Fresh Slate is a fictional business: the names, people, prices and
            address on this page are invented.
          </p>
          <p className={s.footerCredit}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
