import { TabbiedPattern } from 'tabbied/react';
import { pyramidrelief } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './plinth-wealth.module.css';

export const metadata = {
  title: 'Plinth Wealth Partners: Fee-only investment advisers, Exchange Row',
  description:
    'Plinth Wealth Partners is a fee-only investment adviser on Exchange Row. Paid only by our clients, fiduciary in writing, with a published percentage fee schedule and a free first meeting.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The pyramid
   relief is carved stone: limestone and sand faces with a bronze shadow.
   It stands in the hero as a plinth, runs as a frieze under the letter,
   holds up the pledge as a column and makes the footer's base course. */
const STONE = '#f3eee5';
const SLATE = '#1f2b33';
const BRONZE = '#8f6239';
const SAND = '#d8c6a6';
const PATINA = '#4c7a6e';

const RELIEF = ['transparent', SAND, BRONZE, SLATE];
const FRIEZE = ['transparent', SAND, BRONZE, SLATE];
const COLUMN = ['transparent', SAND, PATINA, SLATE];

const NAV = [
  ['The letter', '#letter'],
  ['Our pledge', '#pledge'],
  ['Fees', '#fees'],
  ['First meeting', '#meeting'],
  ['Contact', '#contact'],
];

const FACTS = [
  ['Households advised', '212'],
  ['Commissions taken', '$0'],
  ['Average client stays', '11 yrs'],
];

const CONTENTS = [
  ['The pledge', '#pledge'],
  ['The fee schedule', '#fees'],
  ['A first meeting', '#meeting'],
];

const PLEDGE = [
  ['I', 'Paid only by you', 'No commissions, no kickbacks, no revenue sharing with any fund company. Our fee is the only money we make from your account.'],
  ['II', 'Fiduciary at all times', 'We act in your interest on every account and every recommendation, and we sign a letter saying so before you hire us.'],
  ['III', 'Your money stays yours', 'Your accounts are held in your name at an independent custodian. We can trade in them; we can never withdraw from them.'],
  ['IV', 'Every cost in dollars', 'Before you act on a recommendation we tell you what it costs, including the funds\' own expenses, in dollars and not in basis points.'],
  ['V', 'Nothing of our own to sell', 'We do not make funds, annuities or insurance. If you need insurance we will tell you what kind and send you to a broker who is not us.'],
  ['VI', 'Free to leave', 'No exit fee, no notice period, no awkward call. Your accounts stay where they are; you simply stop paying us.'],
];

const TIERS = [
  ['First $1,000,000', '0.80%', '0.20%'],
  ['Next $2,000,000', '0.60%', '0.15%'],
  ['Next $2,000,000', '0.40%', '0.10%'],
  ['Above $5,000,000', '0.25%', '0.0625%'],
];

const INCLUDED = [
  'Investment management across every account you hold',
  'Retirement income and Social Security timing',
  'Tax planning, with your preparer copied in',
  'Working with your attorney on your estate plan',
  'An annual review, and as many calls as you need',
];

const EXCLUDED = [
  'The funds\' own expenses, 0.07% on average in our portfolios',
  'Preparing your tax return',
  'Drafting wills and trusts',
];

const STEPS = [
  ['A twenty-minute call', 'Free', 'We ask what made you start looking, and you ask whatever you like. If we are not the right fit we say so, and suggest who might be.'],
  ['The first meeting', '90 minutes, free', 'At our table on Exchange Row or by video. Bring your statements, your last tax return and your questions. We mostly listen.'],
  ['A written proposal', 'Two weeks later', 'What we would change and why, what it would cost you in dollars, and what we would leave alone. It is yours to keep either way.'],
  ['Then you decide', 'In your own time', 'No follow-up sales calls. If you go ahead, moving accounts takes about three weeks and nothing is sold to do it.'],
];

const HOURS = [
  ['Monday to Thursday', '8:30-5:00'],
  ['Friday', '8:30-1:00'],
  ['Evenings', 'By appointment'],
];

export default function PlinthWealthPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--stone': '#f3eee5',
        '--slate': '#1f2b33',
        '--bronze': '#8f6239',
        '--sand': '#d8c6a6',
        '--patina': '#4c7a6e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="stone,slate,bronze,sand,patina"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Plinth</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Wealth Partners</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#contact">Book a first meeting</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The firm's name, made literal: a stepped plinth cut out of the
            relief, with its inscription set into the die. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Fee-only investment advisers, 40 Exchange Row</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Paid by you, <em>and only by you.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Plinth manages investments and plans retirements for 212
              households. We sell nothing, take no commissions, and put our
              duty to you in writing. What we charge is a published
              percentage, and it is printed below.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Book a first meeting</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#fees">Read the fee schedule</a>
            </div>
            <dl className={s.heroFacts}>
              {FACTS.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,1" className={s.plinth} aria-hidden="true">
              <TabbiedPattern
                pattern={pyramidrelief}
                palette={RELIEF}
                fit="grid"
                cellSize={46}
                seed="plinth-stone"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.plate}>
              <p data-edit="hero.plateLine" data-edit-max="240" data-edit-multiline className={s.plateLine}>Fiduciary</p>
              <p data-edit="hero.plateSmall" data-edit-max="240" data-edit-multiline className={s.plateSmall}>At all times, in writing, since 2009</p>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,3,2,1" className={s.frieze} aria-hidden="true">
          <TabbiedPattern
            pattern={pyramidrelief}
            palette={FRIEZE}
            fit="grid"
            cellSize={38}
            seed="plinth-frieze"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- LETTER
            The annual letter, printed on the firm's paper, with a margin
            note keeping its place. */}
        <section id="letter" className={s.letterSec} aria-labelledby="letter-h">
          <div className={s.letterGrid}>
            <aside className={s.margin}>
              <p data-edit="margin.marginLabel" data-edit-max="240" data-edit-multiline className={s.marginLabel}>Annual letter</p>
              <p data-edit="margin.marginYear" data-edit-max="240" data-edit-multiline className={s.marginYear}>2026</p>
              <p data-edit="margin.marginNote" data-edit-max="240" data-edit-multiline className={s.marginNote}>Sent to every client each January, and printed here for anyone deciding whether to become one.</p>
              <h3 data-edit="margin.marginHead" data-edit-max="40" className={s.marginHead}>Further on</h3>
              <ol className={s.contents}>
                {CONTENTS.map(([label, href], i) => (
                  <li key={href}>
                    <a data-edit={`margin.link.${i}`} data-edit-max="28" href={href}>{label}</a>
                  </li>
                ))}
              </ol>
            </aside>
            <article className={s.sheet}>
              <div className={s.letterhead}>
                <p data-edit="sheet.lhName" data-edit-max="240" data-edit-multiline className={s.lhName}>Plinth Wealth Partners</p>
                <p data-edit="sheet.lhAddr" data-edit-max="240" data-edit-multiline className={s.lhAddr}>40 Exchange Row, Suite 3, Harbor Hill</p>
              </div>
              <p className={s.dateLine}>
                <time data-edit="sheet.date" dateTime="2026-01-12">12 January 2026</time>
              </p>
              <h2 data-edit="sheet.letterTitle" data-edit-max="60" id="letter-h" className={s.letterTitle}>A letter to our clients</h2>
              <p data-edit="sheet.salute" data-edit-max="240" data-edit-multiline className={s.salute}>Dear friends,</p>
              <p data-edit="sheet.first" data-edit-max="240" data-edit-multiline className={s.first}>
                Every January we write to you about the year, and every year
                the letter says the same thing in new words: our job is to
                keep you invested through the weeks that make people want to
                stop. This year had two of those. Most of you called us in
                April. Very few of you sold, and we are prouder of that than
                of any number.
              </p>
              <p data-edit="sheet.body" data-edit-max="240" data-edit-multiline>
                Three things changed at Plinth. Ana Ruiz joined us as our
                third adviser, so nobody here now looks after more than eighty
                households. We added a second independent custodian, so you
                can choose where your accounts are held. And we lowered our fee
                on assets above five million dollars, for everyone, without
                being asked.
              </p>
              <p data-edit="sheet.body2" data-edit-max="240" data-edit-multiline>
                Three things did not change, and will not. We are paid only by
                you. We hold none of your money. And the fee schedule printed
                below is the one every client pays: there are no private
                discounts and no special arrangements.
              </p>
              <p data-edit="sheet.body3" data-edit-max="240" data-edit-multiline>
                If someone you love is being sold something that pays the
                seller more than it pays them, pass this letter on. A first
                meeting with us is free and comes with no follow-up calls.
              </p>
              <p data-edit="sheet.signoff" data-edit-max="240" data-edit-multiline className={s.signoff}>With thanks for your trust,</p>
              <div className={s.signatures}>
                <div>
                  <p data-edit="sheet.sig" data-edit-max="240" data-edit-multiline className={s.sig}>Margaret Oyelaran</p>
                  <p data-edit="sheet.sigRole" data-edit-max="240" data-edit-multiline className={s.sigRole}>Founding partner, CFP</p>
                </div>
                <div>
                  <p data-edit="sheet.sig2" data-edit-max="240" data-edit-multiline className={s.sig}>Henry Castell</p>
                  <p data-edit="sheet.sigRole2" data-edit-max="240" data-edit-multiline className={s.sigRole}>Partner, CFA</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ---------------------------------------------------------- PLEDGE
            Six promises on the dark stone, beside a column of relief. */}
        <section id="pledge" className={s.pledge} aria-labelledby="pledge-h">
          <div className={s.pledgeGrid}>
            <div data-edit-pattern="pledge.field" data-edit-roles="transparent,3,4,1" className={s.column} aria-hidden="true">
              <TabbiedPattern
                pattern={pyramidrelief}
                palette={COLUMN}
                fit="grid"
                cellSize={40}
                seed="plinth-column"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div>
              <p data-edit="pledge.pledgeKicker" data-edit-max="240" data-edit-multiline className={s.pledgeKicker}>Signed by every adviser, given to every client</p>
              <h2 data-edit="pledge.pledgeTitle" data-edit-max="60" id="pledge-h" className={s.pledgeTitle}>The fiduciary pledge</h2>
              <ol className={s.pledgeList}>
                {PLEDGE.map(([num, title, body], i) => (
                  <li key={num}>
                    <span data-edit={`pledge.numeral.${i}`} data-edit-max="60" className={s.numeral}>{num}</span>
                    <h3 data-edit={`pledge.pledgeHead.${i}`} data-edit-max="40" className={s.pledgeHead}>{title}</h3>
                    <p data-edit={`pledge.pledgeBody.${i}`} data-edit-max="240" data-edit-multiline className={s.pledgeBody}>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>The fee schedule</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              One percentage, charged on the assets we advise on and stepping
              down as they grow, like a tax bracket. Billed each quarter in
              arrears, from the account you choose.
            </p>
          </div>
          <div className={s.feeGrid}>
            <div>
              <table className={s.fees}>
                <caption data-edit="fees.srOnly" className={s.srOnly}>Annual advisory fee by portion of assets</caption>
                <thead>
                  <tr>
                    <th data-edit="fees.heading" scope="col">Portion of assets</th>
                    <th data-edit="fees.heading2" scope="col">Each year</th>
                    <th data-edit="fees.heading3" scope="col">Each quarter</th>
                  </tr>
                </thead>
                <tbody>
                  {TIERS.map(([portion, year, quarter], i) => (
                    <tr key={portion + year}>
                      <th data-edit={`fees.heading4.${i}`} scope="row">{portion}</th>
                      <td data-edit={`fees.cell.${i}`}>{year}</td>
                      <td data-edit={`fees.cell2.${i}`}>{quarter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="fees.minimum" data-edit-max="240" data-edit-multiline className={s.minimum}>Minimum annual fee, $3,000. Planning without investment management: a written plan for a flat $2,400.</p>
              <div className={s.lists}>
                <div>
                  <h3 data-edit="fees.listHead" data-edit-max="40" className={s.listHead}>The fee includes</h3>
                  <ul className={s.inList}>
                    {INCLUDED.map((item, i) => (
                      <li data-edit={`fees.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 data-edit="fees.listHead2" data-edit-max="40" className={s.listHead}>It does not include</h3>
                  <ul className={s.outList}>
                    {EXCLUDED.map((item, i) => (
                      <li data-edit={`fees.item2.${i}`} data-edit-max="80" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <aside className={s.example} aria-labelledby="example-h">
              <p data-edit="example.exampleKicker" data-edit-max="240" data-edit-multiline className={s.exampleKicker}>Worked example</p>
              <h3 data-edit="example.exampleTitle" data-edit-max="40" id="example-h" className={s.exampleTitle}>A $1,500,000 portfolio</h3>
              <dl className={s.sum}>
                <div>
                  <dt data-edit="example.term" data-edit-max="28">First $1,000,000 at 0.80%</dt>
                  <dd data-edit="example.body" data-edit-max="200" data-edit-multiline>$8,000</dd>
                </div>
                <div>
                  <dt data-edit="example.term2" data-edit-max="28">Next $500,000 at 0.60%</dt>
                  <dd data-edit="example.body2" data-edit-max="200" data-edit-multiline>$3,000</dd>
                </div>
                <div className={s.total}>
                  <dt data-edit="example.term3" data-edit-max="28">Fee for the year</dt>
                  <dd data-edit="example.body3" data-edit-max="200" data-edit-multiline>$11,000</dd>
                </div>
                <div>
                  <dt data-edit="example.term4" data-edit-max="28">Each quarter</dt>
                  <dd data-edit="example.body4" data-edit-max="200" data-edit-multiline>$2,750</dd>
                </div>
              </dl>
              <p data-edit="example.exampleNote" data-edit-max="240" data-edit-multiline className={s.exampleNote}>That is 0.73% of the portfolio. The same arithmetic, with your own numbers, is in every proposal we write.</p>
            </aside>
          </div>
        </section>

        {/* --------------------------------------------------------- MEETING
            Four steps, each a course higher, the way a plinth is laid. */}
        <section id="meeting" className={s.meeting} aria-labelledby="meeting-h">
          <div className={s.meetingInner}>
            <div className={s.secHead}>
              <h2 data-edit="meeting.secTitle" data-edit-max="60" id="meeting-h" className={s.secTitle}>How a first meeting goes</h2>
              <p data-edit="meeting.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Nothing to sign and nothing to buy until the last step, and the
                last step is yours alone.
              </p>
            </div>
            <ol className={s.stairs}>
              {STEPS.map(([title, when, body], i) => (
                <li key={title} className={s.stair}>
                  <span className={s.stepNo}>{`0${i + 1}`}</span>
                  <h3 data-edit={`meeting.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                  <p data-edit={`meeting.stepWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.stepWhen}>{when}</p>
                  <p data-edit={`meeting.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a first meeting</h2>
              <p data-edit="contact.contactLead" data-edit-max="240" data-edit-multiline className={s.contactLead}>
                Tell us a little and one of the partners will call within two
                working days to find a time. If you would rather simply talk,
                call the office.
              </p>
              <dl className={s.details}>
                <div>
                  <dt data-edit="contact.term" data-edit-max="28">Office</dt>
                  <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>40 Exchange Row, Suite 3, Harbor Hill</dd>
                </div>
                <div>
                  <dt data-edit="contact.term2" data-edit-max="28">Telephone</dt>
                  <dd>
                    <a data-edit="contact.link" data-edit-max="28" href="tel:+15550162290">(555) 016-2290</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="contact.link2" data-edit-max="28" href="mailto:office@plinthwealth.example">office@plinthwealth.example</a>
                  </dd>
                </div>
              </dl>
              <h3 data-edit="contact.hoursHead" data-edit-max="40" className={s.hoursHead}>Office hours</h3>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`contact.term4.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`contact.body2.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="pw-name">Your name</label>
                <input id="pw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="pw-email">Email</label>
                <input id="pw-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="pw-phone">Phone</label>
                <input id="pw-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="pw-assets">Roughly how much to invest</label>
                <input id="pw-assets" name="assets" type="text" inputMode="numeric" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label5" htmlFor="pw-note">What made you start looking</label>
                <textarea id="pw-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a meeting</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We reply from a person, never a list. Your details are not shared with anyone.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,1" className={s.base} aria-hidden="true">
          <TabbiedPattern
            pattern={pyramidrelief}
            palette={FRIEZE}
            fit="grid"
            cellSize={32}
            seed="plinth-base"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Plinth Wealth Partners</p>
            <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>Fee-only investment advisers, 40 Exchange Row</p>
          </div>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>
            A fictional firm: the names, people, prices and address are
            invented, and nothing here is financial advice.
          </p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
