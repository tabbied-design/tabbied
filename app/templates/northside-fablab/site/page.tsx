import { TabbiedPattern } from 'tabbied/react';
import { kerf, mortise, circuit, battlement } from 'tabbied/patterns';
import s from './northside-fablab.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Northside Fablab: Community makerspace, the Old Cannery',
  description:
    'A community makerspace in Unit 9 of the Old Cannery, Northside: a laser cutter, three 3D printers, a CNC router, a vinyl cutter and an electronics bench, one induction each. Free every Thursday evening.',
};

/* Site colors. Every field runs over a transparent ground so the plywood
   shows between its blocks, the way offcuts sit on the bed of the cutter. */
const PLY = '#ead7b5';
const INK = '#1e1e1e';
const LASER = '#e53935';
const BLUE = '#2f6fdb';

const COMB = ['transparent', INK, LASER, INK, BLUE, INK];
const LID = ['transparent', BLUE, INK, LASER, INK];
const SLOTS = ['transparent', INK, LASER, BLUE, INK];
const TRACES = ['transparent', PLY, LASER, BLUE, PLY];
const TEETH = ['transparent', INK, LASER, INK, BLUE];

const NAV = [
  ['Machines', '#machines'],
  ['Membership', '#membership'],
  ['Inductions', '#inductions'],
  ['Open Thursday', '#thursday'],
  ['Made here', '#made'],
  ['Robotics', '#robotics'],
  ['Visit', '#visit'],
];

const HERO_FACTS = [
  ['214', 'members'],
  ['7', 'machines and benches'],
  ['58', 'open hours a week'],
];

/* The four numbered hotspots on the workshop drawing, keyed to the list. */
const SPOTS = [
  { n: '1', href: '#m-laser', label: 'Laser cutter', cls: 'spotLaser' },
  { n: '2', href: '#m-print', label: '3D printers', cls: 'spotPrint' },
  { n: '3', href: '#m-tools', label: 'Tool wall', cls: 'spotTools' },
  { n: '4', href: '#m-rack', label: 'Sheet rack', cls: 'spotRack' },
];

type Machine = {
  no: string;
  id: string;
  name: string;
  spec: string;
  what: string;
  induction: string;
  rate: string;
  drawn: boolean;
};

const MACHINES: Machine[] = [
  {
    no: '1',
    id: 'm-laser',
    name: 'Laser cutter',
    spec: '80 W CO2, bed 900 x 600 mm',
    what: 'Cuts ply, MDF and acrylic up to 6 mm. Engraves wood, leather, slate and anodised aluminium.',
    induction: 'Laser basics, 90 min, $25',
    rate: '$0.50 a minute of beam time',
    drawn: true,
  },
  {
    no: '2',
    id: 'm-print',
    name: '3D printers, three',
    spec: 'Two 256 mm cubes, one 350 mm tall',
    what: 'PLA, PETG and TPU from the house reels, or bring your own filament and pay nothing.',
    induction: 'Printing in an evening, 60 min, $15',
    rate: '$2 an hour of print time',
    drawn: true,
  },
  {
    no: '3',
    id: 'm-tools',
    name: 'Tool wall',
    spec: 'Hand tools, drills, a mitre saw',
    what: 'Everything on the pegboard, each outline drawn so it goes back where it came from.',
    induction: 'Safety walk-round, 20 min, free',
    rate: 'Included',
    drawn: true,
  },
  {
    no: '4',
    id: 'm-rack',
    name: 'Sheet rack',
    spec: '3, 6 and 9 mm birch ply; acrylic in six colors',
    what: 'Full and half sheets at cost, cut down to bed size while you wait. The offcut bin is free.',
    induction: 'None needed',
    rate: 'From $4 a laser sheet',
    drawn: true,
  },
  {
    no: '5',
    id: 'm-cnc',
    name: 'CNC router',
    spec: '1220 x 2440 mm bed, 2.2 kW spindle',
    what: 'Full sheets of ply, hardwood, foam and thin aluminium plate. Furniture happens here.',
    induction: 'CNC one-to-one, 3 hours, $60',
    rate: '$12 an hour',
    drawn: false,
  },
  {
    no: '6',
    id: 'm-vinyl',
    name: 'Vinyl cutter',
    spec: '600 mm wide, a heat press beside it',
    what: 'Stickers, stencils, shop signs and T-shirts. Vinyl by the metre from the counter.',
    induction: 'Vinyl and heat press, 45 min, $10',
    rate: '$1 a metre cut',
    drawn: false,
  },
  {
    no: '7',
    id: 'm-bench',
    name: 'Electronics bench',
    spec: 'Four soldering stations, a scope, a bench supply',
    what: 'A drawer of every resistor, Arduinos and Raspberry Pis to borrow, and a fume extractor that works.',
    induction: 'Soldering safety, 30 min, free',
    rate: 'Included',
    drawn: false,
  },
];

const LAYER_KEY = [
  ['Cut', 'Red hairline. The part comes out of the sheet.'],
  ['Score', 'Blue dashes. Marked, not cut through.'],
  ['Engrave', 'The darker fill. Burned into the surface.'],
];

type Plan = {
  name: string;
  price: string;
  per: string;
  note: string;
  gets: string[];
  featured: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Day pass',
    price: '$15',
    per: 'a day',
    note: 'Try the place before you commit to it.',
    gets: ['Any open hours, one day', 'Machines you are inducted on', 'Materials at cost', 'Tea, coffee, the good biscuits'],
    featured: false,
  },
  {
    name: 'Monthly',
    price: '$55',
    per: 'a month',
    note: 'What most of our 214 members are on.',
    gets: ['Every open hour, every day', 'A labelled shelf for your projects', 'Two guest passes a month', 'Ten per cent off inductions', 'Keys after a year, if you want them'],
    featured: true,
  },
  {
    name: 'Student',
    price: '$25',
    per: 'a month',
    note: 'With any college, university or sixth form card.',
    gets: ['Every open hour, every day', 'Machines you are inducted on', 'Materials at cost', 'Project help on Wednesdays'],
    featured: false,
  },
];

/* October 2026 starts on a Thursday: three blank squares, then the month. */
const OCT_BLANKS = ['b1', 'b2', 'b3'];
const OCT_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const SESSION_DAYS = [6, 7, 10, 13, 14, 17, 20, 21, 24, 27, 28, 31];
const THURSDAYS = [1, 8, 15, 22, 29];
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type Job = {
  job: string;
  name: string;
  machine: string;
  when: string;
  length: string;
  status: string;
  kind: 'open' | 'few' | 'full';
};

const QUEUE: Job[] = [
  { job: 'J-1041', name: 'Laser basics', machine: 'Laser cutter', when: 'Tue 6 Oct, 18:30', length: '90 min', status: '3 seats', kind: 'few' },
  { job: 'J-1042', name: 'Printing in an evening', machine: '3D printers', when: 'Wed 7 Oct, 19:00', length: '60 min', status: '5 seats', kind: 'open' },
  { job: 'J-1043', name: 'CNC one-to-one', machine: 'CNC router', when: 'Sat 10 Oct, 10:00', length: '3 hours', status: 'Booked', kind: 'full' },
  { job: 'J-1044', name: 'Laser basics', machine: 'Laser cutter', when: 'Tue 13 Oct, 18:30', length: '90 min', status: '6 seats', kind: 'open' },
  { job: 'J-1045', name: 'Soldering safety', machine: 'Electronics bench', when: 'Wed 14 Oct, 19:00', length: '30 min', status: '4 seats', kind: 'open' },
  { job: 'J-1046', name: 'Laser basics', machine: 'Laser cutter', when: 'Sat 17 Oct, 11:00', length: '90 min', status: 'Waitlist', kind: 'full' },
  { job: 'J-1047', name: 'Vinyl and heat press', machine: 'Vinyl cutter', when: 'Tue 20 Oct, 18:30', length: '45 min', status: '2 seats', kind: 'few' },
  { job: 'J-1048', name: 'CNC one-to-one', machine: 'CNC router', when: 'Sat 24 Oct, 10:00', length: '3 hours', status: '1 seat', kind: 'few' },
];

const RUN_SHEET = [
  ['18:00', 'Doors and the kettle', 'Sign the visitors book by the door and find a stool.'],
  ['18:30', 'Show and tell', 'Five minutes each: whatever you made, or broke, this week.'],
  ['19:00', 'Benches open', 'A volunteer on the laser and one on the printers. Small jobs, first come.'],
  ['20:45', 'Sweep-up', 'Everyone sweeps. Then the Quay Tavern, for whoever wants it.'],
];

const BRING = [
  'A file on a USB stick, or an idea on paper',
  'Closed shoes, and long hair tied back',
  'Nothing else: a small laser job is on us',
];

type Project = {
  no: string;
  name: string;
  who: string;
  material: string;
  machine: string;
  note: string;
  size: 'wide' | 'tall' | 'plain';
};

const MADE: Project[] = [
  { no: 'P-118', name: 'Flat-pack stool', who: 'Imogen, member since 2023', material: '18 mm birch ply', machine: 'CNC router, 41 min', note: 'Slots together with no screws and no glue. Four made so far, one for each of her sisters.', size: 'wide' },
  { no: 'P-121', name: 'Bike light mount', who: 'Dev, a Thursday regular', material: 'PETG', machine: '3D printer, 2 h 10 min', note: 'Version three. The first two snapped on Harbour Hill.', size: 'plain' },
  { no: 'P-124', name: 'Wedding table plan', who: 'Ros and Amir', material: '3 mm oak-faced ply', machine: 'Laser, 1 h 05 min', note: 'One hundred and twenty names engraved, the tables cut to fit together as a puzzle.', size: 'tall' },
  { no: 'P-127', name: 'Rooftop weather station', who: 'Robotics club, spring term', material: 'Clear acrylic, a Pi Zero', machine: 'Laser and bench, two Saturdays', note: 'Posting the wind speed to the club page every ten minutes since April.', size: 'plain' },
  { no: 'P-130', name: 'Sign for the bakery', who: 'Marta, Loaf and Co.', material: 'Vinyl on 6 mm ply', machine: 'Vinyl cutter and laser, 50 min', note: 'Still hanging at 4 Cannery Row. She brought us bread for a month.', size: 'plain' },
  { no: 'P-133', name: 'Guitar pedal', who: 'Tomasz', material: 'Aluminium box, a hand-etched board', machine: 'Electronics bench, three evenings', note: 'Fuzz, and very loud. We asked him to test it at home.', size: 'plain' },
];

const CLUB_FACTS = [
  ['Ages', '9 to 14'],
  ['When', 'Saturdays 10:00-12:00'],
  ['Places', '12 a term'],
  ['Cost', '$120 a term, bursaries on request'],
];

const TERMS = [
  ['Autumn', '10 Oct to 12 Dec', 'Line followers: a laser-cut chassis, two motors and a sensor bar.'],
  ['Winter', '16 Jan to 20 Mar', 'Sumo robots, with a ring on the big table and a tournament in week ten.'],
  ['Spring', '17 Apr to 19 Jun', 'Anything with a servo. Past years built a drawing arm and a cat feeder.'],
];

const HOURS = [
  ['Monday', 'Closed for maintenance'],
  ['Tuesday', '14:00-22:00'],
  ['Wednesday', '14:00-22:00'],
  ['Thursday', '10:00-22:00, free from 18:00'],
  ['Friday', '14:00-22:00'],
  ['Saturday', '09:00-18:00'],
  ['Sunday', '10:00-16:00'],
];

const GETTING_HERE = [
  ['Bus', 'The 22 to Cannery Quay, then two minutes along the water.'],
  ['Bike', 'Covered racks for twelve inside the gate.'],
  ['Car', 'The quay car park, free after 18:00.'],
  ['Access', 'Step-free, all on the ground floor, with a height-adjustable bench.'],
];

const UNITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const TITLE_BLOCK = [
  ['Drawn by', 'The Thursday volunteers'],
  ['Material', '3 mm birch ply'],
  ['Scale', '1:1'],
  ['Sheet', '1 of 1'],
  ['Revision', 'C, September 2026'],
];

export default function NorthsideFablabPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--ply': '#ead7b5',
        '--ink': '#1e1e1e',
        '--laser': '#e53935',
        '--blue': '#2f6fdb',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="ply,ink,laser,blue"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,500;0,600;0,700;1,500&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markGlyph} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Northside Fablab</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Open today 14:00-22:00</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="nf-hero-h">
          <p className={s.sheetTag}>
            <span data-edit="nfHero.text" data-edit-max="60">Sheet 01</span>
            <span data-edit="nfHero.text2" data-edit-max="60">3 mm birch ply</span>
            <span data-edit="nfHero.text3" data-edit-max="60">1220 x 610 mm</span>
          </p>

          <div className={s.heroText}>
            <p data-edit="nfHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Community makerspace, Unit 9, the Old Cannery</p>
            <div className={s.dim} aria-hidden="true">
              <span data-edit="nfHero.dimLabel" data-edit-max="60" className={s.dimLabel}>540.0</span>
            </div>
            <h1 id="nf-hero-h" className={s.title}>
              <span data-edit="nfHero.titleLine" data-edit-max="60" className={s.titleLine}>Northside</span>
              <span data-edit="nfHero.titleLine2" data-edit-max="60" className={s.titleLine}>Fablab</span>
            </h1>
            <p data-edit="nfHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              A laser cutter, three 3D printers, a CNC router and a bench of
              soldering irons in the old fish cannery on the quay. Learn a
              machine in one evening, then make whatever you came to make.
            </p>
            <div className={s.actions}>
              <a data-edit="nfHero.btnCut" data-edit-max="28" className={s.btnCut} href="#inductions">Book an induction</a>
              <a data-edit="nfHero.btnScore" data-edit-max="28" className={s.btnScore} href="#thursday">Come on a Thursday, free</a>
            </div>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([figure, label], i) => (
                <div key={label}>
                  <dt data-edit={`nfHero.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`nfHero.body.${i}`} data-edit-max="200" data-edit-multiline>{figure}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className={s.diorama}>
            <div className={s.dioramaBox}>
              <Artwork
                slug="northside-fablab-workshop"
                alt="The workshop drawn in isometric: a laser cutter with its lid open, a 3D printer on a workbench, a pegboard of hand tools, shelves of plywood sheets and a big assembly table"
                inks={{ yellow: 'var(--engrave-deep)', blue: 'var(--blue)', red: 'var(--laser)', black: 'var(--ink)' }}
                className={s.workshop}
              />
              {SPOTS.map((spot, i) => (
                <a key={spot.n} href={spot.href} className={`${s.spot} ${s[spot.cls]}`}>
                  <span className={s.spotNum} aria-hidden="true">{spot.n}</span>
                  <span data-edit={`nfHero.srOnly.${i}`} data-edit-max="60" className={s.srOnly}>{spot.label}</span>
                </a>
              ))}
            </div>
            <figcaption className={s.dioramaCap}>
              <span data-edit="nfHero.figNo" data-edit-max="60" className={s.figNo}>Fig. 1</span>
              <span data-edit="nfHero.text4" data-edit-max="60">The ground floor of Unit 9. The numbers match the machine list below.</span>
            </figcaption>
          </figure>

          <div className={s.combPart}>
            <div data-edit-pattern="nfHero.field" data-edit-roles="transparent,1,2,1,3,1" className={s.comb} aria-hidden="true">
              <TabbiedPattern
                pattern={kerf}
                palette={COMB}
                options={{ frequency: 0.8 }}
                fit="grid"
                cellSize={36}
                seed="nf-kerf-comb"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="nfHero.combNote" data-edit-max="240" data-edit-multiline className={s.combNote}>Kerf test, 0.2 mm beam: every slot on this strip is a real cut width we tried.</p>
          </div>
        </section>

        {/* -------------------------------------------------------- MACHINES */}
        <section id="machines" className={s.sec} aria-labelledby="nf-machines-h">
          <div className={s.secHead}>
            <p data-edit="machines.partId" data-edit-max="240" data-edit-multiline className={s.partId}>Part 02</p>
            <h2 data-edit="machines.title" data-edit-max="60" id="nf-machines-h">The machines</h2>
            <p data-edit="machines.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Seven stations, and each one needs a short induction before you
              use it alone. After that it is yours whenever we are open.
            </p>
          </div>

          <ul className={s.machines}>
            {MACHINES.map((m, i) => (
              <li key={m.id} id={m.id} className={`${s.part} ${s.machine}`}>
                <p className={s.machineTop}>
                  <span data-edit={`machines.machineNoDrawn.${i}`} data-edit-max="60" className={m.drawn ? s.machineNoDrawn : s.machineNo}>{m.no}</span>
                  <span data-edit={`machines.machineSpec.${i}`} data-edit-max="60" className={s.machineSpec}>{m.spec}</span>
                </p>
                <h3 data-edit={`machines.machineName.${i}`} data-edit-max="40" className={s.machineName}>{m.name}</h3>
                <p data-edit={`machines.machineWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.machineWhat}>{m.what}</p>
                <dl className={s.machineMeta}>
                  <div>
                    <dt data-edit={`machines.term.${i}`} data-edit-max="28">Induction</dt>
                    <dd data-edit={`machines.body.${i}`} data-edit-max="200" data-edit-multiline>{m.induction}</dd>
                  </div>
                  <div>
                    <dt data-edit={`machines.term2.${i}`} data-edit-max="28">Rate</dt>
                    <dd data-edit={`machines.body2.${i}`} data-edit-max="200" data-edit-multiline>{m.rate}</dd>
                  </div>
                </dl>
              </li>
            ))}
            <li className={`${s.part} ${s.keyPart}`}>
              <h3 data-edit="machines.keyTitle" data-edit-max="40" className={s.keyTitle}>Reading this sheet</h3>
              <dl className={s.layerKey}>
                {LAYER_KEY.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`machines.term3.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`machines.body3.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </li>
          </ul>
        </section>

        {/* ------------------------------------------------------ MEMBERSHIP */}
        <section id="membership" className={s.sec} aria-labelledby="nf-members-h">
          <div className={s.secHead}>
            <p data-edit="membership.partId" data-edit-max="240" data-edit-multiline className={s.partId}>Part 03</p>
            <h2 data-edit="membership.title" data-edit-max="60" id="nf-members-h">Membership</h2>
            <p data-edit="membership.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Three ways in. Every plan pays for materials at cost and machine
              time at the rates above; nobody here is on commission.
            </p>
          </div>

          <div className={s.plansWrap}>
            <div data-edit-pattern="membership.field" data-edit-roles="transparent,3,1,2,1" className={s.lid} aria-hidden="true">
              <TabbiedPattern
                pattern={kerf}
                palette={LID}
                options={{ frequency: 0.7 }}
                fit="grid"
                cellSize={28}
                seed="nf-kerf-lid"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <ul className={s.plans}>
              {PLANS.map((p, i) => (
                <li key={p.name} className={p.featured ? `${s.plan} ${s.planFeatured}` : s.plan}>
                  <h3 data-edit={`membership.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                  <p className={s.planPrice}>
                    <strong data-edit={`membership.emphasis.${i}`}>{p.price}</strong>
                    <span data-edit={`membership.text.${i}`} data-edit-max="60">{p.per}</span>
                  </p>
                  <p data-edit={`membership.planNote.${i}`} data-edit-max="240" data-edit-multiline className={s.planNote}>{p.note}</p>
                  <ul className={s.planGets}>
                    {p.gets.map((g, i2) => (
                      <li data-edit={`membership.item.${i}.${i2}`} data-edit-max="80" key={g}>{g}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <p data-edit="membership.plansFoot" data-edit-max="240" data-edit-multiline className={s.plansFoot}>
            Out of work or on a pension? Ask about a pay-what-you-can month.
            Nobody is turned away for money.
          </p>
        </section>

        {/* ------------------------------------------------------ INDUCTIONS */}
        <section id="inductions" className={s.sec} aria-labelledby="nf-ind-h">
          <div className={s.secHead}>
            <p data-edit="inductions.partId" data-edit-max="240" data-edit-multiline className={s.partId}>Part 04</p>
            <h2 data-edit="inductions.title" data-edit-max="60" id="nf-ind-h">Inductions, October</h2>
            <p data-edit="inductions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Small groups at the machine itself. You leave having made
              something, and signed off to use it on your own.
            </p>
          </div>

          <div className={s.indGrid}>
            <div className={`${s.part} ${s.calPart}`}>
              <p data-edit="inductions.calMonth" data-edit-max="240" data-edit-multiline className={s.calMonth}>October 2026</p>
              <ol className={s.calHead} aria-hidden="true">
                {WEEKDAYS.map((d, i) => (
                  <li data-edit={`inductions.item.${i}`} data-edit-max="80" key={`${d}${i}`}>{d}</li>
                ))}
              </ol>
              <ol className={s.cal}>
                {OCT_BLANKS.map((b) => (
                  <li key={b} className={s.calBlank} aria-hidden="true" />
                ))}
                {OCT_DAYS.map((d, i) => (
                  <li
                    key={d}
                    className={
                      SESSION_DAYS.includes(d) ? s.calSession : THURSDAYS.includes(d) ? s.calThursday : s.calDay
                    }>
                    <span data-edit={`inductions.text.${i}`} data-edit-max="60">{d}</span>
                  </li>
                ))}
              </ol>
              <dl className={s.calKey}>
                <div>
                  <dt data-edit="inductions.calKeySession" data-edit-max="28" className={s.calKeySession}>Engraved</dt>
                  <dd data-edit="inductions.body" data-edit-max="200" data-edit-multiline>an induction</dd>
                </div>
                <div>
                  <dt data-edit="inductions.calKeyThursday" data-edit-max="28" className={s.calKeyThursday}>Scored</dt>
                  <dd data-edit="inductions.body2" data-edit-max="200" data-edit-multiline>Open Thursday</dd>
                </div>
              </dl>
            </div>

            <div className={s.queueWrap}>
              <p className={s.queueHead}>
                <span data-edit="inductions.text2" data-edit-max="60">Job queue</span>
                <span data-edit="inductions.text3" data-edit-max="60">8 jobs, 29 seats</span>
              </p>
              <table className={s.queue}>
                <caption data-edit="inductions.srOnly" className={s.srOnly}>Induction sessions this month, with the machine, time, length and seats left</caption>
                <thead>
                  <tr>
                    <th data-edit="inductions.heading" scope="col">Job</th>
                    <th data-edit="inductions.heading2" scope="col">Induction</th>
                    <th data-edit="inductions.heading3" scope="col">When</th>
                    <th data-edit="inductions.heading4" scope="col">Length</th>
                    <th data-edit="inductions.heading5" scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {QUEUE.map((j, i) => (
                    <tr key={j.job}>
                      <td data-edit={`inductions.qJob.${i}`} className={s.qJob}>{j.job}</td>
                      <td className={s.qName}>
                        <strong data-edit={`inductions.emphasis.${i}`}>{j.name}</strong>
                        <span data-edit={`inductions.text4.${i}`} data-edit-max="60">{j.machine}</span>
                      </td>
                      <td data-edit={`inductions.qWhen.${i}`} className={s.qWhen}>{j.when}</td>
                      <td data-edit={`inductions.qLen.${i}`} className={s.qLen}>{j.length}</td>
                      <td className={s.qStatus}>
                        <span data-edit={`inductions.pill.${i}`} data-edit-max="60" className={`${s.pill} ${s[j.kind]}`}>{j.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="inductions.queueFoot" data-edit-max="240" data-edit-multiline className={s.queueFoot}>
                Book at the counter, or email the job number to
                inductions@northsidefablab.example and we hold the seat for two days.
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- OPEN THURSDAY */}
        <section id="thursday" className={s.thursSec} aria-labelledby="nf-thu-h">
          <div className={s.thurs}>
            <div data-edit-pattern="thursday.field" data-edit-roles="transparent,1,2,3,1" className={s.slots} aria-hidden="true">
              <TabbiedPattern
                pattern={mortise}
                palette={SLOTS}
                options={{ frequency: 0.55 }}
                fit="grid"
                cellSize={34}
                seed="nf-mortise"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.thursText}>
              <p data-edit="thursday.partId" data-edit-max="240" data-edit-multiline className={s.partId}>Part 05</p>
              <h2 data-edit="thursday.thursTitle" data-edit-max="60" id="nf-thu-h" className={s.thursTitle}>Open Thursday</h2>
              <p data-edit="thursday.thursWhen" data-edit-max="240" data-edit-multiline className={s.thursWhen}>Every Thursday, 18:00-21:00. Free, no booking.</p>
              <p data-edit="thursday.thursLede" data-edit-max="240" data-edit-multiline className={s.thursLede}>
                The doors are open to anyone curious. Bring an idea, watch the
                laser work, get a volunteer to help you print your first thing.
                Children are welcome with a grown-up.
              </p>
              <ul className={s.bring}>
                {BRING.map((b, i) => (
                  <li data-edit={`thursday.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <ol className={s.runSheet}>
              {RUN_SHEET.map(([time, what, note], i) => (
                <li key={time}>
                  <span data-edit={`thursday.runTime.${i}`} data-edit-max="60" className={s.runTime}>{time}</span>
                  <strong data-edit={`thursday.runWhat.${i}`} className={s.runWhat}>{what}</strong>
                  <span data-edit={`thursday.runNote.${i}`} data-edit-max="60" className={s.runNote}>{note}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- MADE HERE */}
        <section id="made" className={s.sec} aria-labelledby="nf-made-h">
          <div className={s.secHead}>
            <p data-edit="made.partId" data-edit-max="240" data-edit-multiline className={s.partId}>Part 06</p>
            <h2 data-edit="made.title" data-edit-max="60" id="nf-made-h">Made here</h2>
            <p data-edit="made.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A few recent jobs, nested the way they would sit on a sheet.
              Every one was somebody&apos;s first go at the machine it used.
            </p>
          </div>

          <ul className={s.nest}>
            {MADE.map((p, i) => (
              <li key={p.no} className={`${s.part} ${s.project} ${s[p.size]}`}>
                <p data-edit={`made.projNo.${i}`} data-edit-max="240" data-edit-multiline className={s.projNo}>{p.no}</p>
                <h3 data-edit={`made.projName.${i}`} data-edit-max="40" className={s.projName}>{p.name}</h3>
                <p data-edit={`made.projWho.${i}`} data-edit-max="240" data-edit-multiline className={s.projWho}>{p.who}</p>
                <p data-edit={`made.projNote.${i}`} data-edit-max="240" data-edit-multiline className={s.projNote}>{p.note}</p>
                <dl className={s.projSpec}>
                  <div>
                    <dt data-edit={`made.term.${i}`} data-edit-max="28">Material</dt>
                    <dd data-edit={`made.body.${i}`} data-edit-max="200" data-edit-multiline>{p.material}</dd>
                  </div>
                  <div>
                    <dt data-edit={`made.term2.${i}`} data-edit-max="28">Machine</dt>
                    <dd data-edit={`made.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.machine}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- ROBOTICS */}
        <section id="robotics" className={s.sec} aria-labelledby="nf-robo-h">
          <div className={s.board}>
            <div data-edit-pattern="robotics.field" data-edit-roles="transparent,0,2,3,0" className={s.traces} aria-hidden="true">
              <TabbiedPattern
                pattern={circuit}
                palette={TRACES}
                options={{ frequency: 0.5 }}
                fit="grid"
                cellSize={30}
                seed="nf-circuit"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.boardText}>
              <p data-edit="robotics.boardId" data-edit-max="240" data-edit-multiline className={s.boardId}>Part 07, Saturdays</p>
              <h2 data-edit="robotics.boardTitle" data-edit-max="60" id="nf-robo-h" className={s.boardTitle}>Kids&apos; robotics club</h2>
              <p data-edit="robotics.boardLede" data-edit-max="240" data-edit-multiline className={s.boardLede}>
                Twelve young makers, two volunteers who build robots for a
                living, and a new machine every term. Everything they make, they
                design, cut and wire themselves, and take home.
              </p>
              <dl className={s.clubFacts}>
                {CLUB_FACTS.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`robotics.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`robotics.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ol className={s.terms}>
              {TERMS.map(([term, dates, what], i) => (
                <li key={term}>
                  <p className={s.termHead}>
                    <strong data-edit={`robotics.emphasis.${i}`}>{term}</strong>
                    <span data-edit={`robotics.text.${i}`} data-edit-max="60">{dates}</span>
                  </p>
                  <p data-edit={`robotics.termWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.termWhat}>{what}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="nf-visit-h">
          <div className={s.secHead}>
            <p data-edit="visit.partId" data-edit-max="240" data-edit-multiline className={s.partId}>Part 08</p>
            <h2 data-edit="visit.title" data-edit-max="60" id="nf-visit-h">Visit the workshop</h2>
            <p data-edit="visit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Through the cannery gate, past the smokehouse chimney, the ninth
              door along the quay. Look for the red door and the noise.
            </p>
          </div>

          <div className={s.visitGrid}>
            <div className={`${s.part} ${s.planPart}`}>
              <p data-edit="visit.planLabel" data-edit-max="240" data-edit-multiline className={s.planLabel}>The Old Cannery, from the water</p>
              <ol className={s.units} aria-label="Units along the quay">
                {UNITS.map((u) => (
                  <li key={u} className={u === '9' ? s.unitHere : s.unit}>
                    <span>{u === '9' ? 'Unit 9, us' : u}</span>
                  </li>
                ))}
              </ol>
              <p data-edit="visit.quay" data-edit-max="240" data-edit-multiline className={s.quay}>Cannery Quay</p>
              <div className={s.dimWide} aria-hidden="true">
                <span data-edit="visit.dimLabel" data-edit-max="60" className={s.dimLabel}>120.0 m</span>
              </div>
              <dl className={s.getting}>
                {GETTING_HERE.map(([term, text], i) => (
                  <div key={term}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={s.visitSide}>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`visit.term2.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`visit.body2.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.address}>
                <p data-edit="visit.addrLine" data-edit-max="240" data-edit-multiline className={s.addrLine}>Unit 9, the Old Cannery</p>
                <p data-edit="visit.addrLine2" data-edit-max="240" data-edit-multiline className={s.addrLine}>Cannery Quay, Northside</p>
                <p className={s.contact}>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550134471">(555) 013-4471</a>
                </p>
                <p className={s.contact}>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@northsidefablab.example">hello@northsidefablab.example</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,1,3" className={s.teeth} aria-hidden="true">
          <TabbiedPattern
            pattern={battlement}
            palette={TEETH}
            options={{ frequency: 0.6 }}
            fit="grid"
            cellSize={30}
            seed="nf-battlement"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div className={s.footAbout}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Northside Fablab</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional community makerspace. The members, machines, prices and dates are invented.</p>
            <p>
              Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The workshop drawing is a generated image, drawn in the page&apos;s own colors.</p>
          </div>
          <dl className={s.titleBlock}>
            {TITLE_BLOCK.map(([term, text], i) => (
              <div key={term}>
                <dt data-edit={`footer.term.${i}`} data-edit-max="28">{term}</dt>
                <dd data-edit={`footer.body3.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </footer>
    </div>
  );
}
