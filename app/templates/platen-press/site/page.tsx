import { TabbiedPattern } from 'tabbied/react';
import { halftone, misprint } from 'tabbied/patterns';
import s from './platen-press.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Platen Press: Letterpress print studio, Foundry Lane',
  description:
    'Platen Press prints business cards, invitations and stationery by hand on a 1911 platen press. Eight papers, prices by the hundred, and a quote within a working day.',
};

/* Site colors. The misprint dots are the red and the black plates of a
   two-color job, slightly out of register, on the paper itself. */
const INK = '#161616';
const RED = '#D1343A';
const GRAY = '#8F8A80';
const PALE = '#E5E0D6';

const REGISTER = ['transparent', RED, INK];
const PROOF = ['transparent', RED, GRAY, RED, PALE];
const TINT = ['transparent', INK, RED];

const NAV = [
  ['Papers', '#papers'],
  ['Prices', '#prices'],
  ['Process', '#process'],
  ['Order', '#order'],
  ['Studio', '#studio'],
];

const SPECS = [
  ['Press', '8 x 12 in platen, cast 1911'],
  ['Largest sheet', '9 x 13 in'],
  ['Ink', 'Oil-based, mixed by eye to any swatch'],
  ['Turnaround', 'Two to three weeks from proof'],
];

type Paper = {
  no: string;
  weight: string;
  name: string;
  stock: string;
  thick: string;
  best: string;
  tone: 'white' | 'ecru' | 'oat' | 'stone' | 'coal' | 'red' | 'duplex' | 'thin';
};

const PAPERS: Paper[] = [
  { no: 'A', weight: '600', name: 'Pearl White', stock: '100% cotton', thick: '0.8 mm', best: 'Business cards with a deep bite', tone: 'white' },
  { no: 'B', weight: '300', name: 'Pearl White', stock: '100% cotton', thick: '0.4 mm', best: 'Notes, letterhead, inserts', tone: 'thin' },
  { no: 'C', weight: '600', name: 'Ecru', stock: '100% cotton', thick: '0.8 mm', best: 'Invitations, place cards', tone: 'ecru' },
  { no: 'D', weight: '350', name: 'Oatmeal', stock: 'Recycled, flecked', thick: '0.5 mm', best: 'Tags, menus, coasters', tone: 'oat' },
  { no: 'E', weight: '400', name: 'Stone Kraft', stock: 'Unbleached kraft', thick: '0.55 mm', best: 'Labels and packaging', tone: 'stone' },
  { no: 'F', weight: '700', name: 'Coal', stock: 'Dyed through', thick: '0.9 mm', best: 'White ink or foil', tone: 'coal' },
  { no: 'G', weight: '350', name: 'Vermilion', stock: 'Dyed through', thick: '0.5 mm', best: 'Envelope liners, a second color', tone: 'red' },
  { no: 'H', weight: '1200', name: 'White and Vermilion', stock: 'Two sheets, pasted', thick: '1.6 mm', best: 'Cards that stand on their edge', tone: 'duplex' },
];

type Row = {
  item: string;
  size: string;
  colors: string;
  p100: string;
  p250: string;
  p500: string;
};

const PRICES: Row[] = [
  { item: 'Business cards', size: '2 x 3.5 in', colors: '1', p100: '$180', p250: '$240', p500: '$330' },
  { item: 'Business cards', size: '2 x 3.5 in', colors: '2', p100: '$260', p250: '$340', p500: '$460' },
  { item: 'Flat notes', size: '4.25 x 5.5 in', colors: '1', p100: '$210', p250: '$290', p500: '$420' },
  { item: 'Letterhead', size: '8.5 x 11 in', colors: '1', p100: '$260', p250: '$360', p500: '$520' },
  { item: 'Coasters', size: '4 in round', colors: '1', p100: '$190', p250: '$260', p500: '$370' },
  { item: 'Wedding invitation', size: '5 x 7 in', colors: '1', p100: '$420', p250: '$560', p500: '$780' },
  { item: 'Invitation suite, 3 pieces', size: '5 x 7 in and cards', colors: '2', p100: '$980', p250: '$1,280', p500: '$1,740' },
];

const EXTRAS = [
  ['Another ink color', '$45 a plate'],
  ['Painted edges', '$0.30 a piece'],
  ['Duplexing two stocks', '$0.40 a piece'],
  ['Rush, ten working days', 'Add 25 percent'],
];

type Step = {
  no: string;
  title: string;
  time: string;
  body: string;
  art?: string;
  alt?: string;
};

const STEPS: Step[] = [
  {
    no: 'I',
    title: 'Proof',
    time: 'Days 1 to 3',
    body: 'You send the words or a finished file. We set it, send a PDF proof with the paper and ink named on it, and change it until it is right.',
    art: 'platen-press-nib',
    alt: 'A fountain pen nib',
  },
  {
    no: 'II',
    title: 'Plates',
    time: 'Days 4 to 6',
    body: 'One photopolymer plate for each color, made from the approved proof. Once the plate is made, a change means a new plate.',
  },
  {
    no: 'III',
    title: 'Ink',
    time: 'The morning of',
    body: 'Mixed on the slab by eye to your swatch, then rolled out thin with a brayer until it hisses. We print a make-ready sheet and hold it to the swatch.',
    art: 'platen-press-brayer',
    alt: 'An ink brayer',
  },
  {
    no: 'IV',
    title: 'Print',
    time: 'Week 2',
    body: 'One sheet at a time, one color per pass, fed by hand. A 250-card job in two colors is about five hundred pulls of the handle.',
    art: 'platen-press-press',
    alt: 'The platen press',
  },
  {
    no: 'V',
    title: 'Trim and pack',
    time: 'Week 3',
    body: 'Cut on a guillotine, edges painted if you asked, wrapped in glassine. Collect from the studio or we post it insured.',
  },
];

const HOURS = [
  ['Tuesday to Friday', '10 to 5'],
  ['Saturday', 'By appointment'],
  ['Open studio', 'First Saturday, 11 to 3'],
];

export default function PlatenPressPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;1,6..96,400&family=Courier+Prime:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Platen Press</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span className={s.barMeta}>Letterpress, est. 2009</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------ PLATE I
            The press as the hero plate, printed twice through its mask,
            once in red and once in black, a hair out of register. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.plate}>
            <span className={s.plateNo}>Plate I</span>
            <div className={s.plateImage}>
              <Artwork
                slug="platen-press-press"
                alt=""
                inks={['var(--red)']}
                className={s.pressRed}
              />
              <Artwork
                slug="platen-press-press"
                alt="An engraving of a small tabletop letterpress printing machine"
                inks={['var(--ink)']}
                className={s.pressInk}
              />
            </div>
            <p className={s.plateCaption}>The press. An 8 x 12 in platen, cast in 1911 and still printing four days a week.</p>
          </div>

          <div className={s.heroText}>
            <p className={s.kicker}>Letterpress print studio, Foundry Lane</p>
            <h1 className={s.title} id="hero-h">
              Pressed by hand,
              <br />
              <em>one sheet at a time.</em>
            </h1>
            <p className={s.lede}>
              Business cards, invitations and stationery set by hand, inked
              by hand and pulled one at a time on an iron press. You can
              feel every letter with your thumb, which is the point.
            </p>
            <dl className={s.specs}>
              {SPECS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className={s.actions}>
              <a className={s.btnInk} href="#order">Ask for a quote</a>
              <a className={s.btnLine} href="#papers">See the papers</a>
            </div>
          </div>
        </section>

        {/* The make-ready sheet: the primary pattern edge to edge, the two
            plates of a job run over each other to check the register. */}
        <div className={s.makeready} aria-hidden="true">
          <div className={s.makereadyField} aria-hidden="true">
            <TabbiedPattern
              pattern={misprint}
              palette={REGISTER}
              fit="grid"
              cellSize={46}
              options={{ frequency: 0.9 }}
              redrawInterval={9000}
              seed="platen-makeready"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <span className={s.makereadyLabel}>Make-ready, sheet 1 of 3</span>
        </div>

        {/* ------------------------------------------------------ PAPERS
            A swatch book: each stock drawn in its own color with its
            weight, and a blind impression of the nib on it. */}
        <section id="papers" className={s.sec} aria-labelledby="papers-h">
          <div className={s.secHead}>
            <span className={s.secNo}>Sheet II</span>
            <h2 className={s.secTitle} id="papers-h">Eight papers</h2>
            <p className={s.secNote}>
              Weights in grams per square meter. The heavier the sheet, the
              deeper the letters can go. Ask and we will post you the swatch
              book for free.
            </p>
          </div>
          <ul className={s.papers}>
            {PAPERS.map((p) => (
              <li key={p.no} className={`${s.paper} ${s[`tone_${p.tone}`]}`}>
                <div className={s.swatch}>
                  <span className={s.swatchNo}>{p.no}</span>
                  <Artwork
                    slug="platen-press-nib"
                    alt=""
                    inks={[
                      p.tone === 'coal' || p.tone === 'red'
                        ? 'color-mix(in srgb, var(--paper) 30%, transparent)'
                        : 'color-mix(in srgb, var(--ink) 18%, transparent)',
                    ]}
                    className={s.swatchNib}
                  />
                  <span className={s.swatchWeight}>{p.weight}</span>
                  <span className={s.swatchUnit}>gsm</span>
                </div>
                <div className={s.label}>
                  <h3 className={s.paperName}>{p.name}</h3>
                  <span className={s.paperStock}>{p.stock}</span>
                  <dl className={s.paperFacts}>
                    <div>
                      <dt>Thickness</dt>
                      <dd>{p.thick}</dd>
                    </div>
                    <div>
                      <dt>Best for</dt>
                      <dd>{p.best}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.pricesHead}>
            <div className={s.secHead}>
              <span className={s.secNo}>Sheet III</span>
              <h2 className={s.secTitle} id="prices-h">Sizes and prices</h2>
              <p className={s.secNote}>
                Prices include plates, one ink color unless noted, any paper
                from the book, trimming and a proof. Tax and postage are extra.
              </p>
            </div>
            <div className={s.tintField} aria-hidden="true">
              <TabbiedPattern
                pattern={halftone}
                palette={TINT}
                fit="grid"
                cellSize={26}
                seed="platen-tint"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <caption className={s.caption}>Prices by quantity, per job</caption>
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Size</th>
                  <th scope="col">Colors</th>
                  <th scope="col" className={s.num}>100</th>
                  <th scope="col" className={s.num}>250</th>
                  <th scope="col" className={s.num}>500</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map((r) => (
                  <tr key={`${r.item}-${r.colors}`}>
                    <th scope="row">{r.item}</th>
                    <td>{r.size}</td>
                    <td>{r.colors}</td>
                    <td className={s.num}>{r.p100}</td>
                    <td className={s.num}>{r.p250}</td>
                    <td className={s.num}>{r.p500}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className={s.extras}>
            {EXTRAS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------- PROCESS */}
        <section id="process" className={s.process} aria-labelledby="process-h">
          <div className={s.processInner}>
            <div className={s.secHead}>
              <span className={s.secNo}>Sheet IV</span>
              <h2 className={s.secTitle} id="process-h">From proof to parcel</h2>
              <p className={s.secNote}>
                Three weeks from the approved proof for most jobs. Wedding
                work is best booked two months ahead.
              </p>
            </div>
            <ol className={s.steps}>
              {STEPS.map((st) => (
                <li key={st.no} className={s.step}>
                  <span className={s.stepNo}>{st.no}</span>
                  <div className={s.stepArt}>
                    {st.art ? (
                      <Artwork slug={st.art} alt={st.alt ?? ''} inks={['var(--ink)']} className={s.stepPic} />
                    ) : (
                      <span className={s.stepRule} aria-hidden="true" />
                    )}
                  </div>
                  <h3 className={s.stepTitle}>{st.title}</h3>
                  <span className={s.stepTime}>{st.time}</span>
                  <p className={s.stepBody}>{st.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- ORDER */}
        <section id="order" className={s.sec} aria-labelledby="order-h">
          <div className={s.order}>
            <div className={s.orderSide}>
              <span className={s.secNo}>Sheet V</span>
              <h2 className={s.secTitle} id="order-h">Ask for a quote</h2>
              <p className={s.secNote}>
                Tell us what it is, how many and when you need it. We reply
                within one working day with a price and the first free slot
                on the press.
              </p>
              <div className={s.proofBox}>
                <div className={s.proofField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={misprint}
                    palette={PROOF}
                    fit="grid"
                    cellSize={40}
                    options={{ frequency: 0.6 }}
                    redrawInterval={8000}
                    seed="platen-proof"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork slug="platen-press-brayer" alt="" inks={['var(--ink)']} className={s.orderBrayer} />
              </div>
            </div>
            <form className={s.form} action="#">
              <div className={s.formRow}>
                <label className={s.field}>
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className={s.field}>
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
              </div>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span>What to print</span>
                  <select name="item" defaultValue="cards">
                    <option value="cards">Business cards</option>
                    <option value="notes">Flat notes</option>
                    <option value="letterhead">Letterhead</option>
                    <option value="coasters">Coasters</option>
                    <option value="invitation">Wedding invitation</option>
                    <option value="suite">Invitation suite</option>
                    <option value="other">Something else</option>
                  </select>
                </label>
                <label className={s.field}>
                  <span>How many</span>
                  <select name="quantity" defaultValue="250">
                    <option value="100">100</option>
                    <option value="250">250</option>
                    <option value="500">500</option>
                    <option value="more">More than 500</option>
                  </select>
                </label>
              </div>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span>Paper</span>
                  <select name="paper" defaultValue="A">
                    {PAPERS.map((p) => (
                      <option key={p.no} value={p.no}>{`${p.no}. ${p.name}, ${p.weight} gsm`}</option>
                    ))}
                  </select>
                </label>
                <label className={s.field}>
                  <span>Ink colors</span>
                  <select name="colors" defaultValue="1">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </label>
              </div>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span>Needed by</span>
                  <input type="date" name="due" />
                </label>
                <label className={s.field}>
                  <span>Link to your file</span>
                  <input type="url" name="file" placeholder="https://" />
                </label>
              </div>
              <label className={s.field}>
                <span>The words, or anything else</span>
                <textarea name="notes" rows={4} placeholder="Name, title, phone, email. Red name, black the rest." />
              </label>
              <button className={s.submit} type="submit">Send for a quote</button>
              <small className={s.formNote}>No deposit until you approve the proof.</small>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------ STUDIO */}
        <section id="studio" className={s.studio} aria-labelledby="studio-h">
          <div className={s.studioInner}>
            <div className={s.studioArt}>
              <Artwork slug="platen-press-nib" alt="" inks={['var(--red)']} className={s.studioNib} />
            </div>
            <div className={s.studioText}>
              <span className={s.secNo}>Sheet VI</span>
              <h2 className={s.secTitle} id="studio-h">The studio</h2>
              <p className={s.studioAddr}>7 Foundry Lane, the yard behind the ironworks</p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.studioNote}>
                On the first Saturday of the month the press runs with the door
                open. Come and pull a sheet yourself; children are welcome with
                a grown-up hand on the handle.
              </p>
              <ul className={s.contact}>
                <li>
                  <a href="tel:+15550197720">(555) 019-7720</a>
                </li>
                <li>
                  <a href="mailto:press@platenpress.example">press@platenpress.example</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p className={s.footName}>Platen Press</p>
          <p className={s.footTag}>Letterpress printers, 7 Foundry Lane.</p>
        </div>
        <div className={s.footFine}>
          <p>A fictional letterpress studio. Papers, prices and hours are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live in the studio's own inks.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
