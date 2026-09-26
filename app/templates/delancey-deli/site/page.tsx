import { TabbiedPattern } from 'tabbied/react';
import { dotmatrix } from 'tabbied/patterns';
import s from './delancey-deli.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Delancey Deli: Sandwich deli, Delancey Row',
  description:
    'Delancey Deli slices pastrami, corned beef and smoked fish to order on Delancey Row. The board, a sandwich you build yourself, catering trays, how the counter works and the hours.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The tiled wall
   is the dotmatrix field: small glazed squares on a transparent ground, so
   the wall's own green is the grout between them. The tray liner is the
   same lattice in paper and red, like the checked sheet a platter sits on. */
const PAPER = '#f6f2e9';
const RED = '#c63b2c';
const MUSTARD = '#e0a530';

const WALL = ['transparent', PAPER, PAPER, PAPER, PAPER, MUSTARD];
const LINER = ['transparent', PAPER];
const STRIP = ['transparent', MUSTARD, PAPER, MUSTARD, RED];

const NAV = [
  ['The board', '#board'],
  ['Build one', '#build'],
  ['The counter', '#counter'],
  ['Catering', '#catering'],
  ['Slicers', '#slicers'],
  ['Hours', '#hours'],
];

/* The house order, printed as the hero's receipt. */
const HOUSE = [
  { qty: '1', item: 'Pastrami on rye', note: 'hand cut, mustard, no argument', price: '18.50' },
  { qty: '1', item: 'Full sour pickle', note: 'on every table, always free', price: '0.00' },
  { qty: '1', item: 'Potato knish', note: 'baked, not fried', price: '5.75' },
  { qty: '1', item: 'Egg cream', note: 'chocolate, stirred to order', price: '4.50' },
];

type Line = { no: string; item: string; note: string; price: string };

const HOT: Line[] = [
  { no: '01', item: 'Pastrami on rye', note: 'Navel cut, smoked 14 hours, sliced warm', price: '18.50' },
  { no: '02', item: 'Corned beef on rye', note: 'Brisket brined ten days in the basement', price: '17.50' },
  { no: '03', item: 'The Reuben', note: 'Corned beef, kraut, swiss, russian, grilled', price: '19.00' },
  { no: '04', item: 'Brisket on a kaiser', note: 'Braised in onions, gravy on the side', price: '17.00' },
  { no: '05', item: 'Hot turkey', note: 'Roasted here Monday and Thursday', price: '15.50' },
  { no: '06', item: 'Tongue on rye', note: 'Thursdays, until it runs out', price: '16.00' },
];

const COLD: Line[] = [
  { no: '07', item: 'Lox on a bialy', note: 'Cream cheese, red onion, capers', price: '15.00' },
  { no: '08', item: 'Whitefish salad', note: 'On a bagel, with a slice of tomato', price: '13.50' },
  { no: '09', item: 'Chopped liver', note: 'Schmaltz, egg, onion, on rye', price: '12.50' },
  { no: '10', item: 'Egg salad', note: 'Chives and a lot of pepper', price: '9.50' },
  { no: '11', item: 'Tuna and celery', note: 'Lemon, no mayonnaise mountain', price: '10.50' },
  { no: '12', item: 'The Grand Street', note: 'Roast peppers, muenster, pickled onion', price: '12.00' },
];

const SIDES: Line[] = [
  { no: '13', item: 'Matzo ball soup', note: 'Cup or bowl, one ball or two', price: '6.50 / 9.50' },
  { no: '14', item: 'Potato knish', note: 'With brown mustard', price: '5.75' },
  { no: '15', item: 'Latkes, three', note: 'Applesauce and sour cream', price: '8.00' },
  { no: '16', item: 'Egg cream', note: 'Chocolate or vanilla', price: '4.50' },
  { no: '17', item: 'Cel-ray soda', note: 'Celery soda. Try it once', price: '3.25' },
  { no: '18', item: 'Black and white', note: 'The cookie, half and half', price: '3.75' },
];

type Choice = { label: string; price: string };
type Step = { name: string; legend: string; kind: 'radio' | 'checkbox'; choices: Choice[] };

const BUILD: Step[] = [
  {
    name: 'bread',
    legend: 'Bread, pick one',
    kind: 'radio',
    choices: [
      { label: 'Rye, seeded', price: '0.00' },
      { label: 'Rye, plain', price: '0.00' },
      { label: 'Club roll', price: '0.00' },
      { label: 'Kaiser', price: '0.50' },
      { label: 'Bialy', price: '0.75' },
      { label: 'Sealed gluten-free', price: '1.50' },
    ],
  },
  {
    name: 'meat',
    legend: 'Meat, by the quarter pound',
    kind: 'checkbox',
    choices: [
      { label: 'Pastrami', price: '8.00' },
      { label: 'Corned beef', price: '7.50' },
      { label: 'Brisket', price: '7.50' },
      { label: 'Roast turkey', price: '6.50' },
      { label: 'Hard salami', price: '6.00' },
      { label: 'Tongue, Thursdays', price: '8.50' },
    ],
  },
  {
    name: 'cheese',
    legend: 'Cheese',
    kind: 'checkbox',
    choices: [
      { label: 'Swiss', price: '1.25' },
      { label: 'Muenster', price: '1.25' },
      { label: 'Provolone', price: '1.25' },
      { label: 'American', price: '1.00' },
    ],
  },
  {
    name: 'dressed',
    legend: 'Dressed',
    kind: 'checkbox',
    choices: [
      { label: 'Brown mustard', price: '0.00' },
      { label: 'Russian dressing', price: '0.50' },
      { label: 'Coleslaw on it', price: '1.00' },
      { label: 'Sauerkraut', price: '1.00' },
      { label: 'Pickled onion', price: '0.75' },
      { label: 'Schmaltz', price: '0.50' },
    ],
  },
];

const REGULARS = [
  ['The 01', 'Seeded rye, pastrami x2, brown mustard'],
  ['The Hy', 'Plain rye, pastrami, corned beef, russian'],
  ['The Rosa', 'Kaiser, brisket x2, pickled onion, schmaltz'],
  ['The Monday', 'Club roll, turkey x2, swiss, slaw on it'],
];

const STEPS = [
  ['Pull a number', 'From the red wheel by the door. Keep hold of it; we call numbers, not names.'],
  ['Order at the slicer', 'When your number is up, tell the slicer what you want. Ask for a taste. Everybody does.'],
  ['Take your ticket', 'The slicer writes your ticket and wraps your order. Carry both to the register.'],
  ['Pay and sit anywhere', 'Cash or card, no minimum. Pickles and slaw are on every table and refills are free.'],
];

const WAITS = [
  ['Weekdays before 11', 'No wait'],
  ['Weekdays 12 to 2', '10-15 min'],
  ['Saturday 11 to 3', '20-30 min'],
  ['Sunday brunch', '25-40 min'],
  ['Any day after 4', 'No wait'],
];

type Tray = { code: string; name: string; serves: string; lines: string[]; price: string };

const TRAYS: Tray[] = [
  {
    code: 'A',
    name: 'The lunch tray',
    serves: 'Serves 10',
    lines: ['20 half sandwiches, your pick of six', 'Half and full sour pickles', 'Coleslaw and potato salad', 'Mustards, napkins, a knife'],
    price: '165.00',
  },
  {
    code: 'B',
    name: 'The platter',
    serves: 'Serves 15-20',
    lines: ['3 lb pastrami, 2 lb corned beef', '2 lb turkey, sliced thin', 'Two rye loaves and a dozen rolls', 'Pickles, slaw, three mustards'],
    price: '265.00',
  },
  {
    code: 'C',
    name: 'The morning board',
    serves: 'Serves 12',
    lines: ['1.5 lb lox, 1 lb whitefish salad', 'Two dozen bagels, sliced', 'Three tubs of cream cheese', 'Tomato, red onion, capers, lemon'],
    price: '240.00',
  },
];

const TRAY_TERMS = [
  ['Notice', '48 hours. Call if it is sooner; we can usually do 24.'],
  ['Delivery', '$15 within three miles, free over $300. We set up over $400.'],
  ['Trays', 'Real trays, not plastic. Back to us within a week, or $20 each.'],
  ['Shiva', 'We deliver the morning board to the house and leave the invoice.'],
];

const SLICERS = [
  { id: '01', name: 'Hy Adler', role: 'Owner, third generation', since: 'Slicing since 1988', note: 'Cuts the pastrami for the first hour every morning. Will tell you about his grandfather.' },
  { id: '02', name: 'Rosa Quintero', role: 'Head slicer', since: 'Here since 2011', note: 'Ask her for it fatty. She will tell you that you made the right call.' },
  { id: '03', name: 'Deshawn Pike', role: 'Grill and soup', since: 'Here since 2018', note: 'Makes the Reubens and the matzo balls, which are the size of a fist on purpose.' },
  { id: '04', name: 'Miriam Adler', role: 'Register and catering', since: 'Here since 1994', note: 'Hy\'s sister. Every tray order goes through her notebook, which has never lost one.' },
];

const HOURS = [
  ['Monday', '8:00-4:00'],
  ['Tuesday to Friday', '7:30-7:00'],
  ['Saturday', '8:00-7:00'],
  ['Sunday', '8:00-5:00'],
];

const FINE_PRINT = [
  ['Is it kosher?', 'Kosher-style, not kosher. We put cheese on the Reuben and we are open on Saturday. The meat comes from a kosher packer; what we do with it after is our business.'],
  ['Can I get it lean?', 'You can ask for lean and we will cut it lean. The fat is where the flavor is, and Rosa will say so.'],
  ['Do you split sandwiches?', 'Yes, cut and plated in two for a dollar. A pastrami on rye is half a pound of meat, so it is usually a good idea.'],
  ['Gluten-free?', 'We keep a sealed gluten-free bread and use a clean board for it, but there is rye flour in the air behind the counter. We cannot promise more than that.'],
  ['Do you ship?', 'No. It does not travel. Come in.'],
];

export default function DelanceyDeliPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@75..112.5,400..800&family=Sofia+Sans+Extra+Condensed:ital,wght@0,600..900;1,800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Delancey Deli</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p className={s.serving}>
          <span className={s.servingLabel}>Now serving</span>
          <span className={s.servingNo}>47</span>
        </p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The sign on the wall at the left; the house order printed on the
            right, hanging on the tiled wall behind the counter. */}
        <section className={`${s.wall} ${s.hero}`} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Sandwiches, soups and smoked fish. 88 Delancey Row, since 1961.</p>
            <h1 id="hero-h" className={s.heroTitle}>
              Cut to order, <em>by hand.</em>
            </h1>
            <p className={s.heroLead}>
              Pastrami smoked in the basement, sliced warm at the counter, piled
              on rye from the bakery across the street. Take a number, ask for a
              taste, and sit wherever there is a pickle bowl.
            </p>
            <ul className={s.heroFacts}>
              <li>
                <span className={s.factNo}>14 hr</span>
                <span className={s.factLabel}>in the smoker</span>
              </li>
              <li>
                <span className={s.factNo}>1/2 lb</span>
                <span className={s.factLabel}>on every sandwich</span>
              </li>
              <li>
                <span className={s.factNo}>0.00</span>
                <span className={s.factLabel}>for the pickles</span>
              </li>
            </ul>
          </div>

          <div className={s.heroTicket}>
            <div className={s.heroTiles} aria-hidden="true">
              <TabbiedPattern
                pattern={dotmatrix}
                palette={WALL}
                fit="grid"
                cellSize={52}
                seed="delancey-wall"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.rail} aria-hidden="true" />
            <article className={`${s.receipt} ${s.receiptHero}`} aria-label="The house order">
              <p className={s.rcptShop}>Delancey Deli</p>
              <p className={s.rcptSmall}>88 Delancey Row, Lower Mill</p>
              <p className={s.rcptSmall}>(555) 014-2290</p>
              <hr className={s.tear} />
              <p className={s.rcptMeta}>
                <span>Order 0001</span>
                <span>Counter</span>
              </p>
              <p className={s.rcptMeta}>
                <span>Slicer 02 Rosa</span>
                <span>12:04 pm</span>
              </p>
              <hr className={s.tear} />
              <ul className={s.lines}>
                {HOUSE.map((l) => (
                  <li key={l.item}>
                    <span className={s.qty}>{l.qty}</span>
                    <span className={s.item}>{l.item}</span>
                    <span className={s.price}>{l.price}</span>
                    <span className={s.lineNote}>{l.note}</span>
                  </li>
                ))}
              </ul>
              <hr className={s.tear} />
              <dl className={s.totals}>
                <div>
                  <dt>Subtotal</dt>
                  <dd>28.75</dd>
                </div>
                <div>
                  <dt>Tax 8.875%</dt>
                  <dd>2.55</dd>
                </div>
                <div className={s.total}>
                  <dt>Total</dt>
                  <dd>31.30</dd>
                </div>
              </dl>
              <hr className={s.tear} />
              <p className={s.rcptThanks}>Thank you. Come hungry.</p>
              <p className={s.stamp}>Paid</p>
            </article>
            <div className={s.sandwich}>
              <Artwork
                slug="delancey-deli-pastrami"
                alt="A pastrami on rye cut in half and stacked high, with a pickle spear beside it"
                inks={['var(--text)', 'var(--paper)']}
                className={s.sandwichArt}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- BOARD
            The menu as three tickets hung on one rail. */}
        <section id="board" className={`${s.wall} ${s.board}`} aria-labelledby="board-h">
          <div className={s.inner}>
            <div className={s.wallHead}>
              <h2 id="board-h" className={s.wallTitle}>The board</h2>
              <p className={s.wallNote}>
                Every sandwich is half a pound of meat on two slices of bread,
                with a pickle. Order by number if you like; the slicers know them.
              </p>
            </div>
          </div>
          <div className={s.railWide} aria-hidden="true" />
          <div className={`${s.inner} ${s.tickets}`}>
            <article className={s.receipt} aria-labelledby="hot-h">
              <h3 id="hot-h" className={s.rcptHead}>Hot</h3>
              <p className={s.rcptSmall}>Sliced warm, on rye unless you say</p>
              <hr className={s.tear} />
              <ul className={s.menu}>
                {HOT.map((l) => (
                  <li key={l.no}>
                    <span className={s.no}>{l.no}</span>
                    <span className={s.item}>{l.item}</span>
                    <span className={s.price}>{l.price}</span>
                    <span className={s.lineNote}>{l.note}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className={s.receipt} aria-labelledby="cold-h">
              <h3 id="cold-h" className={s.rcptHead}>Cold</h3>
              <p className={s.rcptSmall}>Fish from the case, salads made daily</p>
              <hr className={s.tear} />
              <ul className={s.menu}>
                {COLD.map((l) => (
                  <li key={l.no}>
                    <span className={s.no}>{l.no}</span>
                    <span className={s.item}>{l.item}</span>
                    <span className={s.price}>{l.price}</span>
                    <span className={s.lineNote}>{l.note}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className={s.receipt} aria-labelledby="sides-h">
              <h3 id="sides-h" className={s.rcptHead}>On the side</h3>
              <p className={s.rcptSmall}>Soup from 10, knishes all day</p>
              <hr className={s.tear} />
              <ul className={s.menu}>
                {SIDES.map((l) => (
                  <li key={l.no}>
                    <span className={s.no}>{l.no}</span>
                    <span className={s.item}>{l.item}</span>
                    <span className={s.price}>{l.price}</span>
                    <span className={s.lineNote}>{l.note}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* The tiled frieze between the wall and the order pad. */}
        <div className={s.frieze} aria-hidden="true">
          <TabbiedPattern
            pattern={dotmatrix}
            palette={STRIP}
            fit="grid"
            cellSize={36}
            seed="delancey-frieze"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- BUILD
            The order pad: a real form, ticked down like the paper slips by
            the register. */}
        <section id="build" className={s.pad} aria-labelledby="build-h">
          <div className={`${s.inner} ${s.padGrid}`}>
            <div>
              <p className={s.padKicker}>Order slip</p>
              <h2 id="build-h" className={s.padTitle}>Build one yourself</h2>
              <p className={s.padLead}>
                Tick your way down the slip and send it ahead: we slice it when
                you walk in, so it is warm, and you skip the number.
              </p>
              <dl className={s.padRules}>
                <div>
                  <dt>Base</dt>
                  <dd>$4.00 for the bread, the pickle and the slicer's time.</dd>
                </div>
                <div>
                  <dt>Meat</dt>
                  <dd>By the quarter pound. Two quarters is a normal sandwich; three is a Delancey.</dd>
                </div>
                <div>
                  <dt>Pick-up</dt>
                  <dd>Any time we are open, at the end of the counter under the clock.</dd>
                </div>
              </dl>
              <h3 className={s.regularsTitle}>What the regulars tick</h3>
              <ul className={s.regulars}>
                {REGULARS.map(([name, combo]) => (
                  <li key={name}>
                    <span className={s.regName}>{name}</span>
                    <span className={s.regCombo}>{combo}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form className={`${s.receipt} ${s.slip}`} action="#">
              <p className={s.rcptShop}>Order slip</p>
              <p className={s.rcptSmall}>No. 0048, send ahead</p>
              <hr className={s.tear} />
              {BUILD.map((step, i) => (
                <fieldset key={step.name} className={s.step}>
                  <legend className={s.legend}>{`${i + 1}. ${step.legend}`}</legend>
                  <ul className={s.choices}>
                    {step.choices.map((c, j) => (
                      <li key={c.label}>
                        <input
                          id={`dd-${step.name}-${j}`}
                          type={step.kind}
                          name={step.kind === 'radio' ? step.name : `${step.name}-${j}`}
                          defaultChecked={step.kind === 'radio' && j === 0}
                        />
                        <label htmlFor={`dd-${step.name}-${j}`}>{c.label}</label>
                        <span className={s.price}>{c.price}</span>
                      </li>
                    ))}
                  </ul>
                </fieldset>
              ))}
              <fieldset className={s.step}>
                <legend className={s.legend}>5. How much</legend>
                <div className={s.amounts}>
                  <input id="dd-amt-1" type="radio" name="amount" />
                  <label htmlFor="dd-amt-1">1/4 lb</label>
                  <input id="dd-amt-2" type="radio" name="amount" defaultChecked />
                  <label htmlFor="dd-amt-2">1/2 lb</label>
                  <input id="dd-amt-3" type="radio" name="amount" />
                  <label htmlFor="dd-amt-3">3/4 lb</label>
                </div>
              </fieldset>
              <hr className={s.tear} />
              <div className={s.slipFields}>
                <label htmlFor="dd-name">Name for the ticket</label>
                <input id="dd-name" name="name" type="text" autoComplete="given-name" />
                <label htmlFor="dd-time">Picking up at</label>
                <input id="dd-time" name="time" type="time" />
              </div>
              <button className={s.send} type="submit">Send to the counter</button>
              <p className={s.rcptThanks}>Total at the register. We hold it 30 minutes.</p>
            </form>
          </div>
        </section>

        {/* --------------------------------------------------------- COUNTER
            How the line works, with the red number ticket as the sign. */}
        <section id="counter" className={`${s.wall} ${s.counter}`} aria-labelledby="counter-h">
          <div className={`${s.inner} ${s.counterGrid}`}>
            <div className={s.numberTicket} aria-hidden="true">
              <span className={s.ntLabel}>Take a number</span>
              <span className={s.ntNo}>48</span>
              <span className={s.ntFoot}>Delancey Deli</span>
            </div>
            <div className={s.counterText}>
              <h2 id="counter-h" className={s.wallTitle}>How the counter works</h2>
              <ol className={s.steps}>
                {STEPS.map(([t, d], i) => (
                  <li key={t}>
                    <span className={s.stepNo}>{`0${i + 1}`}</span>
                    <h3 className={s.stepTitle}>{t}</h3>
                    <p className={s.stepText}>{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={`${s.receipt} ${s.waits}`}>
              <h3 className={s.rcptHead}>The wait</h3>
              <p className={s.rcptSmall}>From pulling a number to ordering</p>
              <hr className={s.tear} />
              <dl className={s.waitList}>
                {WAITS.map(([when, wait]) => (
                  <div key={when}>
                    <dt>{when}</dt>
                    <dd>{wait}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- CATERING
            Three tray tickets laid on the checked liner. */}
        <section id="catering" className={s.catering} aria-labelledby="catering-h">
          <div className={s.inner}>
            <div className={s.padHeadRow}>
              <h2 id="catering-h" className={s.padTitle}>Trays for the office, the shiva, the game</h2>
              <p className={s.padLead}>
                Order by phone or at the register. Miriam writes it in the book,
                reads it back to you, and it is on the tray at the hour you said.
              </p>
            </div>
          </div>
          <div className={s.liner}>
            <div className={s.linerField} aria-hidden="true">
              <TabbiedPattern
                pattern={dotmatrix}
                palette={LINER}
                fit="grid"
                cellSize={44}
                seed="delancey-liner"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={`${s.inner} ${s.trays}`}>
              {TRAYS.map((t) => (
                <article key={t.code} className={s.receipt} aria-labelledby={`tray-${t.code}`}>
                  <p className={s.trayCode}>{`Tray ${t.code}`}</p>
                  <h3 id={`tray-${t.code}`} className={s.rcptHead}>{t.name}</h3>
                  <p className={s.rcptSmall}>{t.serves}</p>
                  <hr className={s.tear} />
                  <ul className={s.trayLines}>
                    {t.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <hr className={s.tear} />
                  <p className={s.trayPrice}>
                    <span>Tray total</span>
                    <span>{t.price}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className={s.inner}>
            <dl className={s.terms}>
              {TRAY_TERMS.map(([t, d]) => (
                <div key={t}>
                  <dt>{t}</dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
            <p className={s.callLine}>
              <a href="tel:+15550142291">Catering line (555) 014-2291</a>
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- SLICERS */}
        <section id="slicers" className={`${s.wall} ${s.slicers}`} aria-labelledby="slicers-h">
          <div className={s.inner}>
            <div className={s.wallHead}>
              <h2 id="slicers-h" className={s.wallTitle}>Behind the counter</h2>
              <p className={s.wallNote}>
                Their number is on your ticket. If you liked the way it was cut,
                ask for the same slicer next time.
              </p>
            </div>
            <ul className={s.badges}>
              {SLICERS.map((p) => (
                <li key={p.id} className={s.badge}>
                  <span className={s.badgeId}>{p.id}</span>
                  <h3 className={s.badgeName}>{p.name}</h3>
                  <p className={s.badgeRole}>{p.role}</p>
                  <p className={s.badgeSince}>{p.since}</p>
                  <p className={s.badgeNote}>{p.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- HOURS
            The bottom of the receipt: where, when, and the fine print. */}
        <section id="hours" className={s.visit} aria-labelledby="hours-h">
          <div className={`${s.inner} ${s.visitGrid}`}>
            <div className={`${s.receipt} ${s.hoursTicket}`}>
              <h2 id="hours-h" className={s.rcptHead}>Hours and where</h2>
              <hr className={s.tear} />
              <dl className={s.hoursList}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <hr className={s.tear} />
              <p className={s.address}>88 Delancey Row</p>
              <p className={s.address}>Lower Mill, corner of Grand</p>
              <p className={s.rcptSmall}>Counter seats 14, tables for 30. No reservations.</p>
              <hr className={s.tear} />
              <p className={s.contact}>
                <a href="tel:+15550142290">(555) 014-2290</a>
              </p>
              <p className={s.contact}>
                <a href="mailto:counter@delanceydeli.example">counter@delanceydeli.example</a>
              </p>
            </div>
            <div className={s.fine}>
              <h2 className={s.padTitle}>The fine print</h2>
              {FINE_PRINT.map(([q, a]) => (
                <details key={q} className={s.faq}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTiles} aria-hidden="true">
          <TabbiedPattern
            pattern={dotmatrix}
            palette={WALL}
            fit="grid"
            cellSize={52}
            seed="delancey-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p className={s.footName}>Delancey Deli</p>
          <p className={s.footAddr}>88 Delancey Row, Lower Mill. (555) 014-2290.</p>
          <p>A fictional sandwich deli. The menu, prices, people and address are invented.</p>
          <p>
            Patterns by <a href="https://tabbied.com">Tabbied</a>.
          </p>
          <p>The sandwich is a generated image, drawn in the page's own colors.</p>
        </div>
      </footer>
    </div>
  );
}
