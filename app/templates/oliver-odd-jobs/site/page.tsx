import { TabbiedPattern } from 'tabbied/react';
import { chip } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './oliver-odd-jobs.module.css';

export const metadata = {
  title: 'Oliver Odd Jobs: Handyman in Ashgrove, flat prices for small jobs',
  description:
    'Oliver Odd Jobs fixes the list on your fridge: dripping taps, sticking doors, shelves, mirrors and flat-pack, at flat prices. Half-day and full-day rates for longer lists, and a plain list of what he will not do.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The chip
   pattern is a fridge door full of magnets: chamfered squares in tomato,
   mustard, cobalt, navy and leaf on the enamel mint. It is the door in the
   hero, the stub of each rate coupon, a magnet strip mid-page and the
   footer's edge. */
const MINT = '#d6e8de';
const NAVY = '#1d2a44';
const TOMATO = '#d9472b';
const MUSTARD = '#f0b23a';
const COBALT = '#2f62b0';
const LEAF = '#5e9a5a';

const MAGNETS = ['transparent', TOMATO, MUSTARD, COBALT, NAVY, LEAF];
const STRIP = ['transparent', MUSTARD, TOMATO, LEAF, COBALT, MUSTARD];
const NIGHT = ['transparent', MUSTARD, TOMATO, MINT, COBALT, LEAF];

const NAV = [
  ['Job board', '#jobs'],
  ['Day rates', '#rates'],
  ['How it works', '#how'],
  ['What I do not do', '#wont'],
  ['Book', '#book'],
];

const FRIDGE = [
  ['Drip in the kitchen tap', '$85', 'done'],
  ['Hang the hall mirror', '$55', 'done'],
  ['Shed door scrapes', '$85', ''],
  ['Caulk round the bath', '$120', ''],
  ['Back bedroom blinds', '$90', ''],
];

type Job = { kind: string; tone: string; task: string; time: string; price: string; note: string };

const JOBS: Job[] = [
  { kind: 'Walls', tone: 'tomato', task: 'Hang mirrors or pictures', time: 'Up to 3, 30 min', price: '$55', note: 'Heavy mirrors included, with the right anchors.' },
  { kind: 'Walls', tone: 'tomato', task: 'Put up shelves', time: 'Up to 3, 1 hour', price: '$75', note: 'Level, on studs or proper fixings.' },
  { kind: 'Walls', tone: 'tomato', task: 'Mount a TV', time: '1 hour', price: '$95', note: 'Drywall or brick. Cables hidden in a channel.' },
  { kind: 'Walls', tone: 'tomato', task: 'Patch a hole in drywall', time: 'Two short visits', price: '$110', note: 'Up to fist size, sanded and ready to paint.' },
  { kind: 'Water', tone: 'cobalt', task: 'Fix a dripping tap', time: '45 min', price: '$85', note: 'New washer or cartridge, parts at cost.' },
  { kind: 'Water', tone: 'cobalt', task: 'Toilet that keeps running', time: '1 hour', price: '$95', note: 'New fill valve and flapper.' },
  { kind: 'Water', tone: 'cobalt', task: 'Re-caulk a bath or shower', time: '90 min', price: '$120', note: 'Old sealant cut out, not caulked over.' },
  { kind: 'Doors', tone: 'mustard', task: 'Door that sticks or swings', time: '1 hour', price: '$85', note: 'Planed, rehung or new hinges.' },
  { kind: 'Doors', tone: 'mustard', task: 'Blinds or curtain rods', time: 'Up to 3 windows', price: '$90', note: 'Your blinds, my drill.' },
  { kind: 'Home', tone: 'leaf', task: 'Assemble flat-pack', time: 'Wardrobe size, 2 hours', price: '$130', note: 'Anchored to the wall, box taken away.' },
  { kind: 'Home', tone: 'leaf', task: 'Childproof a floor', time: '2 hours', price: '$140', note: 'Latches, stair gates, furniture anchors.' },
  { kind: 'Home', tone: 'leaf', task: 'Gutters, one storey', time: '90 min', price: '$120', note: 'Cleared, flushed and checked for leaks.' },
];

const RATES = [
  ['The odd hour', '$75', 'First hour, then $60 an hour', 'For one job not on the board, or two quick ones.'],
  ['Half a day', '$260', 'Up to 4 hours', 'As much of your list as fits in a morning or an afternoon.'],
  ['A full day', '$480', 'Up to 8 hours', 'The big list, the move-in, the before-the-in-laws-arrive.'],
];

const STEPS = [
  ['Text a photo', 'Send a picture of the job and a line about it to (555) 014-2207. A list is fine too.'],
  ['Get a fixed price', 'A price back the same day, from the board or worked out for you. It does not go up.'],
  ['Pick a day', 'Usually within the week. I give you a two-hour window and text when I am on the way.'],
  ['Pay when it is done', 'Card, check or cash, once you have looked at the work. Materials at cost, receipts attached.'],
];

const WONT = [
  ['Gas lines or gas appliances', 'Call a licensed gas fitter.'],
  ['Anything in the electrical panel', 'A licensed electrician. I can give you two names.'],
  ['Roofs above one storey', 'A roofer with proper scaffolding.'],
  ['Moving walls, or anything structural', 'A general contractor, and a permit.'],
  ['Mold, asbestos or pests', 'A specialist. Please do not disturb it.'],
  ['Jobs longer than two days', 'A contractor will be cheaper and quicker.'],
];

const NOTES = [
  ['He fixed the gate, the drip and the shelf in one morning, and swept up after.', 'June, Pell Street'],
  ['Turned up when he said, quoted what he charged. That should not be rare.', 'Dev and Sam, Upper Dene'],
  ['Told me the panel job was not for him and who to call instead. Saved me money.', 'Rosa, Millbrook'],
];

const HOURS = [
  ['Monday to Friday', '8:00-5:00'],
  ['Saturday', '9:00-1:00'],
  ['Texts answered', 'By 7 pm, every day'],
];

export default function OliverOddJobsPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--mint': '#d6e8de',
        '--navy': '#1d2a44',
        '--tomato': '#d9472b',
        '--mustard': '#f0b23a',
        '--cobalt': '#2f62b0',
        '--leaf': '#5e9a5a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="mint,navy,tomato,mustard,cobalt,leaf"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Caveat:wght@500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandChip} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Oliver Odd Jobs</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="sms:+15550142207">Text (555) 014-2207</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The fridge door, every magnet a chip, with this week's list
            stuck to it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Handyman, Ashgrove and around</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              The list on your fridge, <span>done by lunch.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I am Oliver. I fix the small things that have been bothering you
              for months: the drip, the door, the shelf you bought in March.
              Flat prices from the board below, and you pay when it is done.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Text me a photo</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#jobs">See the prices</a>
            </div>
            <ul className={s.badges}>
              <li data-edit="hero.item" data-edit-max="80">Insured to $1M</li>
              <li data-edit="hero.item2" data-edit-max="80">Licensed, no. HM-40417</li>
              <li data-edit="hero.item3" data-edit-max="80">Tidy, on time, no upsell</li>
            </ul>
          </div>
          <div className={s.fridge}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4,1,5" className={s.door} aria-hidden="true">
              <TabbiedPattern
                pattern={chip}
                palette={MAGNETS}
                fit="grid"
                cellSize={58}
                seed="oliver-door"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.list}>
              <p data-edit="hero.listTitle" data-edit-max="240" data-edit-multiline className={s.listTitle}>Fridge list</p>
              <ul className={s.listItems}>
                {FRIDGE.map(([task, price, done], i) => (
                  <li key={task} className={done ? s.done : undefined}>
                    <span data-edit={`hero.listTask.${i}`} data-edit-max="60" className={s.listTask}>{task}</span>
                    <span data-edit={`hero.listPrice.${i}`} data-edit-max="60" className={s.listPrice}>{price}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="hero.listFoot" data-edit-max="240" data-edit-multiline className={s.listFoot}>All five: half a day, $260</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- JOB BOARD */}
        <section id="jobs" className={s.sec} aria-labelledby="jobs-h">
          <div className={s.secHead}>
            <h2 data-edit="jobs.secTitle" data-edit-max="60" id="jobs-h" className={s.secTitle}>The job board</h2>
            <p data-edit="jobs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Flat prices for the jobs I do most. The price is the price, even
              if it takes me longer. Parts and materials are extra, at cost,
              with the receipt.
            </p>
          </div>
          <ul className={s.board}>
            {JOBS.map((j, i) => (
              <li key={j.task} className={`${s.ticket} ${s[j.tone]}`}>
                <p data-edit={`jobs.ticketKind.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketKind}>{j.kind}</p>
                <h3 data-edit={`jobs.ticketTask.${i}`} data-edit-max="40" className={s.ticketTask}>{j.task}</h3>
                <p data-edit={`jobs.ticketNote.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketNote}>{j.note}</p>
                <p data-edit={`jobs.ticketTime.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketTime}>{j.time}</p>
                <p data-edit={`jobs.ticketPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.ticketPrice}>{j.price}</p>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,5,4,3" className={s.strip} aria-hidden="true">
          <TabbiedPattern
            pattern={chip}
            palette={STRIP}
            fit="grid"
            cellSize={40}
            seed="oliver-strip"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- RATES
            Three coupons to tear off, each with a stub of magnets. */}
        <section id="rates" className={s.sec} aria-labelledby="rates-h">
          <div className={s.secHead}>
            <h2 data-edit="rates.secTitle" data-edit-max="60" id="rates-h" className={s.secTitle}>Got a long list? Book the morning.</h2>
            <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              When the list is longer than the board, book time instead. No
              call-out fee within eight miles of Ashgrove.
            </p>
          </div>
          <ul className={s.coupons}>
            {RATES.map(([name, price, span, use], i) => (
              <li key={name} className={s.coupon}>
                <div data-edit-pattern={`rates.field.${i}`} data-edit-roles="transparent,2,3,4,1,5" className={s.stub} aria-hidden="true">
                  <TabbiedPattern
                    pattern={chip}
                    palette={MAGNETS}
                    fit="grid"
                    cellSize={30}
                    seed={`oliver-stub-${i}`}
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.couponBody}>
                  <h3 data-edit={`rates.couponName.${i}`} data-edit-max="40" className={s.couponName}>{name}</h3>
                  <p data-edit={`rates.couponPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.couponPrice}>{price}</p>
                  <p data-edit={`rates.couponSpan.${i}`} data-edit-max="240" data-edit-multiline className={s.couponSpan}>{span}</p>
                  <p data-edit={`rates.couponUse.${i}`} data-edit-max="240" data-edit-multiline className={s.couponUse}>{use}</p>
                </div>
              </li>
            ))}
          </ul>
          <p data-edit="rates.fine" data-edit-max="240" data-edit-multiline className={s.fine}>Materials at cost, receipts attached. Card, check or cash on the day. Cancel any time before 7 pm the night before.</p>
        </section>

        {/* ------------------------------------------------------------- HOW */}
        <section id="how" className={s.sec} aria-labelledby="how-h">
          <div className={s.secHead}>
            <h2 data-edit="how.secTitle" data-edit-max="60" id="how-h" className={s.secTitle}>How it works</h2>
            <p data-edit="how.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Four steps, and the first one takes thirty seconds.</p>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([title, body], i) => (
              <li key={title} className={s.step}>
                <span className={s.magnet}>{i + 1}</span>
                <h3 data-edit={`how.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                <p data-edit={`how.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{body}</p>
              </li>
            ))}
          </ol>
          <ul className={s.notes}>
            {NOTES.map(([quote, who], i) => (
              <li key={who} className={s.note}>
                <blockquote data-edit={`how.noteQuote.${i}`} data-edit-max="240" data-edit-multiline className={s.noteQuote}>{quote}</blockquote>
                <p data-edit={`how.noteWho.${i}`} data-edit-max="240" data-edit-multiline className={s.noteWho}>{who}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ WONT
            The other half of the list: what Oliver turns down, and who to
            call instead. */}
        <section id="wont" className={s.wont} aria-labelledby="wont-h">
          <div className={s.wontInner}>
            <div className={s.wontHead}>
              <h2 data-edit="wont.wontTitle" data-edit-max="60" id="wont-h" className={s.wontTitle}>What I do not do</h2>
              <p data-edit="wont.wontNote" data-edit-max="240" data-edit-multiline className={s.wontNote}>
                Some jobs need a license I do not hold, or a crew I do not
                have. I will tell you so on the first text, and point you to
                someone good.
              </p>
              <div data-edit-pattern="wont.field" data-edit-roles="transparent,3,2,0,4,5" className={s.wontChips} aria-hidden="true">
                <TabbiedPattern
                  pattern={chip}
                  palette={NIGHT}
                  fit="grid"
                  cellSize={44}
                  seed="oliver-night"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ul className={s.wontList}>
              {WONT.map(([job, instead], i) => (
                <li key={job}>
                  <span data-edit={`wont.wontJob.${i}`} data-edit-max="60" className={s.wontJob}>{job}</span>
                  <span data-edit={`wont.wontInstead.${i}`} data-edit-max="60" className={s.wontInstead}>{instead}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Send me your list</h2>
              <p data-edit="book.bookLead" data-edit-max="240" data-edit-multiline className={s.bookLead}>
                The quickest way is a text with a photo. Or fill this in and I
                will reply with a price, usually the same day.
              </p>
              <p className={s.bigPhone}>
                <a data-edit="book.link" data-edit-max="28" href="sms:+15550142207">(555) 014-2207</a>
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:oliver@oddjobs.example">oliver@oddjobs.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Workshop</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>11 Tanner Yard, Ashgrove</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">I cover</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Ashgrove, Millbrook, the Flats and Upper Dene</dd>
                </div>
              </dl>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`book.term4.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`book.body3.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <p data-edit="book.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>New job</p>
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="oj-name">Your name</label>
                <input id="oj-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="oj-phone">Mobile, for the price</label>
                <input id="oj-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="oj-street">Street and zip</label>
                <input id="oj-street" name="street" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="oj-when">Best days for you</label>
                <input id="oj-when" name="when" type="text" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label5" htmlFor="oj-list">What needs doing</label>
                <textarea id="oj-list" name="list" rows={5} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send to Oliver</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,1,5" className={s.footChips} aria-hidden="true">
          <TabbiedPattern
            pattern={chip}
            palette={MAGNETS}
            fit="grid"
            cellSize={36}
            seed="oliver-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Oliver Odd Jobs</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>
            A fictional handyman: the names, people, prices and address are
            invented.
          </p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
