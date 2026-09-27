import { TabbiedPattern } from 'tabbied/react';
import { frieze, lattice, crosslattice, meetpart, ogee } from 'tabbied/patterns';
import s from './vellum-and-quill.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Vellum & Quill: Calligraphy and wedding stationery, Wellsby',
  description:
    'Wedding suites, envelope addressing, certificates, family trees and calligraphy workshops, lettered by hand in a studio above the bookbinder on Scriptorium Lane, Wellsby.',
};

/* Site colors: the SAME hexes as the root roles in the stylesheet. */
const VELLUM = '#f3ead4';
const INK = '#1e1a16';
const VERMILION = '#c23a2a';
const GOLD = '#c99a3a';
const LAPIS = '#2a4a8f';

/* The running frieze along the head of the leaf and again at the colophon. */
const FRIEZE = ['transparent', VERMILION, LAPIS, GOLD, INK, VERMILION];
/* The diapered ground inside a painted initial. */
const DIAPER = ['transparent', GOLD, VERMILION, VELLUM, GOLD, LAPIS];
/* The lined flap of the specimen envelope. */
const LINER = [LAPIS, LAPIS, GOLD];
/* The postage stamp on the addressed envelope. */
const STAMP = [VELLUM, GOLD, VERMILION, LAPIS, INK, VERMILION];
/* The line filler above the care notes. */
const FILLER = ['transparent', VERMILION, LAPIS, GOLD, LAPIS, VERMILION];

const NAV = [
  ['Suites', '#suites'],
  ['Addressing', '#addressing'],
  ['Commissions', '#commissions'],
  ['Workshops', '#workshops'],
  ['Care', '#care'],
  ['Enquire', '#enquire'],
];

const HERO_FACTS = [
  ['Founded', '2009, above the bindery'],
  ['Hands', 'Copperplate, italic, textura'],
  ['Gold', '23.5 carat, raised on gesso'],
];

type Suite = { item: string; what: string; price: string; note: string };

const SUITES: Suite[] = [
  {
    item: 'The invitation',
    what: 'A flat card, 5 x 7 in, on 600gsm cotton rag. Your names in pointed-pen copperplate; the rest printed letterpress from our own lettering.',
    price: '$385',
    note: 'per 50',
  },
  {
    item: 'Order of service',
    what: 'Eight pages, sewn with silk thread by the bindery downstairs. The hymns, the readings and the order of the day, with a painted initial on the cover.',
    price: '$420',
    note: 'per 50',
  },
  {
    item: 'Place cards',
    what: 'Folded tent cards, every guest named by hand. A gilded initial on the fold, if you want one, adds $1.20 a card.',
    price: '$140',
    note: 'per 50',
  },
  {
    item: 'Seating chart',
    what: 'One sheet, 24 x 33 in, table by table in ink and gold, mounted on board and ready to hang on an easel.',
    price: '$310',
    note: 'per 50 guests',
  },
];

const SUITE_GLOSSES = [
  'The whole suite for fifty guests is $1,120, which is $135 less than the four apart.',
  'Envelopes with a lined flap add $60 per 50. The liner is printed from a pattern of your choosing.',
  'Every order begins with a proof on the real paper, posted to you. Changes to the proof are free.',
];

type Hand = { hand: string; sample: string; note: string; price: string; font: 'copper' | 'italic' | 'textura' | 'fraktur' };

const HANDS: Hand[] = [
  { hand: 'Copperplate', sample: 'Rosalind Ashby', note: 'The wedding hand: slanted, with swelling downstrokes.', price: '$4.20', font: 'copper' },
  { hand: 'Italic', sample: 'Rosalind Ashby', note: 'Upright and quick to read, good for long addresses.', price: '$3.60', font: 'italic' },
  { hand: 'Textura', sample: 'Rosalind Ashby', note: 'Names only, with the address in italic beneath.', price: '$5.40', font: 'textura' },
  { hand: 'Fraktur', sample: 'Rosalind Ashby', note: 'Broken and ornate. Best for a short name and a large envelope.', price: '$5.80', font: 'fraktur' },
];

const ADDRESS_LINES = ['Mr and Mrs Jonah Pell', '14 Orchard Row', 'Little Haddon', 'Wellsby WL4 2PQ'];

const ADDRESS_TERMS = [
  ['Minimum', '25 envelopes'],
  ['Turnaround', '7 working days for each 100'],
  ['Your list', 'A spreadsheet, one column per line'],
  ['Spares', 'Two blank envelopes for every twenty-five'],
];

type Commission = { initial: string; kind: string; from: string; text: string; time: string };

const COMMISSIONS: Commission[] = [
  {
    initial: 'C',
    kind: 'Certificates',
    from: 'from $180',
    text: 'Awards, ordinations, retirements and society charters, on calfskin vellum or cotton paper, with a ribbon and a wax seal if the occasion wants one.',
    time: 'Three to four weeks',
  },
  {
    initial: 'F',
    kind: 'Family trees',
    from: 'from $640',
    text: 'Up to five generations, drawn as a descent or as a vine. You do the research, we do the lettering, and every date is checked twice against your notes.',
    time: 'Six to eight weeks',
  },
  {
    initial: 'P',
    kind: 'Poems and verses',
    from: 'from $260',
    text: 'A poem, a vow, a psalm or a grandmother\'s recipe, in a hand that suits the words, with a painted initial and gold where the words deserve it.',
    time: 'Four to five weeks',
  },
];

type Person = { name: string; dates: string; spouse?: string; children?: Person[] };

const TREE: Person = {
  name: 'Edmund Hale',
  dates: '1921-1998',
  spouse: 'm. Margery Finch, 1925-2011',
  children: [
    {
      name: 'Ruth Hale',
      dates: 'b. 1950',
      spouse: 'm. Daniel Osei',
      children: [
        { name: 'Ada Osei', dates: 'b. 1981' },
        { name: 'Samuel Osei', dates: 'b. 1984' },
      ],
    },
    {
      name: 'Thomas Hale',
      dates: 'b. 1953',
      spouse: 'm. Ines Carvalho',
      children: [{ name: 'Clara Hale', dates: 'b. 1990' }],
    },
  ],
};

type Course = { name: string; text: string; gloss: string };

const COURSES: Course[] = [
  {
    name: 'Modern calligraphy for beginners',
    text: 'A dip pen, a pot of ink and three hours to learn the strokes that make every letter. You leave able to write a card you would be glad to send.',
    gloss: 'Three hours, $85. Pens, nibs, ink and paper are ours, and you keep them.',
  },
  {
    name: 'Pointed pen',
    text: 'A full day of copperplate: pressure and release, the oval, the joins, and the capitals that people frame. For anyone who has held a dip pen before.',
    gloss: 'A day, $145, with lunch from the bakery on the corner.',
  },
  {
    name: 'Gilding',
    text: 'Gesso laid on vellum, left to cure, breathed on and gilded, then burnished with an agate until it shines like metal, because it is.',
    gloss: 'A day, $165. Two books of gold leaf are included.',
  },
];

type Session = { day: string; dow: string; mon: string; name: string; time: string; price: string; places: string; red: boolean; full: boolean };

const CALENDAR: Session[] = [
  { day: '4', dow: 'Sat', mon: 'Oct', name: 'Modern calligraphy for beginners', time: '10:00-13:00', price: '$85', places: '4 places', red: false, full: false },
  { day: '11', dow: 'Sat', mon: 'Oct', name: 'Pointed pen: copperplate in a day', time: '10:00-16:00', price: '$145', places: 'Full, waiting list', red: false, full: true },
  { day: '18', dow: 'Sat', mon: 'Oct', name: 'Gilding with gesso and gold leaf', time: '10:00-16:00', price: '$165', places: '2 places', red: true, full: false },
  { day: '25', dow: 'Sat', mon: 'Oct', name: 'Modern calligraphy for beginners', time: '10:00-13:00', price: '$85', places: '6 places', red: false, full: false },
  { day: '8', dow: 'Sat', mon: 'Nov', name: 'Pointed pen: the capitals', time: '10:00-16:00', price: '$145', places: '5 places', red: false, full: false },
  { day: '15', dow: 'Sat', mon: 'Nov', name: 'Gilding: a raised initial', time: '10:00-16:00', price: '$165', places: '3 places', red: true, full: false },
  { day: '29', dow: 'Sat', mon: 'Nov', name: 'Winter cards in italic', time: '14:00-17:00', price: '$75', places: '7 places', red: false, full: false },
];

const LEAD_TIMES = [
  ['Wedding suites', '10-12 weeks before the day'],
  ['Envelope addressing', '7 working days per 100'],
  ['Place cards, seating chart', 'Final names 10 days before'],
  ['Certificates and poems', '3-5 weeks'],
  ['Family trees', '6-8 weeks once the research is settled'],
  ['A rush, if we can', 'Half again on the price, and we will say honestly'],
];

const CARE = [
  ['Keep it dry', 'Iron gall ink and gesso both drink damp. Frame behind glass, and never hang it in a bathroom or above a kettle.'],
  ['Out of the sun', 'Vermilion and gold will outlive us all; lapis and the paper itself fade. A north wall is the kindest.'],
  ['Hands off the gold', 'Raised gilding is burnished and bruises under a thumb. Hold a card by its edges, as you would a photograph.'],
  ['Our mistakes', 'We letter two spares of every name. A misspelling that is ours is redone the same week at no charge.'],
];

const HOURS = [
  ['Tuesday to Friday', '10:00-17:00'],
  ['Saturday', 'Workshops, and visits 14:00-16:00'],
  ['Sunday and Monday', 'Closed'],
];

export default function VellumAndQuillPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--vellum': '#f3ead4',
        '--ink': '#1e1a16',
        '--vermilion': '#c23a2a',
        '--gold': '#c99a3a',
        '--lapis': '#2a4a8f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="vellum,ink,vermilion,gold,lapis"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Grenze+Gotisch:wght@400..800&family=IM+Fell+DW+Pica+SC&family=Pinyon+Script&family=UnifrakturMaguntia&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.mark" data-edit-max="28" className={s.mark} href="#top">Vellum &amp; Quill</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Studio open Tuesday to Friday, 10-5</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top" className={s.folio}>
        {/* The border: one vine strip repeated end to end down the outer margin. */}
        <div className={s.vine} aria-hidden="true">
          <Artwork
            slug="vellum-and-quill-border"
            alt=""
            fit="cover"
            inks={{ black: 'var(--text)', red: 'var(--vermilion)', blue: 'var(--lapis)', yellow: 'var(--gold)' }}
            className={s.vineArt}
          />
        </div>

        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="vq-title">
          <div className={s.row}>
            <div className={s.heroHead}>
              <p data-edit="vq.incipit" data-edit-max="240" data-edit-multiline className={s.incipit}>Here begin the wares of a scriptorium in Wellsby</p>
              <h1 data-edit="vq.title" data-edit-max="70" id="vq-title" className={s.title}>Vellum &amp; Quill</h1>
              <p data-edit="vq.subtitle" data-edit-max="240" data-edit-multiline className={s.subtitle}>Calligraphy and wedding stationery, lettered by hand</p>
            </div>
            <div className={s.margin}>
              <p data-edit="vq.folioNo" data-edit-max="240" data-edit-multiline className={s.folioNo}>f. 1r</p>
              <p data-edit="vq.gloss" data-edit-max="240" data-edit-multiline className={s.gloss}>Above the bookbinder at 5 Scriptorium Lane. Ring the second bell.</p>
            </div>
          </div>

          <div className={s.friezeFrame}>
            <div data-edit-pattern="vq.field" data-edit-roles="transparent,2,4,3,1,2" className={s.friezeBand} aria-hidden="true">
              <TabbiedPattern pattern={frieze} palette={FRIEZE} fit="grid" cellSize={52} seed="vq-frieze-head" style={{ position: 'absolute', inset: 0 }} />
            </div>
          </div>

          <div className={s.row}>
            <div className={s.opening}>
              <Artwork
                slug="vellum-and-quill-quill"
                alt="A feather quill standing in a round ink pot"
                inks={['var(--text)']}
                className={s.quill}
              />
              <div className={s.openingText}>
                <div className={s.initial} aria-hidden="true">
                  <div data-edit-pattern="vq.field2" data-edit-roles="transparent,3,2,0,3,4" className={s.initialField}>
                    <TabbiedPattern pattern={lattice} palette={DIAPER} options={{ frequency: 0.7 }} fit="grid" cellSize={22} seed="vq-initial-w" style={{ position: 'absolute', inset: 0 }} />
                  </div>
                  <span data-edit="vq.initialLetter" data-edit-max="60" className={s.initialLetter}>W</span>
                </div>
                <p data-edit="vq.dropped" data-edit-max="240" data-edit-multiline className={`${s.dropped} ${s.ruled}`}>
                  Wedding stationery, envelopes, certificates and family trees,
                  written with a quill and a pointed pen in a small room above
                  the bindery. Every name is lettered, never printed; every
                  initial is painted; and the gold is real, laid on raised
                  gesso so that it catches the candles.
                </p>
                <div className={s.actions}>
                  <a data-edit="vq.btn" data-edit-max="28" className={s.btn} href="#enquire">Begin an enquiry</a>
                  <a data-edit="vq.btnGhost" data-edit-max="28" className={s.btnGhost} href="#suites">See the wedding suites</a>
                </div>
              </div>
            </div>
            <div className={s.margin}>
              <p data-edit="vq.gloss2" data-edit-max="240" data-edit-multiline className={s.gloss}>
                Written in iron gall ink, which starts pale and darkens to a
                deep brown-black over a week.
              </p>
              <dl className={s.heroFacts}>
                {HERO_FACTS.map(([term, value], i) => (
                  <div key={term}>
                    <dt data-edit={`vq.term.${i}`} data-edit-max="28">{term}</dt>
                    <dd data-edit={`vq.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- SUITES */}
        <section id="suites" className={s.leaf} aria-labelledby="suites-h">
          <div className={s.row}>
            <div className={s.head}>
              <p data-edit="suites.rubricLabel" data-edit-max="240" data-edit-multiline className={s.rubricLabel}>The first part</p>
              <h2 data-edit="suites.h2" data-edit-max="60" id="suites-h" className={s.h2}>Wedding suites</h2>
              <p data-edit="suites.intro" data-edit-max="240" data-edit-multiline className={`${s.intro} ${s.ruled}`}>
                Four pieces that belong together, lettered in one hand on one
                paper, so the invitation your guests open in spring matches the
                card they find on their plate in June. Prices are for fifty
                guests; we quote exactly for any number.
              </p>
            </div>
            <div className={s.margin}>
              <p data-edit="suites.folioNo" data-edit-max="240" data-edit-multiline className={s.folioNo}>f. 3r</p>
              <p data-edit="suites.gloss" data-edit-max="240" data-edit-multiline className={s.gloss}>{SUITE_GLOSSES[0]}</p>
            </div>
          </div>

          <div className={s.row}>
            <ol className={s.ledger}>
              {SUITES.map((item, i) => (
                <li key={item.item}>
                  <span data-edit={`suites.ledgerNo.${i}`} data-edit-max="60" className={s.ledgerNo}>{['i', 'ii', 'iii', 'iv'][i]}</span>
                  <div className={s.ledgerBody}>
                    <h3 data-edit={`suites.ledgerItem.${i}`} data-edit-max="40" className={s.ledgerItem}>{item.item}</h3>
                    <p data-edit={`suites.ledgerWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.ledgerWhat}>{item.what}</p>
                  </div>
                  <p className={s.ledgerPrice}>
                    <strong data-edit={`suites.emphasis.${i}`}>{item.price}</strong>
                    <span data-edit={`suites.text.${i}`} data-edit-max="60">{item.note}</span>
                  </p>
                </li>
              ))}
            </ol>
            <div className={s.margin}>
              <p data-edit="suites.gloss2" data-edit-max="240" data-edit-multiline className={s.gloss}>{SUITE_GLOSSES[1]}</p>
              <p data-edit="suites.gloss3" data-edit-max="240" data-edit-multiline className={s.gloss}>{SUITE_GLOSSES[2]}</p>
            </div>
          </div>

          <figure className={s.specimen}>
            <div className={s.envelope} aria-hidden="true">
              <span className={s.envFlap} />
            </div>
            <div data-edit-pattern="suites.field" data-edit-roles="4,4,3" className={s.liner} aria-hidden="true">
              <TabbiedPattern pattern={crosslattice} palette={LINER} fit="grid" cellSize={40} seed="vq-liner" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <div className={s.card}>
              <p data-edit="suites.cardTop" data-edit-max="240" data-edit-multiline className={s.cardTop}>Together with their families</p>
              <p data-edit="suites.cardName" data-edit-max="240" data-edit-multiline className={s.cardName}>Ada Marlowe</p>
              <p data-edit="suites.cardAmp" data-edit-max="240" data-edit-multiline className={s.cardAmp}>&amp;</p>
              <p data-edit="suites.cardName2" data-edit-max="240" data-edit-multiline className={s.cardName}>Tobias Wren</p>
              <p data-edit="suites.cardBody" data-edit-max="240" data-edit-multiline className={s.cardBody}>request the pleasure of your company at their marriage</p>
              <p data-edit="suites.cardWhen" data-edit-max="240" data-edit-multiline className={s.cardWhen}>Saturday the fourteenth of June at two o&apos;clock</p>
              <p data-edit="suites.cardWhere" data-edit-max="240" data-edit-multiline className={s.cardWhere}>St Aldhelm&apos;s Church, Wellsby</p>
            </div>
            <figcaption data-edit="suites.capLabel" data-edit-format="emphasis" data-edit-max="130" data-edit-multiline className={s.specCaption}>
              <span className={s.capLabel}>Specimen</span>
              The Marlowe and Wren invitation, on a lapis liner with a gold
              cross lattice. Names in copperplate, the rest letterpress.
            </figcaption>
          </figure>
        </section>

        {/* ------------------------------------------------------ ADDRESSING */}
        <section id="addressing" className={s.leaf} aria-labelledby="address-h">
          <div className={s.row}>
            <div className={s.head}>
              <p data-edit="addressing.rubricLabel" data-edit-max="240" data-edit-multiline className={s.rubricLabel}>The second part</p>
              <h2 data-edit="addressing.h2" data-edit-max="60" id="address-h" className={s.h2}>Envelope addressing</h2>
              <p data-edit="addressing.intro" data-edit-max="240" data-edit-multiline className={`${s.intro} ${s.ruled}`}>
                The envelope is the first thing anyone sees, and the postman
                sees it too. Send us your envelopes, or buy ours, and your list;
                we write every address by hand in the hand you choose.
              </p>
            </div>
            <div className={s.margin}>
              <p data-edit="addressing.folioNo" data-edit-max="240" data-edit-multiline className={s.folioNo}>f. 4v</p>
              <p data-edit="addressing.gloss" data-edit-max="240" data-edit-multiline className={s.gloss}>Priced by the envelope. A return address on the flap is 90 cents more.</p>
            </div>
          </div>

          <div className={s.addressWrap}>
            <div className={s.envelopeFront}>
              <div className={s.stamp} aria-hidden="true">
                <div data-edit-pattern="addressing.field" data-edit-roles="0,3,2,4,1,2" className={s.stampField}>
                  <TabbiedPattern pattern={meetpart} palette={STAMP} fit="grid" cellSize={18} seed="vq-stamp" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <span data-edit="addressing.stampValue" data-edit-max="60" className={s.stampValue}>2nd</span>
              </div>
              <span className={s.postmark} aria-hidden="true">
                <span data-edit="addressing.text" data-edit-max="60">Wellsby</span>
                <span data-edit="addressing.text2" data-edit-max="60">12 Oct</span>
              </span>
              <address className={s.addressLines}>
                {ADDRESS_LINES.map((line, i) => (
                  <span data-edit={`addressing.text3.${i}`} data-edit-max="60" key={line}>{line}</span>
                ))}
              </address>
            </div>
            <dl className={s.addressTerms}>
              {ADDRESS_TERMS.map(([term, value], i) => (
                <div key={term}>
                  <dt data-edit={`addressing.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`addressing.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ul className={s.hands}>
            {HANDS.map((h, i) => (
              <li key={h.hand}>
                <p data-edit={`addressing.handSample.${i}`} data-edit-max="240" data-edit-multiline className={`${s.handSample} ${s[h.font]}`}>{h.sample}</p>
                <h3 data-edit={`addressing.handName.${i}`} data-edit-max="40" className={s.handName}>{h.hand}</h3>
                <p data-edit={`addressing.handNote.${i}`} data-edit-max="240" data-edit-multiline className={s.handNote}>{h.note}</p>
                <p className={s.handPrice}>{h.price} each</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ----------------------------------------------------- COMMISSIONS */}
        <section id="commissions" className={s.leaf} aria-labelledby="comm-h">
          <div className={s.row}>
            <div className={s.head}>
              <p data-edit="commissions.rubricLabel" data-edit-max="240" data-edit-multiline className={s.rubricLabel}>The third part</p>
              <h2 data-edit="commissions.h2" data-edit-max="60" id="comm-h" className={s.h2}>Commissions</h2>
              <p data-edit="commissions.intro" data-edit-max="240" data-edit-multiline className={`${s.intro} ${s.ruled}`}>
                Pieces to keep: things to hang in a hall, give at a
                retirement, or pass down. Each begins with a conversation at
                the big table and a pencil sketch before any ink is ground.
              </p>
            </div>
            <div className={s.margin}>
              <p data-edit="commissions.folioNo" data-edit-max="240" data-edit-multiline className={s.folioNo}>f. 6r</p>
              <p data-edit="commissions.gloss" data-edit-max="240" data-edit-multiline className={s.gloss}>Calfskin vellum is $90 more than cotton paper for a sheet up to 16 x 20 in.</p>
            </div>
          </div>

          <ul className={s.commissions}>
            {COMMISSIONS.map((c, i) => (
              <li key={c.kind} className={s.commission}>
                <span className={s.smallInitial} aria-hidden="true">{c.initial}</span>
                <h3 data-edit={`commissions.commKind.${i}`} data-edit-max="40" className={s.commKind}>{c.kind}</h3>
                <p data-edit={`commissions.commFrom.${i}`} data-edit-max="240" data-edit-multiline className={s.commFrom}>{c.from}</p>
                <p data-edit={`commissions.commText.${i}`} data-edit-max="240" data-edit-multiline className={s.commText}>{c.text}</p>
                <p data-edit={`commissions.commTime.${i}`} data-edit-max="240" data-edit-multiline className={s.commTime}>{c.time}</p>
              </li>
            ))}
          </ul>

          <div className={s.treeBlock}>
            <div className={s.treeIntro}>
              <p data-edit="commissions.rubricLabel2" data-edit-max="240" data-edit-multiline className={s.rubricLabel}>A specimen descent</p>
              <h3 data-edit="commissions.treeTitle" data-edit-max="40" className={s.treeTitle}>The Hale family, three generations</h3>
              <p data-edit="commissions.treeNote" data-edit-max="240" data-edit-multiline className={s.treeNote}>
                Drawn for a golden wedding in 2024: names in textura, dates in
                italic, the lines of descent in vermilion. Yours can run to
                five generations on one sheet.
              </p>
            </div>
            <ul className={s.tree}>
              <li className={s.treeRoot}>
                <p className={s.treePerson}>
                  <span data-edit="commissions.treeName" data-edit-max="60" className={s.treeName}>{TREE.name}</span>
                  <span data-edit="commissions.treeDates" data-edit-max="60" className={s.treeDates}>{TREE.dates}</span>
                </p>
                <p data-edit="commissions.treeSpouse" data-edit-max="240" data-edit-multiline className={s.treeSpouse}>{TREE.spouse}</p>
                <ul className={s.treeKids}>
                  {TREE.children?.map((child, ci) => (
                    <li key={child.name}>
                      <p className={s.treePerson}>
                        <span data-edit={`commissions.treeName2.${ci}`} data-edit-max="60" className={s.treeName}>{child.name}</span>
                        <span data-edit={`commissions.treeDates2.${ci}`} data-edit-max="60" className={s.treeDates}>{child.dates}</span>
                      </p>
                      <p data-edit={`commissions.treeSpouse2.${ci}`} data-edit-max="240" data-edit-multiline className={s.treeSpouse}>{child.spouse}</p>
                      <ul className={s.treeKids}>
                        {child.children?.map((grand, gi) => (
                          <li key={grand.name}>
                            <p className={s.treePerson}>
                              <span data-edit={`commissions.treeName3.${ci}.${gi}`} data-edit-max="60" className={s.treeName}>{grand.name}</span>
                              <span data-edit={`commissions.treeDates3.${ci}.${gi}`} data-edit-max="60" className={s.treeDates}>{grand.dates}</span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- WORKSHOPS */}
        <section id="workshops" className={s.leaf} aria-labelledby="work-h">
          <div className={s.row}>
            <div className={s.head}>
              <p data-edit="workshops.rubricLabel" data-edit-max="240" data-edit-multiline className={s.rubricLabel}>The fourth part</p>
              <h2 data-edit="workshops.h2" data-edit-max="60" id="work-h" className={s.h2}>Workshops</h2>
              <p data-edit="workshops.intro" data-edit-max="240" data-edit-multiline className={`${s.intro} ${s.ruled}`}>
                Six people round the big table on a Saturday, with Maud or
                Anselm. The pens, the ink, the gold and the tea are ours; you
                bring patience and something to carry your pages home in.
              </p>
            </div>
            <div className={s.margin}>
              <p data-edit="workshops.folioNo" data-edit-max="240" data-edit-multiline className={s.folioNo}>f. 8v</p>
              <p data-edit="workshops.gloss" data-edit-max="240" data-edit-multiline className={s.gloss}>Gift vouchers for any workshop, written by hand of course, from the studio.</p>
            </div>
          </div>

          {COURSES.map((c, i) => (
            <div key={c.name} className={s.row}>
              <div className={s.course}>
                <h3 data-edit={`workshops.courseName.${i}`} data-edit-max="40" className={s.courseName}>{c.name}</h3>
                <p data-edit={`workshops.courseText.${i}`} data-edit-max="240" data-edit-multiline className={`${s.courseText} ${s.ruled}`}>{c.text}</p>
              </div>
              <div className={s.margin}>
                <p data-edit={`workshops.gloss2.${i}`} data-edit-max="240" data-edit-multiline className={s.gloss}>{c.gloss}</p>
              </div>
            </div>
          ))}

          <div className={s.calendar}>
            <div className={s.kl} aria-hidden="true">
              <div data-edit-pattern="workshops.field" data-edit-roles="transparent,3,2,0,3,4" className={s.klField}>
                <TabbiedPattern pattern={lattice} palette={DIAPER} options={{ frequency: 0.6 }} fit="grid" cellSize={20} seed="vq-kalends" style={{ position: 'absolute', inset: 0 }} />
              </div>
              <span data-edit="workshops.klLetters" data-edit-max="60" className={s.klLetters}>KL</span>
            </div>
            <div className={s.calBody}>
              <h3 data-edit="workshops.calTitle" data-edit-max="40" className={s.calTitle}>The calendar, October and November</h3>
              <p data-edit="workshops.calNote" data-edit-max="240" data-edit-multiline className={s.calNote}>As in any book of hours, the red-letter days are the feasts: here, the gilding.</p>
              <div className={s.calScroll}>
                <table className={s.calTable}>
                  <caption data-edit="workshops.srOnly" className={s.srOnly}>Workshop dates with times, prices and places left</caption>
                  <thead>
                    <tr>
                      <th data-edit="workshops.heading" scope="col">Day</th>
                      <th data-edit="workshops.heading2" scope="col">Workshop</th>
                      <th data-edit="workshops.heading3" scope="col">Time</th>
                      <th data-edit="workshops.num" scope="col" className={s.num}>Price</th>
                      <th data-edit="workshops.heading4" scope="col">Places</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CALENDAR.map((c, i) => (
                      <tr key={`${c.day}-${c.mon}`} className={`${c.red ? s.redDay : ''} ${c.full ? s.fullDay : ''}`}>
                        <td className={s.calDay}>
                          <span data-edit={`workshops.calNum.${i}`} data-edit-max="60" className={s.calNum}>{c.day}</span>
                          <span className={s.calMon}>{c.dow} {c.mon}</span>
                        </td>
                        <th data-edit={`workshops.calName.${i}`} scope="row" className={s.calName}>{c.name}</th>
                        <td data-edit={`workshops.calTime.${i}`} className={s.calTime}>{c.time}</td>
                        <td data-edit={`workshops.calPrice.${i}`} className={`${s.calPrice} ${s.num}`}>{c.price}</td>
                        <td data-edit={`workshops.calPlaces.${i}`} className={s.calPlaces}>{c.places}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ CARE */}
        <section id="care" className={s.leaf} aria-labelledby="care-h">
          <div data-edit-pattern="care.field" data-edit-roles="transparent,2,4,3,4,2" className={s.filler} aria-hidden="true">
            <TabbiedPattern pattern={ogee} palette={FILLER} fit="grid" cellSize={24} seed="vq-filler" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.row}>
            <div className={s.head}>
              <p data-edit="care.rubricLabel" data-edit-max="240" data-edit-multiline className={s.rubricLabel}>The fifth part</p>
              <h2 data-edit="care.h2" data-edit-max="60" id="care-h" className={s.h2}>Care and lead times</h2>
              <p data-edit="care.intro" data-edit-max="240" data-edit-multiline className={`${s.intro} ${s.ruled}`}>
                Ink and gold take time to write and time to dry, and good
                paper has to be ordered from the mill. Here is how far ahead to
                ask, and how to look after what you receive.
              </p>
            </div>
            <div className={s.margin}>
              <p data-edit="care.folioNo" data-edit-max="240" data-edit-multiline className={s.folioNo}>f. 10r</p>
              <p data-edit="care.gloss" data-edit-max="240" data-edit-multiline className={s.gloss}>We post in a rigid folder with tissue between the pages. Collection from the studio is free.</p>
            </div>
          </div>

          <div className={s.careGrid}>
            <div className={s.leadBox}>
              <h3 data-edit="care.boxTitle" data-edit-max="40" className={s.boxTitle}>How long it takes</h3>
              <dl className={s.leads}>
                {LEAD_TIMES.map(([what, when], i) => (
                  <div key={what}>
                    <dt data-edit={`care.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`care.body.${i}`} data-edit-max="200" data-edit-multiline>{when}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.careBox}>
              <h3 data-edit="care.boxTitle2" data-edit-max="40" className={s.boxTitle}>Looking after it</h3>
              <ol className={s.careList}>
                {CARE.map(([title, text], i) => (
                  <li key={title}>
                    <span className={s.careNo}>{['i', 'ii', 'iii', 'iv'][i]}.</span>
                    <div>
                      <h4 data-edit={`care.careTitle.${i}`} data-edit-max="36" className={s.careTitle}>{title}</h4>
                      <p data-edit={`care.careText.${i}`} data-edit-max="240" data-edit-multiline className={s.careText}>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- ENQUIRE */}
        <section id="enquire" className={s.leaf} aria-labelledby="enq-h">
          <div className={s.row}>
            <div className={s.head}>
              <p data-edit="enquire.rubricLabel" data-edit-max="240" data-edit-multiline className={s.rubricLabel}>The last part</p>
              <h2 data-edit="enquire.h2" data-edit-max="60" id="enq-h" className={s.h2}>Enquiry</h2>
              <p data-edit="enquire.intro" data-edit-max="240" data-edit-multiline className={`${s.intro} ${s.ruled}`}>
                Tell us the day, the number and what you have in mind. We
                answer within three working days, usually with a question or
                two and a date to come and see the papers.
              </p>
            </div>
            <div className={s.margin}>
              <p data-edit="enquire.folioNo" data-edit-max="240" data-edit-multiline className={s.folioNo}>f. 11v</p>
              <p data-edit="enquire.gloss" data-edit-max="240" data-edit-multiline className={s.gloss}>A deposit of a third holds your date. The rest is due when the proof is approved.</p>
            </div>
          </div>

          <div className={s.row}>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="enquire.label" htmlFor="vq-name">Your name</label>
                <input id="vq-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label2" htmlFor="vq-email">Email</label>
                <input id="vq-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label3" htmlFor="vq-what">What you would like</label>
                <select id="vq-what" name="what" defaultValue="suite">
                  <option value="suite">A wedding suite</option>
                  <option value="envelopes">Envelope addressing</option>
                  <option value="commission">A certificate, tree or poem</option>
                  <option value="workshop">A place on a workshop</option>
                </select>
              </div>
              <div className={s.fieldPair}>
                <div className={s.field}>
                  <label data-edit="enquire.label4" htmlFor="vq-date">The date</label>
                  <input id="vq-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label data-edit="enquire.label5" htmlFor="vq-guests">Guests or pieces</label>
                  <input id="vq-guests" name="guests" type="number" min="1" inputMode="numeric" />
                </div>
              </div>
              <div className={s.field}>
                <label data-edit="enquire.label6" htmlFor="vq-note">What you have in mind</label>
                <textarea id="vq-note" name="note" rows={5} />
              </div>
              <button className={s.seal} type="submit">
                <span data-edit="enquire.text" data-edit-max="60">Send</span>
              </button>
            </form>
            <div className={s.margin}>
              <address className={s.contact}>
                <span data-edit="enquire.contactLabel" data-edit-max="60" className={s.contactLabel}>The studio</span>
                <span data-edit="enquire.text2" data-edit-max="60">5 Scriptorium Lane</span>
                <span data-edit="enquire.text3" data-edit-max="60">Wellsby WL1 3AE</span>
                <a data-edit="enquire.link" data-edit-max="28" href="tel:+15550134471">(555) 013-4471</a>
                <a data-edit="enquire.link2" data-edit-max="28" href="mailto:letters@vellumquill.example">letters@vellumquill.example</a>
              </address>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`enquire.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`enquire.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,4,3,1,2" className={s.footFrieze} aria-hidden="true">
          <TabbiedPattern pattern={frieze} palette={FRIEZE} fit="grid" cellSize={36} seed="vq-frieze-foot" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.colophon}>
          <p data-edit="footer.explicit" data-edit-max="240" data-edit-multiline className={s.explicit}>Explicit</p>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Vellum &amp; Quill</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>5 Scriptorium Lane, Wellsby, above the bookbinder</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional calligraphy studio; the names, prices, dates and addresses are invented.</p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>The vine border and the quill are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
