import { TabbiedPattern } from 'tabbied/react';
import { dotwash, isocube, petalcut } from 'tabbied/patterns';
import s from './hive-and-honey.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Hive & Honey: Honey farm and shop, Linden Hill',
  description:
    'Raw honey from forty hives on Linden Hill, sold by the flower it came from. See the nine honeys, book a hive tour, or find us at the Saturday market.',
};

/* Site colors. The engravings are painted in these too, through the page's
   own custom properties, so a re-color reaches the bee. */
const HONEY = '#E0A21B';
const OLIVE = '#6E7F3A';
const STRAW = '#9C9076';
const WAX = '#F1E4C2';

const COMB_FIELD = ['transparent', HONEY, WAX, STRAW];
const MEADOW = ['transparent', OLIVE, HONEY, WAX];
const POLLEN = ['transparent', HONEY, STRAW];

const NAV = [
  ['Honeys', '#honeys'],
  ['The year', '#year'],
  ['Hive tours', '#tours'],
  ['Where to buy', '#buy'],
  ['Questions', '#faq'],
];

type Cell = {
  name: string;
  source: string;
  color: string;
  tone: 'light' | 'amber' | 'gold' | 'dark' | 'art';
  jars: string[][];
};

/* The honeycomb, read left to right, row by row (3, 4, 3). The fifth cell
   is the dipper, not a honey. */
const COMB: Cell[] = [
  { name: 'Clover', source: 'White clover in the hay meadows', color: 'Water white', tone: 'light', jars: [['8 oz', '$9'], ['1 lb', '$15'], ['3 lb', '$38']] },
  { name: 'Wildflower', source: 'Vetch, knapweed and bramble', color: 'Light amber', tone: 'amber', jars: [['8 oz', '$9'], ['1 lb', '$15'], ['3 lb', '$38']] },
  { name: 'Buckwheat', source: 'A field we sow for the bees', color: 'Dark molasses', tone: 'dark', jars: [['8 oz', '$10'], ['1 lb', '$16']] },
  { name: 'Spring Blossom', source: 'Apple, cherry and dandelion', color: 'Pale gold', tone: 'light', jars: [['8 oz', '$10'], ['1 lb', '$16']] },
  { name: 'Dipper', source: '', color: '', tone: 'art', jars: [] },
  { name: 'Goldenrod', source: 'Goldenrod and aster, September', color: 'Bright gold', tone: 'gold', jars: [['8 oz', '$9'], ['1 lb', '$15'], ['3 lb', '$38']] },
  { name: 'Creamed Clover', source: 'Clover, stirred until it sets', color: 'Opaque ivory', tone: 'light', jars: [['8 oz', '$10'], ['1 lb', '$16']] },
  { name: 'Linden', source: 'The lime trees on Mill Road', color: 'Green gold', tone: 'amber', jars: [['8 oz', '$11'], ['1 lb', '$18']] },
  { name: 'Comb Honey', source: 'Cut from the frame, wax and all', color: 'Pale, in the comb', tone: 'light', jars: [['4 in square', '$16']] },
  { name: 'Tulip Poplar', source: 'Tulip trees on the east ridge', color: 'Deep amber', tone: 'gold', jars: [['8 oz', '$11'], ['1 lb', '$18']] },
];

const MONTHS = [
  { m: 'Jan', flow: 0, harvest: '', note: 'Hives wrapped and quiet. We mend frames in the barn.' },
  { m: 'Feb', flow: 0, harvest: '', note: 'Cleansing flights on warm days. Candy boards if stores are low.' },
  { m: 'Mar', flow: 1, harvest: '', note: 'Willow and maple pollen. The first full inspection.' },
  { m: 'Apr', flow: 2, harvest: '', note: 'Fruit blossom. Colonies build fast and we add boxes.' },
  { m: 'May', flow: 3, harvest: 'Spring Blossom', note: 'Swarm season: inspections every seven days.' },
  { m: 'Jun', flow: 4, harvest: 'Clover', note: 'The clover flow, and the first hive tours.' },
  { m: 'Jul', flow: 5, harvest: 'Linden, Wildflower', note: 'The busiest month in the honey house.' },
  { m: 'Aug', flow: 3, harvest: 'Tulip Poplar', note: 'Mite checks once the boxes come off.' },
  { m: 'Sep', flow: 4, harvest: 'Goldenrod', note: 'The yard smells of goldenrod for weeks.' },
  { m: 'Oct', flow: 2, harvest: 'Buckwheat', note: 'The last flow. Hives are left heavy for winter.' },
  { m: 'Nov', flow: 0, harvest: '', note: 'Mouse guards on, entrances narrowed.' },
  { m: 'Dec', flow: 0, harvest: '', note: 'The bees cluster. The shop does gift boxes.' },
];

const TOUR_STEPS = [
  { t: 'Suit up in the barn', b: 'Veils, jackets and gloves in every size, children included. We light the smoker together.' },
  { t: 'Open two hives', b: 'One strong colony and one young one, so you can see the difference. Find the queen if she lets you.' },
  { t: 'Taste from the frame', b: 'A spoon straight into capped comb, then the same honey from the jar, and a flight of four in the shop.' },
];

const TOUR_DATES = [
  { id: 'jun13', when: 'Saturday June 13', time: '10 am', left: '6 places left' },
  { id: 'jun13b', when: 'Saturday June 13', time: '2 pm', left: '3 places left' },
  { id: 'jun21', when: 'Sunday June 21', time: '11 am, families', left: '8 places left' },
  { id: 'jun27', when: 'Saturday June 27', time: '10 am', left: '10 places left' },
  { id: 'jul04', when: 'Saturday July 4', time: '2 pm', left: '7 places left' },
];

const RAW = [
  { t: 'Never heated past the hive', b: 'The honey house runs at 95 F, the temperature inside a brood nest. Nothing is warmed beyond it to make it pour faster.' },
  { t: 'Strained, not filtered', b: 'Through two layers of cloth, once. The pollen stays in, which is how we can tell you what the bees were working.' },
  { t: 'One flower where we can', b: 'We pull boxes the day a flow ends. Where a jar is a blend, the label says so and names the main flowers.' },
  { t: 'It will crystallize', b: 'Clover sets in weeks, tulip poplar takes a year. Stand the jar in warm water to melt it; it is not spoiled.' },
];

const MARKETS = [
  ['Saturday', 'Riverside Market, stall 14, 8 am-1 pm'],
  ['Wednesday', 'Hall Street Market, 3-7 pm, May to October'],
  ['Sunday', 'The farm shop, 10 am-4 pm, all year'],
];

const STOCKISTS = [
  { name: 'Fenwick Grocers', where: '22 Bridge Street', carry: 'Clover, Wildflower, Buckwheat' },
  { name: 'The Larder at Oakley', where: '5 Station Road, Oakley', carry: 'The full range' },
  { name: 'Hollis Bakery', where: '71 Church Lane', carry: 'Comb honey, on their toast' },
];

const FAQ = [
  {
    q: 'Can babies have honey?',
    a: 'Not under one year old. Raw honey can carry spores that a baby\'s gut cannot yet deal with. From their first birthday it is fine.',
  },
  {
    q: 'Why is my jar solid?',
    a: 'Every raw honey crystallizes in the end. Loosen the lid and stand the jar in a bowl of warm water, never boiling, and stir now and then.',
  },
  {
    q: 'Do you ship?',
    a: 'Anywhere in the country, in paper and cardboard only. Shipping is $8 a parcel and free from three jars. Comb honey ships June to October.',
  },
  {
    q: 'Can I bring a swarm to you?',
    a: 'Please call instead. In May and June we collect swarms within fifteen miles for nothing, and a swarm in a box needs air.',
  },
  {
    q: 'Do you sell beeswax?',
    a: 'Blocks of filtered wax for $6 a pound, and dipped candles from November. Ask at the shop counter.',
  },
];

export default function HiveAndHoneyPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Karla:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markHex} aria-hidden="true" />
          <span>Hive &amp; Honey</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#tours">Book a tour</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The bee in a capped cell, on a field of tumbling hexagons. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Honey farm and shop, Linden Hill</p>
            <h1 className={s.title} id="hero-h">
              Raw honey, <em>by the flower it came from.</em>
            </h1>
            <p className={s.lede}>
              Forty hives on the hill and in the orchards below it. We take the
              honey off the day each flow ends, strain it once through cloth and
              jar it by hand, so a spoon of clover tastes of June and a spoon of
              buckwheat tastes of October.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#honeys">See the nine honeys</a>
              <a className={s.btnGhost} href="#tours">Open a hive with us</a>
            </div>
            <dl className={s.facts}>
              <div>
                <dt>Hives</dt>
                <dd>40</dd>
              </div>
              <div>
                <dt>Honeys</dt>
                <dd>9</dd>
              </div>
              <div>
                <dt>Since</dt>
                <dd>2009</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroArt}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={isocube}
                palette={COMB_FIELD}
                fit="grid"
                cellSize={64}
                options={{ frequency: 0.5 }}
                seed="linden-comb"
                redrawInterval={8800}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.heroCell}>
              <Artwork slug="hive-and-honey-bee" alt="An engraving of a honey bee seen from above" inks={['var(--ink)']} className={s.heroBee} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- HONEYS
            The honeycomb: one cell per honey, colored like the honey. */}
        <section id="honeys" className={s.honeys} aria-labelledby="honeys-h">
          <div className={s.secHead}>
            <p className={s.secKick}>The honeys</p>
            <h2 id="honeys-h">Nine honeys, one frame</h2>
            <p className={s.secNote}>
              Each cell is a flow the bees worked, named for the flowers the
              pollen says they were on. Colors run from water white to dark
              molasses; the price is the same at the market, the shop and by post.
            </p>
          </div>
          <ul className={s.comb}>
            {COMB.map((c) =>
              c.tone === 'art' ? (
                <li key={c.name} className={s.cell} data-tone="art">
                  <div className={s.hex}>
                    <Artwork slug="hive-and-honey-dipper" alt="An engraving of a wooden honey dipper, dripping" inks={['var(--ink)']} className={s.dipper} />
                  </div>
                </li>
              ) : (
                <li key={c.name} className={s.cell} data-tone={c.tone}>
                  <div className={s.hex}>
                    <span className={s.cellSource}>{c.source}</span>
                    <h3 className={s.cellName}>{c.name}</h3>
                    <span className={s.cellColor}>{c.color}</span>
                    <span className={s.cellJars}>
                      {c.jars.map(([size, price]) => (
                        <span key={size} className={s.jar}>
                          <span>{size}</span>
                          <strong>{price}</strong>
                        </span>
                      ))}
                    </span>
                  </div>
                </li>
              ),
            )}
          </ul>
          <p className={s.combNote}>
            Try before you buy: every honey is open for tasting at the farm shop
            and the Saturday stall. Bring back five clean jars for a free 8 oz.
          </p>
        </section>

        {/* ------------------------------------------------------------ BAND
            The meadow the honey comes from, in petals. */}
        <div className={s.band} aria-hidden="true">
          <div className={s.bandField}>
            <TabbiedPattern
              pattern={petalcut}
              palette={MEADOW}
              fit="grid"
              cellSize={48}
              options={{ frequency: 0.45 }}
              seed="meadow"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------ YEAR
            A month strip, the bars the strength of the nectar flow. */}
        <section id="year" className={s.year} aria-labelledby="year-h">
          <div className={s.secHead}>
            <p className={s.secKick}>The beekeeping year</p>
            <h2 id="year-h">What the bees are doing this month</h2>
            <p className={s.secNote}>
              The bars are the nectar flow on the hill, from nothing to the July
              rush. A harvest month lists the honey that comes off that month.
            </p>
          </div>
          <ol className={s.months}>
            {MONTHS.map((mo) => (
              <li key={mo.m} className={s.month} data-harvest={mo.harvest ? 'yes' : 'no'}>
                <span className={s.flow} aria-hidden="true">
                  <span className={s.flowBar} data-flow={mo.flow} />
                </span>
                <strong className={s.monthName}>{mo.m}</strong>
                <span className={s.monthHarvest}>{mo.harvest || 'No harvest'}</span>
                <p className={s.monthNote}>{mo.note}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- TOURS */}
        <section id="tours" className={s.tours} aria-labelledby="tours-h">
          <div className={s.toursArt}>
            <div className={s.toursField} aria-hidden="true">
              <TabbiedPattern
                pattern={dotwash}
                palette={POLLEN}
                fit="grid"
                cellSize={56}
                options={{ frequency: 0.7 }}
                seed="pollen"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork slug="hive-and-honey-skep" alt="An engraving of a traditional straw bee skep" inks={['var(--olive)']} className={s.skep} />
            <p className={s.toursArtNote}>The old skep by the barn door. Our bees live in wooden boxes you can open.</p>
          </div>
          <div className={s.toursBody}>
            <p className={s.secKick}>Hive tours, June to September</p>
            <h2 id="tours-h">Open a hive with us</h2>
            <p className={s.toursLede}>
              Ninety minutes with Ruth, who has kept bees on this hill since
              2009. Nobody has been stung on a tour yet, but it is an animal,
              not an exhibit, so wear long trousers and closed shoes.
            </p>
            <ol className={s.tourSteps}>
              {TOUR_STEPS.map((st, i) => (
                <li key={st.t}>
                  <span className={s.tourNo}>{`0${i + 1}`}</span>
                  <h3>{st.t}</h3>
                  <p>{st.b}</p>
                </li>
              ))}
            </ol>
            <dl className={s.tourFacts}>
              <div>
                <dt>Adults</dt>
                <dd>$45</dd>
              </div>
              <div>
                <dt>Ages 8-15</dt>
                <dd>$25</dd>
              </div>
              <div>
                <dt>Group</dt>
                <dd>Up to 10</dd>
              </div>
            </dl>
            <form className={s.form} action="#">
              <fieldset className={s.dates}>
                <legend>Choose a tour</legend>
                {TOUR_DATES.map((d) => (
                  <label key={d.id} className={s.date}>
                    <input type="radio" name="tour" value={d.id} />
                    <span className={s.dateWhen}>{d.when}</span>
                    <span className={s.dateTime}>{d.time}</span>
                    <span className={s.dateLeft}>{d.left}</span>
                  </label>
                ))}
              </fieldset>
              <div className={s.formRow}>
                <div className={s.field}>
                  <label htmlFor="hh-adults">Adults</label>
                  <select id="hh-adults" name="adults" defaultValue="2">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="hh-kids">Children</label>
                  <select id="hh-kids" name="children" defaultValue="0">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="hh-email">Email</label>
                <input id="hh-email" name="email" type="email" autoComplete="email" />
              </div>
              <button className={s.submit} type="submit">Hold my places</button>
              <small className={s.formNote}>Pay on the day. No children under eight, for their sake and the bees.</small>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- RAW */}
        <section id="raw" className={s.raw} aria-labelledby="raw-h">
          <div className={s.secHead}>
            <p className={s.secKick}>In the honey house</p>
            <h2 id="raw-h">What raw means here</h2>
          </div>
          <ol className={s.rawList}>
            {RAW.map((r) => (
              <li key={r.t}>
                <h3>{r.t}</h3>
                <p>{r.b}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------- BUY */}
        <section id="buy" className={s.buy} aria-labelledby="buy-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Where to buy</p>
            <h2 id="buy-h">The shop, the markets, the post</h2>
          </div>
          <div className={s.buyGrid}>
            <div className={s.shop}>
              <Artwork slug="hive-and-honey-bee" alt="" inks={['var(--honey)']} className={s.shopBee} />
              <h3>The farm shop</h3>
              <p className={s.shopAddr}>418 Linden Hill Road, at the top of the lane</p>
              <p className={s.shopHours}>Friday and Saturday 9 am-5 pm, Sunday 10 am-4 pm</p>
              <p className={s.shopNote}>An honesty box by the gate on other days, with the three honeys we have most of.</p>
            </div>
            <div className={s.buyCol}>
              <h3>Markets</h3>
              <dl className={s.buyList}>
                {MARKETS.map(([d, w]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{w}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.buyCol}>
              <h3>Shops that stock us</h3>
              <ul className={s.stockists}>
                {STOCKISTS.map((st) => (
                  <li key={st.name}>
                    <strong>{st.name}</strong>
                    <span>{st.where}</span>
                    <small>{st.carry}</small>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.buyCol}>
              <h3>By post</h3>
              <p className={s.postNote}>Order by email with the honeys and sizes you want. We reply with the total and ship on Mondays.</p>
              <a className={s.postLink} href="mailto:orders@hiveandhoney.example">orders@hiveandhoney.example</a>
              <p className={s.postNote}>$8 a parcel, free from three jars.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Questions</p>
            <h2 id="faq-h">Asked at the stall every week</h2>
          </div>
          <div className={s.faqList}>
            {FAQ.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div className={s.footBrand}>
            <Artwork slug="hive-and-honey-dipper" alt="" inks={['var(--honey)']} className={s.footDipper} />
            <div>
              <p className={s.footName}>Hive &amp; Honey</p>
              <p className={s.footTag}>Raw honey from forty hives on Linden Hill.</p>
            </div>
          </div>
          <p className={s.footAddr}>
            418 Linden Hill Road
            <br />
            hello@hiveandhoney.example
            <br />
            (555) 014-2290
          </p>
        </div>
        <div className={s.footFine}>
          <p>A fictional honey farm. Honeys, prices and people are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
