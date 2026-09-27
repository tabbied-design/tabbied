import { TabbiedPattern } from 'tabbied/react';
import { thickset, perforate, metro, dotmatrix, ring } from 'tabbied/patterns';
import s from './crosstown-walk-in.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Crosstown Walk-In Clinic: Urgent care, 400 Market Street, Crosstown',
  description:
    'Urgent care without an appointment, 8-8 every day. Live wait times, what we treat, when to go to the ER instead, online check-in, prices and insurance, and how to find us on Market Street.',
};

/* Site colors. The tiled wall behind the wait board is the lead pattern
   with a transparent ground, so the wall color between the frames is the
   page's own. */
const WHITE = '#f7f8f7';
const NAVY = '#13244a';
const TEAL = '#11a39a';
const RED = '#e2413a';

const TILES = ['transparent', NAVY, TEAL, NAVY, WHITE, TEAL];
const STUB = ['transparent', NAVY, TEAL, NAVY];
const SIGNAL = ['transparent', WHITE, NAVY, WHITE, WHITE];
const ROUTES = ['transparent', TEAL, NAVY, RED, TEAL, NAVY];
const BADGES = ['transparent', TEAL, NAVY];
const SKIRTING = ['transparent', NAVY, TEAL, NAVY, TEAL, WHITE];

const NAV = [
  ['What we treat', '#treat', 'teal'],
  ['ER or us?', '#er', 'red'],
  ['Check in', '#checkin', 'navy'],
  ['Costs', '#costs', 'navy'],
  ['Hours', '#hours', 'teal'],
  ['Clinicians', '#team', 'split'],
  ['Find us', '#find', 'split'],
];

const BOARD = [
  ['Estimated wait', '25', 'min'],
  ['Waiting now', '6', 'people'],
  ['Rooms open', '5', 'of 6'],
];

const HOURLY = [
  ['8', 30], ['9', 55], ['10', 40], ['11', 35], ['12', 60], ['13', 70], ['14', 45],
  ['15', 40], ['16', 55], ['17', 80], ['18', 95], ['19', 70],
] as const;

type Sign = { title: string; note: string; slug?: string; alt?: string; glyph?: string; wide?: boolean; second?: { slug: string; alt: string; title: string } };

const SIGNS: Sign[] = [
  { title: 'Fevers and flu', note: 'Temperatures, coughs, colds that will not shift, COVID and flu tests.', slug: 'crosstown-walk-in-thermometer', alt: 'Pictogram of a clinical thermometer' },
  { title: 'Cuts and burns', note: 'Cleaning, glue or stitches, dressings, and small burns from the kitchen.', slug: 'crosstown-walk-in-bandage', alt: 'Pictogram of a sticking plaster' },
  {
    title: 'Sprains and breaks',
    note: 'Wrists, ankles, fingers and toes. Splints and crutches fitted here.',
    slug: 'crosstown-walk-in-ankle',
    alt: 'Pictogram of a foot and ankle wrapped in a bandage',
    wide: true,
    second: { slug: 'crosstown-walk-in-xray', alt: 'Pictogram of the bones of a hand, as on an x-ray', title: 'X-ray on site' },
  },
  { title: 'Infections', note: 'Ears, throats, chests, sinuses, urine and skin. Same-day antibiotics if you need them.', slug: 'crosstown-walk-in-stethoscope', alt: 'Pictogram of a stethoscope' },
  { title: 'Minor eye injuries', note: 'Grit, scratches, pink eye and a stye. Anything sudden with your sight: the ER.', glyph: 'eye' },
  { title: 'Vaccinations', note: 'Flu, tetanus, travel shots and the ones school asks for. No appointment.', glyph: 'jab' },
  { title: 'Not on the list?', note: 'Ask at the desk. If we cannot help, we will say where can, and call ahead.', glyph: 'ask' },
];

const ER = [
  'Chest pain, pressure or tightness',
  'Trouble breathing, or lips turning blue',
  'A face drooping, an arm weak, or speech slurred',
  'Bleeding that will not stop with pressure',
  'A head injury with confusion or blacking out',
  'Severe burns, or any burn to the face',
  'A seizure, or a sudden severe headache',
  'Pregnant, with bleeding or strong pain',
];

const REASONS = [
  'Fever, cough or flu',
  'Cut, burn or wound',
  'Sprain, strain or possible break',
  'Infection: ear, throat, chest, urine or skin',
  'Eye problem',
  'Vaccination',
  'Something else',
];

const PRICES = [
  ['Visit with a clinician', '$145'],
  ['X-ray, one area', '$65'],
  ['Stitches or glue', 'from $120'],
  ['Strep or flu test', '$30'],
  ['Flu shot', '$35'],
  ['Tetanus booster', '$45'],
  ['Sports or school physical', '$60'],
];

const INSURERS = [
  'Crosstown Health Plan',
  'Market Mutual',
  'Riverline Care',
  'Northgate Blue',
  'Medicare',
  'Medicaid',
];

const WEEK = [
  ['Mon', '8-8'],
  ['Tue', '8-8'],
  ['Wed', '8-8'],
  ['Thu', '8-8'],
  ['Fri', '8-8'],
  ['Sat', '8-8'],
  ['Sun', '8-8'],
];

const HOLIDAYS = [
  ['Thanksgiving', '10:00-16:00'],
  ['Christmas Eve', '8:00-14:00'],
  ['Christmas Day', 'Closed, use St Luke\'s ER'],
  ['New Year\'s Day', '10:00-16:00'],
];

const TEAM = [
  { initials: 'AO', name: 'Dr Amara Osei', role: 'Medical director', note: 'Family medicine. Twelve years in the St Luke\'s ER before this.', days: 'Mon, Tue, Thu' },
  { initials: 'LF', name: 'Dr Luis Ferreira', role: 'Physician', note: 'Emergency medicine. Speaks Portuguese and Spanish.', days: 'Wed, Fri, Sat' },
  { initials: 'JP', name: 'Jen Park, PA-C', role: 'Physician assistant', note: 'Sports injuries and splinting. Runs the Saturday clinic.', days: 'Sat, Sun, Mon' },
  { initials: 'SW', name: 'Sam Whitfield, NP', role: 'Nurse practitioner', note: 'Children, vaccinations, and anyone nervous of needles.', days: 'Tue, Wed, Sun' },
  { initials: 'TN', name: 'Tomasz Nowak', role: 'Radiographer', note: 'Runs the x-ray room. Films read the same day.', days: 'Daily, 9-5' },
];

const GETTING = [
  ['Metro', 'Market St station, exit B. Two minutes on foot.'],
  ['Bus', 'Routes 4 and 9 stop outside the door.'],
  ['Car', 'Garage on 4th Avenue; we validate the first hour.'],
  ['Access', 'Step-free, automatic doors, a hearing loop at the desk.'],
];

export default function CrosstownWalkInPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--white': '#f7f8f7',
        '--navy': '#13244a',
        '--teal': '#11a39a',
        '--red': '#e2413a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="white,navy,teal,red"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Signika:wght@300..700&family=B612+Mono:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markCross} aria-hidden="true" />
          <span className={s.markText}>
            <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Crosstown</span>
            <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Walk-In Clinic</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href, line]) => (
            <a key={href} href={href}>
              <span className={`${s.navDot} ${s[`dot_${line}`]}`} aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
        <p className={s.barServing}>
          <span data-edit="bar.barServingLabel" data-edit-max="60" className={s.barServingLabel}>Now serving</span>
          <span data-edit="bar.barServingNo" data-edit-max="60" className={s.barServingNo}>A-047</span>
        </p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The waiting room wall: heavy framed tiles, the lead pattern, with
            the sign and the live wait board mounted on it, and the floor
            lines setting off below to every part of the page. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,1,0,2" className={s.wall} aria-hidden="true">
            <TabbiedPattern
              pattern={thickset}
              palette={TILES}
              options={{ frequency: 0.85 }}
              fit="grid"
              cellSize={44}
              seed="crosstown-tiles"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.heroInner}>
            <div className={s.signPanel}>
              <p className={s.signStrip}>
                <span className={s.signCross} aria-hidden="true" />
                <span data-edit="hero.text" data-edit-max="60">Urgent care</span>
                <span data-edit="hero.signStripEnd" data-edit-max="60" className={s.signStripEnd}>No appointment</span>
              </p>
              <h1 data-edit="hero.title" data-edit-max="70" id="hero-h" className={s.title}>Crosstown Walk-In Clinic</h1>
              <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                For the things that cannot wait until Monday but do not need
                an emergency room. Walk in, or check in online and wait at
                home until we text you.
              </p>
              <div className={s.actions}>
                <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#checkin">Check in online</a>
                <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#er">Is it an emergency?</a>
              </div>
              <dl className={s.signFacts}>
                <div>
                  <dt data-edit="hero.term" data-edit-max="28">Open</dt>
                  <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>8:00-20:00, seven days</dd>
                </div>
                <div>
                  <dt data-edit="hero.term2" data-edit-max="28">Where</dt>
                  <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>400 Market Street, ground floor</dd>
                </div>
              </dl>
            </div>

            <div className={s.board} role="group" aria-labelledby="board-h">
              <div className={s.boardHead}>
                <h2 data-edit="hero.boardTitle" data-edit-max="60" id="board-h" className={s.boardTitle}>Wait times</h2>
                <p data-edit="hero.body3" data-edit-format="emphasis" data-edit-max="240" data-edit-multiline className={s.boardLive}>
                  <span className={s.liveDot} aria-hidden="true" />
                  Live
                </p>
              </div>
              <div className={s.serving}>
                <p data-edit="hero.servingLabel" data-edit-max="240" data-edit-multiline className={s.servingLabel}>Now serving</p>
                <p className={s.servingNo}>
                  <span data-edit="hero.servingLetter" data-edit-max="60" className={s.servingLetter}>A</span>
                  <span data-edit="hero.text2" data-edit-max="60">047</span>
                </p>
              </div>
              <dl className={s.boardStats}>
                {BOARD.map(([label, n, unit], i) => (
                  <div key={label}>
                    <dt data-edit={`hero.term3.${i}`} data-edit-max="28">{label}</dt>
                    <dd>
                      <strong data-edit={`hero.emphasis.${i}`}>{n}</strong>
                      <span data-edit={`hero.text3.${i}`} data-edit-max="60">{unit}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className={s.hourly}>
                <p data-edit="hero.hourlyTitle" data-edit-max="240" data-edit-multiline className={s.hourlyTitle}>Typical wait by hour, minutes</p>
                <ol className={s.hourlyBars}>
                  {HOURLY.map(([h, v], i) => (
                    <li key={h} style={{ '--v': v } as React.CSSProperties} className={h === '14' ? s.hourNow : undefined}>
                      <span className={s.hourBar} />
                      <span data-edit={`hero.hourLabel.${i}`} data-edit-max="60" className={s.hourLabel}>{h}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <p data-edit="hero.boardFoot" data-edit-max="240" data-edit-multiline className={s.boardFoot}>Last updated 14:32. X-ray room open.</p>
            </div>
          </div>

          <div className={s.floorLegend}>
            <p data-edit="hero.floorTitle" data-edit-max="240" data-edit-multiline className={s.floorTitle}>Follow the floor lines</p>
            <ul className={s.floorLines}>
              <li className={`${s.fl} ${s.fl_teal}`}>
                <a href="#treat" className={s.flPlate}>
                  <Artwork slug="crosstown-walk-in-stethoscope" alt="" inks={['var(--on-teal)']} className={s.flIcon} />
                  <span data-edit="hero.text4" data-edit-max="60">Treatment rooms 1-6</span>
                </a>
              </li>
              <li className={`${s.fl} ${s.fl_navy}`}>
                <a href="#checkin" className={s.flPlate}>
                  <Artwork slug="crosstown-walk-in-xray" alt="" inks={['var(--on-navy)']} className={s.flIcon} />
                  <span data-edit="hero.text5" data-edit-max="60">Check-in desk, x-ray</span>
                </a>
              </li>
              <li className={`${s.fl} ${s.fl_red}`}>
                <a href="#er" className={s.flPlate}>
                  <span data-edit="hero.text3" data-edit-max="60" className={s.flBang} aria-hidden="true">!</span>
                  <span data-edit="hero.text6" data-edit-max="60">Emergency room, next door</span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- TREAT
            Airport-style signs: a pictogram at signage scale in a square
            panel, the words under it. */}
        <section id="treat" className={s.sec} aria-labelledby="treat-h">
          <div className={`${s.arrive} ${s.arrive_teal}`}>
            <span className={s.arriveLine} aria-hidden="true" />
            <h2 data-edit="treat.arriveSign" data-edit-max="60" id="treat-h" className={s.arriveSign}>What we treat</h2>
          </div>
          <p data-edit="treat.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Most of what brings people in, seen by a doctor, a physician assistant or a nurse practitioner, usually within the hour.</p>

          <ul className={s.signs}>
            {SIGNS.map((sign, i) => (
              <li key={sign.title} className={sign.wide ? `${s.sign} ${s.signWide}` : s.sign}>
                <div className={s.signFace}>
                  {sign.slug && (
                    <Artwork slug={sign.slug} alt={sign.alt ?? ''} inks={['var(--on-navy)']} className={s.picto} />
                  )}
                  {sign.second && (
                    <span className={s.signSecond}>
                      <Artwork slug={sign.second.slug} alt={sign.second.alt} inks={['var(--on-navy)']} className={s.picto} />
                      <span data-edit={`treat.signBadge.${i}`} data-edit-max="60" className={s.signBadge}>{sign.second.title}</span>
                    </span>
                  )}
                  {sign.glyph && <span className={`${s.glyph} ${s[`g_${sign.glyph}`]}`} aria-hidden="true"><span /></span>}
                </div>
                <div className={s.signText}>
                  <h3 data-edit={`treat.signTitle.${i}`} data-edit-max="40" className={s.signTitle}>{sign.title}</h3>
                  <p data-edit={`treat.signNote.${i}`} data-edit-max="240" data-edit-multiline className={s.signNote}>{sign.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------------- ER */}
        <section id="er" className={s.erSec} aria-labelledby="er-h">
          <div data-edit-pattern="er.field" data-edit-roles="transparent,0,1,0,0" className={s.erSignal} aria-hidden="true">
            <TabbiedPattern
              pattern={dotmatrix}
              palette={SIGNAL}
              options={{ frequency: 0.6 }}
              fit="grid"
              cellSize={34}
              seed="crosstown-signal"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.erInner}>
            <div className={s.erHead}>
              <span className={s.erTriangle} aria-hidden="true" />
              <h2 data-edit="er.erTitle" data-edit-max="60" id="er-h" className={s.erTitle}>Go to the ER instead if</h2>
              <p data-edit="er.erNote" data-edit-max="240" data-edit-multiline className={s.erNote}>Or call 911. St Luke&apos;s emergency room is next door: out of our main doors, turn left, 150 m. Follow the red line.</p>
            </div>
            <ul className={s.erList}>
              {ER.map((item, i) => (
                <li data-edit={`er.item.${i}`} data-edit-max="80" key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- CHECKIN
            The form, and beside it the ticket it prints: a queue slip with
            a perforated stub. */}
        <section id="checkin" className={s.sec} aria-labelledby="checkin-h">
          <div className={`${s.arrive} ${s.arrive_navy}`}>
            <span className={s.arriveLine} aria-hidden="true" />
            <h2 data-edit="checkin.arriveSign" data-edit-max="60" id="checkin-h" className={s.arriveSign}>Check in online</h2>
          </div>
          <p data-edit="checkin.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Take a number from your sofa. We text you when there are about twenty minutes to go, so you arrive as a room comes free.</p>

          <div className={s.checkGrid}>
            <form className={s.form} action="#">
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="checkin.label" htmlFor="cw-name">Full name</label>
                  <input id="cw-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="checkin.label2" htmlFor="cw-dob">Date of birth</label>
                  <input id="cw-dob" name="dob" type="text" inputMode="numeric" placeholder="MM / DD / YYYY" />
                </div>
                <div className={s.field}>
                  <label data-edit="checkin.label3" htmlFor="cw-phone">Mobile, for the text</label>
                  <input id="cw-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="checkin.label4" htmlFor="cw-pay">Paying with</label>
                  <select id="cw-pay" name="pay" defaultValue="insurance">
                    <option value="insurance">Insurance</option>
                    <option value="self">Self-pay</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="checkin.label5" htmlFor="cw-reason">Main reason</label>
                  <select id="cw-reason" name="reason" defaultValue={REASONS[0]}>
                    {REASONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="checkin.label6" htmlFor="cw-notes">In a sentence or two</label>
                  <textarea id="cw-notes" name="notes" rows={3} />
                </div>
                <div className={`${s.check} ${s.fieldWide}`}>
                  <input id="cw-safe" name="safe" type="checkbox" />
                  <label data-edit="checkin.label7" htmlFor="cw-safe">None of the ER warning signs above apply to me</label>
                </div>
              </div>
              <button data-edit="checkin.btn" data-edit-max="24" className={s.btn} type="submit">Take a number</button>
            </form>

            <div className={s.ticketWrap}>
              <div className={s.ticket}>
                <p data-edit="checkin.ticketHead" data-edit-max="240" data-edit-multiline className={s.ticketHead}>Crosstown Walk-In</p>
                <p data-edit="checkin.ticketLabel" data-edit-max="240" data-edit-multiline className={s.ticketLabel}>Your number</p>
                <p data-edit="checkin.ticketNo" data-edit-max="240" data-edit-multiline className={s.ticketNo}>A-052</p>
                <dl className={s.ticketRows}>
                  <div>
                    <dt data-edit="checkin.term" data-edit-max="28">Ahead of you</dt>
                    <dd data-edit="checkin.body" data-edit-max="200" data-edit-multiline>5</dd>
                  </div>
                  <div>
                    <dt data-edit="checkin.term2" data-edit-max="28">Estimated wait</dt>
                    <dd data-edit="checkin.body2" data-edit-max="200" data-edit-multiline>35 min</dd>
                  </div>
                  <div>
                    <dt data-edit="checkin.term3" data-edit-max="28">Taken</dt>
                    <dd data-edit="checkin.body3" data-edit-max="200" data-edit-multiline>14:36</dd>
                  </div>
                </dl>
                <span className={s.barcode} aria-hidden="true" />
                <div data-edit-pattern="checkin.field" data-edit-roles="transparent,1,2,1" className={s.stub} aria-hidden="true">
                  <TabbiedPattern
                    pattern={perforate}
                    palette={STUB}
                    options={{ frequency: 0.7 }}
                    fit="grid"
                    cellSize={22}
                    seed="crosstown-stub"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <p data-edit="checkin.ticketFoot" data-edit-max="240" data-edit-multiline className={s.ticketFoot}>Keep this. We call numbers, not names.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- COSTS */}
        <section id="costs" className={s.sec} aria-labelledby="costs-h">
          <div className={`${s.arrive} ${s.arrive_navy} ${s.arriveDashed}`}>
            <span className={s.arriveLine} aria-hidden="true" />
            <h2 data-edit="costs.arriveSign" data-edit-max="60" id="costs-h" className={s.arriveSign}>Costs and insurance</h2>
          </div>
          <p data-edit="costs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Prices on the wall, as they should be. With insurance you pay your plan&apos;s urgent care copay, usually $25 to $75.</p>

          <div className={s.costGrid}>
            <table className={s.prices}>
              <caption data-edit="costs.tableCap" className={s.tableCap}>Self-pay prices</caption>
              <thead>
                <tr>
                  <th data-edit="costs.heading" scope="col">Service</th>
                  <th data-edit="costs.heading2" scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map(([what, price], i) => (
                  <tr key={what}>
                    <th data-edit={`costs.heading3.${i}`} scope="row">{what}</th>
                    <td data-edit={`costs.cell.${i}`}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={s.insurance}>
              <h3 data-edit="costs.boxTitle" data-edit-max="40" className={s.boxTitle}>Plans we take</h3>
              <ul className={s.insurers}>
                {INSURERS.map((i, i2) => (
                  <li data-edit={`costs.item.${i2}`} data-edit-max="80" key={i}>{i}</li>
                ))}
              </ul>
              <p data-edit="costs.boxNote" data-edit-max="240" data-edit-multiline className={s.boxNote}>Not listed? We will check your card at the desk before you are seen, and tell you the price if we are out of network.</p>
              <p data-edit="costs.boxNote2" data-edit-max="240" data-edit-multiline className={s.boxNote}>Payment plans over three months, no interest, for any bill over $100.</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.sec} aria-labelledby="hours-h">
          <div className={`${s.arrive} ${s.arrive_teal} ${s.arriveDashed}`}>
            <span className={s.arriveLine} aria-hidden="true" />
            <h2 data-edit="hours.arriveSign" data-edit-max="60" id="hours-h" className={s.arriveSign}>Hours</h2>
          </div>

          <div className={s.hoursGrid}>
            <div className={s.openSign}>
              <p data-edit="hours.openWord" data-edit-max="240" data-edit-multiline className={s.openWord}>Open</p>
              <p data-edit="hours.openHours" data-edit-max="240" data-edit-multiline className={s.openHours}>8-8</p>
              <p data-edit="hours.openDays" data-edit-max="240" data-edit-multiline className={s.openDays}>Seven days a week</p>
            </div>
            <ul className={s.week}>
              {WEEK.map(([d, h], i) => (
                <li key={d}>
                  <span data-edit={`hours.weekDay.${i}`} data-edit-max="60" className={s.weekDay}>{d}</span>
                  <span data-edit={`hours.weekHours.${i}`} data-edit-max="60" className={s.weekHours}>{h}</span>
                </li>
              ))}
            </ul>
            <div className={s.holidays}>
              <h3 data-edit="hours.boxTitle" data-edit-max="40" className={s.boxTitle}>Holidays</h3>
              <dl className={s.holidayList}>
                {HOLIDAYS.map(([day, h], i) => (
                  <div key={day}>
                    <dt data-edit={`hours.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`hours.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="hours.boxNote" data-edit-max="240" data-edit-multiline className={s.boxNote}>Quietest: 10-11 in the morning and 2-4 in the afternoon. Busiest: after work, 5-7.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.sec} aria-labelledby="team-h">
          <div className={`${s.arrive} ${s.arrive_split}`}>
            <span className={s.arriveLine} aria-hidden="true" />
            <h2 data-edit="team.arriveSign" data-edit-max="60" id="team-h" className={s.arriveSign}>Our clinicians</h2>
          </div>
          <p data-edit="team.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Five people you might see, and the days they are usually on. There is always a doctor in the building.</p>

          <div className={s.teamWall}>
          <div data-edit-pattern="team.field" data-edit-roles="transparent,2,1" className={s.lanyards} aria-hidden="true">
            <TabbiedPattern
              pattern={ring}
              palette={BADGES}
              options={{ frequency: 0.8 }}
              fit="grid"
              cellSize={34}
              seed="crosstown-rings"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <ul className={s.team}>
            {TEAM.map((t, i) => (
              <li key={t.name} className={s.badge}>
                <span className={s.badgeClip} aria-hidden="true" />
                <span className={s.badgeInitials} aria-hidden="true">{t.initials}</span>
                <h3 data-edit={`team.badgeName.${i}`} data-edit-max="40" className={s.badgeName}>{t.name}</h3>
                <p data-edit={`team.badgeRole.${i}`} data-edit-max="240" data-edit-multiline className={s.badgeRole}>{t.role}</p>
                <p data-edit={`team.badgeNote.${i}`} data-edit-max="240" data-edit-multiline className={s.badgeNote}>{t.note}</p>
                <p data-edit={`team.badgeDays.${i}`} data-edit-max="240" data-edit-multiline className={s.badgeDays}>{t.days}</p>
              </li>
            ))}
          </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ FIND */}
        <section id="find" className={s.sec} aria-labelledby="find-h">
          <div className={`${s.arrive} ${s.arrive_split} ${s.arriveDashed}`}>
            <span className={s.arriveLine} aria-hidden="true" />
            <h2 data-edit="find.arriveSign" data-edit-max="60" id="find-h" className={s.arriveSign}>Find us</h2>
          </div>

          <div className={s.findGrid}>
            <div className={s.cityMap}>
              <div data-edit-pattern="find.field" data-edit-roles="transparent,2,1,3,2,1" className={s.routes} aria-hidden="true">
                <TabbiedPattern
                  pattern={metro}
                  palette={ROUTES}
                  options={{ frequency: 0.5 }}
                  fit="grid"
                  cellSize={46}
                  seed="crosstown-routes"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span data-edit="find.market" data-edit-max="60" className={s.market}>Market Street</span>
              <span className={s.here}>
                <span className={s.hereDot} aria-hidden="true" />
                <span data-edit="find.hereLabel" data-edit-max="60" className={s.hereLabel}>You are here: 400 Market St</span>
              </span>
            </div>

            <div className={s.directory}>
              <p data-edit="find.dirHead" data-edit-max="240" data-edit-multiline className={s.dirHead}>Directory, ground floor</p>
              <ul className={s.dirList}>
                <li><span className={`${s.dirSwatch} ${s.dot_navy}`} aria-hidden="true" /><span data-edit="find.dirName" data-edit-max="60">Check-in and billing</span><span data-edit="find.dirWhere" data-edit-max="60" className={s.dirWhere}>A</span></li>
                <li><span className={`${s.dirSwatch} ${s.dot_teal}`} aria-hidden="true" /><span data-edit="find.dirName2" data-edit-max="60">Treatment rooms 1-6</span><span data-edit="find.dirWhere2" data-edit-max="60" className={s.dirWhere}>B</span></li>
                <li><span className={`${s.dirSwatch} ${s.dot_navy}`} aria-hidden="true" /><span data-edit="find.dirName3" data-edit-max="60">X-ray</span><span data-edit="find.dirWhere3" data-edit-max="60" className={s.dirWhere}>C</span></li>
                <li><span className={`${s.dirSwatch} ${s.dot_red}`} aria-hidden="true" /><span data-edit="find.dirName4" data-edit-max="60">St Luke&apos;s ER, next door</span><span data-edit="find.dirWhere4" data-edit-max="60" className={s.dirWhere}>Exit</span></li>
              </ul>
              <dl className={s.getting}>
                {GETTING.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`find.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`find.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="find.link" data-edit-max="28" href="tel:+15550157700">(555) 015-7700</a>
                <a data-edit="find.link2" data-edit-max="28" href="mailto:frontdesk@crosstownwalkin.example">frontdesk@crosstownwalkin.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,1,2,0" className={s.skirting} aria-hidden="true">
          <TabbiedPattern
            pattern={thickset}
            palette={SKIRTING}
            fit="grid"
            cellSize={36}
            seed="crosstown-skirting"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div className={s.footBrand}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Crosstown Walk-In Clinic</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>400 Market Street, Crosstown. Open 8-8, seven days.</p>
          </div>
          <div className={s.footFine}>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional urgent care clinic; the clinicians, prices, insurers and wait times are invented. In a real emergency, call 911.</p>
            <p>
              Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
            <p data-edit="footer.body3" data-edit-max="240" data-edit-multiline>The pictograms are generated images, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
