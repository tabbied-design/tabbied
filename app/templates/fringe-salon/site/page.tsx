import { TabbiedPattern } from 'tabbied/react';
import { bangle, marbledarcs } from 'tabbied/patterns';
import s from './fringe-salon.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Fringe: Hair salon, Arden Street',
  description:
    'Fringe is a hair salon for cuts, color and everything in between. Six stylists at three levels, one price list you can read before you sit down, and free fringe trims between cuts.',
};

/* Site colors. The arch is the salon's mirror: the marbled sweep drawn on
   a petal ground, in rose, mauve, blush and a little ink. */
const BLUSH = '#FAF5F2';
const INK = '#1F1A1C';
const ROSE = '#D96C7B';
const MAUVE = '#968A8E';
const SWEEP = ['transparent', ROSE, MAUVE, BLUSH, INK];
const CURLS = ['transparent', ROSE, MAUVE, INK, ROSE, MAUVE];

const NAV = [
  ['Prices', '#prices'],
  ['Stylists', '#stylists'],
  ['Consultations', '#consultations'],
  ['Policy', '#policy'],
  ['Visit', '#visit'],
];

const LEVELS = [
  ['Stylist', '2 to 5 years'],
  ['Senior', '5 to 10 years'],
  ['Director', '10 years and up'],
];

type Service = {
  name: string;
  note: string;
  prices: string[];
};

type Group = {
  name: string;
  services: Service[];
};

const MENU: Group[] = [
  {
    name: 'Cuts',
    services: [
      { name: 'Cut and finish', note: 'Wash, cut and blow-dry, any length', prices: ['$68', '$82', '$98'] },
      { name: 'Restyle', note: 'A big change, consultation included', prices: ['$84', '$98', '$118'] },
      { name: 'Short cut', note: 'Clipper and scissor work, neck tidy', prices: ['$46', '$54', '$64'] },
      { name: 'Fringe trim', note: 'Between cuts, no booking needed', prices: ['Free', 'Free', 'Free'] },
      { name: 'Under 12s', note: 'Cut and a quick dry', prices: ['$32', '$38', '$44'] },
    ],
  },
  {
    name: 'Color',
    services: [
      { name: 'Root tint', note: 'Up to 2 cm of regrowth', prices: ['$72', '$82', '$94'] },
      { name: 'Full head tint', note: 'One shade, roots to ends', prices: ['$96', '$110', '$126'] },
      { name: 'Half head highlights', note: 'Foils, with a toner', prices: ['$104', '$120', '$138'] },
      { name: 'Full head highlights', note: 'Foils, with a toner', prices: ['$138', '$158', '$180'] },
      { name: 'Balayage', note: 'Hand-painted, with a toner', prices: ['$165', '$190', '$220'] },
      { name: 'Gloss', note: 'Shine and tone, 20 minutes', prices: ['$38', '$42', '$48'] },
    ],
  },
  {
    name: 'Treatments',
    services: [
      { name: 'Bond repair', note: 'Added to any color service', prices: ['$28', '$28', '$28'] },
      { name: 'Scalp treatment', note: 'Massage, mask and steam', prices: ['$35', '$35', '$35'] },
      { name: 'Smoothing', note: 'Lasts about twelve weeks', prices: ['$220', '$250', '$280'] },
    ],
  },
  {
    name: 'Styling',
    services: [
      { name: 'Blow-dry', note: 'Wash and finish', prices: ['$42', '$48', '$56'] },
      { name: 'Hair up', note: 'For an evening or an event', prices: ['$65', '$75', '$90'] },
      { name: 'Bridal trial', note: 'Taken off the wedding-day price', prices: ['$85', '$95', '$110'] },
    ],
  },
];

type Stylist = {
  name: string;
  level: string;
  loves: string;
  days: string;
};

const STYLISTS: Stylist[] = [
  { name: 'Ines Marlow', level: 'Director', loves: 'Precision bobs and very short hair', days: 'Tue to Sat' },
  { name: 'Theo Achebe', level: 'Director', loves: 'Color correction and cool blondes', days: 'Wed to Sun' },
  { name: 'Mara Lindqvist', level: 'Senior', loves: 'Balayage and curly cuts, cut dry', days: 'Tue to Fri' },
  { name: 'Joss Okonkwo', level: 'Senior', loves: 'Short cuts, fades and beards', days: 'Wed to Sat' },
  { name: 'Rosa Delgado', level: 'Stylist', loves: 'Blow-dries, hair up and waves', days: 'Thu to Sun' },
  { name: 'Ada Byrne', level: 'Stylist', loves: 'Glosses, root tints, first colors', days: 'Tue, Wed, Sat' },
];

const CONSULT = [
  {
    title: 'Consultations',
    lead: 'Free, fifteen minutes, in the chair or on a video call.',
    body: 'We ask for one before any color change, a restyle or a smoothing treatment. Bring a picture of what you like and one of what you do not; the second is usually more useful.',
  },
  {
    title: 'Patch tests',
    lead: 'Free, five minutes, at least 48 hours before color.',
    body: 'Needed if you are new to us, or have not had color with us in six months. Walk in any time we are open, no booking, and we dab a little behind your ear.',
  },
];

const POLICY = [
  ['Booking', 'Online, by phone, or at the desk. A first color appointment needs a consultation and a patch test first.'],
  ['Deposits', 'Services over $100 take a $30 deposit when you book. It comes off the bill on the day.'],
  ['Changing or canceling', 'Free with 48 hours of notice. With less, the deposit is kept; for a no-show we charge half the service.'],
  ['Running late', 'We hold your chair for fifteen minutes. After that we may shorten the service or move you to another day.'],
  ['Not quite right', 'Tell us within seven days and we will adjust it for free, with the same stylist or another one.'],
  ['Children', 'Welcome for their own cuts. We cannot watch little ones while a grown-up is under the dryer.'],
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday', '10:00 to 19:00'],
  ['Wednesday', '10:00 to 19:00'],
  ['Thursday', '10:00 to 21:00'],
  ['Friday', '9:00 to 19:00'],
  ['Saturday', '9:00 to 17:00'],
  ['Sunday', '11:00 to 16:00'],
];

export default function FringeSalonPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Fringe</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barBook} href="#visit">Book a chair</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The name as large as the page allows, and the mirror under it:
            an arch holding the marbled sweep. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <h1 id="hero-h" className={s.wordmark}>
            Fringe<em>.</em>
          </h1>
          <div className={s.heroRow}>
            <div className={s.heroText}>
              <p className={s.heroLead}>
                A hair salon for cuts, color and everything in between.
              </p>
              <p className={s.heroBody}>
                Six stylists at three levels and one price list you can read
                before you sit down. Fringe trims are free between cuts: walk
                in, sit down, ten minutes.
              </p>
              <div className={s.heroActions}>
                <a className={s.button} href="#visit">Book a chair</a>
                <a className={s.textLink} href="#prices">See the prices</a>
              </div>
            </div>
            <div className={s.arch} aria-hidden="true">
              <TabbiedPattern
                pattern={marbledarcs}
                palette={SWEEP}
                fit="grid"
                cellSize={40}
                seed="fringe-mirror"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt>Open today</dt>
                <dd>10:00 to 19:00</dd>
              </div>
              <div>
                <dt>Find us</dt>
                <dd>41 Arden Street</dd>
              </div>
              <div>
                <dt>Call</dt>
                <dd>
                  <a href="tel:+15550104477">(555) 010-4477</a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES
            The matrix: services down the side, the three levels across. On
            a phone each row restacks and every price carries its level. */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <h2 id="prices-h" className={s.bigHead}>Prices</h2>
            <p className={s.secNote}>
              You pay for the stylist's experience, not the length of your
              hair. Color prices are from: very long or thick hair can add up
              to a fifth, and we tell you before we start.
            </p>
          </div>
          <table className={s.matrix}>
            <caption className={s.visuallyHidden}>Prices by service and stylist level</caption>
            <thead>
              <tr>
                <th scope="col" className={s.corner}>
                  <span>Service</span>
                </th>
                {LEVELS.map(([level, years]) => (
                  <th key={level} scope="col">
                    <span className={s.levelName}>{level}</span>
                    <small className={s.levelYears}>{years}</small>
                  </th>
                ))}
              </tr>
            </thead>
            {MENU.map((g) => (
              <tbody key={g.name}>
                <tr className={s.groupRow}>
                  <th scope="colgroup" colSpan={4}>{g.name}</th>
                </tr>
                {g.services.map((sv) => (
                  <tr key={sv.name} className={s.serviceRow}>
                    <th scope="row">
                      <span className={s.serviceName}>{sv.name}</span>
                      <small className={s.serviceNote}>{sv.note}</small>
                    </th>
                    <td>
                      <span className={s.cellLevel}>Stylist</span>
                      <span className={s.price}>{sv.prices[0]}</span>
                    </td>
                    <td>
                      <span className={s.cellLevel}>Senior</span>
                      <span className={s.price}>{sv.prices[1]}</span>
                    </td>
                    <td>
                      <span className={s.cellLevel}>Director</span>
                      <span className={s.price}>{sv.prices[2]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </section>

        {/* -------------------------------------------------------- STYLISTS */}
        <section id="stylists" className={s.sec} aria-labelledby="stylists-h">
          <div className={s.secHead}>
            <h2 id="stylists-h" className={s.bigHead}>Stylists</h2>
            <p className={s.secNote}>
              Book the person or book the level. Everyone trained here, and
              everyone cuts on the same Thursday evening course.
            </p>
          </div>
          <ol className={s.stylists}>
            {STYLISTS.map((st) => (
              <li key={st.name} className={s.stylist}>
                <h3 className={s.stylistName}>{st.name}</h3>
                <p className={s.stylistLevel}>{st.level}</p>
                <p className={s.stylistLoves}>{st.loves}</p>
                <p className={s.stylistDays}>{st.days}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* The curls: a thin band of scattered arcs between two sections. */}
        <div className={s.band} aria-hidden="true">
          <div className={s.bandField}>
            <TabbiedPattern
              pattern={bangle}
              palette={CURLS}
              fit="grid"
              cellSize={44}
              seed="fringe-curls"
              options={{ frequency: 0.3 }}
              redrawInterval={8000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* --------------------------------------------------- CONSULTATIONS */}
        <section id="consultations" className={s.sec} aria-labelledby="consult-h">
          <div className={s.secHead}>
            <h2 id="consult-h" className={s.bigHead}>Before color</h2>
            <p className={s.secNote}>
              Two short, free appointments that save a long, expensive one.
            </p>
          </div>
          <div className={s.consult}>
            {CONSULT.map((c) => (
              <div key={c.title} className={s.consultItem}>
                <h3 className={s.consultTitle}>{c.title}</h3>
                <p className={s.consultLead}>{c.lead}</p>
                <p className={s.consultBody}>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- POLICY */}
        <section id="policy" className={s.sec} aria-labelledby="policy-h">
          <div className={s.secHead}>
            <h2 id="policy-h" className={s.bigHead}>Booking and canceling</h2>
            <p className={s.secNote}>
              The whole policy, so there are no surprises at the desk.
            </p>
          </div>
          <dl className={s.policy}>
            {POLICY.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitInner}>
            <div className={s.visitMain}>
              <h2 id="visit-h" className={s.bigHead}>Visit</h2>
              <p className={s.visitAddr}>
                41 Arden Street
                <br />
                Second floor, above the bakery
              </p>
              <a className={s.visitPhone} href="tel:+15550104477">(555) 010-4477</a>
              <a className={s.visitMail} href="mailto:chair@fringe.example">chair@fringe.example</a>
              <p className={s.visitNote}>
                Step-free access by the lift at the back of the building. Two
                hours free parking at the Arden Street garage with a stamp from
                the desk.
              </p>
            </div>
            <div className={s.visitSide}>
              <h3 className={s.smallHead}>Hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <h3 className={s.smallHead}>Ask for a chair</h3>
              <form className={s.form} action="#">
                <label className={s.field}>
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <label className={s.field}>
                  <span>Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
                <label className={s.field}>
                  <span>Service</span>
                  <select name="service" defaultValue="Cut and finish">
                    <option>Cut and finish</option>
                    <option>Color</option>
                    <option>Treatment</option>
                    <option>Styling</option>
                    <option>Consultation</option>
                  </select>
                </label>
                <label className={s.field}>
                  <span>Level</span>
                  <select name="level" defaultValue="Any">
                    <option>Any</option>
                    <option>Stylist</option>
                    <option>Senior</option>
                    <option>Director</option>
                  </select>
                </label>
                <button type="submit" className={s.button}>Send request</button>
              </form>
              <p className={s.formNote}>We call back within the day to confirm a time.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footMark}>Fringe</p>
        <div className={s.footRow}>
          <ul className={s.footLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <p className={s.footAddr}>41 Arden Street. (555) 010-4477. chair@fringe.example</p>
        </div>
        <div className={s.footFine}>
          <p>A fictional hair salon. Prices, hours and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live in the salon's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
