import { TabbiedPattern } from 'tabbied/react';
import { jibboom, pebble } from 'tabbied/patterns';
import s from './crux-climbing.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Crux: Bouldering and rope climbing gym, Quarry Road',
  description:
    'A climbing gym with 214 boulder problems and 96 roped routes, tagged by grade and reset every Tuesday. Free first-visit induction, day passes, memberships and a youth club.',
};

/* Site colors. The wall in the hero is pebble holds in chalk grays with
   the odd orange and blue one; the quickdraw band is ink and orange. */
const INK = '#16161A';
const ORANGE = '#FF5A36';
const BLUE = '#3A7BD5';
const GRAY = '#8A8A8F';
const PALE = '#D8D5CF';

const CHALK = '#EDEBE7';

const WALL = ['transparent', PALE, PALE, PALE, GRAY, BLUE];
const DRAWS = ['transparent', INK, ORANGE, GRAY];
const HOLDS = ['transparent', CHALK, CHALK, GRAY, BLUE, ORANGE];
const NIGHT = ['transparent', GRAY, GRAY, BLUE, ORANGE];
const ROPE = ['transparent', INK, CHALK];

const NAV = [
  ['Grades', '#grades'],
  ['First visit', '#first-visit'],
  ['Prices', '#prices'],
  ['Youth', '#youth'],
  ['Hours', '#hours'],
];

const STATS = [
  ['214', 'boulder problems'],
  ['96', 'roped routes'],
  ['15 m', 'lead wall'],
  ['Tue', 'one wall reset'],
];

/* The grade chart: each band has a tag color and a count on the walls. */
type Band = { grade: string; tag: 'chalk' | 'gray' | 'blue' | 'orange' | 'ink' | 'stripe'; name: string; count: number };

const BOULDERS: Band[] = [
  { grade: 'VB-V0', tag: 'chalk', name: 'Chalk', count: 34 },
  { grade: 'V1-V2', tag: 'gray', name: 'Gray', count: 41 },
  { grade: 'V3-V4', tag: 'blue', name: 'Blue', count: 46 },
  { grade: 'V5-V6', tag: 'orange', name: 'Orange', count: 38 },
  { grade: 'V7-V8', tag: 'ink', name: 'Black', count: 22 },
  { grade: 'V9+', tag: 'stripe', name: 'Striped', count: 9 },
];

const ROPES: Band[] = [
  { grade: '5.6-5.8', tag: 'chalk', name: 'Chalk', count: 18 },
  { grade: '5.9-10a', tag: 'gray', name: 'Gray', count: 22 },
  { grade: '5.10b-d', tag: 'blue', name: 'Blue', count: 24 },
  { grade: '5.11', tag: 'orange', name: 'Orange', count: 17 },
  { grade: '5.12', tag: 'ink', name: 'Black', count: 11 },
  { grade: '5.13+', tag: 'stripe', name: 'Striped', count: 4 },
];

const NEW_SET = [
  ['The Cave', '14 new problems, gray to black', 'Set Tuesday'],
  ['North slab', '9 new routes on auto-belay and top rope', 'Set last week'],
  ['Comp wall', 'Next reset Tuesday 14 October, closed from 10:00', 'Coming up'],
];

const STEPS = [
  { n: '1', title: 'Sign the waiver', text: 'Online before you come, ten minutes. Under 18s need a parent to sign.', time: '10 min' },
  { n: '2', title: 'Induction', text: 'A coach shows you how to fall, how to spot and where the auto-belays are. Free, on the hour.', time: '30 min' },
  { n: '3', title: 'Shoes and chalk', text: 'Rent shoes at the desk, snug but not painful. Borrow a chalk bag from the rack.', time: '$5 shoes' },
  { n: '4', title: 'Warm up', text: 'Start on the chalk and gray tags in the slab room. Climb down, do not jump.', time: '20 min' },
  { n: '5', title: 'Belay check', text: 'Want the rope wall? Book a belay lesson, or show us you can in a five-minute check.', time: 'Optional' },
];

type Pass = { name: string; price: string; per: string; notes: string[]; featured?: boolean };

const PASSES: Pass[] = [
  { name: 'Day pass', price: '$22', per: 'a visit', notes: ['Under 18s and students $16', 'All walls, all day', 'Come back the same day'] },
  { name: 'Ten visits', price: '$190', per: 'for ten', notes: ['Shareable with a friend', 'Valid for a year', 'Two guest passes included'] },
  { name: 'Monthly', price: '$79', per: 'a month', notes: ['Students $65', 'Yoga and training room', 'Cancel with a month notice'], featured: true },
  { name: 'Annual', price: '$790', per: 'a year', notes: ['Two months free', 'Ten guest passes', 'Pause for injury'] },
];

const RENTALS = [
  ['First-visit bundle: induction, three visits, shoes', '$59'],
  ['Shoes', '$5'],
  ['Harness', '$4'],
  ['Chalk bag and chalk', '$2'],
  ['Belay lesson, 90 minutes', '$35'],
];

const YOUTH = [
  { name: 'Crux Cubs', ages: 'Ages 7-11', when: 'Tuesday and Thursday, 16:30-18:00', price: '$140 a term', text: 'Games on the bouldering wall, knots and a first go on the ropes, with one coach to six climbers.' },
  { name: 'Youth Squad', ages: 'Ages 12-17', when: 'Monday and Wednesday, 17:00-19:00', price: '$190 a term', text: 'Technique, strength and lead climbing, with a place on the regional comp team for those who want it.' },
  { name: 'Birthday climbs', ages: 'Ages 6 and up', when: 'Saturday and Sunday, 13:00 or 15:30', price: '$260 for ten', text: 'Ninety minutes with two coaches, then the party room for cake. Shoes and harnesses included.' },
];

const HOURS = [
  ['Monday to Friday', '6:30 - 23:00'],
  ['Saturday and Sunday', '9:00 - 21:00'],
  ['Holidays', '10:00 - 18:00'],
];

const BUSY = [
  ['Quiet', 'Weekdays before 16:00, and after 21:00'],
  ['Busy', 'Weekdays 17:30-20:00, Saturday afternoons'],
];

const FAQS = [
  {
    q: 'Do I need any experience?',
    a: 'None. The induction covers everything for bouldering, and a third of our problems are chalk and gray tags, which most people climb on day one.',
  },
  {
    q: 'Can I climb on my own?',
    a: 'Bouldering and the auto-belays, yes. Roped climbing needs a partner who has passed our belay check; the front desk can pair you up on Tuesday evenings.',
  },
  {
    q: 'What should I wear?',
    a: 'Something you can stretch in. Shorts are fine, though long trousers save your knees. Take off rings and watches before you climb.',
  },
];

export default function CruxClimbingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--chalk': '#edebe7',
        '--ink': '#16161a',
        '--orange': '#ff5a36',
        '--blue': '#3a7bd5',
        '--gray': '#8a8a8f',
        '--pale': '#d8d5cf',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="chalk,ink,orange,blue,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Anybody:ital,wdth,wght@0,75..150,600..900;1,75..150,800..900&family=Golos+Text:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Crux</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Climbing</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#first-visit">First visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The words on the chalk; beside them a wall of pebble holds with
            the drawn panel of holds bolted on. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Bouldering and ropes, 40 Quarry Road</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Find your grade,
              <br />
              <em>then the next one.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Every problem on our walls carries a colored tag for its grade.
              Start on chalk, work up through gray and blue, and see how far the
              colors go. Your first induction is free and takes thirty minutes.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#first-visit">Plan a first visit</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#grades">See the grade chart</a>
            </div>
            <dl className={s.stats}>
              {STATS.map(([value, label], i) => (
                <div key={label}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.wall}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,5,5,5,4,3" className={s.wallField} aria-hidden="true">
              <TabbiedPattern
                pattern={pebble}
                palette={WALL}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={58}
                seed="crux-wall"
                redrawInterval={9000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="crux-climbing-holds"
              alt="A wall panel with orange and blue climbing holds"
              inks={{ red: 'var(--orange)', blue: 'var(--blue)', black: 'var(--ink)' }}
              className={s.holds}
            />
            <p className={s.wallTag}>
              <span className={s.wallTagChip} aria-hidden="true" />
              <span data-edit="hero.text" data-edit-max="60">Blue tag, V3. The Cave, problem 12.</span>
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- GRADES
            Two bar charts, one per discipline: each bar a stack of tags in
            the band's color, one tag for every two climbs on the walls. */}
        <section id="grades" className={s.grades} aria-labelledby="grades-h">
          <div className={s.secHead}>
            <p data-edit="grades.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The grade chart</p>
            <h2 data-edit="grades.title" data-edit-max="60" id="grades-h">What is on the walls this week</h2>
            <p data-edit="grades.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The tag at the start hold is the grade band; the hold color is
              only the route. Counts are for this week and move every Tuesday.
            </p>
          </div>

          <div className={s.charts}>
            <figure className={s.chart}>
              <figcaption className={s.chartHead}>
                <strong data-edit="grades.emphasis">Bouldering</strong>
                <span data-edit="grades.text" data-edit-max="60">214 problems, V-scale</span>
              </figcaption>
              <ol className={s.bars}>
                {BOULDERS.map((b, i) => (
                  <li key={b.grade} className={s.barCol} data-tag={b.tag} style={{ '--n': b.count } as React.CSSProperties}>
                    <span data-edit={`grades.barCount.${i}`} data-edit-max="60" className={s.barCount}>{b.count}</span>
                    <span className={s.barStack} aria-hidden="true" />
                    <span className={s.barTag} aria-hidden="true" />
                    <span data-edit={`grades.barGrade.${i}`} data-edit-max="60" className={s.barGrade}>{b.grade}</span>
                    <span data-edit={`grades.barName.${i}`} data-edit-max="60" className={s.barName}>{b.name}</span>
                  </li>
                ))}
              </ol>
            </figure>

            <figure className={s.chart}>
              <figcaption className={s.chartHead}>
                <strong data-edit="grades.emphasis2">Ropes</strong>
                <span data-edit="grades.text2" data-edit-max="60">96 routes, 12-15 m, Yosemite scale</span>
              </figcaption>
              <ol className={s.bars}>
                {ROPES.map((r, i) => (
                  <li key={r.grade} className={s.barCol} data-tag={r.tag} style={{ '--n': r.count } as React.CSSProperties}>
                    <span data-edit={`grades.barCount2.${i}`} data-edit-max="60" className={s.barCount}>{r.count}</span>
                    <span className={s.barStack} aria-hidden="true" />
                    <span className={s.barTag} aria-hidden="true" />
                    <span data-edit={`grades.barGrade2.${i}`} data-edit-max="60" className={s.barGrade}>{r.grade}</span>
                    <span data-edit={`grades.barName2.${i}`} data-edit-max="60" className={s.barName}>{r.name}</span>
                  </li>
                ))}
              </ol>
            </figure>
          </div>

          <div className={s.newSet}>
            <h3 data-edit="grades.title2" data-edit-max="40">Newly set</h3>
            <ul>
              {NEW_SET.map(([wall, what, when], i) => (
                <li key={wall}>
                  <strong data-edit={`grades.emphasis3.${i}`}>{wall}</strong>
                  <span data-edit={`grades.newWhat.${i}`} data-edit-max="60" className={s.newWhat}>{what}</span>
                  <span data-edit={`grades.newWhen.${i}`} data-edit-max="60" className={s.newWhen}>{when}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ FIRST VISIT
            Five steps up a line, like a route, with the chalk bag. */}
        <section id="first-visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInner}>
            <div className={s.visitIntro}>
              <p data-edit="firstVisit.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Your first visit</p>
              <h2 data-edit="firstVisit.title" data-edit-max="60" id="visit-h">Five moves to the top</h2>
              <p data-edit="firstVisit.body" data-edit-max="240" data-edit-multiline>
                Inductions run on the hour from 10:00 to 19:00, up to six people
                at a time. Book a slot, or walk in and wait for the next one.
              </p>
              <a data-edit="firstVisit.btnDark" data-edit-max="28" className={s.btnDark} href="mailto:desk@cruxclimbing.example">Book an induction</a>
              <div className={s.chalkWall}>
                <div data-edit-pattern="firstVisit.field" data-edit-roles="transparent,0,0,4,3,2" className={s.chalkField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={pebble}
                    palette={HOLDS}
                    options={{ frequency: 0.5 }}
                    fit="grid"
                    cellSize={40}
                    seed="crux-chalk"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="crux-climbing-chalk"
                  alt="A chalk bag with a drawstring"
                  inks={{ red: 'var(--orange)', blue: 'var(--blue)', black: 'var(--ink)' }}
                  className={s.chalkBag}
                />
              </div>
            </div>

            <ol className={s.steps}>
              {STEPS.map((st, i) => (
                <li key={st.n} className={s.step}>
                  <span className={s.stepHold} aria-hidden="true">{st.n}</span>
                  <div className={s.stepBody}>
                    <h3 data-edit={`firstVisit.title2.${i}`} data-edit-max="40">{st.title}</h3>
                    <p data-edit={`firstVisit.body2.${i}`} data-edit-max="240" data-edit-multiline>{st.text}</p>
                  </div>
                  <span data-edit={`firstVisit.stepTime.${i}`} data-edit-max="60" className={s.stepTime}>{st.time}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.prices} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p data-edit="prices.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Memberships and day passes</p>
            <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">Climb once, or climb all year</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              All prices include every wall, the training room and the yoga
              classes. No joining fee, and memberships can be paused.
            </p>
          </div>

          <ul className={s.passes}>
            {PASSES.map((p, i) => (
              <li key={p.name} className={p.featured ? `${s.pass} ${s.passFeatured}` : s.pass}>
                <h3 data-edit={`prices.title2.${i}`} data-edit-max="40">{p.name}</h3>
                <p className={s.passPrice}>
                  <strong data-edit={`prices.emphasis.${i}`}>{p.price}</strong>
                  <span data-edit={`prices.text.${i}`} data-edit-max="60">{p.per}</span>
                </p>
                <ul className={s.passNotes}>
                  {p.notes.map((note, i2) => (
                    <li data-edit={`prices.item.${i}.${i2}`} data-edit-max="80" key={note}>{note}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className={s.rentals}>
            <Artwork
              slug="crux-climbing-carabiner"
              alt="A carabiner clipped to a coil of rope"
              inks={{ red: 'var(--orange)', blue: 'var(--blue)', black: 'var(--ink)' }}
              className={s.carabiner}
            />
            <div className={s.rentalBody}>
              <h3 data-edit="prices.title3" data-edit-max="40">Rentals and lessons</h3>
              <dl className={s.rentalList}>
                {RENTALS.map(([what, price], i) => (
                  <div key={what}>
                    <dt data-edit={`prices.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`prices.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BAND */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={jibboom}
            palette={DRAWS}
            options={{ frequency: 0.8 }}
            fit="grid"
            cellSize={44}
            seed="crux-draws"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- YOUTH */}
        <section id="youth" className={s.youth} aria-labelledby="youth-h">
          <div className={s.secHead}>
            <p data-edit="youth.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Youth club</p>
            <h2 data-edit="youth.title" data-edit-max="60" id="youth-h">For climbers under eighteen</h2>
            <p data-edit="youth.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Terms run twelve weeks. Every coach holds a climbing instructor
              award and a current first aid certificate.
            </p>
          </div>
          <ul className={s.youthGrid}>
            {YOUTH.map((y, i) => (
              <li key={y.name} className={s.youthCard}>
                <span data-edit={`youth.youthAges.${i}`} data-edit-max="60" className={s.youthAges}>{y.ages}</span>
                <h3 data-edit={`youth.title2.${i}`} data-edit-max="40">{y.name}</h3>
                <p data-edit={`youth.youthText.${i}`} data-edit-max="240" data-edit-multiline className={s.youthText}>{y.text}</p>
                <p data-edit={`youth.youthWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.youthWhen}>{y.when}</p>
                <strong data-edit={`youth.youthPrice.${i}`} className={s.youthPrice}>{y.price}</strong>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.hours} aria-labelledby="hours-h">
          <div data-edit-pattern="hours.field" data-edit-roles="transparent,4,4,3,2" className={s.hoursField} aria-hidden="true">
            <TabbiedPattern
              pattern={pebble}
              palette={NIGHT}
              options={{ frequency: 0.4 }}
              fit="grid"
              cellSize={52}
              seed="crux-night"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.hoursInner}>
            <div>
              <p data-edit="hours.eyebrowLight" data-edit-max="240" data-edit-multiline className={s.eyebrowLight}>Hours and finding us</p>
              <h2 data-edit="hours.title" data-edit-max="60" id="hours-h">Open early, open late</h2>
              <dl className={s.hoursList}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`hours.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`hours.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <dl className={s.busy}>
                {BUSY.map(([label, when], i) => (
                  <div key={label}>
                    <dt data-edit={`hours.term2.${i}`} data-edit-max="28">{label}</dt>
                    <dd data-edit={`hours.body2.${i}`} data-edit-max="200" data-edit-multiline>{when}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={s.findUs}>
              <h3 data-edit="hours.title2" data-edit-max="40">40 Quarry Road</h3>
              <p data-edit="hours.body3" data-edit-max="240" data-edit-multiline>In the old brick depot behind the bus garage. Free parking for 60 cars and covered bike racks by the door.</p>
              <a data-edit="hours.findLink" data-edit-max="28" className={s.findLink} href="tel:+15550132870">(555) 013-2870</a>
              <a data-edit="hours.findLink2" data-edit-max="28" className={s.findLink} href="mailto:desk@cruxclimbing.example">desk@cruxclimbing.example</a>
              <div className={s.faq}>
                {FAQS.map((f, i) => (
                  <details key={f.q} className={s.faqItem}>
                    <summary data-edit={`hours.question.${i}`} data-edit-max="80">{f.q}</summary>
                    <p data-edit={`hours.body4.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,0" className={s.footDraws} aria-hidden="true">
          <TabbiedPattern
            pattern={jibboom}
            palette={ROPE}
            options={{ frequency: 0.7 }}
            fit="grid"
            cellSize={32}
            seed="crux-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Crux</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Bouldering and rope climbing, 40 Quarry Road.</p>
          <nav className={s.footNav} aria-label="Footer">
            {NAV.map(([label, href], i) => (
              <a data-edit={`footer.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional climbing gym. Grades, counts, prices and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
