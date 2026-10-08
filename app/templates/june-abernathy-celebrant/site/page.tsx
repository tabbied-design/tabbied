import { TabbiedPattern } from 'tabbied/react';
import { blossom } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './june-abernathy-celebrant.module.css';

export const metadata = {
  title: 'June Abernathy: Wedding officiant and celebrant',
  description:
    'June Abernathy writes and leads wedding ceremonies, elopements and vow renewals: civil, spiritual or two traditions at once. Written with the couple, rehearsed, and legally signed and filed.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is an
   order of service: each section is an item in the printed program, from
   the welcome to the recessional. Blossom is the flowers: petals and
   scallops in rose, sage, marigold and blush. On a plum ground it fills the
   garden arch in the hero and the round portrait frame; on blush it borders
   the marriage certificate and edges the footer. */
const BLUSH = '#fbf1ec';
const PLUM = '#3d2140';
const ROSE = '#d4637a';
const SAGE = '#7e9a6d';
const MARIGOLD = '#e7a23b';

const ARBOR = [PLUM, ROSE, SAGE, MARIGOLD, BLUSH, ROSE];
const POSY = [PLUM, MARIGOLD, ROSE, BLUSH, SAGE, ROSE];
const GARLAND = [BLUSH, ROSE, SAGE, MARIGOLD, PLUM, SAGE];

const NAV = [
  ['Ceremonies', '#ceremonies'],
  ['How we write it', '#writing'],
  ['Fees', '#fees'],
  ['Paperwork', '#paperwork'],
  ['Contact', '#contact'],
];

const ORDER = [
  ['The Welcome', 'Meet June', '#welcome'],
  ['The Readings', 'Ceremony styles', '#ceremonies'],
  ['The Vows', 'Writing it together', '#writing'],
  ['The Rings', 'Fees', '#fees'],
  ['The Signing', 'The paperwork', '#paperwork'],
  ['The Recessional', 'Check your date', '#contact'],
];

type Style = { name: string; length: string; text: string; rituals: string };

const STYLES: Style[] = [
  { name: 'A civil ceremony', length: '20 minutes', text: 'Your story, your vows and the legal words, with no religious content at all. The most asked for, and never the shortest on feeling.', rituals: 'Readings from poems or novels, a ring warming, a family welcome' },
  { name: 'Spiritual, not religious', length: '25 minutes', text: 'A blessing in plain words, a moment of quiet, a ritual that means something to you rather than to a church.', rituals: 'Handfasting, a unity candle, a sand ceremony, a tree planting' },
  { name: 'Two traditions', length: '30 minutes', text: 'For couples from two faiths or two cultures. We bring in a piece of each family, explained so the other side of the aisle feels included.', rituals: 'Breaking the glass, a tea ceremony, a lasso, the seven steps' },
  { name: 'An elopement', length: '10 minutes', text: 'The two of you, two witnesses and me, on a hill or in a kitchen. Everything legal, nothing extra, and still written for you.', rituals: 'Usually just the vows, the rings and a long quiet look' },
  { name: 'A vow renewal', length: '15 minutes', text: 'Ten, twenty-five or fifty years on. The children or grandchildren often read, and the second set of vows is usually funnier.', rituals: 'Rings re-given, letters read aloud, the first-dance song played again' },
];

const TIMELINE = [
  ['Any time before', 'A first call', 'Thirty minutes, free. You tell me the date and the place; I tell you if I am free and what I would do.'],
  ['Four months before', 'The long evening', 'A questionnaire each, then two hours over dinner or video: how you met, what you argue about, who must not be left out.'],
  ['Ten weeks before', 'The first draft', 'I read the whole ceremony aloud to you on a call, so you hear it before you read it. Change anything.'],
  ['One month before', 'Vows and final draft', 'Help with your own vows if you want it: one coaching call, and I keep them secret from each other.'],
  ['The week of', 'The rehearsal', 'I run it: who walks when, where everyone stands, where the rings are. Twenty-five minutes, then dinner.'],
  ['The day', 'The ceremony', 'I arrive forty-five minutes early, test the microphone, calm whoever needs calming, and sign the license after.'],
];

type Fee = { name: string; price: string; sub: string; items: string[] };

const FEES: Fee[] = [
  { name: 'The elopement', price: '$450', sub: 'Up to ten guests, weekdays', items: ['A short written ceremony', 'One video call beforehand', 'License signed and filed', 'Two witnesses found if you need them'] },
  { name: 'The ceremony', price: '$950', sub: 'Most weddings', items: ['The long evening and two drafts', 'Your own vows coached', 'Microphone and speaker brought', 'License signed and filed'] },
  { name: 'The whole weekend', price: '$1,350', sub: 'With the rehearsal', items: ['Everything in the ceremony', 'Running the rehearsal', 'A printed copy for each family', 'Unlimited calls until the day'] },
];

const PAPERS = [
  ['The license', 'You apply together at the county clerk, in person, with photo ID. It costs $60 and is valid for 60 days.'],
  ['The wait', 'A 24-hour waiting period after the license is issued. Do not leave it to the Friday before a Saturday wedding.'],
  ['Two witnesses', 'Anyone over 18 who saw the ceremony. They sign in black ink, right after the kiss.'],
  ['The filing', 'I return the signed license to the clerk within five days and email you when it is recorded.'],
  ['Certified copies', 'Order them from the county for $15 each. You will want three: name changes, banks, passports.'],
];

const HOURS = [
  ['Calls', 'Tuesday to Friday, 10:00-6:00'],
  ['Meetings', 'Evenings, by appointment'],
  ['Saturdays', 'Taken: someone is getting married'],
];

export default function JuneAbernathyCelebrantPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--blush': '#fbf1ec',
        '--plum': '#3d2140',
        '--rose': '#d4637a',
        '--sage': '#7e9a6d',
        '--marigold': '#e7a23b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="blush,plum,rose,sage,marigold"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,500&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>June Abernathy</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Celebrant and officiant</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#contact">Check your date</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A garden arch beside the cover of the printed program. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="1,2,3,4,0,2" className={s.arch} aria-hidden="true">
            <TabbiedPattern
              pattern={blossom}
              palette={ARBOR}
              fit="grid"
              cellSize={64}
              seed="june-arch"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.program}>
            <p data-edit="hero.programKicker" data-edit-max="240" data-edit-multiline className={s.programKicker}>The order of service</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Ceremonies written for the two of you, <em>and read like it.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I am June Abernathy, a celebrant. I write and lead weddings,
              elopements and vow renewals, civil or spiritual or two traditions
              at once, with every word chosen together and every form signed and
              filed.
            </p>
            <ol className={s.order}>
              {ORDER.map(([item, what, href], i) => (
                <li key={href}>
                  <a href={href} className={s.orderLink}>
                    <span data-edit={`hero.orderItem.${i}`} data-edit-max="60" className={s.orderItem}>{item}</span>
                    <span className={s.leader} aria-hidden="true" />
                    <span data-edit={`hero.orderWhat.${i}`} data-edit-max="60" className={s.orderWhat}>{what}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Check your date</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#fees">See the fees</a>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- WELCOME */}
        <section id="welcome" className={s.sec} aria-labelledby="welcome-h">
          <div className={s.welcome}>
            <div data-edit-pattern="welcome.field" data-edit-roles="1,4,2,0,3,2" className={s.posy} aria-hidden="true">
              <TabbiedPattern
                pattern={blossom}
                palette={POSY}
                fit="grid"
                cellSize={48}
                seed="june-posy"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.welcomeText}>
              <p data-edit="welcome.itemLabel" data-edit-max="240" data-edit-multiline className={s.itemLabel}>The Welcome</p>
              <h2 data-edit="welcome.secTitle" data-edit-max="60" id="welcome-h" className={s.secTitle}>Meet June</h2>
              <p data-edit="welcome.welcomeLead" data-edit-max="240" data-edit-multiline className={s.welcomeLead}>
                Eleven years and a little over four hundred ceremonies, in
                barns, back gardens, courthouses, a ferry and one hospital
                chapel at two in the morning.
              </p>
              <p data-edit="welcome.body" data-edit-max="240" data-edit-multiline className={s.body}>
                Before this I read the morning news on local radio for nine
                years, which is why your grandmother in the back row will hear
                every word. I am a registered civil celebrant and an ordained
                interfaith minister, so I can marry you legally with or without
                God in the room.
              </p>
              <blockquote className={s.quote}>
                <p data-edit="welcome.body2" data-edit-max="240" data-edit-multiline>She made our ceremony sound like us talking, only better behaved.</p>
                <cite data-edit="welcome.attribution" data-edit-max="48">Priya and Dan, married at Hollins Orchard</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ CEREMONIES */}
        <section id="ceremonies" className={s.sec} aria-labelledby="ceremonies-h">
          <div className={s.centerHead}>
            <p data-edit="ceremonies.itemLabel" data-edit-max="240" data-edit-multiline className={s.itemLabel}>The Readings</p>
            <h2 data-edit="ceremonies.secTitle" data-edit-max="60" id="ceremonies-h" className={s.secTitle}>Five kinds of ceremony</h2>
            <p data-edit="ceremonies.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every one is written from scratch. The lengths are the time from
              the processional to the kiss.
            </p>
          </div>
          <ol className={s.styles}>
            {STYLES.map((st, i) => (
              <li key={st.name} className={s.style}>
                <div className={s.styleHead}>
                  <h3 data-edit={`ceremonies.styleName.${i}`} data-edit-max="40" className={s.styleName}>{st.name}</h3>
                  <span className={s.leader} aria-hidden="true" />
                  <p data-edit={`ceremonies.styleLength.${i}`} data-edit-max="240" data-edit-multiline className={s.styleLength}>{st.length}</p>
                </div>
                <p data-edit={`ceremonies.styleText.${i}`} data-edit-max="240" data-edit-multiline className={s.styleText}>{st.text}</p>
                <p data-edit={`ceremonies.styleRituals.${i}`} data-edit-max="240" data-edit-multiline className={s.styleRituals}>{st.rituals}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- WRITING */}
        <section id="writing" className={s.writingSec} aria-labelledby="writing-h">
          <div className={s.writingInner}>
            <div className={s.centerHead}>
              <p data-edit="writing.itemLabel" data-edit-max="240" data-edit-multiline className={s.itemLabel}>The Vows</p>
              <h2 data-edit="writing.secTitle" data-edit-max="60" id="writing-h" className={s.secTitle}>How we write it together</h2>
              <p data-edit="writing.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Six steps from the first call to the last signature. You do the
                remembering; I do the writing.
              </p>
            </div>
            <ol className={s.timeline}>
              {TIMELINE.map(([when, title, text], i) => (
                <li key={title} className={s.moment}>
                  <p data-edit={`writing.momentWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.momentWhen}>{when}</p>
                  <span className={s.momentDot} aria-hidden="true" />
                  <div className={s.momentCard}>
                    <h3 data-edit={`writing.momentTitle.${i}`} data-edit-max="40" className={s.momentTitle}>{title}</h3>
                    <p data-edit={`writing.momentText.${i}`} data-edit-max="240" data-edit-multiline className={s.momentText}>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.centerHead}>
            <p data-edit="fees.itemLabel" data-edit-max="240" data-edit-multiline className={s.itemLabel}>The Rings</p>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>Fees</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A deposit of $250 holds your date and comes off the fee. Travel
              within thirty miles of Wren Street is included.
            </p>
          </div>
          <ul className={s.fees}>
            {FEES.map((f, i) => (
              <li key={f.name} className={i === 1 ? `${s.fee} ${s.feeMain}` : s.fee}>
                <h3 data-edit={`fees.feeName.${i}`} data-edit-max="40" className={s.feeName}>{f.name}</h3>
                <p data-edit={`fees.feeSub.${i}`} data-edit-max="240" data-edit-multiline className={s.feeSub}>{f.sub}</p>
                <p data-edit={`fees.feePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.feePrice}>{f.price}</p>
                <ul className={s.feeItems}>
                  {f.items.map((it, i2) => (
                    <li data-edit={`fees.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p data-edit="fees.feesNote" data-edit-max="240" data-edit-multiline className={s.feesNote}>Further than thirty miles, 70 cents a mile. Ceremonies in Spanish or French, or read in both languages, at no extra cost.</p>
        </section>

        {/* ------------------------------------------------------- PAPERWORK
            The certificate, framed in flowers. */}
        <section id="paperwork" className={s.sec} aria-labelledby="paperwork-h">
          <div className={s.certificate}>
            <div data-edit-pattern="paperwork.field" data-edit-roles="0,2,3,4,1,3" className={s.garland} aria-hidden="true">
              <TabbiedPattern
                pattern={blossom}
                palette={GARLAND}
                fit="grid"
                cellSize={48}
                seed="june-garland"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.certInner}>
              <p data-edit="paperwork.itemLabel" data-edit-max="240" data-edit-multiline className={s.itemLabel}>The Signing</p>
              <h2 data-edit="paperwork.secTitle" data-edit-max="60" id="paperwork-h" className={s.secTitle}>The legal paperwork</h2>
              <p data-edit="paperwork.certLead" data-edit-max="240" data-edit-multiline className={s.certLead}>
                The part nobody photographs, and the part that makes it a
                marriage. Here is what you do, and what I do.
              </p>
              <dl className={s.papers}>
                {PAPERS.map(([t, d], i) => (
                  <div key={t}>
                    <dt data-edit={`paperwork.term.${i}`} data-edit-max="28">{t}</dt>
                    <dd data-edit={`paperwork.body.${i}`} data-edit-max="200" data-edit-multiline>{d}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.signatures} aria-hidden="true">
                <span className={s.sigLine} />
                <span className={s.sigLine} />
                <span className={s.sigLine} />
              </div>
              <p className={s.sigNames}>
                <span data-edit="paperwork.text" data-edit-max="60">Partner</span>
                <span data-edit="paperwork.text2" data-edit-max="60">Partner</span>
                <span data-edit="paperwork.text3" data-edit-max="60">Officiant</span>
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contactSec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.itemLabel" data-edit-max="240" data-edit-multiline className={s.itemLabel}>The Recessional</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Check your date</h2>
              <p data-edit="contact.body" data-edit-max="240" data-edit-multiline className={s.body}>
                I take one wedding a day and about forty a year, so the summer
                Saturdays go first. Send the date and I will answer within two
                days.
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>The Garden Room, 12 Wren Street</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Where we meet for the long evening, if you would rather not do it by video.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550168820">(555) 016-8820</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:june@juneabernathy.example">june@juneabernathy.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="ja-names">Your names</label>
                <input id="ja-names" name="names" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="ja-date">The date</label>
                <input id="ja-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="ja-email">Email</label>
                <input id="ja-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="ja-place">The place, if you know it</label>
                <input id="ja-place" name="place" type="text" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">The kind of ceremony</legend>
                <div className={s.picks}>
                  <input id="ja-k1" type="radio" name="kind" value="civil" />
                  <label data-edit="contact.label5" htmlFor="ja-k1">Civil</label>
                  <input id="ja-k2" type="radio" name="kind" value="spiritual" />
                  <label data-edit="contact.label6" htmlFor="ja-k2">Spiritual</label>
                  <input id="ja-k3" type="radio" name="kind" value="two" />
                  <label data-edit="contact.label7" htmlFor="ja-k3">Two traditions</label>
                  <input id="ja-k4" type="radio" name="kind" value="elope" />
                  <label data-edit="contact.label8" htmlFor="ja-k4">Elopement</label>
                  <input id="ja-k5" type="radio" name="kind" value="renewal" />
                  <label data-edit="contact.label9" htmlFor="ja-k5">Vow renewal</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label10" htmlFor="ja-note">How you met, in a sentence or two</label>
                <textarea id="ja-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to June</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="1,2,3,4,0,2" className={s.footGarland} aria-hidden="true">
          <TabbiedPattern
            pattern={blossom}
            palette={ARBOR}
            fit="grid"
            cellSize={40}
            seed="june-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>June Abernathy</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional celebrant. The couples, fees, county rules and address are invented, and nothing here is legal advice.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
