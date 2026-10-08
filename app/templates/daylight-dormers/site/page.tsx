import { TabbiedPattern } from 'tabbied/react';
import { lucarne } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './daylight-dormers.module.css';

export const metadata = {
  title: 'Daylight Dormers: Skylights and roof windows fitted in a day',
  description:
    'Daylight Dormers fits roof windows in pitched roofs and rooflights in flat ones. A free survey, a fixed price by window size, and one day on your roof from tiles off to tidy.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The lucarne is
   a field of roof slopes, each with its small window cut out: the firm's
   whole trade in one tile. It is the roof in the hero's section drawing, the
   band of rooftops before the install day, and the eaves of the footer. */
const SKY = '#eef3f6';
const SLATE = '#15212e';
const BLUE = '#3a78b5';
const SUN = '#f0b13c';
const ZINC = '#8a9aa7';

const ROOF = ['transparent', SUN, BLUE, SKY, ZINC, BLUE];
const ROOFTOPS = ['transparent', BLUE, SUN, SLATE, ZINC, SUN];
const EAVES = ['transparent', SUN, BLUE, ZINC, SKY, BLUE];

const NAV = [
  ['Sizes', '#sizes'],
  ['Pitched or flat', '#roofs'],
  ['The day', '#day'],
  ['Questions', '#questions'],
  ['Book a survey', '#survey'],
];

type Size = { code: string; size: string; room: string; glass: string; price: string; shape: string };

/* Outer frame sizes in centimeters, width by height, and the fitted price in
   a tiled roof with a standard flashing kit and inside lining. */
const SIZES: Size[] = [
  { code: 'S1', size: '55 x 78', room: 'Landings, a loft hatch, a stairwell', glass: '0.27 sq m', price: '$1,180', shape: 'sizeS1' },
  { code: 'S2', size: '55 x 98', room: 'Bathrooms and narrow rafters', glass: '0.36 sq m', price: '$1,290', shape: 'sizeS2' },
  { code: 'M1', size: '78 x 98', room: 'A small bedroom or a study', glass: '0.55 sq m', price: '$1,450', shape: 'sizeM1' },
  { code: 'M2', size: '78 x 118', room: 'The one most people choose', glass: '0.68 sq m', price: '$1,560', shape: 'sizeM2' },
  { code: 'M3', size: '78 x 140', room: 'Steep roofs, a view when standing', glass: '0.84 sq m', price: '$1,690', shape: 'sizeM3' },
  { code: 'L1', size: '114 x 118', room: 'Living rooms and kitchens', glass: '1.07 sq m', price: '$2,180', shape: 'sizeL1' },
];

const PITCHED = [
  'Centre-pivot or top-hung opening',
  'Roof pitch from 15 to 90 degrees',
  'Electric opening with a rain sensor, add $420',
  'Blackout or pleated blind, from $95',
];

const FLAT = [
  'Fixed or opening rooflight on an insulated upstand',
  'Roof pitch from 0 to 15 degrees',
  'Flat glass, a dome, or walk-on glass for a terrace',
  'Membrane sealed to the upstand by our roofer',
];

type Hour = { time: string; title: string; body: string };

/* A one-window install in a tiled roof, as the crew actually spends it. */
const DAY: Hour[] = [
  { time: '7:30', title: 'Arrive and sheet up', body: 'Dust sheets down from the front door to the room, furniture covered, a ladder or scaffold tower up outside.' },
  { time: '8:15', title: 'Open the roof', body: 'Tiles and battens off over the opening, the window marked out between the rafters from inside.' },
  { time: '9:30', title: 'Frame the opening', body: 'One rafter cut if the size needs it, trimmers fitted top and bottom so the roof carries the load around the window.' },
  { time: '11:00', title: 'Window in', body: 'Frame fixed, levelled and squared, then the flashing kit dressed under and over the tiles. The roof is watertight by lunch.' },
  { time: '12:30', title: 'Tiles back', body: 'Tiles cut and laid back around the flashing. Broken tiles are replaced from our stock to match.' },
  { time: '13:30', title: 'Line the inside', body: 'Insulation collar, vapour barrier, and plasterboard linings splayed to throw the light wider into the room.' },
  { time: '15:30', title: 'Show and tell', body: 'Blind fitted, the controls shown, the warranty card filled in, and a photo of the flashing for your records.' },
  { time: '16:30', title: 'Gone', body: 'Swept, hoovered and the offcuts taken away. The plaster needs a day to dry before you paint the linings.' },
];

const HOUR_TICKS = ['7', '8', '9', '10', '11', '12', '1', '2', '3', '4'];

const FAQS = [
  ['Do I need planning permission?', 'Usually not. A roof window that sits in the plane of the roof and does not face a street is permitted development in most areas. On a listed building or in a conservation area we check first and tell you before the survey.'],
  ['Will it leak?', 'Not if the flashing is right, which is why we fit the maker\'s own kit and never improvise one. Every install carries our ten-year leak warranty on top of the window\'s own.'],
  ['What about condensation?', 'Modern double and triple glazing keeps the inner pane warm. Bathrooms and kitchens get a window with a vent bar, and we insulate the linings so the frame does not form a cold bridge.'],
  ['Can you replace an old skylight?', 'Yes, and it is quicker than a new opening: most replacements in the same size take half a day. If the old one is an odd size, we can enlarge the opening to the nearest standard frame.'],
  ['Is the house open to the weather?', 'For about three hours in the morning, and only over the opening. We do not start a roof in rain or high wind; if the forecast turns, we rebook at no cost to you.'],
];

const HOURS = [
  ['Monday to Friday', '7:30-5:00'],
  ['Saturday', 'Surveys only, 9:00-1:00'],
  ['Sunday', 'Closed'],
];

export default function DaylightDormersPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sky': '#eef3f6',
        '--slate': '#15212e',
        '--blue': '#3a78b5',
        '--sun': '#f0b13c',
        '--zinc': '#8a9aa7',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sky,slate,blue,sun,zinc"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;800&family=Red+Hat+Text:wght@400;500;600&family=Red+Hat+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Daylight Dormers</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550173360">(555) 017-3360</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Roof windows and rooflights, fitted by our own crews</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Daylight from above, <em>fitted in a day.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              A window in the roof lets in about twice the light of the same window
              in a wall. We survey for free, price by the size you choose, and
              finish in one working day, from the first tile off to the last sweep.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#survey">Book a free survey</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#sizes">See sizes and prices</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Windows fitted</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>4,200+</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Leak warranty</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>10 yrs</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">From</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>$1,180</dd>
              </div>
            </dl>
          </div>

          <figure className={s.drawing}>
            <div className={s.room} aria-hidden="true" />
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,0,4,2" className={s.roof} aria-hidden="true">
              <TabbiedPattern
                pattern={lucarne}
                palette={ROOF}
                fit="grid"
                cellSize={50}
                seed="daylight-roof"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.beam} aria-hidden="true" />
            <div className={s.glass} aria-hidden="true" />
            <div className={s.sun} aria-hidden="true" />
            <div className={s.floor} aria-hidden="true" />
            <p data-edit="hero.dim" data-edit-max="240" data-edit-multiline className={`${s.dim} ${s.dimPitch}`}>Pitch 30 deg</p>
            <p data-edit="hero.dim2" data-edit-max="240" data-edit-multiline className={`${s.dim} ${s.dimWindow}`}>M2, 78 x 118 cm</p>
            <p data-edit="hero.dim3" data-edit-max="240" data-edit-multiline className={`${s.dim} ${s.dimFloor}`}>Sunlit floor 3.6 sq m</p>
            <figcaption data-edit="hero.caption" data-edit-max="120" data-edit-multiline className={s.caption}>Section through a loft bedroom, looking along the ridge.</figcaption>
          </figure>
        </section>

        <section id="sizes" className={s.sec} aria-labelledby="sizes-h">
          <div className={s.secHead}>
            <p data-edit="sizes.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01</p>
            <h2 data-edit="sizes.secTitle" data-edit-max="60" id="sizes-h" className={s.secTitle}>Six sizes, one price each</h2>
            <p data-edit="sizes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices are fitted, in a tiled or slate roof, with the flashing kit,
              insulation collar and plasterboard linings. No extras for a second
              floor or a steep pitch. Drawn to scale below.
            </p>
          </div>

          <ul className={s.scale}>
            {SIZES.map((size, i) => (
              <li key={size.code} className={s.scaleItem}>
                <span className={`${s.pane} ${s[size.shape]}`} aria-hidden="true" />
                <span data-edit={`sizes.scaleCode.${i}`} data-edit-max="60" className={s.scaleCode}>{size.code}</span>
                <span data-edit={`sizes.scaleSize.${i}`} data-edit-max="60" className={s.scaleSize}>{size.size}</span>
              </li>
            ))}
          </ul>

          <div className={s.tableWrap}>
            <table className={s.sizes}>
              <caption data-edit="sizes.srOnly" className={s.srOnly}>Roof window sizes and fitted prices</caption>
              <thead>
                <tr>
                  <th data-edit="sizes.heading" scope="col">Size</th>
                  <th data-edit="sizes.heading2" scope="col">Frame, cm</th>
                  <th data-edit="sizes.heading3" scope="col">Good for</th>
                  <th data-edit="sizes.heading4" scope="col">Glass area</th>
                  <th data-edit="sizes.heading5" scope="col">Fitted</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((size, i) => (
                  <tr key={size.code}>
                    <th data-edit={`sizes.heading6.${i}`} scope="row">{size.code}</th>
                    <td data-edit={`sizes.mono.${i}`} className={s.mono}>{size.size}</td>
                    <td data-edit={`sizes.cell.${i}`}>{size.room}</td>
                    <td data-edit={`sizes.mono2.${i}`} className={s.mono}>{size.glass}</td>
                    <td data-edit={`sizes.price.${i}`} className={s.price}>{size.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p data-edit="sizes.tableNote" data-edit-max="240" data-edit-multiline className={s.tableNote}>A second window in the same roof on the same day: take $350 off its price.</p>
        </section>

        <section id="roofs" className={s.sec} aria-labelledby="roofs-h">
          <div className={s.secHead}>
            <p data-edit="roofs.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
            <h2 data-edit="roofs.secTitle" data-edit-max="60" id="roofs-h" className={s.secTitle}>Pitched roof or flat roof</h2>
            <p data-edit="roofs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The survey decides which you have; most houses have both. The
              opening, the flashing and the warranty differ, the one-day fitting
              does not.
            </p>
          </div>
          <div className={s.roofs}>
            <article className={s.roofCard}>
              <div className={`${s.mini} ${s.miniPitched}`} aria-hidden="true">
                <span className={s.miniSlope} />
                <span className={s.miniPane} />
                <span className={s.miniRay} />
              </div>
              <h3 data-edit="roofCard.roofTitle" data-edit-max="40" className={s.roofTitle}>Roof window</h3>
              <p data-edit="roofCard.roofSub" data-edit-max="240" data-edit-multiline className={s.roofSub}>For pitched roofs, tiles or slate</p>
              <ul className={s.roofList}>
                {PITCHED.map((item, i) => (
                  <li data-edit={`roofCard.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
              <p data-edit="roofCard.roofPrice" data-edit-max="240" data-edit-multiline className={s.roofPrice}>From $1,180 fitted</p>
            </article>
            <article className={s.roofCard}>
              <div className={`${s.mini} ${s.miniFlat}`} aria-hidden="true">
                <span className={s.miniDeck} />
                <span className={s.miniKerb} />
                <span className={s.miniRay} />
              </div>
              <h3 data-edit="roofCard.roofTitle2" data-edit-max="40" className={s.roofTitle}>Rooflight</h3>
              <p data-edit="roofCard.roofSub2" data-edit-max="240" data-edit-multiline className={s.roofSub}>For flat roofs, extensions and garages</p>
              <ul className={s.roofList}>
                {FLAT.map((item, i) => (
                  <li data-edit={`roofCard.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
              <p data-edit="roofCard.roofPrice2" data-edit-max="240" data-edit-multiline className={s.roofPrice}>From $1,640 fitted</p>
            </article>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,1,4,3" className={s.rooftops} aria-hidden="true">
          <TabbiedPattern
            pattern={lucarne}
            palette={ROOFTOPS}
            fit="grid"
            cellSize={52}
            seed="daylight-rooftops"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="day" className={s.day} aria-labelledby="day-h">
          <div className={s.dayInner}>
            <div className={s.dayHead}>
              <p data-edit="day.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
              <h2 data-edit="day.dayTitle" data-edit-max="60" id="day-h" className={s.dayTitle}>One window, one day</h2>
              <p data-edit="day.dayLead" data-edit-max="240" data-edit-multiline className={s.dayLead}>
                Two fitters and, for the flat roofs, our roofer. You need to be in
                at 7:30 and at 3:30; in between, carry on with your day.
              </p>
            </div>
            <ol className={s.ruler} aria-hidden="true">
              {HOUR_TICKS.map((hour, i) => (
                <li data-edit={`day.item.${i}`} data-edit-max="80" key={hour}>{hour}</li>
              ))}
            </ol>
            <ol className={s.hours}>
              {DAY.map((step, i) => (
                <li key={step.time} className={s.hour}>
                  <p data-edit={`day.hourTime.${i}`} data-edit-max="240" data-edit-multiline className={s.hourTime}>{step.time}</p>
                  <h3 data-edit={`day.hourTitle.${i}`} data-edit-max="40" className={s.hourTitle}>{step.title}</h3>
                  <p data-edit={`day.hourBody.${i}`} data-edit-max="240" data-edit-multiline className={s.hourBody}>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.faqGrid}>
            <div className={s.secHead}>
              <p data-edit="questions.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
              <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>What people ask at the survey</h2>
            </div>
            <div className={s.faqs}>
              {FAQS.map(([q, a], i) => (
                <details key={q} className={s.faq}>
                  <summary data-edit={`questions.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="survey" className={s.sec} aria-labelledby="survey-h">
          <div className={s.surveyGrid}>
            <div className={s.surveyInfo}>
              <p data-edit="survey.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05</p>
              <h2 data-edit="survey.secTitle" data-edit-max="60" id="survey-h" className={s.secTitle}>Book a free survey</h2>
              <p data-edit="survey.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Forty minutes in the loft and on the ladder. You get a written
                price, the size we recommend and a date, usually within three weeks.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="survey.term" data-edit-max="28">Yard</dt>
                  <dd data-edit="survey.body" data-edit-max="200" data-edit-multiline>Unit 4, Kestrel Court, Millbank Road</dd>
                </div>
                <div>
                  <dt data-edit="survey.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="survey.link" data-edit-max="28" href="tel:+15550173360">(555) 017-3360</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="survey.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="survey.link2" data-edit-max="28" href="mailto:survey@daylightdormers.example">survey@daylightdormers.example</a>
                  </dd>
                </div>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`survey.term4.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`survey.body2.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="survey.label" htmlFor="dd-name">Name</label>
                <input id="dd-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="survey.label2" htmlFor="dd-phone">Phone</label>
                <input id="dd-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="survey.label3" htmlFor="dd-address">Address</label>
                <input id="dd-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="survey.label4" htmlFor="dd-roof">Roof</label>
                <select id="dd-roof" name="roof" defaultValue="pitched">
                  <option value="pitched">Pitched, tiles or slate</option>
                  <option value="flat">Flat</option>
                  <option value="both">Both, or not sure</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="survey.label5" htmlFor="dd-count">How many windows</label>
                <input id="dd-count" name="count" type="number" min={1} max={12} defaultValue={1} />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="survey.label6" htmlFor="dd-room">Which room, and what you hope for</label>
                <textarea id="dd-room" name="room" rows={4} />
              </div>
              <button data-edit="survey.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a survey</button>
              <p data-edit="survey.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We call back within one working day to fix a time.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,4,0,2" className={s.footEaves} aria-hidden="true">
          <TabbiedPattern
            pattern={lucarne}
            palette={EAVES}
            fit="grid"
            cellSize={34}
            seed="daylight-eaves"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Daylight Dormers</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional roof window installer. The crews, prices, warranty and address are invented.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
