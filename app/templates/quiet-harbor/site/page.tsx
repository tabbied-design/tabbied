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
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f4f3f0',
        '--ink': '#2c2e33',
        '--harbor': '#5c7a8c',
        '--gray': '#9ea1a6',
        '--pale': '#e6e5e0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,ink,harbor,gray,pale"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Figtree:wght@400;500;600&display=swap"
      />

      <p className={s.crisisLine}>
        <span data-edit="page.text" data-edit-max="60">In crisis right now? Call or text 988, or call 911. </span>
        <a data-edit="page.crisis" data-edit-max="28" href="#crisis">More help</a>
      </p>

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Quiet Harbor</span>
          <span data-edit="bar.markKind" data-edit-max="60" className={s.markKind}>Counseling</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------ LETTERHEAD
            A survey chart of the harbor, rings of equal spacing, fading out
            at both ends. It is the only thing on the page that is not text. */}
        <div className={s.chart} aria-hidden="true">
          <div data-edit-pattern="top.field" data-edit-roles="transparent,2,3,4" className={s.chartField}>
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
            <p data-edit="opening.dateline" data-edit-max="240" data-edit-multiline className={s.dateline}>Wharf Lane, September</p>
          </div>
          <div className={s.body}>
            <p data-edit="opening.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Individual and couples therapy</p>
            <h1 data-edit="opening.title" data-edit-format="emphasis" data-edit-max="70" id="opening-h" className={s.title}>
              Before we meet, <em>a letter.</em>
            </h1>
            <p data-edit="opening.salute" data-edit-max="240" data-edit-multiline className={s.salute}>Hello,</p>
            <p data-edit="opening.body" data-edit-max="240" data-edit-multiline>
              If you are reading this, something has probably been heavy for
              a while, and you have started to wonder whether talking to
              someone might help. I think it often does, and I am glad you
              are looking.
            </p>
            <p data-edit="opening.body2" data-edit-max="240" data-edit-multiline>
              My name is Nora Ellison. I am a licensed clinical social worker,
              and I have been a therapist for fourteen years, the last eight
              of them here, in two quiet rooms above the chandlery on Wharf
              Lane. I work alone, so the person who answers the phone is the
              person you will see.
            </p>
            <p data-edit="opening.body3" data-edit-max="240" data-edit-multiline>
              I have written this page as a letter because the first contact
              is the hardest part, and I wanted you to know a little about me
              before you have to say anything about yourself.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- WHO */}
        <section id="who" className={s.part} aria-labelledby="who-h">
          <div className={s.side}>
            <h2 data-edit="who.sideHead" data-edit-max="60" id="who-h" className={s.sideHead}>Who I work with</h2>
          </div>
          <div className={s.body}>
            <p data-edit="who.body" data-edit-max="240" data-edit-multiline>
              I see adults on their own and couples of every kind. The people
              who come to me are rarely in the middle of a catastrophe. More
              often they are managing, from the outside, and tired of how much
              effort that takes. Most often it is one of these:
            </p>
            <ul className={s.dashList}>
              {WHO.map((w, i) => (
                <li data-edit={`who.item.${i}`} data-edit-max="80" key={w}>{w}</li>
              ))}
            </ul>
            <p data-edit="who.body2" data-edit-max="240" data-edit-multiline>
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
            <h2 data-edit="how.sideHead" data-edit-max="60" id="how-h" className={s.sideHead}>How I work</h2>
          </div>
          <div className={s.body}>
            <p data-edit="how.body" data-edit-max="240" data-edit-multiline>
              Mostly, I listen, and then I say what I notice. I will not sit in
              silence while you wonder what I am thinking, and I will not hand
              you worksheets unless they would genuinely help.
            </p>
            <p data-edit="how.body2" data-edit-max="240" data-edit-multiline>
              The methods I draw on have long names: acceptance and commitment
              therapy, cognitive behavioral therapy, and for couples,
              emotionally focused therapy. In the room they look like an
              ordinary, careful conversation that slowly gets somewhere.
            </p>
            <blockquote className={s.pull}>
              <p data-edit="how.body3" data-edit-max="240" data-edit-multiline>You do not have to arrive with the right words. Finding them is part of the work.</p>
            </blockquote>
          </div>
        </section>

        {/* ----------------------------------------------------------- FIRST */}
        <section id="first" className={s.part} aria-labelledby="first-h">
          <div className={s.side}>
            <h2 data-edit="first.sideHead" data-edit-max="60" id="first-h" className={s.sideHead}>A first session</h2>
          </div>
          <div className={s.body}>
            <p data-edit="first.body" data-edit-max="240" data-edit-multiline>
              People tell me the worst part is the waiting room, so there is
              not one: I open the door at the time we agreed, and we go
              straight up.
            </p>
            <dl className={s.firstList}>
              {FIRST.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`first.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`first.body2.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.part} aria-labelledby="fees-h">
          <div className={s.side}>
            <h2 data-edit="fees.sideHead" data-edit-max="60" id="fees-h" className={s.sideHead}>Fees and the sliding scale</h2>
          </div>
          <div className={s.body}>
            <table className={s.fees}>
              <caption data-edit="fees.srOnly" className={s.srOnly}>Session fees</caption>
              <tbody>
                {FEES.map(([name, length, price], i) => (
                  <tr key={name}>
                    <th data-edit={`fees.heading.${i}`} scope="row">{name}</th>
                    <td data-edit={`fees.feeLen.${i}`} className={s.feeLen}>{length}</td>
                    <td data-edit={`fees.feePrice.${i}`} className={s.feePrice}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p data-edit="fees.body" data-edit-max="240" data-edit-multiline>
              Eight of my weekly hours are kept for a sliding scale, from $60
              to $140 a session. You choose where you sit on it, and I will not
              ask you to prove anything.
            </p>
            <p data-edit="fees.body2" data-edit-max="240" data-edit-multiline>
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
            <h2 data-edit="practical.sideHead" data-edit-max="60" id="practical-h" className={s.sideHead}>Online and in person</h2>
          </div>
          <div className={s.body}>
            <dl className={s.practical}>
              {PRACTICAL.map(([k, v], i) => (
                <div key={k}>
                  <dt data-edit={`practical.term.${i}`} data-edit-max="28">{k}</dt>
                  <dd data-edit={`practical.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------- QUESTIONS */}
        <section id="questions" className={s.part} aria-labelledby="questions-h">
          <div className={s.side}>
            <h2 data-edit="questions.sideHead" data-edit-max="60" id="questions-h" className={s.sideHead}>Questions people ask</h2>
          </div>
          <div className={s.body}>
            <div className={s.faq}>
              {FAQ.map((f, i) => (
                <details key={f.q} className={s.faqItem}>
                  <summary data-edit={`questions.question.${i}`} data-edit-max="80">{f.q}</summary>
                  <p data-edit={`questions.body.${i}`} data-edit-max="240" data-edit-multiline>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- CRISIS */}
        <section id="crisis" className={s.part} aria-labelledby="crisis-h">
          <div className={s.side}>
            <h2 data-edit="crisis.sideHead" data-edit-max="60" id="crisis-h" className={s.sideHead}>If you are in crisis</h2>
          </div>
          <div className={s.body}>
            <aside className={s.crisis}>
              <p data-edit="crisis.crisisLead" data-edit-max="240" data-edit-multiline className={s.crisisLead}>Please do not wait for a reply from me.</p>
              <p data-edit="crisis.body" data-edit-max="240" data-edit-multiline>
                I am not an emergency service, and I do not check messages in
                the evenings or at weekends. If you are thinking about ending
                your life, or you are in danger now:
              </p>
              <ul className={s.crisisList}>
                <li>
                  <span data-edit="crisis.text" data-edit-max="60">Call or text </span>
                  <a data-edit="crisis.link" data-edit-max="28" href="tel:988">988</a>
                  <span data-edit="crisis.text2" data-edit-max="60">, the Suicide and Crisis Lifeline, at any hour</span>
                </li>
                <li>
                  <span data-edit="crisis.text3" data-edit-max="60">Call </span>
                  <a data-edit="crisis.link2" data-edit-max="28" href="tel:911">911</a>
                  <span data-edit="crisis.text4" data-edit-max="60">, or go to your nearest emergency room</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* -------------------------------------------------------- SIGN-OFF */}
        <div className={`${s.part} ${s.signoff}`}>
          <div className={s.side}>
            <div data-edit-pattern="top.field2" data-edit-roles="transparent,2,3,1" className={s.seal} aria-hidden="true">
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
            <p data-edit="top.body" data-edit-max="240" data-edit-multiline>
              Whatever you decide, thank you for reading this far. If you would
              like to talk, the note below comes straight to me.
            </p>
            <p data-edit="top.closing" data-edit-max="240" data-edit-multiline className={s.closing}>Warmly,</p>
            <p data-edit="top.signature" data-edit-max="240" data-edit-multiline className={s.signature}>Nora Ellison</p>
            <p data-edit="top.credential" data-edit-max="240" data-edit-multiline className={s.credential}>Licensed clinical social worker, license no. 00-000000</p>
          </div>
        </div>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.part} aria-labelledby="contact-h">
          <div className={s.side}>
            <h2 data-edit="contact.sideHead" data-edit-max="60" id="contact-h" className={s.sideHead}>P.S. Write to me</h2>
          </div>
          <div className={s.body}>
            <form className={s.form} action="#">
              <div className={s.row}>
                <label className={s.field}>
                  <span data-edit="contact.text" data-edit-max="60">Your name, or what I should call you</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className={s.field}>
                  <span data-edit="contact.text2" data-edit-max="60">Email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
              </div>
              <label className={s.field}>
                <span data-edit="contact.text3" data-edit-max="60">Phone, if you would rather I called</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className={s.field}>
                <span data-edit="contact.text4" data-edit-max="60">Anything you would like me to know (optional)</span>
                <textarea name="note" rows={4} />
              </label>
              <fieldset className={s.choices}>
                <legend data-edit="contact.legend">I would like to meet</legend>
                <label>
                  <input type="radio" name="where" value="in-person" defaultChecked />
                  <span data-edit="contact.text5" data-edit-max="60">In person</span>
                </label>
                <label>
                  <input type="radio" name="where" value="online" />
                  <span data-edit="contact.text6" data-edit-max="60">Online</span>
                </label>
                <label>
                  <input type="radio" name="where" value="either" />
                  <span data-edit="contact.text7" data-edit-max="60">Either</span>
                </label>
              </fieldset>
              <fieldset className={s.choices}>
                <legend data-edit="contact.legend2">Times that usually suit me</legend>
                {TIMES.map((t, i) => (
                  <label key={t}>
                    <input type="checkbox" name="times" value={t} />
                    <span data-edit={`contact.text8.${i}`} data-edit-max="60">{t}</span>
                  </label>
                ))}
              </fieldset>
              <div className={s.formFoot}>
                <button data-edit="contact.send" data-edit-max="24" type="submit" className={s.send}>Send the note</button>
                <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>
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
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Quiet Harbor Counseling</p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline className={s.footAddr}>
              14 Wharf Lane, Suite 3
              <br />
              Above the chandlery
            </p>
            <ul className={s.footContact}>
              <li>
                <a data-edit="footer.link" data-edit-max="28" href="tel:+15550137720">(555) 013-7720</a>
              </li>
              <li>
                <a data-edit="footer.link2" data-edit-max="28" href="mailto:nora@quietharbor.example">nora@quietharbor.example</a>
              </li>
            </ul>
          </div>
          <div className={s.footFine}>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional therapy practice. The therapist, fees, hours and license are invented.</p>
            <p>
              <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
              <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
              <span data-edit="footer.text2" data-edit-max="60">, drawn live on a transparent ground.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
