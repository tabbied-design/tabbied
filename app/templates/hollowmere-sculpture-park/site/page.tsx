import { TabbiedPattern } from 'tabbied/react';
import { abutment, terrain, contourlines, strand, stylobate } from 'tabbied/patterns';
import s from './hollowmere-sculpture-park.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Hollowmere Sculpture Park: Sculpture on the Hollowmere Estate, Eldon',
  description:
    'A 1.8 km step-free trail of sculpture round the mere at Hollowmere Estate. Audio-guide stops, opening times and admission, the cafe in the old stables, the orangery exhibition, school workshops and membership.',
};

/* Site colors. The park is chalk paths, ink labels, grass and bronze. The
   plinths are cut from the abutment design in ink and chalk over stone
   grey; the lawns are terrain over grass, scattered with small shapes.
   The survey map, the orangery poster and the steps of the learning
   centre draw on a transparent ground too. */
const CHALK = '#eef0ea';
const INK = '#1b1f1c';
const GRASS = '#4c7a45';
const BRONZE = '#a8733b';

const PLINTH = ['transparent', INK, CHALK, INK, CHALK, BRONZE];
const PLINTH_WARM = ['transparent', BRONZE, CHALK, INK, BRONZE, CHALK];
const LAWN = [GRASS, CHALK, INK, BRONZE, CHALK, CHALK];
const LAWN_DUSK = [GRASS, BRONZE, CHALK, CHALK, INK, BRONZE];
const SURVEY = ['transparent', GRASS, BRONZE, GRASS];
const POSTER = ['transparent', CHALK, BRONZE, INK, CHALK, GRASS];
const STEPS = ['transparent', GRASS, INK, BRONZE, GRASS, CHALK];
const FOOT = ['transparent', CHALK, BRONZE, CHALK, GRASS, CHALK];

const NAV = [
  ['The trail', '#trail'],
  ['Visit', '#visit'],
  ['Map and access', '#access'],
  ['Exhibitions', '#exhibitions'],
  ['Learning', '#learning'],
  ['Membership', '#membership'],
];

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

const HOURS = [
  ['March to October', '10:00-18:00', 'Last entry 17:00'],
  ['November to February', '10:00-16:00', 'Last entry 15:00'],
  ['Christmas Day', 'Closed', 'Boxing Day 11:00-15:00'],
];

const ADMISSION = [
  ['Adult', '$14'],
  ['Concession', '$10'],
  ['Under 16', 'Free'],
  ['Carer', 'Free'],
  ['Members', 'Free'],
];

const CAFE = [
  ['Soup of the day, with estate bread', '$7'],
  ['Mere trout on toast, pickled cucumber', '$11'],
  ['Stable yard scone, jam and cream', '$4.50'],
];

const ACCESS_FACTS = [
  ['1.8 km', 'The whole loop, step-free, on a firm resin-bound path'],
  ['1:20', 'The steepest slope, the short rise to the orangery'],
  ['200 m', 'Between benches, every one with a back and arms'],
  ['2', 'Mobility scooters to borrow; book a day ahead'],
];

const ACCESS_LIST = [
  'Accessible toilets at the stables and the orangery; a Changing Places room at the stables',
  'Large-button handsets, and a hearing loop in every handset and at the ticket desk',
  'A BSL-interpreted tour on the first Saturday of the month',
  'Assistance dogs welcome everywhere, water bowls at every bench',
];

/* The route on the survey map: a loop round the mere, with the stops and
   a bench every 200 m along it. */
const ROUTE = 'M 88 332 C 60 250 96 170 170 132 S 322 70 404 92 S 548 150 552 232 S 490 350 404 360 S 250 352 188 368 S 110 372 88 332 Z';
const MAP_STOPS = [
  { n: '1', x: 150, y: 150 },
  { n: '2', x: 392, y: 91 },
  { n: '3', x: 548, y: 250 },
  { n: '4', x: 300, y: 356 },
];
const BENCHES = [
  [96, 230], [118, 186], [214, 114], [282, 92], [346, 84], [462, 110], [516, 170], [534, 300], [470, 342], [360, 362], [236, 360], [140, 364],
];

type Workshop = { stage: string; name: string; ages: string; text: string };

const WORKSHOPS: Workshop[] = [
  { stage: 'Ages 5-7', name: 'Shapes in the grass', ages: 'Key stage 1', text: 'Hunting for circles, holes and stacks on the trail, then making a small one in clay to take home.' },
  { stage: 'Ages 7-11', name: 'Make a monument', ages: 'Key stage 2', text: 'What is a monument for? Pupils design one for their own school and build a model of it in card and wire.' },
  { stage: 'Ages 11-16', name: 'Drawing outdoors', ages: 'Key stages 3 and 4', text: 'An artist-led morning drawing the works from life, in charcoal, with a crit in the orangery after lunch.' },
];

const LEARN_FACTS = [
  ['$180', 'a class of up to 30, two hours'],
  ['Free', 'for schools within Eldon district'],
  ['Mon-Fri', 'term time, 10:00 or 13:00'],
];

type Tier = { key: string; name: string; price: string; per: string; gets: string[] };

const TIERS: Tier[] = [
  { key: '1', name: 'Friend', price: '$45', per: 'a year', gets: ['Free entry for one, all year', '10% off in the cafe and shop', 'The members\' newsletter, four times a year'] },
  { key: '2', name: 'Joint', price: '$70', per: 'a year', gets: ['Free entry for two adults', 'Children under 16 always free', 'Two guest passes a year'] },
  { key: '3', name: 'Patron', price: '$250', per: 'a year', gets: ['Everything a Joint member has', 'Private views in the orangery', 'Your name on the conservation board'] },
];

export default function HollowmereSculpturePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--chalk': '#eef0ea',
        '--ink': '#1b1f1c',
        '--grass': '#4c7a45',
        '--bronze': '#a8733b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="chalk,ink,grass,bronze"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700&family=Radio+Canada:ital,wght@0,300..700;1,300..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markKey" data-edit-max="60" className={s.markKey}>H</span>
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Hollowmere Sculpture Park</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barTicket" data-edit-max="28" className={s.barTicket} href="#visit">Tickets</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hs-hero-h">
          <div className={s.heroText}>
            <p data-edit="hsHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Hollowmere Estate, Mere Lane, Eldon</p>
            <h1 data-edit="hsHero.heroName" data-edit-max="70" id="hs-hero-h" className={s.heroName}>Hollowmere Sculpture Park</h1>
            <p data-edit="hsHero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Forty works in the fields and woods around the mere, and a
              1.8 km path that takes in the best of them. Pick up a handset
              at the stables, walk, and key in the number at each stop.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hsHero.btnInk" data-edit-max="28" className={s.btnInk} href="#trail">Walk the trail</a>
              <a data-edit="hsHero.btnLine" data-edit-max="28" className={s.btnLine} href="#visit">Opening times</a>
            </div>

            <div className={s.handset}>
              <div className={s.device} aria-hidden="true">
                <p className={s.screen}>
                  <span data-edit="hsHero.text" data-edit-max="60">Stop</span>
                  <strong data-edit="hsHero.emphasis">02</strong>
                </p>
                <p className={s.keys}>
                  {KEYS.map((k, i) => (
                    <span data-edit={`hsHero.text2.${i}`} data-edit-max="60" key={k}>{k}</span>
                  ))}
                </p>
                <span className={s.play} />
              </div>
              <div className={s.handsetText}>
                <p data-edit="hsHero.handsetTitle" data-edit-max="240" data-edit-multiline className={s.handsetTitle}>Enter a stop number</p>
                <p data-edit="hsHero.handsetNote" data-edit-max="240" data-edit-multiline className={s.handsetNote}>Free handsets at the stables, or the same guide on your phone at hollowmere.example/guide. Each stop runs two to four minutes.</p>
              </div>
            </div>
          </div>

          <figure className={s.heroStage}>
            <p data-edit="hsHero.body" data-edit-max="240" data-edit-multiline className={s.heroKey} aria-hidden="true">02</p>
            <Artwork
              slug="hollowmere-sculpture-park-stone"
              alt="The Eye by Tomasz Adair: a large smooth limestone form with a round hole through its middle"
              inks={['var(--text)', 'var(--chalk)']}
              className={s.heroStone}
            />
            <div data-edit-pattern="hsHero.field" data-edit-roles="transparent,1,0,1,0,3" className={s.heroPlinth} aria-hidden="true">
              <TabbiedPattern
                pattern={abutment}
                palette={PLINTH}
                options={{ frequency: 0.6 }}
                fit="grid"
                cellSize={34}
                seed="hollowmere-hero-plinth"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <figcaption className={s.heroLabel}>
              <strong data-edit="hsHero.emphasis2">Tomasz Adair</strong>
              <span data-edit="hsHero.labelTitle" data-edit-max="60" className={s.labelTitle}>The Eye, 1978</span>
              <span data-edit="hsHero.text3" data-edit-max="60">Hopton Wood limestone. Stop 02 on the trail.</span>
            </figcaption>
          </figure>
        </section>

        {/* ----------------------------------------------------------- TRAIL */}
        <section id="trail" className={s.trailSec} aria-labelledby="hs-trail-h">
          <div className={s.trailHead}>
            <div>
              <p data-edit="trail.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>The trail</p>
              <h2 data-edit="trail.secTitle" data-edit-max="60" id="hs-trail-h" className={s.secTitle}>Four stops round the mere</h2>
            </div>
            <p data-edit="trail.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The short loop from the stables: four works, 1.8 km, about an
              hour at a stroll. Scroll along the path; the distance to each
              stop is marked on it.
            </p>
          </div>

          <ol className={s.trail}>
            <li className={s.stop}>
              <div className={s.stopTop}>
                <p data-edit="trail.stopKey" data-edit-max="240" data-edit-multiline className={s.stopKey}>01</p>
                <p data-edit="trail.leg" data-edit-max="240" data-edit-multiline className={s.leg}>From the stables, 150 m</p>
              </div>
              <div className={`${s.stage} ${s.stagePale}`}>
                <Artwork
                  slug="hollowmere-sculpture-park-bronze"
                  alt="Cairn for the Drowned Village: a tall bronze of four stacked rounded forms"
                  inks={['var(--ink)', 'var(--bronze)']}
                  className={s.workTall}
                />
                <div data-edit-pattern="trail.field" data-edit-roles="transparent,1,0,1,0,3" className={s.plinth} aria-hidden="true">
                  <TabbiedPattern
                    pattern={abutment}
                    palette={PLINTH}
                    options={{ frequency: 0.6 }}
                    fit="grid"
                    cellSize={24}
                    seed="hollowmere-plinth-1"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <div className={s.wallLabel}>
                <p data-edit="trail.artist" data-edit-max="240" data-edit-multiline className={s.artist}>Oona Vesk</p>
                <p data-edit="trail.life" data-edit-max="240" data-edit-multiline className={s.life}>Estonian, born 1961</p>
                <h3 data-edit="trail.workTitle" data-edit-max="40" className={s.workTitle}>Cairn for the Drowned Village, 2009</h3>
                <p data-edit="trail.material" data-edit-max="240" data-edit-multiline className={s.material}>Cast bronze on Portland stone. 320 x 90 x 80 cm</p>
                <p data-edit="trail.labelText" data-edit-max="240" data-edit-multiline className={s.labelText}>Four stacked forms, one for each farm lost when the mere was dammed in 1887. Vesk polished only what a hand can reach; everything above is left to the weather.</p>
                <p data-edit="trail.credit" data-edit-max="240" data-edit-multiline className={s.credit}>Commissioned by the Hollowmere Trust, 2009</p>
              </div>
            </li>

            <li className={s.stop}>
              <div className={s.stopTop}>
                <p data-edit="trail.stopKey2" data-edit-max="240" data-edit-multiline className={s.stopKey}>02</p>
                <p data-edit="trail.leg2" data-edit-max="240" data-edit-multiline className={s.leg}>320 m on, by the water</p>
              </div>
              <div className={`${s.stage} ${s.stageGreen}`}>
                <Artwork
                  slug="hollowmere-sculpture-park-stone"
                  alt="The Eye: a smooth limestone form with a round hole through it"
                  inks={['var(--text)', 'color-mix(in oklab, var(--chalk) 82%, var(--bronze))']}
                  className={s.workWide}
                />
                <div data-edit-pattern="trail.field2" data-edit-roles="2,0,1,3,0,0" className={s.lawn} aria-hidden="true">
                  <TabbiedPattern
                    pattern={terrain}
                    palette={LAWN}
                    options={{ frequency: 0.5 }}
                    fit="grid"
                    cellSize={36}
                    seed="hollowmere-lawn-2"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <div className={s.wallLabel}>
                <p data-edit="trail.artist2" data-edit-max="240" data-edit-multiline className={s.artist}>Tomasz Adair</p>
                <p data-edit="trail.life2" data-edit-max="240" data-edit-multiline className={s.life}>British, 1924-2001</p>
                <h3 data-edit="trail.workTitle2" data-edit-max="40" className={s.workTitle}>The Eye, 1978</h3>
                <p data-edit="trail.material2" data-edit-max="240" data-edit-multiline className={s.material}>Hopton Wood limestone. 240 x 170 x 90 cm</p>
                <p data-edit="trail.labelText2" data-edit-max="240" data-edit-multiline className={s.labelText}>Carved in the field where it stands, over two summers. Stand on the brass marker in the grass and the hole frames the boathouse across the water.</p>
                <p data-edit="trail.credit2" data-edit-max="240" data-edit-multiline className={s.credit}>Gift of the artist, 1985</p>
              </div>
            </li>

            <li className={s.stop}>
              <div className={s.stopTop}>
                <p data-edit="trail.stopKey3" data-edit-max="240" data-edit-multiline className={s.stopKey}>03</p>
                <p data-edit="trail.leg3" data-edit-max="240" data-edit-multiline className={s.leg}>540 m on, the far meadow</p>
              </div>
              <div className={`${s.stage} ${s.stageDark}`}>
                <Artwork
                  slug="hollowmere-sculpture-park-steel"
                  alt="Turning Water: two curved planes of weathering steel twisting against each other"
                  inks={['var(--bronze)', 'var(--chalk)']}
                  className={s.workTall}
                />
                <div data-edit-pattern="trail.field3" data-edit-roles="2,3,0,0,1,3" className={s.lawn} aria-hidden="true">
                  <TabbiedPattern
                    pattern={terrain}
                    palette={LAWN_DUSK}
                    options={{ frequency: 0.5 }}
                    fit="grid"
                    cellSize={36}
                    seed="hollowmere-lawn-3"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <div className={s.wallLabel}>
                <p data-edit="trail.artist3" data-edit-max="240" data-edit-multiline className={s.artist}>Ines Marr</p>
                <p data-edit="trail.life3" data-edit-max="240" data-edit-multiline className={s.life}>Portuguese, born 1979</p>
                <h3 data-edit="trail.workTitle3" data-edit-max="40" className={s.workTitle}>Turning Water, 2016</h3>
                <p data-edit="trail.material3" data-edit-max="240" data-edit-multiline className={s.material}>Weathering steel. 410 x 260 x 240 cm</p>
                <p data-edit="trail.labelText3" data-edit-max="240" data-edit-multiline className={s.labelText}>Two curves cut from one sheet and welded back against each other. The rust is the finish: Marr left it out in the rain for a year before it came here.</p>
                <p data-edit="trail.credit3" data-edit-max="240" data-edit-multiline className={s.credit}>Purchased with the support of the Art Fund, 2017</p>
              </div>
            </li>

            <li className={s.stop}>
              <div className={s.stopTop}>
                <p data-edit="trail.stopKey4" data-edit-max="240" data-edit-multiline className={s.stopKey}>04</p>
                <p data-edit="trail.leg4" data-edit-max="240" data-edit-multiline className={s.leg}>410 m on, the walled garden</p>
              </div>
              <div className={`${s.stage} ${s.stageWarm}`}>
                <Artwork
                  slug="hollowmere-sculpture-park-reader"
                  alt="The Reader: a bronze of a seated woman reading a book, on a stone block"
                  inks={['var(--grass)', 'var(--text)']}
                  className={s.workTall}
                />
                <div data-edit-pattern="trail.field4" data-edit-roles="transparent,3,0,1,3,0" className={s.plinth} aria-hidden="true">
                  <TabbiedPattern
                    pattern={abutment}
                    palette={PLINTH_WARM}
                    options={{ frequency: 0.6 }}
                    fit="grid"
                    cellSize={24}
                    seed="hollowmere-plinth-4"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <div className={s.wallLabel}>
                <p data-edit="trail.artist4" data-edit-max="240" data-edit-multiline className={s.artist}>Harriet Cole</p>
                <p data-edit="trail.life4" data-edit-max="240" data-edit-multiline className={s.life}>British, 1889-1964</p>
                <h3 data-edit="trail.workTitle4" data-edit-max="40" className={s.workTitle}>The Reader, 1931</h3>
                <p data-edit="trail.material4" data-edit-max="240" data-edit-multiline className={s.material}>Bronze on a sandstone block. 150 x 90 x 110 cm</p>
                <p data-edit="trail.labelText4" data-edit-max="240" data-edit-multiline className={s.labelText}>Cole modelled her sister reading in this garden, and the bronze has sat here since. Visitors leave pressed flowers in the open book; the gardeners let them be.</p>
                <p data-edit="trail.credit4" data-edit-max="240" data-edit-multiline className={s.credit}>Bequeathed by the Cole family, 1965</p>
              </div>
            </li>

            <li className={s.stopEnd}>
              <p data-edit="trail.endKey" data-edit-max="240" data-edit-multiline className={s.endKey}>00</p>
              <p data-edit="trail.endTitle" data-edit-max="240" data-edit-multiline className={s.endTitle}>Back to the stables</p>
              <p data-edit="trail.endNote" data-edit-max="240" data-edit-multiline className={s.endNote}>530 m along the water. Tea is at the end of the path, and the handsets go back in the rack by the door.</p>
            </li>
          </ol>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="hs-visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Visit</p>
            <h2 data-edit="visit.secTitle" data-edit-max="60" id="hs-visit-h" className={s.secTitle}>Open every day but one</h2>
          </div>
          <div className={s.signs}>
            <div className={s.sign}>
              <h3 data-edit="visit.signHead" data-edit-max="40" className={s.signHead}>Opening times</h3>
              <dl className={s.signList}>
                {HOURS.map(([when, time, note], i) => (
                  <div key={when}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{when}</dt>
                    <dd data-edit={`visit.signBig.${i}`} data-edit-max="200" data-edit-multiline className={s.signBig}>{time}</dd>
                    <dd data-edit={`visit.signNote.${i}`} data-edit-max="200" data-edit-multiline className={s.signNote}>{note}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.sign}>
              <h3 data-edit="visit.signHead2" data-edit-max="40" className={s.signHead}>Admission</h3>
              <dl className={s.priceList}>
                {ADMISSION.map(([who, price], i) => (
                  <div key={who}>
                    <dt data-edit={`visit.term2.${i}`} data-edit-max="28">{who}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="visit.signNote2" data-edit-max="240" data-edit-multiline className={s.signNote}>Tickets at the stables. Parking is free; the 42 bus from Eldon stops at the gate.</p>
            </div>
            <div className={s.sign}>
              <h3 data-edit="visit.signHead3" data-edit-max="40" className={s.signHead}>The Stables Cafe</h3>
              <p data-edit="visit.cafeHours" data-edit-max="240" data-edit-multiline className={s.cafeHours}>10:00 to half an hour before the park closes</p>
              <ul className={s.menu}>
                {CAFE.map(([dish, price], i) => (
                  <li key={dish}>
                    <span data-edit={`visit.text.${i}`} data-edit-max="60">{dish}</span>
                    <strong data-edit={`visit.emphasis.${i}`}>{price}</strong>
                  </li>
                ))}
              </ul>
              <p data-edit="visit.signNote3" data-edit-max="240" data-edit-multiline className={s.signNote}>In the old coach house, with the loose boxes as booths. Dogs welcome in the yard.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- ACCESS */}
        <section id="access" className={s.sec} aria-labelledby="hs-access-h">
          <div className={s.accessGrid}>
            <figure className={s.map}>
              <div data-edit-pattern="access.field" data-edit-roles="transparent,2,3,2" className={s.survey} aria-hidden="true">
                <TabbiedPattern
                  pattern={contourlines}
                  palette={SURVEY}
                  options={{ frequency: 0.6 }}
                  fit="cover"
                  seed="hollowmere-survey"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <svg className={s.mapSvg} viewBox="0 0 640 440" role="img" aria-label="Map of the step-free loop round the mere, with the four stops and the benches along it">
                <ellipse className={s.mere} cx="330" cy="236" rx="150" ry="84" />
                <path className={s.routeCasing} d={ROUTE} />
                <path className={s.route} d={ROUTE} />
                {BENCHES.map(([x, y]) => (
                  <rect key={`${x}-${y}`} className={s.bench} x={x - 4} y={y - 4} width="8" height="8" />
                ))}
                <rect className={s.stables} x="58" y="326" width="56" height="34" />
                <text className={s.mapLabel} x="86" y="384">Stables</text>
                <text className={s.mapWater} x="330" y="242">The mere</text>
                {MAP_STOPS.map((m) => (
                  <g key={m.n}>
                    <circle className={s.mapStop} cx={m.x} cy={m.y} r="15" />
                    <text className={s.mapStopNum} x={m.x} y={m.y + 5}>{m.n}</text>
                  </g>
                ))}
              </svg>
              <figcaption className={s.mapKey}>
                <span data-edit="access.keyRoute" data-edit-max="60" className={s.keyRoute}>Step-free loop, 1.8 km</span>
                <span data-edit="access.keyBench" data-edit-max="60" className={s.keyBench}>Bench</span>
                <span data-edit="access.keyStop" data-edit-max="60" className={s.keyStop}>Audio stop</span>
              </figcaption>
            </figure>

            <div className={s.accessText}>
              <p data-edit="access.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Map and access</p>
              <h2 data-edit="access.secTitle" data-edit-max="60" id="hs-access-h" className={s.secTitle}>One loop, no steps</h2>
              <dl className={s.accessFacts}>
                {ACCESS_FACTS.map(([figure, text], i) => (
                  <div key={figure}>
                    <dt data-edit={`access.term.${i}`} data-edit-max="28">{figure}</dt>
                    <dd data-edit={`access.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
              <ul className={s.accessList}>
                {ACCESS_LIST.map((item, i) => (
                  <li data-edit={`access.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- EXHIBITIONS */}
        <section id="exhibitions" className={s.sec} aria-labelledby="hs-exh-h">
          <div className={s.exhGrid}>
            <div className={s.poster}>
              <div data-edit-pattern="exhibitions.field" data-edit-roles="transparent,0,3,1,0,2" className={s.posterField} aria-hidden="true">
                <TabbiedPattern
                  pattern={strand}
                  palette={POSTER}
                  fit="grid"
                  cellSize={40}
                  seed="hollowmere-poster"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.posterBlock}>
                <p data-edit="exhibitions.posterWhere" data-edit-max="240" data-edit-multiline className={s.posterWhere}>In the orangery</p>
                <p data-edit="exhibitions.posterTitle" data-edit-max="240" data-edit-multiline className={s.posterTitle}>Soft Machines</p>
                <p data-edit="exhibitions.posterArtist" data-edit-max="240" data-edit-multiline className={s.posterArtist}>Aiko Brandt</p>
                <p data-edit="exhibitions.posterDates" data-edit-max="240" data-edit-multiline className={s.posterDates}>12 September to 30 November</p>
              </div>
            </div>

            <div className={s.exhText}>
              <p data-edit="exhibitions.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Exhibitions</p>
              <h2 data-edit="exhibitions.secTitle" data-edit-max="60" id="hs-exh-h" className={s.secTitle}>Soft Machines, in the orangery</h2>
              <p data-edit="exhibitions.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Aiko Brandt makes sculpture that moves when the air does:
                felt, wire and brass, hung between the orange trees under the
                glass. Twelve new works, made over a year of visits to the
                estate.
              </p>
              <dl className={s.exhFacts}>
                <div>
                  <dt data-edit="exhibitions.term" data-edit-max="28">Open</dt>
                  <dd data-edit="exhibitions.body" data-edit-max="200" data-edit-multiline>Park hours, orangery closes 30 minutes earlier</dd>
                </div>
                <div>
                  <dt data-edit="exhibitions.term2" data-edit-max="28">Talk</dt>
                  <dd data-edit="exhibitions.body2" data-edit-max="200" data-edit-multiline>Brandt in conversation, Saturday 18 October, 14:00</dd>
                </div>
                <div>
                  <dt data-edit="exhibitions.term3" data-edit-max="28">Next</dt>
                  <dd data-edit="exhibitions.body3" data-edit-max="200" data-edit-multiline>Winter Drawings from the Estate, 6 December to 1 March</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- LEARNING */}
        <section id="learning" className={s.sec} aria-labelledby="hs-learn-h">
          <div data-edit-pattern="learning.field" data-edit-roles="transparent,2,1,3,2,0" className={s.learnBand} aria-hidden="true">
            <TabbiedPattern
              pattern={stylobate}
              palette={STEPS}
              options={{ frequency: 0.8 }}
              fit="grid"
              cellSize={32}
              seed="hollowmere-steps"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.learnHead}>
            <div>
              <p data-edit="learning.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Learning</p>
              <h2 data-edit="learning.secTitle" data-edit-max="60" id="hs-learn-h" className={s.secTitle}>School workshops</h2>
            </div>
            <dl className={s.learnFacts}>
              {LEARN_FACTS.map(([figure, text], i) => (
                <div key={figure}>
                  <dt data-edit={`learning.term.${i}`} data-edit-max="28">{figure}</dt>
                  <dd data-edit={`learning.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className={s.workshops}>
            {WORKSHOPS.map((w, i) => (
              <li key={w.name} className={s.workshop}>
                <p data-edit={`learning.workshopStage.${i}`} data-edit-max="240" data-edit-multiline className={s.workshopStage}>{w.stage}</p>
                <h3 data-edit={`learning.workshopName.${i}`} data-edit-max="40" className={s.workshopName}>{w.name}</h3>
                <p data-edit={`learning.workshopAges.${i}`} data-edit-max="240" data-edit-multiline className={s.workshopAges}>{w.ages}</p>
                <p data-edit={`learning.workshopText.${i}`} data-edit-max="240" data-edit-multiline className={s.workshopText}>{w.text}</p>
              </li>
            ))}
          </ul>
          <p data-edit="learning.learnNote" data-edit-max="240" data-edit-multiline className={s.learnNote}>Book a term ahead with Priya in the learning team: learning@hollowmere.example or (555) 018-2240.</p>
        </section>

        {/* ------------------------------------------------------ MEMBERSHIP */}
        <section id="membership" className={s.sec} aria-labelledby="hs-member-h">
          <div className={s.secHead}>
            <p data-edit="membership.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Membership</p>
            <h2 data-edit="membership.secTitle" data-edit-max="60" id="hs-member-h" className={s.secTitle}>Walk it every week</h2>
            <p data-edit="membership.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Membership pays for itself on the third visit, and every dollar
              over goes to looking after the works: bronze wax each spring,
              stone cleaned by hand.
            </p>
          </div>
          <div className={s.memberGrid}>
            <ul className={s.tiers}>
              {TIERS.map((t, i) => (
                <li key={t.name} className={s.tier}>
                  <p data-edit={`membership.tierKey.${i}`} data-edit-max="240" data-edit-multiline className={s.tierKey}>{t.key}</p>
                  <h3 data-edit={`membership.tierName.${i}`} data-edit-max="40" className={s.tierName}>{t.name}</h3>
                  <p className={s.tierPrice}>
                    <strong data-edit={`membership.emphasis.${i}`}>{t.price}</strong>
                    <span data-edit={`membership.text.${i}`} data-edit-max="60">{t.per}</span>
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
              <h3 data-edit="membership.formTitle" data-edit-max="40" className={s.formTitle}>Join</h3>
              <div className={s.field}>
                <label data-edit="membership.label" htmlFor="hs-name">Name</label>
                <input id="hs-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="membership.label2" htmlFor="hs-email">Email</label>
                <input id="hs-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="membership.label3" htmlFor="hs-tier">Membership</label>
                <select id="hs-tier" name="tier" defaultValue="friend">
                  <option value="friend">Friend, $45 a year</option>
                  <option value="joint">Joint, $70 a year</option>
                  <option value="patron">Patron, $250 a year</option>
                </select>
              </div>
              <div className={s.check}>
                <input id="hs-gift" name="gift" type="checkbox" />
                <label data-edit="membership.label4" htmlFor="hs-gift">This is a gift; send the card to me</label>
              </div>
              <button data-edit="membership.btnInk" data-edit-max="24" className={s.btnInk} type="submit">Become a member</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,3,0,2,0" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={abutment}
            palette={FOOT}
            options={{ frequency: 0.7 }}
            fit="grid"
            cellSize={30}
            seed="hollowmere-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Hollowmere Sculpture Park</p>
            <p data-edit="footer.footSub" data-edit-max="240" data-edit-multiline className={s.footSub}>Hollowmere Estate, Mere Lane, Eldon</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel" data-edit-max="240" data-edit-multiline className={s.footLabel}>Ask us</p>
            <p><a data-edit="footer.link" data-edit-max="28" href="tel:+15550182200">(555) 018-2200</a></p>
            <p><a data-edit="footer.link2" data-edit-max="28" href="mailto:visit@hollowmere.example">visit@hollowmere.example</a></p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel2" data-edit-max="240" data-edit-multiline className={s.footLabel}>Today</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Open 10:00-18:00. The orangery closes at 17:30.</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel3" data-edit-max="240" data-edit-multiline className={s.footLabel}>Credits</p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional sculpture park; the artists, works and prices are invented.</p>
            <p>Patterns by <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
            <p data-edit="footer.body3" data-edit-max="240" data-edit-multiline>The sculptures are generated images, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
