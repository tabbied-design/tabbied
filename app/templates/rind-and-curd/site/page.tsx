import { TabbiedPattern } from 'tabbied/react';
import { kern, lobeform, dotfade } from 'tabbied/patterns';
import s from './rind-and-curd.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Rind & Curd: Cheese shop and tasting counter, Old Market',
  description:
    'Rind & Curd is a cheese shop and tasting counter on Dairy Lane. This season on the counter, tasting notes for every cheese, how much to buy for a board, and the Thursday tastings.',
};

/* Site colors. The wedge plates cut their triangles over a transparent
   ground, so the plate's paper tone shows between the cuts; the board
   plate and the holes band do the same. */
const PAPER = '#f6f0e3';
const INK = '#221c17';
const WAX = '#a8322a';
const PASTE = '#e8c35a';
const VEIN = '#56697a';

const COVER = ['transparent', PASTE, WAX, PASTE, INK, PASTE];
const WEDGE = ['transparent', PASTE, PASTE, WAX, PAPER, INK];
const BOARD = ['transparent', PASTE, WAX, VEIN, PASTE, PAPER];
const HOLES = ['transparent', INK, WAX, VEIN];

const NAV = [
  ['From the counter', '#counter'],
  ['Tasting notes', '#notes'],
  ['Board builder', '#board'],
  ['Thursdays', '#thursdays'],
  ['Visit', '#visit'],
];

const COVER_LINES = [
  ['4', 'Seven cheeses for the cold months, tasted and argued over'],
  ['8', 'The board for eight, and exactly how much to buy'],
  ['10', 'Thursdays: five tastings before the holidays'],
];

const LETTER = [
  'Every autumn the counter changes over. The fresh goat\'s cheeses that carried us through the summer get fewer and smaller, and the big wheels made in spring, when the cows first went out onto new grass, are finally ready to cut. It is the season we wait all year for.',
  'We buy from eleven makers, nine of them within a day\'s drive of the shop. We visit each of them at least once a year, taste through the batches in their cellars, and bring whole wheels home to age a little further in the cave under our floor, at eleven degrees and ninety percent humidity.',
  'Everything on the counter can be tasted before you buy it. Ask. That is the whole point of a counter, and it is the only way you will ever find out that you love a washed rind that smells like a farmyard.',
];

type Cheese = {
  name: string;
  maker: string;
  milk: string;
  age: string;
  region: string;
  pairs: string;
  price: string;
  note: string;
};

const FEATURE: Cheese = {
  name: 'Comté, summer milk',
  maker: 'Fruitière des Rousses',
  milk: 'Cow, raw',
  age: '24 months',
  region: 'Jura, France',
  pairs: 'Vin jaune, walnuts, a crisp apple',
  price: '$6.80 per 100 g',
  note: 'Cut from a wheel the size of a tractor tire. Crystals that crunch, then toffee, roasted onion and a finish that goes on long after the bite has gone.',
};

const CHEESES: Cheese[] = [
  { name: 'Old Hollow Cheddar', maker: 'Hollow Oak Dairy', milk: 'Cow, raw', age: '14 months, clothbound', region: 'Ashby Valley', pairs: 'A sharp apple, dark ale', price: '$5.20 per 100 g', note: 'Dry and nutty at the rind; the middle tastes of brown butter and broth.' },
  { name: 'Little Wren', maker: 'Wren Hill Farm', milk: 'Goat, pasteurized', age: '3 weeks, ashed', region: 'Forty miles north', pairs: 'Sauvignon blanc, honey', price: '$7.50 each', note: 'Lemony and dense in the middle, soft and a little mushroomy under the rind.' },
  { name: 'Stonefield Blue', maker: 'Hollow Oak Dairy', milk: 'Cow, raw', age: '4 months', region: 'Ashby Valley', pairs: 'Pear, a sweet wine, dark chocolate', price: '$5.90 per 100 g', note: 'The blue for people who think they do not like blue: creamy, with peppery veins.' },
  { name: 'Ossau-Iraty', maker: 'Maison Etcheverry', milk: 'Sheep, raw', age: '10 months', region: 'Basque Country', pairs: 'Black cherry jam, dry cider', price: '$6.20 per 100 g', note: 'Sweet and smooth, hazelnut and brown butter. Easy to eat by the slab.' },
  { name: 'Taleggio', maker: 'Caseificio Arrigoni', milk: 'Cow, pasteurized', age: '8 weeks, washed', region: 'Lombardy, Italy', pairs: 'A pale beer, bitter leaves', price: '$4.60 per 100 g', note: 'The rind smells like a barn. The inside tastes of fruit and cream. Eat both.' },
  { name: 'Orchard Wash', maker: 'Aged in our cave', milk: 'Cow, raw, washed in cider', age: '10 weeks', region: 'Orchard Row Creamery', pairs: 'Cider, obviously', price: '$6.40 per 100 g', note: 'Our own washed rind, turned by hand twice a week. Spoonable by Christmas.' },
];

const BOARD_RULE = [
  ['Soft', 'Something that spreads: a young goat, a bloomy rind.'],
  ['Hard', 'Something to cut and crunch: an aged Alpine, a cheddar.'],
  ['Blue', 'One, and a gentle one if the table is mixed.'],
  ['Wild card', 'A washed rind or a sheep you have never heard of.'],
];

const AMOUNTS = [
  ['2', '3', '250 g', '120 g', '$15-$20'],
  ['4', '3', '500 g', '250 g', '$30-$38'],
  ['6', '4', '750 g', '350 g', '$45-$55'],
  ['8', '5', '1 kg', '500 g', '$60-$75'],
  ['12', '5', '1.4 kg', '700 g', '$85-$105'],
  ['20', '6', '2.4 kg', '1.2 kg', '$145-$175'],
];

type Tasting = {
  date: string;
  day: string;
  theme: string;
  what: string;
  seats: string;
};

const TASTINGS: Tasting[] = [
  { date: '2', day: 'Oct', theme: 'The Alps', what: 'Comté, Gruyère and Beaufort side by side, with two whites from the Jura.', seats: '6 seats left' },
  { date: '9', day: 'Oct', theme: 'Blue week', what: 'Five blues from mild to fierce, with port and a late-harvest wine.', seats: '9 seats left' },
  { date: '16', day: 'Oct', theme: 'Cheddar and cider', what: 'Clothbound cheddars from both sides of the ocean, and three ciders.', seats: 'Sold out' },
  { date: '23', day: 'Oct', theme: 'Goats', what: 'Fresh, ashed and aged goat\'s cheeses with a flight of sancerre.', seats: '11 seats left' },
  { date: '30', day: 'Oct', theme: 'The stinkers', what: 'Washed rinds and Belgian beer. Bring courage and a friend.', seats: '4 seats left' },
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday, Wednesday, Friday', '10-7'],
  ['Thursday', '10-9, tasting night'],
  ['Saturday', '9-6'],
  ['Sunday', '11-4'],
];

export default function RindAndCurdPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f6f0e3',
        '--ink': '#221c17',
        '--wax': '#a8322a',
        '--paste': '#e8c35a',
        '--vein': '#56697a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,wax,paste,vein"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..600&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Rind &amp; Curd</a>
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
        {/* ----------------------------------------------------------- COVER */}
        <section className={s.cover} aria-labelledby="cover-h">
          <p className={s.issue}>
            <span data-edit="cover.text" data-edit-max="60">No. 14</span>
            <span data-edit="cover.text2" data-edit-max="60">The counter quarterly</span>
            <span data-edit="cover.text3" data-edit-max="60">Autumn</span>
          </p>
          <h1 data-edit="cover.masthead" data-edit-max="70" id="cover-h" className={s.masthead}>Rind &amp; Curd</h1>
          <p data-edit="cover.dek" data-edit-max="240" data-edit-multiline className={s.dek}>Cheese shop and tasting counter, 31 Dairy Lane, Old Market</p>

          <div className={s.coverGrid}>
            <ol className={s.coverLines}>
              {COVER_LINES.map(([page, line], i) => (
                <li key={page}>
                  <span data-edit={`cover.coverPage.${i}`} data-edit-max="60" className={s.coverPage}>{page}</span>
                  <span data-edit={`cover.coverLine.${i}`} data-edit-max="60" className={s.coverLine}>{line}</span>
                </li>
              ))}
            </ol>
            <div className={s.coverPlate}>
              <div data-edit-pattern="cover.field" data-edit-roles="transparent,3,2,3,1,3" className={s.plateField} aria-hidden="true">
                <TabbiedPattern
                  pattern={kern}
                  palette={COVER}
                  fit="grid"
                  cellSize={44}
                  seed="rind-cover"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="rind-and-curd-wheel"
                alt="A whole wheel of aged cheese with a wedge cut out, the wedge lying in front of it"
                inks={['var(--text)', 'var(--paper)']}
                className={s.wheel}
              />
              <p data-edit="cover.plateCaption" data-edit-max="240" data-edit-multiline className={s.plateCaption}>Plate 1. Old Hollow Cheddar, fourteen months in its cloth, the first wedge out.</p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- FROM THE COUNTER */}
        <section id="counter" className={s.spread} aria-labelledby="counter-h">
          <p className={s.running}>
            <span data-edit="counter.text" data-edit-max="60">From the counter</span>
            <span data-edit="counter.text2" data-edit-max="60">Rind &amp; Curd, autumn</span>
          </p>
          <div className={s.pages}>
            <div className={s.left}>
              <h2 data-edit="counter.title" data-edit-format="emphasis" data-edit-max="60" id="counter-h" className={s.headline}>The <em>big wheels</em> are ready</h2>
              <p data-edit="counter.standfirst" data-edit-max="240" data-edit-multiline className={s.standfirst}>
                A letter from the shop, on why autumn is the best time of year
                to stand at a cheese counter.
              </p>
              <blockquote className={s.pull}>
                <p data-edit="counter.body" data-edit-max="240" data-edit-multiline>Ask for a taste. It is the whole point of a counter.</p>
              </blockquote>
            </div>
            <div className={s.right}>
              <div className={s.columns}>
                {LETTER.map((para, i) => (
                  <p data-edit={`counter.dropcap.${i}`} data-edit-max="240" data-edit-multiline key={i} className={i === 0 ? s.dropcap : undefined}>{para}</p>
                ))}
                <p data-edit="counter.signoff" data-edit-max="240" data-edit-multiline className={s.signoff}>Margot Keller, cheesemonger and owner</p>
              </div>
            </div>
          </div>
          <p className={s.folio}>
            <span data-edit="counter.text3" data-edit-max="60">2</span>
            <span data-edit="counter.text4" data-edit-max="60">3</span>
          </p>
        </section>

        {/* ------------------------------------------------------ TASTING NOTES */}
        <section id="notes" className={s.spread} aria-labelledby="notes-h">
          <p className={s.running}>
            <span data-edit="notes.text" data-edit-max="60">Tasting notes</span>
            <span data-edit="notes.text2" data-edit-max="60">On the counter this season</span>
          </p>
          <div className={s.pages}>
            <div className={s.left}>
              <div className={s.stick}>
                <h2 data-edit="feature.title" data-edit-format="emphasis" data-edit-max="60" id="notes-h" className={s.headline}>Seven for the <em>cold months</em></h2>
                <article className={s.feature}>
                  <div className={s.featurePlate}>
                    <div data-edit-pattern="feature.field" data-edit-roles="transparent,3,3,2,0,1" className={s.plateField} aria-hidden="true">
                      <TabbiedPattern
                        pattern={kern}
                        palette={WEDGE}
                        fit="grid"
                        cellSize={36}
                        seed="rind-wedge"
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </div>
                  </div>
                  <p data-edit="feature.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Cheese of the season</p>
                  <h3 data-edit="feature.featureName" data-edit-max="40" className={s.featureName}>{FEATURE.name}</h3>
                  <p data-edit="feature.featureNote" data-edit-max="240" data-edit-multiline className={s.featureNote}>{FEATURE.note}</p>
                  <dl className={s.facts}>
                    <div>
                      <dt data-edit="feature.term" data-edit-max="28">Maker</dt>
                      <dd data-edit="feature.body" data-edit-max="200" data-edit-multiline>{FEATURE.maker}</dd>
                    </div>
                    <div>
                      <dt data-edit="feature.term2" data-edit-max="28">Milk</dt>
                      <dd data-edit="feature.body2" data-edit-max="200" data-edit-multiline>{FEATURE.milk}</dd>
                    </div>
                    <div>
                      <dt data-edit="feature.term3" data-edit-max="28">Age</dt>
                      <dd data-edit="feature.body3" data-edit-max="200" data-edit-multiline>{FEATURE.age}</dd>
                    </div>
                    <div>
                      <dt data-edit="feature.term4" data-edit-max="28">Region</dt>
                      <dd data-edit="feature.body4" data-edit-max="200" data-edit-multiline>{FEATURE.region}</dd>
                    </div>
                    <div>
                      <dt data-edit="feature.term5" data-edit-max="28">Pairs with</dt>
                      <dd data-edit="feature.body5" data-edit-max="200" data-edit-multiline>{FEATURE.pairs}</dd>
                    </div>
                    <div>
                      <dt data-edit="feature.term6" data-edit-max="28">Price</dt>
                      <dd data-edit="feature.body6" data-edit-max="200" data-edit-multiline>{FEATURE.price}</dd>
                    </div>
                  </dl>
                </article>
              </div>
            </div>
            <div className={s.right}>
              <ol className={s.notes}>
                {CHEESES.map((c, i) => (
                  <li key={c.name}>
                    <h3 data-edit={`notes.noteName.${i}`} data-edit-max="40" className={s.noteName}>{c.name}</h3>
                    <p data-edit={`notes.noteMaker.${i}`} data-edit-max="240" data-edit-multiline className={s.noteMaker}>{c.maker}</p>
                    <p data-edit={`notes.noteText.${i}`} data-edit-max="240" data-edit-multiline className={s.noteText}>{c.note}</p>
                    <dl className={s.noteFacts}>
                      <div>
                        <dt data-edit={`notes.term.${i}`} data-edit-max="28">Milk</dt>
                        <dd data-edit={`notes.body.${i}`} data-edit-max="200" data-edit-multiline>{c.milk}</dd>
                      </div>
                      <div>
                        <dt data-edit={`notes.term2.${i}`} data-edit-max="28">Age</dt>
                        <dd data-edit={`notes.body2.${i}`} data-edit-max="200" data-edit-multiline>{c.age}</dd>
                      </div>
                      <div>
                        <dt data-edit={`notes.term3.${i}`} data-edit-max="28">From</dt>
                        <dd data-edit={`notes.body3.${i}`} data-edit-max="200" data-edit-multiline>{c.region}</dd>
                      </div>
                      <div>
                        <dt data-edit={`notes.term4.${i}`} data-edit-max="28">Pairs with</dt>
                        <dd data-edit={`notes.body4.${i}`} data-edit-max="200" data-edit-multiline>{c.pairs}</dd>
                      </div>
                    </dl>
                    <p data-edit={`notes.notePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.notePrice}>{c.price}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className={s.folio}>
            <span data-edit="notes.text3" data-edit-max="60">4</span>
            <span data-edit="notes.text4" data-edit-max="60">5</span>
          </p>
        </section>

        {/* ------------------------------------------------------ BOARD BUILDER */}
        <section id="board" className={s.spread} aria-labelledby="board-h">
          <p className={s.running}>
            <span data-edit="board.text" data-edit-max="60">Board builder</span>
            <span data-edit="board.text2" data-edit-max="60">A service piece</span>
          </p>
          <div className={s.pages}>
            <div className={s.left}>
              <h2 data-edit="board.title" data-edit-format="emphasis" data-edit-max="60" id="board-h" className={s.headline}>How much cheese, <em>really</em></h2>
              <p data-edit="board.standfirst" data-edit-max="240" data-edit-multiline className={s.standfirst}>
                About 120 g a person when the cheese is dinner, and 60 g when
                it comes after. Fewer, bigger pieces look better and dry out
                slower than a lot of little ones.
              </p>
              <div data-edit-pattern="board.field" data-edit-roles="transparent,3,2,4,3,0" className={s.boardPlate} aria-hidden="true">
                <TabbiedPattern
                  pattern={lobeform}
                  palette={BOARD}
                  options={{ frequency: 0.75 }}
                  fit="grid"
                  cellSize={46}
                  seed="rind-board"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ol className={s.formula}>
                {BOARD_RULE.map(([kind, text], i) => (
                  <li key={kind}>
                    <h3 data-edit={`board.title.${i}`} data-edit-max="40">{kind}</h3>
                    <p data-edit={`board.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.right}>
              <table className={s.amounts}>
                <caption data-edit="board.tableCaption" className={s.tableCaption}>By the number of guests</caption>
                <thead>
                  <tr>
                    <th data-edit="board.heading" scope="col">Guests</th>
                    <th data-edit="board.heading2" scope="col">Cheeses</th>
                    <th data-edit="board.heading3" scope="col">As dinner</th>
                    <th data-edit="board.heading4" scope="col">After dinner</th>
                    <th data-edit="board.heading5" scope="col">Roughly</th>
                  </tr>
                </thead>
                <tbody>
                  {AMOUNTS.map(([guests, count, dinner, after, cost], i) => (
                    <tr key={guests}>
                      <th data-edit={`board.heading6.${i}`} scope="row">{guests}</th>
                      <td data-edit={`board.cell.${i}`}>{count}</td>
                      <td data-edit={`board.cell2.${i}`}>{dinner}</td>
                      <td data-edit={`board.cell3.${i}`}>{after}</td>
                      <td data-edit={`board.cell4.${i}`}>{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={s.sidebar}>
                <h3 data-edit="board.title2" data-edit-max="40">Or we build it</h3>
                <p data-edit="board.body2" data-edit-max="240" data-edit-multiline>
                  Tell us the day and the number of guests and we put the board
                  together: cheese, a loaf from the bakery next door, quince
                  paste, walnuts and crackers. $14 a person, on a wooden board
                  you bring back. Two days' notice, please.
                </p>
              </div>
            </div>
          </div>
          <p className={s.folio}>
            <span data-edit="board.text3" data-edit-max="60">8</span>
            <span data-edit="board.text4" data-edit-max="60">9</span>
          </p>
        </section>

        {/* The holes: a strip of them between the board and the tastings. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,4" className={s.holes} aria-hidden="true">
          <TabbiedPattern
            pattern={dotfade}
            palette={HOLES}
            fit="grid"
            cellSize={60}
            seed="rind-holes"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- THURSDAYS */}
        <section id="thursdays" className={s.spread} aria-labelledby="thursdays-h">
          <p className={s.running}>
            <span data-edit="thursdays.text" data-edit-max="60">Thursdays</span>
            <span data-edit="thursdays.text2" data-edit-max="60">Tasting nights</span>
          </p>
          <div className={s.pages}>
            <div className={s.left}>
              <h2 data-edit="thursdays.title" data-edit-format="emphasis" data-edit-max="60" id="thursdays-h" className={s.headline}>Thursday, <em>half past six</em></h2>
              <p data-edit="thursdays.standfirst" data-edit-max="240" data-edit-multiline className={s.standfirst}>
                Fourteen people round the counter after the shop shuts, five
                or six cheeses, something to drink with each, and Margot
                talking about all of it.
              </p>
              <p data-edit="thursdays.body" data-edit-max="240" data-edit-multiline className={s.body}>
                $38 a person, which covers the cheese, the drinks and a slice
                of bread for between them. Two hours, give or take. Book at
                the counter or by email; we hold a seat until noon on the day.
              </p>
            </div>
            <div className={s.right}>
              <ol className={s.tastings}>
                {TASTINGS.map((t, i) => (
                  <li key={t.date} className={t.seats === 'Sold out' ? s.soldOut : undefined}>
                    <p className={s.tDate}>
                      <span data-edit={`thursdays.tNum.${i}`} data-edit-max="60" className={s.tNum}>{t.date}</span>
                      <span data-edit={`thursdays.tMon.${i}`} data-edit-max="60" className={s.tMon}>{t.day}</span>
                    </p>
                    <div>
                      <h3 data-edit={`thursdays.tTheme.${i}`} data-edit-max="40" className={s.tTheme}>{t.theme}</h3>
                      <p data-edit={`thursdays.tWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.tWhat}>{t.what}</p>
                    </div>
                    <p data-edit={`thursdays.tSeats.${i}`} data-edit-max="240" data-edit-multiline className={s.tSeats}>{t.seats}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className={s.folio}>
            <span data-edit="thursdays.text3" data-edit-max="60">10</span>
            <span data-edit="thursdays.text4" data-edit-max="60">11</span>
          </p>
        </section>

        {/* -------------------------------------------------------------- VISIT */}
        <section id="visit" className={s.spread} aria-labelledby="visit-h">
          <p className={s.running}>
            <span data-edit="visit.text" data-edit-max="60">Visit</span>
            <span data-edit="visit.text2" data-edit-max="60">Where and when</span>
          </p>
          <div className={s.pages}>
            <div className={s.left}>
              <h2 data-edit="visit.title" data-edit-format="emphasis" data-edit-max="60" id="visit-h" className={s.headline}>31 Dairy Lane, <em>Old Market</em></h2>
              <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.body}>
                On the corner by the covered market, under the green awning.
                We cut to order, wrap in waxed paper, and will vacuum-pack
                anything that has to travel. Cheese keeps best in the salad
                drawer, in its paper, not in plastic.
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550126630">(555) 012-6630</a>
              </p>
              <p className={s.contact}>
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:counter@rindandcurd.example">counter@rindandcurd.example</a>
              </p>
            </div>
            <div className={s.right}>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <form className={s.form} action="#">
                <h3 data-edit="visit.formTitle" data-edit-max="40" className={s.formTitle}>Reserve a Thursday seat</h3>
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label data-edit="visit.label" htmlFor="rc-name">Name</label>
                    <input id="rc-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="visit.label2" htmlFor="rc-email">Email</label>
                    <input id="rc-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="visit.label3" htmlFor="rc-night">Night</label>
                    <select id="rc-night" name="night" defaultValue="2">
                      {TASTINGS.map((t) => (
                        <option key={t.date} value={t.date}>{`${t.day} ${t.date}, ${t.theme}`}</option>
                      ))}
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="visit.label4" htmlFor="rc-seats">Seats</label>
                    <select id="rc-seats" name="seats" defaultValue="2">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                <button data-edit="visit.submit" data-edit-max="24" className={s.submit} type="submit">Hold my seats</button>
              </form>
            </div>
          </div>
          <p className={s.folio}>
            <span data-edit="visit.text3" data-edit-max="60">12</span>
            <span data-edit="visit.text4" data-edit-max="60">13</span>
          </p>
        </section>
      </main>

      <footer className={s.footer}>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Rind &amp; Curd</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional cheese shop and tasting counter. The makers, cheeses, prices and dates are invented.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
        </p>
        <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The cheese on the cover is a generated image, printed in the page's own colors.</p>
      </footer>
    </div>
  );
}
