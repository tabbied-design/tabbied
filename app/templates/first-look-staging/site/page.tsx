import { TabbiedPattern } from 'tabbied/react';
import { bengaline } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './first-look-staging.module.css';

export const metadata = {
  title: 'First Look Staging: Home staging for vacant and lived-in homes',
  description:
    'First Look stages homes for sale: a walk-through consult, a written plan, one install day and the furniture collected after closing. Packages for vacant and lived-in homes, with our days-on-market figures.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   staging lookbook printed on warm plaster: charcoal type, and four fabric
   colors (clay, dusk blue, ochre, sage) that the bengaline weaves together.
   The weave is the swatch pinned to the hero, the bolt of cloth unrolled
   between the rooms and the process, the backdrop the packages are laid on,
   and the selvedge along the foot of the page. */
const PLASTER = '#ece4dc';
const CHARCOAL = '#2c2a2e';
const CLAY = '#c0643f';
const DUSK = '#5f7891';
const OCHRE = '#d7a64a';
const SAGE = '#8b9a78';

const SWATCH = ['transparent', CLAY, DUSK, OCHRE, SAGE, CHARCOAL];
const BOLT = ['transparent', DUSK, SAGE, CLAY, OCHRE, DUSK];
const BACKDROP = ['transparent', OCHRE, CLAY, SAGE, DUSK, CLAY];
const SELVEDGE = ['transparent', PLASTER, OCHRE, CLAY, SAGE, PLASTER];

const NAV = [
  ['Rooms', '#rooms'],
  ['Process', '#process'],
  ['Packages', '#packages'],
  ['Results', '#results'],
  ['Book', '#book'],
];

const ROOMS = [
  {
    no: 'Room 01',
    tone: 'clay',
    name: 'Living room',
    why: 'The first photo in every listing. Buyers decide here whether to book a showing.',
    brings: ['Sofa and two chairs, scaled to the room', 'An 8 by 10 rug to anchor them', 'Lamps on three sides, never one overhead'],
  },
  {
    no: 'Room 02',
    tone: 'dusk',
    name: 'Primary bedroom',
    why: 'A bed made like a hotel tells a buyer the house is calm, and that they will sleep in it.',
    brings: ['Queen bed with white linen and a throw', 'Matching nightstands and lamps', 'One large piece of art over the bed'],
  },
  {
    no: 'Room 03',
    tone: 'ochre',
    name: 'Kitchen',
    why: 'Cleared counters read as more counter. We take things away more than we bring them.',
    brings: ['Three objects per counter, no more', 'Bowl of lemons, board, one cookbook', 'Bar stools if the island has an overhang'],
  },
  {
    no: 'Room 04',
    tone: 'sage',
    name: 'Dining room',
    why: 'An empty dining room photographs as a question. A set table answers it.',
    brings: ['Table for six, chairs pulled square', 'Linen runner and a low centerpiece', 'A mirror to double the window light'],
  },
  {
    no: 'Room 05',
    tone: 'charcoal',
    name: 'Entry and stairs',
    why: 'Seen in person, never in photos, and the place a showing starts or stalls.',
    brings: ['Console, lamp and a tray for keys', 'Runner on the stairs if they are bare', 'New door mat, and the porch light fixed'],
  },
  {
    no: 'Room 06',
    tone: 'mixed',
    name: 'Spare room',
    why: 'Give it one clear job: an office, a nursery or a guest room. A spare room full of boxes costs a bedroom.',
    brings: ['Desk and chair, or a daybed', 'A plant and a bookcase styled half-full', 'Curtains hung high and wide'],
  },
];

const STEPS = [
  ['Walk-through', '90 minutes at the house with you and your agent. We take measurements and photographs and talk through who the likely buyer is.'],
  ['Plan and quote', 'Within two working days: a room-by-room plan, what we bring, what you put in storage, and a fixed price.'],
  ['Install day', 'One day for most homes, two for large ones. Two stylists and a truck. You come back to finished rooms.'],
  ['Listing photos', 'We stay for the photographer, plump the cushions between shots, and switch on every lamp.'],
  ['Collection', 'The furniture stays until the sale closes, up to 45 days in the package. We collect within three days of the call.'],
];

const LIVED_IN = [
  { name: 'Consultation', price: '$375', note: 'Two hours, with a written list', items: ['Room-by-room notes to work from', 'What to pack, move and repaint', 'A follow-up visit before photos, $120'] },
  { name: 'Lived-in refresh', price: '$1,450', note: 'One day, your furniture and ours', items: ['We restyle what you own', 'Linen, art, lamps and plants from our stock', 'Up to five rooms'] },
];

const VACANT = [
  { name: 'Vacant essentials', price: '$2,900', note: 'The rooms in the photos', items: ['Living, dining and primary bedroom', '45 days included', 'Extra rooms $450 each'] },
  { name: 'Whole house', price: '$4,800', note: 'Every room, up to 3,000 sq ft', items: ['Furniture, art, linen, rugs', '45 days included', 'Then $500 a month, pro-rated'] },
];

const RESULTS = [
  { label: 'Median days on market', staged: '18 days', plain: '47 days', ws: '38%', wp: '100%' },
  { label: 'Showings in the first week', staged: '14', plain: '6', ws: '100%', wp: '43%' },
  { label: 'Listings that needed a price cut', staged: '1 in 12', plain: '1 in 3', ws: '25%', wp: '100%' },
];

const HOURS = [
  ['Consults', 'Mon-Sat, 9-6'],
  ['Studio and warehouse', 'Tue-Fri, 10-4, by appointment'],
  ['Install days', 'Mon-Fri, 8-5'],
];

export default function FirstLookStagingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--plaster': '#ece4dc',
        '--charcoal': '#2c2a2e',
        '--clay': '#c0643f',
        '--dusk': '#5f7891',
        '--ochre': '#d7a64a',
        '--sage': '#8b9a78',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="plaster,charcoal,clay,dusk,ochre,sage"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;1,400&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>First Look</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Staging</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Book a consult</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* The cover of the lookbook: the headline on the left, a pinked
            swatch of the weave on the right with a swing tag tied to it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.issue" data-edit-max="240" data-edit-multiline className={s.issue}>The Lookbook, Volume 4: Spring listings</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Rooms that sell <em>the first time they are seen.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We stage homes for sale, empty or lived-in. One walk-through, a
              written plan, a single install day, and furniture that stays
              until the keys change hands.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a walk-through</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#packages">See the packages</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Median days on market, staged</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>18</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Homes staged since 2019</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>640</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroSwatch}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4,5,1" className={s.swatchField} aria-hidden="true">
              <TabbiedPattern
                pattern={bengaline}
                palette={SWATCH}
                fit="grid"
                cellSize={58}
                seed="firstlook-swatch"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.tag}>
              <p data-edit="hero.tagNo" data-edit-max="240" data-edit-multiline className={s.tagNo}>Swatch 01</p>
              <p data-edit="hero.tagName" data-edit-max="240" data-edit-multiline className={s.tagName}>Bengaline weave</p>
              <p data-edit="hero.tagNote" data-edit-max="240" data-edit-multiline className={s.tagNote}>For a living room facing west, with a sofa in oat linen.</p>
            </div>
          </div>
        </section>

        {/* The rooms, each a swatch card: a chip of woven color, then what we
            bring into the room and why it matters to a buyer. */}
        <section id="rooms" className={s.sec} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <p data-edit="rooms.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Look 01</p>
            <h2 data-edit="rooms.secTitle" data-edit-max="60" id="rooms-h" className={s.secTitle}>Room by room</h2>
            <p data-edit="rooms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six rooms carry most of a listing. These are the ones we stage
              first, and what we bring into each.
            </p>
          </div>
          <ul className={s.rooms}>
            {ROOMS.map((r, i) => (
              <li key={r.no} className={s.room}>
                <div className={`${s.chip} ${s[r.tone]}`} aria-hidden="true" />
                <div className={s.roomBody}>
                  <p data-edit={`rooms.roomNo.${i}`} data-edit-max="240" data-edit-multiline className={s.roomNo}>{r.no}</p>
                  <h3 data-edit={`rooms.roomName.${i}`} data-edit-max="40" className={s.roomName}>{r.name}</h3>
                  <p data-edit={`rooms.roomWhy.${i}`} data-edit-max="240" data-edit-multiline className={s.roomWhy}>{r.why}</p>
                  <ul className={s.brings}>
                    {r.brings.map((b, i2) => (
                      <li data-edit={`rooms.item.${i}.${i2}`} data-edit-max="80" key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,5,2,4,3" className={s.bolt} aria-hidden="true">
          <TabbiedPattern
            pattern={bengaline}
            palette={BOLT}
            fit="grid"
            cellSize={44}
            seed="firstlook-bolt"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* Consult, then stage: five steps along a measuring tape. */}
        <section id="process" className={s.sec} aria-labelledby="process-h">
          <div className={s.secHead}>
            <p data-edit="process.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Look 02</p>
            <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>Consult first, then stage</h2>
            <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              From the first call to photographs usually takes eight to ten
              days. Tell us the listing date and we work back from it.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([title, text], i) => (
              <li key={title} className={s.step}>
                <span className={s.stepNo}>{`0${i + 1}`}</span>
                <h3 data-edit={`process.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                <p data-edit={`process.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Packages, laid out on a length of the cloth. */}
        <section id="packages" className={s.packages} aria-labelledby="packages-h">
          <div data-edit-pattern="packages.field" data-edit-roles="transparent,4,2,5,3,2" className={s.backdrop} aria-hidden="true">
            <TabbiedPattern
              pattern={bengaline}
              palette={BACKDROP}
              fit="grid"
              cellSize={64}
              seed="firstlook-backdrop"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.packInner}>
            <div className={s.packHead}>
              <p data-edit="packages.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Look 03</p>
              <h2 data-edit="packages.secTitle" data-edit-max="60" id="packages-h" className={s.secTitle}>Packages and prices</h2>
              <p data-edit="packages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Fixed prices for homes within 25 miles of the studio. Beyond
                that, travel is $2 a mile each way.
              </p>
            </div>
            <div className={s.packCols}>
              <div className={s.packCol}>
                <h3 data-edit="packages.packColTitle" data-edit-max="40" className={s.packColTitle}>Lived-in homes</h3>
                {LIVED_IN.map((p, i) => (
                  <article key={p.name} className={s.pack}>
                    <div className={s.packTop}>
                      <h4 data-edit={`pack.packName.${i}`} data-edit-max="36" className={s.packName}>{p.name}</h4>
                      <p data-edit={`pack.packPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{p.price}</p>
                    </div>
                    <p data-edit={`pack.packNote.${i}`} data-edit-max="240" data-edit-multiline className={s.packNote}>{p.note}</p>
                    <ul className={s.packItems}>
                      {p.items.map((it, i2) => (
                        <li data-edit={`pack.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <div className={s.packCol}>
                <h3 data-edit="packages.packColTitle2" data-edit-max="40" className={s.packColTitle}>Vacant homes</h3>
                {VACANT.map((p, i) => (
                  <article key={p.name} className={s.pack}>
                    <div className={s.packTop}>
                      <h4 data-edit={`pack.packName2.${i}`} data-edit-max="36" className={s.packName}>{p.name}</h4>
                      <p data-edit={`pack.packPrice2.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{p.price}</p>
                    </div>
                    <p data-edit={`pack.packNote2.${i}`} data-edit-max="240" data-edit-multiline className={s.packNote}>{p.note}</p>
                    <ul className={s.packItems}>
                      {p.items.map((it, i2) => (
                        <li data-edit={`pack.item2.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results: staged against unstaged, the figures from our own year. */}
        <section id="results" className={s.results} aria-labelledby="results-h">
          <div className={s.resultsInner}>
            <div className={s.resultsHead}>
              <p data-edit="results.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Look 04</p>
              <h2 data-edit="results.resultsTitle" data-edit-max="60" id="results-h" className={s.resultsTitle}>Days on market</h2>
              <p data-edit="results.resultsNote" data-edit-max="240" data-edit-multiline className={s.resultsNote}>
                Our 212 staged listings in 2026, against unstaged homes listed
                in the same zip codes and price bands in the same months.
              </p>
              <blockquote className={s.quote}>
                <p data-edit="results.body" data-edit-max="240" data-edit-multiline>We listed on a Thursday and had four offers by Monday. The buyers asked to keep the dining table.</p>
                <cite data-edit="results.attribution" data-edit-max="48">Dana Whitcombe, listing agent, Larchmere Realty</cite>
              </blockquote>
            </div>
            <div className={s.charts}>
              {RESULTS.map((r, i) => (
                <div key={r.label} className={s.chart}>
                  <h3 data-edit={`results.chartTitle.${i}`} data-edit-max="40" className={s.chartTitle}>{r.label}</h3>
                  <div className={s.barRow}>
                    <span data-edit={`results.barLabel.${i}`} data-edit-max="60" className={s.barLabel}>Staged</span>
                    <span className={s.track}>
                      <span className={s.fillStaged} style={{ width: r.ws }} />
                    </span>
                    <span data-edit={`results.barValue.${i}`} data-edit-max="60" className={s.barValue}>{r.staged}</span>
                  </div>
                  <div className={s.barRow}>
                    <span data-edit={`results.barLabel2.${i}`} data-edit-max="60" className={s.barLabel}>Not staged</span>
                    <span className={s.track}>
                      <span className={s.fillPlain} style={{ width: r.wp }} />
                    </span>
                    <span data-edit={`results.barValue2.${i}`} data-edit-max="60" className={s.barValue}>{r.plain}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking: the studio, the hours, and the form. */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <p data-edit="book.folio" data-edit-max="240" data-edit-multiline className={s.folio}>Look 05</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book a walk-through</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Send the address and the date you plan to list. We will call
                within a day to find a time that suits you and your agent.
              </p>
              <div className={s.studio}>
                <p data-edit="book.studioName" data-edit-max="240" data-edit-multiline className={s.studioName}>The studio and warehouse</p>
                <p data-edit="book.studioAddr" data-edit-max="240" data-edit-multiline className={s.studioAddr}>88 Calder Yard, Unit 4, Fenwick</p>
                <p className={s.contactLine}>
                  <a data-edit="book.link" data-edit-max="28" href="tel:+15550147730">(555) 014-7730</a>
                </p>
                <p className={s.contactLine}>
                  <a data-edit="book.link2" data-edit-max="28" href="mailto:hello@firstlookstaging.example">hello@firstlookstaging.example</a>
                </p>
              </div>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="fl-name">Your name</label>
                <input id="fl-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="fl-email">Email</label>
                <input id="fl-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label3" htmlFor="fl-address">Property address</label>
                <input id="fl-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="book.legend">The house is</legend>
                <div className={s.picks}>
                  <input id="fl-vacant" type="radio" name="state" value="vacant" />
                  <label data-edit="book.label4" htmlFor="fl-vacant">Vacant</label>
                  <input id="fl-lived" type="radio" name="state" value="lived-in" />
                  <label data-edit="book.label5" htmlFor="fl-lived">Lived-in</label>
                  <input id="fl-unsure" type="radio" name="state" value="unsure" />
                  <label data-edit="book.label6" htmlFor="fl-unsure">Moving out soon</label>
                </div>
              </fieldset>
              <div className={s.field}>
                <label data-edit="book.label7" htmlFor="fl-date">Planned listing date</label>
                <input id="fl-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label8" htmlFor="fl-size">Bedrooms</label>
                <input id="fl-size" name="bedrooms" type="number" min="0" max="12" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label9" htmlFor="fl-note">Anything we should know</label>
                <textarea id="fl-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request a walk-through</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,4,2,5,0" className={s.selvedge} aria-hidden="true">
          <TabbiedPattern
            pattern={bengaline}
            palette={SELVEDGE}
            fit="grid"
            cellSize={40}
            seed="firstlook-selvedge"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>First Look Staging</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional home staging studio. The stylists, agents, prices,
            figures and address are invented.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
