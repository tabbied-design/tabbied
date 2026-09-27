import { TabbiedPattern } from 'tabbied/react';
import { ovolo, picket, roundpair, quartercirclequilt, guernsey } from 'tabbied/patterns';
import s from './longmeadow-equine.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Longmeadow Equine Veterinary: Horse vets at Longmeadow Farm, Westcote',
  description:
    'An equine veterinary practice on Stanbury Road, Westcote: 24-hour emergencies, lameness work, dentistry, vettings and stud work, yard visits by zone and monthly health plans.',
};

/* Site colors: the show secretary's ribbon box. Green for the stable yard,
   blue, red and gold for the rosettes, on a meadow cream ground. */
const MEADOW = '#f2eddf';
const GREEN = '#1e4431';
const BLUE = '#2f5aa8';
const RED = '#c23a36';
const GOLD = '#d7a93e';

/* Quarter-round moldings: the carved stable-block trim behind the portrait. */
const MOLDING = ['transparent', GREEN, BLUE, GOLD, GREEN, RED];
/* The post-and-rail fence along the bottom of the emergencies board. */
const FENCE = ['transparent', MEADOW, GOLD, MEADOW, BLUE];
/* Paired rounds for the ring map. */
const RINGS = ['transparent', GREEN, GOLD, BLUE];
/* The patchwork of the schedule's cover. */
const QUILT = [GREEN, BLUE, GOLD, RED, MEADOW, GREEN];
/* A strip of moldings under the plans. */
const TRIM = [GREEN, GOLD, MEADOW, BLUE, RED, GOLD];
/* The knitted stable-rug border along the foot of the page. */
const RUG = ['transparent', GOLD, MEADOW, RED, BLUE];

const NAV = [
  ['Emergencies', '#emergencies'],
  ['Services', '#services'],
  ['The clinic', '#clinic'],
  ['Yard visits', '#visits'],
  ['Health plans', '#plans'],
  ['The vets', '#vets'],
  ['Register', '#register'],
];

const HERO_FACTS = [
  ['Horses on our books', '1,140'],
  ['A vet on call', '24 h'],
  ['Founded', '1987'],
];

const CALL_NOW = [
  'Colic: pawing, rolling, looking round at the flank, no droppings',
  'Choke: feed or saliva running from the nostrils, a stretched neck',
  'Any wound near a joint or a tendon sheath, however small it looks',
  'A horse that will not put weight on a leg',
  'A foaling that has not moved on 20 minutes after the waters break',
  'An eye that is shut, cloudy or weeping',
];

type Service = {
  n: string;
  name: string;
  body: string;
  price: string;
  per: string;
  tone: 'blue' | 'red' | 'gold' | 'green';
};

const SERVICES: Service[] = [
  {
    n: 'Class 1',
    name: 'Lameness investigations',
    body: 'Trot-ups on the hard standing and the lunge circle, flexion tests and nerve blocks, then x-ray or ultrasound the same day.',
    price: '$185',
    per: 'work-up',
    tone: 'blue',
  },
  {
    n: 'Class 2',
    name: 'Dentistry',
    body: 'A full-mouth exam with a speculum and a light, motorised rasp and hand floats, sedation if it helps. Once a year, twice for the old ones.',
    price: '$75',
    per: 'a mouth',
    tone: 'red',
  },
  {
    n: 'Class 3',
    name: 'Vaccinations and passports',
    body: 'Flu and tetanus to competition rules, the passport signed and stamped on the day. Microchips and first passports for foals.',
    price: '$58',
    per: 'a visit',
    tone: 'gold',
  },
  {
    n: 'Class 4',
    name: 'Pre-purchase exams',
    body: 'The five-stage vetting, done for the buyer and nobody else, with a blood sample held for six months and x-rays on request.',
    price: '$320',
    per: 'from',
    tone: 'green',
  },
  {
    n: 'Class 5',
    name: 'Stud work',
    body: 'Scanning mares for ovulation and pregnancy, insemination with chilled or frozen semen, and a foal check at twelve hours old.',
    price: '$65',
    per: 'a scan',
    tone: 'blue',
  },
  {
    n: 'Class 6',
    name: 'Farriery liaison',
    body: 'Remedial shoeing planned with your farrier: x-rays at the forge, shared notes, and a joint visit when a foot needs two heads.',
    price: '$45',
    per: 'joint visit',
    tone: 'red',
  },
];

type Stall = {
  board: string;
  body: string;
  facts: string[];
};

const STALLS: Stall[] = [
  {
    board: 'The stocks',
    body: 'Padded steel stocks in a quiet room with a rubber floor, for standing surgery, dentistry, scoping and the horse who will not stand for anything else.',
    facts: ['Rubber floor, heated', 'Overhead hoist'],
  },
  {
    board: 'Digital x-ray',
    body: 'A fixed room here and a portable plate we carry to the yard. The pictures are on your phone before the horse is back in the lorry.',
    facts: ['Results in minutes', 'Sent to your farrier'],
  },
  {
    board: 'Ultrasound',
    body: 'Tendons, ligaments, chests and bellies, and pregnancy scanning from day 14, with a second probe kept for the stud work.',
    facts: ['Two machines', 'Scans at the yard too'],
  },
  {
    board: 'A box for two',
    body: 'Our hospital box is double width, so a companion can come in too. Most horses eat, drink and settle better with a friend at the rail.',
    facts: ['Companions stay free', 'Webcam for owners'],
  },
];

const CLINIC_FACTS = [
  ['4', 'hospital boxes, deep straw or shavings'],
  ['1', 'isolation box with its own drain and yard'],
  ['2', 'lorry bays with a ramp and a wash-down'],
  ['1.5 ha', 'of turnout for horses on box rest'],
];

type Zone = {
  zone: string;
  reach: string;
  places: string;
  fee: string;
};

const ZONES: Zone[] = [
  { zone: 'A', reach: 'Up to 8 km', places: 'Westcote, Stanbury, Fallowfield, Mill End', fee: '$28' },
  { zone: 'B', reach: '8-16 km', places: 'Hartsey, Upper Rill, Coldharbour, Sedge Green', fee: '$42' },
  { zone: 'C', reach: '16-25 km', places: 'Brackenmoor, Ashby Wold, Kettle Cross', fee: '$60' },
  { zone: 'D', reach: 'Beyond 25 km', places: 'By arrangement, on a shared round', fee: 'Ask' },
];

const VISIT_RULES = [
  ['Share the fee', 'Two or more owners at one yard on one visit split a single zone fee between them.'],
  ['Round days', 'Zone B on Tuesdays and Zone C on Thursdays. Book by 17:00 the day before and pay the Zone A fee.'],
  ['Out of hours', 'A call-out between 18:00 and 08:00, or on a Sunday, adds $140 to the zone fee.'],
];

type Plan = {
  name: string;
  price: string;
  who: string;
  gets: string[];
  tone: 'blue' | 'red' | 'gold';
  count: string;
};

const PLANS: Plan[] = [
  {
    name: 'Pony plan',
    price: '$19',
    who: 'For ponies, donkeys and retired horses who mostly need keeping an eye on.',
    gets: ['Annual flu and tetanus', 'One dental a year', 'Four worm egg counts', '10% off medicines'],
    tone: 'gold',
    count: '212 horses on it',
  },
  {
    name: 'Leisure plan',
    price: '$29',
    who: 'For the hack, the happy hacker and the horse that does a bit of everything.',
    gets: ['Everything in the pony plan', 'A spring health check and body score', 'One zone fee a year waived', 'Passport kept up to date'],
    tone: 'blue',
    count: '486 horses on it',
  },
  {
    name: 'Competition plan',
    price: '$44',
    who: 'For horses out most weekends, where a missed vaccination means a missed class.',
    gets: ['Everything in the leisure plan', 'A pre-season lameness check', 'Two zone fees a year waived', '15% off medicines'],
    tone: 'red',
    count: '173 horses on it',
  },
];

type Class = {
  n: string;
  day: string;
  time: string;
  name: string;
  ring: string;
  vet: string;
};

const SCHEDULE: Class[] = [
  { n: '1', day: 'Monday', time: '08:00-12:00', name: 'Lameness clinic', ring: 'Ring: Hard standing and stocks', vet: 'Harriet Fenn' },
  { n: '2', day: 'Monday', time: '14:00-17:30', name: 'Dental clinic', ring: 'Ring: The stocks', vet: 'Owen Castell' },
  { n: '3', day: 'Tuesday', time: 'All day', name: 'Zone B yard round', ring: 'Ring: Hartsey to Sedge Green', vet: 'Tom Aldous' },
  { n: '4', day: 'Wednesday', time: '09:00-12:00', name: 'Vaccinations, drop in with passports', ring: 'Ring: Lorry bays', vet: 'Nell Brampton' },
  { n: '5', day: 'Wednesday', time: '14:00-17:00', name: 'Stud: mare scanning', ring: 'Ring: Scanning room', vet: 'Priya Lomax' },
  { n: '6', day: 'Thursday', time: 'All day', name: 'Zone C yard round', ring: 'Ring: Brackenmoor and the Wold', vet: 'Owen Castell' },
  { n: '7', day: 'Friday', time: '09:00-13:00', name: 'Pre-purchase vettings', ring: 'Ring: Hard standing', vet: 'Harriet Fenn' },
  { n: '8', day: 'Friday', time: '15:00-17:00', name: 'Farriery liaison', ring: 'Ring: At the forge, Mill End', vet: 'Tom Aldous' },
  { n: '9', day: 'Saturday', time: '08:30-12:30', name: 'Clinic open, then emergencies only', ring: 'Ring: Reception', vet: 'On rota' },
];

type Vet = {
  plate: string;
  name: string;
  role: string;
  focus: string;
  own: string;
  tone: 'blue' | 'red' | 'gold' | 'green';
};

const VETS: Vet[] = [
  {
    plate: 'HF',
    name: 'Harriet Fenn',
    role: 'Partner, qualified 2004',
    focus: 'Lameness and sports medicine. Rides out on a Tuesday before the round.',
    own: 'Her own: Pip, a grey Connemara, 16',
    tone: 'blue',
  },
  {
    plate: 'OC',
    name: 'Owen Castell',
    role: 'Partner, qualified 1998',
    focus: 'Dentistry and the old horses, and the one to ask about laminitis.',
    own: 'His own: two donkeys, Moss and Hazel',
    tone: 'red',
  },
  {
    plate: 'PL',
    name: 'Priya Lomax',
    role: 'Vet, qualified 2012',
    focus: 'Stud work, foals and the long nights of the breeding season.',
    own: 'Her own: Juno, a Welsh Section D mare',
    tone: 'gold',
  },
  {
    plate: 'TA',
    name: 'Tom Aldous',
    role: 'Vet, qualified 2016',
    focus: 'Surgery in the stocks, wounds, and the x-ray plate at the forge.',
    own: 'His own: a borrowed cob called Frank',
    tone: 'green',
  },
];

const HOURS = [
  ['Monday to Friday', '08:00-18:00'],
  ['Saturday', '08:30-12:30'],
  ['Sunday', 'Emergencies only'],
  ['Emergency line', 'Every hour of every day'],
];

export default function LongmeadowEquinePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--meadow': '#f2eddf',
        '--green': '#1e4431',
        '--blue': '#2f5aa8',
        '--red': '#c23a36',
        '--gold': '#d7a93e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="meadow,green,blue,red,gold"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&family=Crimson+Pro:ital,wght@0,400..700;1,400..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork slug="longmeadow-equine-horseshoe" alt="" inks={['var(--accent-ink)']} className={s.markShoe} />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Longmeadow</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCall} href="tel:+15550143399">
          <span data-edit="bar.barCallLabel" data-edit-max="60" className={s.barCallLabel}>Emergencies</span>
          <span data-edit="bar.barCallNum" data-edit-max="60" className={s.barCallNum}>(555) 014-3399</span>
        </a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The champion's portrait, pinned in the middle of a rosette on a
            wall of carved quarter-round trim. */}
        <section className={s.hero} aria-labelledby="lm-hero-h">
          <div className={s.heroText}>
            <p data-edit="lmHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Equine veterinary practice, Westcote</p>
            <h1 data-edit="lmHero.title" data-edit-format="emphasis" data-edit-max="70" id="lm-hero-h" className={s.name}>Longmeadow <em>Equine Veterinary</em></h1>
            <p data-edit="lmHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Five vets and a clinic in the old dairy at Longmeadow Farm. We
              see horses, ponies and donkeys at home within 25 km of Westcote,
              and here in the stocks, the x-ray room and the hospital boxes.
            </p>
            <div className={s.heroActions}>
              <a data-edit="lmHero.btn" data-edit-max="28" className={s.btn} href="#register">Register your horse</a>
              <a data-edit="lmHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#visits">Book a yard visit</a>
            </div>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([label, value], i) => (
                <div key={label}>
                  <dt data-edit={`lmHero.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`lmHero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.heroArt}>
            <div data-edit-pattern="lmHero.field" data-edit-roles="transparent,1,2,4,1,3" className={s.molding} aria-hidden="true">
              <TabbiedPattern
                pattern={ovolo}
                palette={MOLDING}
                options={{ frequency: 0.8 }}
                fit="grid"
                cellSize={56}
                seed="longmeadow-molding"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <figure className={`${s.rosette} ${s.heroRosette}`}>
              <span className={s.roTail} aria-hidden="true" />
              <span className={s.roTail} aria-hidden="true" />
              <span className={s.roRing} aria-hidden="true" />
              <span className={s.roInner} aria-hidden="true" />
              <span className={s.roDisc}>
                <span className={s.portrait}>
                  <Artwork
                    slug="longmeadow-equine-horse"
                    alt="Portrait of a bay horse with a white blaze, wearing a leather bridle"
                    inks={['var(--text)', 'var(--portrait-light)']}
                    className={s.horse}
                  />
                </span>
              </span>
              <figcaption className={s.heroCaption}>
                <span data-edit="lmHero.capKicker" data-edit-max="60" className={s.capKicker}>Champion patient</span>
                <span data-edit="lmHero.capName" data-edit-max="60" className={s.capName}>Bramley, 19, bay gelding, on our books since 2008</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ----------------------------------------------------- EMERGENCIES */}
        <section id="emergencies" className={s.emergency} aria-labelledby="lm-em-h">
          <div className={s.emInner}>
            <div className={`${s.rosette} ${s.roRed} ${s.emRosette}`}>
              <span className={s.roTail} aria-hidden="true" />
              <span className={s.roTail} aria-hidden="true" />
              <span className={s.roRing} aria-hidden="true" />
              <span className={s.roInner} aria-hidden="true" />
              <span className={s.roDisc}>
                <span className={s.emDisc}>
                  <span data-edit="emergencies.emHours" data-edit-max="60" className={s.emHours}>24 hours</span>
                  <a data-edit="emergencies.emNum" data-edit-max="28" className={s.emNum} href="tel:+15550143399">(555) 014-3399</a>
                  <span data-edit="emergencies.emEvery" data-edit-max="60" className={s.emEvery}>every day of the year</span>
                </span>
              </span>
            </div>

            <div className={s.emText}>
              <p data-edit="emergencies.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>Class 01</p>
              <h2 data-edit="emergencies.board" data-edit-max="60" id="lm-em-h" className={s.board}>Emergencies</h2>
              <p data-edit="emergencies.emLede" data-edit-max="240" data-edit-multiline className={s.emLede}>
                One number reaches the vet on call, not a switchboard. If they
                are already with a horse, leave your name and your yard and
                they ring back inside ten minutes.
              </p>
              <h3 data-edit="emergencies.emListTitle" data-edit-max="40" className={s.emListTitle}>Ring straight away for</h3>
              <ul className={s.shoeList}>
                {CALL_NOW.map((item, i) => (
                  <li key={item}>
                    <Artwork slug="longmeadow-equine-horseshoe" alt="" inks={['var(--shoe-on-green)']} className={s.shoe} />
                    <span data-edit={`emergencies.text.${i}`} data-edit-max="60">{item}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="emergencies.emNote" data-edit-max="240" data-edit-multiline className={s.emNote}>
                While you wait: keep the horse where it is if it cannot walk,
                take away the feed, and have a head collar and a torch ready.
              </p>
            </div>
          </div>
          <div data-edit-pattern="emergencies.field" data-edit-roles="transparent,0,4,0,2" className={s.fence} aria-hidden="true">
            <TabbiedPattern
              pattern={picket}
              palette={FENCE}
              fit="grid"
              cellSize={34}
              seed="longmeadow-fence"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES */}
        <section id="services" className={s.sec} aria-labelledby="lm-services-h">
          <div className={s.secHead}>
            <p data-edit="services.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>Class 02</p>
            <h2 data-edit="services.board" data-edit-max="60" id="lm-services-h" className={s.board}>Services</h2>
            <p data-edit="services.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Six things we do every week, at the clinic or in your yard. Each
              price is what most visits cost; the zone fee for a yard visit is
              on top.
            </p>
          </div>
          <ul className={s.services}>
            {SERVICES.map((sv, i) => (
              <li key={sv.n} className={s.service}>
                <p data-edit={`services.serviceClass.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceClass}>{sv.n}</p>
                <h3 data-edit={`services.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{sv.name}</h3>
                <p data-edit={`services.serviceBody.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceBody}>{sv.body}</p>
                <div className={`${s.rosette} ${s.roSmall} ${s[`ro_${sv.tone}`]}`}>
                  <span className={s.roTail} aria-hidden="true" />
                  <span className={s.roTail} aria-hidden="true" />
                  <span className={s.roRing} aria-hidden="true" />
                  <span className={s.roInner} aria-hidden="true" />
                  <span className={s.roDisc}>
                    <span className={s.priceTag}>
                      <span data-edit={`services.pricePer.${i}`} data-edit-max="60" className={s.pricePer}>{sv.per}</span>
                      <strong data-edit={`services.priceNum.${i}`} className={s.priceNum}>{sv.price}</strong>
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- CLINIC
            Four stable doors along the yard, each with its painted board. */}
        <section id="clinic" className={`${s.sec} ${s.clinic}`} aria-labelledby="lm-clinic-h">
          <div className={s.secHead}>
            <p data-edit="clinic.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>Class 03</p>
            <h2 data-edit="clinic.board" data-edit-max="60" id="lm-clinic-h" className={s.board}>The clinic</h2>
            <p data-edit="clinic.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The old dairy at Longmeadow, rebuilt in 2019 round a cobbled yard.
              Drive in off Stanbury Road; there is room to turn a 7.5 tonne
              lorry and a ramp for the ones who will not back out.
            </p>
          </div>
          <ul className={s.yard}>
            {STALLS.map((st, i) => (
              <li key={st.board} className={s.stall}>
                <h3 data-edit={`clinic.stallBoard.${i}`} data-edit-max="40" className={s.stallBoard}>{st.board}</h3>
                <div className={s.door}>
                  <div className={s.doorTop}>
                    <p data-edit={`clinic.doorText.${i}`} data-edit-max="240" data-edit-multiline className={s.doorText}>{st.body}</p>
                  </div>
                  <div className={s.doorBottom} aria-hidden="true">
                    <span className={s.bolt} />
                  </div>
                </div>
                <ul className={s.stallFacts}>
                  {st.facts.map((f, i2) => (
                    <li data-edit={`clinic.item.${i}.${i2}`} data-edit-max="80" key={f}>{f}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <dl className={s.clinicFacts}>
            {CLINIC_FACTS.map(([n, what], i) => (
              <div key={what}>
                <dt data-edit={`clinic.term.${i}`} data-edit-max="28">{n}</dt>
                <dd data-edit={`clinic.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------------- VISITS */}
        <section id="visits" className={`${s.sec} ${s.visits}`} aria-labelledby="lm-visits-h">
          <div className={s.secHead}>
            <p data-edit="visits.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>Class 04</p>
            <h2 data-edit="visits.board" data-edit-max="60" id="lm-visits-h" className={s.board}>Yard visits</h2>
            <p data-edit="visits.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Most of our work is in your yard. The fee for getting there
              depends on how far you are from Longmeadow, measured by road.
            </p>
          </div>

          <div className={s.visitGrid}>
            <div className={s.ringMap}>
              <div data-edit-pattern="visits.field" data-edit-roles="transparent,1,4,2" className={s.ringField} aria-hidden="true">
                <TabbiedPattern
                  pattern={roundpair}
                  palette={RINGS}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={34}
                  seed="longmeadow-rings"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.rings} aria-hidden="true">
                <span className={s.ringC}><span data-edit="visits.ringLabel" data-edit-max="60" className={s.ringLabel}>C</span></span>
                <span className={s.ringB}><span data-edit="visits.ringLabel2" data-edit-max="60" className={s.ringLabel}>B</span></span>
                <span className={s.ringA}><span data-edit="visits.ringLabel3" data-edit-max="60" className={s.ringLabel}>A</span></span>
                <span className={s.ringHome}>
                  <Artwork slug="longmeadow-equine-horseshoe" alt="" inks={['var(--on-green)']} className={s.ringShoe} />
                </span>
              </div>
              <p data-edit="visits.ringNote" data-edit-max="240" data-edit-multiline className={s.ringNote}>Longmeadow at the middle; rings at 8, 16 and 25 km by road.</p>
            </div>

            <div className={s.zoneWrap}>
              <table className={s.zones}>
                <caption data-edit="visits.srOnly" className={s.srOnly}>Call-out zones: distance from Longmeadow, places in each and the fee</caption>
                <thead>
                  <tr>
                    <th data-edit="visits.heading" scope="col">Zone</th>
                    <th data-edit="visits.heading2" scope="col">Distance</th>
                    <th data-edit="visits.colPlaces" scope="col" className={s.colPlaces}>Includes</th>
                    <th data-edit="visits.num" scope="col" className={s.num}>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {ZONES.map((z, i) => (
                    <tr key={z.zone}>
                      <th scope="row"><span data-edit={`visits.zoneChip.${i}`} data-edit-max="60" className={s.zoneChip}>{z.zone}</span></th>
                      <td data-edit={`visits.cell.${i}`}>{z.reach}</td>
                      <td data-edit={`visits.colPlaces2.${i}`} className={s.colPlaces}>{z.places}</td>
                      <td data-edit={`visits.num2.${i}`} className={s.num}>{z.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dl className={s.visitRules}>
                {VISIT_RULES.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`visits.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`visits.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- PLANS */}
        <section id="plans" className={`${s.sec} ${s.plans}`} aria-labelledby="lm-plans-h">
          <div className={s.secHead}>
            <p data-edit="plans.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>Class 05</p>
            <h2 data-edit="plans.board" data-edit-max="60" id="lm-plans-h" className={s.board}>Health plans</h2>
            <p data-edit="plans.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The routine year, spread into a monthly payment. No joining fee,
              and you can move between plans at any renewal.
            </p>
          </div>
          <ul className={s.planList}>
            {PLANS.map((p, i) => (
              <li key={p.name} className={`${s.plan} ${p.tone === 'blue' ? s.planTop : ''}`}>
                <div className={`${s.rosette} ${s.roPlan} ${s[`ro_${p.tone}`]}`}>
                  <span className={s.roTail} aria-hidden="true" />
                  <span className={s.roTail} aria-hidden="true" />
                  <span className={s.roRing} aria-hidden="true" />
                  <span className={s.roInner} aria-hidden="true" />
                  <span className={s.roDisc}>
                    <span className={s.priceTag}>
                      <strong data-edit={`plans.planPrice.${i}`} className={s.planPrice}>{p.price}</strong>
                      <span data-edit={`plans.pricePer.${i}`} data-edit-max="60" className={s.pricePer}>a month</span>
                    </span>
                  </span>
                </div>
                <p data-edit={`plans.planPlace.${i}`} data-edit-max="240" data-edit-multiline className={s.planPlace}>{p.count}</p>
                <h3 data-edit={`plans.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                <p data-edit={`plans.planWho.${i}`} data-edit-max="240" data-edit-multiline className={s.planWho}>{p.who}</p>
                <ul className={s.shoeList}>
                  {p.gets.map((g, i2) => (
                    <li key={g}>
                      <Artwork slug="longmeadow-equine-horseshoe" alt="" inks={['var(--accent-ink)']} className={s.shoe} />
                      <span data-edit={`plans.text.${i}.${i2}`} data-edit-max="60">{g}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div data-edit-pattern="plans.field" data-edit-roles="1,4,0,2,3,4" className={s.trim} aria-hidden="true">
            <TabbiedPattern
              pattern={ovolo}
              palette={TRIM}
              fit="grid"
              cellSize={36}
              seed="longmeadow-trim"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* -------------------------------------------------------- SCHEDULE
            The week, printed like a show schedule: numbered classes, the ring
            and the judge. */}
        <section id="schedule" className={`${s.sec} ${s.schedule}`} aria-labelledby="lm-sched-h">
          <div className={s.schedCover}>
            <div data-edit-pattern="schedule.field" data-edit-roles="1,2,4,3,0,1" className={s.quilt} aria-hidden="true">
              <TabbiedPattern
                pattern={quartercirclequilt}
                palette={QUILT}
                options={{ frequency: 0.5 }}
                fit="grid"
                cellSize={40}
                seed="longmeadow-quilt"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.coverCard}>
              <p data-edit="schedule.coverSmall" data-edit-max="240" data-edit-multiline className={s.coverSmall}>Longmeadow Equine</p>
              <h2 data-edit="schedule.coverTitle" data-edit-max="60" id="lm-sched-h" className={s.coverTitle}>Schedule of classes</h2>
              <p data-edit="schedule.coverWeek" data-edit-max="240" data-edit-multiline className={s.coverWeek}>Every week, all year</p>
              <p data-edit="schedule.coverSmall2" data-edit-max="240" data-edit-multiline className={s.coverSmall}>Entries at the office or on (555) 014-3380</p>
            </div>
          </div>
          <ol className={s.classes}>
            {SCHEDULE.map((c, i) => (
              <li key={c.n} className={s.classRow}>
                <span data-edit={`schedule.classNum.${i}`} data-edit-max="60" className={s.classNum}>{c.n}</span>
                <p className={s.classWhen}>
                  <span data-edit={`schedule.classDay.${i}`} data-edit-max="60" className={s.classDay}>{c.day}</span>
                  <span data-edit={`schedule.classTime.${i}`} data-edit-max="60" className={s.classTime}>{c.time}</span>
                </p>
                <div className={s.classBody}>
                  <h3 data-edit={`schedule.className.${i}`} data-edit-max="40" className={s.className}>{c.name}</h3>
                  <p data-edit={`schedule.classRing.${i}`} data-edit-max="240" data-edit-multiline className={s.classRing}>{c.ring}</p>
                </div>
                <p data-edit={`schedule.classVet.${i}`} data-edit-max="240" data-edit-multiline className={s.classVet}>{c.vet}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ VETS */}
        <section id="vets" className={s.sec} aria-labelledby="lm-vets-h">
          <div className={s.secHead}>
            <p data-edit="vets.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>Class 06</p>
            <h2 data-edit="vets.board" data-edit-max="60" id="lm-vets-h" className={s.board}>The vets</h2>
            <p data-edit="vets.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Four vets share the on-call rota, one night in four and one
              weekend in four, with Nell Brampton running the nurses and the
              hospital boxes.
            </p>
          </div>
          <ul className={s.vets}>
            {VETS.map((v, i) => (
              <li key={v.name} className={s.vet}>
                <div className={`${s.rosette} ${s.roVet} ${s[`ro_${v.tone}`]}`}>
                  <span className={s.roTail} aria-hidden="true" />
                  <span className={s.roTail} aria-hidden="true" />
                  <span className={s.roRing} aria-hidden="true" />
                  <span className={s.roInner} aria-hidden="true" />
                  <span className={s.roDisc}>
                    <span data-edit={`vets.vetInitials.${i}`} data-edit-max="60" className={s.vetInitials}>{v.plate}</span>
                  </span>
                </div>
                <div className={s.vetText}>
                  <h3 data-edit={`vets.vetName.${i}`} data-edit-max="40" className={s.vetName}>{v.name}</h3>
                  <p data-edit={`vets.vetRole.${i}`} data-edit-max="240" data-edit-multiline className={s.vetRole}>{v.role}</p>
                  <p data-edit={`vets.vetFocus.${i}`} data-edit-max="240" data-edit-multiline className={s.vetFocus}>{v.focus}</p>
                  <p data-edit={`vets.vetOwn.${i}`} data-edit-max="240" data-edit-multiline className={s.vetOwn}>{v.own}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- REGISTER */}
        <section id="register" className={`${s.sec} ${s.register}`} aria-labelledby="lm-reg-h">
          <div className={s.regGrid}>
            <form className={s.form} action="#">
              <p data-edit="register.secNum" data-edit-max="240" data-edit-multiline className={s.secNum}>Class 07</p>
              <h2 data-edit="register.board" data-edit-max="60" id="lm-reg-h" className={s.board}>Register</h2>
              <p data-edit="register.formLede" data-edit-max="240" data-edit-multiline className={s.formLede}>
                One form per horse. We ask your last vet for the history, so
                there is nothing to chase.
              </p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label htmlFor="lm-owner">{"Owner's name"}</label>
                  <input id="lm-owner" name="owner" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="register.label" htmlFor="lm-phone">Phone</label>
                  <input id="lm-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className={s.field}>
                  <label data-edit="register.label2" htmlFor="lm-email">Email</label>
                  <input id="lm-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="register.label3" htmlFor="lm-yard">Yard and postcode</label>
                  <input id="lm-yard" name="yard" type="text" />
                </div>
                <div className={s.field}>
                  <label htmlFor="lm-horse">{"Horse's name"}</label>
                  <input id="lm-horse" name="horse" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="register.label4" htmlFor="lm-age">Age and breed or type</label>
                  <input id="lm-age" name="age" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="register.label5" htmlFor="lm-plan">Health plan</label>
                  <select id="lm-plan" name="plan" defaultValue="none">
                    <option value="none">No plan for now</option>
                    <option value="pony">Pony plan, $19 a month</option>
                    <option value="leisure">Leisure plan, $29 a month</option>
                    <option value="competition">Competition plan, $44 a month</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="register.label6" htmlFor="lm-vet">Previous practice</label>
                  <input id="lm-vet" name="previous" type="text" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="register.label7" htmlFor="lm-notes">Anything we should know</label>
                  <textarea id="lm-notes" name="notes" rows={3} />
                </div>
              </div>
              <button data-edit="register.btn" data-edit-max="24" className={s.btn} type="submit">Register the horse</button>
            </form>

            <aside className={s.office} aria-labelledby="lm-office-h">
              <h3 data-edit="lmOffice.officeBoard" data-edit-max="40" id="lm-office-h" className={s.officeBoard}>The office</h3>
              <p data-edit="lmOffice.address" data-edit-max="240" data-edit-multiline className={s.address}>Longmeadow Farm, Stanbury Road, Westcote</p>
              <p data-edit="lmOffice.officeNote" data-edit-max="240" data-edit-multiline className={s.officeNote}>
                Half a mile past the Fallowfield turn, on the left. Follow the
                white rails to the cobbled yard; reception is the door with the
                green board.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`lmOffice.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`lmOffice.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="lmOffice.link" data-edit-max="28" href="tel:+15550143380">Office (555) 014-3380</a>
              </p>
              <p className={s.contact}>
                <a data-edit="lmOffice.link2" data-edit-max="28" href="mailto:office@longmeadow.example">office@longmeadow.example</a>
              </p>
            </aside>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,0,3,2" className={s.rug} aria-hidden="true">
          <TabbiedPattern
            pattern={guernsey}
            palette={RUG}
            fit="grid"
            cellSize={32}
            seed="longmeadow-rug"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <Artwork slug="longmeadow-equine-horseshoe" alt="" inks={['var(--shoe-on-green)']} className={s.footShoe} />
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Longmeadow Equine Veterinary</p>
          <p data-edit="footer.footAddr" data-edit-max="240" data-edit-multiline className={s.footAddr}>Longmeadow Farm, Stanbury Road, Westcote</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional equine practice; the vets, horses, zones and prices are invented.</p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>The horse and the horseshoe are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
