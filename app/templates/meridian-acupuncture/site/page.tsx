import { TabbiedPattern } from 'tabbied/react';
import { slashbar, streaking } from 'tabbied/patterns';
import s from './meridian-acupuncture.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Meridian Acupuncture: Acupuncture clinic, Weaver\'s Quarter',
  description:
    'Meridian Acupuncture is a small clinic up one flight on Tallow Street. Treatments and fees, what happens at a first visit, the sliding-scale community clinic, the three practitioners and how to book.',
};

/* Site colors. The scroll and the clinic panel are brushed in charcoal and
   indigo; the stroke field between sections lays its marks on the paper,
   with the odd one in seal red. */
const PAPER = '#f2ede3';
const INK = '#24231f';
const SEAL = '#b8392b';
const INDIGO = '#3f5566';

const SCROLL = [PAPER, INK, PAPER, INDIGO, PAPER];
const STROKES = ['transparent', INK, INDIGO, SEAL, INDIGO];
const NIGHT = [INK, PAPER, INK, INDIGO];

const NAV = [
  ['Treatments', '#treatments'],
  ['First visit', '#first-visit'],
  ['Community clinic', '#community'],
  ['Practitioners', '#practitioners'],
  ['Questions', '#questions'],
  ['Book', '#book'],
];

const TREATS = [
  'Back, neck and shoulder pain',
  'Headaches and migraine',
  'Sleep that will not come',
  'Stress and a racing mind',
  'Nausea, in pregnancy or with chemotherapy',
  'Period pain and irregular cycles',
  'Support alongside IVF',
  'Tennis elbow, knees, plantar fasciitis',
  'Hay fever and sinus trouble',
  'Digestion: bloating, reflux, IBS',
];

type Fee = {
  name: string;
  time: string;
  note: string;
  price: string;
};

const FEES: Fee[] = [
  { name: 'First visit', time: '90 min', note: 'A long conversation, then treatment', price: '$120' },
  { name: 'Return visit', time: '60 min', note: 'Treatment, with a check-in first', price: '$85' },
  { name: 'Five return visits', time: '60 min each', note: 'Paid ahead, used within six months', price: '$395' },
  { name: 'Cupping', time: 'with a visit', note: 'Glass cups on the back and shoulders', price: '+$20' },
  { name: 'Moxibustion', time: 'with a visit', note: 'Warming herb, held near the skin', price: '+$15' },
  { name: 'Ear seeds', time: '20 min', note: 'Tiny seeds taped to ear points, no needles', price: '$30' },
  { name: 'Herbal consultation', time: '30 min', note: 'Formulas made up here, herbs at cost', price: '$45' },
];

type Step = {
  when: string;
  what: string;
  detail: string;
};

const STEPS: Step[] = [
  { when: '0-25 min', what: 'We talk', detail: 'About what brought you in, and also sleep, digestion, your cycle, what you eat and how you feel in the afternoon. We look at your tongue and take your pulse at both wrists.' },
  { when: '25-35 min', what: 'You lie down', detail: 'Clothes stay on. Wear something with sleeves and trouser legs that roll up. There is a blanket, and a bolster for under your knees.' },
  { when: '35-75 min', what: 'The needles, then rest', detail: 'Usually eight to twelve, as fine as a hair. Most people feel a dull ache or nothing. Then the lights go down and you rest; we look in every ten minutes.' },
  { when: '75-90 min', what: 'What next', detail: 'Needles out, a glass of water, and an honest plan: how many visits we think it will take, and when you should expect to notice anything.' },
];

type Person = {
  seal: string;
  name: string;
  title: string;
  years: string;
  note: string;
};

const PEOPLE: Person[] = [
  { seal: 'HM', name: 'Hana Mori', title: 'L.Ac., founder', years: 'Eighteen years in practice', note: 'Trained in the shallow, gentle Japanese style. Sees most first visits, and anyone who is nervous of needles.' },
  { seal: 'DO', name: 'Daniel Osei', title: 'L.Ac., Dipl. OM', years: 'Eleven years in practice', note: 'Pain and injury: backs, knees, runners and people who lift. Also teaches the Tuesday community clinic.' },
  { seal: 'WL', name: 'Wen Li', title: 'L.Ac., herbalist', years: 'Nine years in practice', note: 'Cycles, fertility and pregnancy care, and the herbal dispensary. Works closely with two local midwives.' },
];

const QUESTIONS = [
  ['Does it hurt?', 'The needles are about as thick as a hair and go in quickly. You may feel a brief pinch, then a dull, heavy ache at the point, which is what we are looking for. If anything is sharp, say so and we take it out.'],
  ['How many visits will I need?', 'For something recent, often three to five, a week apart. For something you have had for years, we plan six to eight and review after four. We will not sell you a course you do not need.'],
  ['Is it covered by insurance?', 'We are not in any network, but we give you a superbill with the codes your insurer asks for. Many plans and health savings accounts pay back part of it.'],
  ['Can I come while pregnant?', 'Yes. Wen sees many pregnant patients, for nausea early on and for comfort later. Some points are avoided in pregnancy and we know which.'],
  ['What if I feel faint?', 'It is rare and passes quickly. Eat something light an hour before you come, and tell us if you have ever fainted at a blood test.'],
  ['Are the needles reused?', 'Never. Every needle is sterile, used once and dropped into a sharps box in front of you.'],
];

const HOURS = [
  ['Monday', '10 am to 7 pm'],
  ['Tuesday', '10 am to 8 pm, community clinic from 5'],
  ['Wednesday', 'Closed'],
  ['Thursday', '10 am to 7 pm'],
  ['Friday', '9 am to 3 pm'],
  ['Saturday', '9 am to 1 pm, community clinic'],
  ['Sunday', 'Closed'],
];

export default function MeridianAcupuncturePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandSeal} aria-hidden="true" />
          <span className={s.brandName}>Meridian</span>
          <span className={s.brandSub}>Acupuncture</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A vertical line of place on the left, the words in the middle,
            and a hanging scroll of brushed strokes on the right with the
            clinic's seal pressed into its corner. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <p className={s.heroSide}>41 Tallow Street, up one flight</p>
          <div className={s.heroText}>
            <p className={s.kicker}>Acupuncture clinic, Weaver's Quarter</p>
            <h1 id="hero-h" className={s.title}>
              Fine needles, a quiet room and <em>an hour that is yours.</em>
            </h1>
            <p className={s.lede}>
              Three practitioners, four treatment rooms and a shared room with
              six recliners for the sliding-scale clinic. We treat pain, sleep,
              stress, cycles and the things doctors shrug at, and we tell you
              plainly when you need a doctor instead.
            </p>
            <div className={s.actions}>
              <a className={s.button} href="#book">Book a first visit</a>
              <a className={s.textLink} href="#community">Community clinic, $25 to $50</a>
            </div>
          </div>
          <div className={s.scroll}>
            <div className={s.scrollField} aria-hidden="true">
              <TabbiedPattern
                pattern={streaking}
                palette={SCROLL}
                fit="grid"
                cellSize={52}
                seed="meridian-hanging"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.stamp} aria-hidden="true">
              <span>Me</span>
              <span>ri</span>
              <span>di</span>
              <span>an</span>
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------- THE CHANNEL
            From here a single line runs down the page, and each section is
            a point on it: its code in a small circle, its name set upright
            beside the line. */}
        <div className={s.channel}>
          <section id="treatments" className={s.station} aria-labelledby="treat-h">
            <div className={s.point}>
              <span className={s.pointCode}>LI 4</span>
              <p className={s.pointName}>Hegu, the joining valley. In the web of the hand.</p>
            </div>
            <div className={s.body}>
              <h2 id="treat-h">What we treat, and what it costs</h2>
              <p className={s.intro}>
                People most often come to us with one of these. If yours is not
                on the list, write and ask; if it is something we should not
                treat, we will say so and tell you who should.
              </p>
              <ul className={s.treats}>
                {TREATS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <table className={s.fees}>
                <caption className={s.srOnly}>Treatments, their length and their fees</caption>
                <thead>
                  <tr>
                    <th scope="col">Treatment</th>
                    <th scope="col">Length</th>
                    <th scope="col">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f) => (
                    <tr key={f.name}>
                      <th scope="row">
                        <span className={s.feeName}>{f.name}</span>
                        <span className={s.feeNote}>{f.note}</span>
                      </th>
                      <td className={s.feeTime}>{f.time}</td>
                      <td className={s.feePrice}>{f.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={s.small}>
                Card, cash or a health savings account card. A missed visit
                without a day's notice is charged in full, once; after that we
                ask for the fee when you book.
              </p>
            </div>
          </section>

          <div className={s.strokes} aria-hidden="true">
            <TabbiedPattern
              pattern={slashbar}
              palette={STROKES}
              options={{ frequency: 0.6 }}
              fit="grid"
              cellSize={30}
              seed="meridian-strokes"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <section id="first-visit" className={s.station} aria-labelledby="first-h">
            <div className={s.point}>
              <span className={s.pointCode}>PC 6</span>
              <p className={s.pointName}>Neiguan, the inner pass. Three fingers above the wrist.</p>
            </div>
            <div className={s.body}>
              <h2 id="first-h">Your first visit, ninety minutes</h2>
              <p className={s.intro}>
                Come ten minutes early to fill in one page. Eat a little
                beforehand, and bring a list of any medicines you take.
              </p>
              <ol className={s.steps}>
                {STEPS.map((st) => (
                  <li key={st.when}>
                    <p className={s.stepWhen}>{st.when}</p>
                    <h3>{st.what}</h3>
                    <p className={s.stepDetail}>{st.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="community" className={s.station} aria-labelledby="community-h">
            <div className={s.point}>
              <span className={s.pointCode}>SP 6</span>
              <p className={s.pointName}>Sanyinjiao, where three channels meet. Above the inner ankle.</p>
            </div>
            <div className={s.clinic}>
              <div className={s.clinicText}>
                <p className={s.clinicSeal}>Pay what you can</p>
                <h2 id="community-h">The community clinic</h2>
                <p className={s.clinicLede}>
                  Tuesday evenings from 5 to 8 and Saturday mornings from 9 to
                  1, in the big room at the back: six recliners, a low lamp and
                  forty minutes each. You keep your clothes on and we needle
                  hands, arms, lower legs, ears and scalp.
                </p>
                <dl className={s.scale}>
                  <div>
                    <dt>Each visit</dt>
                    <dd>$25 to $50</dd>
                  </div>
                  <div>
                    <dt>First time</dt>
                    <dd>add $10 for the intake</dd>
                  </div>
                  <div>
                    <dt>Who decides</dt>
                    <dd>You do, and nobody asks</dd>
                  </div>
                </dl>
                <p className={s.clinicSmall}>
                  Book a chair online or walk in; walk-ins are seen in the order
                  they arrive.
                </p>
              </div>
              <div className={s.clinicField} aria-hidden="true">
                <TabbiedPattern
                  pattern={streaking}
                  palette={NIGHT}
                  options={{ frequency: 0.7 }}
                  fit="grid"
                  cellSize={64}
                  seed="meridian-night"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
          </section>

          <section id="practitioners" className={s.station} aria-labelledby="people-h">
            <div className={s.point}>
              <span className={s.pointCode}>HT 7</span>
              <p className={s.pointName}>Shenmen, the spirit gate. On the crease of the wrist.</p>
            </div>
            <div className={s.body}>
              <h2 id="people-h">Three practitioners</h2>
              <ul className={s.people}>
                {PEOPLE.map((p) => (
                  <li key={p.name}>
                    <span className={s.personSeal}>{p.seal}</span>
                    <div>
                      <h3>{p.name}</h3>
                      <p className={s.personTitle}>{p.title}</p>
                      <p className={s.personNote}>{p.note}</p>
                      <p className={s.personYears}>{p.years}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="questions" className={s.station} aria-labelledby="questions-h">
            <div className={s.point}>
              <span className={s.pointCode}>GV 20</span>
              <p className={s.pointName}>Baihui, a hundred meetings. The crown of the head.</p>
            </div>
            <div className={s.body}>
              <h2 id="questions-h">What people ask before they come</h2>
              <div className={s.faq}>
                {QUESTIONS.map(([q, a]) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <div className={s.strokes} aria-hidden="true">
            <TabbiedPattern
              pattern={slashbar}
              palette={STROKES}
              options={{ frequency: 0.6 }}
              fit="grid"
              cellSize={30}
              seed="meridian-rain"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <section id="book" className={s.station} aria-labelledby="book-h">
            <div className={s.point}>
              <span className={s.pointCode}>KI 1</span>
              <p className={s.pointName}>Yongquan, the bubbling spring. The sole of the foot.</p>
            </div>
            <div className={s.body}>
              <h2 id="book-h">Hours, and how to book</h2>
              <div className={s.visit}>
                <div>
                  <dl className={s.hours}>
                    {HOURS.map(([d, h]) => (
                      <div key={d}>
                        <dt>{d}</dt>
                        <dd>{h}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className={s.address}>41 Tallow Street, second floor</p>
                  <p className={s.small}>
                    Weaver's Quarter. The green door beside the tea shop; there
                    is a lift. Street parking is metered until 6.
                  </p>
                  <p className={s.contact}>
                    <a href="tel:+15550193344">(555) 019-3344</a>
                  </p>
                  <p className={s.contact}>
                    <a href="mailto:rooms@meridianacupuncture.example">rooms@meridianacupuncture.example</a>
                  </p>
                </div>
                <form className={s.form} action="#">
                  <h3>Ask for a time</h3>
                  <div className={s.field}>
                    <label htmlFor="mer-name">Name</label>
                    <input id="mer-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="mer-contact">Phone or email</label>
                    <input id="mer-contact" name="contact" type="text" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label htmlFor="mer-kind">Visit</label>
                    <select id="mer-kind" name="kind" defaultValue="first">
                      <option value="first">First visit, 90 minutes</option>
                      <option value="return">Return visit, 60 minutes</option>
                      <option value="community">Community clinic chair</option>
                      <option value="herbs">Herbal consultation</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="mer-note">What brings you in, and when suits you</label>
                    <textarea id="mer-note" name="note" rows={4} />
                  </div>
                  <button className={s.button} type="submit">Send</button>
                  <p className={s.small}>We reply within a working day with two or three times to choose from.</p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={s.footer}>
        <p className={s.footName}>Meridian Acupuncture</p>
        <p>A fictional acupuncture clinic. The practitioners, fees and hours are invented, and nothing here is medical advice.</p>
        <p>
          Patterns by <a href="https://tabbied.com">Tabbied</a>.
        </p>
      </footer>
    </div>
  );
}
