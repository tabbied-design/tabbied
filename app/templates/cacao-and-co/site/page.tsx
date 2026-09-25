import { TabbiedPattern } from 'tabbied/react';
import { bothcut, diadem, gimbal, gravure, northstar } from 'tabbied/patterns';
import s from './cacao-and-co.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Cacao & Co.: Chocolate shop and kitchen, Linden Arcade',
  description:
    'Bonbons made each morning, bars made from the bean in our own kitchen, and tasting workshops on Friday evenings. Order the box of twelve for pickup or delivery.',
};

/* Site colors. The photographs are tinted in two of these: the darker ink
   through the picture's shadows, the lighter through its light. */
const CREAM = '#F6EFE8';
const CHERRY = '#8A3B24';
const CARAMEL = '#D19A5A';
const PALE = '#EBDDD2';

const MOLD = ['transparent', PALE, CARAMEL];
const TRANSFER = ['transparent', CARAMEL, PALE, CHERRY];
const CUP = [CREAM, PALE, CARAMEL];

const NAV = [
  ['The box', '#box'],
  ['Bars', '#bars'],
  ['Workshops', '#workshops'],
  ['Gifts', '#gifts'],
  ['Visit', '#visit'],
];

/* The box, left to right and top to bottom. Each bonbon's top is a cocoa
   butter transfer, drawn as a small pattern on its shell color. */
const BONBONS = [
  { no: '01', name: 'Sea Salt Caramel', flavor: 'Burnt caramel, grey salt', shell: 'dark', design: diadem },
  { no: '02', name: 'Raspberry', flavor: 'Raspberry jelly over dark ganache', shell: 'ruby', design: northstar },
  { no: '03', name: 'Hazelnut Praline', flavor: 'Toasted hazelnut, a little crunch', shell: 'milk', design: bothcut },
  { no: '04', name: 'Earl Grey', flavor: 'Bergamot tea, steeped in cream', shell: 'dark', design: gimbal },
  { no: '05', name: 'Passion Fruit', flavor: 'Milk chocolate, sharp fruit', shell: 'milk', design: northstar },
  { no: '06', name: 'Cardamom', flavor: 'Green cardamom and wildflower honey', shell: 'dark', design: bothcut },
  { no: '07', name: 'Espresso', flavor: 'Beans from the roaster next door', shell: 'dark', design: gimbal },
  { no: '08', name: 'Yuzu', flavor: 'White chocolate, yuzu zest', shell: 'ruby', design: diadem },
  { no: '09', name: 'Pistachio', flavor: 'Pistachio marzipan, dark shell', shell: 'milk', design: diadem },
  { no: '10', name: 'Ancho Chili', flavor: 'Chili, cinnamon, a slow heat', shell: 'ruby', design: bothcut },
  { no: '11', name: 'Peated Whisky', flavor: 'Smoky single malt ganache', shell: 'dark', design: northstar },
  { no: '12', name: 'Blackberry & Bay', flavor: 'Blackberry, bay leaf, dark milk', shell: 'milk', design: gimbal },
];

const BARS = [
  { origin: 'Tumaco, Colombia', maker: 'Grower cooperative, Pacific coast', pct: 70, notes: 'Red fruit and brown butter', price: '$11' },
  { origin: 'Sambirano, Madagascar', maker: 'Three family farms, one valley', pct: 72, notes: 'Raspberry, citrus peel, very bright', price: '$11' },
  { origin: 'Ucayali, Peru', maker: 'A cooperative of 120 growers', pct: 75, notes: 'Dried plum, molasses, long finish', price: '$12' },
  { origin: 'Kilombero, Tanzania', maker: 'Fermented at a central station', pct: 74, notes: 'Cherry, vanilla, black tea', price: '$12' },
  { origin: 'Duarte, Dominican Republic', maker: 'Certified organic estate', pct: 65, notes: 'Honey, banana, a soft finish', price: '$10' },
  { origin: 'Tumaco milk', maker: 'The Colombian beans with milk', pct: 50, notes: 'Caramel, malt, a pinch of salt', price: '$10' },
];

const STEPS = [
  ['Sort', 'By hand, on the long table. Flat, moldy and broken beans go.'],
  ['Roast', 'Twenty to forty minutes, different for every origin.'],
  ['Crack and winnow', 'The shells blown off, the nibs left behind.'],
  ['Grind and conch', 'Three days in the stone grinder with the sugar.'],
  ['Age', 'A month in blocks, so the flavor settles.'],
  ['Temper and mold', 'Melted, cooled, warmed, poured. Snap tested.'],
];

const WORKSHOPS = [
  {
    name: 'Tasting flight',
    when: 'Fridays, 6-7:30 pm',
    price: '$38',
    body: 'Six bars from six origins, tasted the slow way, with notes you take home. A glass of wine or a hot chocolate.',
  },
  {
    name: 'Truffle rolling',
    when: 'Saturdays, 11 am-1 pm',
    price: '$65',
    body: 'Make a ganache, pipe it, roll it, coat it. You leave with a box of twenty four of your own.',
  },
  {
    name: 'Bean to bar',
    when: 'First Sunday of the month, 10 am-1 pm',
    price: '$95',
    body: 'Roast, crack and winnow a batch with us, then temper and mold a bar from last month\'s batch.',
  },
];

const BOXES = [
  { name: 'Box of four', price: '$15' },
  { name: 'Box of twelve', price: '$42' },
  { name: 'Box of twenty four', price: '$80' },
];

const DELIVERY = [
  ['Pickup at the shop', 'Free, ready in two hours'],
  ['Bike courier in town', '$8, same day if ordered by 2 pm'],
  ['Shipped, anywhere in the country', '$14, insulated, sent Monday to Wednesday'],
  ['Summer', 'From June to August we ship with ice packs, or hold your order for a cool week'],
];

const HOURS = [
  ['Tuesday-Friday', '10 am-7 pm'],
  ['Saturday', '9 am-7 pm'],
  ['Sunday', '11 am-5 pm'],
  ['Monday', 'Closed, we are making'],
];

export default function CacaoAndCoPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;1,400&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span>Cacao</span>
          <em className={s.markAmp}>&amp;</em>
          <span>Co.</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#gifts">Order a box</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Three truffles, tinted, on a field of chocolate molds. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Chocolate shop and kitchen, Linden Arcade</p>
            <h1 className={s.title} id="hero-h">
              Twelve bonbons, <em>made this morning.</em>
            </h1>
            <p className={s.lede}>
              Everything in the window was made in the kitchen behind it: the
              bonbons at six this morning, the bars from beans we roast
              ourselves. Taste anything before you buy it.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#box">Open the box</a>
              <a className={s.btnLine} href="#workshops">Book a tasting</a>
            </div>
            <p className={s.heroHours}>Open Tuesday to Sunday. Hot chocolate at the counter until close.</p>
          </div>
          <div className={s.heroArt}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={gravure}
                palette={MOLD}
                fit="grid"
                cellSize={60}
                options={{ frequency: 0.6 }}
                seed="molds"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="cacao-and-co-truffles"
              alt="Three round chocolate truffles, one striped, two dusted with cocoa nibs"
              mode="tint"
              inks={['var(--cocoa)', 'var(--caramel)']}
              className={s.heroTruffles}
            />
            <p className={s.heroNote}>
              <span>No. 01-12</span>
              <span>$3.50 each</span>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- BOX
            The box of twelve, four by three, the lid label above it. */}
        <section id="box" className={s.boxSection} aria-labelledby="box-h">
          <div className={s.secHead}>
            <p className={s.secKick}>The autumn box</p>
            <h2 id="box-h">A box of twelve, and what is in it</h2>
            <p className={s.secNote}>
              The same twelve all season, laid out the way they come. Each top is
              a cocoa butter transfer, printed by hand so no two match.
            </p>
          </div>
          <div className={s.box}>
            <div className={s.lid}>
              <span className={s.lidName}>Cacao &amp; Co.</span>
              <span className={s.lidTitle}>The Autumn Box</span>
              <span className={s.lidMeta}>Twelve pieces, $42</span>
            </div>
            <ol className={s.tray}>
              {BONBONS.map((b) => (
                <li key={b.no} className={s.cell}>
                  <span className={s.bonbon} data-shell={b.shell} aria-hidden="true">
                    <TabbiedPattern
                      pattern={b.design}
                      palette={TRANSFER}
                      fit="grid"
                      cellSize={26}
                      seed={b.name}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </span>
                  <span className={s.cellNo}>{b.no}</span>
                  <h3 className={s.cellName}>{b.name}</h3>
                  <p className={s.cellFlavor}>{b.flavor}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className={s.boxNotes}>
            <p>All contain milk and soy. Nuts in 03 and 09. Nothing contains gluten.</p>
            <p>Keeps two weeks somewhere cool, never the fridge.</p>
            <p>Or build your own twelve at the counter, for the same $42.</p>
          </div>
        </section>

        {/* ------------------------------------------------------------ BARS */}
        <section id="bars" className={s.bars} aria-labelledby="bars-h">
          <div className={s.barsArt}>
            <Artwork
              slug="cacao-and-co-bar"
              alt="A bar of dark chocolate with a few squares broken off"
              mode="tint"
              inks={['var(--cocoa)', 'var(--pale)']}
              className={s.barPhoto}
            />
          </div>
          <div className={s.barsBody}>
            <p className={s.secKick}>Bars, by origin</p>
            <h2 id="bars-h">Six bars, each from one place</h2>
            <p className={s.secNote}>
              Cocoa and cane sugar, nothing else, except in the milk. Every bar is
              70 grams, wrapped in paper and foil you can recycle.
            </p>
            <ul className={s.barList}>
              {BARS.map((b) => (
                <li key={b.origin} className={s.barRow}>
                  <div className={s.barName}>
                    <h3>{b.origin}</h3>
                    <span>{b.maker}</span>
                  </div>
                  <span className={s.barNotes}>{b.notes}</span>
                  <span className={s.barPct}>
                    <span className={s.barMeter} aria-hidden="true">
                      <span style={{ width: `${b.pct}%` }} />
                    </span>
                    <span>{`${b.pct}% cocoa`}</span>
                  </span>
                  <strong className={s.barPrice}>{b.price}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- MAKING
            The one dark room: the pod, and the six steps to a bar. */}
        <section id="making" className={s.making} aria-labelledby="making-h">
          <div className={s.makingInner}>
            <Artwork
              slug="cacao-and-co-pod"
              alt="A cacao pod split open, the beans packed inside"
              mode="tint"
              inks={['var(--cherry)', 'var(--pale)']}
              className={s.pod}
            />
            <div className={s.makingText}>
              <p className={s.secKick}>From the bean</p>
              <h2 id="making-h">Six weeks from a sack of beans to a bar</h2>
              <ol className={s.steps}>
                {STEPS.map(([t, b]) => (
                  <li key={t}>
                    <h3>{t}</h3>
                    <p>{b}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- WORKSHOPS */}
        <section id="workshops" className={s.workshops} aria-labelledby="workshops-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Tasting workshops</p>
            <h2 id="workshops-h">Taste it slowly, or make it yourself</h2>
            <p className={s.secNote}>
              At the long table in the kitchen, up to eight people. Book by email
              or at the counter; we hold a place for 48 hours.
            </p>
          </div>
          <ul className={s.workshopList}>
            {WORKSHOPS.map((w) => (
              <li key={w.name} className={s.workshop}>
                <h3>{w.name}</h3>
                <span className={s.workshopWhen}>{w.when}</span>
                <p>{w.body}</p>
                <strong className={s.workshopPrice}>{w.price}</strong>
              </li>
            ))}
          </ul>
          <form className={s.form} action="#">
            <div className={s.field}>
              <label htmlFor="cc-workshop">Workshop</label>
              <select id="cc-workshop" name="workshop" defaultValue="tasting">
                <option value="tasting">Tasting flight, $38</option>
                <option value="truffles">Truffle rolling, $65</option>
                <option value="bean">Bean to bar, $95</option>
              </select>
            </div>
            <div className={s.field}>
              <label htmlFor="cc-date">Date</label>
              <input id="cc-date" name="date" type="date" />
            </div>
            <div className={s.field}>
              <label htmlFor="cc-people">People</label>
              <select id="cc-people" name="people" defaultValue="2">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className={s.field}>
              <label htmlFor="cc-email">Email</label>
              <input id="cc-email" name="email" type="email" autoComplete="email" />
            </div>
            <button className={s.submit} type="submit">Hold my places</button>
          </form>
        </section>

        {/* ----------------------------------------------------------- GIFTS */}
        <section id="gifts" className={s.gifts} aria-labelledby="gifts-h">
          <div className={s.giftsHead}>
            <p className={s.secKick}>Gifts and delivery</p>
            <h2 id="gifts-h">Wrapped, with a card, at the door</h2>
            <p className={s.secNote}>
              Every box is tied with cotton ribbon and can carry a handwritten
              card. For thirty boxes or more, for a wedding or an office, write
              to us a month ahead.
            </p>
            <ul className={s.boxes}>
              {BOXES.map((b) => (
                <li key={b.name}>
                  <span className={s.boxCup} aria-hidden="true">
                    <TabbiedPattern
                      pattern={gravure}
                      palette={CUP}
                      fit="grid"
                      cellSize={28}
                      seed={b.name}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </span>
                  <span className={s.boxName}>{b.name}</span>
                  <strong>{b.price}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.delivery}>
            <h3>Delivery</h3>
            <dl className={s.deliveryList}>
              {DELIVERY.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <a className={s.orderLink} href="mailto:orders@cacaoandco.example">orders@cacaoandco.example</a>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitText}>
            <p className={s.secKick}>Visit</p>
            <h2 id="visit-h">The shop at the end of the arcade</h2>
            <p className={s.visitAddr}>14 Linden Arcade, under the clock</p>
            <p className={s.visitNote}>
              Look through the kitchen window at the back: tempering is usually
              between ten and noon. The counter pours hot chocolate all day,
              thick or thin.
            </p>
            <p className={s.visitContact}>
              <span>(555) 016-9020</span>
              <a href="mailto:hello@cacaoandco.example">hello@cacaoandco.example</a>
            </p>
          </div>
          <dl className={s.hours}>
            {HOURS.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>
            <span>Cacao</span>
            <em>&amp;</em>
            <span>Co.</span>
          </p>
          <p className={s.footTag}>Bonbons and bars, made in the kitchen at 14 Linden Arcade.</p>
        </div>
        <div className={s.footFine}>
          <p>A fictional chocolate shop. Flavors, prices and hours are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
