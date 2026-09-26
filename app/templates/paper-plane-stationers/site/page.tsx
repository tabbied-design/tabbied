import { TabbiedPattern } from 'tabbied/react';
import { crease, jibboom, waterbomb } from 'tabbied/patterns';
import s from './paper-plane-stationers.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Paper Plane: Stationery shop, Quill Lane',
  description:
    'Paper Plane sells pens you can try, notebooks by paper weight and paper by the sheet on Quill Lane, and hosts a letter-writing club on the first Sunday of every month.',
};

/* Site colors: the sheet and four inks. The folded-paper fields take only
   these, so a re-color reaches every sheet. */
const PAPER = '#fbfaf4';
const INK = '#23409a';
const MINT = '#a8e0c8';
const PINK = '#f5bccb';
const LEMON = '#f3df85';

const SHEET_A = [PINK, INK, MINT, PAPER, LEMON];
const SHEET_B = [MINT, INK, PINK, PAPER];
const SHEET_C = [LEMON, PINK, INK, MINT];
const HERO = [PAPER, INK, PINK, MINT, LEMON];
const TAPE = [PINK, INK, PAPER, MINT];

const NAV = [
  ['Pens', '#pens'],
  ['Notebooks', '#notebooks'],
  ['Paper', '#paper'],
  ['Letter club', '#club'],
  ['Visit', '#visit'],
];

type Pen = {
  sample: string;
  kind: string;
  detail: string;
  price: string;
};

/* The test pad by the till, one line per pen. The sample is what someone
   actually wrote. */
const PENS: Pen[] = [
  { sample: 'Dear Rosa, the tomatoes came up.', kind: 'Gel pen, 0.38 mm', detail: 'Blue-black, dries in two seconds, good for left hands', price: '$3.50' },
  { sample: 'testing testing one two', kind: 'Fountain pen, fine nib', detail: 'Steel nib, clear barrel, takes cartridges or bottled ink', price: '$28' },
  { sample: 'Happy birthday, Dad', kind: 'Brush pen, soft tip', detail: 'For lettering and cards; one tip, thick and thin', price: '$6' },
  { sample: 'milk, eggs, stamps, the good tape', kind: 'Fineliner, 0.1 mm', detail: 'Pigment ink, will not smudge under a highlighter', price: '$3' },
  { sample: 'is this the one Ana liked?', kind: 'Pencil, 2B', detail: 'Cedar, unpainted, sharpened at the counter for free', price: '$1.20' },
];

type Weight = {
  gsm: number;
  feels: string;
  pen: string;
  book: string;
  price: string;
};

const WEIGHTS: Weight[] = [
  { gsm: 52, feels: 'Thin as a bible page, crinkles when it dries', pen: 'Fountain pens love it; you will see the back', book: 'Travel diary, 368 pages', price: '$24' },
  { gsm: 68, feels: 'Light and smooth, still lies flat', pen: 'No bleed, a little show-through', book: 'Pocket notebook, lined', price: '$9' },
  { gsm: 80, feels: 'Ordinary printer paper, but nicer', pen: 'Fine with most pens, feathers with wet ink', book: 'School exercise book, grid', price: '$4' },
  { gsm: 100, feels: 'Firm, you can write on both sides', pen: 'Any pen, both sides', book: 'A5 dot grid, lay-flat binding', price: '$18' },
  { gsm: 120, feels: 'Card-like, turns with a snap', pen: 'Markers, brush pens, light watercolor', book: 'Planner, undated, week to a spread', price: '$26' },
  { gsm: 160, feels: 'Stiff, almost a card', pen: 'Paint, collage, glue', book: 'Sketchbook, plain, stitched', price: '$22' },
];

const RULINGS = ['Plain', 'Lined, 7 mm', 'Dot grid, 5 mm', 'Grid, 5 mm'];

const CLUB_DATES = [
  ['Sunday, October 4', 'Letters to someone you owe one'],
  ['Sunday, November 1', 'Pen pals: the exchange box opens'],
  ['Sunday, December 6', 'Cards, forty of them, before the post gets busy'],
  ['Sunday, January 3', 'Thank-you notes, finally'],
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Friday', '10 am to 6 pm'],
  ['Saturday', '10 am to 5 pm'],
  ['Sunday', '11 am to 4 pm'],
];

export default function PaperPlaneStationersPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Paper Plane</a>
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
            <p className={s.kicker}>Stationery shop, 27 Quill Lane</p>
            <h1 id="hero-h" className={s.title}>Paper <em>Plane</em></h1>
            <p className={s.lede}>
              Pens you can try before you buy, notebooks sorted by how heavy
              the paper is, paper by the single sheet, and a long table at the
              back for writing letters on.
            </p>
            <p className={s.scrawl}>Open every day but Monday. Come and scribble.</p>
          </div>

          <div className={s.heroDesk}>
            <div className={s.heroSheet}>
              <div className={s.heroField} aria-hidden="true">
                <TabbiedPattern
                  pattern={waterbomb}
                  palette={HERO}
                  fit="grid"
                  cellSize={56}
                  seed="plane-hero"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div className={s.heroCard}>
              <p className={s.cardHead}>New at the counter</p>
              <ul className={s.cardList}>
                <li>Folding paper, 15 cm, 100 sheets</li>
                <li>Mint ink, the one everyone asked about</li>
                <li>Dot grid notebooks, back in A5</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ PENS */}
        <section id="pens" className={s.pens} aria-labelledby="pens-h">
          <div className={s.inner}>
            <div className={s.head}>
              <p className={s.kicker}>The test pad</p>
              <h2 id="pens-h">Try every pen first</h2>
              <p className={s.headNote}>
                Every pen we sell has a tester on the desk by the window, and a
                pad beside it. We put out a fresh pad every morning. This is
                what yesterday's looked like.
              </p>
            </div>
          </div>

          <div className={s.strip}>
            <span className={s.tapeL} aria-hidden="true" />
            <span className={s.tapeR} aria-hidden="true" />
            <ol className={s.samples}>
              {PENS.map((p) => (
                <li key={p.kind}>
                  <p className={s.sample}>{p.sample}</p>
                  <p className={s.penKind}>{p.kind}</p>
                  <p className={s.penDetail}>{p.detail}</p>
                  <span className={s.penPrice}>{p.price}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={s.inner}>
            <p className={s.inkBar}>
              The ink bar: 24 bottled inks with a dip pen to try each. Sample
              vials $2, bottles from $12. Converters fitted for free.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------- NOTEBOOKS */}
        <section id="notebooks" className={s.books} aria-labelledby="books-h">
          <div className={s.inner}>
            <div className={s.head}>
              <p className={s.kicker}>Sorted by weight</p>
              <h2 id="books-h">Notebooks, by the paper inside</h2>
              <p className={s.headNote}>
                The number that matters is grams per square meter. Lighter
                paper means more pages in the same thickness; heavier paper
                means your pen stays on its own side.
              </p>
            </div>

            <div className={s.weights}>
              <div className={s.weightsHead} aria-hidden="true">
                <span>Weight</span>
                <span>What it feels like</span>
                <span>With a pen</span>
                <span>Our notebook</span>
              </div>
              <ol className={s.weightList}>
                {WEIGHTS.map((w) => (
                  <li key={w.gsm} style={{ '--gsm': w.gsm } as React.CSSProperties}>
                    <p className={s.gsm}>
                      <strong>{String(w.gsm)}</strong>
                      <span>gsm</span>
                    </p>
                    <span className={s.thick} aria-hidden="true" />
                    <p className={s.feels}>{w.feels}</p>
                    <p className={s.withPen}>{w.pen}</p>
                    <p className={s.book}>{w.book}</p>
                    <span className={s.bookPrice}>{w.price}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={s.rulings}>
              <p className={s.rulingsLabel}>Every notebook comes in</p>
              <ul>
                {RULINGS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- PAPER */}
        <section id="paper" className={s.paper} aria-labelledby="paper-h">
          <div className={s.inner}>
            <div className={s.head}>
              <p className={s.kicker}>From the plan chest</p>
              <h2 id="paper-h">Paper by the sheet</h2>
              <p className={s.headNote}>
                Forty drawers of it, printed in small runs. Buy one sheet for a
                present or a hundred for a wedding; we roll it, never fold it.
              </p>
            </div>

            <div className={s.sheets}>
              <figure className={s.sheet}>
                <div className={s.sheetField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={waterbomb}
                    palette={SHEET_A}
                    fit="grid"
                    cellSize={40}
                    seed="plane-sheet-a"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <figcaption className={s.tag}>
                  <strong>Waterbomb</strong>
                  <span>Wrapping sheet, 50 x 70 cm, $4.50</span>
                </figcaption>
              </figure>

              <figure className={s.sheet}>
                <div className={s.sheetField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={crease}
                    palette={SHEET_B}
                    fit="grid"
                    cellSize={36}
                    seed="plane-sheet-b"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <figcaption className={s.tag}>
                  <strong>Crease</strong>
                  <span>Folding paper, 15 cm, 100 sheets, $9</span>
                </figcaption>
              </figure>

              <figure className={s.sheet}>
                <div className={s.sheetField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={waterbomb}
                    palette={SHEET_C}
                    fit="grid"
                    cellSize={28}
                    seed="plane-sheet-c"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <figcaption className={s.tag}>
                  <strong>Lemon fold</strong>
                  <span>Endpapers, A3, pack of 5, $7</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ CLUB */}
        <section id="club" className={s.club} aria-labelledby="club-h">
          <div className={s.inner}>
            <div className={s.clubGrid}>
              <div className={s.letter}>
                <div className={s.washi} aria-hidden="true">
                  <TabbiedPattern
                    pattern={jibboom}
                    palette={TAPE}
                    fit="grid"
                    cellSize={24}
                    seed="plane-washi"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <h2 id="club-h" className={s.letterHead}>The letter-writing club</h2>
                <p className={s.letterDate}>First Sunday of the month, 2 to 4 pm</p>
                <p className={s.letterBody}>Dear letter writers,</p>
                <p className={s.letterBody}>
                  Bring a letter you have been meaning to write. We put out the
                  long table, the good pens and a pot of tea, and nobody talks
                  for the first half hour.
                </p>
                <p className={s.letterBody}>
                  Five dollars covers a sheet of letter paper, an envelope and
                  a stamp. If you have nobody to write to, the pen pal box has
                  about sixty people in it who would like a letter.
                </p>
                <p className={s.letterSign}>Hana, at the counter</p>
              </div>

              <div className={s.clubSide}>
                <h3 className={s.sideTitle}>Coming up</h3>
                <ol className={s.dates}>
                  {CLUB_DATES.map(([d, theme]) => (
                    <li key={d}>
                      <strong>{d}</strong>
                      <span>{theme}</span>
                    </li>
                  ))}
                </ol>
                <p className={s.sideNote}>Twelve seats. Put your name on the sheet by the till, or ask below.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.inner}>
            <div className={s.visitGrid}>
              <div className={s.card}>
                <h2 id="visit-h">27 Quill Lane</h2>
                <p className={s.visitSub}>Harbor Hill, across from the post office, which is not a coincidence.</p>
                <dl className={s.hours}>
                  {HOURS.map(([d, h]) => (
                    <div key={d}>
                      <dt>{d}</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.contact}>
                  <a href="tel:+15550183321">(555) 018-3321</a>
                </p>
                <p className={s.contact}>
                  <a href="mailto:hello@paperplane.example">hello@paperplane.example</a>
                </p>
              </div>

              <form className={s.card} action="#">
                <h3 className={s.formTitle}>Save me a seat, or a notebook</h3>
                <div className={s.field}>
                  <label htmlFor="pp-name">Name</label>
                  <input id="pp-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="pp-email">Email</label>
                  <input id="pp-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label htmlFor="pp-what">What for</label>
                  <select id="pp-what" name="what" defaultValue="club">
                    <option value="club">A seat at the next letter club</option>
                    <option value="penpal">A pen pal from the box</option>
                    <option value="hold">Hold something for me</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="pp-note">Anything else</label>
                  <textarea id="pp-note" name="note" rows={3} />
                </div>
                <button className={s.submit} type="submit">Send it</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Paper Plane</p>
        <p>A fictional stationery shop. The pens, prices and club dates are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
