import { TabbiedPattern } from 'tabbied/react';
import { contourlines, gyre } from 'tabbied/patterns';
import s from './quiet-harbor.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Quiet Harbor Counseling: Individual and couples therapy, Wharf Lane',
  description:
    'Quiet Harbor Counseling is a small private therapy practice for adults and couples, in person on Wharf Lane and online. A letter about who I see, how I work, fees and the sliding scale.',
};

/* Site colors, the same five as the stylesheet's root rule. Both fields
   take `transparent` first, so the lines are drawn straight on the paper. */
const INK = '#2C2E33';
const HARBOR = '#5C7A8C';
const GRAY = '#9EA1A6';
const PALE = '#E6E5E0';

const CHART = ['transparent', HARBOR, GRAY, PALE];
const SEAL = ['transparent', HARBOR, GRAY, INK];

const NAV = [
  ['Who I see', '#who'],
  ['How I work', '#how'],
  ['Fees', '#fees'],
  ['Questions', '#questions'],
  ['Write to me', '#contact'],
];

const WHO = [
  'Anxiety that has quietly taken over more of the day than it used to',
  'Grief, whether the loss was last month or twenty years ago',
  'Burnout, and the question of what work is for',
  'Couples who keep having the same argument',
  'Big changes: a new baby, a divorce, a move, retirement',
  'People who tried therapy before and found it did not help',
];

const FIRST = [
  ['Before', 'A free fifteen-minute call, so you can hear my voice and ask anything. Then a short form, which you can leave half empty.'],
  ['During', 'Fifty minutes. I will ask what brought you, and you can answer as much or as little as you like. You do not need to know where to start.'],
  ['After', 'You go away and see how it sat with you. There is no pressure to book a second session there and then.'],
];

const FEES = [
  ['Individual therapy', '50 minutes', '$150'],
  ['Couples therapy', '75 minutes', '$210'],
  ['First phone call', '15 minutes', 'Free'],
  ['Sliding scale places', '50 minutes', '$60-140'],
];

const PRACTICAL = [
  ['In person', 'Tuesdays to Thursdays, 9 am-7 pm, at 14 Wharf Lane, Suite 3. The room is above the chandlery, up one flight of stairs.'],
  ['Online', 'Mondays and Fridays, 8 am-4 pm, by secure video, for anyone living in the state.'],
  ['Waiting time', 'Usually two to three weeks. If I have no space, I will say so and suggest colleagues who do.'],
  ['Messages', 'I reply within two working days. I do not offer therapy by email or text.'],
];

const FAQ = [
  {
    q: 'How many sessions will I need?',
    a: 'Some people come for six sessions with one thing in mind. Others stay for a year or two. We look back together every couple of months, and you can stop whenever you like.',
  },
  {
    q: 'What if we are not a good fit?',
    a: "Then I would rather you told me. It is common, it is nobody's failure, and I will help you find someone who suits you better.",
  },
  {
    q: 'Is what I say confidential?',
    a: 'Yes, with the exceptions the law sets: if I believe you or someone else is in serious danger, or a child or a vulnerable adult is being harmed. I explain these in the first session.',
  },
  {
    q: 'Can you prescribe medication?',
    a: 'No. I can work alongside your doctor or a psychiatrist, and with your permission I will speak to them.',
  },
  {
    q: 'Do you see teenagers?',
    a: 'I see adults, eighteen and over. For younger people I can recommend two colleagues nearby whom I trust.',
  },
  {
    q: 'Can my partner come to some of my sessions?',
    a: 'Occasionally, if it would help and we agree it beforehand. If you both want couples therapy, it is usually better to start fresh with that as the aim.',
  },
];

const TIMES = ['Weekday mornings', 'Weekday afternoons', 'Early evenings'];

export default function QuietHarborPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Figtree:wght@400;500;600&display=swap"
      />

      <p className={s.crisisLine}>
        <span>In crisis right now? Call or text 988, or call 911. </span>
        <a href="#crisis">More help</a>
      </p>

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markName}>Quiet Harbor</span>
          <span className={s.markKind}>Counseling</span>
        </a>
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
        {/* ------------------------------------------------------ LETTERHEAD
            A survey chart of the harbor, rings of equal spacing, fading out
            at both ends. It is the only thing on the page that is not text. */}
        <div className={s.chart} aria-hidden="true">
          <div className={s.chartField}>
            <TabbiedPattern
              pattern={contourlines}
              palette={CHART}
              options={{ frequency: 0.55 }}
              fit="grid"
              cellSize={40}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>

        {/* --------------------------------------------------------- OPENING */}
        <section className={s.part} aria-labelledby="opening-h">
          <div className={s.side}>
            <p className={s.dateline}>Wharf Lane, September</p>
          </div>
          <div className={s.body}>
            <p className={s.kicker}>Individual and couples therapy</p>
            <h1 id="opening-h" className={s.title}>
              Before we meet, <em>a letter.</em>
            </h1>
            <p className={s.salute}>Hello,</p>
            <p>
              If you are reading this, something has probably been heavy for
              a while, and you have started to wonder whether talking to
              someone might help. I think it often does, and I am glad you
              are looking.
            </p>
            <p>
              My name is Nora Ellison. I am a licensed clinical social worker,
              and I have been a therapist for fourteen years, the last eight
              of them here, in two quiet rooms above the chandlery on Wharf
              Lane. I work alone, so the person who answers the phone is the
              person you will see.
            </p>
            <p>
              I have written this page as a letter because the first contact
              is the hardest part, and I wanted you to know a little about me
              before you have to say anything about yourself.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- WHO */}
        <section id="who" className={s.part} aria-labelledby="who-h">
          <div className={s.side}>
            <h2 id="who-h" className={s.sideHead}>Who I work with</h2>
          </div>
          <div className={s.body}>
            <p>
              I see adults on their own and couples of every kind. The people
              who come to me are rarely in the middle of a catastrophe. More
              often they are managing, from the outside, and tired of how much
              effort that takes. Most often it is one of these:
            </p>
            <ul className={s.dashList}>
              {WHO.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <p>
              There are things I do not treat, among them eating disorders
              that need medical care and active addiction. If that is what is
              happening, I will not leave you with nothing: I know good people
              who do this work, and I will introduce you.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- HOW */}
        <section id="how" className={s.part} aria-labelledby="how-h">
          <div className={s.side}>
            <h2 id="how-h" className={s.sideHead}>How I work</h2>
          </div>
          <div className={s.body}>
            <p>
              Mostly, I listen, and then I say what I notice. I will not sit in
              silence while you wonder what I am thinking, and I will not hand
              you worksheets unless they would genuinely help.
            </p>
            <p>
              The methods I draw on have long names: acceptance and commitment
              therapy, cognitive behavioral therapy, and for couples,
              emotionally focused therapy. In the room they look like an
              ordinary, careful conversation that slowly gets somewhere.
            </p>
            <blockquote className={s.pull}>
              <p>You do not have to arrive with the right words. Finding them is part of the work.</p>
            </blockquote>
          </div>
        </section>

        {/* ----------------------------------------------------------- FIRST */}
        <section id="first" className={s.part} aria-labelledby="first-h">
          <div className={s.side}>
            <h2 id="first-h" className={s.sideHead}>A first session</h2>
          </div>
          <div className={s.body}>
            <p>
              People tell me the worst part is the waiting room, so there is
              not one: I open the door at the time we agreed, and we go
              straight up.
            </p>
            <dl className={s.firstList}>
              {FIRST.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.part} aria-labelledby="fees-h">
          <div className={s.side}>
            <h2 id="fees-h" className={s.sideHead}>Fees and the sliding scale</h2>
          </div>
          <div className={s.body}>
            <table className={s.fees}>
              <caption className={s.srOnly}>Session fees</caption>
              <tbody>
                {FEES.map(([name, length, price]) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td className={s.feeLen}>{length}</td>
                    <td className={s.feePrice}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              Eight of my weekly hours are kept for a sliding scale, from $60
              to $140 a session. You choose where you sit on it, and I will not
              ask you to prove anything.
            </p>
            <p>
              I am not in network with any insurer. Each month I give you a
              superbill to claim back from your plan, and HSA and FSA cards are
              fine. I ask for 48 hours notice to cancel; illness and
              emergencies are always the exception.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------- PRACTICAL */}
        <section id="practical" className={s.part} aria-labelledby="practical-h">
          <div className={s.side}>
            <h2 id="practical-h" className={s.sideHead}>Online and in person</h2>
          </div>
          <div className={s.body}>
            <dl className={s.practical}>
              {PRACTICAL.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.part} aria-labelledby="questions-h">
          <div className={s.side}>
            <h2 id="questions-h" className={s.sideHead}>Questions people ask</h2>
          </div>
          <div className={s.body}>
            <div className={s.faq}>
              {FAQ.map((f) => (
                <details key={f.q} className={s.faqItem}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- CRISIS */}
        <section id="crisis" className={s.part} aria-labelledby="crisis-h">
          <div className={s.side}>
            <h2 id="crisis-h" className={s.sideHead}>If you are in crisis</h2>
          </div>
          <div className={s.body}>
            <aside className={s.crisis}>
              <p className={s.crisisLead}>Please do not wait for a reply from me.</p>
              <p>
                I am not an emergency service, and I do not check messages in
                the evenings or at weekends. If you are thinking about ending
                your life, or you are in danger now:
              </p>
              <ul className={s.crisisList}>
                <li>
                  <span>Call or text </span>
                  <a href="tel:988">988</a>
                  <span>, the Suicide and Crisis Lifeline, at any hour</span>
                </li>
                <li>
                  <span>Call </span>
                  <a href="tel:911">911</a>
                  <span>, or go to your nearest emergency room</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* -------------------------------------------------------- SIGN-OFF */}
        <div className={s.part}>
          <div className={s.side}>
            <div className={s.seal} aria-hidden="true">
              <TabbiedPattern
                pattern={gyre}
                palette={SEAL}
                options={{ frequency: 0.8 }}
                fit="grid"
                cellSize={24}
                seed="quiet-harbor-seal"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
          <div className={s.body}>
            <p>
              Whatever you decide, thank you for reading this far. If you would
              like to talk, the note below comes straight to me.
            </p>
            <p className={s.closing}>Warmly,</p>
            <p className={s.signature}>Nora Ellison</p>
            <p className={s.credential}>Licensed clinical social worker, license no. 00-000000</p>
          </div>
        </div>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.part} aria-labelledby="contact-h">
          <div className={s.side}>
            <h2 id="contact-h" className={s.sideHead}>P.S. Write to me</h2>
          </div>
          <div className={s.body}>
            <form className={s.form} action="#">
              <div className={s.row}>
                <label className={s.field}>
                  <span>Your name, or what I should call you</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className={s.field}>
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
              </div>
              <label className={s.field}>
                <span>Phone, if you would rather I called</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className={s.field}>
                <span>Anything you would like me to know (optional)</span>
                <textarea name="note" rows={4} />
              </label>
              <fieldset className={s.choices}>
                <legend>I would like to meet</legend>
                <label>
                  <input type="radio" name="where" value="in-person" defaultChecked />
                  <span>In person</span>
                </label>
                <label>
                  <input type="radio" name="where" value="online" />
                  <span>Online</span>
                </label>
                <label>
                  <input type="radio" name="where" value="either" />
                  <span>Either</span>
                </label>
              </fieldset>
              <fieldset className={s.choices}>
                <legend>Times that usually suit me</legend>
                {TIMES.map((t) => (
                  <label key={t}>
                    <input type="checkbox" name="times" value={t} />
                    <span>{t}</span>
                  </label>
                ))}
              </fieldset>
              <div className={s.formFoot}>
                <button type="submit" className={s.send}>Send the note</button>
                <p className={s.formNote}>
                  Please keep it brief, and leave out anything you would not
                  want in an email. I will reply within two working days.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footInner}>
          <div className={s.footCols}>
            <p className={s.footName}>Quiet Harbor Counseling</p>
            <p className={s.footAddr}>
              14 Wharf Lane, Suite 3
              <br />
              Above the chandlery
            </p>
            <ul className={s.footContact}>
              <li>
                <a href="tel:+15550137720">(555) 013-7720</a>
              </li>
              <li>
                <a href="mailto:nora@quietharbor.example">nora@quietharbor.example</a>
              </li>
            </ul>
          </div>
          <div className={s.footFine}>
            <p>A fictional therapy practice. The therapist, fees, hours and license are invented.</p>
            <p>
              <span>Patterns by </span>
              <a href="https://tabbied.com" rel="noopener">Tabbied</a>
              <span>, drawn live on a transparent ground.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
