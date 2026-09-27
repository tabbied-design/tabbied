import { TabbiedPattern } from 'tabbied/react';
import { bloks, polkadot, lobeform, bangle } from 'tabbied/patterns';
import s from './second-chance-shelter.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Second Chance Animal Shelter: Rescue and rehoming, Westbrook',
  description:
    'Dogs, cats and rabbits waiting for a home at 300 Kennel Lane, Westbrook. Meet them on their kennel cards, see how adoption works, foster, volunteer, give to the cattery roof, or report a lost or found pet.',
};

/* Site colors. Cream kennel cards, ink type, coral and teal. The terrier
   in the hero is cut from a bloks field; every trading card's photo window
   has its own field behind the animal. Foster, volunteer and donate carry
   a field each, and the footer ends on bloks again. */
const CREAM = '#fff6ea';
const INK = '#2a2130';
const CORAL = '#ff6b4a';
const TEAL = '#3a9c8e';

const HERO_FILL = [CREAM, CORAL, TEAL, INK, CORAL, TEAL];
const WINDOW_BISCUIT = [CREAM, CORAL, CORAL, TEAL, CREAM, CORAL];
const WINDOW_PEPPER = [CREAM, TEAL, TEAL, CORAL, TEAL, INK];
const WINDOW_CLOVER = [TEAL, CREAM, CREAM, CORAL, TEAL, CREAM];
const WINDOW_DUCHESS = [INK, CORAL, TEAL, CREAM, CORAL, TEAL];
const FOSTER = ['transparent', TEAL, CORAL, CREAM, TEAL, INK];
const ROTA = ['transparent', CORAL, TEAL, INK, CORAL, TEAL];
const DOTS = ['transparent', CREAM, CORAL, CREAM, TEAL, CREAM];
const FOOT = ['transparent', CORAL, TEAL, CREAM, CORAL, TEAL];

const NAV = [
  ['Meet them', '#meet'],
  ['Adopting', '#adopt'],
  ['Foster', '#foster'],
  ['Volunteer', '#volunteer'],
  ['Donate', '#donate'],
  ['Lost and found', '#lost'],
  ['Visit', '#visit'],
];

const HERO_STATS = [
  ['412', 'animals rehomed last year'],
  ['38', 'foster homes on call'],
  ['23', 'waiting right now'],
];

const STATS_BISCUIT = [
  ['Age', '3 years'],
  ['Size', 'Small'],
  ['Kennel', 'No. 14'],
];
const GOOD_BISCUIT = [
  ['Kids', 'yes'],
  ['Dogs', 'yes'],
  ['Cats', 'no'],
];

const STATS_PEPPER = [
  ['Age', '5 years'],
  ['Size', 'Medium'],
  ['Pen', 'No. 6'],
];
const GOOD_PEPPER = [
  ['Kids', 'yes'],
  ['Dogs', 'no'],
  ['Cats', 'yes'],
];

const STATS_CLOVER = [
  ['Age', '1 year'],
  ['Weight', '2 kg'],
  ['Hutch', 'No. 3'],
];
const GOOD_CLOVER = [
  ['Kids', 'yes'],
  ['Dogs', 'no'],
  ['Rabbits', 'yes'],
];

const STATS_DUCHESS = [
  ['Age', '11 years'],
  ['Size', 'Large'],
  ['Kennel', 'No. 2'],
];
const GOOD_DUCHESS = [
  ['Kids', 'yes'],
  ['Dogs', 'yes'],
  ['Cats', 'yes'],
];

const STEPS = [
  ['Meet', 'Come in, walk them round the field, sit with them. As many visits as it takes.'],
  ['Home visit', 'One of our volunteers pops round for a cup of tea and a look at the garden.'],
  ['Trial', 'Two weeks at home, with our number on the fridge and no hard feelings either way.'],
  ['Adoption day', 'Paperwork, a starter bag of food and a photo by the gate for the wall.'],
];

const FEES = [
  ['Dog', '$195'],
  ['Cat', '$120'],
  ['Rabbit, or a pair', '$60 / $90'],
];

const FOSTER_FACTS = [
  ['3 weeks', 'the average stay in a foster home'],
  ['$0', 'it costs you: food, bedding and vet bills are ours'],
  ['24 h', 'a phone line for foster carers, day and night'],
];

const FOSTER_NEEDS = [
  'Puppies and kittens too young for the kennels',
  'Older dogs who find the noise too much',
  'Mothers with litters, for six to eight weeks',
  'Anyone getting over an operation',
];

type Slot = { day: string; am: string; pm: string; amKind: 'full' | 'need'; pmKind: 'full' | 'need' };

const ROTA_WEEK: Slot[] = [
  { day: 'Mon', am: 'Full', pm: '2 needed', amKind: 'full', pmKind: 'need' },
  { day: 'Tue', am: '1 needed', pm: 'Full', amKind: 'need', pmKind: 'full' },
  { day: 'Wed', am: 'Full', pm: 'Full', amKind: 'full', pmKind: 'full' },
  { day: 'Thu', am: '3 needed', pm: '1 needed', amKind: 'need', pmKind: 'need' },
  { day: 'Fri', am: 'Full', pm: '2 needed', amKind: 'full', pmKind: 'need' },
  { day: 'Sat', am: 'Full', pm: 'Full', amKind: 'full', pmKind: 'full' },
  { day: 'Sun', am: '2 needed', pm: 'Full', amKind: 'need', pmKind: 'full' },
];

const ROLES = [
  ['Dog walkers', 'An hour round the field and the lane, morning or afternoon. Training session first.'],
  ['Cat cuddlers', 'Sit in the cattery and read, knit or just be there. Shy cats learn people this way.'],
  ['Laundry', 'Forty loads of bedding a day. Fold, stack, repeat, with the radio on.'],
];

const GIFTS = [
  ['$10', 'feeds a cat for a week'],
  ['$25', 'pays for a microchip and first jabs'],
  ['$50', 'covers a night in the vet\'s kennels'],
];

const THERMO_TICKS = ['$40k', '$30k', '$20k', '$10k', '$0'];

type Poster = { head: string; what: string; where: string; when: string; phone: string; kind: 'found' | 'lost' };

const POSTERS: Poster[] = [
  { head: 'Found', what: 'Ginger tom, white socks, very chatty', where: 'Mill Road, by the allotments', when: 'Sunday 21 September', phone: '(555) 019-0300', kind: 'found' },
  { head: 'Lost', what: 'Pip, a black and tan dachshund, red collar', where: 'Westbrook Common', when: 'Thursday 18 September', phone: '(555) 019-4471', kind: 'lost' },
  { head: 'Found', what: 'Grey lop rabbit, female, tame', where: 'Station car park', when: 'Tuesday 23 September', phone: '(555) 019-0300', kind: 'found' },
];

const TABS = ['1', '2', '3', '4', '5', '6'];

const LOST_STEPS = [
  'Ring us first: we hold every stray brought in within twelve miles',
  'Microchip scans are free at our front desk, any day we are open',
  'Put a poster up; we will print and laminate it for you',
];

const HOURS = [
  ['Meeting the animals', 'Wed-Sun, 12:00-16:00'],
  ['Office and reception', 'Mon-Sat, 09:00-17:00'],
  ['Lost and found line', 'Every day, 08:00-20:00'],
];

export default function SecondChanceShelterPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#fff6ea',
        '--ink': '#2a2130',
        '--coral': '#ff6b4a',
        '--teal': '#3a9c8e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,ink,coral,teal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Grandstander:ital,wght@0,100..900;1,100..900&family=Atkinson+Hyperlegible+Next:ital,wght@0,200..800;1,200..800&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markBadge" data-edit-max="60" className={s.markBadge}>2nd</span>
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Second Chance</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barDonate" data-edit-max="28" className={s.barDonate} href="#donate">Donate</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="sc-hero-h">
          <div className={s.heroText}>
            <p data-edit="scHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Animal rescue and rehoming, Westbrook</p>
            <h1 id="sc-hero-h" className={s.heroName}>
              <span data-edit="scHero.heroSecond" data-edit-max="60" className={s.heroSecond}>Second Chance</span>
              <span data-edit="scHero.heroShelter" data-edit-max="60" className={s.heroShelter}>Animal Shelter</span>
            </h1>
            <p data-edit="scHero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Dogs, cats and rabbits who lost their first home, waiting at 300
              Kennel Lane for the next one. Every one has a card: read it,
              then come and say hello.
            </p>
            <div className={s.heroActions}>
              <a data-edit="scHero.btnCoral" data-edit-max="28" className={s.btnCoral} href="#meet">Meet them</a>
              <a data-edit="scHero.btnLine" data-edit-max="28" className={s.btnLine} href="#adopt">How adoption works</a>
            </div>
            <dl className={s.heroStats}>
              {HERO_STATS.map(([figure, text], i) => (
                <div key={figure}>
                  <dt data-edit={`scHero.term.${i}`} data-edit-max="28">{figure}</dt>
                  <dd data-edit={`scHero.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className={s.poster}>
            <p data-edit="scHero.posterHead" data-edit-max="240" data-edit-multiline className={s.posterHead}>Adopt me!</p>
            <Artwork data-edit-pattern="scHero.field" data-edit-roles="0,2,3,1,2,3"
              slug="second-chance-shelter-terrier"
              alt="Biscuit, a scruffy terrier sitting and looking up, his shape cut from a pattern of quarter circles and squares"
              mode="fill"
              inks={[]}
              className={s.heroDog}>
              <TabbiedPattern
                pattern={bloks}
                palette={HERO_FILL}
                fit="grid"
                cellSize={36}
                seed="second-chance-hero"
                style={{ position: 'absolute', inset: 0 }}
              />
            </Artwork>
            <figcaption className={s.posterFoot}>
              <strong data-edit="scHero.emphasis">Biscuit</strong>
              <span data-edit="scHero.text" data-edit-max="60">Terrier cross, 3. Kennel 14. Loves a ball, hates the hoover.</span>
            </figcaption>
          </figure>
        </section>

        {/* ------------------------------------------------------------ MEET */}
        <section id="meet" className={s.sec} aria-labelledby="sc-meet-h">
          <div className={s.secHead}>
            <p data-edit="meet.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Meet them</p>
            <h2 data-edit="meet.secTitle" data-edit-max="60" id="sc-meet-h" className={s.secTitle}>Collect the whole set</h2>
            <p data-edit="meet.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
              Four of the twenty-three waiting this week. Energy is in paws,
              one for a sofa, five for a marathon.
            </p>
          </div>

          <ul className={s.cards}>
            <li className={`${s.card} ${s.cardCoral}`}>
              <div className={s.cardBanner}>
                <h3 data-edit="meet.cardName" data-edit-max="40" className={s.cardName}>Biscuit</h3>
                <p data-edit="meet.cardNo" data-edit-max="240" data-edit-multiline className={s.cardNo}>No. 14</p>
              </div>
              <div className={s.window}>
                <div data-edit-pattern="meet.field" data-edit-roles="0,2,2,3,0,2" className={s.windowField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={bloks}
                    palette={WINDOW_BISCUIT}
                    fit="grid"
                    cellSize={36}
                    seed="second-chance-biscuit"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="second-chance-shelter-terrier"
                  alt="Biscuit, a scruffy terrier, sitting and looking up"
                  inks={['var(--text)', 'var(--cream)']}
                  className={s.animalTall}
                />
              </div>
              <p data-edit="meet.cardType" data-edit-max="240" data-edit-multiline className={s.cardType}>Terrier cross, dog</p>
              <dl className={s.stats}>
                {STATS_BISCUIT.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`meet.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`meet.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.energy}>
                <span data-edit="meet.energyLabel" data-edit-max="60" className={s.energyLabel}>Energy</span>
                <span className={`${s.paws} ${s.e5}`} aria-hidden="true" />
                <span data-edit="meet.energyText" data-edit-max="60" className={s.energyText}>5 of 5</span>
              </p>
              <ul className={s.good} aria-label="Good with">
                {GOOD_BISCUIT.map(([who, ok], i) => (
                  <li key={who} className={s[ok]}><span data-edit={`meet.text.${i}`} data-edit-max="60">{who}</span><span data-edit={`meet.text2.${i}`} data-edit-max="60">{ok}</span></li>
                ))}
              </ul>
              <p data-edit="meet.cardFlavour" data-edit-max="240" data-edit-multiline className={s.cardFlavour}>Will fetch until your arm gives out. Needs a fenced garden and someone home by lunch.</p>
            </li>

            <li className={`${s.card} ${s.cardTeal}`}>
              <div className={s.cardBanner}>
                <h3 data-edit="meet.cardName2" data-edit-max="40" className={s.cardName}>Pepper</h3>
                <p data-edit="meet.cardNo2" data-edit-max="240" data-edit-multiline className={s.cardNo}>No. 06</p>
              </div>
              <div className={s.window}>
                <div data-edit-pattern="meet.field2" data-edit-roles="0,3,3,2,3,1" className={s.windowField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={polkadot}
                    palette={WINDOW_PEPPER}
                    fit="grid"
                    cellSize={30}
                    seed="second-chance-pepper"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="second-chance-shelter-tabby"
                  alt="Pepper, a tabby cat sitting upright with her tail around her paws"
                  inks={['var(--text)', 'color-mix(in oklab, var(--cream) 80%, var(--teal))']}
                  className={s.animalTall}
                />
              </div>
              <p data-edit="meet.cardType2" data-edit-max="240" data-edit-multiline className={s.cardType}>Tabby, cat</p>
              <dl className={s.stats}>
                {STATS_PEPPER.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`meet.term2.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`meet.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.energy}>
                <span data-edit="meet.energyLabel2" data-edit-max="60" className={s.energyLabel}>Energy</span>
                <span className={`${s.paws} ${s.e2}`} aria-hidden="true" />
                <span data-edit="meet.energyText2" data-edit-max="60" className={s.energyText}>2 of 5</span>
              </p>
              <ul className={s.good} aria-label="Good with">
                {GOOD_PEPPER.map(([who, ok], i) => (
                  <li key={who} className={s[ok]}><span data-edit={`meet.text3.${i}`} data-edit-max="60">{who}</span><span data-edit={`meet.text4.${i}`} data-edit-max="60">{ok}</span></li>
                ))}
              </ul>
              <p data-edit="meet.cardFlavour2" data-edit-max="240" data-edit-multiline className={s.cardFlavour}>A windowsill cat. Talks back when spoken to, and sleeps on the paper you are reading.</p>
            </li>

            <li className={`${s.card} ${s.cardInk}`}>
              <div className={s.cardBanner}>
                <h3 data-edit="meet.cardName3" data-edit-max="40" className={s.cardName}>Clover</h3>
                <p data-edit="meet.cardNo3" data-edit-max="240" data-edit-multiline className={s.cardNo}>No. 03</p>
              </div>
              <div className={s.window}>
                <div data-edit-pattern="meet.field3" data-edit-roles="3,0,0,2,3,0" className={s.windowField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={bloks}
                    palette={WINDOW_CLOVER}
                    fit="grid"
                    cellSize={36}
                    seed="second-chance-clover"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="second-chance-shelter-rabbit"
                  alt="Clover, a lop-eared rabbit, sitting"
                  inks={['color-mix(in oklab, var(--text) 78%, var(--teal))', 'var(--cream)']}
                  className={s.animalWide}
                />
              </div>
              <p data-edit="meet.cardType3" data-edit-max="240" data-edit-multiline className={s.cardType}>Lop, rabbit</p>
              <dl className={s.stats}>
                {STATS_CLOVER.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`meet.term3.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`meet.body3.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.energy}>
                <span data-edit="meet.energyLabel3" data-edit-max="60" className={s.energyLabel}>Energy</span>
                <span className={`${s.paws} ${s.e3}`} aria-hidden="true" />
                <span data-edit="meet.energyText3" data-edit-max="60" className={s.energyText}>3 of 5</span>
              </p>
              <ul className={s.good} aria-label="Good with">
                {GOOD_CLOVER.map(([who, ok], i) => (
                  <li key={who} className={s[ok]}><span data-edit={`meet.text5.${i}`} data-edit-max="60">{who}</span><span data-edit={`meet.text6.${i}`} data-edit-max="60">{ok}</span></li>
                ))}
              </ul>
              <p data-edit="meet.cardFlavour3" data-edit-max="240" data-edit-multiline className={s.cardFlavour}>Wants a friend of her own kind and a run with room to binky. Rehomed only with another rabbit.</p>
            </li>

            <li className={`${s.card} ${s.cardCoralDark}`}>
              <div className={s.cardBanner}>
                <h3 data-edit="meet.cardName4" data-edit-max="40" className={s.cardName}>Duchess</h3>
                <p data-edit="meet.cardNo4" data-edit-max="240" data-edit-multiline className={s.cardNo}>No. 02</p>
              </div>
              <div className={s.window}>
                <div data-edit-pattern="meet.field4" data-edit-roles="1,2,3,0,2,3" className={s.windowField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={polkadot}
                    palette={WINDOW_DUCHESS}
                    fit="grid"
                    cellSize={30}
                    seed="second-chance-duchess"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="second-chance-shelter-greyhound"
                  alt="Duchess, an old greyhound lying down with her head up"
                  inks={['var(--text)', 'color-mix(in oklab, var(--cream) 78%, var(--coral))']}
                  className={s.animalWide}
                />
              </div>
              <p data-edit="meet.cardType4" data-edit-max="240" data-edit-multiline className={s.cardType}>Retired greyhound, dog</p>
              <dl className={s.stats}>
                {STATS_DUCHESS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`meet.term4.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`meet.body4.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.energy}>
                <span data-edit="meet.energyLabel4" data-edit-max="60" className={s.energyLabel}>Energy</span>
                <span className={`${s.paws} ${s.e1}`} aria-hidden="true" />
                <span data-edit="meet.energyText4" data-edit-max="60" className={s.energyText}>1 of 5</span>
              </p>
              <ul className={s.good} aria-label="Good with">
                {GOOD_DUCHESS.map(([who, ok], i) => (
                  <li key={who} className={s[ok]}><span data-edit={`meet.text7.${i}`} data-edit-max="60">{who}</span><span data-edit={`meet.text8.${i}`} data-edit-max="60">{ok}</span></li>
                ))}
              </ul>
              <p data-edit="meet.cardFlavour4" data-edit-max="240" data-edit-multiline className={s.cardFlavour}>Raced for four years, retired for seven. Two short walks and the rest of the day on a duvet.</p>
            </li>
          </ul>
          <p data-edit="meet.cardsNote" data-edit-max="240" data-edit-multiline className={s.cardsNote}>Nineteen more on the kennel board at reception. Their cards change every Wednesday.</p>
        </section>

        {/* ----------------------------------------------------------- ADOPT */}
        <section id="adopt" className={s.sec} aria-labelledby="sc-adopt-h">
          <div className={s.adoptGrid}>
            <div>
              <div className={s.secHead}>
                <p data-edit="adopt.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Adopting</p>
                <h2 data-edit="adopt.secTitle" data-edit-max="60" id="sc-adopt-h" className={s.secTitle}>How adoption works</h2>
                <p data-edit="adopt.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  Four steps, usually two or three weeks from first hello to
                  going home. Nobody is rushed, least of all the animal.
                </p>
              </div>
              <ol className={s.steps}>
                {STEPS.map(([name, text], i) => (
                  <li key={name}>
                    <h3 data-edit={`adopt.stepName.${i}`} data-edit-max="40" className={s.stepName}>{name}</h3>
                    <p data-edit={`adopt.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <aside className={s.feeTag} aria-labelledby="sc-fee-h">
              <h3 data-edit="scFee.feeTitle" data-edit-max="40" id="sc-fee-h" className={s.feeTitle}>The adoption fee</h3>
              <dl className={s.fees}>
                {FEES.map(([who, price], i) => (
                  <div key={who}>
                    <dt data-edit={`scFee.term.${i}`} data-edit-max="28">{who}</dt>
                    <dd data-edit={`scFee.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="scFee.feeNote" data-edit-max="240" data-edit-multiline className={s.feeNote}>Every animal goes home neutered, microchipped, vaccinated, wormed and flea-treated, with four weeks of free pet insurance.</p>
            </aside>
          </div>
        </section>

        {/* ---------------------------------------------------------- FOSTER */}
        <section id="foster" className={s.sec} aria-labelledby="sc-foster-h">
          <div className={s.fosterPanel}>
            <div data-edit-pattern="foster.field" data-edit-roles="transparent,3,2,0,3,1" className={s.fosterField} aria-hidden="true">
              <TabbiedPattern
                pattern={lobeform}
                palette={FOSTER}
                options={{ frequency: 0.7 }}
                fit="grid"
                cellSize={30}
                seed="second-chance-foster"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.fosterCard}>
              <p data-edit="foster.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Foster</p>
              <h2 data-edit="foster.secTitle" data-edit-max="60" id="sc-foster-h" className={s.secTitle}>A spare room is a kennel freed</h2>
              <p data-edit="foster.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Some animals do not cope with kennels at all. A few weeks in a
                quiet house turns them back into themselves, and makes room
                here for the next one through the gate.
              </p>
              <dl className={s.fosterFacts}>
                {FOSTER_FACTS.map(([figure, text], i) => (
                  <div key={figure}>
                    <dt data-edit={`foster.term.${i}`} data-edit-max="28">{figure}</dt>
                    <dd data-edit={`foster.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
              <h3 data-edit="foster.subTitle" data-edit-max="40" className={s.subTitle}>Who needs fostering most</h3>
              <ul className={s.pawList}>
                {FOSTER_NEEDS.map((n, i) => (
                  <li data-edit={`foster.item.${i}`} data-edit-max="80" key={n}>{n}</li>
                ))}
              </ul>
              <a data-edit="foster.btnInk" data-edit-max="28" className={s.btnInk} href="mailto:foster@secondchance.example">Ask about fostering</a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- VOLUNTEER */}
        <section id="volunteer" className={s.sec} aria-labelledby="sc-vol-h">
          <div className={s.volGrid}>
            <div>
              <div className={s.secHead}>
                <p data-edit="volunteer.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Volunteer</p>
                <h2 data-edit="volunteer.secTitle" data-edit-max="60" id="sc-vol-h" className={s.secTitle}>Walkers, cuddlers and folders</h2>
              </div>
              <ul className={s.roles}>
                {ROLES.map(([name, text], i) => (
                  <li key={name}>
                    <h3 data-edit={`volunteer.roleName.${i}`} data-edit-max="40" className={s.roleName}>{name}</h3>
                    <p data-edit={`volunteer.roleText.${i}`} data-edit-max="240" data-edit-multiline className={s.roleText}>{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.rotaWrap}>
              <div data-edit-pattern="volunteer.field" data-edit-roles="transparent,2,3,1,2,3" className={s.rotaField} aria-hidden="true">
                <TabbiedPattern
                  pattern={bangle}
                  palette={ROTA}
                  options={{ frequency: 0.6 }}
                  fit="grid"
                  cellSize={28}
                  seed="second-chance-rota"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.rota}>
                <h3 data-edit="volunteer.rotaTitle" data-edit-max="40" className={s.rotaTitle}>This week&apos;s dog walking rota</h3>
                <table className={s.rotaTable}>
                  <caption data-edit="volunteer.srOnly" className={s.srOnly}>Dog walking slots this week, morning and afternoon, and how many walkers are still needed</caption>
                  <thead>
                    <tr>
                      <th data-edit="volunteer.heading" scope="col">Day</th>
                      <th data-edit="volunteer.heading2" scope="col">09:30</th>
                      <th data-edit="volunteer.heading3" scope="col">14:00</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROTA_WEEK.map((r, i) => (
                      <tr key={r.day}>
                        <th data-edit={`volunteer.heading4.${i}`} scope="row">{r.day}</th>
                        <td>
                          <span data-edit={`volunteer.text.${i}`} data-edit-max="60" className={s[r.amKind]}>{r.am}</span>
                        </td>
                        <td>
                          <span data-edit={`volunteer.text2.${i}`} data-edit-max="60" className={s[r.pmKind]}>{r.pm}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p data-edit="volunteer.rotaNote" data-edit-max="240" data-edit-multiline className={s.rotaNote}>Sign up at reception, or reply to the Sunday rota email.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- DONATE */}
        <section id="donate" className={s.sec} aria-labelledby="sc-donate-h">
          <div className={s.donatePanel}>
            <div data-edit-pattern="donate.field" data-edit-roles="transparent,0,2,0,3,0" className={s.donateField} aria-hidden="true">
              <TabbiedPattern
                pattern={polkadot}
                palette={DOTS}
                options={{ frequency: 0.5 }}
                fit="grid"
                cellSize={40}
                seed="second-chance-dots"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.donateGrid}>
              <div className={s.thermo}>
                <p data-edit="donate.thermoGoal" data-edit-max="240" data-edit-multiline className={s.thermoGoal}>Goal $40,000</p>
                <div className={s.gauge}>
                  <ol className={s.ticks} aria-hidden="true">
                    {THERMO_TICKS.map((t, i) => (
                      <li data-edit={`donate.item.${i}`} data-edit-max="80" key={t}>{t}</li>
                    ))}
                  </ol>
                  <div className={s.tube}>
                    <span className={s.mercury} />
                  </div>
                  <span className={s.bulb} aria-hidden="true" />
                  <p className={s.thermoNow}>
                    <strong data-edit="donate.emphasis">$27,850</strong>
                    <span data-edit="donate.text" data-edit-max="60">raised so far</span>
                  </p>
                </div>
              </div>

              <div className={s.donateText}>
                <p data-edit="donate.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Donate</p>
                <h2 data-edit="donate.secTitle" data-edit-max="60" id="sc-donate-h" className={s.secTitle}>A new roof for the cattery</h2>
                <p data-edit="donate.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                  The old one leaks over pens 9 to 16, so those cats sleep in
                  the office. Help us get them back into dry pens before
                  winter.
                </p>
                <ul className={s.gifts}>
                  {GIFTS.map(([amount, text], i) => (
                    <li key={amount}>
                      <strong data-edit={`donate.emphasis2.${i}`}>{amount}</strong>
                      <span data-edit={`donate.text2.${i}`} data-edit-max="60">{text}</span>
                    </li>
                  ))}
                </ul>
                <form className={s.giveForm} action="#">
                  <div className={s.field}>
                    <label data-edit="donate.label" htmlFor="sc-amount">Amount</label>
                    <select id="sc-amount" name="amount" defaultValue="25">
                      <option value="10">$10</option>
                      <option value="25">$25</option>
                      <option value="50">$50</option>
                      <option value="100">$100</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="donate.label2" htmlFor="sc-email">Email for the receipt</label>
                    <input id="sc-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <button data-edit="donate.btnCoral" data-edit-max="24" className={s.btnCoral} type="submit">Give to the roof</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ LOST */}
        <section id="lost" className={s.sec} aria-labelledby="sc-lost-h">
          <div className={s.lostHead}>
            <div className={s.secHead}>
              <p data-edit="lost.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Lost and found</p>
              <h2 data-edit="lost.secTitle" data-edit-max="60" id="sc-lost-h" className={s.secTitle}>On the noticeboard</h2>
            </div>
            <ol className={s.lostSteps}>
              {LOST_STEPS.map((step, i) => (
                <li data-edit={`lost.item.${i}`} data-edit-max="80" key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <ul className={s.board}>
            {POSTERS.map((p, i) => (
              <li key={p.what} className={`${s.notice} ${s[p.kind]}`}>
                <p data-edit={`lost.noticeHead.${i}`} data-edit-max="240" data-edit-multiline className={s.noticeHead}>{p.head}</p>
                <p data-edit={`lost.noticeWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.noticeWhat}>{p.what}</p>
                <dl className={s.noticeFacts}>
                  <div>
                    <dt data-edit={`lost.term.${i}`} data-edit-max="28">Where</dt>
                    <dd data-edit={`lost.body.${i}`} data-edit-max="200" data-edit-multiline>{p.where}</dd>
                  </div>
                  <div>
                    <dt data-edit={`lost.term2.${i}`} data-edit-max="28">When</dt>
                    <dd data-edit={`lost.body2.${i}`} data-edit-max="200" data-edit-multiline>{p.when}</dd>
                  </div>
                </dl>
                <ul className={s.tabs} aria-label={`Tear-off tabs: ${p.phone}`}>
                  {TABS.map((t, i2) => (
                    <li data-edit={`lost.item2.${i}.${i2}`} data-edit-max="80" key={t}>{p.phone}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------------- VISIT */}
        <section id="visit" className={s.sec} aria-labelledby="sc-visit-h">
          <div className={s.visitGrid}>
            <div>
              <p data-edit="visit.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Visit</p>
              <h2 data-edit="visit.secTitle" data-edit-max="60" id="sc-visit-h" className={s.secTitle}>300 Kennel Lane, Westbrook</h2>
              <p data-edit="visit.secLede" data-edit-max="240" data-edit-multiline className={s.secLede}>
                Up the lane past the riding school; the car park is on the
                left before the gate. Bring wellies from October to April.
              </p>
            </div>
            <dl className={s.hours}>
              {HOURS.map(([what, when], i) => (
                <div key={what}>
                  <dt data-edit={`visit.term.${i}`} data-edit-max="28">{what}</dt>
                  <dd data-edit={`visit.body.${i}`} data-edit-max="200" data-edit-multiline>{when}</dd>
                </div>
              ))}
            </dl>
            <div className={s.contact}>
              <p><a data-edit="visit.link" data-edit-max="28" href="tel:+15550190300">(555) 019-0300</a></p>
              <p><a data-edit="visit.link2" data-edit-max="28" href="mailto:hello@secondchance.example">hello@secondchance.example</a></p>
              <p data-edit="visit.contactNote" data-edit-max="240" data-edit-multiline className={s.contactNote}>Registered charity. Open on bank holidays except Christmas Day.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,0,2,3" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={bloks}
            palette={FOOT}
            options={{ frequency: 0.7 }}
            fit="grid"
            cellSize={36}
            seed="second-chance-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <div>
            <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Second Chance Animal Shelter</p>
            <p data-edit="footer.footSub" data-edit-max="240" data-edit-multiline className={s.footSub}>300 Kennel Lane, Westbrook</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel" data-edit-max="240" data-edit-multiline className={s.footLabel}>Say hello</p>
            <p><a data-edit="footer.link" data-edit-max="28" href="tel:+15550190300">(555) 019-0300</a></p>
            <p><a data-edit="footer.link2" data-edit-max="28" href="mailto:hello@secondchance.example">hello@secondchance.example</a></p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel2" data-edit-max="240" data-edit-multiline className={s.footLabel}>Open</p>
            <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Meeting the animals Wed-Sun, 12:00-16:00.</p>
          </div>
          <div className={s.footCol}>
            <p data-edit="footer.footLabel3" data-edit-max="240" data-edit-multiline className={s.footLabel}>Small print</p>
            <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional shelter; the animals, people, prices and totals are invented.</p>
            <p>Patterns by <a data-edit="footer.link3" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.</p>
            <p data-edit="footer.body3" data-edit-max="240" data-edit-multiline>The animals are generated images, drawn in the page&apos;s own colors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
