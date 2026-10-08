import { TabbiedPattern } from 'tabbied/react';
import { coil } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './ringlet-curl-studio.module.css';

export const metadata = {
  title: 'Ringlet Curl Studio: Curly hair cut dry, curl by curl',
  description:
    'Ringlet is a one-chair home studio for curly, coily and wavy hair on Wicker Street. A curl-type chart, curl cuts priced by hair length, how to book, and aftercare for the week after.',
};

/* Site colors, the same hexes as the stylesheet's root rule. Coil is a
   field of color-wheel rings with a hollow hub: a head of ringlets seen
   end on. It fills the salon mirror in the hero, the round window of the
   home studio, a band before the aftercare and the footer. Color 0 paints
   the ground and the hollow hub of every ring, so it is the color of the
   panel the field sits in: plum for the mirror and the bands, cream for
   the window. */
const CREAM = '#fff3e4';
const PLUM = '#2c1636';
const CORAL = '#ee5d4f';
const MARIGOLD = '#f5b335';
const TEAL = '#1d9a8a';
const ORCHID = '#b48ee0';

const RINGS = [PLUM, CORAL, MARIGOLD, TEAL, ORCHID, CREAM];
const WINDOW = [CREAM, MARIGOLD, CORAL, ORCHID, TEAL, PLUM];
const NIGHT = [PLUM, CORAL, MARIGOLD, TEAL, ORCHID, CREAM];

const NAV = [
  ['Curl chart', '#chart'],
  ['Services', '#services'],
  ['The studio', '#studio'],
  ['Aftercare', '#aftercare'],
  ['Book', '#book'],
];

const CURLS = [
  ['2A', 'Loose wave', 'A soft S that starts below the ears and falls flat under heavy product.', 'c2a'],
  ['2B', 'Defined wave', 'A clear S from the mid-lengths down, with frizz at the crown in damp weather.', 'c2b'],
  ['2C', 'Deep wave', 'Thick S waves from the root, and often a ringlet or two underneath.', 'c2c'],
  ['3A', 'Loose curl', 'Big, glossy loops about the width of a stick of sidewalk chalk.', 'c3a'],
  ['3B', 'Springy ringlet', 'Bouncy ringlets the width of a marker. Shrinks by a third as it dries.', 'c3b'],
  ['3C', 'Tight curl', 'Corkscrews the width of a pencil, packed close, with a lot of volume.', 'c3c'],
  ['4A', 'Soft coil', 'Defined S-coils the width of a knitting needle. Wants moisture more than hold.', 'c4a'],
  ['4B', 'Zigzag coil', 'Sharp bends rather than loops, and up to 70 percent shrinkage.', 'c4b'],
  ['4C', 'Tight coil', 'The tightest and most fragile pattern. Defined by technique, not by product.', 'c4c'],
];

const SERVICES = [
  ['Curl cut', 'Cut dry, curl by curl, then washed, styled and taught', '2 hours', '$85', '$105', '$125', '$150'],
  ['Curl refresh', 'A dry trim of the ends and the shape, no wash', '1 hour', '$55', '$65', '$75', '$90'],
  ['Cut and color gloss', 'A curl cut with a demi-permanent gloss, no lightening', '3 hours', '$140', '$165', '$190', '$220'],
  ['Deep hydration', 'Steam treatment and a lesson in styling at home', '75 min', '$60', '$70', '$80', '$95'],
  ['Big chop', 'Cutting away relaxed or heat-damaged ends to start again', '2 hours', '$95', '$95', '$110', '$125'],
];

const VISIT = [
  ['Book online', 'Choose the service and your length. A $25 deposit holds the time and comes off the bill.'],
  ['Come with dry, loose hair', 'Washed the day before or that morning, no product, no braids or buns. I need to see your curls as they really fall.'],
  ['Ring the side door', 'The studio is the front room of a house on Wicker Street. The address and a parking note come with your confirmation.'],
  ['Stay for the lesson', 'I style the first half of your head and you do the second with me watching, so it works at home too.'],
];

const GOOD_TO_KNOW = [
  'One chair, one client at a time, no blow dryers roaring next to you',
  'A cat named Pepper lives here. Say if you are allergic and she stays upstairs.',
  'Step-free side door and a downstairs bathroom',
  'Card or cash, and no tipping',
];

const AFTER = [
  ['Day 0', 'Leave it alone', 'No touching and no fluffing until it is completely dry. The crunchy cast is your friend.'],
  ['Night 1', 'Pineapple and satin', 'A loose, high ponytail on top of your head and a satin pillowcase or bonnet.'],
  ['Days 2-3', 'Refresh with water', 'Mist, a dot of leave-in, scrunch upward, then hands off again.'],
  ['Day 5', 'The first wash', 'Co-wash or a sulfate-free shampoo, conditioner combed through in the shower.'],
  ['Week 12', 'Back in the chair', 'Curls grow unevenly. A refresh keeps the shape you walked out with.'],
];

const HOURS = [
  ['Tuesday to Thursday', '10:00-7:00'],
  ['Friday', '9:00-3:00'],
  ['Saturday', '9:00-5:00'],
];

export default function RingletCurlStudioPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--cream': '#fff3e4',
        '--plum': '#2c1636',
        '--coral': '#ee5d4f',
        '--marigold': '#f5b335',
        '--teal': '#1d9a8a',
        '--orchid': '#b48ee0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="cream,plum,coral,marigold,teal,orchid"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Figtree:wght@400;500;600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span className={s.brandRing} aria-hidden="true" />
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Ringlet</span>
          <span data-edit="bar.brandSub" data-edit-max="60" className={s.brandSub}>curl studio</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barBook" data-edit-max="28" className={s.barBook} href="#book">Book a curl cut</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* HERO: the pitch, and a salon mirror full of ringlets. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Curly, coily and wavy hair. One chair on Wicker Street.</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Every curl, cut <span>where it falls.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I cut dry, one curl at a time, so the shape works the way your
              hair actually lives. Then I teach you to style it, so day three
              looks as good as day one.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#book">Book a curl cut</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#chart">Find your curl type</a>
            </div>
            <p data-edit="hero.heroNote" data-edit-max="240" data-edit-multiline className={s.heroNote}>Inez Calloway, curl specialist, cutting curls dry since 2015</p>
          </div>
          <div className={s.heroArt}>
            <div data-edit-pattern="hero.field" data-edit-roles="1,2,3,4,5,0" className={s.mirror} aria-hidden="true">
              <TabbiedPattern
                pattern={coil}
                palette={RINGS}
                fit="grid"
                cellSize={70}
                seed="rg-mirror"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <p className={s.sticker}>
              <span data-edit="hero.stickerBig" data-edit-max="60" className={s.stickerBig}>$85</span>
              <span data-edit="hero.stickerSmall" data-edit-max="60" className={s.stickerSmall}>curl cuts from</span>
            </p>
          </div>
        </section>

        {/* CHART: nine curl types, drawn from loose to tight. */}
        <section id="chart" className={s.sec} aria-labelledby="chart-h">
          <div className={s.secHead}>
            <p data-edit="chart.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The curl chart</p>
            <h2 data-edit="chart.secTitle" data-edit-max="60" id="chart-h" className={s.secTitle}>Find your curl type</h2>
            <p data-edit="chart.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Most heads have two or three types at once: looser at the
              front, tighter at the nape. Look at a single clean, dry curl
              from underneath, not the top layer.
            </p>
          </div>
          <ol className={s.chart}>
            {CURLS.map(([code, name, text, kind], i) => (
              <li key={code} className={s.curl}>
                <span className={`${s.wave} ${s[kind]}`} aria-hidden="true" />
                <span data-edit={`chart.curlCode.${i}`} data-edit-max="60" className={s.curlCode}>{code}</span>
                <h3 data-edit={`chart.curlName.${i}`} data-edit-max="40" className={s.curlName}>{name}</h3>
                <p data-edit={`chart.curlText.${i}`} data-edit-max="240" data-edit-multiline className={s.curlText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* SERVICES: priced by hair length, measured when stretched. */}
        <section id="services" className={s.services} aria-labelledby="services-h">
          <div className={s.servicesInner}>
            <div className={s.secHead}>
              <p data-edit="services.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Services and prices</p>
              <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>Priced by length, not by type</h2>
              <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Length is measured with a curl gently stretched. A first visit
                is always a full curl cut, so I can learn your hair. The
                15-minute video consultation is free.
              </p>
            </div>
            <div className={s.priceWrap}>
              <table className={s.prices}>
                <caption data-edit="services.srOnly" className={s.srOnly}>Prices by service and hair length</caption>
                <thead>
                  <tr>
                    <th data-edit="services.svcHead" scope="col" className={s.svcHead}>Service</th>
                    <th scope="col" className={s.lenHead}>
                      <span data-edit="services.lenName" data-edit-max="60" className={s.lenName}>Short</span>
                      <span data-edit="services.lenNote" data-edit-max="60" className={s.lenNote}>above the chin</span>
                    </th>
                    <th scope="col" className={s.lenHead}>
                      <span data-edit="services.lenName2" data-edit-max="60" className={s.lenName}>Medium</span>
                      <span data-edit="services.lenNote2" data-edit-max="60" className={s.lenNote}>to the shoulders</span>
                    </th>
                    <th scope="col" className={s.lenHead}>
                      <span data-edit="services.lenName3" data-edit-max="60" className={s.lenName}>Long</span>
                      <span data-edit="services.lenNote3" data-edit-max="60" className={s.lenNote}>past the shoulders</span>
                    </th>
                    <th scope="col" className={s.lenHead}>
                      <span data-edit="services.lenName4" data-edit-max="60" className={s.lenName}>Extra long</span>
                      <span data-edit="services.lenNote4" data-edit-max="60" className={s.lenNote}>mid-back and below</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICES.map(([name, what, time, a, b, c, d], i) => (
                    <tr key={name}>
                      <th scope="row" className={s.svc}>
                        <span data-edit={`services.svcName.${i}`} data-edit-max="60" className={s.svcName}>{name}</span>
                        <span data-edit={`services.svcWhat.${i}`} data-edit-max="60" className={s.svcWhat}>{what}</span>
                        <span data-edit={`services.svcTime.${i}`} data-edit-max="60" className={s.svcTime}>{time}</span>
                      </th>
                      <td data-edit={`services.cell.${i}`} className={s.cell}>{a}</td>
                      <td data-edit={`services.cell2.${i}`} className={s.cell}>{b}</td>
                      <td data-edit={`services.cell3.${i}`} className={s.cell}>{c}</td>
                      <td data-edit={`services.cell4.${i}`} className={s.cell}>{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* STUDIO: the front room, a round window and how to book it. */}
        <section id="studio" className={s.sec} aria-labelledby="studio-h">
          <div className={s.studioGrid}>
            <div className={s.studioArt}>
              <div data-edit-pattern="studio.field" data-edit-roles="0,3,2,5,4,1" className={s.window} aria-hidden="true">
                <TabbiedPattern
                  pattern={coil}
                  palette={WINDOW}
                  fit="grid"
                  cellSize={54}
                  seed="rg-window"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.knowCard}>
                <h3 data-edit="studio.knowTitle" data-edit-max="40" className={s.knowTitle}>Good to know</h3>
                <ul className={s.knowList}>
                  {GOOD_TO_KNOW.map((g, i) => (
                    <li data-edit={`studio.item.${i}`} data-edit-max="80" key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p data-edit="studio.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>The home studio</p>
              <h2 data-edit="studio.secTitle" data-edit-max="60" id="studio-h" className={s.secTitle}>A front room with one chair in it</h2>
              <p data-edit="studio.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                No music you did not choose and no one waiting behind you. A
                curl cut takes two unhurried hours, so this is how a visit
                goes.
              </p>
              <ol className={s.visit}>
                {VISIT.map(([t, d], i) => (
                  <li key={t}>
                    <span className={s.visitNo}>{i + 1}</span>
                    <h3 data-edit={`studio.visitTitle.${i}`} data-edit-max="40" className={s.visitTitle}>{t}</h3>
                    <p data-edit={`studio.visitText.${i}`} data-edit-max="240" data-edit-multiline className={s.visitText}>{d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="1,2,3,4,5,0" className={s.band} aria-hidden="true">
          <TabbiedPattern
            pattern={coil}
            palette={NIGHT}
            fit="grid"
            cellSize={56}
            seed="rg-band"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* AFTERCARE: the first twelve weeks, as a row of rings. */}
        <section id="aftercare" className={s.sec} aria-labelledby="after-h">
          <div className={s.secHead}>
            <p data-edit="aftercare.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Aftercare</p>
            <h2 data-edit="aftercare.secTitle" data-edit-max="60" id="after-h" className={s.secTitle}>The week after, and the weeks after that</h2>
          </div>
          <ol className={s.after}>
            {AFTER.map(([when, title, text], i) => (
              <li key={when} className={s.afterStep}>
                <span data-edit={`aftercare.afterWhen.${i}`} data-edit-max="60" className={s.afterWhen}>{when}</span>
                <h3 data-edit={`aftercare.afterTitle.${i}`} data-edit-max="40" className={s.afterTitle}>{title}</h3>
                <p data-edit={`aftercare.afterText.${i}`} data-edit-max="240" data-edit-multiline className={s.afterText}>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* BOOK */}
        <section id="book" className={s.book} aria-labelledby="book-h">
          <div className={s.bookGrid}>
            <div>
              <p data-edit="book.eyebrow" data-edit-max="240" data-edit-multiline className={s.eyebrow}>Book</p>
              <h2 data-edit="book.secTitle" data-edit-max="60" id="book-h" className={s.secTitle}>Ask for a chair</h2>
              <p data-edit="book.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Send a request and I reply within a day with two or three
                times. Not sure of your type or length? Send a photo of a dry
                curl and I will tell you.
              </p>
              <p data-edit="book.address" data-edit-max="240" data-edit-multiline className={s.address}>Wicker Street, Millbrook</p>
              <p data-edit="book.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>The house number comes with your confirmation, since this is my home.</p>
              <p className={s.line}>
                <a data-edit="book.link" data-edit-max="28" href="tel:+15550174452">(555) 017-4452</a>
              </p>
              <p className={s.line}>
                <a data-edit="book.link2" data-edit-max="28" href="mailto:inez@ringlet.example">inez@ringlet.example</a>
              </p>
              <dl className={s.hours}>
                {HOURS.map(([d, h], i) => (
                  <div key={d}>
                    <dt data-edit={`book.term.${i}`} data-edit-max="28">{d}</dt>
                    <dd data-edit={`book.body.${i}`} data-edit-max="200" data-edit-multiline>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form className={s.form} action="#">
              <div className={s.field}>
                <label data-edit="book.label" htmlFor="rg-name">Name</label>
                <input id="rg-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="rg-email">Email</label>
                <input id="rg-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="rg-service">Service</label>
                <select id="rg-service" name="service" defaultValue="cut">
                  <option value="cut">Curl cut</option>
                  <option value="refresh">Curl refresh</option>
                  <option value="gloss">Cut and color gloss</option>
                  <option value="hydration">Deep hydration</option>
                  <option value="chop">Big chop</option>
                  <option value="consult">Free video consultation</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="rg-type">Curl type, if you know it</label>
                <select id="rg-type" name="type" defaultValue="unsure">
                  <option value="unsure">Not sure</option>
                  <option value="2">2A to 2C, waves</option>
                  <option value="3">3A to 3C, curls</option>
                  <option value="4">4A to 4C, coils</option>
                </select>
              </div>
              <fieldset className={`${s.field} ${s.wide} ${s.lengths}`}>
                <legend data-edit="book.legend">Length, stretched</legend>
                <div className={s.picks}>
                  <input id="rg-l1" type="radio" name="length" value="short" />
                  <label data-edit="book.label5" htmlFor="rg-l1">Short</label>
                  <input id="rg-l2" type="radio" name="length" value="medium" defaultChecked />
                  <label data-edit="book.label6" htmlFor="rg-l2">Medium</label>
                  <input id="rg-l3" type="radio" name="length" value="long" />
                  <label data-edit="book.label7" htmlFor="rg-l3">Long</label>
                  <input id="rg-l4" type="radio" name="length" value="xlong" />
                  <label data-edit="book.label8" htmlFor="rg-l4">Extra long</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.wide}`}>
                <label data-edit="book.label9" htmlFor="rg-note">What would you like to change</label>
                <textarea id="rg-note" name="note" rows={4} />
              </div>
              <button data-edit="book.submit" data-edit-max="24" className={s.submit} type="submit">Send my request</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="1,2,3,4,5,0" className={s.footRings} aria-hidden="true">
          <TabbiedPattern
            pattern={coil}
            palette={NIGHT}
            fit="grid"
            cellSize={44}
            seed="rg-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Ringlet Curl Studio</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional home hair studio. The stylist, the cat, the prices and the street are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
