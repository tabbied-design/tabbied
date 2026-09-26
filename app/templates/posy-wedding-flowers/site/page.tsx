import { TabbiedPattern } from 'tabbied/react';
import { cavetto, foldback, ivy, lobeform, roundpair } from 'tabbied/patterns';
import s from './posy-wedding-flowers.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Posy: Wedding and event florist, Larkspur Mews',
  description:
    'Posy designs flowers for weddings and events from a small studio on Larkspur Mews. The lookbook, three packages, how a consultation works and which flowers are in season when.',
};

/* Site colors. Every plate lays its petals and leaves on a transparent
   ground, so the plate's own tint shows between them like paper. */
const BLUSH = '#f4e3dc';
const GREEN = '#1f3a2c';
const ROSE = '#c0616f';
const SAGE = '#8fa588';
const PETAL = '#e7b8ae';

const COVER = ['transparent', ROSE, PETAL, SAGE, ROSE, GREEN];
const TOSS = ['transparent', ROSE, PETAL, BLUSH, SAGE];
const MEADOW = ['transparent', SAGE, GREEN, PETAL];
const BUDS = ['transparent', ROSE, PETAL, GREEN, BLUSH];
const TABLE = ['transparent', GREEN, SAGE, ROSE, BLUSH];
const STUDIO = ['transparent', GREEN, ROSE, SAGE, BLUSH];
const BACK = ['transparent', ROSE, SAGE, PETAL, GREEN];

const NAV = [
  ['Lookbook', '#lookbook'],
  ['In season', '#season'],
  ['Packages', '#packages'],
  ['Consultation', '#consultation'],
  ['Questions', '#questions'],
  ['Enquire', '#enquire'],
];

const COVER_LINES = [
  ['Peonies in June, dahlias until October', 'page four'],
  ['Three packages, from city hall to two hundred', 'page five'],
  ['What to bring to your consultation', 'page six'],
];

type Package = {
  name: string;
  who: string;
  price: string;
  items: string[];
};

const PACKAGES: Package[] = [
  {
    name: 'The Posy',
    who: 'Elopements and city hall',
    price: 'from $650',
    items: ['A bridal bouquet', 'Two buttonholes and two corsages', 'Delivered to your door on the morning', 'Weekdays any time of year'],
  },
  {
    name: 'The Garden',
    who: 'Up to eighty guests',
    price: 'from $2,800',
    items: ['Bouquets and buttonholes for the wedding party', 'Two ceremony arrangements, moved to the reception', 'Ten table centerpieces in our vessels', 'Setup, and collection the next morning'],
  },
  {
    name: 'The Full Bloom',
    who: 'Eighty to two hundred guests',
    price: 'from $6,500',
    items: ['Everything in The Garden, at your numbers', 'An arch or a hanging installation', 'A designer on site from setup to first dance', 'A mock-up centerpiece two weeks before'],
  },
];

const STEPS = [
  ['Write to us', 'Send the date, the venue and a rough number of guests. We reply within two working days, and say so if the date is taken.'],
  ['Come to the studio', 'An hour at the long table. Bring your colors, a fabric swatch, pictures you love and pictures you hate. We pull flowers from the cooler as we talk.'],
  ['The proposal', 'Within a week: every piece listed and priced, with the flowers in each and what we will swap them for if a crop fails.'],
  ['Book it', 'A 30% deposit holds the date. The balance is due thirty days before, when the numbers are final.'],
];

/* Three flowers from the calendar, drawn as botanical plates. */
const SPECIMENS = [
  { art: 'posy-wedding-flowers-ranunculus', alt: 'An engraving of a ranunculus on a curving stem, with a bud', name: 'Ranunculus', when: 'March and April' },
  { art: 'posy-wedding-flowers-peony', alt: 'An engraving of a peony with its bud and two leaves', name: 'Peony', when: 'June, for three weeks' },
  { art: 'posy-wedding-flowers-dahlia', alt: 'An engraving of a single dahlia on its stem with one leaf', name: 'Dahlia', when: 'August to October' },
];

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/* 0 not in season, 1 in season, 2 at its best. January first. */
const SEASON: { flower: string; months: number[] }[] = [
  { flower: 'Hellebore', months: [2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1] },
  { flower: 'Anemone', months: [1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 1] },
  { flower: 'Tulip', months: [1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1] },
  { flower: 'Ranunculus', months: [1, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0] },
  { flower: 'Sweet pea', months: [0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0] },
  { flower: 'Peony', months: [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0] },
  { flower: 'Garden rose', months: [0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 0, 0] },
  { flower: 'Cosmos', months: [0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0] },
  { flower: 'Lisianthus', months: [0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0] },
  { flower: 'Dahlia', months: [0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0] },
  { flower: 'Chrysanthemum', months: [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1] },
  { flower: 'Amaryllis', months: [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2] },
];

const CELL = ['off', 'on', 'peak'];
const CELL_WORDS = ['not in season', 'in season', 'at its best'];

const QUESTIONS = [
  ['What happens to the flowers afterwards?', 'Take home whatever you like. On Monday we collect the rest and take it to Harbor Hospice, where it is rearranged for the rooms.'],
  ['Can we use our own vases?', 'Yes, if they are at the venue by the day before and clean. Our vessels are included in The Garden and The Full Bloom.'],
  ['Do you work with dried flowers?', 'For bouquets that need to last, yes. We dry our own lavender, grasses and strawflowers; tell us early, they take a month.'],
  ['How far do you travel?', 'Anywhere within forty miles of the studio at no charge. Beyond that, $1.20 a mile, and a hotel if it is more than two hours away.'],
  ['What is the minimum?', '$650 on a weekday. $2,000 on Saturdays from May to October, when we take one wedding a day.'],
];

export default function PosyPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Tenor+Sans&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Posy</a>
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
        {/* ----------------------------------------------------------- COVER
            A magazine cover: the name as a masthead, the cover lines down
            one side and the cover picture beside them. */}
        <section className={s.cover} aria-labelledby="cover-h">
          <p className={s.issue}>The wedding book, 2027 season</p>
          <h1 id="cover-h" className={s.masthead}>Posy</h1>
          <div className={s.coverBody}>
            <div className={s.coverText}>
              <p className={s.dek}>
                Wedding and event flowers from a small studio on Larkspur
                Mews. Grown near here where we can, chosen at the market at
                four in the morning where we cannot, and arranged by two
                people who will be there on the day.
              </p>
              <ul className={s.coverLines}>
                {COVER_LINES.map(([line, page]) => (
                  <li key={line}>
                    <span className={s.coverLine}>{line}</span>
                    <span className={s.coverPage}>{page}</span>
                  </li>
                ))}
              </ul>
              <a className={s.button} href="#enquire">Ask about your date</a>
            </div>
            <figure className={s.coverFigure}>
              <div className={s.coverPlate} aria-hidden="true">
                <TabbiedPattern
                  pattern={cavetto}
                  palette={COVER}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={60}
                  seed="posy-cover"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.coverArch}>
                <Artwork
                  slug="posy-wedding-flowers-bouquet"
                  alt="A hand-tied bridal bouquet of peonies, garden roses and trailing greenery, its stems bound in ribbon"
                  inks={['var(--display-ink)', 'var(--sheet)']}
                  className={s.bouquet}
                />
              </div>
              <figcaption className={s.coverCredit}>On the cover: peonies, garden roses and jasmine, hand-tied, $240</figcaption>
            </figure>
          </div>
        </section>

        {/* -------------------------------------------------------- LOOKBOOK */}
        <section id="lookbook" className={s.sec} aria-labelledby="lookbook-h">
          <div className={s.secHead}>
            <p className={s.folio}>Page two</p>
            <h2 id="lookbook-h">The lookbook</h2>
            <p className={s.secNote}>
              Four pieces from last season, each one priced as it was made.
              Nothing here is a set menu; every wedding starts again.
            </p>
          </div>

          <div className={s.look}>
            <figure className={`${s.lookItem} ${s.lookA}`}>
              <div className={`${s.plate} ${s.plateTall}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={roundpair}
                  palette={TOSS}
                  fit="grid"
                  cellSize={46}
                  seed="posy-toss"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span className={s.capNo}>No. 1</span>
                <strong className={s.capTitle}>The garden toss</strong>
                <span className={s.capBody}>A loose bridal bouquet: garden roses, sweet pea and trailing jasmine</span>
                <span className={s.capPrice}>$240</span>
              </figcaption>
            </figure>

            <figure className={`${s.lookItem} ${s.lookB}`}>
              <div className={`${s.plate} ${s.plateWide}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={ivy}
                  palette={MEADOW}
                  fit="grid"
                  cellSize={40}
                  seed="posy-meadow"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span className={s.capNo}>No. 2</span>
                <strong className={s.capTitle}>Meadow aisle</strong>
                <span className={s.capBody}>Low wooden troughs of grasses and wildflowers along the aisle, a pair</span>
                <span className={s.capPrice}>$380</span>
              </figcaption>
            </figure>

            <figure className={`${s.lookItem} ${s.lookC}`}>
              <div className={`${s.plate} ${s.plateSquare}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={lobeform}
                  palette={BUDS}
                  fit="grid"
                  cellSize={34}
                  seed="posy-buds"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span className={s.capNo}>No. 3</span>
                <strong className={s.capTitle}>Buttonholes</strong>
                <span className={s.capBody}>Spray rose and wax flower, bound in silk ribbon</span>
                <span className={s.capPrice}>from $18</span>
              </figcaption>
            </figure>

            <figure className={`${s.lookItem} ${s.lookD}`}>
              <div className={`${s.plate} ${s.plateSquare}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={foldback}
                  palette={TABLE}
                  fit="grid"
                  cellSize={38}
                  seed="posy-table"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span className={s.capNo}>No. 4</span>
                <strong className={s.capTitle}>The long table</strong>
                <span className={s.capBody}>A garland of olive and eucalyptus with ranunculus, by the foot</span>
                <span className={s.capPrice}>$28 a foot</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------------------------------------------------------- SEASON */}
        <section id="season" className={s.sec} aria-labelledby="season-h">
          <div className={s.seasonHead}>
            <div className={s.secHead}>
              <p className={s.folio}>Page four</p>
              <h2 id="season-h">What is in season when</h2>
              <p className={s.secNote}>
                Choose by month and the flowers are cheaper, stronger and
                smell of something. Roses, orchids, eucalyptus and ferns are
                good all year.
              </p>
            </div>
            <ul className={s.specimens}>
              {SPECIMENS.map((f) => (
                <li key={f.art} className={s.specimen}>
                  <Artwork slug={f.art} alt={f.alt} inks={['var(--rose-text)']} className={s.specimenArt} />
                  <span className={s.specimenName}>{f.name}</span>
                  <span className={s.specimenWhen}>{f.when}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.tableWrap}>
            <table className={s.calendar}>
              <caption className={s.srOnly}>Flowers by month, January to December</caption>
              <thead>
                <tr>
                  <th scope="col" className={s.flowerCol}>Flower</th>
                  {MONTHS.map((m, i) => (
                    <th key={MONTH_NAMES[i]} scope="col" abbr={MONTH_NAMES[i]}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SEASON.map((f) => (
                  <tr key={f.flower}>
                    <th scope="row" className={s.flowerCol}>{f.flower}</th>
                    {f.months.map((v, j) => (
                      <td key={MONTH_NAMES[j]} className={s[CELL[v]]}>
                        <span className={s.srOnly}>{CELL_WORDS[v]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className={s.key}>
            <li className={s.keyPeak}>At its best</li>
            <li className={s.keyOn}>In season</li>
          </ul>
        </section>

        {/* -------------------------------------------------------- PACKAGES */}
        <section id="packages" className={s.sec} aria-labelledby="packages-h">
          <div className={s.secHead}>
            <p className={s.folio}>Page five</p>
            <h2 id="packages-h">Three ways to start</h2>
            <p className={s.secNote}>
              Starting points, not boxes. Most couples begin with one and
              change half of it, which is what the consultation is for.
            </p>
          </div>
          <ol className={s.packages}>
            {PACKAGES.map((p, i) => (
              <li key={p.name} className={s.package}>
                <span className={s.pkgNo}>{i + 1}</span>
                <h3>{p.name}</h3>
                <p className={s.pkgWho}>{p.who}</p>
                <p className={s.pkgPrice}>{p.price}</p>
                <ul className={s.pkgItems}>
                  {p.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------- CONSULTATION */}
        <section id="consultation" className={s.consult} aria-labelledby="consultation-h">
          <div className={s.consultInner}>
            <div className={s.consultSide}>
              <p className={s.folio}>Page six</p>
              <h2 id="consultation-h">The consultation</h2>
              <p className={s.pull}>An hour in the studio, $75, taken off your booking.</p>
              <div className={s.studioPlate} aria-hidden="true">
                <TabbiedPattern
                  pattern={cavetto}
                  palette={STUDIO}
                  fit="grid"
                  cellSize={40}
                  seed="posy-studio"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ol className={s.steps}>
              {STEPS.map(([title, body]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.qaGrid}>
            <div className={s.secHead}>
              <p className={s.folio}>Page seven</p>
              <h2 id="questions-h">Questions, answered</h2>
            </div>
            <div className={s.qa}>
              {QUESTIONS.map(([q, a]) => (
                <details key={q} className={s.qaItem}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- ENQUIRE */}
        <section id="enquire" className={s.sec} aria-labelledby="enquire-h">
          <div className={s.enquireGrid}>
            <div>
              <p className={s.folio}>The last page</p>
              <h2 id="enquire-h" className={s.bigItalic}>Tell us about the day</h2>
              <p className={s.secNote}>
                We take one wedding a day and about forty a year, so write
                early for a Saturday in June. Everything here is read by
                Clara or Ines, not a system.
              </p>
              <div className={s.studio}>
                <p className={s.studioName}>The studio</p>
                <p>17 Larkspur Mews, Eastbrook</p>
                <p>Visits by appointment, Tuesday to Saturday</p>
                <p>
                  <a href="tel:+15550175512">(555) 017-5512</a>
                </p>
                <p>
                  <a href="mailto:clara@posyflowers.example">clara@posyflowers.example</a>
                </p>
              </div>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="posy-names">Your names</label>
                <input id="posy-names" name="names" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="posy-email">Email</label>
                <input id="posy-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.fieldPair}>
                <div className={s.field}>
                  <label htmlFor="posy-date">Date</label>
                  <input id="posy-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label htmlFor="posy-guests">Guests</label>
                  <input id="posy-guests" name="guests" type="number" min={2} max={400} />
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="posy-venue">Venue, if you have one</label>
                <input id="posy-venue" name="venue" type="text" />
              </div>
              <div className={s.field}>
                <label htmlFor="posy-budget">Flower budget</label>
                <select id="posy-budget" name="budget" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option value="1">$650 to $1,500</option>
                  <option value="2">$1,500 to $3,000</option>
                  <option value="3">$3,000 to $6,000</option>
                  <option value="4">$6,000 and up</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="posy-note">Colors, flowers, anything</label>
                <textarea id="posy-note" name="note" rows={4} />
              </div>
              <button className={s.submit} type="submit">Send the enquiry</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.backCover} aria-hidden="true">
          <TabbiedPattern
            pattern={roundpair}
            palette={BACK}
            fit="grid"
            cellSize={40}
            seed="posy-back"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p className={s.footName}>Posy</p>
        <p>A fictional wedding and event florist. The arrangements, prices, people and studio are invented.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>; the bouquet and the three flowers are generated pictures drawn in the page's own colors.
        </p>
      </footer>
    </div>
  );
}
