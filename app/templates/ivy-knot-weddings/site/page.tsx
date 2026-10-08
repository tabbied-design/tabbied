import { TabbiedPattern } from 'tabbied/react';
import { knotwork } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './ivy-knot-weddings.module.css';

export const metadata = {
  title: 'Ivy & Knot: Wedding photography, Larkfield',
  description:
    'Ivy & Knot photograph about twenty-four weddings a year, two photographers from getting ready to the last dance, in a documentary style that keeps the posing to twenty minutes.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Knotwork is
   the studio's name drawn: bands passing over and under until they tie.
   It is the field behind the invitation in the hero, every panel on the
   gallery wall, the band behind the kind words and the footer's edge. */
const IVORY = '#f6f0e6';
const IVY = '#1e3a2f';
const BLUSH = '#d9a294';
const GOLD = '#b08a4a';

const HERO = ['transparent', GOLD, BLUSH];
const BAND = ['transparent', IVORY, GOLD];
const EDGE = ['transparent', GOLD, BLUSH];

const NAV = [
  ['The day', '#day'],
  ['Packages', '#packages'],
  ['Galleries', '#galleries'],
  ['Booking', '#booking'],
];

const DAY = [
  ['11:00', 'Getting ready', 'Hair, buttons, the dress on its hanger, the letters. We arrive quietly and stay out of the mirror.'],
  ['1:30', 'First look', 'If you want one: ten minutes alone somewhere quiet, with us at a distance.'],
  ['2:30', 'Ceremony', 'No flash, no walking the aisle. One of us at the front, one at the back.'],
  ['3:15', 'Confetti and family', 'Twelve groups in twenty minutes, from a list you send us, called by a friend with a loud voice.'],
  ['4:00', 'Portraits', 'Twenty-five minutes, the two of you, walking more than standing. Then back to your guests.'],
  ['5:30', 'Dinner and speeches', 'We eat when you eat, and are back up for every speech and every face listening to it.'],
  ['7:45', 'Golden hour', 'Ten minutes outside when the light is lowest. Worth leaving the dance floor for.'],
  ['8:15', 'Cake and first dance', 'One of us by the band, one on the far side of the floor, for both your faces.'],
  ['10:30', 'Last dance', 'We stay for the last song and the send-off, then slip out without a goodbye.'],
];

type Pack = { name: string; price: string; hours: string; items: string[] };

const PACKAGES: Pack[] = [
  { name: 'The vows', price: '$2,400', hours: 'Four hours, one photographer', items: ['Ceremony, family and portraits', 'About 350 finished photographs', 'Online gallery for two years', 'Sneak peek within three days'] },
  { name: 'The day', price: '$3,900', hours: 'Eight hours, two photographers', items: ['Getting ready to first dance', 'About 700 finished photographs', 'Online gallery and print shop', 'A planning call six weeks before'] },
  { name: 'The whole story', price: '$5,600', hours: 'Ten hours, two photographers', items: ['Getting ready to last dance', 'An engagement session in the spring', 'A 30-page linen album', 'About 900 finished photographs'] },
];

/* The gallery wall: one colorway per wedding, each panel's ground set by
   its frame's class and its two strands by its palette. */
const G_IVY = ['transparent', GOLD, BLUSH];
const G_BLUSH = ['transparent', IVY, IVORY];
const G_GOLD = ['transparent', IVORY, IVY];
const G_PAPER = ['transparent', IVY, GOLD];
const G_NIGHT = ['transparent', BLUSH, IVORY];
const G_ROSE = ['transparent', GOLD, IVY];

const STEPS = [
  ['I', 'Check the date', 'Send the date and the venue. We reply within a day, and say so plainly if we are already booked.'],
  ['II', 'Coffee, or a call', 'Forty-five minutes to hear about the two of you and the day you want. No obligation, no sales.'],
  ['III', 'Hold the date', 'A short contract and a 25% retainer. The rest is due a month before the wedding.'],
  ['IV', 'Plan the day', 'Six weeks out we build the timeline together, with your planner if you have one.'],
  ['V', 'Your gallery', 'A sneak peek within three days, the whole gallery within six weeks, the album by spring.'],
];

const HOURS = [
  ['Studio visits', 'Tuesday to Thursday, 10:00-6:00'],
  ['Weekends', 'At weddings, replies on Monday'],
  ['Booking now', '2027 and the last dates of 2026'],
];

export default function IvyKnotWeddingsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--ivory': '#f6f0e6',
        '--ivy': '#1e3a2f',
        '--blush': '#d9a294',
        '--gold': '#b08a4a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="ivory,ivy,blush,gold"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@400;500&display=swap"
      />

      <header className={s.bar}>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Ivy &amp; Knot</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Wedding photography</span>
        </a>
        <div className={s.barEnd}>
          <a data-edit="bar.barDate" data-edit-max="28" className={s.barDate} href="#contact">Check your date</a>
          <TemplateMenu className={s.siteMenu}>
            {NAV.map(([label, href], i) => (
              <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
            ))}
          </TemplateMenu>
        </div>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            An invitation card laid on the knotwork, the way a card sits on
            a table runner. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={knotwork}
              palette={HERO}
              fit="grid"
              cellSize={72}
              seed="ivyknot-hero"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.invite}>
            <p data-edit="hero.inviteKicker" data-edit-max="240" data-edit-multiline className={s.inviteKicker}>Ivy &amp; Knot request the pleasure</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              The whole day, <em>tied together.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Documentary wedding photography for couples who would rather be
              at their wedding than posing for it. Two photographers, from the
              first button to the last dance.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Check your date</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#packages">See the packages</a>
            </div>
            <ul className={s.inviteFacts}>
              <li data-edit="hero.item" data-edit-max="80">Larkfield and anywhere</li>
              <li data-edit="hero.item2" data-edit-max="80">24 weddings a year</li>
              <li data-edit="hero.item3" data-edit-max="80">Booking 2027</li>
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------- DAY */}
        <section id="day" className={s.sec} aria-labelledby="day-h">
          <div className={s.secHead}>
            <p data-edit="day.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Order of the day</p>
            <h2 data-edit="day.title" data-edit-format="emphasis" data-edit-max="60" id="day-h" className={s.secTitle}>From getting ready <em>to the last dance</em></h2>
            <p data-edit="day.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A typical summer wedding with a two-thirty ceremony. Yours will
              have its own times; we write them out together six weeks before.
            </p>
          </div>
          <ol className={s.timeline}>
            {DAY.map(([time, what, note], i) => (
              <li key={time} className={s.moment}>
                <time data-edit={`day.momentTime.${i}`} className={s.momentTime}>{time}</time>
                <div className={s.momentBody}>
                  <h3 data-edit={`day.momentTitle.${i}`} data-edit-max="40" className={s.momentTitle}>{what}</h3>
                  <p data-edit={`day.momentNote.${i}`} data-edit-max="240" data-edit-multiline className={s.momentNote}>{note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- PACKAGES */}
        <section id="packages" className={s.sec} aria-labelledby="packages-h">
          <div className={s.secHead}>
            <p data-edit="packages.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Packages</p>
            <h2 data-edit="packages.title" data-edit-format="emphasis" data-edit-max="60" id="packages-h" className={s.secTitle}>Three ways <em>to keep the day</em></h2>
            <p data-edit="packages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every package includes travel within fifty miles of Larkfield,
              every finished photograph in full resolution, and the right to
              print them anywhere you like.
            </p>
          </div>
          <div className={s.packages}>
            {PACKAGES.map((p, i) => (
              <article key={p.name} className={i === 1 ? `${s.pack} ${s.packPick}` : s.pack}>
                <h3 data-edit={`pack.packName.${i}`} data-edit-max="40" className={s.packName}>{p.name}</h3>
                <p data-edit={`pack.packHours.${i}`} data-edit-max="240" data-edit-multiline className={s.packHours}>{p.hours}</p>
                <p data-edit={`pack.packPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{p.price}</p>
                <ul className={s.packItems}>
                  {p.items.map((it, i2) => (
                    <li data-edit={`pack.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p data-edit="packages.packNote" data-edit-max="240" data-edit-multiline className={s.packNote}>Extra hours are $280 each. Albums for parents are $340, made to match yours.</p>
        </section>

        {/* ------------------------------------------------------- GALLERIES */}
        <section id="galleries" className={s.sec} aria-labelledby="galleries-h">
          <div className={s.secHead}>
            <p data-edit="galleries.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Recent galleries</p>
            <h2 data-edit="galleries.title" data-edit-format="emphasis" data-edit-max="60" id="galleries-h" className={s.secTitle}>Six weddings, <em>six colorways</em></h2>
            <p data-edit="galleries.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Each couple's gallery is private and sent to them alone. These
              panels stand in for the photographs: ask, and we will show you a
              whole wedding at the studio.
            </p>
          </div>
          <div className={s.gallery}>
            <figure className={s.frame}>
              <div data-edit-pattern="galleries.field" data-edit-roles="transparent,3,2" className={`${s.panel} ${s.ivy}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={knotwork}
                  palette={G_IVY}
                  fit="grid"
                  cellSize={56}
                  seed="ivyknot-gallery-1"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span data-edit="galleries.couple" data-edit-max="60" className={s.couple}>Maren and Joel</span>
                <span data-edit="galleries.place" data-edit-max="60" className={s.place}>Stillwater Barn, June</span>
              </figcaption>
            </figure>
            <figure className={s.frame}>
              <div data-edit-pattern="galleries.field2" data-edit-roles="transparent,1,0" className={`${s.panel} ${s.blush}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={knotwork}
                  palette={G_BLUSH}
                  fit="grid"
                  cellSize={44}
                  seed="ivyknot-gallery-2"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span data-edit="galleries.couple2" data-edit-max="60" className={s.couple}>Priya and Sam</span>
                <span data-edit="galleries.place2" data-edit-max="60" className={s.place}>Hollins Glasshouse, September</span>
              </figcaption>
            </figure>
            <figure className={s.frame}>
              <div data-edit-pattern="galleries.field3" data-edit-roles="transparent,0,1" className={`${s.panel} ${s.gold}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={knotwork}
                  palette={G_GOLD}
                  fit="grid"
                  cellSize={50}
                  seed="ivyknot-gallery-3"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span data-edit="galleries.couple3" data-edit-max="60" className={s.couple}>Tess and Ollie</span>
                <span data-edit="galleries.place3" data-edit-max="60" className={s.place}>The Old Rope Works, April</span>
              </figcaption>
            </figure>
            <figure className={s.frame}>
              <div data-edit-pattern="galleries.field4" data-edit-roles="transparent,1,3" className={`${s.panel} ${s.paper}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={knotwork}
                  palette={G_PAPER}
                  fit="grid"
                  cellSize={40}
                  seed="ivyknot-gallery-4"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span data-edit="galleries.couple4" data-edit-max="60" className={s.couple}>Ada and Ruth</span>
                <span data-edit="galleries.place4" data-edit-max="60" className={s.place}>Larkfield Town Hall, December</span>
              </figcaption>
            </figure>
            <figure className={s.frame}>
              <div data-edit-pattern="galleries.field5" data-edit-roles="transparent,2,0" className={`${s.panel} ${s.ivy}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={knotwork}
                  palette={G_NIGHT}
                  fit="grid"
                  cellSize={46}
                  seed="ivyknot-gallery-5"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span data-edit="galleries.couple5" data-edit-max="60" className={s.couple}>Noor and Felix</span>
                <span data-edit="galleries.place5" data-edit-max="60" className={s.place}>Wrenmoor Orchard, October</span>
              </figcaption>
            </figure>
            <figure className={s.frame}>
              <div data-edit-pattern="galleries.field6" data-edit-roles="transparent,3,1" className={`${s.panel} ${s.blush}`} aria-hidden="true">
                <TabbiedPattern
                  pattern={knotwork}
                  palette={G_ROSE}
                  fit="grid"
                  cellSize={60}
                  seed="ivyknot-gallery-6"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption className={s.caption}>
                <span data-edit="galleries.couple6" data-edit-max="60" className={s.couple}>Hal and June</span>
                <span data-edit="galleries.place6" data-edit-max="60" className={s.place}>Cobble Quay, August</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <div className={s.band}>
          <div data-edit-pattern="top.field" data-edit-roles="transparent,0,3" className={s.bandField} aria-hidden="true">
            <TabbiedPattern
              pattern={knotwork}
              palette={BAND}
              fit="grid"
              cellSize={48}
              seed="ivyknot-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <figure className={s.quote}>
            <blockquote>
              <p data-edit="top.body" data-edit-max="240" data-edit-multiline>We forgot they were there, and then we saw the photographs and remembered everything.</p>
            </blockquote>
            <figcaption data-edit="top.caption" data-edit-max="120" data-edit-multiline>Maren and Joel, married at Stillwater Barn</figcaption>
          </figure>
        </div>

        {/* --------------------------------------------------------- BOOKING */}
        <section id="booking" className={s.sec} aria-labelledby="booking-h">
          <div className={s.secHead}>
            <p data-edit="booking.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Booking</p>
            <h2 data-edit="booking.title" data-edit-format="emphasis" data-edit-max="60" id="booking-h" className={s.secTitle}>Five steps <em>to the gallery</em></h2>
            <p data-edit="booking.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most couples book twelve to eighteen months ahead. Winter and
              weekday weddings can often be booked at a few weeks' notice.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([n, t, d], i) => (
              <li key={n} className={s.step}>
                <span data-edit={`booking.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{n}</span>
                <h3 data-edit={`booking.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                <p data-edit={`booking.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactText}>
              <p data-edit="contact.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Write to us</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Check your date</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us when and where, and a little about the two of you. We
                answer every enquiry ourselves, within a day.
              </p>
              <dl className={s.studio}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Studio</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>12 Orchard Mews, Larkfield</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Phone</dt>
                  <dd><a data-edit="contact.link" data-edit-max="28" href="tel:+15550162290">(555) 016-2290</a></dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd><a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@ivyandknot.example">hello@ivyandknot.example</a></dd>
                </div>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body2.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="ik-names">Your names</label>
                <input id="ik-names" name="names" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="ik-email">Email</label>
                <input id="ik-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="ik-date">Wedding date</label>
                <input id="ik-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="ik-guests">Guests, roughly</label>
                <input id="ik-guests" name="guests" type="number" min="2" inputMode="numeric" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="ik-venue">Venue</label>
                <input id="ik-venue" name="venue" type="text" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="ik-note">Tell us about the day</label>
                <textarea id="ik-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send our date</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2" className={s.footEdge} aria-hidden="true">
          <TabbiedPattern
            pattern={knotwork}
            palette={EDGE}
            fit="grid"
            cellSize={36}
            seed="ivyknot-edge"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Ivy &amp; Knot</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional wedding photography studio. The couples, venues, prices and address are invented.</p>
          <p>Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
        </div>
      </footer>
    </div>
  );
}
