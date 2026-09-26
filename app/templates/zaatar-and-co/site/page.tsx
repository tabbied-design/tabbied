import { TabbiedPattern } from 'tabbied/react';
import { caltrop, octagon } from 'tabbied/patterns';
import s from './zaatar-and-co.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: "Za'atar & Co.: Lebanese bakery and mezze, Cedar Row",
  description:
    "Za'atar & Co. bakes man'oushe to order in a domed oven on Cedar Row and packs mezze by the tray for two to forty. The flatbread board, tray sizes, the sweet counter and how to order ahead.",
};

/* Site colors. The tile panel lays its octagons on a transparent ground, so
   the panel's ink shows through as the grout; the star band and the knafeh
   tray do the same over sand. */
const INK = '#2a2318';
const OLIVE = '#58662a';
const POMEGRANATE = '#a02338';
const OIL = '#c29a3a';
const SAND = '#efe3c8';

const TILES = ['transparent', OLIVE, SAND, OLIVE, OIL, SAND];
const STARS = ['transparent', POMEGRANATE, OLIVE, OIL];
const TRAY = ['transparent', OIL, POMEGRANATE, OIL, SAND];
const WINDOW = ['transparent', SAND, OIL, OLIVE];

const NAV = [
  ["Man'oushe", '#manoushe'],
  ['Mezze trays', '#mezze'],
  ['Sweets', '#sweets'],
  ['The family', '#family'],
  ['Order ahead', '#order'],
  ['Visit', '#visit'],
];

const FACTS = [
  ['7:00', "first man'oushe out of the oven"],
  ['$4.50', 'za\'atar and oil, the one to start with'],
  ['48 hrs', 'notice for a party tray'],
];

type Bread = {
  name: string;
  gloss: string;
  body: string;
  price: string;
};

const BREADS: Bread[] = [
  { name: "Za'atar", gloss: 'thyme, sumac, sesame', body: 'Our own blend, mixed every Monday, spread thick on olive oil from Koura.', price: '$4.50' },
  { name: 'Jibneh', gloss: 'white cheese', body: 'Akkawi and a little mozzarella for the pull, with nigella seed on top.', price: '$6.50' },
  { name: 'Half and half', gloss: "za'atar and jibneh", body: 'One side each, for people who cannot choose. Most people.', price: '$5.75' },
  { name: 'Lahm bi ajeen', gloss: 'meat on dough', body: 'Spiced lamb, tomato and onion, pine nuts, a squeeze of lemon at the counter.', price: '$8.00' },
  { name: 'Kishk', gloss: 'fermented yogurt and bulgur', body: 'Sour, savory and a little nutty, with onion and walnut. Ask for a taste first.', price: '$6.00' },
  { name: 'Muhammara', gloss: 'red pepper and walnut', body: 'Roast pepper paste with pomegranate molasses, sweet and hot at once.', price: '$6.00' },
  { name: 'Sabanekh fatayer', gloss: 'spinach pies', body: 'Folded into triangles with onion, sumac and lemon. Sold by the piece or the half dozen.', price: '$3.75' },
  { name: 'Sujuk and egg', gloss: 'weekends only', body: 'Spiced beef sausage with an egg cracked on top in the last minute of the bake.', price: '$9.00' },
];

const EXTRAS = [
  ['Folded with tomato, cucumber, mint and olives', '+$1.50'],
  ['Labneh swirled on top', '+$1.00'],
  ['Extra cheese', '+$1.50'],
  ['An egg on anything', '+$1.50'],
];

type Tray = {
  size: string;
  inches: string;
  feeds: string;
  price: string;
  ring: string;
};

const TRAYS: Tray[] = [
  { size: 'Small', inches: '12 inch tray', feeds: '2-4 people', price: '$38', ring: 'ring1' },
  { size: 'Medium', inches: '14 inch tray', feeds: '5-8 people', price: '$68', ring: 'ring2' },
  { size: 'Large', inches: '16 inch tray', feeds: '10-14 people', price: '$115', ring: 'ring3' },
  { size: 'Party', inches: '18 inch tray', feeds: '18-25 people', price: '$195', ring: 'ring4' },
];

const SIZES = ['Small', 'Medium', 'Large', 'Party'];

/* What goes on each tray, small to party. */
const MEZZE: { dish: string; amounts: string[] }[] = [
  { dish: 'Hummus', amounts: ['8 oz', '16 oz', '24 oz', '40 oz'] },
  { dish: 'Moutabal', amounts: ['8 oz', '12 oz', '16 oz', '32 oz'] },
  { dish: "Labneh with za'atar", amounts: ['6 oz', '8 oz', '16 oz', '24 oz'] },
  { dish: 'Tabbouleh', amounts: ['8 oz', '16 oz', '32 oz', '48 oz'] },
  { dish: 'Fattoush', amounts: ['-', '16 oz', '32 oz', '48 oz'] },
  { dish: 'Falafel', amounts: ['8', '16', '30', '50'] },
  { dish: 'Kibbeh', amounts: ['-', '8', '16', '30'] },
  { dish: 'Warak enab', amounts: ['8', '16', '24', '40'] },
  { dish: 'Pickles and olives', amounts: ['yes', 'yes', 'yes', 'yes'] },
  { dish: 'Pita, warm', amounts: ['4', '8', '14', '24'] },
];

const SWEETS = [
  ['Maamoul, date', '$2.00 each'],
  ['Maamoul, pistachio or walnut', '$2.50 each'],
  ['A box of twelve, mixed', '$26'],
  ['Baklava, assorted', '$18 a pound'],
  ['Sfouf, turmeric semolina cake', '$3.00 a slice'],
  ['Knafeh, Saturday and Sunday', '$7.00 a slice'],
];

const FAMILY = [
  ['Rima Haddad', 'The dough and the oven. Up at four, first bake at seven.'],
  ['Georges Haddad', 'The mezze, the trays and the pickles, which take him three weeks.'],
  ['Nour Haddad', 'The counter, the phone and every catering order.'],
  ['Samir Khoury', 'The second oven on Saturdays, and the knafeh.'],
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Friday', '7 am to 3 pm'],
  ['Saturday', '7 am to 4 pm'],
  ['Sunday', '8 am to 2 pm'],
];

const FAQ = [
  ['Is anything gluten-free?', 'The mezze mostly is: the dips, the salads (fattoush aside) and the pickles. Every bread and pastry is wheat, and flour is in the air.'],
  ['What is vegan?', "The za'atar man'oushe, muhammara, the spinach pies, hummus, tabbouleh, falafel and warak enab. Ask and we will point at the rest."],
  ['Can I call an order in for today?', 'For breads, yes: call and it is out of the oven in fifteen minutes. Trays need the notice in the order form, no exceptions on Saturdays.'],
  ['Do you deliver?', 'Party trays only, within three miles of Cedar Row, for $15. Everything else is collected from the counter.'],
];

export default function ZaatarAndCoPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;1,400&family=El+Messiri:wght@400..700&display=swap"
      />

      <div className={s.shell}>
        {/* ------------------------------------------------------ THE PANEL
            The header is the left half: a wall of tiles with an arched
            plaque on it, holding the name and the sections. It stays put
            while the menu scrolls beside it, and folds to a bar on a phone. */}
        <header className={s.panel}>
          <div className={s.panelBar}>
            <a className={s.mark} href="#top">Za'atar &amp; Co.</a>
            <TemplateMenu className={s.siteMenu}>
              {NAV.map(([label, href]) => (
                <a key={href} href={href}>{label}</a>
              ))}
            </TemplateMenu>
          </div>

          <div className={s.stage}>
            <div className={s.tiles} aria-hidden="true">
              <TabbiedPattern
                pattern={octagon}
                palette={TILES}
                fit="grid"
                cellSize={58}
                seed="zaatar-tiles"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div className={s.plaque}>
              <p className={s.plaqueKicker}>Furn and mezze counter</p>
              <p className={s.plaqueName}>Za'atar &amp; Co.</p>
              <p className={s.plaqueSince}>14 Cedar Row, since 2011</p>
              <span className={s.star} aria-hidden="true" />
              <nav className={s.nav} aria-label="Sections">
                {NAV.map(([label, href]) => (
                  <a key={href} href={href}>{label}</a>
                ))}
              </nav>
            </div>
          </div>

          <div className={s.panelFoot}>
            <p className={s.oven}>The oven is lit from 6:30</p>
            <a className={s.panelPhone} href="tel:+15550142290">(555) 014-2290</a>
          </div>
        </header>

        <div className={s.column}>
          <main id="top">
            {/* --------------------------------------------------------- INTRO */}
            <section className={s.intro} aria-labelledby="intro-h">
              <Artwork
                slug="zaatar-and-co-manoushe"
                alt="A za'atar man'oushe rolled up in a paper sleeve, with a sprig of mint"
                inks={{ red: 'var(--pomegranate)', yellow: 'var(--oil)', black: 'var(--text)', blue: 'var(--olive)' }}
                className={s.manoushe}
              />
              <p className={s.kicker}>Lebanese bakery, Cedar Row</p>
              <h1 id="intro-h" className={s.title}>
                Man'oushe from the oven, <em>mezze by the tray.</em>
              </h1>
              <p className={s.lede}>
                Rima bakes flatbreads to order in a domed oven from seven
                until the dough runs out. Georges makes the mezze every
                morning and packs it into trays for tables of two to forty.
                Eat at the counter, take it to the park, or order ahead.
              </p>
              <dl className={s.facts}>
                {FACTS.map(([v, k]) => (
                  <div key={k}>
                    <dt>{v}</dt>
                    <dd>{k}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* ------------------------------------------------------ MANOUSHE */}
            <section id="manoushe" className={s.sec} aria-labelledby="manoushe-h">
              <div className={s.secHead}>
                <p className={s.kicker}>From the oven</p>
                <h2 id="manoushe-h">The man'oushe board</h2>
                <p className={s.secNote}>
                  Baked one at a time on the dome, about four minutes each.
                  Eaten open on a tray, or folded in paper to go.
                </p>
              </div>

              <ol className={s.board}>
                {BREADS.map((b, i) => (
                  <li key={b.name} className={s.bread}>
                    <span className={s.num}>{i + 1}</span>
                    <div className={s.breadText}>
                      <h3>{b.name}</h3>
                      <p className={s.gloss}>{b.gloss}</p>
                      <p className={s.breadBody}>{b.body}</p>
                    </div>
                    <span className={s.price}>{b.price}</span>
                  </li>
                ))}
              </ol>

              <div className={s.extras}>
                <h3 className={s.label}>On top, or folded in</h3>
                <dl className={s.extraList}>
                  {EXTRAS.map(([what, cost]) => (
                    <div key={what}>
                      <dt>{what}</dt>
                      <dd>{cost}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>

            {/* The star band: a strip of tile laid between the two counters. */}
            <div className={s.band} aria-hidden="true">
              <TabbiedPattern
                pattern={caltrop}
                palette={STARS}
                fit="grid"
                cellSize={44}
                seed="zaatar-stars"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            {/* --------------------------------------------------------- MEZZE */}
            <section id="mezze" className={s.sec} aria-labelledby="mezze-h">
              <div className={s.secHead}>
                <p className={s.kicker}>From the cold counter</p>
                <h2 id="mezze-h">Mezze trays, by size</h2>
                <p className={s.secNote}>
                  Every tray is vegetarian and comes with pickles, olives and
                  warm bread. Packed in the morning, good for four hours out
                  of the fridge.
                </p>
              </div>

              <ul className={s.trays}>
                {TRAYS.map((t) => (
                  <li key={t.size} className={s.trayItem}>
                    <div className={`${s.tray} ${s[t.ring]}`}>
                      <span className={s.traySize}>{t.size}</span>
                      <strong className={s.trayPrice}>{t.price}</strong>
                    </div>
                    <span className={s.trayInches}>{t.inches}</span>
                    <span className={s.trayFeeds}>{t.feeds}</span>
                  </li>
                ))}
              </ul>

              <div className={s.tableWrap}>
                <table className={s.matrix}>
                  <caption className={s.srOnly}>What each tray holds, from small to party</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={s.dishCol}>On the tray</th>
                      {SIZES.map((z) => (
                        <th key={z} scope="col">{z}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MEZZE.map((m) => (
                      <tr key={m.dish}>
                        <th scope="row" className={s.dishCol}>{m.dish}</th>
                        {m.amounts.map((a, j) => (
                          <td key={SIZES[j]}>{a}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={s.small}>
                Add lamb kafta skewers to any tray for $3.50 a skewer. Counts
                are pieces; dips and salads are by weight.
              </p>
            </section>

            {/* -------------------------------------------------------- SWEETS */}
            <section id="sweets" className={s.sec} aria-labelledby="sweets-h">
              <div className={s.sweetsGrid}>
                <div>
                  <div className={s.secHead}>
                    <p className={s.kicker}>The sweet counter</p>
                    <h2 id="sweets-h">By the piece, the box and the pound</h2>
                    <p className={s.secNote}>
                      Maamoul are pressed in wooden molds on Thursdays. The
                      knafeh comes out of the oven at ten on weekends and is
                      gone by one.
                    </p>
                  </div>
                  <dl className={s.sweets}>
                    {SWEETS.map(([what, price]) => (
                      <div key={what}>
                        <dt>{what}</dt>
                        <dd>{price}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className={s.trayHang}>
                  <div className={s.knafeh} aria-hidden="true">
                    <TabbiedPattern
                      pattern={octagon}
                      palette={TRAY}
                      fit="grid"
                      cellSize={34}
                      seed="zaatar-knafeh"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <p className={s.trayCaption}>The weekend knafeh tray, cut in diamonds at the counter.</p>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------- FAMILY */}
            <section id="family" className={s.sec} aria-labelledby="family-h">
              <div className={s.familyGrid}>
                <div className={s.window} aria-hidden="true">
                  <TabbiedPattern
                    pattern={caltrop}
                    palette={WINDOW}
                    fit="grid"
                    cellSize={40}
                    seed="zaatar-window"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div>
                  <div className={s.secHead}>
                    <p className={s.kicker}>Who is behind the counter</p>
                    <h2 id="family-h">The Haddads, and Samir</h2>
                  </div>
                  <p className={s.prose}>
                    Rima learned the dough from her aunt in Zahle and Georges
                    ran a mezze counter in Beirut for eleven years. We opened
                    on Cedar Row in 2011 with one oven, a borrowed fridge and
                    a sign painted by our daughter, which is still over the
                    door.
                  </p>
                  <dl className={s.people}>
                    {FAMILY.map(([who, what]) => (
                      <div key={who}>
                        <dt>{who}</dt>
                        <dd>{what}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </section>

            {/* --------------------------------------------------------- ORDER */}
            <section id="order" className={s.sec} aria-labelledby="order-h">
              <div className={s.secHead}>
                <p className={s.kicker}>Trays and big orders</p>
                <h2 id="order-h">Order ahead</h2>
                <p className={s.secNote}>
                  A day's notice for small and medium trays, two days for
                  large and party. Party trays take a deposit of half; the
                  rest is paid when you collect.
                </p>
              </div>

              <form className={s.form} action="#">
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label htmlFor="zc-name">Name</label>
                    <input id="zc-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="zc-phone">Phone</label>
                    <input id="zc-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="zc-date">Collection day</label>
                    <input id="zc-date" name="date" type="date" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="zc-time">Time</label>
                    <select id="zc-time" name="time" defaultValue="11">
                      <option value="8">8 am</option>
                      <option value="9">9 am</option>
                      <option value="10">10 am</option>
                      <option value="11">11 am</option>
                      <option value="12">Noon</option>
                      <option value="13">1 pm</option>
                      <option value="14">2 pm</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="zc-tray">Tray</label>
                    <select id="zc-tray" name="tray" defaultValue="medium">
                      <option value="small">Small, 2-4 people, $38</option>
                      <option value="medium">Medium, 5-8 people, $68</option>
                      <option value="large">Large, 10-14 people, $115</option>
                      <option value="party">Party, 18-25 people, $195</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="zc-count">How many trays</label>
                    <input id="zc-count" name="count" type="number" min={1} max={12} defaultValue={1} />
                  </div>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label htmlFor="zc-notes">Breads, sweets, allergies</label>
                    <textarea id="zc-notes" name="notes" rows={3} />
                  </div>
                </div>
                <button className={s.submit} type="submit">Send the order</button>
                <p className={s.small}>Nour calls back the same day to confirm. Nothing is packed until you have heard from her.</p>
              </form>
            </section>

            {/* --------------------------------------------------------- VISIT */}
            <section id="visit" className={s.sec} aria-labelledby="visit-h">
              <div className={s.secHead}>
                <p className={s.kicker}>Find the counter</p>
                <h2 id="visit-h">Visit</h2>
              </div>
              <div className={s.visit}>
                <dl className={s.hours}>
                  {HOURS.map(([d, h]) => (
                    <div key={d}>
                      <dt>{d}</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <p className={s.address}>14 Cedar Row, Millbrook Heights</p>
                  <p className={s.small}>
                    Two parking spaces behind the shop, off Linden Alley. Six
                    stools at the counter and two tables on the pavement
                    when it is dry.
                  </p>
                  <p className={s.contact}>
                    <a href="tel:+15550142290">(555) 014-2290</a>
                  </p>
                  <p className={s.contact}>
                    <a href="mailto:trays@zaatarandco.example">trays@zaatarandco.example</a>
                  </p>
                </div>
              </div>

              <div className={s.faq}>
                {FAQ.map(([q, a]) => (
                  <details key={q} className={s.faqItem}>
                    <summary>{q}</summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          <footer className={s.footer}>
            <p className={s.footName}>Za'atar &amp; Co.</p>
            <p>A fictional Lebanese bakery. The breads, prices, people and address are invented.</p>
            <p>
              Patterns by <a href="https://tabbied.com">Tabbied</a>; the man'oushe is a generated picture drawn in the page's own colors.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
