import { TabbiedPattern } from 'tabbied/react';
import { recession, softbubbles } from 'tabbied/patterns';
import s from './suds-car-wash.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Suds: Express car wash, Harbor Road and Millbrook',
  description:
    'Suds is a four-minute tunnel car wash with free vacuums at two locations. Three washes from $10, unlimited memberships from $19.99 a month.',
};

/* Site colors. The hero bubbles are paper and blue on the pale plate; the
   membership panel is ink, and its bubbles glow in the accents. */
const PAPER = '#F3F8FC';
const BLUE = '#1E88E5';
const SUN = '#FFCA28';
const PALE = '#DCEAF7';

const FOAM = ['transparent', PAPER, BLUE, PAPER];
const GLOW = ['transparent', BLUE, SUN, PALE, BLUE];
const PUDDLE = ['transparent', BLUE, PALE, BLUE];
const SPRAY = ['transparent', PAPER, BLUE, PAPER, SUN];
const RINSE = ['transparent', BLUE, PALE, SUN];

const NAV = [
  ['Washes', '#washes'],
  ['How it works', '#how'],
  ['Membership', '#membership'],
  ['Extras', '#extras'],
  ['Locations', '#locations'],
  ['FAQ', '#faq'],
];

const FACTS = [
  ['4 min', 'through the tunnel'],
  ['Free', 'vacuums and mat cleaners'],
  ['7-9', 'open every day'],
];

/* Every step the tunnel can run, in the order it runs them. A tier
   includes the first `upTo` of them. */
const STEPS = [
  'Pre-soak and bug prep',
  'Soft-cloth wash',
  'Spot-free rinse',
  'Power dry',
  'Underbody flush',
  'Wheel cleaner',
  'Triple foam polish',
  'Tire shine',
  'Rain repellent',
  'Ceramic sealant',
];

type Tier = {
  id: string;
  name: string;
  price: string;
  time: string;
  line: string;
  upTo: number;
  badge?: string;
};

const TIERS: Tier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '10',
    time: 'About 3 minutes',
    line: 'Clean, rinsed and dried. The Monday-morning wash.',
    upTo: 4,
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    price: '16',
    time: 'About 4 minutes',
    line: 'Adds the underside, the wheels and a foam polish.',
    upTo: 8,
    badge: 'Most picked',
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: '22',
    time: 'About 5 minutes',
    line: 'Everything, plus a sealant that keeps water beading for weeks.',
    upTo: 10,
  },
];

const HOW = [
  {
    no: '1',
    title: 'Pay at the gate',
    body: 'Pick a wash on the screen and tap a card or phone. Members roll straight through: the sticker opens the gate.',
  },
  {
    no: '2',
    title: 'Neutral, hands off',
    body: 'Line your left wheels up with the track, shift to neutral and take your foot off the brake. The belt does the rest.',
  },
  {
    no: '3',
    title: 'Soap, cloth, rinse',
    body: 'Foam first, then soft closed-cell cloth, then high-pressure water on the wheels and a spot-free rinse of filtered water.',
  },
  {
    no: '4',
    title: 'Dry, then vacuum',
    body: 'Ten blowers take most of the water off. Pull into any vacuum bay after: they are free, and so are the towels.',
  },
];

type Plan = {
  name: string;
  price: string;
  note: string;
};

const PLANS: Plan[] = [
  {
    name: 'Basic Unlimited',
    price: '19.99',
    note: 'Pays for itself on the second wash.',
  },
  {
    name: 'Deluxe Unlimited',
    price: '27.99',
    note: 'The one most members choose.',
  },
  {
    name: 'Ultimate Unlimited',
    price: '34.99',
    note: 'Sealant every time, as often as you like.',
  },
];

const MEMBER_TERMS = [
  ['Once a day', 'Every day. One wash per car per calendar day, at either location.'],
  ['Second car', '$10 off each extra car on the same account.'],
  ['No contract', 'Cancel online or at the booth before your renewal date.'],
  ['The sticker', 'A small tag inside the windshield opens the gate. Moving it voids it.'],
];

const EXTRAS = [
  ['Hand towel finish', 'Door jambs, mirrors and glass, by hand', '$5'],
  ['Interior wipe-down', 'Dash, console and door panels', '$12'],
  ['Mat shampoo', 'Carpet mats, all four, dried while you wait', '$8'],
  ['Pet hair removal', 'Seats and cargo area', '$15'],
  ['Headlight restore', 'Both lenses sanded and sealed', '$25'],
  ['Self-serve bay', 'Wand, foam brush and spot-free rinse', '$3 / 4 min'],
];

const FREE = ['Vacuums, 24 bays', 'Mat cleaners', 'Microfiber towels', 'Glass cleaner', 'Air for tires'];

type Place = {
  name: string;
  street: string;
  town: string;
  phone: string;
  hours: string[][];
  facts: string;
};

const PLACES: Place[] = [
  {
    name: 'Harbor Road',
    street: '2140 Harbor Road',
    town: 'Next to the tire shop, north of the bridge',
    phone: '(555) 014-2140',
    hours: [
      ['Monday-Saturday', '7 am-9 pm'],
      ['Sunday', '8 am-8 pm'],
      ['Last car in', '15 min before close'],
    ],
    facts: '120-foot tunnel, 14 vacuum bays, 2 self-serve bays',
  },
  {
    name: 'Millbrook',
    street: '88 Millbrook Parkway',
    town: 'Behind the grocery, entrance on Elm',
    phone: '(555) 014-0088',
    hours: [
      ['Monday-Saturday', '7 am-9 pm'],
      ['Sunday', '8 am-8 pm'],
      ['Last car in', '15 min before close'],
    ],
    facts: '90-foot tunnel, 10 vacuum bays, room for trucks to 7 feet',
  },
];

const FAQ = [
  {
    q: 'Will the tunnel scratch my paint?',
    a: 'We use closed-cell foam cloth, which does not hold grit the way old brushes did, and the whole car is soaked and rinsed before anything touches it. If you ever find damage, tell the attendant before you leave the lot and we will look at it together.',
  },
  {
    q: 'What if it rains the day after?',
    a: 'Deluxe and Ultimate come with a rain check: bring the car back within 48 hours and the same wash is free. Show the receipt or your member sticker.',
  },
  {
    q: 'Can I bring a truck, a roof rack or a bike rack?',
    a: 'Pickups and vans up to 7 feet tall fit at Millbrook, 6 feet 6 at Harbor Road. Factory roof rails are fine; take off bike racks, cargo boxes and aftermarket antennas first.',
  },
  {
    q: 'Is it safe for a convertible soft top?',
    a: 'Yes, with the top up and latched. Skip the Ultimate sealant on fabric; the attendant can switch it off for you.',
  },
  {
    q: 'Do you take cash?',
    a: 'The gate takes cards and phones. The attendant booth takes cash for any wash, and the self-serve bays take coins and cards.',
  },
  {
    q: 'Do you close in bad weather?',
    a: 'We close the tunnel below 20 degrees, when the rinse can freeze on the car. The vacuums stay open. Closures are posted on the sign at each entrance by 6 am.',
  },
];

export default function SudsCarWashPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f3f8fc',
        '--ink': '#0f1e33',
        '--blue': '#1e88e5',
        '--sun': '#ffca28',
        '--gray': '#8795a8',
        '--pale': '#dceaf7',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,blue,sun,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..900&family=Figtree:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">
          Suds
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#membership">
          Join Unlimited
        </a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>
              {label}
            </a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            Copy on the left; on the right the car, foamed, on a pale plate
            of bubbles that grow toward the ground. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Express tunnel wash, two locations</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" className={s.heroTitle} id="hero-h">
              Drive in dirty.
              <br />
              <em>Roll out shining.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Four minutes on the belt, soft cloth and filtered water, then free vacuums for as long as you like. Three
              washes, one price for any car, and an unlimited plan if you wash more than twice a month.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#washes">
                See the washes
              </a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#locations">
                Find a location
              </a>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([v, k], i) => (
                <div key={k}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{v}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.heroPlate}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,0,2,0" className={s.heroField} aria-hidden="true">
              <TabbiedPattern
                pattern={recession}
                palette={FOAM}
                fit="grid"
                cellSize={46}
                seed="suds-hero"
                redrawInterval={8000}
                options={{ frequency: 0.55 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="suds-car-wash-car"
              alt="A small hatchback covered in soap bubbles"
              inks={{
                red: 'var(--blue)',
                blue: 'var(--ink)',
                yellow: 'var(--paper)',
                black: 'var(--ink)',
              }}
              className={s.heroCar}
            />
            <span data-edit="hero.heroTag" data-edit-max="60" className={s.heroTag}>Any car, one price</span>
          </div>
        </section>

        {/* ------------------------------------------------------- SIGNBOARD
            The wash menu as the sign at the gate: three panels stepping up
            in height, each with its picture, price and the steps it runs. */}
        <section id="washes" className={s.washes} aria-labelledby="washes-h">
          <div className={s.secHead}>
            <p data-edit="washes.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01 / The wash menu</p>
            <h2 data-edit="washes.title" data-edit-max="60" id="washes-h">Three washes. Pick at the gate.</h2>
            <p data-edit="washes.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Same price for a hatchback or a minivan. Every wash ends with the free vacuums, towels and mat cleaners.
            </p>
          </div>

          <div className={s.sign}>
            <div className={s.signTop}>
              <span data-edit="washes.signBrand" data-edit-max="60" className={s.signBrand}>Suds Express</span>
              <span data-edit="washes.signSub" data-edit-max="60" className={s.signSub}>Wash menu</span>
              <span data-edit="washes.signOpen" data-edit-max="60" className={s.signOpen}>Open 7 am-9 pm</span>
            </div>
            <ol className={s.tiers}>
              {TIERS.map((t, i) => (
                <li key={t.id} className={`${s.tier} ${s[t.id]}`}>
                  <div className={s.tierCap}>
                    <span className={s.tierNo}>{`0${i + 1}`}</span>
                    {t.badge ? <span data-edit={`washes.tierBadge.${i}`} data-edit-max="60" className={s.tierBadge}>{t.badge}</span> : null}
                    <h3 data-edit={`washes.tierName.${i}`} data-edit-max="40" className={s.tierName}>{t.name}</h3>
                    <p className={s.tierPrice}>
                      <span data-edit={`washes.cur.${i}`} data-edit-max="60" className={s.cur}>$</span>
                      <span data-edit={`washes.amt.${i}`} data-edit-max="60" className={s.amt}>{t.price}</span>
                    </p>
                    <span data-edit={`washes.tierTime.${i}`} data-edit-max="60" className={s.tierTime}>{t.time}</span>
                  </div>
                  <div className={s.tierArt}>
                    {t.id === 'basic' ? (
                      <Artwork
                        slug="suds-car-wash-nozzle"
                        alt="A spray nozzle"
                        inks={{
                          red: 'var(--blue)',
                          blue: 'var(--blue)',
                          black: 'var(--ink)',
                        }}
                        className={s.artNozzle}
                      />
                    ) : null}
                    {t.id === 'deluxe' ? (
                      <Artwork
                        slug="suds-car-wash-bucket"
                        alt="A bucket with a sponge"
                        inks={{
                          red: 'var(--sun)',
                          blue: 'var(--ink)',
                          yellow: 'var(--paper)',
                          black: 'var(--blue)',
                        }}
                        className={s.artBucket}
                      />
                    ) : null}
                    {t.id === 'ultimate' ? (
                      <Artwork
                        slug="suds-car-wash-car"
                        alt="A foamed car"
                        inks={{
                          red: 'var(--ink)',
                          blue: 'var(--pale)',
                          yellow: 'var(--paper)',
                          black: 'var(--ink)',
                        }}
                        className={s.artCar}
                      />
                    ) : null}
                  </div>
                  <p data-edit={`washes.tierLine.${i}`} data-edit-max="240" data-edit-multiline className={s.tierLine}>{t.line}</p>
                  <ul className={s.steps}>
                    {STEPS.map((step, n) => (
                      <li data-edit={`washes.stepOn.${i}.${n}`} data-edit-max="80" key={step} className={n < t.upTo ? s.stepOn : s.stepOff}>
                        {step}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          <div className={s.posts} aria-hidden="true">
            <div className={s.postsFoam} aria-hidden="true">
              <TabbiedPattern
                pattern={recession}
                palette={PUDDLE}
                fit="grid"
                cellSize={24}
                seed="suds-puddle"
                options={{ frequency: 0.7 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span />
            <span />
          </div>
          <p data-edit="washes.signNote" data-edit-max="240" data-edit-multiline className={s.signNote}>
            Prices per wash, tax included. Dually trucks, lifted trucks and anything over 7 feet: ask at the booth.
          </p>
        </section>

        {/* ------------------------------------------------------------- HOW */}
        <section id="how" className={s.how} aria-labelledby="how-h">
          <div className={s.howArt}>
            <div className={s.howDisc} aria-hidden="true">
              <TabbiedPattern
                pattern={recession}
                palette={SPRAY}
                fit="grid"
                cellSize={40}
                seed="suds-spray"
                options={{ frequency: 0.6 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="suds-car-wash-nozzle"
              alt="A spray nozzle, spraying water"
              inks={{
                red: 'var(--ink)',
                blue: 'var(--blue)',
                black: 'var(--sun)',
              }}
              className={s.howNozzle}
            />
          </div>
          <div className={s.howBody}>
            <div className={s.secHead}>
              <p data-edit="how.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02 / How it works</p>
              <h2 data-edit="how.title" data-edit-max="60" id="how-h">First time through the tunnel?</h2>
              <p data-edit="how.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                There is always an attendant at the entrance to wave you onto the track. The belt moves at a walking
                pace.
              </p>
            </div>
            <ol className={s.howList}>
              {HOW.map((h, i) => (
                <li key={h.no}>
                  <span data-edit={`how.howNo.${i}`} data-edit-max="60" className={s.howNo}>{h.no}</span>
                  <h3 data-edit={`how.title2.${i}`} data-edit-max="40">{h.title}</h3>
                  <p data-edit={`how.body.${i}`} data-edit-max="240" data-edit-multiline>{h.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------ MEMBERSHIP
            The one dark panel: bubbles glowing on ink, plans on top. */}
        <section id="membership" className={s.member} aria-labelledby="member-h">
          <div data-edit-pattern="membership.field" data-edit-roles="transparent,2,3,5,2" className={s.memberField} aria-hidden="true">
            <TabbiedPattern
              pattern={softbubbles}
              palette={GLOW}
              fit="grid"
              cellSize={120}
              seed="suds-members"
              redrawInterval={9000}
              options={{ frequency: 0.3 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.memberInner}>
            <div className={s.memberTop}>
              <div className={s.memberHead}>
                <p data-edit="membership.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03 / Unlimited</p>
                <h2 data-edit="membership.title" data-edit-format="emphasis" data-edit-max="60" id="member-h">
                  Wash every day.
                  <br />
                  <em>Pay once a month.</em>
                </h2>
                <p data-edit="membership.memberLede" data-edit-max="240" data-edit-multiline className={s.memberLede}>
                  A sticker on the windshield opens the gate at either location. Wash after the pollen, after the salt,
                  after the drive-in movie. The price stays the same.
                </p>
              </div>
              <Artwork
                slug="suds-car-wash-car"
                alt=""
                inks={{
                  red: 'var(--sun)',
                  blue: 'var(--ink)',
                  yellow: 'var(--paper)',
                  black: 'var(--pale)',
                }}
                className={s.memberCar}
              />
            </div>
            <ul className={s.plans}>
              {PLANS.map((p, i) => (
                <li key={p.name} className={s.plan}>
                  <h3 data-edit={`membership.title.${i}`} data-edit-max="40">{p.name}</h3>
                  <p className={s.planPrice}>
                    <span data-edit={`membership.cur.${i}`} data-edit-max="60" className={s.cur}>$</span>
                    <span data-edit={`membership.amt.${i}`} data-edit-max="60" className={s.amt}>{p.price}</span>
                    <span data-edit={`membership.per.${i}`} data-edit-max="60" className={s.per}>a month</span>
                  </p>
                  <p data-edit={`membership.planNote.${i}`} data-edit-max="240" data-edit-multiline className={s.planNote}>{p.note}</p>
                </li>
              ))}
            </ul>
            <dl className={s.terms}>
              {MEMBER_TERMS.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`membership.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`membership.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
            <div className={s.memberActions}>
              <a data-edit="membership.btnSun" data-edit-max="28" className={s.btnSun} href="#locations">
                Join at the booth
              </a>
              <span data-edit="membership.memberAside" data-edit-max="60" className={s.memberAside}>Or sign up on the gate screen: first month $9.99.</span>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- EXTRAS */}
        <section id="extras" className={s.extras} aria-labelledby="extras-h">
          <div className={s.extrasArt}>
            <div className={s.extrasField} aria-hidden="true">
              <TabbiedPattern
                pattern={softbubbles}
                palette={RINSE}
                fit="grid"
                cellSize={90}
                seed="suds-rinse"
                redrawInterval={11000}
                options={{ frequency: 0.4 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="suds-car-wash-bucket"
              alt="A bucket with a sponge resting in it"
              inks={{
                red: 'var(--blue)',
                blue: 'var(--pale)',
                yellow: 'var(--sun)',
                black: 'var(--ink)',
              }}
              className={s.bigBucket}
            />
          </div>
          <div className={s.extrasBody}>
            <div className={s.secHead}>
              <p data-edit="extras.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04 / Extras and self-serve</p>
              <h2 data-edit="extras.title" data-edit-max="60" id="extras-h">A little more, by hand.</h2>
              <p data-edit="extras.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Add these at the booth after your wash. The detail bay is behind the vacuums; most take ten to twenty
                minutes.
              </p>
            </div>
            <ul className={s.extraList}>
              {EXTRAS.map(([name, what, price], i) => (
                <li key={name}>
                  <span data-edit={`extras.extraName.${i}`} data-edit-max="60" className={s.extraName}>{name}</span>
                  <span data-edit={`extras.extraWhat.${i}`} data-edit-max="60" className={s.extraWhat}>{what}</span>
                  <span data-edit={`extras.extraPrice.${i}`} data-edit-max="60" className={s.extraPrice}>{price}</span>
                </li>
              ))}
            </ul>
            <div className={s.free}>
              <h3 data-edit="extras.freeHead" data-edit-max="40" className={s.freeHead}>Always free</h3>
              <ul className={s.freeList}>
                {FREE.map((f, i) => (
                  <li data-edit={`extras.item.${i}`} data-edit-max="80" key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- LOCATIONS */}
        <section id="locations" className={s.locations} aria-labelledby="locations-h">
          <div className={s.secHead}>
            <p data-edit="locations.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05 / Locations and hours</p>
            <h2 data-edit="locations.title" data-edit-max="60" id="locations-h">Two tunnels, same menu.</h2>
            <p data-edit="locations.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Memberships work at both. Saturday late morning is the busiest hour; weekday evenings after 6 are the
              quietest.
            </p>
          </div>
          <div className={s.places}>
            {PLACES.map((p, i) => (
              <article key={p.name} className={s.place}>
                <h3 data-edit={`place.placeName.${i}`} data-edit-max="40" className={s.placeName}>{p.name}</h3>
                <p data-edit={`place.placeStreet.${i}`} data-edit-max="240" data-edit-multiline className={s.placeStreet}>{p.street}</p>
                <p data-edit={`place.placeTown.${i}`} data-edit-max="240" data-edit-multiline className={s.placeTown}>{p.town}</p>
                <dl className={s.hours}>
                  {p.hours.map(([d, h], i2) => (
                    <div key={d}>
                      <dt data-edit={`place.term.${i}.${i2}`} data-edit-max="28">{d}</dt>
                      <dd data-edit={`place.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit={`place.placeFacts.${i}`} data-edit-max="240" data-edit-multiline className={s.placeFacts}>{p.facts}</p>
                <a data-edit={`place.placePhone.${i}`} data-edit-max="28" className={s.placePhone} href={`tel:${p.phone.replace(/[^0-9]/g, '')}`}>
                  {p.phone}
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.secHead}>
            <p data-edit="faq.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>06 / Questions</p>
            <h2 data-edit="faq.title" data-edit-max="60" id="faq-h">Before you roll in</h2>
          </div>
          <div className={s.faqList}>
            {FAQ.map((f, i) => (
              <details key={f.q} className={s.faqItem}>
                <summary data-edit={`faq.question.${i}`} data-edit-max="80">{f.q}</summary>
                <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footFoam} aria-hidden="true">
          <TabbiedPattern
            pattern={recession}
            palette={PUDDLE}
            fit="grid"
            cellSize={24}
            seed="suds-footer"
            options={{ frequency: 0.6 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footGrid}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Suds</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Express tunnel wash with free vacuums, on Harbor Road and in Millbrook.</p>
          </div>
          <div>
            <h2 data-edit="footer.footHead" data-edit-max="60" className={s.footHead}>Wash</h2>
            <ul className={s.footLinks}>
              <li>
                <a data-edit="footer.washes" data-edit-max="28" href="#washes">The wash menu</a>
              </li>
              <li>
                <a data-edit="footer.membership" data-edit-max="28" href="#membership">Unlimited plans</a>
              </li>
              <li>
                <a data-edit="footer.extras" data-edit-max="28" href="#extras">Extras</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 data-edit="footer.footHead2" data-edit-max="60" className={s.footHead}>Visit</h2>
            <ul className={s.footLinks}>
              <li>
                <a data-edit="footer.locations" data-edit-max="28" href="#locations">Locations and hours</a>
              </li>
              <li>
                <a data-edit="footer.how" data-edit-max="28" href="#how">First time here</a>
              </li>
              <li>
                <a data-edit="footer.faq" data-edit-max="28" href="#faq">Questions</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 data-edit="footer.footHead3" data-edit-max="60" className={s.footHead}>Members</h2>
            <p data-edit="footer.footAddr" data-edit-max="240" data-edit-multiline className={s.footAddr}>help@suds.example</p>
            <p data-edit="footer.footAddr2" data-edit-max="240" data-edit-multiline className={s.footAddr}>(555) 014-2140</p>
          </div>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional car wash. Prices, hours and places are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com" rel="noopener">
              Tabbied
            </a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the page's own colors; the pictures follow the palette too.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
