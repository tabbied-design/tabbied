import { TabbiedPattern } from 'tabbied/react';
import { kilngrid, lobe } from 'tabbied/patterns';
import s from './cellar-door-wines.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Cellar Door: Wine shop and tasting bar, Linden Street',
  description:
    'Cellar Door is a small wine shop on Linden Street with every bottle listed by region, Friday tastings, and a monthly wine club. Most bottles are under $30.',
};

/* Site colors. The kiln tiles blend claret into the ink; the leaves are
   drawn in the pale and gray on a transparent ground. */
const INK = '#1F1418';
const CLARET = '#7B1E3A';
const GRAY = '#8E8479';
const PALE = '#E6DBCF';

const CELLAR = ['transparent', CLARET, INK];
const VINE = ['transparent', PALE, GRAY, CLARET];
const RACK = ['transparent', INK, CLARET];

const NAV = [
  ['Wines', '#wines'],
  ['Tastings', '#tastings'],
  ['Wine club', '#club'],
  ['Visit', '#visit'],
];

type Wine = {
  producer: string;
  wine: string;
  grape: string;
  price: string;
  note: string;
};

type Region = {
  id: string;
  name: string;
  country: string;
  blurb: string;
  wines: Wine[];
  art?: { slug: string; caption: string };
};

const REGIONS: Region[] = [
  {
    id: 'loire',
    name: 'Loire Valley',
    country: 'France',
    blurb: 'Chenin, Sauvignon and light reds from the long middle of the river. Where we send anyone who says they do not like white wine.',
    wines: [
      { producer: 'Domaine Aubert', wine: 'Vouvray Sec 2022', grape: 'Chenin Blanc', price: '$26', note: 'Quince and wet stone, dry, with a waxy finish.' },
      { producer: 'Clos des Roches', wine: 'Sancerre 2023', grape: 'Sauvignon Blanc', price: '$34', note: 'Grapefruit and flint, bright enough to wake you up.' },
      { producer: 'Maison Pellerin', wine: 'Saumur-Champigny 2021', grape: 'Cabernet Franc', price: '$24', note: 'Red currant and pencil shavings. Serve it a little cool.' },
      { producer: 'Les Vignes Basses', wine: 'Muscadet 2023', grape: 'Melon de Bourgogne', price: '$18', note: 'Salty and lean. The oyster wine.' },
    ],
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    country: 'France',
    blurb: 'Pinot Noir and Chardonnay from small growers, bought by the case when we can get it and by the bottle when we cannot.',
    wines: [
      { producer: 'Maison Lacroix', wine: 'Macon-Villages 2023', grape: 'Chardonnay', price: '$22', note: 'Apple and a little butter, no oak to speak of.' },
      { producer: 'Domaine Ferrand', wine: 'Bourgogne Rouge 2022', grape: 'Pinot Noir', price: '$32', note: 'Cherry and forest floor at a village price.' },
      { producer: 'Domaine Ferrand', wine: 'Savigny-les-Beaune 2021', grape: 'Pinot Noir', price: '$58', note: 'The splurge. Silky, with a long savory end.' },
    ],
    art: { slug: 'cellar-door-wines-grapes', caption: 'Harvested by hand, most of it' },
  },
  {
    id: 'rhone',
    name: 'Rhone',
    country: 'France',
    blurb: 'Grenache in the south, Syrah in the north, and the best value in French wine all along it.',
    wines: [
      { producer: 'Mas de la Garrigue', wine: 'Cotes du Rhone 2022', grape: 'Grenache blend', price: '$19', note: 'Plums and dried herbs. The house red, really.' },
      { producer: 'Domaine Sabran', wine: 'Crozes-Hermitage 2021', grape: 'Syrah', price: '$36', note: 'Black olive, pepper and violets.' },
      { producer: 'Chateau Vieux Moulin', wine: 'Tavel 2023', grape: 'Grenache rose', price: '$24', note: 'A rose with a spine. Drinks well into winter.' },
    ],
  },
  {
    id: 'piedmont',
    name: 'Piedmont',
    country: 'Italy',
    blurb: 'The everyday reds of Alba and Asti, and a Nebbiolo for when Barolo is more than the evening needs.',
    wines: [
      { producer: 'Cascina Bruni', wine: "Dolcetto d'Alba 2023", grape: 'Dolcetto', price: '$21', note: 'Soft and dark-fruited, a weeknight pasta wine.' },
      { producer: 'Cascina Bruni', wine: "Barbera d'Asti 2022", grape: 'Barbera', price: '$26', note: 'Juicy, sour cherry, made for tomato sauce.' },
      { producer: 'Poderi Sala', wine: 'Langhe Nebbiolo 2021', grape: 'Nebbiolo', price: '$39', note: 'Roses and tar in a smaller frame than Barolo.' },
    ],
    art: { slug: 'cellar-door-wines-corkscrew', caption: 'We open anything you buy, on request' },
  },
  {
    id: 'rioja',
    name: 'Rioja',
    country: 'Spain',
    blurb: 'Tempranillo aged the old way, in American oak and for years, and a white that surprises people.',
    wines: [
      { producer: 'Bodegas Ortiz', wine: 'Rioja Crianza 2020', grape: 'Tempranillo', price: '$22', note: 'Vanilla and red fruit, two years in barrel.' },
      { producer: 'Bodegas Ortiz', wine: 'Rioja Reserva 2017', grape: 'Tempranillo', price: '$38', note: 'Leather and dried cherry, and still fresh.' },
      { producer: 'Vina Alta', wine: 'Rioja Blanco 2022', grape: 'Viura', price: '$20', note: 'Nutty and bright, a white for roast chicken.' },
    ],
  },
  {
    id: 'mosel',
    name: 'Mosel',
    country: 'Germany',
    blurb: 'Riesling from slate slopes so steep they are worked with ropes, dry and off-dry, and one pale red.',
    wines: [
      { producer: 'Weingut Kessler', wine: 'Riesling Trocken 2023', grape: 'Riesling', price: '$22', note: 'Bone dry, lime and stone.' },
      { producer: 'Weingut Kessler', wine: 'Riesling Kabinett 2022', grape: 'Riesling', price: '$25', note: 'Off-dry, green apple and slate, 8.5 percent.' },
      { producer: 'Hof Anders', wine: 'Spatburgunder 2021', grape: 'Pinot Noir', price: '$30', note: 'Pale and pretty, strawberries and smoke.' },
    ],
    art: { slug: 'cellar-door-wines-bottle', caption: 'Every bottle here was opened by us first' },
  },
  {
    id: 'mendoza',
    name: 'Mendoza',
    country: 'Argentina',
    blurb: 'High vineyards under the Andes: Malbec, of course, and two wines that are not.',
    wines: [
      { producer: 'Finca Los Alamos', wine: 'Torrontes 2023', grape: 'Torrontes', price: '$15', note: 'Peach and orange blossom, and dry.' },
      { producer: 'Finca Los Alamos', wine: 'Malbec 2022', grape: 'Malbec', price: '$17', note: 'Blackberry and cocoa, big but not heavy.' },
      { producer: 'Altos del Rio', wine: 'Cabernet Franc 2021', grape: 'Cabernet Franc', price: '$29', note: 'Herbal and red-fruited, from 1,100 meters.' },
    ],
  },
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/* October 2026 starts on a Thursday: three blank days, then the month. */
const DAYS = [0, 0, 0, ...Array.from({ length: 31 }, (_, i) => i + 1)];

const TASTINGS: Record<number, { title: string; note: string }> = {
  2: { title: 'Four Chenins', note: 'Loire whites from bone dry to sweet' },
  9: { title: 'Grower fizz', note: 'Small-house sparkling, three countries' },
  16: { title: 'Rioja, young to old', note: 'Crianza, Reserva and a 2012 Gran Reserva' },
  23: { title: 'The importer pours', note: 'Piedmont with Anna from Sala Imports' },
  30: { title: 'Big reds for cold nights', note: 'Syrah, Malbec and Nebbiolo side by side' },
};

type Tier = {
  name: string;
  bottles: string;
  price: string;
  perks: string[];
};

const TIERS: Tier[] = [
  {
    name: 'The pair',
    bottles: 'Two bottles a month',
    price: '$55',
    perks: ['One red, one white or rose', 'A card with notes and what to cook', '10 percent off in the shop'],
  },
  {
    name: 'The case',
    bottles: 'Four bottles a month',
    price: '$105',
    perks: ['Two regions a month, two bottles each', 'Friday tastings free', '15 percent off in the shop'],
  },
  {
    name: 'The cellar',
    bottles: 'Six bottles a month',
    price: '$160',
    perks: ['One older bottle every quarter', 'Friday tastings free for two', '20 percent off, free delivery in town'],
  },
];

const HOURS = [
  ['Tuesday to Thursday', 'Noon to 8'],
  ['Friday', 'Noon to 9, tasting 5 to 8'],
  ['Saturday', '11 to 9'],
  ['Sunday', 'Noon to 6'],
  ['Monday', 'Closed'],
];

export default function CellarDoorWinesPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Cellar Door</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <span className={s.barMeta}>41 Linden Street</span>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The kiln tiles run from claret into the ink, and the bottle and
            glass are painted over them in the paper color. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Wine shop and tasting bar, down three steps</p>
            <h1 className={s.title} id="hero-h">
              The whole shop,
              <br />
              <em>filed by region.</em>
            </h1>
            <p className={s.lede}>
              The list below is the shop, shelved the way you will find it:
              the region first, then the grower. Most bottles are under $30,
              and every one of them has been opened at least once by the
              people selling it.
            </p>
            <dl className={s.facts}>
              <div>
                <dt>Friday tastings</dt>
                <dd>5 to 8 pm, $15</dd>
              </div>
              <div>
                <dt>Wine club</dt>
                <dd>From $55 a month</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>Free in town over $100</dd>
              </div>
            </dl>
          </div>
          <div className={s.heroPlate}>
            <div className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={kilngrid}
                palette={CELLAR}
                fit="grid"
                cellSize={84}
                seed="cellar-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="cellar-door-wines-bottle"
              alt="An engraved wine bottle beside a glass of wine"
              inks={['var(--paper)']}
              className={s.heroBottle}
            />
          </div>
        </section>

        {/* ------------------------------------------------------ THE LIST
            A sticky index of regions on the left; the list scrolls beside
            it, one group per region, with engravings between the groups. */}
        <section id="wines" className={s.wines} aria-labelledby="wines-h">
          <div className={s.winesHead}>
            <span className={s.secLabel}>The list</span>
            <h2 className={s.secTitle} id="wines-h">Wines by region</h2>
            <p className={s.secNote}>
              Twenty-two bottles we are drinking this month, from seven regions.
              The rest of the shop follows the same order, shelf by shelf.
            </p>
          </div>

          <div className={s.winesBody}>
            <nav className={s.index} aria-label="Regions">
              <span className={s.indexHead}>Regions</span>
              <ol className={s.indexList}>
                {REGIONS.map((r, i) => (
                  <li key={r.id}>
                    <a href={`#${r.id}`}>
                      <span className={s.indexNo}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={s.indexName}>{r.name}</span>
                      <span className={s.indexCount}>{r.wines.length}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={s.groups}>
              {REGIONS.map((r, i) => (
                <div key={r.id} className={s.groupWrap}>
                  <section id={r.id} className={s.group} aria-labelledby={`${r.id}-h`}>
                    <div className={s.groupHead}>
                      <span className={s.groupNo}>{String(i + 1).padStart(2, '0')}</span>
                      <h3 className={s.groupName} id={`${r.id}-h`}>{r.name}</h3>
                      <span className={s.groupCountry}>{r.country}</span>
                      <p className={s.groupBlurb}>{r.blurb}</p>
                    </div>
                    <ul className={s.wineList}>
                      {r.wines.map((w) => (
                        <li key={w.wine} className={s.wine}>
                          <span className={s.wineProducer}>{w.producer}</span>
                          <span className={s.wineName}>{w.wine}</span>
                          <span className={s.wineGrape}>{w.grape}</span>
                          <span className={s.winePrice}>{w.price}</span>
                          <p className={s.wineNote}>{w.note}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                  {r.art ? (
                    <div className={s.engraving}>
                      <Artwork slug={r.art.slug} alt="" inks={['var(--claret)']} className={s.engravingArt} />
                      <span className={s.engravingCaption}>{r.art.caption}</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- TASTINGS */}
        <section id="tastings" className={s.tastings} aria-labelledby="tastings-h">
          <div className={s.tastingsInner}>
            <div className={s.tastingsSide}>
              <div className={s.vineField} aria-hidden="true">
                <TabbiedPattern
                  pattern={lobe}
                  palette={VINE}
                  fit="grid"
                  cellSize={40}
                  options={{ frequency: 0.9 }}
                  redrawInterval={8400}
                  seed="cellar-vine"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.tastingsText}>
                <span className={s.secLabel}>Every Friday</span>
                <h2 className={s.secTitle} id="tastings-h">Friday tastings</h2>
                <p className={s.secNote}>
                  Five wines poured at the counter from 5 to 8, with bread and
                  cheese from next door. $15, taken off any bottle you buy that
                  night. No booking; just come down.
                </p>
                <Artwork
                  slug="cellar-door-wines-corkscrew"
                  alt="An engraved waiter's corkscrew"
                  inks={['var(--ink)']}
                  className={s.tastingsCork}
                />
              </div>
            </div>

            <div className={s.calendar}>
              <div className={s.calHead}>
                <h3 className={s.calMonth}>October 2026</h3>
                <span className={s.calNote}>Tastings in claret</span>
              </div>
              <ol className={s.calGrid}>
                {WEEKDAYS.map((d) => (
                  <li key={d} className={s.calWeekday} aria-hidden="true">{d}</li>
                ))}
                {DAYS.map((d, i) =>
                  d === 0 ? (
                    <li key={`blank-${i}`} className={s.calBlank} aria-hidden="true" />
                  ) : TASTINGS[d] ? (
                    <li key={d} className={s.calFriday}>
                      <span className={s.calDay}>{`Fri ${d}`}</span>
                      <strong className={s.calTitle}>{TASTINGS[d].title}</strong>
                      <span className={s.calText}>{TASTINGS[d].note}</span>
                    </li>
                  ) : (
                    <li key={d} className={s.calDate}>
                      <span className={s.calDay}>{d}</span>
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ CLUB */}
        <section id="club" className={s.club} aria-labelledby="club-h">
          <div className={s.clubBand} aria-hidden="true">
            <TabbiedPattern
              pattern={kilngrid}
              palette={RACK}
              fit="grid"
              cellSize={40}
              seed="cellar-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.clubInner}>
            <div className={s.clubHead}>
              <span className={s.secLabel}>Chosen for you, monthly</span>
              <h2 className={s.secTitle} id="club-h">The wine club</h2>
              <p className={s.secNote}>
                We choose, you drink, and you tell us what you thought. Pick up
                on the first Saturday of the month or have it delivered for $8.
                Skip or stop any month.
              </p>
            </div>
            <div className={s.tiers}>
              {TIERS.map((t) => (
                <article key={t.name} className={s.tier}>
                  <h3 className={s.tierName}>{t.name}</h3>
                  <span className={s.tierBottles}>{t.bottles}</span>
                  <p className={s.tierPrice}>{t.price}</p>
                  <span className={s.tierPer}>a month</span>
                  <ul className={s.tierPerks}>
                    {t.perks.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <a className={s.tierJoin} href="#visit">Join at the counter</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitArt}>
            <Artwork
              slug="cellar-door-wines-grapes"
              alt="An engraved bunch of grapes with a vine leaf"
              inks={['var(--claret)']}
              className={s.visitGrapes}
            />
          </div>
          <div className={s.visitText}>
            <span className={s.secLabel}>Find us</span>
            <h2 className={s.secTitle} id="visit-h">Down three steps on Linden Street</h2>
            <p className={s.visitAddr}>41 Linden Street, below the bookbinder</p>
            <dl className={s.hours}>
              {HOURS.map(([d, h]) => (
                <div key={d}>
                  <dt>{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <p className={s.visitNote}>
              You must be 21 to buy, and we will ask. The steps are steep; ring
              the bell by the railing and we will bring the bottles up to you.
            </p>
            <ul className={s.contact}>
              <li>
                <a href="tel:+15550163390">(555) 016-3390</a>
              </li>
              <li>
                <a href="mailto:cellar@cellardoor.example">cellar@cellardoor.example</a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <p className={s.footName}>Cellar Door</p>
          <p className={s.footTag}>Wine shop and tasting bar, 41 Linden Street.</p>
        </div>
        <div className={s.footFine}>
          <p>A fictional wine shop. Producers, prices and hours are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live in the shop's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
