import { TabbiedPattern } from 'tabbied/react';
import { charcoal } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './wren-hale-illustration.module.css';

export const metadata = {
  title: 'Wren Hale: Illustrator, editorial, books and commissions',
  description:
    'Wren Hale draws covers, spot illustrations, maps and portraits for magazines, publishers and people. Prices, a print shop, and how to brief her in six lines.',
};

/* Site colors, the same hexes as the stylesheet's root rule: cartridge
   paper, graphite, and the four sticks she keeps in the tin. Charcoal, the
   broad blunt strokes, is the drawing on every page of the sketchbook: the
   right-hand page of the hero, the three framed prints, a torn strip
   between sections and the last page in the footer. */
const PAPER = '#f5f0e6';
const GRAPHITE = '#262320';
const VERMILION = '#d8452e';
const COBALT = '#2c5aa0';
const SUN = '#f2c14e';
const MINT = '#6fbf9f';

const SPREAD = ['transparent', GRAPHITE, VERMILION, COBALT, SUN, MINT];
const PRINT_DUSK = [COBALT, SUN, PAPER, VERMILION, SUN, MINT];
const PRINT_GULL = ['transparent', GRAPHITE, COBALT, GRAPHITE, MINT, COBALT];
const PRINT_FENNEL = [MINT, GRAPHITE, PAPER, SUN, GRAPHITE, VERMILION];
const STRIP = [GRAPHITE, VERMILION, SUN, PAPER, MINT, COBALT];

const NAV = [
  ['Commissions', '#commissions'],
  ['Editorial', '#editorial'],
  ['Print shop', '#prints'],
  ['How to brief me', '#brief'],
  ['Contact', '#contact'],
];

type Commission = { what: string; get: string; time: string; from: string };

const COMMISSIONS: Commission[] = [
  { what: 'Spot illustration', get: 'One small drawing for a page or a post, black and one color', time: '1 week', from: '$450' },
  { what: 'Editorial, full page', get: 'A full-page or opening spread, three ideas to choose from', time: '2 weeks', from: '$1,200' },
  { what: 'Book cover', get: 'Front, spine and back, hand-lettered title if you want it', time: '4-6 weeks', from: '$3,800' },
  { what: 'Map or diagram', get: 'A drawn map for a town, a trail, a festival or a museum', time: '3-4 weeks', from: '$2,200' },
  { what: 'House or pet portrait', get: 'An A4 drawing on paper, posted flat, framed on request', time: '3 weeks', from: '$650' },
  { what: 'Picture book', get: 'Thirty-two pages with your publisher, roughs to finals', time: '6-9 months', from: '$14,000' },
];

const CLIENTS = [
  'The Weekend Ledger',
  'Fieldnote Quarterly',
  'Harbor Review',
  'Commons Magazine',
  'Allotment Gazette',
  'Northline Rail',
  'Bramble and Wick Books',
  'City of Ashmere Museums',
  'The Long Table',
  'Parcel Press',
];

const TEARSHEETS = [
  ['Fieldnote Quarterly', 'Cover, the river issue', 'Spring 2026'],
  ['The Weekend Ledger', 'Twelve spots for the gardening column', '2025, weekly'],
  ['Northline Rail', 'Station posters for the coast line', 'Summer 2025'],
];

const STEPS = [
  ['What it is for', 'Where it will appear, at what size, in print or on a screen. A cover and a social post are different drawings.'],
  ['When you need it', 'The final date, and the date you need roughs if a committee has to see them.'],
  ['The budget', 'Even a range. It decides how many ideas I can draw before we choose one.'],
  ['How it will be used', 'Where, for how long and how many copies. The fee includes a license; buying the rights outright costs more.'],
  ['Three pictures you like', 'Mine or anyone else\'s. One you do not like is just as useful.'],
  ['The words', 'The article, the chapter or the blurb. I draw from the text, not from a summary of it.'],
];

const PROCESS = [
  ['Thumbnails', 'Three ideas in pencil, two days after the brief'],
  ['Rough', 'One idea worked up at size, one round of changes'],
  ['Final', 'Inked and colored, one round of small changes'],
  ['Files', 'Print-ready TIFF and PDF, or layered files for animation'],
];

export default function WrenHaleIllustrationPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f5f0e6',
        '--graphite': '#262320',
        '--vermilion': '#d8452e',
        '--cobalt': '#2c5aa0',
        '--sun': '#f2c14e',
        '--mint': '#6fbf9f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,graphite,vermilion,cobalt,sun,mint"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;700&family=Caveat:wght@500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Wren Hale</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Illustration</span>
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

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The open sketchbook: words on the left page, a drawing on the
            right, the spiral down the middle. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.book}>
            <div className={s.leftPage}>
              <p data-edit="intro.note" data-edit-max="240" data-edit-multiline className={s.note}>Sketchbook no. 31, started in March</p>
              <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Drawings for when a photograph <em>will not say it.</em>
              </h1>
              <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                I am Wren Hale, an illustrator working from a room over the frame
                shop on Tanner Row. I draw covers, spot illustrations, maps and
                portraits for magazines, publishers, museums and the occasional
                person who wants their house on the wall.
              </p>
              <div className={s.heroActions}>
                <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#contact">Start a commission</a>
                <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#prints">Buy a print</a>
              </div>
              <p data-edit="intro.available" data-edit-max="240" data-edit-multiline className={s.available}>Booking from July. Two editorial slots open in June.</p>
            </div>
            <div className={s.spiral} aria-hidden="true" />
            <div className={s.rightPage}>
              <div data-edit-pattern="intro.field" data-edit-roles="transparent,1,2,3,4,5" className={s.drawing} aria-hidden="true">
                <TabbiedPattern
                  pattern={charcoal}
                  palette={SPREAD}
                  fit="grid"
                  cellSize={58}
                  seed="wh-spread"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.tapeA} aria-hidden="true" />
              <span className={s.tapeB} aria-hidden="true" />
              <p data-edit="intro.drawingNote" data-edit-max="240" data-edit-multiline className={s.drawingNote}>Studies for the river cover, charcoal and four sticks of pastel</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- COMMISSIONS
            The price list taped inside the back cover. */}
        <section id="commissions" className={s.sec} aria-labelledby="commissions-h">
          <div className={s.secHead}>
            <p data-edit="commissions.note" data-edit-max="240" data-edit-multiline className={s.note}>Commissions</p>
            <h2 data-edit="commissions.secTitle" data-edit-max="60" id="commissions-h" className={s.secTitle}>What I draw, and what it costs</h2>
            <p data-edit="commissions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Starting prices for a one-year license in one country. Most
              projects land within a few hundred dollars of these.
            </p>
          </div>
          <div className={s.priceSheet}>
            <span className={s.tapeC} aria-hidden="true" />
            <table className={s.prices}>
              <caption data-edit="commissions.srOnly" className={s.srOnly}>Commission types, what is included, time and starting price</caption>
              <thead>
                <tr>
                  <th data-edit="commissions.heading" scope="col">Commission</th>
                  <th data-edit="commissions.heading2" scope="col">What you get</th>
                  <th data-edit="commissions.heading3" scope="col">Time</th>
                  <th data-edit="commissions.from" scope="col" className={s.from}>From</th>
                </tr>
              </thead>
              <tbody>
                {COMMISSIONS.map((c, i) => (
                  <tr key={c.what}>
                    <th data-edit={`commissions.heading4.${i}`} scope="row">{c.what}</th>
                    <td data-edit={`commissions.cell.${i}`}>{c.get}</td>
                    <td data-edit={`commissions.time.${i}`} className={s.time}>{c.time}</td>
                    <td data-edit={`commissions.from2.${i}`} className={s.from}>{c.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p data-edit="commissions.sheetNote" data-edit-max="240" data-edit-multiline className={s.sheetNote}>Buying the rights outright adds half again. Rush work, under five days, adds a third.</p>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="1,2,4,0,5,3" className={s.torn} aria-hidden="true">
          <TabbiedPattern
            pattern={charcoal}
            palette={STRIP}
            fit="grid"
            cellSize={44}
            seed="wh-torn"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- EDITORIAL */}
        <section id="editorial" className={s.sec} aria-labelledby="editorial-h">
          <div className={s.editorialGrid}>
            <div>
              <p data-edit="editorial.note" data-edit-max="240" data-edit-multiline className={s.note}>Editorial</p>
              <h2 data-edit="editorial.secTitle" data-edit-max="60" id="editorial-h" className={s.secTitle}>Drawn for these pages</h2>
              <p data-edit="editorial.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Ten years of deadlines, most of them on a Thursday. Art
                directors get thumbnails in two days and a final they can drop
                straight into the layout.
              </p>
              <ul className={s.clients}>
                {CLIENTS.map((c, i) => (
                  <li data-edit={`editorial.item.${i}`} data-edit-max="80" key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <ul className={s.tears}>
              {TEARSHEETS.map(([pub, job, when], i) => (
                <li key={pub} className={s.tear}>
                  <p data-edit={`editorial.tearPub.${i}`} data-edit-max="240" data-edit-multiline className={s.tearPub}>{pub}</p>
                  <p data-edit={`editorial.tearJob.${i}`} data-edit-max="240" data-edit-multiline className={s.tearJob}>{job}</p>
                  <p data-edit={`editorial.tearWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.tearWhen}>{when}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ PRINT SHOP
            Three drawings, framed. */}
        <section id="prints" className={s.sec} aria-labelledby="prints-h">
          <div className={s.secHead}>
            <p data-edit="prints.note" data-edit-max="240" data-edit-multiline className={s.note}>Print shop</p>
            <h2 data-edit="prints.secTitle" data-edit-max="60" id="prints-h" className={s.secTitle}>Prints, signed and numbered</h2>
            <p data-edit="prints.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Giclee on 310 gsm cotton rag, editions of 50. Posted rolled in a
              tube, or framed in oak by the shop downstairs.
            </p>
          </div>
          <ul className={s.prints}>
            <li className={s.print}>
              <div className={s.frame}>
                <div data-edit-pattern="prints.field" data-edit-roles="3,4,0,2,4,5" className={s.printArt} aria-hidden="true">
                  <TabbiedPattern
                    pattern={charcoal}
                    palette={PRINT_DUSK}
                    fit="grid"
                    cellSize={40}
                    seed="wh-print-dusk"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <h3 data-edit="prints.printTitle" data-edit-max="40" className={s.printTitle}>Lantern Street at dusk</h3>
              <p data-edit="prints.printSpec" data-edit-max="240" data-edit-multiline className={s.printSpec}>A3, edition of 50</p>
              <p data-edit="prints.printPrice" data-edit-max="240" data-edit-multiline className={s.printPrice}>$95 unframed, $210 framed</p>
            </li>
            <li className={s.print}>
              <div className={s.frame}>
                <div data-edit-pattern="prints.field2" data-edit-roles="transparent,1,3,1,5,3" className={s.printArt} aria-hidden="true">
                  <TabbiedPattern
                    pattern={charcoal}
                    palette={PRINT_GULL}
                    fit="grid"
                    cellSize={34}
                    seed="wh-print-gull"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <h3 data-edit="prints.printTitle2" data-edit-max="40" className={s.printTitle}>Gull season</h3>
              <p data-edit="prints.printSpec2" data-edit-max="240" data-edit-multiline className={s.printSpec}>A3, edition of 50</p>
              <p data-edit="prints.printPrice2" data-edit-max="240" data-edit-multiline className={s.printPrice}>$95 unframed, $210 framed</p>
            </li>
            <li className={s.print}>
              <div className={s.frame}>
                <div data-edit-pattern="prints.field3" data-edit-roles="5,1,0,4,1,2" className={s.printArt} aria-hidden="true">
                  <TabbiedPattern
                    pattern={charcoal}
                    palette={PRINT_FENNEL}
                    fit="grid"
                    cellSize={46}
                    seed="wh-print-fennel"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <h3 data-edit="prints.printTitle3" data-edit-max="40" className={s.printTitle}>Fennel and rain</h3>
              <p data-edit="prints.printSpec3" data-edit-max="240" data-edit-multiline className={s.printSpec}>A2, edition of 30</p>
              <p data-edit="prints.printPrice3" data-edit-max="240" data-edit-multiline className={s.printPrice}>$140 unframed, $290 framed</p>
            </li>
          </ul>
        </section>

        {/* ----------------------------------------------------------- BRIEF
            Six lines on a page of the notebook, then how it goes. */}
        <section id="brief" className={s.sec} aria-labelledby="brief-h">
          <div className={s.briefGrid}>
            <div className={s.notebook}>
              <p data-edit="brief.note" data-edit-max="240" data-edit-multiline className={s.note}>How to brief me</p>
              <h2 data-edit="brief.secTitle" data-edit-max="60" id="brief-h" className={s.secTitle}>Six lines is all I need</h2>
              <ol className={s.lines}>
                {STEPS.map(([title, text], i) => (
                  <li key={title} className={s.line}>
                    <span className={s.lineNo}>{i + 1}</span>
                    <h3 data-edit={`brief.lineTitle.${i}`} data-edit-max="40" className={s.lineTitle}>{title}</h3>
                    <p data-edit={`brief.lineText.${i}`} data-edit-max="240" data-edit-multiline className={s.lineText}>{text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.process}>
              <h3 data-edit="brief.processTitle" data-edit-max="40" className={s.processTitle}>Then it goes like this</h3>
              <ol className={s.stages}>
                {PROCESS.map(([stage, text], i) => (
                  <li key={stage} className={s.stage}>
                    <span data-edit={`brief.stageName.${i}`} data-edit-max="60" className={s.stageName}>{stage}</span>
                    <span data-edit={`brief.stageText.${i}`} data-edit-max="60" className={s.stageText}>{text}</span>
                  </li>
                ))}
              </ol>
              <p data-edit="brief.terms" data-edit-max="240" data-edit-multiline className={s.terms}>
                Private commissions pay half to start and half on delivery.
                Publishers and agencies on 30 days. A killed job is paid for the
                stage it reached.
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.card}>
              <p data-edit="contact.note" data-edit-max="240" data-edit-multiline className={s.note}>Contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Write to the studio</h2>
              <p data-edit="contact.cardLine" data-edit-max="240" data-edit-multiline className={s.cardLine}>Studio 2, 17 Tanner Row, over Hale and Daughter Framing</p>
              <p className={s.cardLink}>
                <a data-edit="contact.link" data-edit-max="28" href="mailto:studio@wrenhale.example">studio@wrenhale.example</a>
              </p>
              <p className={s.cardLink}>
                <a data-edit="contact.link2" data-edit-max="28" href="tel:+15550193372">(555) 019-3372</a>
              </p>
              <dl className={s.hours}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Email answered</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Monday to Thursday</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Studio visits</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Fridays, 10:00-4:00, by appointment</dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Represented by</dt>
                  <dd data-edit="contact.body3" data-edit-max="200" data-edit-multiline>Nobody. You get me.</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="wh-name">Your name</label>
                <input id="wh-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="wh-email">Email</label>
                <input id="wh-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="wh-kind">What kind of drawing</label>
                <select id="wh-kind" name="kind" defaultValue={COMMISSIONS[1].what}>
                  {COMMISSIONS.map((c) => (
                    <option key={c.what} value={c.what}>{c.what}</option>
                  ))}
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="wh-date">Needed by</label>
                <input id="wh-date" name="date" type="date" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label5" htmlFor="wh-brief">The six lines, or as many as you have</label>
                <textarea id="wh-brief" name="brief" rows={6} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send the brief</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>I reply within three working days, with a yes, a no, or a question.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,3,4,5" className={s.footArt} aria-hidden="true">
          <TabbiedPattern
            pattern={charcoal}
            palette={SPREAD}
            fit="grid"
            cellSize={36}
            seed="wh-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Wren Hale</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional illustrator. The artist, clients, prices and address
            are invented.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
