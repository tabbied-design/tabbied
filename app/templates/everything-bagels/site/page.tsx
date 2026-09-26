import { TabbiedPattern } from 'tabbied/react';
import { rimband, peppering } from 'tabbied/patterns';
import s from './everything-bagels.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Everything Bagel Co.: Bagel shop, Kettle Street',
  description:
    'Everything Bagel Co. boils and bakes bagels by hand on Kettle Street from 6:30 every morning. The bagel and schmear price table, the house board, the baker\'s dozen, catering boxes and hours.',
};

/* Site colors. The rings are drawn on a mustard or tomato ground so each
   plate reads as a tray of bagels; the seed band scatters ink, crust and
   mustard on the paper like the topping on an everything. */
const PAPER = '#fff4dc';
const INK = '#15120e';
const MUSTARD = '#f2b227';
const TOMATO = '#c93a22';
const CRUST = '#b86a2d';

const TRAY = [MUSTARD, CRUST, INK, PAPER, CRUST, TOMATO];
const SEEDS = ['transparent', INK, CRUST, INK, MUSTARD, CRUST];
const BOXES = [TOMATO, PAPER, MUSTARD, INK, PAPER, CRUST];
const FOOT = ['transparent', MUSTARD, CRUST, PAPER, TOMATO, MUSTARD];

const NAV = [
  ['Build', '#builder'],
  ['The board', '#board'],
  ['Dozens', '#dozen'],
  ['Catering', '#catering'],
  ['The kettle', '#kettle'],
  ['Visit', '#visit'],
];

const FACTS = [
  ['4:30', 'am, the kettle goes on'],
  ['1,100', 'rolled by hand every day'],
  ['60', 'seconds in the malt water'],
  ['2:00', 'pm, or so, the everything runs out'],
];

const SCHMEARS = ['Butter', 'Plain', 'Scallion', 'Honey walnut', 'Lox spread'];

type Bagel = {
  name: string;
  note: string;
  prices: string[];
  pick: number;
};

/* One row per bagel: what it costs alone is in the note, and each price is
   that bagel with the schmear at the top of its column. `pick` is the cell
   most people order, starred in the table; -1 for none. */
const BAGELS: Bagel[] = [
  { name: 'Plain', note: 'Malt, salt, a shiny crust. $1.75 alone', prices: ['$2.50', '$3.75', '$4.25', '$4.50', '$5.50'], pick: 1 },
  { name: 'Sesame', note: 'Seeded both sides, toasted in the oven', prices: ['$2.50', '$3.75', '$4.25', '$4.50', '$5.50'], pick: -1 },
  { name: 'Poppy', note: 'Blue-black and crunchy', prices: ['$2.50', '$3.75', '$4.25', '$4.50', '$5.50'], pick: -1 },
  { name: 'Everything', note: 'Sesame, poppy, garlic, onion, flake salt', prices: ['$2.50', '$3.75', '$4.25', '$4.50', '$5.50'], pick: 2 },
  { name: 'Salt', note: 'Pretzel salt, not for the faint', prices: ['$2.50', '$3.75', '$4.25', '$4.50', '$5.50'], pick: 0 },
  { name: 'Onion', note: 'Dried onion that chars sweet', prices: ['$2.50', '$3.75', '$4.25', '$4.50', '$5.50'], pick: -1 },
  { name: 'Pumpernickel', note: 'Rye, cocoa, molasses. $2.00 alone', prices: ['$2.75', '$4.00', '$4.50', '$4.75', '$5.75'], pick: 4 },
  { name: 'Cinnamon raisin', note: 'Sweet, so we do not judge', prices: ['$2.75', '$4.00', '$4.50', '$4.75', '$5.75'], pick: 3 },
  { name: 'Egg', note: 'The only one with egg in it', prices: ['$2.75', '$4.00', '$4.50', '$4.75', '$5.75'], pick: -1 },
];

const PILE = [
  ['Tomato', '$0.75'],
  ['Red onion', '$0.50'],
  ['Capers', '$0.75'],
  ['Cucumber', '$0.75'],
  ['Fried egg', '$2.00'],
  ['Bacon, two rashers', '$2.50'],
  ['Avocado', '$2.50'],
  ['Whitefish salad', '$5.50'],
  ['Nova lox, 2 oz', '$6.00'],
];

type Stack = {
  no: string;
  name: string;
  what: string;
  price: string;
  tag: string;
};

const BOARD: Stack[] = [
  { no: '01', name: 'The Kettle Street', what: 'Everything, scallion schmear, nova lox, tomato, red onion, capers', price: '$13.50', tag: 'Best seller' },
  { no: '02', name: 'The Early Shift', what: 'Egg bagel, two fried eggs, sharp cheddar, bacon', price: '$8.75', tag: 'Until 11' },
  { no: '03', name: 'The Bodega', what: 'Salt bagel, butter, fried egg, hot sauce, nothing else', price: '$6.50', tag: '' },
  { no: '04', name: 'The Garden', what: 'Sesame, tofu scallion schmear, cucumber, tomato, sprouts', price: '$8.25', tag: 'Vegan' },
  { no: '05', name: 'The Whitefish', what: 'Pumpernickel, whitefish salad, red onion, lemon, black pepper', price: '$11.00', tag: '' },
  { no: '06', name: 'The Sweet Tooth', what: 'Cinnamon raisin, honey walnut, sliced apple', price: '$6.75', tag: 'Kids ask' },
];

const DOZEN_RULES = [
  ['Baker\'s dozen', 'Thirteen bagels, any mix', '$21'],
  ['Half dozen', 'Six bagels, no free one, sorry', '$11'],
  ['Schmear tub, 8 oz', 'Any schmear on the table', '$6.50'],
  ['Schmear tub, 16 oz', 'Any schmear on the table', '$11'],
  ['Day-olds, after 1 pm', 'A bag of six, whatever is left', '$6'],
];

const RINGS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

type Box = {
  name: string;
  serves: string;
  price: string;
  holds: string[];
};

const CATERING: Box[] = [
  {
    name: 'The Small Box',
    serves: 'Serves 8 to 10',
    price: '$48',
    holds: ['12 bagels, halved', '3 schmears, 1 lb in all', 'Butter, knives, napkins'],
  },
  {
    name: 'The Office Box',
    serves: 'Serves 16 to 20',
    price: '$98',
    holds: ['24 bagels, halved', '5 schmears, 2 lb in all', 'Tomato, onion, cucumber, capers', 'Knives, plates, napkins'],
  },
  {
    name: 'The Lox Box',
    serves: 'Serves 16 to 20',
    price: '$185',
    holds: ['24 bagels, halved', '1 lb hand-sliced nova', '2 lb schmear, plain and scallion', 'Tomato, onion, capers, lemon'],
  },
];

const KETTLE = [
  ['2 pm', 'The day before', 'Flour, malt, salt, yeast, water. Mixed stiff, in two batches.'],
  ['3 pm', 'Rolled', 'Every one by hand, rope and palm, 1,100 on a weekday.'],
  ['Overnight', 'Cold', 'Sixteen hours on boards in the walk-in. This is the flavor.'],
  ['4:30 am', 'Boiled', 'Sixty seconds in malt water, turned once with a spider.'],
  ['5 am', 'Baked', 'Seeded wet, on burlap boards, then flipped onto the stone.'],
  ['6:30 am', 'Doors', 'The first rack is still too hot to hold. Hold it anyway.'],
];

const HOURS = [
  ['Monday to Friday', '6:30 am to 2:30 pm'],
  ['Saturday', '7 am to 3 pm'],
  ['Sunday', '7 am to 2 pm'],
  ['Thanksgiving, Yom Kippur', 'Closed'],
];

const LINE = [
  ['Weekdays before 7:30', 'No line'],
  ['Weekdays 7:30 to 9', 'About 10 min'],
  ['Saturday 8 to 10', 'About 20 min'],
  ['After 12:30, any day', 'Walk up'],
];

const FAQ = [
  ['Do you toast?', 'We will. A bagel under four hours old does not need it, and after that it does. We will ask you twice, and then we will do it.'],
  ['Anything gluten-free?', 'No. There is flour on every surface in this room, and we would rather say so than sell you something that is only nearly safe.'],
  ['What is vegan?', 'Every bagel but the egg. The tofu scallion schmear is vegan too, and the kitchen will keep butter off yours if you say so.'],
  ['Can I call ahead?', 'For a dozen or more, yes: call before 8 am and it will be bagged under your name at the end of the counter.'],
  ['What happens to what is left?', 'After 1 pm the day-olds go in bags of six. What is left at close goes to the Hollis Street pantry the same evening.'],
];

export default function EverythingBagelsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fff4dc',
        '--ink': '#15120e',
        '--mustard': '#f2b227',
        '--tomato': '#c93a22',
        '--crust': '#b86a2d',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,mustard,tomato,crust"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Everything Bagel Co.</a>
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
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Kettle Street, Mill District. Since 2011</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>Boiled, baked, <em>gone by two.</em></h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Hand-rolled bagels, boiled in malt water and baked on the stone,
              from 6:30 every morning. Pick a bagel, pick a schmear, get in
              line. It moves fast.
            </p>
            <div className={s.ctas}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#builder">Build a bagel</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#catering">Order a box</a>
            </div>
          </div>

          <div className={s.heroPlate}>
            <div data-edit-pattern="hero.field" data-edit-roles="2,4,1,0,4,3" className={s.tray} aria-hidden="true">
              <TabbiedPattern
                pattern={rimband}
                palette={TRAY}
                fit="grid"
                cellSize={64}
                seed="everything-tray"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="hero.stickerRed" data-edit-max="240" data-edit-multiline className={s.stickerRed}>13 for the price of 12</p>
            <p data-edit="hero.stickerRound" data-edit-max="240" data-edit-multiline className={s.stickerRound}>Hot at 6:30</p>
          </div>
        </section>

        <ul className={s.facts}>
          {FACTS.map(([big, small], i) => (
            <li key={big}>
              <strong data-edit={`top.emphasis.${i}`}>{big}</strong>
              <span data-edit={`top.text.${i}`} data-edit-max="60">{small}</span>
            </li>
          ))}
        </ul>

        {/* --------------------------------------------------------- BUILDER */}
        <section id="builder" className={s.sec} aria-labelledby="builder-h">
          <div className={s.secHead}>
            <p data-edit="builder.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01</p>
            <h2 data-edit="builder.title" data-edit-max="60" id="builder-h">Build it</h2>
            <p data-edit="builder.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Bagel down the side, schmear across the top. Where the two meet is
              what you pay. The star is what most people order.
            </p>
          </div>

          <div className={s.builder}>
            <div className={s.matrixBox}>
              <table className={s.matrix}>
                <caption data-edit="builder.srOnly" className={s.srOnly}>Price of each bagel with each schmear</caption>
                <thead>
                  <tr>
                    <th data-edit="builder.corner" scope="col" className={s.corner}>Bagel</th>
                    {SCHMEARS.map((name, i) => (
                      <th key={name} scope="col">
                        <span data-edit={`builder.text.${i}`} data-edit-max="60">{name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BAGELS.map((b, i) => (
                    <tr key={b.name}>
                      <th scope="row">
                        <span data-edit={`builder.bagelName.${i}`} data-edit-max="60" className={s.bagelName}>{b.name}</span>
                        <span data-edit={`builder.bagelNote.${i}`} data-edit-max="60" className={s.bagelNote}>{b.note}</span>
                      </th>
                      {b.prices.map((price, j) => (
                        <td data-edit={`builder.pick.${i}.${j}`} key={SCHMEARS[j]} className={j === b.pick ? s.pick : undefined}>{price}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <aside className={s.pile} aria-labelledby="pile-h">
              <Artwork
                slug="everything-bagels-bagel"
                alt="An everything bagel, sliced and spread thick with cream cheese"
                inks={{ red: 'var(--crust)', yellow: 'var(--paper)', black: 'var(--ink)', blue: 'var(--mustard)' }}
                className={s.pileArt}
              />
              <h3 data-edit="pile.pileTitle" data-edit-max="40" id="pile-h" className={s.pileTitle}>Pile it on</h3>
              <ul className={s.pileList}>
                {PILE.map(([what, price], i) => (
                  <li key={what}>
                    <span data-edit={`pile.text.${i}`} data-edit-max="60">{what}</span>
                    <span className={s.dots} aria-hidden="true" />
                    <span data-edit={`pile.pilePrice.${i}`} data-edit-max="60" className={s.pilePrice}>{price}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="pile.pileNote" data-edit-max="240" data-edit-multiline className={s.pileNote}>
                A bagel on its own is $1.75, or $2 for pumpernickel, cinnamon
                raisin and egg. Toasting is free. Tofu scallion swaps in for any
                schmear at the scallion price.
              </p>
            </aside>
          </div>
        </section>

        {/* The seed band: the topping on an everything, spilled on the counter. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,4,1,2,4" className={s.seeds} aria-hidden="true">
          <TabbiedPattern
            pattern={peppering}
            palette={SEEDS}
            fit="grid"
            cellSize={40}
            seed="everything-seeds"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- BOARD */}
        <section id="board" className={s.sec} aria-labelledby="board-h">
          <div className={s.secHead}>
            <p data-edit="board.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02</p>
            <h2 data-edit="board.title" data-edit-max="60" id="board-h">The board</h2>
            <p data-edit="board.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Six we have already built for you. Say the number at the counter,
              it is quicker for everybody.
            </p>
          </div>

          <ol className={s.board}>
            {BOARD.map((b, i) => (
              <li key={b.no}>
                <span data-edit={`board.boardNo.${i}`} data-edit-max="60" className={s.boardNo}>{b.no}</span>
                <div className={s.boardBody}>
                  <h3 data-edit={`board.title2.${i}`} data-edit-max="40">{b.name}</h3>
                  <p data-edit={`board.body.${i}`} data-edit-max="240" data-edit-multiline>{b.what}</p>
                </div>
                <span data-edit={`board.boardPrice.${i}`} data-edit-max="60" className={s.boardPrice}>{b.price}</span>
                {b.tag ? <span data-edit={`board.tag.${i}`} data-edit-max="60" className={s.tag}>{b.tag}</span> : null}
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- DOZEN */}
        <section id="dozen" className={`${s.sec} ${s.dozenSec}`} aria-labelledby="dozen-h">
          <div className={s.dozen}>
            <div className={s.dozenText}>
              <p data-edit="dozen.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03</p>
              <h2 data-edit="dozen.title" data-edit-format="emphasis" data-edit-max="60" id="dozen-h">Thirteen to the <em>dozen.</em></h2>
              <p data-edit="dozen.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Bakers used to throw in the thirteenth so nobody could say they
                were short. We still do, every day, any mix you like.
              </p>
              <dl className={s.rules}>
                {DOZEN_RULES.map(([what, note, price], i) => (
                  <div key={what}>
                    <dt data-edit={`dozen.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`dozen.ruleNote.${i}`} data-edit-max="200" data-edit-multiline className={s.ruleNote}>{note}</dd>
                    <dd data-edit={`dozen.rulePrice.${i}`} data-edit-max="200" data-edit-multiline className={s.rulePrice}>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={s.bag}>
              <div className={s.rings} aria-hidden="true">
                {RINGS.map((r) => (
                  <span key={r} className={s.ring} />
                ))}
                <span className={`${s.ring} ${s.ringFree}`} />
              </div>
              <p data-edit="dozen.bagLabel" data-edit-max="240" data-edit-multiline className={s.bagLabel}>Number thirteen is on us</p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- CATERING */}
        <section id="catering" className={s.sec} aria-labelledby="catering-h">
          <div className={s.secHead}>
            <p data-edit="catering.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04</p>
            <h2 data-edit="catering.title" data-edit-max="60" id="catering-h">Catering boxes</h2>
            <p data-edit="catering.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Two days' notice, please. Everything comes halved and ready,
              with the knives. Delivery in the Mill District is $10, free over
              $150, from 7 am.
            </p>
          </div>

          <div className={s.boxes}>
            {CATERING.map((box, i) => (
              <article key={box.name} className={s.box}>
                <h3 data-edit={`box.boxName.${i}`} data-edit-max="40" className={s.boxName}>{box.name}</h3>
                <p data-edit={`box.boxServes.${i}`} data-edit-max="240" data-edit-multiline className={s.boxServes}>{box.serves}</p>
                <ul className={s.boxList}>
                  {box.holds.map((h, i2) => (
                    <li data-edit={`box.item.${i}.${i2}`} data-edit-max="80" key={h}>{h}</li>
                  ))}
                </ul>
                <p data-edit={`box.boxPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.boxPrice}>{box.price}</p>
              </article>
            ))}
          </div>

          <div className={s.orderRow}>
            <div className={s.orderSide}>
              <div data-edit-pattern="catering.field" data-edit-roles="3,0,2,1,0,4" className={s.orderPlate} aria-hidden="true">
                <TabbiedPattern
                  pattern={rimband}
                  palette={BOXES}
                  fit="grid"
                  cellSize={52}
                  seed="everything-boxes"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="catering.orderSticker" data-edit-max="240" data-edit-multiline className={s.orderSticker}>The Office Box, lid off</p>
            </div>

            <form className={s.form} action="#">
              <h3 data-edit="catering.formTitle" data-edit-max="40" className={s.formTitle}>Order a box</h3>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="catering.label" htmlFor="eb-name">Name</label>
                  <input id="eb-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="catering.label2" htmlFor="eb-phone">Phone</label>
                  <input id="eb-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="catering.label3" htmlFor="eb-date">Day and time</label>
                  <input id="eb-date" name="when" type="datetime-local" />
                </div>
                <div className={s.field}>
                  <label data-edit="catering.label4" htmlFor="eb-box">Box</label>
                  <select id="eb-box" name="box" defaultValue="office">
                    <option value="small">The Small Box, $48</option>
                    <option value="office">The Office Box, $98</option>
                    <option value="lox">The Lox Box, $185</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="catering.label5" htmlFor="eb-notes">Flavors, schmears, delivery address</label>
                  <textarea id="eb-notes" name="notes" rows={3} />
                </div>
              </div>
              <button data-edit="catering.btn" data-edit-max="24" className={s.btn} type="submit">Send the order</button>
              <p data-edit="catering.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We call to confirm before anything is rolled. Pay on pickup or on delivery.</p>
            </form>
          </div>
        </section>

        {/* ---------------------------------------------------------- KETTLE */}
        <section id="kettle" className={s.sec} aria-labelledby="kettle-h">
          <div className={s.secHead}>
            <p data-edit="kettle.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05</p>
            <h2 data-edit="kettle.title" data-edit-max="60" id="kettle-h">From the kettle</h2>
            <p data-edit="kettle.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A bagel takes about seventeen hours here. Most of that is it
              sitting in the cold, thinking.
            </p>
          </div>

          <ol className={s.kettle}>
            {KETTLE.map(([time, step, what], i) => (
              <li key={step}>
                <span data-edit={`kettle.kettleTime.${i}`} data-edit-max="60" className={s.kettleTime}>{time}</span>
                <h3 data-edit={`kettle.kettleStep.${i}`} data-edit-max="40" className={s.kettleStep}>{step}</h3>
                <p data-edit={`kettle.body.${i}`} data-edit-max="240" data-edit-multiline>{what}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visit}>
            <div className={s.visitCard}>
              <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>06</p>
              <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">Kettle Street</h2>
              <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.address}>
                88 Kettle Street, Mill District
                <br />
                across from the tram depot
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550132211">(555) 013-2211</a>
                <br />
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@everythingbagel.example">hello@everythingbagel.example</a>
              </p>
              <p data-edit="visit.small" data-edit-max="240" data-edit-multiline className={s.small}>
                Cash and card. The line goes out the door at 8 on Saturdays and
                is inside again by 8:20. One step at the door; we will bring it
                out to you if you knock on the window.
              </p>
            </div>

            <div className={s.hoursBox}>
              <h3 data-edit="visit.hoursTitle" data-edit-max="40" className={s.hoursTitle}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="visit.hoursNote" data-edit-max="240" data-edit-multiline className={s.hoursNote}>Or until the everything runs out.</p>
              <h3 data-edit="visit.lineTitle" data-edit-max="40" className={s.lineTitle}>The line</h3>
              <ul className={s.line}>
                {LINE.map(([when, wait], i) => (
                  <li key={when}>
                    <span data-edit={`visit.text.${i}`} data-edit-max="60">{when}</span>
                    <span data-edit={`visit.lineWait.${i}`} data-edit-max="60" className={s.lineWait}>{wait}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={s.faq}>
            <div className={s.faqHead}>
              <h3 data-edit="visit.faqTitle" data-edit-max="40" className={s.faqTitle}>Asked at the counter</h3>
              <p data-edit="visit.faqNote" data-edit-max="240" data-edit-multiline className={s.faqNote}>Five questions we hear before 8 am, most mornings.</p>
            </div>
            <div className={s.faqList}>
              {FAQ.map(([q, a], i) => (
                <details key={q} className={s.q}>
                  <summary data-edit={`visit.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`visit.body2.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,0,3,2" className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={rimband}
            palette={FOOT}
            fit="grid"
            cellSize={44}
            seed="everything-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footText}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Everything Bagel Co.</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional bagel shop. The bagels, prices, people and address are invented.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The bagel on the counter is a generated image, drawn in the page's colors.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
