import { TabbiedPattern } from 'tabbied/react';
import { aquarelle } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './mira-sato-watercolor.module.css';

export const metadata = {
  title: 'Mira Sato: Watercolor paintings, classes and commissions, Brackenford',
  description:
    'Mira Sato paints in watercolor and teaches it. Weekly classes in Brackenford, signed prints, house and pet commissions, and a painting week on the coast at Saltmarsh Cove.',
};

/* Site colors, the same hexes as the stylesheet's root rule: paper, an
   indigo for the words, and the three pigments on Mira's palette. Aquarelle
   is the wash: two layers of translucent discs that pool where they cross.
   It is the painting taped to the board in the hero, each of the three
   prints, the holiday panel and the footer's last stroke. */
const PAPER = '#faf6ef';
const INDIGO = '#2c3550';
const CERULEAN = '#3a7fb0';
const SIENNA = '#d48c3a';
const ROSE = '#c55470';

const SEA = ['transparent', CERULEAN, SIENNA];
const BLOSSOM = ['transparent', ROSE, CERULEAN];
const DUSK = ['transparent', SIENNA, ROSE];
const NIGHT = ['transparent', CERULEAN, ROSE];

const NAV = [
  ['Classes', '#classes'],
  ['Prints', '#prints'],
  ['Commissions', '#commissions'],
  ['Painting holiday', '#holiday'],
  ['Contact', '#contact'],
];

/* The palette: each pan is a pigment and a part of the page. */
const PANS = [
  ['pb', 'Cerulean blue', 'Classes', '#classes'],
  ['ps', 'Raw sienna', 'Prints', '#prints'],
  ['pr', 'Rose madder', 'Commissions', '#commissions'],
  ['pi', 'Indigo', 'Painting holiday', '#holiday'],
];

type Course = { name: string; when: string; length: string; price: string; about: string; tone: string };

const CLASSES: Course[] = [
  { name: 'First washes', when: 'Tuesdays, 10:00-12:30', length: '6 weeks', price: '$180', about: 'For complete beginners. Flat and graded washes, wet into wet, and how much water is too much.', tone: 'pb' },
  { name: 'Skies and water', when: 'Thursdays, 6:30-9:00', length: '6 weeks', price: '$180', about: 'Clouds in one pass, reflections, and the white of the paper left alone where it matters.', tone: 'pi' },
  { name: 'Botanical studies', when: 'Saturdays, 9:30-12:30', length: '4 weeks', price: '$150', about: 'One plant a week, drawn first, then built up in glazes from the lightest leaf.', tone: 'pr' },
  { name: 'Open studio', when: 'Fridays, 1:00-5:00', length: 'Drop in', price: '$25', about: 'Bring your own work. Tea, a big table, north light, and help when you ask for it.', tone: 'ps' },
];

const KIT = [
  'Twelve half pans of artist-grade paint',
  'Two round brushes, sizes 6 and 12, and a flat',
  'A block of 300 gsm cold-pressed cotton paper',
  'Masking tape, a pencil, two water jars',
];

const COMMISSION_STEPS = [
  ['Send photographs', 'Several, in different light. For a house, the angle you love; for a pet, eye level.'],
  ['A pencil sketch', 'Within a week, for you to approve or change. Nothing is painted until you say so.'],
  ['The painting', 'Three to four weeks, with one progress photo halfway through.'],
  ['Delivered mounted', 'On acid-free board, signed, ready for any standard frame.'],
];

const COMMISSION_PRICES = [
  ['House portrait, 30 x 40 cm', 'from $280'],
  ['Pet portrait, 24 x 30 cm', 'from $240'],
  ['Wedding venue, 40 x 50 cm', 'from $420'],
  ['Each extra animal or figure', '$60'],
];

const DAYS = [
  ['Monday', 'Arrive by four. A walk along the harbor wall and supper together.'],
  ['Tuesday', 'Morning demonstration: wet skies. Afternoon at the boatyard.'],
  ['Wednesday', 'The salt marsh at low tide, with a picnic. Evening review.'],
  ['Thursday', 'Free morning. Afternoon on figures and boats in a few strokes.'],
  ['Friday', 'The week\'s best work pinned up, and a last dinner.'],
];

export default function MiraSatoWatercolorPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#faf6ef',
        '--indigo': '#2c3550',
        '--cerulean': '#3a7fb0',
        '--sienna': '#d48c3a',
        '--rose': '#c55470',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,indigo,cerulean,sienna,rose"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Karla:wght@400;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Mira Sato</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Watercolor</span>
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
        {/* HERO: a sheet taped to the board, still drying. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Painter and teacher, Brackenford</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Let the water do <em>half the painting.</em>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I paint the coast and the gardens of the valley in watercolor, and I
              teach small classes from a loft studio above the old printworks.
              Prints, commissions, and one week a year by the sea.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#classes">Join a class</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#prints">Buy a print</a>
            </div>
          </div>

          <div className={s.board}>
            <div className={s.sheet}>
              <div data-edit-pattern="intro.field" data-edit-roles="transparent,2,3" className={s.sheetWash} aria-hidden="true">
                <TabbiedPattern
                  pattern={aquarelle}
                  palette={SEA}
                  fit="grid"
                  cellSize={44}
                  seed="mira-hero"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <span className={`${s.tape} ${s.tapeA}`} aria-hidden="true" />
            <span className={`${s.tape} ${s.tapeB}`} aria-hidden="true" />
            <p data-edit="intro.sheetCaption" data-edit-max="240" data-edit-multiline className={s.sheetCaption}>Harrow Bay, low tide. Work in progress.</p>
          </div>
        </section>

        {/* THE PALETTE: four pans of paint, each one a part of the page. */}
        <nav className={s.palette} aria-label="The palette">
          {PANS.map(([tone, pigment, part, href], i) => (
            <a key={tone} className={s.pan} href={href}>
              <span className={`${s.well} ${s[tone]}`} aria-hidden="true" />
              <span data-edit={`top.pigment.${i}`} data-edit-max="60" className={s.pigment}>{pigment}</span>
              <span data-edit={`top.part.${i}`} data-edit-max="60" className={s.part}>{part}</span>
            </a>
          ))}
        </nav>

        {/* CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={s.secHead}>
            <h2 data-edit="classes.secTitle" data-edit-max="60" id="classes-h" className={s.secTitle}>Classes</h2>
            <p data-edit="classes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Eight people at most, so I can see every painting. Terms start in
              January, April and September; book a single trial session for $30.
            </p>
          </div>
          <div className={s.classGrid}>
            <ul className={s.classes}>
              {CLASSES.map((c, i) => (
                <li key={c.name} className={s.course}>
                  <span className={`${s.stroke} ${s[c.tone]}`} aria-hidden="true" />
                  <div className={s.courseHead}>
                    <h3 data-edit={`classes.courseName.${i}`} data-edit-max="40" className={s.courseName}>{c.name}</h3>
                    <p data-edit={`classes.coursePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.coursePrice}>{c.price}</p>
                  </div>
                  <p data-edit={`classes.courseWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.courseWhen}>{c.when}</p>
                  <p data-edit={`classes.courseLength.${i}`} data-edit-max="240" data-edit-multiline className={s.courseLength}>{c.length}</p>
                  <p data-edit={`classes.courseAbout.${i}`} data-edit-max="240" data-edit-multiline className={s.courseAbout}>{c.about}</p>
                </li>
              ))}
            </ul>
            <aside className={s.kit}>
              <h3 data-edit="kit.kitTitle" data-edit-max="40" className={s.kitTitle}>What to bring</h3>
              <ul className={s.kitList}>
                {KIT.map((k, i) => (
                  <li data-edit={`kit.item.${i}`} data-edit-max="80" key={k}>{k}</li>
                ))}
              </ul>
              <p data-edit="kit.kitNote" data-edit-max="240" data-edit-multiline className={s.kitNote}>No kit yet? I lend one for the first week, and sell a starter set for $45.</p>
            </aside>
          </div>
        </section>

        {/* PRINTS: three paintings, matted. */}
        <section id="prints" className={s.sec} aria-labelledby="prints-h">
          <div className={s.secHead}>
            <h2 data-edit="prints.secTitle" data-edit-max="60" id="prints-h" className={s.secTitle}>Prints</h2>
            <p data-edit="prints.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Giclee prints on cotton rag paper, signed and numbered, in
              editions of fifty. Posted flat, in a card folder, within a week.
            </p>
          </div>
          <div className={s.prints}>
            <figure className={s.print}>
              <div className={s.mat}>
                <div data-edit-pattern="prints.field" data-edit-roles="transparent,2,3" className={s.printField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={aquarelle}
                    palette={SEA}
                    fit="grid"
                    cellSize={34}
                    seed="mira-print-tide"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <figcaption className={s.printCaption}>
                <span data-edit="prints.printTitle" data-edit-max="60" className={s.printTitle}>Low tide, Harrow Bay</span>
                <span data-edit="prints.printMeta" data-edit-max="60" className={s.printMeta}>30 x 40 cm, edition of 50</span>
                <span data-edit="prints.printPrice" data-edit-max="60" className={s.printPrice}>$85</span>
              </figcaption>
            </figure>
            <figure className={s.print}>
              <div className={s.mat}>
                <div data-edit-pattern="prints.field2" data-edit-roles="transparent,4,2" className={s.printField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={aquarelle}
                    palette={BLOSSOM}
                    fit="grid"
                    cellSize={30}
                    seed="mira-print-plum"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <figcaption className={s.printCaption}>
                <span data-edit="prints.printTitle2" data-edit-max="60" className={s.printTitle}>Plum blossom, March</span>
                <span data-edit="prints.printMeta2" data-edit-max="60" className={s.printMeta}>24 x 30 cm, edition of 50</span>
                <span data-edit="prints.printPrice2" data-edit-max="60" className={s.printPrice}>$65</span>
              </figcaption>
            </figure>
            <figure className={s.print}>
              <div className={s.mat}>
                <div data-edit-pattern="prints.field3" data-edit-roles="transparent,3,4" className={s.printField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={aquarelle}
                    palette={DUSK}
                    fit="grid"
                    cellSize={38}
                    seed="mira-print-dusk"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <figcaption className={s.printCaption}>
                <span data-edit="prints.printTitle3" data-edit-max="60" className={s.printTitle}>The reservoir at dusk</span>
                <span data-edit="prints.printMeta3" data-edit-max="60" className={s.printMeta}>40 x 50 cm, edition of 30</span>
                <span data-edit="prints.printPrice3" data-edit-max="60" className={s.printPrice}>$120</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* COMMISSIONS */}
        <section id="commissions" className={s.sec} aria-labelledby="commissions-h">
          <div className={s.commission}>
            <div>
              <h2 data-edit="commissions.secTitle" data-edit-max="60" id="commissions-h" className={s.secTitle}>Commissions</h2>
              <p data-edit="commissions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Houses, gardens, pets and the places people were married. I take
                four a month and the list is usually about six weeks long. A 30
                percent deposit holds your place.
              </p>
              <dl className={s.prices}>
                {COMMISSION_PRICES.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`commissions.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`commissions.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ol className={s.steps}>
              {COMMISSION_STEPS.map(([title, text], i) => (
                <li key={title} className={s.step}>
                  <h3 data-edit={`commissions.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                  <p data-edit={`commissions.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* HOLIDAY: a week at the coast, on the indigo band. */}
        <section id="holiday" className={s.holiday} aria-labelledby="holiday-h">
          <div className={s.holidayInner}>
            <div className={s.holidayHead}>
              <p data-edit="holiday.holidayKicker" data-edit-max="240" data-edit-multiline className={s.holidayKicker}>12-16 May 2027, eight places</p>
              <h2 data-edit="holiday.holidayTitle" data-edit-max="60" id="holiday-h" className={s.holidayTitle}>A painting week at Saltmarsh Cove</h2>
              <p data-edit="holiday.holidayLead" data-edit-max="240" data-edit-multiline className={s.holidayLead}>
                Five days on a quiet stretch of coast: a demonstration each
                morning, painting outdoors each afternoon, and the work pinned up
                after supper. All levels welcome; non-painting partners too.
              </p>
              <div data-edit-pattern="holiday.field" data-edit-roles="transparent,2,4" className={s.holidayField} aria-hidden="true">
                <TabbiedPattern
                  pattern={aquarelle}
                  palette={NIGHT}
                  fit="grid"
                  cellSize={42}
                  seed="mira-holiday"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div className={s.holidayBody}>
              <ol className={s.days}>
                {DAYS.map(([day, plan], i) => (
                  <li key={day}>
                    <h3 data-edit={`holiday.dayName.${i}`} data-edit-max="40" className={s.dayName}>{day}</h3>
                    <p data-edit={`holiday.dayPlan.${i}`} data-edit-max="240" data-edit-multiline className={s.dayPlan}>{plan}</p>
                  </li>
                ))}
              </ol>
              <dl className={s.holidayPrices}>
                <div>
                  <dt data-edit="holiday.term" data-edit-max="28">Shared room</dt>
                  <dd data-edit="holiday.body" data-edit-max="200" data-edit-multiline>$1,450</dd>
                </div>
                <div>
                  <dt data-edit="holiday.term2" data-edit-max="28">Room of your own</dt>
                  <dd data-edit="holiday.body2" data-edit-max="200" data-edit-multiline>$1,690</dd>
                </div>
                <div>
                  <dt data-edit="holiday.term3" data-edit-max="28">Partner, not painting</dt>
                  <dd data-edit="holiday.body3" data-edit-max="200" data-edit-multiline>$790</dd>
                </div>
              </dl>
              <p data-edit="holiday.holidayNote" data-edit-max="240" data-edit-multiline className={s.holidayNote}>
                Four nights at the Gull House guesthouse, breakfasts, three dinners,
                tuition and paper. Travel is yours to arrange.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contact}>
            <div>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Write to me</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                About a class, a print, a commission or the week at the coast. I
                answer every letter within two days, usually in the evening.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>The Loft, 18 Quill Street, Brackenford</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550158830">(555) 015-8830</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:studio@mirasato.example">studio@mirasato.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Open studio</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Fridays 1:00-5:00, visitors welcome</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="ms-name">Name</label>
                <input id="ms-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="ms-email">Email</label>
                <input id="ms-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label3" htmlFor="ms-about">I am writing about</label>
                <select id="ms-about" name="about" defaultValue="class">
                  <option value="class">A class</option>
                  <option value="print">A print</option>
                  <option value="commission">A commission</option>
                  <option value="holiday">The painting week</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label4" htmlFor="ms-note">Message</label>
                <textarea id="ms-note" name="note" rows={5} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,2" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={aquarelle}
            palette={BLOSSOM}
            fit="grid"
            cellSize={40}
            seed="mira-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Mira Sato Watercolor</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional painter and teacher. The people, places, prices and
            address are invented, and the paintings are patterns.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
