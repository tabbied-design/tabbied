import { TabbiedPattern } from 'tabbied/react';
import { flemishbond } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './brick-beam-inspections.module.css';

export const metadata = {
  title: 'Brick & Beam Home Inspections: Licensed home inspector, Ashford County',
  description:
    'Brick & Beam inspects houses for buyers and sellers in Ashford County: three hours on site, a rated report with photos the same evening, and prices set by the size of the house.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The Flemish
   bond wall is the firm's mark: soot and slate headers, brick and clay
   stretchers, laid on a transparent ground so the paper reads as mortar. */
const PAPER = '#f2eee6';
const SOOT = '#2b2523';
const BRICK = '#a5432b';
const CLAY = '#d58a5c';
const SLATE = '#3e5462';
const OCHRE = '#d8a23a';

const WALL = ['transparent', SOOT, SLATE, BRICK, CLAY, BRICK, CLAY];
const COURSE = ['transparent', SOOT, BRICK, CLAY, BRICK, OCHRE, CLAY];
const NIGHT = ['transparent', PAPER, CLAY, BRICK, CLAY, OCHRE, BRICK];

const NAV = [
  ['Sample report', '#findings'],
  ['Room by room', '#rooms'],
  ['Prices', '#prices'],
  ['Inspection day', '#day'],
  ['Book', '#book'],
];

const COVER = [
  ['Report no.', 'BB-26-0418'],
  ['Inspector', 'D. Marchetti, HI-04418'],
  ['Report sent', 'By 9 pm, same day'],
  ['Fee from', '$375'],
];

const TAG = ['Roof', 'Structure', 'Electrical', 'Plumbing', 'Heating', 'Interior'];

const LEVELS = [
  { id: 'safety', name: 'Safety', says: 'Could hurt someone now. Fix before you move in, or ask the seller to.' },
  { id: 'repair', name: 'Repair', says: 'Not dangerous, but it will cost more the longer it waits. Get quotes.' },
  { id: 'monitor', name: 'Monitor', says: 'Normal wear or an old fault that is stable. Keep an eye on it.' },
  { id: 'note', name: 'Note', says: 'Not a defect. Something worth knowing about the house you are buying.' },
];

type Finding = { no: string; area: string; found: string; level: string; todo: string };

/* A page from a sample report: a 1962 split-level, 1,840 sq ft. */
const FINDINGS: Finding[] = [
  { no: '2.3', area: 'Roof, north slope', level: 'repair', found: 'Three shingles lifted at the ridge, nails backed out. No sign yet of water in the attic below.', todo: 'Roofer to re-nail and seal. Typically $200-350.' },
  { no: '4.1', area: 'Electrical panel', level: 'safety', found: 'Two circuits share one 20-amp breaker (a double tap). The panel is otherwise sound and labeled.', todo: 'Licensed electrician to split the circuits. Typically $150-250.' },
  { no: '5.6', area: 'Water heater', level: 'safety', found: 'The relief valve has no discharge pipe, so scalding water would spray at chest height. Unit is 13 years old.', todo: 'Plumber to fit the pipe now. Budget for a new heater within two years.' },
  { no: '3.2', area: 'Foundation, rear wall', level: 'monitor', found: 'Hairline step crack in the block mortar. Dry, no offset either side. Typical settling for the age.', todo: 'Pencil the ends and date them. Call an engineer if it grows.' },
  { no: '7.4', area: 'Upstairs bathroom', level: 'repair', found: 'The fan vents into the attic, not outdoors. Dark staining on the roof boards above it.', todo: 'Duct the fan through the roof. Typically $300-500.' },
  { no: '8.1', area: 'Attic', level: 'note', found: 'About six inches of loose-fill insulation, roughly R-19. New houses here are built to R-49.', todo: 'Not a defect. Worth topping up before winter; ask about utility rebates.' },
];

type Room = { area: string; items: string[] };

const ROOMS: Room[] = [
  { area: 'Roof and chimney', items: ['Shingles, flashing and valleys', 'Gutters and downspouts', 'Chimney crown, cap and mortar', 'Skylights and roof vents'] },
  { area: 'Exterior', items: ['Siding, trim and caulking', 'Grading and drainage', 'Decks, steps and railings', 'Walks and driveway'] },
  { area: 'Structure', items: ['Foundation walls and cracks', 'Beams, posts and joists', 'Signs of settling or water', 'Sill plates where visible'] },
  { area: 'Electrical', items: ['Service panel and breakers', 'Grounding and bonding', 'GFCI and AFCI protection', 'Outlets in every room'] },
  { area: 'Plumbing', items: ['Supply and drain materials', 'Water heater and relief valve', 'Pressure and flow', 'Leaks under every sink'] },
  { area: 'Heating and cooling', items: ['Furnace or boiler, run in season', 'Air conditioning split', 'Ducts, filters and returns', 'Carbon monoxide near burners'] },
  { area: 'Kitchen', items: ['Range, oven and hood', 'Dishwasher run a full cycle', 'Disposal and drains', 'Counter outlets'] },
  { area: 'Bathrooms', items: ['Every tap, toilet and shower run', 'Fans vented outdoors', 'Tile, grout and caulk', 'Moisture meter at the floor'] },
  { area: 'Attic', items: ['Insulation depth and type', 'Ventilation and baffles', 'Roof boards for staining', 'Vent routing'] },
  { area: 'Basement and crawlspace', items: ['Moisture and efflorescence', 'Sump pump tested', 'Vapor barrier', 'Pests and wood damage'] },
  { area: 'Garage', items: ['Door auto-reverse tested', 'Fire door to the house', 'Slab cracks', 'Wiring and outlets'] },
  { area: 'Windows, doors and stairs', items: ['Operation and locks', 'Failed double-glazing seals', 'Stair rise, run and rails', 'Smoke alarm locations'] },
];

const NOT_INCLUDED = ['Septic systems and wells', 'Pools and hot tubs', 'Mold sampling', 'Asbestos and lead testing', 'Anything behind finished walls'];

type Price = { size: string; note: string; base: string; radon: string; bundle: string };

const PRICES: Price[] = [
  { size: 'Condo or townhouse', note: 'The unit only, shared areas excluded', base: '$295', radon: '$445', bundle: '$590' },
  { size: 'Under 1,500 sq ft', note: 'Most starter houses and bungalows', base: '$375', radon: '$525', bundle: '$670' },
  { size: '1,500-2,500 sq ft', note: 'The usual three-bedroom house', base: '$445', radon: '$595', bundle: '$740' },
  { size: '2,500-3,500 sq ft', note: 'Larger family houses', base: '$525', radon: '$675', bundle: '$820' },
  { size: '3,500-5,000 sq ft', note: 'Two inspectors on site', base: '$625', radon: '$775', bundle: '$920' },
];

const ADDONS = [
  ['Radon test, 48-hour monitor', '$150'],
  ['Sewer line camera scope', '$185'],
  ['Wood-destroying insect report', '$95'],
  ['Re-inspection after repairs', '$150'],
  ['House built before 1940', '+$50'],
  ['Thermal imaging', 'Included'],
];

const DAY = [
  ['Day before', 'Access arranged', 'We confirm the time with the listing agent and send the inspection agreement to sign online.'],
  ['9:00', 'Outside first', 'Roof from a ladder or a pole camera, then the walls, grading, decks and the drainage around the house.'],
  ['10:00', 'Inside, top down', 'Attic, every room, every appliance, the panel, the furnace and the basement or crawlspace.'],
  ['11:30', 'Walkthrough with you', 'Come for the last half hour. We show you what we found, standing in front of it.'],
  ['By 9 pm', 'The report', 'Photos, a rating for every finding and typical repair costs, in a file you can forward to your agent.'],
  ['After', 'Questions', 'Call about the house for as long as you own it. There is no charge for that, ever.'],
];

const CREDENTIALS = [
  ['License', 'State home inspector HI-04418'],
  ['Inspecting since', '2015, over 3,200 houses'],
  ['Before that', 'Twelve years framing houses'],
  ['Insured', '$1,000,000 errors and omissions'],
  ['Training', '24 hours of courses every year'],
  ['Second inspector', 'Ines Garrow, HI-05530'],
];

const HOURS = [
  ['Inspections', 'Monday to Saturday, from 8:30'],
  ['Office phone', 'Monday to Friday, 8:00-6:00'],
  ['Saturday phone', '9:00-1:00'],
];

export default function BrickBeamInspectionsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f2eee6',
        '--soot': '#2b2523',
        '--brick': '#a5432b',
        '--clay': '#d58a5c',
        '--slate': '#3e5462',
        '--ochre': '#d8a23a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,soot,brick,clay,slate,ochre"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;700&family=Public+Sans:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span className={s.brandText}>
            <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Brick &amp; Beam</span>
            <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Home Inspections</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550132741">(555) 013-2741</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section id="hero" className={s.hero} aria-labelledby="hero-h">
          <div className={s.cover}>
            <dl className={s.coverFields}>
              {COVER.map(([term, value], i) => (
                <div key={term} className={s.coverField}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Home inspections for buyers and sellers, Ashford County</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Know the house <em>before you sign.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Three hours on site, from the chimney cap to the sump pit, and a
              report the same evening that says what matters, what can wait,
              and roughly what it will cost to put right.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book an inspection</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#findings">Read a sample report</a>
            </div>
          </div>

          <div className={s.heroWall}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,4,2,3,2,3" className={s.wallField} aria-hidden="true">
              <TabbiedPattern
                pattern={flemishbond}
                palette={WALL}
                fit="grid"
                cellSize={64}
                seed="brick-beam-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.tag}>
              <p data-edit="hero.tagHead" data-edit-max="240" data-edit-multiline className={s.tagHead}>Inspected</p>
              <p data-edit="hero.tagDate" data-edit-max="240" data-edit-multiline className={s.tagDate}>14 Rowan Close, 8 October</p>
              <ul className={s.tagList}>
                {TAG.map((item, i) => (
                  <li data-edit={`hero.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
              <p data-edit="hero.tagFoot" data-edit-max="240" data-edit-multiline className={s.tagFoot}>Report sent 8:40 pm, 31 findings</p>
            </div>
          </div>
        </section>

        <section id="findings" className={s.sec} aria-labelledby="findings-h">
          <div className={s.secHead}>
            <p data-edit="findings.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 1</p>
            <h2 data-edit="findings.secTitle" data-edit-max="60" id="findings-h" className={s.secTitle}>A page from a sample report</h2>
            <p data-edit="findings.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every finding gets one of four ratings, a photo, and a plain
              sentence on what to do next. This is a 1962 split-level of
              1,840 sq ft; most reports run to 30-40 findings.
            </p>
          </div>

          <ul className={s.legend}>
            {LEVELS.map((l, i) => (
              <li key={l.id} className={`${s.legendItem} ${s[l.id]}`}>
                <strong data-edit={`findings.legendName.${i}`} className={s.legendName}>{l.name}</strong>
                <span data-edit={`findings.legendSays.${i}`} data-edit-max="60" className={s.legendSays}>{l.says}</span>
              </li>
            ))}
          </ul>

          <div className={s.report}>
            <div className={s.reportHead} aria-hidden="true">
              <span data-edit="findings.text" data-edit-max="60">No.</span>
              <span data-edit="findings.text2" data-edit-max="60">Where, and what we found</span>
              <span className={s.reportRatings}>
                {LEVELS.map((l, i) => (
                  <span data-edit={`findings.text3.${i}`} data-edit-max="60" key={l.id}>{l.name}</span>
                ))}
              </span>
              <span data-edit="findings.text4" data-edit-max="60">What to do</span>
            </div>
            <ol className={s.findings}>
              {FINDINGS.map((f, i) => (
                <li key={f.no} className={s.finding}>
                  <span data-edit={`findings.findNo.${i}`} data-edit-max="60" className={s.findNo}>{f.no}</span>
                  <div className={s.findBody}>
                    <h3 data-edit={`findings.findArea.${i}`} data-edit-max="40" className={s.findArea}>{f.area}</h3>
                    <p data-edit={`findings.findText.${i}`} data-edit-max="240" data-edit-multiline className={s.findText}>{f.found}</p>
                  </div>
                  <ul className={s.boxes} aria-label="Rating">
                    {LEVELS.map((l, i2) => (
                      <li key={l.id} className={l.id === f.level ? `${s.box} ${s.ticked} ${s[l.id]}` : s.box}>
                        <span data-edit={`findings.boxLabel.${i}.${i2}`} data-edit-max="60" className={s.boxLabel}>{l.name}</span>
                      </li>
                    ))}
                  </ul>
                  <p data-edit={`findings.findTodo.${i}`} data-edit-max="240" data-edit-multiline className={s.findTodo}>{f.todo}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="rooms" className={s.sec} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <p data-edit="rooms.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 2</p>
            <h2 data-edit="rooms.secTitle" data-edit-max="60" id="rooms-h" className={s.secTitle}>What we look at, room by room</h2>
            <p data-edit="rooms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              About 400 items in a typical three-bedroom house. We open every
              panel we safely can, run every tap and appliance, and crawl into
              every crawlspace with a way in.
            </p>
          </div>
          <ol className={s.rooms}>
            {ROOMS.map((room, i) => (
              <li key={room.area} className={s.room}>
                <p className={s.roomNo}>{String(i + 1).padStart(2, '0')}</p>
                <h3 data-edit={`rooms.roomArea.${i}`} data-edit-max="40" className={s.roomArea}>{room.area}</h3>
                <ul className={s.checks}>
                  {room.items.map((item, i2) => (
                    <li data-edit={`rooms.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className={s.excluded}>
            <h3 data-edit="rooms.excludedTitle" data-edit-max="40" className={s.excludedTitle}>Not part of a standard inspection</h3>
            <ul className={s.excludedList}>
              {NOT_INCLUDED.map((item, i) => (
                <li data-edit={`rooms.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
              ))}
            </ul>
            <p data-edit="rooms.excludedNote" data-edit-max="240" data-edit-multiline className={s.excludedNote}>We will tell you who to call for each of these.</p>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,3,2,5,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={flemishbond}
            palette={COURSE}
            fit="grid"
            cellSize={48}
            seed="brick-beam-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 3</p>
            <h2 data-edit="prices.secTitle" data-edit-max="60" id="prices-h" className={s.secTitle}>Prices by the size of the house</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Finished square footage from the listing, basement not counted.
              The same price on a Saturday. You pay at the inspection, by card
              or check, and the report is yours to share.
            </p>
          </div>
          <div className={s.priceGrid}>
            <div className={s.tableWrap}>
              <table className={s.prices}>
                <caption data-edit="prices.srOnly" className={s.srOnly}>Inspection prices by house size</caption>
                <thead>
                  <tr>
                    <th data-edit="prices.heading" scope="col">House size</th>
                    <th data-edit="prices.heading2" scope="col">Inspection</th>
                    <th data-edit="prices.heading3" scope="col">With radon</th>
                    <th data-edit="prices.heading4" scope="col">Buyer bundle</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICES.map((p, i) => (
                    <tr key={p.size}>
                      <th scope="row">
                        <span data-edit={`prices.sizeName.${i}`} data-edit-max="60" className={s.sizeName}>{p.size}</span>
                        <span data-edit={`prices.sizeNote.${i}`} data-edit-max="60" className={s.sizeNote}>{p.note}</span>
                      </th>
                      <td data-edit={`prices.cell.${i}`}>{p.base}</td>
                      <td data-edit={`prices.cell2.${i}`}>{p.radon}</td>
                      <td data-edit={`prices.bundle.${i}`} className={s.bundle}>{p.bundle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="prices.tableNote" data-edit-max="240" data-edit-multiline className={s.tableNote}>
                The buyer bundle is the inspection, a radon test and a sewer
                scope, $40 less than booking them apart. Over 5,000 sq ft, we
                quote after a look at the listing.
              </p>
            </div>
            <aside className={s.addons} aria-labelledby="addons-h">
              <h3 data-edit="addons.addonsTitle" data-edit-max="40" id="addons-h" className={s.addonsTitle}>Add-ons</h3>
              <dl className={s.addonList}>
                {ADDONS.map(([item, price], i) => (
                  <div key={item}>
                    <dt data-edit={`addons.term.${i}`} data-edit-max="28">{item}</dt>
                    <dd data-edit={`addons.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section id="day" className={s.day} aria-labelledby="day-h">
          <div className={s.dayInner}>
            <div className={s.secHead}>
              <p data-edit="day.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 4</p>
              <h2 data-edit="day.secTitle" data-edit-max="60" id="day-h" className={s.secTitle}>Inspection day, hour by hour</h2>
            </div>
            <ol className={s.timeline}>
              {DAY.map(([time, title, text], i) => (
                <li key={title} className={s.step}>
                  <p data-edit={`day.stepTime.${i}`} data-edit-max="240" data-edit-multiline className={s.stepTime}>{time}</p>
                  <h3 data-edit={`day.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                  <p data-edit={`day.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="inspector" className={s.sec} aria-labelledby="inspector-h">
          <div className={s.inspector}>
            <div data-edit-pattern="inspector.field" data-edit-roles="transparent,1,4,2,3,2,3" className={s.badge} aria-hidden="true">
              <TabbiedPattern
                pattern={flemishbond}
                palette={WALL}
                fit="grid"
                cellSize={40}
                seed="brick-beam-doorway"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.inspectorText}>
              <p data-edit="inspector.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 5</p>
              <h2 data-edit="inspector.secTitle" data-edit-max="60" id="inspector-h" className={s.secTitle}>Who comes to the house</h2>
              <p data-edit="inspector.inspectorLead" data-edit-max="240" data-edit-multiline className={s.inspectorLead}>
                Dale Marchetti does most inspections himself. He framed houses
                for twelve years before he started inspecting them, which is
                why he still goes into every crawlspace and why his reports
                explain how a thing was built, not only that it is wrong.
              </p>
              <dl className={s.creds}>
                {CREDENTIALS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`inspector.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`inspector.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.contact}>
            <div className={s.contactInfo}>
              <p data-edit="book.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 6</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book an inspection</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Most weeks we can inspect within three days of your call,
                inside the usual ten-day contingency period.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Phone</dt>
                  <dd><a data-edit="book.link" data-edit-max="28" href="tel:+15550132741">(555) 013-2741</a></dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Email</dt>
                  <dd><a data-edit="book.link2" data-edit-max="28" href="mailto:office@brickandbeam.example">office@brickandbeam.example</a></dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Office</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>41 Kiln Row, Ashford</dd>
                </div>
                {HOURS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`book.term4.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`book.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <p data-edit="book.formHead" data-edit-max="240" data-edit-multiline className={s.formHead}>Inspection request</p>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="book.text" data-edit-max="60">Your name</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <label className={s.field}>
                  <span data-edit="book.text2" data-edit-max="60">Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="book.text3" data-edit-max="60">Email</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
              <label className={s.field}>
                <span data-edit="book.text4" data-edit-max="60">Property address</span>
                <input type="text" name="address" />
              </label>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="book.text5" data-edit-max="60">Size in sq ft</span>
                  <input type="text" name="size" inputMode="numeric" />
                </label>
                <label className={s.field}>
                  <span data-edit="book.text6" data-edit-max="60">Preferred date</span>
                  <input type="date" name="date" />
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="book.text7" data-edit-max="60">Anything we should know</span>
                <textarea name="notes" rows={3} />
              </label>
              <button data-edit="book.button" data-edit-max="24" className={s.button} type="submit">Send the request</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,3,2,3,5,2" className={s.footerWall} aria-hidden="true">
          <TabbiedPattern
            pattern={flemishbond}
            palette={NIGHT}
            fit="grid"
            cellSize={40}
            seed="brick-beam-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footerInner}>
          <p data-edit="footer.footerName" data-edit-max="240" data-edit-multiline className={s.footerName}>Brick &amp; Beam Home Inspections</p>
          <p data-edit="footer.footerLine" data-edit-max="240" data-edit-multiline className={s.footerLine}>41 Kiln Row, Ashford. Licensed and insured.</p>
          <p data-edit="footer.footerLine2" data-edit-max="240" data-edit-multiline className={s.footerLine}>
            Brick &amp; Beam is a fictional business: the names, people, prices
            and address on this page are invented.
          </p>
          <p className={s.footerCredit}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
