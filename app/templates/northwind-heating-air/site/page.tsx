import { TabbiedPattern } from 'tabbied/react';
import { jetstream } from 'tabbied/patterns';
import s from './northwind-heating-air.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Northwind Heating & Air: Furnaces, heat pumps and air conditioning',
  description:
    'Northwind Heating & Air repairs, services and installs furnaces, heat pumps and air conditioners across Lakeshore County. Flat-rate prices, a twice-yearly Comfort Plan, and help with every rebate.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The jetstream
   is the air itself: cool streams on one side of the thermostat and warm
   ones on the other in the hero, the current inside the duct diagram, and
   a last draft along the footer. */
const FROST = '#eef3f5';
const DUCT = '#10293a';
const BLUE = '#2a77ad';
const EMBER = '#cc4a2c';
const ICE = '#9fd0e3';
const AMBER = '#f2b63c';

const COOL = ['transparent', ICE, BLUE, FROST, ICE, BLUE];
const HEAT = ['transparent', AMBER, EMBER, FROST, AMBER, EMBER];
const DRAFT = ['transparent', ICE, BLUE, FROST, AMBER, EMBER];
const FOOT = ['transparent', BLUE, ICE, AMBER, BLUE, ICE];

const NAV = [
  ['Airflow', '#airflow'],
  ['Comfort Plan', '#plan'],
  ['Seasons', '#seasons'],
  ['Services', '#services'],
  ['Rebates', '#rebates'],
  ['Contact', '#contact'],
];

/* The path the air takes, and what a tune-up checks at each stop. */
const STATIONS = [
  ['Return grille', 'Air leaves the rooms here. We check nothing is blocking it, a sofa included.'],
  ['Filter', 'The cheapest part and the one most often forgotten. We fit a new one every visit.'],
  ['Blower', 'Cleaned, balanced and its motor amps measured, so it is not working twice as hard.'],
  ['Furnace or heat pump', 'Burner, flame sensor, heat exchanger and gas pressure, or refrigerant and defrost.'],
  ['Coil', 'Washed, and the drain line flushed, so summer does not end in a ceiling stain.'],
  ['Supply registers', 'We measure the air at each one. A cold bedroom usually starts here.'],
];

const PLAN_INCLUDES = [
  'A cooling tune-up every spring',
  'A heating tune-up every fall',
  'Front of the line when it breaks',
  '15% off every repair',
  'No evening or weekend charge',
  'Filters delivered every quarter',
];

const SEASONS = [
  {
    name: 'Spring',
    months: 'March to May',
    tone: 'spring',
    you: ['Clear leaves and grass off the outdoor unit', 'Change the filter'],
    we: ['Cooling tune-up', 'Coil wash and drain flush'],
  },
  {
    name: 'Summer',
    months: 'June to August',
    tone: 'summer',
    you: ['Set the thermostat no lower than 74 when away', 'Keep blinds shut on the sunny side'],
    we: ['Same-day repair when it quits', 'Check the refrigerant if rooms feel damp'],
  },
  {
    name: 'Fall',
    months: 'September to November',
    tone: 'fall',
    you: ['Test the carbon monoxide alarms', 'Change the filter again'],
    we: ['Heating tune-up', 'Heat exchanger and flue inspection'],
  },
  {
    name: 'Winter',
    months: 'December to February',
    tone: 'winter',
    you: ['Keep snow off the furnace vent outside', 'Do not close more than two registers'],
    we: ['A 24-hour line for no heat', 'Humidifier pad change'],
  },
];

const REPAIRS = [
  ['Diagnostic visit', 'Waived if you go ahead with the repair', '$89'],
  ['Furnace repair', 'Igniters, sensors, blower motors', 'from $165'],
  ['Air conditioner repair', 'Capacitors, contactors, leaks', 'from $185'],
  ['Thermostat swap', 'Smart or simple, wired and set up', 'from $145'],
];

const INSTALLS = [
  ['Furnace replacement', '96% efficient, ten-year parts and labor', 'from $4,600'],
  ['Heat pump', 'Heats to minus 13, cools all summer', 'from $9,800'],
  ['Ductless mini-split', 'For the addition or the room the ducts forgot', 'from $3,900'],
  ['Whole-house air cleaner', 'A filter cabinet at the furnace', 'from $640'],
];

const REBATES = [
  ['$1,500', 'Lakeshore Electric', 'Cold-climate heat pump, per home'],
  ['$400', 'Northgate Gas', 'Furnace of 95% efficiency or better'],
  ['$100', 'Lakeshore Electric', 'Smart thermostat, installed by us'],
  ['Free', 'County Energy Office', 'Home energy audit and air sealing, if you qualify'],
];

const HOURS = [
  ['Office', 'Monday to Friday, 7:30-5:30'],
  ['Saturday', '8:00-1:00, service calls only'],
  ['No heat, no cooling', 'Answered 24 hours, all year'],
];

export default function NorthwindHeatingAirPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--frost': '#eef3f5',
        '--duct': '#10293a',
        '--blue': '#2a77ad',
        '--ember': '#cc4a2c',
        '--ice': '#9fd0e3',
        '--amber': '#f2b63c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="frost,duct,blue,ember,ice,amber"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Northwind</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Heating &amp; Air</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#contact">Book service</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The thermostat sits on the seam between cool air and warm. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroTop}>
            <div>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Heating, cooling and clean air, Lakeshore County, since 1994</p>
              <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Warm in January. <span>Cool in July.</span>
              </h1>
            </div>
            <div className={s.heroSide}>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Furnaces, heat pumps and air conditioners, repaired the same day,
                serviced twice a year and replaced only when it truly makes sense.
                Every price is quoted before we pick up a tool.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a tune-up</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="tel:+15550134400">No heat? (555) 013-4400</a>
              </div>
            </div>
          </div>

          <div className={s.panel}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,4,2,0,4,2" className={s.coolField} aria-hidden="true">
              <TabbiedPattern
                pattern={jetstream}
                palette={COOL}
                fit="grid"
                cellSize={44}
                seed="northwind-cool"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div data-edit-pattern="hero.field2" data-edit-roles="transparent,5,3,0,5,3" className={s.heatField} aria-hidden="true">
              <TabbiedPattern
                pattern={jetstream}
                palette={HEAT}
                fit="grid"
                cellSize={44}
                seed="northwind-heat"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="hero.chip" data-edit-max="240" data-edit-multiline className={`${s.chip} ${s.chipCool}`}>Supply air, cooling: 55 degrees</p>
            <p data-edit="hero.chip2" data-edit-max="240" data-edit-multiline className={`${s.chip} ${s.chipHeat}`}>Supply air, heating: 120 degrees</p>
            <div className={s.stat}>
              <p data-edit="hero.statLabel" data-edit-max="240" data-edit-multiline className={s.statLabel}>Set to</p>
              <p data-edit="hero.statTemp" data-edit-max="240" data-edit-multiline className={s.statTemp}>68</p>
              <p className={s.statModes}>
                <span data-edit="hero.modeHeat" data-edit-max="60" className={s.modeHeat}>Heat</span>
                <span data-edit="hero.modeCool" data-edit-max="60" className={s.modeCool}>Cool 74</span>
              </p>
              <p data-edit="hero.statInside" data-edit-max="240" data-edit-multiline className={s.statInside}>Inside 67, humidity 41%</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- AIRFLOW
            The duct diagram: one strip of moving air, six stops under it. */}
        <section id="airflow" className={s.sec} aria-labelledby="airflow-h">
          <div className={s.secHead}>
            <p data-edit="airflow.tag" data-edit-max="240" data-edit-multiline className={s.tag}>01 / Airflow</p>
            <h2 data-edit="airflow.secTitle" data-edit-max="60" id="airflow-h" className={s.secTitle}>Where the air goes, and what we check</h2>
            <p data-edit="airflow.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every system, gas or electric, moves air the same way. A tune-up
              follows it round the house, stop by stop, and you get the readings
              on paper.
            </p>
          </div>
          <div data-edit-pattern="airflow.field" data-edit-roles="transparent,4,2,0,5,3" className={s.duct} aria-hidden="true">
            <TabbiedPattern
              pattern={jetstream}
              palette={DRAFT}
              fit="grid"
              cellSize={36}
              seed="northwind-duct"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <ol className={s.stations}>
            {STATIONS.map(([name, note], i) => (
              <li key={name} className={s.station}>
                <h3 data-edit={`airflow.stationName.${i}`} data-edit-max="40" className={s.stationName}>{name}</h3>
                <p data-edit={`airflow.stationNote.${i}`} data-edit-max="240" data-edit-multiline className={s.stationNote}>{note}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ PLAN */}
        <section id="plan" className={s.sec} aria-labelledby="plan-h">
          <div className={s.planGrid}>
            <div className={s.planCard}>
              <p data-edit="plan.planTag" data-edit-max="240" data-edit-multiline className={s.planTag}>Membership</p>
              <h2 data-edit="plan.planTitle" data-edit-max="60" id="plan-h" className={s.planTitle}>The Comfort Plan</h2>
              <p data-edit="plan.planPrice" data-edit-max="240" data-edit-multiline className={s.planPrice}>$17</p>
              <p data-edit="plan.planPer" data-edit-max="240" data-edit-multiline className={s.planPer}>a month for one system, $26 for two</p>
              <ul className={s.planList}>
                {PLAN_INCLUDES.map((item, i) => (
                  <li data-edit={`plan.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
              <a data-edit="plan.planButton" data-edit-max="28" className={s.planButton} href="#contact">Join the plan</a>
            </div>
            <div className={s.planSide}>
              <p data-edit="plan.tag" data-edit-max="240" data-edit-multiline className={s.tag}>02 / Comfort Plan</p>
              <h3 data-edit="plan.planSideTitle" data-edit-max="40" className={s.planSideTitle}>Two visits a year, and the system lasts years longer</h3>
              <p data-edit="plan.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                A furnace or air conditioner that is looked after runs about 15%
                cheaper and outlives a neglected one by five to seven years. The
                plan books the visits for you, so nobody has to remember.
              </p>
              <dl className={s.planFacts}>
                <div>
                  <dt data-edit="plan.term" data-edit-max="28">Members</dt>
                  <dd data-edit="plan.body" data-edit-max="200" data-edit-multiline>2,140</dd>
                </div>
                <div>
                  <dt data-edit="plan.term2" data-edit-max="28">Average tune-up</dt>
                  <dd data-edit="plan.body2" data-edit-max="200" data-edit-multiline>75 min</dd>
                </div>
                <div>
                  <dt data-edit="plan.term3" data-edit-max="28">Cancel</dt>
                  <dd data-edit="plan.body3" data-edit-max="200" data-edit-multiline>Any time</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- SEASONS */}
        <section id="seasons" className={s.sec} aria-labelledby="seasons-h">
          <div className={s.secHead}>
            <p data-edit="seasons.tag" data-edit-max="240" data-edit-multiline className={s.tag}>03 / Seasons</p>
            <h2 data-edit="seasons.secTitle" data-edit-max="60" id="seasons-h" className={s.secTitle}>A checklist for the whole year</h2>
            <p data-edit="seasons.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Ten minutes of yours each season, and one visit of ours twice a
              year. Pin it inside the furnace closet door.
            </p>
          </div>
          <ul className={s.seasons}>
            {SEASONS.map((season, i) => (
              <li key={season.name} className={`${s.season} ${s[season.tone]}`}>
                <h3 data-edit={`seasons.seasonName.${i}`} data-edit-max="40" className={s.seasonName}>{season.name}</h3>
                <p data-edit={`seasons.seasonMonths.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonMonths}>{season.months}</p>
                <p data-edit={`seasons.seasonWho.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonWho}>You</p>
                <ul className={s.seasonList}>
                  {season.you.map((task, i2) => (
                    <li data-edit={`seasons.item.${i}.${i2}`} data-edit-max="80" key={task}>{task}</li>
                  ))}
                </ul>
                <p data-edit={`seasons.seasonWho2.${i}`} data-edit-max="240" data-edit-multiline className={s.seasonWho}>Us</p>
                <ul className={s.seasonList}>
                  {season.we.map((task, i2) => (
                    <li data-edit={`seasons.item2.${i}.${i2}`} data-edit-max="80" key={task}>{task}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- SERVICES */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <p data-edit="services.tag" data-edit-max="240" data-edit-multiline className={s.tag}>04 / Services</p>
            <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>Repair and install, at flat rates</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The price is the price: quoted at the door, in writing, before any
              work starts. No hourly meter running in the basement.
            </p>
          </div>
          <div className={s.boards}>
            <div className={s.board}>
              <h3 data-edit="services.boardTitle" data-edit-max="40" className={s.boardTitle}>Repair</h3>
              <ul className={s.prices}>
                {REPAIRS.map(([name, note, price], i) => (
                  <li key={name}>
                    <span data-edit={`services.priceName.${i}`} data-edit-max="60" className={s.priceName}>{name}</span>
                    <span data-edit={`services.priceNote.${i}`} data-edit-max="60" className={s.priceNote}>{note}</span>
                    <span data-edit={`services.priceValue.${i}`} data-edit-max="60" className={s.priceValue}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.board}>
              <h3 data-edit="services.boardTitle2" data-edit-max="40" className={s.boardTitle}>Install</h3>
              <ul className={s.prices}>
                {INSTALLS.map(([name, note, price], i) => (
                  <li key={name}>
                    <span data-edit={`services.priceName2.${i}`} data-edit-max="60" className={s.priceName}>{name}</span>
                    <span data-edit={`services.priceNote2.${i}`} data-edit-max="60" className={s.priceNote}>{note}</span>
                    <span data-edit={`services.priceValue2.${i}`} data-edit-max="60" className={s.priceValue}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- REBATES */}
        <section id="rebates" className={s.sec} aria-labelledby="rebates-h">
          <div className={s.secHead}>
            <p data-edit="rebates.tag" data-edit-max="240" data-edit-multiline className={s.tag}>05 / Rebates</p>
            <h2 data-edit="rebates.secTitle" data-edit-max="60" id="rebates-h" className={s.secTitle}>Money back on a new system</h2>
            <p data-edit="rebates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              We fill in the forms, attach the model numbers and the invoice,
              and follow up until the check arrives. Most come within eight weeks.
            </p>
          </div>
          <ul className={s.rebates}>
            {REBATES.map(([amount, from, what], i) => (
              <li key={what} className={s.rebate}>
                <p data-edit={`rebates.rebateAmount.${i}`} data-edit-max="240" data-edit-multiline className={s.rebateAmount}>{amount}</p>
                <p data-edit={`rebates.rebateFrom.${i}`} data-edit-max="240" data-edit-multiline className={s.rebateFrom}>{from}</p>
                <p data-edit={`rebates.rebateWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.rebateWhat}>{what}</p>
              </li>
            ))}
          </ul>
          <p data-edit="rebates.rebateNote" data-edit-max="240" data-edit-multiline className={s.rebateNote}>Rebates stack. A heat pump with a smart thermostat came to $1,600 back for most of last year&apos;s customers.</p>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <p data-edit="contact.tag" data-edit-max="240" data-edit-multiline className={s.tag}>06 / Contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a visit</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us what is happening and when you are home. We call back
                within the hour to set a two-hour arrival window.
              </p>
              <p className={s.bigLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550134400">(555) 013-4400</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:service@northwindair.example">service@northwindair.example</a>
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>1180 Furnace Hill Road, Lakeshore</p>
              <dl className={s.hours}>
                {HOURS.map(([label, value], i) => (
                  <div key={label}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{label}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="contact.area" data-edit-max="240" data-edit-multiline className={s.area}>We serve Lakeshore, Pine Bluff, Ardmore Flats, Cedar Point and everywhere within 30 miles.</p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="nw-name">Name</label>
                <input id="nw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="nw-phone">Phone</label>
                <input id="nw-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label3" htmlFor="nw-address">Street address</label>
                <input id="nw-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="nw-need">What you need</label>
                <select id="nw-need" name="need" defaultValue="tuneup">
                  <option value="tuneup">A tune-up</option>
                  <option value="noheat">No heat</option>
                  <option value="nocool">No cooling</option>
                  <option value="noise">A new noise or smell</option>
                  <option value="quote">A quote for a new system</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="nw-system">Your system</label>
                <select id="nw-system" name="system" defaultValue="gas">
                  <option value="gas">Gas furnace</option>
                  <option value="heatpump">Heat pump</option>
                  <option value="ac">Central air</option>
                  <option value="boiler">Boiler</option>
                  <option value="unsure">Not sure</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="nw-note">Anything else</label>
                <textarea id="nw-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Request a visit</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>No heat in winter or no cooling over 90 degrees? Call instead, day or night.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,5,2,4" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={jetstream}
            palette={FOOT}
            fit="grid"
            cellSize={40}
            seed="northwind-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Northwind Heating &amp; Air</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional heating and cooling contractor. The technicians, prices, rebates and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
