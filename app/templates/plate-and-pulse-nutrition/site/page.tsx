import { TabbiedPattern } from 'tabbied/react';
import { centroid, dotfield, bloks, ring, dotset } from 'tabbied/patterns';
import s from './plate-and-pulse-nutrition.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Plate & Pulse: Registered dietitians, Brookline Park',
  description:
    'A registered dietitian practice at 41 Garden Street, Brookline Park: IBS and gut health, diabetes, sports nutrition, heart health and eating disorder recovery. Plain fees, most insurance, and plans written with you.',
};

/* Site colors. Every field is laid on a transparent ground so the white
   of the label shows between its squares and dots. */
const WHITE = '#fbfbf8';
const BLACK = '#111111';
const GREEN = '#3ba55c';
const ORANGE = '#f28c28';

const PLATE = ['transparent', GREEN, BLACK, ORANGE, GREEN];
const SPLIT = ['transparent', ORANGE, GREEN, BLACK, GREEN];
const FIBRE = ['transparent', GREEN, BLACK, GREEN, ORANGE];
const TILE_A = [WHITE, GREEN, BLACK, GREEN];
const TILE_B = [WHITE, ORANGE, BLACK];
const TILE_C = [WHITE, BLACK, GREEN, ORANGE, BLACK];
const SPRINKLE = ['transparent', BLACK, GREEN, ORANGE, BLACK];

const NAV = [
  ['What we help with', '#help'],
  ['How it works', '#how'],
  ['Fees', '#fees'],
  ['Dietitians', '#team'],
  ['Recipes', '#recipes'],
];

/* The hero label: what a first visit contains, per serving. */
const HERO_DV = [
  { name: 'Listening', dv: '100%', sub: false },
  { name: 'Judgement', dv: '0%', sub: false },
  { name: 'Diets with a name', dv: '0%', sub: false },
  { name: 'Food you actually like', dv: '100%', sub: true },
  { name: 'A plan written with you', dv: '100%', sub: false },
  { name: 'Homework', dv: '2 things', sub: true },
];

const HERO_EXTRA = [
  ['In network', '5 insurers'],
  ['Telehealth', 'Yes'],
  ['Evenings', 'Tue, Thu'],
  ['Next opening', '6 days'],
];

type Help = {
  name: string;
  what: string;
  share: string;
};

const HELP: Help[] = [
  { name: 'IBS and gut health', what: 'Low FODMAP done properly: a short elimination, then foods brought back one at a time until you know your own gut.', share: '34%' },
  { name: 'Diabetes and prediabetes', what: 'Carbohydrates you understand rather than fear, blood sugar that settles, and meals the whole family eats.', share: '22%' },
  { name: 'Sports nutrition', what: 'Fuel for training and race day, from a first 10K to the county rowing squad.', share: '16%' },
  { name: 'Heart health', what: 'Cholesterol and blood pressure, eased with food first, alongside whatever your doctor prescribes.', share: '14%' },
  { name: 'Eating disorder recovery', what: 'Slow, steady and never about weight. We work with your therapist, at your pace.', share: '14%' },
];

type Step = {
  n: string;
  name: string;
  size: string;
  rows: string[];
  note: string;
};

const STEPS: Step[] = [
  {
    n: 'Serving 1 of 3',
    name: 'First visit',
    size: '60 minutes',
    rows: ['Your health and food history', 'What you eat on an ordinary Tuesday', 'What you want to change, and what you do not', 'One or two small things to try'],
    note: 'Bring any recent blood results and a list of your medicines.',
  },
  {
    n: 'Serving 2 of 3',
    name: 'The plan',
    size: 'Two pages',
    rows: ['Written in your words, not ours', 'Meals you already cook, adjusted', 'A shopping list that fits your budget', 'Sent to your doctor if you want'],
    note: 'In your inbox within two working days of the first visit.',
  },
  {
    n: 'Serving 3 of 3',
    name: 'Follow-ups',
    size: '30 or 45 minutes',
    rows: ['Every two to six weeks, your choice', 'What worked, what did not', 'The next small change', 'Stop whenever you feel ready'],
    note: 'Most people come three or four times. Some come once a year.',
  },
];

const FEES = [
  { name: 'Initial consultation', size: '60 minutes', price: '$140' },
  { name: 'Follow-up', size: '30 minutes', price: '$75' },
  { name: 'Follow-up', size: '45 minutes', price: '$95' },
  { name: 'Group course, IBS or diabetes', size: 'six weeks', price: '$180' },
  { name: 'Supermarket tour', size: '90 minutes', price: '$110' },
];

const INSURERS = [
  ['Blue Harbor Health', 'In network'],
  ['Meridian Care', 'In network'],
  ['Garden State Mutual', 'In network'],
  ['Northway', 'Superbill for you to claim'],
  ['Medicare', 'Diabetes and kidney care, with a referral'],
];

const PAYMENT = [
  ['Cards', 'All of them'],
  ['HSA and FSA', 'Yes'],
  ['Cancel', 'Free up to 24 hours before'],
  ['Half price', 'Two slots a day, no questions'],
];

type Recipe = {
  name: string;
  serves: string;
  time: string;
  items: string[][];
  method: string;
};

const RECIPES: Recipe[] = [
  {
    name: 'Overnight oats',
    serves: 'Servings 2',
    time: '5 min, then the night',
    items: [
      ['Rolled oats', '1 cup'],
      ['Milk, any kind', '1 cup'],
      ['Plain yogurt', '1/2 cup'],
      ['Frozen berries', 'a handful'],
      ['Chia seeds', '1 tbsp'],
    ],
    method: 'Stir it all in a jar, lid on, fridge overnight. Eat cold, or warm it for a minute.',
  },
  {
    name: 'Avocado and bean toast',
    serves: 'Servings 2',
    time: '10 min',
    items: [
      ['Ripe avocado', '1'],
      ['White beans, drained', '1 can'],
      ['Lemon juice', '1/2 lemon'],
      ['Chili flakes', 'a pinch'],
      ['Wholegrain bread', '4 slices'],
    ],
    method: 'Mash the avocado and beans with lemon and salt. Pile on toast, shake on the chili.',
  },
  {
    name: 'Tray-baked salmon',
    serves: 'Servings 2',
    time: '25 min',
    items: [
      ['Salmon fillets', '2'],
      ['Broccoli, in florets', '1 head'],
      ['Olive oil', '1 tbsp'],
      ['Lime', '1'],
      ['Cooked rice', '2 cups'],
    ],
    method: 'Broccoli in at 200C for 10 minutes, then the salmon beside it for 12. Lime over everything.',
  },
];

const HOURS = [
  ['Monday', '8:00-18:00'],
  ['Tuesday', '8:00-20:00'],
  ['Wednesday', '8:00-18:00'],
  ['Thursday', '8:00-20:00'],
  ['Friday', '8:00-15:00'],
  ['Saturday', '9:00-12:00'],
];

export default function PlateAndPulseNutritionPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--white': '#fbfbf8',
        '--black': '#111111',
        '--green': '#3ba55c',
        '--orange': '#f28c28',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="white,black,green,orange"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Pathway+Extreme:ital,opsz,wdth,wght@0,8..12,75..100,100..900;1,8..12,75..100,100..900&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markPlate" data-edit-max="60" className={s.markPlate}>Plate</span>
          <span data-edit="bar.markAmp" data-edit-max="60" className={s.markAmp}>&amp;</span>
          <span data-edit="bar.markPulse" data-edit-max="60" className={s.markPulse}>Pulse</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Book a visit</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
          <a data-edit="bar.book" data-edit-max="28" href="#book">Book a visit</a>
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="pp-hero-h">
          <div className={s.heroLabelWrap}>
            <div className={s.label}>
              <h1 data-edit="ppHero.heroTitle" data-edit-max="70" id="pp-hero-h" className={s.heroTitle}>Plate &amp; Pulse</h1>
              <p data-edit="ppHero.heroSub" data-edit-max="240" data-edit-multiline className={s.heroSub}>Registered dietitians, 41 Garden Street, Brookline Park</p>
              <p data-edit="ppHero.servings" data-edit-max="240" data-edit-multiline className={s.servings}>3 dietitians per practice</p>
              <p className={s.servingSize}>
                <strong data-edit="ppHero.emphasis">Serving size</strong>
                <strong data-edit="ppHero.emphasis2">One person, as they are</strong>
              </p>
              <p data-edit="ppHero.amountHead" data-edit-max="240" data-edit-multiline className={s.amountHead}>Amount per first visit</p>
              <p className={s.calories}>
                <span data-edit="ppHero.text" data-edit-max="60">Minutes</span>
                <span data-edit="ppHero.text2" data-edit-max="60">60</span>
              </p>
              <p data-edit="ppHero.dvHead" data-edit-max="240" data-edit-multiline className={s.dvHead}>% Daily Value*</p>
              <ul className={s.dvRows}>
                {HERO_DV.map((row, i) => (
                  <li key={row.name} className={row.sub ? s.dvSub : s.dvRow}>
                    <span data-edit={`ppHero.text3.${i}`} data-edit-max="60">{row.name}</span>
                    <strong data-edit={`ppHero.emphasis3.${i}`}>{row.dv}</strong>
                  </li>
                ))}
              </ul>
              <dl className={s.vitamins}>
                {HERO_EXTRA.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`ppHero.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`ppHero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="ppHero.footnote" data-edit-max="240" data-edit-multiline className={s.footnote}>
                * The % Daily Value tells you how much of each thing one visit
                gives you. We do not do half measures of listening.
              </p>
            </div>
            <Artwork
              slug="plate-and-pulse-nutrition-avocado"
              alt="A sticker of an avocado cut in half, the stone in one half"
              inks={{ red: 'var(--green)', black: 'var(--text)' }}
              className={`${s.sticker} ${s.stickerHero}`}
            />
          </div>

          <div className={s.heroSide}>
            <p data-edit="ppHero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Food advice that fits your life, from dietitians who ask before
              they tell. No meal plans from a template, no weighing, no foods
              you are never allowed again.
            </p>
            <div className={s.heroActions}>
              <a data-edit="ppHero.btnSolid" data-edit-max="28" className={s.btnSolid} href="#book">Book a first visit</a>
              <a data-edit="ppHero.btnLine" data-edit-max="28" className={s.btnLine} href="#help">What we help with</a>
            </div>
            <figure className={s.platePanel}>
              <div data-edit-pattern="ppHero.field" data-edit-roles="transparent,2,1,3,2" className={s.plateField} aria-hidden="true">
                <TabbiedPattern
                  pattern={centroid}
                  palette={PLATE}
                  options={{ frequency: 0.9 }}
                  fit="grid"
                  cellSize={34}
                  seed="pp-centroid"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="ppHero.emphasis4" data-edit-format="emphasis" data-edit-max="120" data-edit-multiline className={s.figCap}>
                <strong>Balance, drawn.</strong> Most of the plate in the middle, a
                little of everything toward the edges.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ------------------------------------------------------------ HELP */}
        <section id="help" className={s.sec} aria-labelledby="pp-help-h">
          <div className={s.secHead}>
            <p data-edit="help.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 2</p>
            <h2 data-edit="help.title" data-edit-max="60" id="pp-help-h">What we help with</h2>
            <p data-edit="help.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Five things bring most people through our door. If yours is not
              on the list, ask anyway; the answer is usually yes.
            </p>
          </div>

          <div className={s.helpGrid}>
            <div className={s.helpLabelWrap}>
              <div className={s.label}>
                <p data-edit="help.labelTitle" data-edit-max="240" data-edit-multiline className={s.labelTitle}>Conditions Facts</p>
                <p data-edit="help.servings" data-edit-max="240" data-edit-multiline className={s.servings}>5 conditions per practice, many people have two</p>
                <table className={s.helpTable}>
                  <caption data-edit="help.srOnly" className={s.srOnly}>What we help with, how, and the share of last year&apos;s clients</caption>
                  <thead>
                    <tr>
                      <th data-edit="help.heading" scope="col">Amount per condition</th>
                      <th data-edit="help.heading2" scope="col">% of clients*</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HELP.map((h, i) => (
                      <tr key={h.name}>
                        <th scope="row">
                          <strong data-edit={`help.emphasis.${i}`}>{h.name}</strong>
                          <span data-edit={`help.text.${i}`} data-edit-max="60">{h.what}</span>
                        </th>
                        <td data-edit={`help.cell.${i}`}>{h.share}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p data-edit="help.footnote" data-edit-max="240" data-edit-multiline className={s.footnote}>
                  * Share of the people we saw last year. Plenty came for more than
                  one thing. Nobody came for a diet, and nobody left with one.
                </p>
              </div>
              <Artwork
                slug="plate-and-pulse-nutrition-broccoli"
                alt="A sticker of a head of broccoli"
                inks={{ blue: 'var(--green)', red: 'var(--orange)' }}
                className={`${s.sticker} ${s.stickerHelp}`}
              />
            </div>

            <figure className={s.fibrePanel}>
              <div data-edit-pattern="help.field" data-edit-roles="transparent,2,1,2,3" className={s.fibreField} aria-hidden="true">
                <TabbiedPattern
                  pattern={dotfield}
                  palette={FIBRE}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={32}
                  seed="pp-fibre"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <figcaption data-edit="help.emphasis2" data-edit-format="emphasis" data-edit-max="120" data-edit-multiline className={s.figCap}>
                <strong>A day of fibre,</strong> near enough one dot per gram. Most of
                us eat about half of it.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ------------------------------------------------------------- HOW */}
        <section id="how" className={s.sec} aria-labelledby="pp-how-h">
          <div className={s.secHead}>
            <p data-edit="how.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 3</p>
            <h2 data-edit="how.title" data-edit-max="60" id="pp-how-h">How it works</h2>
            <p data-edit="how.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Three servings, taken at your own speed. Nothing is sold to you on
              the way: no supplements, no powders, no packages.
            </p>
          </div>

          <div className={s.stepsWrap}>
          <ol className={s.steps}>
            {STEPS.map((step, i) => (
              <li key={step.n} className={s.stepWrap}>
                <div className={`${s.label} ${s.stepLabel}`}>
                  <p data-edit={`how.stepNo.${i}`} data-edit-max="240" data-edit-multiline className={s.stepNo}>{step.n}</p>
                  <h3 data-edit={`how.stepName.${i}`} data-edit-max="40" className={s.stepName}>{step.name}</h3>
                  <p className={s.servingSize}>
                    <strong data-edit={`how.emphasis.${i}`}>Serving size</strong>
                    <strong data-edit={`how.emphasis2.${i}`}>{step.size}</strong>
                  </p>
                  <p data-edit={`how.amountHead.${i}`} data-edit-max="240" data-edit-multiline className={s.amountHead}>Contains</p>
                  <ul className={s.stepRows}>
                    {step.rows.map((row, i2) => (
                      <li data-edit={`how.item.${i}.${i2}`} data-edit-max="80" key={row}>{row}</li>
                    ))}
                  </ul>
                  <p data-edit={`how.footnote.${i}`} data-edit-max="240" data-edit-multiline className={s.footnote}>{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
            <Artwork
              slug="plate-and-pulse-nutrition-oats"
            alt="A sticker of a bowl of porridge oats with berries and a spoon"
              inks={{ red: 'var(--orange)', blue: 'var(--text)', black: 'var(--green)' }}
              className={`${s.sticker} ${s.stickerHow}`}
            />
          </div>
        </section>

        {/* ------------------------------------------------------------ FEES */}
        <section id="fees" className={s.sec} aria-labelledby="pp-fees-h">
          <div className={s.secHead}>
            <p data-edit="fees.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 4</p>
            <h2 data-edit="fees.title" data-edit-max="60" id="pp-fees-h">Fees and insurance</h2>
            <p data-edit="fees.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Every price, printed where you can read it before you book. We
              check your cover for you before the first visit.
            </p>
          </div>

          <div className={s.feesGrid}>
            <div className={s.feesLabelWrap}>
              <div className={`${s.label} ${s.feesLabel}`}>
                <p data-edit="fees.labelTitle" data-edit-max="240" data-edit-multiline className={s.labelTitle}>Fee Facts</p>
                <p data-edit="fees.servings" data-edit-max="240" data-edit-multiline className={s.servings}>Prices per appointment, before insurance</p>
                <p data-edit="fees.amountHead" data-edit-max="240" data-edit-multiline className={s.amountHead}>Amount per serving</p>
                <ul className={s.feeRows}>
                  {FEES.map((f, i) => (
                    <li key={`${f.name}-${f.size}`}>
                      <span className={s.feeName}>
                        <strong data-edit={`fees.emphasis.${i}`}>{f.name}</strong>
                        <span data-edit={`fees.text.${i}`} data-edit-max="60">{f.size}</span>
                      </span>
                      <strong data-edit={`fees.feePrice.${i}`} className={s.feePrice}>{f.price}</strong>
                    </li>
                  ))}
                </ul>
                <p data-edit="fees.subHead" data-edit-max="240" data-edit-multiline className={s.subHead}>Insurance</p>
                <dl className={s.insurers}>
                  {INSURERS.map(([name, status], i) => (
                    <div key={name}>
                      <dt data-edit={`fees.term.${i}`} data-edit-max="28">{name}</dt>
                      <dd data-edit={`fees.body.${i}`} data-edit-max="200" data-edit-multiline>{status}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="fees.footnote" data-edit-max="240" data-edit-multiline className={s.footnote}>
                  * Two appointments every day are held back at half price for
                  anyone who needs them. You do not have to explain.
                </p>
              </div>
              <Artwork
                slug="plate-and-pulse-nutrition-salmon"
                alt="A sticker of a salmon fillet with a wedge of lime beside it"
                inks={{ red: 'var(--orange)', yellow: 'var(--green)' }}
                className={`${s.sticker} ${s.stickerFees}`}
              />
            </div>

            <div className={s.feesSide}>
              <div className={`${s.label} ${s.payLabel}`}>
                <p data-edit="fees.labelTitleSmall" data-edit-max="240" data-edit-multiline className={s.labelTitleSmall}>Paying</p>
                <dl className={s.payRows}>
                  {PAYMENT.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`fees.term2.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`fees.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <figure className={s.splitPanel}>
                <div data-edit-pattern="fees.field" data-edit-roles="transparent,3,2,1,2" className={s.splitField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={centroid}
                    palette={SPLIT}
                    options={{ frequency: 0.85 }}
                    fit="grid"
                    cellSize={28}
                    seed="pp-centroid-fees"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <figcaption data-edit="fees.emphasis2" data-edit-format="emphasis" data-edit-max="120" data-edit-multiline className={s.figCap}>
                  <strong>Where the fee goes:</strong> the hour with you in the
                  middle, the writing-up around it.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.sec} aria-labelledby="pp-team-h">
          <div className={s.secHead}>
            <p data-edit="team.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 5</p>
            <h2 data-edit="team.title" data-edit-max="60" id="pp-team-h">Our dietitians</h2>
            <p data-edit="team.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Three registered dietitians, all licensed in the state, all of
              whom still like dessert.
            </p>
          </div>

          <ul className={s.team}>
            <li className={`${s.label} ${s.person}`}>
              <div data-edit-pattern="team.field" data-edit-roles="0,2,1,2" className={s.portrait} aria-hidden="true">
                <TabbiedPattern
                  pattern={bloks}
                  palette={TILE_A}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={40}
                  seed="pp-nadia"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="team.personName" data-edit-max="40" className={s.personName}>Nadia Okafor</h3>
              <p data-edit="team.personTitle" data-edit-max="240" data-edit-multiline className={s.personTitle}>RD, PhD, founder</p>
              <dl className={s.personRows}>
                <div>
                  <dt data-edit="team.term" data-edit-max="28">In clinic</dt>
                  <dd data-edit="team.body" data-edit-max="200" data-edit-multiline>Mon, Tue, Thu</dd>
                </div>
                <div>
                  <dt data-edit="team.term2" data-edit-max="28">Focus</dt>
                  <dd data-edit="team.body2" data-edit-max="200" data-edit-multiline>IBS and gut health</dd>
                </div>
                <div>
                  <dt data-edit="team.term3" data-edit-max="28">Speaks</dt>
                  <dd data-edit="team.body3" data-edit-max="200" data-edit-multiline>English, Igbo</dd>
                </div>
              </dl>
              <p data-edit="team.footnote" data-edit-max="240" data-edit-multiline className={s.footnote}>Eats: jollof rice, the burnt bottom</p>
            </li>
            <li className={`${s.label} ${s.person}`}>
              <div data-edit-pattern="team.field2" data-edit-roles="0,3,1" className={s.portrait} aria-hidden="true">
                <TabbiedPattern
                  pattern={ring}
                  palette={TILE_B}
                  options={{ frequency: 0.8 }}
                  fit="grid"
                  cellSize={40}
                  seed="pp-marco"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="team.personName2" data-edit-max="40" className={s.personName}>Marco Bellini</h3>
              <p data-edit="team.personTitle2" data-edit-max="240" data-edit-multiline className={s.personTitle}>RD, sports dietitian</p>
              <dl className={s.personRows}>
                <div>
                  <dt data-edit="team.term4" data-edit-max="28">In clinic</dt>
                  <dd data-edit="team.body4" data-edit-max="200" data-edit-multiline>Tue, Wed, Sat</dd>
                </div>
                <div>
                  <dt data-edit="team.term5" data-edit-max="28">Focus</dt>
                  <dd data-edit="team.body5" data-edit-max="200" data-edit-multiline>Endurance sport, rowing</dd>
                </div>
                <div>
                  <dt data-edit="team.term6" data-edit-max="28">Speaks</dt>
                  <dd data-edit="team.body6" data-edit-max="200" data-edit-multiline>English, Italian</dd>
                </div>
              </dl>
              <p data-edit="team.footnote2" data-edit-max="240" data-edit-multiline className={s.footnote}>Eats: his mother&apos;s minestrone</p>
            </li>
            <li className={`${s.label} ${s.person}`}>
              <div data-edit-pattern="team.field3" data-edit-roles="0,1,2,3,1" className={s.portrait} aria-hidden="true">
                <TabbiedPattern
                  pattern={dotset}
                  palette={TILE_C}
                  options={{ frequency: 0.85 }}
                  fit="grid"
                  cellSize={40}
                  seed="pp-hannah"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 data-edit="team.personName3" data-edit-max="40" className={s.personName}>Hannah Lindqvist</h3>
              <p data-edit="team.personTitle3" data-edit-max="240" data-edit-multiline className={s.personTitle}>RD, diabetes educator</p>
              <dl className={s.personRows}>
                <div>
                  <dt data-edit="team.term7" data-edit-max="28">In clinic</dt>
                  <dd data-edit="team.body7" data-edit-max="200" data-edit-multiline>Mon, Wed, Fri</dd>
                </div>
                <div>
                  <dt data-edit="team.term8" data-edit-max="28">Focus</dt>
                  <dd data-edit="team.body8" data-edit-max="200" data-edit-multiline>Diabetes, heart, recovery</dd>
                </div>
                <div>
                  <dt data-edit="team.term9" data-edit-max="28">Speaks</dt>
                  <dd data-edit="team.body9" data-edit-max="200" data-edit-multiline>English, Swedish</dd>
                </div>
              </dl>
              <p data-edit="team.footnote3" data-edit-max="240" data-edit-multiline className={s.footnote}>Eats: rye crispbread with anything</p>
            </li>
          </ul>
        </section>

        {/* --------------------------------------------------------- RECIPES */}
        <section id="recipes" className={s.sec} aria-labelledby="pp-rec-h">
          <div className={s.secHead}>
            <p data-edit="recipes.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 6</p>
            <h2 data-edit="recipes.title" data-edit-max="60" id="pp-rec-h">Simple recipes</h2>
            <p data-edit="recipes.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              The three we hand out most. Cheap, quick, and forgiving if you
              swap half the ingredients for what is in the cupboard.
            </p>
          </div>

          <div className={s.recipesWrap}>
          <ul className={s.recipes}>
            {RECIPES.map((r, i) => (
              <li key={r.name} className={s.recipeWrap}>
                <div className={`${s.label} ${s.recipe}`}>
                  <h3 data-edit={`recipes.recipeName.${i}`} data-edit-max="40" className={s.recipeName}>{r.name}</h3>
                  <p data-edit={`recipes.servings.${i}`} data-edit-max="240" data-edit-multiline className={s.servings}>{r.serves}</p>
                  <p className={s.servingSize}>
                    <strong data-edit={`recipes.emphasis.${i}`}>Time</strong>
                    <strong data-edit={`recipes.emphasis2.${i}`}>{r.time}</strong>
                  </p>
                  <p data-edit={`recipes.amountHead.${i}`} data-edit-max="240" data-edit-multiline className={s.amountHead}>Ingredients</p>
                  <ul className={s.ingredients}>
                    {r.items.map(([item, amount], i2) => (
                      <li key={item}>
                        <span data-edit={`recipes.text.${i}.${i2}`} data-edit-max="60">{item}</span>
                        <strong data-edit={`recipes.emphasis3.${i}.${i2}`}>{amount}</strong>
                      </li>
                    ))}
                  </ul>
                  <p data-edit={`recipes.method.${i}`} data-edit-max="240" data-edit-multiline className={s.method}>{r.method}</p>
                </div>
              </li>
            ))}
          </ul>
            <Artwork
              slug="plate-and-pulse-nutrition-avocado"
              alt="A sticker of a halved avocado"
              inks={{ red: 'var(--orange)', black: 'var(--green)' }}
              className={`${s.sticker} ${s.stickerRecipes}`}
            />
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.sec} aria-labelledby="pp-book-h">
          <div className={s.secHead}>
            <p data-edit="book.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Section 7</p>
            <h2 data-edit="book.title" data-edit-max="60" id="pp-book-h">Book a first visit</h2>
            <p data-edit="book.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Tell us a little and we call you back within one working day to
              find a time. In person or by video, whichever is easier.
            </p>
          </div>

          <div className={s.bookGrid}>
            <div className={s.formWrap}>
              <form className={`${s.label} ${s.form}`} action="#">
                <p data-edit="book.labelTitle" data-edit-max="240" data-edit-multiline className={s.labelTitle}>Booking Facts</p>
                <p data-edit="book.servings" data-edit-max="240" data-edit-multiline className={s.servings}>1 form, about 2 minutes</p>
                <div className={s.formRows}>
                  <div className={s.field}>
                    <label data-edit="book.label" htmlFor="pp-name">Name</label>
                    <input id="pp-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label2" htmlFor="pp-email">Email</label>
                    <input id="pp-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label3" htmlFor="pp-phone">Phone</label>
                    <input id="pp-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label4" htmlFor="pp-reason">Coming about</label>
                    <select id="pp-reason" name="reason" defaultValue="gut">
                      <option value="gut">IBS and gut health</option>
                      <option value="diabetes">Diabetes or prediabetes</option>
                      <option value="sport">Sports nutrition</option>
                      <option value="heart">Heart health</option>
                      <option value="recovery">Eating disorder recovery</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label5" htmlFor="pp-insurance">Insurance</label>
                    <select id="pp-insurance" name="insurance" defaultValue="none">
                      <option value="none">Paying myself</option>
                      <option value="blue">Blue Harbor Health</option>
                      <option value="meridian">Meridian Care</option>
                      <option value="garden">Garden State Mutual</option>
                      <option value="other">Another insurer</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label6" htmlFor="pp-note">Anything we should know</label>
                    <textarea id="pp-note" name="note" rows={3} />
                  </div>
                </div>
                <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send to the front desk</button>
                <p data-edit="book.footnote" data-edit-max="240" data-edit-multiline className={s.footnote}>* We never share what you write here. It goes to one inbox, read by our front desk and your dietitian.</p>
              </form>
              <Artwork
                slug="plate-and-pulse-nutrition-broccoli"
                alt="A sticker of broccoli"
                inks={{ blue: 'var(--orange)', red: 'var(--green)' }}
                className={`${s.sticker} ${s.stickerBook}`}
              />
            </div>

            <div className={`${s.label} ${s.hoursLabel}`}>
              <p data-edit="book.labelTitleSmall" data-edit-max="240" data-edit-multiline className={s.labelTitleSmall}>Hours</p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="book.subHead" data-edit-max="240" data-edit-multiline className={s.subHead}>Find us</p>
              <p data-edit="book.address" data-edit-max="240" data-edit-multiline className={s.address}>41 Garden Street, Suite 3</p>
              <p data-edit="book.address2" data-edit-max="240" data-edit-multiline className={s.address}>Brookline Park</p>
              <p data-edit="book.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Above the pharmacy, lift to the second floor. Parking behind the building.</p>
              <p className={s.contact}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550148830">(555) 014-8830</a>
              </p>
              <p className={s.contact}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:hello@plateandpulse.example">hello@plateandpulse.example</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,2,3,1" className={s.sprinkle} aria-hidden="true">
          <TabbiedPattern
            pattern={dotfield}
            palette={SPRINKLE}
            options={{ frequency: 0.5 }}
            fit="grid"
            cellSize={30}
            seed="pp-sprinkle"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Plate &amp; Pulse</p>
          <p data-edit="footer.footNote" data-edit-max="240" data-edit-multiline className={s.footNote}>* A fictional dietitian practice. The dietitians, fees, insurers and recipes are invented.</p>
          <p className={s.footNote}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footNote2" data-edit-max="240" data-edit-multiline className={s.footNote}>The stickers are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
