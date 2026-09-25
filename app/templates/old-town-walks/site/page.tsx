import { TabbiedPattern } from 'tabbied/react';
import { baste, garret } from 'tabbied/patterns';
import s from './old-town-walks.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Old Town Walks: City walking tours, the Old Town',
  description:
    'Six walking tours of the old town with local guides: the two-hour classic, the river and its mills, the bell tower, and lanterns after dark. Small groups, daily departures.',
};

/* Site colors. Both fields sit on `transparent`: the row of houses on the
   paper, the walking routes on the pale map. */
const INK = '#232126';
const BRICK = '#C4563A';
const RIVER = '#3B6E8F';
const STONE = '#8F877D';
const PALE = '#E5DACA';
const OCHRE = '#E0B04F';

const HOUSES = ['transparent', BRICK, OCHRE, PALE, STONE];
const ROUTES = ['transparent', RIVER, BRICK, STONE, INK];

const NAV = [
  ['Walks', '#walks'],
  ['Meeting points', '#meet'],
  ['Guides', '#guides'],
  ['Private groups', '#private'],
  ['FAQ', '#faq'],
  ['Book', '#book'],
];

const TODAY = [
  { time: '10:00', walk: 'The Old Town in Two Hours', from: 'Clock Tower', left: '6 places left' },
  { time: '11:00', walk: 'Bells and Clocks', from: "St. Aldhelm's", left: 'Full' },
  { time: '14:30', walk: 'The Old Town in Two Hours', from: 'Clock Tower', left: '11 places left' },
  { time: '19:30', walk: 'Lanterns After Dark', from: 'Guildhall steps', left: '3 places left' },
];

type Walk = {
  name: string;
  hook: string;
  length: string;
  time: string;
  days: string;
  meet: string;
  price: string;
  tone: 'brick' | 'river' | 'ochre';
};

const WALKS: Walk[] = [
  {
    name: 'The Old Town in Two Hours',
    hook: 'The one to start with: the market, the guild streets, the cathedral close and the town walls, with a stop for coffee halfway.',
    length: '2.1 miles, flat, cobbled',
    time: '2 hours',
    days: 'Daily, 10:00 and 14:30',
    meet: 'Clock Tower, Market Square',
    price: '$24',
    tone: 'brick',
  },
  {
    name: 'Bridges and Mills',
    hook: 'Downstream along the river past three bridges, the old paper mill and the tannery steps, and back by the towpath.',
    length: '3.4 miles, riverside paths',
    time: '2 hours 30',
    days: 'Tuesday, Thursday, Saturday, 10:00',
    meet: 'Bridge Gate, by the lion',
    price: '$26',
    tone: 'river',
  },
  {
    name: 'Bells and Clocks',
    hook: 'Up 112 steps into the bell chamber of the clock tower, then across the square to see how the church clock is wound.',
    length: '0.8 miles and 112 steps',
    time: '1 hour 30',
    days: 'Wednesday, Friday, Sunday, 11:00',
    meet: "St. Aldhelm's, south porch",
    price: '$28',
    tone: 'ochre',
  },
  {
    name: 'Lanterns After Dark',
    hook: 'The lanes by lantern light, with the hangings, the fires and the one ghost we are prepared to vouch for.',
    length: '1.6 miles, some steep lanes',
    time: '1 hour 30',
    days: 'Friday and Saturday, 19:30',
    meet: 'Guildhall steps',
    price: '$22',
    tone: 'river',
  },
  {
    name: 'Market Morning',
    hook: 'The Saturday market with a guide who knows the stallholders: cheese, cider, bread and smoked fish, five tastings in all.',
    length: '1.2 miles, busy streets',
    time: '2 hours',
    days: 'Saturday, 9:00',
    meet: 'Clock Tower, Market Square',
    price: '$38',
    tone: 'ochre',
  },
  {
    name: "Merchants' Houses",
    hook: 'Three private courtyards opened for us, a counting house, and the cellars where the wool was weighed.',
    length: '1.9 miles, flat',
    time: '2 hours',
    days: 'Monday and Thursday, 14:00',
    meet: 'Guildhall steps',
    price: '$26',
    tone: 'brick',
  },
];

type Point = {
  no: string;
  name: string;
  where: string;
  walks: string;
  x: string;
  y: string;
};

const POINTS: Point[] = [
  {
    no: '1',
    name: 'The Clock Tower',
    where: 'Market Square, under the clock, on the side that faces the fountain.',
    walks: 'Old Town in Two Hours, Market Morning',
    x: '46%',
    y: '38%',
  },
  {
    no: '2',
    name: 'Bridge Gate',
    where: 'At the stone lion on the town side of the Old Bridge.',
    walks: 'Bridges and Mills',
    x: '74%',
    y: '66%',
  },
  {
    no: '3',
    name: "St. Aldhelm's Church",
    where: 'In the south porch, out of the rain. The door is open from 9.',
    walks: 'Bells and Clocks',
    x: '24%',
    y: '22%',
  },
  {
    no: '4',
    name: 'The Guildhall steps',
    where: 'Guild Street, by the iron lamppost at the bottom of the steps.',
    walks: "Lanterns After Dark, Merchants' Houses",
    x: '30%',
    y: '66%',
  },
];

const GUIDES = [
  {
    initials: 'MK',
    name: 'Marta Kowalczyk',
    role: 'Town historian, guiding since 2010',
    speaks: 'English, Polish',
    leads: "Merchants' Houses",
  },
  {
    initials: 'TR',
    name: 'Tom Reyes',
    role: 'Rang the tower bells for twenty years',
    speaks: 'English, Spanish',
    leads: 'Bells and Clocks',
  },
  {
    initials: 'AB',
    name: 'Anneliese Brandt',
    role: 'Collector of the town\'s darker stories',
    speaks: 'English, German',
    leads: 'Lanterns After Dark',
  },
  {
    initials: 'SO',
    name: 'Sam Okafor',
    role: 'Grew up on the river, worked at the mill',
    speaks: 'English, French',
    leads: 'Bridges and Mills',
  },
];

const PRIVATE = [
  ['Private walk, any route, up to 15', '$260 for two hours'],
  ['Each extra half hour', '$50'],
  ['School groups, up to 30 in two groups', '$8 a student, teachers free'],
  ['A walk in Spanish, German, French or Polish', '$40 on top'],
  ['Step-free version of the Two Hours walk', 'Same price, any day'],
];

const FAQS = [
  {
    q: 'What if it rains?',
    a: 'We walk. There is a basket of umbrellas at every meeting point, and the Two Hours route has enough arcades and church porches to make a wet day bearable. If the town issues a storm warning, we refund.',
  },
  {
    q: 'Is it suitable for wheelchairs and strollers?',
    a: 'The step-free version of the Two Hours walk avoids the steps and the steepest cobbles. Bells and Clocks climbs 112 steps and cannot be adapted; the other walks have a few steps we can route around if you tell us.',
  },
  {
    q: 'Can I just turn up?',
    a: 'Yes, if there are places left: the guide sells them at the meeting point, cash or card. The evening walks fill up, so book those ahead.',
  },
  {
    q: 'Are children welcome?',
    a: 'Under sixteens are half price and under fives free. Bells and Clocks is for eight and over, and Lanterns After Dark is better for ten and up.',
  },
  {
    q: 'Do we tip the guide?',
    a: 'It is never expected. Our guides are paid properly by the hour, whatever the size of the group.',
  },
];

export default function OldTownWalksPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f3ede2',
        '--ink': '#232126',
        '--brick': '#c4563a',
        '--river': '#3b6e8f',
        '--stone': '#8f877d',
        '--pale': '#e5daca',
        '--ochre': '#e0b04f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,brick,river,stone,pale,ochre"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,500;0,700;1,500&family=Alegreya+Sans:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Old Town Walks</a>
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
        {/* ------------------------------------------------------------ HERO
            The rooftops fill the bottom of a full-height screen. The words
            stand in the sky between the spire and the clock tower. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroArt} aria-hidden="true">
            <Artwork
              slug="old-town-walks-rooftops"
              alt=""
              fit="cover"
              inks={{ red: 'var(--brick)', blue: 'var(--river)', yellow: 'var(--ochre)', black: 'var(--ink)' }}
            />
          </div>
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Walking tours of the old town, daily since 2009</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Two hours,
              <br />
              <em>four hundred years.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Small groups, local guides and the stories the plaques leave
              out. The first walk leaves the Clock Tower at ten every morning.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Book a walk</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#walks">See all six walks</a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- TODAY */}
        <section className={s.today} aria-labelledby="today-h">
          <div className={s.todayInner}>
            <h2 data-edit="today.todayHead" data-edit-max="60" id="today-h" className={s.todayHead}>Leaving today</h2>
            <ol className={s.todayList}>
              {TODAY.map((t, i) => (
                <li key={`${t.time}-${t.walk}`}>
                  <time data-edit={`today.todayTime.${i}`} className={s.todayTime}>{t.time}</time>
                  <span data-edit={`today.todayWalk.${i}`} data-edit-max="60" className={s.todayWalk}>{t.walk}</span>
                  <span data-edit={`today.todayFrom.${i}`} data-edit-max="60" className={s.todayFrom}>{t.from}</span>
                  <span data-edit={`today.todayLeft.${i}`} data-edit-max="60" className={s.todayLeft}>{t.left}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- WALKS */}
        <section id="walks" className={s.sec} aria-labelledby="walks-h">
          <div className={s.secHead}>
            <h2 data-edit="walks.title" data-edit-max="60" id="walks-h">Six walks</h2>
            <p data-edit="walks.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices are for an adult; under sixteens pay half and under fives
              walk free. Groups are never more than fourteen.
            </p>
          </div>
          <ul className={s.walks}>
            {WALKS.map((w, i) => (
              <li key={w.name} className={`${s.walk} ${s[w.tone]}`}>
                <div className={s.walkTop}>
                  <h3 data-edit={`walks.title2.${i}`} data-edit-max="40">{w.name}</h3>
                  <strong data-edit={`walks.walkPrice.${i}`} className={s.walkPrice}>{w.price}</strong>
                </div>
                <p data-edit={`walks.walkHook.${i}`} data-edit-max="240" data-edit-multiline className={s.walkHook}>{w.hook}</p>
                <dl className={s.walkFacts}>
                  <div>
                    <dt data-edit={`walks.term.${i}`} data-edit-max="28">Length</dt>
                    <dd data-edit={`walks.body.${i}`} data-edit-max="200" data-edit-multiline>{w.length}</dd>
                  </div>
                  <div>
                    <dt data-edit={`walks.term2.${i}`} data-edit-max="28">Takes</dt>
                    <dd data-edit={`walks.body2.${i}`} data-edit-max="200" data-edit-multiline>{w.time}</dd>
                  </div>
                  <div>
                    <dt data-edit={`walks.term3.${i}`} data-edit-max="28">Leaves</dt>
                    <dd data-edit={`walks.body3.${i}`} data-edit-max="200" data-edit-multiline>{w.days}</dd>
                  </div>
                  <div>
                    <dt data-edit={`walks.term4.${i}`} data-edit-max="28">Meet at</dt>
                    <dd data-edit={`walks.body4.${i}`} data-edit-max="200" data-edit-multiline>{w.meet}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BAND
            A street of gable ends, the loudest pattern on the page. */}
        <div className={s.band} aria-hidden="true">
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,6,5,4" className={s.bandField}>
            <TabbiedPattern
              pattern={garret}
              palette={HOUSES}
              options={{ frequency: 0.55 }}
              fit="grid"
              cellSize={52}
              seed="old-town-street"
              redrawInterval={8500}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* ---------------------------------------------------------- MEET */}
        <section id="meet" className={s.sec} aria-labelledby="meet-h">
          <div className={s.secHead}>
            <h2 data-edit="meet.title" data-edit-max="60" id="meet-h">Four meeting points</h2>
            <p data-edit="meet.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every walk starts at one of these and ends within five minutes
              of it. Look for the guide with the green umbrella.
            </p>
          </div>
          <div className={s.meetGrid}>
            <div className={s.map}>
              <div data-edit-pattern="meet.field" data-edit-roles="transparent,3,2,4,1" className={s.mapField} aria-hidden="true">
                <TabbiedPattern
                  pattern={baste}
                  palette={ROUTES}
                  options={{ frequency: 0.5 }}
                  fit="grid"
                  cellSize={40}
                  seed="old-town-routes"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.mapRiver} aria-hidden="true" />
              {POINTS.map((p) => (
                <span key={p.no} className={s.pin} style={{ left: p.x, top: p.y }} aria-hidden="true">{p.no}</span>
              ))}
              <span data-edit="meet.text" data-edit-max="60" className={s.mapLabel} aria-hidden="true">The river</span>
            </div>
            <ol className={s.points}>
              {POINTS.map((p, i) => (
                <li key={p.no}>
                  <span data-edit={`meet.pointNo.${i}`} data-edit-max="60" className={s.pointNo}>{p.no}</span>
                  <div>
                    <h3 data-edit={`meet.title2.${i}`} data-edit-max="40">{p.name}</h3>
                    <p data-edit={`meet.pointWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.pointWhere}>{p.where}</p>
                    <p data-edit={`meet.pointWalks.${i}`} data-edit-max="240" data-edit-multiline className={s.pointWalks}>{p.walks}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- GUIDES */}
        <section id="guides" className={s.sec} aria-labelledby="guides-h">
          <div className={s.secHead}>
            <h2 data-edit="guides.title" data-edit-max="60" id="guides-h">Your guides</h2>
            <p data-edit="guides.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Eleven of us in all. These four write the walks and lead most of
              them; the rest are trained by them.
            </p>
          </div>
          <ul className={s.guides}>
            {GUIDES.map((g, i) => (
              <li key={g.name} className={s.guide}>
                <span className={s.guideMark} aria-hidden="true">{g.initials}</span>
                <h3 data-edit={`guides.title2.${i}`} data-edit-max="40">{g.name}</h3>
                <p data-edit={`guides.guideRole.${i}`} data-edit-max="240" data-edit-multiline className={s.guideRole}>{g.role}</p>
                <dl className={s.guideFacts}>
                  <div>
                    <dt data-edit={`guides.term.${i}`} data-edit-max="28">Speaks</dt>
                    <dd data-edit={`guides.body.${i}`} data-edit-max="200" data-edit-multiline>{g.speaks}</dd>
                  </div>
                  <div>
                    <dt data-edit={`guides.term2.${i}`} data-edit-max="28">Leads</dt>
                    <dd data-edit={`guides.body2.${i}`} data-edit-max="200" data-edit-multiline>{g.leads}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- PRIVATE */}
        <section id="private" className={s.private} aria-labelledby="private-h">
          <div className={s.privateInner}>
            <div>
              <h2 data-edit="private.title" data-edit-max="60" id="private-h">Private groups and schools</h2>
              <p data-edit="private.body" data-edit-max="240" data-edit-multiline>
                Any of the six walks, or one we put together for you, on the
                day and at the hour you choose. Birthdays, reunions, a class
                doing the town for a history project.
              </p>
              <a data-edit="private.btnInk" data-edit-max="28" className={s.btnInk} href="mailto:walks@oldtownwalks.example">Write to plan one</a>
            </div>
            <div className={s.pricesMat}>
              <div className={s.pricesField} aria-hidden="true">
                <TabbiedPattern
                  pattern={baste}
                  palette={ROUTES}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={32}
                  seed="old-town-private"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <dl className={s.prices}>
                {PRIVATE.map(([what, price], i) => (
                  <div key={what}>
                    <dt data-edit={`private.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`private.body2.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK
            The old bridge behind the whole section. Sky and river are both
            the section's blue; the form floats on the water. */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookArt} aria-hidden="true">
            <Artwork
              slug="old-town-walks-bridge"
              alt=""
              fit="cover"
              inks={{ red: 'var(--brick)', yellow: 'var(--ochre)', black: 'var(--ink)' }}
            />
          </div>
          <div className={s.bookInner}>
            <div className={s.bookText}>
              <h2 data-edit="book.title" data-edit-max="60" id="book-h">Book a walk</h2>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline>
                Pay online and show the confirmation on your phone, or pay the
                guide at the meeting point if there are places left.
              </p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="ow-walk">Walk</label>
                <select id="ow-walk" name="walk" defaultValue={WALKS[0].name}>
                  {WALKS.map((w) => (
                    <option key={w.name} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="ow-date">Date</label>
                <input id="ow-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="ow-adults">Adults</label>
                <input id="ow-adults" name="adults" type="number" min="1" max="14" defaultValue="2" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="ow-kids">Under 16</label>
                <input id="ow-kids" name="children" type="number" min="0" max="12" defaultValue="0" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label5" htmlFor="ow-email">Email for the tickets</label>
                <input id="ow-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <button data-edit="book.formBtn" data-edit-max="24" className={s.formBtn} type="submit">Check places</button>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <h2 data-edit="faq.title" data-edit-max="60" id="faq-h">Before you come</h2>
          </div>
          <div className={s.faq}>
            <div className={s.faqStreet} aria-hidden="true">
              <TabbiedPattern
                pattern={garret}
                palette={HOUSES}
                options={{ frequency: 0.75 }}
                fit="grid"
                cellSize={36}
                seed="old-town-lane"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            {FAQS.map((f, i) => (
              <details key={f.q} className={s.faqItem}>
                <summary data-edit={`faq.question.${i}`} data-edit-max="80">{f.q}</summary>
                <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footStreet} aria-hidden="true">
          <TabbiedPattern
            pattern={garret}
            palette={HOUSES}
            options={{ frequency: 0.7 }}
            fit="grid"
            cellSize={40}
            seed="old-town-roofline"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Old Town Walks</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Walking tours of the old town with the people who live in it.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Office</h2>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footText}>
              3 Guild Street, by the Guildhall
              <br />
              Open 9:00 to 17:00, every day
            </p>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Contact</h2>
            <a data-edit="footer.footLink" data-edit-max="28" className={s.footLink} href="mailto:walks@oldtownwalks.example">walks@oldtownwalks.example</a>
            <a data-edit="footer.footLink2" data-edit-max="28" className={s.footLink} href="tel:+15550173390">(555) 017-3390</a>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional walking tour company. Walks, guides, prices and the town are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
