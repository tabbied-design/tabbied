import { TabbiedPattern } from 'tabbied/react';
import { monstera } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './understory-plant-care.module.css';

export const metadata = {
  title: 'Understory Plant Care: Houseplant styling, office plants, repotting and plant-sitting',
  description:
    'Understory chooses, places and looks after houseplants for homes and offices. Home styling, a fortnightly office plant service, repotting, plant-sitting, and a care tag for every plant we leave behind.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Greenhouse
   glass for the ground, the deep green under the canopy, two leaf greens
   and a terracotta pot. The monstera is the jungle in the hero, the canopy
   band and the footer; its leaves are laid on a transparent ground so the
   deep green between them reads as shade. */
const GLASS = '#e8ede0';
const FOREST = '#16332a';
const LEAF = '#2f7a4d';
const LIME = '#93c46e';
const POT = '#c3643f';

const JUNGLE = ['transparent', LIME, LEAF, LIME, LEAF, GLASS];
const CANOPY = ['transparent', LIME, LEAF, LEAF, LIME, POT];
const UNDERSTORY = ['transparent', GLASS, LEAF, LIME, LEAF, LIME];

const NAV = [
  ['Services', '#services'],
  ['Plant tags', '#plants'],
  ['Offices', '#offices'],
  ['First visit', '#first'],
  ['Contact', '#contact'],
];

type Service = { name: string; line: string; when: string; price: string; includes: string };

const SERVICES: Service[] = [
  { name: 'Home styling', line: 'A room that wants green and does not know where to start.', when: 'One 90-minute visit, then delivery', price: '$140, plants and pots at cost', includes: 'A light reading in every room, a plan, delivery, potting and a care tag per plant' },
  { name: 'Office plant service', line: 'Reception, desks and meeting rooms, kept alive for you.', when: 'Every two weeks, before 9 am', price: 'from $85 a visit', includes: 'Watering, pruning, dusting leaves, and any plant that fails replaced free' },
  { name: 'Repotting', line: 'Roots out of the bottom, soil like concrete, a pot it has outgrown.', when: 'At your home, or drop it at the shed', price: '$18 a pot to 30 cm, $45 over', includes: 'Fresh mix for that plant, drainage, and the old soil taken away' },
  { name: 'Plant-sitting', line: 'Away for a week, a month, a summer.', when: 'As often as your plants need', price: '$28 a visit', includes: 'Watering, a photo of every plant each visit, and a key safe if you need one' },
];

type Plant = { latin: string; common: string; light: string; lightLevel: string; water: string; waterLevel: string; pets: string; note: string };

/* The tags we leave on the plants we place most. */
const PLANTS: Plant[] = [
  { latin: 'Monstera deliciosa', common: 'Swiss cheese plant', light: 'Bright, indirect', lightLevel: 'lv3', water: 'When the top 5 cm is dry', waterLevel: 'lv2', pets: 'Not pet safe', note: 'Give it a moss pole and it will climb the room.' },
  { latin: 'Epipremnum aureum', common: 'Pothos', light: 'Low to bright', lightLevel: 'lv1', water: 'When it droops a little', waterLevel: 'lv2', pets: 'Not pet safe', note: 'The plant for a dark bookshelf. Trim it to keep it full.' },
  { latin: 'Zamioculcas zamiifolia', common: 'ZZ plant', light: 'Low to medium', lightLevel: 'lv1', water: 'Every three to four weeks', waterLevel: 'lv1', pets: 'Not pet safe', note: 'Survives offices, holidays and forgetful owners.' },
  { latin: 'Dracaena trifasciata', common: 'Snake plant', light: 'Any, even a corridor', lightLevel: 'lv1', water: 'Monthly, less in winter', waterLevel: 'lv1', pets: 'Not pet safe', note: 'Kill it with kindness, never with neglect.' },
  { latin: 'Ficus lyrata', common: 'Fiddle-leaf fig', light: 'Bright, some sun', lightLevel: 'lv3', water: 'Weekly, the same day', waterLevel: 'lv2', pets: 'Not pet safe', note: 'Hates being moved. Choose its spot once.' },
  { latin: 'Goeppertia orbifolia', common: 'Calathea', light: 'Medium, no sun', lightLevel: 'lv2', water: 'Keep just moist, rainwater', waterLevel: 'lv3', pets: 'Pet safe', note: 'Wants a bathroom, or a humidifier nearby.' },
  { latin: 'Spathiphyllum wallisii', common: 'Peace lily', light: 'Low to medium', lightLevel: 'lv1', water: 'When the leaves sag', waterLevel: 'lv3', pets: 'Not pet safe', note: 'Tells you when it is thirsty, loudly.' },
  { latin: 'Chlorophytum comosum', common: 'Spider plant', light: 'Medium to bright', lightLevel: 'lv2', water: 'Weekly in summer', waterLevel: 'lv2', pets: 'Pet safe', note: 'Makes babies. We will pot them up for free.' },
];

const PLANS = [
  { name: 'Desk', size: 'Up to 20 plants', price: '$85', per: 'a visit, every two weeks', points: ['Watering and feeding', 'Dusting and pruning', 'Free replacements'] },
  { name: 'Floor', size: '20 to 80 plants', price: '$160', per: 'a visit, every two weeks', points: ['Everything in Desk', 'Seasonal rotation of the sad ones', 'A named plant keeper'] },
  { name: 'Building', size: '80 plants and up', price: 'Quoted', per: 'after a walk round', points: ['Everything in Floor', 'Living walls and planters', 'Weekly visits'] },
];

const STEPS = [
  ['We read the light', 'A light meter in every room, at the time of day you are home, and a look at the heating and the drafts.'],
  ['A plan and a price', 'Plants, pots and places drawn on your floor plan, sent within three days. Nothing is bought until you say yes.'],
  ['Delivered and potted', 'We bring the plants, pot them on a tarp, and take every bag and box away with us.'],
  ['A tag on every plant', 'Each one leaves with a care tag like the ones above, and we check back in four weeks for free.'],
];

const HOURS = [
  ['Tuesday to Friday', '9:00-5:00, visits'],
  ['Thursday to Saturday', '10:00-4:00, the shed is open'],
  ['Sunday and Monday', 'Closed'],
];

export default function UnderstoryPlantCarePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--glass': '#e8ede0',
        '--forest': '#16332a',
        '--leaf': '#2f7a4d',
        '--lime': '#93c46e',
        '--pot': '#c3643f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="glass,forest,leaf,lime,pot"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandLeaf} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Understory</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Plant care</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#contact">Book a visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="intro.field" data-edit-roles="transparent,3,2,3,2,0" className={s.jungle} aria-hidden="true">
            <TabbiedPattern
              pattern={monstera}
              palette={JUNGLE}
              fit="grid"
              cellSize={84}
              seed="understory-jungle"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroTag}>
              <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Houseplant styling and care</p>
              <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                The right plant, <em>in the right light.</em>
              </h1>
              <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                We choose, place and look after houseplants for flats, houses
                and offices, and we leave a care tag on every one, so the green
                you pay for is still green next year.
              </p>
              <div className={s.heroActions}>
                <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#contact">Book a styling visit</a>
                <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#plants">Read the plant tags</a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <h2 data-edit="services.title" data-edit-format="emphasis" data-edit-max="60" id="services-h" className={s.secTitle}>Four services, <em>one tag each</em></h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every service comes with the same promise as a plant from the
              shed: if it fails in the first three months, we replace it.
            </p>
          </div>
          <ul className={s.stakes}>
            {SERVICES.map((v, i) => (
              <li key={v.name} className={s.stake}>
                <h3 data-edit={`services.stakeName.${i}`} data-edit-max="40" className={s.stakeName}>{v.name}</h3>
                <p data-edit={`services.stakeLine.${i}`} data-edit-max="240" data-edit-multiline className={s.stakeLine}>{v.line}</p>
                <dl className={s.stakeFacts}>
                  <div className={s.factWhen}>
                    <dt data-edit={`services.term.${i}`} data-edit-max="28">When</dt>
                    <dd data-edit={`services.body.${i}`} data-edit-max="200" data-edit-multiline>{v.when}</dd>
                  </div>
                  <div className={s.factPrice}>
                    <dt data-edit={`services.term2.${i}`} data-edit-max="28">Price</dt>
                    <dd data-edit={`services.body2.${i}`} data-edit-max="200" data-edit-multiline>{v.price}</dd>
                  </div>
                  <div className={s.factIncludes}>
                    <dt data-edit={`services.term3.${i}`} data-edit-max="28">Includes</dt>
                    <dd data-edit={`services.body3.${i}`} data-edit-max="200" data-edit-multiline>{v.includes}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section id="plants" className={s.sec} aria-labelledby="plants-h">
          <div className={s.secHead}>
            <h2 data-edit="plants.secTitle" data-edit-max="60" id="plants-h" className={s.secTitle}>The plant tags</h2>
            <p data-edit="plants.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The eight we place most, with the tag each one goes home with.
              The bars read from one (low) to three (high).
            </p>
          </div>
          <ul className={s.labels}>
            {PLANTS.map((p, i) => (
              <li key={p.latin} className={s.label}>
                <p data-edit={`plants.labelLatin.${i}`} data-edit-max="240" data-edit-multiline className={s.labelLatin}>{p.latin}</p>
                <h3 data-edit={`plants.labelCommon.${i}`} data-edit-max="40" className={s.labelCommon}>{p.common}</h3>
                <dl className={s.care}>
                  <div>
                    <dt data-edit={`plants.careSun.${i}`} data-edit-max="28" className={s.careSun}>Light</dt>
                    <dd>
                      <span className={`${s.meter} ${s[p.lightLevel]}`} aria-hidden="true" />
                      <span data-edit={`plants.text.${i}`} data-edit-max="60">{p.light}</span>
                    </dd>
                  </div>
                  <div>
                    <dt data-edit={`plants.careDrop.${i}`} data-edit-max="28" className={s.careDrop}>Water</dt>
                    <dd>
                      <span className={`${s.meter} ${s[p.waterLevel]}`} aria-hidden="true" />
                      <span data-edit={`plants.text2.${i}`} data-edit-max="60">{p.water}</span>
                    </dd>
                  </div>
                  <div>
                    <dt data-edit={`plants.carePaw.${i}`} data-edit-max="28" className={s.carePaw}>Pets</dt>
                    <dd data-edit={`plants.body.${i}`} data-edit-max="200" data-edit-multiline>{p.pets}</dd>
                  </div>
                </dl>
                <p data-edit={`plants.labelNote.${i}`} data-edit-max="240" data-edit-multiline className={s.labelNote}>{p.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,2,3,4" className={s.canopy} aria-hidden="true">
          <TabbiedPattern
            pattern={monstera}
            palette={CANOPY}
            fit="grid"
            cellSize={66}
            seed="understory-canopy"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="offices" className={s.offices} aria-labelledby="offices-h">
          <div className={s.officeGrid}>
            <div className={s.officeIntro}>
              <h2 data-edit="offices.officeTitle" data-edit-max="60" id="offices-h" className={s.officeTitle}>Plants for the office</h2>
              <p data-edit="offices.officeLead" data-edit-max="240" data-edit-multiline className={s.officeLead}>
                A fortnightly visit before anyone is in. Nothing to sign for a
                year: three months, then a month at a time.
              </p>
            </div>
            <ul className={s.plans}>
              {PLANS.map((p, i) => (
                <li key={p.name} className={s.plan}>
                  <h3 data-edit={`offices.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                  <p data-edit={`offices.planSize.${i}`} data-edit-max="240" data-edit-multiline className={s.planSize}>{p.size}</p>
                  <p data-edit={`offices.planPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.planPrice}>{p.price}</p>
                  <p data-edit={`offices.planPer.${i}`} data-edit-max="240" data-edit-multiline className={s.planPer}>{p.per}</p>
                  <ul className={s.planPoints}>
                    {p.points.map((pt, i2) => (
                      <li data-edit={`offices.item.${i}.${i2}`} data-edit-max="80" key={pt}>{pt}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="first" className={s.sec} aria-labelledby="first-h">
          <div className={s.firstGrid}>
            <div className={s.firstIntro}>
              <h2 data-edit="first.secTitle" data-edit-max="60" id="first-h" className={s.secTitle}>The first visit</h2>
              <p data-edit="first.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Most homes need six to ten plants, not forty. We start with the
                light you have, and choose plants that want it.
              </p>
              <div data-edit-pattern="first.field" data-edit-roles="transparent,0,2,3,2,3" className={s.pot} aria-hidden="true">
                <TabbiedPattern
                  pattern={monstera}
                  palette={UNDERSTORY}
                  fit="grid"
                  cellSize={60}
                  seed="understory-pot"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ol className={s.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t}>
                  <span className={s.stepNo} aria-hidden="true">{i + 1}</span>
                  <h3 data-edit={`first.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                  <p data-edit={`first.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.shed}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>The potting shed</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Bring a sick plant on a Saturday and we will tell you what is
                wrong with it, free, while you wait.
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>Rear of 64 Fernhill Road</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Mossgate, ST 60193. Through the green gate beside the bakery.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550963377">(555) 096-3377</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:grow@understory.example">grow@understory.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <p data-edit="contact.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Book a visit</p>
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="us-name">Name</label>
                <input id="us-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="us-phone">Phone</label>
                <input id="us-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label3" htmlFor="us-email">Email</label>
                <input id="us-email" name="email" type="email" autoComplete="email" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">What you need</legend>
                <div className={s.picks}>
                  <input id="us-style" name="service" type="radio" value="styling" />
                  <label data-edit="contact.label4" htmlFor="us-style">Home styling</label>
                  <input id="us-office" name="service" type="radio" value="office" />
                  <label data-edit="contact.label5" htmlFor="us-office">Office plants</label>
                  <input id="us-repot" name="service" type="radio" value="repotting" />
                  <label data-edit="contact.label6" htmlFor="us-repot">Repotting</label>
                  <input id="us-sit" name="service" type="radio" value="sitting" />
                  <label data-edit="contact.label7" htmlFor="us-sit">Plant-sitting</label>
                </div>
              </fieldset>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend2">The light in the room</legend>
                <div className={s.picks}>
                  <input id="us-bright" name="light" type="radio" value="bright" />
                  <label data-edit="contact.label8" htmlFor="us-bright">Bright</label>
                  <input id="us-medium" name="light" type="radio" value="medium" />
                  <label data-edit="contact.label9" htmlFor="us-medium">Medium</label>
                  <input id="us-low" name="light" type="radio" value="low" />
                  <label data-edit="contact.label10" htmlFor="us-low">Low</label>
                  <input id="us-unsure" name="light" type="radio" value="unsure" />
                  <label data-edit="contact.label11" htmlFor="us-unsure">Not sure</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label12" htmlFor="us-note">Tell us about the space, or the plant in trouble</label>
                <textarea id="us-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,3,2,0" className={s.footLeaves} aria-hidden="true">
          <TabbiedPattern
            pattern={monstera}
            palette={JUNGLE}
            fit="grid"
            cellSize={56}
            seed="understory-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Understory Plant Care</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Houseplant styling, office plants, repotting and plant-sitting. Rear of 64 Fernhill Road.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>
            Understory Plant Care is a fictional business: the names, people,
            prices and address on this page are invented.
          </p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
