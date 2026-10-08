import { TabbiedPattern } from 'tabbied/react';
import { kawung } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './two-chairs-counseling.module.css';

export const metadata = {
  title: 'Two Chairs Counseling: Couples therapy on Larch Street and online',
  description:
    'Couples counseling with Ruth Ellery, LMFT. What sessions are like, the first three meetings, fees and insurance, and two-day intensives for couples who need more than an hour a week.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Blush walls,
   a plum frame on every chair, and a batik of rose, ochre and indigo on
   the cushions. The kawung's four ovals closing into one flower is the
   practice's mark: two of you, held in one pattern. */
const BLUSH = '#f5ece6';
const PLUM = '#3b2236';
const ROSE = '#c46a6f';
const OCHRE = '#d39b4a';
const INDIGO = '#3d4f7a';

const CUSHION_A = ['transparent', PLUM, ROSE, OCHRE, INDIGO];
const CUSHION_B = ['transparent', PLUM, INDIGO, ROSE, OCHRE];
const BATIK = ['transparent', OCHRE, ROSE, BLUSH, INDIGO];

const NAV = [
  ['Sessions', '#sessions'],
  ['First meetings', '#first'],
  ['Fees', '#fees'],
  ['Intensives', '#intensives'],
  ['Contact', '#contact'],
];

type Exchange = { one: string; other: string; reply: string };

/* What each of you might be thinking on the way in, and the answer. */
const EXCHANGES: Exchange[] = [
  {
    one: 'You will just take their side.',
    other: 'You will tell us it is hopeless.',
    reply: 'Neither. I am on the side of the two of you, and I say so out loud when one of you is not being heard. Hopeless is rare. Late is common, and late is still workable.',
  },
  {
    one: 'I do not want to air everything in front of a stranger.',
    other: 'I want to finally say all of it.',
    reply: 'Both are allowed. We go at the pace of the slower of you, and nothing is said in the room that you have not chosen to say.',
  },
  {
    one: 'What if we just fight in your office?',
    other: 'What if we just sit there in silence?',
    reply: 'A fight in the room is useful: I can slow it down and show you the pattern you both keep falling into. Silence is useful too. That is when I ask questions.',
  },
  {
    one: 'How long will this take?',
    other: 'Can we afford it?',
    reply: 'Most couples come for 12 to 20 sessions, weekly at first and then every other week. The fees are below, with an honest word on insurance.',
  },
];

type Meeting = { n: string; who: string; length: string; title: string; text: string; seats: string };

const MEETINGS: Meeting[] = [
  { n: 'First', who: 'Both of you', length: '80 minutes', title: 'The story so far', text: 'How you met, what is good, what keeps going wrong, and what made you call now. You each fill in a short questionnaire at home first.', seats: 'both' },
  { n: 'Second', who: 'Each of you alone', length: '50 minutes each', title: 'Your own chair', text: 'One hour each, on separate days. Your history, your family, and anything you find hard to say with your partner in the room.', seats: 'one' },
  { n: 'Third', who: 'Both of you', length: '80 minutes', title: 'What I see, and a plan', text: 'I tell you plainly what I see between you, what I think will help, and how long it should take. Then you decide whether to go on.', seats: 'both' },
];

const FEES = [
  ['First meeting, together', '80 min', '$240'],
  ['Individual meetings', '50 min each', '$165'],
  ['Couples session', '50 min', '$165'],
  ['Extended couples session', '80 min', '$240'],
  ['Two-day intensive', '12 hours', '$2,900'],
];

const INSURANCE = [
  ['Do you take insurance?', 'I am out of network with every plan. Couples work is rarely covered, because insurers pay to treat one person\'s diagnosis, not a relationship.'],
  ['Can I claim it back?', 'I give you a superbill each month. I will tell you honestly whether sending it is worth your time, and I will never write a diagnosis just to make a claim work.'],
  ['Is there a sliding scale?', 'Six weekly places at $90 to $140 a session, for couples whose household income is under $70,000. Ask on the first call; there is no paperwork.'],
  ['What if we cancel?', 'Cancel or move a session up to 48 hours ahead at no charge. Inside 48 hours the full fee applies, once a year waived.'],
];

const INTENSIVE_DAYS = [
  ['Day one, morning', '9:00-12:30', 'Your history as a couple, mapped on paper together, and the argument you keep having, slowed down until it makes sense.'],
  ['Day one, afternoon', '2:00-4:30', 'The individual pieces: each of you with me alone for an hour, then together again.'],
  ['Day two, morning', '9:00-12:30', 'Repair: the conversation you have not been able to have, with me in the room to keep it safe.'],
  ['Day two, afternoon', '2:00-4:30', 'A written plan to take home, and a follow-up session booked for four weeks later.'],
];

const HOURS = [
  ['Monday to Thursday', '10:00-8:00'],
  ['Friday', '9:00-3:00'],
  ['Saturday', 'Two morning sessions'],
];

export default function TwoChairsCounselingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--blush': '#f5ece6',
        '--plum': '#3b2236',
        '--rose': '#c46a6f',
        '--ochre': '#d39b4a',
        '--indigo': '#3d4f7a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="blush,plum,rose,ochre,indigo"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400;1,500&family=Outfit:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandSeats} aria-hidden="true">
            <span />
            <span />
          </span>
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Two Chairs</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Counseling</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#contact">Book a free call</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={`${s.chair} ${s.chairOne}`}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,1,2,3,4" className={s.cushion} aria-hidden="true">
              <TabbiedPattern
                pattern={kawung}
                palette={CUSHION_A}
                fit="grid"
                cellSize={46}
                seed="twochairs-one"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Couples counseling, Larch Street and online</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Two of you, <em>one conversation.</em>
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              For partners who keep having the same argument, who have stopped
              arguing at all, or who want help before something breaks. Two
              chairs, a quiet room, and someone who listens to both.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#contact">Book a free 15-minute call</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#fees">Fees and insurance</a>
            </div>
            <p data-edit="intro.heroWho" data-edit-max="240" data-edit-multiline className={s.heroWho}>Ruth Ellery, LMFT. Fourteen years with couples of every kind.</p>
          </div>
          <div className={`${s.chair} ${s.chairOther}`}>
            <div data-edit-pattern="intro.field2" data-edit-roles="transparent,1,4,2,3" className={s.cushion} aria-hidden="true">
              <TabbiedPattern
                pattern={kawung}
                palette={CUSHION_B}
                fit="grid"
                cellSize={46}
                seed="twochairs-other"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        <section id="sessions" className={s.sec} aria-labelledby="sessions-h">
          <div className={s.secHead}>
            <h2 data-edit="sessions.secTitle" data-edit-max="60" id="sessions-h" className={s.secTitle}>What sessions are like</h2>
            <p data-edit="sessions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most couples arrive with two different worries. Here are the ones
              I hear most often, side by side, and what I tell them.
            </p>
          </div>
          <ol className={s.exchanges}>
            {EXCHANGES.map((x, i) => (
              <li key={x.one} className={s.exchange}>
                <blockquote className={s.voiceOne}>
                  <p data-edit={`sessions.voiceLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.voiceLabel}>One of you</p>
                  <p data-edit={`sessions.voiceText.${i}`} data-edit-max="240" data-edit-multiline className={s.voiceText}>{x.one}</p>
                </blockquote>
                <blockquote className={s.voiceOther}>
                  <p data-edit={`sessions.voiceLabel2.${i}`} data-edit-max="240" data-edit-multiline className={s.voiceLabel}>The other</p>
                  <p data-edit={`sessions.voiceText2.${i}`} data-edit-max="240" data-edit-multiline className={s.voiceText}>{x.other}</p>
                </blockquote>
                <div className={s.reply}>
                  <p data-edit={`sessions.replyLabel.${i}`} data-edit-max="240" data-edit-multiline className={s.replyLabel}>Ruth</p>
                  <p data-edit={`sessions.replyText.${i}`} data-edit-max="240" data-edit-multiline className={s.replyText}>{x.reply}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="first" className={s.sec} aria-labelledby="first-h">
          <div className={s.secHead}>
            <h2 data-edit="first.secTitle" data-edit-max="60" id="first-h" className={s.secTitle}>The first three meetings</h2>
            <p data-edit="first.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Before we start the work, we take three meetings to understand
              it. After the third you will know what I think, and whether you
              want to go on.
            </p>
          </div>
          <ol className={s.meetings}>
            {MEETINGS.map((m, i) => (
              <li key={m.n} className={s.meeting}>
                <div className={`${s.seats} ${m.seats === 'one' ? s.seatsOne : s.seatsBoth}`} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p className={s.meetingN}>{m.n} meeting</p>
                <h3 data-edit={`first.meetingTitle.${i}`} data-edit-max="40" className={s.meetingTitle}>{m.title}</h3>
                <p className={s.meetingWho}>
                  <span data-edit={`first.text.${i}`} data-edit-max="60">{m.who}</span>
                  <span data-edit={`first.text2.${i}`} data-edit-max="60">{m.length}</span>
                </p>
                <p data-edit={`first.meetingText.${i}`} data-edit-max="240" data-edit-multiline className={s.meetingText}>{m.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,1,2,3,4" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={kawung}
            palette={CUSHION_A}
            fit="grid"
            cellSize={38}
            seed="twochairs-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.feesGrid}>
            <div className={s.feesList}>
              <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>Fees and insurance</h2>
              <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Paid by card at the end of each session. HSA and FSA cards welcome.</p>
              <table className={s.fees}>
                <caption data-edit="fees.srOnly" className={s.srOnly}>Session fees</caption>
                <thead>
                  <tr>
                    <th data-edit="fees.heading" scope="col">Session</th>
                    <th data-edit="fees.heading2" scope="col">Length</th>
                    <th data-edit="fees.heading3" scope="col">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map(([what, len, fee], i) => (
                    <tr key={what}>
                      <th data-edit={`fees.heading4.${i}`} scope="row">{what}</th>
                      <td data-edit={`fees.cell.${i}`}>{len}</td>
                      <td data-edit={`fees.cell2.${i}`}>{fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <dl className={s.insurance}>
              {INSURANCE.map(([q, a], i) => (
                <div key={q}>
                  <dt data-edit={`fees.term.${i}`} data-edit-max="28">{q}</dt>
                  <dd data-edit={`fees.body.${i}`} data-edit-max="200" data-edit-multiline>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="intensives" className={s.intensive} aria-labelledby="intensives-h">
          <div className={s.intensiveGrid}>
            <div className={s.intensiveHead}>
              <p data-edit="intensives.intensiveKicker" data-edit-max="240" data-edit-multiline className={s.intensiveKicker}>Two days, twelve hours</p>
              <h2 data-edit="intensives.intensiveTitle" data-edit-max="60" id="intensives-h" className={s.intensiveTitle}>Intensives</h2>
              <p data-edit="intensives.intensiveLead" data-edit-max="240" data-edit-multiline className={s.intensiveLead}>
                Six months of weekly sessions, in two days. For couples who live
                far away, who are deciding whether to stay together, or who are
                in the weeks after an affair has come to light.
              </p>
              <p data-edit="intensives.intensivePrice" data-edit-max="240" data-edit-multiline className={s.intensivePrice}>$2,900</p>
              <p data-edit="intensives.intensiveNote" data-edit-max="240" data-edit-multiline className={s.intensiveNote}>Includes a 90-minute assessment beforehand and a follow-up session four weeks after.</p>
              <div data-edit-pattern="intensives.field" data-edit-roles="transparent,3,2,0,4" className={s.batik} aria-hidden="true">
                <TabbiedPattern
                  pattern={kawung}
                  palette={BATIK}
                  fit="grid"
                  cellSize={42}
                  seed="twochairs-intensive"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ol className={s.schedule}>
              {INTENSIVE_DAYS.map(([part, time, text], i) => (
                <li key={part}>
                  <p data-edit={`intensives.scheduleTime.${i}`} data-edit-max="240" data-edit-multiline className={s.scheduleTime}>{time}</p>
                  <h3 data-edit={`intensives.schedulePart.${i}`} data-edit-max="40" className={s.schedulePart}>{part}</h3>
                  <p data-edit={`intensives.scheduleText.${i}`} data-edit-max="240" data-edit-multiline className={s.scheduleText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Start with a phone call</h2>
              <p data-edit="contact.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Fifteen minutes, free, with both of you on the line if you can.
                I will ask what is going on, answer your questions, and tell you
                if I am the right person. If I am not, I will name someone who is.
              </p>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>31 Larch Street, second floor</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Alder Falls, ST 40562. Side door, no sign; ring Two Chairs.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550562020">(555) 056-2020</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:ruth@twochairs.example">ruth@twochairs.example</a>
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
              <p data-edit="contact.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Ask for a call</p>
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="tc-name">Your name</label>
                <input id="tc-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="tc-partner">Your partner's name</label>
                <input id="tc-partner" name="partner" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="tc-phone">Phone</label>
                <input id="tc-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="tc-email">Email</label>
                <input id="tc-email" name="email" type="email" autoComplete="email" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">We would like to meet</legend>
                <div className={s.picks}>
                  <input id="tc-room" name="where" type="radio" value="room" />
                  <label data-edit="contact.label5" htmlFor="tc-room">In the room</label>
                  <input id="tc-online" name="where" type="radio" value="online" />
                  <label data-edit="contact.label6" htmlFor="tc-online">Online</label>
                  <input id="tc-either" name="where" type="radio" value="either" />
                  <label data-edit="contact.label7" htmlFor="tc-either">Either</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label8" htmlFor="tc-time">Best times to call</label>
                <input id="tc-time" name="time" type="text" />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a call</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>
                Keep it short: email is not private. If you or anyone at home is
                in danger, call 911 now.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,4,2,3" className={s.footBand} aria-hidden="true">
          <TabbiedPattern
            pattern={kawung}
            palette={CUSHION_B}
            fit="grid"
            cellSize={34}
            seed="twochairs-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Two Chairs Counseling</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Ruth Ellery, LMFT, license 0083145. 31 Larch Street, Alder Falls.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>
            Two Chairs Counseling is a fictional practice: the names, people,
            prices and address on this page are invented, and nothing here is
            medical advice.
          </p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
