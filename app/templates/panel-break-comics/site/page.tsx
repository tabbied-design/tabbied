import { TabbiedPattern } from 'tabbied/react';
import { dotfade } from 'tabbied/patterns';
import s from './panel-break-comics.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Panel Break Comics: Comic book shop, Linden Flats',
  description:
    'Panel Break Comics on Grove Street: new comics every Wednesday at 10, this week\'s list, the pull list and how it works, back issues, events and staff picks, all laid out like a comic page.',
};

/* Site colors. Every pattern here is printing: Ben-Day dots in one ink on
   the flat color of the panel behind them (a transparent ground). */
const PAPER = '#fbf3dc';
const INK = '#16130f';
const RED = '#e33b2e';
const YELLOW = '#ffd23a';
const BLUE = '#2b6fd8';

const SPLASH = ['transparent', YELLOW];
const BLUEDOTS = ['transparent', PAPER];
const BURST = ['transparent', YELLOW];
const THEEND = ['transparent', RED];

const NAV = [
  ['This week', '#this-week'],
  ['Pull list', '#pull-list'],
  ['Events', '#events'],
  ['Back issues', '#back-issues'],
  ['Staff picks', '#staff'],
  ['Visit', '#visit'],
];

type Book = { title: string; issue: string; publisher: string; price: string; flag?: string };

const WEEK: Book[] = [
  { title: 'The Last Lighthouse', issue: '#1', publisher: 'Brightline', price: '$5.99', flag: 'New series' },
  { title: 'Saint Mercury', issue: '#25', publisher: 'Brightline', price: '$7.99', flag: 'Double size' },
  { title: 'Hollow Harbor', issue: '#7', publisher: 'Tidewater Press', price: '$4.99', flag: 'Staff pick' },
  { title: 'The Fenwick Files', issue: '#50', publisher: 'Oddfellow', price: '$6.99', flag: 'Final issue' },
  { title: 'Kid Comet and Rocket Dog', issue: '#12', publisher: 'Paperkite', price: '$3.99' },
  { title: 'Night Shift Nurse', issue: '#3', publisher: 'Grimwell', price: '$4.99' },
  { title: 'Moss and Iron', issue: '#4', publisher: 'Tidewater Press', price: '$4.99' },
  { title: 'Galaxy Diner', issue: '#9', publisher: 'Paperkite', price: '$3.99' },
];

const SHELF = [
  ['Ghost Pepper', 'graphic novel, Lantern Books', '$24.99'],
  ['Small Hours, vol. 2', 'collects #7-12, Grimwell', '$19.99'],
  ['Saint Mercury, variant B', '1 per customer, while they last', '$12.99'],
];

const PULL_STEPS = [
  { caption: 'You', text: 'You tell us the series you read. One title or forty.' },
  { caption: 'Every Wednesday', text: 'Every Wednesday we bag, board and file each new issue under your name before we open.' },
  { caption: 'Whenever you like', text: 'Pick them up any time within four weeks, at 10 percent off everything on your list.' },
];

const EVENTS = [
  { date: 'Thu 1 Oct', title: 'Drink and Draw', time: '7-10 pm', note: 'Bring a sketchbook; we bring prompts and the back room. $5 at the door.' },
  { date: 'Every Sat', title: 'Kids\' Comic Club', time: '10-11:30 am', note: 'Ages 8 to 12. Read, then make a four-panel strip. Free, parents browse.' },
  { date: 'Sat 10 Oct', title: 'Signing: Priya Menon', time: '1-4 pm', note: 'The artist of Hollow Harbor signs and sketches. Two books per person.' },
  { date: 'Fri 30 Oct', title: 'Trade Night', time: '6-9 pm', note: 'Swap back issues across the long tables. We referee, nobody gets fleeced.' },
];

const BACK = [
  ['$1', 'The dollar bins out front, restocked Mondays'],
  ['$3-$8', 'The long boxes, by title A to Z, 11,000 issues'],
  ['Ask', 'Graded books and keys, behind the counter'],
];

const STAFF = [
  { name: 'Dee Alvarez', role: 'Owner, since 2009', says: 'Read Small Hours. Four pages in you will have forgotten your phone exists.' },
  { name: 'Marcus Webb', role: 'Wednesdays and back issues', says: 'The Last Lighthouse #1 is the best first issue I have read this year. I bought two.' },
  { name: 'June Park', role: 'Kids\' club and manga', says: 'Kid Comet is for kids. I am 34. It is also for me.' },
];

const HOURS = [
  ['Wednesday', '10 am to 9 pm', 'New comics day'],
  ['Thursday to Saturday', '11 am to 7 pm', ''],
  ['Sunday', '12 to 5 pm', ''],
  ['Monday and Tuesday', 'Closed', 'Sorting the boxes'],
];

export default function PanelBreakPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fbf3dc',
        '--ink': '#16130f',
        '--red': '#e33b2e',
        '--yellow': '#ffd23a',
        '--blue': '#2b6fd8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,red,yellow,blue"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:ital,wght@0,400;0,700;1,700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.logo} href="#top">
          <span data-edit="bar.logoTop" data-edit-max="60" className={s.logoTop}>Panel Break</span>
          <span data-edit="bar.logoSub" data-edit-max="60" className={s.logoSub}>Comics</span>
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

      <main id="top" className={s.comic}>
        {/* ------------------------------------------------ TIER 1: SPLASH */}
        <section className={s.tierSplash} aria-labelledby="splash-h">
          <div className={`${s.panel} ${s.splash}`}>
            <div data-edit-pattern="splash.field" data-edit-roles="transparent,3" className={s.splashDots} aria-hidden="true">
              <TabbiedPattern
                pattern={dotfade}
                palette={SPLASH}
                fit="grid"
                cellSize={72}
                seed="panel-splash"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="splash.caption" data-edit-max="240" data-edit-multiline className={`${s.caption} ${s.splashCaption}`}>Meanwhile, at 311 Grove Street...</p>
            <h1 data-edit="splash.text" data-edit-format="emphasis" data-edit-max="70" id="splash-h" className={s.splashTitle}>
              New comics <span>every Wednesday</span>
            </h1>
            <div className={s.keeperSpot}>
              <p data-edit="splash.balloon" data-edit-max="240" data-edit-multiline className={`${s.balloon} ${s.splashBalloon}`}>Doors open at ten. Your pull list is already bagged!</p>
              <Artwork
                slug="panel-break-comics-keeper"
                alt="A grinning shopkeeper in an apron holding up a fan of comic books"
                inks={{ red: 'var(--paper)', yellow: 'var(--yellow)', blue: 'var(--blue)', black: 'var(--line)' }}
                className={s.keeper}
              />
            </div>
          </div>

          <div className={`${s.panel} ${s.burstPanel}`}>
            <div data-edit-pattern="splash.field2" data-edit-roles="transparent,3" className={s.burstLines} aria-hidden="true">
              <TabbiedPattern
                pattern={dotfade}
                palette={BURST}
                fit="grid"
                cellSize={44}
                seed="panel-burst"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.burst}>
              <p data-edit="splash.burstText" data-edit-max="240" data-edit-multiline className={s.burstText}>Open till 9 on Wednesdays!</p>
            </div>
          </div>

          <div className={`${s.panel} ${s.introPanel}`}>
            <p data-edit="splash.caption2" data-edit-max="240" data-edit-multiline className={s.caption}>Since 2009</p>
            <p data-edit="splash.introText" data-edit-max="240" data-edit-multiline className={s.introText}>
              A neighborhood comic shop with 11,000 back issues, a kids' corner,
              a back room for drawing, and four people who will talk your ear
              off about what to read next.
            </p>
            <p data-edit="splash.body" data-edit-max="240" data-edit-multiline className={s.introSfx} aria-hidden="true">Fwip!</p>
          </div>
        </section>

        {/* ---------------------------------------------- TIER 2: THIS WEEK */}
        <section id="this-week" className={`${s.tier} ${s.weekTier}`} aria-labelledby="week-h">
          <div className={`${s.panel} ${s.weekPanel}`}>
            <div className={s.panelHead}>
              <h2 data-edit="thisWeek.h2" data-edit-max="60" id="week-h" className={s.h2}>New Comic Wednesday</h2>
              <p data-edit="thisWeek.caption" data-edit-max="240" data-edit-multiline className={s.caption}>Arriving Wednesday, September 30</p>
            </div>
            <ul className={s.week}>
              {WEEK.map((b, i) => (
                <li key={b.title} className={s.book}>
                  <span data-edit={`thisWeek.bookIssue.${i}`} data-edit-max="60" className={s.bookIssue}>{b.issue}</span>
                  <span data-edit={`thisWeek.bookTitle.${i}`} data-edit-max="60" className={s.bookTitle}>{b.title}</span>
                  <span data-edit={`thisWeek.bookPub.${i}`} data-edit-max="60" className={s.bookPub}>{b.publisher}</span>
                  <span data-edit={`thisWeek.bookPrice.${i}`} data-edit-max="60" className={s.bookPrice}>{b.price}</span>
                  {b.flag ? <span data-edit={`thisWeek.flag.${i}`} data-edit-max="60" className={s.flag}>{b.flag}</span> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${s.panel} ${s.shelfPanel}`}>
            <h3 data-edit="thisWeek.h3" data-edit-max="40" className={s.h3}>Also on the new shelf</h3>
            <ul className={s.shelf}>
              {SHELF.map(([t, what, price], i) => (
                <li key={t}>
                  <span data-edit={`thisWeek.shelfTitle.${i}`} data-edit-max="60" className={s.shelfTitle}>{t}</span>
                  <span data-edit={`thisWeek.shelfWhat.${i}`} data-edit-max="60" className={s.shelfWhat}>{what}</span>
                  <span data-edit={`thisWeek.shelfPrice.${i}`} data-edit-max="60" className={s.shelfPrice}>{price}</span>
                </li>
              ))}
            </ul>
            <p data-edit="thisWeek.balloon" data-edit-max="240" data-edit-multiline className={`${s.balloon} ${s.balloonUp}`}>Missed a week? Last month's books stay on the rack till Tuesday.</p>
            <p data-edit="thisWeek.body" data-edit-max="240" data-edit-multiline className={`${s.sfx} ${s.shelfSfx}`} aria-hidden="true">Thwump!</p>
          </div>
        </section>

        {/* ---------------------------------------------- TIER 3: PULL LIST */}
        <section id="pull-list" className={s.tier} aria-labelledby="pull-h">
          <div className={s.tierHead}>
            <h2 data-edit="pullList.h2" data-edit-max="60" id="pull-h" className={s.h2}>The pull list, in three panels</h2>
          </div>
          <ol className={s.strip}>
            {PULL_STEPS.map((p, i) => (
              <li key={p.caption} className={`${s.panel} ${s.stripPanel}`}>
                <span data-edit={`pullList.caption.${i}`} data-edit-max="60" className={`${s.caption} ${s.stripCaption}`}>{p.caption}</span>
                <p data-edit={`pullList.balloon.${i}`} data-edit-max="240" data-edit-multiline className={s.balloon}>{p.text}</p>
              </li>
            ))}
          </ol>
          <div className={`${s.panel} ${s.bluePanel}`}>
            <div data-edit-pattern="pullList.field" data-edit-roles="transparent,0" className={s.blueDots} aria-hidden="true">
              <TabbiedPattern
                pattern={dotfade}
                palette={BLUEDOTS}
                fit="grid"
                cellSize={56}
                seed="panel-blue"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <form className={s.form} action="#">
              <h3 data-edit="pullList.formTitle" data-edit-max="40" className={s.formTitle}>Start a pull list</h3>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="pullList.label" htmlFor="pb-name">Name</label>
                  <input id="pb-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="pullList.label2" htmlFor="pb-email">Email</label>
                  <input id="pb-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="pullList.label3" htmlFor="pb-titles">Series to pull, one per line</label>
                  <textarea id="pb-titles" name="titles" rows={4} />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="pullList.label4" htmlFor="pb-variants">Variant covers</label>
                  <select id="pb-variants" name="variants" defaultValue="none">
                    <option value="none">Main cover only</option>
                    <option value="one">One variant when there is one</option>
                    <option value="all">Every cover, I have a problem</option>
                  </select>
                </div>
              </div>
              <button data-edit="pullList.button" data-edit-max="24" className={s.button} type="submit">Pull my books!</button>
              <p data-edit="pullList.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>No deposit, no minimum. Three unpicked weeks in a row and we will call.</p>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------- TIER 4: EVENTS */}
        <section id="events" className={s.tier} aria-labelledby="events-h">
          <div className={s.tierHead}>
            <h2 data-edit="events.h2" data-edit-max="60" id="events-h" className={s.h2}>Coming up at the shop</h2>
          </div>
          <ul className={s.events}>
            {EVENTS.map((e, i) => (
              <li key={e.title} className={`${s.panel} ${s.event}`}>
                <span data-edit={`events.eventDate.${i}`} data-edit-max="60" className={s.eventDate}>{e.date}</span>
                <h3 data-edit={`events.eventTitle.${i}`} data-edit-max="40" className={s.eventTitle}>{e.title}</h3>
                <p data-edit={`events.eventTime.${i}`} data-edit-max="240" data-edit-multiline className={s.eventTime}>{e.time}</p>
                <p data-edit={`events.eventNote.${i}`} data-edit-max="240" data-edit-multiline className={s.eventNote}>{e.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------- TIER 5: BACK ISSUES, STAFF */}
        <section id="back-issues" className={`${s.tier} ${s.backTier}`} aria-labelledby="back-h">
          <div className={`${s.panel} ${s.backPanel}`}>
            <h2 data-edit="backIssues.h2" data-edit-max="60" id="back-h" className={s.h2}>Back issues</h2>
            <dl className={s.back}>
              {BACK.map(([price, what], i) => (
                <div key={price}>
                  <dt data-edit={`backIssues.term.${i}`} data-edit-max="28">{price}</dt>
                  <dd data-edit={`backIssues.body.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={`${s.panel} ${s.buyPanel}`}>
            <div data-edit-pattern="backIssues.field" data-edit-roles="transparent,3" className={s.buyDots} aria-hidden="true">
              <TabbiedPattern
                pattern={dotfade}
                palette={SPLASH}
                fit="grid"
                cellSize={52}
                seed="panel-buy"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="backIssues.caption" data-edit-max="240" data-edit-multiline className={s.caption}>We buy comics</p>
            <p data-edit="backIssues.buyText" data-edit-max="240" data-edit-multiline className={s.buyText}>
              Collections of any size. Bring them in on a Thursday or Friday,
              or send photos and we will come to you. Cash, or 20 percent more
              in store credit.
            </p>
            <p data-edit="backIssues.body" data-edit-max="240" data-edit-multiline className={s.sfx} aria-hidden="true">Ka-ching!</p>
          </div>
        </section>

        <section id="staff" className={s.tier} aria-labelledby="staff-h">
          <div className={s.tierHead}>
            <h2 data-edit="staff.h2" data-edit-max="60" id="staff-h" className={s.h2}>Staff picks, in their own words</h2>
          </div>
          <ul className={s.staff}>
            {STAFF.map((p, i) => (
              <li key={p.name} className={`${s.panel} ${s.staffPanel}`}>
                <p data-edit={`staff.balloon.${i}`} data-edit-max="240" data-edit-multiline className={`${s.balloon} ${s.staffBalloon}`}>{p.says}</p>
                <p data-edit={`staff.staffName.${i}`} data-edit-max="240" data-edit-multiline className={s.staffName}>{p.name}</p>
                <p data-edit={`staff.staffRole.${i}`} data-edit-max="240" data-edit-multiline className={s.staffRole}>{p.role}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------- TIER 6: VISIT */}
        <section id="visit" className={`${s.tier} ${s.visitTier}`} aria-labelledby="visit-h">
          <div className={`${s.panel} ${s.visitPanel}`}>
            <h2 data-edit="visit.h2" data-edit-max="60" id="visit-h" className={s.h2}>Find the shop</h2>
            <p data-edit="visit.body" data-edit-max="240" data-edit-multiline className={s.address}>
              311 Grove Street
              <br />
              Linden Flats
            </p>
            <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>Next to the laundromat, under the red awning. Bike rack out front, step-free door.</p>
            <p className={s.contact}>
              <a data-edit="visit.link" data-edit-max="28" href="tel:+15550157781">(555) 015-7781</a>
            </p>
            <p className={s.contact}>
              <a data-edit="visit.link2" data-edit-max="28" href="mailto:dee@panelbreak.example">dee@panelbreak.example</a>
            </p>
          </div>
          <div className={`${s.panel} ${s.hoursPanel}`}>
            <p data-edit="visit.caption" data-edit-max="240" data-edit-multiline className={s.caption}>Hours</p>
            <dl className={s.hours}>
              {HOURS.map(([d, h, note], i) => (
                <div key={d}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`visit.hoursTime.${i}`} data-edit-max="200" data-edit-multiline className={s.hoursTime}>{h}</dd>
                  <dd data-edit={`visit.hoursNote.${i}`} data-edit-max="200" data-edit-multiline className={s.hoursNote}>{note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={`${s.panel} ${s.endPanel}`}>
          <div data-edit-pattern="footer.field" data-edit-roles="transparent,2" className={s.endDots} aria-hidden="true">
            <TabbiedPattern
              pattern={dotfade}
              palette={THEEND}
              fit="grid"
              cellSize={64}
              seed="panel-end"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <p data-edit="footer.theEnd" data-edit-max="240" data-edit-multiline className={s.theEnd}>The End</p>
          <p data-edit="footer.caption" data-edit-max="240" data-edit-multiline className={`${s.caption} ${s.endCaption}`}>Panel Break Comics</p>
        </div>
        <div className={s.footText}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional comic book shop. The comics, events and people are invented.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The shopkeeper is a generated image, drawn in the page's own colors.</p>
          <p>
            Patterns by{' '}
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
