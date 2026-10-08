import { TabbiedPattern } from 'tabbied/react';
import { hongrie } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './ambry-interiors.module.css';

export const metadata = {
  title: 'Ambry Interiors: Interior design studio, Coldharbour Yard',
  description:
    'Ambry Interiors designs rooms from the floor up: a sample board of real finishes before anything is ordered, drawings a builder can price, and a fee ladder from one room to the whole house.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The studio's
   mark is its favorite floor: Point de Hongrie parquet in walnut, oak and
   honey. It is the big sample on the hero's board, the floor of the room
   in the portfolio, a chip in the finishes and the threshold strip at the
   foot of the page. */
const PLASTER = '#ece5da';
const UMBER = '#2c2420';
const WALNUT = '#6b4630';
const OAK = '#c4935a';
const HONEY = '#e0bd85';
const OLIVE = '#77795a';

const PARQUET = ['transparent', WALNUT, OAK, HONEY, OAK, OLIVE];
const SMOKED = ['transparent', UMBER, WALNUT, OAK, WALNUT, HONEY];
const LIGHT = ['transparent', OAK, HONEY, PLASTER, OAK, HONEY];

const NAV = [
  ['Finishes', '#finishes'],
  ['Rooms', '#rooms'],
  ['Fees', '#fees'],
  ['Process', '#process'],
  ['Studio', '#studio'],
];

const CHIPS = [
  ['chipOlive', 'Olive Grove', 'Wall, eggshell'],
  ['chipWalnut', 'Walnut Stain', 'Joinery'],
  ['chipHoney', 'Raw Linen', 'Ceiling, flat'],
];

const FINISHES = [
  { key: 'plaster', group: 'Walls', name: 'Lime plaster, hand troweled', spec: 'Breathes in old walls, takes a dent and keeps its color. Two coats over a fine base.', where: 'Period houses' },
  { key: 'linen', group: 'Textiles', name: 'Washed Belgian linen', spec: 'Curtains lined and interlined; slipcovers that come off for the machine.', where: 'Living, bedrooms' },
  { key: 'stone', group: 'Stone', name: 'Terrazzo, ground and sealed', spec: 'Chips of river stone in a lime binder, poured on site, ground smooth and sealed for kitchens.', where: 'Kitchens, baths' },
  { key: 'brass', group: 'Metal', name: 'Unlacquered brass', spec: 'Handles, taps and rails that darken where hands go. Polish it or let it be.', where: 'Everywhere small' },
  { key: 'paint', group: 'Paint', name: 'Clay-based paints', spec: 'Twelve colors we return to, mixed by a local maker, matched to the board.', where: 'Walls, ceilings' },
];

const ROOMS = [
  { title: 'Kitchen and snug, Larch Road', brief: 'A dark 1930s kitchen opened into the old coal store. Terrazzo, walnut fronts and a parquet floor that runs through both rooms.', size: '31 square meters', time: '14 weeks' },
  { title: 'Attic bedroom, Mill House', brief: 'Low eaves, one window. Built-in wardrobes under the slope, linen walls, a honey-colored floor to bounce the light.', size: '18 square meters', time: '9 weeks' },
  { title: 'Study for two, Fennel Terrace', brief: 'Two desks, one door. A long oak bench, olive shelving and a curtain that closes the work away at six.', size: '12 square meters', time: '6 weeks' },
];

const LADDER = [
  { rung: 'Consultation', price: '$280', unit: 'two hours at home', note: 'A walk through every room with a notebook. You keep the notes.' },
  { rung: 'One room', price: '$2,400', unit: 'flat fee', note: 'Sample board, a measured plan, a schedule of every item, two revisions.' },
  { rung: 'Two or three rooms', price: '$5,800', unit: 'flat fee', note: 'Rooms that share a floor or a view, designed to read as one.' },
  { rung: 'A whole floor', price: '$9,500', unit: 'flat fee', note: 'Adds lighting and joinery drawings your builder can price from.' },
  { rung: 'The whole house', price: 'from $16,000', unit: 'quoted', note: 'Everything, plus site visits through the build and the install day.' },
];

const PROCESS = [
  ['Walkthrough', 'We see the house, ask how you live in it, and measure the rooms we will work on.'],
  ['The board', 'Real samples on one board: floor, walls, fabric, stone, metal. Nothing is ordered until you have held it.'],
  ['Drawings', 'Plans, elevations and a schedule your builder or joiner can quote from without guessing.'],
  ['Ordering', 'Trade prices passed on in full. We track every delivery and inspect it before it comes in.'],
  ['Install day', 'Curtains hung, pictures up, beds made. You come home to a finished room.'],
];

const HOURS = [
  ['Tuesday to Friday', '9:30-5:30'],
  ['Saturday', '10:00-2:00, by appointment'],
  ['Sunday and Monday', 'Closed'],
];

export default function AmbryInteriorsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--plaster': '#ece5da',
        '--umber': '#2c2420',
        '--walnut': '#6b4630',
        '--oak': '#c4935a',
        '--honey': '#e0bd85',
        '--olive': '#77795a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="plaster,umber,walnut,oak,honey,olive"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Ambry</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Interiors</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#studio">Book a consultation</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Interior design studio, Coldharbour Yard</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Rooms built from the <em>floor up.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Ines Calloway and a small studio design houses one room at a time.
              Every project starts with a board of real samples you can hold, and
              nothing is ordered until it has been on the board.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#studio">Book a consultation</a>
              <a data-edit="hero.textLink" data-edit-max="28" className={s.textLink} href="#fees">See the fee ladder</a>
            </div>
          </div>

          <div className={s.board} aria-label="A sample board">
            <div className={s.boardFloor}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4,3,5" className={s.floorSample} aria-hidden="true">
                <TabbiedPattern
                  pattern={hongrie}
                  palette={PARQUET}
                  fit="grid"
                  cellSize={64}
                  seed="ambry-board"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p className={s.tag}>
                <span data-edit="hero.tagNo" data-edit-max="60" className={s.tagNo}>01</span>
                <span data-edit="hero.text" data-edit-max="60">Floor: Point de Hongrie, oiled oak</span>
              </p>
            </div>
            <ul className={s.chips}>
              {CHIPS.map(([cls, name, use], i) => (
                <li key={name} className={`${s.chip} ${s[cls]}`}>
                  <span data-edit={`hero.chipName.${i}`} data-edit-max="60" className={s.chipName}>{name}</span>
                  <span data-edit={`hero.chipUse.${i}`} data-edit-max="60" className={s.chipUse}>{use}</span>
                </li>
              ))}
            </ul>
            <div className={s.linen} aria-hidden="true" />
            <div className={s.brass} aria-hidden="true" />
            <div className={s.stone} aria-hidden="true" />
            <p data-edit="hero.note" data-edit-max="240" data-edit-multiline className={s.note}>
              The Arden kitchen: warm, calm, nothing shiny. Oak underfoot, olive on
              the walls, brass that will darken.
            </p>
          </div>
        </section>

        <section id="finishes" className={s.sec} aria-labelledby="finishes-h">
          <div className={s.secHead}>
            <p data-edit="finishes.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>I</p>
            <h2 data-edit="finishes.secTitle" data-edit-max="60" id="finishes-h" className={s.secTitle}>The finishes we reach for</h2>
            <p data-edit="finishes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six materials on almost every board. They age well, they can be
              repaired, and they look better in ten years than on the day.
            </p>
          </div>
          <ul className={s.finishes}>
            <li className={s.finish}>
              <div data-edit-pattern="finishes.field" data-edit-roles="transparent,1,2,3,2,4" className={s.swatchFloor} aria-hidden="true">
                <TabbiedPattern
                  pattern={hongrie}
                  palette={SMOKED}
                  fit="grid"
                  cellSize={44}
                  seed="ambry-finish-floor"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="finishes.finishGroup" data-edit-max="240" data-edit-multiline className={s.finishGroup}>Floors</p>
              <h3 data-edit="finishes.finishName" data-edit-max="40" className={s.finishName}>Point de Hongrie, smoked oak</h3>
              <p data-edit="finishes.finishSpec" data-edit-max="240" data-edit-multiline className={s.finishSpec}>90 x 600 mm planks mitered at 45 degrees, laid in a fortnight, oiled twice.</p>
              <p data-edit="finishes.finishWhere" data-edit-max="240" data-edit-multiline className={s.finishWhere}>Halls, living rooms</p>
            </li>
            {FINISHES.map((f, i) => (
              <li key={f.key} className={s.finish}>
                <div className={`${s.swatch} ${s[f.key]}`} aria-hidden="true" />
                <p data-edit={`finishes.finishGroup2.${i}`} data-edit-max="240" data-edit-multiline className={s.finishGroup}>{f.group}</p>
                <h3 data-edit={`finishes.finishName2.${i}`} data-edit-max="40" className={s.finishName}>{f.name}</h3>
                <p data-edit={`finishes.finishSpec2.${i}`} data-edit-max="240" data-edit-multiline className={s.finishSpec}>{f.spec}</p>
                <p data-edit={`finishes.finishWhere2.${i}`} data-edit-max="240" data-edit-multiline className={s.finishWhere}>{f.where}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="rooms" className={s.rooms} aria-labelledby="rooms-h">
          <div className={s.roomsInner}>
            <div className={s.roomsHead}>
              <p data-edit="rooms.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>II</p>
              <h2 data-edit="rooms.secTitle" data-edit-max="60" id="rooms-h" className={s.secTitle}>Rooms, recently</h2>
              <p data-edit="rooms.roomsNote" data-edit-max="240" data-edit-multiline className={s.roomsNote}>
                Three projects from the last year, each from a single board. Ask
                and we will put you in touch with the people who live in them.
              </p>
            </div>
            <div className={s.elevation} aria-hidden="true">
              <div className={s.wall}>
                <span className={s.arch} />
                <span className={s.shelf} />
              </div>
              <div className={s.floorView}>
                <div data-edit-pattern="rooms.field" data-edit-roles="transparent,2,3,4,3,5" className={s.floorPlane} aria-hidden="true">
                  <TabbiedPattern
                    pattern={hongrie}
                    palette={PARQUET}
                    fit="grid"
                    cellSize={56}
                    seed="ambry-room-floor"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
            </div>
            <ol className={s.panels}>
              {ROOMS.map((r, i) => (
                <li key={r.title} className={s.panel}>
                  <span className={s.panelNo}>0{i + 1}</span>
                  <h3 data-edit={`rooms.panelTitle.${i}`} data-edit-max="40" className={s.panelTitle}>{r.title}</h3>
                  <p data-edit={`rooms.panelBrief.${i}`} data-edit-max="240" data-edit-multiline className={s.panelBrief}>{r.brief}</p>
                  <dl className={s.panelFacts}>
                    <div>
                      <dt data-edit={`rooms.term.${i}`} data-edit-max="28">Size</dt>
                      <dd data-edit={`rooms.body.${i}`} data-edit-max="200" data-edit-multiline>{r.size}</dd>
                    </div>
                    <div>
                      <dt data-edit={`rooms.term2.${i}`} data-edit-max="28">Start to finish</dt>
                      <dd data-edit={`rooms.body2.${i}`} data-edit-max="200" data-edit-multiline>{r.time}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <p data-edit="fees.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>III</p>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>The fee ladder</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Flat fees, agreed before we start, from one room to the whole house.
              Furniture and materials are passed on at our trade price, with a 12%
              handling fee for ordering, tracking and inspecting.
            </p>
          </div>
          <ol className={s.ladder}>
            {LADDER.map((l, i) => (
              <li key={l.rung} className={s.rung}>
                <div className={s.rungTread}>
                  <h3 data-edit={`fees.rungName.${i}`} data-edit-max="40" className={s.rungName}>{l.rung}</h3>
                  <p data-edit={`fees.rungPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.rungPrice}>{l.price}</p>
                  <p data-edit={`fees.rungUnit.${i}`} data-edit-max="240" data-edit-multiline className={s.rungUnit}>{l.unit}</p>
                </div>
                <p data-edit={`fees.rungNote.${i}`} data-edit-max="240" data-edit-multiline className={s.rungNote}>{l.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="process" className={s.sec} aria-labelledby="process-h">
          <div className={s.processGrid}>
            <div>
              <p data-edit="process.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>IV</p>
              <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>How a project goes</h2>
              <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                A single room takes six to ten weeks from the walkthrough to the
                install day, most of it waiting for things to be made.
              </p>
            </div>
            <ol className={s.process}>
              {PROCESS.map(([title, text], i) => (
                <li key={title} className={s.processStep}>
                  <span className={s.processNo}>{i + 1}</span>
                  <h3 data-edit={`process.processTitle.${i}`} data-edit-max="40" className={s.processTitle}>{title}</h3>
                  <p data-edit={`process.processText.${i}`} data-edit-max="240" data-edit-multiline className={s.processText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="studio" className={s.sec} aria-labelledby="studio-h">
          <div className={s.studio}>
            <div className={s.studioInfo}>
              <p data-edit="studio.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>V</p>
              <h2 data-edit="studio.secTitle" data-edit-max="60" id="studio-h" className={s.secTitle}>Visit the studio</h2>
              <p data-edit="studio.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                The sample library fills the back room: four hundred floors,
                fabrics and stones. Come and pull things off the shelves.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="studio.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="studio.body" data-edit-max="200" data-edit-multiline>7 Coldharbour Yard, Wexley</dd>
                </div>
                <div>
                  <dt data-edit="studio.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="studio.link" data-edit-max="28" href="tel:+15550163381">(555) 016-3381</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="studio.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="studio.link2" data-edit-max="28" href="mailto:studio@ambryinteriors.example">studio@ambryinteriors.example</a>
                  </dd>
                </div>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`studio.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`studio.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <h3 data-edit="studio.formTitle" data-edit-max="40" className={s.formTitle}>Book a consultation</h3>
              <div className={s.field}>
                <label data-edit="studio.label" htmlFor="am-name">Name</label>
                <input id="am-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="studio.label2" htmlFor="am-email">Email</label>
                <input id="am-email" name="email" type="email" autoComplete="email" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="studio.legend">Which rooms</legend>
                <div className={s.picks}>
                  <input id="am-r1" type="checkbox" name="rooms" value="kitchen" />
                  <label data-edit="studio.label3" htmlFor="am-r1">Kitchen</label>
                  <input id="am-r2" type="checkbox" name="rooms" value="living" />
                  <label data-edit="studio.label4" htmlFor="am-r2">Living room</label>
                  <input id="am-r3" type="checkbox" name="rooms" value="bedroom" />
                  <label data-edit="studio.label5" htmlFor="am-r3">Bedroom</label>
                  <input id="am-r4" type="checkbox" name="rooms" value="bath" />
                  <label data-edit="studio.label6" htmlFor="am-r4">Bathroom</label>
                  <input id="am-r5" type="checkbox" name="rooms" value="house" />
                  <label data-edit="studio.label7" htmlFor="am-r5">The whole house</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="studio.label8" htmlFor="am-address">Address of the house</label>
                <input id="am-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="studio.label9" htmlFor="am-note">Tell us about the rooms</label>
                <textarea id="am-note" name="note" rows={4} />
              </div>
              <button data-edit="studio.submit" data-edit-max="24" className={s.submit} type="submit">Send to the studio</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,0,3,4" className={s.threshold} aria-hidden="true">
          <TabbiedPattern
            pattern={hongrie}
            palette={LIGHT}
            fit="grid"
            cellSize={40}
            seed="ambry-threshold"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Ambry Interiors</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional interior design studio. The names, people, projects, prices
            and address are invented.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
