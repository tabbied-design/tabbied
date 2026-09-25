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
const MAT = ['transparent', CREAM, CARAMEL];
const STRIP = ['transparent', CHERRY, CARAMEL];

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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#f6efe8',
        '--cocoa': '#2a1a14',
        '--cherry': '#8a3b24',
        '--caramel': '#d19a5a',
        '--gray': '#968a82',
        '--pale': '#ebddd2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,cocoa,cherry,caramel,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;1,400&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.text" data-edit-max="60">Cacao</span>
          <em className={s.markAmp}>&amp;</em>
          <span data-edit="bar.text2" data-edit-max="60">Co.</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#gifts">Order a box</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Three truffles, tinted, on a field of chocolate molds. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Chocolate shop and kitchen, Linden Arcade</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.title} id="hero-h">
              Twelve bonbons, <em>made this morning.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Everything in the window was made in the kitchen behind it: the
              bonbons at six this morning, the bars from beans we roast
              ourselves. Taste anything before you buy it.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#box">Open the box</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#workshops">Book a tasting</a>
            </div>
            <p data-edit="hero.heroHours" data-edit-max="240" data-edit-multiline className={s.heroHours}>Open Tuesday to Sunday. Hot chocolate at the counter until close.</p>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,5,3" className={s.heroField} aria-hidden="true">
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
              <span data-edit="hero.text" data-edit-max="60">No. 01-12</span>
              <span data-edit="hero.text2" data-edit-max="60">$3.50 each</span>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- BOX
            The box of twelve, four by three, the lid label above it. */}
        <section id="box" className={s.boxSection} aria-labelledby="box-h">
          <div className={s.secHead}>
            <p data-edit="box.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>The autumn box</p>
            <h2 data-edit="box.title" data-edit-max="60" id="box-h">A box of twelve, and what is in it</h2>
            <p data-edit="box.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The same twelve all season, laid out the way they come. Each top is
              a cocoa butter transfer, printed by hand so no two match.
            </p>
          </div>
          <div className={s.box}>
            <div className={s.lid}>
              <span data-edit="box.lidName" data-edit-max="60" className={s.lidName}>Cacao &amp; Co.</span>
              <span data-edit="box.lidTitle" data-edit-max="60" className={s.lidTitle}>The Autumn Box</span>
              <span data-edit="box.lidMeta" data-edit-max="60" className={s.lidMeta}>Twelve pieces, $42</span>
            </div>
            <ol className={s.tray}>
              {BONBONS.map((b, i) => (
                <li key={b.no} className={s.cell}>
                  <span data-edit-pattern={`box.field.${i}`} data-edit-roles="transparent,3,5,2" className={s.bonbon} data-shell={b.shell} aria-hidden="true">
                    <TabbiedPattern
                      pattern={b.design}
                      palette={TRANSFER}
                      fit="grid"
                      cellSize={24}
                      seed={b.name}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </span>
                  <span data-edit={`box.cellNo.${i}`} data-edit-max="60" className={s.cellNo}>{b.no}</span>
                  <h3 data-edit={`box.cellName.${i}`} data-edit-max="40" className={s.cellName}>{b.name}</h3>
                  <p data-edit={`box.cellFlavor.${i}`} data-edit-max="240" data-edit-multiline className={s.cellFlavor}>{b.flavor}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className={s.boxNotes}>
            <p data-edit="box.body" data-edit-max="240" data-edit-multiline>All contain milk and soy. Nuts in 03 and 09. Nothing contains gluten.</p>
            <p data-edit="box.body2" data-edit-max="240" data-edit-multiline>Keeps two weeks somewhere cool, never the fridge.</p>
            <p data-edit="box.body3" data-edit-max="240" data-edit-multiline>Or build your own twelve at the counter, for the same $42.</p>
          </div>
        </section>

        {/* ------------------------------------------------------------ BARS */}
        <section id="bars" className={s.bars} aria-labelledby="bars-h">
          <div className={s.barsArt}>
            <div className={s.barsMat} aria-hidden="true">
              <TabbiedPattern
                pattern={gravure}
                palette={MAT}
                fit="grid"
                cellSize={36}
                options={{ frequency: 0.85 }}
                seed="mat"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="cacao-and-co-bar"
              alt="A bar of dark chocolate with a few squares broken off"
              mode="tint"
              inks={['var(--cocoa)', 'var(--pale)']}
              className={s.barPhoto}
            />
          </div>
          <div className={s.barsBody}>
            <p data-edit="bars.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Bars, by origin</p>
            <h2 data-edit="bars.title" data-edit-max="60" id="bars-h">Six bars, each from one place</h2>
            <p data-edit="bars.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Cocoa and cane sugar, nothing else, except in the milk. Every bar is
              70 grams, wrapped in paper and foil you can recycle.
            </p>
            <ul className={s.barList}>
              {BARS.map((b, i) => (
                <li key={b.origin} className={s.barRow}>
                  <div className={s.barName}>
                    <h3 data-edit={`bars.title2.${i}`} data-edit-max="40">{b.origin}</h3>
                    <span data-edit={`bars.text.${i}`} data-edit-max="60">{b.maker}</span>
                  </div>
                  <span data-edit={`bars.barNotes.${i}`} data-edit-max="60" className={s.barNotes}>{b.notes}</span>
                  <span className={s.barPct}>
                    <span className={s.barMeter} aria-hidden="true">
                      <span style={{ width: `${b.pct}%` }} />
                    </span>
                    <span>{`${b.pct}% cocoa`}</span>
                  </span>
                  <strong data-edit={`bars.barPrice.${i}`} className={s.barPrice}>{b.price}</strong>
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
              <p data-edit="making.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>From the bean</p>
              <h2 data-edit="making.title" data-edit-max="60" id="making-h">Six weeks from a sack of beans to a bar</h2>
              <ol className={s.steps}>
                {STEPS.map(([t, b], i) => (
                  <li key={t}>
                    <h3 data-edit={`making.title2.${i}`} data-edit-max="40">{t}</h3>
                    <p data-edit={`making.body.${i}`} data-edit-max="240" data-edit-multiline>{b}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className={s.makingStrip} aria-hidden="true">
            <TabbiedPattern
              pattern={bothcut}
              palette={STRIP}
              fit="grid"
              cellSize={44}
              seed="transfer sheet"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ------------------------------------------------------- WORKSHOPS */}
        <section id="workshops" className={s.workshops} aria-labelledby="workshops-h">
          <div className={s.secHead}>
            <p data-edit="workshops.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Tasting workshops</p>
            <h2 data-edit="workshops.title" data-edit-max="60" id="workshops-h">Taste it slowly, or make it yourself</h2>
            <p data-edit="workshops.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              At the long table in the kitchen, up to eight people. Book by email
              or at the counter; we hold a place for 48 hours.
            </p>
          </div>
          <ul className={s.workshopList}>
            {WORKSHOPS.map((w, i) => (
              <li key={w.name} className={s.workshop}>
                <h3 data-edit={`workshops.title2.${i}`} data-edit-max="40">{w.name}</h3>
                <span data-edit={`workshops.workshopWhen.${i}`} data-edit-max="60" className={s.workshopWhen}>{w.when}</span>
                <p data-edit={`workshops.body.${i}`} data-edit-max="240" data-edit-multiline>{w.body}</p>
                <strong data-edit={`workshops.workshopPrice.${i}`} className={s.workshopPrice}>{w.price}</strong>
              </li>
            ))}
          </ul>
          <form className={s.form} action="#">
            <div className={s.field}>
              <label data-edit="workshops.label" htmlFor="cc-workshop">Workshop</label>
              <select id="cc-workshop" name="workshop" defaultValue="tasting">
                <option value="tasting">Tasting flight, $38</option>
                <option value="truffles">Truffle rolling, $65</option>
                <option value="bean">Bean to bar, $95</option>
              </select>
            </div>
            <div className={s.field}>
              <label data-edit="workshops.label2" htmlFor="cc-date">Date</label>
              <input id="cc-date" name="date" type="date" />
            </div>
            <div className={s.field}>
              <label data-edit="workshops.label3" htmlFor="cc-people">People</label>
              <select id="cc-people" name="people" defaultValue="2">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className={s.field}>
              <label data-edit="workshops.label4" htmlFor="cc-email">Email</label>
              <input id="cc-email" name="email" type="email" autoComplete="email" />
            </div>
            <button data-edit="workshops.submit" data-edit-max="24" className={s.submit} type="submit">Hold my places</button>
          </form>
        </section>

        {/* ----------------------------------------------------------- GIFTS */}
        <section id="gifts" className={s.gifts} aria-labelledby="gifts-h">
          <div className={s.giftsHead}>
            <p data-edit="gifts.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Gifts and delivery</p>
            <h2 data-edit="gifts.title" data-edit-max="60" id="gifts-h">Wrapped, with a card, at the door</h2>
            <p data-edit="gifts.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every box is tied with cotton ribbon and can carry a handwritten
              card. For thirty boxes or more, for a wedding or an office, write
              to us a month ahead.
            </p>
            <ul className={s.boxes}>
              {BOXES.map((b, i) => (
                <li key={b.name}>
                  <span data-edit-pattern={`gifts.field.${i}`} data-edit-roles="0,5,3" className={s.boxCup} aria-hidden="true">
                    <TabbiedPattern
                      pattern={gravure}
                      palette={CUP}
                      fit="grid"
                      cellSize={28}
                      seed={b.name}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </span>
                  <span data-edit={`gifts.boxName.${i}`} data-edit-max="60" className={s.boxName}>{b.name}</span>
                  <strong data-edit={`gifts.emphasis.${i}`}>{b.price}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.delivery}>
            <h3 data-edit="gifts.title2" data-edit-max="40">Delivery</h3>
            <dl className={s.deliveryList}>
              {DELIVERY.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`gifts.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`gifts.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <a data-edit="gifts.orderLink" data-edit-max="28" className={s.orderLink} href="mailto:orders@cacaoandco.example">orders@cacaoandco.example</a>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitText}>
            <p data-edit="visit.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Visit</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">The shop at the end of the arcade</h2>
            <p data-edit="visit.visitAddr" data-edit-max="240" data-edit-multiline className={s.visitAddr}>14 Linden Arcade, under the clock</p>
            <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>
              Look through the kitchen window at the back: tempering is usually
              between ten and noon. The counter pours hot chocolate all day,
              thick or thin.
            </p>
            <p className={s.visitContact}>
              <span data-edit="visit.text" data-edit-max="60">(555) 016-9020</span>
              <a data-edit="visit.link" data-edit-max="28" href="mailto:hello@cacaoandco.example">hello@cacaoandco.example</a>
            </p>
          </div>
          <dl className={s.hours}>
            {HOURS.map(([d, h], i) => (
              <div key={d}>
                <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <span className={s.footBonbon} aria-hidden="true">
            <TabbiedPattern
              pattern={diadem}
              palette={TRANSFER}
              fit="grid"
              cellSize={24}
              seed="Sea Salt Caramel"
              style={{ position: 'absolute', inset: 0 }}
            />
          </span>
          <p className={s.footName}>
            <span data-edit="footer.text" data-edit-max="60">Cacao</span>
            <em>&amp;</em>
            <span data-edit="footer.text2" data-edit-max="60">Co.</span>
          </p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Bonbons and bars, made in the kitchen at 14 Linden Arcade.</p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional chocolate shop. Flavors, prices and hours are invented.</p>
          <p className={s.credit}>
            <span data-edit="footer.text3" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
