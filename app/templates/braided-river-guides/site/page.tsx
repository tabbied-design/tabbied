import { TabbiedPattern } from 'tabbied/react';
import { anabranch } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './braided-river-guides.module.css';

export const metadata = {
  title: 'Braided River Fly Fishing: Guided wade trips on the Alder River',
  description:
    'Half-day and full-day guided fly-fishing trips on four beats of the braided Alder River. A month-by-month hatch chart, what is in the fly box now, and what to bring.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The anabranch
   is the river: arcs that split and rejoin like braided channels, in water
   blue, birch, trout rose and caddis gold, laid on a transparent ground so
   the deep pool green runs between them. It is the river on the map, the
   lid of the fly box, a band before the gear list and the footer's edge. */
const POOL = '#16302d';
const BIRCH = '#f2ebda';
const WATER = '#7cbad0';
const TROUT = '#e8896f';
const CADDIS = '#d8b45c';

const RIVER = ['transparent', WATER, BIRCH, WATER, CADDIS, TROUT];
const LID = ['transparent', TROUT, CADDIS, WATER, BIRCH, CADDIS];
const BAND = ['transparent', CADDIS, WATER, TROUT, BIRCH, WATER];

const NAV = [
  ['The beats', '#beats'],
  ['Trips', '#trips'],
  ['Hatch chart', '#hatches'],
  ['License and gear', '#gear'],
  ['Book', '#book'],
];

const REPORT = [
  ['Flow', '410 cfs, dropping'],
  ['Water', '51 degrees F'],
  ['Clarity', 'Four feet, green'],
  ['Hatching', 'Olives at noon, caddis at dusk'],
];

/* The pins on the map, upstream to down. */
const PINS = [
  { id: 'p1', no: '1', name: 'The Gravel Braids' },
  { id: 'p2', no: '2', name: 'Cottonwood Run' },
  { id: 'p3', no: '3', name: 'Heron Flats' },
  { id: 'p4', no: '4', name: 'Canyon Pool' },
];

type Beat = { no: string; name: string; miles: string; water: string; wading: string; text: string };

const BEATS: Beat[] = [
  { no: '1', name: 'The Gravel Braids', miles: '2.8 river miles', water: 'Riffles and seams', wading: 'Easy wading', text: 'Six channels across a wide gravel bar. Small water, eager fish, the best place to learn to read a seam.' },
  { no: '2', name: 'Cottonwood Run', miles: '1.9 river miles', water: 'Long glides', wading: 'Moderate', text: 'One deep channel under the cottonwoods, where the bigger browns rise to olives on gray afternoons.' },
  { no: '3', name: 'Heron Flats', miles: '3.4 river miles', water: 'Flats and side channels', wading: 'Easy, soft bottom', text: 'Slow, clear and spooky. Sight fishing to cruising trout with long leaders and small dries.' },
  { no: '4', name: 'Canyon Pool', miles: '1.2 river miles', water: 'Pocket water and one big pool', wading: 'Hard, rocky', text: 'Where the braids gather before the canyon. Heavy nymphs, streamers, and the fish people come back for.' },
];

type Trip = { name: string; price: string; hours: string; text: string; items: string[]; feature?: boolean };

const TRIPS: Trip[] = [
  {
    name: 'Half day',
    price: '$375',
    hours: '4 hours, 1 or 2 anglers',
    text: 'Morning or afternoon on the beat that is fishing best that day. Good for a first trip or a long lunch break.',
    items: ['Rods, reels, waders and boots', 'Flies, leaders and tippet', 'Snacks and water'],
  },
  {
    name: 'Full day',
    price: '$595',
    hours: '8 hours, 1 or 2 anglers',
    text: 'Two beats, a streamside lunch on the gravel, and the evening rise if it comes. Most anglers who fish with us twice book this.',
    items: ['Everything in the half day', 'Lunch cooked on the bank', 'A shuttle between beats'],
    feature: true,
  },
  {
    name: 'First cast lesson',
    price: '$180',
    hours: '2 hours, up to 3 people',
    text: 'Casting, knots and reading the water on the easy channels of the Braids. No fish promised, but they often oblige.',
    items: ['All gear included', 'A printed knot card', 'Credit toward a later trip'],
  },
];

/* The hatch chart: one letter per month, March to November.
   '.' none, 'o' hatching, 'P' at its peak. */
const MONTHS = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

const HATCHES = [
  { bug: 'Midges', fly: 'Zebra midge #20', months: 'PPoooooPP' },
  { bug: 'Blue-winged olives', fly: 'Parachute BWO #18', months: 'PPo....PP' },
  { bug: 'Skwala stoneflies', fly: 'Skwala #10', months: 'oP.......' },
  { bug: 'Mothers Day caddis', fly: 'Elk hair caddis #14', months: '.PP......' },
  { bug: 'Pale morning duns', fly: 'Sparkle dun #16', months: '...PPo...' },
  { bug: 'Golden stoneflies', fly: 'Chubby Chernobyl #8', months: '...PP....' },
  { bug: 'Hoppers', fly: 'Morrish hopper #10', months: '....oPPo.' },
  { bug: 'Tricos', fly: 'Trico spinner #22', months: '.....PPo.' },
  { bug: 'October caddis', fly: 'Orange stimulator #8', months: '......oPo' },
];

const LEVEL: Record<string, string> = { '.': 'none', o: 'on', P: 'peak' };
const LEVEL_TEXT: Record<string, string> = { '.': 'Not hatching', o: 'Hatching', P: 'Peak' };

const IN_BOX = [
  ['Parachute BWO', 'Size 18, midday'],
  ['Orange stimulator', 'Size 8, at dusk'],
  ['Pheasant tail', 'Size 16, all day'],
  ['Zebra midge', 'Size 20, slow water'],
  ['Woolly bugger', 'Olive, the canyon'],
  ['Soft hackle', 'Size 14, the swing'],
];

const BRING = ['A state fishing license', 'Polarized sunglasses', 'A brimmed hat', 'Layers and a rain shell', 'Wading socks, if you have them'];
const SUPPLY = ['9 foot 5 weight rods', 'Waders and boots, sizes 6 to 14', 'Every fly and leader', 'A landing net and the camera'];

const HOURS = [
  ['Fly shop', '6:00 am-6:00 pm, April to October'],
  ['Winter', 'Thursday to Sunday, 9:00-4:00'],
];

export default function BraidedRiverPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--pool': '#16302d',
        '--birch': '#f2ebda',
        '--water': '#7cbad0',
        '--trout': '#e8896f',
        '--caddis': '#d8b45c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="pool,birch,water,trout,caddis"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Karla:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Braided River</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Fly fishing guides, Alder Bend</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Book a trip</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The promise and today's river report, over a map of the river:
            the channel cut from the anabranch field, gravel bars in it, and
            the four beats pinned upstream to down. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroTop}>
            <div className={s.heroText}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Guided wade trips on the Alder River, since 2009</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Fish the braids with a guide who <em>reads the water.</em>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Eleven miles of braided river, split into four beats we know
                channel by channel. Half days and full days for anglers of
                every level, rods and waders included.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a trip</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#hatches">What is hatching</a>
              </div>
            </div>

            <aside className={s.report} aria-labelledby="report-h">
              <p data-edit="report.reportDate" data-edit-max="240" data-edit-multiline className={s.reportDate}>Monday, October 6</p>
              <h2 data-edit="report.reportTitle" data-edit-max="60" id="report-h" className={s.reportTitle}>River report</h2>
              <dl className={s.reportList}>
                {REPORT.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`report.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`report.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="report.reportBest" data-edit-max="240" data-edit-multiline className={s.reportBest}>Best beat today: Cottonwood Run</p>
            </aside>
          </div>

          <div className={s.map}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,1,2,4,3" className={s.river} aria-hidden="true">
              <TabbiedPattern
                pattern={anabranch}
                palette={RIVER}
                fit="grid"
                cellSize={34}
                seed="braided-river-map"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={`${s.bar1} ${s.gravel}`} aria-hidden="true" />
            <span className={`${s.bar2} ${s.gravel}`} aria-hidden="true" />
            <span className={`${s.bar3} ${s.gravel}`} aria-hidden="true" />
            {PINS.map((p, i) => (
              <p key={p.id} className={`${s.pin} ${s[p.id]}`}>
                <span data-edit={`hero.pinNo.${i}`} data-edit-max="60" className={s.pinNo}>{p.no}</span>
                <span data-edit={`hero.pinName.${i}`} data-edit-max="60" className={s.pinName}>{p.name}</span>
              </p>
            ))}
            <p data-edit="hero.upstream" data-edit-max="240" data-edit-multiline className={s.upstream}>Alder Bend put-in</p>
            <p data-edit="hero.downstream" data-edit-max="240" data-edit-multiline className={s.downstream}>Canyon take-out</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- BEATS */}
        <section id="beats" className={s.sec} aria-labelledby="beats-h">
          <div className={s.secHead}>
            <h2 data-edit="beats.secTitle" data-edit-max="60" id="beats-h" className={s.secTitle}>Four beats, upstream to down</h2>
            <p data-edit="beats.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              We fish one beat a day per party, so nobody shares water with
              another guide. Which one depends on flows, wind and the hatch,
              and we decide the evening before.
            </p>
          </div>
          <ol className={s.beats}>
            {BEATS.map((b, i) => (
              <li key={b.no} className={s.beat}>
                <p data-edit={`beats.beatNo.${i}`} data-edit-max="240" data-edit-multiline className={s.beatNo}>{b.no}</p>
                <h3 data-edit={`beats.beatName.${i}`} data-edit-max="40" className={s.beatName}>{b.name}</h3>
                <ul className={s.beatTags}>
                  <li data-edit={`beats.item.${i}`} data-edit-max="80">{b.miles}</li>
                  <li data-edit={`beats.item2.${i}`} data-edit-max="80">{b.water}</li>
                  <li data-edit={`beats.item3.${i}`} data-edit-max="80">{b.wading}</li>
                </ul>
                <p data-edit={`beats.beatText.${i}`} data-edit-max="240" data-edit-multiline className={s.beatText}>{b.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- TRIPS */}
        <section id="trips" className={s.sec} aria-labelledby="trips-h">
          <div className={s.secHead}>
            <h2 data-edit="trips.secTitle" data-edit-max="60" id="trips-h" className={s.secTitle}>Trips and prices</h2>
            <p data-edit="trips.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices are per trip, not per angler. A third angler on a full day
              adds $150 and a second guide. Gratuity is never expected and
              always goes to the guide.
            </p>
          </div>
          <ul className={s.trips}>
            {TRIPS.map((t, i) => (
              <li key={t.name} className={t.feature ? `${s.trip} ${s.tripFeature}` : s.trip}>
                <h3 data-edit={`trips.tripName.${i}`} data-edit-max="40" className={s.tripName}>{t.name}</h3>
                <p data-edit={`trips.tripHours.${i}`} data-edit-max="240" data-edit-multiline className={s.tripHours}>{t.hours}</p>
                <p data-edit={`trips.tripPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.tripPrice}>{t.price}</p>
                <p data-edit={`trips.tripText.${i}`} data-edit-max="240" data-edit-multiline className={s.tripText}>{t.text}</p>
                <ul className={s.tripItems}>
                  {t.items.map((item, i2) => (
                    <li data-edit={`trips.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- HATCHES
            The hatch chart, March to November, and this week's fly box. */}
        <section id="hatches" className={s.sec} aria-labelledby="hatches-h">
          <div className={s.secHead}>
            <h2 data-edit="hatches.secTitle" data-edit-max="60" id="hatches-h" className={s.secTitle}>What is hatching, month by month</h2>
            <p data-edit="hatches.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Our chart from fifteen seasons of notebooks. A dark bar is a
              hatch worth planning a trip around; a light one is worth carrying
              the fly for.
            </p>
          </div>
          <div className={s.hatchGrid}>
            <div className={s.chartWrap}>
              <table className={s.chart}>
                <caption data-edit="hatches.srOnly" className={s.srOnly}>Insects hatching on the Alder River by month, with the fly we tie on</caption>
                <thead>
                  <tr>
                    <th data-edit="hatches.heading" scope="col">Insect and fly</th>
                    {MONTHS.map((m, i) => (
                      <th data-edit={`hatches.month.${i}`} key={m} scope="col" className={s.month}>{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HATCHES.map((h, i) => (
                    <tr key={h.bug}>
                      <th scope="row">
                        <span data-edit={`hatches.bug.${i}`} data-edit-max="60" className={s.bug}>{h.bug}</span>
                        <span data-edit={`hatches.fly.${i}`} data-edit-max="60" className={s.fly}>{h.fly}</span>
                      </th>
                      {h.months.split('').map((c, j) => (
                        <td key={MONTHS[j]} className={s[LEVEL[c]]}>
                          <span data-edit={`hatches.srOnly2.${i}.${j}`} data-edit-max="60" className={s.srOnly}>{LEVEL_TEXT[c]}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={s.flyBox}>
              <div data-edit-pattern="hatches.field" data-edit-roles="transparent,3,4,2,1,4" className={s.lid} aria-hidden="true">
                <TabbiedPattern
                  pattern={anabranch}
                  palette={LID}
                  fit="grid"
                  cellSize={30}
                  seed="braided-river-lid"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.boxBody}>
                <h3 data-edit="hatches.boxTitle" data-edit-max="40" className={s.boxTitle}>In the box this week</h3>
                <ul className={s.slots}>
                  {IN_BOX.map(([fly, when], i) => (
                    <li key={fly} className={s.slot}>
                      <span data-edit={`hatches.slotFly.${i}`} data-edit-max="60" className={s.slotFly}>{fly}</span>
                      <span data-edit={`hatches.slotWhen.${i}`} data-edit-max="60" className={s.slotWhen}>{when}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,2,3,1,2" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={anabranch}
            palette={BAND}
            fit="grid"
            cellSize={40}
            seed="braided-river-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ GEAR */}
        <section id="gear" className={s.sec} aria-labelledby="gear-h">
          <div className={s.secHead}>
            <h2 data-edit="gear.secTitle" data-edit-max="60" id="gear-h" className={s.secTitle}>Licenses, gear and the rules</h2>
            <p data-edit="gear.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The river is catch and release with barbless hooks from the
              Braids to the canyon. We keep every fish wet and every photo quick.
            </p>
          </div>
          <div className={s.gear}>
            <div className={s.license}>
              <h3 data-edit="gear.gearTitle" data-edit-max="40" className={s.gearTitle}>Your license</h3>
              <p data-edit="gear.gearText" data-edit-max="240" data-edit-multiline className={s.gearText}>
                Everyone 14 and over needs a state fishing license, bought online
                before the trip. We cannot sell one at the shop.
              </p>
              <dl className={s.fees}>
                <div>
                  <dt data-edit="gear.term" data-edit-max="28">Resident, one year</dt>
                  <dd data-edit="gear.body" data-edit-max="200" data-edit-multiline>$28</dd>
                </div>
                <div>
                  <dt data-edit="gear.term2" data-edit-max="28">Visitor, two days</dt>
                  <dd data-edit="gear.body2" data-edit-max="200" data-edit-multiline>$34</dd>
                </div>
                <div>
                  <dt data-edit="gear.term3" data-edit-max="28">Visitor, one year</dt>
                  <dd data-edit="gear.body3" data-edit-max="200" data-edit-multiline>$96</dd>
                </div>
              </dl>
            </div>
            <div className={s.lists}>
              <div>
                <h3 data-edit="gear.gearTitle2" data-edit-max="40" className={s.gearTitle}>We supply</h3>
                <ul className={s.list}>
                  {SUPPLY.map((item, i) => (
                    <li data-edit={`gear.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 data-edit="gear.gearTitle3" data-edit-max="40" className={s.gearTitle}>You bring</h3>
                <ul className={s.list}>
                  {BRING.map((item, i) => (
                    <li data-edit={`gear.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookInner}>
            <div className={s.bookText}>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book a day on the river</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us when and who is coming. We write back within a day with
                the beat we would pick for those dates and where to meet.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Fly shop and meeting point</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>12 Ferry Landing Road, Alder Bend</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550168821">(555) 016-8821</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:guides@braidedriver.example">guides@braidedriver.example</a>
                  </dd>
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
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="br-name">Name</label>
                <input id="br-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="br-email">Email</label>
                <input id="br-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="br-trip">Trip</label>
                <select id="br-trip" name="trip" defaultValue="full">
                  <option value="half">Half day</option>
                  <option value="full">Full day</option>
                  <option value="lesson">First cast lesson</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="br-date">Date</label>
                <input id="br-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="br-anglers">Anglers</label>
                <select id="br-anglers" name="anglers" defaultValue="2">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label6" htmlFor="br-level">Experience</label>
                <select id="br-level" name="level" defaultValue="some">
                  <option value="new">Never cast a fly rod</option>
                  <option value="some">A few days on the water</option>
                  <option value="lots">Fish most weekends</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label7" htmlFor="br-note">Anything else? Sizes for waders help.</label>
                <textarea id="br-note" name="note" rows={3} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a date</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,1,2,4,3" className={s.footRiver} aria-hidden="true">
          <TabbiedPattern
            pattern={anabranch}
            palette={RIVER}
            fit="grid"
            cellSize={28}
            seed="braided-river-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Braided River Fly Fishing</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional outfitter: the river, beats, guides, prices and address
            are invented. Check the regulations where you fish before you go.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
