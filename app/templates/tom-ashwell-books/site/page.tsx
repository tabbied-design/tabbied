import { TabbiedPattern } from 'tabbied/react';
import { papersea } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './tom-ashwell-books.module.css';

export const metadata = {
  title: 'Tom Ashwell: Picture books, school visits and activity sheets',
  description:
    'Tom Ashwell writes and illustrates picture books about the sea, cut from paper and painted in gouache. Meet the books, book a school visit, and download free activity sheets for the classroom.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Paper Sea is
   how Tom makes his pictures: wave-edged sheets of cut paper laid one over
   the next. At sunset in the hero spread, at the foot of every cover, as
   the band before the activity sheets, and along the top of the footer. */
const CREAM = '#fbf3e2';
const NAVY = '#1c2a4a';
const SUN = '#f4a53a';
const CORAL = '#e0654b';
const SEA = '#2f8a9e';
const FOAM = '#bfe2df';

const SUNSET = ['transparent', SUN, CORAL, SEA, NAVY, NAVY];
const COVER = ['transparent', FOAM, SEA, SEA, NAVY, NAVY];
const DAY = ['transparent', FOAM, FOAM, SEA, SEA, NAVY];
const SHORE = ['transparent', FOAM, SEA, SEA, NAVY, NAVY];

const NAV = [
  ['The books', '#books'],
  ['School visits', '#visits'],
  ['Activity sheets', '#activities'],
  ['About Tom', '#about'],
];

type Book = { title: string; year: string; ages: string; pages: string; tone: string; blurb: string; note: string };

const BOOKS: Book[] = [
  { title: 'The Lighthouse Cat', year: '2025', ages: 'Ages 3-7', pages: '32 pages', tone: 'navy', blurb: 'Mog keeps the lamp lit when the keeper is ill, and learns that a light is only any use if someone is out there to see it.', note: 'Gullhaven Book Prize, shortlist' },
  { title: 'Puffin Goes the Long Way', year: '2023', ages: 'Ages 4-8', pages: '40 pages', tone: 'sun', blurb: 'A puffin who will not fly takes the bus, the ferry and a borrowed bicycle to reach the island before the season ends.', note: 'Read on Story Hour radio' },
  { title: 'Seven Small Boats', year: '2021', ages: 'Ages 2-5', pages: '24-page board book', tone: 'sea', blurb: 'A counting book: seven boats leave the harbor one by one, and one by one come home again in the dark.', note: 'Translated into 11 languages' },
  { title: "Grandad's Tide Clock", year: '2019', ages: 'Ages 5-9', pages: '36 pages', tone: 'coral', blurb: 'The tide comes in fifty minutes later every day, and every day Ellie and her grandad walk down to meet it.', note: 'The first book, still the most asked for' },
];

const VISITS = [
  ['Full day', '$800', 'An assembly for the whole school, three workshops of up to 32 children, and a signing at home time.'],
  ['Half day', '$450', 'An assembly and one workshop, morning or afternoon. Right for small schools and libraries.'],
  ['Virtual visit', '$200', 'Forty minutes on your classroom screen: a reading, a draw-along and the class\'s questions.'],
];

const STEPS = [
  ['Choose a term', 'Visits are on Thursdays and Fridays in term time. Autumn fills first; summer is easiest to get.'],
  ['Send the form', 'The school, the year groups and roughly how many children. Dates come back within a week.'],
  ['Order books locally', 'Your nearest bookshop sends order forms home. Tom signs every copy and the school keeps 10%.'],
  ['On the day', 'A projector, a big pad of paper on an easel, a table and a glass of water. Tom brings the rest.'],
];

const SHEETS = [
  ['Draw the lighthouse cat', 'Ages 3-6', 'Step-by-step drawing, one page'],
  ['Fold a paper boat', 'Ages 5-9', 'Folding diagram, two pages'],
  ['Color the tide clock', 'Ages 3-7', 'Coloring sheet, one page'],
  ['The puffin maze', 'Ages 4-8', 'Maze and answer page'],
  ['Seven boats, spot the difference', 'Ages 4-7', 'Two pictures, ten changes'],
  ['A message in a bottle', 'Ages 6-9', 'Writing frame for a class display'],
];

const FACTS = [
  ['Lives', 'Gullhaven, in a net loft above the harbor'],
  ['Makes pictures with', 'Gouache, scissors and a lot of paper'],
  ['Books so far', 'Nine, four of them his own stories'],
  ['Schools visited', 'About 340, and one lighthouse'],
];

const HOURS = [
  ['Studio days', 'Monday to Wednesday'],
  ['School visits', 'Thursday and Friday, in term time'],
  ['Replies', 'Within a week, usually sooner'],
];

export default function TomAshwellBooksPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#fbf3e2',
        '--navy': '#1c2a4a',
        '--sun': '#f4a53a',
        '--coral': '#e0654b',
        '--sea': '#2f8a9e',
        '--foam': '#bfe2df',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,navy,sun,coral,sea,foam"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Nunito:wght@400;600;800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Tom Ashwell</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Picture books</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#contact">Book a visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            An open picture book: the words on the left page, the sea at
            sunset across the right, a paper boat riding it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.spread}>
            <div className={s.leftPage}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Author and illustrator</p>
              <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Stories for small people about <span>big water.</span>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                Tom Ashwell makes picture books about the sea, cut from paper
                and painted at a desk above Gullhaven harbor. Four books of his
                own, five illustrated for other writers, and about 340 school
                visits so far.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#visits">Book a school visit</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#books">Meet the books</a>
              </div>
              <p data-edit="hero.folio" data-edit-max="240" data-edit-multiline className={s.folio}>1</p>
            </div>
            <div className={s.rightPage}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4,1,1" className={s.sunsetField} aria-hidden="true">
                <TabbiedPattern
                  pattern={papersea}
                  palette={SUNSET}
                  fit="grid"
                  cellSize={84}
                  seed="ashwell-sunset"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.boat} aria-hidden="true" />
              <p data-edit="hero.plate" data-edit-max="240" data-edit-multiline className={s.plate}>From Seven Small Boats, the last page</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- BOOKS */}
        <section id="books" className={s.sec} aria-labelledby="books-h">
          <div className={s.secHead}>
            <h2 data-edit="books.secTitle" data-edit-max="60" id="books-h" className={s.secTitle}>The books</h2>
            <p data-edit="books.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              All four are in print in hardback and paperback, from any
              bookshop. Ask yours to order them; they will be glad you did.
            </p>
          </div>
          <ul className={s.books}>
            {BOOKS.map((b, i) => (
              <li key={b.title} className={s.book}>
                <div className={`${s.cover} ${s[b.tone]}`}>
                  <p data-edit={`books.coverTitle.${i}`} data-edit-max="240" data-edit-multiline className={s.coverTitle}>{b.title}</p>
                  <p data-edit={`books.coverAuthor.${i}`} data-edit-max="240" data-edit-multiline className={s.coverAuthor}>Tom Ashwell</p>
                  <div data-edit-pattern={`books.field.${i}`} data-edit-roles="transparent,5,4,4,1,1" className={s.coverSea} aria-hidden="true">
                    <TabbiedPattern
                      pattern={papersea}
                      palette={COVER}
                      fit="grid"
                      cellSize={44}
                      seed={`ashwell-cover-${i + 1}`}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                </div>
                <h3 data-edit={`books.bookTitle.${i}`} data-edit-max="40" className={s.bookTitle}>{b.title}</h3>
                <p className={s.bookMeta}>{`${b.year}, ${b.ages}, ${b.pages}`}</p>
                <p data-edit={`books.bookBlurb.${i}`} data-edit-max="240" data-edit-multiline className={s.bookBlurb}>{b.blurb}</p>
                <p data-edit={`books.bookNote.${i}`} data-edit-max="240" data-edit-multiline className={s.bookNote}>{b.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- VISITS
            A second spread: what a visit costs on the left page, how to
            book one on the right. */}
        <section id="visits" className={s.sec} aria-labelledby="visits-h">
          <div className={s.secHead}>
            <h2 data-edit="visits.secTitle" data-edit-max="60" id="visits-h" className={s.secTitle}>School visits</h2>
            <p data-edit="visits.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Tom reads, draws on a giant pad in front of the whole school, and
              then sits down with each class to make a page of a book together.
              Travel within sixty miles of Gullhaven is included.
            </p>
          </div>
          <div className={s.visitSpread}>
            <div className={s.visitPage}>
              <h3 data-edit="visits.pageHead" data-edit-max="40" className={s.pageHead}>What a visit costs</h3>
              <ul className={s.visits}>
                {VISITS.map(([name, price, what], i) => (
                  <li key={name} className={s.visit}>
                    <p data-edit={`visits.visitName.${i}`} data-edit-max="240" data-edit-multiline className={s.visitName}>{name}</p>
                    <p data-edit={`visits.visitPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.visitPrice}>{price}</p>
                    <p data-edit={`visits.visitWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.visitWhat}>{what}</p>
                  </li>
                ))}
              </ul>
              <p data-edit="visits.folio" data-edit-max="240" data-edit-multiline className={s.folio}>14</p>
            </div>
            <div className={s.visitPage}>
              <h3 data-edit="visits.pageHead2" data-edit-max="40" className={s.pageHead}>How to book one</h3>
              <ol className={s.steps}>
                {STEPS.map(([t, d], i) => (
                  <li key={t} className={s.step}>
                    <span className={s.stepNo}>{i + 1}</span>
                    <p data-edit={`visits.stepTitle.${i}`} data-edit-max="240" data-edit-multiline className={s.stepTitle}>{t}</p>
                    <p data-edit={`visits.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                  </li>
                ))}
              </ol>
              <p data-edit="visits.folio2" data-edit-max="240" data-edit-multiline className={`${s.folio} ${s.folioRight}`}>15</p>
            </div>
          </div>
        </section>

        <div className={s.band}>
          <div data-edit-pattern="top.field" data-edit-roles="transparent,5,5,4,4,1" className={s.bandField} aria-hidden="true">
            <TabbiedPattern
              pattern={papersea}
              palette={DAY}
              fit="grid"
              cellSize={64}
              seed="ashwell-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <p data-edit="top.bandCard" data-edit-max="240" data-edit-multiline className={s.bandCard}>Every sea in every book is cut from paper, one wave at a time.</p>
        </div>

        {/* ------------------------------------------------------ ACTIVITIES */}
        <section id="activities" className={s.sec} aria-labelledby="activities-h">
          <div className={s.secHead}>
            <h2 data-edit="activities.secTitle" data-edit-max="60" id="activities-h" className={s.secTitle}>Activity sheets</h2>
            <p data-edit="activities.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Free to print for classrooms, libraries and kitchen tables. Each
              one goes with a book, and every one works without it too.
            </p>
          </div>
          <ul className={s.sheets}>
            {SHEETS.map(([title, ages, what], i) => (
              <li key={title} className={s.sheet}>
                <h3 data-edit={`activities.sheetTitle.${i}`} data-edit-max="40" className={s.sheetTitle}>{title}</h3>
                <p data-edit={`activities.sheetAges.${i}`} data-edit-max="240" data-edit-multiline className={s.sheetAges}>{ages}</p>
                <p data-edit={`activities.sheetWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.sheetWhat}>{what}</p>
                <p className={s.sheetLink}>
                  <a data-edit={`activities.activities.${i}`} data-edit-max="28" href="#activities">Download the PDF</a>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- ABOUT */}
        <section id="about" className={s.sec} aria-labelledby="about-h">
          <div className={s.about}>
            <div>
              <h2 data-edit="about.secTitle" data-edit-max="60" id="about-h" className={s.secTitle}>About Tom</h2>
              <p data-edit="about.aboutText" data-edit-max="240" data-edit-multiline className={s.aboutText}>
                Tom grew up two streets from the sea and has never managed to
                live further away. He trained as a printmaker, worked for ten
                years painting signs for boats, and wrote his first book for his
                daughter, who wanted to know why the tide was always late.
              </p>
              <p data-edit="about.aboutText2" data-edit-max="240" data-edit-multiline className={s.aboutText}>
                He still cuts every wave by hand. The offcuts go in a box for
                school visits, where they become a whole class's ocean by the
                end of the morning.
              </p>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`about.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`about.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a visit</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                For schools, libraries and festivals. For rights and
                translations, write to the same address and it will reach the
                right person.
              </p>
              <dl className={s.studio}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>The Net Loft, 3 Quay Steps, Gullhaven</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd><a data-edit="contact.link" data-edit-max="28" href="tel:+15550183302">(555) 018-3302</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd><a data-edit="contact.link2" data-edit-max="28" href="mailto:visits@tomashwell.example">visits@tomashwell.example</a></dd>
                </div>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="ta-school">School or library</label>
                <input id="ta-school" name="school" type="text" autoComplete="organization" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="ta-name">Your name</label>
                <input id="ta-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="ta-email">Email</label>
                <input id="ta-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="ta-term">Which term</label>
                <select id="ta-term" name="term" defaultValue="">
                  <option value="" disabled>Choose a term</option>
                  <option>Autumn</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Any, we are flexible</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="ta-kind">Kind of visit</label>
                <select id="ta-kind" name="kind" defaultValue="Full day">
                  <option>Full day</option>
                  <option>Half day</option>
                  <option>Virtual visit</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="ta-note">Year groups, and how many children</label>
                <textarea id="ta-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send the request</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,5,4,4,1,1" className={s.footSea} aria-hidden="true">
          <TabbiedPattern
            pattern={papersea}
            palette={SHORE}
            fit="grid"
            cellSize={40}
            seed="ashwell-shore"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Tom Ashwell</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional author and illustrator. The books, prizes, schools, prices and address are invented.</p>
          <p>Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
        </div>
      </footer>
    </div>
  );
}
