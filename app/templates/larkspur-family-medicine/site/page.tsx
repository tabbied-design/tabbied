import { TabbiedPattern } from 'tabbied/react';
import { vichy } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './larkspur-family-medicine.module.css';

export const metadata = {
  title: 'Larkspur Family Medicine: Direct primary care on Elm Hill',
  description:
    'Larkspur is a direct primary care practice. One monthly fee covers unhurried visits, same-day appointments, texting your own doctor, and lab tests at what they cost us. No copays and no bills at the door.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   membership card: the front in the hero, the back as the list of what it
   covers, the fees as the cards in a family's wallet. Vichy is the
   practice's mark, a red and larkspur gingham on a linen ground, the
   tablecloth of a kitchen-table doctor. It fills the face of the card, runs
   as a band before the fees, tops the family card and edges the footer. */
const LINEN = '#fbf7f0';
const INK = '#22304f';
const BERRY = '#c8414b';
const LARKSPUR = '#5b63b7';
const SKY = '#a9bde3';

const GINGHAM = ['transparent', BERRY, LARKSPUR, BERRY];
const CLOTH = ['transparent', BERRY, BERRY, LARKSPUR];
const BLUE = ['transparent', LARKSPUR, SKY, LARKSPUR];

const NAV = [
  ['What it covers', '#covers'],
  ['Same-day visits', '#same-day'],
  ['Lab prices', '#labs'],
  ['Fees', '#fees'],
  ['How to join', '#join'],
  ['Contact', '#contact'],
];

const COVERS = [
  ['Unlimited visits', 'Thirty to sixty minutes, as often as you need them, with no copay.'],
  ['Same-day or next-day', 'Call or text by 10 in the morning and you are seen that day.'],
  ['Your doctor by text', 'Text, phone and video with the doctor who knows you, not a call center.'],
  ['A yearly physical', 'An hour long, with a written plan for the year you take home.'],
  ['Minor procedures', 'Stitches, mole and skin tag removal, ear washing, joint injections.'],
  ['Labs drawn here', 'Blood drawn in the office, tests billed at our cost, below.'],
  ['Medicines at wholesale', 'About 300 generics dispensed at the counter for a few dollars.'],
  ['Someone in your corner', 'Referrals, records and hospital discharges coordinated for you.'],
];

const NOT_COVERED = [
  'Hospital stays and emergency rooms',
  'Specialists, surgery and imaging',
  'Prescriptions we do not stock',
];

const DAY = [
  { time: '7:42', who: 'You', text: 'Maya woke up with a fever and a sore throat. Can you see her today?' },
  { time: '7:55', who: 'Dr. Halvorsen', text: 'Come at 11:20. Bring her water bottle, we will swab for strep.' },
  { time: '11:20', who: 'At the office', text: 'Seen on time. Rapid strep swab, result in eight minutes.' },
  { time: '11:34', who: 'Dr. Halvorsen', text: 'Positive. Amoxicillin from our counter, $4. Fever should break by tomorrow.' },
  { time: '4:10', who: 'Dr. Halvorsen', text: 'Checking in. How is she drinking? Text me tonight if the fever passes 103.' },
];

const LABS = [
  ['Comprehensive metabolic panel', '$96', '$6'],
  ['Complete blood count', '$54', '$4'],
  ['Lipid panel', '$88', '$5'],
  ['Hemoglobin A1c', '$72', '$8'],
  ['Thyroid (TSH)', '$110', '$7'],
  ['Vitamin D', '$160', '$18'],
  ['Urinalysis', '$38', '$3'],
  ['Rapid strep', '$45', '$5'],
  ['PSA', '$120', '$9'],
];

const MEDS = [
  ['Lisinopril, 90 days', '$3.20'],
  ['Metformin, 90 days', '$4.50'],
  ['Atorvastatin, 90 days', '$5.10'],
  ['Amoxicillin, one course', '$4.00'],
  ['Sertraline, 90 days', '$6.30'],
];

const FEES = [
  { who: 'Children', ages: 'Ages 0-17', price: '$35', note: 'With a parent who is a member' },
  { who: 'Adults', ages: 'Ages 18-44', price: '$69', note: 'Most of our members' },
  { who: 'Adults', ages: 'Ages 45-64', price: '$89', note: 'More chronic care, same fee all year' },
  { who: 'Seniors', ages: '65 and over', price: '$99', note: 'Alongside Medicare, home visits included' },
];

const STEPS = [
  ['Meet us first', 'A free twenty-minute meet-and-greet. See the office, ask anything, decide later.'],
  ['Sign up', 'A one-page agreement, month to month. Cancel with thirty days notice, no fee.'],
  ['We fetch your records', 'Sign one release and we request them from your old practice.'],
  ['Your first visit', 'An hour, everything reviewed: medicines, history, what worries you.'],
];

const DOCTORS = [
  { initials: 'IH', name: 'Dr. Ines Halvorsen', role: 'Family physician, MD', note: 'Board-certified in family medicine. Fourteen years in a clinic that booked her every eleven minutes, then she opened Larkspur.', panel: 'Panel capped at 550 members' },
  { initials: 'TM', name: 'Theo Marsh', role: 'Family nurse practitioner', note: 'Pediatrics and sports injuries. Runs the Saturday morning clinic and the school physicals in August.', panel: 'Panel capped at 450 members' },
];

const HOURS = [
  ['Monday to Friday', '8:00-6:00'],
  ['Saturday', '9:00-12:00'],
  ['After hours', 'Members text the doctor on call'],
];

export default function LarkspurFamilyMedicinePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--linen': '#fbf7f0',
        '--ink': '#22304f',
        '--berry': '#c8414b',
        '--larkspur': '#5b63b7',
        '--sky': '#a9bde3',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="linen,ink,berry,larkspur,sky"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span className={s.brandText}>
            <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Larkspur</span>
            <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Family Medicine</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#contact">Meet the doctor</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The membership card, front and back, with its price sticker. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Direct primary care on Elm Hill</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Your own doctor, one monthly fee, <em>no bills at the door.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Larkspur is a membership practice. A flat monthly fee buys
              unhurried visits, a doctor who answers your texts, and lab tests
              at what they cost us. No copays, no surprise bills, and no
              insurance needed for anything we do here.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#join">Become a member</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#fees">See the monthly fees</a>
            </div>
          </div>
          <div className={s.cardStack}>
            <div className={s.cardBack} aria-hidden="true">
              <span className={s.magStripe} />
              <span className={s.sigPanel} />
            </div>
            <div className={s.card}>
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,2" className={s.cardField} aria-hidden="true">
                <TabbiedPattern
                  pattern={vichy}
                  palette={GINGHAM}
                  fit="grid"
                  cellSize={56}
                  seed="larkspur-card"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.cardBody}>
                <p data-edit="hero.cardBrand" data-edit-max="240" data-edit-multiline className={s.cardBrand}>Larkspur Family Medicine</p>
                <p data-edit="hero.cardName" data-edit-max="240" data-edit-multiline className={s.cardName}>Member card</p>
                <dl className={s.cardFacts}>
                  <div>
                    <dt data-edit="hero.term" data-edit-max="28">Member no.</dt>
                    <dd data-edit="hero.body" data-edit-max="200" data-edit-multiline>0482 1196</dd>
                  </div>
                  <div>
                    <dt data-edit="hero.term2" data-edit-max="28">Your doctor</dt>
                    <dd data-edit="hero.body2" data-edit-max="200" data-edit-multiline>Dr. Halvorsen</dd>
                  </div>
                  <div>
                    <dt data-edit="hero.term3" data-edit-max="28">Text line</dt>
                    <dd data-edit="hero.body3" data-edit-max="200" data-edit-multiline>(555) 015-4410</dd>
                  </div>
                </dl>
              </div>
            </div>
            <p className={s.sticker}>
              <span data-edit="hero.stickerFrom" data-edit-max="60" className={s.stickerFrom}>Adults from</span>
              <span data-edit="hero.stickerPrice" data-edit-max="60" className={s.stickerPrice}>$69</span>
              <span data-edit="hero.stickerPer" data-edit-max="60" className={s.stickerPer}>a month</span>
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- COVERS
            The back of the card: everything the fee covers. */}
        <section id="covers" className={s.sec} aria-labelledby="covers-h">
          <div className={s.backPanel}>
            <div className={s.backStripe} aria-hidden="true" />
            <div className={s.backInner}>
              <div className={s.backHead}>
                <p data-edit="covers.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>On the back of the card</p>
                <h2 data-edit="covers.secTitle" data-edit-max="60" id="covers-h" className={s.secTitle}>What the monthly fee covers</h2>
              </div>
              <ul className={s.covers}>
                {COVERS.map(([t, d], i) => (
                  <li key={t} className={s.cover}>
                    <h3 data-edit={`covers.coverTitle.${i}`} data-edit-max="40" className={s.coverTitle}>{t}</h3>
                    <p data-edit={`covers.coverText.${i}`} data-edit-max="240" data-edit-multiline className={s.coverText}>{d}</p>
                  </li>
                ))}
              </ul>
              <div className={s.notCovered}>
                <h3 data-edit="covers.notTitle" data-edit-max="40" className={s.notTitle}>Not on the card</h3>
                <ul className={s.notList}>
                  {NOT_COVERED.map((n, i) => (
                    <li data-edit={`covers.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                  ))}
                </ul>
                <p data-edit="covers.notNote" data-edit-max="240" data-edit-multiline className={s.notNote}>Keep a high-deductible insurance plan for these. We will help you pick one that fits beside us.</p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- SAME DAY */}
        <section id="same-day" className={s.sec} aria-labelledby="sameday-h">
          <div className={s.sameGrid}>
            <div>
              <p data-edit="sameDay.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Text by 10, seen today</p>
              <h2 data-edit="sameDay.secTitle" data-edit-max="60" id="sameday-h" className={s.secTitle}>Same-day visits, and a doctor who texts back</h2>
              <p data-edit="sameDay.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                With 550 members instead of the usual 2,500, there is room in
                the day. Most sick visits happen the morning you call, and
                plenty of questions are settled by text without a visit at all.
              </p>
              <dl className={s.stats}>
                <div>
                  <dt data-edit="sameDay.term" data-edit-max="28">Average wait in the waiting room</dt>
                  <dd data-edit="sameDay.body" data-edit-max="200" data-edit-multiline>4 min</dd>
                </div>
                <div>
                  <dt data-edit="sameDay.term2" data-edit-max="28">Texts answered within the hour</dt>
                  <dd data-edit="sameDay.body2" data-edit-max="200" data-edit-multiline>92%</dd>
                </div>
                <div>
                  <dt data-edit="sameDay.term3" data-edit-max="28">Length of a usual visit</dt>
                  <dd data-edit="sameDay.body3" data-edit-max="200" data-edit-multiline>40 min</dd>
                </div>
              </dl>
            </div>
            <ol className={s.day}>
              {DAY.map((d, i) => (
                <li key={d.time} className={d.who === 'You' ? `${s.msg} ${s.msgYou}` : s.msg}>
                  <time data-edit={`sameDay.msgTime.${i}`} className={s.msgTime}>{d.time}</time>
                  <div className={s.bubble}>
                    <p data-edit={`sameDay.msgWho.${i}`} data-edit-max="240" data-edit-multiline className={s.msgWho}>{d.who}</p>
                    <p data-edit={`sameDay.msgText.${i}`} data-edit-max="240" data-edit-multiline className={s.msgText}>{d.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ LABS */}
        <section id="labs" className={s.sec} aria-labelledby="labs-h">
          <div className={s.secHead}>
            <p data-edit="labs.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Billed at our cost</p>
            <h2 data-edit="labs.secTitle" data-edit-max="60" id="labs-h" className={s.secTitle}>Lab tests and medicines, at the price we pay</h2>
            <p data-edit="labs.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              We buy from the same regional lab and wholesaler as the hospital
              and pass the price straight on. These are this quarter's
              prices, beside what an insurer is usually billed for the same test.
            </p>
          </div>
          <div className={s.labsGrid}>
            <div className={s.receipt}>
              <table className={s.labTable}>
                <caption data-edit="labs.receiptHead" className={s.receiptHead}>Lab tests, drawn in the office</caption>
                <thead>
                  <tr>
                    <th data-edit="labs.heading" scope="col">Test</th>
                    <th data-edit="labs.heading2" scope="col">Usually billed</th>
                    <th data-edit="labs.heading3" scope="col">Members pay</th>
                  </tr>
                </thead>
                <tbody>
                  {LABS.map(([t, billed, pay], i) => (
                    <tr key={t}>
                      <th data-edit={`labs.heading4.${i}`} scope="row">{t}</th>
                      <td data-edit={`labs.billed.${i}`} className={s.billed}>{billed}</td>
                      <td data-edit={`labs.pay.${i}`} className={s.pay}>{pay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="labs.receiptFoot" data-edit-max="240" data-edit-multiline className={s.receiptFoot}>Results in your app in one to two days.</p>
            </div>
            <div className={s.meds}>
              <h3 data-edit="labs.medsTitle" data-edit-max="40" className={s.medsTitle}>From our medicine counter</h3>
              <ul className={s.medList}>
                {MEDS.map(([m, p], i) => (
                  <li key={m}>
                    <span data-edit={`labs.medName.${i}`} data-edit-max="60" className={s.medName}>{m}</span>
                    <span className={s.leader} aria-hidden="true" />
                    <span data-edit={`labs.medPrice.${i}`} data-edit-max="60" className={s.medPrice}>{p}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="labs.medsNote" data-edit-max="240" data-edit-multiline className={s.medsNote}>About 300 generics in stock. Anything else we send to the pharmacy of your choice.</p>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,2,3" className={s.cloth} aria-hidden="true">
          <TabbiedPattern
            pattern={vichy}
            palette={CLOTH}
            fit="grid"
            cellSize={56}
            seed="larkspur-tablecloth"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <p data-edit="fees.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Monthly, by age</p>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>One card each, one fee each</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              The fee is the same every month whether you visit once a year or
              every week. A one-time enrollment fee of $50 is waived in January.
            </p>
          </div>
          <ul className={s.fees}>
            {FEES.map((f, i) => (
              <li key={f.ages} className={s.fee}>
                <p data-edit={`fees.feeWho.${i}`} data-edit-max="240" data-edit-multiline className={s.feeWho}>{f.who}</p>
                <p data-edit={`fees.feeAges.${i}`} data-edit-max="240" data-edit-multiline className={s.feeAges}>{f.ages}</p>
                <p data-edit={`fees.feePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.feePrice}>{f.price}</p>
                <p data-edit={`fees.feePer.${i}`} data-edit-max="240" data-edit-multiline className={s.feePer}>a month</p>
                <p data-edit={`fees.feeNote.${i}`} data-edit-max="240" data-edit-multiline className={s.feeNote}>{f.note}</p>
              </li>
            ))}
          </ul>
          <div className={s.family}>
            <div data-edit-pattern="fees.field" data-edit-roles="transparent,3,4,3" className={s.familyField} aria-hidden="true">
              <TabbiedPattern
                pattern={vichy}
                palette={BLUE}
                fit="grid"
                cellSize={40}
                seed="larkspur-family"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.familyBody}>
              <h3 data-edit="fees.familyTitle" data-edit-max="40" className={s.familyTitle}>The household cap</h3>
              <p data-edit="fees.familyText" data-edit-max="240" data-edit-multiline className={s.familyText}>
                However many cards are in the wallet, no household pays more than
                $240 a month. Two parents and three children: $240, not $313.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ JOIN */}
        <section id="join" className={s.joinSec} aria-labelledby="join-h">
          <div className={s.joinInner}>
            <div className={s.secHead}>
              <p data-edit="join.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Four steps, about a week</p>
              <h2 data-edit="join.secTitle" data-edit-max="60" id="join-h" className={s.secTitle}>How to join</h2>
            </div>
            <ol className={s.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t} className={s.step}>
                  <span className={s.stepNo}>{i + 1}</span>
                  <h3 data-edit={`join.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{t}</h3>
                  <p data-edit={`join.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{d}</p>
                </li>
              ))}
            </ol>
            <div className={s.doctors}>
              {DOCTORS.map((d, i) => (
                <article key={d.name} className={s.doctor}>
                  <span className={s.initials} aria-hidden="true">{d.initials}</span>
                  <div>
                    <h3 data-edit={`doctor.docName.${i}`} data-edit-max="40" className={s.docName}>{d.name}</h3>
                    <p data-edit={`doctor.docRole.${i}`} data-edit-max="240" data-edit-multiline className={s.docRole}>{d.role}</p>
                    <p data-edit={`doctor.docNote.${i}`} data-edit-max="240" data-edit-multiline className={s.docNote}>{d.note}</p>
                    <p data-edit={`doctor.docPanel.${i}`} data-edit-max="240" data-edit-multiline className={s.docPanel}>{d.panel}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Come and meet us</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Book a meet-and-greet</h2>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>77 Elm Hill Road, Suite 2</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Ground floor, beside the library. Free parking in front, a ramp to the door.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550154400">(555) 015-4400</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:hello@larkspurmed.example">hello@larkspurmed.example</a>
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
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="lk-name">Your name</label>
                <input id="lk-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="lk-phone">Phone</label>
                <input id="lk-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label3" htmlFor="lk-email">Email</label>
                <input id="lk-email" name="email" type="email" autoComplete="email" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">Who would join</legend>
                <div className={s.picks}>
                  <input id="lk-h1" type="radio" name="household" value="one" />
                  <label data-edit="contact.label4" htmlFor="lk-h1">Just me</label>
                  <input id="lk-h2" type="radio" name="household" value="two" />
                  <label data-edit="contact.label5" htmlFor="lk-h2">Two adults</label>
                  <input id="lk-h3" type="radio" name="household" value="family" />
                  <label data-edit="contact.label6" htmlFor="lk-h3">A family with children</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label7" htmlFor="lk-note">Anything you would like the doctor to know</label>
                <textarea id="lk-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Request a meet-and-greet</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Please do not send medical details here. For anything urgent, call 911.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,2" className={s.footCloth} aria-hidden="true">
          <TabbiedPattern
            pattern={vichy}
            palette={GINGHAM}
            fit="grid"
            cellSize={36}
            seed="larkspur-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Larkspur Family Medicine</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional medical practice. The doctors, members, prices and address are invented, and nothing here is medical advice.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
