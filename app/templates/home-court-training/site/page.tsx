import { TabbiedPattern } from 'tabbied/react';
import { skewblock } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './home-court-training.module.css';

export const metadata = {
  title: 'Home Court Training: A personal trainer who comes to your living room',
  description:
    'Theo Marsh brings the kettlebells, the bands and the plan to your house. Sixty-minute sessions in two by three meters of floor, from $85, early mornings included.',
};

/* Site colors, the same hexes as the stylesheet's root rule: a court at
   night, chalk lines, and three bright tapes. Skewblock is the floor of the
   gym he does not have: leaning blocks that shear as you read across. It
   fills the slanted hero panel, runs as the rest interval between the
   session and the prices, packs the kit bag and lines the footer. */
const COURT = '#16181d';
const CHALK = '#f2efe8';
const AMBER = '#f5b82e';
const CORAL = '#ff5a4e';
const CYAN = '#3ec7e0';

const HERO = ['transparent', AMBER, CHALK, CORAL, CYAN, AMBER];
const REST = ['transparent', CYAN, CORAL, AMBER, CHALK, CYAN];
const BAG = [COURT, AMBER, CORAL, CYAN, CHALK, CORAL];

const NAV = [
  ['The session', '#session'],
  ['Packages', '#packages'],
  ['The kit', '#kit'],
  ['Stories', '#stories'],
  ['Book', '#book'],
];

const HERO_STATS = [
  ['60', 'minutes a session'],
  ['2 x 3 m', 'of floor is plenty'],
  ['0', 'minutes of commute'],
];

type Block = { from: string; to: string; name: string; note: string; moves: string[][] };

/* One real session, as it is written on the card he leaves behind. */
const BLOCKS: Block[] = [
  {
    from: '0:00', to: '0:08', name: 'Warm-up', note: 'Heart rate up, hips and shoulders open.',
    moves: [
      ['Skipping on the spot', '2 min', 'Bodyweight'],
      ['Cat-cow, thread the needle', '1 x 8', 'Mat'],
      ['Band pull-aparts', '2 x 15', 'Light band'],
      ['Walking hip openers', '1 x 10', 'Bodyweight'],
    ],
  },
  {
    from: '0:08', to: '0:33', name: 'Strength', note: 'The main work. Weights go up when the last rep looks like the first.',
    moves: [
      ['Goblet squat', '4 x 8', '16 kg'],
      ['Single-arm row, hand on the sofa', '4 x 10 each', '20 kg'],
      ['Push-up, hands on the coffee table', '3 x max', 'Bodyweight'],
      ['Romanian deadlift', '3 x 10', '2 x 16 kg'],
      ['Pallof press, band on the door', '3 x 12 each', 'Medium band'],
    ],
  },
  {
    from: '0:33', to: '0:48', name: 'Conditioning', note: 'Four rounds, 30 seconds on and 30 off. Neighbors below? We skip the jumps.',
    moves: [
      ['Kettlebell swing', '4 x 30 s', '12 kg'],
      ['Step-ups on the bottom stair', '4 x 30 s', 'Bodyweight'],
      ['Slam ball', '4 x 30 s', '6 kg'],
      ['Mountain climbers', '4 x 30 s', 'Mat'],
    ],
  },
  {
    from: '0:48', to: '1:00', name: 'Cool-down and log', note: 'Loosen up, then next week is written down before I leave.',
    moves: [
      ['Foam roller, quads and upper back', '3 min', 'Roller'],
      ['90/90 hip switches', '2 x 6', 'Mat'],
      ['Box breathing', '2 min', 'Floor'],
      ['Weights logged, targets set', '1 card', 'Pen'],
    ],
  },
];

type Package = { name: string; price: string; unit: string; points: string[]; featured?: boolean };

const PACKAGES: Package[] = [
  { name: 'Single session', price: '$95', unit: 'an hour', points: ['The first one is free', 'Pay after, by card or transfer', 'No commitment'] },
  { name: 'Ten-pack', price: '$850', unit: '$85 a session', points: ['Use within four months', 'Share with one person at the same address', 'Plan for the days between'] },
  { name: 'Twice a week', price: '$680', unit: 'a month, eight sessions', points: ['Same days, same time, held for you', 'Written plan and a check-in text each week', 'Pause a month for travel'], featured: true },
  { name: 'Partner session', price: '$130', unit: 'an hour, for two', points: ['Couples, friends, parent and teen', 'Kit for both of you', 'Each gets their own card'] },
];

const KIT = [
  ['Adjustable dumbbells', '2.5 to 24 kg each'],
  ['Kettlebells', '8, 12, 16 and 24 kg'],
  ['Resistance bands', 'Five, light to very heavy'],
  ['Suspension straps', 'Door anchor, no screws'],
  ['Slam ball', '6 kg, soft shell, quiet'],
  ['Foam roller and two mats', 'Yours to use, mine to carry'],
  ['Floor protector', 'For wood, tile and rugs'],
  ['Interval timer', 'With a small speaker'],
];

const YOU_BRING = ['A clear patch of floor, about 2 by 3 meters', 'Trainers or bare feet', 'Water and a towel'];

type Story = { quote: string; name: string; detail: string; stat: string };

const STORIES: Story[] = [
  { quote: 'I had a gym membership for six years and went eleven times. Theo rings the doorbell at 6:30 and that is the end of the argument.', name: 'Ines R.', detail: 'Accountant, trains twice a week', stat: 'Deadlift 18 to 52 kg in 7 months' },
  { quote: 'After the knee replacement I could not do the stairs without the rail. Week nine, I carried the laundry basket up them.', name: 'Raymond K.', detail: '67, retired engineer', stat: 'Stairs without the rail by week 9' },
  { quote: 'We train together on Saturdays. He writes us different numbers on the same card and somehow it is still a competition.', name: 'Priya and Sam D.', detail: 'Partner sessions since 2024', stat: '96 Saturdays and counting' },
];

const AREA = ['Birchwood', 'Old Harbor', 'Fenton Hill', 'Lockside', 'Marsh End', 'The Crescents'];

const HOURS = [
  ['Monday to Friday', '5:30 am-8:00 pm'],
  ['Saturday', '7:00 am-1:00 pm'],
  ['Sunday', 'Rest day'],
];

export default function HomeCourtTrainingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--court': '#16181d',
        '--chalk': '#f2efe8',
        '--amber': '#f5b82e',
        '--coral': '#ff5a4e',
        '--cyan': '#3ec7e0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="court,chalk,amber,coral,cyan"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&family=Barlow+Condensed:wght@500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Home Court</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Training</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">First session free</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The headline in gym-wall letters, and a slanted panel of the
            pattern with today's card pinned to it. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>In-home personal training, Birchwood and around</p>
            <h1 data-edit="intro.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Your living room <span>is the gym.</span>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I bring the kettlebells, the bands and the plan, set up in five
              minutes and pack it all away again. You get an hour of coaching
              where you already are, at a time that fits before the school run.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#book">Book a free first session</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#session">See a session</a>
            </div>
            <dl className={s.heroStats}>
              {HERO_STATS.map(([value, label], i) => (
                <div key={label}>
                  <dt data-edit={`intro.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`intro.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,2,1,3,4,2" className={s.heroPanel} aria-hidden="true">
              <TabbiedPattern
                pattern={skewblock}
                palette={HERO}
                fit="grid"
                cellSize={56}
                seed="hc-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.todayCard}>
              <p data-edit="intro.todayLabel" data-edit-max="240" data-edit-multiline className={s.todayLabel}>Today, 6:30 am</p>
              <p data-edit="intro.todayWhere" data-edit-max="240" data-edit-multiline className={s.todayWhere}>14 Larch Close, front room</p>
              <p data-edit="intro.todayMove" data-edit-max="240" data-edit-multiline className={s.todayMove}>Goblet squat</p>
              <p data-edit="intro.todaySets" data-edit-max="240" data-edit-multiline className={s.todaySets}>4 x 8 at 16 kg</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- SESSION
            The workout card itself, printed on chalk-white stock. */}
        <section id="session" className={s.sec} aria-labelledby="session-h">
          <div className={s.secHead}>
            <p data-edit="session.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The session</p>
            <h2 data-edit="session.secTitle" data-edit-max="60" id="session-h" className={s.secTitle}>What an hour on your rug looks like</h2>
            <p data-edit="session.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every session is written on a card and left on your fridge. This is
              Ines, week 14. Yours starts lighter and moves at your pace.
            </p>
          </div>
          <article className={s.card} aria-label="Sample workout card">
            <div className={s.cardTop}>
              <p data-edit="card.cardTitle" data-edit-max="240" data-edit-multiline className={s.cardTitle}>Session card</p>
              <p data-edit="card.cardMeta" data-edit-max="240" data-edit-multiline className={s.cardMeta}>Client: Ines R.</p>
              <p data-edit="card.cardMeta2" data-edit-max="240" data-edit-multiline className={s.cardMeta}>Week 14, Tuesday</p>
              <p data-edit="card.cardMeta3" data-edit-max="240" data-edit-multiline className={s.cardMeta}>Floor: 2 x 3 m, rug moved</p>
            </div>
            <ol className={s.blocks}>
              {BLOCKS.map((b, i) => (
                <li key={b.name} className={s.block}>
                  <div className={s.blockTime}>
                    <span data-edit={`card.from.${i}`} data-edit-max="60" className={s.from}>{b.from}</span>
                    <span className={s.to}>{`to ${b.to}`}</span>
                  </div>
                  <div className={s.blockHead}>
                    <h3 data-edit={`card.blockName.${i}`} data-edit-max="40" className={s.blockName}>{b.name}</h3>
                    <p data-edit={`card.blockNote.${i}`} data-edit-max="240" data-edit-multiline className={s.blockNote}>{b.note}</p>
                  </div>
                  <ul className={s.moves}>
                    {b.moves.map(([move, sets, load], i2) => (
                      <li key={move} className={s.move}>
                        <span data-edit={`card.moveName.${i}.${i2}`} data-edit-max="60" className={s.moveName}>{move}</span>
                        <span data-edit={`card.moveSets.${i}.${i2}`} data-edit-max="60" className={s.moveSets}>{sets}</span>
                        <span data-edit={`card.moveLoad.${i}.${i2}`} data-edit-max="60" className={s.moveLoad}>{load}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </article>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,4,3,2,1,4" className={s.rest} aria-hidden="true">
          <TabbiedPattern
            pattern={skewblock}
            palette={REST}
            fit="grid"
            cellSize={40}
            seed="hc-rest"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- PACKAGES */}
        <section id="packages" className={s.sec} aria-labelledby="packages-h">
          <div className={s.secHead}>
            <p data-edit="packages.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Packages</p>
            <h2 data-edit="packages.secTitle" data-edit-max="60" id="packages-h" className={s.secTitle}>Pay by the hour or by the month</h2>
            <p data-edit="packages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Travel and kit are included everywhere on the area map. Cancel up
              to twelve hours before and nothing is charged.
            </p>
          </div>
          <ul className={s.packages}>
            {PACKAGES.map((p, i) => (
              <li key={p.name} className={p.featured ? `${s.package} ${s.featured}` : s.package}>
                <h3 data-edit={`packages.packName.${i}`} data-edit-max="40" className={s.packName}>{p.name}</h3>
                <p data-edit={`packages.packPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{p.price}</p>
                <p data-edit={`packages.packUnit.${i}`} data-edit-max="240" data-edit-multiline className={s.packUnit}>{p.unit}</p>
                <ul className={s.packPoints}>
                  {p.points.map((point, i2) => (
                    <li data-edit={`packages.item.${i}.${i2}`} data-edit-max="80" key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- KIT */}
        <section id="kit" className={s.sec} aria-labelledby="kit-h">
          <div className={s.kitGrid}>
            <div className={s.bagWrap}>
              <div data-edit-pattern="kit.field" data-edit-roles="0,2,3,4,1,3" className={s.bag} aria-hidden="true">
                <TabbiedPattern
                  pattern={skewblock}
                  palette={BAG}
                  fit="grid"
                  cellSize={48}
                  seed="hc-bag"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div>
              <p data-edit="kit.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The kit</p>
              <h2 data-edit="kit.secTitle" data-edit-max="60" id="kit-h" className={s.secTitle}>Everything comes in the car</h2>
              <ul className={s.kit}>
                {KIT.map(([item, spec], i) => (
                  <li key={item} className={s.kitItem}>
                    <span data-edit={`kit.kitName.${i}`} data-edit-max="60" className={s.kitName}>{item}</span>
                    <span data-edit={`kit.kitSpec.${i}`} data-edit-max="60" className={s.kitSpec}>{spec}</span>
                  </li>
                ))}
              </ul>
              <div className={s.bring}>
                <h3 data-edit="kit.bringTitle" data-edit-max="40" className={s.bringTitle}>You bring</h3>
                <ul className={s.bringList}>
                  {YOU_BRING.map((item, i) => (
                    <li data-edit={`kit.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- STORIES */}
        <section id="stories" className={s.sec} aria-labelledby="stories-h">
          <div className={s.secHead}>
            <p data-edit="stories.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Client stories</p>
            <h2 data-edit="stories.secTitle" data-edit-max="60" id="stories-h" className={s.secTitle}>Progress, measured at home</h2>
          </div>
          <ul className={s.stories}>
            {STORIES.map((st, i) => (
              <li key={st.name} className={s.story}>
                <p data-edit={`stories.storyStat.${i}`} data-edit-max="240" data-edit-multiline className={s.storyStat}>{st.stat}</p>
                <blockquote data-edit={`stories.storyQuote.${i}`} data-edit-max="240" data-edit-multiline className={s.storyQuote}>{st.quote}</blockquote>
                <p data-edit={`stories.storyName.${i}`} data-edit-max="240" data-edit-multiline className={s.storyName}>{st.name}</p>
                <p data-edit={`stories.storyDetail.${i}`} data-edit-max="240" data-edit-multiline className={s.storyDetail}>{st.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div className={s.coach}>
              <p data-edit="book.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Book</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>The first hour is on me</h2>
              <p data-edit="book.coachBio" data-edit-max="240" data-edit-multiline className={s.coachBio}>
                I am Theo Marsh, a certified personal trainer for eleven years,
                four of them on a gym floor and seven in front rooms. First aid
                and CPR certified, insured, and happy to train around a bad
                back, a new hip or a toddler.
              </p>
              <h3 data-edit="book.areaTitle" data-edit-max="40" className={s.areaTitle}>Where I train</h3>
              <ul className={s.area}>
                {AREA.map((place, i) => (
                  <li data-edit={`book.item.${i}`} data-edit-max="80" key={place}>{place}</li>
                ))}
              </ul>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contactLine}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550186640">(555) 018-6640</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:theo@homecourt.example">theo@homecourt.example</a>
              </p>
              <p data-edit="book.base" data-edit-max="240" data-edit-multiline className={s.base}>Base: 3 Ferrier Yard, Birchwood. No studio, no visits there.</p>
            </div>
            <form className={s.form} action="#">
              <h3 data-edit="book.formTitle" data-edit-max="40" className={s.formTitle}>Ask for a free session</h3>
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="hc-name">Name</label>
                <input id="hc-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="hc-phone">Phone</label>
                <input id="hc-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="hc-area">Neighborhood</label>
                <select id="hc-area" name="area" defaultValue="birchwood">
                  {AREA.map((place) => (
                    <option key={place} value={place.toLowerCase()}>{place}</option>
                  ))}
                  <option value="other">Somewhere else</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="hc-time">Best time</label>
                <select id="hc-time" name="time" defaultValue="early">
                  <option value="early">Early morning, before 8</option>
                  <option value="day">During the day</option>
                  <option value="evening">Evening, after 5</option>
                  <option value="weekend">Saturday</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label5" htmlFor="hc-goal">What you would like to be able to do</label>
                <textarea id="hc-goal" name="goal" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send it to Theo</button>
              <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>I reply within a day, usually from the car.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,3,2,1,4" className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={skewblock}
            palette={REST}
            fit="grid"
            cellSize={32}
            seed="hc-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Home Court Training</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional personal trainer. The trainer, clients, prices and
            address are invented, and nothing here is medical advice.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
