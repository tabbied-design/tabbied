import { TabbiedPattern } from 'tabbied/react';
import { squaretunnel } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './ferris-hale-magic.module.css';

export const metadata = {
  title: 'Ferris Hale: Close-up magician for weddings, parties and corporate events',
  description:
    'Ferris Hale performs close-up magic among your guests: cards, coins and borrowed rings, eighteen inches from their eyes. Strolling sets for weddings, parlor shows for parties, and custom effects for corporate evenings.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   card table: green baize for the ground, card stock cream, a heart red,
   an old gold and the teal of a casino back. The square tunnel is the
   magician's mark, frames turning as they fall away toward the middle; on
   a transparent ground it is the face of the card in the hero, the back of
   the deck in the booking panel, a corridor across the page and a last
   card in the foot. */
const FELT = '#10211b';
const CREAM = '#f3ead8';
const RED = '#c8333b';
const GOLD = '#d9a542';
const TEAL = '#3aa6a0';

const FACE = ['transparent', FELT, RED, GOLD, TEAL];
const CORRIDOR = ['transparent', CREAM, RED, GOLD, TEAL];
const BACK = ['transparent', RED, CREAM, TEAL, GOLD];

const NAV = [
  ['Shows', '#shows'],
  ['Kind words', '#reviews'],
  ['Questions', '#questions'],
  ['Book', '#book'],
];

type Show = { rank: string; suit: string; name: string; for: string; length: string; price: string; text: string; includes: string[] };

const SHOWS: Show[] = [
  {
    rank: 'A',
    suit: 'hearts',
    name: 'Weddings',
    for: 'Cocktail hour and the reception',
    length: '90 minutes, strolling',
    price: 'from $1,450',
    text: 'The hour between the vows and dinner, while the photographs are taken, is the one nobody plans. I go table to table and make it the one your guests talk about.',
    includes: ['A trick with the couple\'s rings', 'Every table visited twice', 'Black tie, quiet, never in the photos'],
  },
  {
    rank: 'K',
    suit: 'diamonds',
    name: 'Private parties',
    for: 'Birthdays, anniversaries, dinners at home',
    length: '60 minutes',
    price: 'from $850',
    text: 'A parlor set for ten to forty guests seated in one room, close enough to touch the cards, then strolling while the drinks go round.',
    includes: ['Suitable from age eight up', 'A signed card left as a souvenir', 'No stage, no lights, no set-up'],
  },
  {
    rank: 'Q',
    suit: 'spades',
    name: 'Corporate events',
    for: 'Receptions, client dinners, trade show booths',
    length: '2 hours',
    price: 'from $2,200',
    text: 'Custom effects built around your product or your message: a deck that ends with your logo, a prediction sealed in your client\'s name badge.',
    includes: ['A planning call with your team', 'Booth sets that stop the aisle', 'Invoice and insurance certificate'],
  },
];

type Review = { quote: string; who: string; where: string };

const REVIEWS: Review[] = [
  { quote: 'He borrowed my grandmother\'s wedding ring, it vanished, and it was found inside a sealed orange on the cake table. She is ninety-one. She still tells it.', who: 'Maya Okonkwo', where: 'Wedding, Lakeview Pavilion' },
  { quote: 'Our client dinner had forty people who had heard every speech. Nobody looked at a phone for two hours. Three of them asked for his card.', who: 'Graham Whitfield', where: 'Client evening, Harbor Room' },
  { quote: 'The kids sat on the floor with their mouths open and the adults were worse. My husband is still trying to work out the coin.', who: 'Lena Fischer', where: 'Fortieth birthday, at home' },
];

const QUESTIONS = [
  ['Do you need a stage or a table?', 'No. Close-up magic happens in the guests\' hands and on the bar, so all I need is a room and people in it.'],
  ['How many guests can you reach?', 'About a hundred in an hour of strolling, in groups of four to eight. For larger weddings I suggest two hours, or the parlor set first.'],
  ['Is it suitable for children?', 'Yes, from about eight. Nothing is scary, nobody is made a fool of, and the youngest guest usually gets the best trick.'],
  ['Do you do mind reading?', 'A little, at the end of the parlor set, with a sealed envelope opened by a guest. It is the part people ask about the next morning.'],
  ['How far do you travel?', 'Anywhere within 100 miles of the city is included. Further than that, travel and a hotel are added at cost.'],
];

export default function FerrisHaleMagicPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--felt': '#10211b',
        '--cream': '#f3ead8',
        '--red': '#c8333b',
        '--gold': '#d9a542',
        '--teal': '#3aa6a0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="felt,cream,red,gold,teal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,500;0,700;1,500&family=Manrope:wght@400;500;600;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Ferris Hale</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Close-up magician</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#book">Check a date</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            One card dealt face up, two face down behind it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Close-up magic for weddings, parties and corporate evenings</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              The trick happens <em>in your hands.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Ferris Hale walks among your guests with a deck of cards, three
              coins and a borrowed ring, and does the impossible eighteen inches
              from their eyes. No stage, no props table, no volunteers dragged
              up to the front.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Check a date</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#shows">See the shows</a>
            </div>
            <dl className={s.heroFacts}>
              <div>
                <dt data-edit="hero.term" data-edit-max="28">Events performed</dt>
                <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>1,100+</dd>
              </div>
              <div>
                <dt data-edit="hero.term2" data-edit-max="28">Guests per hour</dt>
                <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>About 100</dd>
              </div>
              <div>
                <dt data-edit="hero.term3" data-edit-max="28">Performing since</dt>
                <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>2009</dd>
              </div>
            </dl>
          </div>
          <div className={s.deal}>
            <span className={s.backOne} aria-hidden="true" />
            <span className={s.backTwo} aria-hidden="true" />
            <div className={s.faceCard}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,0,2,3,4" className={s.faceField} aria-hidden="true">
                <TabbiedPattern
                  pattern={squaretunnel}
                  palette={FACE}
                  fit="grid"
                  cellSize={52}
                  seed="ferris-hale-face"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- SHOWS */}
        <section id="shows" className={s.sec} aria-labelledby="shows-h">
          <div className={s.secHead}>
            <h2 data-edit="shows.title" data-edit-format="emphasis" data-edit-max="60" id="shows-h" className={s.secTitle}>Three shows, <em>one deck</em></h2>
            <p data-edit="shows.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every set is close-up: cards, coins, rings and rubber bands, in
              the guests&apos; own hands. Prices include travel within 100 miles
              and are confirmed in writing when you book.
            </p>
          </div>
          <ul className={s.shows}>
            {SHOWS.map((sh, i) => (
              <li key={sh.name} className={`${s.show} ${s[sh.suit]}`}>
                <span className={s.index} aria-hidden="true">{sh.rank}</span>
                <span className={`${s.index} ${s.indexBottom}`} aria-hidden="true">{sh.rank}</span>
                <h3 data-edit={`shows.showName.${i}`} data-edit-max="40" className={s.showName}>{sh.name}</h3>
                <p data-edit={`shows.showFor.${i}`} data-edit-max="240" data-edit-multiline className={s.showFor}>{sh.for}</p>
                <p data-edit={`shows.showText.${i}`} data-edit-max="240" data-edit-multiline className={s.showText}>{sh.text}</p>
                <ul className={s.includes}>
                  {sh.includes.map((inc, i2) => (
                    <li data-edit={`shows.item.${i}.${i2}`} data-edit-max="80" key={inc}>{inc}</li>
                  ))}
                </ul>
                <dl className={s.showFacts}>
                  <div>
                    <dt data-edit={`shows.term.${i}`} data-edit-max="28">Length</dt>
                    <dd data-edit={`shows.body.${i}`} data-edit-max="200" data-edit-multiline>{sh.length}</dd>
                  </div>
                  <div>
                    <dt data-edit={`shows.term2.${i}`} data-edit-max="28">Fee</dt>
                    <dd data-edit={`shows.body2.${i}`} data-edit-max="200" data-edit-multiline>{sh.price}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,3,4" className={s.corridor} aria-hidden="true">
          <TabbiedPattern
            pattern={squaretunnel}
            palette={CORRIDOR}
            fit="grid"
            cellSize={64}
            seed="ferris-hale-corridor"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* --------------------------------------------------------- REVIEWS */}
        <section id="reviews" className={s.sec} aria-labelledby="reviews-h">
          <div className={s.secHead}>
            <h2 data-edit="reviews.title" data-edit-format="emphasis" data-edit-max="60" id="reviews-h" className={s.secTitle}>Kind words, <em>face up</em></h2>
            <p data-edit="reviews.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              From the last season. Ask and I will put you in touch with any of
              them, or with the planner who booked me.
            </p>
          </div>
          <ul className={s.reviews}>
            {REVIEWS.map((r, i) => (
              <li key={r.who} className={s.review}>
                <blockquote className={s.reviewQuote}>
                  <p data-edit={`reviews.body.${i}`} data-edit-max="240" data-edit-multiline>{r.quote}</p>
                </blockquote>
                <p data-edit={`reviews.reviewWho.${i}`} data-edit-max="240" data-edit-multiline className={s.reviewWho}>{r.who}</p>
                <p data-edit={`reviews.reviewWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.reviewWhere}>{r.where}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.sec} aria-labelledby="q-h">
          <div className={s.qGrid}>
            <div>
              <h2 data-edit="questions.title" data-edit-format="emphasis" data-edit-max="60" id="q-h" className={s.secTitle}>Questions <em>people ask</em></h2>
              <p data-edit="questions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                And one I will not answer: how it is done. A magician who
                explains the trick takes the best part away from you.
              </p>
            </div>
            <div className={s.questions}>
              {QUESTIONS.map(([q, a], i) => (
                <details key={q} className={s.question}>
                  <summary data-edit={`questions.qSummary.${i}`} data-edit-max="80" className={s.qSummary}>{q}</summary>
                  <p data-edit={`questions.qAnswer.${i}`} data-edit-max="240" data-edit-multiline className={s.qAnswer}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.bookSec} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div className={s.bookIntro}>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Check a date</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Weddings book eight to twelve months ahead, parties a few weeks.
                Tell me the date and I will answer within a day with a yes and a
                price, or a no and the name of someone good.
              </p>
              <div data-edit-pattern="book.field" data-edit-roles="transparent,2,1,4,3" className={s.deckBack} aria-hidden="true">
                <TabbiedPattern
                  pattern={squaretunnel}
                  palette={BACK}
                  fit="grid"
                  cellSize={36}
                  seed="ferris-hale-back"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <dl className={s.details}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550187261">(555) 018-7261</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:ferris@ferrishale.example">ferris@ferrishale.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Studio</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>12 Lantern Court, Riverside, by appointment</dd>
                </div>
                <div>
                  <dt data-edit="book.term4" data-edit-max="28">Calls</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Monday to Friday, 10:00-6:00</dd>
                </div>
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="fh-name">Your name</label>
                <input id="fh-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="fh-email">Email</label>
                <input id="fh-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="fh-date">Date of the event</label>
                <input id="fh-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="fh-kind">Kind of event</label>
                <select id="fh-kind" name="kind" defaultValue="wedding">
                  <option value="wedding">Wedding</option>
                  <option value="party">Private party</option>
                  <option value="corporate">Corporate event</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="fh-guests">Number of guests</label>
                <input id="fh-guests" name="guests" type="number" min="1" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label6" htmlFor="fh-where">Venue or town</label>
                <input id="fh-where" name="where" type="text" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label7" htmlFor="fh-note">Anything else</label>
                <textarea id="fh-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Ask about the date</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,3,4" className={s.footCard} aria-hidden="true">
            <TabbiedPattern
              pattern={squaretunnel}
              palette={CORRIDOR}
              fit="grid"
              cellSize={28}
              seed="ferris-hale-foot"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.footText}>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Ferris Hale</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional close-up magician. The performer, clients, prices and address are invented.</p>
            <p>
              Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
