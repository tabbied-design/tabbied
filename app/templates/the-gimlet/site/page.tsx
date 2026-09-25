import { TabbiedPattern } from 'tabbied/react';
import { diadem, northstar } from 'tabbied/patterns';
import s from './the-gimlet.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'The Gimlet: Cocktail bar, Cordial Lane',
  description:
    'A forty-seat basement cocktail bar on Cordial Lane. One long list of gimlets, sours and stirred drinks, a house lime cordial, private hire for up to ninety, open from 5 pm Tuesday to Sunday.',
};

/* Site colors. Stars and diamonds sit on `transparent`, so they are drawn
   straight onto the night green of the page. */
const CREAM = '#EDE8DC';
const LIME = '#A7C957';
const BRASS = '#C9A35B';
const GRAY = '#6E7A73';

const STARS = ['transparent', BRASS, LIME, GRAY];
const DIAMONDS = ['transparent', BRASS, CREAM, LIME];

const NAV = [
  ['The list', '#menu'],
  ['The team', '#team'],
  ['Private hire', '#hire'],
  ['House rules', '#rules'],
  ['Hours', '#hours'],
];

type Drink = {
  name: string;
  spirit: string;
  notes: string;
  price: string;
};

type Glass = {
  slug: string;
  alt: string;
  ink: string;
  shape: 'tall' | 'wide';
  caption: string;
};

type Section = {
  id: string;
  title: string;
  note: string;
  drinks: Drink[];
  glass?: Glass;
};

const LIST: Section[] = [
  {
    id: 'gimlets',
    title: 'Gimlets',
    note: 'The house drink, five ways. Our lime cordial takes three days: peel, sugar and time.',
    drinks: [
      { name: 'The Gimlet', spirit: 'London dry gin, house lime cordial', notes: 'Shaken hard, served up and very cold. The one the bar is named for.', price: '$14' },
      { name: 'Navy Gimlet', spirit: 'Navy strength gin, cordial, sea salt', notes: 'Stronger and saltier, with a longer finish.', price: '$15' },
      { name: 'Garden Gimlet', spirit: 'Gin, cucumber, basil, lime', notes: 'Green and cool; the basil is muddled to order.', price: '$14' },
      { name: 'Smoke Gimlet', spirit: 'Mezcal, cordial, a pinch of chile', notes: 'The same drink with a campfire under it.', price: '$15' },
      { name: 'Gimlet Royale', spirit: 'Gin, cordial, sparkling wine', notes: 'Topped in a flute, for a birthday or a Tuesday.', price: '$16' },
    ],
    glass: {
      slug: 'the-gimlet-shaker',
      alt: 'A steel cocktail shaker',
      ink: 'var(--brass)',
      shape: 'tall',
      caption: 'Forty seconds, hard, over cracked ice.',
    },
  },
  {
    id: 'sours',
    title: 'Sours and fizzes',
    note: 'Fresh citrus squeezed at five, egg white on request, never from a carton.',
    drinks: [
      { name: 'Whiskey Sour', spirit: 'Bourbon, lemon, sugar, egg white', notes: 'Bitters dropped on the foam in three dots.', price: '$14' },
      { name: 'Clover Club', spirit: 'Gin, raspberry, dry vermouth, lemon', notes: 'Pink, silky, older than you would guess.', price: '$14' },
      { name: 'Tom Collins', spirit: 'Old Tom gin, lemon, soda', notes: 'Long, tall and gone before you notice.', price: '$13' },
      { name: 'French 75', spirit: 'Gin, lemon, sugar, sparkling wine', notes: 'Served in a coupe, the way the bar first poured it.', price: '$16' },
    ],
    glass: {
      slug: 'the-gimlet-bottle',
      alt: 'A bottle of London dry gin',
      ink: 'var(--cream)',
      shape: 'tall',
      caption: 'Eleven gins on the back bar; ask for the one from the coast.',
    },
  },
  {
    id: 'stirred',
    title: 'Stirred',
    note: 'Built in a mixing glass over one big block of ice and stirred for forty turns.',
    drinks: [
      { name: 'House Martini', spirit: 'Gin, dry vermouth, five to one', notes: 'Lemon twist or an olive. Say dirty and we will.', price: '$15' },
      { name: 'Negroni', spirit: 'Gin, bitter aperitivo, sweet vermouth', notes: 'Equal parts, on a single rock, orange peel.', price: '$14' },
      { name: 'Manhattan', spirit: 'Rye, sweet vermouth, bitters', notes: 'With a cherry we soak ourselves in September.', price: '$15' },
      { name: 'Brass Monkey', spirit: 'Aged rum, brown butter, cacao, bitters', notes: 'The winter one. Rich, dark, slightly ridiculous.', price: '$16' },
    ],
    glass: {
      slug: 'the-gimlet-coupe',
      alt: 'A coupe glass with a lime twist',
      ink: 'var(--lime)',
      shape: 'wide',
      caption: 'Every glass waits in the freezer until it is poured.',
    },
  },
  {
    id: 'zero',
    title: 'Without the gin',
    note: 'Made with the same care and the same cordial, at a gentler price.',
    drinks: [
      { name: 'No-Gimlet', spirit: 'Juniper tea, lime cordial, tonic', notes: 'Tastes more like the real one than it has a right to.', price: '$9' },
      { name: 'Shrub Spritz', spirit: 'Rhubarb shrub, soda, thyme', notes: 'Sour, fizzy and bright pink.', price: '$9' },
      { name: 'Lime and Bitters', spirit: 'Cordial, soda, a dash of bitters', notes: 'The bartender drink. Almost no alcohol at all.', price: '$6' },
    ],
  },
];

const SNACKS = [
  ['Warm olives', '$6'],
  ['Salted almonds', '$6'],
  ['Gilda, each', '$4'],
  ['Cheese toastie', '$11'],
];

const TEAM = [
  {
    initials: 'RV',
    name: 'Rosa Vance',
    role: 'Head bartender, since opening',
    order: 'Ask her for a Navy Gimlet with the salt left out.',
  },
  {
    initials: 'TO',
    name: 'Tomas Okoro',
    role: 'Bartender, keeper of the cordial',
    order: 'He will make you a Martini exactly as dry as you say.',
  },
  {
    initials: 'IB',
    name: 'Ines Batista',
    role: 'Bartender, Thursday to Saturday',
    order: 'Order a Clover Club and watch her shake it.',
  },
  {
    initials: 'GH',
    name: 'Gus Hale',
    role: 'Bar back and door',
    order: 'Knows every table that is about to leave.',
  },
];

const SPACES = [
  { name: 'The back room', size: 'Up to 24 seated, 40 standing', when: 'Sunday to Thursday', price: 'From $1,200 minimum spend' },
  { name: 'The whole bar', size: 'Up to 90 standing', when: 'Monday and Tuesday nights', price: 'From $6,500 minimum spend' },
  { name: 'A cocktail class', size: 'Up to 12, ninety minutes', when: 'Saturday and Sunday, 2 pm', price: '$65 a head, three drinks' },
];

const RULES = [
  ['Twenty-one and over', 'Everyone shows ID at the door, every time, however grey the beard.'],
  ['Walk in', 'Tables for two to three are never booked. Groups of four or more may reserve.'],
  ['Sit down', 'There is no standing room. When the seats are full, Gus takes your number and texts.'],
  ['Keep it low', 'Phones on quiet. Music loud enough to hide a conversation, never to drown one.'],
];

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Thursday', '5 pm to midnight'],
  ['Friday and Saturday', '5 pm to 2 am'],
  ['Sunday', '4 pm to 11 pm'],
];

export default function TheGimletPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--night': '#0f1a16',
        '--cream': '#ede8dc',
        '--lime': '#a7c957',
        '--brass': '#c9a35b',
        '--gray': '#6e7a73',
        '--deep': '#18261f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="night,cream,lime,brass,gray,deep"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Jost:wght@300..600&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">The Gimlet</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="tel:+15550194417">Book for four</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            One axis down the middle of the page, the way the list runs.
            The coupe stands on it; stars fill the two margins. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,3,2,4" className={`${s.heroStars} ${s.heroStarsLeft}`} aria-hidden="true">
            <TabbiedPattern
              pattern={northstar}
              palette={STARS}
              options={{ frequency: 0.24 }}
              fit="grid"
              cellSize={44}
              seed="gimlet-left"
              redrawInterval={8800}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div data-edit-pattern="hero.field2" data-edit-roles="transparent,3,2,4" className={`${s.heroStars} ${s.heroStarsRight}`} aria-hidden="true">
            <TabbiedPattern
              pattern={northstar}
              palette={STARS}
              options={{ frequency: 0.24 }}
              fit="grid"
              cellSize={44}
              seed="gimlet-right"
              redrawInterval={9400}
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Cocktail bar, 41 Cordial Lane, down the green stairs</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Gin, lime,
              <br />
              <em>and not much else.</em>
            </h1>
            <Artwork
              slug="the-gimlet-coupe"
              alt="A coupe glass of gimlet with a twist of lime on the rim"
              inks={['var(--night)', 'var(--lime)']}
              className={s.heroCoupe}
            />
            <p data-edit="hero.heroLede" data-edit-max="240" data-edit-multiline className={s.heroLede}>
              Forty seats below the bookbinder, one long list, and a lime
              cordial that takes three days to make. Open from five, Tuesday
              to Sunday.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#menu">Read the list</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#hours">Hours and address</a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ LIST
            A single printed card down the center, glassware between its
            sections. */}
        <section id="menu" className={s.menu} aria-labelledby="menu-h">
          <p data-edit="menu.marginNote" data-edit-max="240" data-edit-multiline className={`${s.marginNote} ${s.marginLeft}`}>The Gimlet, the autumn list</p>
          <p data-edit="menu.marginNote2" data-edit-max="240" data-edit-multiline className={`${s.marginNote} ${s.marginRight}`}>Cordial batch no. 212, made on Tuesday</p>
          <div className={s.card}>
            <div className={s.cardHead}>
              <p data-edit="menu.cardHouse" data-edit-max="240" data-edit-multiline className={s.cardHouse}>The Gimlet</p>
              <h2 data-edit="menu.cardTitle" data-edit-max="60" id="menu-h" className={s.cardTitle}>The List</h2>
              <p data-edit="menu.cardSeason" data-edit-max="240" data-edit-multiline className={s.cardSeason}>Autumn, served from 5 pm until the last stool empties</p>
              <div data-edit-pattern="menu.field" data-edit-roles="transparent,3,1,2" className={s.cardRule} aria-hidden="true">
                <TabbiedPattern
                  pattern={diadem}
                  palette={DIAMONDS}
                  fit="grid"
                  cellSize={28}
                  seed="gimlet-rule"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>

            {LIST.map((sec, i) => (
              <div key={sec.id} className={s.course}>
                <h3 data-edit={`menu.courseTitle.${i}`} data-edit-max="40" id={`${sec.id}-h`} className={s.courseTitle}>{sec.title}</h3>
                <p data-edit={`menu.courseNote.${i}`} data-edit-max="240" data-edit-multiline className={s.courseNote}>{sec.note}</p>
                <ul className={s.drinks}>
                  {sec.drinks.map((d, i2) => (
                    <li key={d.name} className={s.drink}>
                      <div className={s.drinkLine}>
                        <h4 data-edit={`menu.drinkName.${i}.${i2}`} data-edit-max="36" className={s.drinkName}>{d.name}</h4>
                        <span className={s.leader} aria-hidden="true" />
                        <span data-edit={`menu.drinkPrice.${i}.${i2}`} data-edit-max="60" className={s.drinkPrice}>{d.price}</span>
                      </div>
                      <p data-edit={`menu.drinkSpirit.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.drinkSpirit}>{d.spirit}</p>
                      <p data-edit={`menu.drinkNotes.${i}.${i2}`} data-edit-max="240" data-edit-multiline className={s.drinkNotes}>{d.notes}</p>
                    </li>
                  ))}
                </ul>
                {sec.glass ? (
                  <figure className={s.glass}>
                    <Artwork
                      slug={sec.glass.slug}
                      alt={sec.glass.alt}
                      inks={['var(--deep)', sec.glass.ink]}
                      className={s[sec.glass.shape]}
                    />
                    <figcaption data-edit={`menu.caption.${i}`} data-edit-max="120" data-edit-multiline>{sec.glass.caption}</figcaption>
                  </figure>
                ) : null}
              </div>
            ))}

            <div className={s.snacks}>
              <h3 data-edit="menu.snacksTitle" data-edit-max="40" id="snacks-h" className={s.snacksTitle}>Something to eat</h3>
              <dl className={s.snackList}>
                {SNACKS.map(([what, price], i) => (
                  <div key={what}>
                    <dt data-edit={`menu.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`menu.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p data-edit="menu.cardFoot" data-edit-max="240" data-edit-multiline className={s.cardFoot}>Prices include tax. A 20 percent service charge is added for tables of six or more.</p>
          </div>
        </section>

        {/* ------------------------------------------------------------ TEAM */}
        <section id="team" className={s.team} aria-labelledby="team-h">
          <div className={s.secHead}>
            <p data-edit="team.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Behind the bar</p>
            <h2 data-edit="team.title" data-edit-max="60" id="team-h">Four people, one of them always on the door</h2>
          </div>
          <ul className={s.teamList}>
            {TEAM.map((t, i) => (
              <li key={t.name} className={s.member}>
                <span className={s.memberMark} aria-hidden="true">{t.initials}</span>
                <h3 data-edit={`team.memberName.${i}`} data-edit-max="40" className={s.memberName}>{t.name}</h3>
                <p data-edit={`team.memberRole.${i}`} data-edit-max="240" data-edit-multiline className={s.memberRole}>{t.role}</p>
                <p data-edit={`team.memberOrder.${i}`} data-edit-max="240" data-edit-multiline className={s.memberOrder}>{t.order}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ HIRE
            The gin bottle stands tall beside the spaces and the form. */}
        <section id="hire" className={s.hire} aria-labelledby="hire-h">
          <div className={s.hireInner}>
            <div className={s.hireArt}>
              <div className={s.bottleStars} aria-hidden="true">
                <TabbiedPattern
                  pattern={northstar}
                  palette={STARS}
                  options={{ frequency: 0.5 }}
                  fit="grid"
                  cellSize={32}
                  seed="gimlet-bottle"
                  redrawInterval={10000}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <Artwork
                slug="the-gimlet-bottle"
                alt=""
                inks={['var(--night)', 'var(--brass)']}
                className={s.hireBottle}
              />
            </div>
            <div className={s.hireText}>
              <p data-edit="hire.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Private hire</p>
              <h2 data-edit="hire.title" data-edit-max="60" id="hire-h">The back room, the whole bar, or a class</h2>
              <p data-edit="hire.hireLede" data-edit-max="240" data-edit-multiline className={s.hireLede}>
                Birthdays, leaving drinks, a wedding party that wants the night
                to go on. Food from the kitchen next door, a list written for
                the evening, and one of us behind the bar all night.
              </p>
              <ul className={s.spaces}>
                {SPACES.map((sp, i) => (
                  <li key={sp.name} className={s.space}>
                    <h3 data-edit={`hire.spaceName.${i}`} data-edit-max="40" className={s.spaceName}>{sp.name}</h3>
                    <p data-edit={`hire.spaceSize.${i}`} data-edit-max="240" data-edit-multiline className={s.spaceSize}>{sp.size}</p>
                    <p data-edit={`hire.spaceWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.spaceWhen}>{sp.when}</p>
                    <p data-edit={`hire.spacePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.spacePrice}>{sp.price}</p>
                  </li>
                ))}
              </ul>
              <form className={s.form} action="#">
                <div className={s.field}>
                  <label data-edit="hire.label" htmlFor="gm-name">Your name</label>
                  <input id="gm-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="hire.label2" htmlFor="gm-email">Email</label>
                  <input id="gm-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
                </div>
                <div className={s.field}>
                  <label data-edit="hire.label3" htmlFor="gm-space">Space</label>
                  <select id="gm-space" name="space" defaultValue={SPACES[0].name}>
                    {SPACES.map((sp) => (
                      <option key={sp.name} value={sp.name}>{sp.name}</option>
                    ))}
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="hire.label4" htmlFor="gm-date">Date</label>
                  <input id="gm-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label data-edit="hire.label5" htmlFor="gm-guests">Guests</label>
                  <input id="gm-guests" name="guests" type="number" min="4" max="90" defaultValue="20" />
                </div>
                <button data-edit="hire.formBtn" data-edit-max="24" className={s.formBtn} type="submit">Ask about a date</button>
              </form>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- RULES */}
        <section id="rules" className={s.rules} aria-labelledby="rules-h">
          <div className={s.secHead}>
            <p data-edit="rules.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>House rules</p>
            <h2 data-edit="rules.title" data-edit-max="60" id="rules-h">Four, and we keep to them</h2>
          </div>
          <div className={s.rulesRule} aria-hidden="true">
            <TabbiedPattern
              pattern={diadem}
              palette={DIAMONDS}
              fit="grid"
              cellSize={28}
              seed="gimlet-rules"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <ol className={s.ruleList}>
            {RULES.map(([title, body], i) => (
              <li key={title}>
                <span className={s.ruleNo}>{`No. ${i + 1}`}</span>
                <h3 data-edit={`rules.title2.${i}`} data-edit-max="40">{title}</h3>
                <p data-edit={`rules.body.${i}`} data-edit-max="240" data-edit-multiline>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------------- HOURS */}
        <section id="hours" className={s.hours} aria-labelledby="hours-h">
          <div className={s.hoursInner}>
            <div className={s.hoursBlock}>
              <p data-edit="hours.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Hours</p>
              <h2 data-edit="hours.title" data-edit-max="60" id="hours-h">Open six nights</h2>
              <dl className={s.hoursList}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`hours.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`hours.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="hours.hoursNote" data-edit-max="240" data-edit-multiline className={s.hoursNote}>Last orders thirty minutes before close. The kitchen next door sends food until 10 pm.</p>
            </div>
            <div className={s.hoursBlock}>
              <p data-edit="hours.secKicker2" data-edit-max="240" data-edit-multiline className={s.secKicker}>Finding the door</p>
              <p data-edit="hours.address" data-edit-max="240" data-edit-multiline className={s.address}>41 Cordial Lane</p>
              <p data-edit="hours.hoursNote2" data-edit-max="240" data-edit-multiline className={s.hoursNote}>
                In the basement below Harlow Bookbinders. Look for the green
                door with the brass lime on it, and ring the bell on the right.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="hours.term2" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="hours.link" data-edit-max="28" href="tel:+15550194417">(555) 019-4417</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="hours.term3" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="hours.link2" data-edit-max="28" href="mailto:hello@thegimlet.example">hello@thegimlet.example</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="hours.term4" data-edit-max="28">Nearest stop</dt>
                  <dd data-edit="hours.body2" data-edit-max="200" data-edit-multiline>Cordial Lane, trams 3 and 7</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footStars} aria-hidden="true">
          <TabbiedPattern
            pattern={northstar}
            palette={STARS}
            options={{ frequency: 0.5 }}
            fit="grid"
            cellSize={26}
            seed="gimlet-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <p data-edit="footer.footMark" data-edit-max="240" data-edit-multiline className={s.footMark}>The Gimlet</p>
        <p data-edit="footer.footTag" data-edit-max="240" data-edit-multiline className={s.footTag}>Gin, lime and not much else, since 2016.</p>
        <nav className={s.footNav} aria-label="Footer">
          <a data-edit="footer.menu" data-edit-max="28" href="#menu">The list</a>
          <a data-edit="footer.hire" data-edit-max="28" href="#hire">Private hire</a>
          <a data-edit="footer.hours" data-edit-max="28" href="#hours">Hours</a>
          <a data-edit="footer.link" data-edit-max="28" href="mailto:hello@thegimlet.example">hello@thegimlet.example</a>
        </nav>
        <div className={s.footFine}>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional cocktail bar. Drinks, people, prices and the address are invented. Please drink responsibly.</p>
          <p>
            <span data-edit="footer.text" data-edit-max="60">Patterns by </span>
            <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span data-edit="footer.text2" data-edit-max="60">, pictures painted in the page's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
