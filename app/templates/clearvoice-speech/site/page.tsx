import { TabbiedPattern } from 'tabbied/react';
import { lobeform } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './clearvoice-speech.module.css';

export const metadata = {
  title: 'Clearvoice Speech Therapy: Speech-language pathology for children and adults',
  description:
    'Clearvoice is a speech-language pathology practice for late talkers, speech sounds, stuttering, voice and language after a stroke. In the clinic or by video, with most insurance plans accepted.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Lobeform's
   leaf, three corners round and one square, is a speech bubble with its
   tail tucked in, so the whole page talks in that shape: the hero is one
   big bubble of lobes, the cards are bubbles, the sounds chart is a field
   of them, and the pattern comes back behind teletherapy and the footer. */
const CREAM = '#fbf6ef';
const PLUM = '#2d2350';
const CORAL = '#ef6f57';
const TEAL = '#2a9d8f';
const BUTTER = '#f4c95d';
const SKY = '#9cc5ef';

const HERO_LOBES = ['transparent', PLUM, CORAL, TEAL, BUTTER, SKY];
const SCREEN_LOBES = ['transparent', SKY, BUTTER, CORAL, TEAL, CREAM];
const FOOT_LOBES = ['transparent', CORAL, BUTTER, TEAL, SKY, CREAM];

const NAV = [
  ['Who we help', '#help'],
  ['Sounds by age', '#sounds'],
  ['First visit', '#visit'],
  ['Teletherapy', '#teletherapy'],
  ['Fees', '#fees'],
  ['Contact', '#contact'],
];

type Service = { title: string; text: string; ages: string };

const CHILDREN: Service[] = [
  { title: 'Late talkers', text: 'Fewer than 50 words at two, or no two-word phrases. We coach you to grow words in play, at home, every day.', ages: '18 months to 3 years' },
  { title: 'Speech sounds', text: 'Wabbit for rabbit, tup for cup, a lisp that has outstayed its welcome. Short, playful drills, and a sticker at the end.', ages: '3 to 10 years' },
  { title: 'Language and reading', text: 'Following directions, telling a story in order, the sounds inside words that early reading is built on.', ages: '4 to 12 years' },
  { title: 'Stuttering', text: 'Talking more, not less. We work with the child and the family, and with teachers when the child wants us to.', ages: 'from age 3' },
];

const ADULTS: Service[] = [
  { title: 'After a stroke or brain injury', text: 'Aphasia therapy to find words again, read the paper and use the phone, with your family in the room if you like.', ages: 'any age' },
  { title: 'Voice', text: 'Hoarseness, vocal nodules, a voice that tires by noon. Common in teachers, singers and anyone who talks for a living.', ages: 'adults and teens' },
  { title: 'Stuttering', text: 'Easier starts, fewer blocks on the phone and in meetings, and less dread before you speak.', ages: 'adults and teens' },
  { title: 'Parkinson\'s and other conditions', text: 'A louder, clearer voice through an intensive four-week program, then check-ins to keep it.', ages: 'adults' },
];

/* When about nine in ten children say each sound clearly in words. */
const SOUNDS = [
  { age: 'By 3', tone: 'plum', sounds: ['p', 'b', 'm', 'h', 'w', 'n'] },
  { age: 'By 4', tone: 'teal', sounds: ['t', 'd', 'k', 'g', 'f', 'y'] },
  { age: 'By 5', tone: 'coral', sounds: ['ng', 'l', 'v'] },
  { age: 'By 6', tone: 'butter', sounds: ['s', 'z', 'sh', 'ch', 'j'] },
  { age: 'By 7', tone: 'sky', sounds: ['r', 'th', 'zh'] },
];

const VISIT = [
  ['A free phone call', '15 minutes with a therapist, not a receptionist. Is it worth an evaluation, or worth waiting six months?'],
  ['The evaluation', '60 to 90 minutes of games and conversation for children, tasks and talk for adults. Standardized tests where they help.'],
  ['A written plan', 'Results in plain language within a week, two or three goals you agree with, and how often to come.'],
  ['Weekly sessions', '45 minutes, in the clinic or by video, with ten minutes of practice to do at home most days.'],
];

const FEES = [
  ['Free phone consultation', '15 min', '$0'],
  ['Evaluation and written report', '60-90 min', '$240'],
  ['Therapy session', '45 min', '$135'],
  ['Teletherapy session', '45 min', '$135'],
  ['School or IEP meeting', 'per hour', '$110'],
];

const INSURERS = ['Bluewater Health', 'Cedar Mutual', 'Keystone Care', 'Northway Plans', 'Prairie Family Health', 'Medicaid managed care'];

const THERAPISTS = [
  { name: 'Nadia Restrepo, M.S., CCC-SLP', role: 'Founder, children and stuttering', note: 'Eighteen years in schools and clinics. Speaks English and Spanish.' },
  { name: 'Owen Whitlock, M.A., CCC-SLP', role: 'Adults, voice and aphasia', note: 'Ten years on a hospital rehab unit before joining in 2021.' },
  { name: 'Grace Adeyemi, M.S., CCC-SLP', role: 'Late talkers and early language', note: 'Comes to your home for children under three.' },
];

export default function ClearvoiceSpeechPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#fbf6ef',
        '--plum': '#2d2350',
        '--coral': '#ef6f57',
        '--teal': '#2a9d8f',
        '--butter': '#f4c95d',
        '--sky': '#9cc5ef',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,plum,coral,teal,butter,sky"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Clearvoice</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Speech Therapy</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#contact">Free phone call</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section id="hero" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Speech-language pathology on Larkspur Lane</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Every word, <em>a little easier.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We help children find their first words and their hardest sounds,
              and help adults find their words again after a stroke, or keep a
              voice that works all day. In the clinic, at home, or by video.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free phone call</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#sounds">Is my child on track?</a>
            </div>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,5" className={s.heroBubble} aria-hidden="true">
              <TabbiedPattern
                pattern={lobeform}
                palette={HERO_LOBES}
                fit="grid"
                cellSize={64}
                seed="clearvoice-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.saySmall}>
              <p data-edit="hero.sayLabel" data-edit-max="240" data-edit-multiline className={s.sayLabel}>Next openings</p>
              <p data-edit="hero.sayText" data-edit-max="240" data-edit-multiline className={s.sayText}>Tuesday 3:30, Thursday 4:15</p>
            </div>
            <div className={s.sayLarge}>
              <p data-edit="hero.sayFigure" data-edit-max="240" data-edit-multiline className={s.sayFigure}>9 in 10</p>
              <p data-edit="hero.sayText2" data-edit-max="240" data-edit-multiline className={s.sayText}>families see progress on their first goal within twelve weeks.</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ WHO WE HELP */}
        <section id="help" className={s.sec} aria-labelledby="help-h">
          <div className={s.head}>
            <h2 data-edit="help.title" data-edit-max="60" id="help-h" className={s.title}>Who we help</h2>
            <p data-edit="help.note" data-edit-max="240" data-edit-multiline className={s.note}>
              Two conversations that need different therapists, so we have both.
              Every one of us holds the national certificate of clinical
              competence and a state license.
            </p>
          </div>
          <div className={s.threads}>
            <div className={s.thread}>
              <h3 data-edit="help.threadTitle" data-edit-max="40" className={s.threadTitle}>Children</h3>
              <ul className={s.bubbles}>
                {CHILDREN.map((c, i) => (
                  <li key={c.title} className={s.bubble}>
                    <h4 data-edit={`help.bubbleTitle.${i}`} data-edit-max="36" className={s.bubbleTitle}>{c.title}</h4>
                    <p data-edit={`help.bubbleText.${i}`} data-edit-max="240" data-edit-multiline className={s.bubbleText}>{c.text}</p>
                    <p data-edit={`help.bubbleAges.${i}`} data-edit-max="240" data-edit-multiline className={s.bubbleAges}>{c.ages}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${s.thread} ${s.threadRight}`}>
              <h3 data-edit="help.threadTitle2" data-edit-max="40" className={s.threadTitle}>Adults</h3>
              <ul className={s.bubbles}>
                {ADULTS.map((a, i) => (
                  <li key={a.title} className={s.bubble}>
                    <h4 data-edit={`help.bubbleTitle2.${i}`} data-edit-max="36" className={s.bubbleTitle}>{a.title}</h4>
                    <p data-edit={`help.bubbleText2.${i}`} data-edit-max="240" data-edit-multiline className={s.bubbleText}>{a.text}</p>
                    <p data-edit={`help.bubbleAges2.${i}`} data-edit-max="240" data-edit-multiline className={s.bubbleAges}>{a.ages}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- SOUNDS BY AGE */}
        <section id="sounds" className={`${s.sec} ${s.tinted}`} aria-labelledby="sounds-h">
          <div className={s.soundsGrid}>
            <div className={s.head}>
              <h2 data-edit="sounds.title" data-edit-max="60" id="sounds-h" className={s.title}>Sounds by age</h2>
              <p data-edit="sounds.note" data-edit-max="240" data-edit-multiline className={s.note}>
                The age by which about nine in ten children say each sound clearly
                in words. One sound a little late is common. Several sounds a
                year behind, or speech that strangers cannot follow at three, is
                worth a screen.
              </p>
              <p data-edit="sounds.chartNote" data-edit-max="240" data-edit-multiline className={s.chartNote}>
                Screens are free for children under six. Call and ask for one.
              </p>
            </div>
            <ol className={s.chart}>
              {SOUNDS.map((row, i) => (
                <li key={row.age} className={`${s.chartRow} ${s[row.tone]}`}>
                  <span data-edit={`sounds.chartAge.${i}`} data-edit-max="60" className={s.chartAge}>{row.age}</span>
                  <ul className={s.chips}>
                    {row.sounds.map((snd, i2) => (
                      <li data-edit={`sounds.chip.${i}.${i2}`} data-edit-max="80" key={snd} className={s.chip}>{snd}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------ FIRST VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="visit-h">
          <div className={s.head}>
            <h2 data-edit="visit.title" data-edit-max="60" id="visit-h" className={s.title}>Your first visit</h2>
            <p data-edit="visit.note" data-edit-max="240" data-edit-multiline className={s.note}>
              Most families are seen within ten days of the first call. No
              referral is needed, though some insurance plans ask for one.
            </p>
          </div>
          <ol className={s.steps}>
            {VISIT.map(([t, d], i) => (
              <li key={t} className={s.step}>
                <span className={s.stepNo}>{i + 1}</span>
                <h3 data-edit={`visit.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                <p data-edit={`visit.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ TELETHERAPY */}
        <section id="teletherapy" className={s.tele} aria-labelledby="tele-h">
          <div className={s.teleInner}>
            <div className={s.teleScreen}>
              <div data-edit-pattern="teletherapy.field" data-edit-roles="transparent,5,4,2,3,0" className={s.teleField} aria-hidden="true">
                <TabbiedPattern
                  pattern={lobeform}
                  palette={SCREEN_LOBES}
                  fit="grid"
                  cellSize={52}
                  seed="clearvoice-screen"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="teletherapy.teleCaption" data-edit-max="240" data-edit-multiline className={s.teleCaption}>Live, two-way video, recorded never</p>
            </div>
            <div className={s.teleText}>
              <h2 data-edit="teletherapy.teleTitle" data-edit-max="60" id="tele-h" className={s.teleTitle}>Teletherapy, same therapist, same price</h2>
              <p data-edit="teletherapy.teleLead" data-edit-max="240" data-edit-multiline className={s.teleLead}>
                Video sessions work as well as the clinic for most adults and for
                children from about four. They save the drive, and the practice
                happens where the talking does: at your own kitchen table.
              </p>
              <h3 data-edit="teletherapy.kitTitle" data-edit-max="40" className={s.kitTitle}>What you need</h3>
              <ul className={s.kit}>
                <li data-edit="teletherapy.item" data-edit-max="80">A laptop or tablet, not a phone</li>
                <li data-edit="teletherapy.item2" data-edit-max="80">Headphones with a microphone</li>
                <li data-edit="teletherapy.item3" data-edit-max="80">A quiet room and a grown-up nearby for children under eight</li>
                <li data-edit="teletherapy.item4" data-edit-max="80">A link we email the day before. Nothing to install.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.feesGrid}>
            <div>
              <div className={s.head}>
                <h2 data-edit="fees.title" data-edit-max="60" id="fees-h" className={s.title}>Fees and insurance</h2>
                <p data-edit="fees.note" data-edit-max="240" data-edit-multiline className={s.note}>
                  We bill your insurer directly and tell you before the first
                  session what your plan is likely to cover.
                </p>
              </div>
              <table className={s.fees}>
                <caption data-edit="fees.srOnly" className={s.srOnly}>Fees for each kind of visit</caption>
                <thead>
                  <tr>
                    <th data-edit="fees.heading" scope="col">Visit</th>
                    <th data-edit="fees.heading2" scope="col">Length</th>
                    <th data-edit="fees.heading3" scope="col">Self-pay</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map(([v, l, p], i) => (
                    <tr key={v}>
                      <th data-edit={`fees.heading4.${i}`} scope="row">{v}</th>
                      <td data-edit={`fees.cell.${i}`}>{l}</td>
                      <td data-edit={`fees.cell2.${i}`}>{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={s.insurance}>
              <h3 data-edit="fees.insTitle" data-edit-max="40" className={s.insTitle}>In network with</h3>
              <ul className={s.insList}>
                {INSURERS.map((n, i) => (
                  <li data-edit={`fees.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                ))}
              </ul>
              <p data-edit="fees.insNote" data-edit-max="240" data-edit-multiline className={s.insNote}>
                Out of network? We give you a superbill to send in yourself, and
                a sliding scale is open to any family that asks.
              </p>
              <h3 data-edit="fees.insTitle2" data-edit-max="40" className={s.insTitle}>The therapists</h3>
              <ul className={s.people}>
                {THERAPISTS.map((t, i) => (
                  <li key={t.name}>
                    <p data-edit={`fees.personName.${i}`} data-edit-max="240" data-edit-multiline className={s.personName}>{t.name}</p>
                    <p data-edit={`fees.personRole.${i}`} data-edit-max="240" data-edit-multiline className={s.personRole}>{t.role}</p>
                    <p data-edit={`fees.personNote.${i}`} data-edit-max="240" data-edit-multiline className={s.personNote}>{t.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- CONTACT */}
        <section id="contact" className={`${s.sec} ${s.tinted}`} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <h2 data-edit="contact.title" data-edit-max="60" id="contact-h" className={s.title}>Start with a free call</h2>
              <p data-edit="contact.note" data-edit-max="240" data-edit-multiline className={s.note}>
                Leave a time that suits you and a therapist will call. Or ring the
                front desk, where Marisol answers from eight.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Clinic</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>22 Larkspur Lane, Suite 3, Brookhaven</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>(555) 015-3340</dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd data-edit="contact.body3" data-edit-max="200" data-edit-multiline>hello@clearvoice.example</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Hours</dt>
                  <dd data-edit="contact.body4" data-edit-max="200" data-edit-multiline>Monday to Thursday 8:00-7:00, Friday 8:00-3:00</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="cv-name">Your name</label>
                <input id="cv-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="cv-phone">Phone</label>
                <input id="cv-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="cv-for">The therapy is for</label>
                <select id="cv-for" name="for" defaultValue="child">
                  <option value="child">My child</option>
                  <option value="me">Me</option>
                  <option value="family">A family member</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="cv-when">Best time to call</label>
                <select id="cv-when" name="when" defaultValue="morning">
                  <option value="morning">Morning</option>
                  <option value="midday">Midday</option>
                  <option value="afternoon">After school</option>
                  <option value="evening">Early evening</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="cv-note">What you have noticed</label>
                <textarea id="cv-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,3,5,0" className={s.footLobes} aria-hidden="true">
          <TabbiedPattern
            pattern={lobeform}
            palette={FOOT_LOBES}
            fit="grid"
            cellSize={40}
            seed="clearvoice-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Clearvoice Speech Therapy</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional practice. The therapists, prices, insurers and address are invented, and nothing here is medical advice.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
