import { TabbiedPattern } from 'tabbied/react';
import { racetrack } from 'tabbied/patterns';
import s from './next-turn-careers.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Next Turn: Career change coaching',
  description:
    'Next Turn is career coaching for people changing direction. A six-stop route from taking stock to a signed offer, with coaching packages, resume rewrites and interview practice.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The racetrack
   is the road map: asphalt and slate roads with lane lines, looping across
   the hero's map, running as a band of traffic between the route and the
   packages, and leaving town along the footer. */
const SAGE = '#e7ead9';
const ASPHALT = '#23292f';
const SLATE = '#3e4a63';
const LANE = '#f2c230';
const CONE = '#e06a3a';

const MAP = ['transparent', ASPHALT, SLATE, LANE, SAGE];
const TRAFFIC = ['transparent', SLATE, ASPHALT, SAGE, LANE];
const ROADS = ['transparent', SLATE, CONE, LANE, SAGE];

const NAV = [
  ['The route', '#route'],
  ['Packages', '#packages'],
  ['Resumes', '#resumes'],
  ['Interviews', '#interviews'],
  ['Contact', '#contact'],
];

/* The six stops, in the order a change is usually made. */
const STOPS = [
  { mile: 'Stop 1', name: 'Take stock', text: 'What you are good at, what you will not do again, and how many months of savings you have to work with.' },
  { mile: 'Stop 2', name: 'Explore', text: 'Three possible roads, and five conversations with people already driving them. Introductions included.' },
  { mile: 'Stop 3', name: 'Test drive', text: 'A small paid project, a short course or a day shadowing, before you bet a career on it.' },
  { mile: 'Stop 4', name: 'Retool', text: 'A resume that tells the new story, a profile that matches it, and a portfolio if the field wants one.' },
  { mile: 'Stop 5', name: 'Interview', text: 'Your ten best stories, practiced until they sound like you, plus the question everyone dreads: why the change?' },
  { mile: 'Stop 6', name: 'Arrive', text: 'Weigh the offers, negotiate the first one, and plan the first ninety days in the new seat.' },
];

const PACKAGES = [
  {
    name: 'Wayfinding',
    price: '$180',
    per: 'one session, 75 minutes',
    best: 'For a second opinion on a plan you already have.',
    items: ['A map of where you are now', 'Three next steps in writing', 'A follow-up email two weeks later'],
    pick: false,
  },
  {
    name: 'The Route',
    price: '$1,450',
    per: 'eight sessions over four months',
    best: 'For the whole change, from the first doubt to the first day.',
    items: ['All six stops, at your pace', 'Resume and profile rewrite', 'Two recorded mock interviews', 'Messages between sessions'],
    pick: true,
  },
  {
    name: 'Last Mile',
    price: '$690',
    per: 'three sessions over six weeks',
    best: 'For when you know where you are going and need to get hired.',
    items: ['Resume and profile rewrite', 'Two recorded mock interviews', 'Offer and salary review'],
    pick: false,
  },
];

const REWRITES = [
  ['Responsible for social media accounts.', 'Grew a three-person charity\'s newsletter from 900 to 6,200 readers in a year.'],
  ['Taught 9th grade science for 11 years.', 'Designed and tested 140 lessons a year with 120 users, and rewrote them from the feedback.'],
  ['Managed a busy restaurant.', 'Ran a 40-seat operation: 18 staff, $1.3M in sales, food cost cut from 34% to 29%.'],
];

const RESUME_SERVICES = [
  ['Resume rewrite', 'Five working days, two rounds of edits', '$340'],
  ['Profile rewrite', 'Headline, about section and the first three roles', '$190'],
  ['Cover letter kit', 'One letter, plus the template to adapt it', '$95'],
];

const QUESTIONS = [
  'Walk me through your background.',
  'Why are you leaving teaching, or law, or retail?',
  'You have never done this job. Why should we take the risk?',
  'Tell me about a time a project went wrong.',
  'What salary are you looking for?',
];

const TRIPS = [
  ['Teacher', 'UX researcher', '7 months'],
  ['Paralegal', 'Data analyst', '5 months'],
  ['Restaurant manager', 'Logistics operations', '4 months'],
  ['Nurse', 'Clinical software trainer', '6 months'],
];

const HOURS = [
  ['Sessions', 'Tuesday to Friday, 8:00-7:00'],
  ['Where', 'On video, or at the studio'],
  ['Replies', 'Within one working day'],
];

export default function NextTurnCareersPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sage': '#e7ead9',
        '--asphalt': '#23292f',
        '--slate': '#3e4a63',
        '--lane': '#f2c230',
        '--cone': '#e06a3a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sage,asphalt,slate,lane,cone"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,400;0,600;0,800;1,400&family=Overpass+Mono:wght@500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandSign} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Next Turn</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="#contact">Free intro call</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The road map runs off the right edge of the page, with the exit
            sign standing at its corner. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Career change coaching</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              The job you have is not the only road <span>out of town.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Next Turn is coaching for people changing direction mid-career:
              teachers, nurses, lawyers, managers. Six stops, a map for each, and
              someone in the passenger seat who has driven the road before.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a free 20-minute call</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#route">See the route</a>
            </div>
            <dl className={s.odometer}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Changes made</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>312</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Average trip</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>5.5 mo</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Still in the new job a year later</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>89%</dd>
              </div>
            </dl>
          </div>

          <div className={s.heroMap}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,0" className={s.mapField} aria-hidden="true">
              <TabbiedPattern
                pattern={racetrack}
                palette={MAP}
                fit="grid"
                cellSize={78}
                seed="next-turn-map"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.sign}>
              <p data-edit="hero.signExit" data-edit-max="240" data-edit-multiline className={s.signExit}>Exit 6</p>
              <p data-edit="hero.signName" data-edit-max="240" data-edit-multiline className={s.signName}>Next Turn</p>
              <p data-edit="hero.signSub" data-edit-max="240" data-edit-multiline className={s.signSub}>New career, all lanes</p>
              <p data-edit="hero.signMiles" data-edit-max="240" data-edit-multiline className={s.signMiles}>1/2 mile</p>
            </div>
            <p data-edit="hero.here" data-edit-max="240" data-edit-multiline className={s.here}>You are here</p>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROUTE
            Six stops along a road that runs out, turns, and comes back. */}
        <section id="route" className={s.sec} aria-labelledby="route-h">
          <div className={s.secHead}>
            <p data-edit="route.label" data-edit-max="240" data-edit-multiline className={s.label}>The route</p>
            <h2 data-edit="route.secTitle" data-edit-max="60" id="route-h" className={s.secTitle}>Six stops from the old job to the new one</h2>
            <p data-edit="route.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most people take four to seven months. Some stops take a week, some
              take two months, and you can stay at one as long as it needs.
            </p>
          </div>
          <ol className={s.route}>
            {STOPS.map((stop, i) => (
              <li key={stop.name} className={s.stop}>
                <span className={s.stopPin} aria-hidden="true" />
                <div className={s.stopCard}>
                  <p data-edit={`route.stopMile.${i}`} data-edit-max="240" data-edit-multiline className={s.stopMile}>{stop.mile}</p>
                  <h3 data-edit={`route.stopName.${i}`} data-edit-max="40" className={s.stopName}>{stop.name}</h3>
                  <p data-edit={`route.stopText.${i}`} data-edit-max="240" data-edit-multiline className={s.stopText}>{stop.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,1,0,3" className={s.traffic} aria-hidden="true">
          <TabbiedPattern
            pattern={racetrack}
            palette={TRAFFIC}
            fit="grid"
            cellSize={60}
            seed="next-turn-traffic"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* -------------------------------------------------------- PACKAGES */}
        <section id="packages" className={s.sec} aria-labelledby="packages-h">
          <div className={s.secHead}>
            <p data-edit="packages.label" data-edit-max="240" data-edit-multiline className={s.label}>Packages</p>
            <h2 data-edit="packages.secTitle" data-edit-max="60" id="packages-h" className={s.secTitle}>Pick how far you want company</h2>
            <p data-edit="packages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every package starts with the free call. Pay in full or in monthly
              parts, and stop at any time for a refund of the sessions not used.
            </p>
          </div>
          <ul className={s.packages}>
            {PACKAGES.map((p, i) => (
              <li key={p.name} className={p.pick ? `${s.package} ${s.pick}` : s.package}>
                <h3 data-edit={`packages.packageName.${i}`} data-edit-max="40" className={s.packageName}>{p.name}</h3>
                <p data-edit={`packages.packagePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packagePrice}>{p.price}</p>
                <p data-edit={`packages.packagePer.${i}`} data-edit-max="240" data-edit-multiline className={s.packagePer}>{p.per}</p>
                <p data-edit={`packages.packageBest.${i}`} data-edit-max="240" data-edit-multiline className={s.packageBest}>{p.best}</p>
                <ul className={s.packageItems}>
                  {p.items.map((item, i2) => (
                    <li data-edit={`packages.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
                <a className={s.packageLink} href="#contact">{`Start with ${p.name}`}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- RESUMES */}
        <section id="resumes" className={s.sec} aria-labelledby="resumes-h">
          <div className={s.secHead}>
            <p data-edit="resumes.label" data-edit-max="240" data-edit-multiline className={s.label}>Resumes and profiles</p>
            <h2 data-edit="resumes.secTitle" data-edit-max="60" id="resumes-h" className={s.secTitle}>The same work, told for the new road</h2>
            <p data-edit="resumes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              You do not need a new past. You need the one you have described in
              the words the next field uses. Three lines from real rewrites, with
              the names changed:
            </p>
          </div>
          <div className={s.rewrites}>
            {REWRITES.map(([before, after], i) => (
              <div key={before} className={s.rewrite}>
                <p data-edit={`resumes.before.${i}`} data-edit-max="240" data-edit-multiline className={s.before}>{before}</p>
                <p data-edit={`resumes.after.${i}`} data-edit-max="240" data-edit-multiline className={s.after}>{after}</p>
              </div>
            ))}
          </div>
          <ul className={s.services}>
            {RESUME_SERVICES.map(([name, note, price], i) => (
              <li key={name}>
                <span data-edit={`resumes.serviceName.${i}`} data-edit-max="60" className={s.serviceName}>{name}</span>
                <span data-edit={`resumes.serviceNote.${i}`} data-edit-max="60" className={s.serviceNote}>{note}</span>
                <span data-edit={`resumes.servicePrice.${i}`} data-edit-max="60" className={s.servicePrice}>{price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ INTERVIEWS */}
        <section id="interviews" className={s.dark} aria-labelledby="interviews-h">
          <div className={s.darkInner}>
            <div>
              <p data-edit="interviews.darkLabel" data-edit-max="240" data-edit-multiline className={s.darkLabel}>Interview practice</p>
              <h2 data-edit="interviews.darkTitle" data-edit-max="60" id="interviews-h" className={s.darkTitle}>Rehearse the hard questions out loud, on camera</h2>
              <p data-edit="interviews.darkNote" data-edit-max="240" data-edit-multiline className={s.darkNote}>
                Two mock interviews of 45 minutes with a hiring manager from your
                new field, recorded, with written notes on every answer. Then we
                build your story bank: ten short stories that answer almost
                anything.
              </p>
              <p data-edit="interviews.darkPrice" data-edit-max="240" data-edit-multiline className={s.darkPrice}>$260 for two</p>
            </div>
            <div>
              <h3 data-edit="interviews.qTitle" data-edit-max="40" className={s.qTitle}>Questions we always practice</h3>
              <ol className={s.questions}>
                {QUESTIONS.map((q, i) => (
                  <li data-edit={`interviews.item.${i}`} data-edit-max="80" key={q}>{q}</li>
                ))}
              </ol>
              <h3 data-edit="interviews.qTitle2" data-edit-max="40" className={s.qTitle}>Where clients went</h3>
              <ul className={s.trips}>
                {TRIPS.map(([from, to, time], i) => (
                  <li key={to}>
                    <span data-edit={`interviews.tripFrom.${i}`} data-edit-max="60" className={s.tripFrom}>{from}</span>
                    <span data-edit={`interviews.tripTo.${i}`} data-edit-max="60" className={s.tripTo}>{to}</span>
                    <span data-edit={`interviews.tripTime.${i}`} data-edit-max="60" className={s.tripTime}>{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.label" data-edit-max="240" data-edit-multiline className={s.label}>Contact</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a free 20-minute call</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us where you are and where you think you might be going. If
                coaching is not the right help, you will hear that on the call.
              </p>
              <p data-edit="contact.coach" data-edit-max="240" data-edit-multiline className={s.coach}>Coaching by Dana Whitlock, who left accounting for this in 2014.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550192300">(555) 019-2300</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:dana@nextturn.example">dana@nextturn.example</a>
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>Studio 4, 220 Crossway Avenue, Fairhaven</p>
              <dl className={s.hours}>
                {HOURS.map(([label, value], i) => (
                  <div key={label}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{label}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="nt-name">Name</label>
                <input id="nt-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="nt-email">Email</label>
                <input id="nt-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="nt-now">Your work now</label>
                <input id="nt-now" name="now" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label5" htmlFor="nt-stop">Where you are on the route</label>
                <select id="nt-stop" name="stop" defaultValue="1">
                  <option value="1">Stop 1: taking stock</option>
                  <option value="2">Stop 2: exploring</option>
                  <option value="3">Stop 3: test driving</option>
                  <option value="4">Stop 4: retooling</option>
                  <option value="5">Stop 5: interviewing</option>
                  <option value="6">Stop 6: weighing an offer</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label6" htmlFor="nt-where">Where you might be heading</label>
                <textarea id="nt-where" name="where" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Request a call</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Calls are free and there is no follow-up sales pitch.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,3,0" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={racetrack}
            palette={ROADS}
            fit="grid"
            cellSize={46}
            seed="next-turn-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Next Turn</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional career coaching practice. The coach, clients, results, prices and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
