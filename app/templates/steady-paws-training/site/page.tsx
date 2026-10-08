import { TabbiedPattern } from 'tabbied/react';
import { hairpin } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './steady-paws-training.module.css';

export const metadata = {
  title: 'Steady Paws Dog Training: Puppy classes, private lessons and behavior help',
  description:
    'Steady Paws trains dogs and their people on a fenced field by the river. Six-week puppy classes, private lessons at home, behavior consultations for reactive and anxious dogs, and nothing that hurts.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The hairpin is
   the course: a field of hurdles and weave poles, each one doubling back on
   itself the way a dog runs a pattern. It is the course map in the hero,
   the strip of field between the stations and the philosophy, and the
   fence line of the footer. */
const TURF = '#eef2e1';
const PINE = '#1f3a2b';
const CONE = '#e0652a';
const TUNNEL = '#2b63b0';
const FLAG = '#f2c53d';

const COURSE = ['transparent', PINE, CONE, TUNNEL, FLAG, PINE];
const FIELD = ['transparent', TURF, FLAG, CONE, TURF, TUNNEL];
const FENCE = ['transparent', FLAG, CONE, TURF, TUNNEL, FLAG];

const NAV = [
  ['Puppies', '#puppy'],
  ['Private lessons', '#private'],
  ['Behavior', '#behavior'],
  ['How we train', '#approach'],
  ['Book', '#book'],
];

const PINS = [
  { no: '1', label: 'Puppy classes', href: '#puppy', spot: 'pin1' },
  { no: '2', label: 'Private lessons', href: '#private', spot: 'pin2' },
  { no: '3', label: 'Behavior help', href: '#behavior', spot: 'pin3' },
  { no: '4', label: 'How we train', href: '#approach', spot: 'pin4' },
];

type Class = { name: string; age: string; when: string; length: string; price: string; body: string };

const CLASSES: Class[] = [
  { name: 'Puppy kindergarten', age: '8 to 18 weeks', when: 'Saturdays 9:00 or Tuesdays 6:30 pm', length: '6 weeks', price: '$210', body: 'Name, sit, come, settle on a mat, gentle handling, and twenty minutes of play with puppies their own size.' },
  { name: 'Adolescent manners', age: '5 to 12 months', when: 'Saturdays 10:30 or Thursdays 6:30 pm', length: '6 weeks', price: '$230', body: 'Loose-lead walking, a recall that works near squirrels, four paws on the floor for visitors.' },
  { name: 'Good neighbor', age: '1 year and up', when: 'Sundays 10:00', length: '8 weeks', price: '$280', body: 'Walking through a crowd, waiting at doors and kerbs, and staying calm while you talk to someone.' },
];

type Package = { name: string; price: string; note: string; items: string[] };

const PACKAGES: Package[] = [
  { name: 'One lesson', price: '$95', note: '60 minutes, at home or on the field', items: ['One goal, worked on properly', 'Written notes the same evening'] },
  { name: 'Three lessons', price: '$260', note: 'Used within ten weeks', items: ['A plan across the three visits', 'Text questions between lessons'] },
  { name: 'Day training', price: '$480 a week', note: 'Four visits while you are at work', items: ['We train, then hand over to you', 'A video of every session'] },
];

const BEHAVIOR_STEPS = [
  ['Questionnaire', 'Twenty questions about your dog\'s day, health and history, and a short video if you can take one safely.'],
  ['Two hours at home', 'We watch your dog where the trouble happens, meet the household, and start on management that same day.'],
  ['A written plan', 'Within five days: what is going on, what to change at home, and the first three exercises, step by step.'],
  ['Four follow-up calls', 'Fortnightly calls to adjust the plan, and a second visit if progress stalls.'],
];

const HELPS = [
  'Barking and lunging at dogs or people on walks',
  'Growling over food, toys or the sofa',
  'Distress when left alone',
  'Fear of visitors, traffic or the vet',
  'A new dog not settling with the old one',
];

const PRINCIPLES = [
  ['Reward what you like', 'Dogs repeat what pays. We pay for calm, for checking in, for choosing well, with food, play and access to good things.'],
  ['Manage what you do not', 'A gate, a lead, a closed door. If a dog cannot practise a habit, it fades while we teach the one you want.'],
  ['Short sessions, often', 'Five minutes three times a day beats an hour on Sunday. Every exercise we give you fits in a kettle boil.'],
  ['Nothing that hurts', 'No prong, choke or shock collars, no leash pops, no alpha rolls. They suppress behavior and teach fear; they do not teach.'],
];

const HOURS = [
  ['Field classes', 'Tuesday to Sunday'],
  ['Office', 'Monday to Friday, 9:00-5:00'],
  ['Private lessons', 'By appointment, evenings too'],
];

export default function SteadyPawsTrainingPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--turf': '#eef2e1',
        '--pine': '#1f3a2b',
        '--cone': '#e0652a',
        '--tunnel': '#2b63b0',
        '--flag': '#f2c53d',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="turf,pine,cone,tunnel,flag"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandMark} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Steady Paws</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Dog Training</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550127745">(555) 012-7745</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Dog training on the river field, Willowmere</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              A steadier dog, <span>one obstacle at a time.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              We teach dogs and their people together, with food, play and a lot
              of patience. Start with a puppy class, book a lesson at home, or
              ask for help with a dog who finds the world too much.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a first session</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#puppy">Puppy classes</a>
            </div>
            <ul className={s.heroBadges}>
              <li data-edit="hero.item" data-edit-max="80">Force-free since 2011</li>
              <li data-edit="hero.item2" data-edit-max="80">Classes of six dogs</li>
              <li data-edit="hero.item3" data-edit-max="80">Insured, first-aid trained</li>
            </ul>
          </div>

          <div className={s.map}>
            <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,2,3,4,1" className={s.mapField} aria-hidden="true">
              <TabbiedPattern
                pattern={hairpin}
                palette={COURSE}
                fit="grid"
                cellSize={46}
                options={{ frequency: 0.7 }}
                seed="steady-paws-course"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <svg className={s.route} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className={s.routeUnder} d="M 6 94 L 14 78 C 20 62, 24 40, 34 30 C 44 20, 56 66, 62 60 C 70 52, 76 26, 86 22 L 95 8" />
              <path className={s.routeLine} d="M 6 94 L 14 78 C 20 62, 24 40, 34 30 C 44 20, 56 66, 62 60 C 70 52, 76 26, 86 22 L 95 8" />
            </svg>
            <p data-edit="hero.mapStart" data-edit-max="240" data-edit-multiline className={s.mapStart}>Start</p>
            <p data-edit="hero.mapFinish" data-edit-max="240" data-edit-multiline className={s.mapFinish}>Finish</p>
            {PINS.map((pin, i) => (
              <a key={pin.no} className={`${s.pin} ${s[pin.spot]}`} href={pin.href}>
                <span data-edit={`hero.pinNo.${i}`} data-edit-max="60" className={s.pinNo}>{pin.no}</span>
                <span data-edit={`hero.pinLabel.${i}`} data-edit-max="60" className={s.pinLabel}>{pin.label}</span>
              </a>
            ))}
          </div>
        </section>

        <div className={s.stations}>
          <section id="puppy" className={s.station} aria-labelledby="puppy-h">
            <span data-edit="puppy.text" data-edit-max="60" className={s.stationNo} aria-hidden="true">1</span>
            <div className={s.stationHead}>
              <p data-edit="puppy.stationKicker" data-edit-max="240" data-edit-multiline className={s.stationKicker}>Station 1</p>
              <h2 data-edit="puppy.stationTitle" data-edit-max="60" id="puppy-h" className={s.stationTitle}>Puppy and group classes</h2>
              <p data-edit="puppy.stationLead" data-edit-max="240" data-edit-multiline className={s.stationLead}>
                Six dogs at most, two trainers, on a fenced field with a shelter for
                rainy days. Bring treats, a flat collar, and the person who will walk
                the dog most.
              </p>
            </div>
            <ul className={s.classes}>
              {CLASSES.map((c, i) => (
                <li key={c.name} className={s.classCard}>
                  <p data-edit={`puppy.classAge.${i}`} data-edit-max="240" data-edit-multiline className={s.classAge}>{c.age}</p>
                  <h3 data-edit={`puppy.className.${i}`} data-edit-max="40" className={s.className}>{c.name}</h3>
                  <p data-edit={`puppy.classBody.${i}`} data-edit-max="240" data-edit-multiline className={s.classBody}>{c.body}</p>
                  <dl className={s.classFacts}>
                    <div>
                      <dt data-edit={`puppy.term.${i}`} data-edit-max="28">When</dt>
                      <dd data-edit={`puppy.body.${i}`} data-edit-max="200" data-edit-multiline>{c.when}</dd>
                    </div>
                    <div>
                      <dt data-edit={`puppy.term2.${i}`} data-edit-max="28">Course</dt>
                      <dd data-edit={`puppy.body2.${i}`} data-edit-max="200" data-edit-multiline>{c.length}</dd>
                    </div>
                    <div>
                      <dt data-edit={`puppy.term3.${i}`} data-edit-max="28">Fee</dt>
                      <dd data-edit={`puppy.body3.${i}`} data-edit-max="200" data-edit-multiline>{c.price}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </section>

          <section id="private" className={s.station} aria-labelledby="private-h">
            <span data-edit="private.text" data-edit-max="60" className={s.stationNo} aria-hidden="true">2</span>
            <div className={s.stationHead}>
              <p data-edit="private.stationKicker" data-edit-max="240" data-edit-multiline className={s.stationKicker}>Station 2</p>
              <h2 data-edit="private.stationTitle" data-edit-max="60" id="private-h" className={s.stationTitle}>Private lessons</h2>
              <p data-edit="private.stationLead" data-edit-max="240" data-edit-multiline className={s.stationLead}>
                For one particular problem, a dog who is not ready for a group, or a
                household that wants the trainer in the kitchen where it happens.
              </p>
            </div>
            <ul className={s.packages}>
              {PACKAGES.map((p, i) => (
                <li key={p.name} className={s.package}>
                  <h3 data-edit={`private.packageName.${i}`} data-edit-max="40" className={s.packageName}>{p.name}</h3>
                  <p data-edit={`private.packagePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packagePrice}>{p.price}</p>
                  <p data-edit={`private.packageNote.${i}`} data-edit-max="240" data-edit-multiline className={s.packageNote}>{p.note}</p>
                  <ul className={s.packageItems}>
                    {p.items.map((item, i2) => (
                      <li data-edit={`private.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section id="behavior" className={`${s.station} ${s.stationDark}`} aria-labelledby="behavior-h">
            <span data-edit="behavior.text" data-edit-max="60" className={s.stationNo} aria-hidden="true">3</span>
            <div className={s.behaviorGrid}>
              <div className={s.stationHead}>
                <p data-edit="behavior.stationKicker" data-edit-max="240" data-edit-multiline className={s.stationKicker}>Station 3</p>
                <h2 data-edit="behavior.stationTitle" data-edit-max="60" id="behavior-h" className={s.stationTitle}>Behavior consultations</h2>
                <p data-edit="behavior.stationLead" data-edit-max="240" data-edit-multiline className={s.stationLead}>
                  For dogs who are frightened, frustrated or worried, and for the
                  people who love them and are tired. $320 for the whole programme
                  below.
                </p>
                <h3 data-edit="behavior.helpsTitle" data-edit-max="40" className={s.helpsTitle}>We often help with</h3>
                <ul className={s.helps}>
                  {HELPS.map((item, i) => (
                    <li data-edit={`behavior.item.${i}`} data-edit-max="80" key={item}>{item}</li>
                  ))}
                </ul>
                <p data-edit="behavior.vetNote" data-edit-max="240" data-edit-multiline className={s.vetNote}>If pain could be part of it, we ask your vet to check first. We work alongside vets and refer on when a case needs medication.</p>
              </div>
              <ol className={s.steps}>
                {BEHAVIOR_STEPS.map(([title, body], i) => (
                  <li key={title} className={s.step}>
                    <span className={s.stepNo}>{i + 1}</span>
                    <h3 data-edit={`behavior.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                    <p data-edit={`behavior.stepBody.${i}`} data-edit-max="240" data-edit-multiline className={s.stepBody}>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <div data-edit-pattern="top.field" data-edit-roles="transparent,0,4,2,0,3" className={s.field} aria-hidden="true">
            <TabbiedPattern
              pattern={hairpin}
              palette={FIELD}
              fit="grid"
              cellSize={40}
              seed="steady-paws-field"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          <section id="approach" className={s.station} aria-labelledby="approach-h">
            <span data-edit="approach.text" data-edit-max="60" className={s.stationNo} aria-hidden="true">4</span>
            <div className={s.stationHead}>
              <p data-edit="approach.stationKicker" data-edit-max="240" data-edit-multiline className={s.stationKicker}>Station 4</p>
              <h2 data-edit="approach.stationTitle" data-edit-max="60" id="approach-h" className={s.stationTitle}>How we train</h2>
              <p data-edit="approach.stationLead" data-edit-max="240" data-edit-multiline className={s.stationLead}>
                Dana Mercer has trained dogs for fifteen years, holds an independent
                trainer certification and a canine behavior diploma, and still learns
                something from every dog on the field.
              </p>
            </div>
            <ol className={s.principles}>
              {PRINCIPLES.map(([title, body], i) => (
                <li key={title} className={s.principle}>
                  <h3 data-edit={`approach.principleTitle.${i}`} data-edit-max="40" className={s.principleTitle}>{title}</h3>
                  <p data-edit={`approach.principleBody.${i}`} data-edit-max="240" data-edit-multiline className={s.principleBody}>{body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="book" className={`${s.station} ${s.stationFinish}`} aria-labelledby="book-h">
            <span data-edit="book.text" data-edit-max="60" className={s.stationNo} aria-hidden="true">5</span>
            <div className={s.bookGrid}>
              <div>
                <p data-edit="book.stationKicker" data-edit-max="240" data-edit-multiline className={s.stationKicker}>Finish line</p>
                <h2 data-edit="book.stationTitle" data-edit-max="60" id="book-h" className={s.stationTitle}>Book a first session</h2>
                <p data-edit="book.address" data-edit-max="240" data-edit-multiline className={s.address}>The river field, 2 Tollgate Lane, Willowmere</p>
                <p data-edit="book.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Through the green gate past the boatyard. Park on the gravel, keep dogs on lead until the gate is shut.</p>
                <dl className={s.hours}>
                  {HOURS.map(([label, value], i) => (
                    <div key={label}>
                      <dt data-edit={`book.term.${i}`} data-edit-max="28">{label}</dt>
                      <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.contactLine}>
                  <a data-edit="book.link" data-edit-max="28" href="tel:+15550127745">(555) 012-7745</a>
                </p>
                <p className={s.contactLine}>
                  <a data-edit="book.link2" data-edit-max="28" href="mailto:woof@steadypaws.example">woof@steadypaws.example</a>
                </p>
              </div>
              <form className={s.form} action="#">
                <div className={s.formRow}>
                  <div className={s.formField}>
                    <label data-edit="book.label" htmlFor="sp-name">Your name</label>
                    <input id="sp-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.formField}>
                    <label data-edit="book.label2" htmlFor="sp-phone">Phone</label>
                    <input id="sp-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                </div>
                <div className={s.formRow}>
                  <div className={s.formField}>
                    <label data-edit="book.label3" htmlFor="sp-dog">Your dog, by name</label>
                    <input id="sp-dog" name="dog" type="text" />
                  </div>
                  <div className={s.formField}>
                    <label data-edit="book.label4" htmlFor="sp-age">Age and breed</label>
                    <input id="sp-age" name="age" type="text" />
                  </div>
                </div>
                <div className={s.formField}>
                  <label data-edit="book.label5" htmlFor="sp-need">What you need</label>
                  <select id="sp-need" name="need" defaultValue="puppy">
                    <option value="puppy">A puppy or group class</option>
                    <option value="private">A private lesson</option>
                    <option value="behavior">A behavior consultation</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
                <div className={s.formField}>
                  <label data-edit="book.label6" htmlFor="sp-note">Tell us about your dog</label>
                  <textarea id="sp-note" name="note" rows={4} />
                </div>
                <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send to Dana</button>
                <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We reply within a working day. Behavior cases get a call first, not an email.</p>
              </form>
            </div>
          </section>
        </div>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,2,0,3,4" className={s.fence} aria-hidden="true">
          <TabbiedPattern
            pattern={hairpin}
            palette={FENCE}
            fit="grid"
            cellSize={34}
            seed="steady-paws-fence"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Steady Paws Dog Training</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional dog trainer. The names, classes, prices and address are invented, and nothing here is veterinary advice.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
