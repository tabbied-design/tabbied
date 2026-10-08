import { TabbiedPattern } from 'tabbied/react';
import { jibboom } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './slipway-marine.module.css';

export const metadata = {
  title: 'Slipway Marine Service: Outboard and boat mechanic, Pier Road',
  description:
    'Slipway Marine Service repairs and maintains outboards, sterndrives and small boats. Fall haul-outs, winterization, spring launch and dock visits to your slip.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The jibboom is
   the yard's rigging: two spars run out side by side on one diagonal, cell
   after cell, in sailcloth, flare orange, sea teal and rope. It fills the
   slipway ramp in the hero, runs as the wake between the calendar and the
   checklist, and edges the footer. */
const HARBOR = '#102231';
const SAIL = '#ece6d6';
const FLARE = '#f0642d';
const TIDE = '#4fa3a5';
const ROPE = '#c9ad7a';
const HULL = '#2d4f6c';

const RAMP = ['transparent', SAIL, FLARE, TIDE, ROPE, HULL];
const WAKE = ['transparent', TIDE, SAIL, HULL, ROPE, TIDE];
const FOOT = ['transparent', ROPE, TIDE, FLARE, SAIL, HULL];

const NAV = [
  ['Haul-out', '#haulout'],
  ['Winterize', '#winterize'],
  ['Engines', '#engines'],
  ['Dock visits', '#dock'],
  ['Contact', '#contact'],
];

type Week = { week: string; slots: number; note: string };

/* The fall haul-out board: twelve weeks, four lift slots a week. */
const WEEKS: Week[] = [
  { week: 'Sep 8', slots: 0, note: 'Full' },
  { week: 'Sep 15', slots: 0, note: 'Full' },
  { week: 'Sep 22', slots: 1, note: '1 slot left' },
  { week: 'Sep 29', slots: 0, note: 'Full' },
  { week: 'Oct 6', slots: 2, note: '2 slots left' },
  { week: 'Oct 13', slots: 1, note: '1 slot left' },
  { week: 'Oct 20', slots: 3, note: '3 slots left' },
  { week: 'Oct 27', slots: 4, note: 'Open' },
  { week: 'Nov 3', slots: 4, note: 'Open' },
  { week: 'Nov 10', slots: 3, note: '3 slots left' },
  { week: 'Nov 17', slots: 4, note: 'Open' },
  { week: 'Nov 24', slots: 2, note: 'Last lift of the year' },
];

const SEASON = [
  ['Apr - May', 'Spring launch', 'De-winterize, new impeller, bottom paint, splash.'],
  ['Jun - Aug', 'On the water', 'Dock visits, breakdowns, 100-hour services.'],
  ['Sep - Nov', 'Haul-out', 'Lift, pressure wash, winterize, wrap or store.'],
  ['Dec - Mar', 'In the shed', 'Rebuilds, repowers, rigging, gelcoat repair.'],
];

/* The winterization docket, in the order the job is done. */
const STEPS = [
  'Run the engine on the hose and check the tell-tale',
  'Fog the cylinders and the intake',
  'Change the lower unit gear oil, check for water in it',
  'Change engine oil and filter on four-strokes',
  'Add stabilizer and fill the tank to 90 percent',
  'Replace the fuel-water separator filter',
  'Drain the cooling system and the bilge pump lines',
  'Grease the steering, tilt tube and every fitting',
  'Pull the battery and put it on a tender for the winter',
  'Photograph the boat, gauges and hours for your file',
];

const WINTER_PRICES = [
  ['Outboard, up to 150 hp', '$295'],
  ['Outboard, 150 hp and over', '$395'],
  ['Twin outboards', '$650'],
  ['Sterndrive, with drive service', '$545'],
  ['Shrink-wrap with vents and a door', '$22 / ft'],
  ['Outdoor storage, Nov - Apr', '$38 / ft'],
  ['Indoor storage, heated shed', '$65 / ft'],
];

const ENGINES = [
  ['Under 30 hp', 'Tenders, kickers, the 9.9 on the sailboat', '$185'],
  ['30 - 90 hp', 'Skiffs, jon boats and small runabouts', '$325'],
  ['100 - 200 hp', 'Center consoles and bowriders', '$465'],
  ['225 - 350 hp', 'Offshore and twin rigs, priced per engine', '$595'],
];

const WORK = [
  'Four-stroke and two-stroke outboards',
  'Direct-injection two-strokes',
  'Sterndrives and inboard gas engines',
  'Electric outboards and lithium batteries',
  'Jet drives and jet-outboard lower units',
  'Steering, controls, gauges and rigging',
  'Trailer bearings, lights and winches',
  'Repowers, with sea trial',
];

const DOCK_DAYS = [
  ['Monday', 'Pier Road Marina, Gull Point'],
  ['Tuesday', 'Heron Cove, Lantern Bay moorings'],
  ['Wednesday', 'In the shop, no dock visits'],
  ['Thursday', 'Ferry Slip Basin, Old Quay'],
  ['Friday', 'Breakdowns and anything urgent'],
];

export default function SlipwayMarinePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--harbor': '#102231',
        '--sail': '#ece6d6',
        '--flare': '#f0642d',
        '--tide': '#4fa3a5',
        '--rope': '#c9ad7a',
        '--hull': '#2d4f6c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="harbor,sail,flare,tide,rope,hull"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Saira+Stencil+One&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Slipway</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Marine Service</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550167730">(555) 016-7730</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The slipway: a ramp of rigging running down into the water, with
            this week's work order pinned over it. */}
        <section id="welcome" className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="welcome.field" data-edit-roles="transparent,1,2,3,4,5" className={s.ramp} aria-hidden="true">
            <TabbiedPattern
              pattern={jibboom}
              palette={RAMP}
              fit="grid"
              cellSize={58}
              seed="slipway-ramp"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p data-edit="welcome.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Outboard and boat mechanic, Pier Road boatyard</p>
              <h1 data-edit="welcome.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Starts on the <span>first turn.</span>
              </h1>
              <p data-edit="welcome.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Slipway services outboards, sterndrives and the boats they push.
                We haul you out in the fall, winterize, store and launch you in
                spring, and between times we come to your slip.
              </p>
              <div className={s.heroActions}>
                <a data-edit="welcome.button" data-edit-max="28" className={s.button} href="#haulout">Book a haul-out</a>
                <a data-edit="welcome.ghost" data-edit-max="28" className={s.ghost} href="#dock">Ask for a dock visit</a>
              </div>
            </div>

            <div className={s.docket}>
              <div className={s.docketHead}>
                <p data-edit="welcome.docketTitle" data-edit-max="240" data-edit-multiline className={s.docketTitle}>Work order</p>
                <p data-edit="welcome.docketNo" data-edit-max="240" data-edit-multiline className={s.docketNo}>No. 2611</p>
              </div>
              <dl className={s.docketRows}>
                <div>
                  <dt data-edit="welcome.term" data-edit-max="28">Boat</dt>
                  <dd data-edit="welcome.body" data-edit-max="200" data-edit-multiline>19 ft center console, Gull Point slip 22</dd>
                </div>
                <div>
                  <dt data-edit="welcome.term2" data-edit-max="28">Engine</dt>
                  <dd data-edit="welcome.body2" data-edit-max="200" data-edit-multiline>115 hp four-stroke, 412 hours</dd>
                </div>
                <div>
                  <dt data-edit="welcome.term3" data-edit-max="28">Job</dt>
                  <dd data-edit="welcome.body3" data-edit-max="200" data-edit-multiline>100-hour service, water pump impeller</dd>
                </div>
                <div>
                  <dt data-edit="welcome.term4" data-edit-max="28">Quoted</dt>
                  <dd data-edit="welcome.body4" data-edit-max="200" data-edit-multiline>$465 parts and labor</dd>
                </div>
              </dl>
              <p data-edit="welcome.docketStatus" data-edit-max="240" data-edit-multiline className={s.docketStatus}>Ready Friday, sea trial included</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- HAUL-OUT
            The board in the yard office: twelve weeks of lifts, four a week. */}
        <section id="haulout" className={s.sec} aria-labelledby="haulout-h">
          <div className={s.secHead}>
            <p data-edit="haulout.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Docket 01</p>
            <h2 data-edit="haulout.secTitle" data-edit-max="60" id="haulout-h" className={s.secTitle}>Fall haul-out calendar</h2>
            <p data-edit="haulout.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The travel lift runs Monday to Thursday, four boats a week, up to
              32 feet and 12,000 pounds. Book a week and we confirm the day
              by phone the Friday before.
            </p>
          </div>
          <ol className={s.weeks}>
            {WEEKS.map((w, i) => (
              <li key={w.week} className={w.slots === 0 ? s.weekFull : s.week}>
                <time data-edit={`haulout.weekDate.${i}`} className={s.weekDate}>{w.week}</time>
                <span className={`${s.slots} ${s[`slots${w.slots}`]}`} aria-hidden="true" />
                <span data-edit={`haulout.weekNote.${i}`} data-edit-max="60" className={s.weekNote}>{w.note}</span>
              </li>
            ))}
          </ol>
          <div className={s.season}>
            {SEASON.map(([when, what, does], i) => (
              <div key={what} className={s.seasonCell}>
                <p data-edit={`haulout.seasonWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonWhen}>{when}</p>
                <h3 data-edit={`haulout.seasonWhat.${i}`} data-edit-max="40" className={s.seasonWhat}>{what}</h3>
                <p data-edit={`haulout.seasonDoes.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonDoes}>{does}</p>
              </div>
            ))}
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,1,5,4,3" className={s.wake} aria-hidden="true">
          <TabbiedPattern
            pattern={jibboom}
            palette={WAKE}
            fit="grid"
            cellSize={44}
            seed="slipway-wake"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- WINTERIZE
            The winterization docket: the job card that goes with the boat. */}
        <section id="winterize" className={s.sec} aria-labelledby="winterize-h">
          <div className={s.winterGrid}>
            <div className={s.winterIntro}>
              <p data-edit="winterize.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Docket 02</p>
              <h2 data-edit="winterize.secTitle" data-edit-max="60" id="winterize-h" className={s.secTitle}>Winterization, step by step</h2>
              <p data-edit="winterize.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Ten steps, done in this order, signed off one by one on the job
                card. You get the card back with the keys, and a photo of the
                hour meter.
              </p>
              <ul className={s.winterPrices}>
                {WINTER_PRICES.map(([what, price], i) => (
                  <li key={what}>
                    <span data-edit={`winterize.text.${i}`} data-edit-max="60">{what}</span>
                    <strong data-edit={`winterize.emphasis.${i}`}>{price}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.jobCard}>
              <div className={s.jobHead}>
                <p data-edit="winterize.jobTitle" data-edit-max="240" data-edit-multiline className={s.jobTitle}>Job card: winterize</p>
                <p data-edit="winterize.jobMeta" data-edit-max="240" data-edit-multiline className={s.jobMeta}>Tech initials each line</p>
              </div>
              <ol className={s.steps}>
                {STEPS.map((step, i) => (
                  <li data-edit={`winterize.item.${i}`} data-edit-max="80" key={step}>{step}</li>
                ))}
              </ol>
              <p data-edit="winterize.jobFoot" data-edit-max="240" data-edit-multiline className={s.jobFoot}>Spring launch the reverse way round: $245, with a new impeller every second year.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- ENGINES */}
        <section id="engines" className={s.sec} aria-labelledby="engines-h">
          <div className={s.secHead}>
            <p data-edit="engines.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Docket 03</p>
            <h2 data-edit="engines.secTitle" data-edit-max="60" id="engines-h" className={s.secTitle}>What we work on</h2>
            <p data-edit="engines.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every make of outboard, from the tender to the twin 300s. Two
              factory-trained technicians, a dyno tank and a parts room that
              stocks the impellers and filters people actually need.
            </p>
          </div>
          <div className={s.engineGrid}>
            <table className={s.engineTable}>
              <caption data-edit="engines.caption" className={s.caption}>100-hour service, by engine size</caption>
              <tbody>
                {ENGINES.map(([hp, boats, price], i) => (
                  <tr key={hp}>
                    <th data-edit={`engines.heading.${i}`} scope="row">{hp}</th>
                    <td data-edit={`engines.engineBoats.${i}`} className={s.engineBoats}>{boats}</td>
                    <td data-edit={`engines.enginePrice.${i}`} className={s.enginePrice}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className={s.workList}>
              {WORK.map((w, i) => (
                <li data-edit={`engines.item.${i}`} data-edit-max="80" key={w}>{w}</li>
              ))}
            </ul>
          </div>
          <p data-edit="engines.rate" data-edit-max="240" data-edit-multiline className={s.rate}>Shop rate $135 an hour. Diagnosis $95, taken off the repair if you go ahead.</p>
        </section>

        {/* ------------------------------------------------------------- DOCK */}
        <section id="dock" className={s.dock} aria-labelledby="dock-h">
          <div className={s.dockInner}>
            <div>
              <p data-edit="dock.dockTag" data-edit-max="240" data-edit-multiline className={s.dockTag}>Docket 04</p>
              <h2 data-edit="dock.dockTitle" data-edit-max="60" id="dock-h" className={s.dockTitle}>Dock visits</h2>
              <p data-edit="dock.dockLead" data-edit-max="240" data-edit-multiline className={s.dockLead}>
                The service skiff comes to your slip or mooring on a set day for
                each harbor. A $95 visit fee within 15 miles of the yard, then the
                shop rate. Breakdowns on the water: call, and we tow you in.
              </p>
              <p data-edit="dock.vhf" data-edit-max="240" data-edit-multiline className={s.vhf}>Listening on VHF 68, 7 am to 6 pm</p>
            </div>
            <dl className={s.dockDays}>
              {DOCK_DAYS.map(([day, where], i) => (
                <div key={day}>
                  <dt data-edit={`dock.term.${i}`} data-edit-max="28">{day}</dt>
                  <dd data-edit={`dock.body.${i}`} data-edit-max="200" data-edit-multiline>{where}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <p data-edit="contact.secTag" data-edit-max="240" data-edit-multiline className={s.secTag}>Docket 05</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Find the yard</h2>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>210 Pier Road, Slip 4</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Past the fuel dock, the blue shed with the travel lift beside it. Trailer parking on the gravel.</p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Shop</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550167730">(555) 016-7730</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:yard@slipwaymarine.example">yard@slipwaymarine.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Radio</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>VHF channel 68</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Hours</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Mon-Fri 7-5, Sat 8-12 in season</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <p data-edit="contact.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Open a work order</p>
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="sm-name">Name</label>
                <input id="sm-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="sm-phone">Phone</label>
                <input id="sm-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label3" htmlFor="sm-boat">Boat and engine</label>
                <input id="sm-boat" name="boat" type="text" placeholder="17 ft skiff, 60 hp four-stroke" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">What it needs</legend>
                <div className={s.picks}>
                  {['Haul-out', 'Winterize', 'Service', 'Repair', 'Dock visit'].map((need, i) => (
                    <span key={need} className={s.pick}>
                      <input id={`sm-need-${i}`} type="checkbox" name="need" value={need} />
                      <label data-edit={`contact.label4.${i}`} htmlFor={`sm-need-${i}`}>{need}</label>
                    </span>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="sm-note">What is it doing, or not doing</label>
                <textarea id="sm-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to the yard</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,3,2,1,5" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={jibboom}
            palette={FOOT}
            fit="grid"
            cellSize={36}
            seed="slipway-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Slipway Marine Service</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional boatyard. The technicians, boats, prices and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
