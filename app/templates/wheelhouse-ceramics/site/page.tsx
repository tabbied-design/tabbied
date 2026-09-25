import { TabbiedPattern } from 'tabbied/react';
import { gritfield, lobe, raku, stylobate } from 'tabbied/patterns';
import s from './wheelhouse-ceramics.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Wheelhouse Ceramics: Pottery studio and shop, Mill Lane',
  description:
    'Wheelhouse Ceramics throws, glazes and sells pots on Mill Lane. Shop the shelf, learn the wheel in an eight-week class, join the open studio or bring your own work to be fired.',
};

/* Site colors. Every pot is cut out of a pattern in its glaze's colors:
   the first color is the glaze itself, so the silhouette always reads. */
const INK = '#2B211C';
const TERRA = '#C2643E';
const CELADON = '#6E8C7B';
const ASH = '#A1968C';
const SLIP = '#EADFD2';

const EMBER = [TERRA, SLIP, INK];
const GREEN = [CELADON, SLIP, INK];
const SPECKLE = [ASH, SLIP, INK];
const KILN = ['transparent', TERRA, CELADON, SLIP];
const GLAZE_RUN = ['transparent', TERRA, CELADON, ASH];

const NAV = [
  ['Shop', '#shop'],
  ['Classes', '#classes'],
  ['Open studio', '#studio'],
  ['Firing', '#firing'],
  ['Visit', '#visit'],
];

type Piece = {
  name: string;
  art: string;
  shape: string;
  size: string;
  price: string;
  stock: string;
};

const EMBER_PIECES: Piece[] = [
  { name: 'Market jug', art: 'wheelhouse-ceramics-jug', shape: 'jug', size: '1.2 qt, 8 in tall', price: '$68', stock: '3 on the shelf' },
  { name: 'Soup bowl', art: 'wheelhouse-ceramics-bowl', shape: 'bowl', size: '6.5 in across', price: '$38', stock: '6 on the shelf' },
  { name: 'Bud vase', art: 'wheelhouse-ceramics-vase', shape: 'vase', size: '7 in tall', price: '$44', stock: '2 on the shelf' },
];

const CELADON_PIECES: Piece[] = [
  { name: 'Serving bowl', art: 'wheelhouse-ceramics-bowl', shape: 'bowl', size: '11 in across', price: '$96', stock: '1 on the shelf' },
  { name: 'Water jug', art: 'wheelhouse-ceramics-jug', shape: 'jug', size: '2 qt, 10 in tall', price: '$84', stock: 'Made to order, 4 weeks' },
  { name: 'Tall vase', art: 'wheelhouse-ceramics-vase', shape: 'vase', size: '12 in tall', price: '$88', stock: '2 on the shelf' },
  { name: 'Breakfast bowl', art: 'wheelhouse-ceramics-bowl', shape: 'bowl', size: '5.5 in across', price: '$34', stock: '8 on the shelf' },
];

const ASH_PIECES: Piece[] = [
  { name: 'Milk jug', art: 'wheelhouse-ceramics-jug', shape: 'jug', size: '0.5 qt, 5 in tall', price: '$46', stock: '4 on the shelf' },
  { name: 'Stem vase', art: 'wheelhouse-ceramics-vase', shape: 'vase', size: '9 in tall', price: '$58', stock: 'Sold out, more in November' },
  { name: 'Nesting bowls', art: 'wheelhouse-ceramics-bowl', shape: 'bowl', size: 'Set of three, 4 to 7 in', price: '$110', stock: '2 sets on the shelf' },
];

const GLAZES = [
  { name: 'Ember', note: 'A rust red that breaks black on the rims', swatch: 'ember' },
  { name: 'Celadon', note: 'A pale green that pools in the throwing lines', swatch: 'celadon' },
  { name: 'Ash', note: 'Speckled stoneware under a clear satin', swatch: 'ash' },
];

const CLASSES = [
  { name: 'Wheel 1', what: 'Centering, pulling, trimming, your first dozen pots', when: 'Tuesdays, 6:30 to 9 pm', starts: 'Starts Oct 6', weeks: '8 weeks', price: '$360', left: '3 places left' },
  { name: 'Wheel 1, weekend', what: 'The same course, on Saturday mornings', when: 'Saturdays, 10 am to 12:30', starts: 'Starts Oct 10', weeks: '8 weeks', price: '$360', left: '1 place left' },
  { name: 'Wheel 2', what: 'Lids, handles, spouts and throwing off the hump', when: 'Wednesdays, 6:30 to 9 pm', starts: 'Starts Oct 7', weeks: '6 weeks', price: '$300', left: '5 places left' },
  { name: 'Handbuilding', what: 'Pinch, coil and slab, no wheel needed', when: 'Thursdays, 6:30 to 9 pm', starts: 'Starts Oct 8', weeks: '6 weeks', price: '$280', left: '4 places left' },
  { name: 'First pot', what: 'One evening on the wheel, for two or on your own', when: 'Fridays, 7 to 9 pm', starts: 'Every week', weeks: '1 evening', price: '$65', left: 'Book any Friday' },
];

const TIERS = [
  {
    name: 'Shelf',
    price: '$95',
    per: 'a month',
    lead: 'For people who have finished Wheel 1 and want to keep going.',
    items: ['Two open sessions a week', 'One shelf for work in progress', '12 lb of clay a month', 'Glaze and firing for anything that fits the shelf'],
  },
  {
    name: 'Bench',
    price: '$165',
    per: 'a month',
    lead: 'The one most members choose: every open hour, and a wheel you can book.',
    items: ['Every open studio hour', 'Two shelves and a locker', '25 lb of clay a month', 'Book a wheel ahead, up to twice a week'],
  },
  {
    name: 'Key',
    price: '$240',
    per: 'a month',
    lead: 'For working potters. Your own key and the studio at any hour.',
    items: ['Key access, 6 am to midnight', 'A bench space of your own', '50 lb of clay a month', 'Half a kiln shelf in every glaze firing'],
  },
];

const OPEN_HOURS = [
  ['Monday', '10 am to 9 pm'],
  ['Tuesday to Thursday', '10 am to 6 pm'],
  ['Friday', '10 am to 5 pm'],
  ['Sunday', '12 to 6 pm'],
];

const FIRING = [
  ['Bisque firing', '4 cents per cubic inch'],
  ['Glaze firing, cone 6', '6 cents per cubic inch'],
  ['Minimum per drop-off', '$8'],
  ['A whole kiln, your load', '$140'],
];

const FIRING_RULES = [
  'Stoneware and porcelain rated to cone 6 only.',
  'Bone dry for bisque, and waxed feet for glaze.',
  'Commercial glazes in their labeled jar, or ours from the glaze room.',
  'Work back in 10 days, usually sooner.',
];

const SHOP_HOURS = [
  ['Thursday and Friday', '11 am to 6 pm'],
  ['Saturday', '10 am to 6 pm'],
  ['Sunday', '12 to 5 pm'],
];

const FAQ = [
  {
    q: 'Is everything food safe?',
    a: 'Yes. All three glazes are tested lead free, and every piece is dishwasher and microwave safe. The unglazed feet will take a stain from red wine if you let them.',
  },
  {
    q: 'Do you ship?',
    a: 'Anywhere in the country, double boxed, for a flat $14. Pieces leave on Mondays. A pot that arrives broken is replaced, so send us a photo.',
  },
  {
    q: 'Can you make a set for a restaurant?',
    a: 'We take two commissions a season. Write with the pieces and the numbers you need; plates take about ten weeks for thirty covers.',
  },
  {
    q: 'What should I wear to a class?',
    a: 'Clothes you do not mind getting muddy, short nails, and hair tied back. Aprons and towels are here. Clay, glaze and firing are in the price.',
  },
];

export default function WheelhouseCeramicsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--clay': '#f6f1ea',
        '--ink': '#2b211c',
        '--terra': '#c2643e',
        '--celadon': '#6e8c7b',
        '--ash': '#a1968c',
        '--slip': '#eadfd2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="clay,ink,terra,celadon,ash,slip"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Young+Serif&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markDisc} aria-hidden="true" />
          <span data-edit="bar.text" data-edit-max="60">Wheelhouse Ceramics</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span data-edit="bar.barMeta" data-edit-max="60" className={s.barMeta}>Shop open Thu-Sun</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ SHOP
            The page opens on the shelf: a ruled grid of pots, each one cut
            out of a pattern in its glaze's colors. */}
        <section id="shop" className={s.shop} aria-labelledby="shop-h">
          <ul className={s.grid}>
            <li className={s.intro}>
              <p data-edit="shop.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Pottery studio and shop, 22 Mill Lane</p>
              <h1 data-edit="shop.title" data-edit-format="emphasis" data-edit-max="70" className={s.title} id="shop-h">
                Pots from the wheel, <em>glazed three ways.</em>
              </h1>
              <p data-edit="shop.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Everything on this shelf was thrown here, trimmed here and
                fired in the kiln at the back. Three glazes, a dozen shapes,
                and a price on every one. Order online or come and pick one up.
              </p>
              <ul className={s.glazes}>
                {GLAZES.map((g, i) => (
                  <li key={g.name}>
                    <span className={`${s.swatch} ${s[g.swatch]}`} aria-hidden="true" />
                    <strong data-edit={`shop.emphasis.${i}`}>{g.name}</strong>
                    <span data-edit={`shop.text.${i}`} data-edit-max="60">{g.note}</span>
                  </li>
                ))}
              </ul>
            </li>

            <li className={`${s.cell} ${s.feature}`}>
              <div className={s.cellArt}>
                <Artwork data-edit-pattern="shop.field" data-edit-roles="2,5,1" slug="wheelhouse-ceramics-vase" alt="A tall vase in the Ember glaze" mode="fill" inks={[]} className={`${s.pot} ${s.featureVase}`}>
                  <TabbiedPattern
                    pattern={raku}
                    palette={EMBER}
                    fit="grid"
                    cellSize={36}
                    seed="floor-vase"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </Artwork>
              </div>
              <div className={s.cap}>
                <span data-edit="shop.badge" data-edit-max="60" className={s.badge}>Piece of the month</span>
                <h2 data-edit="shop.capName" data-edit-max="60" className={s.capName}>Floor vase</h2>
                <span data-edit="shop.capGlaze" data-edit-max="60" className={s.capGlaze}>Ember, 18 in tall</span>
                <span data-edit="shop.capPrice" data-edit-max="60" className={s.capPrice}>$240</span>
                <span data-edit="shop.capStock" data-edit-max="60" className={s.capStock}>One of one</span>
              </div>
            </li>

            {EMBER_PIECES.map((p, i) => (
              <li key={p.name} className={s.cell}>
                <div className={s.cellArt}>
                  <Artwork data-edit-pattern={`shop.field2.${i}`} data-edit-roles="2,5,1" slug={p.art} alt={`${p.name} in the Ember glaze`} mode="fill" inks={[]} className={`${s.pot} ${s[p.shape]}`}>
                    <TabbiedPattern
                      pattern={raku}
                      palette={EMBER}
                      fit="grid"
                      cellSize={28}
                      seed={p.name}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                </div>
                <div className={s.cap}>
                  <h3 data-edit={`shop.capName2.${i}`} data-edit-max="40" className={s.capName}>{p.name}</h3>
                  <span className={s.capGlaze}>{`Ember, ${p.size}`}</span>
                  <span data-edit={`shop.capPrice2.${i}`} data-edit-max="60" className={s.capPrice}>{p.price}</span>
                  <span data-edit={`shop.capStock2.${i}`} data-edit-max="60" className={s.capStock}>{p.stock}</span>
                </div>
              </li>
            ))}

            {CELADON_PIECES.map((p, i) => (
              <li key={p.name} className={s.cell}>
                <div className={s.cellArt}>
                  <Artwork data-edit-pattern={`shop.field3.${i}`} data-edit-roles="3,5,1" slug={p.art} alt={`${p.name} in the Celadon glaze`} mode="fill" inks={[]} className={`${s.pot} ${s[p.shape]}`}>
                    <TabbiedPattern
                      pattern={lobe}
                      palette={GREEN}
                      fit="grid"
                      cellSize={24}
                      seed={p.name}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                </div>
                <div className={s.cap}>
                  <h3 data-edit={`shop.capName3.${i}`} data-edit-max="40" className={s.capName}>{p.name}</h3>
                  <span className={s.capGlaze}>{`Celadon, ${p.size}`}</span>
                  <span data-edit={`shop.capPrice3.${i}`} data-edit-max="60" className={s.capPrice}>{p.price}</span>
                  <span data-edit={`shop.capStock3.${i}`} data-edit-max="60" className={s.capStock}>{p.stock}</span>
                </div>
              </li>
            ))}

            {ASH_PIECES.map((p, i) => (
              <li key={p.name} className={s.cell}>
                <div className={s.cellArt}>
                  <Artwork data-edit-pattern={`shop.field4.${i}`} data-edit-roles="4,5,1" slug={p.art} alt={`${p.name} in the Ash glaze`} mode="fill" inks={[]} className={`${s.pot} ${s[p.shape]}`}>
                    <TabbiedPattern
                      pattern={gritfield}
                      palette={SPECKLE}
                      fit="grid"
                      cellSize={28}
                      seed={p.name}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                </div>
                <div className={s.cap}>
                  <h3 data-edit={`shop.capName4.${i}`} data-edit-max="40" className={s.capName}>{p.name}</h3>
                  <span className={s.capGlaze}>{`Ash, ${p.size}`}</span>
                  <span data-edit={`shop.capPrice4.${i}`} data-edit-max="60" className={s.capPrice}>{p.price}</span>
                  <span data-edit={`shop.capStock4.${i}`} data-edit-max="60" className={s.capStock}>{p.stock}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className={s.shopFoot}>
            <p data-edit="shop.body" data-edit-max="240" data-edit-multiline>Shipping is a flat $14. Pick-up is free, from the shop, Thursday to Sunday.</p>
            <a data-edit="shop.btn" data-edit-max="28" className={s.btn} href="#visit">Order or reserve a piece</a>
          </div>
        </section>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={`${s.secHead} ${s.tiledHead}`}>
            <div className={s.testTile} aria-hidden="true">
              <TabbiedPattern
                pattern={raku}
                palette={EMBER}
                fit="grid"
                cellSize={28}
                seed="test-tile"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="classes.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
            <h2 data-edit="classes.title" data-edit-max="60" id="classes-h">Wheel classes, fall term</h2>
            <p data-edit="classes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Eight people to a class, one wheel each. Clay, glazes, firing,
              aprons and tools are in the price, and you keep everything you make.
            </p>
          </div>
          <div className={s.schedule} role="table" aria-label="Class schedule">
            <div className={s.schedHead} role="row">
              <span data-edit="classes.text" data-edit-max="60" role="columnheader">Class</span>
              <span data-edit="classes.text2" data-edit-max="60" role="columnheader">When</span>
              <span data-edit="classes.text3" data-edit-max="60" role="columnheader">Length</span>
              <span data-edit="classes.text4" data-edit-max="60" role="columnheader">Price</span>
              <span data-edit="classes.text5" data-edit-max="60" role="columnheader">Places</span>
            </div>
            {CLASSES.map((c, i) => (
              <div key={c.name} className={s.schedRow} role="row">
                <div className={s.schedName} role="rowheader">
                  <strong data-edit={`classes.emphasis.${i}`}>{c.name}</strong>
                  <span data-edit={`classes.text6.${i}`} data-edit-max="60">{c.what}</span>
                </div>
                <div className={s.schedWhen} role="cell">
                  <span data-edit={`classes.text7.${i}`} data-edit-max="60">{c.when}</span>
                  <small data-edit={`classes.note.${i}`}>{c.starts}</small>
                </div>
                <span data-edit={`classes.schedWeeks.${i}`} data-edit-max="60" className={s.schedWeeks} role="cell">{c.weeks}</span>
                <span data-edit={`classes.schedPrice.${i}`} data-edit-max="60" className={s.schedPrice} role="cell">{c.price}</span>
                <span data-edit={`classes.schedLeft.${i}`} data-edit-max="60" className={s.schedLeft} role="cell">{c.left}</span>
              </div>
            ))}
          </div>
          <p data-edit="classes.schedNote" data-edit-max="240" data-edit-multiline className={s.schedNote}>
            Book a place at the shop or by email. Missed a week? Come to any
            open studio session that week instead.
          </p>
        </section>

        {/* ---------------------------------------------------------- STUDIO */}
        <section id="studio" className={s.studio} aria-labelledby="studio-h">
          <div className={s.studioEdge} aria-hidden="true">
            <TabbiedPattern
              pattern={lobe}
              palette={GLAZE_RUN}
              fit="grid"
              cellSize={36}
              seed="studio-edge"
              options={{ frequency: 0.5 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.studioInner}>
            <div className={s.secHead}>
              <p data-edit="studio.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
              <h2 data-edit="studio.title" data-edit-max="60" id="studio-h">Open studio membership</h2>
              <p data-edit="studio.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Twelve wheels, two slab rollers, a glaze room and three kilns.
                Month to month, and a month's notice to stop.
              </p>
            </div>
            <div className={s.tiers}>
              {TIERS.map((t, i) => (
                <article key={t.name} className={s.tier}>
                  <h3 data-edit={`tier.title.${i}`} data-edit-max="40">{t.name}</h3>
                  <p className={s.tierPrice}>
                    <strong data-edit={`tier.emphasis.${i}`}>{t.price}</strong>
                    <span data-edit={`tier.text.${i}`} data-edit-max="60">{t.per}</span>
                  </p>
                  <p data-edit={`tier.tierLead.${i}`} data-edit-max="240" data-edit-multiline className={s.tierLead}>{t.lead}</p>
                  <ul className={s.tierList}>
                    {t.items.map((item, i2) => (
                      <li data-edit={`tier.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className={s.openHours}>
              <h3 data-edit="studio.title2" data-edit-max="40">Open studio hours</h3>
              <dl>
                {OPEN_HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`studio.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`studio.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- FIRING
            The kiln shelf: a band of stacked blocks, then the price list. */}
        <section id="firing" className={s.firing} aria-labelledby="firing-h">
          <div data-edit-pattern="firing.field" data-edit-roles="transparent,2,3,5" className={s.kilnBand} aria-hidden="true">
            <TabbiedPattern
              pattern={stylobate}
              palette={KILN}
              fit="grid"
              cellSize={30}
              seed="kiln-shelf"
              options={{ frequency: 0.55 }}
              redrawInterval={8800}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.firingInner}>
            <div className={s.firingArt}>
              <Artwork data-edit-pattern="firing.field2" data-edit-roles="2,5,1" slug="wheelhouse-ceramics-bowl" alt="A bowl, glazed and fired" mode="fill" inks={[]} className={s.firingBowl}>
                <TabbiedPattern
                  pattern={lobe}
                  palette={EMBER}
                  fit="grid"
                  cellSize={30}
                  seed="firing-bowl"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </Artwork>
            </div>
            <div className={s.firingText}>
              <p data-edit="firing.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
              <h2 data-edit="firing.title" data-edit-max="60" id="firing-h">Firing for your own work</h2>
              <p data-edit="firing.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                No kiln at home? Bring your pots to the shop, we load them into
                our next firing, and you collect them from the same shelf.
              </p>
              <dl className={s.prices}>
                {FIRING.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`firing.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`firing.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className={s.rules}>
                {FIRING_RULES.map((r, i) => (
                  <li data-edit={`firing.item.${i}`} data-edit-max="80" key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Visit the shop</h2>
            <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The shop is the front room of the studio, so there is usually
              someone at a wheel while you look.
            </p>
          </div>
          <div className={s.visit}>
            <div className={s.visitCol}>
              <h3 data-edit="visit.title2" data-edit-max="40">Shop hours</h3>
              <dl className={s.hours}>
                {SHOP_HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <h3 data-edit="visit.title3" data-edit-max="40">Find us</h3>
              <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.addr}>
                22 Mill Lane, in the yard behind the old mill.
                <br />
                Parking in the yard; bikes by the door.
              </p>
              <p className={s.addr}>
                <a data-edit="visit.link" data-edit-max="28" href="mailto:hello@wheelhouse.example">hello@wheelhouse.example</a>
              </p>
              <p data-edit="visit.addr" data-edit-max="240" data-edit-multiline className={s.addr}>(555) 010-4471</p>
            </div>
            <div className={s.faq}>
              {FAQ.map((f, i) => (
                <details key={f.q}>
                  <summary data-edit={`visit.question.${i}`} data-edit-max="80">{f.q}</summary>
                  <p data-edit={`visit.body2.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div className={s.footPlate} aria-hidden="true">
            <TabbiedPattern
              pattern={lobe}
              palette={GREEN}
              fit="grid"
              cellSize={24}
              seed="foot-plate"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Wheelhouse Ceramics</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional pottery. Pieces, prices and classes are invented.</p>
          <p className={s.credit}>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
