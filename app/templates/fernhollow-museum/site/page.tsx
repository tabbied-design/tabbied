import { TabbiedPattern } from 'tabbied/react';
import { fenestrate, pindot, bobbinet, gritfield, moleskin } from 'tabbied/patterns';
import s from './fernhollow-museum.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Fernhollow Museum: Natural history on Quarry Hill, Fernhollow',
  description:
    'A Victorian cabinet of curiosities on Quarry Hill: moths, beetles, fossils and a herbarium of 32,000 sheets. Exhibitions, opening hours, family trails, evening lectures and membership.',
};

/* Site colors: the green of the cabinets, the bone of the mounts, the brass
   of the label holders and pulls, and the red of the catalogue stamps. */
const CABINET = '#1e3a31';
const BONE = '#eee6d2';
const BRASS = '#b98a3c';
const LABEL = '#9a2e27';

/* The glazed case: rows of little windowed boxes. */
const CASE = ['transparent', BONE, BRASS, BONE, LABEL, BRASS];
/* The lining of the specimen drawer: red cloth with gilt eyelets. */
const LINING = [LABEL, CABINET, BRASS, CABINET, LABEL, CABINET];
/* The exhibition posters: a fine print of dots on red, and on brass. */
const PRINT_RED = [LABEL, BONE, BRASS, BONE, BRASS, BONE];
const PRINT_BRASS = [BRASS, CABINET, LABEL, CABINET, BONE, CABINET];
/* The discovery room's net of eyelets. */
const NET = ['transparent', BRASS, BONE, BRASS, BONE, BRASS];
/* The lantern slide beside the lecture programme. */
const GRAIN = [BRASS, CABINET, LABEL, BONE, CABINET, LABEL];
/* The baize at the foot of the cabinet. */
const BAIZE = [CABINET, BRASS, LABEL, BRASS, CABINET, BONE];

const NAV = [
  ['Now showing', '#showing'],
  ['The drawers', '#drawers'],
  ['Visit', '#visit'],
  ['Families', '#families'],
  ['Research', '#research'],
  ['Lectures', '#lectures'],
  ['Membership', '#membership'],
];

const HERO_FACTS = [
  ['Open today', '10:00-17:00'],
  ['Admission', '$12, under 16s free'],
  ['First Sunday', 'Free for everyone'],
];

type Specimen = {
  slug: string;
  alt: string;
  name: string;
  latin: string;
  cat: string;
  locality: string;
  year: string;
  by: string;
  shape: 'wide' | 'tall' | 'round';
  pin: string;
};

/* The drawer: six engravings on bone mounts, one pin through each. */
const SPECIMENS: Specimen[] = [
  {
    slug: 'fernhollow-museum-moth',
    alt: 'A luna moth with its wings spread flat, pinned on a mount',
    name: 'Luna moth',
    latin: 'Actias luna',
    cat: 'FHM 1887.214',
    locality: 'At the lamp, Quarry Hill',
    year: '1887',
    by: 'Rev. E. Carrow',
    shape: 'wide',
    pin: '26%',
  },
  {
    slug: 'fernhollow-museum-beetle',
    alt: 'A stag beetle seen from above, pinned like a specimen',
    name: 'Stag beetle',
    latin: 'Lucanus cervus',
    cat: 'FHM 1902.031',
    locality: 'Hedgerow, Low Farm',
    year: '1902',
    by: 'A. M. Pell',
    shape: 'tall',
    pin: '40%',
  },
  {
    slug: 'fernhollow-museum-fern',
    alt: 'A pressed frond of male fern',
    name: 'Male fern',
    latin: 'Dryopteris filix-mas',
    cat: 'FHM H.1911.448',
    locality: 'North face, Quarry Hill woods',
    year: '1911',
    by: 'Miss A. Thorne',
    shape: 'tall',
    pin: '12%',
  },
  {
    slug: 'fernhollow-museum-trilobite',
    alt: 'A trilobite fossil seen from above',
    name: 'Trilobite',
    latin: 'Calymene blumenbachii',
    cat: 'FHM G.1893.007',
    locality: 'Bed 4, Quarry Hill limestone',
    year: '1893',
    by: 'The quarrymen of Fernhollow',
    shape: 'tall',
    pin: '18%',
  },
  {
    slug: 'fernhollow-museum-nautilus',
    alt: 'A nautilus shell cut in half to show its spiral chambers',
    name: 'Chambered nautilus',
    latin: 'Nautilus pompilius',
    cat: 'FHM Z.1924.112',
    locality: 'Sulu Sea, the Carrow bequest',
    year: '1924',
    by: 'Capt. H. Carrow',
    shape: 'round',
    pin: '14%',
  },
  {
    slug: 'fernhollow-museum-skull',
    alt: 'The skull of a red fox in side view',
    name: 'Red fox, skull',
    latin: 'Vulpes vulpes',
    cat: 'FHM Z.1956.090',
    locality: 'Fernhollow Common',
    year: '1956',
    by: '2nd Fernhollow Scouts',
    shape: 'wide',
    pin: '30%',
  },
];

const HOURS = [
  ['Tuesday to Saturday', '10:00-17:00'],
  ['Thursday', 'Late, until 20:00'],
  ['Sunday', '12:00-17:00'],
  ['Monday', 'Closed'],
];

const ADMISSION = [
  ['Adult', '$12'],
  ['Over 65s and students', '$8'],
  ['Under 16s, with an adult', 'Free'],
  ['Members', 'Free'],
];

const ACCESS = [
  'Step-free entrance on Chapel Walk, with a bell',
  'A lift to every floor, and a stool in every gallery',
  'Large-print labels and a magnifier at the desk',
  'Assistance dogs welcome; carers free',
];

type Trail = { name: string; ages: string; time: string; body: string };

const TRAILS: Trail[] = [
  { name: 'The Moth Hunt', ages: 'Ages 4-7', time: '30 min', body: 'Eight paper moths are hiding in the galleries. Find them all for a badge at the desk.' },
  { name: 'Bones and Teeth', ages: 'Ages 7-11', time: '45 min', body: 'Ten skulls, ten sets of teeth. Who eats grass, who eats beetles, and who eats you?' },
  { name: 'Fossil Detectives', ages: 'Ages 8-12', time: '1 hour', body: 'A hand lens, a notebook and the quarry gallery. Draw three fossils and name the sea they lived in.' },
];

const ROOM = [
  ['Open', 'Tue-Fri 13:00-16:00; weekends and school holidays 10:30-16:30'],
  ['Handling table', '11:00 and 14:00, with a volunteer'],
  ['Who', 'Everyone; under 5s with a grown-up'],
  ['Cost', 'Free, with no need to book'],
];

type Card = { head: string; cat: string; body: string; foot: string };

const RESEARCH: Card[] = [
  {
    head: 'Loans',
    cat: 'Coll. 1',
    body: 'We lend to museums, schools and universities: 412 objects are out on loan this year. From six weeks, with a condition report and a courier for anything fragile.',
    foot: 'loans@fernhollowmuseum.example',
  },
  {
    head: 'The herbarium',
    cat: 'Coll. 2',
    body: 'Thirty-two thousand pressed sheets from 1840 to now, most collected within ten miles of the hill. The digitised half is online; the rest by appointment on Wednesdays.',
    foot: 'Reading room, Wed 10:00-16:00',
  },
  {
    head: 'Ask a curator',
    cat: 'Coll. 3',
    body: 'Found a fossil in the garden, a moth on the curtain, a skull in the attic? Bring it to the identification afternoon, or write to us below.',
    foot: 'Second Saturday, 14:00-16:00',
  },
];

type Lecture = { date: string; title: string; who: string; time: string; price: string };

const LECTURES: Lecture[] = [
  { date: 'Thu 8 Oct', title: 'Moths by lamplight: 140 years of recording on Quarry Hill', who: 'Dr Helen Achterberg, Keeper of Natural Sciences', time: '19:00', price: '$8' },
  { date: 'Thu 22 Oct', title: 'The quarrymen\'s fossils: who really found the trilobites', who: 'Tom Ruddle, local historian', time: '19:00', price: '$8' },
  { date: 'Thu 5 Nov', title: 'A fox in the attic: taxidermy and the ethics of display', who: 'Priya Nand, conservator', time: '19:00', price: '$8' },
  { date: 'Thu 19 Nov', title: 'Pressed and forgotten: rediscovering Ada Thorne\'s herbarium', who: 'Dr Owen Hale, curator of botany', time: '19:00', price: '$8' },
  { date: 'Thu 3 Dec', title: 'The chambered shell: a nautilus, a spiral and a myth', who: 'Prof. Ruth Kaye, Lindenfield University', time: '19:00', price: '$10' },
  { date: 'Sat 19 Dec', title: 'The Christmas lecture: a natural history of the mince pie', who: 'The museum team, for families', time: '15:00', price: 'Free' },
];

type Tier = { name: string; price: string; per: string; lines: string[]; best?: boolean };

const TIERS: Tier[] = [
  {
    name: 'Friend',
    price: '$40',
    per: 'a year',
    lines: ['Free entry, all year', 'A free seat at every lecture', 'The Fernhollow Quarterly, by post'],
  },
  {
    name: 'Family',
    price: '$65',
    per: 'a year',
    lines: ['Two adults and up to four children', 'Everything a Friend has', 'Birthday parties in the Discovery Room'],
    best: true,
  },
  {
    name: 'Fellow',
    price: '$150',
    per: 'a year',
    lines: ['Everything a Family has', 'Two tours of the stores each year', 'Your name in the annual report'],
  },
];

const GETTING = [
  ['Bus', 'The 4 and the 11 to Quarry Hill Gates, at the door.'],
  ['Train', 'Fernhollow station, then twelve minutes up Chapel Walk.'],
  ['Car', 'Chapel Walk car park, $3 for the day. Six accessible bays by our side door.'],
];

export default function FernhollowMuseumPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cabinet': '#1e3a31',
        '--bone': '#eee6d2',
        '--brass': '#b98a3c',
        '--label': '#9a2e27',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cabinet,bone,brass,label"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy:ital@0;1&family=Pinyon+Script&family=Courier+Prime:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Fernhollow Museum</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Quarry Hill, est. 1887</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Open today 10:00-17:00</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            One wing of the luna moth, drawn larger than the room, behind
            the name; beside it the glazed case of little boxes. */}
        <section className={s.hero} aria-labelledby="fh-hero-h">
          <Artwork slug="fernhollow-museum-moth" alt="" inks={['var(--ghost)']} className={s.heroMoth} />

          <div className={s.heroText}>
            <p data-edit="fhHero.heroCat" data-edit-max="240" data-edit-multiline className={s.heroCat}>FHM 1887.001: the building, Quarry Hill</p>
            <h1 id="fh-hero-h" className={s.title}>
              <span data-edit="fhHero.text" data-edit-max="60">Fernhollow</span>
              <span data-edit="fhHero.text2" data-edit-max="60">Museum</span>
            </h1>
            <p data-edit="fhHero.heroSub" data-edit-max="240" data-edit-multiline className={s.heroSub}>A cabinet of natural history, open since 1887</p>
            <p data-edit="fhHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Forty thousand moths, beetles, fossils, shells and skulls in a
              Victorian house of mahogany drawers, most of them collected
              within a day&apos;s walk of the hill. Open a drawer; we will
              tell you who found what is inside, and where.
            </p>
            <p className={s.ctas}>
              <a data-edit="fhHero.btn" data-edit-max="28" className={s.btn} href="#visit">Plan a visit</a>
              <a data-edit="fhHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#drawers">Open a drawer</a>
            </p>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`fhHero.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`fhHero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.case}>
            <div data-edit-pattern="fhHero.field" data-edit-roles="transparent,1,2,1,3,2" className={s.caseGlass} aria-hidden="true">
              <TabbiedPattern
                pattern={fenestrate}
                palette={CASE}
                options={{ frequency: 0.82 }}
                fit="grid"
                cellSize={40}
                seed="fernhollow-case"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.caseHolder}>
              <span data-edit="fhHero.caseLabel" data-edit-max="60" className={s.caseLabel}>Case I</span>
              <span data-edit="fhHero.caseNote" data-edit-max="60" className={s.caseNote}>Microlepidoptera, the Carrow boxes</span>
            </p>
            <span className={s.escutcheon} aria-hidden="true" />
          </div>
        </section>

        {/* --------------------------------------------------- NOW SHOWING */}
        <section id="showing" className={s.drawer} aria-labelledby="fh-showing-h">
          <div className={s.front}>
            <p data-edit="showing.drawerNo" data-edit-max="240" data-edit-multiline className={s.drawerNo}>Drawer I</p>
            <div className={s.holderWrap}>
              <h2 data-edit="showing.holder" data-edit-max="60" id="fh-showing-h" className={s.holder}>Now showing</h2>
              <span className={s.pull} aria-hidden="true" />
            </div>
            <p data-edit="showing.frontNote" data-edit-max="240" data-edit-multiline className={s.frontNote}>Two exhibitions this autumn</p>
          </div>
          <div className={s.inside}>
            <ul className={s.shows}>
              <li className={s.show}>
                <div className={s.posterWrap}>
                  <div data-edit-pattern="showing.field" data-edit-roles="3,1,2,1,2,1" className={s.poster} aria-hidden="true">
                    <TabbiedPattern
                      pattern={pindot}
                      palette={PRINT_RED}
                      fit="grid"
                      cellSize={28}
                      seed="fernhollow-night-garden"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <p className={s.roundel}>
                    <span data-edit="showing.roundelSmall" data-edit-max="60" className={s.roundelSmall}>Gallery</span>
                    <span data-edit="showing.roundelBig" data-edit-max="60" className={s.roundelBig}>3</span>
                  </p>
                </div>
                <div className={s.showBody}>
                  <p data-edit="showing.showKind" data-edit-max="240" data-edit-multiline className={s.showKind}>Special exhibition</p>
                  <h3 data-edit="showing.showTitle" data-edit-max="40" className={s.showTitle}>The Night Garden</h3>
                  <p data-edit="showing.showSub" data-edit-max="240" data-edit-multiline className={s.showSub}>Moths of the Fernhollow valley</p>
                  <p data-edit="showing.showDates" data-edit-max="240" data-edit-multiline className={s.showDates}>12 September 2026 to 28 February 2027</p>
                  <p data-edit="showing.showText" data-edit-max="240" data-edit-multiline className={s.showText}>
                    Two hundred moths from the Reverend Carrow&apos;s drawers,
                    shown together for the first time since 1911, beside the
                    light trap our volunteers still run on Quarry Hill every
                    Friday night.
                  </p>
                  <p data-edit="showing.showRoom" data-edit-max="240" data-edit-multiline className={s.showRoom}>The Moth Room, first floor. Included with admission.</p>
                  <p data-edit="showing.stamp" data-edit-max="240" data-edit-multiline className={s.stamp}>FHM EX.2026.02</p>
                </div>
              </li>
              <li className={s.show}>
                <div className={s.posterWrap}>
                  <div data-edit-pattern="showing.field2" data-edit-roles="2,0,3,0,1,0" className={s.poster} aria-hidden="true">
                    <TabbiedPattern
                      pattern={pindot}
                      palette={PRINT_BRASS}
                      fit="grid"
                      cellSize={28}
                      seed="fernhollow-deep-time"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <p className={s.roundel}>
                    <span data-edit="showing.roundelSmall2" data-edit-max="60" className={s.roundelSmall}>Gallery</span>
                    <span data-edit="showing.roundelBig2" data-edit-max="60" className={s.roundelBig}>1</span>
                  </p>
                </div>
                <div className={s.showBody}>
                  <p data-edit="showing.showKind2" data-edit-max="240" data-edit-multiline className={s.showKind}>Permanent gallery, reopened</p>
                  <h3 data-edit="showing.showTitle2" data-edit-max="40" className={s.showTitle}>Deep Time on Quarry Hill</h3>
                  <p data-edit="showing.showSub2" data-edit-max="240" data-edit-multiline className={s.showSub}>Fossils from the town&apos;s own quarry</p>
                  <p data-edit="showing.showDates2" data-edit-max="240" data-edit-multiline className={s.showDates}>Reopens Saturday 3 October 2026</p>
                  <p data-edit="showing.showText2" data-edit-max="240" data-edit-multiline className={s.showText}>
                    The limestone under Fernhollow was a warm sea 430 million
                    years ago. The trilobites and sea lilies the quarrymen
                    carried up the hill, and the great slab, cleaned and relit.
                  </p>
                  <p data-edit="showing.showRoom2" data-edit-max="240" data-edit-multiline className={s.showRoom}>Ground floor, step-free. Included with admission.</p>
                  <p data-edit="showing.stamp2" data-edit-max="240" data-edit-multiline className={s.stamp}>FHM EX.1893.01</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------- THE DRAWERS
            Six specimens on bone mounts, laid on the drawer's red lining. */}
        <section id="drawers" className={s.drawer} aria-labelledby="fh-drawers-h">
          <div className={s.front}>
            <p data-edit="drawers.drawerNo" data-edit-max="240" data-edit-multiline className={s.drawerNo}>Drawer II</p>
            <div className={s.holderWrap}>
              <h2 data-edit="drawers.holder" data-edit-max="60" id="fh-drawers-h" className={s.holder}>Open a drawer</h2>
              <span className={s.pull} aria-hidden="true" />
            </div>
            <p data-edit="drawers.frontNote" data-edit-max="240" data-edit-multiline className={s.frontNote}>FHM 1887-1956, six of forty thousand</p>
          </div>
          <div className={s.inside}>
            <p data-edit="drawers.drawerIntro" data-edit-max="240" data-edit-multiline className={s.drawerIntro}>
              Every specimen in the house has a number, a place and a year, and
              most have a name in the collector&apos;s own hand. These six are on
              show in the Long Gallery; ask a steward and they will open the
              drawers beneath them.
            </p>
            <div className={s.tray}>
              <div data-edit-pattern="drawers.field" data-edit-roles="3,0,2,0,3,0" className={s.lining} aria-hidden="true">
                <TabbiedPattern
                  pattern={fenestrate}
                  palette={LINING}
                  fit="grid"
                  cellSize={30}
                  seed="fernhollow-lining"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ul className={s.specimens}>
                {SPECIMENS.map((sp, i) => (
                  <li key={sp.cat} className={s.mount}>
                    <div className={`${s.plate} ${s[sp.shape]}`}>
                      <Artwork slug={sp.slug} alt={sp.alt} inks={['var(--on-bone)']} className={s.specimen} />
                      <span className={s.pin} style={{ top: sp.pin }} aria-hidden="true" />
                    </div>
                    <div className={s.tag}>
                      <p data-edit={`drawers.tagName.${i}`} data-edit-max="240" data-edit-multiline className={s.tagName}>{sp.name}</p>
                      <p data-edit={`drawers.tagLatin.${i}`} data-edit-max="240" data-edit-multiline className={s.tagLatin}>{sp.latin}</p>
                      <dl className={s.tagLines}>
                        <div>
                          <dt data-edit={`drawers.term.${i}`} data-edit-max="28">Loc.</dt>
                          <dd data-edit={`drawers.body.${i}`} data-edit-max="200" data-edit-multiline>{sp.locality}</dd>
                        </div>
                        <div>
                          <dt data-edit={`drawers.term2.${i}`} data-edit-max="28">Coll.</dt>
                          <dd>{`${sp.by}, ${sp.year}`}</dd>
                        </div>
                      </dl>
                      <p data-edit={`drawers.tagCat.${i}`} data-edit-max="240" data-edit-multiline className={s.tagCat}>{sp.cat}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- VISIT */}
        <section id="visit" className={s.drawer} aria-labelledby="fh-visit-h">
          <div className={s.front}>
            <p data-edit="visit.drawerNo" data-edit-max="240" data-edit-multiline className={s.drawerNo}>Drawer III</p>
            <div className={s.holderWrap}>
              <h2 data-edit="visit.holder" data-edit-max="60" id="fh-visit-h" className={s.holder}>Hours &amp; admission</h2>
              <span className={s.pull} aria-hidden="true" />
            </div>
            <p data-edit="visit.frontNote" data-edit-max="240" data-edit-multiline className={s.frontNote}>Free on the first Sunday of every month</p>
          </div>
          <div className={s.inside}>
            <div className={s.visit}>
              <div className={s.sheet}>
                <h3 data-edit="visit.sheetTitle" data-edit-max="40" className={s.sheetTitle}>Opening hours</h3>
                <dl className={s.table}>
                  {HOURS.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`visit.term.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="visit.sheetNote" data-edit-max="240" data-edit-multiline className={s.sheetNote}>Open on bank holiday Mondays. Last entry 45 minutes before closing; the cafe in the old Coach House opens at 09:30.</p>
              </div>
              <div className={s.sheet}>
                <h3 data-edit="visit.sheetTitle2" data-edit-max="40" className={s.sheetTitle}>Admission</h3>
                <dl className={s.table}>
                  {ADMISSION.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`visit.term2.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="visit.sheetNote2" data-edit-max="240" data-edit-multiline className={s.sheetNote}>Your ticket lets you back in free for a year: we stamp it at the desk.</p>
              </div>
              <div className={s.firstSunday}>
                <p data-edit="visit.fsSmall" data-edit-max="240" data-edit-multiline className={s.fsSmall}>Every month</p>
                <p data-edit="visit.fsBig" data-edit-max="240" data-edit-multiline className={s.fsBig}>First Sunday</p>
                <p data-edit="visit.fsFree" data-edit-max="240" data-edit-multiline className={s.fsFree}>Free for everyone</p>
                <p data-edit="visit.fsNote" data-edit-max="240" data-edit-multiline className={s.fsNote}>Next: Sunday 4 October, 12:00-17:00, with the handling table out in the Long Gallery all afternoon.</p>
              </div>
              <div className={s.sheet}>
                <h3 data-edit="visit.sheetTitle3" data-edit-max="40" className={s.sheetTitle}>Getting round</h3>
                <ul className={s.access}>
                  {ACCESS.map((item, i) => (
                    <li data-edit={`visit.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- FAMILIES */}
        <section id="families" className={s.drawer} aria-labelledby="fh-families-h">
          <div className={s.front}>
            <p data-edit="families.drawerNo" data-edit-max="240" data-edit-multiline className={s.drawerNo}>Drawer IV</p>
            <div className={s.holderWrap}>
              <h2 data-edit="families.holder" data-edit-max="60" id="fh-families-h" className={s.holder}>Family trails</h2>
              <span className={s.pull} aria-hidden="true" />
            </div>
            <p data-edit="families.frontNote" data-edit-max="240" data-edit-multiline className={s.frontNote}>And the drawers you may touch</p>
          </div>
          <div className={s.inside}>
            <div className={s.families}>
              <ol className={s.trails}>
                {TRAILS.map((t, i) => (
                  <li key={t.name} className={s.trail}>
                    <p className={s.trailNo}>{`Trail ${i + 1}`}</p>
                    <h3 data-edit={`families.trailName.${i}`} data-edit-max="40" className={s.trailName}>{t.name}</h3>
                    <p className={s.trailMeta}>
                      <span data-edit={`families.text.${i}`} data-edit-max="60">{t.ages}</span>
                      <span data-edit={`families.text2.${i}`} data-edit-max="60">{t.time}</span>
                    </p>
                    <p data-edit={`families.trailBody.${i}`} data-edit-max="240" data-edit-multiline className={s.trailBody}>{t.body}</p>
                  </li>
                ))}
              </ol>
              <aside className={s.room} aria-labelledby="fh-room-h">
                <div data-edit-pattern="fhRoom.field" data-edit-roles="transparent,2,1,2,1,2" className={s.roomNet} aria-hidden="true">
                  <TabbiedPattern
                    pattern={bobbinet}
                    palette={NET}
                    fit="grid"
                    cellSize={34}
                    seed="fernhollow-discovery"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.roomCard}>
                  <h3 data-edit="fhRoom.roomTitle" data-edit-max="40" id="fh-room-h" className={s.roomTitle}>The Discovery Room</h3>
                  <p data-edit="fhRoom.roomLede" data-edit-max="240" data-edit-multiline className={s.roomLede}>
                    A ground-floor room of low drawers you are allowed to open:
                    antlers, sea urchins, a mammoth tooth and a real owl pellet,
                    with microscopes and a naturalist&apos;s coat to dress up in.
                  </p>
                  <dl className={s.roomFacts}>
                    {ROOM.map(([term, value], i) => (
                      <div key={term}>
                        <dt data-edit={`fhRoom.term.${i}`} data-edit-max="28">{term}</dt>
                        <dd data-edit={`fhRoom.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- RESEARCH */}
        <section id="research" className={s.drawer} aria-labelledby="fh-research-h">
          <div className={s.front}>
            <p data-edit="research.drawerNo" data-edit-max="240" data-edit-multiline className={s.drawerNo}>Drawer V</p>
            <div className={s.holderWrap}>
              <h2 data-edit="research.holder" data-edit-max="60" id="fh-research-h" className={s.holder}>Collections &amp; research</h2>
              <span className={s.pull} aria-hidden="true" />
            </div>
            <p data-edit="research.frontNote" data-edit-max="240" data-edit-multiline className={s.frontNote}>Loans, the herbarium, a curator</p>
          </div>
          <div className={s.inside}>
            <ul className={s.cards}>
              {RESEARCH.map((c, i) => (
                <li key={c.head} className={s.card}>
                  <p data-edit={`research.cardCat.${i}`} data-edit-max="240" data-edit-multiline className={s.cardCat}>{c.cat}</p>
                  <h3 data-edit={`research.cardHead.${i}`} data-edit-max="40" className={s.cardHead}>{c.head}</h3>
                  <p data-edit={`research.cardBody.${i}`} data-edit-max="240" data-edit-multiline className={s.cardBody}>{c.body}</p>
                  <p data-edit={`research.cardFoot.${i}`} data-edit-max="240" data-edit-multiline className={s.cardFoot}>{c.foot}</p>
                  <span className={s.cardHole} aria-hidden="true" />
                </li>
              ))}
            </ul>

            <form className={s.form} action="#">
              <h3 data-edit="research.formTitle" data-edit-max="40" className={s.formTitle}>Write to a curator</h3>
              <p data-edit="research.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We answer within ten working days. For an identification, attach a photograph with a coin beside the object for scale.</p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="research.label" htmlFor="fh-name">Your name</label>
                  <input id="fh-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="research.label2" htmlFor="fh-email">Email</label>
                  <input id="fh-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="research.label3" htmlFor="fh-topic">About</label>
                  <select id="fh-topic" name="topic" defaultValue="identify">
                    <option value="identify">Identifying something I found</option>
                    <option value="loan">Borrowing an object</option>
                    <option value="herbarium">Visiting the herbarium</option>
                    <option value="donate">Giving something to the museum</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="research.label4" htmlFor="fh-photo">Photograph</label>
                  <input id="fh-photo" name="photo" type="file" accept="image/*" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="research.label5" htmlFor="fh-message">What, where and when</label>
                  <textarea id="fh-message" name="message" rows={4} />
                </div>
              </div>
              <button data-edit="research.submit" data-edit-max="24" className={s.submit} type="submit">Send to the curators</button>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------- LECTURES */}
        <section id="lectures" className={s.drawer} aria-labelledby="fh-lectures-h">
          <div className={s.front}>
            <p data-edit="lectures.drawerNo" data-edit-max="240" data-edit-multiline className={s.drawerNo}>Drawer VI</p>
            <div className={s.holderWrap}>
              <h2 data-edit="lectures.holder" data-edit-max="60" id="fh-lectures-h" className={s.holder}>Evening lectures</h2>
              <span className={s.pull} aria-hidden="true" />
            </div>
            <p data-edit="lectures.frontNote" data-edit-max="240" data-edit-multiline className={s.frontNote}>Thursdays in the old Reading Room</p>
          </div>
          <div className={s.inside}>
            <div className={s.lectures}>
              <div className={s.programme}>
                <p data-edit="lectures.progHead" data-edit-max="240" data-edit-multiline className={s.progHead}>Fernhollow Museum</p>
                <h3 data-edit="lectures.progTitle" data-edit-max="40" className={s.progTitle}>Programme of Lectures</h3>
                <p data-edit="lectures.progSeason" data-edit-max="240" data-edit-multiline className={s.progSeason}>Autumn and winter, 2026</p>
                <ol className={s.progList}>
                  {LECTURES.map((l, i) => (
                    <li key={l.date} className={s.lecture}>
                      <p data-edit={`lectures.lecDate.${i}`} data-edit-max="240" data-edit-multiline className={s.lecDate}>{l.date}</p>
                      <div className={s.lecBody}>
                        <p data-edit={`lectures.lecTitle.${i}`} data-edit-max="240" data-edit-multiline className={s.lecTitle}>{l.title}</p>
                        <p data-edit={`lectures.lecWho.${i}`} data-edit-max="240" data-edit-multiline className={s.lecWho}>{l.who}</p>
                      </div>
                      <p data-edit={`lectures.lecTime.${i}`} data-edit-max="240" data-edit-multiline className={s.lecTime}>{l.time}</p>
                      <p data-edit={`lectures.lecPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.lecPrice}>{l.price}</p>
                    </li>
                  ))}
                </ol>
                <p data-edit="lectures.progFoot" data-edit-max="240" data-edit-multiline className={s.progFoot}>Doors 18:30. 120 seats; members free. Tickets at the desk or by telephone.</p>
              </div>
              <figure className={s.lantern}>
                <div data-edit-pattern="lectures.field" data-edit-roles="2,0,3,1,0,3" className={s.slide} aria-hidden="true">
                  <TabbiedPattern
                    pattern={gritfield}
                    palette={GRAIN}
                    fit="grid"
                    cellSize={30}
                    seed="fernhollow-lantern"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <figcaption className={s.slideCap}>
                  <span data-edit="lectures.slideNo" data-edit-max="60" className={s.slideNo}>Slide 14</span>
                  <span data-edit="lectures.text" data-edit-max="60">Magic-lantern slides from the 1890s lectures are projected before every talk.</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- MEMBERSHIP */}
        <section id="membership" className={s.drawer} aria-labelledby="fh-members-h">
          <div className={s.front}>
            <p data-edit="membership.drawerNo" data-edit-max="240" data-edit-multiline className={s.drawerNo}>Drawer VII</p>
            <div className={s.holderWrap}>
              <h2 data-edit="membership.holder" data-edit-max="60" id="fh-members-h" className={s.holder}>Membership</h2>
              <span className={s.pull} aria-hidden="true" />
            </div>
            <p data-edit="membership.frontNote" data-edit-max="240" data-edit-multiline className={s.frontNote}>Keeps the drawers open</p>
          </div>
          <div className={s.inside}>
            <ul className={s.tiers}>
              {TIERS.map((t, i) => (
                <li key={t.name} className={t.best ? `${s.tier} ${s.tierBest}` : s.tier}>
                  <p className={s.tierKind}>{t.best ? 'Most chosen' : 'Membership'}</p>
                  <h3 data-edit={`membership.tierName.${i}`} data-edit-max="40" className={s.tierName}>{t.name}</h3>
                  <p className={s.tierPrice}>
                    <strong data-edit={`membership.emphasis.${i}`}>{t.price}</strong>
                    <span data-edit={`membership.text.${i}`} data-edit-max="60">{t.per}</span>
                  </p>
                  <ul className={s.tierLines}>
                    {t.lines.map((line, i2) => (
                      <li data-edit={`membership.item.${i}.${i2}`} data-edit-max="80" key={line}>{line}</li>
                    ))}
                  </ul>
                  <a className={s.tierLink} href="#contact">{`Join as a ${t.name}`}</a>
                </li>
              ))}
            </ul>
            <p data-edit="membership.giftNote" data-edit-max="240" data-edit-multiline className={s.giftNote}>Membership makes a good present: we post the card in a brass-cornered box, with a pressed fern from the herbarium&apos;s duplicates.</p>
          </div>
        </section>

        {/* -------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.drawer} aria-labelledby="fh-contact-h">
          <div className={s.front}>
            <p data-edit="contact.drawerNo" data-edit-max="240" data-edit-multiline className={s.drawerNo}>Drawer VIII</p>
            <div className={s.holderWrap}>
              <h2 data-edit="contact.holder" data-edit-max="60" id="fh-contact-h" className={s.holder}>Finding us</h2>
              <span className={s.pull} aria-hidden="true" />
            </div>
            <p data-edit="contact.frontNote" data-edit-max="240" data-edit-multiline className={s.frontNote}>At the top of Quarry Hill</p>
          </div>
          <div className={s.inside}>
            <div className={s.contact}>
              <div className={s.sheet}>
                <h3 data-edit="contact.sheetTitle" data-edit-max="40" className={s.sheetTitle}>The museum</h3>
                <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>1 Quarry Hill, Fernhollow</p>
                <p data-edit="contact.sheetNote" data-edit-max="240" data-edit-multiline className={s.sheetNote}>The red-brick house with the clock and the whale&apos;s jaw over the gate. The entrance is up the front steps, or step-free from Chapel Walk.</p>
                <p className={s.contactLine}>
                  <a data-edit="contact.link" data-edit-max="28" href="tel:+15550164410">(555) 016-4410</a>
                </p>
                <p className={s.contactLine}>
                  <a data-edit="contact.link2" data-edit-max="28" href="mailto:enquiries@fernhollowmuseum.example">enquiries@fernhollowmuseum.example</a>
                </p>
              </div>
              <div className={s.sheet}>
                <h3 data-edit="contact.sheetTitle2" data-edit-max="40" className={s.sheetTitle}>Getting here</h3>
                <dl className={s.getting}>
                  {GETTING.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`contact.term.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="0,2,3,2,0,1" className={s.baize} aria-hidden="true">
          <TabbiedPattern
            pattern={moleskin}
            palette={BAIZE}
            fit="grid"
            cellSize={26}
            seed="fernhollow-baize"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Fernhollow Museum</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional natural history museum. The collections, catalogue numbers, people and prices are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The engravings are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
