import { TabbiedPattern } from 'tabbied/react';
import { perforate, squarelabyrinth } from 'tabbied/patterns';
import s from './bolt-and-bench.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Bolt & Bench: Neighborhood hardware store, Mill Road',
  description:
    'Bolt & Bench is a hardware store on Mill Road: eight aisles, keys cut while you wait, paint mixed to any chip, tools sharpened and rented by the half day. Open seven days.',
};

/* Site colors. The labyrinth is drawn in ink and orange on a transparent
   ground, and the pegboard in the two grays of the shop floor. */
const PAPER = '#F3F1EC';
const INK = '#1A1A1A';
const ORANGE = '#E8651A';
const STEEL = '#7D7A74';
const CONCRETE = '#DAD6CD';

const MAZE = ['transparent', INK, ORANGE];
const MAZE_FAINT = ['transparent', STEEL, CONCRETE];
const PEGBOARD = ['transparent', PAPER];

const NAV = [
  ['Aisles', '#aisles'],
  ['Store map', '#map'],
  ['Services', '#services'],
  ['Deals', '#deals'],
  ['Hours', '#hours'],
];

type Aisle = {
  no: string;
  name: string;
  art: string;
  alt: string;
  items: string[];
  ask: string;
  orange: boolean;
};

const AISLES: Aisle[] = [
  {
    no: '1',
    name: 'Fasteners',
    art: 'bolt-and-bench-hammer',
    alt: 'A claw hammer',
    items: ['Nails and screws, sold by the one', 'Bolts, nuts, washers', 'Wall anchors and toggles', 'Hooks, hinges, brackets'],
    ask: 'Ask Ray',
    orange: true,
  },
  {
    no: '2',
    name: 'Hand tools',
    art: 'bolt-and-bench-wrench',
    alt: 'An adjustable wrench',
    items: ['Hammers, saws, chisels', 'Wrenches and sockets', 'Tape measures and levels', 'Pliers and snips'],
    ask: 'Ask Ray',
    orange: false,
  },
  {
    no: '3',
    name: 'Paint and stain',
    art: 'bolt-and-bench-roller',
    alt: 'A paint roller',
    items: ['Interior and exterior paint', 'Stains, oils, varnish', 'Primer and sealer', 'Chips for every brand'],
    ask: 'Ask Denise',
    orange: true,
  },
  {
    no: '4',
    name: 'Lawn and garden',
    art: 'bolt-and-bench-trowel',
    alt: 'A garden trowel',
    items: ['Trowels, forks, pruners', 'Hose, fittings, sprinklers', 'Seed, soil, fertilizer', 'Bird feeders and seed'],
    ask: 'Ask Luis',
    orange: false,
  },
  {
    no: '5',
    name: 'Plumbing',
    art: 'bolt-and-bench-wrench',
    alt: 'An adjustable wrench',
    items: ['Faucet parts and washers', 'PVC, copper, PEX fittings', 'Toilet repair kits', 'Drain snakes and plungers'],
    ask: 'Ask Pete',
    orange: false,
  },
  {
    no: '6',
    name: 'Building',
    art: 'bolt-and-bench-hammer',
    alt: 'A claw hammer',
    items: ['Lumber cut to length', 'Dowels and moulding', 'Glue, clamps, sandpaper', 'Sawhorses and ladders'],
    ask: 'Ask Pete',
    orange: true,
  },
  {
    no: '7',
    name: 'Patch and plaster',
    art: 'bolt-and-bench-trowel',
    alt: 'A trowel',
    items: ['Spackle and joint compound', 'Drywall tape and patches', 'Caulk and grout', 'Knives and floats'],
    ask: 'Ask Denise',
    orange: false,
  },
  {
    no: '8',
    name: 'Brushes and cleaning',
    art: 'bolt-and-bench-roller',
    alt: 'A paint roller',
    items: ['Brushes, rollers, trays', 'Tape and drop cloths', 'Brooms, mops, buckets', 'Cleaners and degreasers'],
    ask: 'Ask Luis',
    orange: true,
  },
];

const MAP_KEY = [
  ['Aisles 1 to 8', 'Front to back, lowest number by the window'],
  ['Key counter', 'Keys, checkout, special orders'],
  ['Paint desk', 'Mixing, matching, sample pots'],
  ['Sharpening', 'Drop-off shelf beside the paint desk'],
  ['Rental dock', 'Pick up and return by the back door'],
  ['Garden yard', 'Soil, mulch and plants, April to October'],
];

type Service = {
  name: string;
  from: string;
  lede: string;
  lines: string[][];
};

const SERVICES: Service[] = [
  {
    name: 'Keys cut',
    from: 'from $2.50',
    lede: 'While you wait, at the counter by the door. Bring the key, not a photo of it.',
    lines: [
      ['House key', '$2.50'],
      ['Colored or patterned', '$4'],
      ['Padlock and mailbox', '$3'],
      ['Car key with chip', 'from $45'],
    ],
  },
  {
    name: 'Paint mixed',
    from: 'free mixing',
    lede: 'Any color matched from a chip, a scrap of wallpaper or a flake off the old door.',
    lines: [
      ['Sample pot', '$6'],
      ['Quart', '$19'],
      ['Gallon', '$42'],
      ['Five gallons', '$189'],
    ],
  },
  {
    name: 'Tools sharpened',
    from: 'from $5',
    lede: 'Leave them on the shelf by the paint desk. Ready in two working days.',
    lines: [
      ['Kitchen knife', '$6'],
      ['Scissors or shears', '$5'],
      ['Mower blade', '$12'],
      ['Chainsaw chain', '$14'],
    ],
  },
  {
    name: 'Rentals',
    from: 'half day or day',
    lede: 'Clean, checked and fueled. A $50 deposit, returned when the tool comes back.',
    lines: [
      ['Tile saw', '$32 / $48'],
      ['Carpet cleaner', '$28 / $40'],
      ['Pressure washer', '$45 / $70'],
      ['24 ft ladder', '$18 / $28'],
    ],
  },
];

const DEALS = [
  { what: 'Exterior latex paint', size: 'Gallon, any sheen', now: '$34', was: '$44' },
  { what: 'Contractor trash bags', size: '42 count, 3 mil', now: '$14.99', was: '$19.99' },
  { what: 'Tape measure', size: '25 ft, magnetic tip', now: '$9.99', was: '$14.99' },
  { what: 'Wild bird seed', size: '20 lb bag', now: '$16', was: '$22' },
];

const HOURS = [
  ['Monday to Friday', '7 am to 7 pm'],
  ['Saturday', '8 am to 6 pm'],
  ['Sunday', '9 am to 4 pm'],
  ['Contractor desk', 'Weekdays from 6:30 am'],
];

export default function BoltAndBenchPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f3f1ec',
        '--ink': '#1a1a1a',
        '--orange': '#e8651a',
        '--steel': '#7d7a74',
        '--concrete': '#dad6cd',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,orange,steel,concrete"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Bolt &amp; Bench</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Hardware</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barPhone" data-edit-max="28" className={s.barPhone} href="tel:+15550130877">(555) 013-0877</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The primary pattern as a big square panel, the four tools hung
            on a rail across its foot. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Hardware, paint and keys on Mill Road since 1962</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.title} id="hero-h">
              Eight aisles and someone
              <br />
              <em>who knows what is in them.</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Screws sold by the one, paint mixed to any chip, keys cut while
              you wait. Tell us what broke and we will walk you to the aisle,
              and usually to the right shelf.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btnSolid" data-edit-max="28" className={s.btnSolid} href="#aisles">Find an aisle</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#deals">This week's deals</a>
            </div>
            <dl className={s.status}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Open today</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>7 am to 7 pm</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Parking</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>Lot behind the store</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroPanel}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2" className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={squarelabyrinth}
                palette={MAZE}
                fit="grid"
                cellSize={120}
                seed="bolt-hero-2"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.rail}>
              <Artwork slug="bolt-and-bench-hammer" alt="A claw hammer" inks={['var(--ink)']} className={s.railTool} />
              <Artwork slug="bolt-and-bench-wrench" alt="An adjustable wrench" inks={['var(--orange)']} className={s.railTool} />
              <Artwork slug="bolt-and-bench-trowel" alt="A garden trowel" inks={['var(--ink)']} className={s.railTool} />
              <Artwork slug="bolt-and-bench-roller" alt="A paint roller" inks={['var(--orange)']} className={s.railTool} />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ DIRECTORY
            One hanging sign per aisle: the number, its tool, what is on
            the shelves and who to ask. */}
        <section id="aisles" className={s.sec} aria-labelledby="aisles-h">
          <div className={s.aislesTop}>
            <div className={s.secHead}>
              <span data-edit="aisles.secTag" data-edit-max="60" className={s.secTag}>Store directory</span>
              <h2 data-edit="aisles.secTitle" data-edit-max="60" className={s.secTitle} id="aisles-h">What is in each aisle</h2>
              <p data-edit="aisles.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                About 14,000 things on eight aisles. If it is not on the shelf we
                can usually have it by Thursday.
              </p>
            </div>
            <div className={s.aislesTile} aria-hidden="true">
              <TabbiedPattern
                pattern={squarelabyrinth}
                palette={MAZE}
                fit="grid"
                cellSize={80}
                seed="bolt-tile"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <ol className={s.aisles}>
            {AISLES.map((a, i) => (
              <li key={a.no} className={`${s.aisle} ${a.orange ? s.aisleOrange : ''}`}>
                <div className={s.aisleSign}>
                  <span data-edit={`aisles.aisleWord.${i}`} data-edit-max="60" className={s.aisleWord}>Aisle</span>
                  <span data-edit={`aisles.aisleNo.${i}`} data-edit-max="60" className={s.aisleNo}>{a.no}</span>
                </div>
                <div className={s.aisleArt}>
                  <Artwork
                    slug={a.art}
                    alt={a.alt}
                    inks={[a.orange ? 'var(--orange)' : 'var(--ink)']}
                    className={s.aisleTool}
                  />
                </div>
                <h3 data-edit={`aisles.aisleName.${i}`} data-edit-max="40" className={s.aisleName}>{a.name}</h3>
                <ul className={s.aisleItems}>
                  {a.items.map((it, i2) => (
                    <li data-edit={`aisles.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
                <span data-edit={`aisles.aisleAsk.${i}`} data-edit-max="60" className={s.aisleAsk}>{a.ask}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ STORE MAP
            The floor plan drawn as a grid: aisles in gray, the counters in
            orange, the front door at the bottom. */}
        <section id="map" className={s.sec} aria-labelledby="map-h">
          <div className={s.mapWrap}>
            <div className={s.mapText}>
              <span data-edit="map.secTag" data-edit-max="60" className={s.secTag}>Floor plan</span>
              <h2 data-edit="map.secTitle" data-edit-max="60" className={s.secTitle} id="map-h">Store map</h2>
              <p data-edit="map.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Come in by the front door on Mill Road. The key counter is on
                your right; everything else is straight ahead.
              </p>
              <dl className={s.mapKey}>
                {MAP_KEY.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`map.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`map.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.map} role="img" aria-label="Floor plan: aisles 1 to 8 run front to back, the key counter is by the front door, the paint desk and rental dock are at the back, the garden yard is along the left side.">
              <div data-edit-pattern="map.field" data-edit-roles="transparent,3,4" className={s.mapFloor} aria-hidden="true">
                <TabbiedPattern
                  pattern={squarelabyrinth}
                  palette={MAZE_FAINT}
                  fit="grid"
                  cellSize={120}
                  seed="bolt-floor"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span data-edit="map.zone" data-edit-max="60" className={`${s.zone} ${s.zGarden}`}>Garden yard</span>
              <span data-edit="map.zone2" data-edit-max="60" className={`${s.zone} ${s.zPaint}`}>Paint desk</span>
              <span data-edit="map.zone3" data-edit-max="60" className={`${s.zone} ${s.zSharp}`}>Sharpening</span>
              <span data-edit="map.zone4" data-edit-max="60" className={`${s.zone} ${s.zRental}`}>Rental dock</span>
              <span data-edit="map.zone5" data-edit-max="60" className={`${s.zone} ${s.zKeys}`}>Key counter</span>
              <span data-edit="map.zone6" data-edit-max="60" className={`${s.zone} ${s.zDoor}`}>Front door</span>
              {AISLES.map((a, i) => (
                <span data-edit={`map.zone7.${i}`} data-edit-max="60" key={a.no} className={`${s.zone} ${s.zAisle}`}>{a.no}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- SERVICES
            Four cards pinned to a pegboard. */}
        <section id="services" className={s.services} aria-labelledby="services-h">
          <div data-edit-pattern="services.field" data-edit-roles="transparent,0" className={s.pegField} aria-hidden="true">
            <TabbiedPattern
              pattern={perforate}
              palette={PEGBOARD}
              fit="grid"
              cellSize={56}
              options={{ frequency: 1 }}
              seed="bolt-peg"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.servicesInner}>
            <div className={s.secHead}>
              <span data-edit="services.secTag" data-edit-max="60" className={s.secTag}>At the counter</span>
              <h2 data-edit="services.secTitle" data-edit-max="60" className={s.secTitle} id="services-h">Services</h2>
              <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Done in the store by the people who work here. No appointment
                for any of it.
              </p>
            </div>
            <div className={s.serviceGrid}>
              {SERVICES.map((sv, i) => (
                <article key={sv.name} className={s.service}>
                  <div className={s.serviceHead}>
                    <h3 data-edit={`service.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{sv.name}</h3>
                    <span data-edit={`service.serviceFrom.${i}`} data-edit-max="60" className={s.serviceFrom}>{sv.from}</span>
                  </div>
                  <p data-edit={`service.serviceLede.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceLede}>{sv.lede}</p>
                  <dl className={s.serviceLines}>
                    {sv.lines.map(([k, v], i2) => (
                      <div key={k}>
                        <dt data-edit={`service.term.${i}.${i2}`} data-edit-max="28">{k}</dt>
                        <dd data-edit={`service.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
            <p data-edit="services.rentalNote" data-edit-max="240" data-edit-multiline className={s.rentalNote}>Rental prices are for a half day (4 hours) and a full day.</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- DEALS
            Shelf tags, the way they look on the end caps. */}
        <section id="deals" className={s.sec} aria-labelledby="deals-h">
          <div className={s.secHead}>
            <span data-edit="deals.secTag" data-edit-max="60" className={s.secTag}>Wednesday 23 to Tuesday 29 September</span>
            <h2 data-edit="deals.secTitle" data-edit-max="60" className={s.secTitle} id="deals-h">This week's deals</h2>
            <p data-edit="deals.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              On the end caps by the key counter while they last. No coupon,
              no card, no limit that a reasonable person would reach.
            </p>
          </div>
          <ul className={s.deals}>
            {DEALS.map((d, i) => (
              <li key={d.what} className={s.tag}>
                <span className={s.tagHole} aria-hidden="true" />
                <span data-edit={`deals.tagWhat.${i}`} data-edit-max="60" className={s.tagWhat}>{d.what}</span>
                <span data-edit={`deals.tagSize.${i}`} data-edit-max="60" className={s.tagSize}>{d.size}</span>
                <strong data-edit={`deals.tagNow.${i}`} className={s.tagNow}>{d.now}</strong>
                <span className={s.tagWas}>{`Was ${d.was}`}</span>
              </li>
            ))}
          </ul>
          <div className={s.shelfEdge} aria-hidden="true">
            <TabbiedPattern
              pattern={squarelabyrinth}
              palette={MAZE}
              fit="grid"
              cellSize={36}
              seed="bolt-shelf"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ---------------------------------------------------------- HOURS */}
        <section id="hours" className={s.hoursSec} aria-labelledby="hours-h">
          <div className={s.hoursInner}>
            <div className={s.hoursArt}>
              <div className={s.hoursPlate} aria-hidden="true">
                <TabbiedPattern
                  pattern={squarelabyrinth}
                  palette={MAZE_FAINT}
                  fit="grid"
                  cellSize={64}
                  seed="bolt-plate"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="bolt-and-bench-hammer"
                alt=""
                inks={['var(--orange)']}
                className={s.hoursHammer}
              />
              <Artwork
                slug="bolt-and-bench-wrench"
                alt=""
                inks={['var(--paper)']}
                className={s.hoursWrench}
              />
            </div>
            <div className={s.hoursText}>
              <span data-edit="hours.secTag" data-edit-max="60" className={s.secTag}>Open seven days</span>
              <h2 data-edit="hours.secTitle" data-edit-max="60" className={s.secTitle} id="hours-h">Hours and where to find us</h2>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`hours.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`hours.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="hours.address" data-edit-max="240" data-edit-multiline className={s.address}>2 Mill Road, on the corner of Station Street</p>
              <p data-edit="hours.hoursNote" data-edit-max="240" data-edit-multiline className={s.hoursNote}>
                Parking and the loading bay are behind the store. We will carry
                anything heavy to your car, and deliver in town on Tuesdays and
                Fridays for $10.
              </p>
              <ul className={s.contact}>
                <li>
                  <a data-edit="hours.link" data-edit-max="28" href="tel:+15550130877">(555) 013-0877</a>
                </li>
                <li>
                  <a data-edit="hours.link2" data-edit-max="28" href="mailto:counter@boltandbench.example">counter@boltandbench.example</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Bolt &amp; Bench</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional hardware store. Prices, people and hours are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the store's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
