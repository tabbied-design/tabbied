import { TabbiedPattern } from 'tabbied/react';
import { dotset, polkadot, speckfield, frond } from 'tabbied/patterns';
import s from './pip-and-sprout-seeds.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Pip & Sprout Seed Co.: Heirloom seeds from the seed barn, Ashby Common',
  description:
    'Heirloom vegetable and flower seeds, grown out and saved at the trial garden on Ashby Common. This season\'s packets, the sowing calendar, seed swap days, growing guides and how to order.',
};

/* Site colors. Seeds are the ornament: nine to a cell around the catalog
   cover, big dots round the swap-day bill, a dusting of fine ones behind
   the order form, fronds over the trial beds and a last row of seed at the
   foot of the page. Every field's own ground is transparent, so the kraft
   or the bed behind it shows through. */
const KRAFT = '#eadfc5';
const INK = '#2b2a21';
const TOMATO = '#c9412d';
const LEAF = '#4e7936';
const MARIGOLD = '#eaa93a';

const SEEDS = ['transparent', INK, TOMATO, LEAF, MARIGOLD, INK];
const SWAP_DOTS = ['transparent', TOMATO, MARIGOLD, LEAF, KRAFT, TOMATO];
const DUST = ['transparent', INK, LEAF, TOMATO, INK, LEAF];
const BEDS = ['transparent', KRAFT, MARIGOLD, KRAFT, INK, LEAF];
const LAST_ROW = ['transparent', MARIGOLD, TOMATO, KRAFT, LEAF, MARIGOLD];

const NAV = [
  ['Packets', '#packets'],
  ['Calendar', '#calendar'],
  ['Swap days', '#swap'],
  ['Guides', '#guides'],
  ['Ordering', '#order'],
  ['Trial garden', '#garden'],
  ['Visit', '#visit'],
];

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Span = [number, number] | null;

type Variety = {
  slug: string;
  tone: string;
  crop: string;
  name: string;
  latin: string;
  blurb: string;
  lot: string;
  price: string;
  count: string;
  alt: string;
  inks: Record<string, string>;
  indoors: Span;
  outdoors: Span;
  harvest: Span;
  germinate: string;
  spacing: string;
  depth: string;
  days: string;
  note: string;
};

const VARIETIES: Variety[] = [
  {
    slug: 'pip-and-sprout-seeds-tomato',
    tone: 'toneTomato',
    crop: 'Tomato',
    name: 'Brandywine',
    latin: 'Solanum lycopersicum',
    blurb: 'Pink beefsteak, a pound apiece, with the old potato leaf.',
    lot: 'Lot 27-114',
    price: '$4.25',
    count: '25 seeds',
    alt: 'A ripe heirloom tomato on a short piece of vine with two leaves',
    inks: { red: 'var(--tomato)', yellow: 'var(--leaf)', black: 'var(--ink)' },
    indoors: [3, 4],
    outdoors: [5, 6],
    harvest: [8, 9],
    germinate: '7-14 days',
    spacing: '24 in',
    depth: '1/4 in',
    days: '90 days',
    note: 'Stake early and pinch the side shoots. The first truss is always the biggest.',
  },
  {
    slug: 'pip-and-sprout-seeds-bean',
    tone: 'toneBean',
    crop: 'Runner bean',
    name: 'Scarlet Emperor',
    latin: 'Phaseolus coccineus',
    blurb: 'Red flowers for the bees in July, long flat pods until frost.',
    lot: 'Lot 27-062',
    price: '$4.00',
    count: '30 seeds',
    alt: 'A climbing runner bean stem with three long pods, leaves and a small flower',
    inks: { red: 'var(--leaf)', blue: 'var(--ink)', yellow: 'var(--tomato)', black: 'var(--marigold)' },
    indoors: [4, 4],
    outdoors: [5, 6],
    harvest: [7, 9],
    germinate: '7-10 days',
    spacing: '6 in, on poles',
    depth: '2 in',
    days: '70 days',
    note: 'Pick every other day. Beans left to swell on the vine tell the plant to stop.',
  },
  {
    slug: 'pip-and-sprout-seeds-squash',
    tone: 'toneSquash',
    crop: 'Winter squash',
    name: 'Waltham Butternut',
    latin: 'Cucurbita moschata',
    blurb: 'Dense orange flesh, keeps on a cool shelf until March.',
    lot: 'Lot 27-208',
    price: '$4.25',
    count: '15 seeds',
    alt: 'A butternut squash with a curling tendril and one broad leaf',
    inks: { red: 'var(--ink)', blue: 'var(--tomato)', yellow: 'var(--marigold)', black: 'var(--leaf)' },
    indoors: [4, 5],
    outdoors: [6, 6],
    harvest: [9, 10],
    germinate: '6-10 days',
    spacing: '36 in',
    depth: '1 in',
    days: '100 days',
    note: 'Cure in the sun for ten days after cutting, then bring them in before the frost.',
  },
  {
    slug: 'pip-and-sprout-seeds-carrot',
    tone: 'toneCarrot',
    crop: 'Carrot',
    name: 'Harlequin Mix',
    latin: 'Daucus carota',
    blurb: 'Red, deep purple and gold roots from one packet, sweeter after frost.',
    lot: 'Lot 27-031',
    price: '$3.75',
    count: '400 seeds',
    alt: 'Three carrots with long feathery tops, lying side by side',
    inks: { red: 'var(--tomato)', blue: 'var(--ink)', yellow: 'var(--marigold)' },
    indoors: null,
    outdoors: [4, 7],
    harvest: [7, 11],
    germinate: '14-21 days',
    spacing: '2 in',
    depth: '1/4 in',
    days: '70 days',
    note: 'Keep the bed damp under a board until they show, then lift the board at once.',
  },
  {
    slug: 'pip-and-sprout-seeds-sunflower',
    tone: 'toneSunflower',
    crop: 'Sunflower',
    name: 'Velvet Queen',
    latin: 'Helianthus annuus',
    blurb: 'Deep red petals round a dark eye, six feet, flowering for weeks.',
    lot: 'Lot 27-301',
    price: '$3.75',
    count: '20 seeds',
    alt: 'A sunflower head on a short stem with two leaves',
    inks: { red: 'var(--ink)', blue: 'var(--leaf)', yellow: 'var(--tomato)' },
    indoors: [4, 4],
    outdoors: [5, 6],
    harvest: [8, 9],
    germinate: '7-14 days',
    spacing: '18 in',
    depth: '1 in',
    days: '85 days',
    note: 'Leave one head standing in October. The goldfinches will find it by noon.',
  },
  {
    slug: 'pip-and-sprout-seeds-pea',
    tone: 'tonePea',
    crop: 'Shelling pea',
    name: 'Lincoln',
    latin: 'Pisum sativum',
    blurb: 'Eight or nine peas to a pod, as sweet as the day they were picked.',
    lot: 'Lot 27-017',
    price: '$4.00',
    count: '50 seeds',
    alt: 'An open pea pod showing a row of round peas, with a curling tendril',
    inks: { red: 'var(--leaf)', blue: 'var(--marigold)', yellow: 'var(--tomato)', black: 'var(--ink)' },
    indoors: [2, 3],
    outdoors: [3, 4],
    harvest: [6, 7],
    germinate: '7-14 days',
    spacing: '2 in',
    depth: '1 in',
    days: '65 days',
    note: 'Sow a second row in August for a small, very welcome crop in October.',
  },
];

const HERO = VARIETIES[0];

const span = (sp: Span) => (sp ? `${MONTH_NAMES[sp[0] - 1]}${sp[1] !== sp[0] ? `-${MONTH_NAMES[sp[1] - 1]}` : ''}` : 'Not needed');

const CHART_ROWS: [keyof Pick<Variety, 'indoors' | 'outdoors' | 'harvest'>, string][] = [
  ['indoors', 'Sow indoors'],
  ['outdoors', 'Sow outdoors'],
  ['harvest', 'Harvest'],
];

type SwapDay = {
  day: string;
  date: string;
  title: string;
  note: string;
};

const SWAPS: SwapDay[] = [
  { day: 'Sat', date: 'Feb 13', title: 'The winter swap', note: 'Bring saved seed in paper envelopes, labeled. Tea on the stove.' },
  { day: 'Sat', date: 'Mar 20', title: 'Seedling morning', note: 'Spare tomato and pepper seedlings, and advice on potting on.' },
  { day: 'Sun', date: 'Sep 12', title: 'Harvest swap', note: 'Beans in the pod, squash seed, and the year\'s best sunflower heads.' },
  { day: 'Sat', date: 'Oct 16', title: 'Garlic and bulbs', note: 'The last swap of the year, with cider from the orchard next door.' },
];

const LIBRARY_STEPS = [
  ['Borrow', 'Take up to five packets from the library drawers in the barn. No card, no fee; write your name in the book.'],
  ['Grow', 'Grow them out. Let a few of the best plants go to seed at the end of the season.'],
  ['Return', 'Bring back twice what you took, dry and labeled with the variety, the year and your street.'],
];

type Guide = {
  no: string;
  title: string;
  body: string;
  time: string;
};

const GUIDES: Guide[] = [
  { no: '1', title: 'Saving tomato seed', body: 'Squeeze the seed into a jar with a little water, leave it three days to ferment, rinse and dry on a plate.', time: 'August' },
  { no: '2', title: 'Hardening off', body: 'A week of mornings outdoors before planting out: an hour the first day, all day and night by the last.', time: 'May' },
  { no: '3', title: 'Sowing carrots thin', body: 'Mix the seed with a spoon of dry sand and sow it along a watered drill. You will thin far less.', time: 'April to July' },
  { no: '4', title: 'Poles for beans', body: 'Eight-foot poles, tied at the top in a wigwam of six. Sow two beans at the foot of each and keep the stronger.', time: 'May' },
  { no: '5', title: 'Keeping squash', body: 'Cut with three inches of stem, cure in the sun, then store where it is cool, dry and dark.', time: 'October' },
  { no: '6', title: 'Peas in cold ground', body: 'Peas germinate at forty degrees. Sow them the day the soil stops sticking to your boots.', time: 'March' },
];

const PRICES = [
  ['A packet', 'Any variety in the catalog', '$3.75-4.25'],
  ['A garden packet', 'Four times the seed, for long rows and market gardens', '$12.00'],
  ['The six on this page', 'One packet of each, in a card wallet with the sowing chart', '$22.00'],
  ['Seed library donation', 'Pays for envelopes and ink; it is not required', 'What you like'],
];

const SHIPPING = [
  ['Post', 'Flat $4.50 anywhere in the country; free on orders over $40.'],
  ['When', 'Orders go out Mondays and Thursdays, January to mid-June.'],
  ['Guarantee', 'If a packet does not come up, tell us and we send another.'],
];

const TRIAL_FACTS = [
  ['1987', 'the first beds dug on the common'],
  ['412', 'varieties grown out since then'],
  ['1.5', 'acres, in thirty-two raised beds'],
  ['92%', 'our lowest germination test this year'],
];

const HOURS = [
  ['February to June', 'Thursday to Saturday, 10-4'],
  ['July to January', 'Saturdays, 10-2'],
  ['Swap days', 'All day, see the bill above'],
];

export default function PipAndSproutSeedsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--kraft': '#eadfc5',
        '--ink': '#2b2a21',
        '--tomato': '#c9412d',
        '--leaf': '#4e7936',
        '--marigold': '#eaa93a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="kraft,ink,tomato,leaf,marigold"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Sorts+Mill+Goudy:ital@0;1&family=IM+Fell+English+SC&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Pip &amp; Sprout</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Seed Co.</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barOrder" data-edit-max="28" className={s.barOrder} href="#order">Order seeds</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The catalog cover: a frame of seed round an engraved panel, and
            the year's lead packet propped against it. */}
        <section className={s.hero} aria-labelledby="ps-hero-h">
          <div data-edit-pattern="psHero.field" data-edit-roles="transparent,1,2,3,4,1" className={s.coverField} aria-hidden="true">
            <TabbiedPattern
              pattern={dotset}
              palette={SEEDS}
              options={{ frequency: 0.75 }}
              fit="grid"
              cellSize={48}
              seed="pip-cover"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.cover}>
            <div className={s.coverText}>
              <p data-edit="psHero.annual" data-edit-max="240" data-edit-multiline className={s.annual}>The thirty-ninth annual</p>
              <p data-edit="psHero.catalogue" data-edit-max="240" data-edit-multiline className={s.catalogue}>Catalogue of heirloom seeds</p>
              <h1 id="ps-hero-h" className={s.title}>
                <span data-edit="psHero.titleMain" data-edit-max="60" className={s.titleMain}>Pip &amp; Sprout</span>
                <span data-edit="psHero.titleSub" data-edit-max="60" className={s.titleSub}>Seed Company</span>
              </h1>
              <p className={s.fleuron} aria-hidden="true" />
              <p data-edit="psHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>Vegetables and flowers grown out, saved and packed by hand at the seed barn on Ashby Common, for the 2027 season.</p>
              <div className={s.heroActions}>
                <a data-edit="psHero.btn" data-edit-max="28" className={s.btn} href="#packets">This season&apos;s packets</a>
                <a data-edit="psHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#calendar">When to sow</a>
              </div>
              <p data-edit="psHero.coverFoot" data-edit-max="240" data-edit-multiline className={s.coverFoot}>Orders open January 5. Price of this catalogue: free, or a stamp.</p>
            </div>

            <figure className={s.heroPacket}>
              <div className={`${s.front} ${s[HERO.tone]}`}>
                <p data-edit="psHero.band" data-edit-max="240" data-edit-multiline className={s.band}>Pip &amp; Sprout Seed Co.</p>
                <div className={s.plate}>
                  <Artwork slug={HERO.slug} alt={HERO.alt} inks={HERO.inks} className={s.plateArt} />
                </div>
                <p data-edit="psHero.banner" data-edit-max="240" data-edit-multiline className={s.banner}>{HERO.name}</p>
                <p data-edit="psHero.crop" data-edit-max="240" data-edit-multiline className={s.crop}>{HERO.crop}</p>
                <p className={s.lot}>{`${HERO.lot}, ${HERO.count}`}</p>
              </div>
              <figcaption className={s.heroCaption}>Variety of the year: {HERO.name}, the pink beefsteak.</figcaption>
            </figure>
          </div>
        </section>

        {/* --------------------------------------------------------- PACKETS
            Six packets, each shown front and back: the printed front with
            its picture and banner, the back with its sowing chart. */}
        <section id="packets" className={`${s.sec} ${s.packetsSec}`} aria-labelledby="ps-packets-h">
          <div className={s.secHead}>
            <p data-edit="packets.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Plate the first</p>
            <h2 data-edit="packets.title" data-edit-max="60" id="ps-packets-h">This season&apos;s packets</h2>
            <p data-edit="packets.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Six of the forty-one varieties in the catalog, each grown out in the trial beds this summer and tested for germination in the barn before it was packed.</p>
          </div>

          <ol className={s.packets}>
            {VARIETIES.map((v, i) => (
              <li key={v.slug} className={`${s.pair} ${s[v.tone]}`}>
                <div className={s.front}>
                  <p data-edit={`packets.band.${i}`} data-edit-max="240" data-edit-multiline className={s.band}>Pip &amp; Sprout Seed Co.</p>
                  <div className={s.plate}>
                    <Artwork slug={v.slug} alt={v.alt} inks={v.inks} className={s.plateArt} />
                  </div>
                  <p data-edit={`packets.banner.${i}`} data-edit-max="240" data-edit-multiline className={s.banner}>{v.name}</p>
                  <p data-edit={`packets.crop.${i}`} data-edit-max="240" data-edit-multiline className={s.crop}>{v.crop}</p>
                  <p className={s.lot}>{`No. ${i + 1}, ${v.count}, ${v.price}`}</p>
                </div>
                <div className={s.back}>
                  <h3 data-edit={`packets.title2.${i}`} data-edit-max="40">{v.name}</h3>
                  <p data-edit={`packets.latin.${i}`} data-edit-max="240" data-edit-multiline className={s.latin}>{v.latin}</p>
                  <p data-edit={`packets.blurb.${i}`} data-edit-max="240" data-edit-multiline className={s.blurb}>{v.blurb}</p>
                  <div className={s.chart} role="img" aria-label={`Sow indoors ${span(v.indoors)}; sow outdoors ${span(v.outdoors)}; harvest ${span(v.harvest)}`}>
                    <span className={s.chartHead} aria-hidden="true">
                      <span />
                      {MONTHS.map((m, mi) => (
                        <span data-edit={`packets.text.${i}.${mi}`} data-edit-max="60" key={`${v.slug}-m${mi}`}>{m}</span>
                      ))}
                    </span>
                    {CHART_ROWS.map(([key, label], i2) => (
                      <span key={key} className={s.chartRow} aria-hidden="true">
                        <span data-edit={`packets.chartLabel.${i}.${i2}`} data-edit-max="60" className={s.chartLabel}>{label}</span>
                        {v[key] ? (
                          <span className={`${s.chartBar} ${s[key]}`} style={{ gridColumn: `${v[key]![0] + 1} / ${v[key]![1] + 2}` }} />
                        ) : (
                          <span data-edit={`packets.chartNone.${i}.${i2}`} data-edit-max="60" className={s.chartNone}>not needed</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <dl className={s.facts}>
                    <div>
                      <dt data-edit={`packets.term.${i}`} data-edit-max="28">Sprouts in</dt>
                      <dd data-edit={`packets.body.${i}`} data-edit-max="200" data-edit-multiline>{v.germinate}</dd>
                    </div>
                    <div>
                      <dt data-edit={`packets.term2.${i}`} data-edit-max="28">Spacing</dt>
                      <dd data-edit={`packets.body2.${i}`} data-edit-max="200" data-edit-multiline>{v.spacing}</dd>
                    </div>
                    <div>
                      <dt data-edit={`packets.term3.${i}`} data-edit-max="28">Depth</dt>
                      <dd data-edit={`packets.body3.${i}`} data-edit-max="200" data-edit-multiline>{v.depth}</dd>
                    </div>
                    <div>
                      <dt data-edit={`packets.term4.${i}`} data-edit-max="28">Ready in</dt>
                      <dd data-edit={`packets.body4.${i}`} data-edit-max="200" data-edit-multiline>{v.days}</dd>
                    </div>
                  </dl>
                  <p data-edit={`packets.backNote.${i}`} data-edit-max="240" data-edit-multiline className={s.backNote}>{v.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- CALENDAR
            All six on one year: a thin bar for each job, frost dates ruled
            down the months. */}
        <section id="calendar" className={s.sec} aria-labelledby="ps-cal-h">
          <div className={s.secHead}>
            <p data-edit="calendar.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Plate the second</p>
            <h2 data-edit="calendar.title" data-edit-max="60" id="ps-cal-h">The sowing calendar</h2>
            <p data-edit="calendar.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Worked out for Ashby, where the last frost falls around May 10 and the first around October 8. A week either side is usual; a fortnight is not unheard of.</p>
          </div>

          <div className={s.calWrap}>
            <div className={s.calInner}>
            <table className={s.calendar}>
              <caption data-edit="calendar.srOnly" className={s.srOnly}>When to sow indoors, sow outdoors and harvest each of the six varieties, month by month</caption>
              <thead>
                <tr>
                  <th data-edit="calendar.calCorner" scope="col" className={s.calCorner}>Variety</th>
                  {MONTH_NAMES.map((m, i) => (
                    <th data-edit={`calendar.calMonth.${i}`} key={m} scope="col" className={s.calMonth}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VARIETIES.map((v, i) => (
                  <tr key={v.slug}>
                    <th scope="row" className={s.calName}>
                      <span data-edit={`calendar.calVariety.${i}`} data-edit-max="60" className={s.calVariety}>{v.name}</span>
                      <span data-edit={`calendar.calCrop.${i}`} data-edit-max="60" className={s.calCrop}>{v.crop}</span>
                    </th>
                    <td colSpan={12} className={s.calTrack}>
                      <span className={s.calGrid}>
                        {CHART_ROWS.map(([key, label]) =>
                          v[key] ? (
                            <span key={key} className={`${s.calBar} ${s[key]}`} style={{ gridColumn: `${v[key]![0]} / ${v[key]![1] + 1}` }}>
                              <span className={s.srOnly}>{`${label}: ${span(v[key])}`}</span>
                            </span>
                          ) : null
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <span className={`${s.frost} ${s.frostLast}`} aria-hidden="true" />
            <span className={`${s.frost} ${s.frostFirst}`} aria-hidden="true" />
            </div>
          </div>

          <ul className={s.legend}>
            <li data-edit="calendar.item" data-edit-format="emphasis" data-edit-max="80"><span className={`${s.key} ${s.indoors}`} aria-hidden="true" />Sow indoors, under cover</li>
            <li data-edit="calendar.item2" data-edit-format="emphasis" data-edit-max="80"><span className={`${s.key} ${s.outdoors}`} aria-hidden="true" />Sow or plant outdoors</li>
            <li data-edit="calendar.item3" data-edit-format="emphasis" data-edit-max="80"><span className={`${s.key} ${s.harvest}`} aria-hidden="true" />Harvest</li>
            <li data-edit="calendar.item4" data-edit-format="emphasis" data-edit-max="80"><span className={s.keyFrost} aria-hidden="true" />Average frost dates at Ashby</li>
          </ul>
        </section>

        {/* ------------------------------------------------------------ SWAP
            A bill for the swap days, framed in big dots. */}
        <section id="swap" className={`${s.sec} ${s.swapSec}`} aria-labelledby="ps-swap-h">
          <div className={s.bill}>
            <div data-edit-pattern="swap.field" data-edit-roles="transparent,2,4,3,0,2" className={s.billField} aria-hidden="true">
              <TabbiedPattern pattern={polkadot} palette={SWAP_DOTS} fit="grid" cellSize={40} seed="pip-swap" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <div className={s.billInner}>
              <p data-edit="swap.billKicker" data-edit-max="240" data-edit-multiline className={s.billKicker}>At the seed barn, free to all</p>
              <h2 data-edit="swap.text" data-edit-format="emphasis" data-edit-max="60" id="ps-swap-h" className={s.billTitle}>Seed library <span>and</span> swap days</h2>
              <p data-edit="swap.billLede" data-edit-max="240" data-edit-multiline className={s.billLede}>Bring what you saved, take what you need. Nobody counts.</p>
              <ol className={s.swaps}>
                {SWAPS.map((d, i) => (
                  <li key={d.date}>
                    <p className={s.swapDate}>
                      <span data-edit={`swap.text2.${i}`} data-edit-max="60">{d.day}</span>
                      <strong data-edit={`swap.emphasis.${i}`}>{d.date}</strong>
                    </p>
                    <div>
                      <h3 data-edit={`swap.title.${i}`} data-edit-max="40">{d.title}</h3>
                      <p data-edit={`swap.body.${i}`} data-edit-max="240" data-edit-multiline>{d.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p data-edit="swap.billFoot" data-edit-max="240" data-edit-multiline className={s.billFoot}>Swaps run 10 till 3. Children, dogs on leads and cake all welcome.</p>
            </div>
          </div>

          <div className={s.library}>
            <h3 data-edit="swap.libraryTitle" data-edit-max="40" className={s.libraryTitle}>How the seed library works</h3>
            <ol className={s.steps}>
              {LIBRARY_STEPS.map(([step, text], i) => (
                <li key={step}>
                  <span className={s.stepNo} aria-hidden="true">{i + 1}</span>
                  <h4 data-edit={`swap.title2.${i}`} data-edit-max="36">{step}</h4>
                  <p data-edit={`swap.body2.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                </li>
              ))}
            </ol>
            <p data-edit="swap.libraryNote" data-edit-max="240" data-edit-multiline className={s.libraryNote}>The library holds about three hundred varieties, most of them saved by neighbors. The drawers are open whenever the barn is.</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- GUIDES */}
        <section id="guides" className={s.sec} aria-labelledby="ps-guides-h">
          <div className={s.secHead}>
            <p data-edit="guides.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Plate the third</p>
            <h2 data-edit="guides.title" data-edit-max="60" id="ps-guides-h">Growing guides</h2>
            <p data-edit="guides.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>The leaflets we tuck into orders, in short. Each one is a single printed card; ask for any of them at the barn.</p>
          </div>

          <ol className={s.guides}>
            {GUIDES.map((g, i) => (
              <li key={g.no} className={s.guide}>
                <p className={s.guideNo}>{`Leaflet No. ${g.no}`}</p>
                <h3 data-edit={`guides.title2.${i}`} data-edit-max="40">{g.title}</h3>
                <p data-edit={`guides.guideBody.${i}`} data-edit-max="240" data-edit-multiline className={s.guideBody}>{g.body}</p>
                <p data-edit={`guides.guideTime.${i}`} data-edit-max="240" data-edit-multiline className={s.guideTime}>{g.time}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- ORDER */}
        <section id="order" className={`${s.sec} ${s.orderSec}`} aria-labelledby="ps-order-h">
          <div className={s.secHead}>
            <p data-edit="order.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Terms of business</p>
            <h2 data-edit="order.title" data-edit-max="60" id="ps-order-h">Ordering and shipping</h2>
          </div>

          <div className={s.orderGrid}>
            <div className={s.priceCol}>
              <table className={s.prices}>
                <caption data-edit="order.srOnly" className={s.srOnly}>What seed costs</caption>
                <tbody>
                  {PRICES.map(([what, detail, price], i) => (
                    <tr key={what}>
                      <th scope="row">
                        <span data-edit={`order.priceWhat.${i}`} data-edit-max="60" className={s.priceWhat}>{what}</span>
                        <span data-edit={`order.priceDetail.${i}`} data-edit-max="60" className={s.priceDetail}>{detail}</span>
                      </th>
                      <td className={s.priceLeader} aria-hidden="true" />
                      <td data-edit={`order.price.${i}`} className={s.price}>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dl className={s.shipping}>
                {SHIPPING.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`order.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`order.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={s.coupon}>
              <div data-edit-pattern="order.field" data-edit-roles="transparent,1,3,2,1,3" className={s.couponField} aria-hidden="true">
                <TabbiedPattern pattern={speckfield} palette={DUST} fit="grid" cellSize={28} seed="pip-dust" style={{ position: 'absolute', inset: 0 }} />
              </div>
              <form className={s.orderForm} action="#">
                <p data-edit="order.formHead" data-edit-max="240" data-edit-multiline className={s.formHead}>Order form</p>
                <p data-edit="order.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Fill in, send, and we write back with a total. Pay by card or by check in the post.</p>
                <div className={s.field}>
                  <label data-edit="order.label" htmlFor="ps-name">Your name</label>
                  <input id="ps-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="order.label2" htmlFor="ps-email">Email</label>
                  <input id="ps-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="order.label3" htmlFor="ps-what">What you would like</label>
                  <select id="ps-what" name="what" defaultValue="six">
                    <option value="six">The six on this page, $22</option>
                    <option value="packets">Single packets, listed below</option>
                    <option value="garden">Garden packets, listed below</option>
                    <option value="catalog">Just the printed catalog, please</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="order.label4" htmlFor="ps-list">Varieties and how many</label>
                  <textarea id="ps-list" name="list" rows={3} />
                </div>
                <button data-edit="order.btn" data-edit-max="24" className={s.btn} type="submit">Send the order</button>
              </form>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- GARDEN */}
        <section id="garden" className={s.sec} aria-labelledby="ps-garden-h">
          <div className={s.gardenGrid}>
            <div className={s.gardenText}>
              <p data-edit="garden.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>About the trial garden</p>
              <h2 data-edit="garden.title" data-edit-max="60" id="ps-garden-h">Every packet was a plant on the common</h2>
              <p data-edit="garden.body" data-edit-max="240" data-edit-multiline>Hattie and Joe Lindqvist dug the first beds on Ashby Common in 1987 with seed from three old gardeners in the village. The garden is thirty-two beds now, worked by four of us and a lot of neighbors on Saturday mornings.</p>
              <p data-edit="garden.body2" data-edit-max="240" data-edit-multiline>Nothing goes in the catalog until we have grown it here for two summers, kept it true to type and tested the seed in the barn. What does not germinate at ninety percent goes to the compost, not to you.</p>
              <p data-edit="garden.signed" data-edit-max="240" data-edit-multiline className={s.signed}>Hattie, Joe, Priya and Marcus</p>
            </div>
            <div className={s.bedsWrap}>
              <div data-edit-pattern="garden.field" data-edit-roles="transparent,0,4,0,1,3" className={s.beds} aria-hidden="true">
                <TabbiedPattern pattern={frond} palette={BEDS} options={{ frequency: 0.8 }} fit="grid" cellSize={36} seed="pip-beds" style={{ position: 'absolute', inset: 0 }} />
              </div>
              <dl className={s.trialFacts}>
                {TRIAL_FACTS.map(([figure, what], i) => (
                  <div key={figure}>
                    <dt data-edit={`garden.term.${i}`} data-edit-max="28">{figure}</dt>
                    <dd data-edit={`garden.body3.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="ps-visit-h">
          <div className={s.visit}>
            <div className={s.visitHead}>
              <p data-edit="visit.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Callers welcome</p>
              <h2 data-edit="visit.title" data-edit-max="60" id="ps-visit-h">Visit the barn</h2>
              <p data-edit="visit.address" data-edit-max="240" data-edit-multiline className={s.address}>The seed barn, 14 Long Furrow Lane, Ashby Common</p>
              <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>Past the pond and the cricket pitch, the red barn with the weathervane shaped like a bean. Park on the verge; the lane is narrow.</p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([when, time], i) => (
                <div key={when}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{when}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                </div>
              ))}
            </dl>
            <div className={s.contact}>
              <a data-edit="visit.link" data-edit-max="28" href="tel:+15550162230">(555) 016-2230</a>
              <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@pipandsprout.example">hello@pipandsprout.example</a>
              <p data-edit="visit.body2" data-edit-max="240" data-edit-multiline>Letters and orders by post: Pip &amp; Sprout Seed Co., Long Furrow Lane, Ashby Common.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,2,0,3,4" className={s.lastRow} aria-hidden="true">
          <TabbiedPattern pattern={dotset} palette={LAST_ROW} fit="grid" cellSize={32} seed="pip-last-row" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Pip &amp; Sprout Seed Co.</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional seed company. The varieties, lots, prices, people and places are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The packet pictures are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
