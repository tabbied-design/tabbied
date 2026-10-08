import { TabbiedPattern } from 'tabbied/react';
import { polarfan } from 'tabbied/patterns';
import { TemplateMenu } from 'components/template/TemplateMenu';
import s from './dex-mercer-voice.module.css';

export const metadata = {
  title: 'Dex Mercer: Voice-over artist with a broadcast home studio',
  description:
    'Dex Mercer voices commercials, documentaries, explainers, e-learning and audiobooks from a treated home booth. Auditions within two hours, finished files the next morning, rates by usage.',
};

/* Site colors, the same hexes as the stylesheet's root rule. The page is a
   session sheet: a tracklist of demo reels, a rate card read like a mixing
   desk, a rack of studio gear, a wall of clients. Polar Fan is the sound
   itself, rings and rays thrown out from one corner like a voice from a
   speaker cone: chalk and on-air red on the black of the booth. It fills
   the hero, sits in the speaker panel, sweeps between the rates and the
   studio, and edges the footer. */
const STUDIO = '#141418';
const CHALK = '#efe8dc';
const SIGNAL = '#e5483d';
const AMBER = '#f0b23e';

const CONE = ['transparent', CHALK, AMBER, SIGNAL];
const WAVE = ['transparent', SIGNAL, CHALK, AMBER];
const GRILLE = ['transparent', AMBER, CHALK, CHALK];

const NAV = [
  ['Reels', '#reels'],
  ['Rates', '#rates'],
  ['Studio', '#studio'],
  ['Clients', '#clients'],
  ['Booking', '#booking'],
  ['Contact', '#contact'],
];

type Reel = { no: string; title: string; on: string; length: string };

const REELS: Reel[] = [
  { no: '01', title: 'Commercial, the warm read', on: 'A credit union, a pickup truck, a coffee roaster', length: '1:02' },
  { no: '02', title: 'Commercial, the dry read', on: 'Software, insurance, a wry hardware store', length: '0:58' },
  { no: '03', title: 'Documentary narration', on: 'Rivers, a shipwreck, a true-crime podcast open', length: '1:48' },
  { no: '04', title: 'Corporate and explainer', on: 'Onboarding, a product launch, an annual report', length: '1:30' },
  { no: '05', title: 'E-learning', on: 'A compliance module, a medical device walkthrough', length: '2:05' },
  { no: '06', title: 'Promo and trailer', on: 'A local TV promo, a film festival trailer', length: '0:45' },
  { no: '07', title: 'Audiobook excerpt', on: 'Literary fiction, two characters and a narrator', length: '3:12' },
  { no: '08', title: 'Phone system', on: 'On-hold messages and menu prompts', length: '0:40' },
];

const BROADCAST = [
  ['Local radio or TV, :30 or :60', '13 weeks, one market', '$350'],
  ['Regional radio or TV', '13 weeks, up to five markets', '$750'],
  ['National radio or TV', '13 weeks, quoted per buy', 'from $2,500'],
  ['Online pre-roll and paid social', 'One year, all platforms', '$600'],
  ['Organic social only', 'Your own channels, in perpetuity', '$300'],
];

const NONBROADCAST = [
  ['Corporate narration', 'Up to five finished minutes, then $75 a minute', '$450'],
  ['Explainer video', 'Up to two minutes', '$400'],
  ['E-learning', 'Per finished minute, $300 minimum', '$110'],
  ['Phone system', 'First ten prompts, then $15 each', '$250'],
  ['Audiobook', 'Per finished hour, edited and mastered', '$300'],
  ['Podcast intro and outro', 'A pair, with two alternates', '$200'],
];

const RACK = [
  ['Booth', 'A 4 by 6 foot double-walled booth, measured at NC-15. No traffic, no fridge, no dog.'],
  ['Microphones', 'A large-diaphragm condenser for most reads, a short shotgun for promo and trailer.'],
  ['Signal chain', 'A clean Class A preamp into a 24-bit converter at 48 kHz. Nothing on the way in.'],
  ['Sessions', 'Directed live over a browser link or a phone patch, or self-directed from your notes.'],
  ['Delivery', 'WAV at 48 kHz and 24-bit, MP3 on request, edited and named to your script lines.'],
  ['Backup', 'A second recording rig and a battery bank. A power cut has never cost a deadline.'],
];

const CLIENTS = [
  'Brightline Credit Union',
  'Harrow & Vale Outfitters',
  'Copperleaf Coffee',
  'Northgate Health',
  'Tallow Hill Cider',
  'Meridian Learning',
  'Riverbend Public Radio',
  'Kestrel Motors',
  'Bluefin Aquarium',
  'Oakmoss Games',
  'Lumen Solar',
  'Fairweather Mutual',
];

const QUOTES = [
  ['Dex gave us six reads of one line in four minutes, and the third was the spot.', 'Producer, Copperleaf Coffee radio campaign'],
  ['Forty modules of compliance training and not one learner complained about the voice. That is a first.', 'Learning lead, Meridian Learning'],
];

const SESSION = [
  ['Audition', 'Send a script or a page of it. A custom audition comes back within two hours on a weekday, free.'],
  ['Book', 'We agree the usage and the rate in writing. New clients pay half up front.'],
  ['Record', 'Directed live, or I record from your notes with alternates on the lines that matter.'],
  ['Deliver', 'Edited, mastered files by nine the next morning. Same day for scripts under five minutes.'],
  ['Pickups', 'One round of changes is free when the script changes; my own mistakes are always free.'],
];

const HOURS = [
  ['Booth hours', 'Mon-Fri, 8:00-6:00 Eastern'],
  ['Auditions', 'Answered within two hours'],
  ['Rush sessions', 'Evenings and weekends, plus 50%'],
];

export default function DexMercerVoicePage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--studio': '#141418',
        '--chalk': '#efe8dc',
        '--signal': '#e5483d',
        '--amber': '#f0b23e',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="studio,chalk,signal,amber"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;600;700&family=JetBrains+Mono&display=swap"
      />

      <header className={s.bar}>
        <a className={s.brand} href="#top">
          <span data-edit="bar.brandName" data-edit-max="60" className={s.brandName}>Dex Mercer</span>
          <span data-edit="bar.onAir" data-edit-max="60" className={s.onAir}>On air</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barButton" data-edit-max="28" className={s.barButton} href="#contact">Request an audition</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The voice thrown out of the corner like rings from a cone. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div data-edit-pattern="hero.field" data-edit-roles="transparent,1,3,2" className={s.heroCone} aria-hidden="true">
            <TabbiedPattern
              pattern={polarfan}
              palette={CONE}
              fit="grid"
              cellSize={72}
              seed="dex-cone"
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
          <div className={s.heroText}>
            <p data-edit="hero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Voice-over artist, broadcast home studio</p>
            <h1 data-edit="hero.text" data-edit-format="emphasis" data-edit-max="70" id="hero-h" className={s.heroTitle}>
              Warm, low and <span>easy to believe.</span>
            </h1>
            <p data-edit="hero.heroLead" data-edit-max="240" data-edit-multiline className={s.heroLead}>
              I voice commercials, documentaries, explainers, e-learning and
              audiobooks from a treated booth behind my house. Auditions in two
              hours, finished files by the next morning, and the read you asked
              for on the first take more often than not.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.button" data-edit-max="28" className={s.button} href="#contact">Request an audition</a>
              <a data-edit="hero.ghost" data-edit-max="28" className={s.ghost} href="#rates">See the rate card</a>
            </div>
          </div>
          <div className={s.nowCard}>
            <p data-edit="hero.nowLabel" data-edit-max="240" data-edit-multiline className={s.nowLabel}>Last session</p>
            <p data-edit="hero.nowTitle" data-edit-max="240" data-edit-multiline className={s.nowTitle}>Kestrel Motors, spring sales event</p>
            <span className={s.wave} aria-hidden="true" />
            <p className={s.nowMeta}>
              <span data-edit="hero.text2" data-edit-max="60">Regional TV, :30</span>
              <span data-edit="hero.text3" data-edit-max="60">00:00:29:18</span>
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- REELS */}
        <section id="reels" className={s.sec} aria-labelledby="reels-h">
          <div className={s.secHead}>
            <p data-edit="reels.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Side A, eight reels</p>
            <h2 data-edit="reels.secTitle" data-edit-max="60" id="reels-h" className={s.secTitle}>Demo reels</h2>
            <p data-edit="reels.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Every reel is real work or a read of a real script, cut to its
              best minute or two. Ask and I will send any of them as a file, or
              play them down the line on a call.
            </p>
          </div>
          <ol className={s.reels}>
            {REELS.map((r, i) => (
              <li key={r.no} className={s.reel}>
                <span data-edit={`reels.reelNo.${i}`} data-edit-max="60" className={s.reelNo}>{r.no}</span>
                <div className={s.reelText}>
                  <h3 data-edit={`reels.reelTitle.${i}`} data-edit-max="40" className={s.reelTitle}>{r.title}</h3>
                  <p data-edit={`reels.reelOn.${i}`} data-edit-max="240" data-edit-multiline className={s.reelOn}>{r.on}</p>
                </div>
                <span className={s.reelWave} aria-hidden="true" />
                <span data-edit={`reels.reelLength.${i}`} data-edit-max="60" className={s.reelLength}>{r.length}</span>
              </li>
            ))}
          </ol>
          <p data-edit="reels.reelsNote" data-edit-max="240" data-edit-multiline className={s.reelsNote}>Total running time 12:00. Reels updated every spring.</p>
        </section>

        {/* ----------------------------------------------------------- RATES */}
        <section id="rates" className={s.ratesSec} aria-labelledby="rates-h">
          <div className={s.ratesInner}>
            <div className={s.secHead}>
              <p data-edit="rates.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Priced by where it runs</p>
              <h2 data-edit="rates.secTitle" data-edit-max="60" id="rates-h" className={s.secTitle}>Rates by usage</h2>
              <p data-edit="rates.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                You pay for how many people will hear it, not for how long I
                stand in the booth. Every rate includes editing, mastering and
                one round of script changes.
              </p>
            </div>
            <div className={s.desk}>
              <div className={s.channel}>
                <h3 data-edit="rates.channelTitle" data-edit-max="40" className={s.channelTitle}>Broadcast and paid</h3>
                <ul className={s.rates}>
                  {BROADCAST.map(([what, terms, price], i) => (
                    <li key={what} className={s.rate}>
                      <span data-edit={`rates.rateWhat.${i}`} data-edit-max="60" className={s.rateWhat}>{what}</span>
                      <span data-edit={`rates.rateTerms.${i}`} data-edit-max="60" className={s.rateTerms}>{terms}</span>
                      <span data-edit={`rates.ratePrice.${i}`} data-edit-max="60" className={s.ratePrice}>{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={s.channel}>
                <h3 data-edit="rates.channelTitle2" data-edit-max="40" className={s.channelTitle}>Non-broadcast</h3>
                <ul className={s.rates}>
                  {NONBROADCAST.map(([what, terms, price], i) => (
                    <li key={what} className={s.rate}>
                      <span data-edit={`rates.rateWhat2.${i}`} data-edit-max="60" className={s.rateWhat}>{what}</span>
                      <span data-edit={`rates.rateTerms2.${i}`} data-edit-max="60" className={s.rateTerms}>{terms}</span>
                      <span data-edit={`rates.ratePrice2.${i}`} data-edit-max="60" className={s.ratePrice}>{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p data-edit="rates.ratesNote" data-edit-max="240" data-edit-multiline className={s.ratesNote}>Union and non-union work. Renewals of a broadcast spot are 75% of the first fee.</p>
          </div>
        </section>

        <div data-edit-pattern="top.field" data-edit-roles="transparent,2,1,3" className={s.sweep} aria-hidden="true">
          <TabbiedPattern
            pattern={polarfan}
            palette={WAVE}
            fit="grid"
            cellSize={56}
            seed="dex-sweep"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* ---------------------------------------------------------- STUDIO */}
        <section id="studio" className={s.sec} aria-labelledby="studio-h">
          <div className={s.studioGrid}>
            <div>
              <p data-edit="studio.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Behind the house, Rook Street</p>
              <h2 data-edit="studio.secTitle" data-edit-max="60" id="studio-h" className={s.secTitle}>The home studio</h2>
              <p data-edit="studio.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Broadcast quality without the studio hire. Producers direct from
                their own desk; the files land in their inbox already cut.
              </p>
              <div data-edit-pattern="studio.field" data-edit-roles="transparent,3,1,1" className={s.speaker} aria-hidden="true">
                <TabbiedPattern
                  pattern={polarfan}
                  palette={GRILLE}
                  fit="grid"
                  cellSize={48}
                  seed="dex-speaker"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
            <ul className={s.rack}>
              {RACK.map(([unit, spec], i) => (
                <li key={unit} className={s.unit}>
                  <span className={s.screws} aria-hidden="true" />
                  <h3 data-edit={`studio.unitName.${i}`} data-edit-max="40" className={s.unitName}>{unit}</h3>
                  <p data-edit={`studio.unitSpec.${i}`} data-edit-max="240" data-edit-multiline className={s.unitSpec}>{spec}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- CLIENTS */}
        <section id="clients" className={s.sec} aria-labelledby="clients-h">
          <div className={s.secHead}>
            <p data-edit="clients.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Heard on</p>
            <h2 data-edit="clients.secTitle" data-edit-max="60" id="clients-h" className={s.secTitle}>Clients</h2>
          </div>
          <ul className={s.clients}>
            {CLIENTS.map((c, i) => (
              <li data-edit={`clients.item.${i}`} data-edit-max="80" key={c}>{c}</li>
            ))}
          </ul>
          <div className={s.quotes}>
            {QUOTES.map(([q, who], i) => (
              <blockquote key={who} className={s.quote}>
                <p data-edit={`clients.body.${i}`} data-edit-max="240" data-edit-multiline>{q}</p>
                <cite data-edit={`clients.attribution.${i}`} data-edit-max="48">{who}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- BOOKING */}
        <section id="booking" className={s.sec} aria-labelledby="booking-h">
          <div className={s.secHead}>
            <p data-edit="booking.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>From script to files</p>
            <h2 data-edit="booking.secTitle" data-edit-max="60" id="booking-h" className={s.secTitle}>How a booking works</h2>
          </div>
          <ol className={s.session}>
            {SESSION.map(([t, d], i) => (
              <li key={t} className={s.cue}>
                <span className={s.cueNo}>{`Cue ${i + 1}`}</span>
                <h3 data-edit={`booking.cueTitle.${i}`} data-edit-max="40" className={s.cueTitle}>{t}</h3>
                <p data-edit={`booking.cueText.${i}`} data-edit-max="240" data-edit-multiline className={s.cueText}>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------- CONTACT */}
        <section id="contact" className={s.contactSec} aria-labelledby="contact-h">
          <div className={s.contactGrid}>
            <div>
              <p data-edit="contact.secKicker" data-edit-max="240" data-edit-multiline className={s.secKicker}>Send a script</p>
              <h2 data-edit="contact.secTitle" data-edit-max="60" id="contact-h" className={s.secTitle}>Request an audition</h2>
              <p data-edit="contact.address" data-edit-max="240" data-edit-multiline className={s.address}>9 Rook Street, Studio B</p>
              <p data-edit="contact.addressNote" data-edit-max="240" data-edit-multiline className={s.addressNote}>Sessions are remote. Visits by appointment if you want to sit in.</p>
              <p className={s.contactLine}>
                <a data-edit="contact.link" data-edit-max="28" href="tel:+15550189045">(555) 018-9045</a>
              </p>
              <p className={s.contactLine}>
                <a data-edit="contact.link2" data-edit-max="28" href="mailto:booth@dexmercer.example">booth@dexmercer.example</a>
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
                <label data-edit="contact.label" htmlFor="dm-name">Name</label>
                <input id="dm-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label2" htmlFor="dm-company">Company or agency</label>
                <input id="dm-company" name="company" type="text" autoComplete="organization" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label3" htmlFor="dm-email">Email</label>
                <input id="dm-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="contact.label4" htmlFor="dm-date">Needed by</label>
                <input id="dm-date" name="deadline" type="date" />
              </div>
              <fieldset className={`${s.field} ${s.fieldWide} ${s.fieldset}`}>
                <legend data-edit="contact.legend">Kind of job</legend>
                <div className={s.picks}>
                  <input id="dm-k1" type="radio" name="kind" value="commercial" />
                  <label data-edit="contact.label5" htmlFor="dm-k1">Commercial</label>
                  <input id="dm-k2" type="radio" name="kind" value="narration" />
                  <label data-edit="contact.label6" htmlFor="dm-k2">Narration</label>
                  <input id="dm-k3" type="radio" name="kind" value="elearning" />
                  <label data-edit="contact.label7" htmlFor="dm-k3">E-learning</label>
                  <input id="dm-k4" type="radio" name="kind" value="audiobook" />
                  <label data-edit="contact.label8" htmlFor="dm-k4">Audiobook</label>
                  <input id="dm-k5" type="radio" name="kind" value="other" />
                  <label data-edit="contact.label9" htmlFor="dm-k5">Something else</label>
                </div>
              </fieldset>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="contact.label10" htmlFor="dm-script">Paste the script, or a page of it, and where it will run</label>
                <textarea id="dm-script" name="script" rows={5} />
              </div>
              <button data-edit="contact.submit" data-edit-max="24" className={s.submit} type="submit">Send for audition</button>
              <p data-edit="contact.formNote" data-edit-max="240" data-edit-multiline className={s.formNote}>An audition comes back within two hours on a weekday.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,1,3,2" className={s.footCone} aria-hidden="true">
          <TabbiedPattern
            pattern={polarfan}
            palette={CONE}
            fit="grid"
            cellSize={40}
            seed="dex-foot"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Dex Mercer</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional voice-over artist. The clients, reels, rates and address are invented.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
