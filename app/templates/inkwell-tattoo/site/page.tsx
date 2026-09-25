import { TabbiedPattern } from 'tabbied/react';
import { diamondconfetti, sparkle } from 'tabbied/patterns';
import s from './inkwell-tattoo.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Inkwell Tattoo: Tattoo studio, Harbor Row',
  description:
    'Inkwell Tattoo is a three-chair street shop on Harbor Row. Traditional flash off the wall for walk-ins, custom work by appointment, and plain rules about deposits.',
};

/* Site colors. The wallpaper behind the flash is the paper, pale and gray
   of the page itself, so it reads as a wall rather than as a picture. */
const PAPER = '#F4EFE6';
const INK = '#141414';
const RED = '#C8352B';
const GRAY = '#8A857C';
const PALE = '#E4DCCD';

const WALLPAPER = ['transparent', GRAY, PALE, PAPER, PALE];
const FILLER = ['transparent', INK, RED, PAPER, INK, RED, PALE];
const STARS = ['transparent', RED, PALE, GRAY];
const DISC = ['transparent', GRAY, PAPER, PALE, PAPER, PALE, PAPER, PALE];

const NAV = [
  ['Flash', '#flash'],
  ['Rules', '#rules'],
  ['Artists', '#artists'],
  ['Aftercare', '#aftercare'],
  ['Book', '#book'],
  ['Visit', '#visit'],
];

type Sheet = {
  no: string;
  art: string;
  alt: string;
  name: string;
  size: string;
  price: string;
  note: string;
  red: boolean;
  shape: 'plain' | 'tall' | 'feature';
  flip?: boolean;
};

const SHEETS: Sheet[] = [
  {
    no: '01',
    art: 'inkwell-tattoo-panther',
    alt: 'Flash design: a snarling panther head',
    name: 'Panther head',
    size: '5 in',
    price: '$260',
    note: 'Forearm or calf',
    red: false,
    shape: 'feature',
  },
  {
    no: '02',
    art: 'inkwell-tattoo-dagger',
    alt: 'Flash design: a dagger through a heart',
    name: 'Dagger through the heart',
    size: '6 in',
    price: '$220',
    note: 'Outer arm or shin',
    red: true,
    shape: 'tall',
  },
  {
    no: '03',
    art: 'inkwell-tattoo-rose',
    alt: 'Flash design: a rose with two leaves',
    name: 'Two-leaf rose',
    size: '4 in',
    price: '$180',
    note: 'Anywhere flat',
    red: true,
    shape: 'plain',
  },
  {
    no: '04',
    art: 'inkwell-tattoo-swallow',
    alt: 'Flash design: a swallow in flight',
    name: 'Homeward swallow',
    size: '3.5 in',
    price: '$150',
    note: 'Chest, hip or hand',
    red: false,
    shape: 'plain',
    flip: true,
  },
  {
    no: '06',
    art: 'inkwell-tattoo-rose',
    alt: 'Flash design: the rose in solid black',
    name: 'Black rose',
    size: '3 in',
    price: '$140',
    note: 'Wrist or ankle',
    red: false,
    shape: 'plain',
  },
  {
    no: '07',
    art: 'inkwell-tattoo-panther',
    alt: 'Flash design: the panther head in red',
    name: 'Red panther',
    size: '3 in',
    price: '$170',
    note: 'Upper arm',
    red: true,
    shape: 'plain',
  },
];

/* The last row of the wall, hung after the pair and the filler. */
const SHEETS_LOW: Sheet[] = [
  {
    no: '08',
    art: 'inkwell-tattoo-dagger',
    alt: 'Flash design: a small dagger and heart',
    name: 'Little dagger',
    size: '3 in',
    price: '$110',
    note: 'Behind the ear, ankle',
    red: false,
    shape: 'plain',
  },
  {
    no: '10',
    art: 'inkwell-tattoo-swallow',
    alt: 'Flash design: a small red swallow',
    name: 'Little swallow',
    size: '2 in',
    price: '$120',
    note: 'Inside the wrist',
    red: true,
    shape: 'plain',
  },
];

const RULES = [
  '18 and over, with photo ID. No exceptions and no parental consent.',
  'Flash is first come, first served, Tuesday to Saturday from noon.',
  'A flash design is tattooed as drawn. Swapping red for black is free; a redraw is custom work.',
  'Custom work is booked with a deposit, and the deposit comes off the final price.',
  'Move an appointment once with 48 hours of notice. After that the deposit is spent.',
  'Eat before you come. Bring one friend, not three.',
  'No hands, necks or faces as a first tattoo.',
  'Touch-ups inside three months are free, as long as you followed the aftercare.',
];

type Artist = {
  name: string;
  art: string;
  alt: string;
  style: string;
  days: string;
  rate: string;
  books: string;
  open: boolean;
  bio: string;
};

const ARTISTS: Artist[] = [
  {
    name: 'Dee Marlowe',
    art: 'inkwell-tattoo-rose',
    alt: 'A rose, the design Dee draws most',
    style: 'Traditional, bold red and black',
    days: 'Tuesday to Friday',
    rate: '$160 an hour',
    books: 'Books open for November',
    open: true,
    bio: 'Opened the shop in 2014 and drew most of the wall. Heavy outlines, three colors at most, built to still read in forty years.',
  },
  {
    name: 'Otis Kearne',
    art: 'inkwell-tattoo-panther',
    alt: 'A panther head, the design Otis draws most',
    style: 'Blackwork, animals and daggers',
    days: 'Wednesday to Saturday',
    rate: '$150 an hour',
    books: 'Books closed until January, walk-ins only',
    open: false,
    bio: 'Solid black and not much else. If you want a panther on your thigh, Otis has drawn about four hundred of them and is still improving.',
  },
  {
    name: 'Ines Vale',
    art: 'inkwell-tattoo-swallow',
    alt: 'A swallow, the design Ines draws most',
    style: 'Lettering, birds and small pieces',
    days: 'Tuesday, Thursday and Saturday',
    rate: '$140 an hour',
    books: 'Books open',
    open: true,
    bio: 'Does the lettering for the whole shop and most of the small, careful work. Good first-tattoo company, and patient with nerves.',
  },
];

const AFTERCARE = [
  {
    when: 'First 3 hours',
    what: 'Leave the wrap on. Then wash with warm water and unscented soap, and pat dry with a clean paper towel.',
  },
  {
    when: 'Days 1 to 3',
    what: 'Wash twice a day and put on a rice grain of unscented balm. It will weep a little. That is normal.',
  },
  {
    when: 'Days 4 to 14',
    what: 'It peels and it itches. Do not pick or scratch. No baths, pools, sea or sunbeds until it has stopped flaking.',
  },
  {
    when: 'Weeks 3 to 4',
    what: 'Shiny, then dull, then settled. Moisturize once a day, and book the free touch-up if a line looks light.',
  },
  {
    when: 'For good',
    what: 'Sunscreen, SPF 30 or more, every time it sees the sun. Red fades first, black lasts longest.',
  },
];

const DEPOSITS = [
  ['Flash from the wall', '$50', 'Only to hold a time. Walk-ins pay no deposit.'],
  ['Custom, up to palm size', '$80', 'Includes one round of changes to the drawing.'],
  ['Half day, 3 hours', '$150', 'For a forearm, a calf, a big chest piece started.'],
  ['Full day, 6 hours', '$300', 'Sleeves and backs, booked one sitting at a time.'],
  ['Cover-up consultation', 'Free', 'Twenty minutes in person, with good light.'],
];

const HOURS = [
  ['Tuesday to Friday', '12 to 8'],
  ['Saturday', '11 to 7'],
  ['Walk-ins', 'Until 6 pm'],
  ['Sunday and Monday', 'Closed'],
];

export default function InkwellTattooPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f4efe6',
        '--ink': '#141414',
        '--red': '#c8352b',
        '--gray': '#8a857c',
        '--pale': '#e4dccd',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,red,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Work+Sans:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Inkwell</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Book a slot</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------ FLASH WALL
            The hero and the shop at once: framed sheets hung on a wall
            papered in the primary pattern, with the house rules pinned in a
            sticky column beside them. */}
        <section id="flash" className={s.wall} aria-labelledby="hero-h">
          <div data-edit-pattern="flash.field" data-edit-roles="transparent,3,4,0,4" className={s.wallField} aria-hidden="true">
            <TabbiedPattern
              pattern={diamondconfetti}
              palette={WALLPAPER}
              fit="grid"
              cellSize={120}
              seed="inkwell-wall"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <div className={s.wallInner}>
            <div className={s.sheets}>
              <div className={s.titleCard}>
                <p data-edit="flash.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Street shop, three chairs, since 2014</p>
                <h1 data-edit="flash.title" data-edit-format="emphasis" data-edit-max="70" className={s.title} id="hero-h">
                  Flash off the wall.
                  <br />
                  <em>Custom on the books.</em>
                </h1>
                <p data-edit="flash.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                  Every sheet on this wall can be tattooed today, as drawn, by
                  whoever is free. Point at one, show us your ID, and sit down.
                  Anything else starts with a conversation and a deposit.
                </p>
                <dl className={s.facts}>
                  <div>
                    <dt data-edit="flash.term" data-edit-max="28">Walk-ins</dt>
                    <dd data-edit="flash.body" data-edit-max="200" data-edit-multiline>Tue to Sat, noon to 6</dd>
                  </div>
                  <div>
                    <dt data-edit="flash.term2" data-edit-max="28">Flash from</dt>
                    <dd data-edit="flash.body2" data-edit-max="200" data-edit-multiline>$110</dd>
                  </div>
                  <div>
                    <dt data-edit="flash.term3" data-edit-max="28">Shop minimum</dt>
                    <dd data-edit="flash.body3" data-edit-max="200" data-edit-multiline>$80</dd>
                  </div>
                </dl>
              </div>

              <div className={s.wallLabel}>
                <h2 data-edit="flash.wallHead" data-edit-max="60" className={s.wallHead}>On the wall this month</h2>
                <span data-edit="flash.wallNote" data-edit-max="60" className={s.wallNote}>Prices are for the size shown, in black or red</span>
              </div>

              {SHEETS.map((sh, i) => (
                <article
                  key={sh.no}
                  className={`${s.sheet} ${sh.shape === 'tall' ? s.sheetTall : ''} ${sh.shape === 'feature' ? s.sheetFeature : ''} ${sh.red ? s.sheetRed : ''}`}>
                  <div className={s.sheetTop}>
                    <span className={s.sheetNo}>{`No. ${sh.no}`}</span>
                    <span data-edit={`sheet.sheetSize.${i}`} data-edit-max="60" className={s.sheetSize}>{sh.size}</span>
                  </div>
                  <div className={s.sheetPaper}>
                    <Artwork
                      slug={sh.art}
                      alt={sh.alt}
                      inks={[sh.red ? 'var(--red)' : 'var(--ink)']}
                      className={`${s.flash} ${sh.flip ? s.flip : ''}`}
                    />
                  </div>
                  <div className={s.sheetFoot}>
                    <h3 data-edit={`sheet.sheetName.${i}`} data-edit-max="40" className={s.sheetName}>{sh.name}</h3>
                    <span data-edit={`sheet.sheetPrice.${i}`} data-edit-max="60" className={s.sheetPrice}>{sh.price}</span>
                    <span data-edit={`sheet.sheetNote.${i}`} data-edit-max="60" className={s.sheetNote}>{sh.note}</span>
                  </div>
                </article>
              ))}

              <article className={`${s.sheet} ${s.sheetWide} ${s.sheetRed}`}>
                <div className={s.sheetTop}>
                  <span data-edit="sheet.sheetNo" data-edit-max="60" className={s.sheetNo}>No. 05</span>
                  <span data-edit="sheet.sheetSize2" data-edit-max="60" className={s.sheetSize}>2.5 in each</span>
                </div>
                <div className={`${s.sheetPaper} ${s.pairPaper}`}>
                  <Artwork
                    slug="inkwell-tattoo-swallow"
                    alt="Flash design: a swallow facing right"
                    inks={['var(--red)']}
                    className={`${s.flash} ${s.pairBird}`}
                  />
                  <Artwork
                    slug="inkwell-tattoo-swallow"
                    alt="Flash design: a swallow facing left"
                    inks={['var(--ink)']}
                    className={`${s.flash} ${s.pairBird} ${s.flip}`}
                  />
                </div>
                <div className={s.sheetFoot}>
                  <h3 data-edit="sheet.sheetName2" data-edit-max="40" className={s.sheetName}>A pair of swallows</h3>
                  <span data-edit="sheet.sheetPrice2" data-edit-max="60" className={s.sheetPrice}>$240</span>
                  <span data-edit="sheet.sheetNote2" data-edit-max="60" className={s.sheetNote}>Collarbones, one each side. Tattooed together, one sitting.</span>
                </div>
              </article>

              <article className={`${s.sheet} ${s.sheetFiller}`}>
                <div className={s.sheetTop}>
                  <span data-edit="sheet.sheetNo2" data-edit-max="60" className={s.sheetNo}>No. 09</span>
                  <span data-edit="sheet.sheetSize3" data-edit-max="60" className={s.sheetSize}>Per inch</span>
                </div>
                <div data-edit-pattern="sheet.field" data-edit-roles="transparent,1,2,0,1,2,4" className={s.fillerField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={diamondconfetti}
                    palette={FILLER}
                    fit="grid"
                    cellSize={120}
                    seed="inkwell-filler"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.sheetFoot}>
                  <h3 data-edit="sheet.sheetName3" data-edit-max="40" className={s.sheetName}>Diamond band filler</h3>
                  <span data-edit="sheet.sheetPrice3" data-edit-max="60" className={s.sheetPrice}>$30</span>
                  <span data-edit="sheet.sheetNote3" data-edit-max="60" className={s.sheetNote}>Armbands and gaps between old pieces</span>
                </div>
              </article>
              {SHEETS_LOW.map((sh, i) => (
                <article key={sh.no} className={`${s.sheet} ${sh.red ? s.sheetRed : ''}`}>
                  <div className={s.sheetTop}>
                    <span className={s.sheetNo}>{`No. ${sh.no}`}</span>
                    <span data-edit={`sheet.sheetSize4.${i}`} data-edit-max="60" className={s.sheetSize}>{sh.size}</span>
                  </div>
                  <div className={s.sheetPaper}>
                    <Artwork
                      slug={sh.art}
                      alt={sh.alt}
                      inks={[sh.red ? 'var(--red)' : 'var(--ink)']}
                      className={s.flash}
                    />
                  </div>
                  <div className={s.sheetFoot}>
                    <h3 data-edit={`sheet.sheetName4.${i}`} data-edit-max="40" className={s.sheetName}>{sh.name}</h3>
                    <span data-edit={`sheet.sheetPrice4.${i}`} data-edit-max="60" className={s.sheetPrice}>{sh.price}</span>
                    <span data-edit={`sheet.sheetNote4.${i}`} data-edit-max="60" className={s.sheetNote}>{sh.note}</span>
                  </div>
                </article>
              ))}
            </div>

            <aside id="rules" className={s.rules} aria-labelledby="rules-h">
              <div className={s.rulesInner}>
                <span data-edit="rules.rulesTag" data-edit-max="60" className={s.rulesTag}>Read before you sit</span>
                <h2 data-edit="rules.rulesHead" data-edit-max="60" className={s.rulesHead} id="rules-h">House rules</h2>
                <ol className={s.rulesList}>
                  {RULES.map((r, i) => (
                    <li data-edit={`rules.item.${i}`} data-edit-max="80" key={r}>{r}</li>
                  ))}
                </ol>
                <div className={s.today}>
                  <span data-edit="rules.todayLabel" data-edit-max="60" className={s.todayLabel}>Walk-in board</span>
                  <p data-edit="rules.todayText" data-edit-max="240" data-edit-multiline className={s.todayText}>Two chairs free most weekdays before 3. Saturdays fill by 2.</p>
                </div>
                <a data-edit="rules.rulesCta" data-edit-max="28" className={s.rulesCta} href="#book">Book custom work</a>
              </div>
            </aside>
          </div>
        </section>

        {/* --------------------------------------------------------- ARTISTS */}
        <section id="artists" className={s.sec} aria-labelledby="artists-h">
          <div className={s.secHead}>
            <span data-edit="artists.secNo" data-edit-max="60" className={s.secNo}>02</span>
            <h2 data-edit="artists.secTitle" data-edit-max="60" className={s.secTitle} id="artists-h">Three chairs, three hands</h2>
            <p data-edit="artists.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Everyone tattoos from the wall. Custom work goes to whoever draws
              that kind of thing best, and we will tell you if it is not us.
            </p>
          </div>
          <div className={s.artists}>
            {ARTISTS.map((a, i) => (
              <article key={a.name} className={s.artist}>
                <div className={s.artistPlate}>
                  <span data-edit-pattern={`artist.field.${i}`} data-edit-roles="transparent,2,4,3" className={s.plateStars} aria-hidden="true">
                    <TabbiedPattern
                      pattern={sparkle}
                      palette={STARS}
                      fit="grid"
                      cellSize={40}
                      options={{ frequency: 0.4 }}
                      seed={`inkwell-plate-${i}`}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </span>
                  <Artwork slug={a.art} alt={a.alt} inks={['var(--paper)']} className={s.artistArt} />
                </div>
                <h3 data-edit={`artist.artistName.${i}`} data-edit-max="40" className={s.artistName}>{a.name}</h3>
                <p data-edit={`artist.artistStyle.${i}`} data-edit-max="240" data-edit-multiline className={s.artistStyle}>{a.style}</p>
                <p data-edit={`artist.artistBio.${i}`} data-edit-max="240" data-edit-multiline className={s.artistBio}>{a.bio}</p>
                <dl className={s.artistFacts}>
                  <div>
                    <dt data-edit={`artist.term.${i}`} data-edit-max="28">In the shop</dt>
                    <dd data-edit={`artist.body.${i}`} data-edit-max="200" data-edit-multiline>{a.days}</dd>
                  </div>
                  <div>
                    <dt data-edit={`artist.term2.${i}`} data-edit-max="28">Custom rate</dt>
                    <dd data-edit={`artist.body2.${i}`} data-edit-max="200" data-edit-multiline>{a.rate}</dd>
                  </div>
                </dl>
                <span data-edit={`artist.booksOpen.${i}`} data-edit-max="60" className={a.open ? s.booksOpen : s.booksShut}>{a.books}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- AFTERCARE
            The one dark section: stars on the ink, the way a sheet of flash
            fills its gaps. */}
        <section id="aftercare" className={s.care} aria-labelledby="care-h">
          <div data-edit-pattern="aftercare.field" data-edit-roles="transparent,2,4,3" className={s.careField} aria-hidden="true">
            <TabbiedPattern
              pattern={sparkle}
              palette={STARS}
              fit="grid"
              cellSize={72}
              options={{ frequency: 0.3 }}
              redrawInterval={8000}
              seed="inkwell-stars"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.careInner}>
            <div className={s.secHead}>
              <span data-edit="aftercare.secNo" data-edit-max="60" className={s.secNo}>03</span>
              <h2 data-edit="aftercare.secTitle" data-edit-max="60" className={s.secTitle} id="care-h">Aftercare, on one card</h2>
              <p data-edit="aftercare.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                You get this card in your pocket on the way out. Most bad
                healing is somebody being too kind to a new tattoo.
              </p>
            </div>
            <ol className={s.careSteps}>
              {AFTERCARE.map((c, i) => (
                <li key={c.when}>
                  <span className={s.careNo}>{`0${i + 1}`}</span>
                  <h3 data-edit={`aftercare.careWhen.${i}`} data-edit-max="40" className={s.careWhen}>{c.when}</h3>
                  <p data-edit={`aftercare.careWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.careWhat}>{c.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------ DEPOSITS AND BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.secHead}>
            <span data-edit="book.secNo" data-edit-max="60" className={s.secNo}>04</span>
            <h2 data-edit="book.secTitle" data-edit-max="60" className={s.secTitle} id="book-h">Deposits and booking</h2>
            <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A deposit holds the time and pays for the drawing. It comes off
              the price on the day, and it is refunded if we cancel.
            </p>
          </div>
          <div className={s.book}>
            <div className={s.deposits}>
              <h3 data-edit="book.bookHead" data-edit-max="40" className={s.bookHead}>What a deposit holds</h3>
              <ul className={s.depositList}>
                {DEPOSITS.map(([what, cost, note], i) => (
                  <li key={what}>
                    <span data-edit={`book.depWhat.${i}`} data-edit-max="60" className={s.depWhat}>{what}</span>
                    <span data-edit={`book.depCost.${i}`} data-edit-max="60" className={s.depCost}>{cost}</span>
                    <span data-edit={`book.depNote.${i}`} data-edit-max="60" className={s.depNote}>{note}</span>
                  </li>
                ))}
              </ul>
              <div className={s.bookArt}>
                <Artwork
                  slug="inkwell-tattoo-dagger"
                  alt=""
                  inks={['var(--red)']}
                  className={s.bookDagger}
                />
                <p data-edit="book.bookArtNote" data-edit-max="240" data-edit-multiline className={s.bookArtNote}>
                  Deposits are paid by card through the link in our reply. We
                  never take one over the phone.
                </p>
              </div>
            </div>

            <form className={s.form} action="#">
              <div data-edit-pattern="book.field" data-edit-roles="transparent,1,2,0,1,2,4" className={s.formBand} aria-hidden="true">
                <TabbiedPattern
                  pattern={diamondconfetti}
                  palette={FILLER}
                  fit="grid"
                  cellSize={60}
                  seed="inkwell-armband"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="book.bookHead2" data-edit-max="40" className={s.bookHead}>Ask for a slot</h3>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="book.text" data-edit-max="60">Your name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className={s.field}>
                  <span data-edit="book.text2" data-edit-max="60">Email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
              </div>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="book.text3" data-edit-max="60">Artist</span>
                  <select name="artist" defaultValue="any">
                    <option value="any">First available</option>
                    <option value="dee">Dee Marlowe</option>
                    <option value="otis">Otis Kearne (walk-ins only)</option>
                    <option value="ines">Ines Vale</option>
                  </select>
                </label>
                <label className={s.field}>
                  <span data-edit="book.text4" data-edit-max="60">What kind</span>
                  <select name="kind" defaultValue="flash">
                    <option value="flash">Flash from the wall</option>
                    <option value="custom">Custom drawing</option>
                    <option value="cover">Cover-up</option>
                  </select>
                </label>
              </div>
              <div className={s.formRow}>
                <label className={s.field}>
                  <span data-edit="book.text5" data-edit-max="60">Placement</span>
                  <input type="text" name="placement" placeholder="Outer forearm" />
                </label>
                <label className={s.field}>
                  <span data-edit="book.text6" data-edit-max="60">Rough size (inches)</span>
                  <input type="text" name="size" placeholder="4" inputMode="decimal" />
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="book.text7" data-edit-max="60">The idea, in a few lines</span>
                <textarea name="idea" rows={4} placeholder="Sheet No. 03, but with the leaves in black" />
              </label>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send the request</button>
              <small data-edit="book.formNote" className={s.formNote}>We reply within three working days with a price and a deposit link.</small>
            </form>
          </div>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInner}>
            <div className={s.visitText}>
              <span data-edit="visit.secNo" data-edit-max="60" className={s.secNo}>05</span>
              <h2 data-edit="visit.secTitle" data-edit-max="60" className={s.secTitle} id="visit-h">Up the stairs on Harbor Row</h2>
              <p data-edit="visit.visitAddr" data-edit-max="240" data-edit-multiline className={s.visitAddr}>418 Harbor Row, second floor, above the bike shop</p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`visit.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="visit.visitNote" data-edit-max="240" data-edit-multiline className={s.visitNote}>
                Street parking is free after 6. The stairs are steep; if they
                are a problem, call and we will tattoo you in the ground-floor
                room.
              </p>
              <ul className={s.contact}>
                <li>
                  <a data-edit="visit.link" data-edit-max="28" href="tel:+15550142290">(555) 014-2290</a>
                </li>
                <li>
                  <a data-edit="visit.link2" data-edit-max="28" href="mailto:book@inkwell.example">book@inkwell.example</a>
                </li>
              </ul>
            </div>
            <div className={s.visitArt}>
              <div data-edit-pattern="visit.field" data-edit-roles="transparent,3,0,4,0,4,0,4" className={s.visitDisc} aria-hidden="true">
                <TabbiedPattern
                  pattern={diamondconfetti}
                  palette={DISC}
                  fit="grid"
                  cellSize={120}
                  seed="inkwell-disc"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="inkwell-tattoo-swallow"
                alt=""
                inks={['var(--red)']}
                className={s.visitBird}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,0,1,2,4" className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={diamondconfetti}
            palette={FILLER}
            fit="grid"
            cellSize={120}
            seed="inkwell-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Inkwell Tattoo</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Flash off the wall, custom on the books. 418 Harbor Row.</p>
          <div className={s.footFine}>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional tattoo studio. Prices, artists and hours are invented.</p>
            <p>
              <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
              <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
              <span data-edit="footer.text2" data-edit-max="60">, drawn live in the shop's own colors.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
