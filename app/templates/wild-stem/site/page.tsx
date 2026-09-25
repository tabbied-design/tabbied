import { TabbiedPattern } from 'tabbied/react';
import { foliage, frond, lobe, pebble, petalcut, roundpair, roundstep } from 'tabbied/patterns';
import s from './wild-stem.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Figure } from 'components/Figure';

export const metadata = {
  title: 'Wild Stem: Florist, Mercer Hill',
  description:
    'Wild Stem is a small florist on Mercer Street. Bouquets from the morning market, plants, weekly subscriptions, weddings and sympathy flowers, delivered the same day if you order by 2 pm.',
};

/* Shop colors. The hero's leaves and the product tiles take the page's
   colors on a blush card. */
const INK = '#22261E';
const PEONY = '#C94F6D';
const STEM = '#5E7B4C';
const PAPER = '#FBF7F4';

const HERO = ['transparent', STEM, PEONY, PAPER];
const BLOOMS = ['transparent', PEONY, STEM, PAPER];
const LEAVES = ['transparent', STEM, INK, PAPER];

const NAV = [
  ['Shop', '#shop'],
  ['Subscriptions', '#subscriptions'],
  ['Weddings', '#weddings'],
  ['Delivery', '#delivery'],
  ['Care', '#care'],
  ['Visit', '#visit'],
];

const CATEGORIES = [
  ['Bouquets', '#bouquets', '6'],
  ['Plants', '#plants', '3'],
  ['Subscriptions', '#subscriptions', '3'],
  ['Weddings', '#weddings', 'By consultation'],
  ['Sympathy', '#sympathy', '4'],
];

type Product = {
  name: string;
  note: string;
  price: string;
  sizes: string;
  art: typeof lobe;
  seed: string;
};

const BOUQUETS: Product[] = [
  {
    name: 'The Market Bunch',
    note: 'Whatever came in at five this morning, tied loose. Never the same twice.',
    price: 'From $38',
    sizes: '$38, $55, $75',
    art: roundpair,
    seed: 'market',
  },
  {
    name: 'Peony Season',
    note: 'Peonies only, in two or three shades of pink. May to early July.',
    price: 'From $65',
    sizes: '$65, $90',
    art: petalcut,
    seed: 'peony',
  },
  {
    name: 'The Meadow',
    note: 'Cornflower, scabious, sweet pea and grasses. Looks picked, in the best way.',
    price: 'From $48',
    sizes: '$48, $68, $88',
    art: lobe,
    seed: 'meadow',
  },
  {
    name: 'Garden Roses',
    note: 'Twelve scented garden roses with foliage cut from our own beds.',
    price: '$72',
    sizes: 'One size',
    art: roundstep,
    seed: 'roses',
  },
  {
    name: 'White and Green',
    note: 'Ranunculus, lisianthus and eucalyptus. Calm, and right for any room.',
    price: 'From $52',
    sizes: '$52, $70',
    art: pebble,
    seed: 'white',
  },
  {
    name: 'Everlasting',
    note: 'Dried strawflower, bunny tails and lavender. Lasts a year without water.',
    price: '$44',
    sizes: 'One size',
    art: petalcut,
    seed: 'dried',
  },
];

const PLANTS: Product[] = [
  {
    name: 'Fiddle-leaf fig',
    note: 'About three feet tall, in a clay pot. Bright room, no drafts, water weekly.',
    price: '$85',
    sizes: 'Pot included',
    art: frond,
    seed: 'fig',
  },
  {
    name: 'Moth orchid',
    note: 'White, two flower spikes, in a glazed pot. Flowers for eight to ten weeks.',
    price: '$42',
    sizes: 'Pot included',
    art: lobe,
    seed: 'orchid',
  },
  {
    name: 'Kitchen herbs',
    note: 'Rosemary, thyme and sage in a small wooden crate for the windowsill.',
    price: '$34',
    sizes: 'Crate included',
    art: frond,
    seed: 'herbs',
  },
];

type Plan = {
  name: string;
  price: string;
  per: string;
  body: string;
  items: string[];
  cta: string;
  featured: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Weekly',
    price: '$42',
    per: 'a delivery',
    body: 'A market bunch every Friday morning, for a kitchen table that always has something on it.',
    items: ['Delivered Fridays, 10-1', 'Skip or pause by text', 'Free vase with the first one'],
    cta: 'Start weekly',
    featured: true,
  },
  {
    name: 'Fortnightly',
    price: '$46',
    per: 'a delivery',
    body: 'Every other Friday. The most popular plan for offices and reception desks.',
    items: ['Delivered Fridays, 10-1', 'Skip or pause by text', 'Free vase with the first one'],
    cta: 'Start fortnightly',
    featured: false,
  },
  {
    name: 'Monthly',
    price: '$52',
    per: 'a delivery',
    body: 'The first Friday of the month, a little larger, and a nice thing to give for a year.',
    items: ['Delivered first Fridays', 'Can be sent as a gift', 'A card every month'],
    cta: 'Start monthly',
    featured: false,
  },
];

const WEDDING_PRICES = [
  ['Consultation, 45 minutes', 'Free'],
  ['Bridal bouquet', 'From $185'],
  ['Bridesmaid bouquet', 'From $75'],
  ['Buttonholes', '$14 each'],
  ['Table centerpieces', 'From $55'],
  ['Ceremony arch', 'From $650'],
  ['Minimum for a full wedding', '$1,500'],
];

const SYMPATHY = [
  ['Sympathy bouquet', 'From $65'],
  ['Wreath, 16 inches', 'From $150'],
  ['Standing spray', 'From $220'],
  ['Casket spray', 'From $280'],
];

type Zone = {
  zone: string;
  areas: string;
  fee: string;
  cutoff: string;
};

const ZONES: Zone[] = [
  { zone: 'Zone 1', areas: 'Mercer Hill, Old Town, the Riverside', fee: '$8', cutoff: 'Order by 2 pm' },
  { zone: 'Zone 2', areas: 'Eastbank, Hollow Park, Station Quarter', fee: '$12', cutoff: 'Order by 1 pm' },
  { zone: 'Zone 3', areas: 'Northfield, Kiln Lane, the Orchards', fee: '$18', cutoff: 'Order by 12 noon' },
  { zone: 'Further', areas: 'Anywhere within 40 miles of the shop', fee: '$26', cutoff: 'Next day only' },
];

const CARE = [
  {
    title: 'Trim',
    body: 'Cut an inch off every stem at an angle, with a knife rather than scissors, as soon as they arrive.',
  },
  {
    title: 'Water',
    body: 'Fill the vase two-thirds with cool water and the sachet. Change it every two days and trim again.',
  },
  {
    title: 'Leaves',
    body: 'Strip any leaf that would sit below the water line. It rots, clouds the vase and shortens everything.',
  },
  {
    title: 'Place',
    body: 'Out of direct sun, away from radiators, and away from the fruit bowl: ripening fruit ages flowers.',
  },
  {
    title: 'Peonies',
    body: 'Tight buds open in a day in a warm room and in three in a cool one. Both are fine; choose your pace.',
  },
];

const HOURS = [
  ['Monday to Friday', '8 am to 6 pm'],
  ['Saturday', '8 am to 4 pm'],
  ['Sunday', '9 am to noon, collection only'],
];

export default function WildStemPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fbf7f4',
        '--ink': '#22261e',
        '--peony': '#c94f6d',
        '--stem': '#5e7b4c',
        '--gray': '#9c958f',
        '--blush': '#efe6e2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,peony,stem,gray,blush"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Figtree:ital,wght@0,400..700;1,400&display=swap"
      />

      <div className={s.strip}>
        <p data-edit="page.body" data-edit-max="240" data-edit-multiline>Same-day delivery on orders placed by 2 pm, Monday to Saturday</p>
      </div>

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Wild Stem</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550183344">(555) 018-3344</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Confetti petals on an arched plate, and the bouquet standing on
            it. The words sit to the left on plain paper. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Florist on Mercer Street, since 2014</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              Flowers from this morning's market, <em>at the door by six.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              We buy at five, make up by nine and deliver across town all afternoon.
              Bouquets, plants, weekly flowers for the table, and everything a
              wedding or a funeral asks of a florist.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#bouquets">Shop bouquets</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#subscriptions">Weekly flowers</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">2 pm</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>Same-day cut-off</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">$8</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>Delivery in zone 1</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">5 days</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>Or we replace them</dd>
              </div>
            </dl>
          </div>
          <div className={s.plate}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,0" className={s.plateField} aria-hidden="true">
              <TabbiedPattern
                pattern={foliage}
                palette={HERO}
                fit="grid"
                cellSize={64}
                options={{ frequency: 0.55 }}
                redrawInterval={8500}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Figure editId="photo.wild-stem-bouquet-cutout"
              slug="wild-stem-bouquet-cutout"
              cutout
              priority
              alt="A hand-tied bouquet of pink peonies, ranunculus, white sweet peas and eucalyptus, tied with twine"
              className={s.bouquet}
            />
          </div>
        </section>

        {/* ------------------------------------------------------------ SHOP
            The category rail stays in view beside everything that can be
            ordered; on a phone it becomes a row of chips. */}
        <section id="shop" className={s.shop} aria-labelledby="shop-h">
          <aside className={s.side} aria-label="Shop categories and delivery">
            <h2 data-edit="side.sideHead" data-edit-max="60" className={s.sideHead} id="shop-h">Shop</h2>
            <nav aria-label="Categories">
              <ul className={s.cats}>
                {CATEGORIES.map(([label, href, count], i) => (
                  <li key={href}>
                    <a href={href}>
                      <span data-edit={`side.catName.${i}`} data-edit-max="60" className={s.catName}>{label}</span>
                      <span data-edit={`side.catCount.${i}`} data-edit-max="60" className={s.catCount}>{count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={s.sideBox}>
              <h3 data-edit="side.sideBoxHead" data-edit-max="40" className={s.sideBoxHead}>Delivery today</h3>
              <p data-edit="side.body" data-edit-max="240" data-edit-multiline>Order by 2 pm for delivery between 2 and 6, Monday to Saturday.</p>
              <p data-edit="side.body2" data-edit-max="240" data-edit-multiline>Zone 1 $8, zone 2 $12, zone 3 $18. Collection from the shop is free.</p>
              <a data-edit="side.sideLink" data-edit-max="28" className={s.sideLink} href="#delivery">Zones and cut-offs</a>
            </div>
            <div className={s.sideBox}>
              <h3 data-edit="side.sideBoxHead2" data-edit-max="40" className={s.sideBoxHead}>Rather call?</h3>
              <a data-edit="side.sidePhone" data-edit-max="28" className={s.sidePhone} href="tel:+15550183344">(555) 018-3344</a>
              <p data-edit="side.body3" data-edit-max="240" data-edit-multiline>A person answers from 8 am, and can describe what came in today.</p>
            </div>
          </aside>

          <div className={s.catalog}>
            {/* -------------------------------------------------- BOUQUETS */}
            <section id="bouquets" className={s.cat} aria-labelledby="bouquets-h">
              <div className={s.catHead}>
                <h2 data-edit="bouquets.title" data-edit-max="60" id="bouquets-h">Bouquets</h2>
                <p data-edit="bouquets.body" data-edit-max="240" data-edit-multiline>Hand-tied in the shop, wrapped in paper and delivered in water.</p>
              </div>
              <ul className={s.grid}>
                {BOUQUETS.map((p, i) => (
                  <li key={p.name} className={s.card}>
                    <div data-edit-pattern={`bouquets.field.${i}`} data-edit-roles="transparent,2,3,0" className={s.tile} aria-hidden="true">
                      <TabbiedPattern
                        pattern={p.art}
                        palette={BLOOMS}
                        fit="grid"
                        cellSize={46}
                        seed={p.seed}
                        options={{ frequency: 0.7 }}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </div>
                    <div className={s.cardBody}>
                      <h3 data-edit={`bouquets.title2.${i}`} data-edit-max="40">{p.name}</h3>
                      <p data-edit={`bouquets.cardNote.${i}`} data-edit-max="240" data-edit-multiline className={s.cardNote}>{p.note}</p>
                      <div className={s.cardFoot}>
                        <span data-edit={`bouquets.cardPrice.${i}`} data-edit-max="60" className={s.cardPrice}>{p.price}</span>
                        <span data-edit={`bouquets.cardSizes.${i}`} data-edit-max="60" className={s.cardSizes}>{p.sizes}</span>
                      </div>
                      <a data-edit={`bouquets.cardLink.${i}`} data-edit-max="28" className={s.cardLink} href="#order" aria-label={`Order ${p.name}`}>Order this</a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* ---------------------------------------------------- PLANTS */}
            <section id="plants" className={s.cat} aria-labelledby="plants-h">
              <div className={s.catHead}>
                <h2 data-edit="plants.title" data-edit-max="60" id="plants-h">Plants</h2>
                <p data-edit="plants.body" data-edit-max="240" data-edit-multiline>Easy ones, potted and watered, with a care card tucked in.</p>
              </div>
              <ul className={s.grid}>
                {PLANTS.map((p, i) => (
                  <li key={p.name} className={s.card}>
                    <div data-edit-pattern={`plants.field.${i}`} data-edit-roles="transparent,3,1,0" className={`${s.tile} ${s.tileLeaf}`} aria-hidden="true">
                      <TabbiedPattern
                        pattern={p.art}
                        palette={LEAVES}
                        fit="grid"
                        cellSize={46}
                        seed={p.seed}
                        options={{ frequency: 0.7 }}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </div>
                    <div className={s.cardBody}>
                      <h3 data-edit={`plants.title2.${i}`} data-edit-max="40">{p.name}</h3>
                      <p data-edit={`plants.cardNote.${i}`} data-edit-max="240" data-edit-multiline className={s.cardNote}>{p.note}</p>
                      <div className={s.cardFoot}>
                        <span data-edit={`plants.cardPrice.${i}`} data-edit-max="60" className={s.cardPrice}>{p.price}</span>
                        <span data-edit={`plants.cardSizes.${i}`} data-edit-max="60" className={s.cardSizes}>{p.sizes}</span>
                      </div>
                      <a data-edit={`plants.cardLink.${i}`} data-edit-max="28" className={s.cardLink} href="#order" aria-label={`Order ${p.name}`}>Order this</a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* --------------------------------------------- SUBSCRIPTIONS */}
            <section id="subscriptions" className={s.cat} aria-labelledby="subscriptions-h">
              <div className={s.catHead}>
                <h2 data-edit="subscriptions.title" data-edit-max="60" id="subscriptions-h">Subscriptions</h2>
                <p data-edit="subscriptions.body" data-edit-max="240" data-edit-multiline>Flowers on a Friday without thinking about it. Cancel with a text; there is no contract.</p>
              </div>
              <ul className={s.plans}>
                {PLANS.map((p, i) => (
                  <li key={p.name} className={p.featured ? `${s.plan} ${s.planFeatured}` : s.plan}>
                    <h3 data-edit={`subscriptions.title2.${i}`} data-edit-max="40">{p.name}</h3>
                    <p data-edit={`subscriptions.planPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.planPrice}>{p.price}</p>
                    <p data-edit={`subscriptions.planPer.${i}`} data-edit-max="240" data-edit-multiline className={s.planPer}>{p.per}</p>
                    <p data-edit={`subscriptions.planBody.${i}`} data-edit-max="240" data-edit-multiline className={s.planBody}>{p.body}</p>
                    <ul className={s.planList}>
                      {p.items.map((item, i2) => (
                        <li data-edit={`subscriptions.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                      ))}
                    </ul>
                    <a data-edit={`subscriptions.cardLink.${i}`} data-edit-max="28" className={s.cardLink} href="#order">{p.cta}</a>
                  </li>
                ))}
              </ul>
            </section>

            {/* -------------------------------------------------- WEDDINGS */}
            <section id="weddings" className={s.cat} aria-labelledby="weddings-h">
              <div className={s.catHead}>
                <h2 data-edit="weddings.title" data-edit-max="60" id="weddings-h">Weddings and events</h2>
                <p data-edit="weddings.body" data-edit-max="240" data-edit-multiline>From a single bouquet at the courthouse to a church full of flowers.</p>
              </div>
              <div className={s.split}>
                <div className={s.splitText}>
                  <p data-edit="weddings.body2" data-edit-max="240" data-edit-multiline>
                    It starts with a free 45-minute consultation at the shop, with a
                    bucket of whatever is in season on the table. Bring a photo of the
                    dress, the room or a color you cannot stop thinking about.
                  </p>
                  <p data-edit="weddings.body3" data-edit-max="240" data-edit-multiline>
                    We take eight weddings a month so each one gets a whole Friday of
                    making. Book three to nine months ahead; the week before is sometimes
                    possible, so ask.
                  </p>
                  <a data-edit="weddings.btn" data-edit-max="28" className={s.btn} href="tel:+15550183344">Book a consultation</a>
                </div>
                <dl className={s.priceList}>
                  {WEDDING_PRICES.map(([item, price], i) => (
                    <div key={item}>
                      <dt data-edit={`weddings.term.${i}`} data-edit-max="28">{item}</dt>
                      <dd data-edit={`weddings.body4.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>

            {/* -------------------------------------------------- SYMPATHY */}
            <section id="sympathy" className={s.cat} aria-labelledby="sympathy-h">
              <div className={s.catHead}>
                <h2 data-edit="sympathy.title" data-edit-max="60" id="sympathy-h">Sympathy</h2>
                <p data-edit="sympathy.body" data-edit-max="240" data-edit-multiline>Delivered to any funeral home in zones 1 to 3 at no charge, including on Sundays for a service.</p>
              </div>
              <div className={s.split}>
                <div className={s.splitText}>
                  <p data-edit="sympathy.body2" data-edit-max="240" data-edit-multiline>
                    Call and tell us about the person, or the service, and we will make
                    something that suits. If you would rather not find the words for
                    the card, tell us what you want to say and we will write it by hand.
                  </p>
                </div>
                <dl className={s.priceList}>
                  {SYMPATHY.map(([item, price], i) => (
                    <div key={item}>
                      <dt data-edit={`sympathy.term.${i}`} data-edit-max="28">{item}</dt>
                      <dd data-edit={`sympathy.body3.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          </div>
        </section>

        {/* ---------------------------------------------------------- DELIVERY */}
        <section id="delivery" className={s.sec} aria-labelledby="delivery-h">
          <div className={s.secHead}>
            <h2 data-edit="delivery.title" data-edit-max="60" id="delivery-h">Delivery zones and cut-off times</h2>
            <p data-edit="delivery.body" data-edit-max="240" data-edit-multiline>
              Same-day deliveries arrive between 2 and 6 pm; next-day ones between
              10 am and 1 pm. If nobody is in, we leave them with a neighbor or bring
              them back to the shop and call you.
            </p>
          </div>
          <table className={s.zones}>
            <caption data-edit="delivery.visuallyHidden" className={s.visuallyHidden}>Delivery fees and same-day cut-off times by zone</caption>
            <thead>
              <tr>
                <th data-edit="delivery.heading" scope="col">Zone</th>
                <th data-edit="delivery.heading2" scope="col">Neighborhoods</th>
                <th data-edit="delivery.heading3" scope="col">Fee</th>
                <th data-edit="delivery.heading4" scope="col">Same day</th>
              </tr>
            </thead>
            <tbody>
              {ZONES.map((z, i) => (
                <tr key={z.zone}>
                  <th data-edit={`delivery.heading5.${i}`} scope="row">{z.zone}</th>
                  <td data-edit={`delivery.cell.${i}`}>{z.areas}</td>
                  <td data-edit={`delivery.zoneFee.${i}`} className={s.zoneFee}>{z.fee}</td>
                  <td data-edit={`delivery.zoneCut.${i}`} className={s.zoneCut}>{z.cutoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p data-edit="delivery.secFine" data-edit-max="240" data-edit-multiline className={s.secFine}>Sunday: sympathy and wedding deliveries only, by arrangement.</p>
        </section>

        {/* ------------------------------------------------------------- ORDER */}
        <section id="order" className={s.order} aria-labelledby="order-h">
          <div className={s.orderInner}>
            <div className={s.orderIntro}>
              <h2 data-edit="order.title" data-edit-max="60" id="order-h">Place an order</h2>
              <p data-edit="order.body" data-edit-max="240" data-edit-multiline>
                Tell us what, when and where. We call you back within half an hour,
                during opening hours, to confirm and to take payment. Nothing is
                charged until then.
              </p>
            </div>
            <form className={s.form} action="#">
              <label className={s.field}>
                <span data-edit="order.text" data-edit-max="60">What would you like</span>
                <select name="item" defaultValue="The Market Bunch">
                  {BOUQUETS.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                  {PLANTS.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Subscription">A subscription</option>
                  <option value="Sympathy">Sympathy flowers</option>
                </select>
              </label>
              <label className={s.field}>
                <span data-edit="order.text2" data-edit-max="60">Size</span>
                <select name="size" defaultValue="Medium">
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </label>
              <label className={s.field}>
                <span data-edit="order.text3" data-edit-max="60">Delivery date</span>
                <input type="date" name="date" />
              </label>
              <label className={s.field}>
                <span data-edit="order.text4" data-edit-max="60">Zip code</span>
                <input type="text" name="zip" inputMode="numeric" autoComplete="postal-code" />
              </label>
              <label className={s.field}>
                <span data-edit="order.text5" data-edit-max="60">Recipient</span>
                <input type="text" name="recipient" />
              </label>
              <label className={s.field}>
                <span data-edit="order.text6" data-edit-max="60">Delivery address</span>
                <input type="text" name="address" autoComplete="street-address" />
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span data-edit="order.text7" data-edit-max="60">Card message, written by hand</span>
                <textarea name="card" rows={3} />
              </label>
              <label className={s.field}>
                <span data-edit="order.text8" data-edit-max="60">Your name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span data-edit="order.text9" data-edit-max="60">Your phone</span>
                <input type="tel" name="phone" autoComplete="tel" required />
              </label>
              <button data-edit="order.btn" data-edit-max="24" className={s.btn} type="submit">Send order</button>
            </form>
          </div>
        </section>

        {/* -------------------------------------------------------------- CARE */}
        <section id="care" className={s.sec} aria-labelledby="care-h">
          <div className={s.secHead}>
            <h2 data-edit="care.title" data-edit-max="60" id="care-h">Making them last</h2>
            <p data-edit="care.body" data-edit-max="240" data-edit-multiline>
              A bouquet from us should look good for a week. If anything wilts within
              five days, send a photo and we will replace it.
            </p>
          </div>
          <ol className={s.care}>
            {CARE.map((c, i) => (
              <li key={c.title}>
                <h3 data-edit={`care.title2.${i}`} data-edit-max="40">{c.title}</h3>
                <p data-edit={`care.body2.${i}`} data-edit-max="240" data-edit-multiline>{c.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">The shop</h2>
            <p data-edit="visit.body" data-edit-max="240" data-edit-multiline>
              A narrow room with buckets on the floor and a cold room at the back.
              Come in and point at things; it is the best way to choose.
            </p>
          </div>
          <div className={s.visit}>
            <div>
              <h3 data-edit="visit.visitHead" data-edit-max="40" className={s.visitHead}>Find us</h3>
              <p data-edit="visit.visitAddr" data-edit-max="240" data-edit-multiline className={s.visitAddr}>22 Mercer Street, Mercer Hill</p>
              <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>Two doors down from the bakery, with the bench outside.</p>
            </div>
            <div>
              <h3 data-edit="visit.visitHead2" data-edit-max="40" className={s.visitHead}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 data-edit="visit.visitHead3" data-edit-max="40" className={s.visitHead}>Get in touch</h3>
              <ul className={s.visitList}>
                <li>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550183344">(555) 018-3344</a>
                </li>
                <li>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@wildstem.example">hello@wildstem.example</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Wild Stem</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Flowers from this morning's market, 22 Mercer Street.</p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional florist. Flowers, prices and delivery zones are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
