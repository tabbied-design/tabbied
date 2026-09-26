import { TabbiedPattern } from 'tabbied/react';
import { buttonhole, guernsey } from 'tabbied/patterns';
import s from './purl-and-ply.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Purl & Ply: Yarn shop and knitting classes, Wool Market Lane',
  description:
    'Purl & Ply sells yarn from small mills and teaches knitting and crochet at the long table on Wool Market Lane. Yarn weights, the October class calendar, the Tuesday stitch club and the help desk.',
};

/* Site colors, the same values as the roles on .page. The knitted fields
   are worked on a transparent ground: the gaps between the stitches are
   whatever the ball, band or placket behind them is. */
const OAT = '#efe5d3';
const PEAT = '#34281f';
const RUST = '#b4532e';
const MOSS = '#5d6a38';
const HONEY = '#d8a445';

const BALL = ['transparent', RUST, OAT, HONEY, MOSS];
const YOKE = ['transparent', RUST, HONEY, OAT];
const PLACKET = ['transparent', MOSS, RUST, HONEY];
const HEM = ['transparent', MOSS, HONEY, RUST];

const NAV = [
  ['Yarn weights', '#weights'],
  ['Classes', '#classes'],
  ['Stitch club', '#club'],
  ['Help desk', '#help'],
  ['Who we are', '#people'],
  ['Visit', '#visit'],
];

const BAND = [
  ['Fiber', 'Corriedale wool'],
  ['Put-up', '100 g, 180 m'],
  ['Needles', '4.5 to 5 mm'],
  ['Gauge', '18 sts to 10 cm'],
];

type Weight = {
  name: string;
  strand: 'w0' | 'w1' | 'w2' | 'w3' | 'w4' | 'w5' | 'w6';
  needles: string;
  gauge: string;
  good: string;
  ours: string;
};

const WEIGHTS: Weight[] = [
  { name: 'Lace', strand: 'w0', needles: '1.5 to 2.25 mm', gauge: '33 to 40', good: 'Shawls, and the patience for them', ours: 'Kidsilk Cloud, $18' },
  { name: 'Fingering', strand: 'w1', needles: '2.25 to 3.25 mm', gauge: '27 to 32', good: 'Socks and fine sweaters', ours: 'Hollins Sock, $16' },
  { name: 'Sport', strand: 'w2', needles: '3.25 to 3.75 mm', gauge: '23 to 26', good: 'Baby things, light layers', ours: 'Wren Sport, $13' },
  { name: 'DK', strand: 'w3', needles: '3.75 to 4.5 mm', gauge: '21 to 24', good: 'Hats, sweaters, almost anything', ours: 'Fell DK, $12' },
  { name: 'Worsted', strand: 'w4', needles: '4.5 to 5.5 mm', gauge: '16 to 20', good: 'Sweaters, blankets, first projects', ours: 'House Worsted, $14' },
  { name: 'Aran', strand: 'w4', needles: '5 to 5.5 mm', gauge: '16 to 18', good: 'Cables and outdoor things', ours: 'Tweed Aran, $15' },
  { name: 'Bulky', strand: 'w5', needles: '5.5 to 8 mm', gauge: '12 to 15', good: 'A hat in an evening', ours: 'Big Dipper, $18' },
  { name: 'Super bulky', strand: 'w6', needles: '8 to 12.75 mm', gauge: '7 to 11', good: 'A blanket in a weekend', ours: 'Cloudbank, $24' },
];

const BLANKS = ['mon', 'tue', 'wed'];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type Event = {
  label: string;
  kind: 'learn' | 'sweater' | 'socks' | 'fix' | 'colour' | 'crochet' | 'stitch' | 'show' | 'closed';
};

const OCTOBER: { day: string; wd: string; events: Event[] }[] = [
  { day: '1', wd: 'Thu', events: [] },
  { day: '2', wd: 'Fri', events: [] },
  { day: '3', wd: 'Sat', events: [{ label: 'Learn to knit, 10', kind: 'learn' }] },
  { day: '4', wd: 'Sun', events: [] },
  { day: '5', wd: 'Mon', events: [{ label: 'Closed', kind: 'closed' }] },
  { day: '6', wd: 'Tue', events: [{ label: 'Stitch club, 6', kind: 'stitch' }] },
  { day: '7', wd: 'Wed', events: [{ label: 'First sweater, 6:30', kind: 'sweater' }] },
  { day: '8', wd: 'Thu', events: [] },
  { day: '9', wd: 'Fri', events: [{ label: 'Granny squares, 6', kind: 'crochet' }] },
  { day: '10', wd: 'Sat', events: [{ label: 'Learn to knit, 10', kind: 'learn' }] },
  { day: '11', wd: 'Sun', events: [{ label: 'Socks, 1', kind: 'socks' }] },
  { day: '12', wd: 'Mon', events: [{ label: 'Closed', kind: 'closed' }] },
  { day: '13', wd: 'Tue', events: [{ label: 'Stitch club, 6', kind: 'stitch' }] },
  { day: '14', wd: 'Wed', events: [{ label: 'First sweater, 6:30', kind: 'sweater' }] },
  { day: '15', wd: 'Thu', events: [{ label: 'Fixing mistakes, 6:30', kind: 'fix' }] },
  { day: '16', wd: 'Fri', events: [{ label: 'Granny squares, 6', kind: 'crochet' }] },
  { day: '17', wd: 'Sat', events: [{ label: 'Learn to knit, 10', kind: 'learn' }, { label: 'Colorwork, 2', kind: 'colour' }] },
  { day: '18', wd: 'Sun', events: [{ label: 'Socks, 1', kind: 'socks' }] },
  { day: '19', wd: 'Mon', events: [{ label: 'Closed', kind: 'closed' }] },
  { day: '20', wd: 'Tue', events: [{ label: 'Stitch club, 6', kind: 'stitch' }] },
  { day: '21', wd: 'Wed', events: [{ label: 'First sweater, 6:30', kind: 'sweater' }] },
  { day: '22', wd: 'Thu', events: [] },
  { day: '23', wd: 'Fri', events: [{ label: 'Fell Mill trunk show', kind: 'show' }] },
  { day: '24', wd: 'Sat', events: [{ label: 'Learn to knit, 10', kind: 'learn' }, { label: 'Colorwork, 2', kind: 'colour' }] },
  { day: '25', wd: 'Sun', events: [{ label: 'Socks, 1', kind: 'socks' }] },
  { day: '26', wd: 'Mon', events: [{ label: 'Closed', kind: 'closed' }] },
  { day: '27', wd: 'Tue', events: [{ label: 'Stitch club, 6', kind: 'stitch' }] },
  { day: '28', wd: 'Wed', events: [{ label: 'First sweater, 6:30', kind: 'sweater' }] },
  { day: '29', wd: 'Thu', events: [] },
  { day: '30', wd: 'Fri', events: [] },
  { day: '31', wd: 'Sat', events: [] },
];

const CLASSES = [
  { name: 'Learn to knit', when: 'Saturdays, Oct 3 to 24, 10 to 12', price: '$120', places: '3 places left', note: 'Cast on, knit, purl, bind off, and a hat to show for it. Needles and yarn included.' },
  { name: 'Your first sweater', when: 'Six Wednesdays from Oct 7, 6:30 to 8:30', price: '$190', places: '1 place left', note: 'A top-down raglan in worsted, tried on as you go. The yarn is 15 percent off for the class.' },
  { name: 'Socks, two at a time', when: 'Sundays, Oct 11 to 25, 1 to 4', price: '$110', places: '5 places left', note: 'Magic loop, heel flaps, and the Kitchener stitch without tears.' },
  { name: 'Fixing mistakes', when: 'Thursday, Oct 15, 6:30 to 8:30', price: '$35', places: '6 places left', note: 'Laddering down, tinking back, and the lifeline you will wish you had put in.' },
  { name: 'Colorwork and steeks', when: 'Saturdays, Oct 17 and 24, 2 to 5', price: '$95', places: 'Full, waiting list open', note: 'Stranded knitting in two colors, then we cut it. On purpose.' },
  { name: 'Granny squares', when: 'Fridays, Oct 9 and 16, 6 to 8', price: '$60', places: '4 places left', note: 'Crochet from the first chain to a joined square. Hattie teaches.' },
];

const CAKES = [
  ['Oct 6', 'Marguerite', 'Lemon drizzle'],
  ['Oct 13', 'Dev', 'Banana bread, with walnuts'],
  ['Oct 20', 'The shop', 'Ginger cake'],
  ['Oct 27', 'Hannah', 'Apple crumble bars'],
];

const HELP = [
  ['Dropped stitch rescue', 'Free, always, even if you did not buy the yarn here.'],
  ['Winding skeins into cakes', 'Free with anything bought here, $3 a skein otherwise.'],
  ['Pattern questions', 'Fifteen minutes free. After that it is a lesson, at $30 an hour.'],
  ['Finishing', 'Seaming, blocking and buttons, $28 an hour, quoted before we start.'],
  ['Holding yarn', "A sweater's worth kept under your name for three weeks."],
  ['The swatch library', 'A knitted square of every yarn on the wall. Touch them all.'],
];

const PEOPLE = [
  ['Wren Albescu', 'Owner', 'Opened the shop in 2012 with forty yarns and a kettle. Spins in the window on Saturday mornings.'],
  ['Tomasz Kowal', 'Sweaters and dyeing', 'Teaches the sweater class and dyes the house yarn in the back on Mondays, which is why we are closed.'],
  ['Hattie Morrow', 'Crochet', 'Saturdays and Friday evenings. Can crochet anything and has, including a cover for a bicycle.'],
];

const HOURS = [
  ['Monday', 'Closed, dye day'],
  ['Tuesday', '10 to 9, club from 6'],
  ['Wednesday', '10 to 8'],
  ['Thursday and Friday', '10 to 6'],
  ['Saturday', '9 to 5'],
  ['Sunday', '12 to 4'],
];

export default function PurlAndPlyPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--oat': '#efe5d3',
        '--peat': '#34281f',
        '--rust': '#b4532e',
        '--moss': '#5d6a38',
        '--honey': '#d8a445',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="oat,peat,rust,moss,honey"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Nunito+Sans:wght@400;600;700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Purl & Ply</a>
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
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div>
            <p data-edit="hero.row" data-edit-max="240" data-edit-multiline className={s.row}>Cast on</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.title}>Good wool and a <em>long table</em></h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              About four hundred yarns, most of them from small mills within a
              day's drive, and a table at the back where we teach, fix and
              gossip. Bring in a dropped stitch and we will pick it up for
              nothing.
            </p>
            <p data-edit="hero.address" data-edit-max="240" data-edit-multiline className={s.address}>31 Wool Market Lane, in the old corn exchange</p>
          </div>

          <div className={s.ballWrap}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,0,4,3" className={s.ball} aria-hidden="true">
              <TabbiedPattern
                pattern={guernsey}
                palette={BALL}
                fit="grid"
                cellSize={40}
                seed="purl-ball"
                options={{ frequency: 0.9 }}
                redrawInterval={8000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.label}>
              <p data-edit="hero.labelBrand" data-edit-max="240" data-edit-multiline className={s.labelBrand}>Purl & Ply house yarn</p>
              <p data-edit="hero.labelName" data-edit-max="240" data-edit-multiline className={s.labelName}>Worsted, shade 04 Oatmeal</p>
              <dl className={s.labelFacts}>
                {BAND.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`hero.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="hero.labelPrice" data-edit-max="240" data-edit-multiline className={s.labelPrice}>$14 a skein</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- WEIGHTS */}
        <section id="weights" className={s.sec} aria-labelledby="weights-h">
          <div className={s.weightsTop}>
            <div className={s.head}>
              <p data-edit="weights.row" data-edit-max="240" data-edit-multiline className={s.row}>Row 1</p>
              <h2 data-edit="weights.title" data-edit-format="emphasis" data-edit-max="60" id="weights-h">Yarn, <em>by weight</em></h2>
              <p data-edit="weights.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                The wall runs thinnest on the left to thickest on the right,
                the way this table does. Gauge is stitches to 10 cm in
                stockinette, on the needles in the middle of the range.
              </p>
            </div>
            <Artwork
              slug="purl-and-ply-skeins"
              alt="Twisted skeins and wound cakes of yarn stacked on a wooden shelf, with a pair of knitting needles"
              inks={{ red: 'var(--yarn-rust)', blue: 'var(--yarn-moss)', yellow: 'var(--yarn-honey)', black: 'var(--text)' }}
              className={s.skeins}
            />
          </div>

          <div className={s.weightHead} aria-hidden="true">
            <span data-edit="weights.text" data-edit-max="60">Weight</span>
            <span data-edit="weights.text2" data-edit-max="60">Needles</span>
            <span data-edit="weights.text3" data-edit-max="60">Stitches</span>
            <span data-edit="weights.text4" data-edit-max="60">Good for</span>
            <span data-edit="weights.text5" data-edit-max="60">Ours to try</span>
          </div>
          <ol className={s.weights}>
            {WEIGHTS.map((w, i) => (
              <li key={w.name}>
                <div className={s.weightName}>
                  <span className={`${s.strand} ${s[w.strand]}`} aria-hidden="true" />
                  <h3 data-edit={`weights.title.${i}`} data-edit-max="40">{w.name}</h3>
                </div>
                <dl className={s.weightFacts}>
                  <div>
                    <dt data-edit={`weights.term.${i}`} data-edit-max="28">Needles</dt>
                    <dd data-edit={`weights.body.${i}`} data-edit-max="200" data-edit-multiline>{w.needles}</dd>
                  </div>
                  <div>
                    <dt data-edit={`weights.term2.${i}`} data-edit-max="28">Stitches to 10 cm</dt>
                    <dd data-edit={`weights.body2.${i}`} data-edit-max="200" data-edit-multiline>{w.gauge}</dd>
                  </div>
                  <div>
                    <dt data-edit={`weights.term3.${i}`} data-edit-max="28">Good for</dt>
                    <dd data-edit={`weights.body3.${i}`} data-edit-max="200" data-edit-multiline>{w.good}</dd>
                  </div>
                  <div>
                    <dt data-edit={`weights.term4.${i}`} data-edit-max="28">Ours to try</dt>
                    <dd data-edit={`weights.body4.${i}`} data-edit-max="200" data-edit-multiline>{w.ours}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </section>

        {/* A knitted yoke across the page. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,0" className={s.yoke} aria-hidden="true">
          <TabbiedPattern
            pattern={guernsey}
            palette={YOKE}
            fit="grid"
            cellSize={30}
            seed="purl-yoke"
            options={{ frequency: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* --------------------------------------------------------- CLASSES */}
        <section id="classes" className={s.sec} aria-labelledby="classes-h">
          <div className={s.head}>
            <p data-edit="classes.row" data-edit-max="240" data-edit-multiline className={s.row}>Row 2</p>
            <h2 data-edit="classes.title" data-edit-format="emphasis" data-edit-max="60" id="classes-h">October at <em>the long table</em></h2>
            <p data-edit="classes.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Classes are six people at most, so everyone gets their stitches
              looked at. Book below, or at the till; we hold a place for two
              days while you decide.
            </p>
          </div>

          <div className={s.calendar}>
            <p data-edit="classes.month" data-edit-max="240" data-edit-multiline className={s.month}>October 2026</p>
            <ol className={s.days}>
              {WEEKDAYS.map((w) => (
                <li key={w} className={s.weekday} aria-hidden="true">{w}</li>
              ))}
              {BLANKS.map((b) => (
                <li key={b} className={s.blank} aria-hidden="true" />
              ))}
              {OCTOBER.map((d, i) => (
                <li key={d.day} className={d.events.length ? s.busy : s.quiet}>
                  <span data-edit={`classes.date.${i}`} data-edit-max="60" className={s.date}>{d.day}</span>
                  <span data-edit={`classes.wd.${i}`} data-edit-max="60" className={s.wd}>{d.wd}</span>
                  {d.events.map((e, i2) => (
                    <span data-edit={`classes.event.${i}.${i2}`} data-edit-max="60" key={e.label} className={`${s.event} ${s[e.kind]}`}>{e.label}</span>
                  ))}
                </li>
              ))}
            </ol>
          </div>

          <div className={s.classWrap}>
            <ul className={s.classes}>
              {CLASSES.map((c, i) => (
                <li key={c.name}>
                  <div className={s.classTop}>
                    <h3 data-edit={`classes.title.${i}`} data-edit-max="40">{c.name}</h3>
                    <p data-edit={`classes.classPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.classPrice}>{c.price}</p>
                  </div>
                  <p data-edit={`classes.classWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.classWhen}>{c.when}</p>
                  <p data-edit={`classes.classNote.${i}`} data-edit-max="240" data-edit-multiline className={s.classNote}>{c.note}</p>
                  <p data-edit={`classes.places.${i}`} data-edit-max="240" data-edit-multiline className={s.places}>{c.places}</p>
                </li>
              ))}
            </ul>

            <form className={s.form} action="#">
              <h3 data-edit="classes.formTitle" data-edit-max="40" className={s.formTitle}>Save me a place</h3>
              <div className={s.field}>
                <label data-edit="classes.label" htmlFor="pp-name">Name</label>
                <input id="pp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="classes.label2" htmlFor="pp-email">Email</label>
                <input id="pp-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="classes.label3" htmlFor="pp-class">Class</label>
                <select id="pp-class" name="class" defaultValue="learn">
                  <option value="learn">Learn to knit</option>
                  <option value="sweater">Your first sweater</option>
                  <option value="socks">Socks, two at a time</option>
                  <option value="fix">Fixing mistakes</option>
                  <option value="colour">Colorwork and steeks, waiting list</option>
                  <option value="crochet">Granny squares</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="classes.label4" htmlFor="pp-so-far">What you have made so far</label>
                <select id="pp-so-far" name="experience" defaultValue="none">
                  <option value="none">Nothing yet</option>
                  <option value="scarf">A scarf, more or less</option>
                  <option value="some">A few things</option>
                  <option value="plenty">Plenty, I just want this one</option>
                </select>
              </div>
              <button data-edit="classes.button" data-edit-max="24" className={s.button} type="submit">Hold my place</button>
              <p data-edit="classes.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We hold it two days. Pay at the till or by the link we send.</p>
            </form>
          </div>
        </section>

        {/* ------------------------------------------------------------ CLUB */}
        <section id="club" className={s.club} aria-labelledby="club-h">
          <div data-edit-pattern="club.field" data-edit-roles="transparent,3,2,4" className={s.placket} aria-hidden="true">
            <TabbiedPattern
              pattern={buttonhole}
              palette={PLACKET}
              fit="grid"
              cellSize={44}
              seed="purl-placket"
              options={{ frequency: 1 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.clubBody}>
            <p data-edit="club.row" data-edit-max="240" data-edit-multiline className={s.row}>Row 3</p>
            <h2 data-edit="club.title" data-edit-format="emphasis" data-edit-max="60" id="club-h">Tuesday <em>stitch club</em></h2>
            <p data-edit="club.clubLede" data-edit-max="240" data-edit-multiline className={s.clubLede}>
              Every Tuesday, 6 to 9, free, at the long table. Bring what you
              are making, or bring nothing and we will teach you to cast on.
              Tea is on the shop; cake goes by rota.
            </p>
            <div className={s.clubGrid}>
              <table className={s.cakes}>
                <caption data-edit="club.caption">The cake rota</caption>
                <tbody>
                  {CAKES.map(([date, who, cake], i) => (
                    <tr key={date}>
                      <th data-edit={`club.heading.${i}`} scope="row">{date}</th>
                      <td data-edit={`club.cell.${i}`}>{who}</td>
                      <td data-edit={`club.cell2.${i}`}>{cake}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className={s.clubRules}>
                <li data-edit="club.item" data-edit-max="80">Sit anywhere. The good lamp is first come.</li>
                <li data-edit="club.item2" data-edit-max="80">Knitting, crochet, spinning, darning and embroidery all count.</li>
                <li data-edit="club.item3" data-edit-max="80">Nobody asks what you are making until you have had your tea.</li>
                <li data-edit="club.item4" data-edit-max="80">Frogging is allowed, and so is a little crying.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ HELP */}
        <section id="help" className={s.sec} aria-labelledby="help-h">
          <div className={s.head}>
            <p data-edit="help.row" data-edit-max="240" data-edit-multiline className={s.row}>Row 4</p>
            <h2 data-edit="help.title" data-edit-format="emphasis" data-edit-max="60" id="help-h">The <em>help desk</em></h2>
            <p data-edit="help.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              The counter by the window. Whoever is at the till will stop and
              look, and if it needs longer we will book you a slot.
            </p>
          </div>
          <dl className={s.help}>
            {HELP.map(([term, body], i) => (
              <div key={term}>
                <dt data-edit={`help.term.${i}`} data-edit-max="28">{term}</dt>
                <dd data-edit={`help.body.${i}`} data-edit-max="200" data-edit-multiline>{body}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------------- PEOPLE */}
        <section id="people" className={s.sec} aria-labelledby="people-h">
          <div className={s.head}>
            <p data-edit="people.row" data-edit-max="240" data-edit-multiline className={s.row}>Row 5</p>
            <h2 data-edit="people.title" data-edit-format="emphasis" data-edit-max="60" id="people-h">Who is <em>behind the till</em></h2>
          </div>
          <ul className={s.people}>
            {PEOPLE.map(([name, role, note], i) => (
              <li key={name}>
                <p data-edit={`people.role.${i}`} data-edit-max="240" data-edit-multiline className={s.role}>{role}</p>
                <h3 data-edit={`people.title.${i}`} data-edit-max="40">{name}</h3>
                <p data-edit={`people.body.${i}`} data-edit-max="240" data-edit-multiline>{note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.visit}>
            <div>
              <p data-edit="visit.row" data-edit-max="240" data-edit-multiline className={s.row}>Bind off</p>
              <h2 data-edit="visit.title" data-edit-format="emphasis" data-edit-max="60" id="visit-h" className={s.visitTitle}>Come and <em>squeeze the yarn</em></h2>
              <p data-edit="visit.visitText" data-edit-max="240" data-edit-multiline className={s.visitText}>
                31 Wool Market Lane, in the old corn exchange, two doors down
                from the cheese shop. Park in the Wool Market lot; the first
                hour is free. Step-free, with a sofa by the door for anyone
                who came along to be patient.
              </p>
              <p className={s.visitText}>
                <a data-edit="visit.link" data-edit-max="28" href="tel:+15550184466">(555) 018-4466</a>
                <br />
                <a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@purlandply.example">hello@purlandply.example</a>
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([day, time], i) => (
                <div key={day}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{day}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,4,2" className={s.hem} aria-hidden="true">
          <TabbiedPattern
            pattern={guernsey}
            palette={HEM}
            fit="grid"
            cellSize={26}
            seed="purl-hem"
            options={{ frequency: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Purl & Ply</p>
        <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional yarn shop and knitting school. The yarns, classes, prices and people are invented.</p>
        <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The shelf of yarn is a generated picture, drawn in the page's own colors.</p>
        <p>
          Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
