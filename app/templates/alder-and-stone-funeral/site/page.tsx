import { TabbiedPattern } from 'tabbied/react';
import { tulle, batiste, pindot, maline, dustfall } from 'tabbied/patterns';
import s from './alder-and-stone-funeral.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Alder & Stone Funeral Care: Independent funeral directors, Ashcombe',
  description:
    'A family-run funeral director in Ashcombe since 1962. What to do when someone dies, our services with every price shown, pre-paid plans and support afterwards. Answered day and night.',
};

/* Site colors: the SAME hexes as the root roles in the stylesheet. */
const STONE = '#eeeae3';
const CHARCOAL = '#2a2a2b';
const SAGE = '#8a9a86';
const PLUM = '#6b4a5a';

/* The veil: an even field of dots under the booklet and over the cover. */
const VEIL = ['transparent', SAGE, SAGE, PLUM, SAGE, SAGE];
/* Linen hairlines under the price pages. */
const LINEN = ['transparent', SAGE, PLUM, SAGE, SAGE, PLUM];
/* The smallest dots, on the plan cards. */
const PIN = ['transparent', PLUM, SAGE, PLUM, CHARCOAL, SAGE];
/* Pressed net, behind the support page. */
const NET = [STONE, SAGE, PLUM, SAGE, STONE, PLUM];
/* Dust settling toward one edge, above the family's history. */
const DUST = ['transparent', PLUM, SAGE, CHARCOAL, PLUM, SAGE];

const NAV = [
  ['When someone dies', '#when'],
  ['Prices', '#prices'],
  ['Arranging', '#arranging'],
  ['Plans', '#plans'],
  ['Support', '#support'],
  ['About us', '#about'],
  ['Contact', '#contact'],
];

const FIRST_STEPS = [
  ['There is no rush', 'If the death was expected, you can sit with them for as long as you need. Nothing has to happen in the next hour.'],
  ['Call the doctor or nurse', 'They confirm that the death has happened. At night or at a weekend, the out-of-hours line is (555) 010-1110.'],
  ['Call us, at any hour', 'We come within the hour, bring them into our care at Church Walk, and talk you through what happens next.'],
  ['Register the death', 'Within five days, at Ashcombe Register Office on Mill Street. We can book the appointment for you.'],
];

const PLACES = [
  ['At home', 'Call the doctor first, then us. We come to the house, and there is no need to tidy or to hurry anyone who wants to say goodbye.'],
  ['In hospital', 'The ward will look after them and give you the paperwork. Call us when you are ready; we collect from the hospital directly.'],
  ['In a care home or hospice', 'The staff will call the doctor. Many families ask the home to call us for them, which is fine; we will ring you afterwards.'],
  ['Away from home', 'Anywhere in the country or abroad, we arrange to bring them back to Ashcombe and deal with the other funeral director.'],
];

type Line = { item: string; price: string };
type Service = { name: string; price: string; what: string; lines: Line[]; after: string };

const SERVICES: Service[] = [
  {
    name: 'Direct cremation',
    price: '$1,650',
    what: 'A cremation with no service and no one attending. The ashes come back to you, and you can hold a gathering of your own, when and where you like.',
    lines: [
      { item: 'Our professional fees', price: '$620' },
      { item: 'Collection and care', price: '$260' },
      { item: 'Simple coffin', price: '$290' },
      { item: 'Crematorium fee', price: '$480' },
    ],
    after: 'Ashes returned in a plain urn within two weeks.',
  },
  {
    name: 'Attended funeral',
    price: '$3,950',
    what: 'A service at Ashcombe Crematorium chapel or in a church, followed by the cremation. Religious, non-religious or somewhere in between.',
    lines: [
      { item: 'Our professional fees', price: '$1,450' },
      { item: 'Collection and care', price: '$260' },
      { item: 'Visits to the chapel of rest', price: '$150' },
      { item: 'Oak-veneer coffin', price: '$780' },
      { item: 'Hearse and four bearers', price: '$520' },
      { item: 'Crematorium fee and chapel', price: '$790' },
    ],
    after: 'Most families choose this. Limousines are $240 each.',
  },
  {
    name: 'Burial',
    price: '$4,600',
    what: 'A service in church or at the graveside, then burial at Ashcombe Cemetery, a churchyard or a woodland ground nearby.',
    lines: [
      { item: 'Our professional fees', price: '$1,450' },
      { item: 'Collection and care', price: '$260' },
      { item: 'Visits to the chapel of rest', price: '$150' },
      { item: 'Solid oak coffin', price: '$1,240' },
      { item: 'Hearse and four bearers', price: '$520' },
      { item: 'Grave digging', price: '$980' },
    ],
    after: 'Plus the plot: from $1,450 at Ashcombe Cemetery.',
  },
];

const THIRD_PARTY = [
  ['Officiant or celebrant', '$220-$300'],
  ['Newspaper notice', 'about $120'],
  ['Printed order of service, 100 copies', '$165'],
  ['Flowers on the coffin', 'from $95'],
];

type Ask = { title: string; text: string };

const ASKS: Ask[] = [
  { title: 'The person', text: 'Their full name, the name they went by, their date and place of birth, and their last address.' },
  { title: 'Their wishes', text: 'Anything they wrote down or said: a will, a plan with us, a favourite hymn, a place they loved.' },
  { title: 'Burial or cremation', text: 'And if cremation, what you would like done with the ashes, now or later. There is no need to decide that week.' },
  { title: 'The day and the place', text: 'Church, crematorium chapel, graveside, a village hall or the garden at home. We will check the dates that are free.' },
  { title: 'Who will lead it', text: 'A minister or priest, a celebrant, a friend, or one of the family. We can suggest people we know and trust.' },
  { title: 'Music', text: 'Coming in, a moment of reflection, going out. Recorded, sung, or played on the organ at St Anne\'s.' },
  { title: 'Words', text: 'A eulogy, a poem, a reading. We can help to write it, and to read it if on the day you cannot.' },
  { title: 'Flowers, or not', text: 'Family flowers only, flowers from everyone, or donations to a charity instead. We collect donations for you.' },
  { title: 'Afterwards', text: 'Somewhere to gather: the pub, the church hall, the house. We can book the room and the tea.' },
];

type Plan = { name: string; price: string; covers: string; seed: string };

const PLANS: Plan[] = [
  { name: 'The simple plan', price: '$1,850', covers: 'A direct cremation, everything in our price list, with the ashes returned to whoever you name.', seed: 'as-plan-simple' },
  { name: 'The arranged plan', price: '$4,300', covers: 'An attended funeral or a burial service, planned with you now: the music, the words, the place.', seed: 'as-plan-arranged' },
];

const PAY = [
  ['All at once', 'No extra charge'],
  ['Over 12 months', 'No extra charge'],
  ['Over 60 months', '$150 in all, added once'],
];

const PLAN_TERMS = [
  'Our part of the price is fixed on the day you buy it, however long you live.',
  'Every dollar is held by the Ashcombe Funeral Trust, not by us, and audited each year.',
  'Change your mind within 30 days for a full refund; after that, a refund less $250.',
  'If you move away, the plan moves with you to any funeral director you choose.',
];

type Support = { title: string; when: string; text: string };

const SUPPORT: Support[] = [
  { title: 'The bereavement group', when: 'First Tuesday of the month, 7pm', text: 'In St Anne\'s church hall, with tea and no agenda. Anyone who has lost someone is welcome, whoever looked after the funeral.' },
  { title: 'Walk and talk', when: 'Saturdays, 10am', text: 'An hour round the water meadows from the lychgate, at the pace of the slowest walker. Dogs welcome.' },
  { title: 'Someone to talk to', when: 'By appointment', text: 'Six sessions with Clare Penhaligon, a trained bereavement counsellor, free to any family we have cared for.' },
  { title: 'The paperwork', when: 'Whenever you need it', text: 'Help with the register office, with telling the bank, the pension and the council, and a list of who else to write to.' },
];

const HISTORY = [
  ['1962', 'Walter Alder, a carpenter, and Edith Stone, a nurse, open at 2 Church Walk.'],
  ['1978', 'Their children take over; the old stable becomes the chapel of rest.'],
  ['2004', 'The first woodland burials at Hollins Wood, which we helped to found.'],
  ['2019', 'Ruth Alder and Tom Stone, the third generation, run it together.'],
];

const PEOPLE = [
  ['Ruth Alder', 'Funeral director'],
  ['Tom Stone', 'Funeral director'],
  ['Margaret Stone', 'Retired, still answers the night phone on Sundays'],
  ['Idris Bell', 'Arranger and celebrant'],
  ['Clare Penhaligon', 'Bereavement counsellor'],
];

const HOURS = [
  ['The telephone', 'Day and night, every day of the year'],
  ['The office', 'Monday to Friday 9-5, Saturday 9-12'],
  ['The chapel of rest', 'Visits by appointment, until 8pm'],
];

export default function AlderAndStoneFuneralPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--stone': '#eeeae3',
        '--charcoal': '#2a2a2b',
        '--sage': '#8a9a86',
        '--plum': '#6b4a5a',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="stone,charcoal,sage,plum"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300..600;1,300..500&family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Alder &amp; Stone</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Funeral Care, Ashcombe</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className={s.barPhone} href="tel:+15550126040">
          <span data-edit="bar.barPhoneLabel" data-edit-max="60" className={s.barPhoneLabel}>Day and night</span>
          <span data-edit="bar.barPhoneNo" data-edit-max="60" className={s.barPhoneNo}>(555) 012-6040</span>
        </a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO */}
        <section className={s.hero} aria-labelledby="as-title">
          <div data-edit-pattern="as.field" data-edit-roles="transparent,2,2,3,2,2" className={s.veil} aria-hidden="true">
            <TabbiedPattern pattern={tulle} palette={VEIL} fit="grid" cellSize={40} seed="as-veil-hero" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={`${s.spread} ${s.heroSpread}`}>
            <div className={s.leftPage}>
              <p data-edit="as.label" data-edit-max="240" data-edit-multiline className={s.label}>Independent funeral directors</p>
              <h1 data-edit="as.title" data-edit-max="70" id="as-title" className={s.title}>We are here, day and night</h1>
              <p data-edit="as.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                If someone has died, at home or anywhere else, ring us at any
                hour. One of the family will answer, and we will come.
              </p>
              <a data-edit="as.bigPhone" data-edit-max="28" className={s.bigPhone} href="tel:+15550126040">(555) 012-6040</a>
              <p data-edit="as.phoneNote" data-edit-max="240" data-edit-multiline className={s.phoneNote}>Answered by a person, twenty-four hours a day</p>
              <div className={s.actions}>
                <a data-edit="as.btn" data-edit-max="28" className={s.btn} href="#when">What to do first</a>
                <a data-edit="as.btnQuiet" data-edit-max="28" className={s.btnQuiet} href="#prices">Our prices, in full</a>
              </div>
              <p data-edit="as.folio" data-edit-max="240" data-edit-multiline className={s.folio}>i</p>
            </div>
            <div className={`${s.rightPage} ${s.cover}`}>
              <div className={s.coverFrame}>
                <div data-edit-pattern="as.field2" data-edit-roles="transparent,2,2,3,2,2" className={s.coverVeil} aria-hidden="true">
                  <TabbiedPattern pattern={tulle} palette={VEIL} fit="grid" cellSize={32} seed="as-veil-cover" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <p data-edit="as.coverTop" data-edit-max="240" data-edit-multiline className={s.coverTop}>Alder &amp; Stone</p>
                <Artwork
                  slug="alder-and-stone-funeral-lily"
                  alt="A pressed sprig of lily of the valley with two leaves"
                  inks={['var(--flower)']}
                  className={s.coverLily}
                />
                <p data-edit="as.coverTitle" data-edit-max="240" data-edit-multiline className={s.coverTitle}>Funeral Care</p>
                <p data-edit="as.coverSub" data-edit-max="240" data-edit-multiline className={s.coverSub}>2 Church Walk, Ashcombe</p>
                <p data-edit="as.coverSub2" data-edit-max="240" data-edit-multiline className={s.coverSub}>Family run since 1962</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ WHEN */}
        <section id="when" className={s.sec} aria-labelledby="when-h">
          <div className={s.divider} aria-hidden="true">
            <span className={s.sprig}>
              <Artwork slug="alder-and-stone-funeral-forgetmenot" alt="" inks={['var(--flower-plum)']} className={s.sprigArt} />
            </span>
          </div>
          <div className={s.secHead}>
            <p data-edit="when.label" data-edit-max="240" data-edit-multiline className={s.label}>The first hours</p>
            <h2 data-edit="when.h2" data-edit-max="60" id="when-h" className={s.h2}>When someone dies</h2>
            <p data-edit="when.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most people have never had to do this before. Here is what
              happens, in order, and what depends on where they were.
            </p>
          </div>
          <div className={s.spread}>
            <div className={s.leftPage}>
              <h3 data-edit="when.pageTitle" data-edit-max="40" className={s.pageTitle}>What to do, in order</h3>
              <ol className={s.steps}>
                {FIRST_STEPS.map(([title, text], i) => (
                  <li key={title}>
                    <span data-edit={`when.stepNo.${i}`} data-edit-max="60" className={s.stepNo}>{['One', 'Two', 'Three', 'Four'][i]}</span>
                    <h4 data-edit={`when.stepTitle.${i}`} data-edit-max="36" className={s.stepTitle}>{title}</h4>
                    <p data-edit={`when.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
                  </li>
                ))}
              </ol>
              <p data-edit="when.folio" data-edit-max="240" data-edit-multiline className={s.folio}>2</p>
            </div>
            <div className={s.rightPage}>
              <h3 data-edit="when.pageTitle2" data-edit-max="40" className={s.pageTitle}>Where they were</h3>
              <dl className={s.places}>
                {PLACES.map(([place, text], i) => (
                  <div key={place}>
                    <dt data-edit={`when.term.${i}`} data-edit-max="28">{place}</dt>
                    <dd data-edit={`when.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="when.folio2" data-edit-max="240" data-edit-multiline className={s.folio}>3</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- PRICES */}
        <section id="prices" className={`${s.sec} ${s.pricesSec}`} aria-labelledby="prices-h">
          <div className={s.divider} aria-hidden="true">
            <span className={s.sprig}>
              <Artwork slug="alder-and-stone-funeral-olive" alt="" inks={['var(--flower)']} className={s.sprigArt} />
            </span>
          </div>
          <div className={s.secHead}>
            <p data-edit="prices.label" data-edit-max="240" data-edit-multiline className={s.label}>Every price, shown in full</p>
            <h2 data-edit="prices.h2" data-edit-max="60" id="prices-h" className={s.h2}>Our services and prices</h2>
            <p data-edit="prices.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Three kinds of funeral, each with everything itemised. The
              total is what you pay us; the fees of others that we pay for you
              are in it, at cost, with the receipt.
            </p>
          </div>
          <div className={s.priceTable}>
            <div data-edit-pattern="prices.field" data-edit-roles="transparent,2,3,2,2,3" className={s.linen} aria-hidden="true">
              <TabbiedPattern pattern={batiste} palette={LINEN} fit="grid" cellSize={36} seed="as-linen" style={{ position: 'absolute', inset: 0 }} />
            </div>
            <ul className={s.services}>
              {SERVICES.map((sv, i) => (
                <li key={sv.name} className={s.service}>
                  <h3 data-edit={`prices.serviceName.${i}`} data-edit-max="40" className={s.serviceName}>{sv.name}</h3>
                  <p data-edit={`prices.servicePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.servicePrice}>{sv.price}</p>
                  <p data-edit={`prices.serviceWhat.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceWhat}>{sv.what}</p>
                  <dl className={s.lines}>
                    {sv.lines.map((ln, i2) => (
                      <div key={ln.item}>
                        <dt data-edit={`prices.term.${i}.${i2}`} data-edit-max="28">{ln.item}</dt>
                        <dd data-edit={`prices.body.${i}.${i2}`} data-edit-max="200" data-edit-multiline>{ln.price}</dd>
                      </div>
                    ))}
                    <div className={s.total}>
                      <dt data-edit={`prices.term2.${i}`} data-edit-max="28">In all</dt>
                      <dd data-edit={`prices.body2.${i}`} data-edit-max="200" data-edit-multiline>{sv.price}</dd>
                    </div>
                  </dl>
                  <p data-edit={`prices.serviceAfter.${i}`} data-edit-max="240" data-edit-multiline className={s.serviceAfter}>{sv.after}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.thirdParty}>
            <h3 data-edit="prices.smallHead" data-edit-max="40" className={s.smallHead}>Other costs you may choose</h3>
            <dl className={s.thirdList}>
              {THIRD_PARTY.map(([what, price], i) => (
                <div key={what}>
                  <dt data-edit={`prices.term3.${i}`} data-edit-max="28">{what}</dt>
                  <dd data-edit={`prices.body3.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                </div>
              ))}
            </dl>
            <p data-edit="prices.smallNote" data-edit-max="240" data-edit-multiline className={s.smallNote}>
              We never charge for a first meeting, at our office or at your
              home, and we will put every price in writing before you decide.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------- ARRANGING */}
        <section id="arranging" className={s.sec} aria-labelledby="arr-h">
          <div className={s.divider} aria-hidden="true">
            <span className={s.sprig}>
              <Artwork slug="alder-and-stone-funeral-lily" alt="" inks={['var(--flower-plum)']} className={s.sprigArt} />
            </span>
          </div>
          <div className={s.secHead}>
            <p data-edit="arranging.label" data-edit-max="240" data-edit-multiline className={s.label}>The arranging meeting</p>
            <h2 data-edit="arranging.h2" data-edit-max="60" id="arr-h" className={s.h2}>What we will ask you</h2>
            <p data-edit="arranging.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              About an hour, at our office or at home, a day or two after the
              death. These are the questions, in the order we ask them. You
              do not need an answer to all of them on the day.
            </p>
          </div>
          <div className={`${s.spread} ${s.orderSpread}`}>
            <div className={s.leftPage}>
              <p data-edit="arranging.orderHead" data-edit-max="240" data-edit-multiline className={s.orderHead}>Order of arrangements</p>
              <ol className={s.order}>
                {ASKS.slice(0, 5).map((a, i) => (
                  <li key={a.title}>
                    <h3 data-edit={`arranging.orderTitle.${i}`} data-edit-max="40" className={s.orderTitle}>{a.title}</h3>
                    <p data-edit={`arranging.orderText.${i}`} data-edit-max="240" data-edit-multiline className={s.orderText}>{a.text}</p>
                  </li>
                ))}
              </ol>
              <p data-edit="arranging.folio" data-edit-max="240" data-edit-multiline className={s.folio}>6</p>
            </div>
            <div className={s.rightPage}>
              <ol className={s.order} start={6}>
                {ASKS.slice(5).map((a, i) => (
                  <li key={a.title}>
                    <h3 data-edit={`arranging.orderTitle2.${i}`} data-edit-max="40" className={s.orderTitle}>{a.title}</h3>
                    <p data-edit={`arranging.orderText2.${i}`} data-edit-max="240" data-edit-multiline className={s.orderText}>{a.text}</p>
                  </li>
                ))}
              </ol>
              <p data-edit="arranging.orderEnd" data-edit-max="240" data-edit-multiline className={s.orderEnd}>And anything else that matters to you.</p>
              <p data-edit="arranging.folio2" data-edit-max="240" data-edit-multiline className={s.folio}>7</p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- PLANS */}
        <section id="plans" className={s.sec} aria-labelledby="plans-h">
          <div className={s.divider} aria-hidden="true">
            <span className={s.sprig}>
              <Artwork slug="alder-and-stone-funeral-forgetmenot" alt="" inks={['var(--flower)']} className={s.sprigArt} />
            </span>
          </div>
          <div className={s.secHead}>
            <p data-edit="plans.label" data-edit-max="240" data-edit-multiline className={s.label}>Planning ahead</p>
            <h2 data-edit="plans.h2" data-edit-max="60" id="plans-h" className={s.h2}>Pre-paid funeral plans</h2>
            <p data-edit="plans.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Some people want to spare their family the decisions, or the
              cost, or both. A plan with us fixes our price today and records
              your wishes.
            </p>
          </div>
          <div className={s.spread}>
            <div className={s.leftPage}>
              <h3 data-edit="plans.pageTitle" data-edit-max="40" className={s.pageTitle}>How a plan works</h3>
              <ul className={s.planTerms}>
                {PLAN_TERMS.map((term, i) => (
                  <li data-edit={`plans.item.${i}`} data-edit-max="80" key={term}>{term}</li>
                ))}
              </ul>
              <h3 data-edit="plans.pageTitle2" data-edit-max="40" className={s.pageTitle}>Paying for it</h3>
              <dl className={s.pay}>
                {PAY.map(([how, cost], i) => (
                  <div key={how}>
                    <dt data-edit={`plans.term.${i}`} data-edit-max="28">{how}</dt>
                    <dd data-edit={`plans.body.${i}`} data-edit-max="200" data-edit-multiline>{cost}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="plans.folio" data-edit-max="240" data-edit-multiline className={s.folio}>8</p>
            </div>
            <div className={s.rightPage}>
              <ul className={s.plans}>
                {PLANS.map((p, i) => (
                  <li key={p.name} className={s.plan}>
                    <div data-edit-pattern={`plans.field.${i}`} data-edit-roles="transparent,3,2,3,1,2" className={s.planField} aria-hidden="true">
                      <TabbiedPattern pattern={pindot} palette={PIN} fit="grid" cellSize={80} seed={p.seed} style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    <div className={s.planBody}>
                      <h3 data-edit={`plans.planName.${i}`} data-edit-max="40" className={s.planName}>{p.name}</h3>
                      <p data-edit={`plans.planPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.planPrice}>{p.price}</p>
                      <p data-edit={`plans.planCovers.${i}`} data-edit-max="240" data-edit-multiline className={s.planCovers}>{p.covers}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p data-edit="plans.planAsk" data-edit-max="240" data-edit-multiline className={s.planAsk}>
                Ruth or Tom will sit with you for as long as it takes, at no
                charge, and send the plan in writing to read at home before you
                sign anything.
              </p>
              <p data-edit="plans.folio2" data-edit-max="240" data-edit-multiline className={s.folio}>9</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- SUPPORT */}
        <section id="support" className={`${s.sec} ${s.supportSec}`} aria-labelledby="support-h">
          <div data-edit-pattern="support.field" data-edit-roles="0,2,3,2,0,3" className={s.net} aria-hidden="true">
            <TabbiedPattern pattern={maline} palette={NET} fit="grid" cellSize={64} seed="as-net" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.supportPage}>
            <div className={s.divider} aria-hidden="true">
              <span className={s.sprig}>
                <Artwork slug="alder-and-stone-funeral-olive" alt="" inks={['var(--flower-plum)']} className={s.sprigArt} />
              </span>
            </div>
            <div className={s.secHead}>
              <p data-edit="support.label" data-edit-max="240" data-edit-multiline className={s.label}>After the funeral</p>
              <h2 data-edit="support.h2" data-edit-max="60" id="support-h" className={s.h2}>Support after a death</h2>
              <p data-edit="support.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Grief does not keep to the week of the funeral. None of this
                costs anything, and you are welcome whoever arranged it.
              </p>
            </div>
            <ul className={s.support}>
              {SUPPORT.map((item, i) => (
                <li key={item.title}>
                  <h3 data-edit={`support.supportTitle.${i}`} data-edit-max="40" className={s.supportTitle}>{item.title}</h3>
                  <p data-edit={`support.supportWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.supportWhen}>{item.when}</p>
                  <p data-edit={`support.supportText.${i}`} data-edit-max="240" data-edit-multiline className={s.supportText}>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- ABOUT */}
        <section id="about" className={s.sec} aria-labelledby="about-h">
          <div data-edit-pattern="about.field" data-edit-roles="transparent,3,2,1,3,2" className={s.dust} aria-hidden="true">
            <TabbiedPattern pattern={dustfall} palette={DUST} fit="grid" cellSize={72} seed="as-dust" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.secHead}>
            <p data-edit="about.label" data-edit-max="240" data-edit-multiline className={s.label}>Since 1962</p>
            <h2 data-edit="about.h2" data-edit-max="60" id="about-h" className={s.h2}>About us</h2>
          </div>
          <div className={s.spread}>
            <div className={s.leftPage}>
              <p data-edit="about.aboutLede" data-edit-max="240" data-edit-multiline className={s.aboutLede}>
                We are the last independent funeral director in Ashcombe, and
                still the two families whose names are over the door.
              </p>
              <p data-edit="about.aboutText" data-edit-max="240" data-edit-multiline className={s.aboutText}>
                Walter Alder made the coffins and Edith Stone looked after the
                people in them, and between them they believed a funeral
                should be done properly, kindly and for a fair price. Sixty
                years on, we try to keep to that.
              </p>
              <ol className={s.history}>
                {HISTORY.map(([year, text], i) => (
                  <li key={year}>
                    <span data-edit={`about.year.${i}`} data-edit-max="60" className={s.year}>{year}</span>
                    <span data-edit={`about.yearText.${i}`} data-edit-max="60" className={s.yearText}>{text}</span>
                  </li>
                ))}
              </ol>
              <p data-edit="about.folio" data-edit-max="240" data-edit-multiline className={s.folio}>12</p>
            </div>
            <div className={s.rightPage}>
              <h3 data-edit="about.pageTitle" data-edit-max="40" className={s.pageTitle}>The people you will meet</h3>
              <dl className={s.people}>
                {PEOPLE.map(([name, role], i) => (
                  <div key={name}>
                    <dt data-edit={`about.term.${i}`} data-edit-max="28">{name}</dt>
                    <dd data-edit={`about.body.${i}`} data-edit-max="200" data-edit-multiline>{role}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="about.memberNote" data-edit-max="240" data-edit-multiline className={s.memberNote}>
                Members of the Guild of Independent Funeral Directors. Our full
                price list and terms are on the wall of the office, and here.
              </p>
              <p data-edit="about.folio2" data-edit-max="240" data-edit-multiline className={s.folio}>13</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.divider} aria-hidden="true">
            <span className={s.sprig}>
              <Artwork slug="alder-and-stone-funeral-lily" alt="" inks={['var(--flower)']} className={s.sprigArt} />
            </span>
          </div>
          <div className={s.secHead}>
            <p data-edit="contact.label" data-edit-max="240" data-edit-multiline className={s.label}>Contact</p>
            <h2 data-edit="contact.h2" data-edit-max="60" id="contact-h" className={s.h2}>Talk to us</h2>
          </div>
          <div className={`${s.spread} ${s.contactSpread}`}>
            <div className={s.leftPage}>
              <p data-edit="contact.contactLabel" data-edit-max="240" data-edit-multiline className={s.contactLabel}>If someone has died</p>
              <a data-edit="contact.bigPhone" data-edit-max="28" className={s.bigPhone} href="tel:+15550126040">(555) 012-6040</a>
              <p data-edit="contact.phoneNote" data-edit-max="240" data-edit-multiline className={s.phoneNote}>Day and night, every day of the year</p>
              <address className={s.address}>
                <span data-edit="contact.text" data-edit-max="60">Alder &amp; Stone Funeral Care</span>
                <span data-edit="contact.text2" data-edit-max="60">2 Church Walk, Ashcombe AC2 7LN</span>
                <a data-edit="contact.link" data-edit-max="28" href="mailto:office@alderandstone.example">office@alderandstone.example</a>
              </address>
              <dl className={s.hours}>
                {HOURS.map(([what, when], i) => (
                  <div key={what}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{what}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{when}</dd>
                  </div>
                ))}
              </dl>
              <p data-edit="contact.smallNote" data-edit-max="240" data-edit-multiline className={s.smallNote}>Parking in the churchyard lane; step-free through the garden gate.</p>
              <p data-edit="contact.folio" data-edit-max="240" data-edit-multiline className={s.folio}>14</p>
            </div>
            <div className={s.rightPage}>
              <form className={s.form} action="#">
                <h3 data-edit="contact.pageTitle" data-edit-max="40" className={s.pageTitle}>Or write to us</h3>
                <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>For a question, a plan, or a first meeting. We reply the same working day.</p>
                <div className={s.field}>
                  <label data-edit="contact.label2" htmlFor="as-name">Your name</label>
                  <input id="as-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label3" htmlFor="as-contact">Telephone or email</label>
                  <input id="as-contact" name="contact" type="text" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label4" htmlFor="as-about">It is about</label>
                  <select id="as-about" name="about" defaultValue="question">
                    <option value="question">A question</option>
                    <option value="arrange">Arranging a funeral</option>
                    <option value="plan">A pre-paid plan</option>
                    <option value="support">Support after a death</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="contact.label5" htmlFor="as-message">Your message</label>
                  <textarea id="as-message" name="message" rows={4} />
                </div>
                <button data-edit="contact.btn" data-edit-max="24" className={s.btn} type="submit">Send</button>
              </form>
              <p data-edit="contact.folio2" data-edit-max="240" data-edit-multiline className={s.folio}>15</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,2,2,3,2,2" className={s.footVeil} aria-hidden="true">
          <TabbiedPattern pattern={tulle} palette={VEIL} fit="grid" cellSize={32} seed="as-veil-foot" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Alder &amp; Stone</p>
          <p data-edit="footer.footLine" data-edit-max="240" data-edit-multiline className={s.footLine}>Funeral Care, 2 Church Walk, Ashcombe. Family run since 1962.</p>
          <p className={s.footPhone}>
            <a data-edit="footer.link" data-edit-max="28" href="tel:+15550126040">(555) 012-6040</a>
          </p>
          <p data-edit="footer.footLine2" data-edit-max="240" data-edit-multiline className={s.footLine}>Answered day and night</p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional funeral director; the names, prices and places are invented.</p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link2" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>The pressed flowers are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
