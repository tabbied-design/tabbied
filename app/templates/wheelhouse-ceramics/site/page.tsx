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
    <div className={s.page}>
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
          <span>Wheelhouse Ceramics</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span className={s.barMeta}>Shop open Thu-Sun</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
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
              <p className={s.kicker}>Pottery studio and shop, 22 Mill Lane</p>
              <h1 className={s.title} id="shop-h">
                Pots from the wheel, <em>glazed three ways.</em>
              </h1>
              <p className={s.lede}>
                Everything on this shelf was thrown here, trimmed here and
                fired in the kiln at the back. Three glazes, a dozen shapes,
                and a price on every one. Order online or come and pick one up.
              </p>
              <ul className={s.glazes}>
                {GLAZES.map((g) => (
                  <li key={g.name}>
                    <span className={`${s.swatch} ${s[g.swatch]}`} aria-hidden="true" />
                    <strong>{g.name}</strong>
                    <span>{g.note}</span>
                  </li>
                ))}
              </ul>
            </li>

            <li className={`${s.cell} ${s.feature}`}>
              <div className={s.cellArt}>
                <Artwork slug="wheelhouse-ceramics-vase" alt="A tall vase in the Ember glaze" mode="fill" inks={[]} className={`${s.pot} ${s.featureVase}`}>
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
                <span className={s.badge}>Piece of the month</span>
                <h2 className={s.capName}>Floor vase</h2>
                <span className={s.capGlaze}>Ember, 18 in tall</span>
                <span className={s.capPrice}>$240</span>
                <span className={s.capStock}>One of one</span>
              </div>
            </li>

            {EMBER_PIECES.map((p) => (
              <li key={p.name} className={s.cell}>
                <div className={s.cellArt}>
                  <Artwork slug={p.art} alt={`${p.name} in the Ember glaze`} mode="fill" inks={[]} className={`${s.pot} ${s[p.shape]}`}>
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
                  <h3 className={s.capName}>{p.name}</h3>
                  <span className={s.capGlaze}>{`Ember, ${p.size}`}</span>
                  <span className={s.capPrice}>{p.price}</span>
                  <span className={s.capStock}>{p.stock}</span>
                </div>
              </li>
            ))}

            {CELADON_PIECES.map((p) => (
              <li key={p.name} className={s.cell}>
                <div className={s.cellArt}>
                  <Artwork slug={p.art} alt={`${p.name} in the Celadon glaze`} mode="fill" inks={[]} className={`${s.pot} ${s[p.shape]}`}>
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
                  <h3 className={s.capName}>{p.name}</h3>
                  <span className={s.capGlaze}>{`Celadon, ${p.size}`}</span>
                  <span className={s.capPrice}>{p.price}</span>
                  <span className={s.capStock}>{p.stock}</span>
                </div>
              </li>
            ))}

            {ASH_PIECES.map((p) => (
              <li key={p.name} className={s.cell}>
                <div className={s.cellArt}>
                  <Artwork slug={p.art} alt={`${p.name} in the Ash glaze`} mode="fill" inks={[]} className={`${s.pot} ${s[p.shape]}`}>
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
                  <h3 className={s.capName}>{p.name}</h3>
                  <span className={s.capGlaze}>{`Ash, ${p.size}`}</span>
                  <span className={s.capPrice}>{p.price}</span>
                  <span className={s.capStock}>{p.stock}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className={s.shopFoot}>
            <p>Shipping is a flat $14. Pick-up is free, from the shop, Thursday to Sunday.</p>
            <a className={s.btn} href="#visit">Order or reserve a piece</a>
          </div>
        </section>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={s.secHead}>
            <p className={s.secNo}>02</p>
            <h2 id="classes-h">Wheel classes, fall term</h2>
            <p className={s.secNote}>
              Eight people to a class, one wheel each. Clay, glazes, firing,
              aprons and tools are in the price, and you keep everything you make.
            </p>
          </div>
          <div className={s.schedule} role="table" aria-label="Class schedule">
            <div className={s.schedHead} role="row">
              <span role="columnheader">Class</span>
              <span role="columnheader">When</span>
              <span role="columnheader">Length</span>
              <span role="columnheader">Price</span>
              <span role="columnheader">Places</span>
            </div>
            {CLASSES.map((c) => (
              <div key={c.name} className={s.schedRow} role="row">
                <div className={s.schedName} role="rowheader">
                  <strong>{c.name}</strong>
                  <span>{c.what}</span>
                </div>
                <div className={s.schedWhen} role="cell">
                  <span>{c.when}</span>
                  <small>{c.starts}</small>
                </div>
                <span className={s.schedWeeks} role="cell">{c.weeks}</span>
                <span className={s.schedPrice} role="cell">{c.price}</span>
                <span className={s.schedLeft} role="cell">{c.left}</span>
              </div>
            ))}
          </div>
          <p className={s.schedNote}>
            Book a place at the shop or by email. Missed a week? Come to any
            open studio session that week instead.
          </p>
        </section>

        {/* ---------------------------------------------------------- STUDIO */}
        <section id="studio" className={s.studio} aria-labelledby="studio-h">
          <div className={s.studioInner}>
            <div className={s.secHead}>
              <p className={s.secNo}>03</p>
              <h2 id="studio-h">Open studio membership</h2>
              <p className={s.secNote}>
                Twelve wheels, two slab rollers, a glaze room and three kilns.
                Month to month, and a month's notice to stop.
              </p>
            </div>
            <div className={s.tiers}>
              {TIERS.map((t) => (
                <article key={t.name} className={s.tier}>
                  <h3>{t.name}</h3>
                  <p className={s.tierPrice}>
                    <strong>{t.price}</strong>
                    <span>{t.per}</span>
                  </p>
                  <p className={s.tierLead}>{t.lead}</p>
                  <ul className={s.tierList}>
                    {t.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className={s.openHours}>
              <h3>Open studio hours</h3>
              <dl>
                {OPEN_HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- FIRING
            The kiln shelf: a band of stacked blocks, then the price list. */}
        <section id="firing" className={s.firing} aria-labelledby="firing-h">
          <div className={s.kilnBand} aria-hidden="true">
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
              <Artwork slug="wheelhouse-ceramics-bowl" alt="A bowl, glazed and fired" mode="fill" inks={[]} className={s.firingBowl}>
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
              <p className={s.secNo}>04</p>
              <h2 id="firing-h">Firing for your own work</h2>
              <p className={s.secNote}>
                No kiln at home? Bring your pots to the shop, we load them into
                our next firing, and you collect them from the same shelf.
              </p>
              <dl className={s.prices}>
                {FIRING.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className={s.rules}>
                {FIRING_RULES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p className={s.secNo}>05</p>
            <h2 id="visit-h">Visit the shop</h2>
            <p className={s.secNote}>
              The shop is the front room of the studio, so there is usually
              someone at a wheel while you look.
            </p>
          </div>
          <div className={s.visit}>
            <div className={s.visitCol}>
              <h3>Shop hours</h3>
              <dl className={s.hours}>
                {SHOP_HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <h3>Find us</h3>
              <p className={s.addr}>
                22 Mill Lane, in the yard behind the old mill.
                <br />
                Parking in the yard; bikes by the door.
              </p>
              <p className={s.addr}>
                <a href="mailto:hello@wheelhouse.example">hello@wheelhouse.example</a>
              </p>
              <p className={s.addr}>(555) 010-4471</p>
            </div>
            <div className={s.faq}>
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Wheelhouse Ceramics</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p>A fictional pottery. Pieces, prices and classes are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
