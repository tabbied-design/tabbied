import { TabbiedPattern } from 'tabbied/react';
import { halftone, concentricrings } from 'tabbied/patterns';
import s from './lumen-portraits.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Lumen: Portrait photographer, Larkin Street',
  description:
    'Lumen is a portrait studio on Larkin Street. Headshots, portraits and family sessions, chosen from a contact sheet, with prices and what to wear on one page.',
};

/* Site colors, for the pattern fields. The halftone screens sit on the
   page's own ground, so each palette opens with `transparent`. */
const RUST = '#B5563C';
const GRAY = '#8C8680';
const PALE = '#E3DDD4';

const SCREEN = ['transparent', RUST, GRAY];
const WEDGE = ['transparent', GRAY, RUST];
const LENS = ['transparent', GRAY, RUST, PALE];

const NAV = [
  ['Sheet', '#sheet'],
  ['Sessions', '#sessions'],
  ['The day', '#day'],
  ['What to wear', '#wear'],
  ['Studio', '#studio'],
  ['Questions', '#questions'],
  ['Book', '#book'],
];

/* The contact sheet: one strip per sitter, five exposures of the same
   sitting cropped as a camera would have framed them. `pick` is the frame
   circled in grease pencil. */
const ROLLS = [
  {
    roll: 'Roll 12',
    art: 'lumen-portraits-p1',
    who: 'Marisol, portrait session',
    back: 'backPale',
    first: 7,
    crops: ['c1', 'c2', 'c3', 'c4', 'c5'],
    pick: 2,
    note: 'Chosen: 9. The laugh after the laugh.',
  },
  {
    roll: 'Roll 13',
    art: 'lumen-portraits-p2',
    who: 'Walter, headshots for a book jacket',
    back: 'backGray',
    first: 22,
    crops: ['c4', 'c1', 'c5', 'c2', 'c3'],
    pick: 1,
    note: 'Chosen: 23. Glasses on, lights raised to kill the glare.',
  },
  {
    roll: 'Roll 14',
    art: 'lumen-portraits-p3',
    who: 'Jonah, headshots for a first job',
    back: 'backRust',
    first: 4,
    crops: ['c2', 'c5', 'c1', 'c3', 'c4'],
    pick: 3,
    note: 'Chosen: 7. Looking off camera, at his mother.',
  },
  {
    roll: 'Roll 15',
    art: 'lumen-portraits-p4',
    who: 'Ruth, a portrait for her seventieth',
    back: 'backPale',
    first: 31,
    crops: ['c3', 'c1', 'c4', 'c5', 'c2'],
    pick: 0,
    note: 'Chosen: 31 and 33. She could not decide, so she took both.',
  },
];

const SESSIONS = [
  {
    frame: '01',
    name: 'Headshot',
    price: '$240',
    time: '45 minutes',
    items: ['One backdrop, one outfit', 'Three retouched images', 'For work, a profile, a jacket'],
  },
  {
    frame: '02',
    name: 'Portrait',
    price: '$420',
    time: '90 minutes',
    items: ['Two backdrops, two outfits', 'Eight retouched images', 'The session most people book'],
  },
  {
    frame: '03',
    name: 'Family and pairs',
    price: '$560',
    time: '2 hours',
    items: ['Up to six people, and a dog', 'Twelve retouched images', 'Groups, pairs and one each'],
  },
  {
    frame: '04',
    name: 'Actors and musicians',
    price: '$650',
    time: '2 hours',
    items: ['Three looks, window and studio light', 'Fifteen images, full size', 'Cleared for press and posters'],
  },
];

const EXTRAS = [
  ['Extra retouched image', '$35'],
  ['Hair and makeup with Tess', '$150'],
  ['Your contact sheet, printed 8 x 10', '$25'],
  ['Fiber print, 8 x 10', '$60'],
  ['Fiber print, 11 x 14', '$110'],
  ['Fiber print, 16 x 20', '$190'],
];

const DAY = [
  {
    no: '1',
    title: 'Book, and a short call',
    body: 'An $80 deposit holds the date and comes off the price. We call a week before to talk about what the pictures are for.',
  },
  {
    no: '2',
    title: 'The sitting',
    body: 'Twenty minutes of talking before anything serious. Most sittings are 200 to 300 frames, and the good ones come late.',
  },
  {
    no: '3',
    title: 'Your contact sheet',
    body: 'Within three days you get every frame on a sheet, online or printed. Circle the ones you want, the way it has always been done.',
  },
  {
    no: '4',
    title: 'The finished pictures',
    body: 'Retouched and delivered in ten days, full size, with a print-ready file for each. Prints follow a week later.',
  },
];

const BRING = [
  'Two or three tops in plain, solid colors',
  'Something with texture: a knit, linen, denim',
  'Your glasses, if you usually wear them',
  'A hair tie, lip balm, and a comb',
  'Whatever makes you feel like yourself',
];

const LEAVE = [
  'Logos, slogans and large prints',
  'Thin stripes and small checks, which shimmer',
  'Brand-new shoes, or anything that pinches',
  'A haircut from the day before (a week is better)',
  'Anything you have to keep adjusting',
];

const HOURS = [
  ['Tuesday to Friday', '10 to 6'],
  ['Thursday', '10 to 8'],
  ['Saturday', '9 to 4'],
  ['Sunday and Monday', 'Closed'],
];

const FAQS = [
  {
    q: 'I hate having my picture taken.',
    a: 'Nearly everybody who books says so. The first twenty minutes are for talking, and nobody looks at the screen until you want to.',
  },
  {
    q: 'How many pictures do I get?',
    a: 'Every frame on the contact sheet, to choose from, and the number of retouched images your session includes. More are $35 each.',
  },
  {
    q: 'How much retouching do you do?',
    a: 'Skin evened, stray hairs, a blemish that will be gone next week. We never reshape a face or a body, and we will not be asked to.',
  },
  {
    q: 'What if I do not like any of them?',
    a: 'We reshoot once, free, within thirty days. It has happened four times in nine years.',
  },
  {
    q: 'Can I bring my dog?',
    a: 'To a family session, yes. There is water, a towel and a biscuit tin by the door.',
  },
];

export default function LumenPortraitsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f4f1ec',
        '--ink': '#1b1a1a',
        '--rust': '#b5563c',
        '--gray': '#8c8680',
        '--pale': '#e3ddd4',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,rust,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gloock&family=Albert+Sans:ital,wght@0,400..700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Lumen</a>
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
            A heading, a halftone step wedge, and then the contact sheet on
            the light table. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroHead}>
            <div className={s.heroText}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Portrait studio, 212 Larkin Street</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>
                Portraits that look like you <em>on a good day.</em>
              </h1>
            </div>
            <div className={s.heroSide}>
              <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                Headshots, portraits and family sittings in a daylight studio.
                You choose your pictures from a contact sheet of every frame, as
                people always have.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Book a sitting</a>
                <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#sessions">Prices</a>
              </div>
            </div>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3" className={s.wedge} aria-hidden="true">
              <TabbiedPattern
                pattern={halftone}
                palette={SCREEN}
                fit="grid"
                cellSize={30}
                seed="lumen-wedge"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>

          <div id="sheet" className={s.table}>
            <div className={s.sheet}>
              <div className={s.sheetHead}>
                <p data-edit="hero.sheetTitle" data-edit-max="240" data-edit-multiline className={s.sheetTitle}>Contact sheet</p>
                <p data-edit="hero.sheetMeta" data-edit-max="240" data-edit-multiline className={s.sheetMeta}>Lumen, 212 Larkin St. Four sittings, spring</p>
              </div>
              <ol className={s.rolls}>
                {ROLLS.map((r, i) => (
                  <li key={r.roll} className={s.roll}>
                    <div className={s.strip}>
                      <span data-edit={`hero.edgePrint.${i}`} data-edit-max="60" className={s.edgePrint}>LUMEN 400 SAFETY</span>
                      <ol className={s.frames}>
                        {r.crops.map((c, i) => (
                          <li key={c} className={i === r.pick ? `${s.frame} ${s.pick}` : s.frame}>
                            <div className={`${s.shot} ${s[r.back]}`}>
                              <Artwork
                                slug={r.art}
                                alt={i === r.pick ? `${r.who}, frame ${r.first + i}` : ''}
                                inks={['var(--ink)', 'var(--paper)']}
                                className={`${s.portrait} ${s[c]}`}
                              />
                            </div>
                            <span className={s.frameNo}>{r.first + i}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className={s.rollNote}>
                      <p data-edit={`hero.rollNo.${i}`} data-edit-max="240" data-edit-multiline className={s.rollNo}>{r.roll}</p>
                      <p data-edit={`hero.rollWho.${i}`} data-edit-max="240" data-edit-multiline className={s.rollWho}>{r.who}</p>
                      <p data-edit={`hero.rollPick.${i}`} data-edit-max="240" data-edit-multiline className={s.rollPick}>{r.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- SESSIONS */}
        <section id="sessions" className={s.sec} aria-labelledby="sessions-h">
          <div className={s.secHead}>
            <p data-edit="sessions.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Sessions and prices</p>
            <h2 data-edit="sessions.secTitle" data-edit-max="60" id="sessions-h" className={s.secTitle}>Four sittings, one price each</h2>
            <p data-edit="sessions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every price includes the contact sheet, the retouching and the
              files. Sales tax is added at the end, and nothing else is.
            </p>
          </div>
          <ol className={s.sessions}>
            {SESSIONS.map((se, i) => (
              <li key={se.name} className={s.session}>
                <span data-edit={`sessions.sessionFrame.${i}`} data-edit-max="60" className={s.sessionFrame}>{se.frame}</span>
                <h3 data-edit={`sessions.sessionName.${i}`} data-edit-max="40" className={s.sessionName}>{se.name}</h3>
                <p data-edit={`sessions.sessionPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.sessionPrice}>{se.price}</p>
                <p data-edit={`sessions.sessionTime.${i}`} data-edit-max="240" data-edit-multiline className={s.sessionTime}>{se.time}</p>
                <ul className={s.sessionItems}>
                  {se.items.map((it, i2) => (
                    <li data-edit={`sessions.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className={s.extras}>
            <div className={s.extrasSide}>
              <h3 data-edit="sessions.extrasHead" data-edit-max="40" className={s.extrasHead}>Extras and prints</h3>
              <div data-edit-pattern="sessions.field" data-edit-roles="transparent,2,3" className={s.proof} aria-hidden="true">
                <TabbiedPattern
                  pattern={halftone}
                  palette={SCREEN}
                  fit="grid"
                  cellSize={24}
                  seed="lumen-proof"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <dl className={s.extrasList}>
              {EXTRAS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`sessions.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`sessions.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------- DAY */}
        <section id="day" className={s.day} aria-labelledby="day-h">
          <div className={s.dayInner}>
            <div className={s.enlarge}>
              <div data-edit-pattern="day.field" data-edit-roles="transparent,3,2" className={s.enlargeScreen} aria-hidden="true">
                <TabbiedPattern
                  pattern={halftone}
                  palette={WEDGE}
                  fit="grid"
                  cellSize={28}
                  seed="lumen-screen"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.enlargePrint}>
                <Artwork
                  slug="lumen-portraits-p1"
                  alt="Marisol, frame 9, printed large"
                  inks={['var(--ink)', 'var(--pale)']}
                  className={s.enlargeArt}
                />
              </div>
              <p data-edit="day.enlargeCap" data-edit-max="240" data-edit-multiline className={s.enlargeCap}>Frame 9, printed 11 x 14 on fiber paper</p>
            </div>
            <div className={s.dayText}>
              <p data-edit="day.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>How a sitting goes</p>
              <h2 data-edit="day.secTitle" data-edit-max="60" id="day-h" className={s.secTitle}>From the first call to the print on your wall</h2>
              <ol className={s.daySteps}>
                {DAY.map((d, i) => (
                  <li key={d.no}>
                    <span data-edit={`day.dayNo.${i}`} data-edit-max="60" className={s.dayNo}>{d.no}</span>
                    <h3 data-edit={`day.dayTitle.${i}`} data-edit-max="40" className={s.dayTitle}>{d.title}</h3>
                    <p data-edit={`day.dayBody.${i}`} data-edit-max="240" data-edit-multiline className={s.dayBody}>{d.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ WEAR */}
        <section id="wear" className={s.sec} aria-labelledby="wear-h">
          <div className={s.secHead}>
            <p data-edit="wear.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>What to wear</p>
            <h2 data-edit="wear.secTitle" data-edit-max="60" id="wear-h" className={s.secTitle}>Plain, textured, and yours</h2>
            <p data-edit="wear.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The camera notices clothes more than you do. Bring a choice and we
              will decide together in the first ten minutes.
            </p>
          </div>
          <div className={s.wearGrid}>
            <div className={s.wearCol}>
              <h3 data-edit="wear.wearHead" data-edit-max="40" className={s.wearHead}>Bring</h3>
              <ul className={s.wearList}>
                {BRING.map((b, i) => (
                  <li data-edit={`wear.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className={s.wearCol}>
              <h3 data-edit="wear.wearHead2" data-edit-max="40" className={s.wearHead}>Leave at home</h3>
              <ul className={`${s.wearList} ${s.wearLeave}`}>
                {LEAVE.map((b, i) => (
                  <li data-edit={`wear.item2.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className={s.wearFrame}>
              <div className={`${s.shot} ${s.backGray}`}>
                <Artwork
                  slug="lumen-portraits-p2"
                  alt="Walter in a dark jacket over a plain shirt"
                  inks={['var(--ink)', 'var(--pale)']}
                  className={s.portrait}
                />
              </div>
              <p data-edit="wear.wearCap" data-edit-max="240" data-edit-multiline className={s.wearCap}>A dark jacket, a plain shirt, his own glasses. Frame 23.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- STUDIO */}
        <section id="studio" className={s.sec} aria-labelledby="studio-h">
          <div className={s.studio}>
            <div data-edit-pattern="studio.field" data-edit-roles="transparent,3,2,4" className={s.lens} aria-hidden="true">
              <TabbiedPattern
                pattern={concentricrings}
                palette={LENS}
                fit="grid"
                cellSize={34}
                seed="lumen-lens"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.studioText}>
              <p data-edit="studio.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>The studio</p>
              <h2 data-edit="studio.secTitle" data-edit-max="60" id="studio-h" className={s.secTitle}>A north window, two lights and a kettle</h2>
              <p data-edit="studio.body" data-edit-max="240" data-edit-multiline className={s.body}>
                Lumen is Nell Avery, who photographs, and Tess Moreau, who does
                hair and makeup when you want it. The studio is on the second
                floor of the old printworks, with a lift, a changing room and a
                mirror that tells the truth.
              </p>
              <p data-edit="studio.body2" data-edit-max="240" data-edit-multiline className={s.body}>
                Park in the lot behind the bakery, or take the 14 bus to Larkin
                and Fifth. The door is the green one.
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([d, h], i) => (
                <div key={d}>
                  <dt data-edit={`studio.term.${i}`} data-edit-max="28">{d}</dt>
                  <dd data-edit={`studio.body3.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.secHead}>
            <p data-edit="questions.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Questions</p>
            <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>What people ask before they come</h2>
          </div>
          <div className={s.faqs}>
            {FAQS.map((f, i) => (
              <details key={f.q} className={s.faq}>
                <summary data-edit={`questions.question.${i}`} data-edit-max="80">{f.q}</summary>
                <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* The second screen: the dots grow toward the booking form. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={halftone}
            palette={WEDGE}
            fit="grid"
            cellSize={26}
            seed="lumen-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookText}>
            <p data-edit="book.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Book a sitting</p>
            <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Ask for a date</h2>
            <p data-edit="book.body" data-edit-max="240" data-edit-multiline className={s.body}>
              We reply the same day with two or three times that work, and a
              link for the $80 deposit. Rescheduling is free up to two days
              before.
            </p>
            <dl className={s.contactList}>
              <div>
                <dt data-edit="book.term" data-edit-max="28">Call</dt>
                <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>(555) 018-4471</dd>
              </div>
              <div>
                <dt data-edit="book.term2" data-edit-max="28">Write</dt>
                <dd>
                  <a data-edit="book.link" data-edit-max="28" href="mailto:hello@lumenportraits.example">hello@lumenportraits.example</a>
                </dd>
              </div>
              <div>
                <dt data-edit="book.term3" data-edit-max="28">Visit</dt>
                <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>212 Larkin Street, second floor</dd>
              </div>
            </dl>
          </div>
          <form className={s.form} action="#">
            <p className={s.field}>
              <label data-edit="book.label" htmlFor="lu-name">Name</label>
              <input id="lu-name" name="name" type="text" autoComplete="name" />
            </p>
            <p className={s.field}>
              <label data-edit="book.label2" htmlFor="lu-email">Email</label>
              <input id="lu-email" name="email" type="email" autoComplete="email" />
            </p>
            <p className={s.field}>
              <label data-edit="book.label3" htmlFor="lu-session">Sitting</label>
              <select id="lu-session" name="session" defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option>Headshot, $240</option>
                <option>Portrait, $420</option>
                <option>Family and pairs, $560</option>
                <option>Actors and musicians, $650</option>
              </select>
            </p>
            <p className={s.field}>
              <label data-edit="book.label4" htmlFor="lu-people">How many people</label>
              <input id="lu-people" name="people" type="number" min={1} max={6} defaultValue={1} />
            </p>
            <p className={`${s.field} ${s.fieldWide}`}>
              <label data-edit="book.label5" htmlFor="lu-when">Days and times that suit you</label>
              <input id="lu-when" name="when" type="text" placeholder="Saturday mornings, or any weekday after 3" />
            </p>
            <p className={`${s.field} ${s.fieldWide}`}>
              <label data-edit="book.label6" htmlFor="lu-for">What are the pictures for?</label>
              <textarea id="lu-for" name="for" rows={4} placeholder="A book jacket, a new job, a birthday, a wall" />
            </p>
            <p className={`${s.check} ${s.fieldWide}`}>
              <input id="lu-hair" name="hair" type="checkbox" />
              <label data-edit="book.label7" htmlFor="lu-hair">Add hair and makeup with Tess ($150)</label>
            </p>
            <button data-edit="book.submit" data-edit-max="24" type="submit" className={s.submit}>Request a date</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <span data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,4" className={s.footLens} aria-hidden="true">
              <TabbiedPattern
                pattern={concentricrings}
                palette={LENS}
                fit="grid"
                cellSize={24}
                seed="lumen-cap"
                style={{ position: 'absolute', inset: 0 }}
              />
            </span>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Lumen</p>
          </div>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
            212 Larkin Street, second floor
            <br />
            (555) 018-4471
            <br />
            hello@lumenportraits.example
          </p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional portrait studio. Sitters, prices and hours are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
