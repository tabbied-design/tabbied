import { TabbiedPattern } from 'tabbied/react';
import { polkadot } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './spot-stroll-pet-care.module.css';

export const metadata = {
  title: 'Spot & Stroll: Dog walking, drop-in visits and overnight pet sitting',
  description:
    'Spot & Stroll walks dogs and sits pets in Elm Park, Mill Run and the neighborhoods around them. Group and solo walks, drop-in visits, overnight sitting, and a free meet and greet before the first walk.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The polka dots
   are the business's spots: tomato, navy, teal and marigold on a
   transparent ground, so the butter paper shows between them. A giant paw
   print in the hero, a band between the services and the map, and the
   footer's last row. */
const BUTTER = '#fff2d4';
const NAVY = '#20264a';
const TOMATO = '#e4523b';
const TEAL = '#1f9a8a';
const MARIGOLD = '#f2a93b';

const SPOTS = ['transparent', TOMATO, NAVY, TEAL, MARIGOLD, TOMATO];
const BAND = ['transparent', NAVY, TEAL, MARIGOLD, TOMATO, TEAL];
const FOOT = ['transparent', BUTTER, MARIGOLD, TEAL, TOMATO, BUTTER];

const NAV = [
  ['Walk schedule', '#schedule'],
  ['Services', '#services'],
  ['Where we walk', '#area'],
  ['Meet and greet', '#meet'],
  ['Book', '#book'],
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const STATE: Record<string, string> = {
  open: 'Open',
  one: '1 spot',
  full: 'Full',
  none: 'No walk',
};

/* This week's slots: open, one place left, full, or not run that day. */
const SLOTS = [
  { name: 'Early loop', time: '7:00-8:00 am', kind: 'Solo or pairs', days: ['one', 'open', 'full', 'one', 'open', 'none', 'none'] },
  { name: 'Park pack', time: '11:00 am-1:00 pm', kind: 'Group of four', days: ['full', 'full', 'one', 'full', 'open', 'none', 'none'] },
  { name: 'Afternoon sniff', time: '2:00-4:00 pm', kind: 'Solo, 30 or 60 min', days: ['open', 'one', 'open', 'open', 'full', 'open', 'none'] },
  { name: 'Supper drop-in', time: '5:30-7:00 pm', kind: 'Visit, feed and yard', days: ['open', 'open', 'one', 'open', 'one', 'open', 'open'] },
];

const SERVICES = [
  { name: 'Park pack walk', price: '$24', per: 'an hour', note: 'Up to four dogs who already like each other, off to Elm Park and back with a long sniff in the middle.', items: ['Pick-up and drop-off', 'Water and a towel-down', 'A photo and a note after'] },
  { name: 'Solo walk', price: '$22', per: '30 minutes', note: 'One dog, one walker, their own pace. For puppies, seniors and dogs who prefer their own company.', items: ['$34 for a full hour', 'Leash training kept up', 'Ideal after surgery'] },
  { name: 'Drop-in visit', price: '$22', per: 'a visit', note: 'Thirty minutes at your house: food, fresh water, the yard, medicine, and a lap for the cat.', items: ['Cats, rabbits, birds too', 'Mail in, blinds turned', 'Up to three a day'] },
  { name: 'Overnight sitting', price: '$95', per: 'a night', note: 'One of us sleeps at your place from 7 pm to 7 am, so your dog keeps their own bed and their own routine.', items: ['Evening and morning walks', 'Plants watered', 'Second pet $10'] },
];

const AREAS = [
  ['Elm Park', 'Home turf, every slot'],
  ['Mill Run', 'Every slot'],
  ['Larkspur Flats', 'Walks and drop-ins'],
  ['Tanner\'s Bend', 'Walks and drop-ins'],
  ['Hollow Oak', 'Drop-ins and overnights, +$5'],
];

const MEET = [
  ['We come over', 'Thirty minutes at your house, free. We meet the dog, see the leash, the treats and where the key lives.'],
  ['A trial walk', 'Half price, with you watching if you like, so your dog meets the walker before the first real day.'],
  ['Keys and the plan', 'We sign for your key, write down the vet, the quirks and the alarm code, and set the schedule.'],
];

const TRUST = ['Insured and bonded to $1,000,000', 'Pet first aid certified, renewed every year', 'Background checked, every walker', 'GPS map of every walk, sent to your phone'];

export default function SpotStrollPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--butter': '#fff2d4',
        '--navy': '#20264a',
        '--tomato': '#e4523b',
        '--teal': '#1f9a8a',
        '--marigold': '#f2a93b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="butter,navy,tomato,teal,marigold"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDots} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Spot & Stroll</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550196630">(555) 019-6630</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            A paw print as big as the page allows, cut out of the dots. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Dog walking and pet sitting in Elm Park and around</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Good walks for <span>good dogs.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Group walks in the park, solo strolls for the shy ones, drop-in
              visits for cats and overnight sitting when you are away. Every
              new dog starts with a free meet and greet at home.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#meet">Book a free meet and greet</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#schedule">See open slots</a>
            </div>
            <ul className={s.heroTags}>
              <li data-edit="hero.item" data-edit-max="80">Insured and bonded</li>
              <li data-edit="hero.item2" data-edit-max="80">Pet first aid certified</li>
              <li data-edit="hero.item3" data-edit-max="80">GPS-tracked walks</li>
            </ul>
          </div>
          <div className={s.pawWrap}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,1,3,4,2" className={s.paw} aria-hidden="true">
              <TabbiedPattern
                pattern={polkadot}
                palette={SPOTS}
                fit="grid"
                cellSize={72}
                seed="spot-stroll-paw"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p data-edit="hero.pawNote" data-edit-max="240" data-edit-multiline className={s.pawNote}>Walking 46 dogs a week, and a cat named Pudding.</p>
          </div>
        </section>

        {/* -------------------------------------------------------- SCHEDULE */}
        <section id="schedule" className={s.sec} aria-labelledby="schedule-h">
          <div className={s.secHead}>
            <h2 data-edit="schedule.secTitle" data-edit-max="60" id="schedule-h" className={s.secTitle}>This week's walk schedule</h2>
            <p data-edit="schedule.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Regulars keep their slot every week. When a spot opens we offer
              it to the waiting list first, then post it here.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.schedule}>
              <caption data-edit="schedule.caption" className={s.caption}>Week of October 12. Updated every Sunday evening.</caption>
              <thead>
                <tr>
                  <th data-edit="schedule.slotHead" scope="col" className={s.slotHead}>Slot</th>
                  {DAYS.map((d, i) => (
                    <th data-edit={`schedule.heading.${i}`} key={d} scope="col">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SLOTS.map((slot, i) => (
                  <tr key={slot.name}>
                    <th scope="row" className={s.slot}>
                      <span data-edit={`schedule.slotName.${i}`} data-edit-max="60" className={s.slotName}>{slot.name}</span>
                      <span data-edit={`schedule.slotTime.${i}`} data-edit-max="60" className={s.slotTime}>{slot.time}</span>
                      <span data-edit={`schedule.slotKind.${i}`} data-edit-max="60" className={s.slotKind}>{slot.kind}</span>
                    </th>
                    {slot.days.map((v, di) => (
                      <td key={DAYS[di]}>
                        <span data-edit={`schedule.cellDay.${i}.${di}`} data-edit-max="60" className={s.cellDay}>{DAYS[di]}</span>
                        <span data-edit={`schedule.cell.${i}.${di}`} data-edit-max="60" className={`${s.cell} ${s[v]}`}>{STATE[v]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------------------------------------------------------- SERVICES */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>Walks, visits and sleepovers</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Prices are per dog. Holidays add $10 a visit. Ten walks bought
              together come with the eleventh free.
            </p>
          </div>
          <ul className={s.services}>
            {SERVICES.map((sv, i) => (
              <li key={sv.name} className={s.service}>
                <p className={s.price}>
                  <span data-edit={`services.priceNo.${i}`} data-edit-max="60" className={s.priceNo}>{sv.price}</span>
                  <span data-edit={`services.pricePer.${i}`} data-edit-max="60" className={s.pricePer}>{sv.per}</span>
                </p>
                <h3 data-edit={`services.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{sv.name}</h3>
                <p data-edit={`services.serviceNote.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceNote}>{sv.note}</p>
                <ul className={s.serviceItems}>
                  {sv.items.map((it, i2) => (
                    <li data-edit={`services.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,3,4,2,3" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={polkadot}
            palette={BAND}
            fit="grid"
            cellSize={60}
            seed="spot-stroll-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ AREA
            The neighborhood map: streets, the park, the creek, and the
            circle we walk inside. */}
        <section id="area" className={s.sec} aria-labelledby="area-h">
          <div className={s.area}>
            <div className={s.map}>
              <div className={s.creek} aria-hidden="true" />
              <div className={s.park} aria-hidden="true" />
              <div className={s.ring} aria-hidden="true" />
              <p data-edit="area.place" data-edit-max="240" data-edit-multiline className={`${s.place} ${s.pElm}`}>Elm Park</p>
              <p data-edit="area.place2" data-edit-max="240" data-edit-multiline className={`${s.place} ${s.pMill}`}>Mill Run</p>
              <p data-edit="area.place3" data-edit-max="240" data-edit-multiline className={`${s.place} ${s.pLark}`}>Larkspur Flats</p>
              <p data-edit="area.place4" data-edit-max="240" data-edit-multiline className={`${s.place} ${s.pTan}`}>Tanner's Bend</p>
              <p data-edit="area.place5" data-edit-max="240" data-edit-multiline className={`${s.place} ${s.pHol}`}>Hollow Oak</p>
              <p data-edit="area.base" data-edit-max="240" data-edit-multiline className={s.base}>Our base</p>
            </div>
            <div>
              <h2 data-edit="area.secTitle" data-edit-max="60" id="area-h" className={s.secTitle}>Where we walk</h2>
              <p data-edit="area.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                A mile and a half around our base on Juniper Street, so a walker
                is never more than ten minutes from your door.
              </p>
              <dl className={s.areaList}>
                {AREAS.map(([n, w], i) => (
                  <div key={n}>
                    <dt data-edit={`area.term.${i}`} data-edit-max="28">{n}</dt>
                    <dd data-edit={`area.body.${i}`} data-edit-max="200" data-edit-multiline>{w}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ MEET */}
        <section id="meet" className={s.sec} aria-labelledby="meet-h">
          <div className={s.meet}>
            <div className={s.meetHead}>
              <h2 data-edit="meet.meetTitle" data-edit-max="60" id="meet-h" className={s.meetTitle}>First, a free meet and greet</h2>
              <p data-edit="meet.meetLead" data-edit-max="240" data-edit-multiline className={s.meetLead}>
                No dog goes out with a stranger. Before the first walk we come to
                you, and the dog decides.
              </p>
            </div>
            <ol className={s.meetSteps}>
              {MEET.map(([t, d], i) => (
                <li key={t}>
                  <h3 data-edit={`meet.meetStep.${i}`} data-edit-max="40" className={s.meetStep}>{t}</h3>
                  <p data-edit={`meet.meetText.${i}`} data-edit-max="240" data-edit-multiline className={s.meetText}>{d}</p>
                </li>
              ))}
            </ol>
            <ul className={s.trust}>
              {TRUST.map((t, i) => (
                <li data-edit={`meet.item.${i}`} data-edit-max="80" key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.book}>
            <div>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Book a meet and greet</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us about your dog and when you need us. Dana or Theo will
                call back the same day to find a time.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Call or text</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550196630">(555) 019-6630</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:woof@spotandstroll.example">woof@spotandstroll.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Base</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>14 Juniper Street, Elm Park</dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Walks</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Monday to Friday, 7:00 am-7:00 pm</dd>
                </div>
                <div>
                  <dt data-edit="book.term5" data-edit-max="28">Visits</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>Every day, holidays included</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="ss-name">Your name</label>
                <input id="ss-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="ss-phone">Phone</label>
                <input id="ss-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="ss-dog">Dog's name</label>
                <input id="ss-dog" name="dog" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="ss-breed">Breed and age</label>
                <input id="ss-breed" name="breed" type="text" />
              </div>
              <fieldset className={`${s.field} ${s.wide} ${s.fieldset}`}>
                <legend data-edit="book.legend">What you need</legend>
                <div className={s.picks}>
                  {SERVICES.map((sv, i) => (
                    <label key={sv.name} className={s.pick}>
                      <input type="checkbox" name="service" value={sv.name} />
                      <span data-edit={`book.text.${i}`} data-edit-max="60">{sv.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label5" htmlFor="ss-note">Anything we should know (pulls, other dogs, the gate)</label>
                <textarea id="ss-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send it over</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,0,4,3,2,0" className={s.footDots} aria-hidden="true">
          <TabbiedPattern
            pattern={polkadot}
            palette={FOOT}
            fit="grid"
            cellSize={36}
            seed="spot-stroll-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Spot & Stroll</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional dog walking and pet sitting business. The walkers, dogs, neighborhoods, prices and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
