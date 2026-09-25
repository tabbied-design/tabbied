import { TabbiedPattern } from 'tabbied/react';
import { quoit, sparkle } from 'tabbied/patterns';
import s from './pawsh-grooming.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Pawsh: Dog grooming salon, Larkspur Lane',
  description:
    'Pawsh grooms dogs of every size on Larkspur Lane: baths, full grooms, hand scissoring and de-shedding, priced by size up front. Three groomers, quiet hours for nervous dogs, and no sedation, ever.',
};

/* Site colors, the same six as the stylesheet's root rule. The loops take
   the pale first: it is the bubble's ground and the hole in every loop. The
   sparkles take `transparent` and sit on the violet booking panel. */
const PAPER = '#FDF8F4';
const VIOLET = '#7C5CE0';
const PINK = '#F5A3B5';
const GRAY = '#A69EB0';
const PALE = '#EFE7F6';

const BUBBLES = [PALE, PINK, VIOLET, GRAY];
const SPARKS = ['transparent', PALE, PINK, PAPER];

const NAV = [
  ['Prices', '#prices'],
  ['Add-ons', '#addons'],
  ['Groomers', '#groomers'],
  ['First visit', '#first-visit'],
  ['Book', '#book'],
];

const SIZES = [
  { id: 's', short: 'S', name: 'Small', weight: 'Up to 20 lb', dog: s.dogS },
  { id: 'm', short: 'M', name: 'Medium', weight: '21-45 lb', dog: s.dogM },
  { id: 'l', short: 'L', name: 'Large', weight: '46-80 lb', dog: s.dogL },
  { id: 'xl', short: 'XL', name: 'Extra large', weight: '81 lb and up', dog: s.dogXl },
];

const PACKAGES = [
  {
    name: 'Bath and tidy',
    includes: 'Bath, blow-dry, brush-out, nails, ears, a tidy round the face, feet and bottom.',
    time: '1-1.5 hours',
    prices: ['$55', '$65', '$80', '$95'],
  },
  {
    name: 'Full groom',
    includes: 'Everything in the bath, plus a full haircut to the length and style you want.',
    time: '2-3 hours',
    prices: ['$75', '$90', '$110', '$135'],
    tag: 'Most booked',
  },
  {
    name: 'Hand scissor',
    includes: 'Scissored all over, no clippers, for poodles, doodles and show trims.',
    time: '3-4 hours',
    prices: ['$95', '$115', '$140', '$170'],
  },
  {
    name: 'De-shed',
    includes: 'For double coats: a de-shedding bath, a long blow-out and an undercoat rake.',
    time: '1.5-2.5 hours',
    prices: ['$60', '$75', '$95', '$120'],
  },
];

const MATRIX_NOTES = [
  'Doodles and double-coated breeds are priced one size up.',
  'Matting is brushed out at $15 per 15 minutes, or shaved short if brushing would hurt.',
  'Puppy intro, under 6 months: $40 at any size, a short bath and a lot of treats.',
];

const ADDONS = [
  ['Teeth brushing', 'Enzyme paste, finger brush', '$10'],
  ['Nail grind', 'Smooth edges, no clicking on floors', '$12'],
  ['Blueberry facial', 'A tear-stain wash for white faces', '$12'],
  ['Paw balm', 'For cracked pads in winter', '$8'],
  ['Flea and tick bath', 'A medicated shampoo, left on ten minutes', '$15'],
  ['Pawdicure', 'Dog-safe polish in four colors', '$10'],
  ['Bandana or bow', 'Chosen by the dog, allegedly', 'Free'],
  ['Express', 'Two groomers at once, done in half the time', '$25'],
];

const GROOMERS = [
  {
    initials: 'PS',
    name: 'Priya Shah',
    role: 'Owner, groomer for 15 years',
    good: 'Poodles, doodles and hand scissoring. Has opinions about teddy-bear faces.',
    days: 'Tuesday to Friday',
  },
  {
    initials: 'MR',
    name: 'Marco Reyes',
    role: 'Groomer for 8 years',
    good: 'Big dogs and double coats: huskies, shepherds, newfies. Never rushes a blow-out.',
    days: 'Wednesday to Saturday',
  },
  {
    initials: 'DO',
    name: 'Dana Okoro',
    role: 'Groomer for 5 years, fear-free certified',
    good: 'Puppies, rescues and nervous dogs. Runs the quiet hours on Tuesday and Thursday mornings.',
    days: 'Monday, Tuesday, Thursday, Saturday',
  },
];

const FIRST_VISIT = [
  {
    title: 'Bring the paperwork',
    body: 'Rabies, distemper (DHPP) and bordetella, current. A photo of the vet record on your phone is fine.',
  },
  {
    title: 'Puppies are welcome early',
    body: 'From 12 weeks, a week after the second round of shots. The first visit is short on purpose.',
  },
  {
    title: 'Drop off, then go',
    body: 'Drop-off is 8 to 10 am. Dogs settle faster once you have left, and we text 20 minutes before pickup.',
  },
  {
    title: 'Nervous dogs get quiet hours',
    body: 'Tuesday and Thursday mornings: one dog at a time, no dryers running, and as many breaks as it takes.',
  },
  {
    title: 'No sedation, ever',
    body: 'If a dog is too stressed to finish, we stop, call you, and charge only for what was done.',
  },
  {
    title: 'Tell us the style',
    body: 'A photo helps more than a breed name. Bring one, and a photo of the last groom you did not like.',
  },
];

const HOURS = [
  ['Monday', '8 am - 4 pm'],
  ['Tuesday - Friday', '8 am - 6 pm'],
  ['Saturday', '8 am - 3 pm'],
  ['Sunday', 'Closed'],
];

export default function PawshGroomingPage() {
  return (
    <div className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Onest:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandDot} aria-hidden="true" />
          <span className={s.brandName}>Pawsh</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barCta} href="#book">Book a groom</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The poodle sits in front of one big soap bubble full of loops. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p className={s.kicker}>Dog grooming salon, 17 Larkspur Lane</p>
            <h1 id="hero-h" className={s.heroTitle}>
              A bath, a trim and <em>a very good dog.</em>
            </h1>
            <p className={s.heroLede}>
              Three groomers, four tubs and no cages. Every price is set by
              your dog's size before you arrive, so the only surprise at
              pickup is how fluffy they are.
            </p>
            <div className={s.heroActions}>
              <a className={s.btn} href="#book">Book a groom</a>
              <a className={s.btnSoft} href="#prices">See prices by size</a>
            </div>
            <ul className={s.heroNotes}>
              <li>No sedation, ever</li>
              <li>Quiet hours for nervous dogs</li>
              <li>Text when they are ready</li>
            </ul>
          </div>
          <div className={s.heroArt}>
            <div className={s.bubble} aria-hidden="true">
              <TabbiedPattern
                pattern={quoit}
                palette={BUBBLES}
                options={{ frequency: 0.45 }}
                fit="grid"
                cellSize={46}
                seed="pawsh-bubbles"
                redrawInterval={8500}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <Artwork
              slug="pawsh-grooming-poodle"
              alt="A fluffy poodle sitting"
              inks={{ red: 'var(--pink)', blue: 'var(--violet)', black: 'var(--ink)' }}
              className={s.poodle}
            />
            <p className={s.heroTag}>
              <span>Fresh from</span>
              <strong>a full groom</strong>
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES
            The size matrix: four sizes across, each with its dachshund drawn
            to scale, four packages down. */}
        <section id="prices" className={s.prices} aria-labelledby="prices-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>Prices by size</p>
            <h2 id="prices-h" className={s.secTitle}>Find the row, then find your dog</h2>
            <p className={s.secLede}>
              Weigh your dog at home or at the vet; if they sit between two
              sizes, we use the smaller one. Tax is included.
            </p>
          </div>

          <table className={s.matrix}>
            <caption className={s.srOnly}>Grooming packages and prices by dog size</caption>
            <thead>
              <tr>
                <th scope="col" className={s.corner}>Package</th>
                {SIZES.map((z) => (
                  <th key={z.id} scope="col" className={s.sizeHead}>
                    <span className={s.dogBox}>
                      <Artwork
                        slug="pawsh-grooming-dachshund"
                        alt=""
                        inks={{ red: 'var(--violet)', blue: 'var(--pink)' }}
                        className={z.dog}
                      />
                    </span>
                    <span className={s.sizeShort}>{z.short}</span>
                    <span className={s.sizeName}>{z.name}</span>
                    <span className={s.sizeWeight}>{z.weight}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PACKAGES.map((p) => (
                <tr key={p.name} className={p.tag ? s.rowHot : s.row}>
                  <th scope="row">
                    <span className={s.pkgName}>{p.name}</span>
                    {p.tag ? <span className={s.pkgTag}>{p.tag}</span> : null}
                    <span className={s.pkgIncl}>{p.includes}</span>
                    <span className={s.pkgTime}>{p.time}</span>
                  </th>
                  {p.prices.map((price, i) => (
                    <td key={SIZES[i].id} className={s[`c${SIZES[i].id}`]}>
                      <span className={s.cellSize}>{SIZES[i].short}</span>
                      <span className={s.cellPrice}>{price}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <ul className={s.matrixNotes}>
            {MATRIX_NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------- ADD-ONS */}
        <section id="addons" className={s.addons} aria-labelledby="addons-h">
          <div className={s.addonsInner}>
            <div className={s.addonsHead}>
              <p className={s.secKicker}>Add-ons</p>
              <h2 id="addons-h" className={s.secTitle}>The extras, at any size</h2>
              <p className={s.secLede}>
                Add them when you book or at drop-off. Same price for a
                chihuahua and a great dane.
              </p>
              <Artwork
                slug="pawsh-grooming-brush"
                alt="A grooming brush and a pair of scissors"
                inks={{ red: 'var(--violet)', blue: 'var(--pink)' }}
                className={s.brush}
              />
            </div>
            <ul className={s.addonList}>
              {ADDONS.map(([name, note, price]) => (
                <li key={name}>
                  <span className={s.addonName}>{name}</span>
                  <span className={s.addonNote}>{note}</span>
                  <span className={s.addonPrice}>{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- GROOMERS */}
        <section id="groomers" className={s.groomers} aria-labelledby="groomers-h">
          <div className={s.secHead}>
            <p className={s.secKicker}>The groomers</p>
            <h2 id="groomers-h" className={s.secTitle}>Three pairs of hands, one tub each</h2>
          </div>
          <ul className={s.groomerList}>
            {GROOMERS.map((g) => (
              <li key={g.name} className={s.groomer}>
                <span className={s.monogram} aria-hidden="true">{g.initials}</span>
                <h3 className={s.groomerName}>{g.name}</h3>
                <p className={s.groomerRole}>{g.role}</p>
                <p className={s.groomerGood}>{g.good}</p>
                <p className={s.groomerDays}>{g.days}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------- FIRST VISIT */}
        <section id="first-visit" className={s.first} aria-labelledby="first-h">
          <div className={s.firstInner}>
            <div className={s.firstHead}>
              <p className={s.secKicker}>First visit</p>
              <h2 id="first-h" className={s.secTitle}>Six things to know before the first bath</h2>
              <div className={s.firstDog}>
                <Artwork
                  slug="pawsh-grooming-dachshund"
                  alt="A dachshund standing, seen from the side"
                  inks={{ red: 'var(--pink)', blue: 'var(--violet)' }}
                  className={s.dachshund}
                />
              </div>
            </div>
            <ol className={s.firstList}>
              {FIRST_VISIT.map((f, i) => (
                <li key={f.title}>
                  <span className={s.firstNo}>{`${i + 1}`}</span>
                  <h3 className={s.firstTitle}>{f.title}</h3>
                  <p className={s.firstBody}>{f.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK
            The request form on a violet panel with sparkles at its edge. */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookPanel}>
            <div className={s.sparks} aria-hidden="true">
              <TabbiedPattern
                pattern={sparkle}
                palette={SPARKS}
                options={{ frequency: 0.4 }}
                fit="grid"
                cellSize={46}
                seed="pawsh-sparkle"
                redrawInterval={7000}
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.bookIntro}>
              <p className={s.bookKicker}>Book a groom</p>
              <h2 id="book-h" className={s.bookTitle}>Ask for a time, we will text back within the hour.</h2>
              <p className={s.bookLede}>
                Most weeks we have space within three days. For Saturdays,
                book a fortnight ahead.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h]) => (
                  <div key={d}>
                    <dt>{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.bookAddr}>17 Larkspur Lane, next to the park gates</p>
              <p className={s.bookPhone}>
                <a href="tel:+15550127297">(555) 012-7297</a>
              </p>
            </div>
            <form className={s.form} action="#">
              <label className={s.field}>
                <span>Your name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className={s.field}>
                <span>Mobile</span>
                <input type="tel" name="phone" autoComplete="tel" required />
              </label>
              <label className={s.field}>
                <span>Dog's name</span>
                <input type="text" name="dog" required />
              </label>
              <label className={s.field}>
                <span>Breed or mix</span>
                <input type="text" name="breed" />
              </label>
              <label className={s.field}>
                <span>Size</span>
                <select name="size" defaultValue="">
                  <option value="" disabled>Choose a size</option>
                  {SIZES.map((z) => (
                    <option key={z.id}>{`${z.name}, ${z.weight}`}</option>
                  ))}
                </select>
              </label>
              <label className={s.field}>
                <span>Package</span>
                <select name="package" defaultValue="Full groom">
                  {PACKAGES.map((p) => (
                    <option key={p.name}>{p.name}</option>
                  ))}
                  <option>Puppy intro</option>
                </select>
              </label>
              <label className={s.fieldWide}>
                <span>Anything we should know</span>
                <textarea name="notes" rows={3} placeholder="Hates the dryer, loves peanut butter" />
              </label>
              <button className={s.submit} type="submit">Request a time</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footName}>Pawsh</p>
          <p className={s.footTag}>Dog grooming on Larkspur Lane, by size, by appointment.</p>
          <p className={s.footMail}>
            <a href="mailto:woof@pawsh.example">woof@pawsh.example</a>
          </p>
        </div>
        <div className={s.footFine}>
          <p>A fictional dog grooming salon. Prices, hours and people are invented.</p>
          <p>
            <span>Patterns by </span>
            <a href="https://tabbied.com" rel="noopener">Tabbied</a>
            <span>, drawn live in the salon's own colors.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
