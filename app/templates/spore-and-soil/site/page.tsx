import { TabbiedPattern } from 'tabbied/react';
import { quarterfall, concentricrings, bokeh, pebble } from 'tabbied/patterns';
import s from './spore-and-soil.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Spore & Soil: Gourmet mushroom farm and farm shop, Fenwick',
  description:
    'Oyster, lion\'s mane and shiitake grown in the old dairy on Coldharbour Lane. This week\'s harvest, grow kits, market days, grow room tours and an order form, set out like a field guide.',
};

/* Site colors. The page is a field guide: loam-dark pages, cream plates,
   chanterelle and lichen for the marks. The hero's oyster is a quarterfall
   field cut to the mushroom; each harvest plate hides its own field under
   the drawing. The shiitake log's rings, the lights of the fruiting room,
   the gravel of the dairy yard and the footer do the same on the loam. */
const LOAM = '#231c17';
const CREAM = '#efe4cf';
const CHANTERELLE = '#e3a13a';
const LICHEN = '#9db08a';

const OYSTER_HERO = [CREAM, LICHEN, LOAM, CHANTERELLE, LICHEN, LOAM];
const CHANT_FILL = [CREAM, CHANTERELLE, LOAM, CHANTERELLE, CHANTERELLE, LICHEN];
const OYSTER_FILL = [CREAM, LICHEN, LOAM, LICHEN, CHANTERELLE, LICHEN];
const MANE_FILL = [CREAM, LICHEN, CHANTERELLE, LOAM, LICHEN, CHANTERELLE];
const SHIITAKE_FILL = [CREAM, LOAM, CHANTERELLE, LOAM, LICHEN, LOAM];
const LOG_RINGS = ['transparent', LOAM, CHANTERELLE, LOAM];
const ROOM_LIGHTS = ['transparent', CHANTERELLE, CREAM, LICHEN];
const GRAVEL = ['transparent', LICHEN, CREAM, CHANTERELLE, LICHEN, CREAM];
const FOOT = ['transparent', CHANTERELLE, LICHEN, CREAM, CHANTERELLE, LICHEN];

const NAV = [
  ['Harvest', '#harvest'],
  ['Grow kits', '#kits'],
  ['Farm shop', '#shop'],
  ['Restaurants', '#restaurants'],
  ['Tours', '#tours'],
  ['Cooking', '#cooking'],
  ['Order', '#order'],
];

const CALLOUTS = [
  ['a', 'Cap', 'Fan-shaped, 5-15 cm, slate to oyster grey'],
  ['b', 'Gills', 'Running down the stem, white'],
  ['c', 'Cluster', 'Shelves in overlapping tiers'],
];

const KEY_CHANT = [
  ['Cap', 'Egg-yolk yellow, wavy, funnelled'],
  ['Gills', 'False gills: blunt ridges, forked'],
  ['Stem', 'Solid, tapering, same color'],
  ['Season', 'July to October, beech woods'],
];

const KEY_OYSTER = [
  ['Cap', 'Grey to slate, fan-shaped, 5-15 cm'],
  ['Gills', 'White, crowded, running down the stem'],
  ['Stem', 'Short, off-centre or none'],
  ['Season', 'All year, from room two'],
];

const KEY_MANE = [
  ['Body', 'A white ball of hanging spines'],
  ['Spines', '1-4 cm, soft, pointing down'],
  ['Stem', 'None; attached at the top'],
  ['Season', 'All year, from room three'],
];

const KEY_SHIITAKE = [
  ['Cap', 'Brown, cracked white, 5-10 cm'],
  ['Gills', 'White, notched at the stem'],
  ['Stem', 'Tough and fibrous: keep for stock'],
  ['Season', 'Spring and autumn, on oak logs'],
];

type Kit = {
  name: string;
  price: string;
  flush: string;
  crop: string;
  note: string;
  level: string;
  kind: 'easy' | 'fair' | 'patient';
};

const KITS: Kit[] = [
  {
    name: 'Oyster grow kit',
    price: '$24',
    flush: 'First flush in 10-14 days',
    crop: '400-600 g over three flushes',
    note: 'A block of straw run through with grey oyster mycelium. Cut a cross in the bag, mist twice a day, and pick.',
    level: 'Easy',
    kind: 'easy',
  },
  {
    name: 'Lion\'s mane kit',
    price: '$28',
    flush: 'First flush in 2-3 weeks',
    crop: '300-450 g over two flushes',
    note: 'Hardwood sawdust. Wants cool, damp air: a bathroom windowsill is ideal, a radiator is not.',
    level: 'Fair',
    kind: 'fair',
  },
  {
    name: 'Shiitake logs',
    price: '$45 a pair',
    flush: 'First fruit in 6-9 months',
    crop: 'Spring and autumn for 3-4 years',
    note: 'Oak logs, drilled and plugged here. Keep them in shade and soak them overnight to start a flush.',
    level: 'Patient',
    kind: 'patient',
  },
];

const SHOP_HOURS = [
  ['Thursday', '09:00-17:00'],
  ['Friday', '09:00-17:00'],
  ['Saturday', '09:00-16:00'],
  ['Sunday', '10:00-14:00'],
];

type Day = { day: string; where: string; time: string; kind: 'market' | 'shop' | 'rest' };

const WEEK: Day[] = [
  { day: 'Mon', where: 'Picking', time: 'Farm closed', kind: 'rest' },
  { day: 'Tue', where: 'Restaurant rounds', time: 'Farm closed', kind: 'rest' },
  { day: 'Wed', where: 'Harwell farmers\' market', time: '08:00-13:00', kind: 'market' },
  { day: 'Thu', where: 'Farm shop', time: '09:00-17:00', kind: 'shop' },
  { day: 'Fri', where: 'Kingsmere night market', time: '16:00-20:00', kind: 'market' },
  { day: 'Sat', where: 'Fenwick market square', time: '08:00-14:00', kind: 'market' },
  { day: 'Sun', where: 'Farm shop', time: '10:00-14:00', kind: 'shop' },
];

type Kitchen = { name: string; town: string; takes: string; days: string; since: string };

const KITCHENS: Kitchen[] = [
  { name: 'The Salt House', town: 'Fenwick', takes: 'Lion\'s mane, oyster', days: 'Tue and Fri', since: '2019' },
  { name: 'Brindle', town: 'Harwell', takes: 'Shiitake, grey oyster', days: 'Tue', since: '2020' },
  { name: 'Osteria Nove', town: 'Kingsmere', takes: 'Chanterelle in season, shiitake', days: 'Fri', since: '2021' },
  { name: 'Mill Lane Canteen', town: 'Fenwick', takes: 'Mixed oyster boxes', days: 'Tue and Fri', since: '2022' },
  { name: 'The Hartley Arms', town: 'Coldharbour', takes: 'Oyster, shiitake', days: 'Fri', since: '2023' },
  { name: 'Pho Linh', town: 'Harwell', takes: 'King oyster, shiitake', days: 'Tue', since: '2024' },
];

type Reading = { label: string; value: string; note: string; kind: 'humid' | 'temp' | 'co2' | 'air' };

const READINGS: Reading[] = [
  { label: 'Humidity', value: '88%', note: 'target 85-92', kind: 'humid' },
  { label: 'Temperature', value: '16.0 C', note: 'target 14-18', kind: 'temp' },
  { label: 'CO2', value: '820 ppm', note: 'below 1000', kind: 'co2' },
  { label: 'Fresh air', value: '6 / h', note: 'changes an hour', kind: 'air' },
];

const TOUR_FACTS = [
  ['When', 'Saturdays at 11:00, and Sundays in October'],
  ['How long', 'Ninety minutes, mostly standing'],
  ['Tickets', '$18, under 12s free with an adult'],
  ['Wear', 'Shoes you can walk through a footbath in'],
];

type Print = { name: string; color: string; kind: 'white' | 'cream' | 'lilac' | 'ochre' };

const PRINTS: Print[] = [
  { name: 'Oyster', color: 'White to lilac', kind: 'lilac' },
  { name: 'Shiitake', color: 'White', kind: 'white' },
  { name: 'Chanterelle', color: 'Pale cream', kind: 'cream' },
  { name: 'Brown cap', color: 'Ochre brown', kind: 'ochre' },
];

const NOTES = [
  ['Tear, do not slice', 'Oysters come apart along their own lines. Torn edges crisp; cut ones steam.'],
  ['Dry pan first', 'Cook mushrooms in a hot, dry pan until they squeak and give up their water. Then the butter.'],
  ['Lion\'s mane steaks', 'Press a 2 cm slice under a heavy pan, brown it hard on both sides, finish with butter and thyme.'],
  ['Keep the stems', 'Shiitake stems are too tough to eat and perfect in stock. Freeze them until you have a bagful.'],
  ['Store in paper', 'A paper bag in the fridge, never plastic. Oysters keep three days, shiitake a week.'],
];

export default function SporeAndSoilPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--loam': '#231c17',
        '--cream': '#efe4cf',
        '--chanterelle': '#e3a13a',
        '--lichen': '#9db08a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="loam,cream,chanterelle,lichen"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Piazzolla:ital,opsz,wght@0,8..30,100..900;1,8..30,100..900&family=Azeret+Mono:wght@400..600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Spore &amp; Soil</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Fenwick</span>
        </a>
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
        <section className={s.hero} aria-labelledby="ss-hero-h">
          <div className={s.heroText}>
            <p data-edit="ssHero.running" data-edit-max="240" data-edit-multiline className={s.running}>A field guide to the farm, autumn edition</p>
            <h1 id="ss-hero-h" className={s.heroName}>
              <span data-edit="ssHero.heroSpore" data-edit-max="60" className={s.heroSpore}>Spore</span>
              <span data-edit="ssHero.heroAmp" data-edit-max="60" className={s.heroAmp}>&amp;</span>
              <span data-edit="ssHero.heroSoil" data-edit-max="60" className={s.heroSoil}>Soil</span>
            </h1>
            <p data-edit="ssHero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Gourmet mushrooms grown in the old dairy on Coldharbour Lane,
              picked in the morning and sold by the afternoon. Oyster,
              lion&apos;s mane and shiitake all year; chanterelles when the
              beech wood gives them up.
            </p>
            <div className={s.heroActions}>
              <a data-edit="ssHero.btn" data-edit-max="28" className={s.btn} href="#order">Order for Saturday</a>
              <a data-edit="ssHero.btnLine" data-edit-max="28" className={s.btnLine} href="#harvest">This week&apos;s harvest</a>
            </div>
            <p data-edit="ssHero.heroWhere" data-edit-max="240" data-edit-multiline className={s.heroWhere}>The old dairy, Coldharbour Lane, Fenwick</p>
          </div>

          <figure className={s.heroPlate}>
            <p data-edit="ssHero.plateTag" data-edit-max="240" data-edit-multiline className={s.plateTag}>Plate I</p>
            <div className={s.heroSpecimen}>
              <div className={s.heroFigure}>
                <Artwork data-edit-pattern="ssHero.field" data-edit-roles="1,3,0,2,3,0"
                slug="spore-and-soil-oyster"
                alt="A shelf of oyster mushrooms growing in overlapping fans, its surface patterned with rolled quarter discs"
                mode="fill"
                inks={[]}
                  className={s.heroOyster}>
                  <TabbiedPattern
                    pattern={quarterfall}
                    palette={OYSTER_HERO}
                    fit="grid"
                    cellSize={18}
                    seed="spore-hero-oyster"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </Artwork>
                {CALLOUTS.map(([letter]) => (
                  <span key={letter} className={`${s.marker} ${s[`m${letter}`]}`} aria-hidden="true">{letter}</span>
                ))}
              </div>
              <ol className={s.callouts}>
                {CALLOUTS.map(([letter, part, note], i) => (
                  <li key={letter}>
                    <span data-edit={`ssHero.calloutLetter.${i}`} data-edit-max="60" className={s.calloutLetter}>{letter}</span>
                    <strong data-edit={`ssHero.emphasis.${i}`}>{part}</strong>
                    <span data-edit={`ssHero.calloutNote.${i}`} data-edit-max="60" className={s.calloutNote}>{note}</span>
                  </li>
                ))}
              </ol>
            </div>
            <figcaption data-edit="ssHero.caption" data-edit-format="emphasis" data-edit-max="120" data-edit-multiline className={s.plateCaption}>
              <em>Pleurotus ostreatus</em>, the grey oyster. Grown on pasteurised straw in room two, picked 21 September.
            </figcaption>
          </figure>
        </section>

        {/* --------------------------------------------------------- HARVEST */}
        <section id="harvest" className={s.sec} aria-labelledby="ss-harvest-h">
          <div className={s.secHead}>
            <p data-edit="harvest.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chapter 1</p>
            <h2 data-edit="harvest.secTitle" data-edit-max="60" id="ss-harvest-h" className={s.secTitle}>This week&apos;s harvest</h2>
            <p data-edit="harvest.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Four species on the table this week, with their keys. Point at
              a plate to see the specimen in its field colors.
            </p>
          </div>

          <div className={s.harvest}>
            <article className={s.specimen}>
              <div className={s.plate}>
                <p data-edit="specimen.plateNo" data-edit-max="240" data-edit-multiline className={s.plateNo}>Plate 2</p>
                <div className={s.reveal}>
                  <Artwork data-edit-pattern="specimen.field" data-edit-roles="1,2,0,2,2,3"
                    slug="spore-and-soil-chanterelle"
                    alt="A small cluster of chanterelle mushrooms"
                    mode="fill"
                    inks={[]}
                    className={s.revealFill}>
                    <TabbiedPattern
                      pattern={quarterfall}
                      palette={CHANT_FILL}
                      fit="grid"
                      cellSize={16}
                      seed="spore-chanterelle"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                  <Artwork
                    slug="spore-and-soil-chanterelle"
                    alt=""
                    mode="tint"
                    inks={['var(--on-cream)', 'var(--cream)']}
                    className={s.revealTint}
                  />
                </div>
              </div>
              <div className={s.entry}>
                <div className={s.entryHead}>
                  <h3 data-edit="specimen.entryName" data-edit-max="40" className={s.entryName}>Chanterelle</h3>
                  <p data-edit="specimen.latin" data-edit-max="240" data-edit-multiline className={s.latin}>Cantharellus cibarius</p>
                  <p data-edit="specimen.tagWild" data-edit-max="240" data-edit-multiline className={s.tagWild}>Foraged, not farmed</p>
                </div>
                <dl className={s.key}>
                  {KEY_CHANT.map(([term, text], i) => (
                    <div key={term}>
                      <dt data-edit={`specimen.term.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`specimen.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                    </div>
                  ))}
                  <div>
                    <dt data-edit="specimen.term2" data-edit-max="28">Spore print</dt>
                    <dd className={s.printRow}>
                      <span className={`${s.chip} ${s.cream}`} aria-hidden="true" />
                      <span data-edit="specimen.text" data-edit-max="60">Pale cream</span>
                    </dd>
                  </div>
                </dl>
                <p className={s.price}>
                  <strong data-edit="specimen.emphasis">$9.50</strong>
                  <span data-edit="specimen.text2" data-edit-max="60">per 100 g</span>
                </p>
                <p data-edit="specimen.cook" data-edit-max="240" data-edit-multiline className={s.cook}>Cook it: butter, a little shallot, nothing else. Never wash, brush.</p>
              </div>
            </article>

            <article className={s.specimen}>
              <div className={s.plate}>
                <p data-edit="specimen.plateNo2" data-edit-max="240" data-edit-multiline className={s.plateNo}>Plate 3</p>
                <div className={s.reveal}>
                  <Artwork data-edit-pattern="specimen.field2" data-edit-roles="1,3,0,3,2,3"
                    slug="spore-and-soil-oyster"
                    alt="A shelf of oyster mushrooms growing in overlapping fans"
                    mode="fill"
                    inks={[]}
                    className={s.revealFill}>
                    <TabbiedPattern
                      pattern={quarterfall}
                      palette={OYSTER_FILL}
                      fit="grid"
                      cellSize={16}
                      seed="spore-oyster"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                  <Artwork
                    slug="spore-and-soil-oyster"
                    alt=""
                    mode="tint"
                    inks={['var(--on-cream)', 'var(--cream)']}
                    className={s.revealTint}
                  />
                </div>
              </div>
              <div className={s.entry}>
                <div className={s.entryHead}>
                  <h3 data-edit="specimen.entryName2" data-edit-max="40" className={s.entryName}>Grey oyster</h3>
                  <p data-edit="specimen.latin2" data-edit-max="240" data-edit-multiline className={s.latin}>Pleurotus ostreatus</p>
                  <p data-edit="specimen.tagFarm" data-edit-max="240" data-edit-multiline className={s.tagFarm}>Room two</p>
                </div>
                <dl className={s.key}>
                  {KEY_OYSTER.map(([term, text], i) => (
                    <div key={term}>
                      <dt data-edit={`specimen.term3.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`specimen.body2.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                    </div>
                  ))}
                  <div>
                    <dt data-edit="specimen.term4" data-edit-max="28">Spore print</dt>
                    <dd className={s.printRow}>
                      <span className={`${s.chip} ${s.lilac}`} aria-hidden="true" />
                      <span data-edit="specimen.text3" data-edit-max="60">White to lilac</span>
                    </dd>
                  </div>
                </dl>
                <p className={s.price}>
                  <strong data-edit="specimen.emphasis2">$4.50</strong>
                  <span data-edit="specimen.text4" data-edit-max="60">per 100 g</span>
                </p>
                <p data-edit="specimen.cook2" data-edit-max="240" data-edit-multiline className={s.cook}>Cook it: torn, in a hot dry pan until crisp at the edges, then soy and butter.</p>
              </div>
            </article>

            <article className={s.specimen}>
              <div className={s.plate}>
                <p data-edit="specimen.plateNo3" data-edit-max="240" data-edit-multiline className={s.plateNo}>Plate 4</p>
                <div className={s.reveal}>
                  <Artwork data-edit-pattern="specimen.field3" data-edit-roles="1,3,2,0,3,2"
                    slug="spore-and-soil-lionsmane"
                    alt="A lion's mane mushroom with its hanging spines"
                    mode="fill"
                    inks={[]}
                    className={s.revealFill}>
                    <TabbiedPattern
                      pattern={pebble}
                      palette={MANE_FILL}
                      fit="grid"
                      cellSize={16}
                      seed="spore-lionsmane"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                  <Artwork
                    slug="spore-and-soil-lionsmane"
                    alt=""
                    mode="tint"
                    inks={['var(--on-cream)', 'var(--cream)']}
                    className={s.revealTint}
                  />
                </div>
              </div>
              <div className={s.entry}>
                <div className={s.entryHead}>
                  <h3 data-edit="specimen.entryName3" data-edit-max="40" className={s.entryName}>Lion&apos;s mane</h3>
                  <p data-edit="specimen.latin3" data-edit-max="240" data-edit-multiline className={s.latin}>Hericium erinaceus</p>
                  <p data-edit="specimen.tagFarm2" data-edit-max="240" data-edit-multiline className={s.tagFarm}>Room three</p>
                </div>
                <dl className={s.key}>
                  {KEY_MANE.map(([term, text], i) => (
                    <div key={term}>
                      <dt data-edit={`specimen.term5.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`specimen.body3.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                    </div>
                  ))}
                  <div>
                    <dt data-edit="specimen.term6" data-edit-max="28">Spore print</dt>
                    <dd className={s.printRow}>
                      <span className={`${s.chip} ${s.white}`} aria-hidden="true" />
                      <span data-edit="specimen.text5" data-edit-max="60">White</span>
                    </dd>
                  </div>
                </dl>
                <p className={s.price}>
                  <strong data-edit="specimen.emphasis3">$6.00</strong>
                  <span data-edit="specimen.text6" data-edit-max="60">per 100 g</span>
                </p>
                <p data-edit="specimen.cook3" data-edit-max="240" data-edit-multiline className={s.cook}>Cook it: pressed flat and browned hard, like a scallop. Tastes a little like crab.</p>
              </div>
            </article>

            <article className={s.specimen}>
              <div className={s.plate}>
                <p data-edit="specimen.plateNo4" data-edit-max="240" data-edit-multiline className={s.plateNo}>Plate 5</p>
                <div className={s.reveal}>
                  <Artwork data-edit-pattern="specimen.field4" data-edit-roles="1,0,2,0,3,0"
                    slug="spore-and-soil-shiitake"
                    alt="Three shiitake mushrooms, one turned over to show its gills"
                    mode="fill"
                    inks={[]}
                    className={s.revealFill}>
                    <TabbiedPattern
                      pattern={quarterfall}
                      palette={SHIITAKE_FILL}
                      fit="grid"
                      cellSize={16}
                      seed="spore-shiitake"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                  <Artwork
                    slug="spore-and-soil-shiitake"
                    alt=""
                    mode="tint"
                    inks={['var(--on-cream)', 'var(--cream)']}
                    className={s.revealTint}
                  />
                </div>
              </div>
              <div className={s.entry}>
                <div className={s.entryHead}>
                  <h3 data-edit="specimen.entryName4" data-edit-max="40" className={s.entryName}>Shiitake</h3>
                  <p data-edit="specimen.latin4" data-edit-max="240" data-edit-multiline className={s.latin}>Lentinula edodes</p>
                  <p data-edit="specimen.tagFarm3" data-edit-max="240" data-edit-multiline className={s.tagFarm}>The log yard</p>
                </div>
                <dl className={s.key}>
                  {KEY_SHIITAKE.map(([term, text], i) => (
                    <div key={term}>
                      <dt data-edit={`specimen.term7.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`specimen.body4.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                    </div>
                  ))}
                  <div>
                    <dt data-edit="specimen.term8" data-edit-max="28">Spore print</dt>
                    <dd className={s.printRow}>
                      <span className={`${s.chip} ${s.white}`} aria-hidden="true" />
                      <span data-edit="specimen.text7" data-edit-max="60">White</span>
                    </dd>
                  </div>
                </dl>
                <p className={s.price}>
                  <strong data-edit="specimen.emphasis4">$5.50</strong>
                  <span data-edit="specimen.text8" data-edit-max="60">per 100 g</span>
                </p>
                <p data-edit="specimen.cook4" data-edit-max="240" data-edit-multiline className={s.cook}>Cook it: sliced, in broth or a stir fry. Dried, it keeps a year and tastes deeper.</p>
              </div>
            </article>
          </div>
        </section>

        {/* ------------------------------------------------------------ KITS */}
        <section id="kits" className={s.sec} aria-labelledby="ss-kits-h">
          <div className={s.kitsGrid}>
            <figure className={s.logFigure}>
              <div className={s.logEnd}>
                <div data-edit-pattern="kits.field" data-edit-roles="transparent,0,2,0" className={s.rings} aria-hidden="true">
                  <TabbiedPattern
                    pattern={concentricrings}
                    palette={LOG_RINGS}
                    fit="cover"
                    seed="spore-log-rings"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <figcaption data-edit="kits.logCaption" data-edit-max="120" data-edit-multiline className={s.logCaption}>Fig. 6. The cut end of a shiitake log: oak, 14 cm across, eighteen rings and a ring of wax-sealed plugs.</figcaption>
            </figure>

            <div className={s.kitsText}>
              <div className={s.secHead}>
                <p data-edit="kits.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chapter 2</p>
                <h2 data-edit="kits.secTitle" data-edit-max="60" id="ss-kits-h" className={s.secTitle}>Grow kits</h2>
                <p data-edit="kits.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  The same spawn we use in the rooms, packed to grow on a
                  kitchen counter. Each kit comes with a card of instructions
                  and our number for when it sulks.
                </p>
              </div>
              <ul className={s.kits}>
                {KITS.map((k, i) => (
                  <li key={k.name} className={s.kit}>
                    <div className={s.kitHead}>
                      <h3 data-edit={`kits.kitName.${i}`} data-edit-max="40" className={s.kitName}>{k.name}</h3>
                      <p data-edit={`kits.kitPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.kitPrice}>{k.price}</p>
                    </div>
                    <p data-edit={`kits.kitNote.${i}`} data-edit-max="240" data-edit-multiline className={s.kitNote}>{k.note}</p>
                    <dl className={s.kitFacts}>
                      <div>
                        <dt data-edit={`kits.term.${i}`} data-edit-max="28">Fruits</dt>
                        <dd data-edit={`kits.body.${i}`} data-edit-max="200" data-edit-multiline>{k.flush}</dd>
                      </div>
                      <div>
                        <dt data-edit={`kits.term2.${i}`} data-edit-max="28">Crop</dt>
                        <dd data-edit={`kits.body2.${i}`} data-edit-max="200" data-edit-multiline>{k.crop}</dd>
                      </div>
                      <div>
                        <dt data-edit={`kits.term3.${i}`} data-edit-max="28">Skill</dt>
                        <dd className={s.skill}>
                          <span className={`${s.skillDots} ${s[k.kind]}`} aria-hidden="true" />
                          <span data-edit={`kits.text.${i}`} data-edit-max="60">{k.level}</span>
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ SHOP */}
        <section id="shop" className={s.sec} aria-labelledby="ss-shop-h">
          <div className={s.secHead}>
            <p data-edit="shop.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chapter 3</p>
            <h2 data-edit="shop.secTitle" data-edit-max="60" id="ss-shop-h" className={s.secTitle}>Farm shop and markets</h2>
            <p data-edit="shop.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The shop is in the old milking parlour, through the yard. The
              rest of the week we are behind a trestle table somewhere
              nearby.
            </p>
          </div>

          <ol className={s.week}>
            {WEEK.map((d, i) => (
              <li key={d.day} className={s[d.kind]}>
                <p data-edit={`shop.weekDay.${i}`} data-edit-max="240" data-edit-multiline className={s.weekDay}>{d.day}</p>
                <p data-edit={`shop.weekWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.weekWhere}>{d.where}</p>
                <p data-edit={`shop.weekTime.${i}`} data-edit-max="240" data-edit-multiline className={s.weekTime}>{d.time}</p>
              </li>
            ))}
          </ol>

          <div className={s.shopGrid}>
            <div className={s.yard}>
              <div data-edit-pattern="shop.field" data-edit-roles="transparent,3,1,2,3,1" className={s.gravel} aria-hidden="true">
                <TabbiedPattern
                  pattern={pebble}
                  palette={GRAVEL}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={26}
                  seed="spore-gravel"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.yardCard}>
                <p data-edit="shop.yardLabel" data-edit-max="240" data-edit-multiline className={s.yardLabel}>Find us</p>
                <p data-edit="shop.yardAddress" data-edit-max="240" data-edit-multiline className={s.yardAddress}>The old dairy, Coldharbour Lane, Fenwick</p>
                <p data-edit="shop.yardNote" data-edit-max="240" data-edit-multiline className={s.yardNote}>Half a mile past the church, the white gate on the left. Park on the gravel; the shop is the low building with the green door.</p>
              </div>
            </div>
            <div className={s.shopHours}>
              <h3 data-edit="shop.subTitle" data-edit-max="40" className={s.subTitle}>Shop hours</h3>
              <dl className={s.hours}>
                {SHOP_HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`shop.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`shop.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="shop.shopNote" data-edit-max="240" data-edit-multiline className={s.shopNote}>Also on the shelves: dried mushrooms, mushroom salt, our own chilli oil with shiitake, and whatever the neighbours have grown.</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- RESTAURANTS */}
        <section id="restaurants" className={s.sec} aria-labelledby="ss-rest-h">
          <div className={s.secHead}>
            <p data-edit="restaurants.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chapter 4</p>
            <h2 data-edit="restaurants.secTitle" data-edit-max="60" id="ss-rest-h" className={s.secTitle}>Restaurants we supply</h2>
            <p data-edit="restaurants.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Picked on Monday and Thursday, delivered by van the next
              morning. Kitchens within twenty miles; ask about standing
              orders.
            </p>
          </div>
          <ul className={s.labels}>
            {KITCHENS.map((k, i) => (
              <li key={k.name} className={s.label}>
                <p data-edit={`restaurants.labelHead.${i}`} data-edit-max="240" data-edit-multiline className={s.labelHead}>Supplied to</p>
                <h3 data-edit={`restaurants.labelName.${i}`} data-edit-max="40" className={s.labelName}>{k.name}</h3>
                <dl className={s.labelFields}>
                  <div>
                    <dt data-edit={`restaurants.term.${i}`} data-edit-max="28">Loc.</dt>
                    <dd data-edit={`restaurants.body.${i}`} data-edit-max="200" data-edit-multiline>{k.town}</dd>
                  </div>
                  <div>
                    <dt data-edit={`restaurants.term2.${i}`} data-edit-max="28">Takes</dt>
                    <dd data-edit={`restaurants.body2.${i}`} data-edit-max="200" data-edit-multiline>{k.takes}</dd>
                  </div>
                  <div>
                    <dt data-edit={`restaurants.term3.${i}`} data-edit-max="28">Van</dt>
                    <dd data-edit={`restaurants.body3.${i}`} data-edit-max="200" data-edit-multiline>{k.days}</dd>
                  </div>
                  <div>
                    <dt data-edit={`restaurants.term4.${i}`} data-edit-max="28">Since</dt>
                    <dd data-edit={`restaurants.body4.${i}`} data-edit-max="200" data-edit-multiline>{k.since}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <blockquote className={s.quote}>
            <p data-edit="restaurants.body5" data-edit-max="240" data-edit-multiline>The lion&apos;s mane arrives at eight and is on a plate by one. You cannot buy that kind of fresh.</p>
            <cite data-edit="restaurants.attribution" data-edit-max="48">Nadia Okoro, chef, The Salt House</cite>
          </blockquote>
        </section>

        {/* ----------------------------------------------------------- TOURS */}
        <section id="tours" className={s.sec} aria-labelledby="ss-tours-h">
          <div className={s.room}>
            <div data-edit-pattern="tours.field" data-edit-roles="transparent,2,1,3" className={s.lights} aria-hidden="true">
              <TabbiedPattern
                pattern={bokeh}
                palette={ROOM_LIGHTS}
                options={{ frequency: 0.5 }}
                fit="grid"
                cellSize={60}
                seed="spore-room-lights"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.roomGrid}>
              <div className={s.roomText}>
                <p data-edit="tours.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chapter 5</p>
                <h2 data-edit="tours.secTitle" data-edit-max="60" id="ss-tours-h" className={s.secTitle}>Grow room tours</h2>
                <p data-edit="tours.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  Through the footbath and into the rooms: the lab where the
                  spawn is made, the incubation racks, and the fruiting room,
                  where it is always October.
                </p>
                <dl className={s.tourFacts}>
                  {TOUR_FACTS.map(([term, text], i) => (
                    <div key={term}>
                      <dt data-edit={`tours.term.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`tours.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className={s.instrument}>
                <div className={s.instrumentHead}>
                  <p data-edit="tours.body2" data-edit-max="240" data-edit-multiline>Room 2, fruiting</p>
                  <p data-edit="tours.live" data-edit-max="240" data-edit-multiline className={s.live}>Live</p>
                </div>
                <dl className={s.readings}>
                  {READINGS.map((r, i) => (
                    <div key={r.label} className={s.reading}>
                      <dt data-edit={`tours.term2.${i}`} data-edit-max="28">{r.label}</dt>
                      <dd data-edit={`tours.readingValue.${i}`} data-edit-max="200" data-edit-multiline className={s.readingValue}>{r.value}</dd>
                      <dd data-edit={`tours.readingNote.${i}`} data-edit-max="200" data-edit-multiline className={s.readingNote}>{r.note}</dd>
                      <dd className={`${s.meter} ${s[r.kind]}`} aria-hidden="true" />
                    </div>
                  ))}
                </dl>
                <p data-edit="tours.instrumentFoot" data-edit-max="240" data-edit-multiline className={s.instrumentFoot}>Read at 07:40 this morning. The misters run every nine minutes.</p>
              </div>
            </div>
          </div>

          <div className={s.prints}>
            <div className={s.printsHead}>
              <h3 data-edit="tours.subTitle" data-edit-max="40" className={s.subTitle}>Take home a spore print</h3>
              <p data-edit="tours.printsNote" data-edit-max="240" data-edit-multiline className={s.printsNote}>Every tour ends at the long table: a cap on half-black, half-white card, under a glass, overnight. Here are ours.</p>
            </div>
            <ul className={s.printCards}>
              {PRINTS.map((p, i) => (
                <li key={p.name} className={s.printCard}>
                  <span className={`${s.print} ${s[p.kind]}`} aria-hidden="true" />
                  <p data-edit={`tours.printName.${i}`} data-edit-max="240" data-edit-multiline className={s.printName}>{p.name}</p>
                  <p data-edit={`tours.printColor.${i}`} data-edit-max="240" data-edit-multiline className={s.printColor}>{p.color}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- COOKING */}
        <section id="cooking" className={s.sec} aria-labelledby="ss-cook-h">
          <div className={s.notebook}>
            <div className={s.notebookHead}>
              <p data-edit="cooking.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chapter 6</p>
              <h2 data-edit="cooking.notebookTitle" data-edit-max="60" id="ss-cook-h" className={s.notebookTitle}>Cooking notes</h2>
              <p data-edit="cooking.notebookLede" data-edit-max="240" data-edit-multiline className={s.notebookLede}>From the back of the kitchen door at the farm, copied out neatly.</p>
            </div>
            <ol className={s.notes}>
              {NOTES.map(([title, text], i) => (
                <li key={title}>
                  <h3 data-edit={`cooking.noteTitle.${i}`} data-edit-max="40" className={s.noteTitle}>{title}</h3>
                  <p data-edit={`cooking.noteText.${i}`} data-edit-max="240" data-edit-multiline className={s.noteText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- ORDER */}
        <section id="order" className={s.sec} aria-labelledby="ss-order-h">
          <div className={s.orderGrid}>
            <div className={s.orderText}>
              <p data-edit="order.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Chapter 7</p>
              <h2 data-edit="order.secTitle" data-edit-max="60" id="ss-order-h" className={s.secTitle}>Order</h2>
              <p data-edit="order.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Order by Thursday noon and collect on Saturday, at the shop or
                the Fenwick market stall. We text when your box is packed.
              </p>
              <p className={s.orderContact}>
                <a data-edit="order.link" data-edit-max="28" href="tel:+15550173308">(555) 017-3308</a>
              </p>
              <p className={s.orderContact}>
                <a data-edit="order.link2" data-edit-max="28" href="mailto:pick@sporeandsoil.example">pick@sporeandsoil.example</a>
              </p>
            </div>

            <form className={s.form} action="#">
              <h3 data-edit="order.formTitle" data-edit-max="40" className={s.formTitle}>Collection slip</h3>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="order.label" htmlFor="ss-name">Name</label>
                  <input id="ss-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="order.label2" htmlFor="ss-phone">Mobile, for the text</label>
                  <input id="ss-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="order.label3" htmlFor="ss-box">Box</label>
                  <select id="ss-box" name="box" defaultValue="mixed">
                    <option value="mixed">Mixed box, 500 g, $26</option>
                    <option value="oyster">Oyster box, 500 g, $21</option>
                    <option value="mane">Lion&apos;s mane, 300 g, $17</option>
                    <option value="shiitake">Shiitake, 400 g, $21</option>
                    <option value="kit">A grow kit</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="order.label4" htmlFor="ss-where">Collect from</label>
                  <select id="ss-where" name="where" defaultValue="market">
                    <option value="market">Fenwick market, Saturday</option>
                    <option value="shop">The farm shop, Saturday</option>
                    <option value="sunday">The farm shop, Sunday</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="order.label5" htmlFor="ss-notes">Anything else</label>
                  <textarea id="ss-notes" name="notes" rows={3} placeholder="Two boxes, one without lion's mane" />
                </div>
              </div>
              <button data-edit="order.btn" data-edit-max="24" className={s.btn} type="submit">Send the slip</button>
              <p data-edit="order.formSmall" data-edit-max="240" data-edit-multiline className={s.formSmall}>Pay when you collect: card or cash. Chanterelles cannot be ordered; they go on the table as they come.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,1,2,3" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={quarterfall}
            palette={FOOT}
            options={{ frequency: 0.7 }}
            fit="grid"
            cellSize={30}
            seed="spore-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Spore &amp; Soil</p>
            <p data-edit="footer.footSub" data-edit-max="240" data-edit-multiline className={s.footSub}>Gourmet mushroom farm and farm shop</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel" data-edit-max="240" data-edit-multiline className={s.footLabel}>Farm</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>The old dairy, Coldharbour Lane, Fenwick</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel2" data-edit-max="240" data-edit-multiline className={s.footLabel}>Write</p>
            <p><a data-edit="footer.link" data-edit-max="28" href="mailto:pick@sporeandsoil.example">pick@sporeandsoil.example</a></p>
            <p><a data-edit="footer.link2" data-edit-max="28" href="tel:+15550173308">(555) 017-3308</a></p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel3" data-edit-max="240" data-edit-multiline className={s.footLabel}>Colophon</p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional mushroom farm; the people, kitchens, prices and readings are invented.</p>
            <p>Patterns by <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
            <p data-edit="footer.body3" data-edit-max="240" data-edit-multiline>The mushrooms are generated images, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
