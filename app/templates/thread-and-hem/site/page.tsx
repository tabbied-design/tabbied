import { TabbiedPattern } from 'tabbied/react';
import { baste, batiste } from 'tabbied/patterns';
import s from './thread-and-hem.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Thread & Hem: Clothing and alterations, Mercer Lane',
  description:
    'Thread & Hem is a small clothing shop with a workroom behind it. The autumn and winter lookbook, prices, sizes, alterations while you wait, and when to visit.',
};

/* Site colors, for the pattern fields. Stitches and weave sit on the
   page's own grounds, so each palette opens with `transparent`. */
const UMBER = '#8C6A4F';
const GRAY = '#9A938A';
const PALE = '#E7DFD4';
const PAPER = '#F6F2EC';
const INK = '#1C1917';

const TACKING = ['transparent', PALE, PAPER, GRAY, PALE];
const SEAM = ['transparent', UMBER, GRAY, UMBER, INK];
const WEAVE = ['transparent', UMBER, GRAY, PALE, UMBER, GRAY];
const CLOTH = ['transparent', UMBER, GRAY, UMBER, PALE, UMBER];
const HEM = ['transparent', UMBER, GRAY, PALE, UMBER];

const NAV = [
  ['Lookbook', '#lookbook'],
  ['Sizes', '#sizes'],
  ['Alterations', '#alterations'],
  ['Visit', '#visit'],
];

/* The lookbook: three chapters. In each, the picture holds still on the
   left while its pieces pass on the right. */
const LOOKS = [
  {
    id: 'outerwear',
    no: 'Look 01',
    title: 'Outerwear',
    art: 'thread-and-hem-coat',
    alt: 'The Ashby overcoat on a wooden hanger',
    inks: ['var(--ink)', 'var(--paper)'],
    panel: 'panelPale',
    fit: 'fitTall',
    intro: 'Coats cut long and a little wide in the shoulder, so they go over a jacket without a fight.',
    pieces: [
      {
        name: 'Ashby overcoat',
        fabric: 'Wool and cashmere, 80/20, from a mill in the Borders',
        price: '$680',
        sizes: 'XS-XL',
        chip: 'chipGray',
        color: 'Heather gray',
        note: 'Fully lined in cupro, horn buttons, a pocket inside for a phone and one for a paperback.',
      },
      {
        name: 'Ashby short coat',
        fabric: 'The same cloth, cut to the hip',
        price: '$520',
        sizes: 'XS-XL',
        chip: 'chipInk',
        color: 'Charcoal',
        note: 'For people who cycle. The back vent opens a hand further than the long one.',
      },
      {
        name: 'Fold scarf',
        fabric: 'Lambswool, woven in a twill',
        price: '$95',
        sizes: 'One size',
        chip: 'chipUmber',
        color: 'Tobacco',
        note: 'Long enough to wrap twice, finished with a hand-rolled edge rather than a fringe.',
      },
    ],
  },
  {
    id: 'tailoring',
    no: 'Look 02',
    title: 'Tailoring',
    art: 'thread-and-hem-model',
    alt: 'A woman in the Marlow blazer, three-quarter length',
    inks: ['var(--ink)', 'var(--pale)'],
    panel: 'panelGray',
    fit: 'fitFigure',
    intro: 'A jacket and trouser that are sold apart, because nobody is the same size top and bottom.',
    pieces: [
      {
        name: 'Marlow blazer',
        fabric: 'Wool flannel, 340 g, half-canvassed',
        price: '$420',
        sizes: '2-16',
        chip: 'chipInk',
        color: 'Charcoal',
        note: 'Single-breasted, one button, sleeves with working cuffs so we can shorten them from the shoulder.',
      },
      {
        name: 'Marlow trouser',
        fabric: 'The same flannel, unlined',
        price: '$240',
        sizes: '2-16',
        chip: 'chipInk',
        color: 'Charcoal',
        note: 'High in the rise, a straight leg, left long on purpose. The hem is free, today or next week.',
      },
      {
        name: 'Silk shell',
        fabric: 'Sand-washed silk crepe',
        price: '$150',
        sizes: 'XS-XL',
        chip: 'chipPale',
        color: 'Oat',
        note: 'Cut on the bias, so it falls rather than clings. Washes by hand in cool water.',
      },
      {
        name: 'Rib turtleneck',
        fabric: 'Merino, 2 x 2 rib',
        price: '$135',
        sizes: 'XS-XL',
        chip: 'chipUmber',
        color: 'Tobacco',
        note: 'Fine enough to go under the blazer, warm enough to wear on its own in October.',
      },
    ],
  },
  {
    id: 'shoes',
    no: 'Look 03',
    title: 'Shoes',
    art: 'thread-and-hem-boots',
    alt: 'A pair of leather ankle boots with a block heel',
    inks: ['var(--ink)', 'var(--pale)'],
    panel: 'panelUmber',
    fit: 'fitWide',
    intro: 'Made for us in a family workshop that has resoled everything it has ever sold.',
    pieces: [
      {
        name: 'Cleo ankle boot',
        fabric: 'Calf leather, leather sole, 5 cm heel',
        price: '$340',
        sizes: '36-42',
        chip: 'chipInk',
        color: 'Black',
        note: 'Goodyear-welted, so it can be resoled. The first resole is on us, whenever it comes.',
      },
      {
        name: 'Cleo in suede',
        fabric: 'Water-resistant suede, rubber sole',
        price: '$360',
        sizes: '36-42',
        chip: 'chipUmber',
        color: 'Chestnut',
        note: 'The same last with a grippier sole, for a winter that means it.',
      },
      {
        name: 'Care kit',
        fabric: 'Wax, brush and cloth',
        price: '$28',
        sizes: 'For either boot',
        chip: 'chipGray',
        color: 'Natural',
        note: 'Everything the boots need twice a year, in a tin that fits a coat pocket.',
      },
    ],
  },
];

const SIZES = [
  ['XS', '2-4', '32', '25', '35'],
  ['S', '6-8', '34', '27', '37'],
  ['M', '10-12', '36', '29', '39'],
  ['L', '14', '38', '31', '41'],
  ['XL', '16', '40', '33', '43'],
];

const ALTERATIONS = [
  ['Hem trousers or jeans', '$18', 'While you wait'],
  ['Shorten sleeves, from the cuff', '$30', 'Two days'],
  ['Shorten sleeves, from the shoulder', '$85', 'One week'],
  ['Take in or let out a waist', '$28', 'Two days'],
  ['Replace a zip', '$32', 'Two days'],
  ['Re-line a coat', '$140', 'Two weeks'],
];

const HOURS = [
  ['Tuesday to Friday', '10 to 6'],
  ['Saturday', '10 to 5'],
  ['Sunday', '12 to 4'],
  ['Monday', 'Workroom only'],
];

export default function ThreadAndHemPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f6f2ec',
        '--ink': '#1c1917',
        '--umber': '#8c6a4f',
        '--gray': '#9a938a',
        '--pale': '#e7dfd4',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,umber,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gilda+Display&family=Work+Sans:wght@300..600&display=swap"
      />

      <header className={s.bar}>
        <span data-edit="bar.season" data-edit-max="60" className={s.season}>Autumn and winter, 2026</span>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Thread &amp; Hem</a>
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
        {/* ----------------------------------------------------------- PLATE
            The opening plate: the name set huge, the model in front of it,
            tacking stitches loose in the ground behind both. */}
        <section className={s.plate} aria-labelledby="plate-h">
          <div className={s.stage}>
            <div data-edit-pattern="plate.field" data-edit-roles="transparent,4,0,3,4" className={s.plateField} aria-hidden="true">
              <TabbiedPattern
                pattern={baste}
                palette={TACKING}
                options={{ frequency: 0.45 }}
                fit="grid"
                cellSize={84}
                seed="hem-plate"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="plate.body" data-edit-max="240" data-edit-multiline className={s.masthead} aria-hidden="true">Thread &amp; Hem</p>
            <Artwork
              slug="thread-and-hem-model"
              alt="A woman in a tailored charcoal blazer"
              inks={['var(--ink)', 'var(--pale)']}
              className={s.model}
            />
            <p data-edit="plate.plateCaption" data-edit-max="240" data-edit-multiline className={s.plateCaption}>Look 02: the Marlow blazer in charcoal flannel, $420</p>
          </div>
          <div className={s.plateText}>
            <p data-edit="plate.plateKicker" data-edit-max="240" data-edit-multiline className={s.plateKicker}>38 Mercer Lane, with a workroom at the back</p>
            <h1 data-edit="plate.title" data-edit-format="emphasis" data-edit-max="70" id="plate-h" className={s.title}>
              Clothes cut to be <em>kept.</em>
            </h1>
            <a data-edit="plate.plateLink" data-edit-max="28" className={s.plateLink} href="#lookbook">See the lookbook</a>
          </div>
        </section>

        {/* -------------------------------------------------------- LOOKBOOK */}
        <section id="lookbook" className={s.lookbook} aria-labelledby="lookbook-h">
          <div className={s.lookHead}>
            <h2 data-edit="lookbook.secTitle" data-edit-max="60" id="lookbook-h" className={s.secTitle}>The lookbook</h2>
            <p data-edit="lookbook.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Ten pieces this season, each made in small runs and each
              altered here, free, to fit you before it leaves the shop.
            </p>
            <div data-edit-pattern="lookbook.field" data-edit-roles="transparent,2,3,2,4,2" className={s.cutting} aria-hidden="true">
              <TabbiedPattern
                pattern={batiste}
                palette={CLOTH}
                options={{ frequency: 0.9 }}
                fit="grid"
                cellSize={32}
                seed="hem-cutting"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>

          {LOOKS.map((look, i) => (
            <article key={look.id} id={look.id} className={s.look} aria-labelledby={`${look.id}-h`}>
              <div className={`${s.stick} ${s[look.panel]}`}>
                <Artwork slug={look.art} alt={look.alt} inks={look.inks} className={`${s.lookArt} ${s[look.fit]}`} />
                <p data-edit={`look.lookNo.${i}`} data-edit-max="240" data-edit-multiline className={s.lookNo}>{look.no}</p>
              </div>
              <div className={s.pieces}>
                <div className={s.lookIntro}>
                  <h3 data-edit={`look.lookTitle.${i}`} data-edit-max="40" id={`${look.id}-h`} className={s.lookTitle}>{look.title}</h3>
                  <p data-edit={`look.lookLede.${i}`} data-edit-max="240" data-edit-multiline className={s.lookLede}>{look.intro}</p>
                </div>
                <ol className={s.pieceList}>
                  {look.pieces.map((p, i2) => (
                    <li key={p.name} className={s.piece}>
                      <div className={s.pieceTop}>
                        <h4 data-edit={`look.pieceName.${i}.${i2}`} data-edit-max="36" className={s.pieceName}>{p.name}</h4>
                        <p data-edit={`look.piecePrice.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.piecePrice}>{p.price}</p>
                      </div>
                      <p data-edit={`look.pieceFabric.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.pieceFabric}>{p.fabric}</p>
                      <dl className={s.pieceFacts}>
                        <div>
                          <dt data-edit={`look.term.${i}.${i2}`} data-edit-max="28">Color</dt>
                          <dd>
                            <span className={`${s.chip} ${s[p.chip]}`} aria-hidden="true" />
                            <span data-edit={`look.text.${i}.${i2}`} data-edit-max="60">{p.color}</span>
                          </dd>
                        </div>
                        <div>
                          <dt data-edit={`look.term2.${i}.${i2}`} data-edit-max="28">Sizes</dt>
                          <dd data-edit={`look.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{p.sizes}</dd>
                        </div>
                      </dl>
                      <p data-edit={`look.pieceNote.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.pieceNote}>{p.note}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </section>

        {/* A seam between the lookbook and the practical half of the page. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,2,1" className={s.seam} aria-hidden="true">
          <TabbiedPattern
            pattern={baste}
            palette={SEAM}
            options={{ frequency: 0.8 }}
            fit="grid"
            cellSize={44}
            seed="hem-seam"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- SIZES */}
        <section id="sizes" className={s.sec} aria-labelledby="sizes-h">
          <div className={s.secHead}>
            <p data-edit="sizes.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Sizes</p>
            <h2 data-edit="sizes.secTitle" data-edit-max="60" id="sizes-h" className={s.secTitle}>Measured on the body, in inches</h2>
            <p data-edit="sizes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Between two sizes? Take the larger. Everything here can be taken
              in for free in the first month, and nothing can be let out forever.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.sizeTable}>
              <caption data-edit="sizes.caption" className={s.caption}>Women&apos;s sizes, body measurements</caption>
              <thead>
                <tr>
                  <th data-edit="sizes.heading" scope="col">Size</th>
                  <th data-edit="sizes.heading2" scope="col">US</th>
                  <th data-edit="sizes.heading3" scope="col">Bust</th>
                  <th data-edit="sizes.heading4" scope="col">Waist</th>
                  <th data-edit="sizes.heading5" scope="col">Hip</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map(([size, us, bust, waist, hip], i) => (
                  <tr key={size}>
                    <th data-edit={`sizes.heading6.${i}`} scope="row">{size}</th>
                    <td data-edit={`sizes.cell.${i}`}>{us}</td>
                    <td data-edit={`sizes.cell2.${i}`}>{bust}</td>
                    <td data-edit={`sizes.cell3.${i}`}>{waist}</td>
                    <td data-edit={`sizes.cell4.${i}`}>{hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ----------------------------------------------------- ALTERATIONS */}
        <section id="alterations" className={s.sec} aria-labelledby="alterations-h">
          <div className={s.alter}>
            <div data-edit-pattern="alterations.field" data-edit-roles="transparent,2,3,4,2,3" className={s.swatch} aria-hidden="true">
              <TabbiedPattern
                pattern={batiste}
                palette={WEAVE}
                options={{ frequency: 0.8 }}
                fit="grid"
                cellSize={40}
                seed="hem-weave"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.alterText}>
              <p data-edit="alterations.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The workroom</p>
              <h2 data-edit="alterations.secTitle" data-edit-max="60" id="alterations-h" className={s.secTitle}>Alterations, on anything you own</h2>
              <p data-edit="alterations.body" data-edit-max="240" data-edit-multiline className={s.body}>
                Priya and Hal have been sewing behind the shop since it opened.
                Anything bought here is altered free for as long as you have it;
                anything else is welcome at these prices.
              </p>
              <ul className={s.alterList}>
                {ALTERATIONS.map(([job, price, time], i) => (
                  <li key={job}>
                    <span data-edit={`alterations.alterJob.${i}`} data-edit-max="60" className={s.alterJob}>{job}</span>
                    <span data-edit={`alterations.alterTime.${i}`} data-edit-max="60" className={s.alterTime}>{time}</span>
                    <span data-edit={`alterations.alterPrice.${i}`} data-edit-max="60" className={s.alterPrice}>{price}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="alterations.fine" data-edit-max="240" data-edit-multiline className={s.fine}>
                Pinning takes ten minutes and needs you, and the shoes you will
                wear with it. Hems while you wait: Tuesday to Saturday, before 4.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInner}>
            <div className={s.visitText}>
              <p data-edit="visit.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Visit</p>
              <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>38 Mercer Lane</h2>
              <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.body}>
                Between the bookshop and the bakery, with the green awning. Two
                fitting rooms, one long mirror, and a chair for whoever came with
                you.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contactLine}>
                <span data-edit="visit.text" data-edit-max="60">(555) 016-3380</span>
                <a data-edit="visit.link" data-edit-max="28" href="mailto:shop@threadandhem.example">shop@threadandhem.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <div data-edit-pattern="visit.field" data-edit-roles="transparent,2,3,2,1" className={s.formStitch} aria-hidden="true">
                <TabbiedPattern
                  pattern={baste}
                  palette={SEAM}
                  options={{ frequency: 0.7 }}
                  fit="grid"
                  cellSize={32}
                  seed="hem-fitting"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="visit.formTitle" data-edit-max="40" className={s.formTitle}>Book a fitting</h3>
              <p data-edit="visit.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>
                An hour with the shop to yourself, before or after hours. There
                is no charge and nothing to buy.
              </p>
              <p className={s.field}>
                <label data-edit="visit.label" htmlFor="th-name">Name</label>
                <input id="th-name" name="name" type="text" autoComplete="name" />
              </p>
              <p className={s.field}>
                <label data-edit="visit.label2" htmlFor="th-email">Email</label>
                <input id="th-email" name="email" type="email" autoComplete="email" />
              </p>
              <p className={s.field}>
                <label data-edit="visit.label3" htmlFor="th-for">For</label>
                <select id="th-for" name="for" defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Trying on the lookbook</option>
                  <option>A pinning for alterations</option>
                  <option>Something for an occasion</option>
                </select>
              </p>
              <p className={s.field}>
                <label data-edit="visit.label4" htmlFor="th-when">When suits you</label>
                <input id="th-when" name="when" type="text" placeholder="A weekday morning, a Sunday" />
              </p>
              <button data-edit="visit.submit" data-edit-max="24" type="submit" className={s.submit}>Ask for a time</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,2" className={s.footHem} aria-hidden="true">
          <TabbiedPattern
            pattern={baste}
            palette={HEM}
            options={{ frequency: 0.85 }}
            fit="grid"
            cellSize={36}
            seed="hem-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p data-edit="footer.footMark" data-edit-max="240" data-edit-multiline className={s.footMark}>Thread &amp; Hem</p>
        <ul className={s.footLinks}>
          {NAV.map(([label, href], i) => (
            <li key={href}>
              <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <p data-edit="footer.footAddr" data-edit-max="240" data-edit-multiline className={s.footAddr}>38 Mercer Lane. (555) 016-3380. shop@threadandhem.example</p>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional clothing shop. Pieces, prices and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
