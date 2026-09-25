import { TabbiedPattern } from 'tabbied/react';
import { midnightblossoms, scatteredgems } from 'tabbied/patterns';
import s from './bloom-events.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Bloom Events: Party and event planner, Harbor District',
  description:
    'Bloom Events plans birthdays, weddings and company parties, from the first idea to the last balloon down. Packages by occasion with prices, how we plan, and an enquiry form.',
};

/* Site colors. The confetti plate is plum with mauve, pink and gold in it;
   the blossoms take the blush ground as their plate, so they sit on the
   page itself and re-color with it. */
const PLUM = '#2B1D2E';
const PINK = '#FF5D8F';
const MINT = '#28C2A0';
const GOLD = '#FFC93C';
const MAUVE = '#B7A7B5';
const BLUSH = '#FFF9F5';

const CONFETTI = ['transparent', PLUM, PLUM, PINK, GOLD];
const BLOSSOMS = ['transparent', BLUSH, PINK, GOLD, MINT, MAUVE];
/* The footer's blossoms are laid on the plum instead. */
const BLOSSOMS_NIGHT = ['transparent', PLUM, PINK, GOLD, MINT, MAUVE];

const NAV = [
  ['Occasions', '#occasions'],
  ['How we plan', '#plan'],
  ['Kind words', '#words'],
  ['FAQ', '#faq'],
  ['Enquire', '#enquire'],
];

type Occasion = {
  id: string;
  art: string;
  alt: string;
  inks: Record<string, string>;
  name: string;
  line: string;
  from: string;
  scale: string;
  items: string[];
  extra: string;
  cta: string;
  tone: 'pink' | 'mint' | 'gold';
};

const OCCASIONS: Occasion[] = [
  {
    id: 'birthdays',
    art: 'bloom-events-balloons',
    alt: 'A bunch of balloons',
    inks: { red: 'var(--pink)', blue: 'var(--mint)', yellow: 'var(--gold)' },
    name: 'Birthdays',
    line: 'First, fortieth or ninetieth, at home or somewhere new.',
    from: '$650',
    scale: 'Up to 40 guests, 3 hours',
    items: [
      'A theme and a color story, drawn up with you',
      'Balloon garland, table styling and signage',
      'Cake and catering booked and confirmed',
      'Games or entertainment for the age',
      'Setup before, pack-down after',
    ],
    extra: 'Kids parties from $450 with a host for the games.',
    cta: 'Plan a birthday',
    tone: 'pink',
  },
  {
    id: 'weddings',
    art: 'bloom-events-cake',
    alt: 'A two-tier celebration cake with three candles',
    inks: { red: 'var(--pink)', blue: 'var(--mint)', yellow: 'var(--gold)', black: 'var(--plum)' },
    name: 'Weddings',
    line: 'From a courthouse lunch for twelve to a barn for two hundred.',
    from: '$3,800',
    scale: 'Full planning, 9-12 months',
    items: [
      'Venue shortlist, visits and contract review',
      'Vendors chosen, booked and managed',
      'Budget tracker and a shared planning board',
      'Rehearsal, run sheet and seating plan',
      'Two coordinators on the day, start to finish',
    ],
    extra: 'Day-of coordination only, from $1,200.',
    cta: 'Plan a wedding',
    tone: 'mint',
  },
  {
    id: 'corporate',
    art: 'bloom-events-gift',
    alt: 'A gift box tied with a ribbon bow',
    inks: { red: 'var(--pink)', blue: 'var(--mint)', yellow: 'var(--gold)', black: 'var(--plum)' },
    name: 'Company events',
    line: 'Launches, holiday parties, offsites and the ten-year dinner.',
    from: '$2,400',
    scale: '30-300 guests, one invoice',
    items: [
      'Venue, catering and bar in one plan',
      'Branded styling and printed materials',
      'Guest list, RSVPs and dietary tracking',
      'AV, music and a speaker schedule',
      'A report afterwards with every receipt',
    ],
    extra: 'Gift boxes for remote teams from $38 a box.',
    cta: 'Plan a company event',
    tone: 'gold',
  },
];

const ALSO = ['Baby showers', 'Anniversaries', 'Graduations', 'Retirements', 'Proposals', 'Bar and bat mitzvahs'];

const PLAN = [
  { when: '12 months', what: 'Date and venue', body: 'We shortlist three venues that fit the guest count and the budget, and go and see them with you.' },
  { when: '9 months', what: 'The team', body: 'Photographer, caterer, florist, music. We book the people we trust and tell you why.' },
  { when: '6 months', what: 'The look', body: 'A mood board, a color story and a sample table, so nothing is a surprise on the day.' },
  { when: '3 months', what: 'Invitations out', body: 'Printed or digital. We chase the RSVPs and keep the dietary list.' },
  { when: '1 month', what: 'The run sheet', body: 'Every minute of the day on one page, sent to every vendor and signed off by you.' },
  { when: 'The day', what: 'We run it', body: 'Two of us arrive at dawn and leave last. Your phone stays in your pocket.' },
];

const WORDS = [
  {
    quote: 'They found a venue in three weeks that we had been told did not exist. On the day I did not answer a single question.',
    who: 'Priya and Tom',
    what: 'Wedding, 140 guests',
  },
  {
    quote: 'Forty eight-year-olds, a dinosaur theme and a thunderstorm. The party moved indoors in ten minutes and nobody cried.',
    who: 'Marisol D.',
    what: 'Birthday, 40 guests',
  },
  {
    quote: 'Our holiday party used to be a pizza order. This year people are still talking about it in March.',
    who: 'Harbor Print Co.',
    what: 'Company party, 90 guests',
  },
];

const FAQ = [
  {
    q: 'How far ahead should we book?',
    a: 'A year for a wedding on a summer Saturday, three months for a company party, six weeks for most birthdays. Shorter is often possible: ask.',
  },
  {
    q: 'How do payments work?',
    a: 'A 30% deposit holds the date, half the rest is due two months out and the balance a week before. Vendor costs are paid at cost, never marked up.',
  },
  {
    q: 'Do you travel?',
    a: 'Anywhere within 60 miles of the studio at no charge. Beyond that we add travel and, for a weekend event, one night of lodging.',
  },
  {
    q: 'Can you help with just part of it?',
    a: 'Yes. Styling only, day-of coordination only, or a two-hour planning session for $180 if you want to do the rest yourself.',
  },
];

export default function BloomEventsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--blush': '#fff9f5',
        '--plum': '#2b1d2e',
        '--pink': '#ff5d8f',
        '--mint': '#28c2a0',
        '--gold': '#ffc93c',
        '--mauve': '#b7a7b5',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="blush,plum,pink,mint,gold,mauve"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Gloock&family=Urbanist:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.text" data-edit-max="60">Bloom</span>
          <em>Events</em>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#enquire">Start planning</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The three pictures as one party table, on the confetti plate. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroCopy}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Party and event planning, Harbor District</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              You bring the guests. <em>We bring the party.</em>
            </h1>
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Birthdays, weddings and company events, planned from the first
              idea to the last balloon down. One planner, one plan, and a
              price you know before anything is booked.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#occasions">See the packages</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#enquire">Tell us your date</a>
            </div>
            <p className={s.heroNote}>
              <strong data-edit="hero.emphasis">412</strong>
              <span data-edit="hero.text" data-edit-max="60">parties since 2015, and not one late cake</span>
            </p>
          </div>
          <div className={s.heroArt}>
            <div className={s.plate} aria-hidden="true">
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,1,2,4" className={s.plateField}>
                <TabbiedPattern
                  pattern={scatteredgems}
                  palette={CONFETTI}
                  fit="grid"
                  cellSize={80}
                  seed="bloom-confetti"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <Artwork
              slug="bloom-events-balloons"
              alt="A bunch of balloons"
              inks={{ red: 'var(--pink)', blue: 'var(--mint)', yellow: 'var(--gold)' }}
              className={s.heroBalloons}
            />
            <Artwork
              slug="bloom-events-cake"
              alt="A two-tier cake with candles"
              inks={{ red: 'var(--pink)', blue: 'var(--mint)', yellow: 'var(--gold)', black: 'var(--plum)' }}
              className={s.heroCake}
            />
            <Artwork
              slug="bloom-events-gift"
              alt="A wrapped gift with a bow"
              inks={{ red: 'var(--pink)', blue: 'var(--mint)', yellow: 'var(--gold)', black: 'var(--plum)' }}
              className={s.heroGift}
            />
          </div>
        </section>

        {/* ------------------------------------------------------- OCCASIONS
            Three packages side by side, one picture each. */}
        <section id="occasions" className={s.occasions} aria-labelledby="occasions-h">
          <div className={s.head}>
            <p data-edit="occasions.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Packages by occasion</p>
            <h2 data-edit="occasions.title" data-edit-max="60" id="occasions-h">Pick the occasion. We plan the rest.</h2>
            <p data-edit="occasions.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              Every package is a starting point with a real price. We send an
              itemized quote after the first call, and it only changes if you
              change the plan.
            </p>
          </div>
          <ul className={s.packs}>
            {OCCASIONS.map((o, i) => (
              <li key={o.id} className={`${s.pack} ${s[o.tone]}`}>
                <div className={s.packArt}>
                  <Artwork slug={o.art} alt={o.alt} inks={o.inks} className={s.packPic} />
                </div>
                <div className={s.packBody}>
                  <h3 data-edit={`occasions.packName.${i}`} data-edit-max="40" className={s.packName}>{o.name}</h3>
                  <p data-edit={`occasions.packLine.${i}`} data-edit-max="240" data-edit-multiline className={s.packLine}>{o.line}</p>
                  <p className={s.packPrice}>
                    <span data-edit={`occasions.text.${i}`} data-edit-max="60">From</span>
                    <strong data-edit={`occasions.emphasis.${i}`}>{o.from}</strong>
                  </p>
                  <p data-edit={`occasions.packScale.${i}`} data-edit-max="240" data-edit-multiline className={s.packScale}>{o.scale}</p>
                  <ul className={s.packItems}>
                    {o.items.map((it, i2) => (
                      <li data-edit={`occasions.item.${i}.${i2}`} data-edit-max="80" key={it}>{it}</li>
                    ))}
                  </ul>
                  <p data-edit={`occasions.packExtra.${i}`} data-edit-max="240" data-edit-multiline className={s.packExtra}>{o.extra}</p>
                  <a data-edit={`occasions.packCta.${i}`} data-edit-max="28" className={s.packCta} href="#enquire">{o.cta}</a>
                </div>
              </li>
            ))}
          </ul>
          <div className={s.also}>
            <h3 data-edit="occasions.alsoHead" data-edit-max="40" className={s.alsoHead}>Also planned here</h3>
            <ul className={s.alsoList}>
              {ALSO.map((a, i) => (
                <li data-edit={`occasions.item2.${i}`} data-edit-max="80" key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ PLAN */}
        <section id="plan" className={s.plan} aria-labelledby="plan-h">
          <div className={s.planInner}>
            <div className={s.planGems} aria-hidden="true">
              <div className={s.halfField} aria-hidden="true">
                <TabbiedPattern
                  pattern={scatteredgems}
                  palette={CONFETTI}
                  fit="grid"
                  cellSize={80}
                  seed="bloom-confetti"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <div className={s.head}>
              <p data-edit="plan.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>How we plan</p>
              <h2 data-edit="plan.title" data-edit-max="60" id="plan-h">A year of planning, one calm day</h2>
              <p data-edit="plan.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
                The timeline for a wedding. A birthday runs the same steps in
                six weeks, a company party in three months.
              </p>
            </div>
            <ol className={s.timeline}>
              {PLAN.map((p, i) => (
                <li key={p.when} className={s.stage}>
                  <span data-edit={`plan.stageWhen.${i}`} data-edit-max="60" className={s.stageWhen}>{p.when}</span>
                  <span className={s.stageDot} aria-hidden="true" />
                  <div className={s.stageCard}>
                    <h3 data-edit={`plan.stageWhat.${i}`} data-edit-max="40" className={s.stageWhat}>{p.what}</h3>
                    <p data-edit={`plan.stageBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stageBody}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- WORDS */}
        <section id="words" className={s.words} aria-labelledby="words-h">
          <div data-edit-pattern="words.field" data-edit-roles="transparent,0,2,4,3,5" className={s.blossoms} aria-hidden="true">
            <TabbiedPattern
              pattern={midnightblossoms}
              palette={BLOSSOMS}
              fit="grid"
              cellSize={80}
              seed="bloom-blossoms"
              options={{ frequency: 0.5 }}
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.wordsInner}>
            <div className={s.head}>
              <p data-edit="words.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Kind words</p>
              <h2 data-edit="words.title" data-edit-max="60" id="words-h">From the people who hired us</h2>
            </div>
            <ul className={s.quotes}>
              {WORDS.map((w, i) => (
                <li key={w.who}>
                  <figure className={s.quote}>
                    <blockquote data-edit={`words.quote.${i}`} data-edit-max="240" data-edit-multiline>{w.quote}</blockquote>
                    <figcaption>
                      <strong data-edit={`words.emphasis.${i}`}>{w.who}</strong>
                      <span data-edit={`words.text.${i}`} data-edit-max="60">{w.what}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------- FAQ */}
        <section id="faq" className={s.faq} aria-labelledby="faq-h">
          <div className={s.head}>
            <p data-edit="faq.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Questions</p>
            <h2 data-edit="faq.title" data-edit-max="60" id="faq-h">Good to know</h2>
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

        {/* --------------------------------------------------------- ENQUIRE */}
        <section id="enquire" className={s.enquire} aria-labelledby="enquire-h">
          <div className={s.enquireAside}>
            <p data-edit="enquire.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Enquire</p>
            <h2 data-edit="enquire.title" data-edit-max="60" id="enquire-h">Tell us about your day</h2>
            <p data-edit="enquire.headNote" data-edit-max="240" data-edit-multiline className={s.headNote}>
              A planner writes back within one working day with dates we can
              do and a first idea of cost. The first call is always free.
            </p>
            <dl className={s.contact}>
              <div>
                <dt data-edit="enquire.term" data-edit-max="28">Call</dt>
                <dd><a data-edit="enquire.link" data-edit-max="28" href="tel:5550143366">(555) 014-3366</a></dd>
              </div>
              <div>
                <dt data-edit="enquire.term2" data-edit-max="28">Write</dt>
                <dd><a data-edit="enquire.link2" data-edit-max="28" href="mailto:hello@bloomevents.example">hello@bloomevents.example</a></dd>
              </div>
              <div>
                <dt data-edit="enquire.term3" data-edit-max="28">Studio</dt>
                <dd data-edit="enquire.body" data-edit-max="200" data-edit-multiline>9 Pier Lane, by appointment</dd>
              </div>
            </dl>
            <div className={s.giftStage}>
              <div className={s.giftPlate} aria-hidden="true">
                <div className={s.halfField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={scatteredgems}
                    palette={CONFETTI}
                    fit="grid"
                    cellSize={80}
                    seed="bloom-confetti"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
              </div>
              <Artwork
                slug="bloom-events-gift"
                alt=""
                inks={{ red: 'var(--gold)', blue: 'var(--pink)', yellow: 'var(--mint)', black: 'var(--plum)' }}
                className={s.asideGift}
              />
            </div>
          </div>
          <form className={s.form} action="#">
            <div className={s.formRow}>
              <label className={s.field}>
                <span data-edit="enquire.text" data-edit-max="60">Your name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={s.field}>
                <span data-edit="enquire.text2" data-edit-max="60">Email</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
            </div>
            <div className={s.formRow}>
              <label className={s.field}>
                <span data-edit="enquire.text3" data-edit-max="60">Occasion</span>
                <select name="occasion" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option>Birthday</option>
                  <option>Wedding</option>
                  <option>Company event</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className={s.field}>
                <span data-edit="enquire.text4" data-edit-max="60">Date, if you have one</span>
                <input type="date" name="date" />
              </label>
            </div>
            <div className={s.formRow}>
              <label className={s.field}>
                <span data-edit="enquire.text5" data-edit-max="60">Guests, roughly</span>
                <input type="number" name="guests" min="1" inputMode="numeric" />
              </label>
              <label className={s.field}>
                <span data-edit="enquire.text6" data-edit-max="60">Budget</span>
                <select name="budget" defaultValue="">
                  <option value="" disabled>Choose a range</option>
                  <option>Under $2,000</option>
                  <option>$2,000 - $5,000</option>
                  <option>$5,000 - $15,000</option>
                  <option>Over $15,000</option>
                  <option>Not sure yet</option>
                </select>
              </label>
            </div>
            <label className={s.field}>
              <span data-edit="enquire.text7" data-edit-max="60">What are you imagining?</span>
              <textarea name="message" rows={4} />
            </label>
            <button data-edit="enquire.btn" data-edit-max="24" type="submit" className={s.btn}>Send the enquiry</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footBlossoms} aria-hidden="true">
          <div className={s.halfField} aria-hidden="true">
            <TabbiedPattern
              pattern={midnightblossoms}
              palette={BLOSSOMS_NIGHT}
              fit="grid"
              cellSize={40}
              seed="bloom-foot"
              options={{ frequency: 0.6 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Bloom Events</p>
          <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Birthdays, weddings and company events, planned start to finish.</p>
          <ul className={s.footLinks}>
            {NAV.map(([label, href], i) => (
              <li key={href}><a data-edit={`footer.link.${i}`} data-edit-max="28" href={href}>{label}</a></li>
            ))}
          </ul>
        </div>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional event planner. Packages, prices and people are invented.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, drawn live in the page's own colors; the pictures follow the same palette.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
