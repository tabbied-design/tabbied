import { TabbiedPattern } from 'tabbied/react';
import { percale } from 'tabbied/patterns';
import s from './stitch-lane-tailors.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Stitch Lane: Tailor and alterations, Garment Quarter',
  description:
    'Stitch Lane takes in, lets out and takes up on Mercer Row, and cuts suits to measure in the back room. Every price on a tag, how long each job takes, fittings by appointment and the three tailors.',
};

/* Site colors. The cloth is woven in the page's own navy, a lighter
   cloth blue and the ivory of the thread, with the odd stripe in chalk
   pink or tape yellow, the way a shirting book mixes them. */
const NAVY = '#1d2438';
const THREAD = '#f3ede1';
const CHALK = '#f0a3b4';
const TAPE = '#e8c15a';
const CLOTH = '#4a5a86';

const SHIRTING = [NAVY, THREAD, CLOTH, CHALK, THREAD, CLOTH];
const SUITING = [NAVY, CLOTH, THREAD, NAVY, CLOTH, TAPE];
const SELVEDGE = [NAVY, CHALK, THREAD, CLOTH, TAPE];
const BOX = [CLOTH, THREAD, CHALK, TAPE, THREAD];

const NAV = [
  ['Prices', '#prices'],
  ['Turnaround', '#turnaround'],
  ['Fittings', '#fittings'],
  ['Made to measure', '#bespoke'],
  ['Tailors', '#tailors'],
  ['Visit', '#visit'],
];

/* Forty empty marks: the tape's numbers are drawn by a CSS counter. */
const INCHES = Array.from({ length: 40 }, (_, i) => `in-${i}`);

type Tag = {
  name: string;
  price: string;
  days: string;
};

type Rail = {
  title: string;
  note: string;
  tags: Tag[];
};

const RAILS: Rail[] = [
  {
    title: 'Trousers and jeans',
    note: 'Jeans keep their original hem if you ask.',
    tags: [
      { name: 'Hem, plain', price: '$18', days: '2 days' },
      { name: 'Hem, with cuff', price: '$24', days: '2 days' },
      { name: 'Jeans, original hem', price: '$26', days: '3 days' },
      { name: 'Waist in or out', price: '$28', days: '5 days' },
      { name: 'Taper the leg', price: '$32', days: '5 days' },
      { name: 'New zip', price: '$22', days: '3 days' },
    ],
  },
  {
    title: 'Jackets and coats',
    note: 'Shoulders are the one thing we will talk you out of.',
    tags: [
      { name: 'Sleeves, shorten', price: '$32', days: '5 days' },
      { name: 'Sleeves, working cuffs', price: '$55', days: '7 days' },
      { name: 'Take in the back', price: '$45', days: '7 days' },
      { name: 'Reline a jacket', price: '$140', days: '10 days' },
      { name: 'Coat, shorten', price: '$60', days: '7 days' },
      { name: 'Buttons, set of six', price: '$15', days: '2 days' },
    ],
  },
  {
    title: 'Shirts, dresses and skirts',
    note: 'Bridal and formal gowns are quoted at a fitting.',
    tags: [
      { name: 'Shirt, take in', price: '$28', days: '5 days' },
      { name: 'Shirt sleeves', price: '$26', days: '5 days' },
      { name: 'Dress, hem', price: '$30', days: '5 days' },
      { name: 'Dress, take in', price: '$40', days: '7 days' },
      { name: 'Skirt, hem', price: '$22', days: '3 days' },
      { name: 'Straps, shorten', price: '$16', days: '2 days' },
    ],
  },
];

type Mark = {
  when: string;
  what: string;
  note: string;
};

const TURNAROUND: Mark[] = [
  { when: 'Same day', what: 'Hems while you work', note: 'In by 10, back by 5. Trouser and skirt hems only, $15 extra.' },
  { when: '2 days', what: 'Hems and buttons', note: 'Most trouser hems, buttons and straps.' },
  { when: '5 to 7 days', what: 'Most alterations', note: 'Taking in, letting out, sleeves and tapering.' },
  { when: '10 days', what: 'Linings and re-cuts', note: 'Anything we take apart to put back together.' },
  { when: '6 weeks', what: 'Made to measure', note: 'Three fittings from the first measure to the last press.' },
];

const FITTING = [
  ['Book half an hour', 'Fittings are by appointment so nobody waits in their socks. Drop-offs for simple hems need no appointment.'],
  ['Bring the shoes', 'And whatever you will wear under it. A hem pinned over trainers is wrong over brogues.'],
  ['We pin and chalk', 'You stand on the box, we mark it in chalk and pins, and you see it in the long mirror before you take it off.'],
  ['Try it on to collect', 'Every job is tried on here before you pay. If it is not right, it goes back on the bench at no charge.'],
];

const BESPOKE = [
  ['Two-piece suit', 'from $1,450'],
  ['Odd jacket', 'from $1,050'],
  ['Trousers', 'from $420'],
  ['Shirts', 'from $165, two at a time'],
];

type Tailor = {
  name: string;
  role: string;
  since: string;
  note: string;
};

const TAILORS: Tailor[] = [
  { name: 'Rosa Pellegrini', role: 'Master tailor, owner', since: 'Cutting since 1981', note: 'Cuts every made-to-measure pattern by hand and does the first fitting herself.' },
  { name: 'Tomas Reyes', role: 'Alterations', since: 'At Stitch Lane since 2006', note: 'Trousers, jackets and jeans. Can hem a pair of jeans so nobody can tell.' },
  { name: 'June Park', role: 'Dresses and bridal', since: 'At Stitch Lane since 2014', note: 'Gowns, bridesmaids and anything with a train, lace or thirty buttons.' },
];

const HOURS = [
  ['Monday', '10 to 6, drop-off only'],
  ['Tuesday to Friday', '9 to 6, fittings from 10'],
  ['Saturday', '9 to 4, fittings all day'],
  ['Sunday', 'Closed'],
];

const QUESTIONS = [
  ['Do I need an appointment for a hem?', 'No. Bring it in, put it on in the fitting room, and we will pin it in five minutes.'],
  ['Can you alter something I bought online?', 'Almost always. Leave the tags on until you have tried it here, in case it is better sent back.'],
  ['Do you work on leather or fur?', 'Leather hems and zips, yes. Fur and heavy shearling we send to a furrier two streets over.'],
  ['What if I do not collect it?', 'We keep work for ninety days, then it goes to the clothing bank on Bell Street.'],
];

export default function StitchLaneTailorsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--navy': '#1d2438',
        '--thread': '#f3ede1',
        '--chalk': '#f0a3b4',
        '--tape': '#e8c15a',
        '--cloth': '#4a5a86',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="navy,thread,chalk,tape,cloth"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..600&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Stitch Lane</a>
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
        {/* ------------------------------------------------------------ HERO
            The words on the left; on the right a swatch of shirting with
            pinked edges and a swing tag tied to its corner. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Tailor and alterations, 22 Mercer Row</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>
              Take it in, let it out, <em>take it up.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Hems while you work, most alterations in a week, and suits cut
              and sewn in the back room since 1987. Walk in to drop off.
              Fittings are by appointment.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#visit">Book a fitting</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#prices">Read the price tags</a>
            </div>
          </div>

          <div className={s.swatch}>
            <div data-edit-pattern="hero.field" data-edit-roles="0,1,4,2,1,4" className={s.swatchCloth} aria-hidden="true">
              <TabbiedPattern
                pattern={percale}
                palette={SHIRTING}
                fit="grid"
                cellSize={56}
                seed="stitch-shirting"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.heroTag}>
              <div className={s.tagCard}>
                <p data-edit="hero.tagKind" data-edit-max="240" data-edit-multiline className={s.tagKind}>No. 0417</p>
                <p data-edit="hero.tagName" data-edit-max="240" data-edit-multiline className={s.tagName}>Trouser hem</p>
                <p data-edit="hero.tagPrice" data-edit-max="240" data-edit-multiline className={s.tagPrice}>$18</p>
                <p data-edit="hero.tagKind2" data-edit-max="240" data-edit-multiline className={s.tagKind}>Ready in 2 days</p>
              </div>
            </div>
          </div>
        </section>

        {/* The tape measure, laid across the page. */}
        <div className={s.tapeWrap} aria-hidden="true">
          <div className={s.tape}>
            {INCHES.map((k) => (
              <span key={k} />
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------- PRICES
            Every price on a swing tag, hung from its rail by garment. */}
        <section id="prices" className={s.section} aria-labelledby="prices-h">
          <div className={s.head}>
            <p data-edit="prices.label" data-edit-max="240" data-edit-multiline className={s.label}>The price list</p>
            <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">Every price is on a tag</h2>
            <p data-edit="prices.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              These are the prices for straightforward work. Anything unusual
              we quote when we see it on you, before we start, and the quote
              is the price.
            </p>
          </div>
          {RAILS.map((r, i) => (
            <div className={s.rail} key={r.title}>
              <div className={s.railHead}>
                <h3 data-edit={`prices.title2.${i}`} data-edit-max="40">{r.title}</h3>
                <p data-edit={`prices.body.${i}`} data-edit-max="240" data-edit-multiline>{r.note}</p>
              </div>
              <ul className={s.tags}>
                {r.tags.map((t, i2) => (
                  <li key={t.name} className={s.tag}>
                    <div className={s.tagCard}>
                      <p data-edit={`prices.tagName.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.tagName}>{t.name}</p>
                      <p data-edit={`prices.tagPrice.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.tagPrice}>{t.price}</p>
                      <p data-edit={`prices.tagKind.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.tagKind}>{t.days}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ------------------------------------------------------ TURNAROUND
            How long things take, measured off along a tape. */}
        <section id="turnaround" className={s.section} aria-labelledby="turn-h">
          <div className={s.head}>
            <p data-edit="turnaround.label" data-edit-max="240" data-edit-multiline className={s.label}>Turnaround</p>
            <h2 data-edit="turnaround.title" data-edit-max="60" id="turn-h">How long it takes, measured in days</h2>
            <p data-edit="turnaround.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              In a hurry for a wedding or an interview? Say so when you drop
              it off. Express is half as long again on the price, when the
              bench has room.
            </p>
          </div>
          <ol className={s.measure}>
            {TURNAROUND.map((m, i) => (
              <li key={m.when}>
                <p data-edit={`turnaround.measureWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.measureWhen}>{m.when}</p>
                <h3 data-edit={`turnaround.title2.${i}`} data-edit-max="40">{m.what}</h3>
                <p data-edit={`turnaround.measureNote.${i}`} data-edit-max="240" data-edit-multiline className={s.measureNote}>{m.note}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- FITTINGS */}
        <section id="fittings" className={`${s.section} ${s.fittings}`} aria-labelledby="fit-h">
          <div className={s.stand}>
            <Artwork
              slug="stitch-lane-tailors-dummy"
              alt="A tailor's dummy in a half-finished jacket, chalk lines basted down the front and pins in the lapel"
              inks={{ black: 'var(--text)', red: 'var(--chalk)', blue: 'var(--navy)' }}
              className={s.dummy}
            />
            <div data-edit-pattern="fittings.field" data-edit-roles="4,1,2,3,1" className={s.box} aria-hidden="true">
              <TabbiedPattern
                pattern={percale}
                palette={BOX}
                fit="grid"
                cellSize={32}
                seed="stitch-box"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.fittingText}>
            <div className={s.head}>
              <p data-edit="fittings.label" data-edit-max="240" data-edit-multiline className={s.label}>Fittings</p>
              <h2 data-edit="fittings.title" data-edit-max="60" id="fit-h">A fitting takes about fifteen minutes</h2>
            </div>
            <ol className={s.steps}>
              {FITTING.map(([t, d], i) => (
                <li key={t}>
                  <h3 data-edit={`fittings.title2.${i}`} data-edit-max="40">{t}</h3>
                  <p data-edit={`fittings.body.${i}`} data-edit-max="240" data-edit-multiline>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- BESPOKE
            The back room: a bolt of suiting with a chalk line across it. */}
        <section id="bespoke" className={s.bespoke} aria-labelledby="bespoke-h">
          <div className={s.bolt}>
            <div data-edit-pattern="bespoke.field" data-edit-roles="0,4,1,0,4,3" className={s.boltCloth} aria-hidden="true">
              <TabbiedPattern
                pattern={percale}
                palette={SUITING}
                fit="grid"
                cellSize={48}
                seed="stitch-suiting"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="bespoke.boltLabel" data-edit-max="240" data-edit-multiline className={s.boltLabel}>Cloth 114. Navy chalk stripe, 11 oz wool</p>
          </div>
          <div className={s.bespokeText}>
            <p data-edit="bespoke.label" data-edit-max="240" data-edit-multiline className={s.label}>Made to measure</p>
            <h2 data-edit="bespoke.title" data-edit-max="60" id="bespoke-h">Cut for you, in the back room</h2>
            <p data-edit="bespoke.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Twenty-two measurements, a paper pattern cut by Rosa, and three
              fittings over about six weeks. Choose from four hundred cloths in
              the books, or bring your own length.
            </p>
            <dl className={s.bespokePrices}>
              {BESPOKE.map(([what, price], i) => (
                <div key={what}>
                  <dt data-edit={`bespoke.term.${i}`} data-edit-max="28">{what}</dt>
                  <dd data-edit={`bespoke.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="bespoke.small" data-edit-max="240" data-edit-multiline className={s.small}>Half at the first measure, half at the last fitting. Alterations to our own suits are free for life.</p>
          </div>
        </section>

        {/* --------------------------------------------------------- TAILORS */}
        <section id="tailors" className={s.section} aria-labelledby="tailors-h">
          <div className={s.head}>
            <p data-edit="tailors.label" data-edit-max="240" data-edit-multiline className={s.label}>The bench</p>
            <h2 data-edit="tailors.title" data-edit-max="60" id="tailors-h">Three tailors, one long table</h2>
          </div>
          <ul className={s.tailors}>
            {TAILORS.map((t, i) => (
              <li key={t.name}>
                <p data-edit={`tailors.tailorSince.${i}`} data-edit-max="240" data-edit-multiline className={s.tailorSince}>{t.since}</p>
                <h3 data-edit={`tailors.title2.${i}`} data-edit-max="40">{t.name}</h3>
                <p data-edit={`tailors.tailorRole.${i}`} data-edit-max="240" data-edit-multiline className={s.tailorRole}>{t.role}</p>
                <p data-edit={`tailors.tailorNote.${i}`} data-edit-max="240" data-edit-multiline className={s.tailorNote}>{t.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={`${s.section} ${s.visit}`} aria-labelledby="visit-h">
          <div className={s.visitInfo}>
            <p data-edit="visit.label" data-edit-max="240" data-edit-multiline className={s.label}>Visit</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">22 Mercer Row</h2>
            <p data-edit="visit.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Garment Quarter, between the button shop and the dry cleaner.
              Look for the tape measure painted round the door.
            </p>
            <dl className={s.hours}>
              {HOURS.map(([d, h], i) => (
                <div key={d}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                </div>
              ))}
            </dl>
            <p className={s.contact}>
              <a data-edit="visit.link" data-edit-max="28" href="tel:+15550186610">(555) 018-6610</a>
            </p>
            <p className={s.contact}>
              <a data-edit="visit.link2" data-edit-max="28" href="mailto:bench@stitchlane.example">bench@stitchlane.example</a>
            </p>
            <div className={s.faq}>
              {QUESTIONS.map(([q, a], i) => (
                <details key={q}>
                  <summary data-edit={`visit.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`visit.body2.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>

          <form className={s.form} action="#">
            <p data-edit="visit.formTicket" data-edit-max="240" data-edit-multiline className={s.formTicket}>Fitting ticket</p>
            <h3 data-edit="visit.title2" data-edit-max="40">Book a fitting</h3>
            <div className={s.field}>
              <label data-edit="visit.label2" htmlFor="sl-name">Name</label>
              <input id="sl-name" name="name" type="text" autoComplete="name" />
            </div>
            <div className={s.field}>
              <label data-edit="visit.label3" htmlFor="sl-phone">Phone</label>
              <input id="sl-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className={s.field}>
              <label data-edit="visit.label4" htmlFor="sl-kind">What for</label>
              <select id="sl-kind" name="kind" defaultValue="alteration">
                <option value="alteration">Alteration fitting, 15 minutes</option>
                <option value="bridal">Bridal or formal, 45 minutes</option>
                <option value="measure">Made to measure, first measure</option>
              </select>
            </div>
            <div className={s.field}>
              <label data-edit="visit.label5" htmlFor="sl-date">Day you would like</label>
              <input id="sl-date" name="date" type="date" />
            </div>
            <div className={s.field}>
              <label data-edit="visit.label6" htmlFor="sl-note">The garment, and what it needs</label>
              <textarea id="sl-note" name="note" rows={3} />
            </div>
            <button data-edit="visit.button" data-edit-max="24" className={s.button} type="submit">Ask for the time</button>
            <p data-edit="visit.small" data-edit-max="240" data-edit-multiline className={s.small}>We confirm by text within the day.</p>
          </form>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="0,2,1,4,3" className={s.selvedge} aria-hidden="true">
          <TabbiedPattern
            pattern={percale}
            palette={SELVEDGE}
            fit="grid"
            cellSize={40}
            seed="stitch-selvedge"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Stitch Lane</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional tailor and alterations shop. The tailors, prices and turnaround times are invented; the dummy is a generated image drawn in the page's colors.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
