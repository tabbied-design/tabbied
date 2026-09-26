import { TabbiedPattern } from 'tabbied/react';
import { drybrush, roundstep } from 'tabbied/patterns';
import s from './kettle-and-leaf.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Kettle & Leaf: Tea room and tea shop, Moss Lane',
  description:
    'Kettle & Leaf pours green, oolong, black and aged teas in a quiet room on Moss Lane and sells them by the 50 grams. The tea list with water temperatures and steep times, afternoon tea sets, the house rules and how to book.',
};

/* Site colors. The brushed fields are drawn in the greens and the clay on
   a transparent ground, so the rice paper shows between the strokes; the
   brocade adds a line of sumi. Behind the paper screen, leaves in the two
   greens, like a shadow of the garden. */
const SUMI = '#2c2e28';
const MOSS = '#6f7d5c';
const MATCHA = '#a3ad7e';
const CLAY = '#b07a55';

const WINDOW = ['transparent', MOSS, MATCHA, MOSS, MATCHA, CLAY];
const BROCADE = ['transparent', MOSS, CLAY, MATCHA, MOSS, SUMI];
const LEAVES = ['transparent', MATCHA, MOSS, MATCHA, MATCHA, MOSS];
const NOREN = ['transparent', MOSS, MOSS, SUMI, MATCHA, MOSS];

const NAV = [
  ['The teas', '#teas'],
  ['Afternoon tea', '#afternoon'],
  ['The room', '#room'],
  ['Visit', '#visit'],
];

type Tea = {
  name: string;
  origin: string;
  note: string;
  temp: string;
  time: string;
  infusions: string;
  price: string;
};

const GROUPS: { name: string; teas: Tea[] }[] = [
  {
    name: 'Green',
    teas: [
      { name: 'Sencha', origin: 'Shizuoka, first flush', note: 'Grassy and bright, with a little sea air.', temp: '170 F', time: '1 min', infusions: '3', price: 'Pot $7. Leaf $14 for 50 g' },
      { name: 'Gyokuro', origin: 'Yame, shaded three weeks', note: 'Sweet and brothy. Small cups, cool water, patience.', temp: '140 F', time: '2 min', infusions: '4', price: 'Pot $11. Leaf $26 for 50 g' },
      { name: 'Hojicha', origin: 'Kyoto, roasted stems', note: 'Toasted rice and cocoa. Gentle enough for evening.', temp: '195 F', time: '30 sec', infusions: '3', price: 'Pot $6. Leaf $11 for 50 g' },
    ],
  },
  {
    name: 'Oolong',
    teas: [
      { name: 'Dong Ding', origin: 'Nantou, Taiwan', note: 'Rolled into balls that open in the pot. Honey and roasted nuts.', temp: '195 F', time: '1 min', infusions: '6', price: 'Pot $9. Leaf $18 for 50 g' },
      { name: 'Tieguanyin', origin: 'Anxi, Fujian', note: 'Orchid and butter, then something mineral.', temp: '195 F', time: '1 min', infusions: '6', price: 'Pot $9. Leaf $19 for 50 g' },
    ],
  },
  {
    name: 'Black',
    teas: [
      { name: 'Darjeeling, second flush', origin: 'West Bengal, June picking', note: 'Muscatel and a dry finish. Good without milk.', temp: '205 F', time: '3 min', infusions: '2', price: 'Pot $7. Leaf $16 for 50 g' },
      { name: 'Keemun', origin: 'Qimen, Anhui', note: 'Cocoa, a little smoke. Takes milk if you must.', temp: '205 F', time: '3 min', infusions: '2', price: 'Pot $7. Leaf $13 for 50 g' },
    ],
  },
  {
    name: 'Aged',
    teas: [
      { name: 'Shou pu-erh, 2014', origin: 'Menghai, pressed cake', note: 'Earth, dates, forest floor. Rinsed once, then short steeps.', temp: '212 F', time: '20 sec', infusions: '8', price: 'Pot $10. Leaf $22 for 50 g' },
    ],
  },
];

type Tray = {
  name: string;
  who: string;
  price: string;
  holds: string[];
};

const SETS: Tray[] = [
  { name: 'A moment', who: 'For one, any time', price: '$14', holds: ['One pot, any tea on the scroll', 'One seasonal wagashi'] },
  { name: 'The afternoon', who: 'For one or two, 2 to 5', price: '$32 a person', holds: ['Two teas, poured in turn', 'Yuzu pound cake', 'Black sesame shortbread', 'Seasonal wagashi', 'Pickled cucumber and rice crackers'] },
  { name: 'The long table', who: 'For four to eight, booked', price: '$48 a person', holds: ['A flight of five teas, green to aged', 'Salted salmon onigiri', 'Every sweet on the counter', 'An hour and a half at the long table'] },
];

const RULES = [
  ['Quiet voices', 'The room is small and the walls are paper-thin, nearly.'],
  ['No laptops after 2', 'Phones are fine. The afternoon is for the tea.'],
  ['Ask us to show you', 'Anyone at the counter will teach you to brew what you ordered.'],
  ['Leaf to take home', 'Every tea on the scroll is sold by the 50 grams at the counter.'],
];

const BREW = [
  ['Warm', 'Rinse the pot and the cups with hot water. Pour it away.'],
  ['Measure', 'Five grams of leaf for a small pot, about a heaped teaspoon.'],
  ['Wait', 'Let the kettle cool to the temperature on the scroll.'],
  ['Pour it all', 'Empty the pot to the last drop, so the leaf does not stew.'],
];

const HOURS = [
  ['Wednesday to Sunday', '11 to 6'],
  ['Afternoon tea', '2 to 5, booked'],
  ['Monday and Tuesday', 'Closed'],
];

export default function KettleAndLeafPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@300;400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Kettle & Leaf</a>
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
        {/* ------------------------------------------------------------ HERO
            A round window onto the brushed field, and a lot of paper. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <p className={s.side}>Tea room and tea shop, Moss Lane</p>
          <div className={s.heroText}>
            <h1 id="hero-h" className={s.title}>Water, leaves, <em>and time.</em></h1>
            <p className={s.lede}>
              A room of twelve seats and a counter of tins. We pour nine teas
              at a time, each at its own heat, and sell every one of them by the
              50 grams to take home.
            </p>
            <a className={s.quiet} href="#teas">Unroll the tea list</a>
          </div>
          <div className={s.windowWrap}>
            <div className={s.window} aria-hidden="true">
              <TabbiedPattern
                pattern={drybrush}
                palette={WINDOW}
                options={{ frequency: 0.6 }}
                fit="grid"
                cellSize={46}
                seed="kettle-window"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- TEAS
            A hanging scroll: brocade at head and foot, paper between. */}
        <section id="teas" className={s.teasSec} aria-labelledby="teas-h">
          <div className={s.scroll}>
            <span className={s.roller} aria-hidden="true" />
            <div className={s.brocade} aria-hidden="true">
              <TabbiedPattern
                pattern={drybrush}
                palette={BROCADE}
                fit="grid"
                cellSize={28}
                seed="kettle-head"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div className={s.paper}>
              <div className={s.scrollHead}>
                <Artwork
                  slug="kettle-and-leaf-kyusu"
                  alt="A side-handled kyusu teapot beside a small cup, in a few brush strokes"
                  inks={['var(--text)']}
                  className={s.kyusu}
                />
                <h2 id="teas-h">The tea list</h2>
                <p className={s.scrollNote}>
                  Water temperature, steep time and how many times the leaf will
                  take more water. We bring the kettle to your table and top it
                  up until you say stop.
                </p>
              </div>

              {GROUPS.map((g) => (
                <div key={g.name} className={s.group}>
                  <p className={s.groupName}>{g.name}</p>
                  <ul className={s.teas}>
                    {g.teas.map((t) => (
                      <li key={t.name}>
                        <h3 className={s.teaName}>{t.name}</h3>
                        <p className={s.origin}>{t.origin}</p>
                        <p className={s.teaNote}>{t.note}</p>
                        <dl className={s.brewing}>
                          <div>
                            <dt>Water</dt>
                            <dd>{t.temp}</dd>
                          </div>
                          <div>
                            <dt>Steep</dt>
                            <dd>{t.time}</dd>
                          </div>
                          <div>
                            <dt>Infusions</dt>
                            <dd>{t.infusions}</dd>
                          </div>
                        </dl>
                        <p className={s.teaPrice}>{t.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={`${s.brocade} ${s.brocadeFoot}`} aria-hidden="true">
              <TabbiedPattern
                pattern={drybrush}
                palette={BROCADE}
                fit="grid"
                cellSize={28}
                seed="kettle-foot"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={`${s.roller} ${s.rollerFoot}`} aria-hidden="true" />
          </div>
        </section>

        {/* ------------------------------------------------------ AFTERNOON */}
        <section id="afternoon" className={s.sec} aria-labelledby="afternoon-h">
          <div className={s.secHead}>
            <p className={s.kicker}>Two to five, Wednesday to Sunday</p>
            <h2 id="afternoon-h">Afternoon tea</h2>
            <p className={s.secNote}>
              Three trays. Book the afternoon a day ahead and the long table
              three days ahead; the sweets are made for the seats we have.
            </p>
          </div>

          <ol className={s.sets}>
            {SETS.map((set) => (
              <li key={set.name}>
                <h3 className={s.setName}>{set.name}</h3>
                <div className={s.setBody}>
                  <p className={s.setFor}>{set.who}</p>
                  <ul className={s.setList}>
                    {set.holds.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <p className={s.setPrice}>{set.price}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- ROOM */}
        <section id="room" className={s.sec} aria-labelledby="room-h">
          <div className={s.room}>
            <div className={s.grain} aria-hidden="true">
              <TabbiedPattern
                pattern={roundstep}
                palette={LEAVES}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={34}
                seed="kettle-leaves"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.roomText}>
              <p className={s.kicker}>The room</p>
              <h2 id="room-h">Twelve seats, <em>one kettle at a time</em></h2>
              <p className={s.roomLede}>
                Hana Mori opened the room in 2019 after ten years buying tea for
                other people. The tables are old elm, the cups are from a potter
                in the hills, and nothing is rushed, including you.
              </p>
            </div>
          </div>

          <div className={s.twoCol}>
            <div>
              <h3 className={s.colTitle}>House rules</h3>
              <dl className={s.rules}>
                {RULES.map(([rule, why]) => (
                  <div key={rule}>
                    <dt>{rule}</dt>
                    <dd>{why}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className={s.colTitle}>Brewing at home</h3>
              <ol className={s.brew}>
                {BREW.map(([step, how]) => (
                  <li key={step}>
                    <span className={s.brewStep}>{step}</span>
                    <p>{how}</p>
                  </li>
                ))}
              </ol>
              <p className={s.small}>
                A class on the first Sunday of the month, 10 to 11:30, $25 with a
                pot of whatever you like after.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visit}>
            <div>
              <p className={s.kicker}>Visit</p>
              <h2 id="visit-h">9 Moss Lane</h2>
              <p className={s.address}>
                Hillcrest, behind the persimmon tree. Take your shoes off if you
                like; there are slippers by the door.
              </p>
              <p className={s.contact}>
                <a href="tel:+15550196630">(555) 019-6630</a>
                <br />
                <a href="mailto:pot@kettleandleaf.example">pot@kettleandleaf.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.form} action="#">
              {/* A noren over the booking panel: the brushed cloth, slit in
                  three, the way it hangs in a tea house doorway. */}
              <div className={s.noren} aria-hidden="true">
                <TabbiedPattern
                  pattern={drybrush}
                  palette={NOREN}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={30}
                  seed="kettle-noren"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 className={s.formTitle}>Book a table</h3>
              <div className={s.field}>
                <label htmlFor="kl-name">Name</label>
                <input id="kl-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="kl-email">Email</label>
                <input id="kl-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label htmlFor="kl-date">Day</label>
                  <input id="kl-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label htmlFor="kl-set">Tray</label>
                  <select id="kl-set" name="set" defaultValue="afternoon">
                    <option value="moment">A moment</option>
                    <option value="afternoon">The afternoon</option>
                    <option value="long">The long table</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label htmlFor="kl-seats">Seats</label>
                  <select id="kl-seats" name="seats" defaultValue="2">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                  </select>
                </div>
              </div>
              <button className={s.btn} type="submit">Ask for the table</button>
              <p className={s.small}>We write back within the day. Walk-ins are welcome when there is a seat.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Kettle & Leaf</p>
        <p>A fictional tea room and tea shop. The teas, prices and people are invented.</p>
        <p>The teapot on the scroll is a generated image, drawn in the page's colors.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
