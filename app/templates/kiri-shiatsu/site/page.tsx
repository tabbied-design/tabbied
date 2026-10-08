import { TabbiedPattern } from 'tabbied/react';
import { hempleaf } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './kiri-shiatsu.module.css';

export const metadata = {
  title: 'Kiri Shiatsu: Shiatsu on Ash Row',
  description:
    'Kiri is a one-room shiatsu practice above the bookbinder on Ash Row. Slow pressure through loose clothing on a futon on the floor: what a session is like, what to wear, the fees and the practitioner.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The hemp leaf
   is woven as indigo cloth: it hangs as the scroll in the hero and as the
   noren at the door of the second half, sits as a crest beside the bio and
   lines the foot of the page in the practice's own inks. */
const WASHI = '#f2ede3';
const SUMI = '#2b2a27';
const INDIGO = '#2f4b6e';
const PERSIMMON = '#c0603a';
const MATCHA = '#6f7f4f';

const CLOTH = ['transparent', WASHI, WASHI, WASHI, PERSIMMON];
const CREST = ['transparent', INDIGO, PERSIMMON, MATCHA, INDIGO];
const HEM = ['transparent', INDIGO, MATCHA, PERSIMMON, SUMI];

const NAV = [
  ['A session', '#session'],
  ['What to wear', '#wear'],
  ['Fees', '#fees'],
  ['Practitioner', '#practitioner'],
  ['Book', '#book'],
];

const SESSION = [
  ['First 10 minutes', 'We talk', 'What brings you, how you sleep, what your work asks of your body. I write a few notes; you do not need the right words.'],
  ['40 minutes', 'On the futon', 'You lie on a cotton futon on the floor, fully clothed. I lean in slowly with palms and thumbs along the back, legs, arms and neck. Pressure is held, never rubbed. Say so and it is lighter.'],
  ['5 minutes', 'Stillness', 'A few minutes under a blanket with nothing to do. Many people sleep here; that is welcome.'],
  ['Last 5 minutes', 'Tea and a note', 'Barley tea, and one or two things to try at home: a stretch, a walk at lunch, an earlier night.'],
];

const WEAR = [
  'Soft, loose clothes you can bend in: a T-shirt with sweatpants or leggings',
  'Socks; the floor is wooden and cool in winter',
  'Thin layers rather than one thick sweater',
];

const AVOID = [
  'Jeans, belts, and anything with a zip down the back',
  'A heavy meal in the hour before',
  'Perfume or strong scent; the room is small',
];

const FEES = [
  ['First visit', '75 minutes, with a longer talk', '$95'],
  ['Session', '60 minutes', '$80'],
  ['Long session', '90 minutes', '$110'],
  ['Five sessions', 'used within six months', '$370'],
  ['Concession', 'students, over-65s, unwaged', '$60'],
];

const CREDENTIALS = [
  ['Trained', 'Three-year diploma, Kyoto, 2013'],
  ['Practicing', 'Since 2013, on Ash Row since 2019'],
  ['Registered', 'Guild of Shiatsu Practitioners, no. 4471'],
  ['Languages', 'English and Japanese'],
];

const HOURS = [
  ['Tuesday to Friday', '10:00-19:00'],
  ['Saturday', '9:00-14:00'],
  ['Sunday and Monday', 'Closed'],
];

const LENGTHS = ['First visit, 75 min', '60 min', '90 min'];

export default function KiriShiatsuPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--washi': '#f2ede3',
        '--sumi': '#2b2a27',
        '--indigo': '#2f4b6e',
        '--persimmon': '#c0603a',
        '--matcha': '#6f7f4f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="washi,sumi,indigo,persimmon,matcha"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;600&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Kiri</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Shiatsu on Ash Row</span>
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
        {/* HERO: a hanging scroll of indigo hemp-leaf cloth beside the words. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <p data-edit="intro.vertical" data-edit-max="240" data-edit-multiline className={s.vertical}>Kiri Shiatsu, since 2019</p>
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Japanese bodywork, one room, one practitioner</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Slow pressure, <em>a quieter body.</em>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Shiatsu is given through loose clothing on a futon on the floor:
              palms and thumbs leaning slowly along the meridians, held until
              the muscle under them lets go. Kiri is a small practice above the
              bookbinder on Ash Row.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#book">Book a first visit</a>
              <a data-edit="intro.textLink" data-edit-max="28" className={s.textLink} href="#session">What a session is like</a>
            </div>
            <p data-edit="intro.heroNote" data-edit-max="240" data-edit-multiline className={s.heroNote}>First visit 75 minutes, $95. Tuesday to Saturday.</p>
          </div>
          <figure className={s.scroll}>
            <span className={s.rod} aria-hidden="true" />
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,0,0,0,3" className={s.cloth} aria-hidden="true">
              <TabbiedPattern pattern={hempleaf} palette={CLOTH} fit="grid" cellSize={56} seed="kiri-scroll-b" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <span className={s.rod} aria-hidden="true" />
            <figcaption data-edit="intro.scrollCaption" data-edit-max="120" data-edit-multiline className={s.scrollCaption}>Asanoha, the hemp leaf: a cloth for things that grow straight.</figcaption>
          </figure>
        </section>

        {/* The meridian: one line down the page, a point at every section. */}
        <div className={s.flow}>
          <section id="session" className={s.sec} aria-labelledby="session-h">
            <p data-edit="session.point" data-edit-max="240" data-edit-multiline className={s.point}>LI 4</p>
            <h2 data-edit="session.secTitle" data-edit-max="60" id="session-h" className={s.secTitle}>What a session is like</h2>
            <p data-edit="session.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
              An hour, give or take, in a warm room with the blind half down.
              Nothing is oiled and nothing comes off but your shoes.
            </p>
            <ol className={s.timeline}>
              {SESSION.map(([time, title, text], i) => (
                <li key={title} className={s.moment}>
                  <p data-edit={`session.time.${i}`} data-edit-max="240" data-edit-multiline className={s.time}>{time}</p>
                  <h3 data-edit={`session.momentTitle.${i}`} data-edit-max="40" className={s.momentTitle}>{title}</h3>
                  <p data-edit={`session.momentText.${i}`} data-edit-max="240" data-edit-multiline className={s.momentText}>{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="wear" className={s.sec} aria-labelledby="wear-h">
            <p data-edit="wear.point" data-edit-max="240" data-edit-multiline className={s.point}>ST 36</p>
            <h2 data-edit="wear.secTitle" data-edit-max="60" id="wear-h" className={s.secTitle}>What to wear</h2>
            <p data-edit="wear.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
              Dress as if for a long walk on a soft day. There is a changing
              corner with a mirror and hooks if you come from work.
            </p>
            <div className={s.wearGrid}>
              <div className={s.wearCol}>
                <h3 data-edit="wear.wearTitle" data-edit-max="40" className={s.wearTitle}>Wear</h3>
                <ul className={s.wearList}>
                  {WEAR.map((w, i) => (
                    <li data-edit={`wear.item.${i}`} data-edit-max="80" key={w}>{w}</li>
                  ))}
                </ul>
              </div>
              <div className={s.wearCol}>
                <h3 data-edit="wear.wearTitle2" data-edit-max="40" className={s.wearTitle}>Leave at home</h3>
                <ul className={`${s.wearList} ${s.avoid}`}>
                  {AVOID.map((w, i) => (
                    <li data-edit={`wear.item2.${i}`} data-edit-max="80" key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className={s.noren}>
          <span className={s.norenRod} aria-hidden="true" />
          <div data-edit-pattern="top.field" data-edit-roles="transparent,0,0,0,3" className={s.norenCloth} aria-hidden="true">
            <TabbiedPattern pattern={hempleaf} palette={CLOTH} fit="grid" cellSize={44} seed="kiri-noren" style={{ position: 'absolute', inset: 0 }} />
          </div>
        </div>

        <div className={s.flow}>
          <section id="fees" className={s.sec} aria-labelledby="fees-h">
            <p data-edit="fees.point" data-edit-max="240" data-edit-multiline className={s.point}>SP 6</p>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>Fees</h2>
            <p data-edit="fees.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
              Paid at the end, by card or cash. Cancel at least a day ahead and
              there is nothing to pay.
            </p>
            <ul className={s.fees}>
              {FEES.map(([name, detail, price], i) => (
                <li key={name} className={s.fee}>
                  <p data-edit={`fees.feeName.${i}`} data-edit-max="240" data-edit-multiline className={s.feeName}>{name}</p>
                  <p data-edit={`fees.feeDetail.${i}`} data-edit-max="240" data-edit-multiline className={s.feeDetail}>{detail}</p>
                  <p data-edit={`fees.feePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.feePrice}>{price}</p>
                </li>
              ))}
            </ul>
            <p data-edit="fees.gift" data-edit-max="240" data-edit-multiline className={s.gift}>Gift vouchers for any session, posted in a hand-folded envelope.</p>
          </section>

          <section id="practitioner" className={s.sec} aria-labelledby="practitioner-h">
            <p data-edit="practitioner.point" data-edit-max="240" data-edit-multiline className={s.point}>HT 7</p>
            <h2 data-edit="practitioner.secTitle" data-edit-max="60" id="practitioner-h" className={s.secTitle}>Mika Sorell</h2>
            <div className={s.bio}>
              <div data-edit-pattern="practitioner.field" data-edit-roles="transparent,2,3,4,2" className={s.crest} aria-hidden="true">
                <TabbiedPattern pattern={hempleaf} palette={CREST} fit="grid" cellSize={34} seed="kiri-crest" style={{ position: 'absolute', inset: 0 }} />
              </div>
              <div className={s.bioText}>
                <p data-edit="practitioner.bioLead" data-edit-max="240" data-edit-multiline className={s.bioLead}>
                  Mika was a dancer until a knee said otherwise. She trained for
                  three years at a shiatsu school in Kyoto, worked in a clinic in
                  Osaka, and opened Kiri in 2019 in the room where she still
                  works.
                </p>
                <p data-edit="practitioner.bioMore" data-edit-max="240" data-edit-multiline className={s.bioMore}>
                  Her touch is slow and steady rather than strong, and she will
                  ask more than once whether the pressure is right. She also
                  teaches a Thursday evening stretching class for the people on
                  her books who sit all day.
                </p>
                <dl className={s.creds}>
                  {CREDENTIALS.map(([k, v], i) => (
                    <div key={k}>
                      <dt data-edit={`practitioner.term.${i}`} data-edit-max="28">{k}</dt>
                      <dd data-edit={`practitioner.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        </div>

        {/* BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div className={s.visit}>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book a session</h2>
              <p data-edit="book.secLead" data-edit-max="240" data-edit-multiline className={s.secLead}>
                Mika answers messages herself between sessions, usually the same
                day. Tell her if you are pregnant, recovering from surgery or
                living with a heart condition.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Room</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>Second floor, 14 Ash Row, above the bookbinder</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>(555) 016-3381</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>hello@kirishiatsu.example</dd>
                </div>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body4.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="book.access" data-edit-max="240" data-edit-multiline className={s.access}>Twenty-two stairs and no lift. Home visits within the city on Saturdays, $30 extra.</p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="ks-name">Name</label>
                <input id="ks-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="ks-email">Email</label>
                <input id="ks-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="ks-phone">Phone</label>
                <input id="ks-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <fieldset className={`${s.field} ${s.fieldset}`}>
                <legend data-edit="book.legend">Length</legend>
                <div className={s.picks}>
                  {LENGTHS.map((l, i) => (
                    <div key={l} className={s.pick}>
                      <input id={`ks-len-${i}`} type="radio" name="length" value={l} />
                      <label data-edit={`book.label4.${i}`} htmlFor={`ks-len-${i}`}>{l}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="ks-when">Days and times that suit you</label>
                <input id="ks-when" name="when" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label6" htmlFor="ks-note">Anything Mika should know</label>
                <textarea id="ks-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,3,1" className={s.hem} aria-hidden="true">
          <TabbiedPattern pattern={hempleaf} palette={HEM} fit="grid" cellSize={40} seed="kiri-hem" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Kiri Shiatsu</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional shiatsu practice. The names, people, prices and address
            are invented, and nothing here is medical advice.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
