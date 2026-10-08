import { TabbiedPattern } from 'tabbied/react';
import { sliver } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './red-pencil-editing.module.css';

export const metadata = {
  title: 'Red Pencil Editing: Copy editor and proofreader',
  description:
    'Red Pencil Editing proofreads, copyedits and line edits books, reports and websites. Clear rates per thousand words, a turnaround you can plan around, and every change tracked.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The sliver is
   what an editor's desk collects: thin strokes strewn at every angle, like
   the marks of a red pencil, a blue one and a highlighter, and the
   shavings from sharpening them. It covers the desk in the hero, runs as a
   band between the rates and the turnaround, fills the pencil tray and
   edges the footer. */
const PAPER = '#fbfaf6';
const INK = '#1c1c22';
const RED = '#d1312b';
const BLUE = '#4a7fd4';
const YELLOW = '#f2d34f';

const DESK = ['transparent', INK, RED, BLUE, YELLOW, RED];
const SHAVINGS = ['transparent', RED, YELLOW, BLUE, RED, INK];
const NIGHT = ['transparent', RED, YELLOW, BLUE, PAPER, RED];

const NAV = [
  ['Marks', '#marks'],
  ['Services', '#services'],
  ['Rates', '#rates'],
  ['Turnaround', '#turnaround'],
  ['A sample', '#sample'],
  ['Contact', '#contact'],
];

type Mark = { glyph: string; shape: string; name: string; asks: string; ex: string[][]; after: string };

/* The proofreading marks, each with a line it corrects. The glyph is what
   goes in the margin; shape names a mark drawn in CSS instead. */
const MARKS: Mark[] = [
  { glyph: '', shape: 'gDelete', name: 'Delete', asks: 'Take it out.', ex: [['', 'a '], ['strike', 'very'], ['', ' unique idea']], after: 'a unique idea' },
  { glyph: '^', shape: 'gText', name: 'Insert', asks: 'Add what is written in the margin.', ex: [['', 'fixed'], ['caret', ' '], ['', 'the errors']], after: 'fixed all the errors' },
  { glyph: '', shape: 'gClose', name: 'Close up', asks: 'Remove the space.', ex: [['', 'proof'], ['close', ' '], ['', 'read']], after: 'proofread' },
  { glyph: '#', shape: 'gText', name: 'Insert space', asks: 'Add a space here.', ex: [['', 'a'], ['caret', ' '], ['', 'lot of care']], after: 'a lot of care' },
  { glyph: 'tr', shape: 'gText', name: 'Transpose', asks: 'Swap these round.', ex: [['', 'rec'], ['swap', 'ie'], ['', 've']], after: 'receive' },
  { glyph: 'cap', shape: 'gText', name: 'Capital', asks: 'Make it upper case.', ex: [['under', 'paris'], ['', ' in the spring']], after: 'Paris in the spring' },
  { glyph: 'lc', shape: 'gText', name: 'Lower case', asks: 'Make it lower case.', ex: [['', 'the '], ['slash', 'Summer'], ['', ' issue']], after: 'the summer issue' },
  { glyph: 'ital', shape: 'gText', name: 'Italic', asks: 'Set it in italics.', ex: [['', 'a review of '], ['single', 'The Long Field']], after: 'a review of The Long Field, in italics' },
  { glyph: '', shape: 'gPara', name: 'New paragraph', asks: 'Start a new paragraph here.', ex: [['bracket', 'She left.'], ['', ' The next day']], after: 'The next day begins a paragraph' },
  { glyph: 'stet', shape: 'gText', name: 'Let it stand', asks: 'Ignore my change; keep the original.', ex: [['', 'a '], ['dots', 'deliberate'], ['', ' choice']], after: 'a deliberate choice' },
];

type Service = { name: string; per: string; catches: string; when: string };

/* The ladder, from the lightest pass to the deepest. */
const SERVICES: Service[] = [
  { name: 'Proofread', per: '$14 per 1,000 words', catches: 'Typos, doubled words, bad breaks, inconsistent numbers, the missing period.', when: 'The text is final and laid out. Last pass before print or launch.' },
  { name: 'Copyedit', per: '$22 per 1,000 words', catches: 'Grammar, spelling, house style, consistency of names and terms, facts that contradict each other.', when: 'The draft is finished and you are happy with what it says.' },
  { name: 'Line edit', per: '$32 per 1,000 words', catches: 'Sentences that drag, paragraphs that repeat, a voice that wanders, jargon.', when: 'It says the right things but does not yet read well.' },
  { name: 'Developmental edit', per: '$40 per 1,000 words', catches: 'Structure, argument, pacing, what is missing and what should go. A ten-page letter.', when: 'A full draft that is not working and you cannot see why.' },
];

const RATES = [
  ['Proofread', '$14', '$840', '$60'],
  ['Copyedit', '$22', '$1,320', '$60'],
  ['Line edit', '$32', '$1,920', '$64'],
  ['Developmental edit', '$40', '$2,400', 'Not offered'],
];

const TURNAROUND = [
  ['Up to 5,000 words', '2 working days', 't1'],
  ['5,000 to 20,000', '5 working days', 't2'],
  ['20,000 to 60,000', '2 weeks', 't3'],
  ['60,000 to 120,000', '3 to 4 weeks', 't4'],
];

/* A paragraph from last week's pile, marked up. */
const SAMPLE = [
  ['', 'The committee have '],
  ['strike', 'basically '],
  ['', 'agreed that the new libary '],
  ['caret', ' '],
  ['', 'will open in the Spring, '],
  ['strike', 'which is '],
  ['', 'a full year later then planned.'],
];

const CLEAN = 'The committee has agreed that the new library will open in the spring, a full year later than planned.';

const NOTES = [
  ['Collective noun', 'US style takes the singular: has.'],
  ['Basically', 'Adds nothing; cut.'],
  ['Libary', 'Spelling, and it appears four times.'],
  ['Spring', 'Seasons are lower case in this house style.'],
  ['Then', 'Comparison: than.'],
];

const GUIDES = ['Chicago Manual of Style', 'AP Stylebook', 'APA and MLA', 'Your house style sheet'];

export default function RedPencilEditingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fbfaf6',
        '--ink': '#1c1c22',
        '--red': '#d1312b',
        '--blue': '#4a7fd4',
        '--yellow': '#f2d34f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,red,blue,yellow"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&family=Kalam:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Red Pencil</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Editing</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barQuote" data-edit-max="28" className={s.barQuote} href="#contact">Get a quote</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A manuscript page on a desk strewn with pencil marks and
            shavings, already marked up in the margin. */}
        <section id="welcome" className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="welcome.field" data-edit-roles="transparent,1,2,3,4,2" className={s.desk} aria-hidden="true">
            <TabbiedPattern
              pattern={sliver}
              palette={DESK}
              fit="grid"
              cellSize={54}
              seed="redpencil-desk"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.sheet}>
              <p data-edit="welcome.slug" data-edit-max="240" data-edit-multiline className={s.slug}>MS page 1 of 1. Copyedit, second pass.</p>
              <p data-edit="welcome.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Copy editor and proofreader</p>
              <h1 data-edit="welcome.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Clean copy, <em>to the letter.</em>
              </h1>
              <p data-edit="welcome.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                I am Nell Ashdown. For twelve years I have read other people's
                books, reports and websites for a living, catching the typo on
                page 200 and the name that changes spelling halfway through.
              </p>
              <div className={s.heroActions}>
                <a data-edit="welcome.button" data-edit-max="28" className={s.button} href="#contact">Send a sample page</a>
                <a data-edit="welcome.ghost" data-edit-max="28" className={s.ghost} href="#marks">Read the marks</a>
              </div>
              <span data-edit="welcome.text" data-edit-max="60" className={`${s.margin} ${s.marginOne}`} aria-hidden="true">stet</span>
              <span data-edit="welcome.text2" data-edit-max="60" className={`${s.margin} ${s.marginTwo}`} aria-hidden="true">tr</span>
            </div>
            <div className={s.note}>
              <p data-edit="welcome.noteBig" data-edit-max="240" data-edit-multiline className={s.noteBig}>$14</p>
              <p data-edit="welcome.noteText" data-edit-max="240" data-edit-multiline className={s.noteText}>per 1,000 words to proofread. Free sample edit of one page, back the same day.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ MARKS
            The key that comes with every edited manuscript. */}
        <section id="marks" className={s.sec} aria-labelledby="marks-h">
          <div className={s.secHead}>
            <p data-edit="marks.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>1</p>
            <h2 data-edit="marks.secTitle" data-edit-max="60" id="marks-h" className={s.secTitle}>The marks, and what they ask</h2>
            <p data-edit="marks.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most work comes back as tracked changes. Proofs on paper or PDF
              come back marked by hand, in red, with this key clipped to the
              front.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.marks}>
              <caption data-edit="marks.srOnly" className={s.srOnly}>Proofreading marks</caption>
              <thead>
                <tr>
                  <th data-edit="marks.heading" scope="col">Margin</th>
                  <th data-edit="marks.heading2" scope="col">Mark</th>
                  <th data-edit="marks.heading3" scope="col">On the line</th>
                  <th data-edit="marks.heading4" scope="col">Becomes</th>
                </tr>
              </thead>
              <tbody>
                {MARKS.map((m, i) => (
                  <tr key={m.name}>
                    <td className={s.glyphCell}>
                      <span data-edit={`marks.glyph.${i}`} data-edit-max="60" className={`${s.glyph} ${s[m.shape]}`}>{m.glyph}</span>
                    </td>
                    <th scope="row">
                      <span data-edit={`marks.markName.${i}`} data-edit-max="60" className={s.markName}>{m.name}</span>
                      <span data-edit={`marks.markAsks.${i}`} data-edit-max="60" className={s.markAsks}>{m.asks}</span>
                    </th>
                    <td className={s.example}>
                      {m.ex.map(([kind, text], j) => (
                        <span data-edit={`marks.text.${i}.${j}`} data-edit-max="60" key={j} className={kind ? s[kind] : undefined}>{text}</span>
                      ))}
                    </td>
                    <td data-edit={`marks.after.${i}`} className={s.after}>{m.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --------------------------------------------------------- SERVICES
            A staircase, each step a deeper read. */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <p data-edit="services.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>2</p>
            <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>Four depths of edit</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Not sure which you need? Send a sample page. I will tell you
              honestly, and it is often the cheaper one.
            </p>
          </div>
          <ol className={s.ladder}>
            {SERVICES.map((sv, i) => (
              <li key={sv.name} className={s.step}>
                <p className={s.stepNo}>{`Step ${i + 1}`}</p>
                <h3 data-edit={`services.stepName.${i}`} data-edit-max="40" className={s.stepName}>{sv.name}</h3>
                <p data-edit={`services.stepPer.${i}`} data-edit-max="240" data-edit-multiline className={s.stepPer}>{sv.per}</p>
                <p data-edit={`services.stepLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.stepLabel}>Catches</p>
                <p data-edit={`services.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{sv.catches}</p>
                <p data-edit={`services.stepLabel2.${i}`} data-edit-max="240" data-edit-multiline className={s.stepLabel}>You need it when</p>
                <p data-edit={`services.stepText2.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{sv.when}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ RATES */}
        <section id="rates" className={s.sec} aria-labelledby="rates-h">
          <div className={s.ratesGrid}>
            <div>
              <p data-edit="rates.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>3</p>
              <h2 data-edit="rates.secTitle" data-edit-max="60" id="rates-h" className={s.secTitle}>Rates per thousand words</h2>
              <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Counted by your word processor, notes and references included.
                Half on booking, half on delivery. A rush job inside half the
                usual time adds 50 percent.
              </p>
            </div>
            <div className={s.tableWrap}>
              <table className={s.rates}>
                <caption data-edit="rates.srOnly" className={s.srOnly}>Rates by service</caption>
                <thead>
                  <tr>
                    <th data-edit="rates.heading" scope="col">Service</th>
                    <th data-edit="rates.heading2" scope="col">Per 1,000</th>
                    <th data-edit="rates.heading3" scope="col">A 60,000-word book</th>
                    <th data-edit="rates.heading4" scope="col">Minimum</th>
                  </tr>
                </thead>
                <tbody>
                  {RATES.map(([what, per, book, min], i) => (
                    <tr key={what}>
                      <th data-edit={`rates.heading5.${i}`} scope="row">{what}</th>
                      <td data-edit={`rates.rateBig.${i}`} className={s.rateBig}>{per}</td>
                      <td data-edit={`rates.cell.${i}`}>{book}</td>
                      <td data-edit={`rates.cell2.${i}`}>{min}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,3,2,1" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={sliver}
            palette={SHAVINGS}
            fit="grid"
            cellSize={36}
            seed="redpencil-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- TURNAROUND
            A ruler, read in working days. */}
        <section id="turnaround" className={s.sec} aria-labelledby="turnaround-h">
          <div className={s.secHead}>
            <p data-edit="turnaround.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>4</p>
            <h2 data-edit="turnaround.secTitle" data-edit-max="60" id="turnaround-h" className={s.secTitle}>How long it takes</h2>
            <p data-edit="turnaround.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Days are counted from when the file arrives, for a copyedit. A
              proofread takes about half as long; a developmental edit about
              twice.
            </p>
          </div>
          <ol className={s.ruler}>
            {TURNAROUND.map(([words, time, len], i) => (
              <li key={words} className={s[len]}>
                <span data-edit={`turnaround.rulerWords.${i}`} data-edit-max="60" className={s.rulerWords}>{words}</span>
                <span className={s.rulerBar} aria-hidden="true" />
                <span data-edit={`turnaround.rulerTime.${i}`} data-edit-max="60" className={s.rulerTime}>{time}</span>
              </li>
            ))}
          </ol>
          <p data-edit="turnaround.booking" data-edit-max="240" data-edit-multiline className={s.booking}>Booking now for November. One short job a week is kept free for rush work.</p>
        </section>

        {/* ----------------------------------------------------------- SAMPLE */}
        <section id="sample" className={s.sec} aria-labelledby="sample-h">
          <div className={s.secHead}>
            <p data-edit="sample.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>5</p>
            <h2 data-edit="sample.secTitle" data-edit-max="60" id="sample-h" className={s.secTitle}>One sentence, before and after</h2>
            <p data-edit="sample.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>From a library newsletter, printed with the editor's permission and the names changed.</p>
          </div>
          <div className={s.sampleGrid}>
            <div className={s.galley}>
              <p data-edit="sample.galleyLabel" data-edit-max="240" data-edit-multiline className={s.galleyLabel}>As it came in</p>
              <p className={s.marked}>
                {SAMPLE.map(([kind, text], i) => (
                  <span data-edit={`sample.text.${i}`} data-edit-max="60" key={i} className={kind ? s[kind] : undefined}>{text}</span>
                ))}
              </p>
              <p data-edit="sample.galleyLabel2" data-edit-max="240" data-edit-multiline className={s.galleyLabel}>As it went back</p>
              <p data-edit="sample.clean" data-edit-max="240" data-edit-multiline className={s.clean}>{CLEAN}</p>
            </div>
            <ol className={s.notes}>
              {NOTES.map(([what, why], i) => (
                <li key={what}>
                  <h3 data-edit={`sample.noteWhat.${i}`} data-edit-max="40" className={s.noteWhat}>{what}</h3>
                  <p data-edit={`sample.noteWhy.${i}`} data-edit-max="240" data-edit-multiline className={s.noteWhy}>{why}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ ABOUT */}
        <section id="about" className={s.sec} aria-labelledby="about-h">
          <div className={s.aboutGrid}>
            <div data-edit-pattern="about.field" data-edit-roles="transparent,2,4,3,2,1" className={s.tray} aria-hidden="true">
              <TabbiedPattern
                pattern={sliver}
                palette={SHAVINGS}
                fit="grid"
                cellSize={30}
                seed="redpencil-tray"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.aboutText}>
              <h2 data-edit="about.aboutTitle" data-edit-max="60" id="about-h" className={s.aboutTitle}>Who reads your words</h2>
              <p data-edit="about.aboutLead" data-edit-max="240" data-edit-multiline className={s.aboutLead}>
                Eight years on a newspaper copy desk, four on my own. I have
                edited 140 books, two annual reports a year for the same
                charity, and more websites than I can count.
              </p>
              <ul className={s.guides}>
                {GUIDES.map((g, i) => (
                  <li data-edit={`about.item.${i}`} data-edit-max="80" key={g}>{g}</li>
                ))}
              </ul>
              <p data-edit="about.aboutNote" data-edit-max="240" data-edit-multiline className={s.aboutNote}>Fiction and nonfiction, academic and business. No poetry and no legal contracts: both deserve a specialist.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>6</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Ask for a quote</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Attach or paste one page. You get the sample edit and a fixed
                price back within a working day.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="mailto:nell@redpencil.example">nell@redpencil.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="tel:+15550172284">(555) 017-2284</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Studio 6, 31 Quire Lane</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Hours</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Monday to Thursday, 8 to 4</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="rp-name">Name</label>
                <input id="rp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="rp-email">Email</label>
                <input id="rp-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="rp-words">Word count</label>
                <input id="rp-words" name="words" type="number" min={0} step={500} />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="rp-due">Needed by</label>
                <input id="rp-due" name="due" type="date" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">Depth of edit</legend>
                <div className={s.picks}>
                  {['Proofread', 'Copyedit', 'Line edit', 'Developmental', 'Not sure'].map((depth, i) => (
                    <span key={depth} className={s.pick}>
                      <input id={`rp-depth-${i}`} type="radio" name="depth" value={depth} />
                      <label data-edit={`contact.label5.${i}`} htmlFor={`rp-depth-${i}`}>{depth}</label>
                    </span>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="rp-page">Paste one page</label>
                <textarea id="rp-page" name="page" rows={5} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send for a quote</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,3,0,2" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={sliver}
            palette={NIGHT}
            fit="grid"
            cellSize={32}
            seed="redpencil-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Red Pencil Editing</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional editing business. The editor, clients, prices and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
