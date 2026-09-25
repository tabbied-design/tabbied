import { TabbiedPattern } from 'tabbied/react';
import { notch, quarterburst, reedpen } from 'tabbied/patterns';
import s from './forge-strength.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Forge Strength: Strength and conditioning gym, Foundry Lane',
  description:
    'Forge is a strength and conditioning gym in a warehouse on Foundry Lane: coached barbell classes, conditioning and open gym from 5:30 am. Your first session is free.',
};

/* Site colors. Every field is drawn on `transparent`, so a tile's own
   ground (chalk, iron or dust) shows wherever the design leaves a gap. */
const CHALK = '#F0F0ED';
const IRON = '#121212';
const EMBER = '#FF5A1F';
const STEEL = '#8C8C88';
const DUST = '#DADAD5';

const BURST = ['transparent', EMBER, IRON, CHALK, DUST];
const TALLY = ['transparent', EMBER, STEEL];
const NOTCH = ['transparent', EMBER, STEEL, CHALK];

const NAV = [
  ['Programs', '#programs'],
  ['Coaches', '#coaches'],
  ['Memberships', '#memberships'],
  ['The floor', '#floor'],
  ['Timetable', '#timetable'],
  ['Contact', '#contact'],
];

const HOURS = [
  ['Mon-Fri', '5:30 am-10 pm'],
  ['Saturday', '7 am-6 pm'],
  ['Sunday', '8 am-2 pm'],
];

/* Programs, as bento cards. `size` picks the card's footprint on the
   three-column grid: wide takes two columns, one takes one. */
type Program = {
  name: string;
  size: 'wide' | 'one';
  tag: string;
  body: string;
  facts: string[];
};

/* Barbell Club is the big card, drawn on its own with the tally field; the
   rest are mapped. */
const BARBELL_FACTS = ['4 sessions a week', 'All levels', 'In Coached membership'];

const PROGRAMS: Program[] = [
  {
    name: 'Strength Foundations',
    size: 'one',
    tag: 'Start here',
    body: 'Six weeks, twice a week, for people who have never held a barbell. Groups of six.',
    facts: ['$149 one-off'],
  },
  {
    name: 'Conditioning',
    size: 'one',
    tag: 'The engine',
    body: 'Rowers, bikes, sleds and carries in 45 minutes. Hard, short, and over before you can argue.',
    facts: ['In Coached membership'],
  },
  {
    name: 'Open Gym',
    size: 'one',
    tag: 'Your program, our floor',
    body: 'Every rack and platform, all opening hours, with a coach on the floor from 6 am to 9 pm.',
    facts: ['From $59 a month'],
  },
  {
    name: 'Forge 50+',
    size: 'one',
    tag: 'Strong for the long run',
    body: 'Strength, balance and bone density for members over fifty. Slower, just as serious.',
    facts: ['Tue, Thu, Sat'],
  },
  {
    name: "Women's Barbell",
    size: 'one',
    tag: 'Sunday mornings',
    body: 'The Barbell Club program, coached by women, for women who want the platform to themselves once a week.',
    facts: ['In Coached membership'],
  },
  {
    name: 'Personal Coaching',
    size: 'wide',
    tag: 'One to one',
    body: 'A program written for you and your calendar, a coach at your side for the heavy days, and a check-in every week on the ones in between. Good for a meet, a sport, or coming back from an injury.',
    facts: ['$75 a session', '$260 for four'],
  },
  {
    name: 'Nutrition check-in',
    size: 'one',
    tag: 'No powders',
    body: 'Thirty minutes with a registered dietitian, once a month. Plain food, enough protein, and sleep.',
    facts: ['$45, or in Coached Plus'],
  },
];

const COACHES = [
  {
    initials: 'MO',
    name: 'Marcus Osei',
    role: 'Head coach, Barbell Club',
    certs: 'CSCS, USAW Level 2',
    body: 'Competed in weightlifting for nine years. Writes every Barbell Club cycle and still takes the 6 am class himself.',
  },
  {
    initials: 'IV',
    name: 'Ines Vargas',
    role: "Foundations and Women's Barbell",
    certs: 'NSCA-CPT, Precision Nutrition L1',
    body: 'Teaches the first six weeks for most of our members, which makes her the most thanked person in the building.',
  },
  {
    initials: 'SL',
    name: 'Sam Lindqvist',
    role: 'Conditioning',
    certs: 'CSCS, former collegiate rower',
    body: 'Programs the engine work and holds the gym record on the 2,000 m row, which he mentions only when asked.',
  },
  {
    initials: 'RA',
    name: 'Ruth Adeyemi',
    role: 'Forge 50+ and rehab',
    certs: 'DPT, physical therapist',
    body: 'A physical therapist who got tired of telling people to rest. Runs Forge 50+ and the return-from-injury plans.',
  },
];

const MEMBERSHIPS = [
  ['Off-peak', 'Open gym, weekdays 9 am-4 pm and all weekend', 'Monthly', '$59'],
  ['Open Gym', 'Open gym, all opening hours', 'Monthly', '$89'],
  ['Coached', 'Unlimited classes, plus open gym', '3 months, then monthly', '$159'],
  ['Coached Plus', 'Coached, plus a monthly program review and nutrition check-in', '3 months, then monthly', '$219'],
  ['Student', 'Open gym, all hours, with a current student ID', 'Monthly', '$69'],
  ['Ten visits', 'Any class or open gym, three months to use', 'None', '$180 once'],
];

const FLOOR = [
  ['8', 'Lifting platforms', 'Calibrated plates and competition bars on every one.'],
  ['10', 'Power racks', 'Safety arms, spotter straps and a bench each.'],
  ['5-150 lb', 'Dumbbells', 'In pairs, in 5 lb steps, and all of them racked.'],
  ['8-48 kg', 'Kettlebells', 'Competition bells, color-coded by weight.'],
  ['18', 'Conditioning machines', 'Eight rowers, six bike ergs and four ski ergs.'],
  ['40 yd', 'Turf track', 'For sleds, carries and the Friday relay.'],
];

const SLOTS = [
  ['Mon, Wed, Fri', '6:00 am', 'Barbell Club', 'Marcus'],
  ['Tue, Thu', '6:00 am', 'Conditioning', 'Sam'],
  ['Tue, Thu, Sat', '10:30 am', 'Forge 50+', 'Ruth'],
  ['Mon, Wed', '6:30 pm', 'Barbell Club', 'Ines'],
  ['Tue, Thu', '7:00 pm', 'Strength Foundations', 'Ines'],
  ['Saturday', '9:00 am', 'Team Conditioning', 'Sam'],
  ['Sunday', '10:00 am', "Women's Barbell", 'Ines'],
];

export default function ForgeStrengthPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--chalk': '#f0f0ed',
        '--iron': '#121212',
        '--ember': '#ff5a1f',
        '--steel': '#8c8c88',
        '--dust': '#dadad5',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="chalk,iron,ember,steel,dust"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=DM+Mono:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Forge</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#contact">Free session</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The hero is a bento of six tiles: the promise, the hours, the
            price, a coach's line, the free session, and one tall tile of
            quarter bursts, the loudest thing on the page. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={`${s.tile} ${s.promise}`}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Strength and conditioning, 210 Foundry Lane</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              Lift heavy things.
              <br />
              <em>Stay strong for life.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Coached barbell classes, conditioning and open gym in a
              12,000 sq ft warehouse. Programs that are written down, coaches
              who know your numbers, and no mirrors on the platforms.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btnEmber" data-edit-max="28" className={s.btnEmber} href="#contact">Book a free session</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#programs">See the programs</a>
            </div>
          </div>

          <div className={`${s.tile} ${s.hours}`}>
            <p data-edit="hero.tileLabel" data-edit-max="240" data-edit-multiline className={s.tileLabel}>Open</p>
            <dl className={s.hoursList}>
              {HOURS.map(([d, h], i) => (
                <div key={d}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="hero.tileFoot" data-edit-max="240" data-edit-multiline className={s.tileFoot}>Coach on the floor 6 am-9 pm</p>
          </div>

          <div className={`${s.tile} ${s.price}`}>
            <p data-edit="hero.tileLabel2" data-edit-max="240" data-edit-multiline className={s.tileLabel}>Memberships from</p>
            <p data-edit="hero.priceBig" data-edit-max="240" data-edit-multiline className={s.priceBig}>$59</p>
            <p data-edit="hero.tileFoot2" data-edit-max="240" data-edit-multiline className={s.tileFoot}>A month. No joining fee, no contract on Open Gym.</p>
          </div>

          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,1,0,4" className={`${s.tile} ${s.burst}`} aria-hidden="true">
            <TabbiedPattern
              pattern={quarterburst}
              palette={BURST}
              fit="grid"
              cellSize={84}
              seed="forge"
              redrawInterval={8000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <figure className={`${s.tile} ${s.quote}`}>
            <blockquote data-edit="hero.quoteText" data-edit-max="240" data-edit-multiline className={s.quoteText}>
              I came in for my back and stayed for the deadlift. Two years on I
              pull 315 lb and nothing hurts.
            </blockquote>
            <figcaption data-edit="hero.quoteWho" data-edit-max="120" data-edit-multiline className={s.quoteWho}>Dana K., member since 2024</figcaption>
          </figure>

          <div className={`${s.tile} ${s.free}`}>
            <p data-edit="hero.tileLabel3" data-edit-max="240" data-edit-multiline className={s.tileLabel}>Free first session</p>
            <p data-edit="hero.freeBody" data-edit-max="240" data-edit-multiline className={s.freeBody}>
              One hour with a coach: a movement screen, your first lifts and a
              plan. No card needed.
            </p>
            <a data-edit="hero.freeLink" data-edit-max="28" className={s.freeLink} href="#contact">Book it</a>
          </div>
        </section>

        {/* -------------------------------------------------------- PROGRAMS */}
        <section id="programs" className={s.sec} aria-labelledby="programs-h">
          <div className={s.secHead}>
            <p data-edit="programs.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01 / Programs</p>
            <h2 data-edit="programs.title" data-edit-max="60" id="programs-h">Eight ways to train here</h2>
            <p data-edit="programs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Everything is coached from a written program. New members start
              with a free session or Strength Foundations, never straight into
              a class.
            </p>
          </div>
          <ul className={s.programs}>
            <li className={`${s.tile} ${s.program} ${s.big}`}>
              <div data-edit-pattern="programs.field" data-edit-roles="transparent,2,3" className={s.tallyField} aria-hidden="true">
                <TabbiedPattern
                  pattern={reedpen}
                  palette={TALLY}
                  fit="grid"
                  cellSize={56}
                  seed="barbell"
                  options={{ frequency: 0.5 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span data-edit="programs.programTag" data-edit-max="60" className={s.programTag}>The core of Forge</span>
              <h3 data-edit="programs.programName" data-edit-max="40" className={s.programName}>Barbell Club</h3>
              <p data-edit="programs.programBody" data-edit-max="240" data-edit-multiline className={s.programBody}>
                Squat, bench, deadlift and press, coached in groups of eight on
                a twelve-week cycle. Every session is written down, every lift
                is logged, and every twelve weeks we test and start again, a
                little heavier.
              </p>
              <ul className={s.programFacts}>
                {BARBELL_FACTS.map((f, i) => (
                  <li data-edit={`programs.item.${i}`} data-edit-max="80" key={f}>{f}</li>
                ))}
              </ul>
            </li>
            {PROGRAMS.map((p, i) => (
              <li key={p.name} className={`${s.tile} ${s.program} ${s[p.size]}`}>
                <span data-edit={`programs.programTag2.${i}`} data-edit-max="60" className={s.programTag}>{p.tag}</span>
                <h3 data-edit={`programs.programName2.${i}`} data-edit-max="40" className={s.programName}>{p.name}</h3>
                <p data-edit={`programs.programBody2.${i}`} data-edit-max="240" data-edit-multiline className={s.programBody}>{p.body}</p>
                <ul className={s.programFacts}>
                  {p.facts.map((f, i2) => (
                    <li data-edit={`programs.item2.${i}.${i2}`} data-edit-max="80" key={f}>{f}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- COACHES */}
        <section id="coaches" className={s.sec} aria-labelledby="coaches-h">
          <div className={s.secHead}>
            <p data-edit="coaches.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02 / Coaches</p>
            <h2 data-edit="coaches.title" data-edit-max="60" id="coaches-h">The coaches</h2>
            <p data-edit="coaches.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Four full-time coaches, all certified, all paid a salary rather
              than by the head, which is why none of them will sell you
              anything.
            </p>
          </div>
          <ul className={s.coaches}>
            {COACHES.map((c, i) => (
              <li key={c.name} className={`${s.tile} ${s.coach}`}>
                <span className={s.coachMono} aria-hidden="true">{c.initials}</span>
                <h3 data-edit={`coaches.coachName.${i}`} data-edit-max="40" className={s.coachName}>{c.name}</h3>
                <p data-edit={`coaches.coachRole.${i}`} data-edit-max="240" data-edit-multiline className={s.coachRole}>{c.role}</p>
                <p data-edit={`coaches.coachBody.${i}`} data-edit-max="240" data-edit-multiline className={s.coachBody}>{c.body}</p>
                <span data-edit={`coaches.coachCerts.${i}`} data-edit-max="60" className={s.coachCerts}>{c.certs}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------- MEMBERSHIPS
            A real table on a wide screen; below 760px each row becomes a
            small card, labeled from the header cells. */}
        <section id="memberships" className={s.sec} aria-labelledby="memberships-h">
          <div className={s.secHead}>
            <p data-edit="memberships.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03 / Memberships</p>
            <h2 data-edit="memberships.title" data-edit-max="60" id="memberships-h">Memberships</h2>
            <p data-edit="memberships.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              No joining fee. Freeze for up to eight weeks a year for travel or
              injury. After the first three months, cancel with thirty days
              notice.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <caption data-edit="memberships.caption" className={s.caption}>Membership prices, per month unless marked</caption>
              <thead>
                <tr>
                  <th data-edit="memberships.heading" scope="col">Membership</th>
                  <th data-edit="memberships.heading2" scope="col">What you get</th>
                  <th data-edit="memberships.heading3" scope="col">Commitment</th>
                  <th data-edit="memberships.heading4" scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {MEMBERSHIPS.map(([name, what, term, price], i) => (
                  <tr key={name}>
                    <th scope="row">
                      <span data-edit={`memberships.text.${i}`} data-edit-max="60">{name}</span>
                      {name === 'Coached' ? <span data-edit={`memberships.pick.${i}`} data-edit-max="60" className={s.pick}>Most chosen</span> : null}
                    </th>
                    <td data-edit={`memberships.cell.${i}`} data-label="Includes">{what}</td>
                    <td data-edit={`memberships.cell2.${i}`} data-label="Commitment">{term}</td>
                    <td data-edit={`memberships.tdPrice.${i}`} data-label="Price" className={s.tdPrice}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------- THE FLOOR */}
        <section id="floor" className={s.sec} aria-labelledby="floor-h">
          <div className={s.secHead}>
            <p data-edit="floor.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04 / The floor</p>
            <h2 data-edit="floor.title" data-edit-max="60" id="floor-h">What is on the floor</h2>
            <p data-edit="floor.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              12,000 sq ft under an 18 ft ceiling, rubber throughout, and two
              garage doors that stay open from May to September.
            </p>
          </div>
          <dl className={s.floor}>
            {FLOOR.map(([num, name, note], i) => (
              <div key={name} className={`${s.tile} ${s.kit}`}>
                <dt>
                  <span data-edit={`floor.kitNum.${i}`} data-edit-max="60" className={s.kitNum}>{num}</span>
                  <span data-edit={`floor.kitName.${i}`} data-edit-max="60" className={s.kitName}>{name}</span>
                </dt>
                <dd data-edit={`floor.body.${i}`} data-edit-max="200" data-edit-multiline>{note}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------- TIMETABLE */}
        <section id="timetable" className={s.sec} aria-labelledby="timetable-h">
          <div className={s.secHead}>
            <p data-edit="timetable.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05 / Timetable</p>
            <h2 data-edit="timetable.title" data-edit-max="60" id="timetable-h">Timetable highlights</h2>
            <p data-edit="timetable.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Forty-two classes a week; these are the ones people plan their
              week around. The full timetable is in the members app.
            </p>
          </div>
          <ol className={s.slots}>
            {SLOTS.map(([days, time, name, coach], i) => (
              <li key={days + time} className={s.slot}>
                <span data-edit={`timetable.slotTime.${i}`} data-edit-max="60" className={s.slotTime}>{time}</span>
                <span data-edit={`timetable.slotDays.${i}`} data-edit-max="60" className={s.slotDays}>{days}</span>
                <span data-edit={`timetable.slotName.${i}`} data-edit-max="60" className={s.slotName}>{name}</span>
                <span data-edit={`timetable.slotCoach.${i}`} data-edit-max="60" className={s.slotCoach}>{coach}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.secHead}>
            <p data-edit="contact.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>06 / Contact</p>
            <h2 data-edit="contact.title" data-edit-max="60" id="contact-h">Book your free first session</h2>
            <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Tell us when suits you and a coach will reply within a day with
              two or three times to choose from.
            </p>
          </div>
          <div className={s.contact}>
            <form className={`${s.tile} ${s.form}`} action="#">
              <label className={s.field}>
                <span data-edit="contact.text" data-edit-max="60">Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span data-edit="contact.text2" data-edit-max="60">Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label className={s.field}>
                <span data-edit="contact.text3" data-edit-max="60">Phone</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className={s.field}>
                <span data-edit="contact.text4" data-edit-max="60">Best time</span>
                <select name="time" defaultValue="evening">
                  <option value="morning">Early morning</option>
                  <option value="midday">Midday</option>
                  <option value="evening">Evening</option>
                  <option value="weekend">Weekend</option>
                </select>
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span data-edit="contact.text5" data-edit-max="60">What would you like to get out of it?</span>
                <textarea name="goal" rows={4} />
              </label>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Book my session</button>
            </form>

            <div className={`${s.tile} ${s.where}`}>
              <div data-edit-pattern="contact.field" data-edit-roles="transparent,2,3,0" className={s.whereField} aria-hidden="true">
                <TabbiedPattern
                  pattern={notch}
                  palette={NOTCH}
                  fit="grid"
                  cellSize={40}
                  seed="foundry"
                  options={{ frequency: 0.7 }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="contact.tileLabel" data-edit-max="240" data-edit-multiline className={s.tileLabel}>Find us</p>
              <p data-edit="contact.body3" data-edit-max="240" data-edit-multiline className={s.whereAddr}>
                Unit 4, 210 Foundry Lane
                <br />
                The orange door, past the timber yard
              </p>
              <dl className={s.whereList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Call</dt>
                  <dd><a data-edit="contact.link" data-edit-max="28" href="tel:+15550197733">(555) 019-7733</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Write</dt>
                  <dd><a data-edit="contact.link2" data-edit-max="28" href="mailto:coach@forgestrength.example">coach@forgestrength.example</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Park</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Free in the yard, 30 spaces</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Bus</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Route 7 to Foundry and Mill</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p data-edit="footer.footMark" data-edit-max="240" data-edit-multiline className={s.footMark}>Forge</p>
          <ul className={s.footLinks}>
            <li><a data-edit="footer.programs" data-edit-max="28" href="#programs">Programs</a></li>
            <li><a data-edit="footer.memberships" data-edit-max="28" href="#memberships">Memberships</a></li>
            <li><a data-edit="footer.timetable" data-edit-max="28" href="#timetable">Timetable</a></li>
            <li><a data-edit="footer.contact" data-edit-max="28" href="#contact">Free session</a></li>
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional gym. Prices, coaches, members and lifts are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
