import { TabbiedPattern } from 'tabbied/react';
import { parity, stipplefade, shearpair } from 'tabbied/patterns';
import s from './southpaw-boxing.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Southpaw Boxing Club: Boxing gym, Foundry Street',
  description:
    'Southpaw Boxing Club has taught boxing under Arch 9 on Foundry Street since 1987. The week of classes as a fight card, the coaches, the dues, the rules and a free first session.',
};

/* Site colors. The zigzag bands and the main-event panel are printed in
   black and red over the bone paper; the ticket's halftone and the
   hatched bill at the foot do the same over the canvas tone. */
const BONE = '#efe6d2';
const BLACK = '#151311';
const RED = '#c8231b';
const CANVAS = '#bfa57a';

const ZIGZAG = ['transparent', BLACK, RED];
const APRON = ['transparent', RED, BLACK, RED, CANVAS];
const HALFTONE = ['transparent', BLACK, RED, BLACK];
const HATCH = ['transparent', BLACK, RED, CANVAS];

const NAV = [
  ['The card', '#card'],
  ['Corners', '#corners'],
  ['Dues', '#dues'],
  ['First session', '#first'],
  ['Venue', '#venue'],
];

const BILLBOARD = [
  ['Doors', '6 AM'],
  ['Ages', '11 to 70'],
  ['Gloves', 'Lent free'],
];

type Bout = {
  billing: string;
  cls: string;
  foe: string;
  when: string;
  rounds: string;
  coach: string;
};

const MAIN: Bout = {
  billing: 'Main event',
  cls: 'Open sparring',
  foe: 'Nerves',
  when: 'Thursday, 7:00 PM',
  rounds: '12 rounds of 3 minutes',
  coach: 'All three coaches in the ring. Headgear and a mouthguard, and three months with us first.',
};

const UNDERCARD: Bout[] = [
  { billing: 'Co-main', cls: 'Bag and pads', foe: 'A long day', when: 'Mon, Wed 7:00 PM', rounds: '10 rounds, 60 min', coach: 'Coach Teo' },
  { billing: 'Undercard', cls: 'Fundamentals', foe: 'Bad habits', when: 'Mon, Wed 5:30 PM, Sat 10:00 AM', rounds: '10 rounds, 60 min', coach: 'Coach Dee. Beginners start here' },
  { billing: 'Undercard', cls: 'Early Bell', foe: 'The snooze button', when: 'Mon to Fri 6:30 AM', rounds: '8 rounds, 45 min', coach: 'Coach Rosa. Conditioning, no contact' },
  { billing: 'Undercard', cls: 'Women\'s boxing', foe: 'Doubt', when: 'Tue 5:30 PM', rounds: '10 rounds, 60 min', coach: 'Coach Rosa. Women and non-binary members' },
  { billing: 'Undercard', cls: 'Technical sparring', foe: 'Panic', when: 'Tue 7:00 PM', rounds: '8 rounds, 60 min', coach: 'Coach Dee. By invitation' },
  { billing: 'Undercard', cls: 'Juniors', foe: 'Screen time', when: 'Thu 4:30 PM', rounds: '8 rounds, 50 min', coach: 'Coach Teo. Ages 11 to 16, no sparring' },
  { billing: 'Undercard', cls: 'Friday circuit', foe: 'The week', when: 'Fri 6:00 PM', rounds: '12 stations, 50 min', coach: 'Coach Teo' },
  { billing: 'Undercard', cls: 'Open gym', foe: 'Nothing in particular', when: 'Sat 11:30 AM', rounds: '90 min', coach: 'A coach on the floor. Bring a partner' },
];

type Coach = {
  corner: string;
  name: string;
  nick: string;
  role: string;
  tape: string[][];
  kind: 'red' | 'black' | 'neutral';
};

const COACHES: Coach[] = [
  {
    corner: 'In the red corner',
    name: 'Delia Okafor',
    nick: 'Dee',
    role: 'Head coach, owner since 2014',
    tape: [
      ['Stance', 'Southpaw'],
      ['Record', '34-6 amateur, two national titles'],
      ['Reach', '69 in'],
      ['Teaches', 'Fundamentals, technical sparring'],
    ],
    kind: 'red',
  },
  {
    corner: 'In the black corner',
    name: 'Teo Marchetti',
    nick: 'The Plumber',
    role: 'Coach, retired middleweight',
    tape: [
      ['Stance', 'Orthodox'],
      ['Record', '11-2 pro, retired 2016'],
      ['Reach', '73 in'],
      ['Teaches', 'Bag and pads, juniors, Friday circuit'],
    ],
    kind: 'black',
  },
  {
    corner: 'In the neutral corner',
    name: 'Rosa Villanueva',
    nick: 'Early Bell',
    role: 'Coach, strength and conditioning',
    tape: [
      ['Stance', 'Orthodox'],
      ['Record', '22-4 amateur'],
      ['Reach', '64 in'],
      ['Teaches', 'Early Bell, women\'s boxing'],
    ],
    kind: 'neutral',
  },
];

const DUES = [
  ['Ringside', '$139', 'a month', 'Every class, every day, and open gym'],
  ['Eight rounds', '$99', 'a month', 'Eight classes a month, any of them'],
  ['Early Bell', '$79', 'a month', 'The 6:30 AM class, Monday to Friday'],
  ['Juniors', '$69', 'a month', 'Thursdays, ages 11 to 16'],
  ['Ten-class pass', '$150', 'good for 3 months', 'For shift workers and travelers'],
  ['Drop-in', '$22', 'one class', 'Gloves and wraps included'],
];

const RULES = [
  'Wraps on before gloves, every time.',
  'Nobody spars without a coach watching.',
  'Bring your own mouthguard. We sell them at the desk for $12.',
  'Wipe down the bags and the gloves you borrowed.',
  'Nobody hits anybody who did not agree to it.',
  'Leave the ego on the street. It will be there when you get back.',
];

const BRING = [
  'Shorts or joggers and a T-shirt',
  'Trainers with a flat sole',
  'A water bottle and a towel',
  'Fifteen minutes before the bell, for the waiver and a wrap lesson',
];

const HOURS = [
  ['Monday to Friday', '6 AM-9 PM'],
  ['Saturday', '9 AM-2 PM'],
  ['Sunday', 'Closed. The ring gets swept.'],
];

export default function SouthpawBoxingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--bone': '#efe6d2',
        '--black': '#151311',
        '--red': '#c8231b',
        '--canvas': '#bfa57a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="bone,black,red,canvas"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Southpaw</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#first">First session free</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ---------------------------------------------------------- POSTER */}
        <section className={s.poster} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2" className={s.band} aria-hidden="true">
            <TabbiedPattern
              pattern={parity}
              palette={ZIGZAG}
              fit="grid"
              cellSize={28}
              seed="southpaw-top"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.posterInner}>
            <p className={s.billing}>
              <span data-edit="hero.text" data-edit-max="60">Foundry Street, Arch 9</span>
              <span data-edit="hero.text2" data-edit-max="60">Since 1987</span>
              <span data-edit="hero.text3" data-edit-max="60">Six nights a week</span>
            </p>
            <div className={s.posterMain}>
              <div className={s.posterType}>
                <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.name}>Southpaw <em>Boxing Club</em></h1>
                <p data-edit="hero.tagline" data-edit-max="240" data-edit-multiline className={s.tagline}>Learn to box</p>
                <p data-edit="hero.sub" data-edit-max="240" data-edit-multiline className={s.sub}>
                  From your first jab to your first bout, taught by coaches who
                  have been hit for a living. All levels, no attitude.
                </p>
              </div>
              <div className={s.fighter}>
                <Artwork
                  slug="southpaw-boxing-boxer"
                  alt="A boxer in a southpaw stance, gloves up guarding his chin, in shorts and boxing boots"
                  inks={['var(--text)', 'var(--bone)']}
                  className={s.boxer}
                />
                <p data-edit="hero.sticker" data-edit-max="240" data-edit-multiline className={s.sticker}>First session free</p>
              </div>
            </div>
            <dl className={s.billboard}>
              {BILLBOARD.map(([label, value], i) => (
                <div key={label}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-edit-pattern="hero.field2" data-edit-roles="transparent,1,2" className={s.band} aria-hidden="true">
            <TabbiedPattern
              pattern={parity}
              palette={ZIGZAG}
              fit="grid"
              cellSize={28}
              seed="southpaw-bottom"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ------------------------------------------------------- FIGHT CARD */}
        <section id="card" className={s.sec} aria-labelledby="card-h">
          <div className={s.secHead}>
            <h2 data-edit="card.h2" data-edit-max="60" id="card-h" className={s.h2}>This week's card</h2>
            <p data-edit="card.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every class is a bout. Pick your fight, turn up ten minutes
              before the bell, and we will find you a pair of gloves.
            </p>
          </div>

          <article className={s.main}>
            <div data-edit-pattern="main.field" data-edit-roles="transparent,2,1,2,3" className={s.apron} aria-hidden="true">
              <TabbiedPattern
                pattern={parity}
                palette={APRON}
                fit="grid"
                cellSize={44}
                seed="southpaw-apron"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.mainBody}>
              <p data-edit="main.billingLabel" data-edit-max="240" data-edit-multiline className={s.billingLabel}>{MAIN.billing}</p>
              <div className={s.matchup}>
                <h3 data-edit="main.mainCls" data-edit-max="40" className={s.mainCls}>{MAIN.cls}</h3>
                <span data-edit="main.vsBig" data-edit-max="60" className={s.vsBig}>vs</span>
                <p data-edit="main.mainFoe" data-edit-max="240" data-edit-multiline className={s.mainFoe}>{MAIN.foe}</p>
              </div>
              <p data-edit="main.mainWhen" data-edit-max="240" data-edit-multiline className={s.mainWhen}>{MAIN.when}</p>
              <p data-edit="main.mainRounds" data-edit-max="240" data-edit-multiline className={s.mainRounds}>{MAIN.rounds}</p>
              <p data-edit="main.mainCoach" data-edit-max="240" data-edit-multiline className={s.mainCoach}>{MAIN.coach}</p>
            </div>
          </article>

          <ol className={s.bouts}>
            {UNDERCARD.map((b, i) => (
              <li key={b.cls}>
                <p data-edit={`card.boutBilling.${i}`} data-edit-max="240" data-edit-multiline className={s.boutBilling}>{b.billing}</p>
                <h3 data-edit={`card.boutCls.${i}`} data-edit-max="40" className={s.boutCls}>{b.cls}</h3>
                <span data-edit={`card.vs.${i}`} data-edit-max="60" className={s.vs}>vs</span>
                <p data-edit={`card.boutFoe.${i}`} data-edit-max="240" data-edit-multiline className={s.boutFoe}>{b.foe}</p>
                <p data-edit={`card.boutWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.boutWhen}>{b.when}</p>
                <p data-edit={`card.boutRounds.${i}`} data-edit-max="240" data-edit-multiline className={s.boutRounds}>{b.rounds}</p>
                <p data-edit={`card.boutCoach.${i}`} data-edit-max="240" data-edit-multiline className={s.boutCoach}>{b.coach}</p>
              </li>
            ))}
          </ol>
          <p data-edit="card.cardFoot" data-edit-max="240" data-edit-multiline className={s.cardFoot}>No classes on Sunday. Card subject to change; the desk has the final word.</p>
        </section>

        {/* ---------------------------------------------------------- CORNERS */}
        <section id="corners" className={s.sec} aria-labelledby="corners-h">
          <div className={s.secHead}>
            <h2 data-edit="corners.h2" data-edit-max="60" id="corners-h" className={s.h2}>The corners</h2>
            <p data-edit="corners.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Three coaches, sixty-seven fights between them, and the
              patience to show you the same jab forty times.
            </p>
          </div>
          <ul className={s.corners}>
            {COACHES.map((c, i) => (
              <li key={c.name} className={s[c.kind]}>
                <p data-edit={`corners.cornerLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.cornerLabel}>{c.corner}</p>
                <h3 data-edit={`corners.coachName.${i}`} data-edit-max="40" className={s.coachName}>{c.name}</h3>
                <p data-edit={`corners.coachNick.${i}`} data-edit-max="240" data-edit-multiline className={s.coachNick}>{c.nick}</p>
                <p data-edit={`corners.coachRole.${i}`} data-edit-max="240" data-edit-multiline className={s.coachRole}>{c.role}</p>
                <dl className={s.tape}>
                  {c.tape.map(([label, value], i2) => (
                    <div key={label}>
                      <dt data-edit={`corners.term.${i}.${i2}`} data-edit-max="28">{label}</dt>
                      <dd data-edit={`corners.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- DUES */}
        <section id="dues" className={s.sec} aria-labelledby="dues-h">
          <div className={s.secHead}>
            <h2 data-edit="dues.h2" data-edit-max="60" id="dues-h" className={s.h2}>Ringside prices</h2>
            <p data-edit="dues.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              No contract and no joining fee. Thirty days' notice to cancel,
              and you can freeze for up to two months a year.
            </p>
          </div>
          <ul className={s.dues}>
            {DUES.map(([name, price, per, what], i) => (
              <li key={name}>
                <p data-edit={`dues.duesName.${i}`} data-edit-max="240" data-edit-multiline className={s.duesName}>{name}</p>
                <p data-edit={`dues.duesPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.duesPrice}>{price}</p>
                <p data-edit={`dues.duesPer.${i}`} data-edit-max="240" data-edit-multiline className={s.duesPer}>{per}</p>
                <p data-edit={`dues.duesWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.duesWhat}>{what}</p>
              </li>
            ))}
          </ul>
          <p data-edit="dues.duesFoot" data-edit-max="240" data-edit-multiline className={s.duesFoot}>
            Gloves and wraps are lent free for your first month. After that,
            bring your own, or buy both at the desk for $45.
          </p>
        </section>

        {/* ---------------------------------------------------- FIRST SESSION */}
        <section id="first" className={s.sec} aria-labelledby="first-h">
          <div className={s.ticket}>
            <div className={s.stub}>
              <div data-edit-pattern="first.field" data-edit-roles="transparent,1,2,1" className={s.stubField} aria-hidden="true">
                <TabbiedPattern
                  pattern={stipplefade}
                  palette={HALFTONE}
                  fit="grid"
                  cellSize={48}
                  seed="southpaw-stub"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="first.admit" data-edit-max="240" data-edit-multiline className={s.admit}>Admit one</p>
            </div>
            <div className={s.ticketBody}>
              <p data-edit="first.ticketKicker" data-edit-max="240" data-edit-multiline className={s.ticketKicker}>The first session is on us</p>
              <h2 data-edit="first.ticketTitle" data-edit-max="60" id="first-h" className={s.ticketTitle}>Your first round is free</h2>
              <p data-edit="first.ticketText" data-edit-max="240" data-edit-multiline className={s.ticketText}>
                Any Fundamentals class: Monday or Wednesday at 5:30 PM, or
                Saturday at 10 AM. Coach Dee will wrap your hands, show you a
                stance and a jab, and you will hit a bag before the hour is
                out.
              </p>
              <ul className={s.bring}>
                {BRING.map((item, i) => (
                  <li data-edit={`first.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
              <form className={s.form} action="#">
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label data-edit="first.label" htmlFor="sp-name">Name</label>
                    <input id="sp-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="first.label2" htmlFor="sp-phone">Phone</label>
                    <input id="sp-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="first.label3" htmlFor="sp-class">Class</label>
                    <select id="sp-class" name="class" defaultValue="mon">
                      <option value="mon">Monday, 5:30 PM</option>
                      <option value="wed">Wednesday, 5:30 PM</option>
                      <option value="sat">Saturday, 10:00 AM</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="first.label4" htmlFor="sp-exp">Boxed before?</label>
                    <select id="sp-exp" name="experience" defaultValue="never">
                      <option value="never">Never</option>
                      <option value="some">A little</option>
                      <option value="competed">I have competed</option>
                    </select>
                  </div>
                </div>
                <button data-edit="first.submit" data-edit-max="24" className={s.submit} type="submit">Claim my ticket</button>
              </form>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ RULES */}
        <section id="rules" className={s.sec} aria-labelledby="rules-h">
          <div className={s.secHead}>
            <h2 data-edit="rules.h2" data-edit-max="60" id="rules-h" className={s.h2}>Rules of the ring</h2>
          </div>
          <ol className={s.rules}>
            {RULES.map((rule, i) => (
              <li data-edit={`rules.item.${i}`} data-edit-max="80" key={rule}>{rule}</li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ VENUE */}
        <section id="venue" className={s.venue} aria-labelledby="venue-h">
          <div data-edit-pattern="venue.field" data-edit-roles="transparent,1,2,3" className={s.hatch} aria-hidden="true">
            <TabbiedPattern
              pattern={shearpair}
              palette={HATCH}
              fit="grid"
              cellSize={40}
              seed="southpaw-hatch"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.venueInner}>
            <div>
              <p data-edit="venue.billingLabel" data-edit-max="240" data-edit-multiline className={s.billingLabel}>The venue</p>
              <h2 data-edit="venue.venueTitle" data-edit-max="60" id="venue-h" className={s.venueTitle}>Arch 9, Foundry Street</h2>
              <p data-edit="venue.venueText" data-edit-max="240" data-edit-multiline className={s.venueText}>
                Under the railway, between the tire shop and the bakery. The
                trains go over every eleven minutes; after a week you stop
                hearing them. Showers, lockers and bike racks inside.
              </p>
            </div>
            <div>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`venue.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`venue.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="venue.link" data-edit-max="28" href="tel:+15550193380">(555) 019-3380</a>
              </p>
              <p className={s.contact}>
                <a data-edit="venue.link2" data-edit-max="28" href="mailto:desk@southpawboxing.example">desk@southpawboxing.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Southpaw Boxing Club</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional boxing gym. The coaches, records, classes and prices are invented.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
        </p>
        <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The boxer is a generated image, printed in the page's own colors.</p>
      </footer>
    </div>
  );
}
