import { TabbiedPattern } from 'tabbied/react';
import { duotonetruchet } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './odd-shape-studio.module.css';

export const metadata = {
  title: 'Odd Shape Studio: Brand identity design for small businesses',
  description:
    'Odd Shape is the one-person studio of designer Noor Halloway: logos, brand patterns, packaging and shop signs for small businesses, priced by the day or by the project.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The truchet is
   the studio's own mark: cream blobs and channels that wind across a
   transparent ground, so the cobalt of the page runs through them. It fills
   the odd shape in the hero, stands in as one client's brand pattern, runs
   as a band before the contact form and edges the footer. */
const COBALT = '#2c3fcf';
const CREAM = '#f5efe2';
const TOMATO = '#ff5b35';
const BUTTER = '#ffd23f';
const NIGHT = '#15151a';

const BLOBS = ['transparent', CREAM, CREAM];
const WAVES = ['transparent', COBALT, COBALT];
const EMBERS = ['transparent', TOMATO, TOMATO];

const NAV = [
  ['Work', '#work'],
  ['Process', '#process'],
  ['Rates', '#rates'],
  ['Studio', '#studio'],
  ['Start a project', '#contact'],
];

type Case = { id: string; client: string; trade: string; made: string; year: string; tone: string; mark: string };

/* Each tile is a client's identity in miniature: its mark, built from the
   same few shapes, on the color it wears. */
const WORK: Case[] = [
  { id: 'pell', client: 'Pell & Daughter', trade: 'Bakery, Market Street', made: 'Logo, bag stamp, shopfront lettering', year: '2026', tone: 'cream', mark: 'loaf' },
  { id: 'rook', client: 'Rook Cycles', trade: 'Bike repair', made: 'Logo, workshop signs, repair tags', year: '2025', tone: 'tomato', mark: 'wheels' },
  { id: 'juniper', client: 'Juniper Dental', trade: 'Family dentist', made: 'Logo, appointment cards, wayfinding', year: '2025', tone: 'butter', mark: 'tooth' },
  { id: 'second', client: 'Second Act Books', trade: 'Used bookshop', made: 'Logo, bookmarks, a rubber stamp', year: '2024', tone: 'night', mark: 'spines' },
  { id: 'fennel', client: 'Fennel & Fig', trade: 'Deli and grocer', made: 'Logo, jar labels for 14 products', year: '2024', tone: 'cream', mark: 'leaf' },
];

const STEPS = [
  { no: '01', shape: 'circle', title: 'Listen', time: 'Week 1', text: 'A half-day workshop at your place, not mine. Who buys from you, who you are up against, what you would never want to look like.' },
  { no: '02', shape: 'arc', title: 'Draw', time: 'Weeks 2-4', text: 'Three different routes, drawn properly, shown on your actual sign, bag and invoice. You pick one; two rounds of changes are included.' },
  { no: '03', shape: 'square', title: 'Hand over', time: 'Week 5', text: 'Every file in every format, a short guide your nephew can follow, and the printer briefed. The files are yours outright.' },
];

const DAY_RATES = [
  ['Day rate', '$640'],
  ['Half day', '$340'],
  ['Workshop only, half day', '$450'],
];

const PROJECTS = [
  ['Logo and mark', 'Three routes, final artwork, color and mono versions', '$2,400'],
  ['Full identity', 'Logo, type, colors, pattern, stationery and a guide', '$6,800'],
  ['Brand refresh', 'Keep what works, redraw what does not', '$3,600'],
  ['Packaging', 'Per product, once the identity exists', '$1,200'],
  ['Signs and shopfront', 'Drawings for the signwriter, site visit included', 'from $900'],
];

const GOOD_TO_KNOW = [
  ['Two projects at a time', 'So you always get a reply the same day.'],
  ['Booked six weeks ahead', 'Currently taking projects that start in late November.'],
  ['Half up front', 'The rest when the files are handed over. No retainers.'],
  ['You own it all', 'Full copyright in the final artwork passes to you on payment.'],
];

const BUDGETS = ['Under $3,000', '$3,000-7,000', 'Over $7,000', 'Not sure yet'];

export default function OddShapeStudioPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cobalt': '#2c3fcf',
        '--cream': '#f5efe2',
        '--tomato': '#ff5b35',
        '--butter': '#ffd23f',
        '--night': '#15151a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cobalt,cream,tomato,butter,night"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Instrument+Serif:ital@0;1&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Odd Shape</span>
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
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Noor Halloway, freelance graphic designer</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Identities for small, <em>stubborn</em> businesses.
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Logos, brand patterns, packaging and shop signs for bakeries,
              bike shops, dentists and delis: businesses with one door and
              strong opinions. I draw everything myself, and you always talk
              to the person doing the work.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Start a project</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#work">See the work</a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,1" className={s.blob} aria-hidden="true">
              <TabbiedPattern
                pattern={duotonetruchet}
                palette={BLOBS}
                fit="grid"
                cellSize={72}
                seed="odd-shape-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.quarter} aria-hidden="true" />
            <span className={s.dot} aria-hidden="true" />
            <p data-edit="hero.sticker" data-edit-max="240" data-edit-multiline className={s.sticker}>Booking from late November</p>
          </div>
        </section>

        <section id="work" className={s.sec} aria-labelledby="work-h">
          <div className={s.secHead}>
            <h2 data-edit="work.title" data-edit-format="emphasis" data-edit-max="60" id="work-h" className={s.secTitle}>
              Selected <em>identities</em>
            </h2>
            <p data-edit="work.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six of the forty-odd businesses I have drawn for since 2019. Each
              one started with a workshop and ended with a sign on a wall.
            </p>
          </div>
          <ul className={s.work}>
            {WORK.map((c, i) => (
              <li key={c.id} className={`${s.case} ${s[c.tone]} ${s[c.id]}`}>
                <span className={`${s.mark} ${s[c.mark]}`} aria-hidden="true" />
                <div className={s.caseText}>
                  <h3 data-edit={`work.caseClient.${i}`} data-edit-max="40" className={s.caseClient}>{c.client}</h3>
                  <p data-edit={`work.caseTrade.${i}`} data-edit-max="240" data-edit-multiline className={s.caseTrade}>{c.trade}</p>
                  <p data-edit={`work.caseMade.${i}`} data-edit-max="240" data-edit-multiline className={s.caseMade}>{c.made}</p>
                  <p data-edit={`work.caseYear.${i}`} data-edit-max="240" data-edit-multiline className={s.caseYear}>{c.year}</p>
                </div>
              </li>
            ))}
            <li className={`${s.case} ${s.patternCase}`}>
              <div data-edit-pattern="work.field" data-edit-roles="transparent,0,0" className={s.caseField} aria-hidden="true">
                <TabbiedPattern
                  pattern={duotonetruchet}
                  palette={WAVES}
                  fit="grid"
                  cellSize={48}
                  seed="odd-shape-lowtide"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.caseLabel}>
                <h3 data-edit="work.caseClient2" data-edit-max="40" className={s.caseClient}>Lowtide Swim School</h3>
                <p data-edit="work.caseTrade2" data-edit-max="240" data-edit-multiline className={s.caseTrade}>Lessons for ages 3 to 83</p>
                <p data-edit="work.caseMade2" data-edit-max="240" data-edit-multiline className={s.caseMade}>Logo, a brand pattern of waves, towels, the pool hall wall</p>
                <p data-edit="work.caseYear2" data-edit-max="240" data-edit-multiline className={s.caseYear}>2026</p>
              </div>
            </li>
          </ul>
        </section>

        <section id="process" className={s.process} aria-labelledby="process-h">
          <div className={s.processInner}>
            <div className={s.secHead}>
              <h2 data-edit="process.title" data-edit-format="emphasis" data-edit-max="60" id="process-h" className={s.secTitle}>
                Three steps, <em>five weeks</em>
              </h2>
              <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The same order for a logo or a whole identity; a bigger job
                just spends longer in the middle.
              </p>
            </div>
            <ol className={s.steps}>
              {STEPS.map((step, i) => (
                <li key={step.no} className={s.step}>
                  <span className={`${s.stepShape} ${s[step.shape]}`} aria-hidden="true" />
                  <p data-edit={`process.stepNo.${i}`} data-edit-max="240" data-edit-multiline className={s.stepNo}>{step.no}</p>
                  <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{step.title}</h3>
                  <p data-edit={`process.stepTime.${i}`} data-edit-max="240" data-edit-multiline className={s.stepTime}>{step.time}</p>
                  <p data-edit={`process.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="rates" className={s.sec} aria-labelledby="rates-h">
          <div className={s.secHead}>
            <h2 data-edit="rates.title" data-edit-format="emphasis" data-edit-max="60" id="rates-h" className={s.secTitle}>
              Rates, <em>written down</em>
            </h2>
            <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices are fixed when we agree the brief, and printing is billed
              at cost with the printer's invoice attached.
            </p>
          </div>
          <div className={s.rates}>
            <div className={s.dayCard}>
              <h3 data-edit="rates.rateTitle" data-edit-max="40" className={s.rateTitle}>By the day</h3>
              <dl className={s.dayList}>
                {DAY_RATES.map(([what, price], i) => (
                  <div key={what}>
                    <dt data-edit={`rates.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`rates.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="rates.dayNote" data-edit-max="240" data-edit-multiline className={s.dayNote}>For changes to work I did not draw, menus, posters and odd jobs.</p>
            </div>
            <div className={s.projectCard}>
              <h3 data-edit="rates.rateTitle2" data-edit-max="40" className={s.rateTitle}>By the project</h3>
              <ul className={s.projectList}>
                {PROJECTS.map(([name, what, price], i) => (
                  <li key={name}>
                    <span data-edit={`rates.projectName.${i}`} data-edit-max="60" className={s.projectName}>{name}</span>
                    <span data-edit={`rates.projectWhat.${i}`} data-edit-max="60" className={s.projectWhat}>{what}</span>
                    <strong data-edit={`rates.projectPrice.${i}`} className={s.projectPrice}>{price}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="studio" className={s.sec} aria-labelledby="studio-h">
          <div className={s.studio}>
            <div className={s.studioIntro}>
              <h2 data-edit="studio.title" data-edit-format="emphasis" data-edit-max="60" id="studio-h" className={s.secTitle}>
                One designer, <em>one desk</em>
              </h2>
              <p data-edit="studio.studioLead" data-edit-max="240" data-edit-multiline className={s.studioLead}>
                I spent nine years in agencies drawing for banks and airlines,
                and left to draw for the shops on my own street. Odd Shape is
                me, a plan chest and a very patient risograph printer.
              </p>
              <blockquote className={s.quote}>
                <p data-edit="studio.body" data-edit-max="240" data-edit-multiline>Noor asked better questions about our bread than our accountant asks about our money.</p>
                <cite data-edit="studio.attribution" data-edit-max="48">Hanna Pell, Pell &amp; Daughter</cite>
              </blockquote>
            </div>
            <dl className={s.facts}>
              {GOOD_TO_KNOW.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`studio.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`studio.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,1" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={duotonetruchet}
            palette={BLOBS}
            fit="grid"
            cellSize={60}
            seed="odd-shape-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contact}>
            <div className={s.contactInfo}>
              <h2 data-edit="contact.title" data-edit-format="emphasis" data-edit-max="60" id="contact-h" className={s.secTitle}>
                Start a <em>project</em>
              </h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell me about the business and what is not working. I reply
                within a day with a few questions and, if we fit, a time for a
                call.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Email</dt>
                  <dd><a data-edit="contact.link" data-edit-max="28" href="mailto:noor@oddshape.example">noor@oddshape.example</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd><a data-edit="contact.link2" data-edit-max="28" href="tel:+15550172264">(555) 017-2264</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Studio</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Unit 9, The Print Works, 30 Lantern Yard</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Hours</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Monday to Thursday, 9:30-5:30</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="contact.text" data-edit-max="60">Your name</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <label className={s.field}>
                  <span data-edit="contact.text2" data-edit-max="60">Email</span>
                  <input type="email" name="email" autoComplete="email" />
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="contact.text3" data-edit-max="60">The business, and where it is</span>
                <input type="text" name="business" />
              </label>
              <fieldset className={s.budget}>
                <legend data-edit="contact.legend">Budget</legend>
                {BUDGETS.map((b, i) => (
                  <label key={b} className={s.pill}>
                    <input type="radio" name="budget" value={b} />
                    <span data-edit={`contact.text4.${i}`} data-edit-max="60">{b}</span>
                  </label>
                ))}
              </fieldset>
              <label className={s.field}>
                <span data-edit="contact.text5" data-edit-max="60">What is not working right now</span>
                <textarea name="message" rows={4} />
              </label>
              <button data-edit="contact.button" data-edit-max="24" className={s.button} type="submit">Send it over</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,2" className={s.footerField} aria-hidden="true">
          <TabbiedPattern
            pattern={duotonetruchet}
            palette={EMBERS}
            fit="grid"
            cellSize={40}
            seed="odd-shape-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footerInner}>
          <p data-edit="footer.footerName" data-edit-max="240" data-edit-multiline className={s.footerName}>Odd Shape Studio</p>
          <p data-edit="footer.footerLine" data-edit-max="240" data-edit-multiline className={s.footerLine}>Unit 9, The Print Works, 30 Lantern Yard.</p>
          <p data-edit="footer.footerLine2" data-edit-max="240" data-edit-multiline className={s.footerLine}>
            Odd Shape is a fictional studio: the names, people, clients, prices
            and address on this page are invented.
          </p>
          <p className={s.footerCredit}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
