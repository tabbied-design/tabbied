import { TabbiedPattern } from 'tabbied/react';
import { mixtape, halftone, sliver } from 'tabbied/patterns';
import s from './second-life-vintage.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Second Life Vintage: Vintage clothing, Lower Dellwood',
  description:
    'Second Life sells used clothes from 1960 to 2005 on Mercer Row: band tees, denim, leather and knitwear. The October drop calendar, what is on the racks, how we buy clothes and how old sizes fit.',
};

/* Site colors. The cut-outs are mixtape, drawn in black, pink and lime on
   a transparent ground so the photocopy paper shows through; the tape band
   runs them over hot pink. The halftone and the slivers are the same inks. */
const BLACK = '#111111';
const PAPER = '#f1eee4';
const PINK = '#ff2d8a';
const LIME = '#c5f12e';

const CUTOUT = ['transparent', BLACK, PINK, LIME, BLACK, PINK];
const TAPE = ['transparent', BLACK, PAPER, LIME, BLACK, PAPER];
const XEROX = ['transparent', BLACK, PINK];
const CONFETTI = ['transparent', PINK, LIME, PAPER, PINK, LIME];

const NAV = [
  ['Drops', '#drops'],
  ['The racks', '#racks'],
  ['We buy', '#buy'],
  ['Sizing', '#sizing'],
  ['Find us', '#find'],
];

const STICKERS = ['New rack Fridays at noon', '$5 bin Sundays', 'We buy Tue and Wed'];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/* October 2026 starts on a Thursday. Drops by date. */
const DROPS: Record<number, { label: string; kind: 'pink' | 'lime' | 'ink' }> = {
  2: { label: 'New rack', kind: 'pink' },
  3: { label: 'Denim day', kind: 'lime' },
  9: { label: 'New rack', kind: 'pink' },
  10: { label: 'Band tees', kind: 'lime' },
  16: { label: 'New rack', kind: 'pink' },
  17: { label: 'Leather', kind: 'lime' },
  23: { label: 'New rack', kind: 'pink' },
  24: { label: 'Knitwear', kind: 'lime' },
  25: { label: '$5 bin clear-out', kind: 'ink' },
  30: { label: 'New rack', kind: 'pink' },
  31: { label: 'Costume rack', kind: 'pink' },
};

const OCTOBER = Array.from({ length: 31 }, (_, k) => {
  const n = k + 1;
  const dow = (3 + k) % 7;
  const drop = DROPS[n];
  return {
    n: String(n),
    wd: WEEKDAYS[dow],
    closed: dow === 0,
    first: n === 1,
    label: drop ? drop.label : '',
    kind: drop ? drop.kind : '',
  };
});

const LEGEND = [
  ['New rack', 'Every Friday at noon: forty to sixty pieces nobody has seen yet.', 'pink'],
  ['Theme days', 'Saturdays, one rack of one thing, pulled from the back room.', 'lime'],
  ['Clear-out', 'The last Sunday of the month, the $5 bin gets the whole back wall.', 'ink'],
];

const RACKS = [
  { what: 'Band tees', era: '70s to 00s', price: '$25-90', note: 'Single stitch at the top end. Tour dates on the back cost more.' },
  { what: 'Straight-leg jeans', era: '80s and 90s', price: '$38-65', note: 'Sorted by waist on the wall, measured flat on every tag.' },
  { what: 'Leather jackets', era: '70s to 90s', price: '$90-240', note: 'Conditioned, zips checked, linings mended.' },
  { what: 'Track tops', era: '80s and 90s', price: '$30-70', note: 'Windbreakers too. Loud on the left, louder on the right.' },
  { what: 'Knitwear', era: '60s to 90s', price: '$28-60', note: 'Wool, mohair, cotton. Any hole has been darned.' },
  { what: 'Dresses', era: '60s to 90s', price: '$40-110', note: 'Slip dresses, seventies prints, proms that never happened.' },
  { what: 'Workwear', era: '50s to 90s', price: '$45-120', note: 'Chore coats, carpenter pants, coveralls with names on them.' },
  { what: 'The $5 bin', era: 'Any year', price: '$5', note: 'By the door. Emptied and refilled every Sunday.' },
];

const BUY_TERMS = [
  ['When', 'Tuesday and Wednesday, 12 to 5. No appointment, first come.'],
  ['How much', 'Two bags a person, washed and folded. We go through it while you wait, about twenty minutes.'],
  ['What you get', '30% of our price in cash, or 45% in store credit. Paid on the spot.'],
  ['The rest', 'What we do not take goes home with you, or into the donation bin for the Fairview shelter. Your call.'],
];

const WANT = [
  'Denim, leather and suede',
  'Band, tour and sports tees',
  'Workwear and army surplus',
  'Wool knits and 60s to 90s dresses',
  'Anything made before 2005 with life left in it',
];

const PASS = [
  'Fast fashion, whatever the label says',
  'Stains, stretch, pilling or moth',
  'Anything that smells of basement',
  'Shoes. We have no room.',
];

const TABS = Array.from({ length: 8 }, (_, k) => ({ key: `tab-${k}`, text: 'Second Life (555) 016-7755' }));

const SIZES = [
  ['1960s', '12', '6'],
  ['1970s', '10', '6'],
  ['1980s', '8', '6'],
  ['1990s', '6', '4 to 6'],
];

const MEASURES = [
  ['Pit to pit', 'Across the chest, armpit to armpit. Double it.'],
  ['Waist', 'Flat across the top of the waistband. Double it.'],
  ['Rise', 'Crotch seam to the top of the waistband.'],
  ['Inseam', 'Crotch seam to the hem.'],
  ['Length', 'Top of the shoulder to the hem.'],
];

const HOURS = [
  ['Tuesday to Saturday', '11-7'],
  ['Sunday', '12-5'],
  ['Monday', 'Closed, we are at the estate sales'],
];

export default function SecondLifeVintagePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--black': '#111111',
        '--paper': '#f1eee4',
        '--pink': '#ff2d8a',
        '--lime': '#c5f12e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="black,paper,pink,lime"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..900&family=Special+Elite&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Second Life</a>
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
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.issue" data-edit-max="240" data-edit-multiline className={s.issue}>Issue 12. Fall. Free, take one.</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.name}>
              Second <em>Life</em>
            </h1>
            <p data-edit="hero.vintage" data-edit-max="240" data-edit-multiline className={s.vintage}>Vintage, 1960 to 2005</p>
            <p data-edit="hero.typed" data-edit-max="240" data-edit-multiline className={s.typed}>
              Used clothes from the sixties to the early two-thousands, picked
              by hand, washed, mended where they needed it and priced fair.
              Under the laundromat sign on Mercer Row since 2014.
            </p>
            <p className={s.ctas}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#drops">The drop calendar</a>
              <a data-edit="hero.btnAlt" data-edit-max="28" className={s.btnAlt} href="#buy">Sell us your clothes</a>
            </p>
          </div>

          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,0,2,3,0,2" className={s.cutout} aria-hidden="true">
              <TabbiedPattern
                pattern={mixtape}
                palette={CUTOUT}
                fit="grid"
                cellSize={72}
                seed="second-life-cover"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <ul className={s.stickers}>
              {STICKERS.map((t, i) => (
                <li data-edit={`hero.item.${i}`} data-edit-max="80" key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* The tape: a strip of the cover pattern across the page. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,0,1,3,0,1" className={s.tape} aria-hidden="true">
          <TabbiedPattern
            pattern={mixtape}
            palette={TAPE}
            fit="grid"
            cellSize={48}
            seed="second-life-tape"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- DROPS */}
        <section id="drops" className={s.sec} aria-labelledby="drops-h">
          <div className={s.secHead}>
            <p data-edit="drops.page2" data-edit-max="240" data-edit-multiline className={s.page2}>p. 2</p>
            <h2 data-edit="drops.labelPink" data-edit-max="60" id="drops-h" className={s.labelPink}>October drops</h2>
            <p data-edit="drops.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Circle the days. The Friday rack goes out at noon and the good
              stuff is gone by two, so the line starts at half eleven.
            </p>
          </div>

          <div className={s.calWrap}>
            <div className={s.calendar}>
              <p data-edit="drops.month" data-edit-max="240" data-edit-multiline className={s.month}>October</p>
              <ol className={s.days}>
                {WEEKDAYS.map((d, i) => (
                  <li data-edit={`drops.dow.${i}`} data-edit-max="80" key={d} className={s.dow}>{d}</li>
                ))}
                {OCTOBER.map((d, i) => (
                  <li
                    key={d.n}
                    className={[s.day, d.first ? s.first : '', d.closed ? s.closed : '', d.kind ? s.hasDrop : ''].join(' ')}
                  >
                    <span data-edit={`drops.dayWd.${i}`} data-edit-max="60" className={s.dayWd}>{d.wd}</span>
                    <span data-edit={`drops.dayNum.${i}`} data-edit-max="60" className={s.dayNum}>{d.n}</span>
                    {d.label ? <span data-edit={`drops.drop.${i}`} data-edit-max="60" className={`${s.drop} ${s[d.kind]}`}>{d.label}</span> : null}
                  </li>
                ))}
              </ol>
            </div>

            <div className={s.calSide}>
              <dl className={s.legend}>
                {LEGEND.map(([k, v, kind], i) => (
                  <div key={k}>
                    <dt data-edit={`drops.drop2.${i}`} data-edit-max="28" className={`${s.drop} ${s[kind]}`}>{k}</dt>
                    <dd data-edit={`drops.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <div data-edit-pattern="drops.field" data-edit-roles="transparent,0,2" className={s.dots} aria-hidden="true">
                <TabbiedPattern
                  pattern={halftone}
                  palette={XEROX}
                  fit="grid"
                  cellSize={30}
                  seed="second-life-dots"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="drops.typedSmall" data-edit-max="240" data-edit-multiline className={s.typedSmall}>Mondays we are closed and out at the estate sales. That is where the Friday rack comes from.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- RACKS */}
        <section id="racks" className={s.sec} aria-labelledby="racks-h">
          <div className={s.secHead}>
            <p data-edit="racks.page2" data-edit-max="240" data-edit-multiline className={s.page2}>p. 3</p>
            <h2 data-edit="racks.labelLime" data-edit-max="60" id="racks-h" className={s.labelLime}>On the racks</h2>
            <p data-edit="racks.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Price ranges as of this issue. Every piece has a paper tag with
              its decade, what it is made of and its measurements, flat.
            </p>
          </div>

          <ul className={s.tags}>
            {RACKS.map((r, i) => (
              <li key={r.what} className={s.tag}>
                <p data-edit={`racks.tagEra.${i}`} data-edit-max="240" data-edit-multiline className={s.tagEra}>{r.era}</p>
                <h3 data-edit={`racks.title.${i}`} data-edit-max="40">{r.what}</h3>
                <p data-edit={`racks.tagPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.tagPrice}>{r.price}</p>
                <p data-edit={`racks.tagNote.${i}`} data-edit-max="240" data-edit-multiline className={s.tagNote}>{r.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BUY */}
        <section id="buy" className={s.sec} aria-labelledby="buy-h">
          <div className={s.flyer}>
            <p data-edit="buy.page2" data-edit-max="240" data-edit-multiline className={s.page2}>p. 4</p>
            <div className={s.flyerHead}>
              <div>
                <h2 data-edit="buy.flyerTitle" data-edit-max="60" id="buy-h" className={s.flyerTitle}>We buy clothes</h2>
                <p data-edit="buy.flyerLede" data-edit-max="240" data-edit-multiline className={s.flyerLede}>Bring us what you do not wear. If we can sell it, we pay you for it today.</p>
              </div>
              <figure className={s.xerox}>
                <Artwork
                  slug="second-life-vintage-jacket"
                  alt="A worn, faded denim trucker jacket laid flat with its sleeves spread"
                  inks={['var(--on-paper)', 'var(--paper)']}
                  className={s.jacket}
                />
                <figcaption data-edit="buy.paid" data-edit-max="120" data-edit-multiline className={s.paid}>We paid $22 for this one</figcaption>
              </figure>
            </div>

            <dl className={s.terms}>
              {BUY_TERMS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`buy.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`buy.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>

            <div className={s.lists}>
              <div>
                <h3 data-edit="buy.listTitle" data-edit-max="40" className={s.listTitle}>Yes please</h3>
                <ul className={s.yes}>
                  {WANT.map((w, i) => (
                    <li data-edit={`buy.item.${i}`} data-edit-max="80" key={w}>{w}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 data-edit="buy.listTitle2" data-edit-max="40" className={s.listTitle}>No thanks</h3>
                <ul className={s.no}>
                  {PASS.map((w, i) => (
                    <li data-edit={`buy.item2.${i}`} data-edit-max="80" key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <ul className={s.tabs} aria-hidden="true">
              {TABS.map((t, i) => (
                <li data-edit={`buy.item3.${i}`} data-edit-max="80" key={t.key}>{t.text}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- SIZING */}
        <section id="sizing" className={s.sec} aria-labelledby="sizing-h">
          <div className={s.secHead}>
            <p data-edit="sizing.page2" data-edit-max="240" data-edit-multiline className={s.page2}>p. 5</p>
            <h2 data-edit="sizing.labelPaper" data-edit-max="60" id="sizing-h" className={s.labelPaper}>Sizing, honestly</h2>
            <p data-edit="sizing.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Old size tags lie. Sizes grew as the years went on, so a dress
              that says 12 on the label can fit someone who buys a 6 today.
              Go by the tape, not the tag.
            </p>
          </div>

          <div className={s.sizing}>
            <table className={s.sizeTable}>
              <caption data-edit="sizing.srOnly" className={s.srOnly}>Women's tag sizes by decade and what they fit like today</caption>
              <thead>
                <tr>
                  <th data-edit="sizing.heading" scope="col">Decade</th>
                  <th data-edit="sizing.heading2" scope="col">Tag says</th>
                  <th data-edit="sizing.heading3" scope="col">Fits like</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map(([d, tag, now], i) => (
                  <tr key={d}>
                    <th data-edit={`sizing.heading4.${i}`} scope="row">{d}</th>
                    <td data-edit={`sizing.cell.${i}`}>{tag}</td>
                    <td data-edit={`sizing.cell2.${i}`}>{now}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={s.measure}>
              <h3 data-edit="sizing.listTitle" data-edit-max="40" className={s.listTitle}>What is on every tag</h3>
              <dl className={s.measures}>
                {MEASURES.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`sizing.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`sizing.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="sizing.typedSmall" data-edit-max="240" data-edit-multiline className={s.typedSmall}>
                Men's sizes barely moved, but jeans sat higher: a nineties
                32 waist sits at your navel, not your hips. Lay the thing you
                love best flat, measure it, and bring the numbers.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- FIND */}
        <section id="find" className={s.sec} aria-labelledby="find-h">
          <div className={s.secHead}>
            <p data-edit="find.page2" data-edit-max="240" data-edit-multiline className={s.page2}>p. 6</p>
            <h2 data-edit="find.labelPink" data-edit-max="60" id="find-h" className={s.labelPink}>Find us</h2>
          </div>

          <div className={s.findGrid}>
            <div className={s.where}>
              <p data-edit="find.addr" data-edit-max="240" data-edit-multiline className={s.addr}>77 Mercer Row, Lower Dellwood</p>
              <p data-edit="find.typedSmall" data-edit-max="240" data-edit-multiline className={s.typedSmall}>The pink door under the laundromat sign, then down six steps. Ring if it is locked; it sticks.</p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`find.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`find.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="find.link" data-edit-max="28" href="tel:+15550167755">(555) 016-7755</a>
                <a data-edit="find.link2" data-edit-max="28" href="mailto:racks@secondlife.example">racks@secondlife.example</a>
              </p>
            </div>

            <form className={s.form} action="#">
              <h3 data-edit="find.formTitle" data-edit-max="40" className={s.formTitle}>Get the Friday text</h3>
              <p data-edit="find.typedSmall2" data-edit-max="240" data-edit-multiline className={s.typedSmall}>One message a week, Thursday night, with a photo of the rack. Nothing else, ever.</p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="find.label" htmlFor="sl-name">Name</label>
                  <input id="sl-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="find.label2" htmlFor="sl-phone">Mobile</label>
                  <input id="sl-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={`${s.field} ${s.wide}`}>
                  <label data-edit="find.label3" htmlFor="sl-hunt">Hunting for</label>
                  <select id="sl-hunt" name="hunt" defaultValue="all">
                    <option value="all">A bit of everything</option>
                    <option value="denim">Denim</option>
                    <option value="tees">Band tees</option>
                    <option value="leather">Leather</option>
                    <option value="knit">Knitwear</option>
                    <option value="dresses">Dresses</option>
                  </select>
                </div>
              </div>
              <button data-edit="find.btn" data-edit-max="24" className={s.btn} type="submit">Put me on the list</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,1,2,3" className={s.confetti} aria-hidden="true">
          <TabbiedPattern
            pattern={sliver}
            palette={CONFETTI}
            fit="grid"
            cellSize={40}
            seed="second-life-confetti"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footBody}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Second Life Vintage</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional vintage clothing store. The racks, prices, dates and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>, drawn live; the jacket is a generated image drawn in the page's colors.
          </p>
        </div>
      </footer>
    </div>
  );
}
