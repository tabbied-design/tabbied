import { TabbiedPattern } from 'tabbied/react';
import { scumble, diminuendo } from 'tabbied/patterns';
import s from './fresh-coat-decorators.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Fresh Coat: Painters and decorators, Hollin Park',
  description:
    'Fresh Coat paints and papers houses in Hollin Park and the streets around it. The colors we reach for, what each job costs, how a room gets painted, real quotes by room and a form for your own.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Every one is a
   paint on the fan deck: the page is Primer White, the type is Sash Black,
   and the four chips are the colors we sell most of. The brush-outs are the
   scumble design, dry strokes dragged across a transparent ground so the
   wall color underneath shows between them, the way a test patch does. */
const PRIMER = '#f4f1ea';
const DOOR = '#2d5b87';
const CLAY = '#c4633c';
const SAGE = '#8fa487';
const OCHRE = '#dfae47';

const BRUSH_DOOR = ['transparent', DOOR];
const BRUSH_WARM = ['transparent', CLAY, OCHRE, CLAY];
const BRUSH_SAGE = ['transparent', SAGE, SAGE, PRIMER];
const CARD = ['transparent', PRIMER, SAGE, OCHRE, CLAY];

const NAV = [
  ['Colors', '#colors'],
  ['Services', '#services'],
  ['How we work', '#process'],
  ['Room prices', '#rooms'],
  ['The crew', '#crew'],
  ['Get a quote', '#quote'],
];

type Chip = { code: string; name: string; lrv: string; use: string; tone: string };

/* The fan deck and the chip cards: the page's own palette, by name. */
const CHIPS: Chip[] = [
  { code: 'FC 01', name: 'Primer White', lrv: 'LRV 86', use: 'Ceilings, and every wall in a north-facing room', tone: 'primer' },
  { code: 'FC 02', name: 'Sash Black', lrv: 'LRV 4', use: 'Window frames, railings, a front door that means it', tone: 'sash' },
  { code: 'FC 03', name: 'Front Door Blue', lrv: 'LRV 14', use: 'Doors, kitchen islands, a study you want to feel smaller', tone: 'door' },
  { code: 'FC 04', name: 'Porch Clay', lrv: 'LRV 24', use: 'Porch floors, an accent wall, the inside of a bookcase', tone: 'clay' },
  { code: 'FC 05', name: 'Hallway Sage', lrv: 'LRV 38', use: 'Halls and stairs: it hides scuffs and flatters bad light', tone: 'sage' },
  { code: 'FC 06', name: 'Kitchen Ochre', lrv: 'LRV 55', use: 'Kitchens, a child\'s room, anywhere that needs the sun', tone: 'ochre' },
];

type Service = { shade: string; name: string; what: string; price: string };

/* One paint strip, six shades of Front Door Blue, one service to a shade. */
const SERVICES: Service[] = [
  { shade: 'FC 03-1', name: 'Walls and ceilings', what: 'Filling, sanding, a mist coat on new plaster, two finish coats', price: 'from $4.20 / sq ft of floor' },
  { shade: 'FC 03-2', name: 'Woodwork and trim', what: 'Doors, frames, skirting and sills, sanded and undercoated', price: 'from $95 a door' },
  { shade: 'FC 03-3', name: 'Wallpaper', what: 'Stripping, lining, hanging, pattern matched at every seam', price: 'from $65 a roll' },
  { shade: 'FC 03-4', name: 'Kitchen cabinets', what: 'Doors taken away and sprayed in our workshop, frames brushed in place', price: 'from $140 a door' },
  { shade: 'FC 03-5', name: 'Plaster repair', what: 'Cracks cut out and filled, blown patches replastered, then painted', price: 'from $180 a visit' },
  { shade: 'FC 03-6', name: 'Exteriors', what: 'Masonry, windows, fascias and the front door, April to October', price: 'quoted on site' },
];

type Stage = { when: string; name: string; text: string };

const PROCESS: Stage[] = [
  { when: 'Before', name: 'The walk-round', text: 'Nadia comes out, measures every room, looks at the plaster in a raking light and writes the quote on the spot. It is free and takes about forty minutes.' },
  { when: 'Day 1, 8:00', name: 'Cover everything', text: 'Furniture to the middle under cotton sheets, floors taped with paper, switch plates off and bagged with their screws.' },
  { when: 'Day 1, 9:00', name: 'Prepare', text: 'Fill, sand, caulk the gaps, spot-prime the repairs. Most of the job is here, and it is where cheap work cuts corners.' },
  { when: 'Day 1, 2:00', name: 'Cut in and roll', text: 'Ceiling first, then walls: edges by brush, the rest by roller, wet edge to wet edge so there are no lap marks.' },
  { when: 'Day 2', name: 'Second coat', text: 'The whole room again once the first coat has cured overnight. Then woodwork, last, so nothing lands on it.' },
  { when: 'Day 2, 4:00', name: 'The snag walk', text: 'We walk round with you and a lamp, fix what you point at, put the room back and leave a labeled pot of every color.' },
];

type Room = { name: string; size: string; w: number; d: number; lines: string[]; days: string; price: string };

/* Real quotes from this year, anonymized. The plan box is drawn to the
   room's proportions from w and d. */
const ROOMS: Room[] = [
  { name: 'Box bedroom', size: '9 x 10 ft', w: 9, d: 10, lines: ['Walls and ceiling, two coats', 'One door, one window, skirting', 'Two small cracks cut out'], days: '1.5 days', price: '$980' },
  { name: 'Living room', size: '14 x 18 ft', w: 18, d: 14, lines: ['Walls, ceiling, coving', 'Picture rail and two doors', 'Chimney breast in a second color'], days: '3 days', price: '$2,350' },
  { name: 'Hall, stairs, landing', size: '3 floors', w: 6, d: 16, lines: ['Walls to the top landing', 'Spindles and handrail, sanded', 'Scaffold tower over the stairwell'], days: '4 days', price: '$3,100' },
  { name: 'Kitchen', size: '12 x 13 ft', w: 13, d: 12, lines: ['Walls and ceiling in kitchen paint', '22 cabinet doors sprayed off-site', 'New handles fitted if you buy them'], days: '5 days', price: '$4,200' },
];

type Person = { name: string; role: string; years: string; note: string; pick: string };

const CREW: Person[] = [
  { name: 'Nadia Brook', role: 'Owner, does every walk-round', years: 'Painting since 2006', note: 'Trained as a signwriter, which is why her cut-in lines are straight enough to annoy the rest of us.', pick: 'Her pick: FC 05' },
  { name: 'Tom Ashdown', role: 'Paperhanger', years: 'With Fresh Coat since 2014', note: 'Hangs the wallpaper nobody else wants to: grasscloth, hand-printed rolls, anything with a drop of more than 60 cm.', pick: 'His pick: FC 04' },
  { name: 'Kwame Osei', role: 'Apprentice, second year', years: 'With Fresh Coat since 2024', note: 'Does the prep and the spraying, and is quicker at taping a floor than anyone on the crew.', pick: 'His pick: FC 03' },
];

const PROMISES = [
  ['Two-year guarantee', 'On interior work. If a finish flakes or a crack we filled comes back, we return and put it right.'],
  ['Paint you choose', 'Any brand, any color, matched by eye if it has to be. We buy at trade price and pass it on at cost.'],
  ['Low-odor by default', 'Water-based on walls and woodwork unless you ask otherwise. You can sleep in the room the same night.'],
  ['Clean every evening', 'Brushes washed off site, sheets folded, the room usable after 5 pm.'],
];

const FAQ = [
  ['Do I need to move the furniture?', 'No. We move it to the middle and cover it. Take out anything fragile or valuable before we arrive, and empty the bookcases if you want us to paint behind them.'],
  ['How far ahead are you booked?', 'Usually five to seven weeks for interiors. Exteriors book up by March for the summer.'],
  ['Can you help choose colors?', 'Yes. We paint A4 sample boards in your top three and leave them for a week so you can see them in the morning and at night. $40, taken off the job.'],
  ['Do you take a deposit?', '20% to book the dates, the rest when you are happy at the snag walk. No payment in cash, ever.'],
  ['What about lead paint?', 'Any house built before 1978 gets a lead test before we sand anything. If it is positive we use certified lead-safe methods and tell you exactly what that changes.'],
];

export default function FreshCoatPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Instrument+Sans:wght@400..600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Fresh Coat</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCall} href="tel:+15550186640">(555) 018-6640</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The headline on the left, the fan deck opened on the right, and a
            brush-out of Front Door Blue under both. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Painters and decorators. Hollin Park and five miles round.</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Two coats, <em>one clean line.</em>
            </h1>
            <p className={s.heroLead}>
              Three of us, a van and a lot of dust sheets. We paint and paper
              houses one room at a time, prepare every wall before it sees a
              roller, and leave the place cleaner than we found it.
            </p>
            <div className={s.heroActions}>
              <a className={s.button} href="#quote">Book a free walk-round</a>
              <a className={s.textLink} href="#rooms">See real room prices</a>
            </div>
          </div>

          <div className={s.fan} aria-hidden="true">
            <div className={`${s.fanChip} ${s.fan1}`}>
              <span className={s.fanColor} />
              <span className={s.fanLabel}>FC 02 Sash Black</span>
            </div>
            <div className={`${s.fanChip} ${s.fan2}`}>
              <span className={s.fanColor} />
              <span className={s.fanLabel}>FC 05 Hallway Sage</span>
            </div>
            <div className={`${s.fanChip} ${s.fan3}`}>
              <span className={s.fanColor} />
              <span className={s.fanLabel}>FC 06 Kitchen Ochre</span>
            </div>
            <div className={`${s.fanChip} ${s.fan4}`}>
              <span className={s.fanColor} />
              <span className={s.fanLabel}>FC 04 Porch Clay</span>
            </div>
            <div className={`${s.fanChip} ${s.fan5}`}>
              <span className={s.fanColor} />
              <span className={s.fanLabel}>FC 03 Front Door Blue</span>
            </div>
            <span className={s.rivet} />
          </div>
        </section>

        <div className={s.brushout}>
          <div className={s.brushField} aria-hidden="true">
            <TabbiedPattern
              pattern={scumble}
              palette={BRUSH_DOOR}
              fit="grid"
              cellSize={56}
              seed="freshcoat-brushout"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <p className={s.brushLabel}>Brush-out, FC 03 Front Door Blue, first coat</p>
        </div>

        {/* ---------------------------------------------------------- COLORS
            The chip cards: the six paints this page is painted in. */}
        <section id="colors" className={s.sec} aria-labelledby="colors-h">
          <div className={s.secHead}>
            <p className={s.secNo}>01</p>
            <h2 id="colors-h" className={s.secTitle}>The colors we reach for</h2>
            <p className={s.secNote}>
              We will paint any color from any maker. These six are the ones
              we sell most of, and the ones this page is painted in. LRV is how
              much light a color reflects: 100 is a mirror, 0 is a cave.
            </p>
          </div>
          <ul className={s.chips}>
            {CHIPS.map((c) => (
              <li key={c.code} className={s.chip}>
                <span className={`${s.chipColor} ${s[c.tone]}`} />
                <span className={s.chipCode}>{c.code}</span>
                <h3 className={s.chipName}>{c.name}</h3>
                <span className={s.chipLrv}>{c.lrv}</span>
                <p className={s.chipUse}>{c.use}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- SERVICES
            A paint strip: the services as shades, lightest to darkest. */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.stripLayout}>
            <div className={s.secHead}>
              <p className={s.secNo}>02</p>
              <h2 id="services-h" className={s.secTitle}>What we do, and what it costs</h2>
              <p className={s.secNote}>
                Prices include materials, dust sheets and the tidy-up. Every job
                is quoted in writing, per room, before we book a date, and the
                quote is the price.
              </p>
              <p className={s.stripNote}>Minimum job $450. Evenings and weekends by arrangement.</p>
            </div>
            <div className={s.strip}>
              <ol className={s.shades}>
                {SERVICES.map((sv, i) => (
                  <li key={sv.shade} className={`${s.shade} ${s[`shade${i + 1}`]}`}>
                    <span className={s.shadeCode}>{sv.shade}</span>
                    <h3 className={s.shadeName}>{sv.name}</h3>
                    <p className={s.shadeWhat}>{sv.what}</p>
                    <p className={s.shadePrice}>{sv.price}</p>
                  </li>
                ))}
              </ol>
              <p className={s.stripFoot}>Fresh Coat, FC 03 Front Door Blue family, six shades</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- PROCESS
            Two days in one room, in order, beside a warm brush-out. */}
        <section id="process" className={`${s.sec} ${s.processSec}`} aria-labelledby="process-h">
          <div className={s.secHead}>
            <p className={s.secNo}>03</p>
            <h2 id="process-h" className={s.secTitle}>How a room gets painted</h2>
            <p className={s.secNote}>An average bedroom, start to finish. Bigger rooms add days, never steps.</p>
          </div>
          <div className={s.processGrid}>
            <ol className={s.stages}>
              {PROCESS.map((st, i) => (
                <li key={st.name} className={s.stage}>
                  <span className={s.stageNo}>{i + 1}</span>
                  <p className={s.stageWhen}>{st.when}</p>
                  <h3 className={s.stageName}>{st.name}</h3>
                  <p className={s.stageText}>{st.text}</p>
                </li>
              ))}
            </ol>
            <div className={s.wallPanel}>
              <div className={s.wallField} aria-hidden="true">
                <TabbiedPattern
                  pattern={scumble}
                  palette={BRUSH_WARM}
                  fit="grid"
                  cellSize={56}
                  seed="freshcoat-wall"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="fresh-coat-decorators-tin"
                alt="An open tin of paint with a brush resting across the top and a drip down the side"
                inks={{ blue: 'var(--text)', yellow: 'var(--clay)', red: 'var(--door)', black: 'var(--text)' }}
                className={s.tin}
              />
              <p className={s.wallCaption}>Porch Clay over Kitchen Ochre, mid-job</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROOMS
            Real quotes, each with its floor plan drawn to scale. */}
        <section id="rooms" className={s.sec} aria-labelledby="rooms-h">
          <div className={s.secHead}>
            <p className={s.secNo}>04</p>
            <h2 id="rooms-h" className={s.secTitle}>Room prices, from real quotes</h2>
            <p className={s.secNote}>
              Four jobs from this year, with the names taken off. Yours will
              differ with the ceiling height, the state of the plaster and how
              many doors there are, but not by much.
            </p>
          </div>
          <ul className={s.rooms}>
            {ROOMS.map((r) => (
              <li key={r.name} className={s.room}>
                <div className={s.planBox}>
                  <div
                    className={`${s.plan} ${r.w / r.d >= 1.25 ? s.planWide : s.planTall}`}
                    style={{ aspectRatio: `${r.w} / ${r.d}` }}
                  >
                    <span className={s.planSize}>{r.size}</span>
                  </div>
                </div>
                <h3 className={s.roomName}>{r.name}</h3>
                <ul className={s.roomLines}>
                  {r.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className={s.roomTotal}>
                  <span className={s.roomDays}>{r.days}</span>
                  <span className={s.roomPrice}>{r.price}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className={s.sageBand} aria-hidden="true">
          <TabbiedPattern
            pattern={scumble}
            palette={BRUSH_SAGE}
            fit="grid"
            cellSize={48}
            seed="freshcoat-sage"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ CREW */}
        <section id="crew" className={s.sec} aria-labelledby="crew-h">
          <div className={s.secHead}>
            <p className={s.secNo}>05</p>
            <h2 id="crew-h" className={s.secTitle}>The crew</h2>
            <p className={s.secNote}>The same three people from the first dust sheet to the last touch-up. We do not subcontract.</p>
          </div>
          <ul className={s.crew}>
            {CREW.map((p) => (
              <li key={p.name} className={s.person}>
                <h3 className={s.personName}>{p.name}</h3>
                <p className={s.personRole}>{p.role}</p>
                <p className={s.personYears}>{p.years}</p>
                <p className={s.personNote}>{p.note}</p>
                <p className={s.personPick}>{p.pick}</p>
              </li>
            ))}
          </ul>
          <dl className={s.promises}>
            {PROMISES.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.quoteSec} aria-labelledby="quote-h">
          <div className={s.quoteGrid}>
            <div className={s.quoteIntro}>
              <p className={s.secNo}>06</p>
              <h2 id="quote-h" className={s.quoteTitle}>Book a walk-round</h2>
              <p className={s.quoteLead}>
                Tell us which rooms, and Nadia will call to find forty minutes
                that suit you. The quote is written on the day and holds for
                ninety days.
              </p>
              <div className={s.cardField} aria-hidden="true">
                <TabbiedPattern
                  pattern={diminuendo}
                  palette={CARD}
                  fit="grid"
                  cellSize={32}
                  seed="freshcoat-card"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.quoteContact}>
                <a href="tel:+15550186640">(555) 018-6640</a>
              </p>
              <p className={s.quoteContact}>
                <a href="mailto:nadia@freshcoat.example">nadia@freshcoat.example</a>
              </p>
              <p className={s.quoteHours}>Office hours Monday to Friday, 8 to 5. We are up ladders the rest of the time.</p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="fc-name">Your name</label>
                <input id="fc-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="fc-phone">Phone</label>
                <input id="fc-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="fc-address">Street and zip code</label>
                <input id="fc-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.roomsPick}`}>
                <legend>Which rooms</legend>
                <div className={s.picks}>
                  <input id="fc-r1" type="checkbox" name="rooms" value="bedroom" />
                  <label htmlFor="fc-r1">Bedrooms</label>
                  <input id="fc-r2" type="checkbox" name="rooms" value="living" />
                  <label htmlFor="fc-r2">Living room</label>
                  <input id="fc-r3" type="checkbox" name="rooms" value="hall" />
                  <label htmlFor="fc-r3">Hall and stairs</label>
                  <input id="fc-r4" type="checkbox" name="rooms" value="kitchen" />
                  <label htmlFor="fc-r4">Kitchen</label>
                  <input id="fc-r5" type="checkbox" name="rooms" value="paper" />
                  <label htmlFor="fc-r5">Wallpaper</label>
                  <input id="fc-r6" type="checkbox" name="rooms" value="outside" />
                  <label htmlFor="fc-r6">Outside</label>
                </div>
              </fieldset>
              <div className={s.field}>
                <label htmlFor="fc-when">Ideally finished by</label>
                <input id="fc-when" name="when" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="fc-built">House built around</label>
                <select id="fc-built" name="built" defaultValue="unsure">
                  <option value="pre1978">Before 1978</option>
                  <option value="post1978">1978 or later</option>
                  <option value="unsure">Not sure</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label htmlFor="fc-notes">Anything we should know</label>
                <textarea id="fc-notes" name="notes" rows={4} />
              </div>
              <button className={s.submit} type="submit">Ask for a walk-round</button>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <p className={s.secNo}>07</p>
            <h2 id="faq-h" className={s.secTitle}>Before you ask</h2>
          </div>
          <div className={s.faqList}>
            {FAQ.map(([q, a]) => (
              <details key={q} className={s.faq}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p className={s.footName}>Fresh Coat</p>
          <p className={s.footAddr}>Workshop at 7 Tanner Yard, Hollin Park. Licensed and insured, license PD-40912.</p>
          <p>A fictional painting and decorating firm. The crew, prices, colors and address are invented.</p>
          <p>The paint tin is a generated image, drawn in the page's own colors.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
