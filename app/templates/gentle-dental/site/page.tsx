import { TabbiedPattern } from 'tabbied/react';
import { ivy, tulle } from 'tabbied/patterns';
import s from './gentle-dental.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Gentle Dental Studio: Dentistry for nervous patients, Larkspur Hill',
  description:
    'Gentle Dental Studio is a small practice on Larkspur Hill for people who are frightened of the dentist. Your first visit minute by minute, the comfort card, sedation options with prices, and how to book a quiet appointment.',
};

/* Site colors. The garden in the window and the leaves in the footer are
   ivy in the page's own greens on a transparent ground, so the pane or band
   behind them is the sky; the quiet-room veil is the same greens in dots. */
const LINEN = '#f4f1e8';
const MOSS = '#26352c';
const SAGE = '#a7bba1';
const FERN = '#5a7a62';
const CLAY = '#d9b7a0';

const GARDEN = ['transparent', SAGE, FERN, SAGE, CLAY];
const HEDGE = ['transparent', SAGE, FERN, CLAY];
const VEIL = ['transparent', FERN, SAGE];

const NAV = [
  ['First visit', '#first-visit'],
  ['Comfort card', '#comfort'],
  ['Sedation', '#sedation'],
  ['Prices', '#prices'],
  ['The team', '#team'],
  ['Questions', '#questions'],
  ['Book', '#book'],
];

const PROMISES = [
  'You can stop at any time.',
  'Nothing happens without your say.',
  'Nobody will tell you off.',
];

const MINUTES = [
  {
    at: '0:00',
    title: 'You arrive',
    body: 'Nobody at the desk hands you a clipboard. You filled the forms in at home, or you fill them in later, or Theo does them with you over the phone.',
  },
  {
    at: '0:02',
    title: 'Tea, in the quiet room',
    body: 'Not a waiting room: a small room with a window onto the courtyard and a pot of mint tea. The treatment rooms are soundproofed, so you will not hear a drill.',
  },
  {
    at: '0:10',
    title: 'A conversation, sitting up',
    body: 'Dr. Tate comes to you. You talk in two ordinary chairs about what happened before and what worries you now. There is no clock on this part.',
  },
  {
    at: '0:25',
    title: 'A look round, if you want one',
    body: 'You see the room, sit in the chair and move it up and down yourself. Every instrument is shown to you before it comes anywhere near you.',
  },
  {
    at: '0:35',
    title: 'A look in your mouth, if you want one',
    body: 'A mirror and a light, no probing and no scraping. Or nothing at all: plenty of people stop at the tour on their first day, and that is a good first day.',
  },
  {
    at: '0:50',
    title: 'A plan, on paper',
    body: 'What we saw, what needs doing, what can wait, and what each part costs, written down for you to take home and think about.',
  },
  {
    at: '1:00',
    title: 'You go home',
    body: 'Nothing is booked unless you ask for it. We send one text a week later to see how you are, and then we leave you be.',
  },
];

const COMFORT = [
  {
    legend: 'For your ears',
    items: [
      'Noise-cancelling headphones, with your playlist or ours',
      'A running commentary on everything we do',
      'Quiet: no talking unless you start it',
    ],
  },
  {
    legend: 'For your body',
    items: [
      'A weighted blanket, 6 kg, warmed',
      'A neck pillow and a knee bolster',
      'Something to squeeze',
    ],
  },
  {
    legend: 'For your eyes',
    items: [
      'Tinted glasses against the light',
      'A film on the ceiling screen',
      'The blind up, so you can see the courtyard',
    ],
  },
  {
    legend: 'For the numbing',
    items: [
      'Numbing gel before any injection',
      'The slow, computer-controlled injector',
      'A test tap before we start, to show you it has worked',
    ],
  },
];

const SEDATION = [
  {
    name: 'Numbing only',
    feel: 'Awake and clear, the area numb for two to three hours',
    remember: 'Everything',
    drive: 'Yes',
    price: 'Included',
  },
  {
    name: 'Laughing gas',
    feel: 'Floaty and warm through a small nose piece; wears off in minutes',
    remember: 'Most of it',
    drive: 'Yes, after 15 minutes',
    price: '$85 a visit',
  },
  {
    name: 'A pill before you come',
    feel: 'Drowsy and unbothered, still able to answer',
    remember: 'Very little',
    drive: 'No, someone brings you and takes you home',
    price: '$240 a visit',
  },
  {
    name: 'IV sedation',
    feel: 'Deeply relaxed through a drip in the hand, with Dr. Asante watching',
    remember: 'Almost nothing',
    drive: 'No, and no work for the rest of the day',
    price: '$520 first hour, $160 each half hour after',
  },
];

const PRICES = [
  ['The first visit, as above', '60 min', '$0'],
  ['Check-up and clean', '60 min', '$185'],
  ['X-rays, two small ones', '10 min', '$60'],
  ['A white filling', 'from 45 min', 'from $170'],
  ['Root canal, back tooth', '2 visits', '$1,150'],
  ['Crown, porcelain', '2 visits', '$1,290'],
  ['Taking a tooth out', '45 min', 'from $230'],
  ['An emergency visit, same day', '45 min', '$140'],
];

const TEAM = [
  {
    name: 'Dr. Imogen Tate',
    role: 'Dentist, and the reason for the studio',
    note: 'Was frightened of dentists herself until she was 30. Opened the studio in 2016 to work at the pace she needed then.',
  },
  {
    name: 'Dr. Kwame Asante',
    role: 'Dentist, sedation lead',
    note: 'Trained in IV sedation at the county hospital. Does the pill and IV visits, and root canals, very slowly.',
  },
  {
    name: 'Nia Brooks',
    role: 'Hygienist',
    note: 'Cleans in short rounds with a pause between each, and tells you before every new sound.',
  },
  {
    name: 'Theo Lind',
    role: 'Front desk',
    note: 'The voice on the phone. Answers texts and email too, for everyone who would rather not ring.',
  },
];

const QUESTIONS = [
  [
    'It has been years since I last went. Will you judge me?',
    'No. Most of the people we see have not been for five years or more, and some for twenty. We will not remark on it, and nothing we find is a surprise to us.',
  ],
  [
    'What if I cry, or panic?',
    'Then we stop, and you sit up, and we wait. People cry here most weeks. It does not end the appointment unless you want it to.',
  ],
  [
    'Can I bring someone with me?',
    'Yes, into the room and beside the chair if you like. For pill or IV sedation you must bring someone, to take you home.',
  ],
  [
    'Can I just come and look around first?',
    'Yes. That is what the first visit is. You can also come in on a Friday afternoon for ten minutes, no appointment, just to see the place.',
  ],
  [
    'What if I need to stop halfway through a filling?',
    'Raise your left hand. We stop within a second, put a temporary dressing on if the tooth is open, and finish another day. You are never charged twice for the same tooth.',
  ],
];

const HOURS = [
  ['Monday to Thursday', '8 am to 6 pm'],
  ['Friday', '8 am to 2 pm'],
  ['The quiet hour', 'every day at 8, one patient only'],
  ['Weekends', 'closed; emergencies by text'],
];

export default function GentleDentalPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..600&family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..500&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Gentle Dental Studio</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------- HERO
            The view from the chair: every treatment room faces the courtyard,
            so the first thing on the page is that window. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.eyebrow}>Dentistry for nervous people, Larkspur Hill</p>
            <h1 id="hero-h" className={s.title}>
              Slow dentistry for people who would <em>rather not be here</em>
            </h1>
            <p className={s.lede}>
              A small practice with two chairs, long appointments and no
              surprises. If you are frightened of the dentist, or have not been
              in years, we are set up for exactly you.
            </p>
            <div className={s.actions}>
              <a className={s.button} href="#book">Book a first visit</a>
              <a className={s.quiet} href="#first-visit">What happens when you come</a>
            </div>
          </div>
          <div className={s.window}>
            <div className={s.garden} aria-hidden="true">
              <TabbiedPattern
                pattern={ivy}
                palette={GARDEN}
                fit="grid"
                cellSize={52}
                seed="gentle-garden"
                options={{ frequency: 0.75 }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.mullions} aria-hidden="true" />
            <p className={s.windowNote}>The view from both chairs.</p>
          </div>
        </section>

        <ul className={s.promises} aria-label="Three promises">
          {PROMISES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        {/* ------------------------------------------------------ FIRST VISIT */}
        <section id="first-visit" className={s.visit} aria-labelledby="visit-h">
          <div className={s.visitIntro}>
            <p className={s.label}>Your first visit</p>
            <h2 id="visit-h" className={s.h2}>An hour, minute by minute</h2>
            <p className={s.body}>
              The first visit is free and nothing is done to your teeth unless
              you ask. This is what the hour looks like, so there is nothing
              to imagine on the way here.
            </p>
            <div className={s.quietScene}>
              <div className={s.quietRoom} aria-hidden="true">
                <TabbiedPattern
                  pattern={tulle}
                  palette={VEIL}
                  fit="grid"
                  cellSize={40}
                  seed="gentle-quiet"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="gentle-dental-quietroom"
                alt="The quiet room: an armchair by a tall window, a side table with a teapot and a cup, a potted plant"
                inks={{ red: 'var(--clay-ink)', blue: 'var(--leaf)' }}
                className={s.quietArt}
              />
              <p className={s.quietCaption}>The quiet room, where every first visit starts.</p>
            </div>
          </div>
          <ol className={s.minutes}>
            {MINUTES.map((m) => (
              <li key={m.at} className={s.minute}>
                <span className={s.at}>{m.at}</span>
                <div className={s.minuteText}>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ STOP SIGNAL */}
        <section className={s.stop} aria-labelledby="stop-h">
          <div className={s.stopHedge} aria-hidden="true">
            <TabbiedPattern
              pattern={ivy}
              palette={HEDGE}
              fit="grid"
              cellSize={44}
              seed="gentle-stop"
              options={{ frequency: 0.8 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.stopText}>
            <p className={s.label}>The stop signal</p>
            <h2 id="stop-h" className={s.stopTitle}>
              Raise your left hand. <em>We stop.</em>
            </h2>
            <p className={s.body}>
              Within a second, every time, for any reason or none. The
              instruments come out, the chair comes up, and we wait until you
              say go. We agree the signal before we start and we practise it
              once, so you know it works.
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------- COMFORT CARD */}
        <section id="comfort" className={s.sec} aria-labelledby="comfort-h">
          <div className={s.split}>
            <div className={s.splitHead}>
              <p className={s.label}>The comfort card</p>
              <h2 id="comfort-h" className={s.h2}>Tick what would help</h2>
              <p className={s.body}>
                Everything on the card is free. Send it before you come and the
                room is set up when you walk in, so you never have to ask in
                the chair. We keep it on file and change it whenever you say.
              </p>
            </div>
            <form className={s.card} action="#">
              <div className={s.cardGrid}>
                {COMFORT.map((group) => (
                  <fieldset key={group.legend} className={s.group}>
                    <legend>{group.legend}</legend>
                    {group.items.map((item) => (
                      <label key={item} className={s.tick}>
                        <input type="checkbox" name="comfort" value={item} />
                        <span>{item}</span>
                      </label>
                    ))}
                  </fieldset>
                ))}
              </div>
              <div className={s.cardFoot}>
                <label className={s.cardName}>
                  <span>Your name</span>
                  <input type="text" name="name" autoComplete="name" />
                </label>
                <button className={s.button} type="submit">Save my card</button>
              </div>
            </form>
          </div>
        </section>

        {/* -------------------------------------------------------- SEDATION */}
        <section id="sedation" className={s.sec} aria-labelledby="sedation-h">
          <div className={s.secHead}>
            <p className={s.label}>Sedation</p>
            <h2 id="sedation-h" className={s.h2}>Four ways to feel less</h2>
            <p className={s.body}>
              From a numb tooth to hardly remembering the afternoon. We will
              talk through which suits you at the first visit; you can change
              your mind at any appointment.
            </p>
          </div>
          <table className={s.sedation}>
            <caption className={s.srOnly}>Sedation options compared</caption>
            <thead>
              <tr>
                <th scope="col">Option</th>
                <th scope="col">How it feels</th>
                <th scope="col">You will remember</th>
                <th scope="col">Drive home?</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {SEDATION.map((o) => (
                <tr key={o.name}>
                  <th scope="row">{o.name}</th>
                  <td data-label="How it feels">{o.feel}</td>
                  <td data-label="You will remember">{o.remember}</td>
                  <td data-label="Drive home?">{o.drive}</td>
                  <td data-label="Price" className={s.price}>{o.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={s.sec} aria-labelledby="prices-h">
          <div className={s.split}>
            <div className={s.splitHead}>
              <p className={s.label}>Everyday care</p>
              <h2 id="prices-h" className={s.h2}>Prices, at half the usual speed</h2>
              <p className={s.body}>
                Our appointments are twice as long as most practices book, and
                the price is the price whatever the clock says. Payment plans
                over six or twelve months, no interest.
              </p>
            </div>
            <dl className={s.prices}>
              {PRICES.map(([what, time, price]) => (
                <div key={what}>
                  <dt>{what}</dt>
                  <dd className={s.time}>{time}</dd>
                  <dd className={s.cost}>{price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.sec} aria-labelledby="team-h">
          <div className={s.secHead}>
            <p className={s.label}>Four people</p>
            <h2 id="team-h" className={s.h2}>Who you will meet</h2>
          </div>
          <ul className={s.team}>
            {TEAM.map((t) => (
              <li key={t.name}>
                <h3>{t.name}</h3>
                <p className={s.role}>{t.role}</p>
                <p className={s.body}>{t.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="questions-h">
          <div className={s.split}>
            <div className={s.splitHead}>
              <p className={s.label}>Things people ask</p>
              <h2 id="questions-h" className={s.h2}>Before you decide</h2>
              <p className={s.body}>If yours is not here, text Theo. There are no silly ones.</p>
            </div>
            <div className={s.faq}>
              {QUESTIONS.map(([q, a]) => (
                <details key={q} className={s.qa}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={`${s.sec} ${s.book}`} aria-labelledby="book-h">
          <div className={s.bookInner}>
            <div className={s.bookInfo}>
              <p className={s.label}>Book a first visit</p>
              <h2 id="book-h" className={s.h2}>We will answer the way you choose</h2>
              <p className={s.address}>
                2 Fennel Court, Larkspur Hill
                <br />
                through the arch, the green door
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a href="sms:+15550148823">Text (555) 014-8823</a>
              </p>
              <p className={s.contact}>
                <a href="mailto:hello@gentledental.example">hello@gentledental.example</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label htmlFor="gd-name">Your name</label>
                <input id="gd-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label htmlFor="gd-contact">Phone number or email</label>
                <input id="gd-contact" name="contact" type="text" autoComplete="email" />
              </div>
              <fieldset className={s.choice}>
                <legend>How should we get back to you?</legend>
                <label>
                  <input type="radio" name="reply" value="text" defaultChecked />
                  <span>A text</span>
                </label>
                <label>
                  <input type="radio" name="reply" value="email" />
                  <span>An email</span>
                </label>
                <label>
                  <input type="radio" name="reply" value="call" />
                  <span>A phone call</span>
                </label>
              </fieldset>
              <div className={s.field}>
                <label htmlFor="gd-feel">How do you feel about the dentist?</label>
                <select id="gd-feel" name="feel" defaultValue="uneasy">
                  <option value="fine">Fine, I just like the pace</option>
                  <option value="uneasy">Uneasy</option>
                  <option value="frightened">Frightened</option>
                  <option value="years">I have not been in years</option>
                </select>
              </div>
              <div className={s.field}>
                <label htmlFor="gd-note">Anything you would like us to know first</label>
                <textarea id="gd-note" name="note" rows={4} />
              </div>
              <button className={s.button} type="submit">Send, no obligation</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footHedge} aria-hidden="true">
          <TabbiedPattern
            pattern={ivy}
            palette={HEDGE}
            fit="grid"
            cellSize={40}
            seed="gentle-foot"
            options={{ frequency: 0.85 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p className={s.footName}>Gentle Dental Studio</p>
          <p>A fictional dental practice. The team, prices and address are invented.</p>
          <p>The quiet room is a generated image, drawn in the page's own colors.</p>
          <p>
            Patterns by{' '}
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
