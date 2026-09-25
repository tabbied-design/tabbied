import { TabbiedPattern } from 'tabbied/react';
import { drypoint, picket, schist, sunray } from 'tabbied/patterns';
import s from './tin-roof-guitars.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Tin Roof Guitars: Guitar shop, Mill Road',
  description:
    'Tin Roof Guitars sells new and used acoustic and electric guitars and ukuleles, does setups from $55 and repairs of every kind, teaches lessons from $35 and takes trade-ins. On Mill Road, under the tin roof.',
};

/* Site colors. The guitars are cut out of patterns laid on a real color
   (gold, orange or green) so each silhouette reads against the wall; the
   roof ribs sit on `transparent` over the ink eave. */
const INK = '#16120F';
const BURST = '#D2691E';
const GREEN = '#2E5E4E';
const GOLD = '#F2B84B';
const GRAY = '#8E867D';
const PAPER = '#F3EFE8';

const SPRUCE = [GOLD, BURST, PAPER, INK];
const SUNBURST = [INK, BURST, GOLD];
const KOA = [GOLD, BURST, PAPER, GREEN];
const ROOF = ['transparent', GRAY, PAPER];

const NAV = [
  ['The wall', '#wall'],
  ['Repairs', '#repairs'],
  ['Lessons', '#lessons'],
  ['Trade-ins', '#trade'],
  ['Visit', '#visit'],
];

type Guitar = {
  name: string;
  spec: string;
  year: string;
  price: string;
};

const ACOUSTICS: Guitar[] = [
  { name: 'Harrow D-40 dreadnought', spec: 'Solid spruce, mahogany back and sides', year: '2011, one owner', price: '$1,450' },
  { name: 'Bellwood parlor', spec: 'Ladder-braced birch, a small loud box', year: '1962, player grade', price: '$680' },
  { name: 'Harrow J-12 jumbo', spec: 'Twelve strings, maple, pickup fitted', year: '2018, new frets', price: '$1,280' },
];

const ELECTRICS: Guitar[] = [
  { name: 'Stanton S-3', spec: 'Alder, maple neck, three single coils', year: '2019, sunburst', price: '$890' },
  { name: 'Stanton T-2', spec: 'Ash body, two pickups, rewired here', year: '2015, relic finish', price: '$1,100' },
  { name: 'Mercer Junior', spec: 'Mahogany slab, one P-90, wraparound bridge', year: '2021, as new', price: '$640' },
];

const UKULELES: Guitar[] = [
  { name: 'Kona Bay concert', spec: 'Solid koa top, laminate back', year: '2022, new', price: '$320' },
  { name: 'Pua soprano', spec: 'Mahogany, the first one we sell most', year: 'New, with bag', price: '$95' },
];

const REPAIRS = [
  { job: 'Full setup', what: 'Truss rod, action, intonation, fret polish, new strings', time: '2-3 days', price: '$55' },
  { job: 'Restring', what: 'Strings of your choice, cleaned and stretched in', time: 'While you wait', price: '$20 + strings' },
  { job: 'Fret level and crown', what: 'For buzzing and choked bends on a worn neck', time: '1 week', price: '$180' },
  { job: 'Refret', what: 'All new wire, stainless or nickel, and a setup', time: '2 weeks', price: 'from $420' },
  { job: 'New bone nut', what: 'Cut by hand, slots to your string gauge', time: '3 days', price: '$85' },
  { job: 'Bridge reglue', what: 'A lifting acoustic bridge, clamped overnight', time: '1 week', price: '$150' },
  { job: 'Pickup swap', what: 'Per pickup, soldered and shielded', time: '2 days', price: '$45' },
  { job: 'Crack repair', what: 'Cleated and glued, touched up to match', time: '1-2 weeks', price: 'from $90' },
];

const TEACHERS = [
  { name: 'June Okafor', plays: 'Acoustic, fingerstyle, folk', days: 'Mon, Wed, Sat' },
  { name: 'Wes Calder', plays: 'Electric, blues, rock, theory', days: 'Tue, Thu, Fri' },
  { name: 'Lani Kahale', plays: 'Ukulele, and guitar for under-tens', days: 'Wed, Sat' },
];

const LESSON_PRICES = [
  ['Half an hour', '$35'],
  ['Forty-five minutes', '$48'],
  ['An hour', '$60'],
  ['Six-week beginner group', '$150'],
];

const TRADE_STEPS = [
  ['Bring it in', 'No appointment. We plug it in or tune it up at the counter.'],
  ['Get two numbers', 'A cash price and a store credit price, written down and good for a week.'],
  ['Take one', 'Cash the same day, or credit toward anything on the wall.'],
];

const HOURS = [
  ['Tuesday to Friday', '11 am to 7 pm'],
  ['Saturday', '10 am to 6 pm'],
  ['Sunday', '12 pm to 4 pm'],
  ['Monday', 'Closed, the bench is open'],
];

export default function TinRoofGuitarsPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600..900&family=Work+Sans:ital,wght@0,400..700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Tin Roof Guitars</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCall} href="tel:+15550133184">(555) 013-3184</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>New and used guitars, repairs and lessons, 212 Mill Road</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Forty guitars on the wall.
              <br />
              <em>Take one down.</em>
            </h1>
          </div>
          <div className={s.heroSide}>
            <p className={s.heroLede}>
              Every guitar here has been set up on our bench before it went
              on the hook, so it plays the way it should the day you take it
              home. Pick any of them off the wall and try it through the amp
              by the window.
            </p>
            <dl className={s.heroFacts}>
              <div>
                <dt>Setups</dt>
                <dd>from $55</dd>
              </div>
              <div>
                <dt>Lessons</dt>
                <dd>from $35</dd>
              </div>
              <div>
                <dt>Trade-ins</dt>
                <dd>cash or credit</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ WALL
            A corrugated eave, then the slatwall: three bays of guitars on
            hooks, each cut out of its own pattern, a price tag under it. */}
        <section id="wall" className={s.wall} aria-labelledby="wall-h">
          <h2 id="wall-h" className={s.srOnly}>On the wall this week</h2>
          <div className={s.roof} aria-hidden="true">
            <div className={s.roofField}>
              <TabbiedPattern
                pattern={picket}
                palette={ROOF}
                fit="grid"
                cellSize={32}
                seed="tin-roof"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.slats}>
            <div className={s.bay}>
              <h3 className={s.baySign}>Acoustic</h3>
              <ul className={s.hooks}>
                {ACOUSTICS.map((g) => (
                  <li key={g.name} className={s.hang}>
                    <span className={s.hook} aria-hidden="true" />
                    <Artwork
                      slug="tin-roof-guitars-acoustic"
                      alt={`${g.name}, an acoustic guitar`}
                      mode="fill"
                      inks={[]}
                      className={s.acoustic}>
                      <TabbiedPattern
                        pattern={schist}
                        palette={SPRUCE}
                        fit="grid"
                        cellSize={26}
                        seed={g.name}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </Artwork>
                    <div className={s.tag}>
                      <h4 className={s.tagName}>{g.name}</h4>
                      <p className={s.tagSpec}>{g.spec}</p>
                      <p className={s.tagYear}>{g.year}</p>
                      <p className={s.tagPrice}>{g.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.bay}>
              <h3 className={s.baySign}>Electric</h3>
              <ul className={s.hooks}>
                {ELECTRICS.map((g) => (
                  <li key={g.name} className={s.hang}>
                    <span className={s.hook} aria-hidden="true" />
                    <Artwork
                      slug="tin-roof-guitars-electric"
                      alt={`${g.name}, an electric guitar`}
                      mode="fill"
                      inks={[]}
                      className={s.electric}>
                      <TabbiedPattern
                        pattern={sunray}
                        palette={SUNBURST}
                        fit="grid"
                        cellSize={24}
                        seed={g.name}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </Artwork>
                    <div className={s.tag}>
                      <h4 className={s.tagName}>{g.name}</h4>
                      <p className={s.tagSpec}>{g.spec}</p>
                      <p className={s.tagYear}>{g.year}</p>
                      <p className={s.tagPrice}>{g.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.bay}>
              <h3 className={s.baySign}>Ukulele</h3>
              <ul className={s.hooks}>
                {UKULELES.map((g) => (
                  <li key={g.name} className={s.hang}>
                    <span className={s.hook} aria-hidden="true" />
                    <Artwork
                      slug="tin-roof-guitars-ukulele"
                      alt={`${g.name}, a ukulele`}
                      mode="fill"
                      inks={[]}
                      className={s.ukulele}>
                      <TabbiedPattern
                        pattern={drypoint}
                        palette={KOA}
                        fit="grid"
                        cellSize={20}
                        seed={g.name}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </Artwork>
                    <div className={s.tag}>
                      <h4 className={s.tagName}>{g.name}</h4>
                      <p className={s.tagSpec}>{g.spec}</p>
                      <p className={s.tagYear}>{g.year}</p>
                      <p className={s.tagPrice}>{g.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={s.wallNote}>Eight of this week's forty. The wall changes every Tuesday; ask at the counter for what is in the back, or for the left-handed ones.</p>
        </section>

        {/* --------------------------------------------------------- REPAIRS
            A bench ticket: every job, what it covers, how long, how much. */}
        <section id="repairs" className={s.repairs} aria-labelledby="repairs-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>The bench</p>
            <h2 id="repairs-h">Repairs and setups</h2>
            <p className={s.secNote}>
              Two of us at the bench, six days a week. Every job gets a
              written ticket and a price before we touch it, and a call if
              anything changes.
            </p>
          </div>
          <div className={s.ticket}>
            <div className={s.ticketHead} aria-hidden="true">
              <span>Job</span>
              <span>What we do</span>
              <span>Takes</span>
              <span>Price</span>
            </div>
            <ul className={s.jobs}>
              {REPAIRS.map((r) => (
                <li key={r.job} className={s.job}>
                  <h3 className={s.jobName}>{r.job}</h3>
                  <p className={s.jobWhat}>{r.what}</p>
                  <p className={s.jobTime}>{r.time}</p>
                  <p className={s.jobPrice}>{r.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- LESSONS */}
        <section id="lessons" className={s.lessons} aria-labelledby="lessons-h">
          <div className={s.lessonsInner}>
            <div className={s.lessonsText}>
              <p className={s.secKicker}>Lessons</p>
              <h2 id="lessons-h">Three teachers, two practice rooms, no recitals</h2>
              <p className={s.secNote}>
                Weekly lessons for any age from seven, on your guitar or one
                of ours. The first one is half price, so you can find out if
                we suit you.
              </p>
              <dl className={s.lessonPrices}>
                {LESSON_PRICES.map(([what, price]) => (
                  <div key={what}>
                    <dt>{what}</dt>
                    <dd>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ul className={s.teachers}>
              {TEACHERS.map((t) => (
                <li key={t.name} className={s.teacher}>
                  <h3 className={s.teacherName}>{t.name}</h3>
                  <p className={s.teacherPlays}>{t.plays}</p>
                  <p className={s.teacherDays}>{t.days}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- TRADE
            One more guitar, large, beside the three steps and the form. */}
        <section id="trade" className={s.trade} aria-labelledby="trade-h">
          <div className={s.tradeInner}>
            <div className={s.tradeArt}>
              <Artwork
                slug="tin-roof-guitars-electric"
                alt="An electric guitar in a sunburst of orange and gold"
                mode="fill"
                inks={[]}
                className={s.tradeGuitar}>
                <TabbiedPattern
                  pattern={sunray}
                  palette={SUNBURST}
                  fit="grid"
                  cellSize={30}
                  seed="trade-in"
                  redrawInterval={8000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </Artwork>
            </div>
            <div className={s.tradeText}>
              <p className={s.secKicker}>Trade-ins</p>
              <h2 id="trade-h">Bring the one you do not play</h2>
              <ol className={s.tradeSteps}>
                {TRADE_STEPS.map(([title, body], i) => (
                  <li key={title}>
                    <span className={s.stepNo}>{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className={s.tradeRate}>We usually pay 50 to 60 percent of our shelf price in cash, or 70 percent in credit.</p>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label htmlFor="tr-what">What is it?</label>
                  <input id="tr-what" name="instrument" type="text" placeholder="Make, model and year" />
                </div>
                <div className={s.field}>
                  <label htmlFor="tr-state">Condition</label>
                  <select id="tr-state" name="condition" defaultValue="Played">
                    <option value="Mint">Like new</option>
                    <option value="Played">Played, looked after</option>
                    <option value="Worn">Worn, all original</option>
                    <option value="Project">Needs work</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="tr-email">Email</label>
                  <input id="tr-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
                </div>
                <button className={s.formBtn} type="submit">Get a price</button>
              </form>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInner}>
            <div>
              <p className={s.secKicker}>Visit</p>
              <h2 id="visit-h">212 Mill Road, under the tin roof</h2>
              <p className={s.secNote}>
                The old feed store by the rail crossing. Park in the gravel
                yard; the side door opens straight onto the wall.
              </p>
            </div>
            <dl className={s.hoursList}>
              {HOURS.map(([day, time]) => (
                <div key={day}>
                  <dt>{day}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
            <dl className={s.contact}>
              <div>
                <dt>Shop</dt>
                <dd>
                  <a href="tel:+15550133184">(555) 013-3184</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:shop@tinroofguitars.example">shop@tinroofguitars.example</a>
                </dd>
              </div>
              <div>
                <dt>Bench drop-off</dt>
                <dd>Any time we are open, no appointment</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p className={s.footMark}>Tin Roof Guitars</p>
          <p className={s.footTag}>Guitars, repairs and lessons on Mill Road since 1994.</p>
        </div>
        <div className={s.footFine}>
          <p>A fictional guitar shop. Instruments, makers, people, prices and the address are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
