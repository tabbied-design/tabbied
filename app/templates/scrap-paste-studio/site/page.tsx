import { TabbiedPattern } from 'tabbied/react';
import { paperscraps } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './scrap-paste-studio.module.css';

export const metadata = {
  title: 'Scrap & Paste: Collage studio, classes for adults and kids, commissions',
  description:
    'Scrap & Paste is a collage artist\'s studio on Bindery Row: a portfolio of paper collages, a classes calendar for adults, teens and kids, and commissions made from your own boxes of paper.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The paper
   scraps are the studio's floor at the end of a class: torn white edges
   and scraps of fuchsia, lagoon, marigold and plum on a dark board. They
   are the collage in the hero, each work on the wall, the box of paper
   beside the commissions and the footer's strip. */
const KRAFT = '#e9dcc3';
const PLUM = '#2b2133';
const FUCHSIA = '#d63d6f';
const LAGOON = '#1f8f8a';
const MARIGOLD = '#f0a830';
const PAPER = '#fbf7ee';

const SCRAPS = ['transparent', PAPER, FUCHSIA, LAGOON, MARIGOLD, KRAFT, FUCHSIA];
const WALL = ['transparent', PAPER, LAGOON, MARIGOLD, FUCHSIA, KRAFT, LAGOON];
const BOX = ['transparent', PAPER, MARIGOLD, FUCHSIA, LAGOON, PLUM, KRAFT];

const NAV = [
  ['Work', '#work'],
  ['Classes', '#classes'],
  ['Commissions', '#commissions'],
  ['Visit', '#visit'],
];

type Work = { title: string; year: string; size: string; made: string; price: string; seed: string; shape: string };

const WORKS: Work[] = [
  { title: 'Small Hours', year: '2026', size: '40 x 50 cm', made: 'Magazine paper and gouache on board', price: '$1,400', seed: 'scrap-work-a', shape: 'tall' },
  { title: 'Allotment, July', year: '2025', size: '30 x 30 cm', made: 'Seed packets and tissue', price: 'Sold', seed: 'scrap-work-b', shape: 'square' },
  { title: 'Bus Window', year: '2026', size: '60 x 40 cm', made: 'Transfer tickets and tracing paper', price: '$1,900', seed: 'scrap-work-c', shape: 'wide' },
  { title: 'Nine Kitchens', year: '2025', size: '50 x 50 cm', made: 'Wallpaper sample books', price: '$1,600', seed: 'scrap-work-d', shape: 'square' },
  { title: 'Low Tide Receipt', year: '2026', size: '20 x 25 cm', made: 'Till receipts and red thread', price: '$480', seed: 'scrap-work-e', shape: 'tall' },
  { title: 'Atlas for My Mother', year: '2024', size: '70 x 50 cm', made: 'Old road maps, a commission', price: 'Private collection', seed: 'scrap-work-f', shape: 'wide' },
];

type Session = { kind: string; label: string };
type Day = { n: string; events: Session[]; note?: string };

const KIDS: Session = { kind: 'kids', label: 'Kids club 10:00' };
const TEENS: Session = { kind: 'teens', label: 'Zine lab 4:30' };
const NIGHT: Session = { kind: 'adults', label: 'Collage night 7:00' };
const FAMILY: Session = { kind: 'family', label: 'Family afternoon 2:00' };

/* November 2026: the 1st is a Sunday, so the grid starts on the seventh
   column. Saturday workshops each have a subject. */
const NOVEMBER: Day[] = [
  { n: '1', events: [FAMILY] },
  { n: '2', events: [] },
  { n: '3', events: [] },
  { n: '4', events: [NIGHT] },
  { n: '5', events: [TEENS] },
  { n: '6', events: [] },
  { n: '7', events: [KIDS, { kind: 'adults', label: 'Workshop 2:00, magazine portraits' }] },
  { n: '8', events: [] },
  { n: '9', events: [] },
  { n: '10', events: [] },
  { n: '11', events: [NIGHT] },
  { n: '12', events: [TEENS] },
  { n: '13', events: [] },
  { n: '14', events: [KIDS, { kind: 'adults', label: 'Workshop 2:00, paper weaving' }] },
  { n: '15', events: [] },
  { n: '16', events: [] },
  { n: '17', events: [] },
  { n: '18', events: [NIGHT] },
  { n: '19', events: [TEENS] },
  { n: '20', events: [] },
  { n: '21', events: [KIDS, { kind: 'adults', label: 'Workshop 2:00, botanical cut-outs' }] },
  { n: '22', events: [] },
  { n: '23', events: [] },
  { n: '24', events: [] },
  { n: '25', events: [NIGHT] },
  { n: '26', events: [], note: 'Closed for the holiday' },
  { n: '27', events: [] },
  { n: '28', events: [KIDS, { kind: 'adults', label: 'Workshop 2:00, cards for December' }] },
  { n: '29', events: [] },
  { n: '30', events: [] },
];

/* The days either side of the month that the wall calendar prints faintly. */
const OCTOBER_TAIL = ['26', '27', '28', '29', '30', '31'];
const DECEMBER_HEAD = ['1', '2', '3', '4', '5', '6'];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CLASSES = [
  ['kids', 'Kids collage club', 'Ages 6-11, Saturdays 10:00-11:30', '$18 a class, or $64 for the month', 'Scissors, glue sticks and a theme a week. Parents may stay or go for coffee.'],
  ['teens', 'Zine lab', 'Ages 12-16, Thursdays 4:30-6:00', '$20 a class', 'Make a small magazine, photocopy it on the studio machine, swap it with the others.'],
  ['adults', 'Collage night and workshops', 'Adults, Wednesdays 7:00-9:00 and Saturdays 2:00-5:00', '$38 a night, $65 a workshop', 'All materials laid out. Bring a bottle if you like, and a box of your own paper.'],
  ['family', 'Family afternoon', 'All ages, first Sunday, 2:00-4:00', '$30 a family', 'One big table, one big collage, and everyone takes a piece of it home.'],
];

const STEPS = [
  ['Send me a box', 'Letters, tickets, maps, wrapping paper, the menu from the wedding. Anything flat that means something.'],
  ['A half-hour call', 'We talk about the person, the place or the year it is for, and where it will hang.'],
  ['A sketch in two weeks', 'A small paper study, photographed and sent to you. One round of changes is included.'],
  ['Finished in six to eight', 'Framed, wrapped and delivered, with whatever paper was left over returned in its box.'],
];

const SIZES = [
  ['20 x 25 cm', '$450'],
  ['30 x 40 cm', '$850'],
  ['50 x 70 cm', '$1,600'],
  ['Framed in oak, any size', 'add $180'],
];

const HOURS = [
  ['Studio and shop', 'Thursday to Saturday, 11:00-5:00'],
  ['Classes', 'As on the calendar'],
  ['Parties', 'Sundays, by arrangement'],
];

const INTERESTS = ['A class', 'A commission', 'Buying a work', 'A party'];

export default function ScrapPasteStudioPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--kraft': '#e9dcc3',
        '--plum': '#2b2133',
        '--fuchsia': '#d63d6f',
        '--lagoon': '#1f8f8a',
        '--marigold': '#f0a830',
        '--paper': '#fbf7ee',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="kraft,plum,fuchsia,lagoon,marigold,paper"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gloock&family=Figtree:ital,wght@0,400;0,600;0,800;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Scrap & Paste</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Collage studio</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#classes">Book a class</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A board of torn scraps taped to the wall, with the show card
            pinned beside it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Collage artist and art teacher, 3 Bindery Row</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Cut it out. <span>Stick it down.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I am Wren Abara. I make collages from paper other people throw
              away, and I teach anyone over six to do the same: on Wednesday
              nights, Saturday mornings, and once a month with the whole
              family round one table.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#classes">See the classes</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#commissions">Commission a collage</a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,5,2,3,4,0,2" className={s.board} aria-hidden="true">
              <TabbiedPattern
                pattern={paperscraps}
                palette={SCRAPS}
                fit="grid"
                cellSize={64}
                seed="scrap-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.showCard}>
              <p data-edit="hero.showKicker" data-edit-max="240" data-edit-multiline className={s.showKicker}>On the wall now</p>
              <p data-edit="hero.showTitle" data-edit-max="240" data-edit-multiline className={s.showTitle}>Small Hours</p>
              <p data-edit="hero.showText" data-edit-max="240" data-edit-multiline className={s.showText}>Fourteen new collages, open studio Thursday to Saturday until 30 November.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ WORK
            A salon hang: frames of different shapes, each with its label. */}
        <section id="work" className={s.sec} aria-labelledby="work-h">
          <div className={s.secHead}>
            <h2 data-edit="work.secTitle" data-edit-max="60" id="work-h" className={s.secTitle}>On the wall</h2>
            <p data-edit="work.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Recent collages, all one of a kind. Works for sale can be seen
              at the studio, or sent out on approval for a week.
            </p>
          </div>
          <ul className={s.wall}>
            {WORKS.map((w, i) => (
              <li key={w.title} className={`${s.work} ${s[w.shape]}`}>
                <div className={s.frame}>
                  <div data-edit-pattern={`work.field.${i}`} data-edit-roles="transparent,5,3,4,2,0,3" className={s.workField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={paperscraps}
                      palette={WALL}
                      fit="grid"
                      cellSize={44}
                      seed={w.seed}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                </div>
                <div className={s.workLabel}>
                  <h3 data-edit={`work.workTitle.${i}`} data-edit-max="40" className={s.workTitle}>{w.title}</h3>
                  <p className={s.workMeta}>{`${w.year}, ${w.size}`}</p>
                  <p data-edit={`work.workMade.${i}`} data-edit-max="240" data-edit-multiline className={s.workMade}>{w.made}</p>
                  <p data-edit={`work.workPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.workPrice}>{w.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- CLASSES
            November on the studio wall calendar, then what each class is. */}
        <section id="classes" className={s.classes} aria-labelledby="classes-h">
          <div className={s.classesInner}>
            <div className={s.secHead}>
              <h2 data-edit="classes.secTitle" data-edit-max="60" id="classes-h" className={s.secTitle}>Classes in November</h2>
              <p data-edit="classes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Eight places a class, so book ahead. Every material is
                included, aprons too. Cancel up to a day before for a credit.
              </p>
            </div>
            <div className={s.calendar}>
              <p data-edit="classes.month" data-edit-max="240" data-edit-multiline className={s.month}>November 2026</p>
              <div className={s.weekdays} aria-hidden="true">
                {WEEKDAYS.map((d, i) => (
                  <span data-edit={`classes.text.${i}`} data-edit-max="60" key={d}>{d}</span>
                ))}
              </div>
              <ol className={s.days}>
                {OCTOBER_TAIL.map((n, i) => (
                  <li key={`oct-${n}`} className={`${s.day} ${s.spill}`}>
                    <time data-edit={`classes.dayNo.${i}`} className={s.dayNo} dateTime={`2026-10-${n}`}>{n}</time>
                  </li>
                ))}
                {NOVEMBER.map((day, i) => (
                  <li key={day.n} className={day.events.length || day.note ? s.day : `${s.day} ${s.empty}`}>
                    <time data-edit={`classes.dayNo2.${i}`} className={s.dayNo} dateTime={`2026-11-${day.n.padStart(2, '0')}`}>{day.n}</time>
                    <span data-edit={`classes.dayName.${i}`} data-edit-max="60" className={s.dayName}>{WEEKDAYS[(Number(day.n) + 5) % 7]}</span>
                    {day.note ? <span data-edit={`classes.dayNote.${i}`} data-edit-max="60" className={s.dayNote}>{day.note}</span> : null}
                    {day.events.map((ev, j) => (
                      <span data-edit={`classes.chip.${i}.${j}`} data-edit-max="60" key={`${day.n}-${j}`} className={`${s.chip} ${s[ev.kind]}`}>{ev.label}</span>
                    ))}
                  </li>
                ))}
                {DECEMBER_HEAD.map((n, i) => (
                  <li key={`dec-${n}`} className={`${s.day} ${s.spill}`}>
                    <time data-edit={`classes.dayNo3.${i}`} className={s.dayNo} dateTime={`2026-12-0${n}`}>{n}</time>
                  </li>
                ))}
              </ol>
            </div>
            <ul className={s.classList}>
              {CLASSES.map(([kind, name, when, price, what], i) => (
                <li key={kind} className={`${s.classCard} ${s[`${kind}Card`]}`}>
                  <h3 data-edit={`classes.className.${i}`} data-edit-max="40" className={s.className}>{name}</h3>
                  <p data-edit={`classes.classWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.classWhen}>{when}</p>
                  <p data-edit={`classes.classWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.classWhat}>{what}</p>
                  <p data-edit={`classes.classPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.classPrice}>{price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------- COMMISSIONS */}
        <section id="commissions" className={s.sec} aria-labelledby="commissions-h">
          <div className={s.commGrid}>
            <div className={s.boxWrap}>
              <div data-edit-pattern="commissions.field" data-edit-roles="transparent,5,4,2,3,1,0" className={s.box} aria-hidden="true">
                <TabbiedPattern
                  pattern={paperscraps}
                  palette={BOX}
                  fit="grid"
                  cellSize={52}
                  seed="scrap-box"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="commissions.boxLabel" data-edit-max="240" data-edit-multiline className={s.boxLabel}>Your box of paper</p>
            </div>
            <div>
              <h2 data-edit="commissions.secTitle" data-edit-max="60" id="commissions-h" className={s.secTitle}>Commission a collage from your own paper</h2>
              <p data-edit="commissions.commLead" data-edit-max="240" data-edit-multiline className={s.commLead}>
                A first home, a long marriage, a parent remembered: made
                from the paper that was there. I take six commissions a
                season, and the next opening is in January.
              </p>
              <ol className={s.steps}>
                {STEPS.map(([title, body], i) => (
                  <li key={title}>
                    <span className={s.stepNo}>{i + 1}</span>
                    <h3 data-edit={`commissions.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                    <p data-edit={`commissions.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{body}</p>
                  </li>
                ))}
              </ol>
              <table className={s.sizes}>
                <caption data-edit="commissions.sizesCaption" className={s.sizesCaption}>Prices by size, unframed</caption>
                <tbody>
                  {SIZES.map(([size, price], i) => (
                    <tr key={size}>
                      <th data-edit={`commissions.heading.${i}`} scope="row">{size}</th>
                      <td data-edit={`commissions.cell.${i}`}>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitGrid}>
            <div className={s.visitCard}>
              <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>Come up to the studio</h2>
              <p data-edit="visit.visitLead" data-edit-max="240" data-edit-multiline className={s.visitLead}>
                Upstairs at the old print works, through the blue door and
                up one flight. The kettle is usually on.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="visit.term" data-edit-max="28">Address</dt>
                  <dd data-edit="visit.body" data-edit-max="200" data-edit-multiline>3 Bindery Row, first floor, Millgate</dd>
                </div>
                <div>
                  <dt data-edit="visit.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="visit.link" data-edit-max="28" href="tel:+15550196613">(555) 019-6613</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="visit.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="visit.link2" data-edit-max="28" href="mailto:wren@scrapandpaste.example">wren@scrapandpaste.example</a>
                  </dd>
                </div>
                {HOURS.map(([term, detail], i) => (
                  <div key={term}>
                    <dt data-edit={`visit.term4.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <p data-edit="visit.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Drop me a note</p>
              <div className={s.field}>
                <label data-edit="visit.label" htmlFor="sp-name">Your name</label>
                <input id="sp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="visit.label2" htmlFor="sp-email">Email</label>
                <input id="sp-email" name="email" type="email" autoComplete="email" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="visit.legend">I am interested in</legend>
                <div className={s.picks}>
                  {INTERESTS.map((item, i) => (
                    <span key={item} className={s.pick}>
                      <input id={`sp-int-${i}`} type="radio" name="interest" value={item} />
                      <label data-edit={`visit.label3.${i}`} htmlFor={`sp-int-${i}`}>{item}</label>
                    </span>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="visit.label4" htmlFor="sp-note">Message</label>
                <textarea id="sp-note" name="note" rows={5} />
              </div>
              <button data-edit="visit.submit" data-edit-max="24" className={s.submit} type="submit">Send the note</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,5,2,3,4,0,2" className={s.footStrip} aria-hidden="true">
          <TabbiedPattern
            pattern={paperscraps}
            palette={SCRAPS}
            fit="grid"
            cellSize={40}
            seed="scrap-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Scrap & Paste</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>
            A fictional studio: the names, people, prices and address are
            invented.
          </p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
