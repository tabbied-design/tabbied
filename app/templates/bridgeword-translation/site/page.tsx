import { TabbiedPattern } from 'tabbied/react';
import { interlock } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './bridgeword-translation.module.css';

export const metadata = {
  title: 'Bridgeword: Certified translation and interpreting, English and Italian',
  description:
    'Bridgeword translates documents and interprets in court and at the doctor, between English, Italian, Spanish and Portuguese. Certified translations in three working days, rates on the page, in both languages.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   parallel text, English on the left and Italian on the right, the way a
   bilingual edition sets a poem. The interlocking tiles are the bridge
   between the columns: a wide span in the hero that narrows into a spine
   running down the whole page, with the prices sitting on it, and a band
   under the footer. */
const PAPER = '#f4f6f1';
const NAVY = '#1b2b4b';
const RED = '#d8483e';
const HARBOR = '#4f7fa3';
const AQUA = '#a9d6d6';

const TILES = ['transparent', RED, AQUA, HARBOR, NAVY];
const SPINE = ['transparent', HARBOR, RED, AQUA, NAVY];

const NAV = [
  ['Languages', '#languages'],
  ['Certified documents', '#certified'],
  ['Interpreting', '#interpreting'],
  ['Rates', '#rates'],
  ['Contact', '#contact'],
];

const PAIRS = [
  { en: 'Italian and English', it: 'Italiano e inglese', workEn: ['Documents', 'Court', 'Medical'], workIt: ['Documenti', 'Tribunale', 'Medicina'] },
  { en: 'Spanish and English', it: 'Spagnolo e inglese', workEn: ['Documents', 'Medical'], workIt: ['Documenti', 'Medicina'] },
  { en: 'Portuguese and English', it: 'Portoghese e inglese', workEn: ['Documents', 'Medical'], workIt: ['Documenti', 'Medicina'] },
  { en: 'Italian and Spanish', it: 'Italiano e spagnolo', workEn: ['Documents'], workIt: ['Documenti'] },
];

const PEOPLE = [
  {
    name: 'Giulia Marchetti',
    en: 'Certified court interpreter for Italian and English. Twelve years in the county and federal courts, and born in Genoa.',
    it: "Interprete giudiziaria certificata per italiano e inglese. Dodici anni nei tribunali della contea e federali, nata a Genova.",
  },
  {
    name: 'Rafael Lima',
    en: 'Spanish and Portuguese. Medical interpreter, trained in clinical terms and patient privacy, and a translator of contracts.',
    it: 'Spagnolo e portoghese. Interprete medico, formato su terminologia clinica e privacy del paziente, traduttore di contratti.',
  },
];

const DOCUMENTS = [
  ['Birth and marriage certificates', 'Certificati di nascita e di matrimonio'],
  ['Diplomas and transcripts', 'Diplomi e piani di studio'],
  ['Court judgments and contracts', 'Sentenze e contratti'],
  ['Medical records', 'Cartelle cliniche'],
  ['Driving licenses and identity papers', 'Patenti di guida e documenti di riconoscimento'],
];

const RATES = [
  ['Standard document, per page', '$35', 'Documento standard, a pagina'],
  ['Longer texts, per word', '$0.14', 'Testi lunghi, a parola'],
  ['Next working day, per page', '+$25', 'Consegna il giorno dopo, a pagina'],
  ['Court, half day up to 4 hours', '$320', 'Tribunale, mezza giornata fino a 4 ore'],
  ['Court, full day', '$580', 'Tribunale, giornata intera'],
  ['Medical, per hour, 2-hour minimum', '$85', "Ambito medico, all'ora, minimo 2 ore"],
  ['Video interpreting, per hour', '$70', "Interpretariato in video, all'ora"],
];

export default function BridgewordTranslation() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f4f6f1',
        '--navy': '#1b2b4b',
        '--red': '#d8483e',
        '--harbor': '#4f7fa3',
        '--aqua': '#a9d6d6',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,navy,red,harbor,aqua"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,600;1,400&family=Manrope:wght@400;500;700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#main">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Bridgeword</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Translation and interpreting</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p className={s.pairMark} aria-hidden="true">
          <span data-edit="bar.text" data-edit-max="60">EN</span>
          <span data-edit="bar.text2" data-edit-max="60">IT</span>
        </p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ HERO
            The same promise twice, facing, with the bridge between them
            narrowing into the spine the rest of the page hangs on. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroEn} lang="en">
            <p data-edit="hero.tag" data-edit-max="240" data-edit-multiline className={s.tag}>English</p>
            <h1 data-edit="hero.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Your words, carried across, <em>whole.</em>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Bridgeword is two certified translators working between English,
              Italian, Spanish and Portuguese. Documents back in three working
              days; interpreters booked for court, hospital and clinic.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Ask for a quote</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#rates">See the rates</a>
            </div>
          </div>
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,4,3,1" className={s.heroBridge} aria-hidden="true">
            <TabbiedPattern
              pattern={interlock}
              palette={TILES}
              fit="grid"
              cellSize={62}
              seed="bridgeword-hero"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroIt} lang="it">
            <p data-edit="hero.tag2" data-edit-max="240" data-edit-multiline className={s.tag}>Italiano</p>
            <p data-edit="hero.body" data-edit-format="emphasis" data-edit-max="240" data-edit-multiline className={s.heroTitleIt}>
              Le tue parole, portate oltre, <em>intere.</em>
            </p>
            <p data-edit="hero.heroLead2" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              Da Bridgeword lavorano due traduttori certificati, tra inglese,
              italiano, spagnolo e portoghese. Documenti pronti in tre giorni
              lavorativi; interpreti per tribunali, ospedali e ambulatori.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button2" data-edit-max="28" className={s.button} href="#contact">Chiedi un preventivo</a>
              <a data-edit="hero.ghost2" data-edit-max="28" className={s.ghost} href="#rates">Vedi le tariffe</a>
            </div>
          </div>
        </section>

        <div className={s.parallel}>
          <div data-edit-pattern="main.field" data-edit-roles="transparent,3,2,4,1" className={s.spine} aria-hidden="true">
            <TabbiedPattern
              pattern={interlock}
              palette={SPINE}
              fit="grid"
              cellSize={36}
              seed="bridgeword-spine"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>

          {/* ------------------------------------------------------- LANGUAGES */}
          <section id="languages" className={s.section} aria-labelledby="languages-h">
            <div className={s.pair}>
              <div className={s.en}>
                <h2 data-edit="languages.title" data-edit-max="60" id="languages-h" className={s.title}>Languages</h2>
                <p data-edit="languages.lead" data-edit-max="240" data-edit-multiline className={s.lead}>
                  Every pair is worked in both directions, by someone who grew up
                  in one language and trained in the other.
                </p>
              </div>
              <div className={s.it} lang="it">
                <p data-edit="languages.titleIt" data-edit-max="240" data-edit-multiline className={s.titleIt}>Lingue</p>
                <p data-edit="languages.lead2" data-edit-max="240" data-edit-multiline className={s.lead}>
                  Ogni coppia di lingue, in entrambe le direzioni, affidata a chi
                  parla una lingua dalla nascita e ha studiato la seconda.
                </p>
              </div>
            </div>
            {PAIRS.map((p, i) => (
              <div key={p.en} className={`${s.pair} ${s.row}`}>
                <div className={s.en}>
                  <h3 data-edit={`languages.rowName.${i}`} data-edit-max="40" className={s.rowName}>{p.en}</h3>
                  <ul className={s.chips}>
                    {p.workEn.map((w, j) => (
                      <li data-edit={`languages.item.${i}.${j}`} data-edit-max="80" key={`${i}-${j}`}>{w}</li>
                    ))}
                  </ul>
                </div>
                <div className={s.it} lang="it">
                  <p data-edit={`languages.rowNameIt.${i}`} data-edit-max="240" data-edit-multiline className={s.rowNameIt}>{p.it}</p>
                  <ul className={s.chips}>
                    {p.workIt.map((w, k) => (
                      <li data-edit={`languages.item2.${i}.${k}`} data-edit-max="80" key={`${i}-${k}`}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            {PEOPLE.map((p, i) => (
              <div key={p.name} className={`${s.pair} ${s.person}`}>
                <div className={s.en}>
                  <h3 data-edit={`languages.personName.${i}`} data-edit-max="40" className={s.personName}>{p.name}</h3>
                  <p data-edit={`languages.personText.${i}`} data-edit-max="240" data-edit-multiline className={s.personText}>{p.en}</p>
                </div>
                <div className={s.it} lang="it">
                  <p data-edit={`languages.personNameIt.${i}`} data-edit-max="240" data-edit-multiline className={s.personNameIt}>{p.name}</p>
                  <p data-edit={`languages.personText2.${i}`} data-edit-max="240" data-edit-multiline className={s.personText}>{p.it}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ------------------------------------------------------- CERTIFIED */}
          <section id="certified" className={s.section} aria-labelledby="certified-h">
            <div className={s.pair}>
              <div className={s.en}>
                <h2 data-edit="certified.title" data-edit-max="60" id="certified-h" className={s.title}>Certified document translation</h2>
                <p data-edit="certified.lead" data-edit-max="240" data-edit-multiline className={s.lead}>
                  Each translation carries our seal and a signed statement of
                  accuracy, and is accepted by courts, universities and
                  immigration offices. Send a clear scan; we return a PDF and, if
                  you need it, a paper copy by post.
                </p>
              </div>
              <div className={s.it} lang="it">
                <p data-edit="certified.titleIt" data-edit-max="240" data-edit-multiline className={s.titleIt}>Traduzione certificata di documenti</p>
                <p data-edit="certified.lead2" data-edit-max="240" data-edit-multiline className={s.lead}>
                  Ogni traduzione porta il nostro timbro e una dichiarazione
                  firmata che ne attesta la correttezza; la accettano tribunali,
                  atenei e uffici immigrazione. Mandaci una scansione leggibile:
                  rispondiamo con un PDF e, se serve, una copia cartacea per posta.
                </p>
              </div>
            </div>
            {DOCUMENTS.map(([en, it], i) => (
              <div key={en} className={`${s.pair} ${s.doc}`}>
                <p data-edit={`certified.en.${i}`} data-edit-max="240" data-edit-multiline className={s.en}>{en}</p>
                <p data-edit={`certified.it.${i}`} data-edit-max="240" data-edit-multiline className={s.it} lang="it">{it}</p>
              </div>
            ))}
            <div className={`${s.pair} ${s.note}`}>
              <p data-edit="certified.en2" data-edit-max="240" data-edit-multiline className={s.en}>Three working days as standard; the next working day for $25 more a page.</p>
              <p data-edit="certified.it2" data-edit-max="240" data-edit-multiline className={s.it} lang="it">Tre giorni lavorativi di norma; il giorno dopo con un supplemento di 25 dollari a pagina.</p>
            </div>
          </section>

          {/* ---------------------------------------------------- INTERPRETING */}
          <section id="interpreting" className={s.section} aria-labelledby="interpreting-h">
            <div className={s.pair}>
              <div className={s.en}>
                <h2 data-edit="interpreting.title" data-edit-max="60" id="interpreting-h" className={s.title}>Court and medical interpreting</h2>
              </div>
              <div className={s.it} lang="it">
                <p data-edit="interpreting.titleIt" data-edit-max="240" data-edit-multiline className={s.titleIt}>Interpretariato in tribunale e in ambito medico</p>
              </div>
            </div>
            <div className={`${s.pair} ${s.setting}`}>
              <div className={s.en}>
                <h3 data-edit="interpreting.settingName" data-edit-max="40" className={s.settingName}>In court</h3>
                <p data-edit="interpreting.settingText" data-edit-max="240" data-edit-multiline className={s.settingText}>
                  Hearings, depositions and trials, consecutive or simultaneous.
                  Giulia is certified for the county and federal courts. Please
                  book 48 hours ahead; we will read the file before the day.
                </p>
              </div>
              <div className={s.it} lang="it">
                <p data-edit="interpreting.settingNameIt" data-edit-max="240" data-edit-multiline className={s.settingNameIt}>In tribunale</p>
                <p data-edit="interpreting.settingText2" data-edit-max="240" data-edit-multiline className={s.settingText}>
                  Udienze, deposizioni e processi, in consecutiva o in simultanea.
                  Giulia ha la certificazione per i tribunali della contea e
                  federali. Prenota con 48 ore di anticipo: leggiamo il fascicolo
                  prima dell'udienza.
                </p>
              </div>
            </div>
            <div className={`${s.pair} ${s.setting}`}>
              <div className={s.en}>
                <h3 data-edit="interpreting.settingName2" data-edit-max="40" className={s.settingName}>At the doctor</h3>
                <p data-edit="interpreting.settingText3" data-edit-max="240" data-edit-multiline className={s.settingText}>
                  Appointments, hospital discharge, consent forms and therapy
                  sessions, in person or by video. We sit beside the patient,
                  never between the patient and the doctor.
                </p>
              </div>
              <div className={s.it} lang="it">
                <p data-edit="interpreting.settingNameIt2" data-edit-max="240" data-edit-multiline className={s.settingNameIt}>Dal medico</p>
                <p data-edit="interpreting.settingText4" data-edit-max="240" data-edit-multiline className={s.settingText}>
                  Visite, dimissioni ospedaliere, moduli di consenso e sedute di
                  terapia, di persona o in video. Ci sediamo accanto al paziente,
                  mai tra il paziente e il medico.
                </p>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- RATES
              Each price sits on the bridge, between its two names. */}
          <section id="rates" className={s.section} aria-labelledby="rates-h">
            <div className={s.pair}>
              <div className={s.en}>
                <h2 data-edit="rates.title" data-edit-max="60" id="rates-h" className={s.title}>Rates</h2>
                <p data-edit="rates.lead" data-edit-max="240" data-edit-multiline className={s.lead}>Fixed before we start, in writing, with no charge for the quote.</p>
              </div>
              <div className={s.it} lang="it">
                <p data-edit="rates.titleIt" data-edit-max="240" data-edit-multiline className={s.titleIt}>Tariffe</p>
                <p data-edit="rates.lead2" data-edit-max="240" data-edit-multiline className={s.lead}>Fissate prima di cominciare, per iscritto, e il preventivo non si paga.</p>
              </div>
            </div>
            <ul className={s.rates}>
              {RATES.map(([en, price, it], i) => (
                <li key={en} className={s.rate}>
                  <span data-edit={`rates.rateEn.${i}`} data-edit-max="60" className={s.rateEn}>{en}</span>
                  <span data-edit={`rates.ratePrice.${i}`} data-edit-max="60" className={s.ratePrice}>{price}</span>
                  <span data-edit={`rates.rateIt.${i}`} data-edit-max="60" className={s.rateIt} lang="it">{it}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contact} aria-labelledby="contact-h">
          <div className={s.contactHead}>
            <h2 data-edit="contact.title" data-edit-max="60" id="contact-h" className={s.title}>Ask for a quote</h2>
            <p data-edit="contact.titleIt" data-edit-max="240" data-edit-multiline className={s.titleIt} lang="it">Chiedi un preventivo</p>
            <p data-edit="contact.lead" data-edit-max="240" data-edit-multiline className={s.lead}>
              Attach the document or describe the appointment, and we reply the
              same working day with a fixed price.
            </p>
            <p data-edit="contact.leadIt" data-edit-max="240" data-edit-multiline className={s.leadIt} lang="it">
              Allega il documento o descrivi l'appuntamento: rispondiamo in
              giornata con un prezzo fisso.
            </p>
            <dl className={s.contactList}>
              <div>
                <dt data-edit="contact.term" data-edit-max="28">Office, ufficio</dt>
                <dd data-edit="contact.body" data-edit-max="200" data-edit-multiline>9 Cordwain Street, Suite 5</dd>
              </div>
              <div>
                <dt data-edit="contact.term2" data-edit-max="28">Phone, telefono</dt>
                <dd>
                  <a data-edit="contact.link" data-edit-max="28" href="tel:+15550189040">(555) 018-9040</a>
                </dd>
              </div>
              <div>
                <dt data-edit="contact.term3" data-edit-max="28">Email</dt>
                <dd>
                  <a data-edit="contact.link2" data-edit-max="28" href="mailto:quote@bridgeword.example">quote@bridgeword.example</a>
                </dd>
              </div>
              <div>
                <dt data-edit="contact.term4" data-edit-max="28">Hours, orari</dt>
                <dd data-edit="contact.body2" data-edit-max="200" data-edit-multiline>Monday to Friday, 9 to 6. Court bookings 48 hours ahead.</dd>
              </div>
            </dl>
          </div>
          <form className={s.form} action="#">
            <label className={s.field}>
              <span data-edit="contact.text" data-edit-max="60">Name</span>
              <span data-edit="contact.fieldIt" data-edit-max="60" className={s.fieldIt} lang="it">Nome</span>
              <input type="text" name="name" autoComplete="name" />
            </label>
            <label className={s.field}>
              <span data-edit="contact.text2" data-edit-max="60">Email</span>
              <span data-edit="contact.fieldIt2" data-edit-max="60" className={s.fieldIt} lang="it">Email</span>
              <input type="email" name="email" autoComplete="email" />
            </label>
            <label className={s.field}>
              <span data-edit="contact.text3" data-edit-max="60">Languages</span>
              <span data-edit="contact.fieldIt3" data-edit-max="60" className={s.fieldIt} lang="it">Lingue</span>
              <select name="pair" defaultValue="it-en">
                <option value="it-en">Italian and English</option>
                <option value="es-en">Spanish and English</option>
                <option value="pt-en">Portuguese and English</option>
                <option value="it-es">Italian and Spanish</option>
              </select>
            </label>
            <label className={s.field}>
              <span data-edit="contact.text4" data-edit-max="60">What you need</span>
              <span data-edit="contact.fieldIt4" data-edit-max="60" className={s.fieldIt} lang="it">Di cosa hai bisogno</span>
              <select name="need" defaultValue="document">
                <option value="document">A certified translation</option>
                <option value="court">An interpreter in court</option>
                <option value="medical">An interpreter at the doctor</option>
                <option value="video">Video interpreting</option>
              </select>
            </label>
            <label className={s.fieldWide}>
              <span data-edit="contact.text5" data-edit-max="60">Details, dates and page count</span>
              <span data-edit="contact.fieldIt5" data-edit-max="60" className={s.fieldIt} lang="it">Dettagli, date e numero di pagine</span>
              <textarea name="message" rows={4} />
            </label>
            <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send, invia</button>
          </form>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,3,1" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={interlock}
            palette={TILES}
            fit="grid"
            cellSize={44}
            seed="bridgeword-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Bridgeword</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>A fictional practice: the names, people, prices and address are invented.</p>
          <p className={s.footLine}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
