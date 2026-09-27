import { TabbiedPattern } from 'tabbied/react';
import { stylobate, foliage, frond, picket } from 'tabbied/patterns';
import s from './rowan-street-allotments.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Rowan Street Allotments: Allotment society and community garden, Canal Ward',
  description:
    'Thirty-odd plots behind the railway on Rowan Street. The site map, the waiting list and rents, the society shop, the shed noticeboard and a growing calendar for Canal Ward.',
};

/* Site colors. Crops on the plot map are small pattern fields with a
   transparent ground, so the plot's own soil shows between the rows. */
const SOIL = '#ede6d6';
const DARK = '#22251d';
const GREEN = '#3f7a3a';
const TERRACOTTA = '#c3623c';
const SKY = '#8db7d2';

const TERRACES = ['transparent', GREEN, TERRACOTTA, GREEN, DARK, GREEN];
const BEANS = ['transparent', GREEN, DARK, GREEN, GREEN, TERRACOTTA];
const SALAD = ['transparent', GREEN, SKY, GREEN, TERRACOTTA, GREEN];
const CHARD = ['transparent', GREEN, TERRACOTTA, DARK, GREEN, GREEN];
const PLOT14 = ['transparent', GREEN, TERRACOTTA, DARK, GREEN, SKY];
const HALVES = ['transparent', GREEN, SOIL, TERRACOTTA, GREEN, DARK];
const SEEDBED = ['transparent', GREEN, GREEN, DARK, GREEN, TERRACOTTA];
const FENCE = ['transparent', SOIL, SKY, SOIL, TERRACOTTA, SOIL];

const NAV = [
  ['The site', '#site'],
  ['Get a plot', '#plot'],
  ['Shop', '#shop'],
  ['Notices', '#notices'],
  ['Calendar', '#calendar'],
  ['Rules', '#rules'],
  ['Contact', '#contact'],
];

const HOTSPOTS = [
  { n: '1', name: 'The shed', note: 'Seed trays on the bench and the kettle. The padlock code is on your key fob.', x: '41%', y: '19%' },
  { n: '2', name: 'The greenhouse', note: 'Last tomatoes still ripening. The cucumbers finished on Thursday.', x: '69%', y: '27%' },
  { n: '3', name: 'The water butt', note: 'Full after Tuesday\'s rain. Cans only, no hosepipes.', x: '25%', y: '38%' },
  { n: '4', name: 'The bean rows', note: 'Runners picked on Saturday: the last flush before the frost.', x: '73%', y: '63%' },
];

const STATS = [
  ['34', 'plots, full and half'],
  ['4', 'raised beds for wheelchair users'],
  ['1952', 'the year the railway gave us the land'],
];

type Plot = {
  id: string;
  label: string;
  col: string;
  row: string;
  kind: 'plot' | 'vacant' | 'cropped' | 'mine' | 'shed' | 'trough' | 'compost' | 'hut' | 'raised' | 'gate';
  crop?: 'beans' | 'salad' | 'chard' | 'terraces';
  note?: string;
};

const PLOTS: Plot[] = [
  { id: 'p1', label: '1', col: '1 / 3', row: '2 / 4', kind: 'cropped', crop: 'beans', note: 'Beans' },
  { id: 'p2', label: '2', col: '3 / 5', row: '2 / 4', kind: 'plot' },
  { id: 'p3', label: '3', col: '5 / 6', row: '2 / 4', kind: 'plot' },
  { id: 'p4', label: '4', col: '6 / 7', row: '2 / 4', kind: 'vacant', note: 'Vacant' },
  { id: 'p5', label: '5', col: '8 / 10', row: '2 / 4', kind: 'cropped', crop: 'salad', note: 'Salads' },
  { id: 'p6', label: '6', col: '10 / 12', row: '2 / 4', kind: 'plot' },
  { id: 'p7', label: '7', col: '12 / 14', row: '2 / 4', kind: 'vacant', note: 'Vacant' },
  { id: 'tr1', label: 'Trough', col: '14 / 16', row: '2 / 3', kind: 'trough' },
  { id: 'shed', label: 'Society shed', col: '14 / 16', row: '3 / 4', kind: 'shed' },
  { id: 'p8', label: '8', col: '1 / 3', row: '5 / 7', kind: 'cropped', crop: 'chard', note: 'Chard' },
  { id: 'p9', label: '9', col: '3 / 5', row: '5 / 7', kind: 'vacant', note: 'Vacant' },
  { id: 'p10', label: '10', col: '5 / 6', row: '5 / 7', kind: 'plot' },
  { id: 'p11', label: '11', col: '6 / 7', row: '5 / 7', kind: 'plot' },
  { id: 'p12', label: '12', col: '8 / 10', row: '5 / 7', kind: 'plot' },
  { id: 'p13', label: '13', col: '10 / 12', row: '5 / 7', kind: 'plot' },
  { id: 'p14', label: '14', col: '12 / 14', row: '5 / 7', kind: 'mine', crop: 'terraces', note: 'Plot 14' },
  { id: 'cmp', label: 'Compost bays', col: '14 / 16', row: '5 / 7', kind: 'compost' },
  { id: 'p15', label: '15', col: '1 / 3', row: '8 / 10', kind: 'plot' },
  { id: 'rb', label: 'Raised beds A-D', col: '3 / 5', row: '8 / 10', kind: 'raised' },
  { id: 'p16', label: '16', col: '5 / 7', row: '8 / 10', kind: 'plot' },
  { id: 'p17', label: '17', col: '8 / 10', row: '8 / 10', kind: 'vacant', note: 'Vacant' },
  { id: 'p18', label: '18', col: '10 / 12', row: '8 / 10', kind: 'plot' },
  { id: 'hut', label: 'Trading hut', col: '12 / 14', row: '8 / 10', kind: 'hut' },
  { id: 'tr2', label: 'Trough', col: '14 / 16', row: '8 / 9', kind: 'trough' },
  { id: 'gate', label: 'Gate', col: '14 / 16', row: '9 / 10', kind: 'gate' },
];

const KEY = [
  ['plot', 'Tenanted plot'],
  ['vacant', 'Vacant, ready to let'],
  ['mine', 'Plot 14, in the picture above'],
  ['trough', 'Water trough'],
  ['compost', 'Compost bays'],
  ['path', 'Grass path'],
];

const RENTS = [
  { name: 'Full plot', size: '250 m2', price: '$64', per: 'a year' },
  { name: 'Half plot', size: '125 m2', price: '$36', per: 'a year' },
  { name: 'Raised bed', size: '6 m2, waist high', price: '$20', per: 'a year' },
];

const WELCOME = [
  'A gate key and the shed padlock code',
  'A water trough within twenty metres',
  'A share of the compost bays',
  '5 kg of seed potatoes, our treat',
  'A mentor from the next plot for your first year',
];

const SHOP = [
  ['Seed potatoes, Charlotte', 'per kg', '$2.40'],
  ['Seed potatoes, Pink Fir Apple', 'per kg', '$2.80'],
  ['Onion sets, Sturon', '250 g', '$1.60'],
  ['Garlic, Solent Wight', '3 bulbs', '$4.50'],
  ['Peat-free compost', '60 L bag', '$6.50'],
  ['Chicken manure pellets', '4 kg tub', '$7.00'],
  ['Bamboo canes, 8 ft', 'bundle of 10', '$4.00'],
  ['Horticultural fleece', '10 m roll', '$5.00'],
];

type Notice = { kind: 'poster' | 'card' | 'tabs' | 'note' | 'result' | 'list'; title: string; body: string; foot?: string };

const NOTICES: Notice[] = [
  { kind: 'poster', title: 'Open Day', body: 'Saturday 11 October, 11-3. Soup, tours of the plots, and plot 7\'s giant pumpkin before it goes to the school.', foot: 'Bring your neighbours' },
  { kind: 'result', title: 'Show results', body: 'Biggest marrow: plot 22, Mr Okafor, 14.2 kg. Longest runner bean: plot 5, 51 cm. Best jam: Sal, plot 3.', foot: 'Cup presented at the AGM' },
  { kind: 'card', title: 'Working party', body: 'Sunday 19 October, 10:00. Clearing the brambles by the railway fence. Gloves and tea provided.', foot: 'Meet at the shed' },
  { kind: 'tabs', title: 'Free rhubarb crowns', body: 'Dividing mine. Four big crowns, first come.', foot: 'Sal, plot 3' },
  { kind: 'note', title: 'Lost', body: 'Blue metal watering can with a brass rose. Please leave it by plot 9.', foot: 'Thank you, Dev' },
  { kind: 'list', title: 'AGM', body: 'Wednesday 12 November, 19:30, Canal Ward library. Rents, the new trough and the hedge.', foot: 'All tenants welcome' },
];

type Bar = [kind: 'sow' | 'plant' | 'pick', from: number, to: number];

const CALENDAR: { crop: string; bars: Bar[] }[] = [
  { crop: 'Potatoes', bars: [['plant', 3, 5], ['pick', 6, 10]] },
  { crop: 'Onion sets', bars: [['plant', 3, 5], ['pick', 7, 9]] },
  { crop: 'Garlic', bars: [['pick', 6, 8], ['plant', 10, 12]] },
  { crop: 'Broad beans', bars: [['sow', 2, 4], ['pick', 6, 8], ['sow', 11, 12]] },
  { crop: 'Runner beans', bars: [['sow', 5, 7], ['pick', 7, 11]] },
  { crop: 'Tomatoes', bars: [['sow', 3, 4], ['plant', 5, 7], ['pick', 7, 10]] },
  { crop: 'Leeks', bars: [['pick', 1, 3], ['sow', 3, 5], ['plant', 6, 8], ['pick', 10, 13]] },
  { crop: 'Courgettes', bars: [['sow', 4, 6], ['plant', 6, 7], ['pick', 7, 10]] },
];

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const RULES = [
  'Keep three quarters of your plot cultivated by the end of June.',
  'Water from the troughs with a can. No hosepipes, no sprinklers.',
  'Bonfires November to February only, lit before 10:00 and watched.',
  'Sheds no bigger than 6 x 4 ft, and never on a path.',
  'No carpet or plastic sheet as mulch; it ends up in the soil.',
  'Dogs on a lead, and lock the gate behind you, every time.',
  'Plots are walked by the committee in May and August.',
  'Rent is due on 1 October. Ask Maureen if that is hard this year.',
];

export default function RowanStreetAllotmentsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--soil': '#ede6d6',
        '--dark': '#22251d',
        '--green': '#3f7a3a',
        '--terracotta': '#c3623c',
        '--sky': '#8db7d2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="soil,dark,green,terracotta,sky"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Bitter:ital,wght@0,400..800;1,400..600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markGlyph} aria-hidden="true" />
          <span className={s.markText}>
            <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Rowan Street</span>
            <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Allotment Society</span>
          </span>
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
        {/* ------------------------------------------------------------ HERO
            Plot 14 as an isometric diorama, with numbered pegs over the
            shed, the greenhouse, the water butt and the beans. Terraced
            beds, the lead pattern, step down under it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,2,1,2" className={s.terraces} aria-hidden="true">
            <TabbiedPattern
              pattern={stylobate}
              palette={TERRACES}
              options={{ frequency: 0.8 }}
              fit="grid"
              cellSize={40}
              seed="rowan-terraces"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Allotment society and community garden, Canal Ward</p>
            <h1 data-edit="hero.title" data-edit-max="70" id="hero-h" className={s.title}>Rowan Street Allotments</h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Thirty-four plots on a strip of old railway land behind the arches,
              worked by teachers, bus drivers, two retired surgeons and a lot of
              children. There is a shed, a kettle and a waiting list.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#plot">Join the waiting list</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#site">See the site map</a>
            </div>
            <dl className={s.stats}>
              {STATS.map(([n, what], i) => (
                <div key={what}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{n}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className={s.diorama}>
            <p className={s.dioramaTag}>
              <span data-edit="hero.dioramaTitle" data-edit-max="60" className={s.dioramaTitle}>Plot 14, this week</span>
              <span data-edit="hero.dioramaDate" data-edit-max="60" className={s.dioramaDate}>Week of 22 September</span>
            </p>
            <div className={s.dioramaStage}>
              <Artwork
                slug="rowan-street-allotments-plot"
                alt="An isometric view of an allotment plot: a wooden shed with a water butt, a lean-to greenhouse, raised beds of vegetables, bean rows and a wheelbarrow"
                inks={{ yellow: 'color-mix(in oklab, var(--soil) 72%, var(--terracotta))', blue: 'var(--green)', red: 'var(--terracotta)', black: 'var(--dark)' }}
                className={s.dioramaArt}
              />
              {HOTSPOTS.map((h) => (
                <span key={h.n} className={s.hotspot} style={{ left: h.x, top: h.y }} aria-hidden="true">
                  {h.n}
                </span>
              ))}
            </div>
            <figcaption className={s.diary}>
              <ol className={s.diaryList}>
                {HOTSPOTS.map((h, i) => (
                  <li key={h.n}>
                    <span data-edit={`hero.diaryNo.${i}`} data-edit-max="60" className={s.diaryNo}>{h.n}</span>
                    <span data-edit={`hero.diaryName.${i}`} data-edit-max="60" className={s.diaryName}>{h.name}</span>
                    <span data-edit={`hero.diaryNote.${i}`} data-edit-max="60" className={s.diaryNote}>{h.note}</span>
                  </li>
                ))}
              </ol>
            </figcaption>
          </figure>
        </section>

        {/* ------------------------------------------------------------ SITE
            The plot map: a CSS grid of numbered plots, paths, the troughs,
            the compost bays and the huts. A few plots carry their crops as
            small pattern fields. */}
        <section id="site" className={s.sec} aria-labelledby="site-h">
          <div className={s.secHead}>
            <h2 data-edit="site.secTitle" data-edit-max="60" id="site-h" className={s.secTitle}>The site</h2>
            <p data-edit="site.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              In through the gate on Rowan Street, up the main path, and the
              railway at the top. Four plots are free this autumn; the dashed
              ones on the map.
            </p>
          </div>

          <div className={s.mapWrap}>
            <div className={s.mapScroll}>
            <div className={s.map} role="img" aria-label="Site map of the allotments: 18 plots in three rows either side of a main path, with the railway along the top, Rowan Street along the bottom, troughs, compost bays, the society shed and the trading hut">
              <span data-edit="site.railway" data-edit-max="60" className={s.railway}>Railway, Canal Ward line</span>
              <span className={s.pathMain} aria-hidden="true" />
              <span className={`${s.pathCross} ${s.pathCrossA}`} aria-hidden="true" />
              <span className={`${s.pathCross} ${s.pathCrossB}`} aria-hidden="true" />
              {PLOTS.map((p, i) => (
                <span
                  key={p.id}
                  className={`${s.cell} ${s[p.kind]}`}
                  style={{ gridColumn: p.col, gridRow: p.row }}>
                  {p.crop === 'beans' && (
                    <span data-edit-pattern={`site.field.${i}`} data-edit-roles="transparent,2,1,2,2,3" className={s.crop} aria-hidden="true">
                      <TabbiedPattern pattern={picket} palette={BEANS} fit="grid" cellSize={14} seed="rowan-beans" style={{ position: 'absolute', inset: 0 }} />
                    </span>
                  )}
                  {p.crop === 'salad' && (
                    <span data-edit-pattern={`site.field2.${i}`} data-edit-roles="transparent,2,4,2,3,2" className={s.crop} aria-hidden="true">
                      <TabbiedPattern pattern={foliage} palette={SALAD} options={{ frequency: 0.8 }} fit="grid" cellSize={18} seed="rowan-salad" style={{ position: 'absolute', inset: 0 }} />
                    </span>
                  )}
                  {p.crop === 'chard' && (
                    <span data-edit-pattern={`site.field3.${i}`} data-edit-roles="transparent,2,3,1,2,2" className={s.crop} aria-hidden="true">
                      <TabbiedPattern pattern={frond} palette={CHARD} options={{ frequency: 0.8 }} fit="grid" cellSize={18} seed="rowan-chard" style={{ position: 'absolute', inset: 0 }} />
                    </span>
                  )}
                  {p.crop === 'terraces' && (
                    <span data-edit-pattern={`site.field4.${i}`} data-edit-roles="transparent,2,3,1,2,4" className={s.crop} aria-hidden="true">
                      <TabbiedPattern pattern={stylobate} palette={PLOT14} fit="grid" cellSize={16} seed="rowan-plot14" style={{ position: 'absolute', inset: 0 }} />
                    </span>
                  )}
                  <span data-edit={`site.cellLabel.${i}`} data-edit-max="60" className={s.cellLabel}>{p.label}</span>
                  {p.note && <span data-edit={`site.cellNote.${i}`} data-edit-max="60" className={s.cellNote}>{p.note}</span>}
                </span>
              ))}
              <span data-edit="site.street" data-edit-max="60" className={s.street}>Rowan Street</span>
            </div>
            </div>

            <ul className={s.key}>
              {KEY.map(([kind, label], i) => (
                <li key={kind}>
                  <span className={`${s.swatch} ${s[`sw_${kind}`]}`} aria-hidden="true" />
                  <span data-edit={`site.text.${i}`} data-edit-max="60">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ PLOT */}
        <section id="plot" className={`${s.sec} ${s.plotSec}`} aria-labelledby="plot-h">
          <div className={s.secHead}>
            <h2 data-edit="plot.secTitle" data-edit-max="60" id="plot-h" className={s.secTitle}>Get a plot</h2>
            <p data-edit="plot.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The waiting list has 23 names and moves at about two a month. Canal
              Ward residents come first; after that, anyone within walking distance.
            </p>
          </div>

          <div className={s.plotGrid}>
            <div className={s.sizes}>
              <div className={s.fullPlot}>
                <div data-edit-pattern="plot.field" data-edit-roles="transparent,2,0,3,2,1" className={s.halvesField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={stylobate}
                    palette={HALVES}
                    options={{ frequency: 0.7 }}
                    fit="grid"
                    cellSize={32}
                    seed="rowan-halves"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <span className={s.halfLine} aria-hidden="true" />
                <span data-edit="plot.sizeTag" data-edit-max="60" className={`${s.sizeTag} ${s.sizeTagA}`}>Half plot, 10 x 12.5 m</span>
                <span data-edit="plot.sizeTag2" data-edit-max="60" className={`${s.sizeTag} ${s.sizeTagB}`}>Half plot, 10 x 12.5 m</span>
              </div>
              <p data-edit="plot.sizeCaption" data-edit-max="240" data-edit-multiline className={s.sizeCaption}>A full plot is 10 by 25 metres: the whole rectangle. Most new tenants start with half, and nobody minds.</p>
            </div>

            <div className={s.tenancy}>
              <ul className={s.rents}>
                {RENTS.map((r, i) => (
                  <li key={r.name}>
                    <span data-edit={`plot.rentName.${i}`} data-edit-max="60" className={s.rentName}>{r.name}</span>
                    <span data-edit={`plot.rentSize.${i}`} data-edit-max="60" className={s.rentSize}>{r.size}</span>
                    <span className={s.rentPrice}>
                      <strong data-edit={`plot.emphasis.${i}`}>{r.price}</strong> {r.per}
                    </span>
                  </li>
                ))}
              </ul>
              <p data-edit="plot.concession" data-edit-max="240" data-edit-multiline className={s.concession}>Half price for anyone on a pension or benefits. Nobody is asked to show anything.</p>

              <h3 data-edit="plot.welcomeTitle" data-edit-max="40" className={s.welcomeTitle}>A new tenant gets</h3>
              <ul className={s.welcome}>
                {WELCOME.map((w, i) => (
                  <li data-edit={`plot.item.${i}`} data-edit-max="80" key={w}>{w}</li>
                ))}
              </ul>

              <form className={s.form} action="#">
                <h3 data-edit="plot.formTitle" data-edit-max="40" className={s.formTitle}>Put my name down</h3>
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label data-edit="plot.label" htmlFor="rs-name">Name</label>
                    <input id="rs-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="plot.label2" htmlFor="rs-email">Email</label>
                    <input id="rs-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="plot.label3" htmlFor="rs-size">Size</label>
                    <select id="rs-size" name="size" defaultValue="half">
                      <option value="half">Half plot</option>
                      <option value="full">Full plot</option>
                      <option value="raised">Raised bed</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="plot.label4" htmlFor="rs-postcode">Street</label>
                    <input id="rs-postcode" name="street" type="text" autoComplete="address-line1" />
                  </div>
                </div>
                <button data-edit="plot.btn" data-edit-max="24" className={s.btn} type="submit">Add me to the list</button>
              </form>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ SHOP */}
        <section id="shop" className={s.sec} aria-labelledby="shop-h">
          <div className={s.shopGrid}>
            <div className={s.shopIntro}>
              <h2 data-edit="shop.secTitle" data-edit-max="60" id="shop-h" className={s.secTitle}>The society shop</h2>
              <p data-edit="shop.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                In the trading hut by the gate, Sunday mornings 10:00-12:00 from
                February to October. Bought in bulk and sold at what it cost us,
                plus a little for the hedge fund.
              </p>
              <p className={s.shopHours}>
                <span data-edit="shop.text" data-edit-max="60">Open</span>
                <strong data-edit="shop.emphasis">Sundays 10-12</strong>
              </p>
            </div>
            <div className={s.chalkboard}>
              <p data-edit="shop.chalkTitle" data-edit-max="240" data-edit-multiline className={s.chalkTitle}>This week in the hut</p>
              <ul className={s.prices}>
                {SHOP.map(([item, unit, price], i) => (
                  <li key={item}>
                    <span data-edit={`shop.priceItem.${i}`} data-edit-max="60" className={s.priceItem}>{item}</span>
                    <span data-edit={`shop.priceUnit.${i}`} data-edit-max="60" className={s.priceUnit}>{unit}</span>
                    <span className={s.priceLeader} aria-hidden="true" />
                    <span data-edit={`shop.priceValue.${i}`} data-edit-max="60" className={s.priceValue}>{price}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="shop.chalkFoot" data-edit-max="240" data-edit-multiline className={s.chalkFoot}>Cash or card. Members only, but joining is at the counter.</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- NOTICES
            The shed door: a cork board with paper notices pinned at angles,
            one of them with tear-off tabs. */}
        <section id="notices" className={s.sec} aria-labelledby="notices-h">
          <div className={s.secHead}>
            <h2 data-edit="notices.secTitle" data-edit-max="60" id="notices-h" className={s.secTitle}>On the shed door</h2>
            <p data-edit="notices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Pinned up this month. Take a tab if you want the rhubarb.</p>
          </div>

          <div className={s.cork}>
            <ul className={s.notices}>
              {NOTICES.map((n, i) => (
                <li key={n.title} className={`${s.notice} ${s[`n_${n.kind}`]}`}>
                  <span className={s.pin} aria-hidden="true" />
                  <h3 data-edit={`notices.noticeTitle.${i}`} data-edit-max="40" className={s.noticeTitle}>{n.title}</h3>
                  <p data-edit={`notices.noticeBody.${i}`} data-edit-max="240" data-edit-multiline className={s.noticeBody}>{n.body}</p>
                  {n.foot && <p data-edit={`notices.noticeFoot.${i}`} data-edit-max="240" data-edit-multiline className={s.noticeFoot}>{n.foot}</p>}
                  {n.kind === 'tabs' && (
                    <span className={s.tabs} aria-hidden="true">
                      <span data-edit={`notices.text.${i}`} data-edit-max="60">Plot 3</span>
                      <span data-edit={`notices.text2.${i}`} data-edit-max="60">Plot 3</span>
                      <span data-edit={`notices.text3.${i}`} data-edit-max="60">Plot 3</span>
                      <span data-edit={`notices.text4.${i}`} data-edit-max="60">Plot 3</span>
                      <span data-edit={`notices.text5.${i}`} data-edit-max="60">Plot 3</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- CALENDAR */}
        <section id="calendar" className={s.sec} aria-labelledby="cal-h">
          <div className={s.secHead}>
            <h2 data-edit="calendar.secTitle" data-edit-max="60" id="cal-h" className={s.secTitle}>Growing calendar</h2>
            <p data-edit="calendar.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>What the committee sows, plants out and picks on this site, which is sheltered by the arches and a fortnight ahead of the hills.</p>
          </div>

          <div data-edit-pattern="calendar.field" data-edit-roles="transparent,2,2,1,2,3" className={s.seedbed} aria-hidden="true">
            <TabbiedPattern
              pattern={frond}
              palette={SEEDBED}
              options={{ frequency: 0.55 }}
              fit="grid"
              cellSize={24}
              seed="rowan-seedbed"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.calScroll}>
            <div className={s.cal}>
              <span data-edit="calendar.calCorner" data-edit-max="60" className={s.calCorner}>Crop</span>
              {MONTHS.map((m, i) => (
                <span data-edit={`calendar.calMonth.${i}`} data-edit-max="60" key={`${m}-${i}`} className={i === 8 ? `${s.calMonth} ${s.calNow}` : s.calMonth} style={{ gridColumn: i + 2 }}>{m}</span>
              ))}
              {CALENDAR.map((row, r) => (
                <div key={row.crop} className={s.calRow} style={{ '--row': r + 2 } as React.CSSProperties}>
                  <span data-edit={`calendar.calCrop.${r}`} data-edit-max="60" className={s.calCrop}>{row.crop}</span>
                  {row.bars.map(([kind, from, to]) => (
                    <span
                      key={`${kind}-${from}`}
                      className={`${s.calBar} ${s[kind]}`}
                      style={{ gridColumn: `${from + 1} / ${to + 1}` }}>
                      {kind === 'sow' ? 'Sow' : kind === 'plant' ? 'Plant' : 'Pick'}
                    </span>
                  ))}
                </div>
              ))}
              <span className={s.nowLine} aria-hidden="true" />
            </div>
          </div>
          <ul className={s.calKey}>
            <li data-edit="calendar.item" data-edit-format="emphasis" data-edit-max="80"><span className={`${s.calSwatch} ${s.sow}`} aria-hidden="true" />Sow</li>
            <li data-edit="calendar.item2" data-edit-format="emphasis" data-edit-max="80"><span className={`${s.calSwatch} ${s.plant}`} aria-hidden="true" />Plant out</li>
            <li data-edit="calendar.item3" data-edit-format="emphasis" data-edit-max="80"><span className={`${s.calSwatch} ${s.pick}`} aria-hidden="true" />Pick</li>
            <li data-edit="calendar.item4" data-edit-format="emphasis" data-edit-max="80"><span className={s.calNowKey} aria-hidden="true" />This month</li>
          </ul>
        </section>

        {/* ----------------------------------------------------------- RULES */}
        <section id="rules" className={`${s.sec} ${s.rulesSec}`} aria-labelledby="rules-h">
          <div className={s.secHead}>
            <h2 data-edit="rules.secTitle" data-edit-max="60" id="rules-h" className={s.secTitle}>The rules, kept short</h2>
            <p data-edit="rules.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Agreed at the AGM and pinned inside the shed. The full tenancy agreement is two pages and we will post you a copy.</p>
          </div>
          <ol className={s.rules}>
            {RULES.map((r, i) => (
              <li data-edit={`rules.item.${i}`} data-edit-max="80" key={r}>{r}</li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Find us, write to us</h2>
              <p data-edit="contact.body3" data-edit-max="240" data-edit-multiline className={s.address}>
                The green gate under the railway arch,
                <br />
                Rowan Street, Canal Ward
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Secretary</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Maureen Achebe, plot 11</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="mailto:secretary@rowanstreetallotments.example">secretary@rowanstreetallotments.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="tel:+15550164420">(555) 016-4420</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Visitors</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Sundays 10:00-12:00, when the hut is open</dd>
                </div>
              </dl>
            </div>
            <form className={s.letter} action="#">
              <p data-edit="contact.letterTitle" data-edit-max="240" data-edit-multiline className={s.letterTitle}>Dear committee,</p>
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="rs-c-name">Your name</label>
                <input id="rs-c-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="rs-c-email">Email</label>
                <input id="rs-c-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="rs-c-msg">Message</label>
                <textarea id="rs-c-msg" name="message" rows={5} />
              </div>
              <button data-edit="contact.btn" data-edit-max="24" className={s.btn} type="submit">Post it through the shed door</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,4,0,3,0" className={s.fence} aria-hidden="true">
          <TabbiedPattern
            pattern={picket}
            palette={FENCE}
            fit="grid"
            cellSize={32}
            seed="rowan-fence"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Rowan Street Allotments</p>
          <div className={s.footText}>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional allotment society; the plots, tenants, prices and marrows are invented.</p>
            <p>
              Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>Plot 14 is a generated image, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
