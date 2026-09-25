import { TabbiedPattern } from 'tabbied/react';
import { frond, horizonbands, ribline } from 'tabbied/patterns';
import s from './common-table.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';

export const metadata = {
  title: 'Common Table: Community food bank, Millbrook',
  description:
    'Common Table shares groceries with anyone in the Millbrook valley who needs them, no referral needed. Give, volunteer a shift, or find this week\'s pantry hours.',
};

/* Site colors. The horizon field and the progress fill take `transparent`
   in the background slot, so they draw on the cream page itself. */
const INK = '#22201C';
const CARROT = '#E0642E';
const LEAF = '#3E7C59';
const HUSK = '#F1E6D2';

const HORIZON = ['transparent', LEAF, HUSK, 'transparent', CARROT, CARROT];
const FILL = ['transparent', CARROT, INK];
const COVER = [HUSK, LEAF, CARROT];

const NAV = [
  ['Impact', '#impact'],
  ['Give', '#give'],
  ['Volunteer', '#volunteer'],
  ['Get help', '#help'],
  ['Partners', '#partners'],
  ['Report', '#report'],
];

const IMPACT = [
  {
    value: '3,410',
    label: 'households a month',
    note: 'Up from 2,760 in 2024. Roughly one home in nine across the valley.',
  },
  {
    value: '1.07M',
    label: 'meals of groceries',
    note: 'Counted the federal way, where 1.2 pounds of food makes one meal.',
  },
  {
    value: '44%',
    label: 'fresh food',
    note: 'Produce, dairy, eggs and bread, most of it from eleven farms within 40 miles.',
  },
  {
    value: '612',
    label: 'volunteers',
    note: '38,900 hours between them, the same as nineteen full-time jobs.',
  },
  {
    value: '5',
    label: 'meals per dollar',
    note: 'Donated food and buying by the pallet stretch every dollar five ways.',
  },
];

type Tier = {
  amount: string;
  value: string;
  buys: string;
};

const TIERS: Tier[] = [
  { amount: '$15', value: '15', buys: 'A week of school-day breakfasts for one child' },
  { amount: '$35', value: '35', buys: 'Three days of groceries for a family of four' },
  { amount: '$60', value: '60', buys: 'A box of fresh produce for four households' },
  { amount: '$120', value: '120', buys: 'A month of home-delivered groceries for a senior' },
  { amount: '$250', value: '250', buys: 'One school pantry shelf, stocked for a month' },
  { amount: '$500', value: '500', buys: 'Fuel for the delivery van through the whole winter' },
];

const MILESTONES = [
  { amount: '$60,000', what: 'A walk-in cooler for the warehouse', state: 'Reached in October' },
  { amount: '$120,000', what: 'A second home-delivery van for the east side', state: 'Reached last week' },
  { amount: '$180,000', what: 'The Saturday market pantry, open through March', state: '$53,580 to go' },
];

type Shift = {
  shift: string;
  day: string;
  time: string;
  where: string;
  who: string;
  spots: string;
  full: boolean;
};

const SHIFTS: Shift[] = [
  {
    shift: 'Warehouse sort',
    day: 'Monday',
    time: '9:00-12:00',
    where: 'Foundry Street warehouse',
    who: 'Ages 14 and up, groups of up to 10',
    spots: '6 open',
    full: false,
  },
  {
    shift: 'Produce pack',
    day: 'Tuesday',
    time: '1:00-4:00',
    where: 'Foundry Street warehouse',
    who: 'Ages 14 and up, standing work',
    spots: '4 open',
    full: false,
  },
  {
    shift: 'Evening pantry',
    day: 'Wednesday',
    time: '4:00-7:30',
    where: 'Pantry, 240 Foundry Street',
    who: 'Ages 16 and up, Spanish speakers wanted',
    spots: '3 open',
    full: false,
  },
  {
    shift: 'Home delivery',
    day: 'Thursday',
    time: '10:00-1:00',
    where: 'Leaves from the warehouse',
    who: 'Ages 21 and up, own car and a clean license',
    spots: '2 open',
    full: false,
  },
  {
    shift: 'Weekend bags for kids',
    day: 'Friday',
    time: '2:30-4:30',
    where: 'Four elementary schools',
    who: 'Ages 16 and up, school clearance needed',
    spots: 'Full',
    full: true,
  },
  {
    shift: 'Market pantry',
    day: 'Saturday',
    time: '8:00-12:30',
    where: 'Riverside Park pavilion',
    who: 'Ages 12 and up with an adult',
    spots: '9 open',
    full: false,
  },
];

const PANTRY_HOURS = [
  ['Tuesday', '10:00-2:00'],
  ['Wednesday', '4:00-7:30 pm'],
  ['Thursday', '10:00-2:00'],
  ['Saturday', '8:30-12:00, Riverside Park'],
];

const BRING = [
  'Bags or a box, if you have them. We have spares.',
  'No ID, no proof of income and no referral. You do not have to explain anything.',
  'On a first visit we ask your ZIP code and how many people you shop for, so we order enough.',
  'Baby formula, diapers and pet food are on request at the desk.',
];

const PARTNERS = [
  ['Harlan\'s Market', 'Grocery rescue, six days a week'],
  ['Two Creek Farm', 'Produce, June to October'],
  ['Millbrook Unified', 'Weekend bags at four schools'],
  ['St. Brendan\'s', 'Partner pantry, north side'],
  ['Eastside Senior Center', 'Home delivery referrals'],
  ['Valley Dairy Co-op', 'Milk and eggs, every week'],
  ['Millbrook Library', 'Summer pantry pop-ups'],
  ['Grange Hall Bakers', 'Day-old bread, daily'],
  ['Riverside Clinic', 'Food prescriptions'],
  ['Hollis Orchards', 'Apples, September to March'],
  ['Carvel Credit Union', 'Matches the fall appeal'],
  ['Foundry Street Church', 'Our first home, 1998-2011'],
];

const SPEND = [
  { label: 'Food and programs', pct: '91%', cls: 'spendFood' },
  { label: 'Fundraising', pct: '6%', cls: 'spendFund' },
  { label: 'Administration', pct: '3%', cls: 'spendAdmin' },
];

const REPORT_FIGURES = [
  ['Total income', '$2.84M'],
  ['Donated food, at wholesale value', '$1.96M'],
  ['Gifts from 4,870 people', '$688,000'],
  ['Grants and the county contract', '$192,000'],
];

export default function CommonTablePage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">Common Table</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barDonate} href="#give">Donate</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The year in one number, then the promise beside it, then the
            horizon: the page's one loud pattern, edge to edge. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroInner}>
            <div className={s.heroFigure}>
              <p className={s.kicker}>In 2025 we shared</p>
              <p className={s.bigNumber}>1,284,600</p>
              <p className={s.bigLabel}>pounds of food with 3,410 households in the Millbrook valley.</p>
            </div>
            <div className={s.heroCopy}>
              <h1 id="hero-h" className={s.heroTitle}>
                Good food for anyone who needs it, <em>no referral needed.</em>
              </h1>
              <p className={s.heroLede}>
                Common Table is the community food bank for Millbrook and the
                valley towns. We rescue, buy and grow groceries, and share
                them at four pantries and at your door.
              </p>
              <div className={s.heroActions}>
                <a className={s.btnPrimary} href="#give">Give today</a>
                <a className={s.btnGhost} href="#help">Get food this week</a>
              </div>
            </div>
          </div>
          <div className={s.horizon} aria-hidden="true">
            <TabbiedPattern
              pattern={horizonbands}
              palette={HORIZON}
              options={{ frequency: 0.3 }}
              fit="grid"
              cellSize={72}
              seed="common-table-horizon"
              redrawInterval={9000}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </section>

        {/* ---------------------------------------------------------- IMPACT */}
        <section id="impact" className={s.impact} aria-labelledby="impact-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>Impact</p>
            <h2 id="impact-h">Last year, in five numbers</h2>
          </div>
          <dl className={s.stats}>
            {IMPACT.map((st) => (
              <div key={st.label} className={s.stat}>
                <dt className={s.statValue}>{st.value}</dt>
                <dd className={s.statLabel}>{st.label}</dd>
                <dd className={s.statNote}>{st.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------------------ GIVE
            The amounts are radio buttons dressed as cards, so choosing one
            needs no script: the checked card is found with :has(). */}
        <section id="give" className={s.give} aria-labelledby="give-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>Give</p>
            <h2 id="give-h">Choose what your gift does</h2>
            <p className={s.secNote}>
              Every amount below is what that sum buys at our prices, which
              are wholesale and often donated. Gifts are tax-deductible and a
              receipt comes by email.
            </p>
          </div>
          <form className={s.giveForm} action="#">
            <fieldset className={s.often}>
              <legend className={s.visuallyHidden}>How often</legend>
              <label className={s.oftenOption}>
                <input type="radio" name="often" value="once" defaultChecked />
                <span>Give once</span>
              </label>
              <label className={s.oftenOption}>
                <input type="radio" name="often" value="monthly" />
                <span>Give monthly</span>
              </label>
            </fieldset>
            <fieldset className={s.tiers}>
              <legend className={s.visuallyHidden}>Amount</legend>
              {TIERS.map((t) => (
                <label key={t.value} className={s.tier}>
                  <input className={s.tierInput} type="radio" name="amount" value={t.value} defaultChecked={t.value === '35'} />
                  <span className={s.tierAmount}>{t.amount}</span>
                  <span className={s.tierBuys}>{t.buys}</span>
                </label>
              ))}
            </fieldset>
            <div className={s.giveFoot}>
              <label className={s.other}>
                <span>Or another amount, in dollars</span>
                <input type="number" name="other" min="1" step="1" inputMode="numeric" placeholder="75" />
              </label>
              <button className={s.btnPrimary} type="submit">Continue to secure payment</button>
            </div>
            <p className={s.giveNote}>
              Common Table is a 501(c)(3) nonprofit, EIN 00-0000000. Checks to
              240 Foundry Street, Millbrook. Stock, employer matching and food
              drives: write to give@commontable.example.
            </p>
          </form>
        </section>

        {/* ------------------------------------------------------------ GOAL */}
        <section className={s.goal} aria-labelledby="goal-h">
          <div className={s.goalInner}>
            <div className={s.goalHead}>
              <p className={s.secKicker}>Fall appeal 2026</p>
              <h2 id="goal-h">$180,000 to carry the pantries through winter</h2>
            </div>
            <dl className={s.goalFigures}>
              <div>
                <dt>Raised</dt>
                <dd className={s.goalRaised}>$126,420</dd>
              </div>
              <div>
                <dt>Donors</dt>
                <dd>1,912</dd>
              </div>
              <div>
                <dt>Closes</dt>
                <dd>November 30</dd>
              </div>
            </dl>
            <div className={s.track} role="img" aria-label="70 percent of the $180,000 goal raised">
              <div className={s.trackFill}>
                <span className={s.trackPattern} aria-hidden="true">
                  <TabbiedPattern
                    pattern={ribline}
                    palette={FILL}
                    fit="grid"
                    cellSize={28}
                    seed="common-table-fill"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </span>
              </div>
            </div>
            <ol className={s.milestones}>
              {MILESTONES.map((m) => (
                <li key={m.amount}>
                  <span className={s.mileAmount}>{m.amount}</span>
                  <span className={s.mileWhat}>{m.what}</span>
                  <span className={s.mileState}>{m.state}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- VOLUNTEER */}
        <section id="volunteer" className={s.volunteer} aria-labelledby="volunteer-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>Volunteer</p>
            <h2 id="volunteer-h">This week's shifts</h2>
            <p className={s.secNote}>
              Sign up for one shift or every week. The first time, come fifteen
              minutes early for a walk-through, wear closed-toe shoes, and
              leave the rest to the shift lead.
            </p>
          </div>
          <table className={s.shifts}>
            <caption className={s.visuallyHidden}>Volunteer shifts this week</caption>
            <thead>
              <tr>
                <th scope="col">Shift</th>
                <th scope="col">When</th>
                <th scope="col">Where</th>
                <th scope="col">Who can come</th>
                <th scope="col">Spots</th>
              </tr>
            </thead>
            <tbody>
              {SHIFTS.map((sh) => (
                <tr key={sh.shift}>
                  <th scope="row" className={s.shiftName}>{sh.shift}</th>
                  <td className={s.shiftWhen}>
                    <span className={s.shiftDay}>{sh.day}</span>
                    <span className={s.shiftTime}>{sh.time}</span>
                  </td>
                  <td className={s.shiftWhere}>{sh.where}</td>
                  <td className={s.shiftWho}>{sh.who}</td>
                  <td className={sh.full ? `${s.shiftSpots} ${s.shiftFull}` : s.shiftSpots}>{sh.spots}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={s.volFoot}>
            <p className={s.volNote}>Groups, schools and companies: Saturdays and Mondays, up to twelve people.</p>
            <a className={s.btnGhost} href="#contact">Sign up for a shift</a>
          </div>
        </section>

        {/* ------------------------------------------------------------ HELP
            A change of ground: the green block is the one part of the page
            written for the people the rest of it is raising money for. */}
        <section id="help" className={s.help} aria-labelledby="help-h">
          <div className={s.helpInner}>
            <div className={s.helpLead}>
              <p className={s.helpKicker}>Get help</p>
              <h2 id="help-h">Come as you are. No referral, no paperwork.</h2>
              <p className={s.helpLede}>
                Anyone who lives or works in the valley can shop at any of our
                pantries once a week. You choose your own groceries, supermarket
                style: produce, bread, dairy, eggs, a protein and pantry
                staples, about 45 pounds a visit.
              </p>
              <p className={s.helpLede}>
                Cannot get to us? Seniors and anyone with a disability can have
                a delivery every two weeks. Call (555) 014-2291 or text FOOD to
                55512.
              </p>
            </div>
            <div className={s.helpCol}>
              <h3 className={s.helpHead}>Pantry hours, 240 Foundry Street</h3>
              <dl className={s.helpHours}>
                {PANTRY_HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.helpSmall}>English, Spanish and Vietnamese at every pantry. Other languages by phone interpreter.</p>
            </div>
            <div className={s.helpCol}>
              <h3 className={s.helpHead}>What to bring</h3>
              <ul className={s.bring}>
                {BRING.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- PARTNERS */}
        <section id="partners" className={s.partners} aria-labelledby="partners-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>Partners</p>
            <h2 id="partners-h">Who we do this with</h2>
            <p className={s.secNote}>
              Grocers, farms, schools, clinics and congregations. Most of the
              food we share started on one of their shelves or fields.
            </p>
          </div>
          <ul className={s.partnerGrid}>
            {PARTNERS.map(([name, role]) => (
              <li key={name}>
                <span className={s.partnerName}>{name}</span>
                <span className={s.partnerRole}>{role}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- REPORT */}
        <section id="report" className={s.report} aria-labelledby="report-h">
          <div className={s.reportCover} aria-hidden="true">
            <TabbiedPattern
              pattern={frond}
              palette={COVER}
              options={{ frequency: 0.7 }}
              fit="grid"
              cellSize={64}
              seed="common-table-cover"
              redrawInterval={8400}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.reportBody}>
            <p className={s.secKicker}>Annual report</p>
            <h2 id="report-h">Where the money went in 2025</h2>
            <p className={s.reportLede}>
              Of every dollar we spent, 91 cents went on food and getting it
              to people. The full report has the audited accounts, the
              pantry-by-pantry numbers and what we got wrong.
            </p>
            <div className={s.spendBar} role="img" aria-label="91 percent food and programs, 6 percent fundraising, 3 percent administration">
              {SPEND.map((sp) => (
                <span key={sp.cls} className={`${s.spendPart} ${s[sp.cls]}`} />
              ))}
            </div>
            <ul className={s.spendKey}>
              {SPEND.map((sp) => (
                <li key={sp.cls}>
                  <span className={`${s.spendSwatch} ${s[sp.cls]}`} aria-hidden="true" />
                  <span className={s.spendPct}>{sp.pct}</span>
                  <span>{sp.label}</span>
                </li>
              ))}
            </ul>
            <dl className={s.reportFigures}>
              {REPORT_FIGURES.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <ul className={s.reportLinks}>
              <li>
                <a href="#report">2025 annual report, PDF, 2.4 MB</a>
              </li>
              <li>
                <a href="#report">Form 990 and audited accounts</a>
              </li>
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactInner}>
            <div>
              <p className={s.secKicker}>Contact</p>
              <h2 id="contact-h">Write, call, or come by the dock</h2>
              <dl className={s.contactList}>
                <div>
                  <dt>Warehouse and pantry</dt>
                  <dd>240 Foundry Street, Millbrook</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>(555) 014-2290</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:hello@commontable.example">hello@commontable.example</a>
                  </dd>
                </div>
                <div>
                  <dt>Food drop-off</dt>
                  <dd>Monday to Friday 8:00-4:00, Saturday 8:00-12:00, at the loading dock on the Foundry Street side</dd>
                </div>
              </dl>
            </div>
            <form className={s.contactForm} action="#">
              <label className={s.field}>
                <span>Your name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={s.field}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
              <label className={s.field}>
                <span>About</span>
                <select name="about" defaultValue="volunteering">
                  <option value="giving">Giving</option>
                  <option value="volunteering">Volunteering</option>
                  <option value="food">Getting food</option>
                  <option value="drive">Running a food drive</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                <span>Message</span>
                <textarea name="message" rows={4} />
              </label>
              <button className={s.btnPrimary} type="submit">Send message</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footGrid}>
          <div>
            <p className={s.footName}>Common Table</p>
            <p className={s.footTag}>The community food bank for Millbrook and the valley towns, since 1998.</p>
          </div>
          <ul className={s.footLinks}>
            <li><a href="#give">Give</a></li>
            <li><a href="#volunteer">Volunteer</a></li>
            <li><a href="#help">Get help</a></li>
            <li><a href="#report">Annual report</a></li>
          </ul>
          <p className={s.footAddr}>240 Foundry Street, Millbrook. (555) 014-2290.</p>
        </div>
        <div className={s.footFine}>
          <p>A fictional food bank. Figures, partners and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
