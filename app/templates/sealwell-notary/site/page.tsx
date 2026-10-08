import { TabbiedPattern } from 'tabbied/react';
import { bobbinet } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './sealwell-notary.module.css';

export const metadata = {
  title: 'Sealwell Mobile Notary: Notary public and apostilles, Alder County',
  description:
    'Sealwell is a mobile notary public. We come to your home, office, hospital or care home with the stamp and the journal, seven days a week, at a fixed fee per signature and a fixed trip fee by zone. Apostilles handled end to end.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The bobbinet,
   a net of eyelets, is the security paper the certificate is printed on:
   it fills the hero behind the certificate, is pressed into the foil of the
   seal, maps the three zones and edges the apostille ribbon and the footer. */
const PAPER = '#f5f0e3';
const NAVY = '#1c2b4a';
const WAX = '#8c2232';
const GOLD = '#b08a3e';
const STEEL = '#6d7f99';

const SECURITY = ['transparent', STEEL, NAVY, STEEL, GOLD, STEEL];
const FOIL = ['transparent', GOLD, PAPER, GOLD, PAPER, GOLD];
const ZONES_LACE = ['transparent', NAVY, STEEL, GOLD, STEEL, NAVY];
const RIBBON = ['transparent', PAPER, GOLD, PAPER, STEEL, PAPER];

const NAV = [
  ['Fees', '#fees'],
  ['Zones', '#zones'],
  ['What to bring', '#bring'],
  ['Apostilles', '#apostille'],
  ['Questions', '#faq'],
  ['Book', '#book'],
];

const PER_SIGNATURE = [
  ['Acknowledgment, per signer, per document', '$15'],
  ['Jurat (a sworn statement), per signer', '$15'],
  ['Oath or affirmation, no document', '$15'],
  ['Certified copy of a power of attorney, per page', '$10'],
  ['A witness we bring with us, each', '$25'],
  ['Printing or scanning, per page', '$0.50'],
];

const PER_TRIP = [
  ['Zone 1, up to 8 miles', '$35'],
  ['Zone 2, 8 to 20 miles', '$55'],
  ['Zone 3, 20 to 35 miles', '$80'],
  ['Evenings after 7 pm, weekends', '+$20'],
  ['Same hour, at the door within 90 minutes', '+$30'],
];

const PACKAGES = [
  ['Loan signing', '$150 flat', 'Purchase, refinance or HELOC. Printing of up to 150 pages and the courier drop to the title company are included. Trip included in Zones 1 and 2.'],
  ['Estate plan signing', '$175 flat', 'Will, trust, powers of attorney and a health care directive in one visit, with the two witnesses brought along.'],
  ['Apostille, per document', '$95 + state fee', 'Notarized or certified, filed by hand with the Secretary of State, and mailed back or couriered abroad.'],
];

const ZONES = [
  { name: 'Zone 1', reach: 'Up to 8 miles from Wren Court', fee: '$35', towns: 'Alder, Millbrook, Cressey Park, Northgate, Tollbridge' },
  { name: 'Zone 2', reach: '8 to 20 miles', fee: '$55', towns: 'Halloway, Peel Crossing, Sandmere, Tarrow, East Linley, Gaunt Hill' },
  { name: 'Zone 3', reach: '20 to 35 miles', fee: '$80', towns: 'Ostend Falls, Brackley, Fennick, Wyre Harbor, Coldmoor' },
];

const BRING = [
  'A current photo ID for every signer: a driver license, state ID card, passport or passport card, military ID, or permanent resident card.',
  'The whole document, unsigned. Every page, including the ones that only need initials.',
  'Reading glasses, and the names of everyone else who has to sign.',
  'For a will or trust, two adult witnesses who are not named in it, or ask us to bring them.',
];

const LEAVE = [
  'Do not sign before I arrive. The signature has to be made in front of me.',
  'Expired IDs and photocopies of IDs cannot be accepted, however recent.',
  'A notary cannot draft or explain your document. Questions about what it says go to your attorney.',
];

const APOSTILLE = [
  ['We notarize it, or fetch it', 'Birth, marriage and death certificates must be certified copies from the county recorder, never a photocopy. We can order them for you.', '1 day'],
  ['County clerk certification', 'Some documents need the county clerk to confirm the notary commission first. We walk them across the square.', '1-2 days'],
  ['Secretary of State', 'We file by hand at the state capitol on Tuesdays and Thursdays. The state charges $20 per document.', '3-5 days'],
  ['Home, or straight abroad', 'Mailed back to you by tracked post, or couriered to the receiving office, university or consulate.', '1-3 days'],
];

const FAQ = [
  ['Can you notarize a document written in another language?', 'Yes, if the notarial certificate itself is in English and I can talk with you directly. I cannot take an oath through an interpreter you bring.'],
  ['Do you come to hospitals and care homes?', 'Every week. The signer must be awake, aware and able to tell me in their own words what they are signing. I ask a few simple questions first, kindly.'],
  ['How soon can you get here?', 'Most bookings are seen the same day. In Zone 1 we can be at the door within 90 minutes for the same-hour fee.'],
  ['Is the trip fee charged if the signing cannot go ahead?', 'Yes, if we travel and there is no valid ID or pages are missing. Notarial fees are only charged for signatures actually made.'],
  ['Do you keep a record?', 'Every act goes in a bound journal with the signer, the ID shown and a signature, kept for ten years as the state requires.'],
];

const HOURS = [
  ['Monday to Friday', '7 am to 9 pm'],
  ['Saturday and Sunday', '8 am to 8 pm'],
  ['Public holidays', 'By phone'],
];

const DOCS = ['Loan signing', 'Power of attorney', 'Will or trust', 'Apostille', 'Something else'];

export default function SealwellNotaryPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f5f0e3',
        '--navy': '#1c2b4a',
        '--wax': '#8c2232',
        '--gold': '#b08a3e',
        '--steel': '#6d7f99',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,navy,wax,gold,steel"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Sealwell</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>Mobile Notary and Apostilles</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCall" data-edit-max="28" className={s.barCall} href="tel:+15550142290">(555) 014-2290</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: a certificate on security paper, sealed across its edge. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="intro.field" data-edit-roles="transparent,4,1,4,3,4" className={s.heroLace} aria-hidden="true">
            <TabbiedPattern pattern={bobbinet} palette={SECURITY} fit="grid" cellSize={64} seed="sealwell-paper" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.heroInner}>
            <div className={s.certificate}>
              <p data-edit="intro.certKicker" data-edit-max="240" data-edit-multiline className={s.certKicker}>Certificate of service</p>
              <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
                Signed, sworn and sealed <em>at your kitchen table.</em>
              </h1>
              <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
                We drive to you with the stamp, the journal and a printer: homes,
                offices, hospitals and care homes, seven days a week. A fixed fee
                per signature, a fixed trip fee by zone, and nothing on the
                invoice you were not told about.
              </p>
              <div className={s.heroActions}>
                <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#book">Book a signing</a>
                <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#fees">Read the fee schedule</a>
              </div>
              <div className={s.certFoot}>
                <dl className={s.certFacts}>
                  <div>
                    <dt data-edit="intro.term" data-edit-max="28">Commission no.</dt>
                    <dd data-edit="intro.body" data-edit-max="200" data-edit-multiline>2031-0417</dd>
                  </div>
                  <div>
                    <dt data-edit="intro.term2" data-edit-max="28">Surety bond</dt>
                    <dd data-edit="intro.body2" data-edit-max="200" data-edit-multiline>$25,000</dd>
                  </div>
                  <div>
                    <dt data-edit="intro.term3" data-edit-max="28">Open</dt>
                    <dd data-edit="intro.body3" data-edit-max="200" data-edit-multiline>7 days, 7 am-9 pm</dd>
                  </div>
                </dl>
                <div className={s.signature}>
                  <p data-edit="intro.signName" data-edit-max="240" data-edit-multiline className={s.signName}>Ines Marlow</p>
                  <p data-edit="intro.signRole" data-edit-max="240" data-edit-multiline className={s.signRole}>Notary Public, commissioned 2014</p>
                </div>
              </div>
            </div>

            <div className={s.seal}>
              <div data-edit-pattern="intro.field2" data-edit-roles="transparent,3,0,3,0,3" className={s.sealFoil} aria-hidden="true">
                <TabbiedPattern pattern={bobbinet} palette={FOIL} fit="grid" cellSize={48} seed="sealwell-foil" style={{ position: 'absolute', inset: 0 }} />
              </div>
              <div className={s.sealFace}>
                <span data-edit="intro.sealSmall" data-edit-max="60" className={s.sealSmall}>Notary Public</span>
                <span data-edit="intro.sealName" data-edit-max="60" className={s.sealName}>Sealwell</span>
                <span data-edit="intro.sealSmall2" data-edit-max="60" className={s.sealSmall}>Alder County</span>
                <span data-edit="intro.sealYear" data-edit-max="60" className={s.sealYear}>Est. 2014</span>
              </div>
              <span className={s.tailLeft} aria-hidden="true" />
              <span className={s.tailRight} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* FEES: the schedule, laid out like the stub of a receipt book. */}
        <section id="fees" className={s.sec} aria-labelledby="fees-h">
          <div className={s.secHead}>
            <p data-edit="fees.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Schedule of fees</p>
            <h2 data-edit="fees.secTitle" data-edit-max="60" id="fees-h" className={s.secTitle}>Per signature, plus one trip</h2>
            <p data-edit="fees.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Notarial fees are capped by the state and we charge the cap, no
              more. The trip fee covers the drive both ways and up to 45 minutes
              at the table.
            </p>
          </div>

          <div className={s.feeGrid}>
            <div className={s.feeCard}>
              <h3 data-edit="fees.feeTitle" data-edit-max="40" className={s.feeTitle}>Per signature</h3>
              <dl className={s.feeList}>
                {PER_SIGNATURE.map(([what, price], i) => (
                  <div key={what}>
                    <dt data-edit={`fees.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`fees.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.feeCard}>
              <h3 data-edit="fees.feeTitle2" data-edit-max="40" className={s.feeTitle}>Per trip</h3>
              <dl className={s.feeList}>
                {PER_TRIP.map(([what, price], i) => (
                  <div key={what}>
                    <dt data-edit={`fees.term2.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`fees.body2.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.example}>
                <p data-edit="fees.exampleHead" data-edit-max="240" data-edit-multiline className={s.exampleHead}>A worked example</p>
                <p data-edit="fees.exampleText" data-edit-max="240" data-edit-multiline className={s.exampleText}>
                  A power of attorney and a health care directive, two signers,
                  in Peel Crossing on a Saturday: four signatures at $15, the
                  Zone 2 trip at $55 and the weekend $20. Total $135.
                </p>
              </div>
            </div>
          </div>

          <ul className={s.packages}>
            {PACKAGES.map(([name, price, note], i) => (
              <li key={name} className={s.package}>
                <h3 data-edit={`fees.packName.${i}`} data-edit-max="40" className={s.packName}>{name}</h3>
                <p data-edit={`fees.packPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.packPrice}>{price}</p>
                <p data-edit={`fees.packNote.${i}`} data-edit-max="240" data-edit-multiline className={s.packNote}>{note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ZONES: three rings around the office, the outer one in lace. */}
        <section id="zones" className={s.zones} aria-labelledby="zones-h">
          <div className={s.zonesInner}>
            <div className={s.rings} aria-hidden="true">
              <div data-edit-pattern="zones.field" data-edit-roles="transparent,1,4,3,4,1" className={s.ringLace}>
                <TabbiedPattern pattern={bobbinet} palette={ZONES_LACE} fit="grid" cellSize={40} seed="sealwell-zones" style={{ position: 'absolute', inset: 0 }} />
              </div>
              <span className={s.ringTwo} />
              <span className={s.ringOne} />
              <span data-edit="zones.ringTag" data-edit-max="60" className={`${s.ringTag} ${s.tagOne}`}>1</span>
              <span data-edit="zones.ringTag2" data-edit-max="60" className={`${s.ringTag} ${s.tagTwo}`}>2</span>
              <span data-edit="zones.ringTag3" data-edit-max="60" className={`${s.ringTag} ${s.tagThree}`}>3</span>
            </div>
            <div className={s.zonesText}>
              <p data-edit="zones.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Where we drive</p>
              <h2 data-edit="zones.secTitle" data-edit-max="60" id="zones-h" className={s.secTitle}>Three zones, three trip fees</h2>
              <p data-edit="zones.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Measured by road from the office on Wren Court. Every signer at
                the same address shares one trip fee.
              </p>
              <ol className={s.zoneList}>
                {ZONES.map((z, i) => (
                  <li key={z.name} className={s.zone}>
                    <p data-edit={`zones.zoneName.${i}`} data-edit-max="240" data-edit-multiline className={s.zoneName}>{z.name}</p>
                    <p data-edit={`zones.zoneReach.${i}`} data-edit-max="240" data-edit-multiline className={s.zoneReach}>{z.reach}</p>
                    <p data-edit={`zones.zoneFee.${i}`} data-edit-max="240" data-edit-multiline className={s.zoneFee}>{z.fee}</p>
                    <p data-edit={`zones.zoneTowns.${i}`} data-edit-max="240" data-edit-multiline className={s.zoneTowns}>{z.towns}</p>
                  </li>
                ))}
              </ol>
              <p data-edit="zones.beyond" data-edit-max="240" data-edit-multiline className={s.beyond}>Further than 35 miles: $2 a mile each way, quoted before we set off.</p>
            </div>
          </div>
        </section>

        {/* BRING: a checklist, one column to bring and one to leave behind. */}
        <section id="bring" className={s.sec} aria-labelledby="bring-h">
          <div className={s.secHead}>
            <p data-edit="bring.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Before we arrive</p>
            <h2 data-edit="bring.secTitle" data-edit-max="60" id="bring-h" className={s.secTitle}>What to have on the table</h2>
          </div>
          <div className={s.bringGrid}>
            <div className={s.checkCard}>
              <h3 data-edit="bring.checkTitle" data-edit-max="40" className={s.checkTitle}>Bring</h3>
              <ul className={s.checks}>
                {BRING.map((b, i) => (
                  <li data-edit={`bring.item.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className={s.checkCard}>
              <h3 data-edit="bring.checkTitle2" data-edit-max="40" className={s.checkTitle}>Please do not</h3>
              <ul className={`${s.checks} ${s.crosses}`}>
                {LEAVE.map((b, i) => (
                  <li data-edit={`bring.item2.${i}`} data-edit-max="80" key={b}>{b}</li>
                ))}
              </ul>
              <div className={s.noId}>
                <p data-edit="bring.noIdHead" data-edit-max="240" data-edit-multiline className={s.noIdHead}>No valid ID at all?</p>
                <p data-edit="bring.noIdText" data-edit-max="240" data-edit-multiline className={s.noIdText}>
                  Two credible witnesses who know you personally, and who carry
                  ID themselves, can swear to who you are. Tell us when you book.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* APOSTILLE: a dark band edged with a lace ribbon. */}
        <section id="apostille" className={s.apostille} aria-labelledby="apostille-h">
          <div data-edit-pattern="apostille.field" data-edit-roles="transparent,0,3,0,4,0" className={s.ribbon} aria-hidden="true">
            <TabbiedPattern pattern={bobbinet} palette={RIBBON} fit="grid" cellSize={36} seed="sealwell-ribbon" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.apostilleInner}>
            <div className={s.apostilleHead}>
              <p data-edit="apostille.apostilleEyebrow" data-edit-max="240" data-edit-multiline className={s.apostilleEyebrow}>Documents going abroad</p>
              <h2 data-edit="apostille.apostilleTitle" data-edit-max="60" id="apostille-h" className={s.apostilleTitle}>Apostilles, explained</h2>
              <p data-edit="apostille.apostilleLead" data-edit-max="240" data-edit-multiline className={s.apostilleLead}>
                An apostille is a certificate the Secretary of State attaches to a
                document so that it is accepted in any of the 120-odd countries
                of the Hague Apostille Convention: a diploma for a job in Lisbon,
                a power of attorney for a flat in Seoul, a birth certificate for a
                wedding in Rome.
              </p>
              <p data-edit="apostille.apostillePrice" data-edit-max="240" data-edit-multiline className={s.apostillePrice}>$95 a document, plus the $20 state fee. Usually back in 6-10 working days.</p>
            </div>
            <ol className={s.steps}>
              {APOSTILLE.map(([title, text, time], i) => (
                <li key={title} className={s.step}>
                  <span className={s.stepNo}>{i + 1}</span>
                  <h3 data-edit={`apostille.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                  <p data-edit={`apostille.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                  <p data-edit={`apostille.stepTime.${i}`} data-edit-max="240" data-edit-multiline className={s.stepTime}>{time}</p>
                </li>
              ))}
            </ol>
            <p data-edit="apostille.legalize" data-edit-max="240" data-edit-multiline className={s.legalize}>
              Not a Hague country? Some, including several in the Middle East and
              Asia, also need the embassy to legalize the document. We handle that
              too; allow three to six weeks.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={s.sec} aria-labelledby="faq-h">
          <div className={s.faqGrid}>
            <div>
              <p data-edit="faq.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Asked every week</p>
              <h2 data-edit="faq.secTitle" data-edit-max="60" id="faq-h" className={s.secTitle}>Questions</h2>
            </div>
            <div className={s.faqList}>
              {FAQ.map(([q, a], i) => (
                <details key={q} className={s.faq}>
                  <summary data-edit={`faq.question.${i}`} data-edit-max="80">{q}</summary>
                  <p data-edit={`faq.body.${i}`} data-edit-max="240" data-edit-multiline>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div className={s.bookInfo}>
              <p data-edit="book.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Book a signing</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Tell us where the table is</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                We confirm by phone within the hour during opening times, with
                the fee in writing before we set off.
              </p>
              <dl className={s.contact}>
                <div>
                  <dt data-edit="book.term" data-edit-max="28">Office</dt>
                  <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>40 Wren Court, Suite 2, Alder</dd>
                </div>
                <div>
                  <dt data-edit="book.term2" data-edit-max="28">Phone</dt>
                  <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>(555) 014-2290</dd>
                </div>
                <div>
                  <dt data-edit="book.term3" data-edit-max="28">Email</dt>
                  <dd data-edit="book.body3" data-edit-max="200" data-edit-multiline>book@sealwell.example</dd>
                </div>
              </dl>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term4.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body4.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="sw-name">Your name</label>
                <input id="sw-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="sw-phone">Phone</label>
                <input id="sw-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label3" htmlFor="sw-where">Address of the signing</label>
                <input id="sw-where" name="where" type="text" autoComplete="street-address" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="sw-date">Preferred day</label>
                <input id="sw-date" name="date" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="sw-signers">Number of signers</label>
                <input id="sw-signers" name="signers" type="number" min="1" max="12" />
              </div>
              <fieldset className={`${s.field} ${s.wide} ${s.fieldset}`}>
                <legend data-edit="book.legend">What needs signing</legend>
                <div className={s.picks}>
                  {DOCS.map((d, i) => (
                    <div key={d} className={s.pick}>
                      <input id={`sw-doc-${i}`} type="radio" name="doc" value={d} />
                      <label data-edit={`book.label6.${i}`} htmlFor={`sw-doc-${i}`}>{d}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label7" htmlFor="sw-note">Anything we should know</label>
                <textarea id="sw-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Request a signing</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,4,1,4,3,4" className={s.footLace} aria-hidden="true">
          <TabbiedPattern pattern={bobbinet} palette={SECURITY} fit="grid" cellSize={44} seed="sealwell-foot" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Sealwell Mobile Notary</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>
            A fictional notary service. The names, people, prices, zones and
            address are invented, and nothing here is legal advice.
          </p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
