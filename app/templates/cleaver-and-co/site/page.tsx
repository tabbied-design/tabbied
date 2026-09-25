import { TabbiedPattern } from 'tabbied/react';
import { hurdle, reedpen } from 'tabbied/patterns';
import s from './cleaver-and-co.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Cleaver & Co.: Whole-animal butcher, Market Row',
  description:
    'Cleaver & Co. buys whole animals from four farms within 40 miles and cuts everything behind the counter. Find every cut by its number, see what is in this week, and order for Saturday.',
};

/* Site colors. The hatching around the charts sits on `transparent`, so
   the strokes are laid straight onto the butcher paper. */
const INK = '#1C1714';
const RED = '#A8322D';
const GRAY = '#8C8378';
const PALE = '#E3D8C8';

const HATCH = ['transparent', GRAY, PALE, RED];
const TILES = ['transparent', PALE, GRAY];

const NAV = [
  ['Cuts', '#cuts'],
  ['This week', '#week'],
  ['Sourcing', '#sourcing'],
  ['Boxes', '#boxes'],
  ['Visit', '#visit'],
];

type Cut = {
  no: string;
  name: string;
  use: string;
  price: string;
  x: string;
  y: string;
};

/* x and y place each numbered marker on the picture, as a share of it. */
const BEEF: Cut[] = [
  { no: '1', name: 'Chuck', use: 'Pot roast, stew, and the grind for our burgers', price: '$8.50', x: '69%', y: '30%' },
  { no: '2', name: 'Rib', use: 'Ribeye steaks and the standing rib roast', price: '$24.00', x: '56%', y: '24%' },
  { no: '3', name: 'Short loin', use: 'Strip, T-bone and porterhouse', price: '$22.00', x: '43%', y: '24%' },
  { no: '4', name: 'Sirloin', use: 'Top sirloin and tri-tip for the grill', price: '$14.50', x: '30%', y: '26%' },
  { no: '5', name: 'Round', use: 'Roasts, jerky, thin slices for a stir fry', price: '$9.25', x: '15%', y: '36%' },
  { no: '6', name: 'Brisket', use: 'Low and slow, as a whole packer or the flat', price: '$10.50', x: '72%', y: '52%' },
  { no: '7', name: 'Short plate', use: 'Short ribs and skirt steak', price: '$12.00', x: '57%', y: '50%' },
  { no: '8', name: 'Flank', use: 'Marinate, sear hard, slice thin across the grain', price: '$13.50', x: '41%', y: '50%' },
  { no: '9', name: 'Shank', use: 'Osso buco, and the bones for broth', price: '$6.75', x: '61%', y: '75%' },
];

const PORK: Cut[] = [
  { no: '1', name: 'Jowl', use: 'Cure it for guanciale, or braise it', price: '$6.50', x: '80%', y: '55%' },
  { no: '2', name: 'Shoulder', use: 'Boston butt: pulled pork and our sausage', price: '$5.75', x: '64%', y: '27%' },
  { no: '3', name: 'Picnic', use: 'Roasted with the skin on, for crackling', price: '$4.95', x: '63%', y: '55%' },
  { no: '4', name: 'Loin', use: 'Chops, bone-in or boneless, and the rack', price: '$9.50', x: '43%', y: '22%' },
  { no: '5', name: 'Belly', use: 'Slab bacon, porchetta, or braised whole', price: '$8.25', x: '43%', y: '52%' },
  { no: '6', name: 'Ham', use: 'Fresh leg, or cured and smoked in house', price: '$6.25', x: '19%', y: '36%' },
  { no: '7', name: 'Hock', use: 'Smoked, for beans and greens', price: '$4.50', x: '20%', y: '74%' },
];

/* The butcher's cut lines: a left, top and length for each dashed rule,
   drawn over the picture and kept inside the body. */
const BEEF_LINES = [
  { left: '23%', top: '17%', h: '42%' },
  { left: '36.5%', top: '15%', h: '26%' },
  { left: '49.5%', top: '15%', h: '26%' },
  { left: '63%', top: '15%', h: '46%' },
  { left: '48.5%', top: '41%', h: '19%' },
];

const PORK_LINES = [
  { left: '28%', top: '11%', h: '52%' },
  { left: '55%', top: '11%', h: '54%' },
  { left: '72%', top: '20%', h: '46%' },
];

const SPECIALS = [
  { name: 'Bone-in ribeye, dry-aged 45 days', note: 'Six left from the Hollis steer. Ask us to cut it two inches thick.', price: '$32 / lb' },
  { name: 'Whole chickens', note: 'Pasture-raised at Wren Hill, four to five pounds, in on Friday.', price: '$5.25 / lb' },
  { name: 'Lamb shoulder, bone-in', note: 'Fall lambs from Tall Grass. Garlic, rosemary, four hours.', price: '$11 / lb' },
  { name: 'Beef cheeks', note: 'Only two to an animal. Braise in red wine until they fall apart.', price: '$9 / lb' },
  { name: 'Rendered beef tallow', note: 'Rendered here on Mondays. Roast potatoes in it once.', price: '$8 a pint' },
];

const SAUSAGES = ['Sweet Italian with fennel', 'Bratwurst', 'Green chorizo', 'Breakfast links, sage and maple', 'Lamb merguez'];

const FARMS = [
  {
    name: 'Hollis Family Farm',
    miles: '22 mi',
    raise: 'Angus and Hereford cattle',
    how: 'Grass-fed on the river meadows and finished on their own hay through the winter. We take two steers a week.',
  },
  {
    name: 'Oakridge Hogs',
    miles: '38 mi',
    raise: 'Berkshire and Tamworth pigs',
    how: 'Raised in the woods on a ridge, finished on acorns and spent grain from the brewery in town.',
  },
  {
    name: 'Wren Hill',
    miles: '14 mi',
    raise: 'Chickens and eggs',
    how: 'Moved to fresh grass every morning in open-bottomed pens. Birds arrive whole every Friday.',
  },
  {
    name: 'Tall Grass Sheep Co.',
    miles: '31 mi',
    raise: 'Katahdin lambs',
    how: 'A hair breed that needs no shearing, lambed on pasture in spring and sold to us in the fall.',
  },
];

const FACTS = [
  ['4', 'Farms, all named on the label'],
  ['38 mi', 'The farthest one'],
  ['21-45', 'Days our beef hangs'],
  ['0', 'Boxed cuts bought in'],
];

const BOXES = [
  {
    name: 'The weeknight box',
    weight: '10 lb',
    price: '$119',
    unit: 'a box',
    items: ['2 lb ground chuck', '2 lb sausage of the week', '8 chicken thighs', '2 lb pork shoulder', '1 lb bacon'],
    note: 'Dinner for four, most nights, for a week.',
  },
  {
    name: 'The grill box',
    weight: '12 lb',
    price: '$169',
    unit: 'a box',
    items: ['2 ribeyes and 2 strips', 'One tri-tip, trimmed', '8 burger patties, 5 oz', '2 lb bratwurst', 'Bones for the dog'],
    note: 'Packed Thursday, so it is cold for the weekend.',
  },
  {
    name: 'Quarter beef',
    weight: 'About 110 lb',
    price: '$8.95',
    unit: 'a lb, hanging weight',
    items: ['Cut to your own sheet', 'Steaks, roasts, ground', 'Wrapped, labeled, frozen', 'Soup bones on request', 'About 4 cu ft of freezer'],
    note: 'Around $985 all in. Book with a $150 deposit.',
  },
  {
    name: 'Half pig',
    weight: 'About 90 lb',
    price: '$5.40',
    unit: 'a lb, hanging weight',
    items: ['Chops, roasts, ribs', 'Bacon and hams smoked here', 'Sausage in your choice', 'Lard, if you want it', 'About 3 cu ft of freezer'],
    note: 'Around $485 all in. Book with a $100 deposit.',
  },
];

const HOURS = [
  ['Monday', 'Closed, we are cutting'],
  ['Tuesday to Friday', '10 am - 6:30 pm'],
  ['Saturday', '8 am - 4 pm'],
  ['Sunday', '10 am - 2 pm'],
];

const FAQS = [
  {
    q: 'Can you cut something to order?',
    a: 'Yes, anything the animal has. Thick chops, a butterflied leg, a crown roast, a brisket split in two: ask at the counter and it takes about fifteen minutes. Bigger jobs, call the day before.',
  },
  {
    q: 'Do you sell bones and fat?',
    a: 'Marrow bones and knuckles for stock, suet, back fat and leaf lard, and chicken frames. Stock bones are free on Tuesdays until they are gone.',
  },
  {
    q: 'How long does the meat keep?',
    a: 'Steaks and roasts three to four days in the fridge, ground meat and sausage two. Everything we sell frozen is vacuum sealed and good for a year.',
  },
  {
    q: 'Do you deliver?',
    a: 'Friday afternoons within ten miles of the shop, $8, free on orders over $100. Order by Thursday noon.',
  },
];

export default function CleaverAndCoPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,400;0,500;0,700;1,400&family=Ultra&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork slug="cleaver-and-co-cleaver" alt="" inks={['var(--red)']} className={s.markIcon} />
          <span className={s.markName}>Cleaver &amp; Co.</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCall} href="tel:+15550147720">(555) 014-7720</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The counter chart: an engraved animal cut into numbered pieces,
            each number keyed to a line in the price list beside it. The
            charts hang on a wall of engraver's hatching. */}
        <section id="cuts" className={s.hero} aria-labelledby="hero-h">
          <div className={s.intro}>
            <div className={s.introText}>
              <p className={s.kicker}>Whole-animal butchers on Market Row, since 1987</p>
              <h1 id="hero-h" className={s.title}>
                Every cut has a number. <em>Ask for it by name.</em>
              </h1>
            </div>
            <div className={s.introSide}>
              <p className={s.lede}>
                We buy whole animals from four farms close by and break them
                down behind the counter, so every part of the steer and the pig
                is here, priced by the pound. Find it on the chart, then tell us
                how thick.
              </p>
              <div className={s.actions}>
                <a className={s.btn} href="#visit">Order for Saturday</a>
                <a className={s.btnLine} href="#week">This week at the counter</a>
              </div>
            </div>
          </div>

          <div className={s.wall}>
            <div className={s.hatch} aria-hidden="true">
              <TabbiedPattern
                pattern={reedpen}
                palette={HATCH}
                fit="grid"
                cellSize={52}
                seed="counter-wall"
                options={{ frequency: 0.55 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div className={s.plate}>
              <div className={s.plateHead}>
                <span className={s.plateNo}>Chart I</span>
                <h2 className={s.plateTitle}>The steer</h2>
                <span className={s.plateNote}>Prices per pound, cut to order</span>
              </div>
              <div className={s.chart}>
                <div className={s.figure}>
                  <Artwork
                    slug="cleaver-and-co-cow"
                    alt="An engraving of a steer from the side, marked with nine numbered cuts"
                    inks={['var(--ink)']}
                    className={s.animal}
                  />
                  {BEEF_LINES.map((l) => (
                    <span
                      key={`${l.left}-${l.top}`}
                      className={s.cutLine}
                      style={{ left: l.left, top: l.top, height: l.h }}
                      aria-hidden="true"
                    />
                  ))}
                  {BEEF.map((c) => (
                    <span key={c.no} className={s.marker} style={{ left: c.x, top: c.y }} aria-hidden="true">
                      {c.no}
                    </span>
                  ))}
                </div>
                <ol className={s.prices}>
                  {BEEF.map((c) => (
                    <li key={c.no}>
                      <span className={s.priceNo}>{c.no}</span>
                      <h3 className={s.priceName}>{c.name}</h3>
                      <span className={s.priceLead} aria-hidden="true" />
                      <strong className={s.priceAmt}>{c.price}</strong>
                      <p className={s.priceUse}>{c.use}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className={`${s.plate} ${s.plateFlip}`}>
              <div className={s.plateHead}>
                <span className={s.plateNo}>Chart II</span>
                <h2 className={s.plateTitle}>The pig</h2>
                <span className={s.plateNote}>Prices per pound, cut to order</span>
              </div>
              <div className={s.chart}>
                <div className={s.figure}>
                  <Artwork
                    slug="cleaver-and-co-pig"
                    alt="An engraving of a pig from the side, marked with seven numbered cuts"
                    inks={['var(--ink)']}
                    className={s.animal}
                  />
                  {PORK_LINES.map((l) => (
                    <span
                      key={`${l.left}-${l.top}`}
                      className={s.cutLine}
                      style={{ left: l.left, top: l.top, height: l.h }}
                      aria-hidden="true"
                    />
                  ))}
                  {PORK.map((c) => (
                    <span key={c.no} className={s.marker} style={{ left: c.x, top: c.y }} aria-hidden="true">
                      {c.no}
                    </span>
                  ))}
                </div>
                <ol className={s.prices}>
                  {PORK.map((c) => (
                    <li key={c.no}>
                      <span className={s.priceNo}>{c.no}</span>
                      <h3 className={s.priceName}>{c.name}</h3>
                      <span className={s.priceLead} aria-hidden="true" />
                      <strong className={s.priceAmt}>{c.price}</strong>
                      <p className={s.priceUse}>{c.use}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ THIS WEEK
            The chalkboard behind the counter, with the cleaver hung beside
            it. */}
        <section id="week" className={s.week} aria-labelledby="week-h">
          <div className={s.weekInner}>
            <div className={s.board}>
              <div className={s.boardHead}>
                <p className={s.boardKick}>Week of September 21</p>
                <h2 id="week-h">This week at the counter</h2>
              </div>
              <ul className={s.specials}>
                {SPECIALS.map((sp) => (
                  <li key={sp.name}>
                    <h3>{sp.name}</h3>
                    <strong>{sp.price}</strong>
                    <p>{sp.note}</p>
                  </li>
                ))}
              </ul>
              <div className={s.sausages}>
                <h3 className={s.sausageHead}>Sausages, made Wednesday, $9.50 / lb</h3>
                <ul>
                  {SAUSAGES.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
              <p className={s.boardNote}>Stock bones are free on Tuesdays, while they last.</p>
            </div>
            <div className={s.hook}>
              <span className={s.hookRail} aria-hidden="true" />
              <Artwork
                slug="cleaver-and-co-cleaver"
                alt="An engraving of a butcher's cleaver, hung by its handle"
                inks={['var(--pale)']}
                className={s.cleaver}
              />
              <p className={s.hookNote}>
                Knives sharpened at the counter on Saturdays, $4 a blade.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- SOURCING */}
        <section id="sourcing" className={s.sourcing} aria-labelledby="sourcing-h">
          <div className={s.secHead}>
            <p className={s.secKick}>How we source</p>
            <h2 id="sourcing-h">Four farms, all within an hour</h2>
            <p className={s.secNote}>
              We know every farmer by name and have stood in every field. The
              animals go to Maple Creek, a small USDA-inspected plant twelve
              miles out, and come to us whole. Beef hangs in our cold room for
              three weeks at least.
            </p>
          </div>
          <dl className={s.facts}>
            {FACTS.map(([v, k]) => (
              <div key={k}>
                <dt>{v}</dt>
                <dd>{k}</dd>
              </div>
            ))}
          </dl>
          <ol className={s.farms}>
            {FARMS.map((f, i) => (
              <li key={f.name} className={s.farm}>
                <span className={s.farmNo}>{`0${i + 1}`}</span>
                <h3 className={s.farmName}>{f.name}</h3>
                <span className={s.farmMiles}>{f.miles}</span>
                <p className={s.farmRaise}>{f.raise}</p>
                <p className={s.farmHow}>{f.how}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* The tiled wall behind the counter, as a band. */}
        <div className={s.tileBand} aria-hidden="true">
          <TabbiedPattern
            pattern={hurdle}
            palette={TILES}
            fit="grid"
            cellSize={44}
            seed="tile-wall"
            options={{ frequency: 0.85 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- BOXES */}
        <section id="boxes" className={s.boxes} aria-labelledby="boxes-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Bulk boxes and shares</p>
            <h2 id="boxes-h">Fill the freezer</h2>
            <p className={s.secNote}>
              Boxes are packed on Thursday for pickup on Friday or Saturday.
              Shares are cut to your own sheet and take about two weeks from
              the deposit.
            </p>
          </div>
          <ul className={s.boxList}>
            {BOXES.map((b) => (
              <li key={b.name} className={s.box}>
                <div className={s.boxTop}>
                  <h3 className={s.boxName}>{b.name}</h3>
                  <span className={s.boxWeight}>{b.weight}</span>
                </div>
                <p className={s.boxPrice}>
                  <strong>{b.price}</strong>
                  <span>{b.unit}</span>
                </p>
                <ul className={s.boxItems}>
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <p className={s.boxNote}>{b.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section className={s.faq} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <p className={s.secKick}>Across the counter</p>
            <h2 id="faq-h">What people ask us</h2>
            <p className={s.secNote}>
              The answers we give most often. Anything else, ask at the counter
              or call; the phone is by the block.
            </p>
          </div>
          <div className={s.faqList}>
            {FAQS.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInfo}>
            <p className={s.secKick}>Hours and ordering</p>
            <h2 id="visit-h">Come to the counter, or call ahead</h2>
            <p className={s.visitLede}>
              Order by Thursday noon and it is cut, wrapped and waiting for you
              on Saturday morning. Anything on the chart can be cut while you
              wait.
            </p>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <div className={s.address}>
              <p>212 Market Row, in the old mill, at the corner of Tanner Street. Parking in the yard behind.</p>
              <a href="tel:+15550147720">(555) 014-7720</a>
              <a href="mailto:orders@cleaverandco.example">orders@cleaverandco.example</a>
            </div>
          </div>
          <form className={s.form} action="#">
            <h3 className={s.formHead}>Order for pickup</h3>
            <div className={s.field}>
              <label htmlFor="cc-name">Name</label>
              <input id="cc-name" name="name" type="text" autoComplete="name" />
            </div>
            <div className={s.formRow}>
              <div className={s.field}>
                <label htmlFor="cc-phone">Phone</label>
                <input id="cc-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label htmlFor="cc-day">Pickup</label>
                <select id="cc-day" name="day" defaultValue="sat">
                  <option value="fri">Friday</option>
                  <option value="sat">Saturday</option>
                  <option value="sun">Sunday</option>
                </select>
              </div>
            </div>
            <div className={s.field}>
              <label htmlFor="cc-order">Your order</label>
              <textarea
                id="cc-order"
                name="order"
                rows={5}
                placeholder="Two ribeyes, 1.5 in thick. 2 lb ground chuck. One whole chicken, spatchcocked."
              />
            </div>
            <button className={s.submit} type="submit">Send my order</button>
            <small className={s.formNote}>We call to confirm the weight and price. Pay at pickup.</small>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <div className={s.footBrand}>
            <Artwork slug="cleaver-and-co-pig" alt="" inks={['var(--pale)']} className={s.footPig} />
            <p className={s.footName}>Cleaver &amp; Co.</p>
            <p className={s.footTag}>Whole-animal butchers, 212 Market Row.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p className={s.footAddr}>
            Tue-Fri 10-6:30, Sat 8-4, Sun 10-2
            <br />
            orders@cleaverandco.example
            <br />
            (555) 014-7720
          </p>
        </div>
        <div className={s.footFine}>
          <p>A fictional butcher shop. Farms, prices and hours are invented.</p>
          <p className={s.credit}>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
