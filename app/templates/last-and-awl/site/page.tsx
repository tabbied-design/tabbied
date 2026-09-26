import { TabbiedPattern } from 'tabbied/react';
import { corduroy } from 'tabbied/patterns';
import s from './last-and-awl.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Last & Awl: Shoe and leather repair, Tanner\'s Row',
  description:
    'Last & Awl mends shoes, boots, bags and belts on Tanner\'s Row. The price board, how our repair tickets work, how long each job takes, and the after-hours drop box.',
};

/* Site colors: the plaster wall and four inks. The ribbed fields (the
   doormat, the belt, the swatch) take only these. */
const BOTTLE = '#173f2f';
const GOLD = '#c8993a';
const OXBLOOD = '#6f2320';
const TAN = '#a8672f';

const MAT = [BOTTLE, GOLD, TAN, OXBLOOD];
const STRAP = [OXBLOOD, TAN, GOLD, OXBLOOD];
const SWATCH = [TAN, OXBLOOD, GOLD];

const NAV = [
  ['Prices', '#prices'],
  ['Tickets', '#tickets'],
  ['Turnaround', '#turnaround'],
  ['Bags and belts', '#leather'],
  ['The bench', '#bench'],
  ['Visit', '#visit'],
];

const PROMISES = [
  ['Heels', 'while you wait'],
  ['Resoles', 'in a week'],
  ['Every job', 'on a ticket'],
];

type Plate = {
  title: string;
  size: 'big' | 'mid' | 'small';
  items: string[][];
};

/* The enamel plates on the wall behind the counter, as they hang. */
const PLATES: Plate[] = [
  {
    title: 'Soles',
    size: 'big',
    items: [
      ['Half soles, leather', '$55'],
      ['Full soles, leather', '$85'],
      ['Full soles, commando rubber', '$75'],
      ['Goodyear welted resole', '$140'],
      ['Sole guards, stuck on', '$28'],
      ['Toe taps, steel or rubber', '$16'],
    ],
  },
  {
    title: 'Heels',
    size: 'mid',
    items: [
      ['Top pieces, men\'s', '$24'],
      ['Heel tips, women\'s', '$14'],
      ['Stiletto tips', '$12'],
      ['Rebuild a worn stack', '$38'],
    ],
  },
  {
    title: 'Care',
    size: 'mid',
    items: [
      ['Polish and shine', '$10'],
      ['Suede clean and brush', '$20'],
      ['Salt stains out', '$18'],
      ['Dye to a new color', '$55'],
    ],
  },
  {
    title: 'Zips',
    size: 'small',
    items: [
      ['Boots', '$45'],
      ['Bags', '$30'],
      ['Jackets', '$40'],
    ],
  },
  {
    title: 'Stitching',
    size: 'small',
    items: [
      ['Re-stitch a seam', 'from $12'],
      ['Patch a hole', '$18'],
      ['Pull tabs', '$15'],
    ],
  },
  {
    title: 'Stretching',
    size: 'small',
    items: [
      ['Width or instep', '$16'],
      ['Boot calves', '$30'],
      ['Overnight on the last', 'free'],
    ],
  },
];

const TICKET_STEPS = [
  ['You bring it in', 'We look it over with you at the counter and say what it needs and what it costs. Nothing is started without a price you have agreed.'],
  ['We write a ticket', 'Two halves, one number. The top half is tied to your shoes; you keep the stub.'],
  ['The date goes on the stub', 'The day and time it will be ready, in pen. If we are going to be late, we call before the date, not after.'],
  ['You bring the stub back', 'Pay when you collect. Lost the stub? Bring photo ID and tell us what the shoes look like.'],
  ['Ninety days', 'Anything not collected after ninety days, and three phone calls, goes to the shelter on Cooper Street.'],
];

const TURNAROUND = [
  { n: '15', unit: 'minutes', what: 'Heel tips, stretching, laces, a shine. Wait on the bench or come back after coffee.' },
  { n: '1', unit: 'day', what: 'Heels, half soles, zips on bags, stitching and patches.' },
  { n: '3', unit: 'days', what: 'Full soles, boot zips, dye jobs and most bag repairs.' },
  { n: '7', unit: 'days', what: 'Goodyear welted resoles. The welt is cut and sewn by hand.' },
  { n: '14', unit: 'days', what: 'New belts and made-to-order leather goods from Inês.' },
];

const LEATHER = [
  ['Belts cut and holed', 'While you wait; free on any belt bought here', '$6'],
  ['A new belt, made to measure', 'Vegetable-tanned hide, brass or steel buckle', '$65'],
  ['Bag handles re-stitched', 'Saddle stitch, by hand, waxed thread', 'from $35'],
  ['New straps and D-rings', 'For bags, cameras and guitar cases', 'from $28'],
  ['Leather jackets', 'Cuffs, linings, pockets and zips', 'from $40'],
  ['Dog collars and leads', 'Made to order, with the name stamped in', '$45'],
];

const CANNOT = [
  'Molded foam soles on trainers. There is nothing to stitch or stick a new sole to, and we will tell you before you pay.',
  'Plastic heels that are part of the sole.',
  'Patent leather that has cracked. We can polish it, not mend it.',
  'Anything where the repair costs more than the shoes are worth to you. We will say so.',
];

const PEOPLE = [
  { name: 'Aldo Ferreira', role: 'Cobbler, owner', note: 'Trained in Porto, at the bench since 1981, on Tanner\'s Row since 1987. Soles, welts, and anything old.' },
  { name: 'Inês Ferreira', role: 'Bags, belts and leather goods', note: 'Aldo\'s daughter. Made her first belt at eleven; runs the leather side of the shop since 2012.' },
  { name: 'Kwame Asante', role: 'Apprentice, second year', note: 'Heels, shines and stretching, and learning the welt one pair at a time.' },
];

const HOURS = [
  ['Monday to Friday', '8 am to 6 pm'],
  ['Saturday', '9 am to 3 pm'],
  ['Sunday', 'Closed'],
];

export default function LastAndAwlPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--wall': '#eee4cf',
        '--bottle': '#173f2f',
        '--gold': '#c8993a',
        '--oxblood': '#6f2320',
        '--tan': '#a8672f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="wall,bottle,gold,oxblood,tan"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Holtwood+One+SC&family=Zilla+Slab:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Last & Awl</a>
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
        {/* ------------------------------------------------------------ SIGN */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.sign}>
            <p data-edit="hero.signTop" data-edit-max="240" data-edit-multiline className={s.signTop}>Shoe and leather repair</p>
            <h1 data-edit="hero.signName" data-edit-max="70" id="hero-h" className={s.signName}>Last & Awl</h1>
            <p data-edit="hero.signBottom" data-edit-max="240" data-edit-multiline className={s.signBottom}>Tanner's Row, since 1987</p>
          </div>

          <div className={s.heroBelow}>
            <Artwork
              slug="last-and-awl-brogue"
              alt="A leather brogue sitting on a wooden shoe last, engraved with hatched shading"
              inks={['var(--text)']}
              className={s.brogue}
            />
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              We resole, reheel, restitch and restore shoes, boots, bags and
              belts, at one bench behind one counter, the same way since 1987.
              Bring it in, get a ticket, collect it on the day we write down.
            </p>
            <ul className={s.promises}>
              {PROMISES.map(([big, small], i) => (
                <li key={big}>
                  <strong data-edit={`hero.emphasis.${i}`}>{big}</strong>
                  <span data-edit={`hero.text.${i}`} data-edit-max="60">{small}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The doormat at the shop door. */}
        <div data-edit-pattern="top.field" data-edit-roles="1,2,4,3" className={s.mat} aria-hidden="true">
          <TabbiedPattern
            pattern={corduroy}
            palette={MAT}
            fit="grid"
            cellSize={40}
            seed="awl-mat"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.prices} aria-labelledby="prices-h">
          <div className={s.inner}>
            <div className={s.head}>
              <h2 data-edit="prices.title" data-edit-max="60" id="prices-h">The price board</h2>
              <p data-edit="prices.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                As it hangs behind the counter. Prices are per pair unless it
                says otherwise, and they include the leather.
              </p>
            </div>

            <div className={s.board}>
              {PLATES.map((p, i) => (
                <article key={p.title} className={`${s.plate} ${s[p.size]}`} aria-labelledby={`plate-${p.title}`}>
                  <h3 data-edit={`plate.plateTitle.${i}`} data-edit-max="40" id={`plate-${p.title}`} className={s.plateTitle}>{p.title}</h3>
                  <ul className={s.plateList}>
                    {p.items.map(([what, price], i2) => (
                      <li key={what}>
                        <span data-edit={`plate.plateItem.${i}.${i2}`} data-edit-max="60" className={s.plateItem}>{what}</span>
                        <span data-edit={`plate.platePrice.${i}.${i2}`} data-edit-max="60" className={s.platePrice}>{price}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p data-edit="prices.boardNote" data-edit-max="240" data-edit-multiline className={s.boardNote}>Keys cut while you wait, $4 to $8. Laces and insoles at the counter.</p>
          </div>
        </section>

        {/* --------------------------------------------------------- TICKETS */}
        <section id="tickets" className={s.tickets} aria-labelledby="tickets-h">
          <div className={s.inner}>
            <div className={s.ticketGrid}>
              <div>
                <div className={s.head}>
                  <h2 data-edit="tickets.title" data-edit-max="60" id="tickets-h">How the ticket works</h2>
                  <p data-edit="tickets.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                    Forty pairs of shoes go through the shop in a normal week.
                    The ticket is how every one of them comes back to the
                    right person.
                  </p>
                </div>
                <ol className={s.steps}>
                  {TICKET_STEPS.map(([title, body], i) => (
                    <li key={title}>
                      <span className={s.stepNum}>{String(i + 1)}</span>
                      <div>
                        <h3 data-edit={`tickets.title2.${i}`} data-edit-max="40">{title}</h3>
                        <p data-edit={`tickets.body.${i}`} data-edit-max="240" data-edit-multiline>{body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={s.ticket}>
                <div className={s.ticketMain}>
                  <p data-edit="tickets.ticketShop" data-edit-max="240" data-edit-multiline className={s.ticketShop}>Last & Awl, 9 Tanner's Row</p>
                  <p data-edit="tickets.ticketNo" data-edit-max="240" data-edit-multiline className={s.ticketNo}>No. 4471</p>
                  <dl className={s.ticketFields}>
                    <div>
                      <dt data-edit="tickets.term" data-edit-max="28">Name</dt>
                      <dd data-edit="tickets.body2" data-edit-max="200" data-edit-multiline>M. Okafor</dd>
                    </div>
                    <div>
                      <dt data-edit="tickets.term2" data-edit-max="28">Item</dt>
                      <dd data-edit="tickets.body3" data-edit-max="200" data-edit-multiline>Brown brogues, one pair</dd>
                    </div>
                    <div>
                      <dt data-edit="tickets.term3" data-edit-max="28">Work</dt>
                      <dd data-edit="tickets.body4" data-edit-max="200" data-edit-multiline>Full leather soles, rubber heels</dd>
                    </div>
                    <div>
                      <dt data-edit="tickets.term4" data-edit-max="28">Price</dt>
                      <dd data-edit="tickets.body5" data-edit-max="200" data-edit-multiline>$109</dd>
                    </div>
                  </dl>
                  <p data-edit="tickets.stamp" data-edit-max="240" data-edit-multiline className={s.stamp}>Ready</p>
                </div>
                <div className={s.ticketStub}>
                  <p data-edit="tickets.stubLabel" data-edit-max="240" data-edit-multiline className={s.stubLabel}>Keep this half</p>
                  <p data-edit="tickets.stubNo" data-edit-max="240" data-edit-multiline className={s.stubNo}>No. 4471</p>
                  <p data-edit="tickets.stubDate" data-edit-max="240" data-edit-multiline className={s.stubDate}>Thursday, 4 pm</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ TURNAROUND */}
        <section id="turnaround" className={s.turn} aria-labelledby="turn-h">
          <div className={s.inner}>
            <div className={s.head}>
              <h2 data-edit="turnaround.title" data-edit-max="60" id="turn-h">How long it takes</h2>
              <p data-edit="turnaround.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                From the day you bring it in, on a normal week. Before a
                holiday, and in the first cold week of winter, add a day.
              </p>
            </div>
            <ol className={s.times}>
              {TURNAROUND.map((t, i) => (
                <li key={t.n}>
                  <p className={s.timeFig}>
                    <span data-edit={`turnaround.timeN.${i}`} data-edit-max="60" className={s.timeN}>{t.n}</span>
                    <span data-edit={`turnaround.timeUnit.${i}`} data-edit-max="60" className={s.timeUnit}>{t.unit}</span>
                  </p>
                  <p data-edit={`turnaround.timeWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.timeWhat}>{t.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- LEATHER */}
        <section id="leather" className={s.leather} aria-labelledby="leather-h">
          <div className={s.inner}>
            <div className={s.head}>
              <h2 data-edit="leather.title" data-edit-max="60" id="leather-h">Bags and belts too</h2>
              <p data-edit="leather.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                Inês runs the leather side of the shop from the second bench:
                anything with a buckle, a strap or a handle.
              </p>
            </div>
          </div>

          <div className={s.belt}>
            <div data-edit-pattern="leather.field" data-edit-roles="3,4,2,3" className={s.strap} aria-hidden="true">
              <TabbiedPattern
                pattern={corduroy}
                palette={STRAP}
                fit="grid"
                cellSize={28}
                seed="awl-belt"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.buckle} aria-hidden="true" />
          </div>

          <div className={s.inner}>
            <ul className={s.leatherList}>
              {LEATHER.map(([what, how, price], i) => (
                <li key={what}>
                  <h3 data-edit={`leather.title2.${i}`} data-edit-max="40">{what}</h3>
                  <p data-edit={`leather.body.${i}`} data-edit-max="240" data-edit-multiline>{how}</p>
                  <span data-edit={`leather.leatherPrice.${i}`} data-edit-max="60" className={s.leatherPrice}>{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ BENCH */}
        <section id="bench" className={s.bench} aria-labelledby="bench-h">
          <div className={s.inner}>
            <div className={s.benchGrid}>
              <div className={s.nameNote}>
                <div data-edit-pattern="bench.field" data-edit-roles="4,3,2" className={s.swatch} aria-hidden="true">
                  <TabbiedPattern
                    pattern={corduroy}
                    palette={SWATCH}
                    fit="grid"
                    cellSize={34}
                    seed="awl-swatch"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <h2 data-edit="bench.title" data-edit-max="60" id="bench-h">At the bench</h2>
                <p data-edit="bench.body" data-edit-max="240" data-edit-multiline>
                  A last is the wooden foot a shoe is built on. An awl is the
                  spike that makes the holes for the stitches. Aldo has 212
                  lasts on the back wall, and one awl he has used since 1981.
                </p>
              </div>

              <ul className={s.people}>
                {PEOPLE.map((p, i) => (
                  <li key={p.name}>
                    <h3 data-edit={`bench.title2.${i}`} data-edit-max="40">{p.name}</h3>
                    <p data-edit={`bench.role.${i}`} data-edit-max="240" data-edit-multiline className={s.role}>{p.role}</p>
                    <p data-edit={`bench.body2.${i}`} data-edit-max="240" data-edit-multiline>{p.note}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.cannot}>
              <h3 data-edit="bench.title3" data-edit-max="40">What we cannot fix</h3>
              <ul>
                {CANNOT.map((c, i) => (
                  <li data-edit={`bench.item.${i}`} data-edit-max="80" key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.inner}>
            <div className={s.visitGrid}>
              <div>
                <h2 data-edit="visit.title" data-edit-max="60" id="visit-h">9 Tanner's Row</h2>
                <p data-edit="visit.visitSub" data-edit-max="240" data-edit-multiline className={s.visitSub}>Old Market, between the saddler and the bus stop</p>
                <dl className={s.hours}>
                  {HOURS.map(([d, h], i) => (
                    <div key={d}>
                      <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                      <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.contact}>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550127730">(555) 012-7730</a>
                </p>
                <p className={s.contact}>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:counter@lastandawl.example">counter@lastandawl.example</a>
                </p>
              </div>

              <div className={s.dropBox}>
                <h3 data-edit="visit.title2" data-edit-max="40">The drop box</h3>
                <p data-edit="visit.body2" data-edit-max="240" data-edit-multiline>
                  Closed when you pass? There is a brass slot in the door. Put
                  the shoes in a bag with your name, your phone number and what
                  they need on a piece of paper, and post them through. We call
                  with a price the next morning before we start.
                </p>
                <h3 data-edit="visit.title3" data-edit-max="40">By post</h3>
                <p data-edit="visit.body3" data-edit-max="240" data-edit-multiline>
                  Send boots to the shop address in any box. We email a quote
                  within two days of them arriving, and post them back for $12.
                </p>
                <p data-edit="visit.payNote" data-edit-max="240" data-edit-multiline className={s.payNote}>Cash or card, paid when you collect.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="1,2,4,3" className={s.footMat} aria-hidden="true">
          <TabbiedPattern
            pattern={corduroy}
            palette={MAT}
            fit="grid"
            cellSize={40}
            seed="awl-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footText}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Last & Awl</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional shoe and leather repair shop. The people, prices and tickets are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The brogue is a generated image, drawn in the page's own colors.</p>
        </div>
      </footer>
    </div>
  );
}
