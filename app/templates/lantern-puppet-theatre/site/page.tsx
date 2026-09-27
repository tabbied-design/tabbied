import { TabbiedPattern } from 'tabbied/react';
import { haunch, spandrel, lunette, apse } from 'tabbied/patterns';
import s from './lantern-puppet-theatre.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Lantern Puppet Theatre: Shadow puppets for children, Wickham Market',
  description:
    'Shadow puppet plays for children in the old chapel on Candle Street, Wickham Market. Three shows this season, puppet-making workshops, birthday parties, school visits and relaxed performances.',
};

/* Site colors. The proscenium is carved with arch corners in gold and
   ink over the curtain red, and the other fields are the chapel's windows,
   arches and cut paper, always over a transparent ground. */
const CURTAIN = '#4a1520';
const GLOW = '#f6e7c1';
const GOLD = '#d9a441';
const INK = '#150f0e';

const CARVING = ['transparent', GOLD, INK, GOLD, CURTAIN, INK];
const CUTTINGS = ['transparent', INK, GOLD, CURTAIN, INK, GOLD];
const WINDOWS = ['transparent', GOLD, INK, GOLD, INK, GLOW];
const ARCADE = ['transparent', GOLD, INK, CURTAIN, GOLD, INK];
const FOYER = ['transparent', GOLD, INK, GLOW, GOLD, INK];

const NAV = [
  ['Now playing', '#playing'],
  ['Workshops', '#workshops'],
  ['Parties', '#parties'],
  ['Schools', '#schools'],
  ['Access', '#access'],
  ['Tickets', '#tickets'],
];

type Show = {
  no: string;
  title: string;
  blurb: string;
  ages: string;
  length: string;
  dates: string;
  times: string;
  price: string;
  puppet: string;
  alt: string;
  shape: string;
};

const SHOWS: Show[] = [
  {
    no: '0041',
    title: 'The Fox Who Borrowed the Moon',
    blurb: 'A hungry fox takes the moon home to light his supper, and the whole wood goes looking for it.',
    ages: 'Ages 3-7',
    length: '45 minutes, no interval',
    dates: '4 Oct - 2 Nov',
    times: 'Sat and Sun, 11:00 and 14:30',
    price: '$9 child, $12 adult',
    puppet: 'lantern-puppet-theatre-fox',
    alt: 'The fox puppet',
    shape: 'stubFox',
  },
  {
    no: '0042',
    title: "Old Owl's Night Watch",
    blurb: 'An owl who cannot sleep keeps watch over the village, and sees everything the grown-ups miss.',
    ages: 'Ages 5-9',
    length: '55 minutes, no interval',
    dates: '8 Nov - 7 Dec',
    times: 'Sat and Sun, 11:00 and 14:30',
    price: '$9 child, $12 adult',
    puppet: 'lantern-puppet-theatre-owl',
    alt: 'The owl puppet',
    shape: 'stubOwl',
  },
  {
    no: '0043',
    title: 'The Crooked House on Bramble Hill',
    blurb: 'A winter play: a cottage that walks to the sea, with snow made of paper and a song everyone learns.',
    ages: 'Ages 3 and up, families',
    length: '50 minutes, no interval',
    dates: '13 Dec - 4 Jan',
    times: 'Daily from 20 Dec, 11:00, 14:30 and 17:00',
    price: '$10 child, $14 adult',
    puppet: 'lantern-puppet-theatre-house',
    alt: 'The crooked house puppet',
    shape: 'stubHouse',
  },
];

const PROGRAMME = [
  { month: 'October', items: [['4', 'The Fox Who Borrowed the Moon opens'], ['18', 'Relaxed performance, 11:00'], ['25', 'Half-term puppet workshop']] },
  { month: 'November', items: [['1', 'BSL-interpreted fox, 14:30'], ['8', "Old Owl's Night Watch opens"], ['22', 'Lantern parade from the market cross']] },
  { month: 'December', items: [['6', 'Relaxed performance, 11:00'], ['13', 'The Crooked House opens'], ['24', 'Christmas Eve show, 11:00 only']] },
];

const MAKE_STEPS = [
  ['Draw', 'A fox, a dragon, your grandmother: in profile, on black card, as big as your hand.'],
  ['Cut', 'Round the outline, then holes for eyes and patterns. Light comes through the holes.'],
  ['Join', 'Cut the legs apart and pin them back with split pins, so they walk.'],
  ['Perform', 'Tape on a rod, step behind our screen, and the lamp does the rest.'],
];

const WORKSHOPS = [
  { when: 'Sat 25 Oct, 10:00', what: 'Half-term workshop, ages 5-11', price: '$18' },
  { when: 'Sun 16 Nov, 13:00', what: 'Family workshop, one grown-up and two children', price: '$30' },
  { when: 'Sat 29 Nov, 10:00', what: 'Lanterns for the parade, ages 6 and up', price: '$18' },
  { when: 'Sat 20 Dec, 10:00', what: 'Winter animals, ages 5-11', price: '$18' },
];

const PARTY = [
  ['The show', 'A private 30-minute performance, the birthday child\'s name in the story.'],
  ['The workshop', 'Every guest makes a puppet to take home, on the stage behind the screen.'],
  ['The vestry', 'Our party room for an hour, with tables, cake knife and a kettle. You bring the food.'],
];

const SCHOOL_ROWS = [
  ['Early years and reception', 'The Fox Who Borrowed the Moon', '45 min', '$6'],
  ['Years 1-2', 'The show and a making session', '2 hours', '$9'],
  ['Years 3-4', 'Light and shadow science morning', '2.5 hours', '$10'],
  ['Years 5-6', 'Write and perform a shadow play', 'Full day', '$14'],
];

const ACCESS = [
  { title: 'Relaxed performances', text: 'House lights low but on, sound turned down, and you can come and go, talk, and move about. Once a month, marked R in the programme.' },
  { title: 'British Sign Language', text: 'An interpreter on stage, lit beside the screen, at the first Saturday afternoon show of every run.' },
  { title: 'Step-free', text: 'A ramp at the Candle Street door, level seating and a wheelchair space in every row. An accessible toilet by the vestry.' },
  { title: 'A visual story', text: 'Photographs of the building, the seats and the dark, to look at before you come. Ask and we post it.' },
  { title: 'Quiet corner', text: 'Cushions and ear defenders in the side chapel, with the show on a small screen, for when it all gets too much.' },
  { title: 'Carers go free', text: 'One companion ticket with every booking that needs one. No proof asked for.' },
];

const PRICES = [
  ['Child, 2-15', '$9'],
  ['Adult', '$12'],
  ['Family of four', '$38'],
  ['Under 2, on a lap', 'Free'],
];

export default function LanternPuppetTheatrePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--curtain': '#4a1520',
        '--glow': '#f6e7c1',
        '--gold': '#d9a441',
        '--ink': '#150f0e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="curtain,glow,gold,ink"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Macondo&family=Alegreya:ital,wght@0,400..800;1,400..600&family=Alegreya+SC:wght@500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandLamp} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Lantern Puppet Theatre</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#tickets">Book seats</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The stage: a carved proscenium, velvet curtains drawn back, and
            the lit paper screen where the fox walks home under the owl. */}
        <section className={s.hero} aria-labelledby="lp-hero-h">
          <div className={s.heroHead}>
            <p data-edit="lpHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Shadow puppets for children, in the old chapel, Candle Street, Wickham Market</p>
            <h1 data-edit="lpHero.title" data-edit-max="70" id="lp-hero-h" className={s.title}>Lantern Puppet Theatre</h1>
          </div>

          <div className={s.proscenium}>
            <div data-edit-pattern="lpHero.field" data-edit-roles="transparent,2,3,2,0,3" className={s.carving} aria-hidden="true">
              <TabbiedPattern
                pattern={haunch}
                palette={CARVING}
                options={{ frequency: 0.85 }}
                fit="grid"
                cellSize={44}
                seed="lantern-carving"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.opening}>
              <div className={s.screen}>
                <Artwork
                  slug="lantern-puppet-theatre-owl"
                  alt="The shadow of an owl with spread wings, flying above"
                  inks={['var(--shadow)']}
                  className={s.owl}
                />
                <Artwork
                  slug="lantern-puppet-theatre-house"
                  alt="The shadow of a crooked cottage with a tree beside it"
                  inks={['var(--shadow)']}
                  className={s.house}
                />
                <Artwork
                  slug="lantern-puppet-theatre-fox"
                  alt="The shadow of a fox walking toward the cottage"
                  inks={['var(--shadow)']}
                  className={s.fox}
                />
              </div>
              <span className={s.valance} aria-hidden="true" />
              <span className={`${s.curtain} ${s.curtainLeft}`} aria-hidden="true" />
              <span className={`${s.curtain} ${s.curtainRight}`} aria-hidden="true" />
              <span className={s.footlights} aria-hidden="true" />
            </div>
          </div>

          <div className={s.heroFoot}>
            <p className={s.nowShowing}>
              <span data-edit="lpHero.nowLabel" data-edit-max="60" className={s.nowLabel}>On stage now</span>
              <span data-edit="lpHero.nowTitle" data-edit-max="60" className={s.nowTitle}>The Fox Who Borrowed the Moon</span>
              <span data-edit="lpHero.nowMeta" data-edit-max="60" className={s.nowMeta}>Ages 3-7, 45 minutes, weekends until 2 November</span>
            </p>
            <p data-edit="lpHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              A small theatre of light and card in a chapel built in 1868.
              Sixty seats, one paper screen, one lamp, and puppets cut by
              hand; the plays are short, the dark is gentle, and children
              are allowed behind the screen afterwards.
            </p>
            <div className={s.actions}>
              <a data-edit="lpHero.btn" data-edit-max="28" className={s.btn} href="#tickets">Book for this weekend</a>
              <a data-edit="lpHero.btnLine" data-edit-max="28" className={s.btnLine} href="#playing">The season</a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- NOW PLAYING
            Three tickets, each stub with its puppet, and the printed
            programme for the season beside them. */}
        <section id="playing" className={s.sec} aria-labelledby="lp-play-h">
          <div className={s.secHead}>
            <p data-edit="playing.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Autumn and winter season</p>
            <h2 data-edit="playing.title" data-edit-max="60" id="lp-play-h">Now playing</h2>
            <p data-edit="playing.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Three plays, one after another, each about three quarters of an
              hour. Sit on the cushions at the front or the pews behind.
            </p>
          </div>

          <div className={s.playGrid}>
            <ul className={s.tickets}>
              {SHOWS.map((show, i) => (
                <li key={show.no} className={s.ticket}>
                  <div className={s.ticketMain}>
                    <p className={s.ticketTop}>
                      <span data-edit={`playing.text.${i}`} data-edit-max="60">Lantern Puppet Theatre</span>
                      <span className={s.ticketNo}>{`No. ${show.no}`}</span>
                    </p>
                    <h3 data-edit={`playing.ticketTitle.${i}`} data-edit-max="40" className={s.ticketTitle}>{show.title}</h3>
                    <p data-edit={`playing.ticketBlurb.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketBlurb}>{show.blurb}</p>
                    <dl className={s.ticketFacts}>
                      <div>
                        <dt data-edit={`playing.term.${i}`} data-edit-max="28">For</dt>
                        <dd data-edit={`playing.body.${i}`} data-edit-max="200" data-edit-multiline>{show.ages}</dd>
                      </div>
                      <div>
                        <dt data-edit={`playing.term2.${i}`} data-edit-max="28">Runs</dt>
                        <dd data-edit={`playing.body2.${i}`} data-edit-max="200" data-edit-multiline>{show.length}</dd>
                      </div>
                      <div>
                        <dt data-edit={`playing.term3.${i}`} data-edit-max="28">Dates</dt>
                        <dd data-edit={`playing.body3.${i}`} data-edit-max="200" data-edit-multiline>{show.dates}</dd>
                      </div>
                      <div>
                        <dt data-edit={`playing.term4.${i}`} data-edit-max="28">Shows</dt>
                        <dd data-edit={`playing.body4.${i}`} data-edit-max="200" data-edit-multiline>{show.times}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className={s.stub}>
                    <Artwork slug={show.puppet} alt={show.alt} inks={['var(--on-glow)']} className={`${s.stubPuppet} ${s[show.shape]}`} />
                    <p data-edit={`playing.stubAdmit.${i}`} data-edit-max="240" data-edit-multiline className={s.stubAdmit}>Admit one</p>
                    <p data-edit={`playing.stubPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.stubPrice}>{show.price}</p>
                  </div>
                </li>
              ))}
            </ul>

            <aside className={s.programme} aria-labelledby="lp-prog-h">
              <p data-edit="lpProg.progKicker" data-edit-max="240" data-edit-multiline className={s.progKicker}>Price one penny</p>
              <h3 data-edit="lpProg.progTitle" data-edit-max="40" id="lp-prog-h" className={s.progTitle}>The Season&apos;s Programme</h3>
              <p data-edit="lpProg.progSub" data-edit-max="240" data-edit-multiline className={s.progSub}>October to January, at the old chapel</p>
              {PROGRAMME.map((m, i) => (
                <div key={m.month} className={s.progMonth}>
                  <p data-edit={`lpProg.progMonthName.${i}`} data-edit-max="240" data-edit-multiline className={s.progMonthName}>{m.month}</p>
                  <ul className={s.progList}>
                    {m.items.map(([day, what], i2) => (
                      <li key={`${m.month}-${day}`}>
                        <span data-edit={`lpProg.progDay.${i}.${i2}`} data-edit-max="60" className={s.progDay}>{day}</span>
                        <span data-edit={`lpProg.progWhat.${i}.${i2}`} data-edit-max="60" className={s.progWhat}>{what}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p data-edit="lpProg.progFoot" data-edit-max="240" data-edit-multiline className={s.progFoot}>Doors open twenty minutes before. Latecomers are shown in at the first dark scene.</p>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------ WORKSHOPS */}
        <section id="workshops" className={s.sec} aria-labelledby="lp-work-h">
          <div className={s.secHead}>
            <p data-edit="workshops.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>At the long table</p>
            <h2 data-edit="workshops.title" data-edit-max="60" id="lp-work-h">Make a shadow puppet</h2>
            <p data-edit="workshops.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Two hours with our puppet makers, Hester and Dev. Black card,
              scissors, split pins and a rod; you leave with a puppet that
              walks and a play to perform at home.
            </p>
          </div>

          <div className={s.workGrid}>
            <ol className={s.makeSteps}>
              {MAKE_STEPS.map(([step, text], i) => (
                <li key={step}>
                  <span className={s.makeNo}>{`${i + 1}`}</span>
                  <h3 data-edit={`workshops.title2.${i}`} data-edit-max="40">{step}</h3>
                  <p data-edit={`workshops.body.${i}`} data-edit-max="240" data-edit-multiline>{text}</p>
                </li>
              ))}
            </ol>

            <div className={s.workTable}>
              <div data-edit-pattern="workshops.field" data-edit-roles="transparent,3,2,0,3,2" className={s.cuttings} aria-hidden="true">
                <TabbiedPattern
                  pattern={spandrel}
                  palette={CUTTINGS}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={34}
                  seed="lantern-cuttings"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <ul className={s.workList}>
                {WORKSHOPS.map((w, i) => (
                  <li key={w.when}>
                    <span data-edit={`workshops.workWhen.${i}`} data-edit-max="60" className={s.workWhen}>{w.when}</span>
                    <span data-edit={`workshops.workWhat.${i}`} data-edit-max="60" className={s.workWhat}>{w.what}</span>
                    <span data-edit={`workshops.workPrice.${i}`} data-edit-max="60" className={s.workPrice}>{w.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- PARTIES */}
        <section id="parties" className={s.partySec} aria-labelledby="lp-party-h">
          <div data-edit-pattern="parties.field" data-edit-roles="transparent,2,3,2,3,1" className={s.windows} aria-hidden="true">
            <TabbiedPattern
              pattern={lunette}
              palette={WINDOWS}
              options={{ frequency: 0.7 }}
              fit="grid"
              cellSize={48}
              seed="lantern-windows"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.partyCard}>
            <p data-edit="parties.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Saturdays at 16:00, Sundays at 10:00</p>
            <h2 data-edit="parties.title" data-edit-max="60" id="lp-party-h">Birthday parties behind the screen</h2>
            <dl className={s.partyList}>
              {PARTY.map(([term, text], i) => (
                <div key={term}>
                  <dt data-edit={`parties.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`parties.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
            <p className={s.partyPrice}>
              <span data-edit="parties.partyFigure" data-edit-max="60" className={s.partyFigure}>$260</span>
              <span data-edit="parties.text" data-edit-max="60">for up to 12 children, grown-ups free. Two hours in all.</span>
            </p>
            <a data-edit="parties.btn" data-edit-max="28" className={s.btn} href="#tickets">Ask for a date</a>
          </div>
        </section>

        {/* -------------------------------------------------------- SCHOOLS */}
        <section id="schools" className={s.sec} aria-labelledby="lp-school-h">
          <div className={s.secHead}>
            <p data-edit="schools.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Weekday mornings in term</p>
            <h2 data-edit="schools.title" data-edit-max="60" id="lp-school-h">For schools</h2>
            <p data-edit="schools.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Up to 60 pupils a morning, with teachers free. Each visit links
              to light and shadow in science, and to storytelling in English.
            </p>
          </div>

          <div className={s.schoolGrid}>
            <div className={s.schoolTableWrap}>
              <table className={s.schoolTable}>
                <caption data-edit="schools.srOnly" className={s.srOnly}>School visits by year group: what happens, how long, and the price per pupil</caption>
                <thead>
                  <tr>
                    <th data-edit="schools.heading" scope="col">Year group</th>
                    <th data-edit="schools.heading2" scope="col">The visit</th>
                    <th data-edit="schools.heading3" scope="col">Length</th>
                    <th data-edit="schools.num" scope="col" className={s.num}>Per pupil</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHOOL_ROWS.map(([year, visit, length, price], i) => (
                    <tr key={year}>
                      <th data-edit={`schools.heading4.${i}`} scope="row">{year}</th>
                      <td data-edit={`schools.cell.${i}`}>{visit}</td>
                      <td data-edit={`schools.cell2.${i}`}>{length}</td>
                      <td data-edit={`schools.num2.${i}`} className={s.num}>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <aside className={s.schoolNote} aria-labelledby="lp-teacher-h">
              <div data-edit-pattern="lpTeacher.field" data-edit-roles="transparent,2,3,0,2,3" className={s.arcade} aria-hidden="true">
                <TabbiedPattern
                  pattern={apse}
                  palette={ARCADE}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={32}
                  seed="lantern-arcade"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.schoolNoteText}>
                <h3 data-edit="lpTeacher.title" data-edit-max="40" id="lp-teacher-h">For teachers</h3>
                <p data-edit="lpTeacher.body" data-edit-max="240" data-edit-multiline>A free visit for one teacher before you book, and a pack of lesson ideas and puppet templates after.</p>
                <p className={s.contactLine}><a data-edit="lpTeacher.link" data-edit-max="28" href="mailto:schools@lanternpuppets.example">schools@lanternpuppets.example</a></p>
              </div>
            </aside>
          </div>
        </section>

        {/* --------------------------------------------------------- ACCESS */}
        <section id="access" className={s.sec} aria-labelledby="lp-access-h">
          <div className={s.secHead}>
            <p data-edit="access.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Everyone in the dark together</p>
            <h2 data-edit="access.title" data-edit-max="60" id="lp-access-h">Relaxed performances and access</h2>
            <p data-edit="access.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A shadow theatre is dark by nature. We keep it gentle, and
              these are the ways we make it easier.
            </p>
          </div>

          <ul className={s.access}>
            {ACCESS.map((a, i) => (
              <li key={a.title}>
                <h3 data-edit={`access.title2.${i}`} data-edit-max="40">{a.title}</h3>
                <p data-edit={`access.body.${i}`} data-edit-max="240" data-edit-multiline>{a.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- TICKETS */}
        <section id="tickets" className={s.sec} aria-labelledby="lp-tix-h">
          <div className={s.secHead}>
            <p data-edit="tickets.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Box office in the porch</p>
            <h2 data-edit="tickets.title" data-edit-max="60" id="lp-tix-h">Tickets and visiting</h2>
            <p data-edit="tickets.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The old chapel, Candle Street, Wickham Market. Through the
              lych gate, and follow the lanterns to the door.
            </p>
          </div>

          <div className={s.tixGrid}>
            <div className={s.boxOffice}>
              <h3 data-edit="tickets.boxTitle" data-edit-max="40" className={s.boxTitle}>Seats</h3>
              <dl className={s.priceList}>
                {PRICES.map(([who, price], i) => (
                  <div key={who}>
                    <dt data-edit={`tickets.term.${i}`} data-edit-max="28">{who}</dt>
                    <dd data-edit={`tickets.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="tickets.small" data-edit-max="240" data-edit-multiline className={s.small}>Box office: Wednesday to Sunday, 10:00-16:00, and an hour before every show.</p>
              <p className={s.contactLine}><a data-edit="tickets.link" data-edit-max="28" href="tel:+15550182240">(555) 018-2240</a></p>
            </div>

            <form className={s.form} action="#">
              <h3 data-edit="tickets.boxTitle2" data-edit-max="40" className={s.boxTitle}>Book seats</h3>
              <div className={s.field}>
                <label data-edit="tickets.label" htmlFor="lp-show">Show</label>
                <select id="lp-show" name="show" defaultValue="fox">
                  <option value="fox">The Fox Who Borrowed the Moon</option>
                  <option value="owl">Old Owl&apos;s Night Watch</option>
                  <option value="house">The Crooked House on Bramble Hill</option>
                </select>
              </div>
              <div className={s.formRow}>
                <div className={s.field}>
                  <label data-edit="tickets.label2" htmlFor="lp-date">Date</label>
                  <input id="lp-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label data-edit="tickets.label3" htmlFor="lp-time">Time</label>
                  <select id="lp-time" name="time" defaultValue="11">
                    <option value="11">11:00</option>
                    <option value="1430">14:30</option>
                    <option value="17">17:00, December</option>
                  </select>
                </div>
              </div>
              <div className={s.formRow}>
                <div className={s.field}>
                  <label data-edit="tickets.label4" htmlFor="lp-kids">Children</label>
                  <input id="lp-kids" name="children" type="number" min="0" defaultValue="2" />
                </div>
                <div className={s.field}>
                  <label data-edit="tickets.label5" htmlFor="lp-adults">Adults</label>
                  <input id="lp-adults" name="adults" type="number" min="0" defaultValue="1" />
                </div>
              </div>
              <div className={s.field}>
                <label data-edit="tickets.label6" htmlFor="lp-email">Email for the tickets</label>
                <input id="lp-email" name="email" type="email" autoComplete="email" />
              </div>
              <button data-edit="tickets.btn" data-edit-max="24" className={s.btn} type="submit">Hold my seats</button>
            </form>

            <div className={s.findUs}>
              <h3 data-edit="tickets.boxTitle3" data-edit-max="40" className={s.boxTitle}>Finding the chapel</h3>
              <p data-edit="tickets.body2" data-edit-max="240" data-edit-multiline>
                Candle Street runs off the Market Hill, behind the Crown. The
                number 64 bus stops at the market cross, three minutes away.
                Parking in the Station Road car park, free on Sundays.
              </p>
              <p data-edit="tickets.body3" data-edit-max="240" data-edit-multiline>
                Buggies can be left in the porch. Snacks in the foyer, but
                nothing crunchy in the dark, please.
              </p>
              <p className={s.contactLine}><a data-edit="tickets.link2" data-edit-max="28" href="mailto:boxoffice@lanternpuppets.example">boxoffice@lanternpuppets.example</a></p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,1,2,3" className={s.footCarving} aria-hidden="true">
          <TabbiedPattern
            pattern={haunch}
            palette={FOYER}
            options={{ frequency: 0.85 }}
            fit="grid"
            cellSize={36}
            seed="lantern-foyer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Lantern Puppet Theatre</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional children&apos;s puppet theatre. The shows, puppet makers, prices and dates are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The fox, the owl and the cottage are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
