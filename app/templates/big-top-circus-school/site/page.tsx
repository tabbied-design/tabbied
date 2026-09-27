import { TabbiedPattern } from 'tabbied/react';
import { cinch, sunray, circusposter, pennantbox, bias } from 'tabbied/patterns';
import s from './big-top-circus-school.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Big Top Circus School: Circus arts in the round barn, Holloway Green',
  description:
    'Aerial silks, trapeze, hoop, juggling, tightwire, clowning and acrobalance for children and grown-ups, in the round barn on Fairground Lane. The weekly timetable, the summer show, performers for hire and a free first class.',
};

/* Site colors. The two hero figures are cut out of patterns, the poster
   way: the aerialist out of pinched arcs, the juggler out of sunbursts.
   The ticket booth is a harlequin lattice, the hire list hangs under a
   string of folded pennants, the rigging section is edged in diagonals,
   and the arcs come back along the foot of the page. */
const CANVAS = '#f5ecd9';
const RED = '#c8201f';
const NAVY = '#1b2242';
const GOLD = '#e8b23a';

const ARCS = [NAVY, RED, GOLD, CANVAS, RED, GOLD];
const BURST = [NAVY, GOLD, CANVAS, RED, GOLD, CANVAS];
const HARLEQUIN = ['transparent', RED, GOLD, CANVAS, NAVY];
const PENNANTS = ['transparent', RED, GOLD, NAVY, RED, GOLD];
const RIGGING = ['transparent', GOLD, NAVY, GOLD, CANVAS, GOLD];
const FOOT_ARCS = ['transparent', RED, GOLD, CANVAS, GOLD, RED];

const NAV = [
  ['Timetable', '#classes'],
  ['Kids', '#kids'],
  ['Adults', '#adults'],
  ['The show', '#show'],
  ['Hire us', '#hire'],
  ['Safety', '#safety'],
  ['Free class', '#try'],
  ['Visit', '#visit'],
];

type Apparatus = {
  key: string;
  name: string;
  line: string;
  levels: string;
};

const APPARATUS: Apparatus[] = [
  { key: 'silks', name: 'Aerial silks', line: 'Climb, wrap and drop down two lengths of fabric hung from the roof beam.', levels: 'Kids 9-12, teens, adults' },
  { key: 'trapeze', name: 'Static trapeze', line: 'A bar on two ropes: hangs, balances and beats, no flying.', levels: 'Teens and adults' },
  { key: 'hoop', name: 'Aerial hoop', line: 'The lyra: a steel ring you sit in, hang from and spin around.', levels: 'Kids 6-12, improvers' },
  { key: 'juggling', name: 'Juggling', line: 'Balls, then clubs, then rings, then passing with a partner.', levels: 'Everyone, from age 6' },
  { key: 'wire', name: 'Tightwire', line: 'A low wire at knee height, a fan for balance and a lot of patience.', levels: 'Kids and adults' },
  { key: 'clown', name: 'Clowning', line: 'Falls, slaps, silences and the art of being laughed at on purpose.', levels: 'Kids 6-12, adults' },
  { key: 'acro', name: 'Acrobalance', line: 'Bases and flyers: partner lifts, pyramids and handstands.', levels: 'Kids, families, adults' },
];

type Slot = {
  time: string;
  app: string;
  group: string;
};

const WEEK: { day: string; slots: Slot[] }[] = [
  {
    day: 'Monday',
    slots: [
      { time: '4:30', app: 'juggling', group: 'Kids 6-12' },
      { time: '6:00', app: 'silks', group: 'Teens' },
      { time: '7:30', app: 'silks', group: 'Adult beginners' },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '4:30', app: 'wire', group: 'Kids 6-12' },
      { time: '6:00', app: 'hoop', group: 'Improvers' },
      { time: '7:30', app: 'clown', group: 'Adults' },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '4:30', app: 'acro', group: 'Kids 6-12' },
      { time: '6:00', app: 'trapeze', group: 'Teens' },
      { time: '7:30', app: 'silks', group: 'Adult beginners' },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { time: '4:30', app: 'hoop', group: 'Kids 6-12' },
      { time: '6:00', app: 'juggling', group: 'All ages' },
      { time: '7:30', app: 'trapeze', group: 'Adults' },
    ],
  },
  {
    day: 'Friday',
    slots: [
      { time: '5:00', app: 'acro', group: 'Families' },
      { time: '6:30', app: 'wire', group: 'Adults' },
    ],
  },
  {
    day: 'Saturday',
    slots: [
      { time: '9:30', app: 'clown', group: 'Kids 6-12' },
      { time: '11:00', app: 'silks', group: 'Kids 9-12' },
      { time: '1:00', app: 'juggling', group: 'Adult beginners' },
    ],
  },
];

const APP_NAME = Object.fromEntries(APPARATUS.map((a) => [a.key, a.name]));

const KIDS_LEARN = [
  'Tumbling and safe falls',
  'Three-ball juggling',
  'Low wire and stilts',
  'Hoop and low trapeze',
  'A bow, and taking it',
];

const KIDS_TERMS = [
  ['Ages', '6 to 12, in two groups'],
  ['When', 'Weekdays at 4:30, Saturdays at 9:30'],
  ['Term', 'Ten weeks, $160, siblings $140'],
  ['Wear', 'Leggings, a fitted top, bare feet'],
];

const ADULT_NOTS = [
  ['You do not need to be flexible.', 'Flexibility is what the class gives you, not what it asks for.'],
  ['You do not need to be strong.', 'Week one on the silks is a climb of about two feet. We start there.'],
  ['You do not need to be young.', 'Our oldest regular on the trapeze turned seventy-one in March.'],
];

const ADULT_TERMS = [
  ['Course', 'Eight weeks, $150'],
  ['Drop in', '$22 a class, once you have done the course'],
  ['When', 'Monday and Wednesday at 7:30, Saturday at 1'],
  ['Ages', '16 and up; under 18s with a signed form'],
];

type Ticket = {
  kind: string;
  price: string;
  note: string;
  serial: string;
};

const TICKETS: Ticket[] = [
  { kind: 'Adult', price: '$18', note: 'Bleacher seat, any night', serial: 'No. 004117' },
  { kind: 'Child', price: '$10', note: 'Under 13; under 3 on a lap, free', serial: 'No. 004118' },
  { kind: 'Family', price: '$48', note: 'Two grown-ups and two children', serial: 'No. 004119' },
  { kind: 'Ringside', price: '$25', note: 'Front row on the ring curb, sawdust included', serial: 'No. 004120' },
];

const SHOWS = [
  ['Fri Aug 14', '7:00'],
  ['Sat Aug 15', '2:00 and 7:00'],
  ['Sun Aug 16', '2:00'],
  ['Fri Aug 21', '7:00'],
  ['Sat Aug 22', '2:00 and 7:00'],
];

const ACTS = [
  ['The stilt walkers', 'A pair in top hats, eight feet tall, for fetes, parades and store openings', '$380 an hour'],
  ['A juggler for the party', 'Forty minutes of show and twenty of teaching the guests', '$220'],
  ['Clown and balloon modeler', 'For birthdays of five to eight; forty-five minutes', '$180'],
  ['The aerial duo', 'Silks or hoop on our own freestanding rig, for weddings and galas', 'From $900'],
  ['Workshops in your school', 'Juggling and plate spinning for a whole grade, kit included', '$12 a child'],
];

const PROMISES = [
  ['Rigged by a rigger', 'Every point in the roof beam is load-tested each spring by a certified rigger. Last inspection: March 2, 2026.'],
  ['Mats under everything', 'Thirty-centimeter crash mats under every apparatus, every class, even the low wire.'],
  ['Two coaches up high', 'Aerial classes run with two coaches: one teaching, one spotting, with no more than eight students.'],
  ['Kids stay low', 'Children under twelve work at two meters or below. The ceiling is not going anywhere.'],
  ['Trained in first aid', 'All nine coaches hold current first aid certificates, and the kit lives by the ring door.'],
  ['Kit checked daily', 'Silks, ropes and carabiners are checked before the first class and logged on the board.'],
];

const VISIT = [
  ['Where', 'The round barn, Fairground Lane, Holloway Green'],
  ['Parking', 'On the fairground grass by the gate, free'],
  ['Bus', 'Route 22 to Holloway Green, then a five-minute walk past the pond'],
  ['Office', 'Weekdays 3:30-8:30, Saturdays 9-2'],
];

export default function BigTopCircusSchoolPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--canvas': '#f5ecd9',
        '--red': '#c8201f',
        '--navy': '#1b2242',
        '--gold': '#e8b23a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="canvas,red,navy,gold"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Sancreek&family=Bevan:ital@0;1&family=Rokkitt:ital,wght@0,400..900;1,400..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markStar} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Big Top</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Circus School</span>
        </a>
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
        {/* ------------------------------------------------------------ HERO
            The tent from inside: canvas stripes fanning down from the king
            pole, the valance along the top, and two poster figures cut out
            of patterns either side of the bill. */}
        <section className={s.hero} aria-labelledby="bt-hero-h">
          <span className={s.valance} aria-hidden="true" />
          <span className={s.garland} aria-hidden="true" />

          <div className={s.heroStage}>
            <Artwork data-edit-pattern="btHero.field" data-edit-roles="2,1,3,0,1,3"
              slug="big-top-circus-school-aerialist"
              alt="An aerialist hanging upside down from two long silks, arms stretched wide, cut out of a pattern of pinched arcs"
              mode="fill"
              inks={[]}
              className={s.aerialist}>
              <TabbiedPattern pattern={cinch} palette={ARCS} fit="grid" cellSize={40} seed="bigtop-aerialist" style={{ position: 'absolute', inset: 0 }} />
            </Artwork>

            <div className={s.bill}>
              <p data-edit="btHero.presents" data-edit-max="240" data-edit-multiline className={s.presents}>Holloway Green presents</p>
              <h1 id="bt-hero-h" className={s.title}>
                <span data-edit="btHero.titleThe" data-edit-max="60" className={s.titleThe}>The</span>
                <span data-edit="btHero.titleBig" data-edit-max="60" className={s.titleBig}>Big Top</span>
                <span data-edit="btHero.titleSchool" data-edit-max="60" className={s.titleSchool}>Circus School</span>
              </h1>
              <p className={s.daring}>
                <span data-edit="btHero.text" data-edit-max="60">Daring!</span>
                <span data-edit="btHero.text2" data-edit-max="60">Delightful!</span>
                <span data-edit="btHero.text3" data-edit-max="60">Downright dizzying!</span>
              </p>
              <p data-edit="btHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>Ladies and gentlemen, children of all ages: step right into the round barn and learn to fly, fall, juggle and walk the wire. No experience required, only nerve.</p>
              <div className={s.heroActions}>
                <a data-edit="btHero.btn" data-edit-max="28" className={s.btn} href="#try">Try a free class</a>
                <a data-edit="btHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#classes">See the timetable</a>
              </div>
              <p data-edit="btHero.billFoot" data-edit-max="240" data-edit-multiline className={s.billFoot}>Classes six days a week, ages 6 to 96, Fairground Lane</p>
            </div>

            <Artwork data-edit-pattern="btHero.field2" data-edit-roles="2,3,0,1,3,0"
              slug="big-top-circus-school-juggler"
              alt="A juggler standing with his feet apart, five clubs in the air, cut out of a sunburst pattern"
              mode="fill"
              inks={[]}
              className={s.juggler}>
              <TabbiedPattern pattern={sunray} palette={BURST} fit="grid" cellSize={34} seed="bigtop-juggler" style={{ position: 'absolute', inset: 0 }} />
            </Artwork>
          </div>
          <span className={s.ring} aria-hidden="true" />
        </section>

        {/* --------------------------------------------------------- CLASSES
            The week in the ring, a column a day, each class marked with its
            apparatus. */}
        <section id="classes" className={s.sec} aria-labelledby="bt-classes-h">
          <div className={s.marquee}>
            <p data-edit="classes.marqueeKicker" data-edit-max="240" data-edit-multiline className={s.marqueeKicker}>Seven apparatus, six days</p>
            <h2 data-edit="classes.title" data-edit-max="60" id="bt-classes-h">The week under canvas</h2>
            <p data-edit="classes.marqueeLine" data-edit-max="240" data-edit-multiline className={s.marqueeLine}>Every class, every age, in one ring!</p>
          </div>

          <div className={s.weekWrap}>
            <ol className={s.week}>
              {WEEK.map((d, i) => (
                <li key={d.day} className={s.day}>
                  <h3 data-edit={`classes.dayName.${i}`} data-edit-max="40" className={s.dayName}>{d.day}</h3>
                  <ul className={s.slots}>
                    {d.slots.map((sl, i2) => (
                      <li key={`${d.day}-${sl.time}`} className={`${s.slot} ${s[sl.app]}`}>
                        <span data-edit={`classes.slotTime.${i}.${i2}`} data-edit-max="60" className={s.slotTime}>{sl.time}</span>
                        <span data-edit={`classes.slotName.${i}.${i2}`} data-edit-max="60" className={s.slotName}>{APP_NAME[sl.app]}</span>
                        <span data-edit={`classes.slotGroup.${i}.${i2}`} data-edit-max="60" className={s.slotGroup}>{sl.group}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          <p data-edit="classes.weekNote" data-edit-max="240" data-edit-multiline className={s.weekNote}>Times are p.m. on weekdays and a.m. to 1 p.m. on Saturdays. Classes run an hour and a quarter. Sunday is for rehearsals and the odd birthday party.</p>

          <ul className={s.apparatus}>
            {APPARATUS.map((a, i) => (
              <li key={a.key} className={`${s.act} ${s[a.key]}`}>
                <span className={s.emblem} aria-hidden="true" />
                <h3 data-edit={`classes.title2.${i}`} data-edit-max="40">{a.name}</h3>
                <p data-edit={`classes.actLine.${i}`} data-edit-max="240" data-edit-multiline className={s.actLine}>{a.line}</p>
                <p data-edit={`classes.actLevels.${i}`} data-edit-max="240" data-edit-multiline className={s.actLevels}>{a.levels}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ KIDS */}
        <section id="kids" className={`${s.sec} ${s.kidsSec}`} aria-labelledby="bt-kids-h">
          <div className={s.programme}>
            <article className={s.actCard}>
              <p data-edit="actCard.actCardKicker" data-edit-max="240" data-edit-multiline className={s.actCardKicker}>For the young!</p>
              <figure className={s.medallion}>
                <Artwork
                  slug="big-top-circus-school-juggler"
                  alt="A juggler looking up at five clubs in the air"
                  inks={['var(--navy-ink)', 'var(--canvas)']}
                  className={s.medallionArt}
                />
              </figure>
              <h2 data-edit="actCard.actCardTitle" data-edit-max="60" id="bt-kids-h" className={s.actCardTitle}>Kids&apos; circus</h2>
              <p data-edit="actCard.actCardAge" data-edit-max="240" data-edit-multiline className={s.actCardAge}>Ages 6 to 12</p>
              <dl className={s.terms}>
                {KIDS_TERMS.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`actCard.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`actCard.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <div className={s.programmeText}>
              <p data-edit="kids.voice" data-edit-max="240" data-edit-multiline className={s.voice}>See them tumble! See them balance! See them juggle three balls before the term is out!</p>
              <p data-edit="kids.body" data-edit-max="240" data-edit-multiline>Kids&apos; circus is where most of our students start. Every class warms up with games, works on one apparatus, and ends in the ring with something to show. The last Saturday of every term is a performance for families, with a proper spotlight and a proper bow.</p>
              <h3 data-edit="kids.listHead" data-edit-max="40" className={s.listHead}>In ten weeks they learn</h3>
              <ul className={s.learn}>
                {KIDS_LEARN.map((l, i) => (
                  <li data-edit={`kids.item.${i}`} data-edit-max="80" key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- ADULTS */}
        <section id="adults" className={`${s.sec} ${s.adultsSec}`} aria-labelledby="bt-adults-h">
          <div className={`${s.programme} ${s.programmeFlip}`}>
            <div className={s.programmeText}>
              <p data-edit="adults.voice" data-edit-max="240" data-edit-multiline className={s.voice}>Grown-ups, you are not too old, too stiff or too sensible. Nobody is.</p>
              <ul className={s.nots}>
                {ADULT_NOTS.map(([head, text], i) => (
                  <li key={head}>
                    <h3 data-edit={`adults.title.${i}`} data-edit-max="40">{head}</h3>
                    <p data-edit={`adults.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <article className={s.actCard}>
              <p data-edit="actCard.actCardKicker2" data-edit-max="240" data-edit-multiline className={s.actCardKicker}>For grown-ups!</p>
              <figure className={s.medallion}>
                <Artwork
                  slug="big-top-circus-school-aerialist"
                  alt="An aerialist hanging upside down from two silks"
                  inks={['var(--red-ink)', 'var(--canvas)']}
                  className={s.medallionArt}
                />
              </figure>
              <h2 data-edit="actCard.actCardTitle2" data-edit-max="60" id="bt-adults-h" className={s.actCardTitle}>Adult beginners</h2>
              <p data-edit="actCard.actCardAge2" data-edit-max="240" data-edit-multiline className={s.actCardAge}>Ages 16 and up</p>
              <dl className={s.terms}>
                {ADULT_TERMS.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`actCard.term2.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`actCard.body2.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </section>

        {/* ------------------------------------------------------------ SHOW
            The ticket booth: stubs laid on a harlequin lattice. */}
        <section id="show" className={s.showSec} aria-labelledby="bt-show-h">
          <div data-edit-pattern="show.field" data-edit-roles="transparent,1,3,0,2" className={s.booth} aria-hidden="true">
            <TabbiedPattern pattern={circusposter} palette={HARLEQUIN} fit="grid" cellSize={56} seed="bigtop-booth" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.showInner}>
            <div className={s.showBill}>
              <p data-edit="show.showKicker" data-edit-max="240" data-edit-multiline className={s.showKicker}>Two weekends only!</p>
              <h2 data-edit="show.showTitle" data-edit-max="60" id="bt-show-h" className={s.showTitle}>The Summer Spectacular</h2>
              <p data-edit="show.showLine" data-edit-max="240" data-edit-multiline className={s.showLine}>Fifty-two students, seven apparatus and one very brave ringmaster</p>
              <ul className={s.showDates}>
                {SHOWS.map(([day, times], i) => (
                  <li key={day}>
                    <span data-edit={`show.showDay.${i}`} data-edit-max="60" className={s.showDay}>{day}</span>
                    <span data-edit={`show.showTimes.${i}`} data-edit-max="60" className={s.showTimes}>{times}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.window}>
            <p data-edit="show.windowHead" data-edit-max="240" data-edit-multiline className={s.windowHead}>Tickets at the booth</p>
            <ul className={s.tickets}>
              {TICKETS.map((t, i) => (
                <li key={t.kind} className={s.ticket}>
                  <div className={s.ticketMain}>
                    <p data-edit={`show.admit.${i}`} data-edit-max="240" data-edit-multiline className={s.admit}>Admit</p>
                    <p data-edit={`show.ticketKind.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketKind}>{t.kind}</p>
                    <p data-edit={`show.ticketNote.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketNote}>{t.note}</p>
                  </div>
                  <div className={s.stub}>
                    <p data-edit={`show.ticketPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketPrice}>{t.price}</p>
                    <p data-edit={`show.serial.${i}`} data-edit-max="240" data-edit-multiline className={s.serial}>{t.serial}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className={s.boxOffice}>
              <a data-edit="show.btn" data-edit-max="28" className={s.btn} href="tel:+15550173388">Box office (555) 017-3388</a>
              <span data-edit="show.text" data-edit-max="60">Or at the barn door, from an hour before the show</span>
            </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ HIRE */}
        <section id="hire" className={s.hireSec} aria-labelledby="bt-hire-h">
          <div data-edit-pattern="hire.field" data-edit-roles="transparent,1,3,2,1,3" className={s.bunting} aria-hidden="true">
            <TabbiedPattern pattern={pennantbox} palette={PENNANTS} options={{ frequency: 0.8 }} fit="grid" cellSize={36} seed="bigtop-bunting" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.sec}>
            <div className={s.marquee}>
              <p data-edit="hire.marqueeKicker" data-edit-max="240" data-edit-multiline className={s.marqueeKicker}>By arrangement</p>
              <h2 data-edit="hire.title" data-edit-max="60" id="bt-hire-h">Hire a performer</h2>
              <p data-edit="hire.marqueeLine" data-edit-max="240" data-edit-multiline className={s.marqueeLine}>The circus comes to you!</p>
            </div>
            <table className={s.acts}>
              <caption data-edit="hire.srOnly" className={s.srOnly}>Acts you can book and what they cost</caption>
              <tbody>
                {ACTS.map(([name, detail, price], i) => (
                  <tr key={name}>
                    <th scope="row">
                      <span data-edit={`hire.actName.${i}`} data-edit-max="60" className={s.actName}>{name}</span>
                      <span data-edit={`hire.actDetail.${i}`} data-edit-max="60" className={s.actDetail}>{detail}</span>
                    </th>
                    <td className={s.leader} aria-hidden="true" />
                    <td data-edit={`hire.actPrice.${i}`} className={s.actPrice}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p data-edit="hire.hireNote" data-edit-max="240" data-edit-multiline className={s.hireNote}>Our performers are our coaches and senior students. Book a month ahead for weekends in summer; travel beyond twenty miles is charged at cost.</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- SAFETY */}
        <section id="safety" className={s.safetySec} aria-labelledby="bt-safety-h">
          <div data-edit-pattern="safety.field" data-edit-roles="transparent,3,2,3,0,3" className={s.hazard} aria-hidden="true">
            <TabbiedPattern pattern={bias} palette={RIGGING} fit="grid" cellSize={28} seed="bigtop-rigging" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.safetyInner}>
            <div className={s.safetyHead}>
              <p data-edit="safety.safetyKicker" data-edit-max="240" data-edit-multiline className={s.safetyKicker}>The ringmaster&apos;s promise</p>
              <h2 data-edit="safety.title" data-edit-max="60" id="bt-safety-h">Safety and rigging</h2>
              <p data-edit="safety.safetyLede" data-edit-max="240" data-edit-multiline className={s.safetyLede}>Daring is the act. Everything under it is arithmetic, inspections and very thick mats.</p>
            </div>
            <ol className={s.promises}>
              {PROMISES.map(([head, text], i) => (
                <li key={head}>
                  <span className={s.promiseNo} aria-hidden="true">{i + 1}</span>
                  <h3 data-edit={`safety.title2.${i}`} data-edit-max="40">{head}</h3>
                  <p data-edit={`safety.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------- TRY */}
        <section id="try" className={s.sec} aria-labelledby="bt-try-h">
          <div className={s.tryGrid}>
            <div className={s.tryText}>
              <p data-edit="try.voice" data-edit-max="240" data-edit-multiline className={s.voice}>Step right up! Your first class is on the house.</p>
              <h2 data-edit="try.tryTitle" data-edit-max="60" id="bt-try-h" className={s.tryTitle}>Try a free class</h2>
              <p data-edit="try.body" data-edit-max="240" data-edit-multiline>Pick an apparatus and a day. We save you a place, lend you anything you need and tell you honestly which class to join after.</p>
              <p data-edit="try.tryNote" data-edit-max="240" data-edit-multiline className={s.tryNote}>One free class per person. Under 18s need a grown-up to fill this in.</p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="try.label" htmlFor="bt-name">Name</label>
                <input id="bt-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="try.label2" htmlFor="bt-email">Email</label>
                <input id="bt-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="try.label3" htmlFor="bt-who">Who is coming</label>
                <select id="bt-who" name="who" defaultValue="kid">
                  <option value="kid">A child, 6-12</option>
                  <option value="teen">A teenager</option>
                  <option value="adult">A grown-up</option>
                  <option value="family">A family, together</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="try.label4" htmlFor="bt-app">Apparatus</label>
                <select id="bt-app" name="apparatus" defaultValue="silks">
                  {APPARATUS.map((a) => (
                    <option key={a.key} value={a.key}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="try.label5" htmlFor="bt-day">Best day</label>
                <select id="bt-day" name="day" defaultValue="sat">
                  <option value="mon">Monday</option>
                  <option value="tue">Tuesday</option>
                  <option value="wed">Wednesday</option>
                  <option value="thu">Thursday</option>
                  <option value="fri">Friday</option>
                  <option value="sat">Saturday</option>
                </select>
              </div>
              <button data-edit="try.btn" data-edit-max="24" className={s.btn} type="submit">Save me a place</button>
            </form>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={`${s.sec} ${s.visitSec}`} aria-labelledby="bt-visit-h">
          <div className={s.visit}>
            <div className={s.visitHead}>
              <h2 data-edit="visit.title" data-edit-max="60" id="bt-visit-h">Find the round barn</h2>
              <p data-edit="visit.body" data-edit-max="240" data-edit-multiline>The big white barn with the red conical roof at the end of Fairground Lane. If you reach the duck pond, you have gone too far.</p>
            </div>
            <dl className={s.visitList}>
              {VISIT.map(([term, text], i) => (
                <div key={term}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
            <p className={s.visitContact}>
              <a data-edit="visit.link" data-edit-max="28" href="tel:+15550173300">(555) 017-3300</a>
              <a data-edit="visit.link2" data-edit-max="28" href="mailto:ring@bigtop.example">ring@bigtop.example</a>
            </p>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,3,0,3,1" className={s.footArcs} aria-hidden="true">
          <TabbiedPattern pattern={cinch} palette={FOOT_ARCS} fit="grid" cellSize={36} seed="bigtop-foot" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Big Top Circus School</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional circus school. The coaches, classes, shows, prices and the round barn are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The aerialist and the juggler are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
