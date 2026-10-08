import { TabbiedPattern } from 'tabbied/react';
import { veil } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './veil-brush-bridal.module.css';

export const metadata = {
  title: 'Veil & Brush: Bridal hair and makeup, on location',
  description:
    'Veil & Brush is two artists who come to you on the wedding morning: a schedule built chair by chair, a trial six weeks before, packages for the bride and the party, and travel fees on the page.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The veil is
   tints of one rose, folded corner to corner like tulle. It fills the
   dressing-room mirror in the hero, lies under the trial card, runs as a
   band between the packages and the travel fees, and edges the footer. */
const IVORY = '#fbf6f1';
const ESPRESSO = '#2f2329';
const BERRY = '#8f4a5f';
const ROSE = '#d69aa3';
const BLUSH = '#f1d3cf';

const TULLE = ['transparent', ROSE, BERRY, ESPRESSO, BLUSH, ROSE];
const SOFT = ['transparent', BLUSH, ROSE, BERRY, BLUSH, ROSE];

const NAV = [
  ['The morning', '#morning'],
  ['The trial', '#trial'],
  ['Packages', '#packages'],
  ['Travel', '#travel'],
  ['Check your date', '#date'],
];

const SLOTS = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30'];

type Block = { kind: 'hair' | 'makeup' | 'veil'; from: number; span: number; label: string; time: string };
type Chair = { who: string; role: string; blocks: Block[] };

/* A sample morning for a 1 pm ceremony, worked backwards so the bride is
   ready ninety minutes before the car. Two artists, one chair each. */
const MORNING: Chair[] = [
  {
    who: 'Noor',
    role: 'Bridesmaid',
    blocks: [
      { kind: 'makeup', from: 1, span: 1, label: 'Makeup', time: '7:00' },
      { kind: 'hair', from: 2, span: 1, label: 'Hair', time: '7:30' },
    ],
  },
  {
    who: 'Priya',
    role: 'Bridesmaid',
    blocks: [
      { kind: 'hair', from: 1, span: 1, label: 'Hair', time: '7:00' },
      { kind: 'makeup', from: 2, span: 1, label: 'Makeup', time: '7:30' },
    ],
  },
  {
    who: 'Ruth',
    role: 'Mother of the bride',
    blocks: [
      { kind: 'hair', from: 3, span: 1, label: 'Hair', time: '8:00' },
      { kind: 'makeup', from: 4, span: 1, label: 'Makeup', time: '8:30' },
    ],
  },
  {
    who: 'Celia',
    role: 'Mother of the groom',
    blocks: [
      { kind: 'makeup', from: 3, span: 1, label: 'Makeup', time: '8:00' },
      { kind: 'hair', from: 4, span: 1, label: 'Hair', time: '8:30' },
    ],
  },
  {
    who: 'Lou',
    role: 'Flower girl, age 6',
    blocks: [{ kind: 'hair', from: 5, span: 1, label: 'Braids', time: '9:00' }],
  },
  {
    who: 'Hannah',
    role: 'The bride',
    blocks: [
      { kind: 'makeup', from: 5, span: 2, label: 'Makeup', time: '9:00-10:00' },
      { kind: 'hair', from: 7, span: 2, label: 'Hair', time: '10:00-11:00' },
      { kind: 'veil', from: 9, span: 2, label: 'Veil on, then photos', time: '11:00' },
    ],
  },
];

const TRIAL = [
  ['When', 'Six to eight weeks before the wedding, on a Tuesday or Thursday.'],
  ['Where', 'Our studio on Larch Street, by the north window, so we see your skin in daylight.'],
  ['Bring', 'Three or four pictures you love, the veil or headpiece, and a top with the neckline of the dress.'],
  ['You leave with', 'Photographs from the front, side and back, and a written list of every product used.'],
];

const PACKAGES = [
  {
    name: 'The bride',
    price: '$425',
    note: 'Hair and makeup on the morning',
    items: ['Lashes and a lip to keep', 'The veil set in place', 'We stay until the photographs start'],
  },
  {
    name: 'The bride, with trial',
    price: '$575',
    note: 'The same morning, plus the trial',
    items: ['Two-hour trial at the studio', 'A second try at the look if needed', 'Priority on the date you choose'],
  },
  {
    name: 'The party',
    price: '$95 a service',
    note: 'Bridesmaids, mothers and friends',
    items: ['Hair or makeup, $95 each', 'Both together, $175', 'Under 12, hair only, $55'],
  },
];

const EXTRAS = [
  ['Airbrush makeup', '$30'],
  ['Second look for the evening', '$150'],
  ['Stay for the ceremony, touch-ups', '$90 an hour'],
  ['Start before 7 am, per artist', '$40 an hour'],
];

const TRAVEL = [
  { zone: 'Ring 1', reach: 'Within 15 miles of the studio', fee: 'Free', ring: 'r1' },
  { zone: 'Ring 2', reach: '15 to 40 miles', fee: '$60', ring: 'r2' },
  { zone: 'Ring 3', reach: '40 to 80 miles', fee: '$120', ring: 'r3' },
  { zone: 'Further', reach: 'Beyond 80 miles, or a stay overnight', fee: 'Quoted', ring: 'r4' },
];

export default function VeilBrushBridal() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--ivory': '#fbf6f1',
        '--espresso': '#2f2329',
        '--berry': '#8f4a5f',
        '--rose': '#d69aa3',
        '--blush': '#f1d3cf',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="ivory,espresso,berry,rose,blush"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#main">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Veil & Brush</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Bridal hair and makeup</span>
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

      <main id="main">
        {/* ------------------------------------------------------------ HERO
            The dressing-room mirror, an arch of tulle, beside the promise
            and the shape of the morning in three times. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.mirror}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,1,4,3" className={s.arch} aria-hidden="true">
              <TabbiedPattern
                pattern={veil}
                palette={TULLE}
                fit="grid"
                cellSize={58}
                seed="veil-mirror"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Bridal hair and makeup, on location</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              A morning with room <em>to breathe in.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Two artists come to you, with a schedule built chair by chair, so
              that nobody is rushed, the photographer gets the bride on time, and
              the last person done is never the bride.
            </p>
            <ol className={s.teaser}>
              <li>
                <time data-edit="hero.date">7:00</time>
                <span data-edit="hero.text" data-edit-max="60">First chair</span>
              </li>
              <li>
                <time data-edit="hero.date2">11:00</time>
                <span data-edit="hero.text2" data-edit-max="60">Veil on</span>
              </li>
              <li>
                <time data-edit="hero.date3">1:00</time>
                <span data-edit="hero.text3" data-edit-max="60">Ceremony</span>
              </li>
            </ol>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#date">Check your date</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#morning">See a sample morning</a>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- MORNING
            The run sheet: one row per person, half hours across. */}
        <section id="morning" className={s.morning} aria-labelledby="morning-h">
          <div className={s.sectionHead}>
            <p data-edit="morning.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>A sample run sheet</p>
            <h2 data-edit="morning.title" data-edit-format="emphasis" data-edit-max="60" id="morning-h" className={s.sectionTitle}>
              The morning, <em>chair by chair</em>
            </h2>
            <p data-edit="morning.sectionLead" data-edit-max="240" data-edit-multiline className={s.sectionLead}>
              Every wedding gets its own sheet, sent a week before. This one is
              for six people and a 1 pm ceremony: the hair artist and the makeup
              artist each work one chair, and the bride goes last but not late.
            </p>
          </div>
          <div className={s.sheet}>
            <div className={s.sheetHead} aria-hidden="true">
              <span className={s.sheetCorner} />
              {SLOTS.map((t, i) => (
                <span data-edit={`morning.slot.${i}`} data-edit-max="60" key={t} className={s.slot}>{t}</span>
              ))}
            </div>
            <ul className={s.chairs}>
              {MORNING.map((c, i) => (
                <li key={c.who} className={s.chair}>
                  <p className={s.who}>
                    <strong data-edit={`morning.emphasis.${i}`}>{c.who}</strong>
                    <span data-edit={`morning.text.${i}`} data-edit-max="60">{c.role}</span>
                  </p>
                  {c.blocks.map((b, j) => (
                    <p key={`${i}-${j}`} className={`${s.block} ${s[b.kind]} ${s[`from${b.from}`]} ${s[`span${b.span}`]}`}>
                      <span data-edit={`morning.blockLabel.${i}.${j}`} data-edit-max="60" className={s.blockLabel}>{b.label}</span>
                      <time data-edit={`morning.blockTime.${i}.${j}`} className={s.blockTime}>{b.time}</time>
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>
          <ul className={s.key}>
            <li data-edit="morning.keyHair" data-edit-max="80" className={s.keyHair}>Hair, with Mara</li>
            <li data-edit="morning.keyMakeup" data-edit-max="80" className={s.keyMakeup}>Makeup, with June</li>
            <li data-edit="morning.keyVeil" data-edit-max="80" className={s.keyVeil}>Both of us, with the bride</li>
          </ul>
        </section>

        {/* ----------------------------------------------------------- TRIAL */}
        <section id="trial" className={s.trial} aria-labelledby="trial-h">
          <div data-edit-pattern="trial.field" data-edit-roles="transparent,4,3,2,4,3" className={s.trialField} aria-hidden="true">
            <TabbiedPattern
              pattern={veil}
              palette={SOFT}
              fit="grid"
              cellSize={48}
              seed="veil-trial"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.trialCard}>
            <p data-edit="trial.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Before the day</p>
            <h2 data-edit="trial.title" data-edit-format="emphasis" data-edit-max="60" id="trial-h" className={s.sectionTitle}>
              The trial, <em>two unhurried hours</em>
            </h2>
            <dl className={s.trialList}>
              {TRIAL.map(([term, desc], i) => (
                <div key={term}>
                  <dt data-edit={`trial.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`trial.body.${i}`} data-edit-max="200" data-edit-multiline>{desc}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="trial.trialPrice" data-edit-max="240" data-edit-multiline className={s.trialPrice}>$185 on its own, or included in the bride with trial package.</p>
          </div>
        </section>

        {/* -------------------------------------------------------- PACKAGES */}
        <section id="packages" className={s.packages} aria-labelledby="packages-h">
          <div className={s.sectionHead}>
            <p data-edit="packages.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>For the bride and the party</p>
            <h2 data-edit="packages.sectionTitle" data-edit-max="60" id="packages-h" className={s.sectionTitle}>Packages</h2>
            <p data-edit="packages.sectionLead" data-edit-max="240" data-edit-multiline className={s.sectionLead}>
              A wedding morning starts at the bride plus three services. A
              deposit of $150 holds the date and comes off the final bill.
            </p>
          </div>
          <ul className={s.cards}>
            {PACKAGES.map((p, i) => (
              <li key={p.name} className={s.card}>
                <h3 data-edit={`packages.cardName.${i}`} data-edit-max="40" className={s.cardName}>{p.name}</h3>
                <p data-edit={`packages.cardNote.${i}`} data-edit-max="240" data-edit-multiline className={s.cardNote}>{p.note}</p>
                <p data-edit={`packages.cardPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.cardPrice}>{p.price}</p>
                <ul className={s.cardItems}>
                  {p.items.map((item, i2) => (
                    <li data-edit={`packages.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className={s.extras}>
            <h3 data-edit="packages.extrasTitle" data-edit-max="40" className={s.extrasTitle}>Extras</h3>
            <dl className={s.extrasList}>
              {EXTRAS.map(([name, price], i) => (
                <div key={name}>
                  <dt data-edit={`packages.term.${i}`} data-edit-max="28">{name}</dt>
                  <dd data-edit={`packages.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div data-edit-pattern="main.field" data-edit-roles="transparent,3,2,1,4,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={veil}
            palette={TULLE}
            fit="grid"
            cellSize={44}
            seed="veil-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- TRAVEL */}
        <section id="travel" className={s.travel} aria-labelledby="travel-h">
          <div className={s.travelHead}>
            <p data-edit="travel.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Getting to you</p>
            <h2 data-edit="travel.sectionTitle" data-edit-max="60" id="travel-h" className={s.sectionTitle}>Travel fees</h2>
            <p data-edit="travel.sectionLead" data-edit-max="240" data-edit-multiline className={s.sectionLead}>
              Measured from the studio on Larch Street to the room where you get
              ready, one fee for both artists. Parking at the venue is on us
              when it is free, and on the bill when it is not.
            </p>
          </div>
          <ul className={s.rings}>
            {TRAVEL.map((t, i) => (
              <li key={t.zone} className={s.ringRow}>
                <span className={`${s.ringIcon} ${s[t.ring]}`} aria-hidden="true" />
                <span data-edit={`travel.ringZone.${i}`} data-edit-max="60" className={s.ringZone}>{t.zone}</span>
                <span data-edit={`travel.ringReach.${i}`} data-edit-max="60" className={s.ringReach}>{t.reach}</span>
                <span data-edit={`travel.ringFee.${i}`} data-edit-max="60" className={s.ringFee}>{t.fee}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ DATE */}
        <section id="date" className={s.date} aria-labelledby="date-h">
          <div className={s.dateInfo}>
            <p data-edit="date.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Booking 2027 weddings now</p>
            <h2 data-edit="date.title" data-edit-format="emphasis" data-edit-max="60" id="date-h" className={s.sectionTitle}>
              Check your <em>date</em>
            </h2>
            <p data-edit="date.sectionLead" data-edit-max="240" data-edit-multiline className={s.sectionLead}>
              We take one wedding a day, so dates go early. Send the details and
              June replies within two days with a first run sheet.
            </p>
            <dl className={s.contactList}>
              <div>
                <dt data-edit="date.term" data-edit-max="28">Studio</dt>
                <dd data-edit="date.body" data-edit-max="200" data-edit-multiline>14 Larch Street, Studio 2, by appointment</dd>
              </div>
              <div>
                <dt data-edit="date.term2" data-edit-max="28">Phone</dt>
                <dd>
                  <a data-edit="date.link" data-edit-max="28" href="tel:+15550167020">(555) 016-7020</a>
                </dd>
              </div>
              <div>
                <dt data-edit="date.term3" data-edit-max="28">Email</dt>
                <dd>
                  <a data-edit="date.link2" data-edit-max="28" href="mailto:hello@veilandbrush.example">hello@veilandbrush.example</a>
                </dd>
              </div>
              <div>
                <dt data-edit="date.term4" data-edit-max="28">Trials</dt>
                <dd data-edit="date.body2" data-edit-max="200" data-edit-multiline>Tuesdays and Thursdays, 10 to 6</dd>
              </div>
            </dl>
          </div>
          <form className={s.form} action="#">
            <label className={s.field}>
              <span data-edit="date.text" data-edit-max="60">Your name</span>
              <input type="text" name="name" autoComplete="name" />
            </label>
            <label className={s.field}>
              <span data-edit="date.text2" data-edit-max="60">Email</span>
              <input type="email" name="email" autoComplete="email" />
            </label>
            <label className={s.field}>
              <span data-edit="date.text3" data-edit-max="60">Wedding date</span>
              <input type="date" name="date" />
            </label>
            <label className={s.field}>
              <span data-edit="date.text4" data-edit-max="60">Ceremony time</span>
              <input type="time" name="time" />
            </label>
            <label className={s.fieldWide}>
              <span data-edit="date.text5" data-edit-max="60">Where you will get ready</span>
              <input type="text" name="venue" />
            </label>
            <label className={s.field}>
              <span data-edit="date.text6" data-edit-max="60">People for hair</span>
              <input type="number" name="hair" min={0} />
            </label>
            <label className={s.field}>
              <span data-edit="date.text7" data-edit-max="60">People for makeup</span>
              <input type="number" name="makeup" min={0} />
            </label>
            <button data-edit="date.submit" data-edit-max="24" className={s.submit} type="submit">Ask about the date</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,3,2,4,3" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={veil}
            palette={SOFT}
            fit="grid"
            cellSize={36}
            seed="veil-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Veil & Brush</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>A fictional studio: the names, people, prices and address are invented.</p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
