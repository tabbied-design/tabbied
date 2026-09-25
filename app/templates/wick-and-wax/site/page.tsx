import { TabbiedPattern } from 'tabbied/react';
import { bokeh, moleskin, roundpair, teardropleaves } from 'tabbied/patterns';
import s from './wick-and-wax.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Wick & Wax: Candle maker and scent library, Chandler Lane',
  description:
    'Wick & Wax pours nine scents by hand on Chandler Lane, in jars, pillars and travel tins. Read the notes, book a pour-your-own workshop, or find a shop that stocks them.',
};

/* Site colors. A candle is cut out of a pattern whose first color is the
   wax; the photograph's own shading gives it its glass, its tin, its flame. */
const WAX = '#F6F2EC';
const INK = '#231F1C';
const AMBER = '#B8864B';
const HEATHER = '#7C6F8E';
const SMOKE = '#A39A90';
const PALE = '#E8E0D4';

/* teardropleaves paints its ground in the second color, so its first two
   match. */
const HERO_JAR = [AMBER, AMBER, WAX];
const WOODS = [PALE, AMBER, SMOKE];
const FLORALS = [HEATHER, WAX, PALE, AMBER];
const GARDEN = [SMOKE, SMOKE, WAX];
const GLOW = ['transparent', AMBER, HEATHER];
const LEAF_ROW = ['transparent', AMBER, HEATHER, SMOKE];

const NAV = [
  ['Library', '#library'],
  ['Workshop', '#workshop'],
  ['Care', '#care'],
  ['Stockists', '#stockists'],
];

const FORMATS = [
  { name: 'Jar', size: '8 oz, about 50 hours', price: '$34' },
  { name: 'Pillar', size: '3 x 9 in, about 60 hours', price: '$28' },
  { name: 'Travel tin', size: '4 oz, about 25 hours', price: '$18' },
];

type Scent = {
  no: string;
  name: string;
  top: string;
  heart: string;
  base: string;
  mood: string;
  art: string;
  form: string;
  price: string;
};

const WOOD_SCENTS: Scent[] = [
  { no: '01', name: 'Cedar Porch', top: 'Bergamot, black pepper', heart: 'Cedarwood, clove', base: 'Vetiver, a little smoke', mood: 'A screen door, a September evening.', art: 'wick-and-wax-jar', form: 'Jar', price: '$34' },
  { no: '02', name: 'Woodstove', top: 'Orange peel', heart: 'Birch tar, cardamom', base: 'Oud, tonka bean', mood: 'The first fire of the year.', art: 'wick-and-wax-pillar', form: 'Pillar', price: '$28' },
  { no: '03', name: 'Reading Room', top: 'Bay leaf', heart: 'Old paper, leather', base: 'Sandalwood, vanilla', mood: 'A long afternoon in an armchair.', art: 'wick-and-wax-tin', form: 'Tin', price: '$18' },
];

const FLORAL_SCENTS: Scent[] = [
  { no: '04', name: 'Night Garden', top: 'Pear', heart: 'Jasmine, tuberose', base: 'White musk', mood: 'Flowers that open after dark.', art: 'wick-and-wax-jar', form: 'Jar', price: '$34' },
  { no: '05', name: 'Lavender Field', top: 'Lavender, lemon', heart: 'Clary sage', base: 'Tonka bean, hay', mood: 'Dry stalks in a hot July.', art: 'wick-and-wax-pillar', form: 'Pillar', price: '$28' },
  { no: '06', name: 'Rose Hip', top: 'Pink pepper', heart: 'Rose, geranium', base: 'Patchouli', mood: 'The garden in October, going over.', art: 'wick-and-wax-tin', form: 'Tin', price: '$18' },
];

const GARDEN_SCENTS: Scent[] = [
  { no: '07', name: 'Fig Leaf', top: 'Green fig', heart: 'Fig leaf, coconut milk', base: 'Cedar', mood: 'Shade on a wall that holds the heat.', art: 'wick-and-wax-jar', form: 'Jar', price: '$34' },
  { no: '08', name: 'Tomato Vine', top: 'Tomato leaf, basil', heart: 'Vetiver', base: 'Oakmoss', mood: 'Hands that smell of the greenhouse.', art: 'wick-and-wax-tin', form: 'Tin', price: '$18' },
  { no: '09', name: 'Salt and Linen', top: 'Sea salt, lemon', heart: 'Cotton flower, neroli', base: 'Driftwood, musk', mood: 'Sheets drying on a windy line.', art: 'wick-and-wax-pillar', form: 'Pillar', price: '$28' },
];

const SESSIONS = [
  { id: 'oct08', when: 'Thursday Oct 8', time: '6:30 to 8:30 pm', left: '4 places left', full: false },
  { id: 'oct10a', when: 'Saturday Oct 10', time: '11 am to 1 pm', left: '2 places left', full: false },
  { id: 'oct10b', when: 'Saturday Oct 10', time: '2 to 4 pm', left: 'Full, waiting list', full: true },
  { id: 'oct15', when: 'Thursday Oct 15', time: '6:30 to 8:30 pm', left: '8 places left', full: false },
  { id: 'oct18', when: 'Sunday Oct 18', time: '1 to 3 pm', left: '6 places left', full: false },
];

const WORKSHOP_FACTS = [
  ['Length', 'Two hours, at the long bench'],
  ['Price', '$68 a person, everything included'],
  ['You leave with', 'An 8 oz jar and a travel tin'],
  ['Group', 'Up to ten, ages 14 and up'],
];

const CARE = [
  { t: 'The first burn', b: 'Let it burn until the melted pool reaches the edge, two to three hours. Wax remembers: blow it out early and it tunnels from then on.' },
  { t: 'Trim the wick', b: 'To a quarter of an inch before every lighting. A long wick smokes, flickers and blackens the glass.' },
  { t: 'Four hours at most', b: 'Then put it out, let it cool and trim again. The wick mushrooms if it burns all evening.' },
  { t: 'The last half inch', b: 'Stop when half an inch of wax is left, so the glass never gets too hot. Bring the jar back for $4 off the next.' },
];

const STOCKISTS = [
  {
    area: 'In town',
    shops: [
      { name: 'Our studio shop', addr: '9 Chandler Lane, Friday to Sunday, 11 to 5', carry: 'The full library' },
      { name: 'Hartley and Daughter', addr: '112 Market Street', carry: 'Jars and pillars' },
      { name: 'The Paper Mill', addr: '4 Mill Yard', carry: 'Travel tins, gift boxes' },
    ],
  },
  {
    area: 'Up the coast',
    shops: [
      { name: 'Driftline General Store', addr: '27 Harbor Road, Port Ellis', carry: 'Woods and garden' },
      { name: 'Linden and Moss', addr: '8 Station Square, Ashby', carry: 'The full library' },
    ],
  },
  {
    area: 'Hotels and spas',
    shops: [
      { name: 'The Lantern Inn', addr: 'In every room, and at the front desk', carry: 'Reading Room, in tins' },
      { name: 'Salt House Spa', addr: '31 Esplanade', carry: 'Salt and Linen, Lavender Field' },
    ],
  },
];

export default function WickAndWaxPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--wax': '#f6f2ec',
        '--ink': '#231f1c',
        '--amber': '#b8864b',
        '--heather': '#7c6f8e',
        '--smoke': '#a39a90',
        '--pale': '#e8e0d4',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="wax,ink,amber,heather,smoke,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Italiana&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.text" data-edit-max="60">Wick</span>
          <span data-edit="bar.markAmp" data-edit-max="60" className={s.markAmp}>&amp;</span>
          <span data-edit="bar.text2" data-edit-max="60">Wax</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span data-edit="bar.barMeta" data-edit-max="60" className={s.barMeta}>Studio shop Fri-Sun</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A still life in an arched niche: the three ways we pour. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Candle maker, Chandler Lane</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.title} id="hero-h">
              A library of <em>nine scents,</em> poured by hand.
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Soy and beeswax, cotton wicks, and oils blended at the bench one
              batch at a time. Every scent comes three ways, and every card in
              the library tells you what you will smell first, then after an
              hour, then the next morning.
            </p>
            <ul className={s.formats}>
              {FORMATS.map((f, i) => (
                <li key={f.name}>
                  <strong data-edit={`hero.emphasis.${i}`}>{f.name}</strong>
                  <span data-edit={`hero.text.${i}`} data-edit-max="60">{f.size}</span>
                  <span data-edit={`hero.formatPrice.${i}`} data-edit-max="60" className={s.formatPrice}>{f.price}</span>
                </li>
              ))}
            </ul>
            <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#library">Browse the library</a>
          </div>
          <div className={s.niche}>
            <span className={`${s.candleBox} ${s.Pillar} ${s.nichePillar}`}>
              <Artwork data-edit-pattern="hero.field" data-edit-roles="5,2,4" slug="wick-and-wax-pillar" alt="" mode="fill" inks={[]} className={s.candle}>
                <TabbiedPattern
                  pattern={moleskin}
                  palette={WOODS}
                  fit="grid"
                  cellSize={24}
                  seed="hero-pillar"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </Artwork>
            </span>
            <Artwork data-edit-pattern="hero.field2" data-edit-roles="2,2,0" slug="wick-and-wax-jar" alt="A candle in a glass jar, its wax patterned with leaves" mode="fill" inks={[]} className={s.nicheJar}>
              <TabbiedPattern
                pattern={teardropleaves}
                palette={HERO_JAR}
                fit="grid"
                cellSize={40}
                seed="hero-jar"
                style={{ position: 'absolute', inset: 0 }}
              />
            </Artwork>
            <Artwork data-edit-pattern="hero.field3" data-edit-roles="3,0,5,2" slug="wick-and-wax-tin" alt="" mode="fill" inks={[]} className={s.nicheTin}>
              <TabbiedPattern
                pattern={roundpair}
                palette={FLORALS}
                fit="grid"
                cellSize={24}
                options={{ frequency: 0.6 }}
                seed="hero-tin"
                style={{ position: 'absolute', inset: 0 }}
              />
            </Artwork>
            <span className={s.shelf} aria-hidden="true" />
          </div>
        </section>

        {/* --------------------------------------------------------- LIBRARY
            Index cards on three shelves, one shelf to a family of scents. */}
        <section id="library" className={s.library} aria-labelledby="library-h">
          <div className={s.secHead}>
            <p data-edit="library.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>The scent library</p>
            <h2 data-edit="library.title" data-edit-max="60" id="library-h">Nine scents, three shelves</h2>
            <p data-edit="library.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Top notes are what you smell as you lift the lid, the heart once
              the pool has melted, the base what is left in the room tomorrow.
              Every scent is made in all three sizes; the card shows our
              favorite.
            </p>
          </div>

          <div className={s.shelfHead}>
            <span data-edit="library.shelfMark" data-edit-max="60" className={s.shelfMark}>Shelf A</span>
            <h3 data-edit="library.title2" data-edit-max="40">Woods and smoke</h3>
          </div>
          <ul className={s.cards}>
            {WOOD_SCENTS.map((c, i) => (
              <li key={c.no} className={s.card}>
                <div className={s.cardArt}>
                  <span className={`${s.candleBox} ${s[c.form]}`}>
                    <Artwork data-edit-pattern={`library.field.${i}`} data-edit-roles="5,2,4" slug={c.art} alt={`${c.name}, ${c.form}`} mode="fill" inks={[]} className={s.candle}>
                      <TabbiedPattern
                        pattern={moleskin}
                        palette={WOODS}
                        fit="grid"
                        cellSize={24}
                        seed={c.name}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </Artwork>
                  </span>
                </div>
                <div className={s.cardBody}>
                  <span className={s.callNo}>{`No. ${c.no}`}</span>
                  <h4 data-edit={`library.cardName.${i}`} data-edit-max="36" className={s.cardName}>{c.name}</h4>
                  <p data-edit={`library.cardMood.${i}`} data-edit-max="240" data-edit-multiline className={s.cardMood}>{c.mood}</p>
                  <dl className={s.notes}>
                    <div>
                      <dt data-edit={`library.term.${i}`} data-edit-max="28">Top</dt>
                      <dd data-edit={`library.body.${i}`} data-edit-max="200" data-edit-multiline>{c.top}</dd>
                    </div>
                    <div>
                      <dt data-edit={`library.term2.${i}`} data-edit-max="28">Heart</dt>
                      <dd data-edit={`library.body2.${i}`} data-edit-max="200" data-edit-multiline>{c.heart}</dd>
                    </div>
                    <div>
                      <dt data-edit={`library.term3.${i}`} data-edit-max="28">Base</dt>
                      <dd data-edit={`library.body3.${i}`} data-edit-max="200" data-edit-multiline>{c.base}</dd>
                    </div>
                  </dl>
                  <p className={s.cardPrice}>
                    <span data-edit={`library.text.${i}`} data-edit-max="60">{c.form}</span>
                    <strong data-edit={`library.emphasis.${i}`}>{c.price}</strong>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className={s.shelfHead}>
            <span data-edit="library.shelfMark2" data-edit-max="60" className={s.shelfMark}>Shelf B</span>
            <h3 data-edit="library.title3" data-edit-max="40">Flowers</h3>
          </div>
          <ul className={s.cards}>
            {FLORAL_SCENTS.map((c, i) => (
              <li key={c.no} className={s.card}>
                <div className={s.cardArt}>
                  <span className={`${s.candleBox} ${s[c.form]}`}>
                    <Artwork data-edit-pattern={`library.field2.${i}`} data-edit-roles="3,0,5,2" slug={c.art} alt={`${c.name}, ${c.form}`} mode="fill" inks={[]} className={s.candle}>
                      <TabbiedPattern
                        pattern={roundpair}
                        palette={FLORALS}
                        fit="grid"
                        cellSize={24}
                        options={{ frequency: 0.6 }}
                        seed={c.name}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </Artwork>
                  </span>
                </div>
                <div className={s.cardBody}>
                  <span className={s.callNo}>{`No. ${c.no}`}</span>
                  <h4 data-edit={`library.cardName2.${i}`} data-edit-max="36" className={s.cardName}>{c.name}</h4>
                  <p data-edit={`library.cardMood2.${i}`} data-edit-max="240" data-edit-multiline className={s.cardMood}>{c.mood}</p>
                  <dl className={s.notes}>
                    <div>
                      <dt data-edit={`library.term4.${i}`} data-edit-max="28">Top</dt>
                      <dd data-edit={`library.body4.${i}`} data-edit-max="200" data-edit-multiline>{c.top}</dd>
                    </div>
                    <div>
                      <dt data-edit={`library.term5.${i}`} data-edit-max="28">Heart</dt>
                      <dd data-edit={`library.body5.${i}`} data-edit-max="200" data-edit-multiline>{c.heart}</dd>
                    </div>
                    <div>
                      <dt data-edit={`library.term6.${i}`} data-edit-max="28">Base</dt>
                      <dd data-edit={`library.body6.${i}`} data-edit-max="200" data-edit-multiline>{c.base}</dd>
                    </div>
                  </dl>
                  <p className={s.cardPrice}>
                    <span data-edit={`library.text2.${i}`} data-edit-max="60">{c.form}</span>
                    <strong data-edit={`library.emphasis2.${i}`}>{c.price}</strong>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className={s.shelfHead}>
            <span data-edit="library.shelfMark3" data-edit-max="60" className={s.shelfMark}>Shelf C</span>
            <h3 data-edit="library.title4" data-edit-max="40">Kitchen garden</h3>
          </div>
          <ul className={s.cards}>
            {GARDEN_SCENTS.map((c, i) => (
              <li key={c.no} className={s.card}>
                <div className={s.cardArt}>
                  <span className={`${s.candleBox} ${s[c.form]}`}>
                    <Artwork data-edit-pattern={`library.field3.${i}`} data-edit-roles="4,4,0" slug={c.art} alt={`${c.name}, ${c.form}`} mode="fill" inks={[]} className={s.candle}>
                      <TabbiedPattern
                        pattern={teardropleaves}
                        palette={GARDEN}
                        fit="grid"
                        cellSize={26}
                        seed={c.name}
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </Artwork>
                  </span>
                </div>
                <div className={s.cardBody}>
                  <span className={s.callNo}>{`No. ${c.no}`}</span>
                  <h4 data-edit={`library.cardName3.${i}`} data-edit-max="36" className={s.cardName}>{c.name}</h4>
                  <p data-edit={`library.cardMood3.${i}`} data-edit-max="240" data-edit-multiline className={s.cardMood}>{c.mood}</p>
                  <dl className={s.notes}>
                    <div>
                      <dt data-edit={`library.term7.${i}`} data-edit-max="28">Top</dt>
                      <dd data-edit={`library.body7.${i}`} data-edit-max="200" data-edit-multiline>{c.top}</dd>
                    </div>
                    <div>
                      <dt data-edit={`library.term8.${i}`} data-edit-max="28">Heart</dt>
                      <dd data-edit={`library.body8.${i}`} data-edit-max="200" data-edit-multiline>{c.heart}</dd>
                    </div>
                    <div>
                      <dt data-edit={`library.term9.${i}`} data-edit-max="28">Base</dt>
                      <dd data-edit={`library.body9.${i}`} data-edit-max="200" data-edit-multiline>{c.base}</dd>
                    </div>
                  </dl>
                  <p className={s.cardPrice}>
                    <span data-edit={`library.text3.${i}`} data-edit-max="60">{c.form}</span>
                    <strong data-edit={`library.emphasis3.${i}`}>{c.price}</strong>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p data-edit="library.libraryNote" data-edit-max="240" data-edit-multiline className={s.libraryNote}>
            Order any scent in any size from the studio shop or by email. Three
            candles or more ship free; bring an empty jar back for $4 off.
          </p>
        </section>

        {/* -------------------------------------------------------- WORKSHOP
            Candlelight: soft amber rounds over the ink, and the booking. */}
        <section id="workshop" className={s.workshop} aria-labelledby="workshop-h">
          <div data-edit-pattern="workshop.field" data-edit-roles="transparent,2,3" className={s.glow} aria-hidden="true">
            <TabbiedPattern
              pattern={bokeh}
              palette={GLOW}
              fit="grid"
              cellSize={90}
              seed="bench-light"
              options={{ frequency: 0.5 }}
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.workshopInner}>
            <div className={s.workshopText}>
              <p data-edit="workshop.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Pour your own</p>
              <h2 data-edit="workshop.title" data-edit-max="60" id="workshop-h">Blend a scent, pour a candle, take it home.</h2>
              <p data-edit="workshop.workshopLede" data-edit-max="240" data-edit-multiline className={s.workshopLede}>
                Smell twenty oils, build a blend from a top, a heart and a base,
                and pour it into a jar and a tin at our long bench. We cure
                them for you and they are ready to collect a week later.
              </p>
              <dl className={s.facts}>
                {WORKSHOP_FACTS.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`workshop.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`workshop.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="workshop.private" data-edit-max="240" data-edit-multiline className={s.private}>
                A birthday, a team, a bachelorette party? Book the whole bench for six to
                ten people on any evening, $60 a person.
              </p>
            </div>
            <form className={s.form} action="#">
              <fieldset className={s.sessions}>
                <legend data-edit="workshop.legend">Choose a session</legend>
                {SESSIONS.map((se, i) => (
                  <label key={se.id} className={s.session}>
                    <input type="radio" name="session" value={se.id} disabled={se.full} />
                    <span data-edit={`workshop.sessionWhen.${i}`} data-edit-max="60" className={s.sessionWhen}>{se.when}</span>
                    <span data-edit={`workshop.sessionTime.${i}`} data-edit-max="60" className={s.sessionTime}>{se.time}</span>
                    <span data-edit={`workshop.sessionLeft.${i}`} data-edit-max="60" className={s.sessionLeft}>{se.left}</span>
                  </label>
                ))}
              </fieldset>
              <div className={s.formRow}>
                <div className={s.field}>
                  <label data-edit="workshop.label" htmlFor="wick-name">Name</label>
                  <input id="wick-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="workshop.label2" htmlFor="wick-people">People</label>
                  <select id="wick-people" name="people" defaultValue="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div className={s.field}>
                <label data-edit="workshop.label3" htmlFor="wick-email">Email</label>
                <input id="wick-email" name="email" type="email" autoComplete="email" />
              </div>
              <button data-edit="workshop.submit" data-edit-max="24" className={s.submit} type="submit">Book my places</button>
              <small data-edit="workshop.formNote" className={s.formNote}>Pay on the day. Cancel up to 48 hours before for a full refund.</small>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------ CARE */}
        <section id="care" className={s.care} aria-labelledby="care-h">
          <div className={s.secHead}>
            <p data-edit="care.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Burn well</p>
            <h2 data-edit="care.title" data-edit-max="60" id="care-h">Four rules for a clean burn</h2>
            <p data-edit="care.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A good candle burned badly smokes, tunnels and wastes half its
              wax. These are printed under every lid, too.
            </p>
          </div>
          <ol className={s.careList}>
            {CARE.map((c, i) => (
              <li key={c.t}>
                <h3 data-edit={`care.title2.${i}`} data-edit-max="40">{c.t}</h3>
                <p data-edit={`care.body.${i}`} data-edit-max="240" data-edit-multiline>{c.b}</p>
              </li>
            ))}
          </ol>
          <div className={s.careBand} aria-hidden="true">
            <TabbiedPattern
              pattern={roundpair}
              palette={LEAF_ROW}
              fit="grid"
              cellSize={28}
              options={{ frequency: 0.55 }}
              seed="care-label"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ------------------------------------------------------- STOCKISTS */}
        <section id="stockists" className={s.stockists} aria-labelledby="stockists-h">
          <div className={s.secHead}>
            <p data-edit="stockists.secKick" data-edit-max="240" data-edit-multiline className={s.secKick}>Stockists</p>
            <h2 data-edit="stockists.title" data-edit-max="60" id="stockists-h">Where to smell them first</h2>
            <p data-edit="stockists.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every shop below keeps testers open on the counter. For wholesale,
              write to trade@wickandwax.example with the name of your shop.
            </p>
          </div>
          <div className={s.areas}>
            {STOCKISTS.map((a, i) => (
              <div key={a.area} className={s.area}>
                <h3 data-edit={`stockists.title2.${i}`} data-edit-max="40">{a.area}</h3>
                <ul>
                  {a.shops.map((sh, i2) => (
                    <li key={sh.name}>
                      <strong data-edit={`stockists.emphasis.${i}.${i2}`}>{sh.name}</strong>
                      <span data-edit={`stockists.text.${i}.${i2}`} data-edit-max="60">{sh.addr}</span>
                      <small data-edit={`stockists.note.${i}.${i2}`}>{sh.carry}</small>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGlow} aria-hidden="true">
          <TabbiedPattern
            pattern={bokeh}
            palette={GLOW}
            fit="grid"
            cellSize={72}
            seed="footer-light"
            options={{ frequency: 0.5 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footTop}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Wick &amp; Wax</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
            9 Chandler Lane
            <br />
            hello@wickandwax.example
            <br />
            (555) 016-2841
          </p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional candle maker. Scents, shops and prices are invented.</p>
          <p className={s.credit}>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
