import { TabbiedPattern } from 'tabbied/react';
import { twohalf, halftone, dotset, damier, bias } from 'tabbied/patterns';
import s from './four-frames-photobooth.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Four Frames: Photo booth hire, Merrytown',
  description:
    'Four Frames hires out photo booths from a garage on Arcade Row: a vintage-look cabinet, an open-air booth and a GIF booth, with unlimited strips, backdrops and a trunk of props.',
};

/* Site colors. The same hexes as the root roles in the stylesheet. The
   house backdrop (twohalf) is paper channels between colored blocks; the
   swatches and the booth cards reuse the same four roles. */
const PAPER = '#f4f0e8';
const BLACK = '#141414';
const RED = '#d0342c';
const TEAL = '#1f8c8c';

const HOUSE = [PAPER, TEAL, RED, BLACK, TEAL, RED];
const HOUSE_SOFT = ['transparent', TEAL, RED, TEAL];
const DOTS = ['transparent', BLACK, RED];
const CONFETTI = [PAPER, RED, TEAL, BLACK];
const CHECKS = [PAPER, BLACK, RED, TEAL, BLACK, RED];
const CUT = [PAPER, TEAL, BLACK, RED, TEAL, PAPER];
const RAMP = [PAPER, BLACK, RED];

const NAV = [
  ['Booths', '#booths'],
  ['Packages', '#packages'],
  ['Backdrops', '#backdrops'],
  ['How it works', '#how'],
  ['Events', '#events'],
  ['Enquire', '#enquire'],
];

/* Four shots a second apart: the same sitter, moved a little each time.
   Each name is a class that shifts and scales the portrait in its frame. */
const SHOTS = ['shotA', 'shotB', 'shotC', 'shotD'];

const HERO_FACTS = [
  ['8 sec', 'from the last flash to a strip in your hand'],
  ['4', 'poses a strip, three seconds between flashes'],
  ['No limit', 'on strips, on every package we hire'],
];

const ARCADE_SPECS = [
  ['Prints', '2 x 6 in strips, black and white'],
  ['Fits', 'Four people, if they are friends'],
  ['Footprint', '1.2 x 2.1 m, 2.3 m tall'],
];

const OPEN_SPECS = [
  ['Prints', 'Strips or 4 x 6 in postcards, in color'],
  ['Fits', 'Up to twelve across the backdrop'],
  ['Footprint', '3 x 2.5 m, backdrop included'],
];

const FLICKER_SPECS = [
  ['Sends', 'A looping GIF by text or QR code'],
  ['Prints', 'A strip of the same four frames'],
  ['Footprint', '1.5 x 2 m, one socket'],
];

type Package = {
  hours: string;
  name: string;
  price: string;
  note: string;
  gets: string[];
};

const PACKAGES: Package[] = [
  {
    hours: '3',
    name: 'Three hours',
    price: '$395',
    note: 'Birthdays, launches, a long lunch',
    gets: ['One booth and an attendant', 'Unlimited strips', 'One backdrop, the props trunk', 'Online gallery the same night'],
  },
  {
    hours: '5',
    name: 'Five hours',
    price: '$595',
    note: 'Most weddings choose this one',
    gets: ['Everything in three hours', 'A guest book album, strips glued in', 'Two backdrops to swap at dinner', 'Your names on the strip footer'],
  },
  {
    hours: '10',
    name: 'All day',
    price: '$895',
    note: 'Fairs, festivals, the whole wedding',
    gets: ['Up to ten hours on site', 'Two attendants, in shifts', 'A second booth at half price', 'Every frame on a USB stick'],
  },
];

const EXTRAS = [
  ['Extra hour', '$85'],
  ['Guest book album', '$60'],
  ['Custom strip design', '$45'],
  ['Travel past 25 miles', '$1.20 a mile'],
];

const PROPS = [
  'Paper crowns, a whole box',
  'Moustaches on sticks, eleven kinds',
  'Chalkboards and chalk',
  'Feather boas in three colors',
  'Sunglasses the size of plates',
  'A rubber chicken, by request',
];

const STEPS = [
  ['Tell us the date', 'Send the form below. We reply within a day with what is free and a fixed quote.'],
  ['We set up', 'An hour before your first guest, in a space 2 by 3 meters within reach of a socket.'],
  ['Four flashes', 'Guests press the button. Three, two, one: four shots, three seconds apart.'],
  ['Strips in 8 seconds', 'Prints drop from the slot, and every frame is in your gallery that night.'],
];

type Note = {
  date: string;
  what: string;
  where: string;
  note: string;
  count: string;
};

const NOTES: Note[] = [
  { date: 'Sat 13 Sep', what: 'Okafor and Lind wedding', where: 'Hollis Barn', note: 'The groom\'s grandmother went in eleven times, twice on her own.', count: '612 strips' },
  { date: 'Fri 5 Sep', what: 'Library late night', where: 'Merrytown Library', note: 'A bookshelf backdrop and a trunk of spectacles. One strip came back overdue.', count: '240 strips' },
  { date: 'Sun 24 Aug', what: 'Arcade Row street party', where: 'Outside the garage', note: 'The Open Air booth on the pavement for six hours, through one rainstorm.', count: '1,104 strips' },
  { date: 'Sat 16 Aug', what: 'Pemberton 40th', where: 'The Corn Exchange', note: 'Theme: 1985. The Flicker looped forty people doing the same dance.', count: '388 GIFs' },
  { date: 'Sat 2 Aug', what: 'Year 6 leavers', where: 'St Aldo\'s school hall', note: 'Paper crowns for all. One lost tooth, found under the bench and returned.', count: '205 strips' },
  { date: 'Fri 25 Jul', what: 'Brightwell summer party', where: 'Brightwell Print Works', note: 'An office of ninety, a checkerboard backdrop and a queue that never shortened.', count: '470 strips' },
];

const TALLY = [
  ['31', 'events since June'],
  ['4,212', 'strips printed'],
  ['1,388', 'GIFs sent'],
  ['1', 'tooth returned'],
];

const HOURS = [
  ['Thursday', '10:00-17:00'],
  ['Friday', '10:00-17:00'],
  ['Saturday', '10:00-15:00'],
  ['Sunday to Wednesday', 'Out at events'],
];

export default function FourFramesPhotoboothPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--paper': '#f4f0e8',
        '--black': '#141414',
        '--red': '#d0342c',
        '--teal': '#1f8c8c',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="paper,black,red,teal"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Reddit+Sans:wght@400..800&family=Reddit+Mono:wght@500..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markStrip} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Four Frames</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#enquire">Check a date</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The garage wall is the house backdrop; the booth stands in front
            of it, and yesterday's strips are taped up beside it. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Photo booth hire, 18 Arcade Row, Merrytown</p>
            <h1 id="hero-h" className={s.title}>
              <span data-edit="hero.titleLine" data-edit-max="60" className={s.titleLine}>Four</span>
              <span data-edit="hero.titleLine2" data-edit-max="60" className={s.titleLine}>Frames</span>
            </h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Real photo booths for weddings, parties and the office summer do.
              Step in, draw the curtain, look at the lens: four flashes, and a
              strip drops out of the slot eight seconds later.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#enquire">Check your date</a>
              <a data-edit="hero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#booths">See the three booths</a>
            </div>
            <dl className={s.heroFacts}>
              {HERO_FACTS.map(([figure, text], i) => (
                <div key={figure}>
                  <dt data-edit={`hero.term.${i}`} data-edit-max="28">{figure}</dt>
                  <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={s.wall}>
            <div data-edit-pattern="hero.field" data-edit-roles="0,3,2,1,3,2" className={s.wallField} aria-hidden="true">
              <TabbiedPattern
                pattern={twohalf}
                palette={HOUSE}
                fit="grid"
                cellSize={56}
                seed="four-frames-house-wall"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className={s.floor} aria-hidden="true" />

            {/* The booth, front on. Curtain drawn back on the left, the
                lens, the button and the strip slot on the right. */}
            <div className={s.booth} aria-hidden="true">
              <p data-edit="hero.boothSign" data-edit-max="240" data-edit-multiline className={s.boothSign}>Photos</p>
              <div className={s.boothBody}>
                <div className={s.bay}>
                  <span className={s.rod} />
                  <span className={s.stool} />
                  <span className={s.curtain} />
                </div>
                <div className={s.console}>
                  <span className={s.flash} />
                  <span data-edit="hero.lookHere" data-edit-max="60" className={s.lookHere}>Look here</span>
                  <span className={s.lens} />
                  <span className={s.plate}>
                    <span data-edit="hero.plateSmall" data-edit-max="60" className={s.plateSmall}>4 poses</span>
                    <span data-edit="hero.plateBig" data-edit-max="60" className={s.plateBig}>Free</span>
                    <span data-edit="hero.plateSmall2" data-edit-max="60" className={s.plateSmall}>at your party</span>
                  </span>
                  <span className={s.button} />
                  <span className={s.slot}>
                    <span data-edit="hero.slotLabel" data-edit-max="60" className={s.slotLabel}>Strips</span>
                  </span>
                </div>
              </div>
              <span className={s.boothBase} />
            </div>

            <figure className={`${s.strip} ${s.stripHero}`}>
              <span className={s.tape} aria-hidden="true" />
              <span className={s.frames}>
                {SHOTS.map((shot, j) => (
                  <span key={shot} className={s.frame}>
                    <Artwork
                      slug="four-frames-photobooth-laugh"
                      alt={j === 0 ? 'Four frames of a young woman laughing with her eyes squeezed shut' : ''}
                      inks={['var(--dev-black)', 'var(--print)']}
                      className={`${s.shot} ${s[shot]}`}
                    />
                  </span>
                ))}
              </span>
              <figcaption data-edit="hero.stamp" data-edit-max="120" data-edit-multiline className={s.stamp}>FOUR FRAMES 13.09</figcaption>
            </figure>

            <figure className={`${s.strip} ${s.stripHeroTwo}`}>
              <span className={s.tape} aria-hidden="true" />
              <span className={`${s.tape} ${s.tapeFoot}`} aria-hidden="true" />
              <span className={s.frames}>
                {SHOTS.map((shot, j) => (
                  <span key={shot} className={s.frame}>
                    <Artwork
                      slug="four-frames-photobooth-crown"
                      alt={j === 0 ? 'Four frames of a child in a paper crown, grinning' : ''}
                      inks={['var(--dev-red)', 'var(--print)']}
                      className={`${s.shot} ${s[shot]}`}
                    />
                  </span>
                ))}
              </span>
              <figcaption data-edit="hero.stamp2" data-edit-max="120" data-edit-multiline className={s.stamp}>FOUR FRAMES 02.08</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------------------------------------------------------- BOOTHS */}
        <section id="booths" className={s.sec} aria-labelledby="booths-h">
          <div className={s.secHead}>
            <p data-edit="booths.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Frame 1 of 6</p>
            <h2 data-edit="booths.secTitle" data-edit-max="60" id="booths-h" className={s.secTitle}>The booths</h2>
            <p data-edit="booths.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Three machines, all built or rebuilt in the garage on Arcade Row.
              Each one comes with an attendant who fixes the paper, tidies the
              props and gets the shy ones in.
            </p>
          </div>

          <ul className={s.booths}>
            <li className={`${s.boothCard} ${s.cardArcade}`}>
              <div className={s.cardTop}>
                <div data-edit-pattern="booths.field" data-edit-roles="0,1,2" className={s.cardField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={halftone}
                    palette={RAMP}
                    fit="grid"
                    cellSize={18}
                    seed="four-frames-arcade"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <figure className={`${s.strip} ${s.stripCard}`}>
                  <span className={s.tape} aria-hidden="true" />
                  <span className={s.frames}>
                    {SHOTS.map((shot, j) => (
                      <span key={shot} className={s.frame}>
                        <Artwork
                          slug="four-frames-photobooth-face"
                          alt={j === 0 ? 'Four frames of an older man with a moustache, cheeks puffed out, cross-eyed' : ''}
                          inks={['var(--dev-black)', 'var(--print)']}
                          className={`${s.shot} ${s[shot]}`}
                        />
                      </span>
                    ))}
                  </span>
                  <figcaption data-edit="booths.stamp" data-edit-max="120" data-edit-multiline className={s.stamp}>ARCADE 0412</figcaption>
                </figure>
                <p data-edit="booths.cardNo" data-edit-max="240" data-edit-multiline className={s.cardNo}>01</p>
              </div>
              <div className={s.cardBody}>
                <p data-edit="booths.cardKind" data-edit-max="240" data-edit-multiline className={s.cardKind}>Vintage-look booth</p>
                <h3 data-edit="booths.cardName" data-edit-max="40" className={s.cardName}>The Arcade</h3>
                <p data-edit="booths.cardBlurb" data-edit-max="240" data-edit-multiline className={s.cardBlurb}>
                  A walnut and chrome cabinet on a 1962 frame, with a drawn red
                  curtain, a padded bench and one big button. Strips come out
                  black and white and still warm.
                </p>
                <dl className={s.specs}>
                  {ARCADE_SPECS.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`booths.term.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`booths.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="booths.cardPrice" data-edit-max="240" data-edit-multiline className={s.cardPrice}>from $495</p>
              </div>
            </li>
            <li className={`${s.boothCard} ${s.cardOpen}`}>
              <div className={s.cardTop}>
                <div data-edit-pattern="booths.field2" data-edit-roles="0,2,3,1" className={s.cardField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={dotset}
                    palette={CONFETTI}
                    fit="grid"
                    cellSize={30}
                    seed="four-frames-open-air"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <figure className={`${s.strip} ${s.stripCard}`}>
                  <span className={s.tape} aria-hidden="true" />
                  <span className={s.frames}>
                    {SHOTS.map((shot, j) => (
                      <span key={shot} className={s.frame}>
                        <Artwork
                          slug="four-frames-photobooth-friends"
                          alt={j === 0 ? 'Four frames of two friends pressed cheek to cheek, grinning' : ''}
                          inks={['var(--dev-teal)', 'var(--print)']}
                          className={`${s.shot} ${s[shot]}`}
                        />
                      </span>
                    ))}
                  </span>
                  <figcaption data-edit="booths.stamp2" data-edit-max="120" data-edit-multiline className={s.stamp}>OPEN AIR 1187</figcaption>
                </figure>
                <p data-edit="booths.cardNo2" data-edit-max="240" data-edit-multiline className={s.cardNo}>02</p>
              </div>
              <div className={s.cardBody}>
                <p data-edit="booths.cardKind2" data-edit-max="240" data-edit-multiline className={s.cardKind}>Open booth, no walls</p>
                <h3 data-edit="booths.cardName2" data-edit-max="40" className={s.cardName}>The Open Air</h3>
                <p data-edit="booths.cardBlurb2" data-edit-max="240" data-edit-multiline className={s.cardBlurb}>
                  A camera on a column, a ring flash and a backdrop wide enough
                  for twelve. Built for dance floors and garden parties where
                  nobody wants to queue.
                </p>
                <dl className={s.specs}>
                  {OPEN_SPECS.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`booths.term2.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`booths.body2.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="booths.cardPrice2" data-edit-max="240" data-edit-multiline className={s.cardPrice}>from $445</p>
              </div>
            </li>
            <li className={`${s.boothCard} ${s.cardFlicker}`}>
              <div className={s.cardTop}>
                <div data-edit-pattern="booths.field3" data-edit-roles="0,3,1,2,3,0" className={s.cardField} aria-hidden="true">
                  <TabbiedPattern
                    pattern={bias}
                    palette={CUT}
                    fit="grid"
                    cellSize={36}
                    seed="four-frames-flicker"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <figure className={`${s.strip} ${s.stripCard}`}>
                  <span className={s.tape} aria-hidden="true" />
                  <span className={s.frames}>
                    {SHOTS.map((shot, j) => (
                      <span key={shot} className={s.frame}>
                        <Artwork
                          slug="four-frames-photobooth-crown"
                          alt={j === 0 ? 'Four frames of a child in a paper party crown, grinning with a gap in their teeth' : ''}
                          inks={['var(--dev-red)', 'var(--print)']}
                          className={`${s.shot} ${s[shot]}`}
                        />
                      </span>
                    ))}
                  </span>
                  <figcaption data-edit="booths.stamp3" data-edit-max="120" data-edit-multiline className={s.stamp}>FLICKER 0233</figcaption>
                </figure>
                <p data-edit="booths.cardNo3" data-edit-max="240" data-edit-multiline className={s.cardNo}>03</p>
              </div>
              <div className={s.cardBody}>
                <p data-edit="booths.cardKind3" data-edit-max="240" data-edit-multiline className={s.cardKind}>GIF booth</p>
                <h3 data-edit="booths.cardName3" data-edit-max="40" className={s.cardName}>The Flicker</h3>
                <p data-edit="booths.cardBlurb3" data-edit-max="240" data-edit-multiline className={s.cardBlurb}>
                  Takes four frames and loops them into a GIF, texted to the
                  guest before they have found their drink. It prints a strip
                  as well, for the fridge door.
                </p>
                <dl className={s.specs}>
                  {FLICKER_SPECS.map(([term, value], i) => (
                    <div key={term}>
                      <dt data-edit={`booths.term3.${i}`} data-edit-max="28">{term}</dt>
                      <dd data-edit={`booths.body3.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p data-edit="booths.cardPrice3" data-edit-max="240" data-edit-multiline className={s.cardPrice}>from $520</p>
              </div>
            </li>
          </ul>
        </section>

        {/* -------------------------------------------------------- PACKAGES
            Price plates, screwed to the booth the way the old coin plates
            were, hung on the house backdrop. */}
        <section id="packages" className={s.packagesSec} aria-labelledby="packages-h">
          <div data-edit-pattern="packages.field" data-edit-roles="transparent,3,2,3" className={s.packField} aria-hidden="true">
            <TabbiedPattern
              pattern={twohalf}
              palette={HOUSE_SOFT}
              options={{ frequency: 0.55 }}
              fit="grid"
              cellSize={64}
              seed="four-frames-plates"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.packInner}>
            <div className={s.secHead}>
              <p data-edit="packages.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Frame 2 of 6</p>
              <h2 data-edit="packages.secTitle" data-edit-max="60" id="packages-h" className={s.secTitle}>Packages</h2>
              <p data-edit="packages.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Every package has unlimited strips, an attendant, set-up and
                pack-down. Prices are for any of the three booths; the Flicker
                adds $25.
              </p>
            </div>

            <ul className={s.plates}>
              {PACKAGES.map((p, i) => (
                <li key={p.name} className={s.plate3}>
                  <span className={s.screws} aria-hidden="true" />
                  <p className={s.plateHours}>
                    <span data-edit={`packages.plateHoursBig.${i}`} data-edit-max="60" className={s.plateHoursBig}>{p.hours}</span>
                    <span data-edit={`packages.plateHoursUnit.${i}`} data-edit-max="60" className={s.plateHoursUnit}>hrs</span>
                  </p>
                  <h3 data-edit={`packages.plateName.${i}`} data-edit-max="40" className={s.plateName}>{p.name}</h3>
                  <p data-edit={`packages.platePrice.${i}`} data-edit-max="240" data-edit-multiline className={s.platePrice}>{p.price}</p>
                  <p data-edit={`packages.plateNote.${i}`} data-edit-max="240" data-edit-multiline className={s.plateNote}>{p.note}</p>
                  <ul className={s.plateList}>
                    {p.gets.map((item, i2) => (
                      <li data-edit={`packages.item.${i}.${i2}`} data-edit-max="80" key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className={s.extras}>
              <h3 data-edit="packages.extrasTitle" data-edit-max="40" className={s.extrasTitle}>Extras</h3>
              <dl className={s.extrasList}>
                {EXTRAS.map(([item, price], i) => (
                  <div key={item}>
                    <dt data-edit={`packages.term.${i}`} data-edit-max="28">{item}</dt>
                    <dd data-edit={`packages.body.${i}`} data-edit-max="200" data-edit-multiline>{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- BACKDROPS
            The backdrops are the patterns: four swatches hanging from the
            stand's crossbar, and the props trunk beside them. */}
        <section id="backdrops" className={s.sec} aria-labelledby="backdrops-h">
          <div className={s.secHead}>
            <p data-edit="backdrops.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Frame 3 of 6</p>
            <h2 data-edit="backdrops.secTitle" data-edit-max="60" id="backdrops-h" className={s.secTitle}>Backdrops and props</h2>
            <p data-edit="backdrops.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Pick one backdrop with three and five hours, two with all day.
              Each is printed fabric, 2.4 m wide, and hangs from a stand that
              needs no wall.
            </p>
          </div>

          <div className={s.backdropGrid}>
            <div className={s.stand}>
              <span className={s.crossbar} aria-hidden="true" />
              <ul className={s.swatches}>
                <li className={s.swatch}>
                  <div data-edit-pattern="backdrops.field" data-edit-roles="0,3,2,1,3,2" className={s.swatchField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={twohalf}
                      palette={HOUSE}
                      fit="grid"
                      cellSize={40}
                      seed="four-frames-swatch-split"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <h3 data-edit="backdrops.swatchName" data-edit-max="40" className={s.swatchName}>Split stripe</h3>
                  <p data-edit="backdrops.swatchNote" data-edit-max="240" data-edit-multiline className={s.swatchNote}>The house backdrop, the one painted on the van.</p>
                </li>
                <li className={s.swatch}>
                  <div data-edit-pattern="backdrops.field2" data-edit-roles="0,1,2,3,1,2" className={s.swatchField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={damier}
                      palette={CHECKS}
                      fit="grid"
                      cellSize={34}
                      seed="four-frames-swatch-check"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <h3 data-edit="backdrops.swatchName2" data-edit-max="40" className={s.swatchName}>Checkerboard</h3>
                  <p data-edit="backdrops.swatchNote2" data-edit-max="240" data-edit-multiline className={s.swatchNote}>Loud, square and kind to anyone who moves.</p>
                </li>
                <li className={s.swatch}>
                  <div data-edit-pattern="backdrops.field3" data-edit-roles="0,3,1,2,3,0" className={s.swatchField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={bias}
                      palette={CUT}
                      fit="grid"
                      cellSize={40}
                      seed="four-frames-swatch-bias"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <h3 data-edit="backdrops.swatchName3" data-edit-max="40" className={s.swatchName}>Bias cut</h3>
                  <p data-edit="backdrops.swatchNote3" data-edit-max="240" data-edit-multiline className={s.swatchNote}>Diagonals that make a crowd look like it is leaning in.</p>
                </li>
                <li className={s.swatch}>
                  <div data-edit-pattern="backdrops.field4" data-edit-roles="0,1,2" className={s.swatchField} aria-hidden="true">
                    <TabbiedPattern
                      pattern={halftone}
                      palette={RAMP}
                      fit="grid"
                      cellSize={22}
                      seed="four-frames-swatch-dots"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                  <h3 data-edit="backdrops.swatchName4" data-edit-max="40" className={s.swatchName}>Halftone</h3>
                  <p data-edit="backdrops.swatchNote4" data-edit-max="240" data-edit-multiline className={s.swatchNote}>Dots from big to small, like a newspaper photo.</p>
                </li>
              </ul>
            </div>

            <aside className={s.trunk} aria-labelledby="props-h">
              <h3 data-edit="props.trunkTitle" data-edit-max="40" id="props-h" className={s.trunkTitle}>In the props trunk</h3>
              <ul className={s.propList}>
                {PROPS.map((prop, i) => (
                  <li data-edit={`props.item.${i}`} data-edit-max="80" key={prop}>{prop}</li>
                ))}
              </ul>
              <p data-edit="props.trunkNote" data-edit-max="240" data-edit-multiline className={s.trunkNote}>
                Bring your own too. We have shot a golden retriever, a tuba and
                a full-size cardboard cutout of the bride's dad.
              </p>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------------- HOW
            The steps as a strip laid on its side: four frames, four flashes. */}
        <section id="how" className={s.howSec} aria-labelledby="how-h">
          <div className={s.secHead}>
            <p data-edit="how.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Frame 4 of 6</p>
            <h2 data-edit="how.secTitle" data-edit-max="60" id="how-h" className={s.secTitle}>How it works</h2>
            <p data-edit="how.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Four steps, the same as the booth. You do the first one; we do
              the rest.
            </p>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([title, text], i) => (
              <li key={title} className={s.step}>
                <span className={s.stepNo} aria-hidden="true">{i + 1}</span>
                <h3 data-edit={`how.stepTitle.${i}`} data-edit-max="40" className={s.stepTitle}>{title}</h3>
                <p data-edit={`how.stepText.${i}`} data-edit-max="240" data-edit-multiline className={s.stepText}>{text}</p>
              </li>
            ))}
          </ol>
          <p data-edit="how.stepsFoot" data-edit-max="240" data-edit-multiline className={s.stepsFoot}>Countdown on the screen: three, two, one, flash. Repeat four times.</p>
        </section>

        {/* ---------------------------------------------------------- EVENTS
            The garage noticeboard: notes on the last few events, and two
            strips a guest left behind. */}
        <section id="events" className={s.eventsSec} aria-labelledby="events-h">
          <div className={s.secHead}>
            <p data-edit="events.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>Frame 5 of 6</p>
            <h2 data-edit="events.secTitle" data-edit-max="60" id="events-h" className={s.secTitle}>Recent events</h2>
            <p data-edit="events.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              What the booths got up to this summer, from the notebook the
              attendants fill in on the drive home.
            </p>
          </div>

          <div className={s.board}>
            <figure className={`${s.strip} ${s.stripBoard}`}>
              <span className={s.tape} aria-hidden="true" />
              <span className={s.frames}>
                {SHOTS.map((shot, j) => (
                  <span key={shot} className={s.frame}>
                    <Artwork
                      slug="four-frames-photobooth-friends"
                      alt={j === 0 ? 'Four frames of two friends cheek to cheek, from the street party' : ''}
                      inks={['var(--dev-teal)', 'var(--print)']}
                      className={`${s.shot} ${s[shot]}`}
                    />
                  </span>
                ))}
              </span>
              <figcaption data-edit="events.stamp" data-edit-max="120" data-edit-multiline className={s.stamp}>ARCADE ROW 24.08</figcaption>
            </figure>

            <ul className={s.notes}>
              {NOTES.map((n, i) => (
                <li key={n.what} className={s.note}>
                  <span className={s.noteTape} aria-hidden="true" />
                  <p data-edit={`events.noteDate.${i}`} data-edit-max="240" data-edit-multiline className={s.noteDate}>{n.date}</p>
                  <h3 data-edit={`events.noteWhat.${i}`} data-edit-max="40" className={s.noteWhat}>{n.what}</h3>
                  <p data-edit={`events.noteWhere.${i}`} data-edit-max="240" data-edit-multiline className={s.noteWhere}>{n.where}</p>
                  <p data-edit={`events.noteText.${i}`} data-edit-max="240" data-edit-multiline className={s.noteText}>{n.note}</p>
                  <p data-edit={`events.noteCount.${i}`} data-edit-max="240" data-edit-multiline className={s.noteCount}>{n.count}</p>
                </li>
              ))}
            </ul>

            <dl className={s.tally}>
              {TALLY.map(([figure, label], i) => (
                <div key={label}>
                  <dt data-edit={`events.term.${i}`} data-edit-max="28">{label}</dt>
                  <dd data-edit={`events.body.${i}`} data-edit-max="200" data-edit-multiline>{figure}</dd>
                </div>
              ))}
            </dl>

            <figure className={`${s.strip} ${s.stripBoardTwo}`}>
              <span className={s.tape} aria-hidden="true" />
              <span className={s.frames}>
                {SHOTS.map((shot, j) => (
                  <span key={shot} className={s.frame}>
                    <Artwork
                      slug="four-frames-photobooth-face"
                      alt={j === 0 ? 'Four frames of a man pulling a face, from the 40th birthday' : ''}
                      inks={['var(--dev-red)', 'var(--print)']}
                      className={`${s.shot} ${s[shot]}`}
                    />
                  </span>
                ))}
              </span>
              <figcaption data-edit="events.stamp2" data-edit-max="120" data-edit-multiline className={s.stamp}>CORN EXCH 16.08</figcaption>
            </figure>
          </div>
        </section>

        {/* --------------------------------------------------------- ENQUIRE
            The form sits on the booth's black front, the curtain at its side. */}
        <section id="enquire" className={s.enquireSec} aria-labelledby="enquire-h">
          <div className={s.enquire}>
            <div className={s.enquireCurtain} aria-hidden="true" />
            <form className={s.form} action="#">
              <p data-edit="enquire.secNoDark" data-edit-max="240" data-edit-multiline className={s.secNoDark}>Frame 6 of 6</p>
              <h2 data-edit="enquire.formTitle" data-edit-max="60" id="enquire-h" className={s.formTitle}>Enquire</h2>
              <p data-edit="enquire.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>
                Tell us the date and where. We hold it for five days while you
                decide, and a $100 deposit books it.
              </p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="enquire.label" htmlFor="ff-name">Your name</label>
                  <input id="ff-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="enquire.label2" htmlFor="ff-email">Email</label>
                  <input id="ff-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="enquire.label3" htmlFor="ff-date">Date of the event</label>
                  <input id="ff-date" name="date" type="date" />
                </div>
                <div className={s.field}>
                  <label data-edit="enquire.label4" htmlFor="ff-venue">Venue and town</label>
                  <input id="ff-venue" name="venue" type="text" />
                </div>
                <div className={s.field}>
                  <label data-edit="enquire.label5" htmlFor="ff-booth">Booth</label>
                  <select id="ff-booth" name="booth" defaultValue="arcade">
                    <option value="arcade">The Arcade, vintage look</option>
                    <option value="open">The Open Air</option>
                    <option value="flicker">The Flicker, GIFs</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="enquire.label6" htmlFor="ff-hours">Package</label>
                  <select id="ff-hours" name="hours" defaultValue="5">
                    <option value="3">Three hours, $395</option>
                    <option value="5">Five hours, $595</option>
                    <option value="10">All day, $895</option>
                  </select>
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="enquire.label7" htmlFor="ff-notes">Anything else</label>
                  <textarea id="ff-notes" name="notes" rows={3} />
                </div>
              </div>
              <button data-edit="enquire.submit" data-edit-max="24" className={s.submit} type="submit">Send the enquiry</button>
            </form>

            <aside className={s.garage} aria-labelledby="garage-h">
              <h3 data-edit="garage.garageTitle" data-edit-max="40" id="garage-h" className={s.garageTitle}>Try them first</h3>
              <p data-edit="garage.garageText" data-edit-max="240" data-edit-multiline className={s.garageText}>
                All three booths live in the garage at 18 Arcade Row, behind
                the laundrette. Come in and take a strip on us.
              </p>
              <dl className={s.hours}>
                {HOURS.map(([day, time], i) => (
                  <div key={day}>
                    <dt data-edit={`garage.term.${i}`} data-edit-max="28">{day}</dt>
                    <dd data-edit={`garage.body.${i}`} data-edit-max="200" data-edit-multiline>{time}</dd>
                  </div>
                ))}
              </dl>
              <p className={s.contact}>
                <a data-edit="garage.link" data-edit-max="28" href="tel:+15550134418">(555) 013-4418</a>
              </p>
              <p className={s.contact}>
                <a data-edit="garage.link2" data-edit-max="28" href="mailto:hello@fourframes.example">hello@fourframes.example</a>
              </p>
            </aside>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="0,3,2,1,3,2" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={twohalf}
            palette={HOUSE}
            fit="grid"
            cellSize={32}
            seed="four-frames-footer"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Four Frames</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional photo booth hire company. The booths, events, names and prices are invented.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>The portraits are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
