import { TabbiedPattern } from 'tabbied/react';
import { bangle, scattershrink } from 'tabbied/patterns';
import s from './bright-smiles-kids.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Bright Smiles: Pediatric dentist, Maple Hill',
  description:
    'Bright Smiles is a children\'s dental practice in Maple Hill, for ages 1 to 17. A first visit in four gentle steps, care that changes as your child grows, and Saturday mornings.',
};

/* Site colors. Every field draws on a `transparent` ground, straight onto
   the page or the colored panel behind it. */
const BLUE = '#3B82F6';
const PINK = '#F472B6';
const SUN = '#FACC15';
const SLATE = '#94A3B8';

const RINGS = ['transparent', BLUE, PINK, SUN];
const SMILES = ['transparent', PINK, BLUE, SUN];
const QUIET = ['transparent', SLATE, BLUE];

const PHONE = '(555) 016-8080';
const PHONE_HREF = 'tel:+15550168080';

const NAV = [
  ['First visit', '#first-visit'],
  ['By age', '#ages'],
  ['Parents', '#parents'],
  ['Insurance', '#insurance'],
  ['Book', '#book'],
];

/* The four steps of a first visit, each drawn with one of the three
   illustrations on its own colored card. The layer names are the key
   colors the pictures were drawn in; each card maps them to the palette. */
const STEPS = [
  {
    no: '1',
    title: 'Say hello',
    time: '10 minutes',
    body: 'We meet in the playroom, not the chair. Your child can hold the mirror, count the fish in the tank and ask anything at all.',
    art: 'bright-smiles-kids-tooth',
    alt: 'A friendly cartoon tooth',
    card: 'cardBlue',
    inks: { yellow: 'var(--cloud)', blue: 'var(--navy)', red: 'var(--pink)' },
  },
  {
    no: '2',
    title: 'Ride the chair',
    time: '5 minutes',
    body: 'Up, down and back again, with the light that follows your nose. They can sit on your lap for the whole visit if they would rather.',
    art: 'bright-smiles-kids-chair',
    alt: 'A dentist chair with its lamp',
    card: 'cardSun',
    inks: { yellow: 'var(--navy)', blue: 'var(--blue)', red: 'var(--pink)' },
  },
  {
    no: '3',
    title: 'Count and brush',
    time: '15 minutes',
    body: 'We count every tooth out loud, polish with a flavor they pick, and show you both the brushing that reaches the back ones.',
    art: 'bright-smiles-kids-toothbrush',
    alt: 'A toothbrush and a tube of toothpaste',
    card: 'cardPink',
    inks: { yellow: 'var(--sun)', blue: 'var(--blue)', red: 'var(--navy)' },
  },
  {
    no: '4',
    title: 'A sticker and a plan',
    time: '5 minutes',
    body: 'They choose a sticker and a new brush. You go home with a written plan for the next six months, and the date of the next visit.',
    art: 'bright-smiles-kids-tooth',
    alt: 'A smiling tooth',
    card: 'cardNavy',
    inks: { yellow: 'var(--cloud)', blue: 'var(--blue)', red: 'var(--pink)' },
  },
];

const AGES = [
  {
    age: '1-2',
    label: 'First tooth',
    items: ['A knee-to-knee exam on your lap', 'Fluoride varnish, painted on', 'Teething, bottles and night feeds'],
  },
  {
    age: '3-5',
    label: 'Preschool',
    items: ['First cleaning in the big chair', 'X-rays only if we need them', 'Thumbs and pacifiers, gently'],
  },
  {
    age: '6-9',
    label: 'Loose teeth',
    items: ['Sealants on the first molars', 'A first look at the bite', 'Brushing on their own, checked'],
  },
  {
    age: '10-13',
    label: 'Big teeth',
    items: ['Sealants on the 12-year molars', 'Sports mouthguards, made here', 'Braces referral, if and when'],
  },
  {
    age: '14-17',
    label: 'Teens',
    items: ['Wisdom teeth watched on x-ray', 'Straight talk about soda and vaping', 'A hand-over to an adult dentist'],
  },
];

const FAQ = [
  {
    q: 'When should the first visit be?',
    a: 'By the first birthday, or six months after the first tooth appears, whichever comes first. It is short, and it is mostly about you and a few habits.',
  },
  {
    q: 'Can I stay in the room?',
    a: 'Always. Most children do best with a parent in sight, and you can sit beside the chair or hold them on your lap.',
  },
  {
    q: 'My child is scared. What do we do?',
    a: 'Tell us when you book. We make the first visit a look-around only, use the words your child uses, and never hold anyone down. Some children need three visits to open wide, and that is fine.',
  },
  {
    q: 'Do you see children with special needs?',
    a: 'Yes. We have a quiet room with the lights down, longer appointments on request, and a chair that works for a wheelchair transfer.',
  },
  {
    q: 'What if there is an emergency?',
    a: 'Call the office. Outside hours the message gives the dentist on call. For a knocked-out adult tooth, put it back in or keep it in milk, and call right away.',
  },
];

const PLANS = ['Medicaid and CHIP for children', 'Most PPO dental plans', 'Federal and state employee plans', 'Flexible spending and HSA cards'];

const PRICES = [
  ['First visit and exam', '$95'],
  ['Checkup and cleaning', '$140'],
  ['X-rays, a pair', '$60'],
  ['Sealant, per tooth', '$45'],
  ['Sports mouthguard', '$120'],
];

export default function BrightSmilesPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cloud': '#f7fbff',
        '--navy': '#1d2b45',
        '--blue': '#3b82f6',
        '--pink': '#f472b6',
        '--sun': '#facc15',
        '--slate': '#94a3b8',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cloud,navy,blue,pink,sun,slate"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Figtree:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <Artwork
            slug="bright-smiles-kids-tooth"
            alt=""
            inks={{ yellow: 'var(--cloud)', blue: 'var(--navy)', red: 'var(--pink)' }}
            className={s.markTooth}
          />
          <span className={s.markText}>
            <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Bright Smiles</span>
            <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Children's dentistry</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Book a visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Rings drift across the whole hero; the tooth stands on a blue
            disc with the brush leaning on it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={scattershrink}
              palette={RINGS}
              fit="grid"
              cellSize={140}
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Children's dentist in Maple Hill, ages 1-17</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                A first visit that ends in <em>a high five.</em>
              </h1>
              <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
                Gentle, unhurried checkups for babies, kids and teens, with a
                parent in the room and a playroom before the chair. Saturday
                mornings too.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#book">Book a first visit</a>
                <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#first-visit">What happens</a>
              </div>
            </div>
            <div className={s.heroArt}>
              <span className={s.heroDisc} aria-hidden="true" />
              <Artwork
                slug="bright-smiles-kids-tooth"
                alt="A friendly cartoon tooth with a smile"
                inks={{ yellow: 'var(--cloud)', blue: 'var(--navy)', red: 'var(--pink)' }}
                className={s.heroTooth}
              />
              <Artwork
                slug="bright-smiles-kids-toothbrush"
                alt=""
                inks={{ yellow: 'var(--sun)', blue: 'var(--pink)', red: 'var(--navy)' }}
                className={s.heroBrush}
              />
            </div>
          </div>
          <ul className={s.heroFacts}>
            <li>
              <strong data-edit="hero.emphasis">Ages 1-17</strong>
              <span data-edit="hero.text" data-edit-max="60">and their grown-ups</span>
            </li>
            <li>
              <strong data-edit="hero.emphasis2">Saturdays</strong>
              <span data-edit="hero.text2" data-edit-max="60">8 am to noon</span>
            </li>
            <li>
              <strong data-edit="hero.emphasis3">Parents stay</strong>
              <span data-edit="hero.text3" data-edit-max="60">in the room, always</span>
            </li>
          </ul>
        </section>

        {/* ----------------------------------------------------- FIRST VISIT
            Four big illustrated cards in a row, joined by a dotted path. */}
        <section id="first-visit" className={s.visitSec} aria-labelledby="first-visit-h">
          <div className={s.secHead}>
            <span data-edit="firstVisit.secTag" data-edit-max="60" className={s.secTag}>About 35 minutes</span>
            <h2 data-edit="firstVisit.title" data-edit-max="60" id="first-visit-h">Your child's first visit</h2>
            <p data-edit="firstVisit.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>The same four steps every time, so the second visit already feels familiar.</p>
          </div>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.no} className={`${s.step} ${s[st.card]}`}>
                <div className={s.stepArt}>
                  <Artwork slug={st.art} alt={st.alt} inks={st.inks} className={s.stepPicture} />
                </div>
                <div className={s.stepText}>
                  <div className={s.stepTop}>
                    <span data-edit={`firstVisit.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{st.no}</span>
                    <span data-edit={`firstVisit.stepTime.${i}`} data-edit-max="60" className={s.stepTime}>{st.time}</span>
                  </div>
                  <h3 data-edit={`firstVisit.title2.${i}`} data-edit-max="40">{st.title}</h3>
                  <p data-edit={`firstVisit.body.${i}`} data-edit-max="240" data-edit-multiline>{st.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------------ BAND
            Little arcs, like a row of smiles, between the visit and the ages. */}
        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={bangle}
            palette={SMILES}
            options={{ frequency: 0.6 }}
            fit="grid"
            cellSize={52}
            redrawInterval={7600}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ AGES */}
        <section id="ages" className={s.sec} aria-labelledby="ages-h">
          <div className={s.secHead}>
            <span data-edit="ages.secTag" data-edit-max="60" className={s.secTag}>Every six months</span>
            <h2 data-edit="ages.title" data-edit-max="60" id="ages-h">What we do, by age</h2>
            <p data-edit="ages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>A checkup changes as your child does. This is what each one covers, on top of a look, a count and a clean.</p>
          </div>
          <ol className={s.ages}>
            {AGES.map((a, i) => (
              <li key={a.age} className={s.age}>
                <span data-edit={`ages.ageBubble.${i}`} data-edit-max="60" className={s.ageBubble}>{a.age}</span>
                <h3 data-edit={`ages.title2.${i}`} data-edit-max="40">{a.label}</h3>
                <ul className={s.ageList}>
                  {a.items.map((it, i2) => (
                    <li data-edit={`ages.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- PARENTS */}
        <section id="parents" className={s.sec} aria-labelledby="parents-h">
          <div className={s.parents}>
            <div className={s.parentsLead}>
              <span data-edit="parents.secTag" data-edit-max="60" className={s.secTag}>For grown-ups</span>
              <h2 data-edit="parents.title" data-edit-max="60" id="parents-h">Questions parents ask</h2>
              <p data-edit="parents.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>And if yours is not here, call the front desk: Dana has heard all of them.</p>
              <Artwork
                slug="bright-smiles-kids-chair"
                alt=""
                inks={{ yellow: 'var(--sun)', blue: 'var(--blue)', red: 'var(--pink)' }}
                className={s.parentsChair}
              />
            </div>
            <div className={s.faq}>
              {FAQ.map((f, i) => (
                <details key={f.q}>
                  <summary data-edit={`parents.question.${i}`} data-edit-max="80">{f.q}</summary>
                  <p data-edit={`parents.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- INSURANCE */}
        <section id="insurance" className={s.sec} aria-labelledby="insurance-h">
          <div className={s.secHead}>
            <span data-edit="insurance.secTag" data-edit-max="60" className={s.secTag}>No surprises</span>
            <h2 data-edit="insurance.title" data-edit-max="60" id="insurance-h">Insurance and prices</h2>
            <p data-edit="insurance.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>We check your coverage before the visit and tell you what, if anything, you will owe.</p>
          </div>
          <div className={s.insurance}>
            <div className={s.plans}>
              <h3 data-edit="insurance.title2" data-edit-max="40">We take</h3>
              <ul className={s.planList}>
                {PLANS.map((p, i) => (
                  <li data-edit={`insurance.item.${i}`} data-edit-max="80" key={p}>{p}</li>
                ))}
              </ul>
              <p data-edit="insurance.plansNote" data-edit-max="240" data-edit-multiline className={s.plansNote}>Not sure about yours? Send us a photo of the card when you book.</p>
            </div>
            <div className={s.priceCard}>
              <h3 data-edit="insurance.title3" data-edit-max="40">Without insurance</h3>
              <dl className={s.priceList}>
                {PRICES.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`insurance.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`insurance.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.smilePlan}>
                <strong data-edit="insurance.emphasis">Smile plan, $240 a year</strong>
                <span data-edit="insurance.text" data-edit-max="60">Two checkups and cleanings, x-rays and 15% off everything else.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookPanel}>
            <div data-edit-pattern="book.field" data-edit-roles="transparent,5,2" className={s.bookField} aria-hidden="true">
              <TabbiedPattern
                pattern={scattershrink}
                palette={QUIET}
                fit="grid"
                cellSize={120}
                seed="book"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <h2 data-edit="book.title" data-edit-max="60" id="book-h">Book a visit</h2>
            <p data-edit="book.bookText" data-edit-max="240" data-edit-multiline className={s.bookText}>We call back the same day to find a time. First visits are Monday to Thursday mornings, when the office is quiet.</p>
            <dl className={s.bookInfo}>
              <div>
                <dt data-edit="book.term" data-edit-max="28">Call</dt>
                <dd>
                  <a data-edit="book.link" data-edit-max="28" href={PHONE_HREF}>{PHONE}</a>
                </dd>
              </div>
              <div>
                <dt data-edit="book.term2" data-edit-max="28">Find us</dt>
                <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>18 Orchard Lane, Maple Hill</dd>
              </div>
              <div>
                <dt data-edit="book.term3" data-edit-max="28">Hours</dt>
                <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Mon-Thu 8-5, Fri 8-2, Sat 8-12</dd>
              </div>
            </dl>
            <Artwork
              slug="bright-smiles-kids-toothbrush"
              alt=""
              inks={{ yellow: 'var(--sun)', blue: 'var(--cloud)', red: 'var(--pink)' }}
              className={s.bookBrush}
            />
          </div>

          <form className={s.form} action="#">
            <div className={s.field}>
              <label data-edit="book.label" htmlFor="bs-parent">Your name</label>
              <input id="bs-parent" name="parent" type="text" autoComplete="name" />
            </div>
            <div className={s.field}>
              <label data-edit="book.label2" htmlFor="bs-phone">Phone</label>
              <input id="bs-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className={s.field}>
              <label data-edit="book.label3" htmlFor="bs-child">Child's first name</label>
              <input id="bs-child" name="child" type="text" />
            </div>
            <div className={s.field}>
              <label data-edit="book.label4" htmlFor="bs-age">Age</label>
              <select id="bs-age" name="age" defaultValue="">
                <option value="" disabled>Choose</option>
                <option value="1-2">1-2</option>
                <option value="3-5">3-5</option>
                <option value="6-9">6-9</option>
                <option value="10-13">10-13</option>
                <option value="14-17">14-17</option>
              </select>
            </div>
            <fieldset className={s.choice}>
              <legend data-edit="book.legend">This is</legend>
              <label>
                <input type="radio" name="kind" value="first" defaultChecked />
                <span data-edit="book.text" data-edit-max="60">A first visit</span>
              </label>
              <label>
                <input type="radio" name="kind" value="checkup" />
                <span data-edit="book.text2" data-edit-max="60">A checkup</span>
              </label>
              <label>
                <input type="radio" name="kind" value="tooth" />
                <span data-edit="book.text3" data-edit-max="60">A sore or broken tooth</span>
              </label>
            </fieldset>
            <div className={`${s.field} ${s.fieldWide}`}>
              <label data-edit="book.label5" htmlFor="bs-notes">Anything we should know</label>
              <textarea id="bs-notes" name="notes" rows={3} placeholder="Nervous, sensory needs, a favorite toy" />
            </div>
            <button data-edit="book.submit" data-edit-max="24" type="submit" className={s.submit}>Ask for a time</button>
            <small data-edit="book.formFine" className={s.formFine}>We never share your details. Please keep medical history for the visit.</small>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <div className={s.footBrand}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Bright Smiles</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Children's dentistry at 18 Orchard Lane, Maple Hill. Ages 1-17.</p>
          </div>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}>
                <a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footContact}>
            (555) 016-8080
            <br />
            hello@brightsmiles.example
          </p>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional pediatric dental practice. Prices, hours and people are invented.</p>
          <p>
            Patterns by{' '}
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            , drawn live on a transparent ground.
          </p>
        </div>
      </footer>
    </div>
  );
}
