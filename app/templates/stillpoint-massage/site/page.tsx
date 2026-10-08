import { TabbiedPattern } from 'tabbied/react';
import { dotwash } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './stillpoint-massage.module.css';

export const metadata = {
  title: 'Stillpoint Massage: Massage therapy by the minute, Larkspur Avenue',
  description:
    'Stillpoint is a one-therapist massage studio on Larkspur Avenue. Swedish, deep tissue, prenatal, hot stone and sports massage in 30, 60 and 90 minute sessions, with clear prices and a fair cancellation policy.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Dotwash is a
   halftone that pools in one corner of each cell and thins out from it,
   the way warmth spreads from a pair of hands. It fills the round lamp in
   the hero, a band before the policies, the face of the gift certificate
   and the foot of the page, always on the room's own dark ground. */
const NIGHT = '#211a1c';
const CREAM = '#f1e5d8';
const CLAY = '#c27a63';
const PEACH = '#e8b496';
const SAGE = '#91a68e';

const LAMP = ['transparent', PEACH, CLAY, CREAM, PEACH, SAGE];
const DRIFT = ['transparent', CLAY, SAGE, PEACH, CLAY, CREAM];
const GIFT = ['transparent', CREAM, PEACH, CLAY, PEACH, SAGE];

const NAV = [
  ['Menu', '#menu'],
  ['An hour', '#hour'],
  ['Techniques', '#techniques'],
  ['Booking policy', '#policy'],
  ['Gift certificates', '#gifts'],
];

const FACTS = [
  ['Sessions of', '30, 60, 90 min'],
  ['From', '$55'],
  ['Licensed since', '2012'],
];

const MENU = [
  ['Swedish', 'Long, even strokes for an overworked body', '$55', '$95', '$135'],
  ['Deep tissue', 'Slow, firm work on the layers under the surface', '$65', '$110', '$155'],
  ['Prenatal', 'Side-lying, with bolsters, from 14 weeks on', '-', '$100', '$140'],
  ['Hot stone', 'Basalt stones at 125 degrees, worked in with oil', '-', '$120', '$165'],
  ['Sports recovery', 'Stretching and focused work on one problem area', '$60', '$105', '-'],
];

const ADDONS = [
  ['Hot stones on the back', '+$15'],
  ['Scalp and face', '+$10'],
  ['Unscented or aromatherapy oil', 'No charge'],
  ['Cupping on the shoulders', '+$15'],
];

const HOUR = [
  ['talk', '5', 'Talk', 'What hurts, what to avoid, how firm.'],
  ['back', '20', 'Back and shoulders', 'Where most of the hour goes.'],
  ['legs', '12', 'Legs and feet', 'Calves, hamstrings, the arches.'],
  ['arms', '8', 'Arms and hands', 'Forearms, for anyone at a keyboard.'],
  ['neck', '10', 'Neck and scalp', 'Face up, slowly, to finish.'],
  ['rest', '5', 'Rest', 'Water, and no hurry to sit up.'],
];

const TECHNIQUES = [
  { name: 'Swedish', pressure: 'Pressure 2 of 5', dots: 'press2', text: 'The classic relaxation massage: long gliding strokes, kneading and gentle circles. A good first massage, and a good fortieth.', good: 'Stress, poor sleep, a first visit' },
  { name: 'Deep tissue', pressure: 'Pressure 4 of 5', dots: 'press4', text: 'Slower and firmer, working across the grain of tight muscle. It should feel like a good ache, never a sharp one; say so and we ease off.', good: 'Desk shoulders, stiff backs, old knots' },
  { name: 'Prenatal', pressure: 'Pressure 2 of 5', dots: 'press2', text: 'Lying on your side with a body pillow, after the first trimester. Attention to the low back, hips and swollen ankles.', good: 'Second and third trimester' },
  { name: 'Hot stone', pressure: 'Pressure 3 of 5', dots: 'press3', text: 'Smooth heated basalt stones used as an extension of the hands. The heat lets the muscle let go sooner, so the pressure can stay gentle.', good: 'Cold hands and feet, winter, chronic tension' },
  { name: 'Sports recovery', pressure: 'Pressure 5 of 5', dots: 'press5', text: 'Assisted stretching and targeted work on one area: a runner\'s calves, a climber\'s forearms. Best 24 to 48 hours after a hard effort.', good: 'Training blocks, races, a specific complaint' },
];

const BOOKING = [
  ['Book online or by phone', 'Pick a technique and a length. Online booking shows every open slot for the next six weeks.'],
  ['Fill in the health form', 'Sent with your confirmation. It takes four minutes and saves ten on the table.'],
  ['Arrive ten minutes early', 'There is tea, a quiet waiting room and a place to leave your phone.'],
  ['Pay after, not before', 'Card, cash or a gift certificate. Tipping is never expected.'],
];

const POLICY = [
  ['24 hours notice', 'Cancel or move a booking up to 24 hours before at no charge.'],
  ['Under 24 hours', 'Half the session price, unless you are ill. Never come in with a fever.'],
  ['No-show', 'The full price. Someone on the waiting list could have had that hour.'],
  ['Running late', 'We will still finish on time for the next person, so the session is shorter.'],
];

const GIFT_AMOUNTS = [
  ['A half hour', '$55'],
  ['An hour', '$95'],
  ['Ninety minutes', '$135'],
  ['Any amount', 'from $25'],
];

const HOURS = [
  ['Tuesday to Friday', '10:00-8:00'],
  ['Saturday', '9:00-4:00'],
  ['Sunday and Monday', 'Closed'],
];

export default function StillpointMassagePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#211a1c',
        '--cream': '#f1e5d8',
        '--clay': '#c27a63',
        '--peach': '#e8b496',
        '--sage': '#91a68e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,cream,clay,peach,sage"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDot} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Stillpoint</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Book a session</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: the round lamp of warm dots, and the next free hour. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Massage therapy, 212 Larkspur Avenue</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              An hour in which <em>nothing is asked of you.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Swedish, deep tissue, prenatal and hot stone massage in a quiet
              second-floor room, sold by the minute: thirty, sixty or ninety.
              One therapist, one table, and no products pressed on you at the
              end.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a session</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#menu">See the menu</a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,1,3,4" className={s.lamp} aria-hidden="true">
              <TabbiedPattern
                pattern={dotwash}
                palette={LAMP}
                fit="grid"
                density={0.05}
                seed="sp-lamp"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.nextCard}>
              <p data-edit="hero.nextLabel" data-edit-max="240" data-edit-multiline className={s.nextLabel}>Next opening</p>
              <p data-edit="hero.nextWhen" data-edit-max="240" data-edit-multiline className={s.nextWhen}>Thursday, 4:30 pm</p>
              <p data-edit="hero.nextWhat" data-edit-max="240" data-edit-multiline className={s.nextWhat}>60 minutes, any technique</p>
            </div>
          </div>
        </section>

        {/* MENU: techniques down the side, minutes across the top. */}
        <section id="menu" className={s.sec} aria-labelledby="menu-h">
          <div className={s.secHead}>
            <p data-edit="menu.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The menu</p>
            <h2 data-edit="menu.secTitle" data-edit-max="60" id="menu-h" className={s.secTitle}>Priced by the minute</h2>
            <p data-edit="menu.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every length includes a few minutes to talk before and to sit up
              slowly after, so a 60-minute session is 50 minutes on the table.
            </p>
          </div>
          <div className={s.menuWrap}>
            <table className={s.menu}>
              <caption data-edit="menu.srOnly" className={s.srOnly}>Massage prices by technique and length</caption>
              <thead>
                <tr>
                  <th data-edit="menu.menuCorner" scope="col" className={s.menuCorner}>Technique</th>
                  <th scope="col" className={s.minCol}>
                    <span data-edit="menu.minNum" data-edit-max="60" className={s.minNum}>30</span>
                    <span data-edit="menu.minWord" data-edit-max="60" className={s.minWord}>minutes</span>
                  </th>
                  <th scope="col" className={s.minCol}>
                    <span data-edit="menu.minNum2" data-edit-max="60" className={s.minNum}>60</span>
                    <span data-edit="menu.minWord2" data-edit-max="60" className={s.minWord}>minutes</span>
                  </th>
                  <th scope="col" className={s.minCol}>
                    <span data-edit="menu.minNum3" data-edit-max="60" className={s.minNum}>90</span>
                    <span data-edit="menu.minWord3" data-edit-max="60" className={s.minWord}>minutes</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {MENU.map(([name, line, p30, p60, p90], i) => (
                  <tr key={name}>
                    <th scope="row" className={s.menuName}>
                      <span data-edit={`menu.menuTitle.${i}`} data-edit-max="60" className={s.menuTitle}>{name}</span>
                      <span data-edit={`menu.menuLine.${i}`} data-edit-max="60" className={s.menuLine}>{line}</span>
                    </th>
                    <td data-edit={`menu.p30.${i}`} className={s.p30}>{p30}</td>
                    <td data-edit={`menu.p60.${i}`} className={s.p60}>{p60}</td>
                    <td data-edit={`menu.p90.${i}`} className={s.p90}>{p90}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.addons}>
            <h3 data-edit="menu.addonsTitle" data-edit-max="40" className={s.addonsTitle}>Add to any session</h3>
            <dl className={s.addonList}>
              {ADDONS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`menu.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`menu.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* AN HOUR: sixty minutes drawn to scale. */}
        <section id="hour" className={s.hour} aria-labelledby="hour-h">
          <div className={s.hourInner}>
            <div className={s.secHead}>
              <p data-edit="hour.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>What an hour holds</p>
              <h2 data-edit="hour.secTitle" data-edit-max="60" id="hour-h" className={s.secTitle}>Sixty minutes, drawn to scale</h2>
              <p data-edit="hour.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                A typical full-body Swedish hour. We change the proportions to
                suit you: an hour can be all shoulders if that is where it
                hurts.
              </p>
            </div>
            <ol className={s.minutes}>
              {HOUR.map(([key, mins, title, note], i) => (
                <li key={key} className={`${s.span} ${s[key]}`}>
                  <span className={s.spanBar} aria-hidden="true" />
                  <span className={s.spanMins}>{mins} min</span>
                  <span data-edit={`hour.spanTitle.${i}`} data-edit-max="60" className={s.spanTitle}>{title}</span>
                  <span data-edit={`hour.spanNote.${i}`} data-edit-max="60" className={s.spanNote}>{note}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TECHNIQUES */}
        <section id="techniques" className={s.sec} aria-labelledby="tech-h">
          <div className={s.secHead}>
            <p data-edit="techniques.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Techniques</p>
            <h2 data-edit="techniques.secTitle" data-edit-max="60" id="tech-h" className={s.secTitle}>Five ways of working</h2>
            <p data-edit="techniques.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Pressure is marked from one to five. You set the pressure on the
              day, whatever the technique.
            </p>
          </div>
          <ul className={s.techniques}>
            {TECHNIQUES.map((t, i) => (
              <li key={t.name} className={s.technique}>
                <h3 data-edit={`techniques.techName.${i}`} data-edit-max="40" className={s.techName}>{t.name}</h3>
                <p className={s.pressure}>
                  <span className={`${s.dots} ${s[t.dots]}`} aria-hidden="true" />
                  <span data-edit={`techniques.pressureText.${i}`} data-edit-max="60" className={s.pressureText}>{t.pressure}</span>
                </p>
                <p data-edit={`techniques.techText.${i}`} data-edit-max="240" data-edit-multiline className={s.techText}>{t.text}</p>
                <p className={s.techGood}>
                  <span data-edit={`techniques.goodLabel.${i}`} data-edit-max="60" className={s.goodLabel}>Good for</span>
                  <span data-edit={`techniques.text.${i}`} data-edit-max="60">{t.good}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,1,3,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={dotwash}
            palette={LAMP}
            fit="grid"
            density={0.3}
            seed="sp-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* POLICY: how to book, and what happens when plans change. */}
        <section id="policy" className={s.sec} aria-labelledby="policy-h">
          <div className={s.policyGrid}>
            <div>
              <p data-edit="policy.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Booking</p>
              <h2 data-edit="policy.secTitle" data-edit-max="60" id="policy-h" className={s.secTitle}>Booking, and changing your mind</h2>
              <ol className={s.booking}>
                {BOOKING.map(([t, d], i) => (
                  <li key={t}>
                    <span className={s.bookNo}>{i + 1}</span>
                    <h3 data-edit={`policy.bookTitle.${i}`} data-edit-max="40" className={s.bookTitle}>{t}</h3>
                    <p data-edit={`policy.bookText.${i}`} data-edit-max="240" data-edit-multiline className={s.bookText}>{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.policyCard}>
              <h3 data-edit="policy.policyTitle" data-edit-max="40" className={s.policyTitle}>Cancellation policy</h3>
              <p data-edit="policy.policyLead" data-edit-max="240" data-edit-multiline className={s.policyLead}>The fine print, in large print.</p>
              <dl className={s.policyList}>
                {POLICY.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`policy.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`policy.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* GIFTS: a printed certificate with a dotwash face. */}
        <section id="gifts" className={s.gifts} aria-labelledby="gifts-h">
          <div className={s.giftGrid}>
            <div className={s.certificate}>
              <div data-edit-pattern="gifts.field" data-edit-roles="transparent,1,3,2,3,4" className={s.certFace} aria-hidden="true">
                <TabbiedPattern
                  pattern={dotwash}
                  palette={GIFT}
                  fit="grid"
                  density={0.3}
                  seed="sp-gift"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.certBody}>
                <p data-edit="gifts.certLabel" data-edit-max="240" data-edit-multiline className={s.certLabel}>Gift certificate</p>
                <p data-edit="gifts.certName" data-edit-max="240" data-edit-multiline className={s.certName}>Stillpoint Massage</p>
                <p data-edit="gifts.certFor" data-edit-max="240" data-edit-multiline className={s.certFor}>For one hour of nothing being asked of you</p>
                <p data-edit="gifts.certNo" data-edit-max="240" data-edit-multiline className={s.certNo}>No. 0418, never expires</p>
              </div>
            </div>
            <div>
              <p data-edit="gifts.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Gift certificates</p>
              <h2 data-edit="gifts.secTitle" data-edit-max="60" id="gifts-h" className={s.secTitle}>Give someone an hour</h2>
              <p data-edit="gifts.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Printed on heavy card and posted the same day, or emailed as a
                PDF. They never expire and can be used for any technique.
              </p>
              <dl className={s.giftList}>
                {GIFT_AMOUNTS.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`gifts.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`gifts.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
              <a data-edit="gifts.button" data-edit-max="28" className={s.button} href="#book">Order a certificate</a>
            </div>
          </div>
        </section>

        {/* BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <p data-edit="book.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Book</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Ask for a time</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Send a request and we confirm by text within the working day.
                Your therapist is Mara Ellison, a licensed massage therapist
                (license MT-04417) with fourteen years at the table.
              </p>
              <p data-edit="book.address" data-edit-max="240" data-edit-multiline className={s.address}>212 Larkspur Avenue, second floor</p>
              <p data-edit="book.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Above the bookbinder. Stairs only, sorry; ground-floor visits at home are possible.</p>
              <p className={s.line}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550153380">(555) 015-3380</a>
              </p>
              <p className={s.line}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:hello@stillpoint.example">hello@stillpoint.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="sp-name">Name</label>
                <input id="sp-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="sp-phone">Mobile, for the confirmation</label>
                <input id="sp-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="sp-tech">Technique</label>
                <select id="sp-tech" name="technique" defaultValue="swedish">
                  <option value="swedish">Swedish</option>
                  <option value="deep">Deep tissue</option>
                  <option value="prenatal">Prenatal</option>
                  <option value="stone">Hot stone</option>
                  <option value="sports">Sports recovery</option>
                  <option value="gift">A gift certificate</option>
                </select>
              </div>
              <fieldset className={s.lengths}>
                <legend data-edit="book.legend">Length</legend>
                <div className={s.lengthPicks}>
                  <input id="sp-l30" type="radio" name="length" value="30" />
                  <label data-edit="book.label4" htmlFor="sp-l30">30 min</label>
                  <input id="sp-l60" type="radio" name="length" value="60" defaultChecked />
                  <label data-edit="book.label5" htmlFor="sp-l60">60 min</label>
                  <input id="sp-l90" type="radio" name="length" value="90" />
                  <label data-edit="book.label6" htmlFor="sp-l90">90 min</label>
                </div>
              </fieldset>
              <div className={s.field}>
                <label data-edit="book.label7" htmlFor="sp-when">Days and times that suit you</label>
                <input id="sp-when" name="when" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label8" htmlFor="sp-note">Anything we should know</label>
                <textarea id="sp-note" name="note" rows={3} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request this time</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,3,2,1" className={s.footWash} aria-hidden="true">
          <TabbiedPattern
            pattern={dotwash}
            palette={DRIFT}
            fit="grid"
            cellSize={48}
            seed="sp-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Stillpoint Massage</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>
            A fictional massage studio. The therapist, prices, license number
            and address are invented, and nothing here is medical advice.
          </p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
