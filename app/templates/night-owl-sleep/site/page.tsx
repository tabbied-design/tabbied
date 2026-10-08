import { TabbiedPattern } from 'tabbied/react';
import { northernlights } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './night-owl-sleep.module.css';

export const metadata = {
  title: 'Night Owl Sleep Consulting: Gentle sleep plans for babies and young children',
  description:
    'Night Owl helps families with babies from four months to six years sleep through the night, without cry-it-out. Bedtime routines by age, a written plan, and up to two weeks of daily support.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The northern
   lights are the view from the nursery window: moon-cream stars and
   curtains of green, teal and lilac on a transparent ground, so the night
   of the page is their sky. In the arched window of the hero, along the
   horizon between the routines and the packages, and over the footer. */
const NIGHT = '#101a2c';
const MOON = '#f2ead6';
const AURORA = '#6fd6a8';
const TIDE = '#48b5c8';
const LILAC = '#a48be0';

const SKY = ['transparent', MOON, AURORA, TIDE, LILAC, AURORA];
const DUSK = ['transparent', MOON, LILAC, TIDE, AURORA, LILAC];

const NAV = [
  ['Routines by age', '#routines'],
  ['Packages', '#packages'],
  ['Our promise', '#promise'],
  ['Questions', '#questions'],
  ['Book a call', '#contact'],
];

/* The chart runs from 5:00 pm to 7:30 am in quarter hours. Each time is
   the number of quarter hours after 5:00 pm; the label column comes first,
   so a time sits on grid line t + 2. */
const HOURS_AXIS = ['5 pm', '6', '7', '8', '9', '10', '11', '12', '1 am', '2', '3', '4', '5', '6', '7'];

type Routine = {
  age: string;
  note: string;
  lights: string;
  routine: number[];
  steps: string;
  sleep: number[];
  asleep: string;
  feeds: number[];
};

const ROUTINES: Routine[] = [
  { age: '4-6 months', note: '3 naps, 1-2 night feeds', routine: [5, 8], steps: 'Bath, feed, song', lights: 'Lights out 7:00', sleep: [8, 55], asleep: 'Up at 6:45', feeds: [28, 40] },
  { age: '6-12 months', note: '2 naps, 1 feed to 9 months', routine: [5, 8], steps: 'Bath, feed, book', lights: 'Lights out 7:00', sleep: [8, 54], asleep: 'Up at 6:30', feeds: [40] },
  { age: '1-2 years', note: '1 nap after lunch', routine: [6, 9], steps: 'Bath, milk, books', lights: 'Lights out 7:15', sleep: [9, 55], asleep: 'Up at 6:45', feeds: [] },
  { age: '2-4 years', note: 'The nap fades out by 3-4', routine: [7, 10], steps: 'Bath, teeth, books', lights: 'Lights out 7:30', sleep: [10, 56], asleep: 'Up at 7:00', feeds: [] },
  { age: '4-6 years', note: 'No nap, quiet time instead', routine: [9, 12], steps: 'Teeth, story, chat', lights: 'Lights out 8:00', sleep: [12, 56], asleep: 'Up at 7:00', feeds: [] },
];

type Pack = { name: string; price: string; length: string; lead: string; items: string[]; pick?: boolean };

const PACKAGES: Pack[] = [
  {
    name: 'One call',
    price: '$95',
    length: 'A single evening',
    lead: 'For a small wobble: a new sibling, a move, the clocks going back.',
    items: ['60-minute video call', 'A written plan the next morning', 'One follow-up email within a week'],
  },
  {
    name: 'One week',
    price: '$295',
    length: 'Seven nights',
    lead: 'For most families: a full plan and a week of us in your pocket.',
    items: ['Sleep log review before we talk', '75-minute plan call', 'Daily check-ins by message, 7 am-9 pm', 'Two short calls during the week'],
    pick: true,
  },
  {
    name: 'Two weeks',
    price: '$445',
    length: 'Fourteen nights',
    lead: 'For early risers, split nights and the child who has tried it all.',
    items: ['Everything in One week', 'Fourteen days of check-ins', 'A nap plan, written separately', 'One night video review of bedtime'],
  },
];

const PROMISES = [
  ['No cry-it-out, ever', 'We will never ask you to close the door and leave a crying child. Every plan keeps you close.'],
  ['You set the pace', 'Most of our plans take ten to fourteen nights of slow steps. If a night goes badly, we slow down, not speed up.'],
  ['Feeds are your call', 'Night feeds stay or go on your say and your pediatrician\'s, never on a chart.'],
  ['Change it the same day', 'If a method feels wrong for your family, tell us at breakfast and you will have a new one by bedtime.'],
];

const QUESTIONS = [
  ['What ages do you work with?', 'From four months, once night feeds can begin to stretch, up to six years. For newborns we offer a 45-minute prep call at $75.'],
  ['Will my baby cry?', 'Babies and small children cry at change, and that is fine with us. What we do not do is leave them to cry alone.'],
  ['Do you come to the house?', 'Calls and check-ins are online, so we can be there at 2 am. Home visits within ten miles are $120 and can be added to any package.'],
  ['What if it does not work?', 'If you followed the plan for two weeks and nights are no better, we keep supporting you for free until they are.'],
  ['Can I pay with an HSA or FSA card?', 'Many plans accept sleep consulting with a note from your pediatrician. We send an itemized receipt for every package.'],
];

export default function NightOwlSleepPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#101a2c',
        '--moon': '#f2ead6',
        '--aurora': '#6fd6a8',
        '--tide': '#48b5c8',
        '--lilac': '#a48be0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,moon,aurora,tide,lilac"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Outfit:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMoon} aria-hidden="true" />
          <span className={s.brandText}>
            <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Night Owl</span>
            <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Sleep Consulting</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#contact">Free 15-minute call</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The view from the nursery: an arched window with its glazing
            bars, the northern lights beyond it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Gentle sleep plans for babies and children, 4 months to 6 years</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Long nights, <em>for everyone in the house.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We write a bedtime plan around your child, your home and how you
              want to parent, then stay with you, by message, through the first
              hard nights. No cry-it-out, and no one left alone in the dark.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free call</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#routines">See bedtimes by age</a>
            </div>
            <dl className={s.heroStats}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Families helped since 2017</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>1,240</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Median nights to sleeping through</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>11</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Nights of cry-it-out</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>0</dd>
              </div>
            </dl>
          </div>
          <div className={s.windowWrap}>
            <div className={s.window}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,2" className={s.sky} aria-hidden="true">
                <TabbiedPattern
                  pattern={northernlights}
                  palette={SKY}
                  fit="grid"
                  cellSize={52}
                  seed="night-owl-window"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.bars} aria-hidden="true" />
            </div>
            <div className={s.sill} aria-hidden="true" />
          </div>
        </section>

        {/* -------------------------------------------------------- ROUTINES
            Five ages on one night: the wind-down, lights out, any feeds,
            and the morning, from 5 pm to 7:30 am. */}
        <section id="routines" className={s.sec} aria-labelledby="routines-h">
          <div className={s.secHead}>
            <h2 data-edit="routines.secTitle" data-edit-max="60" id="routines-h" className={s.secTitle}>One night, five ages</h2>
            <p data-edit="routines.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              These are the bedtimes our plans usually land on. The routine
              before lights out matters more than the clock: the same three
              steps, in the same order, every night.
            </p>
          </div>
          <div className={s.chartWrap}>
            <ol className={s.chart}>
              <li className={s.axis} aria-hidden="true">
                {HOURS_AXIS.map((h, i) => (
                  <span data-edit={`routines.text.${i}`} data-edit-max="60" key={h + i} style={{ gridColumn: `${i * 4 + 2} / span 4` }}>{h}</span>
                ))}
              </li>
              {ROUTINES.map((r, i) => (
                <li key={r.age} className={s.row}>
                  <div className={s.rowHead}>
                    <h3 data-edit={`routines.rowAge.${i}`} data-edit-max="40" className={s.rowAge}>{r.age}</h3>
                    <p data-edit={`routines.rowSteps.${i}`} data-edit-max="240" data-edit-multiline className={s.rowSteps}>{r.steps}</p>
                    <p data-edit={`routines.rowNote.${i}`} data-edit-max="240" data-edit-multiline className={s.rowNote}>{r.note}</p>
                  </div>
                  <span className={s.wind} style={{ gridColumn: `${r.routine[0] + 2} / ${r.routine[1] + 2}` }} aria-hidden="true" />
                  <span className={s.sleep} style={{ gridColumn: `${r.sleep[0] + 2} / ${r.sleep[1] + 2}` }}>
                    <span data-edit={`routines.lights.${i}`} data-edit-max="60" className={s.lights}>{r.lights}</span>
                    <span data-edit={`routines.up.${i}`} data-edit-max="60" className={s.up}>{r.asleep}</span>
                  </span>
                  {r.feeds.map((f, i2) => (
                    <span data-edit={`routines.feed.${i}.${i2}`} data-edit-max="60" key={f} className={s.feed} style={{ gridColumn: `${f + 2} / span 3` }}>Feed</span>
                  ))}
                </li>
              ))}
            </ol>
          </div>
          <ul className={s.keyList}>
            <li>
              <span className={`${s.swatch} ${s.swatchWind}`} aria-hidden="true" />
              <span data-edit="routines.text2" data-edit-max="60">The wind-down, 30-45 minutes</span>
            </li>
            <li>
              <span className={`${s.swatch} ${s.swatchSleep}`} aria-hidden="true" />
              <span data-edit="routines.text3" data-edit-max="60">Asleep in their own bed</span>
            </li>
            <li>
              <span className={`${s.swatch} ${s.swatchFeed}`} aria-hidden="true" />
              <span data-edit="routines.text4" data-edit-max="60">A night feed, if your baby still needs it</span>
            </li>
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,4,3,2,4" className={s.horizon} aria-hidden="true">
          <TabbiedPattern
            pattern={northernlights}
            palette={DUSK}
            fit="grid"
            cellSize={48}
            seed="night-owl-horizon"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- PACKAGES */}
        <section id="packages" className={s.sec} aria-labelledby="packages-h">
          <div className={s.secHead}>
            <h2 data-edit="packages.secTitle" data-edit-max="60" id="packages-h" className={s.secTitle}>From one call to two weeks beside you</h2>
            <p data-edit="packages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every package starts with a seven-day sleep log and a long talk.
              Prices are for one child; a sibling joins any plan for $60.
            </p>
          </div>
          <ul className={s.packs}>
            {PACKAGES.map((p, i) => (
              <li key={p.name} className={p.pick ? `${s.pack} ${s.packPick}` : s.pack}>
                <p data-edit={`packages.packLength.${i}`} data-edit-max="240" data-edit-multiline className={s.packLength}>{p.length}</p>
                <h3 data-edit={`packages.packName.${i}`} data-edit-max="40" className={s.packName}>{p.name}</h3>
                <p data-edit={`packages.packPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{p.price}</p>
                <p data-edit={`packages.packLead.${i}`} data-edit-max="240" data-edit-multiline className={s.packLead}>{p.lead}</p>
                <ul className={s.packItems}>
                  {p.items.map((it, i2) => (
                    <li data-edit={`packages.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
                <a className={s.packLink} href="#contact">{`Start with ${p.name.toLowerCase()}`}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- PROMISE */}
        <section id="promise" className={s.sec} aria-labelledby="promise-h">
          <div className={s.promise}>
            <div className={s.promiseHead}>
              <span className={s.moon} aria-hidden="true" />
              <h2 data-edit="promise.secTitle" data-edit-max="60" id="promise-h" className={s.secTitle}>The gentle-methods promise</h2>
              <p data-edit="promise.promiseBy" data-edit-max="240" data-edit-multiline className={s.promiseBy}>Written by Maren Ostby, founder, certified pediatric sleep consultant and mother of three early risers.</p>
            </div>
            <ol className={s.promises}>
              {PROMISES.map(([t, d], i) => (
                <li key={t}>
                  <h3 data-edit={`promise.promiseTitle.${i}`} data-edit-max="40" className={s.promiseTitle}>{t}</h3>
                  <p data-edit={`promise.promiseText.${i}`} data-edit-max="240" data-edit-multiline className={s.promiseText}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.faqGrid}>
            <h2 data-edit="questions.secTitle" data-edit-max="60" id="questions-h" className={s.secTitle}>Questions parents ask at 3 am</h2>
            <div className={s.faq}>
              {QUESTIONS.map(([q, a], i) => (
                <details key={q} className={s.qa}>
                  <summary data-edit={`questions.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contact}>
            <div className={s.contactInfo}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a free 15-minute call</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us a little about your nights. We will call you back within
                a working day, usually during the morning nap.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550154410">(555) 015-4410</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@nightowlsleep.example">hello@nightowlsleep.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Calls</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Monday to Friday, 9:00-3:00</dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Check-ins</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Every day, 7:00 am-9:00 pm</dd>
                </div>
                <div>
                  <dt data-edit="contact.term5" data-edit-max="28">Studio</dt>
                  <dd data-edit="contact.body3" data-edit-max="200" data-edit-multiline>Suite 4, 210 Hollow Lane, Briar Glen</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="no-name">Your name</label>
                <input id="no-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="no-email">Email</label>
                <input id="no-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="no-age">Child's age</label>
                <input id="no-age" name="age" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="no-wake">Wakes a night, roughly</label>
                <input id="no-wake" name="wakes" type="text" inputMode="numeric" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label5" htmlFor="no-note">What is the hardest part of your nights?</label>
                <textarea id="no-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,3,4,2" className={s.footSky} aria-hidden="true">
          <TabbiedPattern
            pattern={northernlights}
            palette={SKY}
            fit="grid"
            cellSize={44}
            seed="night-owl-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Night Owl Sleep Consulting</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional sleep consultancy. The people, families, prices and address are invented, and nothing here is medical advice: ask your pediatrician about your child's sleep.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
