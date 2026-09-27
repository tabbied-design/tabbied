import { TabbiedPattern } from 'tabbied/react';
import { lattice, windowpane, lunette, teardropleaves, crosslattice } from 'tabbied/patterns';
import s from './palm-house-conservatory.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'The Palm House: Victorian glasshouse and botanical garden, Kelmscott Park, Southbury',
  description:
    'The Palm House at Kelmscott Park is a cast-iron glasshouse of 1861 with four houses under glass: palms, temperate plants, orchids and cacti. What is in flower, tours, plant sales, weddings and membership.',
};

/* Site colors. The glazing over the hero is the lattice with a clear
   ground, so the leaves show through every open pane; the houses' windows
   and the ironwork bands reuse the same four roles. */
const GLASS = '#e7efe6';
const IRON = '#1e2b26';
const FERN = '#3f7f4f';
const ORCHID = '#b24c8f';

const GLAZING = ['transparent', 'transparent', GLASS, 'transparent', IRON, 'transparent'];
const PALM_PANES = [GLASS, FERN, IRON, GLASS, FERN, ORCHID];
const MULLIONS = [GLASS, IRON, FERN, IRON, ORCHID];
const ARCHES = [GLASS, FERN, IRON, ORCHID, FERN, IRON];
const ENGRAVED = [IRON, FERN, GLASS];
const CAST_IRON = [GLASS, GLASS, IRON];
const FOOT_GLAZING = [IRON, FERN, GLASS, IRON, FERN, ORCHID];

const NAV = [
  ['The houses', '#houses'],
  ['In flower', '#flowering'],
  ['Visit', '#visit'],
  ['Tours', '#tours'],
  ['Plant sales', '#plants'],
  ['Weddings', '#weddings'],
  ['Membership', '#membership'],
];

const HERO_FACTS = [
  ['1861', 'Glazed by Turner of Dublin'],
  ['27\u00B0C', 'In the Palm House today'],
  ['4,000', 'Plants under glass'],
];

type Tag = {
  latin: string;
  family: string;
  where: string;
};

const HERO_TAGS: Tag[] = [
  { latin: 'Monstera deliciosa', family: 'Araceae', where: 'Southern Mexico' },
  { latin: 'Musa basjoo', family: 'Musaceae', where: 'Ryukyu Islands' },
  { latin: 'Howea forsteriana', family: 'Arecaceae', where: 'Lord Howe Island' },
];

const PALM_GROWS = ['Coconut and date palms', 'Bananas and plantains', 'The 1861 Kentia, 17 m tall'];
const TEMPERATE_GROWS = ['Tree ferns from Tasmania', 'Citrus in Versailles tubs', 'Himalayan rhododendrons'];
const ORCHID_GROWS = ['1,400 orchids, 60 in flower', 'Vanilla, which flowers for a day', 'The slipper orchid bench'];
const CACTUS_GROWS = ['Agaves and aloes', 'Golden barrel cacti', 'A saguaro planted in 1934'];

type Bloom = {
  latin: string;
  common: string;
  family: string;
  origin: string;
  where: string;
};

const BLOOMS: Bloom[] = [
  { latin: 'Strelitzia reginae', common: 'Bird of paradise', family: 'Strelitziaceae', origin: 'Eastern Cape', where: 'Palm House, south bed' },
  { latin: 'Hoya carnosa', common: 'Wax flower', family: 'Apocynaceae', origin: 'Southern China', where: 'Palm House, west gallery' },
  { latin: 'Paphiopedilum insigne', common: 'Slipper orchid', family: 'Orchidaceae', origin: 'Meghalaya', where: 'Orchid Room, bench 5' },
  { latin: 'Camellia sasanqua', common: 'Autumn camellia', family: 'Theaceae', origin: 'Kyushu', where: 'Temperate House, north aisle' },
  { latin: 'Aloe marlothii', common: 'Mountain aloe', family: 'Asphodelaceae', origin: 'Transvaal', where: 'Cactus House, centre' },
  { latin: 'Passiflora racemosa', common: 'Red passion flower', family: 'Passifloraceae', origin: 'Rio de Janeiro', where: 'Temperate House, roof wires' },
];

const ADMISSION = [
  ['Adult', '$14'],
  ['Over 65, student', '$10'],
  ['Child, 5-15', '$6'],
  ['Under 5', 'Free'],
  ['Members', 'Free'],
];

const HOURS = [
  ['April to September', '10:00-17:30'],
  ['October to March', '10:00-16:00'],
  ['Last entry', '30 min before close'],
  ['Closed', '25 and 26 December'],
];

const TEA = [
  ['Pot of Assam or Darjeeling', '$3.50'],
  ['Scone, jam and cream', '$4.20'],
  ['Banana bread, our own bananas', '$3.80'],
  ['Soup of the day and bread', '$7.50'],
];

type Tour = {
  day: string;
  time: string;
  name: string;
  about: string;
  length: string;
  price: string;
};

const TOURS: Tour[] = [
  { day: 'Tuesday', time: '11:00', name: 'The great stove', about: 'How a building of iron and 18,000 panes was kept at 27 degrees in 1861, and how it is now.', length: '45 min', price: '$6' },
  { day: 'Thursday', time: '14:00', name: 'Orchids and their tricks', about: 'Scent, disguise and the bees that fall for them, on the benches of the Orchid Room.', length: '1 hr', price: '$8' },
  { day: 'Saturday', time: '10:00', name: 'Behind the glass', about: 'The boiler house, the propagation benches and the gallery walk under the dome.', length: '90 min', price: '$12' },
  { day: 'Sunday', time: '15:00', name: 'Plants that feed us', about: 'Cocoa, coffee, vanilla, pepper and the bananas the tea room bakes with.', length: '1 hr', price: '$8' },
];

type Cutting = {
  latin: string;
  common: string;
  pot: string;
  price: string;
};

const CUTTINGS: Cutting[] = [
  { latin: 'Begonia maculata', common: 'Polka dot begonia', pot: '9 cm pot', price: '$9' },
  { latin: 'Pilea peperomioides', common: 'Chinese money plant', pot: '9 cm pot', price: '$7' },
  { latin: 'Monstera deliciosa', common: 'From the hero leaf, rooted', pot: '12 cm pot', price: '$16' },
  { latin: 'Phalaenopsis hybrids', common: 'Moth orchid, in bud', pot: '12 cm pot', price: '$22' },
  { latin: 'Echeveria elegans', common: 'Mexican snowball', pot: '7 cm pot', price: '$5' },
  { latin: 'Streptocarpus', common: 'Cape primrose', pot: '9 cm pot', price: '$8' },
];

const VENUES = [
  ['Palm House', '120 seated, 200 standing'],
  ['Orchid Room', '30 seated, for the ceremony'],
  ['Lawn marquee', 'Up to 250, May to September'],
];

type Tier = {
  name: string;
  price: string;
  gets: string[];
};

const TIERS: Tier[] = [
  { name: 'Friend', price: '$45', gets: ['Free entry for a year', 'Ten percent off in the shop', 'The quarterly Palm House Letter'] },
  { name: 'Household', price: '$80', gets: ['Two adults and their children', 'Everything a Friend has', 'Two guest passes'] },
  { name: 'Fellow', price: '$150', gets: ['Everything a Household has', 'Members\' evenings under the dome', 'A cutting from the collection each spring'] },
];

export default function PalmHouseConservatoryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--glass': '#e7efe6',
        '--iron': '#1e2b26',
        '--fern': '#3f7f4f',
        '--orchid': '#b24c8f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="glass,iron,fern,orchid"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy:ital@0;1&family=Cutive+Mono&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>The Palm House</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Kelmscott Park, Southbury</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Open today 10:00-17:30</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Seen through the glass: the leaves inside, the glazing and its
            iron ribs over them, and the name on a pane of clear glass. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroLeaves}>
            <Artwork
              slug="palm-house-conservatory-leaves"
              alt="Monstera, banana and palm leaves crowding the inside of the glass"
              fit="cover"
              inks={['var(--iron)', 'var(--leaf-light)']}
            />
          </div>
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,transparent,0,transparent,1,transparent" className={s.heroGlazing} aria-hidden="true">
            <TabbiedPattern
              pattern={lattice}
              palette={GLAZING}
              options={{ frequency: 0.6 }}
              fit="grid"
              cellSize={80}
              seed="palm-house-glazing"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <span className={s.ribs} aria-hidden="true" />

          <ul className={s.heroTags}>
            {HERO_TAGS.map((t, i) => (
              <li key={t.latin} className={s.zinc}>
                <span data-edit={`hero.zincLatin.${i}`} data-edit-max="60" className={s.zincLatin}>{t.latin}</span>
                <span data-edit={`hero.zincFamily.${i}`} data-edit-max="60" className={s.zincFamily}>{t.family}</span>
                <span data-edit={`hero.zincWhere.${i}`} data-edit-max="60" className={s.zincWhere}>{t.where}</span>
              </li>
            ))}
          </ul>

          <div className={s.pane}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Victorian glasshouse and botanical garden</p>
            <h1 data-edit="hero.title" data-edit-max="70" id="hero-h" className={s.title}>The Palm House</h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Eighteen thousand panes of glass on a frame of Dublin iron, and
              under them a forest that has been growing since 1861. Four houses,
              four climates, a tea room in the old boiler house.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#visit">Plan a visit</a>
              <a data-edit="hero.btnGlass" data-edit-max="28" className={s.btnGlass} href="#flowering">What is in flower</a>
            </div>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([figure, text], i) => (
                <div key={text}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{figure}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- HOUSES
            Four bays, each an arched window onto its own glazing, with the
            climate it keeps read off a thermometer and a hygrometer. */}
        <section id="houses" className={s.sec} aria-labelledby="houses-h">
          <div className={s.secHead}>
            <p data-edit="houses.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>I</p>
            <h2 data-edit="houses.secTitle" data-edit-max="60" id="houses-h" className={s.secTitle}>The houses</h2>
            <p data-edit="houses.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The glasshouse is four houses joined by glazed corridors. Walk them
              in order and you cross four climates in twenty minutes.
            </p>
          </div>

          <ul className={s.houses}>
            <li className={s.house}>
              <div data-edit-pattern="houses.field" data-edit-roles="0,2,1,0,2,3" className={s.houseWindow} aria-hidden="true">
                <TabbiedPattern
                  pattern={lattice}
                  palette={PALM_PANES}
                  fit="grid"
                  cellSize={30}
                  seed="palm-house-bay-palm"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.houseBody}>
                <p data-edit="houses.houseNo" data-edit-max="240" data-edit-multiline className={s.houseNo}>The dome</p>
                <h3 data-edit="houses.houseName" data-edit-max="40" className={s.houseName}>The Palm House</h3>
                <p className={s.climate}>
                  <span className={s.gauge} style={{ '--fill': '68%' } as React.CSSProperties} />
                  <span data-edit="houses.climateText" data-edit-max="60" className={s.climateText}>27&#176;C day, 21&#176;C night</span>
                </p>
                <p className={s.climate}>
                  <span className={`${s.gauge} ${s.gaugeWet}`} style={{ '--fill': '80%' } as React.CSSProperties} />
                  <span data-edit="houses.climateText2" data-edit-max="60" className={s.climateText}>80% humidity</span>
                </p>
                <ul className={s.grows}>
                  {PALM_GROWS.map((g, i) => (
                    <li data-edit={`houses.item.${i}`} data-edit-max="80" key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            </li>

            <li className={s.house}>
              <div data-edit-pattern="houses.field2" data-edit-roles="0,1,2,1,3" className={s.houseWindow} aria-hidden="true">
                <TabbiedPattern
                  pattern={windowpane}
                  palette={MULLIONS}
                  fit="grid"
                  cellSize={28}
                  seed="palm-house-bay-temperate"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.houseBody}>
                <p data-edit="houses.houseNo2" data-edit-max="240" data-edit-multiline className={s.houseNo}>The north wing</p>
                <h3 data-edit="houses.houseName2" data-edit-max="40" className={s.houseName}>The Temperate House</h3>
                <p className={s.climate}>
                  <span className={s.gauge} style={{ '--fill': '38%' } as React.CSSProperties} />
                  <span data-edit="houses.climateText3" data-edit-max="60" className={s.climateText}>15&#176;C, never under 8&#176;C</span>
                </p>
                <p className={s.climate}>
                  <span className={`${s.gauge} ${s.gaugeWet}`} style={{ '--fill': '60%' } as React.CSSProperties} />
                  <span data-edit="houses.climateText4" data-edit-max="60" className={s.climateText}>60% humidity</span>
                </p>
                <ul className={s.grows}>
                  {TEMPERATE_GROWS.map((g, i) => (
                    <li data-edit={`houses.item2.${i}`} data-edit-max="80" key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            </li>

            <li className={s.house}>
              <div data-edit-pattern="houses.field3" data-edit-roles="0,2,1,3,2,1" className={s.houseWindow} aria-hidden="true">
                <TabbiedPattern
                  pattern={lunette}
                  palette={ARCHES}
                  fit="grid"
                  cellSize={30}
                  seed="palm-house-bay-orchid"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.houseBody}>
                <p data-edit="houses.houseNo3" data-edit-max="240" data-edit-multiline className={s.houseNo}>The east lean-to</p>
                <h3 data-edit="houses.houseName3" data-edit-max="40" className={s.houseName}>The Orchid Room</h3>
                <p className={s.climate}>
                  <span className={s.gauge} style={{ '--fill': '55%' } as React.CSSProperties} />
                  <span data-edit="houses.climateText5" data-edit-max="60" className={s.climateText}>22&#176;C, shaded at noon</span>
                </p>
                <p className={s.climate}>
                  <span className={`${s.gauge} ${s.gaugeWet}`} style={{ '--fill': '72%' } as React.CSSProperties} />
                  <span data-edit="houses.climateText6" data-edit-max="60" className={s.climateText}>72% humidity</span>
                </p>
                <ul className={s.grows}>
                  {ORCHID_GROWS.map((g, i) => (
                    <li data-edit={`houses.item3.${i}`} data-edit-max="80" key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            </li>

            <li className={s.house}>
              <div data-edit-pattern="houses.field4" data-edit-roles="0,1,2,1,3" className={s.houseWindow} aria-hidden="true">
                <TabbiedPattern
                  pattern={windowpane}
                  palette={MULLIONS}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={40}
                  seed="palm-house-bay-cactus"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.houseBody}>
                <p data-edit="houses.houseNo4" data-edit-max="240" data-edit-multiline className={s.houseNo}>The south lean-to</p>
                <h3 data-edit="houses.houseName4" data-edit-max="40" className={s.houseName}>The Cactus House</h3>
                <p className={s.climate}>
                  <span className={s.gauge} style={{ '--fill': '78%' } as React.CSSProperties} />
                  <span data-edit="houses.climateText7" data-edit-max="60" className={s.climateText}>31&#176;C day, 8&#176;C winter night</span>
                </p>
                <p className={s.climate}>
                  <span className={`${s.gauge} ${s.gaugeWet}`} style={{ '--fill': '25%' } as React.CSSProperties} />
                  <span data-edit="houses.climateText8" data-edit-max="60" className={s.climateText}>25% humidity</span>
                </p>
                <ul className={s.grows}>
                  {CACTUS_GROWS.map((g, i) => (
                    <li data-edit={`houses.item4.${i}`} data-edit-max="80" key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </section>

        {/* ------------------------------------------------------- FLOWERING
            The month's plate: the moth orchid engraved on a botanical plate
            with its zinc label, and the other labels from the beds. */}
        <section id="flowering" className={s.flowerSec} aria-labelledby="flowering-h">
          <div className={s.flowerInner}>
            <figure className={s.plate}>
              <p className={s.plateHead}>
                <span data-edit="flowering.text" data-edit-max="60">Plate IX</span>
                <span data-edit="flowering.text2" data-edit-max="60">Kelmscott Park, October</span>
              </p>
              <Artwork
                slug="palm-house-conservatory-orchid"
                alt="An arching spray of moth orchid flowers with its broad leaves and roots, engraved"
                inks={['var(--plate-ink)']}
                className={s.orchid}
              />
              <figcaption className={s.plateLabel}>
                <span data-edit="flowering.zincLatin" data-edit-max="60" className={s.zincLatin}>Phalaenopsis amabilis</span>
                <span data-edit="flowering.zincFamily" data-edit-max="60" className={s.zincFamily}>Orchidaceae</span>
                <span data-edit="flowering.zincWhere" data-edit-max="60" className={s.zincWhere}>Java, Borneo, the Philippines</span>
              </figcaption>
            </figure>

            <div className={s.flowerText}>
              <div className={s.secHeadStack}>
                <p data-edit="flowering.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>II</p>
                <h2 data-edit="flowering.secTitle" data-edit-max="60" id="flowering-h" className={s.secTitle}>Flowering now</h2>
                <p data-edit="flowering.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                  The moth orchid has been in flower on bench 3 since the first
                  week of September, forty sprays at once. These are the others
                  worth the walk this month.
                </p>
              </div>
              <ul className={s.blooms}>
                {BLOOMS.map((b, i) => (
                  <li key={b.latin} className={s.bloom}>
                    <span data-edit={`flowering.zincLatin2.${i}`} data-edit-max="60" className={s.zincLatin}>{b.latin}</span>
                    <span data-edit={`flowering.bloomCommon.${i}`} data-edit-max="60" className={s.bloomCommon}>{b.common}</span>
                    <span data-edit={`flowering.zincFamily2.${i}`} data-edit-max="60" className={s.zincFamily}>{b.family}</span>
                    <span data-edit={`flowering.zincWhere2.${i}`} data-edit-max="60" className={s.zincWhere}>{b.origin}</span>
                    <span data-edit={`flowering.bloomWhere.${i}`} data-edit-max="60" className={s.bloomWhere}>{b.where}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>III</p>
            <h2 data-edit="visit.secTitle" data-edit-max="60" id="visit-h" className={s.secTitle}>Visit</h2>
            <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Kelmscott Park, Southbury. The park gates open at 08:00; the
              glasshouse opens at 10:00. Step-free through the main doors and all
              four houses.
            </p>
          </div>

          <div className={s.visit}>
            <div className={s.bay}>
              <h3 data-edit="visit.bayTitle" data-edit-max="40" className={s.bayTitle}>Admission</h3>
              <dl className={s.prices}>
                {ADMISSION.map(([who, price], i) => (
                  <div key={who}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{who}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="visit.bayNote" data-edit-max="240" data-edit-multiline className={s.bayNote}>Tickets at the door. Your ticket is valid all day, in and out.</p>
            </div>

            <div className={s.bay}>
              <h3 data-edit="visit.bayTitle2" data-edit-max="40" className={s.bayTitle}>Hours</h3>
              <dl className={s.prices}>
                {HOURS.map(([when, time], i) => (
                  <div key={when}>
                    <dt data-edit={`visit.term2.${i}`} data-edit-max="28">{when}</dt>
                    <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="visit.bayNote2" data-edit-max="240" data-edit-multiline className={s.bayNote}>On frosty mornings the doors open at 10:30, once the boilers have caught up.</p>
            </div>

            <div className={`${s.bay} ${s.bayTea}`}>
              <div data-edit-pattern="visit.field" data-edit-roles="0,0,1" className={s.teaField} aria-hidden="true">
                <TabbiedPattern
                  pattern={crosslattice}
                  palette={CAST_IRON}
                  fit="grid"
                  cellSize={40}
                  seed="palm-house-tea"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.teaCard}>
                <h3 data-edit="visit.bayTitle3" data-edit-max="40" className={s.bayTitle}>The tea room</h3>
                <p data-edit="visit.bayNote3" data-edit-max="240" data-edit-multiline className={s.bayNote}>In the old boiler house, by the west doors. Open 10:30 until half an hour before close.</p>
                <dl className={s.prices}>
                  {TEA.map(([item, price], i) => (
                    <div key={item}>
                      <dt data-edit={`visit.term3.${i}`} data-edit-max="28">{item}</dt>
                      <dd data-edit={`visit.body3.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- TOURS */}
        <section id="tours" className={s.toursSec} aria-labelledby="tours-h">
          <div data-edit-pattern="tours.field" data-edit-roles="1,2,0" className={s.toursField} aria-hidden="true">
            <TabbiedPattern
              pattern={teardropleaves}
              palette={ENGRAVED}
              fit="grid"
              cellSize={40}
              seed="palm-house-tours"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.toursInner}>
            <div className={s.secHead}>
              <p data-edit="tours.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>IV</p>
              <h2 data-edit="tours.secTitle" data-edit-max="60" id="tours-h" className={s.secTitle}>Guided tours</h2>
              <p data-edit="tours.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Led by the glasshouse gardeners, twelve people at most. Meet under
                the clock in the entrance hall; the tour price is on top of
                admission.
              </p>
            </div>
            <ol className={s.tours}>
              {TOURS.map((t, i) => (
                <li key={t.name} className={s.tour}>
                  <p className={s.tourWhen}>
                    <span data-edit={`tours.tourDay.${i}`} data-edit-max="60" className={s.tourDay}>{t.day}</span>
                    <span data-edit={`tours.tourTime.${i}`} data-edit-max="60" className={s.tourTime}>{t.time}</span>
                  </p>
                  <div className={s.tourBody}>
                    <h3 data-edit={`tours.tourName.${i}`} data-edit-max="40" className={s.tourName}>{t.name}</h3>
                    <p data-edit={`tours.tourAbout.${i}`} data-edit-max="240" data-edit-multiline className={s.tourAbout}>{t.about}</p>
                  </div>
                  <p className={s.tourMeta}>
                    <span data-edit={`tours.text.${i}`} data-edit-max="60">{t.length}</span>
                    <span data-edit={`tours.text2.${i}`} data-edit-max="60">{t.price}</span>
                  </p>
                </li>
              ))}
            </ol>
            <p data-edit="tours.toursNote" data-edit-max="240" data-edit-multiline className={s.toursNote}>Private tours for groups of 10-25, any day but Monday: (555) 016-3310.</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- PLANTS
            The potting shed bench: cuttings and divisions from the
            collection, each with its zinc label and a price tied on. */}
        <section id="plants" className={s.sec} aria-labelledby="plants-h">
          <div className={s.secHead}>
            <p data-edit="plants.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>V</p>
            <h2 data-edit="plants.secTitle" data-edit-max="60" id="plants-h" className={s.secTitle}>Plant sales</h2>
            <p data-edit="plants.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The potting shed sells what the gardeners propagate from the
              collection. Stock changes weekly; this is the bench this morning.
            </p>
          </div>
          <ul className={s.bench}>
            {CUTTINGS.map((c, i) => (
              <li key={c.latin} className={s.cutting}>
                <span className={s.stake} aria-hidden="true" />
                <span className={s.tag}>
                  <span data-edit={`plants.zincLatin.${i}`} data-edit-max="60" className={s.zincLatin}>{c.latin}</span>
                  <span data-edit={`plants.bloomCommon.${i}`} data-edit-max="60" className={s.bloomCommon}>{c.common}</span>
                  <span data-edit={`plants.cuttingPot.${i}`} data-edit-max="60" className={s.cuttingPot}>{c.pot}</span>
                  <span data-edit={`plants.cuttingPrice.${i}`} data-edit-max="60" className={s.cuttingPrice}>{c.price}</span>
                </span>
              </li>
            ))}
          </ul>
          <p data-edit="plants.benchNote" data-edit-max="240" data-edit-multiline className={s.benchNote}>
            The potting shed is by the Cactus House door, open Wednesday to
            Sunday, 11:00-16:00. Bring a box; we have newspaper.
          </p>
        </section>

        {/* -------------------------------------------------------- WEDDINGS */}
        <section id="weddings" className={s.weddingSec} aria-labelledby="weddings-h">
          <div data-edit-pattern="weddings.field" data-edit-roles="0,2,1,0,2,3" className={s.weddingWindow} aria-hidden="true">
            <TabbiedPattern
              pattern={lattice}
              palette={PALM_PANES}
              options={{ frequency: 0.8 }}
              fit="grid"
              cellSize={36}
              seed="palm-house-wedding"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.weddingText}>
            <p data-edit="weddings.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>VI</p>
            <h2 data-edit="weddings.secTitle" data-edit-max="60" id="weddings-h" className={s.secTitle}>Weddings and events</h2>
            <p data-edit="weddings.weddingLede" data-edit-max="240" data-edit-multiline className={s.weddingLede}>
              After the doors close at 18:00, Thursday to Sunday, the Palm House
              is yours: supper under the dome, the palms lit from below, and the
              Orchid Room for the vows.
            </p>
            <dl className={s.venues}>
              {VENUES.map(([room, fits], i) => (
                <div key={room}>
                  <dt data-edit={`weddings.term.${i}`} data-edit-max="28">{room}</dt>
                  <dd data-edit={`weddings.body.${i}`} data-edit-max="200" data-edit-multiline>{fits}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="weddings.weddingNote" data-edit-max="240" data-edit-multiline className={s.weddingNote}>
              Licensed for ceremonies. Hire from $3,800 on a Thursday. Ask Ruth
              Ashdown for a walk round after hours:
            </p>
            <p className={s.contact}>
              <a data-edit="weddings.link" data-edit-max="28" href="mailto:events@palmhouse.example">events@palmhouse.example</a>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------ MEMBERSHIP */}
        <section id="membership" className={s.sec} aria-labelledby="membership-h">
          <div className={s.secHead}>
            <p data-edit="membership.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>VII</p>
            <h2 data-edit="membership.secTitle" data-edit-max="60" id="membership-h" className={s.secTitle}>Membership</h2>
            <p data-edit="membership.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Members keep the boilers lit: the glasshouse burns through $90,000
              of gas a winter. Join for a year and walk in free all year.
            </p>
          </div>

          <div className={s.members}>
            <ul className={s.tiers}>
              {TIERS.map((t, i) => (
                <li key={t.name} className={s.tier}>
                  <h3 data-edit={`membership.tierName.${i}`} data-edit-max="40" className={s.tierName}>{t.name}</h3>
                  <p className={s.tierPrice}>
                    <span data-edit={`membership.text.${i}`} data-edit-max="60">{t.price}</span>
                    <span data-edit={`membership.tierPer.${i}`} data-edit-max="60" className={s.tierPer}>a year</span>
                  </p>
                  <ul className={s.tierGets}>
                    {t.gets.map((g, i2) => (
                      <li data-edit={`membership.item.${i}.${i2}`} data-edit-max="80" key={g}>{g}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <form className={s.form} action="#">
              <h3 data-edit="membership.formTitle" data-edit-max="40" className={s.formTitle}>Join today</h3>
              <div className={s.field}>
                <label data-edit="membership.label" htmlFor="ph-name">Name</label>
                <input id="ph-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="membership.label2" htmlFor="ph-email">Email</label>
                <input id="ph-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="membership.label3" htmlFor="ph-tier">Membership</label>
                <select id="ph-tier" name="tier" defaultValue="household">
                  <option value="friend">Friend, $45</option>
                  <option value="household">Household, $80</option>
                  <option value="fellow">Fellow, $150</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="membership.label4" htmlFor="ph-gift">Is it a gift?</label>
                <select id="ph-gift" name="gift" defaultValue="no">
                  <option value="no">No, it is for me</option>
                  <option value="yes">Yes, send a card</option>
                </select>
              </div>
              <button data-edit="membership.submit" data-edit-max="24" className={s.submit} type="submit">Become a member</button>
              <p data-edit="membership.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Your card is posted within five days. Until then, your email gets you in.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="1,2,0,1,2,3" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={lattice}
            palette={FOOT_GLAZING}
            fit="grid"
            cellSize={30}
            seed="palm-house-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>The Palm House</p>
            <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>Kelmscott Park, Garden Row, Southbury</p>
            <p className={s.footText}>
              <a data-edit="footer.link" data-edit-max="28" href="tel:+15550163300">(555) 016-3300</a>
            </p>
            <p className={s.footText}>
              <a data-edit="footer.link2" data-edit-max="28" href="mailto:hello@palmhouse.example">hello@palmhouse.example</a>
            </p>
          </div>
          <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional glasshouse and botanical garden. The houses, plants on show, prices and people are invented.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footText3" data-edit-max="240" data-edit-multiline className={s.footText}>The leaves and the orchid plate are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
