import { TabbiedPattern } from 'tabbied/react';
import { picket, bowl } from 'tabbied/patterns';
import s from './big-yard-dog-daycare.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Big Yard: Dog daycare and boarding, Tanner Lane',
  description:
    'Big Yard runs dog daycare and boarding on an acre of fenced grass on Tanner Lane. Playgroups by size and energy, a report card at every pickup, day packs, boarding and a free meet and sniff.',
};

/* Site colors. The fence is picket: pales in the paper color and the odd
   orange one, on a transparent ground so the grass green shows between
   them. The bowls are the same three colors. */
const PAPER = '#f3eddc';
const INK = '#1f2b1e';
const GRASS = '#3e8a3a';
const ORANGE = '#f07f22';

const FENCE = ['transparent', PAPER, PAPER, ORANGE, PAPER, PAPER];
const RAILS = ['transparent', GRASS, INK, GRASS, ORANGE, GRASS];
const BOWLS = ['transparent', ORANGE, GRASS, INK, GRASS, ORANGE];

const NAV = [
  ['A day here', '#day'],
  ['Report card', '#report'],
  ['Playgroups', '#playgroups'],
  ['Prices', '#prices'],
  ['Boarding', '#boarding'],
  ['Meet and sniff', '#meet'],
  ['Find us', '#find'],
];

const TODAY = [
  ['Dogs in', '34'],
  ['Handlers', '6'],
  ['Weather', 'Sunny, 64'],
  ['Pool', 'Open till 2'],
];

const DAY = [
  { time: '7:00', title: 'Drop-off', note: 'Until 9:30. A handler takes the lead at the gate, so goodbyes are short.' },
  { time: '9:30', title: 'Morning play', note: 'Out in their own group\'s yard. Balls, tunnels, the kiddie pool in summer.' },
  { time: '11:30', title: 'Lunch', note: 'Their own food, from home, in their own bowl. Nobody eats anyone else\'s.' },
  { time: '12:00', title: 'Nap', note: 'Two hours in the den with the lights down and the radio on low.' },
  { time: '2:30', title: 'Afternoon play', note: 'Shorter, calmer, with a sniff walk or a puzzle feeder for the ones who want one.' },
  { time: '4:00', title: 'Pickup', note: 'Until 7. You get your dog, tired, and a report card.' },
];

const GRADES = [
  { subject: 'Plays well with others', grade: 'A', note: 'Chased Juniper for an hour, then let Juniper chase him back.' },
  { subject: 'Listens to handlers', grade: 'A-', note: 'Came back on the first whistle every time but one (squirrel).' },
  { subject: 'Shares the toys', grade: 'B', note: 'Would rather not. Is getting there.' },
  { subject: 'Rest time', grade: 'A', note: 'Slept an hour and forty minutes. Snored.' },
  { subject: 'Lunch', grade: 'A+', note: 'Ate all of it, then checked the floor.' },
];

const CARD_EXTRA = [
  ['Bathroom', 'All outside, all normal'],
  ['Best friend today', 'Juniper, boxer, 3'],
  ['Handler', 'Dee'],
];

const SIZES = ['Under 25 lb', '25 to 60 lb', 'Over 60 lb'];
const ENERGY = ['Easygoing', 'Playful', 'Full tilt'];

const GROUPS = [
  { name: 'The Porch', fit: 'Under 25 lb, easygoing, and seniors', who: 'Small dogs who like a lap more than a race, and seniors of any size.', yard: 'Shaded yard by the office, 1 handler to 6', area: s.gPorch },
  { name: 'The Sandbox', fit: 'Under 25 lb, playful to full tilt', who: 'Small dogs with big plans. Terriers, mostly.', yard: 'The sand yard, 1 handler to 8', area: s.gSandbox },
  { name: 'The Meadow', fit: '25 lb and up, easygoing', who: 'Medium and large dogs who wander, sniff and lie in the sun.', yard: 'Long grass by the creek, 1 handler to 10', area: s.gMeadow },
  { name: 'The Big Field', fit: '25 lb and up, playful', who: 'Retrievers, doodles, anyone who lives for a ball.', yard: 'The main acre, 1 handler to 10', area: s.gField },
  { name: 'The Racetrack', fit: '25 lb and up, full tilt', who: 'Big dogs who run until they fall over. Then run again.', yard: 'The back loop, 1 handler to 8', area: s.gTrack },
];

const PACKS = [
  { name: 'Five days', price: '$195', per: '$39 a day', holes: 5, used: 2 },
  { name: 'Ten days', price: '$360', per: '$36 a day', holes: 10, used: 6 },
  { name: 'Twenty days', price: '$660', per: '$33 a day', holes: 20, used: 13 },
].map((p) => ({
  ...p,
  dots: Array.from({ length: p.holes }, (_, k) => ({ key: `${p.name}-${k}`, punched: k < p.used })),
}));

const SINGLE = [
  ['A single day', '7 am to 7 pm', '$42'],
  ['A half day', 'Up to five hours', '$28'],
  ['Puppy mornings', 'Under six months, 8 to 12', '$30'],
];

const EXTRAS = [
  ['Bath before pickup', '$18'],
  ['Nail trim', '$12'],
  ['Pickup van, each way', '$10'],
  ['Medication', 'Free'],
];

const BOARDING = [
  ['A night', 'Daycare included, bedtime walk, a room of their own', '$68'],
  ['A second dog', 'Same family, same room if they like', '$52'],
  ['Holiday nights', 'Thanksgiving to New Year, two-night minimum', '$78'],
];

const BRING = [
  'Their food, portioned into bags, one per meal',
  'Medication in the bottle it came in',
  'A T-shirt you have worn, for the bed',
  'Nothing precious: toys get shared',
];

const MEET = [
  { step: 'Book it', note: 'Free, about two hours, on a weekday morning.' },
  { step: 'Paperwork', note: 'Rabies, DHPP and bordetella from your vet, all current.' },
  { step: 'The sniff', note: 'Your dog meets Theo on a lead, then two calm dogs, then more.' },
  { step: 'The verdict', note: 'We call by noon with the group we think fits, or why none does yet.' },
];

const RULES = [
  'Four months or older, spayed or neutered after seven months',
  'Flea and tick prevention, all year',
  'No history of biting a person',
];

const PEOPLE = [
  { name: 'Carmen Ruiz', role: 'Owner', note: 'Opened Big Yard in 2017 on her uncle\'s old horse paddock.', dog: 'Pepper, cattle dog' },
  { name: 'Theo Banks', role: 'Head handler', note: 'Does every meet and sniff. Knows every dog by week two.', dog: 'Moose, Newfoundland' },
  { name: 'Dee Osei', role: 'Handler and trainer', note: 'Runs the puppy mornings and the Porch.', dog: 'Biscuit\'s biggest fan' },
  { name: 'Sam Lindqvist', role: 'Nights', note: 'Sleeps on site when there are boarders. Does the bedtime walk.', dog: 'Olive, greyhound' },
];

const FAQ = [
  ['What if my dog does not get along?', 'We move them to a group that suits them better, or tell you honestly that daycare is not their thing. About one dog in ten is happier at home, and that is fine.'],
  ['Are they ever outside on their own?', 'Never. Every yard has a handler in it whenever there is a dog in it, and the gates are double.'],
  ['What happens when it rains?', 'Play moves into the barn, which has a rubber floor, the tunnels and a lot of tennis balls.'],
  ['What if my dog gets hurt?', 'We call you, and the vet on Oak Hill Road is four minutes away. Every handler is trained in pet first aid.'],
];

const HOURS = [
  ['Monday to Friday', '7 am to 7 pm'],
  ['Saturday', '8 am to 5 pm'],
  ['Sunday', 'Boarding pickups, 4 to 6 pm'],
];

export default function BigYardPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Caveat:wght@500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Big Yard</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ YARD */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p className={s.hand}>Dog daycare and boarding since 2017</p>
              <h1 id="hero-h" className={s.name}>Big Yard</h1>
              <p className={s.lede}>
                An acre of fenced grass on Tanner Lane, dogs sorted into
                small groups by size and by how fast they like to go, and a
                report card at every pickup.
              </p>
              <p className={s.ctas}>
                <a className={s.btn} href="#meet">Book a meet and sniff</a>
                <a className={s.btnLine} href="#prices">Day packs and prices</a>
              </p>
            </div>

            <div className={`${s.card} ${s.todayCard}`}>
              <h2 className={s.cardTitle}>Today at the yard</h2>
              <p className={s.cardDate}>Friday, September 26</p>
              <dl className={s.today}>
                {TODAY.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.handNote}>Full on Monday, two spots left Tuesday.</p>
            </div>
          </div>

          <div className={s.fence} aria-hidden="true">
            <TabbiedPattern
              pattern={picket}
              palette={FENCE}
              fit="grid"
              cellSize={64}
              seed="big-yard-fence"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ------------------------------------------------------------- DAY */}
        <section id="day" className={s.sec} aria-labelledby="day-h">
          <div className={s.secHead}>
            <h2 id="day-h">A day here</h2>
            <p className={s.secNote}>
              The same shape every weekday, because dogs like to know what
              comes next as much as we do.
            </p>
          </div>
          <ol className={s.dayCards}>
            {DAY.map((d) => (
              <li key={d.time} className={s.card}>
                <time className={s.dayTime}>{d.time}</time>
                <h3>{d.title}</h3>
                <p>{d.note}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- REPORT */}
        <section id="report" className={s.sec} aria-labelledby="report-h">
          <div className={s.secHead}>
            <h2 id="report-h">The report card</h2>
            <p className={s.secNote}>
              Filled in by hand by your dog's handler before four, and
              handed over with the lead. This is a real one, with permission
              from Biscuit.
            </p>
          </div>

          <div className={s.reportWrap}>
            <article className={s.report} aria-label="A sample report card">
              <div className={s.reportTop}>
                <p className={s.reportName}>Big Yard daily report</p>
                <dl className={s.reportWho}>
                  <div>
                    <dt>Name</dt>
                    <dd>Biscuit</dd>
                  </div>
                  <div>
                    <dt>Group</dt>
                    <dd>The Big Field</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>Thu 9/25</dd>
                  </div>
                </dl>
              </div>
              <table className={s.grades}>
                <caption className={s.srOnly}>Biscuit's grades for the day, with the handler's notes</caption>
                <thead>
                  <tr>
                    <th scope="col">Subject</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Handler's note</th>
                  </tr>
                </thead>
                <tbody>
                  {GRADES.map((g) => (
                    <tr key={g.subject}>
                      <th scope="row">{g.subject}</th>
                      <td className={s.grade}>{g.grade}</td>
                      <td className={s.gradeNote}>{g.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dl className={s.reportFoot}>
                {CARD_EXTRA.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.stamp}>Good dog</p>
            </article>

            <div className={s.reportSide}>
              <div className={`${s.card} ${s.sideCard}`}>
                <h3>What the grades mean</h3>
                <p>A is a great day. B is a normal dog day. C means we saw something you should know about, and we will have said it at the gate as well as on the card.</p>
              </div>
              <div className={`${s.card} ${s.sideCard}`}>
                <h3>Keep them</h3>
                <p>Some people bring back a year of cards in a shoebox. We also send a photo of the card by text at four, in case the real one ends up chewed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ PLAYGROUPS */}
        <section id="playgroups" className={s.sec} aria-labelledby="groups-h">
          <div className={s.secHead}>
            <h2 id="groups-h">Playgroups, by size and energy</h2>
            <p className={s.secNote}>
              Five groups, each in its own fenced yard. Size keeps small dogs
              safe; energy keeps everyone having the same kind of fun. Theo
              places each dog at the meet and sniff, and moves them if they
              tell us otherwise.
            </p>
          </div>

          <div className={s.board}>
            <p className={s.axisCorner}>Energy, then size</p>
            {SIZES.map((z, i) => (
              <p key={z} className={`${s.axisTop} ${s[`col${i + 2}`]}`}>{z}</p>
            ))}
            {ENERGY.map((e, i) => (
              <p key={e} className={`${s.axisSide} ${s[`row${i + 2}`]}`}>{e}</p>
            ))}
            {GROUPS.map((g) => (
              <div key={g.name} className={`${s.group} ${g.area}`}>
                <p className={s.groupFit}>{g.fit}</p>
                <h3>{g.name}</h3>
                <p>{g.who}</p>
                <p className={s.groupYard}>{g.yard}</p>
              </div>
            ))}
          </div>
          <p className={s.boardNote}>Puppies under six months start in puppy mornings with Dee before they join a group.</p>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <h2 id="prices-h">Day packs and prices</h2>
            <p className={s.secNote}>
              A pack is a punch card: one hole a day, good for six months,
              shared between dogs in the same family.
            </p>
          </div>

          <ul className={s.packs}>
            {PACKS.map((p) => (
              <li key={p.name} className={s.pack}>
                <div className={s.packHead}>
                  <h3>{p.name}</h3>
                  <strong className={s.packPrice}>{p.price}</strong>
                </div>
                <p className={s.packPer}>{p.per}</p>
                <ol className={s.holes} aria-hidden="true">
                  {p.dots.map((d) => (
                    <li key={d.key} className={d.punched ? s.punched : s.hole} />
                  ))}
                </ol>
              </li>
            ))}
          </ul>

          <div className={s.priceLists}>
            <dl className={s.priceList}>
              {SINGLE.map(([k, note, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className={s.plNote}>{note}</dd>
                  <dd className={s.plPrice}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className={s.extras}>
              <h3 className={s.hand}>Add-ons</h3>
              <dl className={s.extraList}>
                {EXTRAS.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className={s.rails} aria-hidden="true">
            <TabbiedPattern
              pattern={picket}
              palette={RAILS}
              fit="grid"
              cellSize={36}
              seed="big-yard-rails"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* -------------------------------------------------------- BOARDING */}
        <section id="boarding" className={s.sec} aria-labelledby="boarding-h">
          <div className={s.boardingGrid}>
            <div>
              <div className={s.secHead}>
                <h2 id="boarding-h">Boarding</h2>
                <p className={s.secNote}>
                  Sleepovers for dogs who already come to daycare, so the
                  place and the people are old friends. Twelve rooms, each
                  with a raised cot and a door that closes.
                </p>
              </div>
              <dl className={s.priceList}>
                {BOARDING.map(([k, note, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd className={s.plNote}>{note}</dd>
                    <dd className={s.plPrice}>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.small}>Drop-off and pickup during daycare hours, or Sunday between 4 and 6. Sam sends a text and a photo at bedtime.</p>
            </div>

            <div className={`${s.card} ${s.bringCard}`}>
              <div className={s.bowls} aria-hidden="true">
                <TabbiedPattern
                  pattern={bowl}
                  palette={BOWLS}
                  fit="grid"
                  cellSize={40}
                  seed="big-yard-bowls"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 className={s.cardTitle}>Pack for a sleepover</h3>
              <ul className={s.checks}>
                {BRING.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ MEET */}
        <section id="meet" className={s.sec} aria-labelledby="meet-h">
          <div className={s.secHead}>
            <h2 id="meet-h">The meet and sniff</h2>
            <p className={s.secNote}>
              Every new dog starts here, however friendly. It is free, and it
              is how we choose a group.
            </p>
          </div>

          <ol className={s.meetSteps}>
            {MEET.map((m) => (
              <li key={m.step}>
                <h3>{m.step}</h3>
                <p>{m.note}</p>
              </li>
            ))}
          </ol>

          <div className={s.meetGrid}>
            <div className={`${s.card} ${s.rulesCard}`}>
              <h3 className={s.cardTitle}>Before the first day</h3>
              <ul className={s.checks}>
                {RULES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className={s.faq}>
                {FAQ.map(([q, a]) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </div>

            <form className={s.form} action="#">
              <h3 className={s.formTitle}>Book a meet and sniff</h3>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label htmlFor="by-name">Your name</label>
                  <input id="by-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label htmlFor="by-phone">Phone</label>
                  <input id="by-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label htmlFor="by-dog">Dog's name</label>
                  <input id="by-dog" name="dog" type="text" />
                </div>
                <div className={s.field}>
                  <label htmlFor="by-breed">Breed and age</label>
                  <input id="by-breed" name="breed" type="text" />
                </div>
                <div className={s.field}>
                  <label htmlFor="by-size">Weight</label>
                  <select id="by-size" name="size" defaultValue="mid">
                    <option value="small">Under 25 lb</option>
                    <option value="mid">25 to 60 lb</option>
                    <option value="large">Over 60 lb</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="by-day">A weekday morning that suits</label>
                  <input id="by-day" name="day" type="date" />
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label htmlFor="by-notes">Anything we should know</label>
                  <textarea id="by-notes" name="notes" rows={3} />
                </div>
              </div>
              <button className={s.btn} type="submit">Send it to Theo</button>
            </form>
          </div>
        </section>

        {/* ---------------------------------------------------------- PEOPLE */}
        <section className={s.sec} aria-labelledby="people-h">
          <div className={s.secHead}>
            <h2 id="people-h">Who is in the yard</h2>
          </div>
          <ul className={s.people}>
            {PEOPLE.map((p) => (
              <li key={p.name} className={s.card}>
                <h3>{p.name}</h3>
                <p className={s.role}>{p.role}</p>
                <p>{p.note}</p>
                <p className={s.handNote}>{p.dog}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ FIND */}
        <section id="find" className={s.find} aria-labelledby="find-h">
          <div className={s.findInner}>
            <div>
              <h2 id="find-h">Find us</h2>
              <p className={s.addr}>480 Tanner Lane, Greenhill</p>
              <p className={s.findNote}>The green gate past the feed store. Park on the gravel and walk up; the dogs will announce you.</p>
              <p className={s.findLinks}>
                <a href="tel:+15550174480">(555) 017-4480</a>
                <a href="mailto:hello@bigyard.example">hello@bigyard.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Big Yard</p>
        <p>A fictional dog daycare. The dogs, people, prices and report cards are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
