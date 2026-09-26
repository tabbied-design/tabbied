import { TabbiedPattern } from 'tabbied/react';
import { fluting, grainfall, ripplering } from 'tabbied/patterns';
import s from './birchwood-sauna.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Birchwood Sauna House: Public sauna and cold plunge, Larch Point',
  description:
    'Birchwood Sauna House runs two wood-fired saunas, a Saturday smoke sauna and a cold plunge off the pier at Larch Point. Session tickets, the ritual, every temperature in the house, the timetable and the etiquette.',
};

/* Site colors. The cladding is fluting, birch laths on a transparent ground
   so the charcoal shows through the channels, with the odd ember board. The
   steam is grainfall in birch and ice; the lake is ripplering in ice. */
const BIRCH = '#ece5d8';
const EMBER = '#e0652e';
const ICE = '#8db6c4';

const CLADDING = ['transparent', BIRCH, BIRCH, BIRCH, EMBER, BIRCH];
const STEAM = ['transparent', BIRCH, ICE, BIRCH, BIRCH, ICE];
const LAKE = ['transparent', ICE, ICE, BIRCH, ICE, ICE];
const EMBERS = ['transparent', EMBER, BIRCH, EMBER, BIRCH, BIRCH];

const NAV = [
  ['Sessions', '#sessions'],
  ['The ritual', '#ritual'],
  ['Temperatures', '#temperatures'],
  ['Timetable', '#timetable'],
  ['Etiquette', '#etiquette'],
  ['Visit', '#visit'],
];

const READOUTS = [
  { n: '88', unit: 'deg', label: 'The big sauna, at seven this morning' },
  { n: '6', unit: 'deg', label: 'The lake, off the end of the pier' },
  { n: '3', unit: 'x', label: 'Rounds of heat, cold and rest' },
];

const RITUAL = [
  { step: 'Heat', time: '10 to 15 minutes', temp: '80 to 90 C', note: 'Sit on your towel, top bench if you can take it, lower if you cannot. Leave before you want to.', kind: 'heat' },
  { step: 'Cold', time: '30 seconds to 2 minutes', temp: '4 to 14 C, by season', note: 'Down the ladder at the end of the pier, or the cold tub if the lake is too much. Breathe out slowly and get out while it still feels good.', kind: 'cold' },
  { step: 'Rest', time: '15 minutes', temp: 'Whatever the air is', note: 'On the deck in a blanket, or by the fire in the rest room. Drink water. It is the part people skip, and the best part.', kind: 'rest' },
];

const TICKS = ['100', '90', '80', '70', '60', '50', '40', '30', '20', '10', '0'];

/* Every temperature in the house, placed on the scale by degrees. */
const ROOMS = [
  { t: 95, name: 'Top bench, big sauna', note: 'After a ladle on the stones. For the few minutes it lasts.', side: 'right' },
  { t: 85, name: 'The big sauna', note: 'Wood stove, twenty-four seats on three tiers.', side: 'left' },
  { t: 75, name: 'The smoke sauna', note: 'Saturdays only. Soft, deep heat that smells of the forest.', side: 'right' },
  { t: 62, name: 'The small sauna', note: 'Lower and gentler. The one for a first visit.', side: 'left' },
  { t: 45, name: 'Steam room', note: 'Eucalyptus on Wednesdays.', side: 'right' },
  { t: 37, name: 'Warm pool', note: 'Between rounds, when the rest room is full.', side: 'left' },
  { t: 21, name: 'Rest room', note: 'A fire, blankets, nettle tea and no talking.', side: 'right' },
  { t: 10, name: 'Cold tub', note: 'Chilled all year, for when the lake is out of reach.', side: 'left' },
  { t: 6, name: 'The lake, today', note: 'Off the pier. About 4 in February, 19 in August.', side: 'right' },
].map((r) => ({ ...r, at: `${100 - r.t}%`, deg: String(r.t) }));

const TICKETS = [
  { no: '01', name: 'Two hours', when: 'Any session we are open, walk in or book.', admit: 'Admit one', price: '$32' },
  { no: '02', name: 'Quiet morning', when: 'Weekdays 7 to 10. No talking in any room.', admit: 'Admit one', price: '$26' },
  { no: '03', name: 'Late sauna', when: 'Friday and Saturday, 8 pm to midnight, by lantern.', admit: 'Admit one', price: '$36' },
  { no: '04', name: 'Smoke sauna', when: 'Saturdays, 2 to 8 pm. Twelve seats, booked ahead.', admit: 'Admit one', price: '$48' },
  { no: '05', name: 'Ten sessions', when: 'Any session but the smoke sauna. A year to use them.', admit: 'Admit ten', price: '$280' },
  { no: '06', name: 'Private hire', when: 'The small sauna and rest room for two hours.', admit: 'Up to eight', price: '$360' },
];

const SLOTS = ['7-10', '10-4', '4-10', '10-12'];

/* Kinds: quiet, open, women, smoke, late, shut. */
const WEEK = [
  { day: 'Mon', cells: [['Quiet', 'quiet'], ['Open', 'open'], ['Open', 'open'], ['', 'shut']] },
  { day: 'Tue', cells: [['Quiet', 'quiet'], ['Open', 'open'], ['Women', 'women'], ['', 'shut']] },
  { day: 'Wed', cells: [['Quiet', 'quiet'], ['Open', 'open'], ['Open', 'open'], ['', 'shut']] },
  { day: 'Thu', cells: [['Quiet', 'quiet'], ['Open', 'open'], ['Open', 'open'], ['', 'shut']] },
  { day: 'Fri', cells: [['Quiet', 'quiet'], ['Open', 'open'], ['Open', 'open'], ['Late', 'late']] },
  { day: 'Sat', cells: [['Open', 'open'], ['Smoke', 'smoke'], ['Open', 'open'], ['Late', 'late']] },
  { day: 'Sun', cells: [['Open', 'open'], ['Open', 'open'], ['To 8', 'open'], ['', 'shut']] },
];

const KEY = [
  ['Quiet', 'No talking, anywhere in the house.', 'quiet'],
  ['Open', 'Mixed, swimsuits on, talk quietly.', 'open'],
  ['Women', 'Tuesday evenings, women and non-binary guests.', 'women'],
  ['Smoke', 'The smoke sauna is lit. Book ahead.', 'smoke'],
  ['Late', 'Lanterns, the big sauna and the lake.', 'late'],
];

const ETIQUETTE = [
  'Shower first, with soap, and rinse again each time you come back in.',
  'Sit on your towel. All of you, feet included, on the top bench.',
  'Swimsuits on. Every session is mixed except Tuesday evening.',
  'Ask the room before you put water on the stones. One ladle, then wait.',
  'Talk quietly, or not at all before ten and in the rest room.',
  'No phones past the changing room. The clock on the wall is enough.',
  'No alcohol, before or during. Heat and drink do not mix.',
  'Dizzy? Get out, sit down, drink water and tell whoever is on the desk.',
];

const FAQ = [
  ['I have never been to a sauna. Is this for me?', 'Yes. Start in the small sauna on the lower bench, stay eight minutes, and use the cold tub rather than the lake. Whoever is on the desk will walk you round the first time if you ask.'],
  ['How cold is the lake in winter?', 'About 4 C. We keep a hole open in the ice with a pump and a ladder in it. Two dips of twenty seconds is plenty.'],
  ['Do I need to book?', 'For the smoke sauna and the late sauna, yes. Every other session keeps ten places for people who walk in.'],
  ['Who should not come?', 'Ask your doctor first if you are pregnant, or have heart trouble or high blood pressure. Children from eight, with an adult, on Sundays until two.'],
];

const HOURS = [
  ['Monday to Thursday', '7 am to 10 pm'],
  ['Friday', '7 am to midnight'],
  ['Saturday', '8 am to midnight'],
  ['Sunday', '8 am to 8 pm'],
];

const BRING = [
  ['Bring', 'A swimsuit and a water bottle'],
  ['We have', 'Towels, robes, soap and shampoo'],
  ['To rent', 'Linen sauna hat $4, flip-flops $3'],
];

export default function BirchwoodSaunaPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--char': '#1b1917',
        '--birch': '#ece5d8',
        '--ember': '#e0652e',
        '--ice': '#8db6c4',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="char,birch,ember,ice"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Jost:ital,wght@0,300..600;1,300..500&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Birchwood</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Public sauna and cold plunge, Larch Point</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.name}>
              Birchwood <em>Sauna House</em>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Two wood-fired saunas, a smoke sauna on Saturdays, and the lake
              off the end of the pier for the cold. Come for two hours, go
              round three times, and leave slower than you arrived.
            </p>
            <ul className={s.readouts}>
              {READOUTS.map((r, i) => (
                <li key={r.label}>
                  <strong data-edit={`hero.deg.${i}`} className={r.unit === 'deg' ? s.deg : s.times}>{r.n}</strong>
                  <span data-edit={`hero.text.${i}`} data-edit-max="60">{r.label}</span>
                </li>
              ))}
            </ul>
            <p className={s.ctas}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#visit">Book a session</a>
              <a data-edit="hero.textLink" data-edit-max="28" className={s.textLink} href="#ritual">How it works</a>
            </p>
          </div>

          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,1,1,2,1" className={s.cladding} aria-hidden="true">
            <TabbiedPattern
              pattern={fluting}
              palette={CLADDING}
              fit="grid"
              cellSize={52}
              seed="birchwood-cladding"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ---------------------------------------------------------- RITUAL */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,3,1,1,3" className={s.steam} aria-hidden="true">
          <TabbiedPattern
            pattern={grainfall}
            palette={STEAM}
            fit="grid"
            cellSize={60}
            seed="birchwood-steam"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="ritual" className={s.sec} aria-labelledby="ritual-h">
          <div className={s.secHead}>
            <p data-edit="ritual.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The ritual</p>
            <h2 data-edit="ritual.title" data-edit-format="emphasis" data-edit-max="60" id="ritual-h">Heat, cold, rest. <em>Three times.</em></h2>
          </div>
          <ol className={s.ritual}>
            {RITUAL.map((r, i) => (
              <li key={r.step} className={s[r.kind]}>
                <h3 data-edit={`ritual.title.${i}`} data-edit-max="40">{r.step}</h3>
                <dl className={s.ritualFacts}>
                  <div>
                    <dt data-edit={`ritual.term.${i}`} data-edit-max="28">How long</dt>
                    <dd data-edit={`ritual.body.${i}`} data-edit-max="200" data-edit-multiline>{r.time}</dd>
                  </div>
                  <div>
                    <dt data-edit={`ritual.term2.${i}`} data-edit-max="28">How hot</dt>
                    <dd data-edit={`ritual.body2.${i}`} data-edit-max="200" data-edit-multiline>{r.temp}</dd>
                  </div>
                </dl>
                <p data-edit={`ritual.body3.${i}`} data-edit-max="240" data-edit-multiline>{r.note}</p>
              </li>
            ))}
          </ol>
          <p data-edit="ritual.ritualFoot" data-edit-max="240" data-edit-multiline className={s.ritualFoot}>About ninety minutes, with a shower either side. Then sit a while longer; nobody will hurry you.</p>
        </section>

        {/* ---------------------------------------------------- TEMPERATURES */}
        <section id="temperatures" className={s.sec} aria-labelledby="temps-h">
          <div className={s.secHead}>
            <p data-edit="temperatures.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Every temperature in the house</p>
            <h2 data-edit="temperatures.title" data-edit-format="emphasis" data-edit-max="60" id="temps-h">From the top bench <em>to the lake</em></h2>
            <p data-edit="temperatures.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              In degrees Celsius, as the thermometers read them on a winter
              afternoon. The stove is lit at half past six every morning and
              the big sauna is up to heat by seven.
            </p>
          </div>

          <div className={s.scaleWrap}>
            <ol className={s.ticks} aria-hidden="true">
              {TICKS.map((t, i) => (
                <li data-edit={`temperatures.item.${i}`} data-edit-max="80" key={t}>{t}</li>
              ))}
            </ol>
            <div className={s.column} aria-hidden="true" />
            <ul className={s.rooms}>
              {ROOMS.map((r, i) => (
                <li
                  key={r.name}
                  className={r.side === 'left' ? s.roomLeft : s.roomRight}
                  style={{ '--at': r.at } as React.CSSProperties}
                >
                  <strong data-edit={`temperatures.deg.${i}`} className={s.deg}>{r.deg}</strong>
                  <h3 data-edit={`temperatures.title.${i}`} data-edit-max="40">{r.name}</h3>
                  <p data-edit={`temperatures.body.${i}`} data-edit-max="240" data-edit-multiline>{r.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <figure className={s.shore}>
            <Artwork
              slug="birchwood-sauna-cabin"
              alt="The sauna cabin at the end of the pier, smoke rising from its chimney, two birches beside it"
              inks={['var(--text)']}
              className={s.cabin}
            />
            <figcaption data-edit="temperatures.shoreCap" data-edit-max="120" data-edit-multiline className={s.shoreCap}>The big sauna, Pier 4. The ladder into the lake is at the end of the boards.</figcaption>
          </figure>

          <div data-edit-pattern="temperatures.field" data-edit-roles="transparent,3,3,1,3,3" className={s.lake} aria-hidden="true">
            <TabbiedPattern
              pattern={ripplering}
              palette={LAKE}
              fit="grid"
              cellSize={64}
              seed="birchwood-lake"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* -------------------------------------------------------- SESSIONS */}
        <section id="sessions" className={s.sec} aria-labelledby="sessions-h">
          <div className={s.secHead}>
            <p data-edit="sessions.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Session tickets</p>
            <h2 data-edit="sessions.title" data-edit-format="emphasis" data-edit-max="60" id="sessions-h">Two hours, <em>or longer</em></h2>
            <p data-edit="sessions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A towel and a robe come with every ticket. Tear off the stub at
              the desk; keep the rest for the locker number.
            </p>
          </div>
          <ul className={s.tickets}>
            {TICKETS.map((t, i) => (
              <li key={t.no} className={s.ticket}>
                <div className={s.ticketMain}>
                  <p className={s.ticketNo}>{`No. ${t.no}`}</p>
                  <h3 data-edit={`sessions.title.${i}`} data-edit-max="40">{t.name}</h3>
                  <p data-edit={`sessions.ticketWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketWhen}>{t.when}</p>
                </div>
                <div className={s.stub}>
                  <strong data-edit={`sessions.emphasis.${i}`}>{t.price}</strong>
                  <span data-edit={`sessions.text.${i}`} data-edit-max="60">{t.admit}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- TIMETABLE */}
        <section id="timetable" className={s.sec} aria-labelledby="timetable-h">
          <div className={s.secHead}>
            <p data-edit="timetable.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The week</p>
            <h2 data-edit="timetable.title" data-edit-max="60" id="timetable-h">Timetable</h2>
          </div>
          <div className={s.weekWrap}>
            <table className={s.week}>
              <caption data-edit="timetable.srOnly" className={s.srOnly}>Sessions by day and time of day</caption>
              <thead>
                <tr>
                  <th data-edit="timetable.heading" scope="col">Day</th>
                  {SLOTS.map((t, i) => (
                    <th data-edit={`timetable.heading2.${i}`} key={t} scope="col">{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WEEK.map((d, i) => (
                  <tr key={d.day}>
                    <th data-edit={`timetable.heading3.${i}`} scope="row">{d.day}</th>
                    {d.cells.map(([label, kind], j) => (
                      <td key={`${d.day}-${SLOTS[j]}`}>
                        <span data-edit={`timetable.chip.${i}.${j}`} data-edit-max="60" className={`${s.chip} ${s[kind]}`}>{label}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className={s.key}>
              {KEY.map(([k, v, kind], i) => (
                <div key={k}>
                  <dt data-edit={`timetable.chip2.${i}`} data-edit-max="28" className={`${s.chip} ${s[kind]}`}>{k}</dt>
                  <dd data-edit={`timetable.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------- ETIQUETTE */}
        <section id="etiquette" className={s.sec} aria-labelledby="etiquette-h">
          <div className={s.secHead}>
            <p data-edit="etiquette.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>House rules</p>
            <h2 data-edit="etiquette.title" data-edit-max="60" id="etiquette-h">Etiquette</h2>
            <p data-edit="etiquette.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Eight of them, painted on the board by the changing rooms. Most people only need telling once.</p>
          </div>
          <ol className={s.rules}>
            {ETIQUETTE.map((r, i) => (
              <li data-edit={`etiquette.item.${i}`} data-edit-max="80" key={r}>{r}</li>
            ))}
          </ol>
          <div className={s.faq}>
            {FAQ.map(([q, a], i) => (
              <details key={q}>
                <summary data-edit={`etiquette.question.${i}`} data-edit-max="80">{q}</summary>
                <p data-edit={`etiquette.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Pier 4, Larch Point</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Visit</h2>
          </div>
          <div className={s.visit}>
            <div>
              <p data-edit="visit.addr" data-edit-max="240" data-edit-multiline className={s.addr}>At the end of Shore Road, past the boat club</p>
              <p data-edit="visit.small" data-edit-max="240" data-edit-multiline className={s.small}>Park in the gravel lot and walk the last two minutes along the shore. The chimney smoke is the sign.</p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <dl className={s.bring}>
                {BRING.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`visit.term2.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550182290">(555) 018-2290</a>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:desk@birchwoodsauna.example">desk@birchwoodsauna.example</a>
              </p>
            </div>

            <form className={s.form} action="#">
              <h3 data-edit="visit.formTitle" data-edit-max="40" className={s.formTitle}>Book a session</h3>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="visit.label" htmlFor="bw-name">Name</label>
                  <input id="bw-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="visit.label2" htmlFor="bw-email">Email</label>
                  <input id="bw-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label data-edit="visit.label3" htmlFor="bw-session">Session</label>
                  <select id="bw-session" name="session" defaultValue="two">
                    <option value="two">Two hours, $32</option>
                    <option value="quiet">Quiet morning, $26</option>
                    <option value="late">Late sauna, $36</option>
                    <option value="smoke">Smoke sauna, $48</option>
                    <option value="private">Private hire, $360</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="visit.label4" htmlFor="bw-date">Day</label>
                  <input id="bw-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label data-edit="visit.label5" htmlFor="bw-people">People</label>
                  <input id="bw-people" name="people" type="number" min="1" max="8" inputMode="numeric" />
                </div>
              </div>
              <button data-edit="visit.btn" data-edit-max="24" className={s.btn} type="submit">Reserve</button>
              <p data-edit="visit.small2" data-edit-max="240" data-edit-multiline className={s.small}>We hold booked places for fifteen minutes past the start. Cancel up to a day before for a full refund.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,1,2,1,1" className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={fluting}
            palette={EMBERS}
            fit="grid"
            cellSize={40}
            seed="birchwood-embers"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Birchwood Sauna House</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional public sauna. The rooms, temperatures, prices and timetable are invented.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>, drawn live; the cabin is a generated image drawn in the page's colors.
        </p>
      </footer>
    </div>
  );
}
