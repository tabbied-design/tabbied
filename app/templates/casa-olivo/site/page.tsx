import { TabbiedPattern } from 'tabbied/react';
import { evolute, roundcut } from 'tabbied/patterns';
import s from './casa-olivo.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Casa Olivo: Tapas bar, Alameda Street',
  description:
    'Casa Olivo is a tapas bar on Alameda Street in Old Mill. Twenty plates on the tile wall, sherry and vermouth by the glass, flamenco every Thursday and a long table for groups.',
};

/* Site colors. The tile fields are glazed in cobalt with the stars left
   in lime and pale glaze; the sherry panel is fired in clay instead. */
const LIME = '#f4ecdc';
const COBALT = '#1f3c88';
const CLAY = '#a9442a';
const GLAZE = '#c7d3ea';

const PLAQUE = [COBALT, LIME, GLAZE, LIME];
const FRIEZE = [LIME, COBALT, COBALT, GLAZE];
const FIRED = [CLAY, LIME, GLAZE, LIME];
const FANS = ['transparent', LIME, COBALT, GLAZE, LIME];

const NAV = [
  ['Tapas', '#tapas'],
  ['Sherry and vermouth', '#copa'],
  ['Flamenco', '#flamenco'],
  ['Groups', '#groups'],
  ['Visit', '#visit'],
];

const FACTS = [
  ['Kitchen', '5 pm to 11 pm, Tuesday to Sunday'],
  ['The bar', 'Half the room is kept for walk-ins'],
  ['Thursdays', 'Flamenco at 9, no cover charge'],
];

const HOW = [
  ['Order at the bar or from your table', 'There is no set order to a meal here. Ask for two or three plates, see how you feel, ask for more.'],
  ['Three plates between two', 'That is lunch. Five between two is dinner. The kitchen sends each plate out the moment it is ready.'],
  ['Bread is free, the olives are not', 'Pan con tomate is its own dish. Plain bread for the sauces comes with any hot plate.'],
];

type Dish = { no: string; name: string; note: string; price: string; mark?: string };
type Group = { title: string; english: string; dishes: Dish[] };

/* Twenty tiles on the wall: four title tiles and sixteen plates. At four
   across they fill five courses exactly. */
const MENU: Group[] = [
  {
    title: 'Frías',
    english: 'Cold, from the counter',
    dishes: [
      { no: '01', name: 'Pan con tomate', note: 'Toast rubbed with garlic and ripe tomato, olive oil, salt', price: '$6', mark: 'V' },
      { no: '02', name: 'Jamón serrano', note: 'Eighteen months, carved by hand to order, 50 g', price: '$14' },
      { no: '03', name: 'Manchego y membrillo', note: 'Aged sheep\'s cheese with quince paste', price: '$9', mark: 'V' },
      { no: '04', name: 'Boquerones', note: 'White anchovies in vinegar, garlic and parsley', price: '$9' },
      { no: '05', name: 'Aceitunas', note: 'Our own marinade: orange peel, fennel, a little chili', price: '$5', mark: 'V' },
    ],
  },
  {
    title: 'Calientes',
    english: 'Hot, from the stove',
    dishes: [
      { no: '06', name: 'Patatas bravas', note: 'Fried potatoes, smoked paprika sauce, aioli', price: '$8', mark: 'V' },
      { no: '07', name: 'Tortilla española', note: 'Potato and onion, cooked just set, by the wedge', price: '$7', mark: 'V' },
      { no: '08', name: 'Croquetas de jamón', note: 'Ham and béchamel, crisp outside, four to a plate', price: '$9' },
      { no: '09', name: 'Pimientos de Padrón', note: 'Blistered, sea salt. About one in ten is hot', price: '$8', mark: 'V' },
      { no: '10', name: 'Chorizo a la sidra', note: 'Cooked slowly in dry cider until it is sticky', price: '$10' },
      { no: '11', name: 'Espinacas con garbanzos', note: 'Spinach, chickpeas, cumin and fried bread, Sevilla style', price: '$8', mark: 'V' },
    ],
  },
  {
    title: 'Del mar',
    english: 'From the sea',
    dishes: [
      { no: '12', name: 'Gambas al ajillo', note: 'Shrimp, garlic and chili, still spitting in the clay dish', price: '$14' },
      { no: '13', name: 'Pulpo a la gallega', note: 'Octopus on sliced potato, paprika, olive oil', price: '$16' },
      { no: '14', name: 'Calamares', note: 'Fried squid rings, lemon, aioli on the side', price: '$12' },
    ],
  },
  {
    title: 'Dulces',
    english: 'To finish',
    dishes: [
      { no: '15', name: 'Churros con chocolate', note: 'Fried to order, a cup of thick chocolate to dip', price: '$8', mark: 'V' },
      { no: '16', name: 'Tarta de Santiago', note: 'Almond cake from Galicia, no flour at all', price: '$7', mark: 'V' },
    ],
  },
];

const LEVELS = ['1', '2', '3', '4', '5'];

type Sherry = { name: string; note: string; glass: string; sweet: number };

const SHERRY: Sherry[] = [
  { name: 'Manzanilla', note: 'From Sanlúcar, by the sea. Salty, pale, bone dry', glass: '$7', sweet: 1 },
  { name: 'Fino', note: 'Bread and almonds. Drink it cold with the jamón', glass: '$7', sweet: 1 },
  { name: 'Amontillado', note: 'A fino left to age on. Hazelnut, still dry', glass: '$9', sweet: 2 },
  { name: 'Palo cortado', note: 'The rare one, somewhere between the two above and below', glass: '$12', sweet: 2 },
  { name: 'Oloroso', note: 'Walnut and orange peel, round but not sweet', glass: '$9', sweet: 3 },
  { name: 'Cream', note: 'Oloroso sweetened with a little Pedro Ximénez', glass: '$8', sweet: 4 },
  { name: 'Pedro Ximénez', note: 'Raisins and syrup. Order it with the churros', glass: '$9', sweet: 5 },
];

const VERMUT = [
  ['Vermut rojo on tap', 'Over ice, orange slice, one olive', '$8'],
  ['Vermut blanco on tap', 'Over ice, lemon peel', '$8'],
  ['Vermut and soda', 'Tall, with a splash of siphon soda', '$9'],
];

type Night = { day: string; month: string; toque: string; cante: string; baile: string };

const NIGHTS: Night[] = [
  { day: '01', month: 'Oct', toque: 'Tomás Arjona', cante: 'Rocío Bernal', baile: 'Lucía Ferrer' },
  { day: '08', month: 'Oct', toque: 'Tomás Arjona', cante: 'Paco Linares', baile: 'no dancer this week' },
  { day: '15', month: 'Oct', toque: 'Inés Carmona', cante: 'Rocío Bernal', baile: 'Andrés Vela' },
  { day: '22', month: 'Oct', toque: 'Tomás Arjona', cante: 'Paco Linares', baile: 'Lucía Ferrer' },
  { day: '29', month: 'Oct', toque: 'Inés Carmona', cante: 'guest from Jerez', baile: 'Andrés Vela' },
];

const FLAMENCO_RULES = [
  'Two sets, at 9:00 and 10:15. Each runs about forty minutes.',
  'No cover. Tables near the floor ask a $20 minimum each.',
  'Please keep talk low while they sing. Clap only if you know the compás.',
];

const GROUP_MENUS = [
  {
    name: 'Para compartir',
    price: '$38',
    per: 'a head, 6 to 12 people',
    items: ['Aceitunas and pan con tomate', 'Jamón and manchego board', 'Patatas bravas, tortilla, croquetas', 'Gambas al ajillo', 'Churros to finish'],
  },
  {
    name: 'La mesa larga',
    price: '$56',
    per: 'a head, 10 to 20 people',
    items: ['Everything in Para compartir', 'Pulpo a la gallega and calamares', 'Paella for the table, made to order', 'Tarta de Santiago', 'A glass of fino on arrival'],
  },
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Thursday', '5 pm to 11 pm'],
  ['Friday and Saturday', '5 pm to midnight'],
  ['Sunday', '12 to 10 pm'],
];

const QUESTIONS = [
  ['Do you take reservations?', 'For tables of two to six, yes, up to three weeks ahead. The bar and the high tables by the window are always walk-in.'],
  ['What can vegetarians eat?', 'Everything marked V on the wall, which is nine plates. Ask for the bravas without aioli and they are vegan too.'],
  ['Is there gluten in the kitchen?', 'Flour is everywhere: croquetas, calamares and churros are all fried in the same oil. We can steer you but cannot promise.'],
  ['Can we bring children?', 'Until 8 pm, gladly. After that, and every Thursday, it is a bar.'],
];

export default function CasaOlivoPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gloock&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Casa Olivo</a>
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
        {/* ------------------------------------------------------ THE PLAQUE */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={evolute}
              palette={PLAQUE}
              fit="grid"
              cellSize={88}
              seed="casa-olivo-plaque"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.plaque}>
            <p className={s.street}>No. 412, Alameda Street</p>
            <h1 id="hero-h" className={s.name}>Casa Olivo</h1>
            <p className={s.kind}>Bar de tapas</p>
            <p className={s.lede}>
              Small plates from the stove and the counter, sherry poured cold,
              vermouth from the tap and a guitar on Thursdays. Come in, stand
              at the bar, order a little at a time.
            </p>
          </div>
        </section>

        <ul className={s.facts}>
          {FACTS.map(([k, v]) => (
            <li key={k}>
              <strong>{k}</strong>
              <span>{v}</span>
            </li>
          ))}
        </ul>

        {/* ------------------------------------------------------- HOW TO EAT */}
        <section className={s.how} aria-labelledby="how-h">
          <h2 id="how-h" className={s.howTitle}>How tapas work here</h2>
          <ol className={s.howList}>
            {HOW.map(([t, d]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------- THE WALL */}
        <section id="tapas" className={s.tapas} aria-labelledby="tapas-h">
          <div className={s.frieze} aria-hidden="true">
            <TabbiedPattern
              pattern={evolute}
              palette={FRIEZE}
              fit="grid"
              cellSize={44}
              seed="casa-olivo-frieze"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.secHead}>
            <p className={s.eyebrow}>La pared</p>
            <h2 id="tapas-h">Sixteen plates <em>on the wall</em></h2>
            <p className={s.secNote}>
              Each tile is a plate, numbered the way they are painted behind
              the bar, so you can point. V is vegetarian. The wall changes with
              the market; these are the plates for autumn.
            </p>
          </div>

          <div className={s.wall}>
            {MENU.map((g) => (
              <div className={s.course} key={g.title}>
                <div className={s.titleTile}>
                  <h3>{g.title}</h3>
                  <p>{g.english}</p>
                </div>
                <ul className={s.plates} role="list">
                  {g.dishes.map((d) => (
                    <li key={d.no} className={s.tile}>
                      <span className={s.no}>{d.no}</span>
                      <h4 className={s.dish}>{d.name}</h4>
                      <p className={s.dishNote}>{d.note}</p>
                      <p className={s.dishFoot}>
                        <span className={s.price}>{d.price}</span>
                        <span className={s.veg}>{d.mark}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={s.wallNote}>
            Bread for the sauces comes free with any hot plate. Ask for the
            day's paella at the bar: when it is gone, it is gone.
          </p>
        </section>

        {/* ------------------------------------------------------- POR COPA */}
        <section id="copa" className={s.copa} aria-labelledby="copa-h">
          <div className={s.copaSide}>
            <div className={s.secHead}>
              <p className={s.eyebrow}>Por copa</p>
              <h2 id="copa-h">Sherry, <em>driest first</em></h2>
              <p className={s.secNote}>
                Seven sherries by the glass, poured cold into a copita to the
                line. Read down the list and the wine gets older, darker and
                finally sweet.
              </p>
            </div>
            <div className={s.arch}>
              <div className={s.fired} aria-hidden="true">
                <TabbiedPattern
                  pattern={evolute}
                  palette={FIRED}
                  fit="grid"
                  cellSize={64}
                  seed="casa-olivo-fired"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.archPanel}>
                <Artwork
                  slug="casa-olivo-copita"
                  alt="A tulip-shaped sherry copita beside a tall sherry bottle, painted like a tile"
                  inks={['var(--cobalt-type)']}
                  className={s.copita}
                />
              </div>
            </div>
          </div>

          <div className={s.copaList}>
            <div className={s.scaleHead} aria-hidden="true">
              <span>Dry</span>
              <span>Sweet</span>
            </div>
            <ol className={s.sherries}>
              {SHERRY.map((w) => (
                <li key={w.name}>
                  <div className={s.wine}>
                    <h3>{w.name}</h3>
                    <p>{w.note}</p>
                  </div>
                  <div className={s.scale}>
                    {LEVELS.map((l, j) => (
                      <span key={l} className={j < w.sweet ? s.full : s.empty} />
                    ))}
                    <span className={s.srOnly}>{`Sweetness ${w.sweet} of 5`}</span>
                  </div>
                  <span className={s.glass}>{w.glass}</span>
                </li>
              ))}
            </ol>

            <div className={s.vermut}>
              <h3 className={s.vermutTitle}>Vermut, from the tap</h3>
              <ul className={s.vermutList}>
                {VERMUT.map(([n, d, p]) => (
                  <li key={n}>
                    <strong>{n}</strong>
                    <span>{d}</span>
                    <span className={s.glass}>{p}</span>
                  </li>
                ))}
              </ul>
              <p className={s.vermutHour}>
                La hora del vermut: Sundays from noon to 3, every vermouth comes
                with a free saucer of olives and potato chips.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- FLAMENCO */}
        <section id="flamenco" className={s.flamenco} aria-labelledby="flamenco-h">
          <div className={s.fans} aria-hidden="true">
            <TabbiedPattern
              pattern={roundcut}
              palette={FANS}
              fit="grid"
              cellSize={72}
              seed="casa-olivo-fans"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.cartel}>
            <p className={s.cartelKicker}>Jueves flamenco, 9 pm</p>
            <h2 id="flamenco-h" className={s.cartelTitle}>Every Thursday, a guitar, a voice and the floor</h2>
            <p className={s.cartelNote}>
              The back of the room is cleared at half past eight. The same small
              company has played here since we opened, with a guest now and then.
            </p>
            <ol className={s.nights}>
              {NIGHTS.map((n) => (
                <li key={n.day}>
                  <p className={s.date}>
                    <span className={s.dateDay}>{n.day}</span>
                    <span className={s.dateMonth}>{n.month}</span>
                  </p>
                  <dl className={s.lineup}>
                    <div>
                      <dt>Toque</dt>
                      <dd>{n.toque}</dd>
                    </div>
                    <div>
                      <dt>Cante</dt>
                      <dd>{n.cante}</dd>
                    </div>
                    <div>
                      <dt>Baile</dt>
                      <dd>{n.baile}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>
            <ul className={s.rules}>
              {FLAMENCO_RULES.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- GROUPS */}
        <section id="groups" className={s.groups} aria-labelledby="groups-h">
          <div className={s.secHead}>
            <p className={s.eyebrow}>La mesa larga</p>
            <h2 id="groups-h">Groups at <em>the long table</em></h2>
            <p className={s.secNote}>
              The back room seats twenty at one table, Sunday to Wednesday. For
              six or more we cook a set run of plates so nobody has to order for
              everyone. Tell us about allergies when you book.
            </p>
          </div>
          <div className={s.menus}>
            {GROUP_MENUS.map((m) => (
              <article key={m.name} className={s.menuCard}>
                <h3>{m.name}</h3>
                <p className={s.menuPrice}>
                  <strong>{m.price}</strong>
                  <span>{m.per}</span>
                </p>
                <ul>
                  {m.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={s.small}>
            A deposit of $10 a head holds the room. Paella for the table needs a
            day's notice and at least four people.
          </p>
        </section>

        {/* ---------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInfo}>
            <div className={s.secHead}>
              <p className={s.eyebrow}>Dónde estamos</p>
              <h2 id="visit-h">Find us on <em>Alameda Street</em></h2>
            </div>
            <p className={s.address}>
              412 Alameda Street, Old Mill
              <br />
              across from the laundry with the blue door
            </p>
            <p className={s.address}>
              <a href="tel:+15550148832">(555) 014-8832</a>
              <br />
              <a href="mailto:mesa@casaolivo.example">mesa@casaolivo.example</a>
            </p>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <div className={s.faq}>
              {QUESTIONS.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>

          <form className={s.form} action="#">
            <h3 className={s.formTitle}>Book a table</h3>
            <p className={s.formNote}>Two to six people. For more, see the long table above.</p>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label htmlFor="olivo-name">Name</label>
                <input id="olivo-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="olivo-phone">Phone</label>
                <input id="olivo-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label htmlFor="olivo-date">Day</label>
                <input id="olivo-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label htmlFor="olivo-time">Time</label>
                <select id="olivo-time" name="time" defaultValue="19:30">
                  <option value="17:00">5:00 pm</option>
                  <option value="18:30">6:30 pm</option>
                  <option value="19:30">7:30 pm</option>
                  <option value="20:45">8:45 pm</option>
                  <option value="21:30">9:30 pm</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="olivo-size">People</label>
                <select id="olivo-size" name="size" defaultValue="2">
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="olivo-seat">Where</label>
                <select id="olivo-seat" name="seat" defaultValue="any">
                  <option value="any">Anywhere</option>
                  <option value="floor">Near the floor (Thursdays)</option>
                  <option value="quiet">The quiet corner</option>
                </select>
              </div>
            </div>
            <button className={s.submit} type="submit">Ask for the table</button>
            <p className={s.small}>We confirm by text within the hour. Tables are held fifteen minutes.</p>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={evolute}
            palette={PLAQUE}
            fit="grid"
            cellSize={44}
            seed="casa-olivo-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p className={s.footName}>Casa Olivo</p>
        <p>A fictional tapas bar. The dishes, prices, musicians and hours are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
        <p>The copita and the bottle are a generated picture, drawn in the page's own colors.</p>
      </footer>
    </div>
  );
}
