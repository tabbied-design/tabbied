import { TabbiedPattern } from 'tabbied/react';
import { selbustar } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './hjem-knitwear.module.css';

export const metadata = {
  title: 'Hjem Knitwear: Stranded colourwork patterns, yarn kits and workshops',
  description:
    'Hjem is a one-woman knitwear studio. Charted colourwork patterns for sweaters, mittens and hats, yarn kits in the colours of the sample, small workshops in the studio, and a call for test knitters.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The selbustar
   is the house star: eight petals of slanted stitches, the motif every Hjem
   yoke starts from. It is the chart in the hero, the yoke band that runs
   across the page before the workshops, and the hem of the footer. */
const WOOL = '#f3eee4';
const FJORD = '#1f2b45';
const BERRY = '#b3313b';
const OAT = '#d9c49b';
const MOSS = '#5e7150';

const CHART = ['transparent', FJORD, BERRY, MOSS];
const YOKE = ['transparent', WOOL, BERRY, OAT];
const HEM = ['transparent', OAT, WOOL, BERRY];

const NAV = [
  ['Patterns', '#patterns'],
  ['Yarn kits', '#kits'],
  ['Workshops', '#workshops'],
  ['Test knit', '#test-knit'],
  ['Studio', '#studio'],
];

const COLUMNS = ['1', '5', '10', '15', '20', '25'];
const ROWS = ['30', '25', '20', '15', '10', '5', '1'];

type Pattern = { name: string; kind: string; level: number; levelText: string; yarn: string; sizes: string; price: string };

const PATTERNS: Pattern[] = [
  { name: 'Fjellstjerne', kind: 'Round-yoke pullover', level: 4, levelText: 'Confident', yarn: 'Fingering, 1,200-1,900 yds', sizes: 'XS to 4XL, 13 sizes', price: '$11' },
  { name: 'Vinterhage', kind: 'Steeked cardigan', level: 5, levelText: 'Adventurous', yarn: 'Sport, 1,400-2,100 yds', sizes: 'XS to 3XL, 10 sizes', price: '$12' },
  { name: 'Selje', kind: 'Mittens with a thumb gusset', level: 3, levelText: 'Some colourwork', yarn: 'Fingering, 260 yds', sizes: 'Child, woman, man', price: '$6' },
  { name: 'Kveld', kind: 'Hat with a folded brim', level: 2, levelText: 'First colourwork', yarn: 'DK, 220 yds', sizes: '3 head sizes', price: '$5' },
  { name: 'Rosebund', kind: 'Knee socks, top down', level: 3, levelText: 'Some colourwork', yarn: 'Fingering, 420 yds', sizes: '4 foot sizes', price: '$7' },
  { name: 'Lill', kind: 'Baby yoke and bonnet', level: 2, levelText: 'First colourwork', yarn: 'Sport, 300-520 yds', sizes: '0-3 months to 4 years', price: '$7' },
];

const STITCHES = ['s1', 's2', 's3', 's4', 's5'];

type Kit = { name: string; yarn: string; colors: string[]; skeins: string; price: string };

const KITS: Kit[] = [
  { name: 'Fjellstjerne, as photographed', yarn: 'Highland wool, fingering', colors: ['fjord', 'wool', 'berry'], skeins: '6-10 skeins', price: 'from $96' },
  { name: 'Vinterhage, moss and oat', yarn: 'Highland wool, sport', colors: ['moss', 'oat', 'fjord'], skeins: '8-12 skeins', price: 'from $124' },
  { name: 'Selje mittens', yarn: 'Highland wool, fingering', colors: ['berry', 'wool'], skeins: '2 skeins', price: '$28' },
  { name: 'Kveld hat, three colours', yarn: 'Merino and alpaca, DK', colors: ['fjord', 'oat', 'berry'], skeins: '3 mini skeins', price: '$34' },
];

type Workshop = { date: string; title: string; body: string; length: string; seats: string; price: string };

const WORKSHOPS: Workshop[] = [
  { date: 'Sat Feb 7', title: 'Two colours, two hands', body: 'Holding one colour in each hand, catching long floats, and keeping your tension even. You go home with a swatch and a cowl started.', length: '10:00-3:00', seats: '3 seats left', price: '$95' },
  { date: 'Sat Mar 14', title: 'Reading a chart', body: 'Where to start, which way to read, what the empty squares mean, and how to keep your place without a magnetic board.', length: '10:00-1:00', seats: '6 seats left', price: '$60' },
  { date: 'Sun Apr 19', title: 'Cutting a steek', body: 'Reinforce, cut and pick up along a steek on a practice tube. Bring nerve; we bring sharp scissors and tea.', length: '11:00-4:00', seats: 'Full, waiting list', price: '$95' },
  { date: 'Sat May 23', title: 'Fit your yoke', body: 'Measure, choose a size, and adjust the depth of a round yoke before you cast on, not after you bind off.', length: '10:00-3:00', seats: '8 seats left', price: '$95' },
];

const TEST_ASKS = [
  'Knit the sample in your size within six weeks',
  'Note every error, unclear line and missing stitch count',
  'Send a gauge swatch photo before you begin, and the finished piece at the end',
];

const TEST_GETS = [
  'The final pattern free, and every update after it',
  'The yarn for your size at cost',
  'Your name in the pattern credits, if you want it there',
];

const HOURS = [
  ['Wednesday to Friday', '11:00-5:00'],
  ['Saturday', '10:00-4:00'],
  ['Sunday to Tuesday', 'Closed, or workshops'],
];

export default function HjemKnitwearPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--wool': '#f3eee4',
        '--fjord': '#1f2b45',
        '--berry': '#b3313b',
        '--oat': '#d9c49b',
        '--moss': '#5e7150',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="wool,fjord,berry,oat,moss"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Figtree:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Hjem</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Knitwear</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#patterns">Shop patterns</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Stranded colourwork, designed and charted in a small studio</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Knit the star, <em>one square at a time.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Hjem patterns are for knitters who like a chart they can trust:
              every size graded, every row counted, every chart printed large
              enough to read on the bus. Kits come in the colours of the sample,
              or in yours.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#patterns">Browse the patterns</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#test-knit">Become a test knitter</a>
            </div>
          </div>

          <figure className={s.chart}>
            <div className={s.chartGrid}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,4" className={s.chartField} aria-hidden="true">
                <TabbiedPattern
                  pattern={selbustar}
                  palette={CHART}
                  fit="grid"
                  cellSize={58}
                  seed="hjem-chart"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ol className={s.rowNos} aria-hidden="true">
                {ROWS.map((row, i) => (
                  <li data-edit={`hero.item.${i}`} data-edit-max="80" key={row}>{row}</li>
                ))}
              </ol>
              <ol className={s.colNos} aria-hidden="true">
                {COLUMNS.map((col, i) => (
                  <li data-edit={`hero.item2.${i}`} data-edit-max="80" key={col}>{col}</li>
                ))}
              </ol>
            </div>
            <figcaption className={s.key}>
              <span data-edit="hero.keyTitle" data-edit-max="60" className={s.keyTitle}>Chart A, the Hjem star</span>
              <span data-edit="hero.keyItem" data-edit-max="60" className={`${s.keyItem} ${s.keyFjord}`}>Fjord</span>
              <span data-edit="hero.keyItem2" data-edit-max="60" className={`${s.keyItem} ${s.keyBerry}`}>Lingonberry</span>
              <span data-edit="hero.keyItem3" data-edit-max="60" className={`${s.keyItem} ${s.keyMoss}`}>Moss</span>
              <span data-edit="hero.keyNote" data-edit-max="60" className={s.keyNote}>17-stitch repeat, read right to left</span>
            </figcaption>
          </figure>
        </section>

        <section id="patterns" className={s.sec} aria-labelledby="patterns-h">
          <div className={s.secHead}>
            <span data-edit="patterns.text" data-edit-max="60" className={s.secLetter} aria-hidden="true">B</span>
            <h2 data-edit="patterns.secTitle" data-edit-max="60" id="patterns-h" className={s.secTitle}>Patterns</h2>
            <p data-edit="patterns.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              PDF download, charted and written, with a schematic for every size.
              Bought once, yours for good, including corrections.
            </p>
          </div>
          <ul className={s.patterns}>
            {PATTERNS.map((p, i) => (
              <li key={p.name} className={s.pattern}>
                <div className={s.patternTop}>
                  <h3 data-edit={`patterns.patternName.${i}`} data-edit-max="40" className={s.patternName}>{p.name}</h3>
                  <p data-edit={`patterns.patternPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.patternPrice}>{p.price}</p>
                </div>
                <p data-edit={`patterns.patternKind.${i}`} data-edit-max="240" data-edit-multiline className={s.patternKind}>{p.kind}</p>
                <div className={s.level}>
                  <span className={s.stitches} aria-hidden="true">
                    {STITCHES.map((st, i) => (
                      <span key={st} className={i < p.level ? s.stitchOn : s.stitchOff} />
                    ))}
                  </span>
                  <span data-edit={`patterns.levelText.${i}`} data-edit-max="60" className={s.levelText}>{p.levelText}</span>
                </div>
                <dl className={s.patternFacts}>
                  <div>
                    <dt data-edit={`patterns.term.${i}`} data-edit-max="28">Yarn</dt>
                    <dd data-edit={`patterns.body.${i}`} data-edit-max="200" data-edit-multiline>{p.yarn}</dd>
                  </div>
                  <div>
                    <dt data-edit={`patterns.term2.${i}`} data-edit-max="28">Sizes</dt>
                    <dd data-edit={`patterns.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.sizes}</dd>
                  </div>
                </dl>
                <a data-edit={`patterns.patternBuy.${i}`} data-edit-max="28" className={s.patternBuy} href="#studio">Buy the PDF</a>
              </li>
            ))}
          </ul>
        </section>

        <section id="kits" className={s.sec} aria-labelledby="kits-h">
          <div className={s.secHead}>
            <span data-edit="kits.text" data-edit-max="60" className={s.secLetter} aria-hidden="true">C</span>
            <h2 data-edit="kits.secTitle" data-edit-max="60" id="kits-h" className={s.secTitle}>Yarn kits</h2>
            <p data-edit="kits.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Wool from a small spinner, dyed in batches, packed by hand with the
              printed pattern. Any kit can be made up in other colours: write to
              us with three you love.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.kits}>
              <caption data-edit="kits.srOnly" className={s.srOnly}>Yarn kits and prices</caption>
              <thead>
                <tr>
                  <th data-edit="kits.heading" scope="col">Kit</th>
                  <th data-edit="kits.heading2" scope="col">Yarn</th>
                  <th data-edit="kits.heading3" scope="col">Colours</th>
                  <th data-edit="kits.heading4" scope="col">Amount</th>
                  <th data-edit="kits.heading5" scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {KITS.map((kit, i) => (
                  <tr key={kit.name}>
                    <th data-edit={`kits.heading6.${i}`} scope="row">{kit.name}</th>
                    <td data-edit={`kits.cell.${i}`}>{kit.yarn}</td>
                    <td>
                      <span className={s.skeins} aria-hidden="true">
                        {kit.colors.map((c) => (
                          <span key={c} className={`${s.skein} ${s[`skein_${c}`]}`} />
                        ))}
                      </span>
                    </td>
                    <td data-edit={`kits.cell2.${i}`}>{kit.skeins}</td>
                    <td data-edit={`kits.kitPrice.${i}`} className={s.kitPrice}>{kit.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-edit="kits.tableNote" data-edit-max="240" data-edit-multiline className={s.tableNote}>Kits ship in two working days. Postage is $6 in the country and free over $120.</p>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,0,2,3" className={s.yoke} aria-hidden="true">
          <TabbiedPattern
            pattern={selbustar}
            palette={YOKE}
            fit="grid"
            cellSize={48}
            seed="hjem-yoke"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="workshops" className={s.sec} aria-labelledby="workshops-h">
          <div className={s.secHead}>
            <span data-edit="workshops.text" data-edit-max="60" className={s.secLetter} aria-hidden="true">D</span>
            <h2 data-edit="workshops.secTitle" data-edit-max="60" id="workshops-h" className={s.secTitle}>Workshops in the studio</h2>
            <p data-edit="workshops.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Eight knitters round one long table, coffee and cardamom buns, and
              all the needles and yarn you need for the day.
            </p>
          </div>
          <ol className={s.workshops}>
            {WORKSHOPS.map((w, i) => (
              <li key={w.title} className={s.workshop}>
                <p data-edit={`workshops.wsDate.${i}`} data-edit-max="240" data-edit-multiline className={s.wsDate}>{w.date}</p>
                <div className={s.wsMain}>
                  <h3 data-edit={`workshops.wsTitle.${i}`} data-edit-max="40" className={s.wsTitle}>{w.title}</h3>
                  <p data-edit={`workshops.wsBody.${i}`} data-edit-max="240" data-edit-multiline className={s.wsBody}>{w.body}</p>
                </div>
                <dl className={s.wsFacts}>
                  <div>
                    <dt data-edit={`workshops.term.${i}`} data-edit-max="28">Time</dt>
                    <dd data-edit={`workshops.body.${i}`} data-edit-max="200" data-edit-multiline>{w.length}</dd>
                  </div>
                  <div>
                    <dt data-edit={`workshops.term2.${i}`} data-edit-max="28">Places</dt>
                    <dd data-edit={`workshops.body2.${i}`} data-edit-max="200" data-edit-multiline>{w.seats}</dd>
                  </div>
                  <div>
                    <dt data-edit={`workshops.term3.${i}`} data-edit-max="28">Fee</dt>
                    <dd data-edit={`workshops.body3.${i}`} data-edit-max="200" data-edit-multiline>{w.price}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </section>

        <section id="test-knit" className={s.test} aria-labelledby="test-h">
          <div className={s.testInner}>
            <div className={s.testIntro}>
              <span data-edit="testKnit.text" data-edit-max="60" className={s.secLetter} aria-hidden="true">E</span>
              <h2 data-edit="testKnit.testTitle" data-edit-max="60" id="test-h" className={s.testTitle}>Test knitters wanted</h2>
              <p data-edit="testKnit.testLead" data-edit-max="240" data-edit-multiline className={s.testLead}>
                Every pattern is knitted by a dozen test knitters before it is
                sold. The next call is for Snoeskred, a round yoke for men in
                six colours, sizes 34 to 60 inches.
              </p>
              <div className={s.testLists}>
                <div>
                  <h3 data-edit="testKnit.testListTitle" data-edit-max="40" className={s.testListTitle}>We ask you to</h3>
                  <ul className={s.testList}>
                    {TEST_ASKS.map((item, i) => (
                      <li data-edit={`testKnit.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 data-edit="testKnit.testListTitle2" data-edit-max="40" className={s.testListTitle}>You get</h3>
                  <ul className={s.testList}>
                    {TEST_GETS.map((item, i) => (
                      <li data-edit={`testKnit.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <form className={s.testForm} action="#">
              <h3 data-edit="testKnit.formTitle" data-edit-max="40" className={s.formTitle}>Sign up for the Snoeskred test</h3>
              <div className={s.field}>
                <label data-edit="testKnit.label" htmlFor="hj-name">Name</label>
                <input id="hj-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="testKnit.label2" htmlFor="hj-email">Email</label>
                <input id="hj-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label data-edit="testKnit.label3" htmlFor="hj-size">Size you would knit</label>
                  <select id="hj-size" name="size" defaultValue="40">
                    <option value="34">34 in</option>
                    <option value="38">38 in</option>
                    <option value="40">40 in</option>
                    <option value="44">44 in</option>
                    <option value="48">48 in</option>
                    <option value="52">52 in</option>
                    <option value="56">56 in</option>
                    <option value="60">60 in</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="testKnit.label4" htmlFor="hj-gauge">Your usual gauge</label>
                  <input id="hj-gauge" name="gauge" type="text" placeholder="e.g. 28 sts / 4 in" />
                </div>
              </div>
              <div className={s.field}>
                <label data-edit="testKnit.label5" htmlFor="hj-done">Colourwork you have finished</label>
                <textarea id="hj-done" name="done" rows={3} />
              </div>
              <button data-edit="testKnit.submit" data-edit-max="24" className={s.submit} type="submit">Put my name down</button>
              <p data-edit="testKnit.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Testers are chosen by size, so every size is covered. We reply to everyone by March 1.</p>
            </form>
          </div>
        </section>

        <section id="studio" className={s.sec} aria-labelledby="studio-h">
          <div className={s.studioGrid}>
            <div>
              <div className={s.secHead}>
                <span data-edit="studio.text" data-edit-max="60" className={s.secLetter} aria-hidden="true">F</span>
                <h2 data-edit="studio.secTitle" data-edit-max="60" id="studio-h" className={s.secTitle}>The studio</h2>
              </div>
              <p data-edit="studio.address" data-edit-max="240" data-edit-multiline className={s.address}>Loft 3, the Old Tannery, 9 Sorrel Wharf</p>
              <p data-edit="studio.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Up the iron stairs at the back of the yard. Samples to try on, kits to buy, and a sofa for the person who came with you.</p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`studio.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`studio.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contactLine}>
                <a data-edit="studio.link" data-edit-max="28" href="tel:+15550193318">(555) 019-3318</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="studio.link2" data-edit-max="28" href="mailto:hei@hjemknitwear.example">hei@hjemknitwear.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <h3 data-edit="studio.formTitle" data-edit-max="40" className={s.formTitle}>A question about a pattern or an order</h3>
              <div className={s.field}>
                <label data-edit="studio.label" htmlFor="hj-c-name">Name</label>
                <input id="hj-c-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="studio.label2" htmlFor="hj-c-email">Email</label>
                <input id="hj-c-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="studio.label3" htmlFor="hj-c-note">Your question, with the pattern and size</label>
                <textarea id="hj-c-note" name="note" rows={4} />
              </div>
              <button data-edit="studio.submit" data-edit-max="24" className={s.submit} type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,0,2" className={s.hem} aria-hidden="true">
          <TabbiedPattern
            pattern={selbustar}
            palette={HEM}
            fit="grid"
            cellSize={36}
            seed="hjem-hem"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Hjem Knitwear</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional knitwear designer. The patterns, kits, workshops, prices and address are invented.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
