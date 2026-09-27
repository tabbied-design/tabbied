import { TabbiedPattern } from 'tabbied/react';
import { glazing, halftone, dotfade, sandfield } from 'tabbied/patterns';
import s from './salt-and-vinegar-fish-bar.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Salt & Vinegar: Fish and chips on Harbour Parade, Porthcallow',
  description:
    'Salt & Vinegar has fried fish off the Porthcallow day boats since 1961. The menu in the classifieds, this week\'s catch report, gluten-free Tuesdays, opening hours as a crossword, and letters from the queue.',
};

/* Site colors: newsprint and its ink, with the red of the masthead and the
   blue of the weather box as the paper's two spot colors. Screens keep a
   transparent ground so the newsprint shows between the dots. */
const NEWSPRINT = '#ece8dd';
const INK = '#1a1a1a';
const BLUE = '#2a5baa';
const RED = '#d23b2b';

const SCREEN = ['transparent', INK, INK, BLUE, INK, RED];
const AD_SCREEN = ['transparent', RED, INK, RED, INK, RED];
const CHART = ['transparent', BLUE, INK, BLUE, BLUE, INK];
const COUPON = ['transparent', INK, RED];
const HARBOUR = ['transparent', BLUE, INK, BLUE, NEWSPRINT, BLUE];

const NAV = [
  ['Menu', '#menu', '2'],
  ['Catch report', '#catch', '4'],
  ['Tuesdays', '#tuesdays', '6'],
  ['Hours', '#hours', '7'],
  ['Letters', '#letters', '8'],
  ['Find us', '#find', '9'],
];

const INSIDE = [
  ['The menu, in full', 'Classifieds', '#menu', '2'],
  ['Where your fish was caught', 'Catch report', '#catch', '4'],
  ['Gluten-free every Tuesday', 'Family', '#tuesdays', '6'],
  ['When are we open?', 'Puzzles', '#hours', '7'],
  ['"Worth the drive"', 'Letters', '#letters', '8'],
];

type Ad = { lead: string; body: string; price: string };
type Column = { head: string; ads: Ad[] };

const CLASSIFIEDS: Column[] = [
  {
    head: 'Fish',
    ads: [
      { lead: 'HADDOCK.', body: 'Line-caught off the Manacles, battered to order in beef dripping. Large or regular.', price: '$12.50 / $9.80' },
      { lead: 'COD.', body: 'Landed by the Girl Tamsin, thick loin cut. Large or regular.', price: '$12.90 / $10.20' },
      { lead: 'HAKE.', body: 'Cornish hake, sweeter and softer than cod. Ask for it by name.', price: '$10.50' },
      { lead: 'PLAICE.', body: 'Whole, on the bone, crisp at the frill. Allow ten minutes.', price: '$11.80' },
      { lead: 'MACKEREL.', body: 'Grilled, not fried, with a lemon half. Summer and autumn.', price: '$8.50' },
      { lead: 'SCAMPI.', body: 'Wholetail, breadcrumbed, a dozen to a portion.', price: '$9.90' },
    ],
  },
  {
    head: 'Chips',
    ads: [
      { lead: 'CHIPS.', body: 'Maris Piper from Trewithen Farm, cut at seven, fried twice.', price: '$3.20 / $4.40' },
      { lead: 'CHEESY CHIPS.', body: 'Large chips under a handful of mature cheddar.', price: '$5.10' },
      { lead: 'CHIP BUTTY.', body: 'White bap, salted butter, as many chips as will stay in.', price: '$4.50' },
      { lead: 'SCRAPS.', body: 'The crisp bits of batter from the fryer. Free on request, while they last.', price: 'Free' },
    ],
  },
  {
    head: 'Sides and sauces',
    ads: [
      { lead: 'MUSHY PEAS.', body: 'Marrowfats soaked overnight, a little mint.', price: '$2.20' },
      { lead: 'CURRY SAUCE.', body: 'The old recipe, sweet and mild.', price: '$1.90' },
      { lead: 'GRAVY.', body: 'Beef, made with the dripping.', price: '$1.90' },
      { lead: 'TARTARE.', body: 'Made here with capers and gherkins.', price: '90c' },
      { lead: 'PICKLED ONION or EGG.', body: 'From the jar on the counter.', price: '60c / 90c' },
      { lead: 'BREAD AND BUTTER.', body: 'Two slices, white or brown.', price: '80c' },
    ],
  },
  {
    head: 'Pies, puddings, drinks',
    ads: [
      { lead: 'STEAK PIE.', body: 'From Pengelly the butcher, heated through.', price: '$5.20' },
      { lead: 'PASTY.', body: 'Traditional, crimped on the side.', price: '$5.80' },
      { lead: 'SAUSAGE IN BATTER.', body: 'A pork jumbo, the children\'s favourite.', price: '$3.10' },
      { lead: 'HALLOUMI.', body: 'Battered, for the vegetarians. Fried in oil, not dripping.', price: '$6.40' },
      { lead: 'BATTERED BANANA.', body: 'With a scoop of vanilla ice cream.', price: '$3.90' },
      { lead: 'TEA.', body: 'In a mug, strong, sugar on the side.', price: '$1.60' },
    ],
  },
];

type Catch = {
  fish: string;
  boat: string;
  landed: string;
  method: string;
  rating: number;
};

const CATCH: Catch[] = [
  { fish: 'Haddock', boat: 'Girl Tamsin PZ 112', landed: 'Porthcallow, Thu', method: 'Handline', rating: 2 },
  { fish: 'Cod', boat: 'Girl Tamsin PZ 112', landed: 'Porthcallow, Thu', method: 'Handline', rating: 3 },
  { fish: 'Hake', boat: 'Morwenna FH 48', landed: 'Newlyn, Wed', method: 'Gill net', rating: 1 },
  { fish: 'Plaice', boat: 'Our Boys PZ 7', landed: 'Porthcallow, Fri', method: 'Beam trawl', rating: 3 },
  { fish: 'Mackerel', boat: 'Morwenna FH 48', landed: 'Porthcallow, Fri', method: 'Handline', rating: 1 },
];

const BOATS = [
  { name: 'Girl Tamsin', reg: 'PZ 112', skipper: 'Jory Pascoe', note: 'A 7 m handliner. Out before light, back by two; every fish is gutted on the way in.' },
  { name: 'Morwenna', reg: 'FH 48', skipper: 'Kerensa Hocking', note: 'Nets hake on the edge of the bank and handlines mackerel in the bay in autumn.' },
  { name: 'Our Boys', reg: 'PZ 7', skipper: 'The Eddy brothers', note: 'A small beam trawler working the soft ground inside the Dodman.' },
];

const KIDS = [
  ['Fish goujons and chips', '$5.50'],
  ['Sausage and chips', '$4.90'],
  ['Fishcake and chips', '$4.60'],
  ['A carton of juice and an ice lolly', 'Included'],
];

type Run = { day: string; cells: number[]; clues: { n: number; label: string; hours: string; len: number }[] };

/* Opening hours as a crossword. Columns are the hours from 11:00 to
   21:00; a white run is open, and its number is its clue. */
const HOURS_FROM = 11;
const HOURS_TO = 21;
const GRID: Run[] = [
  { day: 'Mon', cells: [], clues: [] },
  { day: 'Tue', cells: [11, 12, 13, 16, 17, 18, 19, 20], clues: [
    { n: 1, label: 'Tuesday lunch', hours: '11:30-14:00', len: 3 },
    { n: 2, label: 'Tuesday tea', hours: '16:30-20:30', len: 5 },
  ] },
  { day: 'Wed', cells: [11, 12, 13, 16, 17, 18, 19, 20], clues: [
    { n: 3, label: 'Wednesday lunch', hours: '11:30-14:00', len: 3 },
    { n: 4, label: 'Wednesday tea', hours: '16:30-20:30', len: 5 },
  ] },
  { day: 'Thu', cells: [11, 12, 13, 16, 17, 18, 19, 20], clues: [
    { n: 5, label: 'Thursday lunch', hours: '11:30-14:00', len: 3 },
    { n: 6, label: 'Thursday tea', hours: '16:30-21:00', len: 5 },
  ] },
  { day: 'Fri', cells: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], clues: [
    { n: 7, label: 'Friday, straight through', hours: '11:30-21:30', len: 11 },
  ] },
  { day: 'Sat', cells: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], clues: [
    { n: 8, label: 'Saturday, straight through', hours: '11:30-21:30', len: 11 },
  ] },
  { day: 'Sun', cells: [12, 13, 14, 15, 16, 17, 18], clues: [
    { n: 9, label: 'Sunday', hours: '12:00-19:00', len: 7 },
  ] },
];

const HOUR_COLS = Array.from({ length: HOURS_TO - HOURS_FROM + 1 }, (_, i) => HOURS_FROM + i);

/* The clue number for a cell, if a run starts there. */
const clueAt = (run: Run, hour: number) => {
  if (!run.cells.includes(hour) || run.cells.includes(hour - 1)) return null;
  const index = run.cells.filter((h) => !run.cells.includes(h - 1)).indexOf(hour);
  return run.clues[index]?.n ?? null;
};

const LETTERS = [
  { head: 'WORTH THE DRIVE', body: 'Sir, I drove forty minutes from Truro on Saturday on the strength of my brother-in-law\'s word, and for once he was right. The haddock broke into big white flakes and the batter stayed crisp to the last bite on the harbour wall.', who: 'D. Rowe, Truro', star: true },
  { head: 'PEAS, PLEASE', body: 'Sir, may I say through your columns that the mushy peas are the finest in the county, and that the staff did not laugh when I ordered a second tub for the walk home.', who: 'Mrs A. Kitto, Portloe', star: false },
  { head: 'A GLUTEN-FREE THANK YOU', body: 'Sir, my daughter is coeliac and had never eaten fish and chips from a shop. On Tuesday she had two. Thank you for the separate fryer, and for explaining it without making a fuss.', who: 'R. Nankervis, St Mawes', star: false },
  { head: 'GULL INCIDENT', body: 'Sir, I write to report that a herring gull took an entire battered sausage from my hand on Harbour Parade. I do not blame the shop. I blame the gull, who looked very pleased with himself.', who: 'Name and address supplied', star: false },
  { head: 'SIXTY YEARS OF FRIDAYS', body: 'Sir, I first queued at this counter in 1964 for a shilling\'s worth of chips. The prices have changed. Nothing else has, and I hope nothing ever does.', who: 'W. Tregear, Porthcallow', star: false },
];

const GETTING = [
  ['On foot', 'From the church, straight down Fore Street to the water. Two minutes, all downhill.'],
  ['By car', 'The harbour car park is pay-and-display until 18:00, free after. Parade parking is for loading only.'],
  ['By bus', 'The 51 from Truro stops at the harbour, hourly until 22:10.'],
];

const GULLS = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'];

export default function SaltAndVinegarPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--newsprint': '#ece8dd',
        '--ink': '#1a1a1a',
        '--blue': '#2a5baa',
        '--red': '#d23b2b',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="newsprint,ink,blue,red"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=League+Gothic&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=PT+Sans+Narrow:wght@400;700&display=swap"
      />

      <header className={s.bar}>
        <a data-edit="bar.barMark" data-edit-max="28" className={s.barMark} href="#top">Salt &amp; Vinegar</a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href, pg], i) => (
            <a key={href} href={href}>
              <span data-edit={`bar.text.${i}`} data-edit-max="60">{label}</span>
              <span className={s.navPage}>{`p${pg}`}</span>
            </a>
          ))}
        </nav>
        <p data-edit="bar.barNote" data-edit-max="240" data-edit-multiline className={s.barNote}>Open today 11:30-21:30</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------ FRONT PAGE */}
        <section className={s.front} aria-labelledby="sv-name">
          <div className={s.masthead}>
            <div className={s.ear}>
              <p data-edit="svName.earHead" data-edit-max="240" data-edit-multiline className={s.earHead}>Weather</p>
              <p data-edit="svName.earBody" data-edit-max="240" data-edit-multiline className={s.earBody}>Bright, a shower at teatime. 17C.</p>
              <p data-edit="svName.earBody2" data-edit-max="240" data-edit-multiline className={s.earBody}>High water 06:12 and 18:40</p>
              <p data-edit="svName.earBody3" data-edit-max="240" data-edit-multiline className={s.earBody}>Wind SW 4, sea moderate</p>
            </div>
            <h1 id="sv-name" className={s.nameplate}>
              <span data-edit="svName.nameA" data-edit-max="60" className={s.nameA}>Salt</span>
              <span data-edit="svName.nameAmp" data-edit-max="60" className={s.nameAmp}>&amp;</span>
              <span data-edit="svName.nameB" data-edit-max="60" className={s.nameB}>Vinegar</span>
            </h1>
            <div className={`${s.ear} ${s.earRight}`}>
              <p data-edit="svName.earHead2" data-edit-max="240" data-edit-multiline className={s.earHead}>Price 90c</p>
              <p data-edit="svName.earBody4" data-edit-max="240" data-edit-multiline className={s.earBody}>Free with any fish supper</p>
              <p data-edit="svName.earBody5" data-edit-max="240" data-edit-multiline className={s.earBody}>Frying since 1961</p>
            </div>
          </div>
          <p className={s.dateline}>
            <span data-edit="svName.text" data-edit-max="60">No. 23,412</span>
            <span data-edit="svName.text2" data-edit-max="60">Saturday, 27 September</span>
            <span data-edit="svName.text3" data-edit-max="60">2 Harbour Parade, Porthcallow</span>
            <span data-edit="svName.text4" data-edit-max="60">Late edition</span>
          </p>

          <p className={s.strap}>
            <span data-edit="svName.flash" data-edit-max="60" className={s.flash}>Exclusive</span>
            <span data-edit="svName.text5" data-edit-max="60">Harbour chippy reveals the secret of its batter</span>
          </p>
          <h2 data-edit="svName.headline" data-edit-max="60" className={s.headline}>Batter up</h2>
          <p data-edit="svName.deck" data-edit-max="240" data-edit-multiline className={s.deck}>
            Beer from the brewery on the quay, flour, salt and cold water, and
            nothing else, says the woman who has mixed it at six every morning
            for twenty-two years
          </p>

          <div className={s.frontGrid}>
            <article className={s.lead}>
              <p data-edit="lead.byline" data-edit-max="240" data-edit-multiline className={s.byline}>By our Food Correspondent</p>
              <p data-edit="lead.dropcap" data-edit-max="240" data-edit-multiline className={s.dropcap}>
                Porthcallow&apos;s harbour fish bar has served the town from the
                same double-fronted shop on Harbour Parade since 1961, and on a
                Friday night the queue still reaches the lifeboat station.
              </p>
              <p data-edit="lead.body" data-edit-max="240" data-edit-multiline>
                The fish comes off the day boats at the quay across the road.
                The potatoes are Maris Pipers from Trewithen Farm, chipped by
                hand at seven every morning and fried twice, once to cook and
                once to crisp.
              </p>
              <p data-edit="lead.body2" data-edit-max="240" data-edit-multiline>
                &quot;People ask what goes in the batter,&quot; says Morwenna
                Jago, who runs the shop with her son Kit. &quot;I tell them.
                They never believe me. It is the dripping, and it is the fish
                being yesterday&apos;s, not last week&apos;s.&quot;
              </p>
              <p className={s.jump}>
                <a data-edit="lead.catch" data-edit-max="28" href="#catch">Continued on page 4</a>
              </p>
            </article>

            <figure className={s.photo}>
              <div className={s.photoBox}>
                <div data-edit-pattern="svName.field" data-edit-roles="transparent,1,1,2,1,3" className={s.screen} aria-hidden="true">
                  <TabbiedPattern
                    pattern={glazing}
                    palette={SCREEN}
                    options={{ frequency: 0.85 }}
                    fit="grid"
                    cellSize={30}
                    seed="salt-vinegar-screen"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <Artwork
                  slug="salt-and-vinegar-fish-bar-cone"
                  alt="A haddock supper in a paper cone: a golden battered fillet, thick chips and a small wooden fork"
                  mode="tint"
                  inks={['var(--text)', 'var(--newsprint)']}
                  className={s.cone}
                />
                <p data-edit="svName.photoTag" data-edit-max="240" data-edit-multiline className={s.photoTag}>$11.50</p>
              </div>
              <figcaption className={s.caption}>
                <span data-edit="svName.emphasis" data-edit-format="emphasis" data-edit-max="130" className={s.capText}>
                  <strong>FRESH OFF THE BOAT:</strong> a regular haddock supper
                  with salt, vinegar and a wooden fork, photographed at the
                  counter on Friday.
                </span>
                <span data-edit="svName.credit" data-edit-max="60" className={s.credit}>Photo: S. Treloar</span>
              </figcaption>
            </figure>

            <aside className={s.inside} aria-labelledby="sv-inside-h">
              <h3 data-edit="svInside.insideHead" data-edit-max="40" id="sv-inside-h" className={s.insideHead}>Inside today</h3>
              <ul className={s.insideList}>
                {INSIDE.map(([title, kind, href, pg], i) => (
                  <li key={href}>
                    <a href={href}>
                      <span data-edit={`svInside.insideKind.${i}`} data-edit-max="60" className={s.insideKind}>{kind}</span>
                      <span data-edit={`svInside.insideTitle.${i}`} data-edit-max="60" className={s.insideTitle}>{title}</span>
                      <span data-edit={`svInside.insidePage.${i}`} data-edit-max="60" className={s.insidePage}>{pg}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className={s.teaser}>
                <p data-edit="svInside.teaserKick" data-edit-max="240" data-edit-multiline className={s.teaserKick}>Shortage fears</p>
                <p data-edit="svInside.teaserHead" data-edit-max="240" data-edit-multiline className={s.teaserHead}>Kit says no, it is just the Friday rush</p>
                <p data-edit="svInside.teaserBody" data-edit-max="240" data-edit-multiline className={s.teaserBody}>Phone ahead on (555) 014-6620 and your order is wrapped when you arrive.</p>
              </div>
            </aside>
          </div>
        </section>

        {/* ----------------------------------------------------- CLASSIFIEDS */}
        <section id="menu" className={s.sec} aria-labelledby="sv-menu-h">
          <p className={s.folio}>
            <span data-edit="menu.text" data-edit-max="60">2</span>
            <span data-edit="menu.text2" data-edit-max="60">Salt &amp; Vinegar</span>
            <span data-edit="menu.text3" data-edit-max="60">Saturday, 27 September</span>
          </p>
          <div className={s.pageHead}>
            <h2 data-edit="menu.bannerHead" data-edit-max="60" id="sv-menu-h" className={s.bannerHead}>Classifieds</h2>
            <p data-edit="menu.pageDeck" data-edit-max="240" data-edit-multiline className={s.pageDeck}>The full menu. All fish fried to order in beef dripping, and in vegetable oil on Tuesdays. Prices large / regular.</p>
          </div>

          <div className={s.classifieds}>
            {CLASSIFIEDS.map((col, i) => (
              <div key={col.head} className={s.classCol}>
                <h3 data-edit={`menu.classHead.${i}`} data-edit-max="40" className={s.classHead}>{col.head}</h3>
                <ul className={s.ads}>
                  {col.ads.map((ad, i2) => (
                    <li key={ad.lead} className={s.ad}>
                      <p>
                        <strong data-edit={`menu.adLead.${i}.${i2}`} className={s.adLead}>{ad.lead}</strong>
                        <span>{` ${ad.body} `}</span>
                        <span data-edit={`menu.adPrice.${i}.${i2}`} data-edit-max="60" className={s.adPrice}>{ad.price}</span>
                      </p>
                    </li>
                  ))}
                </ul>
                {col.head === 'Chips' ? (
                  <div className={s.displayAd}>
                    <div data-edit-pattern={`menu.field.${i}`} data-edit-roles="transparent,3,1,3,1,3" className={s.adScreen} aria-hidden="true">
                      <TabbiedPattern
                        pattern={glazing}
                        palette={AD_SCREEN}
                        options={{ frequency: 0.7 }}
                        fit="grid"
                        cellSize={24}
                        seed="salt-vinegar-ad"
                        style={{ position: 'absolute', inset: 0 }}
                      />
                    </div>
                    <p data-edit={`menu.displayKick.${i}`} data-edit-max="240" data-edit-multiline className={s.displayKick}>Supper deal</p>
                    <p data-edit={`menu.displayBig.${i}`} data-edit-max="240" data-edit-multiline className={s.displayBig}>$14</p>
                    <p data-edit={`menu.displayBody.${i}`} data-edit-max="240" data-edit-multiline className={s.displayBody}>Any regular fish, regular chips, mushy peas and a mug of tea.</p>
                  </div>
                ) : null}
                {col.head === 'Sides and sauces' ? (
                  <div className={s.notice}>
                    <p data-edit={`menu.noticeHead.${i}`} data-edit-max="240" data-edit-multiline className={s.noticeHead}>Public notice</p>
                    <p data-edit={`menu.body.${i}`} data-edit-max="240" data-edit-multiline>The vinegar is malt, never spirit. The salt is sea salt from the Lizard. Both stand on the counter; help yourself, generously.</p>
                  </div>
                ) : null}
                {col.head === 'Pies, puddings, drinks' ? (
                  <div className={s.wanted}>
                    <p data-edit={`menu.wantedHead.${i}`} data-edit-max="240" data-edit-multiline className={s.wantedHead}>Situations vacant</p>
                    <p data-edit={`menu.emphasis.${i}`} data-edit-format="emphasis" data-edit-max="240" data-edit-multiline><strong>FRYER WANTED.</strong> Evenings and weekends, all year. We teach the rest. Apply within, ask for Kit.</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- CATCH REPORT */}
        <section id="catch" className={s.sec} aria-labelledby="sv-catch-h">
          <p className={s.folio}>
            <span data-edit="catch.text" data-edit-max="60">4</span>
            <span data-edit="catch.text2" data-edit-max="60">Salt &amp; Vinegar</span>
            <span data-edit="catch.text3" data-edit-max="60">Catch report</span>
          </p>
          <p data-edit="catch.continued" data-edit-max="240" data-edit-multiline className={s.continued}>Continued from page 1</p>
          <h2 data-edit="catch.secHead" data-edit-max="60" id="sv-catch-h" className={s.secHead}>Off the day boats, over the road</h2>

          <div className={s.catchGrid}>
            <div className={s.catchText}>
              <p data-edit="catch.dropcap" data-edit-max="240" data-edit-multiline className={s.dropcap}>
                Three boats land our fish, and two of them tie up at the quay
                you can see from the counter. What they catch is what we fry;
                when the weather keeps them in, the board says so and we buy
                from Newlyn market instead.
              </p>
              <p data-edit="catch.body" data-edit-max="240" data-edit-multiline>
                We rate every fish on the Porthcallow card, one for the most
                plentiful stock and five for the one to leave alone. Nothing
                above a three goes in the fryer. Cod came close to losing its
                place last winter and may yet.
              </p>
              <div className={s.tableWrap}>
                <table className={s.catchTable}>
                  <caption data-edit="catch.tableCap" className={s.tableCap}>This week&apos;s catch, and how it was caught</caption>
                  <thead>
                    <tr>
                      <th data-edit="catch.heading" scope="col">Fish</th>
                      <th data-edit="catch.heading2" scope="col">Boat</th>
                      <th data-edit="catch.heading3" scope="col">Landed</th>
                      <th data-edit="catch.heading4" scope="col">Method</th>
                      <th data-edit="catch.heading5" scope="col">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CATCH.map((c, i) => (
                      <tr key={c.fish}>
                        <th data-edit={`catch.heading6.${i}`} scope="row">{c.fish}</th>
                        <td data-edit={`catch.cell.${i}`}>{c.boat}</td>
                        <td data-edit={`catch.cell2.${i}`}>{c.landed}</td>
                        <td data-edit={`catch.cell3.${i}`}>{c.method}</td>
                        <td>
                          <span className={s.rating} aria-label={`${c.rating} of 5, lower is better`}>
                            {[1, 2, 3, 4, 5].map((d) => (
                              <span key={d} className={d <= c.rating ? s.dotOn : s.dotOff} />
                            ))}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={s.catchSide}>
              <figure className={s.chart}>
                <div data-edit-pattern="catch.field" data-edit-roles="transparent,2,1,2,2,1" className={s.chartSea} aria-hidden="true">
                  <TabbiedPattern
                    pattern={dotfade}
                    palette={CHART}
                    fit="grid"
                    cellSize={34}
                    seed="salt-vinegar-chart"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <span className={s.land} aria-hidden="true" />
                <span data-edit="catch.pin" data-edit-max="60" className={`${s.pin} ${s.pinHome}`}>Porthcallow</span>
                <span data-edit="catch.pin2" data-edit-max="60" className={`${s.pin} ${s.pinA}`}>The Manacles</span>
                <span data-edit="catch.pin3" data-edit-max="60" className={`${s.pin} ${s.pinB}`}>Gull Rock</span>
                <span data-edit="catch.pin4" data-edit-max="60" className={`${s.pin} ${s.pinC}`}>Dodman bank</span>
                <figcaption data-edit="catch.chartCap" data-edit-max="120" data-edit-multiline className={s.chartCap}>Where this week&apos;s fish was caught. Not to be used for navigation.</figcaption>
              </figure>

              <div className={s.boats}>
                <h3 data-edit="catch.boxHead" data-edit-max="40" className={s.boxHead}>The boats</h3>
                <ul>
                  {BOATS.map((b, i) => (
                    <li key={b.reg}>
                      <p className={s.boatName}>
                        <strong data-edit={`catch.emphasis.${i}`}>{b.name}</strong>
                        <span data-edit={`catch.text4.${i}`} data-edit-max="60">{b.reg}</span>
                      </p>
                      <p className={s.boatSkipper}>{`Skipper: ${b.skipper}`}</p>
                      <p data-edit={`catch.boatNote.${i}`} data-edit-max="240" data-edit-multiline className={s.boatNote}>{b.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- TUESDAYS */}
        <section id="tuesdays" className={s.sec} aria-labelledby="sv-tue-h">
          <p className={s.folio}>
            <span data-edit="tuesdays.text" data-edit-max="60">6</span>
            <span data-edit="tuesdays.text2" data-edit-max="60">Salt &amp; Vinegar</span>
            <span data-edit="tuesdays.text3" data-edit-max="60">Family</span>
          </p>
          <div className={s.tueGrid}>
            <article className={s.tueStory}>
              <p className={s.strap}>
                <span data-edit="tueStory.flashBlue" data-edit-max="60" className={s.flashBlue}>Every week</span>
                <span data-edit="tueStory.text" data-edit-max="60">New fryer, new batter, same fish</span>
              </p>
              <h2 data-edit="tueStory.tueHead" data-edit-max="60" id="sv-tue-h" className={s.tueHead}>Gluten-free Tuesdays</h2>
              <div className={s.tueCols}>
                <p data-edit="tueStory.dropcap" data-edit-max="240" data-edit-multiline className={s.dropcap}>
                  Every Tuesday the whole shop goes gluten-free. The dripping
                  range is scrubbed down on Monday, the day we are closed, and
                  on Tuesday everything is fried in fresh vegetable oil in a
                  batter of rice flour and gluten-free beer.
                </p>
                <p data-edit="tueStory.body" data-edit-max="240" data-edit-multiline>
                  There is no separate queue and no surcharge. The whole menu
                  is on, except the pies, the pasties and the bread and butter,
                  which come from bakers who use wheat.
                </p>
                <p data-edit="tueStory.body2" data-edit-max="240" data-edit-multiline>
                  The fryers are accredited by the county coeliac society, and
                  we test the oil each Tuesday. If in doubt, ask Kit; he is the
                  one who scrubbed the range.
                </p>
              </div>
            </article>

            <aside className={s.coupon} aria-labelledby="sv-kids-h">
              <div data-edit-pattern="svKids.field" data-edit-roles="transparent,1,3" className={s.couponScreen} aria-hidden="true">
                <TabbiedPattern
                  pattern={halftone}
                  palette={COUPON}
                  fit="grid"
                  cellSize={22}
                  seed="salt-vinegar-coupon"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="svKids.cutHere" data-edit-max="240" data-edit-multiline className={s.cutHere}>Cut out and keep</p>
              <h3 data-edit="svKids.couponHead" data-edit-max="40" id="sv-kids-h" className={s.couponHead}>Kids&apos; menu</h3>
              <p data-edit="svKids.couponSub" data-edit-max="240" data-edit-multiline className={s.couponSub}>For anyone 11 and under, every day we are open</p>
              <ul className={s.kids}>
                {KIDS.map(([item, price], i) => (
                  <li key={item}>
                    <span data-edit={`svKids.text.${i}`} data-edit-max="60">{item}</span>
                    <span data-edit={`svKids.kidsPrice.${i}`} data-edit-max="60" className={s.kidsPrice}>{price}</span>
                  </li>
                ))}
              </ul>
              <p data-edit="svKids.couponFoot" data-edit-max="240" data-edit-multiline className={s.couponFoot}>Hand in this coupon for a free sticker from the counter.</p>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------------ HOURS */}
        <section id="hours" className={s.sec} aria-labelledby="sv-hours-h">
          <p className={s.folio}>
            <span data-edit="hours.text" data-edit-max="60">7</span>
            <span data-edit="hours.text2" data-edit-max="60">Salt &amp; Vinegar</span>
            <span data-edit="hours.text3" data-edit-max="60">Puzzles</span>
          </p>
          <h2 data-edit="hours.secHead" data-edit-max="60" id="sv-hours-h" className={s.secHead}>The crossword: when are we open?</h2>
          <p data-edit="hours.puzzleNote" data-edit-max="240" data-edit-multiline className={s.puzzleNote}>Every white square is an hour we are frying. Black squares, we are not. Monday is all black.</p>

          <div className={s.puzzle}>
            <div className={s.gridScroll}>
              <table className={s.cross}>
                <caption data-edit="hours.srOnly" className={s.srOnly}>Opening hours by day: each column is an hour from 11:00, a white square is open</caption>
                <thead>
                  <tr>
                    <th data-edit="hours.crossCorner" scope="col" className={s.crossCorner}>Day</th>
                    {HOUR_COLS.map((h) => (
                      <th key={h} scope="col" className={s.crossHour}>{String(h)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GRID.map((run, i) => (
                    <tr key={run.day}>
                      <th data-edit={`hours.crossDay.${i}`} scope="row" className={s.crossDay}>{run.day}</th>
                      {HOUR_COLS.map((h) => {
                        const n = clueAt(run, h);
                        const open = run.cells.includes(h);
                        return (
                          <td key={h} className={open ? s.open : s.shut}>
                            {n ? <span className={s.clueNo}>{String(n)}</span> : null}
                            <span className={s.srOnly}>{open ? 'open' : 'closed'}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={s.clues}>
              <h3 data-edit="hours.boxHead" data-edit-max="40" className={s.boxHead}>Across</h3>
              <ol>
                {GRID.flatMap((run) => run.clues).map((c, i) => (
                  <li key={c.n}>
                    <span className={s.clueN}>{String(c.n)}</span>
                    <span className={s.clueText}>{`${c.label} (${c.len})`}</span>
                    <span data-edit={`hours.clueAns.${i}`} data-edit-max="60" className={s.clueAns}>{c.hours}</span>
                  </li>
                ))}
              </ol>
              <h3 data-edit="hours.boxHead2" data-edit-max="40" className={s.boxHead}>The black row</h3>
              <ol>
                <li>
                  <span data-edit="hours.clueN" data-edit-max="60" className={s.clueN}>Mon</span>
                  <span data-edit="hours.clueText" data-edit-max="60" className={s.clueText}>The day the range is scrubbed</span>
                  <span data-edit="hours.clueAns2" data-edit-max="60" className={s.clueAns}>Closed</span>
                </li>
              </ol>
              <p data-edit="hours.small" data-edit-max="240" data-edit-multiline className={s.small}>Bank holidays 12:00-19:00. Closed Christmas Day to New Year&apos;s Day.</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- LETTERS */}
        <section id="letters" className={s.sec} aria-labelledby="sv-letters-h">
          <p className={s.folio}>
            <span data-edit="letters.text" data-edit-max="60">8</span>
            <span data-edit="letters.text2" data-edit-max="60">Salt &amp; Vinegar</span>
            <span data-edit="letters.text3" data-edit-max="60">Opinion</span>
          </p>
          <div className={s.pageHead}>
            <h2 data-edit="letters.bannerHead" data-edit-max="60" id="sv-letters-h" className={s.bannerHead}>Letters to the editor</h2>
            <p data-edit="letters.pageDeck" data-edit-max="240" data-edit-multiline className={s.pageDeck}>Write to us at the shop, or to letters@saltandvinegar.example. We print the kind ones, and the ones about gulls.</p>
          </div>
          <div className={s.letters}>
            {LETTERS.map((l, i) => (
              <article key={l.head} className={l.star ? `${s.letter} ${s.star}` : s.letter}>
                {l.star ? <p data-edit={`letter.starTag.${i}`} data-edit-max="240" data-edit-multiline className={s.starTag}>Star letter</p> : null}
                <h3 data-edit={`letter.letterHead.${i}`} data-edit-max="40" className={s.letterHead}>{l.head}</h3>
                <p data-edit={`letter.letterBody.${i}`} data-edit-max="240" data-edit-multiline className={s.letterBody}>{l.body}</p>
                <p data-edit={`letter.letterWho.${i}`} data-edit-max="240" data-edit-multiline className={s.letterWho}>{l.who}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- FIND US */}
        <section id="find" className={s.sec} aria-labelledby="sv-find-h">
          <p className={s.folio}>
            <span data-edit="find.text" data-edit-max="60">9</span>
            <span data-edit="find.text2" data-edit-max="60">Salt &amp; Vinegar</span>
            <span data-edit="find.text3" data-edit-max="60">Find us</span>
          </p>
          <div className={s.findGrid}>
            <div className={s.findText}>
              <h2 data-edit="find.secHead" data-edit-max="60" id="sv-find-h" className={s.secHead}>On the Parade, facing the boats</h2>
              <p data-edit="find.address" data-edit-max="240" data-edit-multiline className={s.address}>2 Harbour Parade, Porthcallow</p>
              <dl className={s.getting}>
                {GETTING.map(([how, text], i) => (
                  <div key={how}>
                    <dt data-edit={`find.term.${i}`} data-edit-max="28">{how}</dt>
                    <dd data-edit={`find.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.phone}>
                <span data-edit="find.text4" data-edit-max="60">Phone orders</span>
                <a data-edit="find.link" data-edit-max="28" href="tel:+15550146620">(555) 014-6620</a>
              </p>
              <p className={s.phone}>
                <span data-edit="find.text5" data-edit-max="60">Letters and parties</span>
                <a data-edit="find.link2" data-edit-max="28" href="mailto:letters@saltandvinegar.example">letters@saltandvinegar.example</a>
              </p>
            </div>
            <div className={s.harbour}>
              <div data-edit-pattern="find.field" data-edit-roles="transparent,2,1,2,0,2" className={s.water} aria-hidden="true">
                <TabbiedPattern
                  pattern={sandfield}
                  palette={HARBOUR}
                  fit="grid"
                  cellSize={30}
                  seed="salt-vinegar-harbour"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.parade} aria-hidden="true" />
              <span className={s.quay} aria-hidden="true" />
              <svg className={s.arm} viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M100 20.8 L92 20.8 L92 58 Q92 63 87 63 L38 63 L38 69 L90 69 Q100 69 100 59 Z" />
              </svg>
              <span data-edit="find.boat" data-edit-max="60" className={`${s.boat} ${s.boatA}`}>Girl Tamsin</span>
              <span data-edit="find.boat2" data-edit-max="60" className={`${s.boat} ${s.boatB}`}>Morwenna</span>
              <span data-edit="find.shop" data-edit-max="60" className={s.shop}>Salt &amp; Vinegar</span>
              <span data-edit="find.harbourLabel" data-edit-max="60" className={s.harbourLabel}>Porthcallow harbour</span>
              <p data-edit="find.harbourNote" data-edit-max="240" data-edit-multiline className={s.harbourNote}>Eat on the harbour wall if you like. Mind the gulls; they have read the letters page.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        {/* The gulls on the harbour railing, waiting. */}
        <div className={s.railing}>
          {GULLS.map((g) => (
            <Artwork
              key={g}
              slug="salt-and-vinegar-fish-bar-gull"
              alt=""
              inks={['var(--text)']}
              className={`${s.gull} ${s[g]}`}
            />
          ))}
          <span className={s.rail} aria-hidden="true" />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Salt &amp; Vinegar</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional fish and chip shop. The newspaper, the boats, the letters, the prices and the hours are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The supper and the gulls are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
