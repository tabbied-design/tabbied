import { TabbiedPattern } from 'tabbied/react';
import { prisma } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './bezel-bloom-jewelry.module.css';

export const metadata = {
  title: 'Bezel & Bloom: Custom rings and jewelry, made by hand',
  description:
    'Bezel & Bloom makes engagement rings, wedding bands and remodelled heirlooms by hand. Build a ring by stone, metal and setting, see how a commission runs from first sitting to collection, and how to care for it after.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The facets
   are the studio's mark: triangles of jewel color on velvet. They fill a cut
   stone in the hero, run as a band under the ring builder, sit at the center
   of the commission halo and line the foot of the page. */
const VELVET = '#1b1422';
const PEARL = '#f4ede4';
const GOLD = '#d6b26e';
const RUBY = '#c8375c';
const SAPPHIRE = '#4a73d6';
const EMERALD = '#2e9e78';

const STONE = ['transparent', SAPPHIRE, PEARL, EMERALD, GOLD, RUBY];
const BAND = ['transparent', GOLD, SAPPHIRE, RUBY, EMERALD, PEARL];
const HALO = ['transparent', EMERALD, SAPPHIRE, GOLD, RUBY, PEARL];
const FOOT = ['transparent', RUBY, GOLD, SAPPHIRE, EMERALD, GOLD];

const NAV = [
  ['Ring builder', '#builder'],
  ['Commissions', '#process'],
  ['Care and resizing', '#care'],
  ['The studio', '#contact'],
];

const SPEC = [
  ['Stone', 'Blue sapphire, 1.1 carats, oval'],
  ['Setting', 'Bezel, open back'],
  ['Metal', '18k recycled yellow gold'],
  ['Made in', 'Seven weeks'],
];

/* The builder: each option is [class, name, note, price]. */
const STONES = [
  ['diamond', 'Lab-grown diamond', 'Hardness 10. All the fire of a mined stone, at a third of the price.', 'from $1,400 a carat'],
  ['sapphire', 'Blue sapphire', 'Hardness 9. Cornflower to midnight, and tough enough for every day.', 'from $900'],
  ['emerald', 'Emerald', 'Hardness 7.5. A green garden inside. Wants a protective setting.', 'from $1,200'],
  ['ruby', 'Ruby', 'Hardness 9. The red of a pomegranate seed, and very hard wearing.', 'from $1,100'],
  ['spinel', 'Pink spinel', 'Hardness 8. Bright, rare, and still kindly priced.', 'from $650'],
  ['heirloom', 'Your own stone', 'From a family ring, checked under the loupe and reset.', 'no stone cost'],
];

const METALS = [
  ['yellow', '18k yellow gold', 'Warm and classic. Recycled, like all our metal.', 'band from $950'],
  ['rose', '18k rose gold', 'A little copper in the alloy gives the blush.', 'band from $950'],
  ['platinum', 'Platinum', 'Heavy, white, and never needs replating.', 'band from $1,300'],
  ['white', '14k white gold', 'Bright and lighter on the hand and the budget.', 'band from $780'],
];

const SETTINGS = [
  ['setBezel', 'Bezel', 'A collar of metal round the stone. Smooth, secure, catches on nothing.', '+ $250'],
  ['setProng', 'Six prongs', 'The most light into the stone, and the classic solitaire.', '+ $180'],
  ['setHalo', 'Halo', 'A ring of small stones that makes the center look larger.', '+ $650'],
  ['setTrio', 'Three stones', 'Past, present and future, or three birthstones.', '+ $480'],
  ['setEastwest', 'East-west', 'An oval or a marquise set sideways. Quietly unusual.', '+ $220'],
];

const FINISHES = ['High polish', 'Brushed satin', 'Hammered'];

const PROCESS = [
  ['Week 0', 'A sitting', 'Forty-five minutes at the bench, free. We talk, you try on samples, and I sketch while you watch.'],
  ['Week 1', 'Design and price', 'A drawing and a 3D render, a fixed price in writing, and as many small changes as you like.'],
  ['Week 2', 'Deposit and stone', 'Half the price to begin. I bring three stones to choose from, each seen under the loupe.'],
  ['Weeks 3 to 6', 'At the bench', 'Cast in recycled metal, then filed, set and polished by hand, with photographs as it goes.'],
  ['Week 7', 'Fitting', 'You try it on before the final polish, so the size is right and the stone sits where you want it.'],
  ['Week 8', 'Collection', 'In a cloth pouch, with a valuation for your insurer and a card on how to look after it.'],
];

const CARE = [
  'Take it off for the gym, the garden and the pool',
  'Soak it in warm water with a drop of dish soap, then use a soft toothbrush',
  'Keep each piece in its own pouch, so stones cannot scratch metal',
  'Bring it in once a year for a free clean, polish and prong check, for life',
];

const RESIZE = [
  ['Plain band', 'Up to two sizes up or down', '$60'],
  ['Solitaire or bezel', 'One size up or down', '$85'],
  ['Halo or three stones', 'Half a size, sometimes one', '$120'],
  ['Eternity band', 'Cannot be resized, so it is remade', 'Quoted'],
];

const HOURS = [
  ['Tuesday to Friday', '11:00 to 6:00, by appointment'],
  ['Saturday', '10:00 to 4:00, walk in'],
  ['Sunday and Monday', 'At the bench, closed'],
];

export default function BezelBloomPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--velvet': '#1b1422',
        '--pearl': '#f4ede4',
        '--gold': '#d6b26e',
        '--ruby': '#c8375c',
        '--sapphire': '#4a73d6',
        '--emerald': '#2e9e78',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="velvet,pearl,gold,ruby,sapphire,emerald"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Bezel &amp; Bloom</span>
          <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Rings made by hand</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#contact">Book a sitting</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* -------------------------------------------------------------- HERO
            A cut stone in profile, filled with facets, and its spec card. */}
        <section id="intro" className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="intro.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Custom jewelry studio, Larkspur Yard</p>
            <h1 data-edit="intro.title" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              A ring made <em>for one hand</em> only.
            </h1>
            <p data-edit="intro.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I am Noor Halvorsen. I design and make engagement rings, wedding
              bands and new lives for old family stones, at one bench, in
              recycled gold and platinum. You choose the stone, the metal and
              the setting; I make it fit the way you live.
            </p>
            <div className={s.heroActions}>
              <a data-edit="intro.button" data-edit-max="28" className={s.button} href="#builder">Build your ring</a>
              <a data-edit="intro.ghost" data-edit-max="28" className={s.ghost} href="#process">How a commission works</a>
            </div>
          </div>

          <div className={s.heroArt}>
            <div data-edit-pattern="intro.field" data-edit-roles="transparent,4,1,5,2,3" className={s.gem} aria-hidden="true">
              <TabbiedPattern
                pattern={prisma}
                palette={STONE}
                fit="grid"
                cellSize={46}
                seed="bezel-gem"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.spec}>
              <p data-edit="intro.specHead" data-edit-max="240" data-edit-multiline className={s.specHead}>On the bench this week</p>
              <dl className={s.specRows}>
                {SPEC.map(([k, v], i) => (
                  <div key={k}>
                    <dt data-edit={`intro.term.${i}`} data-edit-max="28">{k}</dt>
                    <dd data-edit={`intro.body.${i}`} data-edit-max="200" data-edit-multiline>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- BUILDER
            Stone, metal, setting, size: a ring in four choices. */}
        <section id="builder" className={s.sec} aria-labelledby="builder-h">
          <div className={s.secHead}>
            <p data-edit="builder.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The ring builder</p>
            <h2 data-edit="builder.secTitle" data-edit-max="60" id="builder-h" className={s.secTitle}>Four choices, one ring</h2>
            <p data-edit="builder.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Pick what you like the look of; nothing here is binding. Send it
              to me and I will reply with a sketch and a price within three
              days. A one carat sapphire in yellow gold with a bezel comes to
              about $2,100.
            </p>
          </div>
          <form className={s.builder} action="#">
            <fieldset className={s.step}>
              <legend className={s.stepLegend}>
                <span data-edit="builder.stepNo" data-edit-max="60" className={s.stepNo}>01</span>
                <span data-edit="builder.stepName" data-edit-max="60" className={s.stepName}>Choose a stone</span>
              </legend>
              <div className={s.options}>
                {STONES.map(([key, name, note, price], i) => (
                  <div key={key} className={s.option}>
                    <input id={`bb-stone-${key}`} type="radio" name="stone" value={key} />
                    <label htmlFor={`bb-stone-${key}`}>
                      <span className={`${s.swatch} ${s.gemSwatch} ${s[key]}`} aria-hidden="true" />
                      <span data-edit={`builder.optName.${i}`} data-edit-max="60" className={s.optName}>{name}</span>
                      <span data-edit={`builder.optNote.${i}`} data-edit-max="60" className={s.optNote}>{note}</span>
                      <span data-edit={`builder.optPrice.${i}`} data-edit-max="60" className={s.optPrice}>{price}</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className={s.step}>
              <legend className={s.stepLegend}>
                <span data-edit="builder.stepNo2" data-edit-max="60" className={s.stepNo}>02</span>
                <span data-edit="builder.stepName2" data-edit-max="60" className={s.stepName}>Choose a metal</span>
              </legend>
              <div className={s.options}>
                {METALS.map(([key, name, note, price], i) => (
                  <div key={key} className={s.option}>
                    <input id={`bb-metal-${key}`} type="radio" name="metal" value={key} />
                    <label htmlFor={`bb-metal-${key}`}>
                      <span className={`${s.swatch} ${s.metalSwatch} ${s[key]}`} aria-hidden="true" />
                      <span data-edit={`builder.optName2.${i}`} data-edit-max="60" className={s.optName}>{name}</span>
                      <span data-edit={`builder.optNote2.${i}`} data-edit-max="60" className={s.optNote}>{note}</span>
                      <span data-edit={`builder.optPrice2.${i}`} data-edit-max="60" className={s.optPrice}>{price}</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className={s.step}>
              <legend className={s.stepLegend}>
                <span data-edit="builder.stepNo3" data-edit-max="60" className={s.stepNo}>03</span>
                <span data-edit="builder.stepName3" data-edit-max="60" className={s.stepName}>Choose a setting</span>
              </legend>
              <div className={s.options}>
                {SETTINGS.map(([key, name, note, price], i) => (
                  <div key={key} className={s.option}>
                    <input id={`bb-setting-${key}`} type="radio" name="setting" value={key} />
                    <label htmlFor={`bb-setting-${key}`}>
                      <span className={`${s.swatch} ${s.setSwatch} ${s[key]}`} aria-hidden="true" />
                      <span data-edit={`builder.optName3.${i}`} data-edit-max="60" className={s.optName}>{name}</span>
                      <span data-edit={`builder.optNote3.${i}`} data-edit-max="60" className={s.optNote}>{note}</span>
                      <span data-edit={`builder.optPrice3.${i}`} data-edit-max="60" className={s.optPrice}>{price}</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className={s.step}>
              <legend className={s.stepLegend}>
                <span data-edit="builder.stepNo4" data-edit-max="60" className={s.stepNo}>04</span>
                <span data-edit="builder.stepName4" data-edit-max="60" className={s.stepName}>Size, finish and words inside</span>
              </legend>
              <div className={s.lastStep}>
                <div className={s.field}>
                  <label data-edit="builder.label" htmlFor="bb-size">Ring size, if you know it</label>
                  <input id="bb-size" name="size" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="builder.label2" htmlFor="bb-engrave">Engraving, up to 20 letters</label>
                  <input id="bb-engrave" name="engrave" type="text" maxLength={20} />
                </div>
                <div className={s.finishes}>
                  <p data-edit="builder.finishLabel" data-edit-max="240" data-edit-multiline className={s.finishLabel}>Finish</p>
                  <div className={s.finishPicks}>
                    {FINISHES.map((f, i) => (
                      <span key={f} className={s.finishPick}>
                        <input id={`bb-finish-${i}`} type="radio" name="finish" value={f} />
                        <label data-edit={`builder.label3.${i}`} htmlFor={`bb-finish-${i}`}>{f}</label>
                      </span>
                    ))}
                  </div>
                </div>
                <div className={s.field}>
                  <label data-edit="builder.label4" htmlFor="bb-mail">Your email</label>
                  <input id="bb-mail" name="email" type="email" autoComplete="email" />
                </div>
                <button data-edit="builder.submit" data-edit-max="24" className={s.submit} type="submit">Send this ring to Noor</button>
              </div>
            </fieldset>
          </form>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,4,3,5,1" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={prisma}
            palette={BAND}
            fit="grid"
            cellSize={40}
            seed="bezel-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ----------------------------------------------------------- PROCESS
            Six steps set round a stone, like a halo. */}
        <section id="process" className={s.sec} aria-labelledby="process-h">
          <div className={s.secHead}>
            <p data-edit="process.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The commission</p>
            <h2 data-edit="process.secTitle" data-edit-max="60" id="process-h" className={s.secTitle}>From a first sitting to your finger in eight weeks</h2>
            <p data-edit="process.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Half the price to begin and half at collection. If you change your
              mind before the stone is set, the deposit comes back less the cost
              of the drawings.
            </p>
          </div>
          <div className={s.halo}>
            <ol className={s.processList}>
              {PROCESS.map(([when, title, text], i) => (
                <li key={title} className={s.processStep}>
                  <p data-edit={`process.processWhen.${i}`} data-edit-max="240" data-edit-multiline className={s.processWhen}>{when}</p>
                  <h3 data-edit={`process.processTitle.${i}`} data-edit-max="40" className={s.processTitle}>{title}</h3>
                  <p data-edit={`process.processText.${i}`} data-edit-max="240" data-edit-multiline className={s.processText}>{text}</p>
                </li>
              ))}
            </ol>
            <div data-edit-pattern="process.field" data-edit-roles="transparent,5,4,2,3,1" className={s.haloStone} aria-hidden="true">
              <TabbiedPattern
                pattern={prisma}
                palette={HALO}
                fit="grid"
                cellSize={38}
                seed="bezel-halo"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- CARE */}
        <section id="care" className={s.sec} aria-labelledby="care-h">
          <div className={s.careGrid}>
            <div className={s.careCard}>
              <p data-edit="care.careKicker" data-edit-max="240" data-edit-multiline className={s.careKicker}>The care card, as it comes in the box</p>
              <h2 data-edit="care.careTitle" data-edit-max="60" id="care-h" className={s.careTitle}>Looking after it</h2>
              <ul className={s.careList}>
                {CARE.map((c, i) => (
                  <li data-edit={`care.item.${i}`} data-edit-max="80" key={c}>{c}</li>
                ))}
              </ul>
              <p data-edit="care.careSign" data-edit-max="240" data-edit-multiline className={s.careSign}>With love from the bench, N.H.</p>
            </div>
            <div className={s.resize}>
              <h3 data-edit="care.resizeTitle" data-edit-max="40" className={s.resizeTitle}>Resizing and repairs</h3>
              <p data-edit="care.resizeNote" data-edit-max="240" data-edit-multiline className={s.resizeNote}>
                Fingers change with the seasons, with babies and with the years.
                Rings made here are resized at cost for the first year.
              </p>
              <table className={s.resizeTable}>
                <caption data-edit="care.srOnly" className={s.srOnly}>How far each kind of ring can be resized, and the price</caption>
                <thead>
                  <tr>
                    <th data-edit="care.heading" scope="col">Ring</th>
                    <th data-edit="care.heading2" scope="col">How far</th>
                    <th data-edit="care.heading3" scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {RESIZE.map(([ring, far, price], i) => (
                    <tr key={ring}>
                      <th data-edit={`care.heading4.${i}`} scope="row">{ring}</th>
                      <td data-edit={`care.cell.${i}`}>{far}</td>
                      <td data-edit={`care.cell2.${i}`}>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p data-edit="care.resizeNote2" data-edit-max="240" data-edit-multiline className={s.resizeNote}>
                Worn prongs retipped from $45. Old family rings remodelled from
                $350 plus metal, the old gold weighed and credited.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.sec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <p data-edit="contact.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>The studio</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Come and sit at the bench</h2>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>Studio 4, Larkspur Yard, 19 Mercer Row</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Up the iron stairs, the door with the brass hand.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550174480">(555) 017-4480</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:noor@bezelandbloom.example">noor@bezelandbloom.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`contact.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`contact.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="contact.label" htmlFor="bb-name">Name</label>
                <input id="bb-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="bb-email2">Email</label>
                <input id="bb-email2" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="bb-for">What it is for</label>
                <input id="bb-for" name="for" type="text" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="bb-when">When you need it</label>
                <input id="bb-when" name="when" type="text" />
              </div>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="contact.label5" htmlFor="bb-note">Tell me about it</label>
                <textarea id="bb-note" name="note" rows={4} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Ask for a sitting</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>Sittings are free and last forty-five minutes.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,4,5,2" className={s.footFacets} aria-hidden="true">
          <TabbiedPattern
            pattern={prisma}
            palette={FOOT}
            fit="grid"
            cellSize={32}
            seed="bezel-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Bezel &amp; Bloom</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>Studio 4, Larkspur Yard, 19 Mercer Row.</p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>A fictional jewelry studio. The jeweler, stones, prices and address are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
