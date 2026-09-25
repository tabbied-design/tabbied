import { TabbiedPattern } from 'tabbied/react';
import { corduroy, grain, plait, stitch } from 'tabbied/patterns';
import s from './satchel-and-strap.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Satchel & Strap: Leather goods maker, Tanner Street',
  description:
    'Satchel & Strap cuts and hand-stitches bags, wallets and belts from vegetable-tanned leather on Tanner Street. Monograms while you wait, repairs for any maker, and a workshop you can visit on Saturdays.',
};

/* Site colors. Each piece is cut out of a pattern whose first color is
   the leather; the photograph's own shading gives it its creases and its
   buckle. */
const INK = '#1E1612';
const SADDLE = '#A0522D';
const OLIVE = '#4A5D3F';
const GRAY = '#8F857B';
const PALE = '#E6DACB';

const SATCHEL = [SADDLE, INK, PALE];
const TOTE = [OLIVE, PALE, SADDLE];
const WALLET = [GRAY, INK, PALE];
const SEAM = ['transparent', SADDLE, PALE];

const NAV = [
  ['The bench', '#bench'],
  ['Monograms', '#monograms'],
  ['Repairs', '#repairs'],
  ['Workshop', '#workshop'],
  ['Order', '#order'],
];

const SMALL = [
  { name: 'Belt', note: '35 mm, solid brass buckle, cut to your waist', price: '$95' },
  { name: 'Card holder', note: 'Four pockets, saddle-stitched', price: '$55' },
  { name: 'Watch strap', note: '18, 20 or 22 mm lugs, quick-release pins', price: '$70' },
  { name: 'Key fob', note: 'Brass ring, your initials free', price: '$25' },
  { name: 'Dog collar', note: 'Four sizes, a lead to match for $60', price: '$65' },
];

const STAMPS = [
  { style: 'Roman', sample: 'A.R.K', note: 'Serif capitals, blind or foil' },
  { style: 'Block', sample: 'ARK', note: 'Plain capitals, blind or foil' },
  { style: 'Italic', sample: 'ark', note: 'Lowercase, blind only' },
];

const MONO_PRICES = [
  ['Blind deboss, up to three letters', 'Free'],
  ['Gold or silver foil', '$15'],
  ['A painted edge in another color', '$20'],
  ['A short line inside, up to 30 letters', '$25'],
];

const REPAIRS = [
  { what: 'Restitch a seam', price: '$30-$60', time: '1 week' },
  { what: 'New shoulder strap', price: '$85', time: '2 weeks' },
  { what: 'Replace a buckle or clasp', price: '$25', time: 'While you wait' },
  { what: 'Replace a zip', price: '$45', time: '1 week' },
  { what: 'Repaint and burnish edges', price: '$40', time: '1 week' },
  { what: 'Clean and condition', price: '$35', time: '3 days' },
];

const HOURS = [
  ['Tuesday-Friday', '10-6'],
  ['Saturday', '10-4, the bench is open'],
  ['Sunday and Monday', 'Closed'],
];

export default function SatchelAndStrapPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Commissioner:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span>Satchel</span>
          <span className={s.markAmp}>&amp;</span>
          <span>Strap</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span className={s.barMeta}>Tanner Street, since 2014</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The satchel laid on the cutting mat, the wallet beside it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Leather goods maker, 31 Tanner Street</p>
            <h1 id="hero-h" className={s.title}>
              Cut, stitched and burnished <em>by two pairs of hands.</em>
            </h1>
            <p className={s.lede}>
              Bags, wallets and belts in vegetable-tanned leather, sewn with
              waxed linen thread one stitch at a time. They darken with you,
              and when something wears, we mend it.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#bench">See the bench</a>
              <a className={s.textLink} href="#repairs">Bring us a repair</a>
            </div>
          </div>

          <div className={s.mat}>
            <span className={s.matRule} aria-hidden="true" />
            <Artwork slug="satchel-and-strap-satchel" alt="A leather satchel with a buckled flap" mode="fill" inks={[]} className={s.heroSatchel}>
              <TabbiedPattern
                pattern={plait}
                palette={SATCHEL}
                fit="grid"
                cellSize={30}
                seed="satchel-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </Artwork>
            <Artwork slug="satchel-and-strap-wallet" alt="" mode="fill" inks={[]} className={s.heroWallet}>
              <TabbiedPattern
                pattern={grain}
                palette={WALLET}
                fit="grid"
                cellSize={24}
                seed="wallet-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </Artwork>
          </div>
        </section>

        {/* ----------------------------------------------------------- BENCH
            One row per piece: the cut-out on the mat, its drawing with the
            three dimensions, and what it is made of. */}
        <section id="bench" className={s.bench} aria-labelledby="bench-h">
          <div className={s.secHead}>
            <p className={s.secKick}>The bench</p>
            <h2 id="bench-h">Three bags we make every week</h2>
            <p className={s.secNote}>
              Each is cut from one hide, so the grain matches across the body.
              Made to order in about three weeks, in tan, olive or black.
            </p>
          </div>

          <ol className={s.rows}>
            <li className={s.row}>
              <div className={s.rowMat}>
                <Artwork slug="satchel-and-strap-satchel" alt="The Tanner satchel" mode="fill" inks={[]} className={s.rowSatchel}>
                  <TabbiedPattern
                    pattern={plait}
                    palette={SATCHEL}
                    fit="grid"
                    cellSize={26}
                    seed="satchel-row"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </Artwork>
              </div>
              <div className={s.drawing} data-shape="satchel">
                <span className={s.box} aria-hidden="true" />
                <span className={s.dimW}>36 cm</span>
                <span className={s.dimH}>28 cm</span>
                <span className={s.dimD}>11 cm</span>
              </div>
              <div className={s.spec}>
                <span className={s.rowNo}>No. 1</span>
                <h3>The Tanner satchel</h3>
                <p className={s.specNote}>A flap, a single buckle and a strap that adjusts in six holes. Fits a 13 inch laptop and a lunch.</p>
                <dl className={s.specList}>
                  <div>
                    <dt>Leather</dt>
                    <dd>3.5 mm bridle, veg-tanned</dd>
                  </div>
                  <div>
                    <dt>Thread</dt>
                    <dd>Waxed linen, 8 stitches to the inch</dd>
                  </div>
                  <div>
                    <dt>Hardware</dt>
                    <dd>Solid brass</dd>
                  </div>
                </dl>
                <p className={s.price}>$420</p>
              </div>
            </li>

            <li className={s.row}>
              <div className={s.rowMat}>
                <Artwork slug="satchel-and-strap-tote" alt="The Market tote" mode="fill" inks={[]} className={s.rowTote}>
                  <TabbiedPattern
                    pattern={corduroy}
                    palette={TOTE}
                    fit="grid"
                    cellSize={24}
                    seed="tote-row"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </Artwork>
              </div>
              <div className={s.drawing} data-shape="tote">
                <span className={s.box} aria-hidden="true" />
                <span className={s.dimW}>38 cm</span>
                <span className={s.dimH}>34 cm</span>
                <span className={s.dimD}>14 cm</span>
              </div>
              <div className={s.spec}>
                <span className={s.rowNo}>No. 2</span>
                <h3>The Market tote</h3>
                <p className={s.specNote}>Open top, two handles long enough for the shoulder, one inside pocket and a key clip.</p>
                <dl className={s.specList}>
                  <div>
                    <dt>Leather</dt>
                    <dd>2.2 mm shoulder, veg-tanned</dd>
                  </div>
                  <div>
                    <dt>Thread</dt>
                    <dd>Waxed linen, 7 stitches to the inch</dd>
                  </div>
                  <div>
                    <dt>Lining</dt>
                    <dd>None, the flesh side burnished</dd>
                  </div>
                </dl>
                <p className={s.price}>$310</p>
              </div>
            </li>

            <li className={s.row}>
              <div className={s.rowMat}>
                <Artwork slug="satchel-and-strap-wallet" alt="The Fold wallet" mode="fill" inks={[]} className={s.rowWallet}>
                  <TabbiedPattern
                    pattern={grain}
                    palette={WALLET}
                    fit="grid"
                    cellSize={20}
                    seed="wallet-row"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </Artwork>
              </div>
              <div className={s.drawing} data-shape="wallet">
                <span className={s.box} aria-hidden="true" />
                <span className={s.dimW}>11 cm</span>
                <span className={s.dimH}>9 cm</span>
                <span className={s.dimD}>2 cm</span>
              </div>
              <div className={s.spec}>
                <span className={s.rowNo}>No. 3</span>
                <h3>The Fold wallet</h3>
                <p className={s.specNote}>Six card slots and a full-length note pocket. Thin in a back pocket now, and thinner in a year.</p>
                <dl className={s.specList}>
                  <div>
                    <dt>Leather</dt>
                    <dd>1.2 mm calf, veg-tanned</dd>
                  </div>
                  <div>
                    <dt>Thread</dt>
                    <dd>Waxed linen, 10 stitches to the inch</dd>
                  </div>
                  <div>
                    <dt>Edges</dt>
                    <dd>Sanded, dyed and burnished by hand</dd>
                  </div>
                </dl>
                <p className={s.price}>$120</p>
              </div>
            </li>
          </ol>

          <div className={s.small}>
            <h3 className={s.smallHead}>And the small things</h3>
            <ul className={s.smallList}>
              {SMALL.map((it) => (
                <li key={it.name}>
                  <strong>{it.name}</strong>
                  <span className={s.smallNote}>{it.note}</span>
                  <span className={s.smallPrice}>{it.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ SEAM */}
        <div className={s.seam} aria-hidden="true">
          <TabbiedPattern
            pattern={stitch}
            palette={SEAM}
            fit="grid"
            cellSize={36}
            seed="satchel-seam"
            options={{ frequency: 0.6 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- MONOGRAMS */}
        <section id="monograms" className={s.monograms} aria-labelledby="monograms-h">
          <div className={s.monoInner}>
            <div className={s.secHead}>
              <p className={s.secKick}>Personalization</p>
              <h2 id="monograms-h">Your initials, pressed while you wait</h2>
              <p className={s.secNote}>
                Stamped with brass type heated on the bench, on anything we
                make. Bring in something you already own from us and we will
                add them for the same price.
              </p>
            </div>
            <ul className={s.stamps}>
              {STAMPS.map((st) => (
                <li key={st.style} className={s.stamp} data-style={st.style.toLowerCase()}>
                  <span className={s.stampMark}>{st.sample}</span>
                  <h3>{st.style}</h3>
                  <p>{st.note}</p>
                </li>
              ))}
            </ul>
            <dl className={s.monoPrices}>
              {MONO_PRICES.map(([what, price]) => (
                <div key={what}>
                  <dt>{what}</dt>
                  <dd>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------- REPAIRS */}
        <section id="repairs" className={s.repairs} aria-labelledby="repairs-h">
          <div className={s.repairGrid}>
            <div className={s.secHead}>
              <p className={s.secKick}>Repairs</p>
              <h2 id="repairs-h">We mend any maker's leather</h2>
              <p className={s.secNote}>
                Bring it in and we will quote on the spot. Our own pieces are
                restitched free for life; you pay for parts.
              </p>
              <Artwork slug="satchel-and-strap-tote" alt="" mode="fill" inks={[]} className={s.repairTote}>
                <TabbiedPattern
                  pattern={corduroy}
                  palette={TOTE}
                  fit="grid"
                  cellSize={22}
                  seed="tote-repair"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </Artwork>
            </div>
            <table className={s.repairTable}>
              <caption className={s.srOnly}>Repair prices and times</caption>
              <thead>
                <tr>
                  <th scope="col">Repair</th>
                  <th scope="col">Price</th>
                  <th scope="col">Ready in</th>
                </tr>
              </thead>
              <tbody>
                {REPAIRS.map((r) => (
                  <tr key={r.what}>
                    <th scope="row">{r.what}</th>
                    <td>{r.price}</td>
                    <td>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------------------------------------------------------- WORKSHOP */}
        <section id="workshop" className={s.workshop} aria-labelledby="workshop-h">
          <div className={s.workInner}>
            <div className={s.workText}>
              <p className={s.secKick}>The workshop</p>
              <h2 id="workshop-h">
                A bench, two stools <em>and a window onto Tanner Street.</em>
              </h2>
              <p>
                Ines cuts and Tomas sews, and both of them burnish. The
                leather comes from one tannery that still uses oak bark and
                takes a year over a hide, which is why it smells the way it
                does.
              </p>
              <p>
                On Saturdays the bench is open: watch a bag being stitched,
                try a few stitches yourself, or bring a piece for a quote.
              </p>
            </div>
            <dl className={s.workFacts}>
              <div>
                <dt>12</dt>
                <dd>months to tan one hide</dd>
              </div>
              <div>
                <dt>1,900</dt>
                <dd>hand stitches in a satchel</dd>
              </div>
              <div>
                <dt>3 wk</dt>
                <dd>from order to your door</dd>
              </div>
              <div>
                <dt>Life</dt>
                <dd>free restitching on our own work</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- ORDER */}
        <section id="order" className={s.order} aria-labelledby="order-h">
          <div className={s.orderInfo}>
            <p className={s.secKick}>Order or visit</p>
            <h2 id="order-h">Tell us what to cut</h2>
            <p className={s.secNote}>
              We reply within a day with a date and ask for payment when the
              piece is ready. Shipping in the country is free.
            </p>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <p className={s.addr}>31 Tanner Street, the green door by the old tannery gate.</p>
            <ul className={s.contact}>
              <li>
                <a href="tel:+15550193346">(555) 019-3346</a>
              </li>
              <li>
                <a href="mailto:bench@satchelandstrap.example">bench@satchelandstrap.example</a>
              </li>
            </ul>
          </div>
          <form className={s.form} action="#">
            <label className={s.field}>
              <span>Piece</span>
              <select name="piece" defaultValue="satchel">
                <option value="satchel">The Tanner satchel, $420</option>
                <option value="tote">The Market tote, $310</option>
                <option value="wallet">The Fold wallet, $120</option>
                <option value="belt">Belt, $95</option>
                <option value="other">Something else</option>
              </select>
            </label>
            <label className={s.field}>
              <span>Leather</span>
              <select name="color" defaultValue="tan">
                <option value="tan">Tan</option>
                <option value="olive">Olive</option>
                <option value="black">Black</option>
              </select>
            </label>
            <label className={s.field}>
              <span>Initials</span>
              <input type="text" name="initials" maxLength={3} />
            </label>
            <label className={s.field}>
              <span>Stamp</span>
              <select name="stamp" defaultValue="roman">
                <option value="roman">Roman</option>
                <option value="block">Block</option>
                <option value="italic">Italic</option>
                <option value="none">No stamp</option>
              </select>
            </label>
            <label className={`${s.field} ${s.wide}`}>
              <span>Name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className={`${s.field} ${s.wide}`}>
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <button className={s.btn} type="submit">Send the order</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Satchel &amp; Strap</p>
          <p className={s.footTag}>Leather goods, cut and stitched by hand at 31 Tanner Street.</p>
          <nav className={s.footNav} aria-label="Footer">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className={s.footFine}>
          <p>A fictional leather workshop. Goods, prices and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
