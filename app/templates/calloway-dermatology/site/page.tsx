import { TabbiedPattern } from 'tabbied/react';
import { mercerising } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './calloway-dermatology.module.css';

export const metadata = {
  title: 'Calloway Dermatology: Skin checks, medical and cosmetic dermatology',
  description:
    'Calloway Dermatology on Linnet Avenue: full-body skin checks, mole mapping and skin cancer surgery, eczema, acne and rosacea care, and a cosmetic clinic with its prices on the page.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   skin-check guide. The mercerised dots are skin seen close up: a fine field
   behind the hero with a lens over it that shows the same dots magnified,
   then a band between the services and the doctors, and the footer's edge. */
const PORCELAIN = '#f6efea';
const PLUM = '#3a1d35';
const ROSE = '#b84a68';
const APRICOT = '#e8a07a';
const PETAL = '#f0c6c2';

const DOTS = ['transparent', ROSE, APRICOT, PETAL, PORCELAIN, APRICOT];
const LENS = ['transparent', ROSE, PETAL, APRICOT, PORCELAIN, ROSE];

const NAV = [
  ['Skin check', '#check'],
  ['Conditions', '#conditions'],
  ['Services', '#services'],
  ['Doctors', '#doctors'],
  ['Book', '#book'],
];

/* The ABCDE of moles. Each letter carries two small drawings, one usually
   fine and one worth showing us; the shapes are drawn in the stylesheet. */
const ABCDE = [
  { letter: 'A', word: 'Asymmetry', body: 'Draw a line through the middle. If the two halves do not match, have it looked at.', shape: 'asym' },
  { letter: 'B', word: 'Border', body: 'Ragged, notched or blurred edges, rather than a smooth outline you could trace.', shape: 'border' },
  { letter: 'C', word: 'Color', body: 'More than one shade: browns with black, red, white or blue in the same spot.', shape: 'color' },
  { letter: 'D', word: 'Diameter', body: 'Wider than 6 millimeters, about the size of a pencil eraser, though melanomas can be smaller.', shape: 'diameter' },
  { letter: 'E', word: 'Evolving', body: 'Any change in size, shape or color, or a spot that itches, crusts or bleeds.', shape: 'evolve' },
];

const CONDITIONS = [
  ['Moles and skin cancer', 'Exams, biopsies, and removal of basal cell, squamous cell and melanoma.'],
  ['Acne', 'Teenage and adult, including the cystic kind that scars.'],
  ['Rosacea', 'Flushing, bumps and the small vessels across the cheeks.'],
  ['Eczema', 'Atopic and contact dermatitis, and patch tests to find the cause.'],
  ['Psoriasis', 'Creams, light therapy and biologic injections.'],
  ['Hair and nail loss', 'Alopecia, thinning after illness, fungal and damaged nails.'],
  ['Warts and cysts', 'Frozen, cut out or drained, usually in one visit.'],
  ['Heavy sweating', 'Prescription treatments and injections for underarms and hands.'],
];

const MEDICAL = [
  ['Full-body skin check', '20 minutes'],
  ['Mole mapping with photographs', '40 minutes'],
  ['Biopsy, results in 5 to 7 days', '15 minutes'],
  ['Mohs surgery for skin cancer', 'Half a day'],
  ['Cryotherapy for warts and spots', '10 minutes'],
  ['Patch testing for allergies', '3 visits'],
];

const COSMETIC = [
  ['Wrinkle relaxer injections', '$12 a unit'],
  ['Lip or cheek filler', '$650 a syringe'],
  ['Chemical peel, light', '$175'],
  ['Laser for facial veins', 'from $300'],
  ['Microneedling', '$350'],
  ['Consultation', 'Free, 30 minutes'],
];

const DOCTORS = [
  { initials: 'IC', name: 'Dr. Ines Calloway', role: 'Dermatologist and founder', note: 'Board certified. Skin cancer surgery and mole mapping; in practice for 19 years.' },
  { initials: 'TO', name: 'Dr. Tobias Okafor', role: 'Dermatologist', note: 'Board certified. Eczema, psoriasis and skin of color; runs the patch-testing clinic.' },
  { initials: 'RV', name: 'Rhea Vance, PA-C', role: 'Physician assistant', note: 'Acne, rosacea and the Saturday skin-check mornings. Eleven years in dermatology.' },
];

const VISITS = [
  ['New patient skin check', '30 min', 'Covered by most plans'],
  ['A spot that has changed', '15 min', 'Seen within the week'],
  ['Follow-up or results', '15 min', 'In person or by video'],
  ['Cosmetic consultation', '30 min', 'Free'],
];

export default function CallowayDermatology() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--porcelain': '#f6efea',
        '--plum': '#3a1d35',
        '--rose': '#b84a68',
        '--apricot': '#e8a07a',
        '--petal': '#f0c6c2',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="porcelain,plum,rose,apricot,petal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Figtree:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#main">
          <span className={s.brandDot} aria-hidden="true" />
          <span className={s.brandText}>
            <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Calloway</span>
            <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Dermatology</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Book a skin check</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ HERO
            Skin, close up: a fine field of dots, and a lens over it that
            shows the same dots four times larger. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,3,4,0,3" className={s.heroField} aria-hidden="true">
            <TabbiedPattern
              pattern={mercerising}
              palette={DOTS}
              fit="grid"
              cellSize={46}
              seed="calloway-skin"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroInner}>
            <div className={s.heroCard}>
              <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Medical and cosmetic dermatology, Linnet Avenue</p>
              <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Know your skin, <em>spot by spot.</em>
              </h1>
              <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                A full-body skin check takes twenty minutes and is covered by
                most plans. A mole that has changed is seen within the week.
                Everything else, from acne to eczema, by appointment.
              </p>
              <div className={s.heroActions}>
                <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a skin check</a>
                <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#check">Read the ABCDE guide</a>
              </div>
            </div>
            <div className={s.lensWrap} aria-hidden="true">
              <div data-edit-pattern="hero.field2" data-edit-roles="transparent,2,4,3,0,2" className={s.lens}>
                <TabbiedPattern
                  pattern={mercerising}
                  palette={LENS}
                  fit="grid"
                  cellSize={90}
                  seed="calloway-lens"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
          </div>
        </section>

        <ul className={s.facts}>
          <li>
            <strong data-edit="main.emphasis">2 board-certified</strong>
            <span data-edit="main.text" data-edit-max="60">dermatologists and a physician assistant</span>
          </li>
          <li>
            <strong data-edit="main.emphasis2">Within the week</strong>
            <span data-edit="main.text2" data-edit-max="60">for any mole that has changed</span>
          </li>
          <li>
            <strong data-edit="main.emphasis3">Saturday mornings</strong>
            <span data-edit="main.text3" data-edit-max="60">skin checks, twice a month</span>
          </li>
        </ul>

        {/* ----------------------------------------------------------- ABCDE */}
        <section id="check" className={s.check} aria-labelledby="check-h">
          <div className={s.checkHead}>
            <p data-edit="check.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The skin-check guide</p>
            <h2 data-edit="check.sectionTitle" data-edit-max="60" id="check-h" className={s.sectionTitle}>Five things to look for in a mole</h2>
            <p data-edit="check.sectionLead" data-edit-max="240" data-edit-multiline className={s.sectionLead}>
              Once a month, after a shower, in good light. Use a hand mirror for
              your back and scalp, or ask someone you live with. Any one of these
              is reason enough to book.
            </p>
          </div>
          <p data-edit="check.legend" data-edit-max="240" data-edit-multiline className={s.legend}>In each pair, the left mole is usually fine and the right one is worth showing us.</p>
          <ol className={s.letters}>
            {ABCDE.map((x, i) => (
              <li key={x.letter} className={s.letter}>
                <p data-edit={`check.letterBig.${i}`} data-edit-max="240" data-edit-multiline className={s.letterBig}>{x.letter}</p>
                <h3 data-edit={`check.letterWord.${i}`} data-edit-max="40" className={s.letterWord}>{x.word}</h3>
                <div className={`${s.swatch} ${s[x.shape]}`} aria-hidden="true">
                  <span className={s.fine} />
                  <span className={s.worry} />
                </div>
                <p data-edit={`check.letterBody.${i}`} data-edit-max="240" data-edit-multiline className={s.letterBody}>{x.body}</p>
              </li>
            ))}
          </ol>
          <p data-edit="check.checkNote" data-edit-max="240" data-edit-multiline className={s.checkNote}>
            And the ugly duckling: a mole that looks different from all your
            others deserves a visit, whatever the letters say.
          </p>
        </section>

        {/* ------------------------------------------------------ CONDITIONS */}
        <section id="conditions" className={s.conditions} aria-labelledby="conditions-h">
          <div className={s.condHead}>
            <h2 data-edit="conditions.sectionTitle" data-edit-max="60" id="conditions-h" className={s.sectionTitle}>Conditions we treat</h2>
            <p data-edit="conditions.sectionLead" data-edit-max="240" data-edit-multiline className={s.sectionLead}>
              Adults and children from age two. No referral needed unless your
              plan asks for one.
            </p>
          </div>
          <dl className={s.condList}>
            {CONDITIONS.map(([term, desc], i) => (
              <div key={term} className={s.cond}>
                <dt data-edit={`conditions.term.${i}`} data-edit-max="28">{term}</dt>
                <dd data-edit={`conditions.body.${i}`} data-edit-max="200" data-edit-multiline>{desc}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* -------------------------------------------------------- SERVICES
            Two columns of one sheet: what insurance usually covers, and the
            cosmetic clinic, paid for by the patient, with its prices. */}
        <section id="services" className={s.services} aria-labelledby="services-h">
          <h2 data-edit="services.sectionTitle" data-edit-max="60" id="services-h" className={s.sectionTitle}>Medical and cosmetic</h2>
          <div className={s.serviceCols}>
            <div className={s.medical}>
              <h3 data-edit="services.colTitle" data-edit-max="40" className={s.colTitle}>Medical</h3>
              <p data-edit="services.colNote" data-edit-max="240" data-edit-multiline className={s.colNote}>Billed to your insurance. We check your cover before the visit and tell you if anything will not be paid.</p>
              <ul className={s.serviceList}>
                {MEDICAL.map(([name, time], i) => (
                  <li key={name}>
                    <span data-edit={`services.text.${i}`} data-edit-max="60">{name}</span>
                    <span data-edit={`services.serviceMeta.${i}`} data-edit-max="60" className={s.serviceMeta}>{time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.cosmetic}>
              <h3 data-edit="services.colTitle2" data-edit-max="40" className={s.colTitle}>Cosmetic</h3>
              <p data-edit="services.colNoteOn" data-edit-max="240" data-edit-multiline className={s.colNoteOn}>Paid by you, priced here, and done by the same doctors. No packages and no pressure to buy one.</p>
              <ul className={s.serviceListOn}>
                {COSMETIC.map(([name, price], i) => (
                  <li key={name}>
                    <span data-edit={`services.text2.${i}`} data-edit-max="60">{name}</span>
                    <span data-edit={`services.serviceMetaOn.${i}`} data-edit-max="60" className={s.serviceMetaOn}>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className={s.band}>
          <div data-edit-pattern="main.field" data-edit-roles="transparent,2,3,4,0,3" className={s.bandField} aria-hidden="true">
            <TabbiedPattern
              pattern={mercerising}
              palette={DOTS}
              fit="grid"
              cellSize={30}
              seed="calloway-band"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <p data-edit="main.bandCard" data-edit-max="240" data-edit-multiline className={s.bandCard}>
            Once a year from age 40, or sooner with fair skin, many moles, or a
            parent who had melanoma.
          </p>
        </div>

        {/* --------------------------------------------------------- DOCTORS */}
        <section id="doctors" className={s.doctors} aria-labelledby="doctors-h">
          <h2 data-edit="doctors.sectionTitle" data-edit-max="60" id="doctors-h" className={s.sectionTitle}>Who you will see</h2>
          <ul className={s.people}>
            {DOCTORS.map((d, i) => (
              <li key={d.name} className={s.person}>
                <p data-edit={`doctors.initials.${i}`} data-edit-max="240" data-edit-multiline className={s.initials}>{d.initials}</p>
                <h3 data-edit={`doctors.personName.${i}`} data-edit-max="40" className={s.personName}>{d.name}</h3>
                <p data-edit={`doctors.personRole.${i}`} data-edit-max="240" data-edit-multiline className={s.personRole}>{d.role}</p>
                <p data-edit={`doctors.personNote.${i}`} data-edit-max="240" data-edit-multiline className={s.personNote}>{d.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookInfo}>
            <h2 data-edit="book.sectionTitle" data-edit-max="60" id="book-h" className={s.sectionTitle}>Book a visit</h2>
            <table className={s.visits}>
              <caption data-edit="book.srOnly" className={s.srOnly}>Appointment types and their length</caption>
              <tbody>
                {VISITS.map(([type, time, note], i) => (
                  <tr key={type}>
                    <th data-edit={`book.heading.${i}`} scope="row">{type}</th>
                    <td data-edit={`book.visitTime.${i}`} className={s.visitTime}>{time}</td>
                    <td data-edit={`book.visitNote.${i}`} className={s.visitNote}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className={s.contactList}>
              <div>
                <dt data-edit="book.term" data-edit-max="28">Clinic</dt>
                <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>51 Linnet Avenue, Suite 210</dd>
              </div>
              <div>
                <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                <dd>
                  <a data-edit="book.link" data-edit-max="28" href="tel:+15550153300">(555) 015-3300</a>
                </dd>
              </div>
              <div>
                <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                <dd>
                  <a data-edit="book.link2" data-edit-max="28" href="mailto:frontdesk@callowayskin.example">frontdesk@callowayskin.example</a>
                </dd>
              </div>
              <div>
                <dt data-edit="book.term4" data-edit-max="28">Hours</dt>
                <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>Monday to Thursday 8 to 5, Friday 8 to 1, first and third Saturday 9 to 12</dd>
              </div>
            </dl>
          </div>
          <form className={s.form} action="#">
            <p data-edit="book.formTitle" data-edit-max="240" data-edit-multiline className={s.formTitle}>Request an appointment</p>
            <label className={s.field}>
              <span data-edit="book.text" data-edit-max="60">Full name</span>
              <input type="text" name="name" autoComplete="name" />
            </label>
            <div className={s.formRow}>
              <label className={s.field}>
                <span data-edit="book.text2" data-edit-max="60">Phone</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label className={s.field}>
                <span data-edit="book.text3" data-edit-max="60">Email</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
            </div>
            <label className={s.field}>
              <span data-edit="book.text4" data-edit-max="60">Reason for the visit</span>
              <select name="reason" defaultValue="check">
                <option value="check">Full-body skin check</option>
                <option value="mole">A mole or spot that has changed</option>
                <option value="rash">Rash, acne, eczema or another condition</option>
                <option value="cosmetic">Cosmetic consultation</option>
              </select>
            </label>
            <label className={s.field}>
              <span data-edit="book.text5" data-edit-max="60">Insurance plan, if any</span>
              <input type="text" name="insurance" />
            </label>
            <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send request</button>
            <p data-edit="book.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>We call back within one working day to offer a time.</p>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,3,4,0,3" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={mercerising}
            palette={DOTS}
            fit="grid"
            cellSize={28}
            seed="calloway-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Calloway Dermatology</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>
            A fictional clinic: the names, people, prices and address are
            invented, and nothing here is medical advice.
          </p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
