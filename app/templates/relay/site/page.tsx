import { TabbiedPattern } from 'tabbied/react';
import { quoit, spinningrings } from 'tabbied/patterns';
import s from './relay.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Relay: Online booking for small businesses',
  description:
    'Relay gives an appointment business a booking page, reminders that cut no-shows and one calendar for the whole team. Plans from $12 a month, 14 days free.',
};

/* Product colors. Both fields keep `transparent` as their ground: the rings
   sit on the pale plate behind the calendar, the pills on the indigo panel
   at the end. */
const PAPER = '#FCFCFE';
const INDIGO = '#4F46E5';
const PEACH = '#FF9B71';
const PALE = '#EEF0FA';

const RINGS = ['transparent', INDIGO];
const PILLS = ['transparent', PEACH, PALE, PAPER];

const NAV = [
  ['Product', '#features'],
  ['How it works', '#how'],
  ['Pricing', '#pricing'],
  ['Integrations', '#integrations'],
  ['Customers', '#customers'],
  ['FAQ', '#faq'],
];

/* The calendar in the hero, drawn in markup. Rows are half hours from
   9:00; `at` is the starting row and `len` the number of rows. */
const HOURS = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

const STAFF = ['Ana', 'Ben', 'Cleo'];

type Slot = {
  col: number;
  at: number;
  len: number;
  what: string;
  who: string;
  kind: 'booked' | 'fresh' | 'open' | 'break';
};

const SLOTS: Slot[] = [
  { col: 1, at: 1, len: 2, what: 'Cut and finish', who: 'Jo Park', kind: 'booked' },
  { col: 1, at: 3, len: 3, what: 'Color, full head', who: 'Rina Osei', kind: 'booked' },
  { col: 1, at: 7, len: 1, what: 'Lunch', who: '', kind: 'break' },
  { col: 1, at: 9, len: 2, what: 'Open', who: '13:00', kind: 'open' },
  { col: 2, at: 1, len: 1, what: 'Open', who: '9:00', kind: 'open' },
  { col: 2, at: 2, len: 2, what: 'Beard trim', who: 'Tom Hale', kind: 'booked' },
  { col: 2, at: 5, len: 2, what: 'Cut', who: 'Maya Reyes', kind: 'fresh' },
  { col: 2, at: 8, len: 1, what: 'Lunch', who: '', kind: 'break' },
  { col: 2, at: 9, len: 3, what: 'Cut and color', who: 'Lee Chung', kind: 'booked' },
  { col: 3, at: 1, len: 3, what: 'Balayage', who: 'Sofia Ruiz', kind: 'booked' },
  { col: 3, at: 5, len: 1, what: 'Open', who: '11:00', kind: 'open' },
  { col: 3, at: 6, len: 1, what: 'Lunch', who: '', kind: 'break' },
  { col: 3, at: 8, len: 2, what: 'Kids cut', who: 'Eli Brook', kind: 'booked' },
  { col: 3, at: 10, len: 2, what: 'Open', who: '13:30', kind: 'open' },
];

const TYPES = [
  'Salons and barbers',
  'Physio and massage',
  'Tutors and coaches',
  'Personal trainers',
  'Pet groomers',
  'Photographers',
  'Driving instructors',
  'Repair shops',
];

type Feature = {
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    title: 'A booking page that is yours',
    body: 'Your services, prices and real availability on one page. Share the link, put it in your bio, or drop it into your own website with one line.',
  },
  {
    title: 'Reminders that cut no-shows',
    body: 'A text and an email 48 hours and 2 hours before, each with a one-tap reschedule. Our customers see 62% fewer no-shows in the first three months.',
  },
  {
    title: 'Deposits and card on file',
    body: 'Take a deposit when a slot is booked, or keep a card on file for late cancellations. Your policy is shown in plain words before anyone pays.',
  },
  {
    title: 'One calendar for the team',
    body: 'Every person with their own hours, breaks and services. Clients choose someone by name or take the first free chair.',
  },
  {
    title: 'Two-way calendar sync',
    body: 'A dentist appointment in your own calendar blocks the time in Relay, and every Relay booking shows up on your phone.',
  },
  {
    title: 'A waitlist that fills gaps',
    body: 'When someone cancels, the waitlist gets a text and the first to tap gets the slot. You find out when it is already filled.',
  },
];

const STATS = [
  ['4,800', 'businesses booking with Relay'],
  ['1.9M', 'appointments made last year'],
  ['62%', 'fewer no-shows, on average'],
  ['30 sec', 'for a client to book'],
];

const STEPS = [
  ['1', 'Add your services and hours', 'Name, length and price for each service, the hours each person works, and your cancellation policy. About fifteen minutes.'],
  ['2', 'Share your booking link', 'relay.example/your-name goes in your bio, your email signature and on a card by the till. Or embed the page on your own site.'],
  ['3', 'Get booked, reminded and paid', 'Bookings land in your calendar, reminders go out on their own, and deposits are paid into your account the next working day.'],
];

type Plan = {
  name: string;
  price: string;
  per: string;
  blurb: string;
  items: string[];
  tag: string;
  featured: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Solo',
    price: '$12',
    per: 'a month',
    blurb: 'For one person with one diary.',
    items: [
      'One calendar',
      'Unlimited bookings',
      'Your booking page',
      'Email reminders',
      '100 text reminders a month',
    ],
    tag: '',
    featured: false,
  },
  {
    name: 'Team',
    price: '$29',
    per: 'a month',
    blurb: 'For a shop with a few chairs or rooms.',
    items: [
      'Up to 6 people',
      '500 text reminders a month',
      'Deposits and card on file',
      'Waitlist and two-way sync',
      'Intake forms',
      'Free move from another system',
    ],
    tag: 'Most chosen',
    featured: true,
  },
  {
    name: 'Studio',
    price: '$59',
    per: 'a month',
    blurb: 'For a busy place, or more than one.',
    items: [
      'Up to 20 people',
      'Up to 3 locations',
      '2,000 text reminders a month',
      'Reports and exports',
      'Your own domain',
      'Phone support',
    ],
    tag: '',
    featured: false,
  },
];

type Group = {
  name: string;
  items: string[];
};

const INTEGRATIONS: Group[] = [
  { name: 'Calendars', items: ['Any calendar that reads iCal', 'CalDAV servers', 'Outlook and Exchange', 'Phone calendars'] },
  { name: 'Payments', items: ['Paylane', 'Tillpoint', 'CardNest', 'Bank transfer on invoice'] },
  { name: 'Your website', items: ['Embed code for any site', 'A button for social profiles', 'Site builders by plugin', 'A plain link, always'] },
  { name: 'Books and records', items: ['Tidy Ledger', 'Sumwise', 'CSV export, any day', 'Open API with webhooks'] },
];

type Story = {
  quote: string;
  name: string;
  biz: string;
  result: string;
};

const STORIES: Story[] = [
  {
    quote: 'I used to spend my lunch break answering messages that all said "any chance of Thursday?". Now they just look, and book.',
    name: 'Dana Whitfield',
    biz: 'Fold Hair, three chairs',
    result: 'Messages about times down by about 80%',
  },
  {
    quote: 'The deposit did it. People who pay ten dollars to hold a slot turn up for it. I stopped double-booking to cover no-shows.',
    name: 'Marcus Oyelaran',
    biz: 'Oyelaran Physio',
    result: 'No-shows from 9 a month to 2',
  },
  {
    quote: 'Moving over took one afternoon. They imported three years of clients and every future appointment, and nothing went missing.',
    name: 'Grace Lindholm',
    biz: 'Paws and Suds grooming',
    result: 'Switched from paper in a day',
  },
];

type Faq = {
  q: string;
  a: string;
};

const FAQ: Faq[] = [
  {
    q: 'Do my clients need an account to book?',
    a: 'No. They choose a service and a time, give a name, a phone number and an email, and they are booked. Returning clients are recognized by their number, so they do not type it all again.',
  },
  {
    q: 'What happens when someone cancels late?',
    a: 'Whatever your policy says. You can keep the deposit, charge a set fee to the card on file, or let it go. Relay shows the policy before anyone books and never charges a card without it.',
  },
  {
    q: 'Do text reminders cost extra?',
    a: 'Each plan includes a monthly allowance. Past it, texts are 4 cents each in the US and Canada and are shown on your bill line by line. Email reminders are always free.',
  },
  {
    q: 'Can I move from another booking system?',
    a: 'Yes. Upload your clients and future appointments as a spreadsheet, or on Team and Studio send us an export and we move it for you, usually within two working days.',
  },
  {
    q: 'Is there a contract?',
    a: 'No. Plans are monthly and you can cancel from the settings page. Pay yearly and you get two months free; if you cancel a yearly plan, the unused months are refunded.',
  },
  {
    q: 'Where is my data kept?',
    a: 'In data centers in the US or the EU, chosen when you sign up. Your clients belong to you: export them any day as a spreadsheet, and we delete everything 30 days after you leave.',
  },
];

type FootColumn = {
  head: string;
  links: [string, string][];
};

const FOOT: FootColumn[] = [
  { head: 'Product', links: [['Features', '#features'], ['Pricing', '#pricing'], ['Integrations', '#integrations'], ['What is new', '#top']] },
  { head: 'Customers', links: [['Stories', '#customers'], ['Salons and barbers', '#customers'], ['Clinics', '#customers'], ['Tutors', '#customers']] },
  { head: 'Help', links: [['Questions', '#faq'], ['Moving to Relay', '#faq'], ['Status', '#top'], ['Contact', '#start']] },
];

export default function RelayPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#fcfcfe',
        '--ink': '#161a33',
        '--indigo': '#4f46e5',
        '--peach': '#ff9b71',
        '--gray': '#7c8094',
        '--pale': '#eef0fa',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,indigo,peach,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400..700&family=Figtree:ital,wght@0,400..700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandWord" data-edit-max="60" className={s.brandWord}>Relay</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className={s.barActions}>
          <a data-edit="bar.login" data-edit-max="28" className={s.login} href="#top">Log in</a>
          <a data-edit="bar.btnSmall" data-edit-max="28" className={s.btnSmall} href="#start">Start free</a>
        </div>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
          <a data-edit="bar.top" data-edit-max="28" href="#top">Log in</a>
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The promise on the left, the product on the right: a day in the
            calendar, drawn in markup on a plate of rings. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p className={s.badge}>
              <span data-edit="hero.badgeTag" data-edit-max="60" className={s.badgeTag}>New</span>
              <span data-edit="hero.text" data-edit-max="60">Deposits for no-shows, on every plan</span>
            </p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Let clients book themselves.
              <br />
              <em>Keep your evenings.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Relay gives your business a booking page, reminders that cut
              no-shows and one calendar for the whole team. Set it up in an
              afternoon; your clients book in thirty seconds.
            </p>
            <div className={s.actions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#start">Start free for 14 days</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#how">See how it works</a>
            </div>
            <p data-edit="hero.heroNote" data-edit-max="240" data-edit-multiline className={s.heroNote}>No card needed. From $12 a month after that.</p>
          </div>

          <div className={s.stage}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2" className={s.stageField} aria-hidden="true">
              <TabbiedPattern
                pattern={spinningrings}
                palette={RINGS}
                fit="grid"
                cellSize={56}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>

            <div className={s.app} role="img" aria-label="The Relay calendar for Tuesday, with three people's bookings, open slots and a new booking">
              <div className={s.appTop}>
                <span data-edit="hero.appDate" data-edit-max="60" className={s.appDate}>Tuesday 14 October</span>
                <span data-edit="hero.appToggle" data-edit-max="60" className={s.appToggle}>Day</span>
                <span data-edit="hero.appToggleOn" data-edit-max="60" className={s.appToggleOn}>Team</span>
              </div>
              <div className={s.cal}>
                <span className={s.calCorner} />
                {STAFF.map((name, i) => (
                  <span data-edit={`hero.calHead.${i}`} data-edit-max="60" key={name} className={s.calHead} style={{ gridColumn: i + 2 }}>{name}</span>
                ))}
                {HOURS.map((h, i) => (
                  <span data-edit={`hero.calHour.${i}`} data-edit-max="60" key={h} className={s.calHour} style={{ gridRow: `${i * 2 + 2} / span 2` }}>{h}</span>
                ))}
                {SLOTS.map((sl, i) => (
                  <span
                    key={`${sl.col}-${sl.at}`}
                    className={s[sl.kind]}
                    style={{ gridColumn: sl.col + 1, gridRow: `${sl.at + 1} / span ${sl.len}` }}>
                    <span data-edit={`hero.slotWhat.${i}`} data-edit-max="60" className={s.slotWhat}>{sl.what}</span>
                    <span data-edit={`hero.slotWho.${i}`} data-edit-max="60" className={s.slotWho}>{sl.who}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className={s.toast} aria-hidden="true">
              <span className={s.toastDot} />
              <span data-edit="hero.toastHead" data-edit-max="60" className={s.toastHead}>New booking, just now</span>
              <span data-edit="hero.toastBody" data-edit-max="60" className={s.toastBody}>Maya Reyes, Cut with Ben, 11:00. $10 deposit paid.</span>
            </div>

            <div className={s.chip} aria-hidden="true">
              <span data-edit="hero.chipNum" data-edit-max="60" className={s.chipNum}>2</span>
              <span data-edit="hero.chipText" data-edit-max="60" className={s.chipText}>no-shows this month, down from 9</span>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- TYPES */}
        <section className={s.types} aria-labelledby="types-h">
          <h2 data-edit="types.typesHead" data-edit-max="60" id="types-h" className={s.typesHead}>Built for businesses that run on appointments</h2>
          <ul className={s.typeList}>
            {TYPES.map((t, i) => (
              <li data-edit={`types.item.${i}`} data-edit-max="80" key={t}>{t}</li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------- FEATURES */}
        <section id="features" className={s.sec} aria-labelledby="features-h">
          <div className={s.secHead}>
            <p data-edit="features.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Product</p>
            <h2 data-edit="features.title" data-edit-max="60" id="features-h">Everything between &quot;can I book?&quot; and &quot;see you Tuesday&quot;</h2>
          </div>
          <ul className={s.featureGrid}>
            {FEATURES.map((f, i) => (
              <li key={f.title} className={s.feature}>
                <span className={s.featureNo}>{String(i + 1).padStart(2, '0')}</span>
                <h3 data-edit={`features.title2.${i}`} data-edit-max="40">{f.title}</h3>
                <p data-edit={`features.body.${i}`} data-edit-max="240" data-edit-multiline>{f.body}</p>
              </li>
            ))}
          </ul>
          <dl className={s.stats}>
            {STATS.map(([v, k], i) => (
              <div key={k}>
                <dt data-edit={`features.term.${i}`} data-edit-max="28">{v}</dt>
                <dd data-edit={`features.body2.${i}`} data-edit-max="200" data-edit-multiline>{k}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------- HOW */}
        <section id="how" className={s.how} aria-labelledby="how-h">
          <div className={s.howInner}>
            <div className={s.secHead}>
              <p data-edit="how.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>How it works</p>
              <h2 data-edit="how.title" data-edit-max="60" id="how-h">Three steps, and the third one repeats itself</h2>
            </div>
            <ol className={s.steps}>
              {STEPS.map(([n, title, body], i) => (
                <li key={n}>
                  <span data-edit={`how.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{n}</span>
                  <h3 data-edit={`how.title2.${i}`} data-edit-max="40">{title}</h3>
                  <p data-edit={`how.body.${i}`} data-edit-max="240" data-edit-multiline>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- PRICING */}
        <section id="pricing" className={s.sec} aria-labelledby="pricing-h">
          <div className={s.secHead}>
            <p data-edit="pricing.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Pricing</p>
            <h2 data-edit="pricing.title" data-edit-max="60" id="pricing-h">Three plans, every one with 14 days free</h2>
            <p data-edit="pricing.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Prices are per business, not per person. Pay yearly and get two
              months free.
            </p>
          </div>
          <div className={s.plans}>
            {PLANS.map((p, i) => (
              <article key={p.name} className={p.featured ? s.planFeatured : s.plan}>
                <div className={s.planTop}>
                  <h3 data-edit={`planFeatured.title.${i}`} data-edit-max="40">{p.name}</h3>
                  <span data-edit={`planFeatured.planTag.${i}`} data-edit-max="60" className={s.planTag}>{p.tag}</span>
                </div>
                <p className={s.planPrice}>
                  <span data-edit={`planFeatured.planAmount.${i}`} data-edit-max="60" className={s.planAmount}>{p.price}</span>
                  <span data-edit={`planFeatured.planPer.${i}`} data-edit-max="60" className={s.planPer}>{p.per}</span>
                </p>
                <p data-edit={`planFeatured.planBlurb.${i}`} data-edit-max="240" data-edit-multiline className={s.planBlurb}>{p.blurb}</p>
                <ul className={s.planList}>
                  {p.items.map((it, i2) => (
                    <li data-edit={`planFeatured.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
                <a data-edit={`planFeatured.btn.${i}`} data-edit-max="28" className={p.featured ? s.btn : s.btnGhost} href="#start">Start free</a>
              </article>
            ))}
          </div>
          <p data-edit="pricing.planNote" data-edit-max="240" data-edit-multiline className={s.planNote}>
            Deposits are paid out by your payment provider at its usual rate;
            Relay adds nothing on top. Prices exclude sales tax.
          </p>
        </section>

        {/* ---------------------------------------------------- INTEGRATIONS */}
        <section id="integrations" className={s.sec} aria-labelledby="integrations-h">
          <div className={s.secHead}>
            <p data-edit="integrations.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Integrations</p>
            <h2 data-edit="integrations.title" data-edit-max="60" id="integrations-h">Works with the tools you already use</h2>
            <p data-edit="integrations.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Connections are set up from the settings page in a minute each,
              and every plan includes all of them.
            </p>
          </div>
          <div className={s.intGrid}>
            {INTEGRATIONS.map((g, i) => (
              <div key={g.name} className={s.intCol}>
                <h3 data-edit={`integrations.title2.${i}`} data-edit-max="40">{g.name}</h3>
                <ul>
                  {g.items.map((it, i2) => (
                    <li data-edit={`integrations.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- CUSTOMERS */}
        <section id="customers" className={s.sec} aria-labelledby="customers-h">
          <div className={s.secHead}>
            <p data-edit="customers.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Customers</p>
            <h2 data-edit="customers.title" data-edit-max="60" id="customers-h">Small places, fewer empty chairs</h2>
          </div>
          <div className={s.stories}>
            {STORIES.map((st, i) => (
              <figure key={st.name} className={s.story}>
                <p data-edit={`customers.storyResult.${i}`} data-edit-max="240" data-edit-multiline className={s.storyResult}>{st.result}</p>
                <blockquote>
                  <p data-edit={`customers.body.${i}`} data-edit-max="240" data-edit-multiline>{st.quote}</p>
                </blockquote>
                <figcaption>
                  <cite data-edit={`customers.attribution.${i}`} data-edit-max="48">{st.name}</cite>
                  <span data-edit={`customers.text.${i}`} data-edit-max="60">{st.biz}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.faqWrap}>
            <div className={s.secHead}>
              <p data-edit="faq.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Questions</p>
              <h2 data-edit="faq.title" data-edit-max="60" id="faq-h">Asked before signing up</h2>
              <p data-edit="faq.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>Anything else goes to help@relay.example, answered by a person within a working day.</p>
            </div>
            <div className={s.faqList}>
              {FAQ.map((f, i) => (
                <details key={f.q} className={s.faqItem}>
                  <summary data-edit={`faq.question.${i}`} data-edit-max="80">{f.q}</summary>
                  <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- START */}
        <section id="start" className={s.start} aria-labelledby="start-h">
          <div className={s.startPanel}>
            <div data-edit-pattern="start.field" data-edit-roles="transparent,3,5,0" className={s.startField} aria-hidden="true">
              <TabbiedPattern
                pattern={quoit}
                palette={PILLS}
                options={{ frequency: 0.45 }}
                fit="grid"
                cellSize={64}
                seed="relay-start"
                redrawInterval={8800}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.startCopy}>
              <h2 data-edit="start.title" data-edit-max="60" id="start-h">Your booking page could be live by lunch</h2>
              <p data-edit="start.body" data-edit-max="240" data-edit-multiline>Fourteen days free on any plan. No card, no call with sales.</p>
              <form className={s.startForm} action="#">
                <label data-edit="start.srOnly" className={s.srOnly} htmlFor="relay-email">Work email</label>
                <input id="relay-email" name="email" type="email" placeholder="you@yourbusiness.example" autoComplete="email" />
                <button data-edit="start.btnLight" data-edit-max="24" type="submit" className={s.btnLight}>Start free</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Relay</p>
            <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Online booking for businesses that run on appointments.</p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
              Relay Software Inc.
              <br />
              210 Foundry Row, Suite 5
              <br />
              help@relay.example
            </p>
          </div>
          {FOOT.map((col, i) => (
            <div key={col.head}>
              <h2 data-edit={`footer.footHead.${i}`} data-edit-max="60" className={s.footHead}>{col.head}</h2>
              <ul className={s.footLinks}>
                {col.links.map(([label, href], i2) => (
                  <li key={label}>
                    <a data-edit={`footer.link.${i}.${i2}`} data-edit-max="28" href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional software company. Prices, customers and integrations are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
