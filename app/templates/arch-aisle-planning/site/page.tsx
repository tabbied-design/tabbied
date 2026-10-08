import { TabbiedPattern } from 'tabbied/react';
import { bluff } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './arch-aisle-planning.module.css';

export const metadata = {
  title: 'Arch & Aisle: Wedding planning and day-of coordination, Orchard Hill',
  description:
    'Arch & Aisle is a wedding planning studio in Orchard Hill. Full planning, partial planning or a coordinator for the day, a checklist from twelve months out, and vendors we have worked beside for years.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   garden wedding in late summer: a blush ground, a plum ink for the words,
   then terracotta, sage and old gold. Bluff's half-rounds are the studio's
   arches, on a transparent ground so the blush shows between them: a tall
   window in the hero, an arcade across the page, the keystone of the
   chosen package and a last arch in the foot. */
const BLUSH = '#f7e9df';
const PLUM = '#3d1f3a';
const TERRA = '#c65b43';
const SAGE = '#879a76';
const GOLD = '#dba54a';

const WINDOW = ['transparent', PLUM, TERRA, SAGE, GOLD, TERRA];
const ARCADE = ['transparent', TERRA, GOLD, SAGE, PLUM, GOLD];
const EVENING = ['transparent', GOLD, TERRA, SAGE, BLUSH, TERRA];

const NAV = [
  ['Checklist', '#checklist'],
  ['Planning levels', '#levels'],
  ['The day', '#day'],
  ['Vendors', '#vendors'],
  ['Contact', '#contact'],
];

type Stage = { when: string; unit: string; tasks: string[] };

const CHECKLIST: Stage[] = [
  { when: '12', unit: 'months to go', tasks: ['Set the budget and the guest count', 'Book the venue and the date', 'Book us, if you are going to', 'Choose the photographer'] },
  { when: '9', unit: 'months to go', tasks: ['Caterer and tasting', 'Band or DJ', 'Save-the-dates in the post', 'Start looking for the dress or suit'] },
  { when: '6', unit: 'months to go', tasks: ['Florist and the first mood board', 'Officiant and the ceremony outline', 'Hotel block for guests', 'Rentals: tables, linens, chairs'] },
  { when: '3', unit: 'months to go', tasks: ['Invitations out', 'Cake tasting', 'Hair and makeup trial', 'Rings ordered and sized'] },
  { when: '1', unit: 'month to go', tasks: ['Final guest count to the caterer', 'Seating plan', 'Marriage license', 'Our walk-through at the venue'] },
  { when: '7', unit: 'days to go', tasks: ['Timeline to every vendor', 'Final payments in envelopes', 'Pack the emergency kit', 'Then stop. We have it.'] },
];

type Level = { name: string; price: string; fit: string; items: string[]; pick?: boolean };

const LEVELS: Level[] = [
  {
    name: 'Day-of coordination',
    price: '$2,400',
    fit: 'For couples who have planned it all and want someone else to run it.',
    items: ['We start 8 weeks out', 'Two planning meetings and a venue walk-through', 'The timeline, sent to every vendor', 'Celeste and an assistant for 12 hours on the day', 'Rehearsal run, set-up and pack-down'],
  },
  {
    name: 'Partial planning',
    price: '$5,800',
    fit: 'For couples with the venue booked and the rest still open.',
    items: ['We start 6 months out', 'Up to 8 vendors found, booked and managed', 'Design: colors, flowers, tables and the paper', 'Budget kept in a shared sheet', 'Everything in day-of coordination'],
    pick: true,
  },
  {
    name: 'Full planning',
    price: 'from $9,500',
    fit: 'For couples who would rather say yes or no than search.',
    items: ['We start 12 to 18 months out', 'Venue search with three site visits', 'Every vendor, every contract, every payment date', 'Guest travel, welcome bags and the hotel block', 'Weekly calls in the last two months'],
  },
];

const TIMELINE = [
  ['10:00', 'Hair and makeup begins', 'In the bridal suite, with breakfast and a playlist'],
  ['1:00', 'Photographer arrives', 'Details first: rings, shoes, the invitation suite'],
  ['2:30', 'First look', 'Under the oak by the east lawn, ten quiet minutes'],
  ['3:30', 'Guests arrive', 'Lemonade on the terrace, programs on the chairs'],
  ['4:00', 'Ceremony', 'Twenty-five minutes. We cue the music and the aisle'],
  ['4:30', 'Cocktail hour', 'Family photographs, then you join your guests'],
  ['5:45', 'Grand entrance', 'Into the barn, straight onto the floor for the first dance'],
  ['6:00', 'Dinner', 'Served family style; toasts between the courses'],
  ['8:15', 'Cake and dancing', 'The band opens with the song you sent us in March'],
  ['10:45', 'Last dance', 'Sparklers lit along the drive, cars waiting at 11:00'],
];

const VENDORS = [
  { kind: 'Venues', names: ['The Barn at Wendell Farm', 'Larkspur Conservatory', 'Old Mill Ballroom'] },
  { kind: 'Flowers', names: ['Field & Stem', 'Hollis Flower Room'] },
  { kind: 'Catering', names: ['Ladle and Lantern', 'Copper Pot Kitchen'] },
  { kind: 'Photography', names: ['June Abernathy Photo', 'Northlight Film Co.'] },
  { kind: 'Music', names: ['The Orchard Strings', 'DJ Marco Lindell'] },
  { kind: 'Cake', names: ['Sugarbell Bakery', 'Crumb & Cream'] },
  { kind: 'Rentals', names: ['Valley Tent and Table', 'Linen Lane'] },
  { kind: 'Hair and makeup', names: ['Studio Rosalind', 'Glow Mobile Beauty'] },
];

export default function ArchAislePlanningPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--blush': '#f7e9df',
        '--plum': '#3d1f3a',
        '--terra': '#c65b43',
        '--sage': '#879a76',
        '--gold': '#dba54a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="blush,plum,terra,sage,gold"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Arch &amp; Aisle</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Wedding planning</span>
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
            A tall arched window, filled with bluff, beside the words. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Wedding planning in Orchard Hill and the valley</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Plan the wedding, <em>then enjoy it.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Arch &amp; Aisle is Celeste Varga&apos;s planning studio. Full
              planning, partial planning or a coordinator for the day, for
              weddings of 20 to 220 guests within two hours of Orchard Hill.
              Twenty-two weddings a year, never two on one weekend.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Check your date</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#levels">The three levels</a>
            </div>
            <p data-edit="hero.heroNote" data-edit-max="240" data-edit-multiline className={s.heroNote}>Now booking 2027 and 2028. Fourteen Saturdays left in 2027.</p>
          </div>
          <div className={s.heroArch}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,2" className={s.windowField} aria-hidden="true">
              <TabbiedPattern
                pattern={bluff}
                palette={WINDOW}
                fit="grid"
                cellSize={58}
                seed="arch-aisle-window"
                options={{ frequency: 0.85 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="hero.archCaption" data-edit-max="240" data-edit-multiline className={s.archCaption}>Est. 2014, 260 weddings and counting</p>
          </div>
        </section>

        {/* ------------------------------------------------------- CHECKLIST */}
        <section id="checklist" className={s.sec} aria-labelledby="check-h">
          <div className={s.secHead}>
            <h2 data-edit="checklist.title" data-edit-format="emphasis" data-edit-max="60" id="check-h" className={s.secTitle}>The planning checklist, <em>by months to go</em></h2>
            <p data-edit="checklist.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The order matters more than the dates. Venue and photographer go
              first because they book out first; the seating plan goes last
              because it changes until the week before.
            </p>
          </div>
          <ol className={s.stages}>
            {CHECKLIST.map((st, i) => (
              <li key={st.when + st.unit} className={s.stage}>
                <p data-edit={`checklist.stageWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.stageWhen}>{st.when}</p>
                <p data-edit={`checklist.stageUnit.${i}`} data-edit-max="240" data-edit-multiline className={s.stageUnit}>{st.unit}</p>
                <ul className={s.tasks}>
                  {st.tasks.map((task, i2) => (
                    <li data-edit={`checklist.item.${i}.${i2}`} data-edit-max="80" key={task}>{task}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,3,1,4" className={s.arcade} aria-hidden="true">
          <TabbiedPattern
            pattern={bluff}
            palette={ARCADE}
            fit="grid"
            cellSize={40}
            seed="arch-aisle-arcade"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- LEVELS */}
        <section id="levels" className={s.sec} aria-labelledby="levels-h">
          <div className={s.secHead}>
            <h2 data-edit="levels.title" data-edit-format="emphasis" data-edit-max="60" id="levels-h" className={s.secTitle}>Three levels <em>of planning</em></h2>
            <p data-edit="levels.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Flat fees, paid in three parts. We take no commission from any
              vendor, so the only person paying us is you.
            </p>
          </div>
          <ul className={s.levels}>
            {LEVELS.map((l, i) => (
              <li key={l.name} className={l.pick ? `${s.level} ${s.levelPick}` : s.level}>
                <h3 data-edit={`levels.levelName.${i}`} data-edit-max="40" className={s.levelName}>{l.name}</h3>
                <p data-edit={`levels.levelPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.levelPrice}>{l.price}</p>
                <p data-edit={`levels.levelFit.${i}`} data-edit-max="240" data-edit-multiline className={s.levelFit}>{l.fit}</p>
                <ul className={s.levelItems}>
                  {l.items.map((item, i2) => (
                    <li data-edit={`levels.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p data-edit="levels.levelsNote" data-edit-max="240" data-edit-multiline className={s.levelsNote}>Destination weddings and elopements are quoted on their own; ask.</p>
        </section>

        {/* ------------------------------------------------------------- DAY */}
        <section id="day" className={s.daySec} aria-labelledby="day-h">
          <div className={s.dayInner}>
            <div className={s.dayHead}>
              <h2 data-edit="day.title" data-edit-format="emphasis" data-edit-max="60" id="day-h" className={s.dayTitle}>The day, <em>hour by hour</em></h2>
              <p data-edit="day.dayNote" data-edit-max="240" data-edit-multiline className={s.dayNote}>
                A real timeline from last September, a 4:00 ceremony at a barn
                with 140 guests. Every vendor gets this, and so does whoever is
                holding your phone.
              </p>
              <div data-edit-pattern="day.field" data-edit-roles="transparent,4,2,3,0,2" className={s.dayArch} aria-hidden="true">
                <TabbiedPattern
                  pattern={bluff}
                  palette={EVENING}
                  fit="grid"
                  cellSize={44}
                  seed="arch-aisle-evening"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ol className={s.timeline}>
              {TIMELINE.map(([time, what, note], i) => (
                <li key={time} className={s.slot}>
                  <time data-edit={`day.slotTime.${i}`} className={s.slotTime}>{time}</time>
                  <h3 data-edit={`day.slotWhat.${i}`} data-edit-max="40" className={s.slotWhat}>{what}</h3>
                  <p data-edit={`day.slotNote.${i}`} data-edit-max="240" data-edit-multiline className={s.slotNote}>{note}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- VENDORS */}
        <section id="vendors" className={s.sec} aria-labelledby="vendors-h">
          <div className={s.vendorGrid}>
            <div>
              <h2 data-edit="vendors.title" data-edit-format="emphasis" data-edit-max="60" id="vendors-h" className={s.secTitle}>Vendors <em>we work beside</em></h2>
              <p data-edit="vendors.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                People we have watched on a hot day with the generator failing.
                You are free to bring your own; these are the ones we would
                choose for our own families.
              </p>
              <blockquote className={s.quote}>
                <p data-edit="vendors.body" data-edit-max="240" data-edit-multiline>Celeste found our florist, fixed our seating plan twice and stood in the rain with an umbrella so we could have the photo by the pond. We did not carry a single thing all day.</p>
                <cite data-edit="vendors.attribution" data-edit-max="48">Priya and Daniel, married at Larkspur Conservatory</cite>
              </blockquote>
            </div>
            <dl className={s.vendors}>
              {VENDORS.map((v, i) => (
                <div key={v.kind} className={s.vendor}>
                  <dt data-edit={`vendors.term.${i}`} data-edit-max="28">{v.kind}</dt>
                  {v.names.map((n, i2) => (
                    <dd data-edit={`vendors.body2.${i}.${i2}`} data-edit-max="200" data-edit-multiline key={n}>{n}</dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contactSec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Check your date</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us the date and a little about the wedding. Celeste answers
                every enquiry herself within two days, with a yes, a no, or a
                nearby Saturday that is free.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>Studio 4, 61 Larkspur Row, Orchard Hill</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Visits</dt>
                  <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Tuesday to Saturday, by appointment</dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550193344">(555) 019-3344</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term4" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:celeste@archandaisle.example">celeste@archandaisle.example</a>
                  </dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="aa-names">Your names</label>
                <input id="aa-names" name="names" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="aa-email">Email</label>
                <input id="aa-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="aa-date">Wedding date</label>
                <input id="aa-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="aa-guests">Guests, roughly</label>
                <input id="aa-guests" name="guests" type="number" min="1" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="aa-venue">Venue, if booked</label>
                <input id="aa-venue" name="venue" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label6" htmlFor="aa-level">Level of planning</label>
                <select id="aa-level" name="level" defaultValue="unsure">
                  <option value="day">Day-of coordination</option>
                  <option value="partial">Partial planning</option>
                  <option value="full">Full planning</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label7" htmlFor="aa-note">Tell us about it</label>
                <textarea id="aa-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send to Celeste</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <div className={s.footText}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Arch &amp; Aisle</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional wedding planning studio. The planner, couples, vendors, prices and address are invented.</p>
            <p>
              Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
          </div>
          <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,2,3,0,2" className={s.footArch} aria-hidden="true">
            <TabbiedPattern
              pattern={bluff}
              palette={EVENING}
              fit="grid"
              cellSize={30}
              seed="arch-aisle-foot"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
