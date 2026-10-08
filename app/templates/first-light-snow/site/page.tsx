import { TabbiedPattern } from 'tabbied/react';
import { drift } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './first-light-snow.module.css';

export const metadata = {
  title: 'First Light Snow Removal: Seasonal plowing, walks and salt in Hillcrest, Millbrook and Old Town',
  description:
    'First Light plows driveways and clears walks before dawn. Seasonal contracts in three tiers, a storm-day plan you can watch hour by hour, and the streets on each route.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The drift is
   the snow itself: triangles leaning one way and then the other, in plum,
   dawn pink, beacon amber and glacier, laid on a transparent ground so the
   snow between them is the page. It is the drift at the foot of the hero,
   the band before the contracts, the route map and the footer's edge. */
const SNOW = '#f5f7f9';
const PLUM = '#2a2236';
const DAWN = '#ec8a9b';
const AMBER = '#f5b445';
const GLACIER = '#79c0cb';

const DRIFT = ['transparent', PLUM, DAWN, AMBER, GLACIER, DAWN];
const NIGHT = ['transparent', DAWN, AMBER, GLACIER, SNOW, GLACIER];
const ROUTES = ['transparent', GLACIER, DAWN, PLUM, AMBER, GLACIER];

const NAV = [
  ['Storm day', '#storm-day'],
  ['Contracts', '#contracts'],
  ['Streets', '#routes'],
  ['Questions', '#faq'],
  ['Sign up', '#signup'],
];

const WATCH = [
  ['Forecast', '6-9 inches'],
  ['Trucks out', 'At 2 inches, near 11 pm'],
  ['Route A cleared', 'By 6:00 am'],
  ['Walks and steps', 'By 7:30 am'],
];

type Hour = { time: string; title: string; text: string; depth: string; level: string };

const STORM: Hour[] = [
  { time: 'Tue 4:00 pm', title: 'The forecast call', text: 'We read three forecast models and the road weather stations. If it is coming, every customer gets a text with the plan.', depth: '0 in', level: 'd0' },
  { time: 'Tue 9:30 pm', title: 'Pre-treat', text: 'Brine on steep drives and every commercial lot, so the first inch never bonds to the pavement.', depth: '0 in', level: 'd0' },
  { time: 'Wed 1:40 am', title: 'Trucks roll at 2 inches', text: 'Six trucks and two walk crews leave the yard. The routes run in the same order every storm.', depth: '2 in', level: 'd2' },
  { time: 'Wed 6:00 am', title: 'First pass done', text: 'Every driveway on Route A open to the street. Routes B and C by 7:00 and 8:00.', depth: '5 in', level: 'd5' },
  { time: 'Wed 10:00 am', title: 'End-of-storm cleanup', text: 'A second pass for what fell after us, and the ridge the city plow left across the foot of your drive.', depth: '8 in', level: 'd8' },
  { time: 'Wed 11:30 am', title: 'Salt and a photo', text: 'Walks salted with pet-safe melt, and a photo of the cleared drive sent to your phone.', depth: 'Clear', level: 'dClear' },
];

type Plan = { name: string; price: string; per: string; lead: string; items: string[]; pick?: boolean };

const PLANS: Plan[] = [
  {
    name: 'Per storm',
    price: '$55',
    per: 'a push, 2-6 inches',
    lead: 'No contract. Call or text by 8 pm the night before and you are on the route.',
    items: ['$80 a push over 6 inches', 'Driveway and the foot of the drive', 'Served after season customers', 'Pay by card after each storm'],
  },
  {
    name: 'Season drive',
    price: '$640',
    per: 'November 15 to April 1',
    lead: 'Every storm over 2 inches, however many there are. Most of our neighbors pick this one.',
    items: ['Unlimited pushes', 'City plow ridge cleared', 'Drive edges staked in November', 'Storm texts and a photo'],
    pick: true,
  },
  {
    name: 'Season complete',
    price: '$890',
    per: 'November 15 to April 1',
    lead: 'The drive, the walks, the steps and the salt. Nothing to do but wait for the photo.',
    items: ['Everything in Season drive', 'Walks and front steps shoveled', 'Pet-safe ice melt, as needed', 'Mailbox and hydrant dug out'],
  },
];

type Route = { name: string; area: string; by: string; streets: string[] };

const ROUTE_LIST: Route[] = [
  { name: 'Route A', area: 'Hillcrest', by: 'First pass by 6:00 am', streets: ['Alder Court', 'Birch Hollow Road', 'Cedar Ridge Drive', 'Hillcrest Avenue', 'Juniper Lane', 'Larch Way'] },
  { name: 'Route B', area: 'Millbrook', by: 'First pass by 7:00 am', streets: ['Millbrook Road', 'Wheelwright Lane', 'Sawyer Street', 'Grist Court', 'Tannery Hill', 'Flume Avenue'] },
  { name: 'Route C', area: 'Old Town', by: 'First pass by 8:00 am', streets: ['Church Street', 'Market Row', 'Lantern Lane', 'Cooper Street', 'Bell Court', 'Commons Way'] },
];

const FAQ = [
  ['What counts as a storm?', 'Two inches or more on the ground, by the gauge in our yard and the one on Hillcrest Avenue. Under two, season customers can ask for a push and it is still included.'],
  ['Will the plow tear up my lawn?', 'We stake the edges of every season drive in November, before the ground freezes, and the stakes stay until April. Any turf we lift, we repair in spring.'],
  ['The city plow just buried my drive again.', 'Season customers get the end-of-storm cleanup pass for exactly that. Text us a photo if it happens later and we come back the same day.'],
  ['What if I am away for the winter?', 'Plenty of our customers are. We keep the drive open for the mail and for anyone checking on the house, and send the photo either way.'],
];

const HOURS = [
  ['Office line', '7:00-7:00, November to April'],
  ['Storm line', 'Every hour of every storm'],
  ['Summer', 'Email only, we answer in a day'],
];

export default function FirstLightSnowPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--snow': '#f5f7f9',
        '--plum': '#2a2236',
        '--dawn': '#ec8a9b',
        '--amber': '#f5b445',
        '--glacier': '#79c0cb',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="snow,plum,dawn,amber,glacier"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Figtree:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandSun} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>First Light</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Snow removal</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550193344">Storm line (555) 019-3344</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Dawn over a drift: the promise above, the storm watch beside it,
            and the drift itself cut from the pattern along a snowline. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Driveways, walks and salt, Hillcrest to Old Town</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Plowed out before <em>first light.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Sign up once in the fall and stop watching the forecast. When it
              snows two inches we are already out, and by the time you make
              coffee the drive is open to the street.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#signup">Sign up for the season</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#routes">Is my street served?</a>
            </div>
          </div>

          <aside className={s.watch} aria-labelledby="watch-h">
            <p data-edit="watch.watchLabel" data-edit-max="240" data-edit-multiline className={s.watchLabel}>Storm watch</p>
            <h2 data-edit="watch.watchTitle" data-edit-max="60" id="watch-h" className={s.watchTitle}>Thursday night into Friday</h2>
            <dl className={s.watchList}>
              {WATCH.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`watch.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`watch.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="watch.watchNote" data-edit-max="240" data-edit-multiline className={s.watchNote}>Season customers get a text when the trucks leave the yard.</p>
          </aside>

          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,2" className={s.drift} aria-hidden="true">
            <TabbiedPattern
              pattern={drift}
              palette={DRIFT}
              fit="grid"
              cellSize={58}
              seed="first-light-hero"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ------------------------------------------------------- STORM DAY
            The night shift, hour by hour, with the snow on the ground
            measured at each step. */}
        <section id="storm-day" className={s.night} aria-labelledby="storm-h">
          <div className={s.nightInner}>
            <div className={s.nightHead}>
              <h2 data-edit="stormDay.nightTitle" data-edit-max="60" id="storm-h" className={s.nightTitle}>A storm day, hour by hour</h2>
              <p data-edit="stormDay.nightLead" data-edit-max="240" data-edit-multiline className={s.nightLead}>
                The last storm of February, as it happened on Route A: eight
                inches between midnight and ten, and every drive open by six.
              </p>
            </div>
            <ol className={s.timeline}>
              {STORM.map((h, i) => (
                <li key={h.title} className={s.hour}>
                  <time data-edit={`stormDay.hourTime.${i}`} className={s.hourTime}>{h.time}</time>
                  <span className={`${s.gauge} ${s[h.level]}`} aria-hidden="true" />
                  <span data-edit={`stormDay.hourDepth.${i}`} data-edit-max="60" className={s.hourDepth}>{h.depth}</span>
                  <h3 data-edit={`stormDay.hourTitle.${i}`} data-edit-max="40" className={s.hourTitle}>{h.title}</h3>
                  <p data-edit={`stormDay.hourText.${i}`} data-edit-max="240" data-edit-multiline className={s.hourText}>{h.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,4,0,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={drift}
            palette={NIGHT}
            fit="grid"
            cellSize={46}
            seed="first-light-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------- CONTRACTS */}
        <section id="contracts" className={s.sec} aria-labelledby="contracts-h">
          <div className={s.secHead}>
            <h2 data-edit="contracts.secTitle" data-edit-max="60" id="contracts-h" className={s.secTitle}>Three ways to never shovel</h2>
            <p data-edit="contracts.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices are for a two-car driveway up to 60 feet. Longer and
              rural drives are quoted after a look, before the first snow.
              Season plans are paid in two halves, November and January.
            </p>
          </div>
          <ul className={s.plans}>
            {PLANS.map((p, i) => (
              <li key={p.name} className={p.pick ? `${s.plan} ${s.planPick}` : s.plan}>
                <h3 data-edit={`contracts.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                <p data-edit={`contracts.planPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.planPrice}>{p.price}</p>
                <p data-edit={`contracts.planPer.${i}`} data-edit-max="240" data-edit-multiline className={s.planPer}>{p.per}</p>
                <p data-edit={`contracts.planLead.${i}`} data-edit-max="240" data-edit-multiline className={s.planLead}>{p.lead}</p>
                <ul className={s.planItems}>
                  {p.items.map((item, i2) => (
                    <li data-edit={`contracts.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
                <a data-edit={`contracts.planLink.${i}`} data-edit-max="28" className={s.planLink} href="#signup">Choose this plan</a>
              </li>
            ))}
          </ul>
          <p data-edit="contracts.commercial" data-edit-max="240" data-edit-multiline className={s.commercial}>
            Shops, churches and small lots: commercial plowing with pre-treat and
            overnight monitoring, quoted per lot. Ask for Dana on the office line.
          </p>
        </section>

        {/* ---------------------------------------------------------- ROUTES */}
        <section id="routes" className={s.sec} aria-labelledby="routes-h">
          <div className={s.routesGrid}>
            <div data-edit-pattern="routes.field" data-edit-roles="transparent,4,2,1,3,4" className={s.routesMap} aria-hidden="true">
              <TabbiedPattern
                pattern={drift}
                palette={ROUTES}
                fit="grid"
                cellSize={40}
                seed="first-light-routes"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.routesBody}>
              <h2 data-edit="routes.secTitle" data-edit-max="60" id="routes-h" className={s.secTitle}>The streets we serve</h2>
              <p data-edit="routes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Three routes, run in the same order every storm, so a street is
                cleared at about the same hour each time. Not listed? We add a
                street when four neighbors on it sign up.
              </p>
              <div className={s.routes}>
                {ROUTE_LIST.map((r, i) => (
                  <div key={r.name} className={s.route}>
                    <h3 data-edit={`routes.routeName.${i}`} data-edit-max="40" className={s.routeName}>{r.name}</h3>
                    <p data-edit={`routes.routeArea.${i}`} data-edit-max="240" data-edit-multiline className={s.routeArea}>{r.area}</p>
                    <p data-edit={`routes.routeBy.${i}`} data-edit-max="240" data-edit-multiline className={s.routeBy}>{r.by}</p>
                    <ul className={s.streets}>
                      {r.streets.map((street, i2) => (
                        <li data-edit={`routes.item.${i}.${i2}`} data-edit-max="80" key={street}>{street}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <h2 data-edit="faq.secTitle" data-edit-max="60" id="faq-h" className={s.secTitle}>Questions from the end of the drive</h2>
            <p data-edit="faq.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The four we hear most in November. Anything else, the office line
              is answered by the people who drive the trucks.
            </p>
          </div>
          <dl className={s.faq}>
            {FAQ.map(([q, a], i) => (
              <div key={q} className={s.faqItem}>
                <dt data-edit={`faq.faqQ.${i}`} data-edit-max="28" className={s.faqQ}>{q}</dt>
                <dd data-edit={`faq.faqA.${i}`} data-edit-max="200" data-edit-multiline className={s.faqA}>{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------------- SIGNUP */}
        <section id="signup" className={s.signup} aria-labelledby="signup-h">
          <div className={s.signupInner}>
            <div className={s.signupText}>
              <h2 data-edit="signup.secTitle" data-edit-max="60" id="signup-h" className={s.secTitle}>Sign up before the first flake</h2>
              <p data-edit="signup.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Season spots on each route are limited by how many drives a
                truck can clear by dawn. Routes A and B filled by mid-November
                last year.
              </p>
              <dl className={s.contactList}>
                <div>
                  <dt data-edit="signup.term" data-edit-max="28">Yard and office</dt>
                  <dd data-edit="signup.body" data-edit-max="200" data-edit-multiline>88 Saltbarn Lane, Millbrook</dd>
                </div>
                <div>
                  <dt data-edit="signup.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="signup.link" data-edit-max="28" href="tel:+15550193344">(555) 019-3344</a>
                  </dd>
                </div>
                <div className={s.contactWide}>
                  <dt data-edit="signup.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="signup.link2" data-edit-max="28" href="mailto:dispatch@firstlightsnow.example">dispatch@firstlightsnow.example</a>
                  </dd>
                </div>
                {HOURS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`signup.term4.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`signup.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="signup.label" htmlFor="fl-name">Name</label>
                <input id="fl-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="signup.label2" htmlFor="fl-phone">Mobile, for storm texts</label>
                <input id="fl-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="signup.label3" htmlFor="fl-address">Street address</label>
                <input id="fl-address" name="address" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="signup.label4" htmlFor="fl-plan">Plan</label>
                <select id="fl-plan" name="plan" defaultValue="season-drive">
                  <option value="per-storm">Per storm</option>
                  <option value="season-drive">Season drive</option>
                  <option value="season-complete">Season complete</option>
                  <option value="commercial">Commercial lot</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="signup.label5" htmlFor="fl-drive">Driveway</label>
                <select id="fl-drive" name="drive" defaultValue="double">
                  <option value="single">One car wide</option>
                  <option value="double">Two cars wide</option>
                  <option value="long">Longer than 60 feet</option>
                  <option value="steep">Steep or shared</option>
                </select>
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="signup.label6" htmlFor="fl-note">Anything we should know?</label>
                <textarea id="fl-note" name="note" rows={3} />
              </div>
              <button data-edit="signup.submit" data-edit-max="24" className={s.submit} type="submit">Hold my spot</button>
              <p data-edit="signup.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>No payment until November 15. We confirm your route by text.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,3,4,2" className={s.footDrift} aria-hidden="true">
          <TabbiedPattern
            pattern={drift}
            palette={DRIFT}
            fit="grid"
            cellSize={34}
            seed="first-light-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>First Light Snow Removal</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional business: the names, routes, streets, prices and address
            are invented.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
