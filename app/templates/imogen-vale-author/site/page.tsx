import { TabbiedPattern } from 'tabbied/react';
import { grainfall } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './imogen-vale-author.module.css';

export const metadata = {
  title: 'Imogen Vale: Novelist, author of The Salt Orchard',
  description:
    'The official site of the novelist Imogen Vale: the books, the next reading, a newsletter six times a year, and contacts for rights, translation and press.',
};

/* Site colors, the same hexes as the stylesheet's root rule: blush paper,
   aubergine ink, the vermilion of the new jacket, marigold and a deep sea
   teal. Grainfall is the jacket art, a grain of dots that thins as it
   falls; it returns as the rule between the books and the events, beside
   the newsletter and above the footer. */
const BLUSH = '#f4e4dc';
const AUBERGINE = '#231a2e';
const VERMILION = '#c63d2f';
const MARIGOLD = '#e2a33b';
const TEAL = '#2f5d62';

const JACKET = ['transparent', AUBERGINE, MARIGOLD, BLUSH, TEAL, MARIGOLD];
const GRAIN = ['transparent', VERMILION, TEAL, MARIGOLD, AUBERGINE, VERMILION];
const LETTER = ['transparent', BLUSH, MARIGOLD, VERMILION, BLUSH, MARIGOLD];

const NAV = [
  ['Books', '#books'],
  ['Events', '#events'],
  ['Newsletter', '#newsletter'],
  ['Rights and press', '#rights'],
  ['Write', '#write'],
];

const BLURBS = [
  ['A novel of tides and inheritance that reads like weather coming in off the sea. Vale has never been better.', 'The Halden Review'],
  ['I finished it at two in the morning and started it again at seven.', 'Ruth Abernathy, author of Low Country'],
  ['Spare, generous and very funny about families.', 'Northern Literary Quarterly'],
];

const BOOKS = [
  { cover: 'coverVermilion', title: 'The Salt Orchard', year: '2026', press: 'Halyard Books, hardback, 344 pages', line: 'Three sisters inherit an apple orchard that the sea is taking back, one row a winter.', price: '$27.00' },
  { cover: 'coverTeal', title: 'A House of Small Weather', year: '2022', press: 'Halyard Books, paperback, 288 pages', line: 'A ferry engineer comes home to look after the father who never let her steer.', price: '$17.00' },
  { cover: 'coverMarigold', title: 'The Lamplighter\'s Daughters', year: '2019', press: 'Halyard Books, paperback, 412 pages', line: 'Two families, one lighthouse, and a hundred years of who gets to keep the light on.', price: '$18.00' },
  { cover: 'coverAubergine', title: 'Ferry Season', year: '2016', press: 'Quayside Press, paperback, 236 pages', line: 'The debut: one summer on a car ferry, told by the boy who sells the tickets.', price: '$16.00' },
];

const EVENTS = [
  ['Thu 29 Oct', 'Reading and questions', 'Harrowgate Library, Elm Street. Free, no booking.'],
  ['Sat 7 Nov', 'Panel: Writing the Coast', 'Lantern Festival of Books, the Corn Exchange. Tickets $8.'],
  ['Thu 19 Nov', 'Book club evening', 'Online, for reading groups who chose The Salt Orchard. Sign up below.'],
  ['Sat 5 Dec', 'Signing', 'Pell & Sons Bookshop, Market Square, 11:00-1:00.'],
];

const LETTERS = [
  ['September', 'On orchards that move'],
  ['July', 'The ferry timetable as a plot'],
  ['May', 'What I read while not writing'],
];

const RIGHTS = [
  ['Literary agent', 'Petra Wilde, Wilde & Hollis', 'petra@wildehollis.example'],
  ['Translation rights', 'Tomasz Brenner, Wilde & Hollis', 'rights@wildehollis.example'],
  ['Film and television', 'Juno Marsh, Brightwater Screen', 'juno@brightwaterscreen.example'],
  ['Publicity, Halyard Books', 'Odile Pryce', 'publicity@halyardbooks.example'],
  ['Festivals and schools', 'Sam Okoro, events', 'events@imogenvale.example'],
];

export default function ImogenValePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--blush': '#f4e4dc',
        '--aubergine': '#231a2e',
        '--vermilion': '#c63d2f',
        '--marigold': '#e2a33b',
        '--teal': '#2f5d62',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="blush,aubergine,vermilion,marigold,teal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.brand" data-edit-max="28" className={s.brand} href="#top">Imogen Vale</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#newsletter">The newsletter</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.jacket}>
            <div className={`${s.panel} ${s.backFlap}`}>
              <p data-edit="hero.flapHead" data-edit-max="240" data-edit-multiline className={s.flapHead}>About the author</p>
              <p data-edit="hero.flapText" data-edit-max="240" data-edit-multiline className={s.flapText}>
                Imogen Vale grew up above a chandlery in a harbor town and has
                worked as a ferry purser, a lighthouse guide and a school
                librarian. She lives on the coast with a carpenter and too many
                tide tables.
              </p>
              <p data-edit="hero.flapHead2" data-edit-max="240" data-edit-multiline className={s.flapHead}>Also by Imogen Vale</p>
              <ul className={s.flapList}>
                <li data-edit="hero.item" data-edit-max="80">A House of Small Weather</li>
                <li data-edit="hero.item2" data-edit-max="80">The Lamplighter&apos;s Daughters</li>
                <li data-edit="hero.item3" data-edit-max="80">Ferry Season</li>
              </ul>
              <p data-edit="hero.flapFoot" data-edit-max="240" data-edit-multiline className={s.flapFoot}>Halyard Books, 40 Rope Walk, Port Ewen</p>
            </div>

            <div className={`${s.panel} ${s.backCover}`}>
              <ul className={s.blurbs}>
                {BLURBS.map(([quote, who], i) => (
                  <li key={who} className={s.blurb}>
                    <blockquote data-edit={`hero.blurbQuote.${i}`} data-edit-max="240" data-edit-multiline className={s.blurbQuote}>{quote}</blockquote>
                    <cite data-edit={`hero.blurbWho.${i}`} data-edit-max="48" className={s.blurbWho}>{who}</cite>
                  </li>
                ))}
              </ul>
              <div className={s.barcode}>
                <span className={s.bars} aria-hidden="true" />
                <span data-edit="hero.isbn" data-edit-max="60" className={s.isbn}>ISBN 978-0-00-418226-3</span>
              </div>
            </div>

            <div className={`${s.panel} ${s.spine}`}>
              <span data-edit="hero.spineAuthor" data-edit-max="60" className={s.spineAuthor}>Imogen Vale</span>
              <span data-edit="hero.spineTitle" data-edit-max="60" className={s.spineTitle}>The Salt Orchard</span>
              <span className={s.spineMark} aria-hidden="true" />
            </div>

            <div className={`${s.panel} ${s.frontCover}`}>
              <p data-edit="hero.coverPrize" data-edit-max="240" data-edit-multiline className={s.coverPrize}>By the winner of the Fennick Prize</p>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,3,0,4,3" className={s.coverArt} aria-hidden="true">
                <TabbiedPattern
                  pattern={grainfall}
                  palette={JACKET}
                  fit="grid"
                  cellSize={58}
                  seed="imogen-jacket"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="hero.body" data-edit-format="emphasis" data-edit-max="240" data-edit-multiline className={s.coverTitle}>
                The Salt <em>Orchard</em>
              </p>
              <p data-edit="hero.coverNovel" data-edit-max="240" data-edit-multiline className={s.coverNovel}>A novel</p>
              <h1 data-edit="hero.coverAuthor" data-edit-max="70" id="hero-h" className={s.coverAuthor}>Imogen Vale</h1>
            </div>

            <div className={`${s.panel} ${s.frontFlap}`}>
              <p data-edit="hero.flapPrice" data-edit-max="240" data-edit-multiline className={s.flapPrice}>$27.00</p>
              <p data-edit="hero.flapText2" data-edit-max="240" data-edit-multiline className={s.flapText}>
                Every winter the sea takes one more row of the Penrose orchard.
                When their mother dies, three sisters who have not spoken in
                years come home to decide what to save: the trees, the house, or
                each other.
              </p>
              <p data-edit="hero.flapText3" data-edit-max="240" data-edit-multiline className={s.flapText}>
                Funny, salt-bitten and tender, The Salt Orchard is a novel about
                what we inherit and what we are allowed to let go.
              </p>
              <p data-edit="hero.flapFoot2" data-edit-max="240" data-edit-multiline className={s.flapFoot}>Jacket art: a grain of dots, falling</p>
            </div>
          </div>

          <div className={s.heroCaption}>
            <p data-edit="hero.heroNote" data-edit-max="240" data-edit-multiline className={s.heroNote}>
              The new novel, out now in hardback, audio and ebook. Signed copies
              from Pell &amp; Sons while they last.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#books">Find it in a bookshop</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#events">Come to a reading</a>
            </div>
          </div>
        </section>

        <section id="books" className={s.sec} aria-labelledby="books-h">
          <div className={s.secHead}>
            <p data-edit="books.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>The books</p>
            <h2 data-edit="books.title" data-edit-format="emphasis" data-edit-max="60" id="books-h" className={s.secTitle}>
              Four novels, <em>all of them coastal</em>
            </h2>
          </div>
          <ul className={s.shelf}>
            {BOOKS.map((b, i) => (
              <li key={b.title} className={s.book}>
                <div className={`${s.miniCover} ${s[b.cover]}`}>
                  <span data-edit={`books.miniTitle.${i}`} data-edit-max="60" className={s.miniTitle}>{b.title}</span>
                  <span data-edit={`books.miniAuthor.${i}`} data-edit-max="60" className={s.miniAuthor}>Imogen Vale</span>
                </div>
                <p data-edit={`books.bookYear.${i}`} data-edit-max="240" data-edit-multiline className={s.bookYear}>{b.year}</p>
                <h3 data-edit={`books.bookTitle.${i}`} data-edit-max="40" className={s.bookTitle}>{b.title}</h3>
                <p data-edit={`books.bookLine.${i}`} data-edit-max="240" data-edit-multiline className={s.bookLine}>{b.line}</p>
                <p data-edit={`books.bookPress.${i}`} data-edit-max="240" data-edit-multiline className={s.bookPress}>{b.press}</p>
                <p data-edit={`books.bookPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.bookPrice}>{b.price}</p>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,3,1,2" className={s.grainRule} aria-hidden="true">
          <TabbiedPattern
            pattern={grainfall}
            palette={GRAIN}
            fit="grid"
            cellSize={44}
            seed="imogen-rule"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="events" className={s.sec} aria-labelledby="events-h">
          <div className={s.eventsGrid}>
            <div className={s.nextEvent}>
              <p data-edit="events.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>The next event</p>
              <h2 data-edit="events.nextTitle" data-edit-max="60" id="events-h" className={s.nextTitle}>In conversation at Marlowe &amp; Finch</h2>
              <div className={s.dateBlock}>
                <span data-edit="events.dateDay" data-edit-max="60" className={s.dateDay}>22</span>
                <span data-edit="events.dateMonth" data-edit-max="60" className={s.dateMonth}>October</span>
                <span data-edit="events.dateTime" data-edit-max="60" className={s.dateTime}>Thursday, 7:00 pm</span>
              </div>
              <p data-edit="events.nextText" data-edit-max="240" data-edit-multiline className={s.nextText}>
                Imogen talks about The Salt Orchard with the poet Hal Ashdown, reads
                the first chapter, and signs afterward. Marlowe &amp; Finch
                Booksellers, 9 Chandler Row. Tickets $10, redeemable against the
                book.
              </p>
              <a data-edit="events.button" data-edit-max="28" className={s.button} href="#write">Reserve a seat</a>
            </div>
            <div>
              <h3 data-edit="events.moreHead" data-edit-max="40" className={s.moreHead}>Also this autumn</h3>
              <ol className={s.events}>
                {EVENTS.map(([date, title, where], i) => (
                  <li key={date} className={s.event}>
                    <p data-edit={`events.eventDate.${i}`} data-edit-max="240" data-edit-multiline className={s.eventDate}>{date}</p>
                    <h4 data-edit={`events.eventTitle.${i}`} data-edit-max="36" className={s.eventTitle}>{title}</h4>
                    <p data-edit={`events.eventWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.eventWhere}>{where}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="newsletter" className={s.sec} aria-labelledby="newsletter-h">
          <div className={s.letter}>
            <div data-edit-pattern="newsletter.field" data-edit-roles="transparent,0,3,2,0,3" className={s.letterArt} aria-hidden="true">
              <TabbiedPattern
                pattern={grainfall}
                palette={LETTER}
                fit="grid"
                cellSize={52}
                seed="imogen-letter"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.letterBody}>
              <p data-edit="newsletter.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>The newsletter</p>
              <h2 data-edit="newsletter.title" data-edit-format="emphasis" data-edit-max="60" id="newsletter-h" className={s.secTitle}>
                Letters from <em>the orchard</em>
              </h2>
              <p data-edit="newsletter.letterText" data-edit-max="240" data-edit-multiline className={s.letterText}>
                Six letters a year: what I am writing, what I am reading, news of
                events before anyone else hears, and once a year a short story
                that will not be in a book.
              </p>
              <form className={s.signup} action="#">
                <label data-edit="newsletter.signupLabel" className={s.signupLabel} htmlFor="iv-news">Your email</label>
                <input id="iv-news" name="email" type="email" autoComplete="email" />
                <button data-edit="newsletter.signupButton" data-edit-max="24" className={s.signupButton} type="submit">Sign me up</button>
              </form>
              <ul className={s.recent}>
                {LETTERS.map(([month, title], i) => (
                  <li key={month}>
                    <span data-edit={`newsletter.recentMonth.${i}`} data-edit-max="60" className={s.recentMonth}>{month}</span>
                    <span data-edit={`newsletter.recentTitle.${i}`} data-edit-max="60" className={s.recentTitle}>{title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="rights" className={s.sec} aria-labelledby="rights-h">
          <div className={s.secHead}>
            <p data-edit="rights.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>Rights and press</p>
            <h2 data-edit="rights.title" data-edit-format="emphasis" data-edit-max="60" id="rights-h" className={s.secTitle}>
              Who to ask, <em>for what</em>
            </h2>
          </div>
          <div className={s.rightsGrid}>
            <dl className={s.rights}>
              {RIGHTS.map(([role, who, mail], i) => (
                <div key={role} className={s.right}>
                  <dt data-edit={`rights.term.${i}`} data-edit-max="28">{role}</dt>
                  <dd data-edit={`rights.rightWho.${i}`} data-edit-max="200" data-edit-multiline className={s.rightWho}>{who}</dd>
                  <dd className={s.rightMail}>
                    <a data-edit={`rights.link.${i}`} data-edit-max="28" href={`mailto:${mail}`}>{mail}</a>
                  </dd>
                </div>
              ))}
            </dl>
            <div className={s.pressCard}>
              <p data-edit="rights.pressFigure" data-edit-max="240" data-edit-multiline className={s.pressFigure}>14</p>
              <p data-edit="rights.pressText" data-edit-max="240" data-edit-multiline className={s.pressText}>languages, from Catalan to Korean. The Salt Orchard is available for translation outside the UK and North America.</p>
              <p className={s.pressLink}>
                <a data-edit="rights.rights" data-edit-max="28" href="#rights">Download the press kit</a>
              </p>
              <p data-edit="rights.pressSmall" data-edit-max="240" data-edit-multiline className={s.pressSmall}>Biography, two photographs, cover files and the first chapter, 18 MB.</p>
            </div>
          </div>
        </section>

        <section id="write" className={s.sec} aria-labelledby="write-h">
          <div className={s.writeGrid}>
            <div>
              <p data-edit="write.secLabel" data-edit-max="240" data-edit-multiline className={s.secLabel}>Write</p>
              <h2 data-edit="write.title" data-edit-format="emphasis" data-edit-max="60" id="write-h" className={s.secTitle}>
                Letters, <em>book clubs, readings</em>
              </h2>
              <p data-edit="write.writeText" data-edit-max="240" data-edit-multiline className={s.writeText}>
                Imogen reads every letter and answers most of them, usually within
                a month. Post goes through the agency.
              </p>
              <dl className={s.address}>
                <div>
                  <dt data-edit="write.term" data-edit-max="28">By post</dt>
                  <dd data-edit="write.body" data-edit-max="200" data-edit-multiline>c/o Wilde &amp; Hollis, 22 Tallis Yard, Port Ewen</dd>
                </div>
                <div>
                  <dt data-edit="write.term2" data-edit-max="28">Telephone</dt>
                  <dd>
                    <a data-edit="write.link" data-edit-max="28" href="tel:+15550192214">(555) 019-2214</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="write.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="write.link2" data-edit-max="28" href="mailto:letters@imogenvale.example">letters@imogenvale.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="write.term4" data-edit-max="28">Agency hours</dt>
                  <dd data-edit="write.body2" data-edit-max="200" data-edit-multiline>Monday to Friday, 9:30-5:30</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="write.label" htmlFor="iv-name">Name</label>
                <input id="iv-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="write.label2" htmlFor="iv-email">Email</label>
                <input id="iv-email" name="email" type="email" autoComplete="email" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="write.legend">This is about</legend>
                <div className={s.picks}>
                  <input id="iv-t1" type="radio" name="topic" value="letter" />
                  <label data-edit="write.label3" htmlFor="iv-t1">A letter to Imogen</label>
                  <input id="iv-t2" type="radio" name="topic" value="bookclub" />
                  <label data-edit="write.label4" htmlFor="iv-t2">A book club</label>
                  <input id="iv-t3" type="radio" name="topic" value="event" />
                  <label data-edit="write.label5" htmlFor="iv-t3">An event</label>
                  <input id="iv-t4" type="radio" name="topic" value="press" />
                  <label data-edit="write.label6" htmlFor="iv-t4">Press</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="write.label7" htmlFor="iv-message">Message</label>
                <textarea id="iv-message" name="message" rows={5} />
              </div>
              <button data-edit="write.submit" data-edit-max="24" className={s.submit} type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,3,0,4,3" className={s.footGrain} aria-hidden="true">
          <TabbiedPattern
            pattern={grainfall}
            palette={JACKET}
            fit="grid"
            cellSize={40}
            seed="imogen-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Imogen Vale</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional author. The names, books, people, prices and addresses are
            invented.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
