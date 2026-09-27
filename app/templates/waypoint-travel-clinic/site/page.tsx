import { TabbiedPattern } from 'tabbied/react';
import { wander, meridianhatch, contourlines, truchetrings, moire } from 'tabbied/patterns';
import s from './waypoint-travel-clinic.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Waypoint Travel Clinic: Travel vaccinations and advice, Portside',
  description:
    'Travel vaccinations, malaria tablets and advice on the 2nd floor of 60 Harbour Street, Portside. A yellow fever certificate centre with every price printed, and a shop for repellent and water filters.',
};

/* Site colors. Every field is laid on a transparent ground: the cover's
   quarter-moons over the cover, the security print over the page. */
const VISA = '#efe9da';
const INK = '#1d2033';
const STAMPRED = '#c0392b';
const STAMPGREEN = '#2f7a5a';
const VIOLET = '#5b4ba8';

const COVER = ['transparent', INK, VIOLET, STAMPGREEN];
const ROSETTE = ['transparent', VIOLET, STAMPGREEN, STAMPRED];
const GUILLOCHE = ['transparent', VIOLET, STAMPGREEN, VIOLET];
const RINGS = ['transparent', VIOLET, STAMPGREEN, STAMPRED];
const RULINGS = ['transparent', VIOLET, STAMPGREEN, VIOLET, VISA, STAMPRED];
const BACK = ['transparent', INK, VIOLET, STAMPRED];

const NAV = [
  ['When to book', '#timing'],
  ['Vaccines', '#vaccines'],
  ['Malaria', '#malaria'],
  ['Destinations', '#destinations'],
  ['Prices', '#prices'],
  ['Shop', '#shop'],
];

/* The machine-readable zone: two lines of 44 characters. */
const MRZ_HERO = ['P<PSDWAYPOINT<<TRAVEL<CLINIC<<<<<<<<<<<<<<<<', 'WPT0602F<4PSD2609274<HARBOUR<ST<60<<<<<<<<<<'];
const MRZ_FOOT = ['V<PSDSAFE<TRAVELS<<SEE<YOU<ON<THE<OTHER<SIDE', 'YF4471<<2<OPEN<MON<SAT<555<015<3380<<<<<<<<<'];

const DATA = [
  { label: 'Type', value: 'Clinic', wide: false },
  { label: 'Code', value: 'PSD', wide: false },
  { label: 'Number', value: 'WPT 0602F', wide: false },
  { label: 'Name', value: 'Waypoint Travel Clinic', wide: true },
  { label: 'Address', value: '2nd floor, 60 Harbour Street, Portside', wide: true },
  { label: 'Open', value: 'Monday to Saturday', wide: false },
  { label: 'Since', value: '12 May 2014', wide: false },
  { label: 'Authority', value: 'Yellow fever centre 4471', wide: false },
];

type Milestone = {
  when: string;
  what: string;
  note: string;
  ink: string;
  tilt: string;
};

const TIMELINE: Milestone[] = [
  { when: '8 weeks before', what: 'First consultation', note: 'Your route, your health and your old records, in 30 minutes. We write the plan together and you leave with a card.', ink: 'inkViolet', tilt: 'tiltA' },
  { when: '6 weeks before', what: 'First doses', note: 'Most courses start here. Rabies and Japanese encephalitis need the longest runway, so they go first.', ink: 'inkGreen', tilt: 'tiltB' },
  { when: '4 weeks before', what: 'Second doses', note: 'Boosters and second jabs. A yellow fever certificate is valid ten days after the injection.', ink: 'inkRed', tilt: 'tiltC' },
  { when: '1-2 weeks before', what: 'Tablets and kit', note: 'Malaria tablets begin, some a week ahead and some two days ahead. Collect your repellent and filter.', ink: 'inkViolet', tilt: 'tiltB' },
  { when: 'Departure', what: 'Take the paperwork', note: 'The yellow certificate goes in with your passport. Keep the card that lists what you had.', ink: 'inkGreen', tilt: 'tiltA' },
];

type Vaccine = {
  name: string;
  price: string;
  course: string;
  lasts: string;
  shape: string;
  ink: string;
  tilt: string;
};

const VACCINES: Vaccine[] = [
  { name: 'Typhoid', price: '$55', course: '1 injection', lasts: 'Covers 3 years', shape: 'round', ink: 'inkRed', tilt: 'tiltA' },
  { name: 'Hepatitis A', price: '$70 a dose', course: '2 doses, 6-12 months apart', lasts: 'Covers 25 years', shape: 'rect', ink: 'inkGreen', tilt: 'tiltC' },
  { name: 'Hepatitis B', price: '$60 a dose', course: '3 doses over 3 weeks', lasts: 'Covers life', shape: 'oval', ink: 'inkViolet', tilt: 'tiltB' },
  { name: 'Rabies', price: '$95 a dose', course: '2 doses, 7 days apart', lasts: 'Before bites, not after', shape: 'rect', ink: 'inkRed', tilt: 'tiltB' },
  { name: 'Cholera', price: '$45 a dose', course: 'A drink, 2 doses a week apart', lasts: 'Covers 2 years', shape: 'oval', ink: 'inkGreen', tilt: 'tiltA' },
  { name: 'Japanese encephalitis', price: '$110 a dose', course: '2 doses, 28 days apart', lasts: 'Covers 1-2 years', shape: 'round', ink: 'inkViolet', tilt: 'tiltC' },
];

const BRING = [
  'Your itinerary, even a rough one',
  'Any old vaccination cards or records',
  'A list of the medicines you take',
];

type Tablet = {
  name: string;
  start: string;
  take: string;
  after: string;
  cost: string;
};

const TABLETS: Tablet[] = [
  { name: 'Atovaquone-proguanil', start: '1-2 days before', take: 'One a day', after: '7 days', cost: '$48' },
  { name: 'Doxycycline', start: '1-2 days before', take: 'One a day', after: '4 weeks', cost: '$22' },
  { name: 'Mefloquine', start: '2-3 weeks before', take: 'One a week', after: '4 weeks', cost: '$36' },
];

const BITES = [
  ['Repellent', '50% DEET or 20% picaridin on every inch of skin, from dusk.'],
  ['Cover up', 'Long sleeves and trousers after sunset, when the mosquitoes that carry malaria bite.'],
  ['Sleep under a net', 'Treated with permethrin, tucked in, and checked for holes before you get in.'],
];

type Region = {
  slug: string;
  alt: string;
  denom: string;
  country: string;
  frame: string;
  name: string;
  where: string;
  jabs: string[];
  malaria: string;
  book: string;
};

const REGIONS: Region[] = [
  {
    slug: 'waypoint-travel-clinic-mountain',
    alt: 'A woodcut of a mountain peak with a hut below it',
    denom: '45c',
    country: 'High passes',
    frame: 'frameViolet',
    name: 'Mountains and high passes',
    where: 'The Andes, the Himalaya, Kilimanjaro',
    jabs: ['Hepatitis A', 'Typhoid', 'Rabies, if remote'],
    malaria: 'None above 2,500 m. Check the valleys you pass through.',
    book: '6 weeks',
  },
  {
    slug: 'waypoint-travel-clinic-pagoda',
    alt: 'A woodcut of a five-tiered pagoda among pine trees',
    denom: '60c',
    country: 'East Asia',
    frame: 'frameRed',
    name: 'East and Southeast Asia',
    where: 'Japan and Korea down to Indonesia',
    jabs: ['Hepatitis A', 'Typhoid', 'Japanese encephalitis, rural stays'],
    malaria: 'Only in some forest and border areas. We check your route.',
    book: '8 weeks',
  },
  {
    slug: 'waypoint-travel-clinic-palm',
    alt: 'A woodcut of a small island with two palm trees and waves',
    denom: '85c',
    country: 'Tropics',
    frame: 'frameGreen',
    name: 'The tropics',
    where: 'West and East Africa, the Caribbean, the Pacific',
    jabs: ['Yellow fever', 'Hepatitis A', 'Typhoid'],
    malaria: 'Yes, across most of Africa. Tablets and bite prevention.',
    book: '8 weeks',
  },
  {
    slug: 'waypoint-travel-clinic-whale',
    alt: 'A woodcut of a whale tail rising above the waves',
    denom: '1.20',
    country: 'Polar seas',
    frame: 'frameInk',
    name: 'Cruises and expeditions',
    where: 'Alaska, Svalbard, the Antarctic Peninsula',
    jabs: ['Hepatitis A', 'Flu', 'Routine boosters'],
    malaria: 'Only on shore days in the tropics on the way.',
    book: '4 weeks',
  },
];

const FEES = [
  ['Consultation, 30 minutes', '$45', 'Taken off the cost of any vaccine you have that day'],
  ['Yellow fever certificate', 'Included', 'A replacement card is $25'],
  ['Private prescription', '$30', 'For malaria tablets or altitude medicine'],
  ['Family visit', '$80', 'Consultation for up to five people travelling together'],
];

const PRICE_TABLE = [
  ['Yellow fever', '$95', '1', '$95'],
  ['Typhoid', '$55', '1', '$55'],
  ['Hepatitis A', '$70', '2', '$140'],
  ['Hepatitis B', '$60', '3', '$180'],
  ['Hepatitis A and B, combined', '$95', '3', '$285'],
  ['Rabies', '$95', '2', '$190'],
  ['Cholera', '$45', '2', '$90'],
  ['Japanese encephalitis', '$110', '2', '$220'],
  ['Tetanus, diphtheria and polio', '$40', '1', '$40'],
];

type Tag = {
  code: string;
  name: string;
  what: string;
  price: string;
};

const SHOP: Tag[] = [
  { code: 'PSD-01', name: 'Repellent, 50% DEET', what: '100 ml spray. The strength that works in the tropics.', price: '$14' },
  { code: 'PSD-02', name: 'Repellent, picaridin', what: 'Kinder to skin and to plastic, 20% in a 75 ml pump.', price: '$12' },
  { code: 'PSD-03', name: 'Filter bottle', what: 'Takes out bacteria and parasites. Fill it from any tap.', price: '$38' },
  { code: 'PSD-04', name: 'Purifying tablets', what: 'Fifty tablets, one a litre, drinkable in half an hour.', price: '$9' },
  { code: 'PSD-05', name: 'Treated bed net', what: 'Single, box shape, with the hooks and the cord.', price: '$32' },
  { code: 'PSD-06', name: 'Travel first-aid kit', what: 'Dressings, rehydration salts, sterile needles and a list.', price: '$26' },
];

const HOURS = [
  ['Monday to Friday', '8:30-18:30'],
  ['Saturday', '9:00-13:00, walk in'],
  ['Sunday', 'Closed'],
];

export default function WaypointTravelClinicPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--visa': '#efe9da',
        '--ink': '#1d2033',
        '--stampred': '#c0392b',
        '--stampgreen': '#2f7a5a',
        '--violet': '#5b4ba8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="visa,ink,stampred,stampgreen,violet"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Noticia+Text:ital,wght@0,400;0,700;1,400;1,700&family=Anonymous+Pro:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.crest} aria-hidden="true" />
          <span className={s.markText}>
            <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Waypoint</span>
            <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Travel Clinic</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Book</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
          <a data-edit="bar.book" data-edit-max="28" href="#book">Book</a>
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="wp-hero-h">
          <div data-edit-pattern="wpHero.field" data-edit-roles="transparent,1,4,3" className={s.cover} aria-hidden="true">
            <TabbiedPattern
              pattern={wander}
              palette={COVER}
              fit="grid"
              cellSize={44}
              seed="wp-cover"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.passport}>
            <div className={`${s.spread} ${s.heroSpread}`}>
              <div className={`${s.pg} ${s.dataPage}`}>
                <p data-edit="wpHero.docType" data-edit-max="240" data-edit-multiline className={s.docType}>Travel health record</p>
                <h1 data-edit="wpHero.title" data-edit-max="70" id="wp-hero-h" className={s.title}>Waypoint Travel Clinic</h1>
                <p data-edit="wpHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                  Vaccinations, malaria tablets and plain advice for wherever you
                  are going, from the nurses who have been most places first.
                  Book six to eight weeks before you fly; walk in on a Saturday.
                </p>
                <dl className={s.dataGrid}>
                  {DATA.map((d, i) => (
                    <div key={d.label} className={d.wide ? s.dataWide : undefined}>
                      <dt data-edit={`wpHero.term.${i}`} data-edit-max="28">{d.label}</dt>
                      <dd data-edit={`wpHero.body.${i}`} data-edit-max="200" data-edit-multiline>{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className={s.actions}>
                  <a data-edit="wpHero.btnSolid" data-edit-max="28" className={s.btnSolid} href="#book">Book an appointment</a>
                  <a data-edit="wpHero.btnLine" data-edit-max="28" className={s.btnLine} href="#vaccines">See the vaccines</a>
                </div>
                <div className={s.mrz} aria-hidden="true">
                  <span data-edit="wpHero.text" data-edit-max="60">{MRZ_HERO[0]}</span>
                  <span data-edit="wpHero.text2" data-edit-max="60">{MRZ_HERO[1]}</span>
                </div>
                <p data-edit="wpHero.pgNo" data-edit-max="240" data-edit-multiline className={s.pgNo}>2</p>
              </div>

              <div className={`${s.pg} ${s.stampPage}`}>
                <p className={s.visaHead}>
                  <span data-edit="wpHero.text3" data-edit-max="60">Visas</span>
                  <span data-edit="wpHero.text4" data-edit-max="60">Entries and exits</span>
                </p>
                <div className={s.heroStampWrap}>
                  <div className={s.shadowWrap}>
                    <div className={`${s.postage} ${s.frameGreen} ${s.heroPostage}`}>
                      <div className={s.postFrame}>
                        <Artwork
                          slug="waypoint-travel-clinic-mountain"
                          alt="A postage stamp: a woodcut of a mountain peak with a small hut below it"
                          inks={['color-mix(in oklab, var(--frame) 35%, var(--text))']}
                          className={s.postArt}
                        />
                        <span data-edit="wpHero.denom" data-edit-max="60" className={s.denom}>85c</span>
                        <span data-edit="wpHero.postLabel" data-edit-max="60" className={s.postLabel}>Portside post</span>
                      </div>
                    </div>
                  </div>
                  <span className={s.cancel} aria-hidden="true" />
                  <p className={s.postmark}>
                    <span data-edit="wpHero.pmTop" data-edit-max="60" className={s.pmTop}>Portside</span>
                    <span data-edit="wpHero.pmDate" data-edit-max="60" className={s.pmDate}>27 Sep 2026</span>
                    <span data-edit="wpHero.pmBottom" data-edit-max="60" className={s.pmBottom}>60 Harbour St</span>
                  </p>
                </div>
                <div className={s.heroMarks}>
                  <p className={`${s.stamp} ${s.round} ${s.inkViolet} ${s.centreStamp}`}>
                    <span data-edit="wpHero.stName" data-edit-max="60" className={s.stName}>Yellow fever</span>
                    <span data-edit="wpHero.stPrice" data-edit-max="60" className={s.stPrice}>4471</span>
                    <span data-edit="wpHero.stLasts" data-edit-max="60" className={s.stLasts}>Certified centre</span>
                  </p>
                  <p className={`${s.entry} ${s.inkRed}`}>
                    <span data-edit="wpHero.entryHead" data-edit-max="60" className={s.entryHead}>Walk in</span>
                    <span data-edit="wpHero.entryBody" data-edit-max="60" className={s.entryBody}>Saturdays 9-13</span>
                    <span data-edit="wpHero.entryFoot" data-edit-max="60" className={s.entryFoot}>No appointment</span>
                  </p>
                </div>
                <p data-edit="wpHero.pgNo2" data-edit-max="240" data-edit-multiline className={s.pgNo}>3</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- TIMING */}
        <section id="timing" className={s.sec} aria-labelledby="wp-timing-h">
          <div className={s.spread}>
            <div className={`${s.pg} ${s.pgClip}`}>
              <div data-edit-pattern="timing.field" data-edit-roles="transparent,4,3,2" className={s.rosette} aria-hidden="true">
                <TabbiedPattern
                  pattern={meridianhatch}
                  palette={ROSETTE}
                  fit="grid"
                  cellSize={40}
                  seed="wp-rosette"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="timing.pgTag" data-edit-max="240" data-edit-multiline className={s.pgTag}>Before you go</p>
              <h2 data-edit="timing.h2" data-edit-max="60" id="wp-timing-h" className={s.h2}>Book 6-8 weeks before you go</h2>
              <p data-edit="timing.body" data-edit-max="240" data-edit-multiline className={s.body}>
                Some vaccines take two or three doses, spread over weeks, and
                protection builds a fortnight after the last. Come early and the
                whole course fits before you fly.
              </p>
              <div className={s.note}>
                <p data-edit="timing.noteHead" data-edit-max="240" data-edit-multiline className={s.noteHead}>Leaving next week?</p>
                <p data-edit="timing.noteText" data-edit-max="240" data-edit-multiline className={s.noteText}>
                  Come anyway. Most single doses still help, rabies has a fast
                  schedule, and malaria tablets start only days before.
                </p>
              </div>
              <p data-edit="timing.pgNo" data-edit-max="240" data-edit-multiline className={s.pgNo}>4</p>
            </div>

            <div className={s.pg}>
              <ol className={s.timeline}>
                {TIMELINE.map((m, i) => (
                  <li key={m.when} className={s.tlRow}>
                    <p data-edit={`timing.dateStamp.${i}`} data-edit-max="240" data-edit-multiline className={`${s.dateStamp} ${s[m.ink]} ${s[m.tilt]}`}>{m.when}</p>
                    <div className={s.tlText}>
                      <h3 data-edit={`timing.tlWhat.${i}`} data-edit-max="40" className={s.tlWhat}>{m.what}</h3>
                      <p data-edit={`timing.tlNote.${i}`} data-edit-max="240" data-edit-multiline className={s.tlNote}>{m.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p data-edit="timing.pgNo2" data-edit-max="240" data-edit-multiline className={`${s.pgNo} ${s.pgNoRight}`}>5</p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- VACCINES */}
        <section id="vaccines" className={s.sec} aria-labelledby="wp-vacc-h">
          <div className={s.spread}>
            <div data-edit-pattern="vaccines.field" data-edit-roles="transparent,4,3,4" className={s.security} aria-hidden="true">
              <TabbiedPattern
                pattern={contourlines}
                palette={GUILLOCHE}
                options={{ frequency: 0.3 }}
                fit="grid"
                cellSize={48}
                seed="wp-guilloche"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div className={s.pg}>
              <p data-edit="vaccines.pgTag" data-edit-max="240" data-edit-multiline className={s.pgTag}>Vaccines</p>
              <h2 data-edit="vaccines.h2" data-edit-max="60" id="wp-vacc-h" className={s.h2}>A stamp for every jab</h2>
              <p data-edit="vaccines.body" data-edit-max="240" data-edit-multiline className={s.body}>
                What you need depends on where, for how long and how you travel.
                These are the ones we give most, at the price on the stamp.
                Every course is entered in your record the day you have it.
              </p>
              <ul className={s.bring}>
                {BRING.map((b, i) => (
                  <li data-edit={`vaccines.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
              <div className={s.yfWrap}>
                <div className={`${s.stamp} ${s.yf} ${s.inkRed}`}>
                  <p data-edit="vaccines.yfHead" data-edit-max="240" data-edit-multiline className={s.yfHead}>International certificate of vaccination</p>
                  <p data-edit="vaccines.stName" data-edit-max="240" data-edit-multiline className={s.stName}>Yellow fever</p>
                  <p data-edit="vaccines.stPrice" data-edit-max="240" data-edit-multiline className={s.stPrice}>$95</p>
                  <p data-edit="vaccines.stCourse" data-edit-max="240" data-edit-multiline className={s.stCourse}>1 dose, for life</p>
                  <p data-edit="vaccines.yfFoot" data-edit-max="240" data-edit-multiline className={s.yfFoot}>Designated centre no. 4471, Portside</p>
                </div>
              </div>
              <p data-edit="vaccines.pgNo" data-edit-max="240" data-edit-multiline className={s.pgNo}>6</p>
            </div>

            <div className={s.pg}>
              <ul className={s.stamps}>
                {VACCINES.map((v, i) => (
                  <li key={v.name} className={s.stampCell}>
                    <div className={`${s.stamp} ${s[v.shape]} ${s[v.ink]} ${s[v.tilt]}`}>
                      <p data-edit={`vaccines.stName2.${i}`} data-edit-max="240" data-edit-multiline className={s.stName}>{v.name}</p>
                      <p data-edit={`vaccines.stPrice2.${i}`} data-edit-max="240" data-edit-multiline className={s.stPrice}>{v.price}</p>
                      <p data-edit={`vaccines.stCourse2.${i}`} data-edit-max="240" data-edit-multiline className={s.stCourse}>{v.course}</p>
                      <p data-edit={`vaccines.stLasts.${i}`} data-edit-max="240" data-edit-multiline className={s.stLasts}>{v.lasts}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p data-edit="vaccines.pgNo2" data-edit-max="240" data-edit-multiline className={`${s.pgNo} ${s.pgNoRight}`}>7</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- MALARIA */}
        <section id="malaria" className={s.sec} aria-labelledby="wp-mal-h">
          <div className={s.spread}>
            <div className={s.pg}>
              <p data-edit="malaria.pgTag" data-edit-max="240" data-edit-multiline className={s.pgTag}>Malaria</p>
              <h2 data-edit="malaria.h2" data-edit-max="60" id="wp-mal-h" className={s.h2}>Malaria tablets</h2>
              <p data-edit="malaria.body" data-edit-max="240" data-edit-multiline className={s.body}>
                No tablet is perfect, so the first line of defence is not being
                bitten. The second is taking the tablets every day, including
                the dull days after you get home.
              </p>
              <dl className={s.bites}>
                {BITES.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`malaria.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`malaria.body2.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="malaria.pgNo" data-edit-max="240" data-edit-multiline className={s.pgNo}>8</p>
            </div>

            <div className={s.pg}>
              <div className={s.tableWrap}>
                <table className={s.tablets}>
                  <caption data-edit="malaria.tableCap" className={s.tableCap}>Three tablets, chosen for your route and your health</caption>
                  <thead>
                    <tr>
                      <th data-edit="malaria.heading" scope="col">Tablet</th>
                      <th data-edit="malaria.heading2" scope="col">Start</th>
                      <th data-edit="malaria.heading3" scope="col">Take</th>
                      <th data-edit="malaria.heading4" scope="col">After you leave</th>
                      <th data-edit="malaria.heading5" scope="col">Two weeks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLETS.map((t, i) => (
                      <tr key={t.name}>
                        <th data-edit={`malaria.heading6.${i}`} scope="row">{t.name}</th>
                        <td data-edit={`malaria.cell.${i}`}>{t.start}</td>
                        <td data-edit={`malaria.cell2.${i}`}>{t.take}</td>
                        <td data-edit={`malaria.cell3.${i}`}>{t.after}</td>
                        <td data-edit={`malaria.num.${i}`} className={s.num}>{t.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`${s.stamp} ${s.rxStamp} ${s.inkViolet}`}>
                <span data-edit="malaria.rxTop" data-edit-max="60" className={s.rxTop}>Prescription issued here</span>
                <span data-edit="malaria.rxBig" data-edit-max="60" className={s.rxBig}>$30</span>
                <span data-edit="malaria.rxFoot" data-edit-max="60" className={s.rxFoot}>Collect from any pharmacy</span>
              </p>
              <p data-edit="malaria.small" data-edit-max="240" data-edit-multiline className={s.small}>
                Prices are for a two-week trip from the pharmacy downstairs.
                Longer trips cost more; we write the exact number of tablets.
              </p>
              <p data-edit="malaria.pgNo2" data-edit-max="240" data-edit-multiline className={`${s.pgNo} ${s.pgNoRight}`}>9</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- DESTINATIONS */}
        <section id="destinations" className={s.sec} aria-labelledby="wp-dest-h">
          <div className={`${s.spread} ${s.destSpread}`}>
            <div data-edit-pattern="destinations.field" data-edit-roles="transparent,4,3,2" className={s.security} aria-hidden="true">
              <TabbiedPattern
                pattern={truchetrings}
                palette={RINGS}
                fit="grid"
                cellSize={40}
                seed="wp-rings"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div className={s.destHead}>
              <p data-edit="destinations.pgTag" data-edit-max="240" data-edit-multiline className={s.pgTag}>Destinations</p>
              <h2 data-edit="destinations.h2" data-edit-max="60" id="wp-dest-h" className={s.h2}>Where are you going?</h2>
              <p data-edit="destinations.body" data-edit-max="240" data-edit-multiline className={s.body}>
                A first guide by region. Your own plan depends on the exact
                route, the season and what you will be doing there.
              </p>
            </div>

            <ul className={s.regions}>
              {REGIONS.map((r, i) => (
                <li key={r.slug} className={s.region}>
                  <div className={s.shadowWrap}>
                    <div className={`${s.postage} ${s[r.frame]}`}>
                      <div className={s.postFrame}>
                        <Artwork
                          slug={r.slug}
                          alt={r.alt}
                          inks={['color-mix(in oklab, var(--frame) 35%, var(--text))']}
                          className={s.postArt}
                        />
                        <span data-edit={`destinations.denom.${i}`} data-edit-max="60" className={s.denom}>{r.denom}</span>
                        <span data-edit={`destinations.postLabel.${i}`} data-edit-max="60" className={s.postLabel}>{r.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className={s.regionText}>
                    <h3 data-edit={`destinations.regionName.${i}`} data-edit-max="40" className={s.regionName}>{r.name}</h3>
                    <p data-edit={`destinations.regionWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.regionWhere}>{r.where}</p>
                    <p data-edit={`destinations.regionLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.regionLabel}>Usually recommended</p>
                    <ul className={s.jabs}>
                      {r.jabs.map((j, i2) => (
                        <li data-edit={`destinations.item.${i}.${i2}`} data-edit-max="80" key={j}>{j}</li>
                      ))}
                    </ul>
                    <dl className={s.regionMeta}>
                      <div>
                        <dt data-edit={`destinations.term.${i}`} data-edit-max="28">Malaria</dt>
                        <dd data-edit={`destinations.body2.${i}`} data-edit-max="200" data-edit-multiline>{r.malaria}</dd>
                      </div>
                      <div>
                        <dt data-edit={`destinations.term2.${i}`} data-edit-max="28">Book by</dt>
                        <dd data-edit={`destinations.body3.${i}`} data-edit-max="200" data-edit-multiline>{r.book}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
            <p data-edit="destinations.pgNo" data-edit-max="240" data-edit-multiline className={s.pgNo}>10</p>
            <p data-edit="destinations.pgNo2" data-edit-max="240" data-edit-multiline className={`${s.pgNo} ${s.pgNoRight}`}>11</p>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="wp-prices-h">
          <div className={s.spread}>
            <div className={s.pg}>
              <p data-edit="prices.pgTag" data-edit-max="240" data-edit-multiline className={s.pgTag}>Observations</p>
              <h2 data-edit="prices.h2" data-edit-max="60" id="wp-prices-h" className={s.h2}>Prices, all of them</h2>
              <p data-edit="prices.body" data-edit-max="240" data-edit-multiline className={s.body}>
                What you see is what you pay. Card or cash, and a receipt your
                insurer or employer will accept.
              </p>
              <dl className={s.fees}>
                {FEES.map(([what, price, note], i) => (
                  <div key={what}>
                    <dt data-edit={`prices.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`prices.feePrice.${i}`} data-edit-max="200" data-edit-multiline className={s.feePrice}>{price}</dd>
                    <dd data-edit={`prices.feeNote.${i}`} data-edit-max="200" data-edit-multiline className={s.feeNote}>{note}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="prices.pgNo" data-edit-max="240" data-edit-multiline className={s.pgNo}>12</p>
            </div>

            <div className={s.pg}>
              <div className={s.tableWrap}>
                <table className={s.priceTable}>
                  <caption data-edit="prices.tableCap" className={s.tableCap}>Vaccines, by the dose and by the course</caption>
                  <thead>
                    <tr>
                      <th data-edit="prices.heading" scope="col">Vaccine</th>
                      <th data-edit="prices.num" scope="col" className={s.num}>A dose</th>
                      <th data-edit="prices.num2" scope="col" className={s.num}>Doses</th>
                      <th data-edit="prices.num3" scope="col" className={s.num}>Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRICE_TABLE.map(([name, dose, count, course], i) => (
                      <tr key={name}>
                        <th data-edit={`prices.heading2.${i}`} scope="row">{name}</th>
                        <td data-edit={`prices.num4.${i}`} className={s.num}>{dose}</td>
                        <td data-edit={`prices.num5.${i}`} className={s.num}>{count}</td>
                        <td data-edit={`prices.num6.${i}`} className={s.num}>{course}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p data-edit="prices.small" data-edit-max="240" data-edit-multiline className={s.small}>Ten per cent off a family&apos;s courses when three or more of you come together.</p>
              <p data-edit="prices.pgNo2" data-edit-max="240" data-edit-multiline className={`${s.pgNo} ${s.pgNoRight}`}>13</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ SHOP */}
        <section id="shop" className={s.shopSec} aria-labelledby="wp-shop-h">
          <div className={s.shopHead}>
            <p data-edit="shop.pgTag" data-edit-max="240" data-edit-multiline className={s.pgTag}>Travel health shop</p>
            <h2 data-edit="shop.h2" data-edit-max="60" id="wp-shop-h" className={s.h2}>Packed and tagged</h2>
            <p data-edit="shop.body" data-edit-max="240" data-edit-multiline className={s.body}>
              The things we tell everyone to take, on the counter by the
              waiting room. No appointment needed to buy.
            </p>
          </div>
          <ul className={s.tags}>
            {SHOP.map((t, i) => (
              <li key={t.code} className={s.tagItem}>
                <div className={s.tag}>
                  <p data-edit={`shop.tagCode.${i}`} data-edit-max="240" data-edit-multiline className={s.tagCode}>{t.code}</p>
                  <h3 data-edit={`shop.tagName.${i}`} data-edit-max="40" className={s.tagName}>{t.name}</h3>
                  <p data-edit={`shop.tagWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.tagWhat}>{t.what}</p>
                  <p data-edit={`shop.tagPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.tagPrice}>{t.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="wp-book-h">
          <form className={s.pass} action="#">
            <div className={s.passMain}>
              <p className={s.passBand}>
                <span data-edit="book.text" data-edit-max="60">Boarding pass</span>
                <span data-edit="book.text2" data-edit-max="60">Waypoint Travel Clinic</span>
              </p>
              <div className={s.passBody}>
                <h2 data-edit="book.passTitle" data-edit-max="60" id="wp-book-h" className={s.passTitle}>Book your appointment</h2>
                <div className={s.route}>
                  <p className={s.routeFrom}>
                    <span data-edit="book.routeCode" data-edit-max="60" className={s.routeCode}>PSD</span>
                    <span data-edit="book.routeName" data-edit-max="60" className={s.routeName}>Portside, 2nd floor</span>
                  </p>
                  <span className={s.routeLine} aria-hidden="true" />
                  <div className={`${s.field} ${s.routeTo}`}>
                    <label data-edit="book.label" htmlFor="wp-dest">Destination</label>
                    <input id="wp-dest" name="destination" type="text" placeholder="Where to" />
                  </div>
                </div>
                <div className={s.passGrid}>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label data-edit="book.label2" htmlFor="wp-name">Passenger</label>
                    <input id="wp-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label3" htmlFor="wp-depart">Departure date</label>
                    <input id="wp-depart" name="departure" type="date" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label4" htmlFor="wp-email">Email</label>
                    <input id="wp-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label5" htmlFor="wp-phone">Phone</label>
                    <input id="wp-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label6" htmlFor="wp-party">Travellers</label>
                    <select id="wp-party" name="party" defaultValue="1">
                      <option value="1">1 adult</option>
                      <option value="2">2 adults</option>
                      <option value="family">A family</option>
                      <option value="group">A group, 6 or more</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label7" htmlFor="wp-slot">Preferred time</label>
                    <select id="wp-slot" name="slot" defaultValue="morning">
                      <option value="morning">Weekday morning</option>
                      <option value="afternoon">Weekday afternoon</option>
                      <option value="evening">After 17:00</option>
                      <option value="saturday">Saturday</option>
                    </select>
                  </div>
                  <div className={s.submitCell}>
                    <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request boarding</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={s.stub}>
              <div data-edit-pattern="book.field" data-edit-roles="transparent,4,3,4,0,2" className={s.stubRulings} aria-hidden="true">
                <TabbiedPattern
                  pattern={moire}
                  palette={RULINGS}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={32}
                  seed="wp-rulings"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <dl className={s.stubData}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Gate</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>2F, 60 Harbour Street</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Desk</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>(555) 015-3380</dd>
                </div>
              </dl>
              <p className={s.stubMail}>
                <a data-edit="book.link" data-edit-max="28" href="mailto:desk@waypointclinic.example">desk@waypointclinic.example</a>
              </p>
              <span className={s.barcode} aria-hidden="true" />
              <p data-edit="book.stubNote" data-edit-max="240" data-edit-multiline className={s.stubNote}>We reply within one working day. Boarding closes 15 minutes before your time.</p>
            </div>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,4,2" className={s.backCover} aria-hidden="true">
          <TabbiedPattern
            pattern={wander}
            palette={BACK}
            options={{ frequency: 0.8 }}
            fit="grid"
            cellSize={36}
            seed="wp-back"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Waypoint Travel Clinic</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional travel clinic. The nurses, prices, certificate number and advice are invented; ask a real clinic before you travel.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The stamps are generated images, drawn in the page&apos;s own colors.</p>
          <div className={s.footMrz} aria-hidden="true">
            <span data-edit="footer.text" data-edit-max="60">{MRZ_FOOT[0]}</span>
            <span data-edit="footer.text2" data-edit-max="60">{MRZ_FOOT[1]}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
