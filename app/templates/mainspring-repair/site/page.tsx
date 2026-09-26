import { TabbiedPattern } from 'tabbied/react';
import { flux, bothcut, ripplering } from 'tabbied/patterns';
import s from './mainspring-repair.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Mainspring: Watch and jewelry repair, Arcade Row',
  description:
    'Mainspring services, restores and repairs watches, clocks and jewelry at a bench in the window of 14 Arcade Row. The price index, how often a watch wants servicing, free written estimates and the people at the bench.',
};

/* Site colors. The minute track is gilt dashes, with the odd one in lume,
   on the dial's own black; the engine-turned ring and the hobnail band are
   cut in gilt and lume on the same black, the way a dial is engraved. The
   caseback band keeps one ruby dash in five, for the jewels. */
const DIAL = '#0f0e0c';
const LUME = '#efe7d4';
const GILT = '#c8a35a';
const RUBY = '#a3312c';

const TRACK = [DIAL, GILT, GILT, LUME, GILT, GILT];
const GUILLOCHE = [DIAL, GILT, GILT, LUME, GILT, GILT];
const HOBNAIL = ['transparent', GILT, DIAL, GILT, LUME, DIAL];
const CASEBACK = [DIAL, GILT, LUME, GILT, GILT, RUBY];

const NAV = [
  ['The index', '#index'],
  ['How often', '#intervals'],
  ['Estimates', '#estimate'],
  ['The bench', '#bench'],
  ['Visit', '#visit'],
];

type Service = {
  numeral: string;
  name: string;
  price: string;
  note: string;
};

/* Clockwise from twelve: the order they sit round the ring. */
const INDEX: Service[] = [
  { numeral: 'XII', name: 'Full service', price: '$380', note: 'Stripped, cleaned, oiled, regulated. Four to six weeks.' },
  { numeral: 'I', name: 'Battery', price: '$18', note: 'While you wait, with the gasket checked.' },
  { numeral: 'II', name: 'Crystal', price: 'from $45', note: 'Mineral or sapphire, domed or flat.' },
  { numeral: 'III', name: 'Straps and bracelets', price: 'from $35', note: 'Sizing a bracelet is free.' },
  { numeral: 'IV', name: 'Water resistance test', price: '$25', note: 'Pressure-tested to its rating.' },
  { numeral: 'V', name: 'Quartz movement', price: '$120', note: 'Serviced or replaced, your choice.' },
  { numeral: 'VI', name: 'Polishing', price: 'from $90', note: 'Case and bracelet, brushed or bright.' },
  { numeral: 'VII', name: 'Crown and stem', price: 'from $60', note: 'Replaced, or rethreaded if the tube is sound.' },
  { numeral: 'VIII', name: 'Vintage restoration', price: 'by estimate', note: 'Parts found, made or saved.' },
  { numeral: 'IX', name: 'Clocks', price: 'from $150', note: 'Mantel and wall. We call on longcase clocks.' },
  { numeral: 'X', name: 'Ring sizing', price: 'from $40', note: 'Up or down, and stones reset.' },
  { numeral: 'XI', name: 'Chains, clasps, stones', price: 'from $25', note: 'Soldered, not glued. Pearls restrung.' },
];

type Interval = {
  years: string;
  unit: string;
  name: string;
  note: string;
  fill: 'f1' | 'f2' | 'f3' | 'f5';
};

/* Each subdial counts to ten years; the gilt arc is the interval. */
const INTERVALS: Interval[] = [
  { years: '5', unit: 'years', name: 'Hand-wound', note: 'The oil thickens long before the watch complains.', fill: 'f5' },
  { years: '5', unit: 'years', name: 'Automatic', note: 'Four if you wear it every day, six if it lives in a drawer.', fill: 'f5' },
  { years: '3', unit: 'years', name: 'Vintage, before 1970', note: 'Older oils, softer metals, rarer parts to lose.', fill: 'f3' },
  { years: '2', unit: 'years', name: 'Quartz battery', note: 'Change it before it leaks, not after.', fill: 'f2' },
  { years: '1', unit: 'year', name: 'Water resistance', note: 'If you swim in it. Seals dry out on the wrist.', fill: 'f1' },
];

const STEPS = [
  ['I', 'At the bench', 'Free, about ten minutes. We open the back while you wait and tell you roughly what we see.'],
  ['II', 'In writing', 'Within 48 hours, by text or email: the work, the parts, the price and the time. Nothing starts until you say yes.'],
  ['III', 'The work', 'One to six weeks. Every service ends on the timegrapher in five positions and 48 hours on the winder.'],
  ['IV', 'Collect', 'With the timegrapher print-out, the old parts in an envelope, and two years of guarantee on our work.'],
];

const BENCH = [
  ['AR', 'Anton Reyes', 'Watchmaker, owner', 'Thirty-one years at a bench, twenty of them at this one. Took the shop over from his father, Luis, who opened it in 1987.'],
  ['ML', 'Mei Lindqvist', 'Watchmaker', 'Vintage movements and chronographs. Keeps a cabinet of about four thousand old parts, sorted by caliber, and knows most of them by sight.'],
  ['OB', 'Oskar Brandt', 'Jeweler', 'Rings, chains, clasps, stones and hand engraving. Will tell you when a ring should not be sized, and why.'],
];

const FAQ = [
  ['Is my watch worth repairing?', 'We will tell you honestly at the bench. A $40 quartz watch usually is not; a watch someone left you almost always is.'],
  ['Which makes do you service?', 'Most Swiss, German and Japanese movements, mechanical and quartz, and most American pocket watches. Smartwatches, no.'],
  ['Can you post it to you?', 'Yes. Send it insured, with a note and a phone number. We call when it arrives and again with the estimate.'],
  ['What if the part does not exist any more?', 'Mei can often make one, or adapt one from another caliber. It goes on the estimate before we start.'],
];

const HOURS = [
  ['Tuesday to Friday', '10 to 6'],
  ['Saturday', '10 to 4'],
  ['Sunday and Monday', 'Closed'],
];

export default function MainspringRepairPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Jost:wght@300..600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Mainspring</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Watch and jewelry repair, 14 Arcade Row</p>
            <h1 id="hero-h" className={s.title}>We take watches apart <em>and put them back.</em></h1>
            <p className={s.lede}>
              Two watchmakers and a jeweler at a bench in the shop window.
              Batteries while you wait, full services in four to six weeks, and
              every estimate free and in writing before we touch a screw.
            </p>
            <div className={s.ctas}>
              <a className={s.btn} href="#estimate">Ask for an estimate</a>
              <a className={s.textLink} href="#index">Read the price index</a>
            </div>
          </div>

          <div className={s.dialWrap}>
            <div className={s.dial}>
              <div className={s.track} aria-hidden="true">
                <TabbiedPattern
                  pattern={flux}
                  palette={TRACK}
                  fit="grid"
                  cellSize={26}
                  seed="mainspring-track"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.face} aria-hidden="true" />
              <p className={s.faceName}>Mainspring</p>
              <p className={s.faceSub}>Repairs since 1987</p>
              <span className={s.handHour} aria-hidden="true" />
              <span className={s.handMinute} aria-hidden="true" />
              <span className={s.handSecond} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- INDEX
            Twelve services round a dial, at the hour they are numbered. */}
        <section id="index" className={s.indexSec} aria-labelledby="index-h">
          <div className={s.index}>
            <div className={s.indexCenter}>
              <div className={s.guilloche} aria-hidden="true">
                <TabbiedPattern
                  pattern={ripplering}
                  palette={GUILLOCHE}
                  fit="grid"
                  cellSize={24}
                  seed="mainspring-guilloche"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.indexIntro}>
                <p className={s.eyebrow}>The index</p>
                <h2 id="index-h">Twelve things we do <em>at the bench</em></h2>
                <p className={s.indexNote}>
                  Prices include parts unless we say so, and every job carries
                  two years of guarantee.
                </p>
              </div>
            </div>

            <ol className={s.ring}>
              {INDEX.map((svc) => (
                <li key={svc.numeral}>
                  <span className={s.numeral}>{svc.numeral}</span>
                  <h3 className={s.svcName}>{svc.name}</h3>
                  <p className={s.svcPrice}>{svc.price}</p>
                  <p className={s.svcNote}>{svc.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- INTERVALS */}
        <section id="intervals" className={s.sec} aria-labelledby="intervals-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>How often</p>
            <h2 id="intervals-h">A watch runs until it <em>quietly doesn't</em></h2>
            <p className={s.secNote}>
              Each subdial counts ten years; the gilt arc is how long we would
              leave it between visits. Wear, water and heat all shorten it.
            </p>
          </div>

          <ul className={s.subdials}>
            {INTERVALS.map((d) => (
              <li key={d.name}>
                <div className={`${s.subdial} ${s[d.fill]}`}>
                  <strong>{d.years}</strong>
                  <span>{d.unit}</span>
                </div>
                <h3 className={s.subName}>{d.name}</h3>
                <p className={s.subNote}>{d.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* The hobnail band: clous de Paris, as cut on a dial. */}
        <div className={s.hobnail} aria-hidden="true">
          <TabbiedPattern
            pattern={bothcut}
            palette={HOBNAIL}
            fit="grid"
            cellSize={30}
            seed="mainspring-hobnail"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- ESTIMATE */}
        <section id="estimate" className={s.sec} aria-labelledby="estimate-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>Estimates</p>
            <h2 id="estimate-h">Nothing starts <em>until you say yes</em></h2>
          </div>

          <ol className={s.steps}>
            {STEPS.map(([n, title, body]) => (
              <li key={n}>
                <span className={s.stepNo}>{n}</span>
                <h3 className={s.stepTitle}>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>

          <form className={s.form} action="#">
            <div className={s.formIntro}>
              <h3 className={s.formTitle}>Or describe it first</h3>
              <p className={s.formNote}>
                Tell us the make and what it is doing, and we will say whether
                it is worth the trip. A photo of the dial and the caseback helps;
                reply to our email with it.
              </p>
              <Artwork
                slug="mainspring-repair-movement"
                alt="An open pocket watch movement seen from above, its gears, jewels and balance wheel showing"
                inks={['var(--dial)', 'var(--gold)']}
                mode="duotone"
                className={s.movement}
              />
              <p className={s.movementCap}>Caseback off: send us one like this.</p>
            </div>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="ms-name">Name</label>
                <input id="ms-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="ms-email">Email</label>
                <input id="ms-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label htmlFor="ms-make">Make and model</label>
                <input id="ms-make" name="make" type="text" />
              </div>
              <div className={s.field}>
                <label htmlFor="ms-kind">It is</label>
                <select id="ms-kind" name="kind" defaultValue="unsure">
                  <option value="hand">Hand-wound</option>
                  <option value="auto">Automatic</option>
                  <option value="quartz">Quartz</option>
                  <option value="clock">A clock</option>
                  <option value="jewel">Jewelry</option>
                  <option value="unsure">Not sure</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="ms-what">What it is doing, or not doing</label>
                <textarea id="ms-what" name="what" rows={3} />
              </div>
            </div>
            <button className={s.btn} type="submit">Send it to the bench</button>
          </form>
        </section>

        {/* ----------------------------------------------------------- BENCH */}
        <section id="bench" className={s.sec} aria-labelledby="bench-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>The bench</p>
            <h2 id="bench-h">Three people, <em>one window</em></h2>
            <p className={s.secNote}>
              You can watch us work from the arcade. Knock if you want to ask
              something; we will put the loupe down.
            </p>
          </div>

          <ul className={s.people}>
            {BENCH.map(([initials, name, role, bio]) => (
              <li key={name}>
                <span className={s.monogram} aria-hidden="true">{initials}</span>
                <h3 className={s.personName}>{name}</h3>
                <p className={s.personRole}>{role}</p>
                <p className={s.personBio}>{bio}</p>
              </li>
            ))}
          </ul>

          <div className={s.faq}>
            {FAQ.map(([q, a]) => (
              <details key={q} className={s.q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visit}>
            <div>
              <p className={s.eyebrow}>Visit</p>
              <h2 id="visit-h">14 Arcade Row, <em>Exchange Quarter</em></h2>
              <p className={s.address}>
                Halfway down the covered arcade, between the stamp dealer and
                the bookbinder. Look for the clock that is right.
              </p>
              <p className={s.contact}>
                <a href="tel:+15550174410">(555) 017-4410</a>
                <br />
                <a href="mailto:bench@mainspring.example">bench@mainspring.example</a>
              </p>
            </div>
            <div className={s.hoursBox}>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.small}>
                Batteries while you wait until 5:30. Collections by the ticket
                number, or with photo ID if the ticket went through the wash.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.caseback} aria-hidden="true">
          <TabbiedPattern
            pattern={flux}
            palette={CASEBACK}
            fit="grid"
            cellSize={30}
            seed="mainspring-caseback"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footText}>
          <p className={s.footName}>Mainspring</p>
          <p>A fictional watch and jewelry repair shop. The people, prices and address are invented.</p>
          <p>The open movement is a generated image, toned in the page's colors.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
