import { TabbiedPattern } from 'tabbied/react';
import { stipplefade, ribline, basse, dotmatrix, fadedbar } from 'tabbied/patterns';
import s from './loudhouse-podcast.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Loudhouse: Podcast recording studio, Eastgate',
  description:
    'Loudhouse is a podcast studio at 3 Foundry Mews, Eastgate: two treated rooms and a video set, hourly and day rates with an engineer, editing and mixing, remote guests and a launch package for new shows.',
};

/* Site colors: the console's dark ground, the white of the UI, the clip
   light, the teal of a waveform and the yellow of the meters. */
const CONSOLE = '#16181d';
const WHITE = '#e9eaee';
const CLIP = '#f25f3a';
const WAVES = '#5ad1c8';
const METER = '#f2c744';

/* The lead: an even stipple thinning to nothing, like a waveform's body. */
const STIPPLE = ['transparent', WAVES, WHITE, CLIP, WAVES, METER];
/* The mic, cut out of the stipple on a teal ground. */
const MIC_FIELD = [WAVES, CONSOLE, CLIP, CONSOLE, METER];
/* Ribbed lines behind the room clips. */
const RIBS = ['transparent', WAVES, WHITE, METER];
/* Bars fading out: the edit's waveform. */
const BARS = ['transparent', CLIP, METER, WAVES, WHITE];
/* A dot-matrix display behind the show list. */
const DOTS = ['transparent', WHITE, WAVES, METER];
/* The stipple again on the booking clip. */
const TAKE = ['transparent', CLIP, METER, WHITE];
/* Faded bars along the foot. */
const FADE = ['transparent', WAVES, CLIP, METER, WHITE];

const NAV = [
  ['Rooms', '#rooms'],
  ['Rates', '#rates'],
  ['Editing', '#editing'],
  ['Remote', '#remote'],
  ['Launch', '#launch'],
  ['Shows', '#shows'],
];

const RULER = ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'];

type Room = {
  name: string;
  tag: string;
  body: string;
  specs: string[];
  price: string;
  tone: 'clip' | 'waves' | 'meter';
  span: string;
};

const ROOMS: Room[] = [
  {
    name: 'Studio A',
    tag: 'studio_a.wav',
    body: 'Four mics round a round table, for panel shows and interviews. Shure SM7Bs on boom arms, a RodeCaster desk, headphones at every seat and a window onto the mews.',
    specs: ['4 mics', 'Seats 4-5', '22 sq m'],
    price: 'From $65 an hour',
    tone: 'clip',
    span: 'wide',
  },
  {
    name: 'Studio B',
    tag: 'booth_b.wav',
    body: 'The booth, for one or two: narration, audiobooks, solo shows and voiceover. Dead quiet, and warm enough to sit in all afternoon.',
    specs: ['2 mics', 'Seats 2', '9 sq m'],
    price: 'From $40 an hour',
    tone: 'waves',
    span: 'narrow',
  },
  {
    name: 'The video set',
    tag: 'video_set.mov',
    body: 'Three 4K cameras on a curved desk, a vision mixer, soft key light and a backdrop in any of six colors. Social cuts come back the next day.',
    specs: ['3 cameras', 'Seats 3', '30 sq m'],
    price: 'From $110 an hour',
    tone: 'meter',
    span: 'mid',
  },
];

type RateRow = { room: string; hour: string; half: string; day: string };

const RATES: RateRow[] = [
  { room: 'Studio A', hour: '$65', half: '$220', day: '$400' },
  { room: 'Studio B', hour: '$40', half: '$140', day: '$260' },
  { room: 'Video set', hour: '$110', half: '$380', day: '$700' },
];

type Edit = { name: string; body: string; price: string; per: string };

const EDITS: Edit[] = [
  { name: 'Clean edit', body: 'The ums, the false starts, the doorbell and the cough, taken out so it still sounds like you on a good day.', price: '$60', per: 'per finished hour' },
  { name: 'Edit and mix', body: 'Levels matched between voices, noise reduced, music beds and stings laid in, mastered to -16 LUFS.', price: '$110', per: 'per episode' },
  { name: 'Notes and transcript', body: 'Timestamps, links and a full transcript for the episode page, checked by a person.', price: '$25', per: 'per episode' },
];

const MARKERS = [
  ['Cut', '14%'],
  ['Cut', '37%'],
  ['Fade', '58%'],
  ['Cut', '81%'],
];

type Remote = { name: string; body: string; price: string };

const REMOTES: Remote[] = [
  { name: 'Guest kit by courier', body: 'A mic, closed headphones and a recorder, sent out the day before and collected the day after.', price: '$45 a kit' },
  { name: 'Double-ender in the browser', body: 'Each voice records on its own machine and uploads as it goes. Our engineer listens in and nudges levels.', price: '$20 a guest' },
  { name: 'Studio to studio', body: 'We patch Studio A to another studio anywhere with a decent line, so both ends sound like a room.', price: 'From $30' },
];

type Stage = { week: string; name: string; body: string; tone: 'clip' | 'waves' | 'meter' };

const LAUNCH: Stage[] = [
  { week: 'Week 1', name: 'Artwork', body: 'A 3000 x 3000 cover that still reads at thumbnail size, with three rounds of changes.', tone: 'meter' },
  { week: 'Week 2', name: 'Trailer', body: 'Ninety seconds, written with you, voiced in Studio A, scored and mixed.', tone: 'clip' },
  { week: 'Week 3', name: 'RSS and listings', body: 'Hosting set up, the feed checked and the show listed on Apple, Spotify and the rest.', tone: 'waves' },
];

type Show = { name: string; about: string; eps: string; cover: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' };

const SHOWS: Show[] = [
  { name: 'Kettle and Crumb', about: 'Two bakers, one oven, every Thursday', eps: '112 episodes', cover: 'a' },
  { name: 'Eastgate After Dark', about: 'The town\'s history, told at night', eps: '48 episodes', cover: 'b' },
  { name: 'Offside Rule', about: 'Non-league football, argued properly', eps: '210 episodes', cover: 'c' },
  { name: 'Small Claims', about: 'A solicitor answers your letters', eps: '36 episodes', cover: 'd' },
  { name: 'Second Shift', about: 'Nurses, bakers and night porters', eps: '64 episodes', cover: 'e' },
  { name: 'The Long Commute', about: 'Interviews recorded on the 07:12', eps: '29 episodes', cover: 'f' },
];

export default function LoudhousePodcastPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--console': '#16181d',
        '--white': '#e9eaee',
        '--clip': '#f25f3a',
        '--waves': '#5ad1c8',
        '--meter': '#f2c744',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="console,white,clip,waves,meter"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Sometype+Mono:wght@400..700&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.recDot} aria-hidden="true" />
          <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Loudhouse</span>
        </a>
        <div className={s.transport} aria-hidden="true">
          <span className={s.tRew} />
          <span className={s.tPlay} />
          <span className={s.tStop} />
          <span className={s.tRec} />
        </div>
        <p data-edit="bar.body" data-edit-max="240" data-edit-multiline className={s.timecode} aria-hidden="true">00:14:32:08</p>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a data-edit="bar.barCta" data-edit-max="28" className={s.barCta} href="#book">Book a session</a>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The session: a timecode ruler, the master bus, and the first clip
            on the timeline with the playhead running through it. */}
        <section className={s.hero} aria-labelledby="lh-hero-h">
          <div className={s.ruler} aria-hidden="true">
            <span data-edit="lhHero.rulerCorner" data-edit-max="60" className={s.rulerCorner}>Bars / TC</span>
            <span className={s.rulerTrack}>
              {RULER.map((t, i) => (
                <span data-edit={`lhHero.rulerMark.${i}`} data-edit-max="60" key={t} className={s.rulerMark}>{t}</span>
              ))}
            </span>
          </div>

          <span className={s.playhead} aria-hidden="true" />

          <div className={s.heroGrid}>
            <div className={s.master}>
              <p data-edit="lhHero.headLabel" data-edit-max="240" data-edit-multiline className={s.headLabel}>Session</p>
              <p data-edit="lhHero.sessionName" data-edit-max="240" data-edit-multiline className={s.sessionName}>Loudhouse</p>
              <dl className={s.sessionFacts}>
                <div>
                  <dt data-edit="lhHero.term" data-edit-max="28">Rate</dt>
                  <dd data-edit="lhHero.body" data-edit-max="200" data-edit-multiline>48 kHz / 24-bit</dd>
                </div>
                <div>
                  <dt data-edit="lhHero.term2" data-edit-max="28">Armed</dt>
                  <dd data-edit="lhHero.body2" data-edit-max="200" data-edit-multiline>4 tracks</dd>
                </div>
                <div>
                  <dt data-edit="lhHero.term3" data-edit-max="28">Room</dt>
                  <dd data-edit="lhHero.body3" data-edit-max="200" data-edit-multiline>Studio A</dd>
                </div>
              </dl>
              <div className={s.masterMeters} aria-hidden="true">
                <span className={s.vMeter} style={{ '--l': '78%' } as React.CSSProperties} />
                <span className={s.vMeter} style={{ '--l': '71%' } as React.CSSProperties} />
                <span className={s.vScale}>
                  <span data-edit="lhHero.text" data-edit-max="60">0</span>
                  <span data-edit="lhHero.text2" data-edit-max="60">-6</span>
                  <span data-edit="lhHero.text3" data-edit-max="60">-12</span>
                  <span data-edit="lhHero.text4" data-edit-max="60">-24</span>
                  <span data-edit="lhHero.text5" data-edit-max="60">-48</span>
                </span>
              </div>
              <p data-edit="lhHero.headLabel2" data-edit-max="240" data-edit-multiline className={s.headLabel}>Master</p>
            </div>

            <div className={s.heroLane}>
              <div data-edit-pattern="lhHero.field" data-edit-roles="transparent,3,1,2,3,4" className={s.stipple} aria-hidden="true">
                <TabbiedPattern
                  pattern={stipplefade}
                  palette={STIPPLE}
                  fit="grid"
                  cellSize={40}
                  seed="loudhouse-stipple"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.heroClip}>
                <p data-edit="lhHero.clipName" data-edit-max="240" data-edit-multiline className={s.clipName}>loudhouse_intro.wav</p>
                <div className={s.heroBody}>
                  <p data-edit="lhHero.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Podcast recording studio, Eastgate</p>
                  <h1 data-edit="lhHero.name" data-edit-max="70" id="lh-hero-h" className={s.name}>Loudhouse</h1>
                  <p data-edit="lhHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
                    Two treated rooms, a video set and an engineer who has sat
                    through four hundred first episodes. Bring the voices; we
                    handle the rest, from the first level check to the RSS
                    feed.
                  </p>
                  <div className={s.heroActions}>
                    <a data-edit="lhHero.btnRec" data-edit-max="28" className={s.btnRec} href="#book">Book a session</a>
                    <a data-edit="lhHero.btnLine" data-edit-max="28" className={s.btnLine} href="#rooms">See the rooms</a>
                  </div>
                </div>
              </div>

              <figure className={s.micFig}>
                <div className={s.micBox}>
                  <Artwork data-edit-pattern="lhHero.field2" data-edit-roles="3,0,2,0,4"
                    slug="loudhouse-podcast-mic"
                    alt=""
                    mode="fill"
                    inks={[]}
                    className={s.micFill}
                  >
                    <TabbiedPattern
                      pattern={stipplefade}
                      palette={MIC_FIELD}
                      fit="grid"
                      cellSize={18}
                      seed="loudhouse-mic"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </Artwork>
                  <Artwork
                    slug="loudhouse-podcast-mic"
                    alt="A broadcast microphone on a jointed boom arm, with a round pop filter in front of it"
                    mode="tint"
                    inks={['var(--console)', 'var(--text)']}
                    className={s.micTint}
                  />
                </div>
                <figcaption data-edit="lhHero.micCap" data-edit-max="120" data-edit-multiline className={s.micCap}>Studio A, mic one of four</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROOMS */}
        <section id="rooms" className={s.track} aria-labelledby="lh-rooms-h">
          <div className={s.trackHead}>
            <p data-edit="rooms.trackNum" data-edit-max="240" data-edit-multiline className={s.trackNum}>01</p>
            <h2 data-edit="rooms.trackName" data-edit-max="60" id="lh-rooms-h" className={s.trackName}>The rooms</h2>
            <p className={s.ms} aria-hidden="true">
              <span data-edit="rooms.text" data-edit-max="60">M</span>
              <span data-edit="rooms.soloOn" data-edit-max="60" className={s.soloOn}>S</span>
              <span data-edit="rooms.armOn" data-edit-max="60" className={s.armOn}>R</span>
            </p>
            <span className={s.fader} style={{ '--f': '68%' } as React.CSSProperties} aria-hidden="true" />
            <span className={s.hMeters} style={{ '--l': '72%', '--r': '66%' } as React.CSSProperties} aria-hidden="true" />
          </div>
          <div className={s.lane}>
            <div data-edit-pattern="rooms.field" data-edit-roles="transparent,3,1,4" className={s.ribs} aria-hidden="true">
              <TabbiedPattern
                pattern={ribline}
                palette={RIBS}
                options={{ frequency: 0.5 }}
                fit="grid"
                cellSize={34}
                seed="loudhouse-ribs"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <ul className={s.roomClips}>
              {ROOMS.map((r, i) => (
                <li key={r.name} className={`${s.clip} ${s[`tone_${r.tone}`]} ${s[`span_${r.span}`]}`}>
                  <p data-edit={`rooms.clipName.${i}`} data-edit-max="240" data-edit-multiline className={s.clipName}>{r.tag}</p>
                  <div className={s.clipBody}>
                    <h3 data-edit={`rooms.clipTitle.${i}`} data-edit-max="40" className={s.clipTitle}>{r.name}</h3>
                    <p data-edit={`rooms.clipText.${i}`} data-edit-max="240" data-edit-multiline className={s.clipText}>{r.body}</p>
                    <ul className={s.specs}>
                      {r.specs.map((sp, i2) => (
                        <li data-edit={`rooms.item.${i}.${i2}`} data-edit-max="80" key={sp}>{sp}</li>
                      ))}
                    </ul>
                    <p data-edit={`rooms.clipPrice.${i}`} data-edit-max="240" data-edit-multiline className={s.clipPrice}>{r.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- RATES
            One sub-lane per room; each clip is as long as the booking. */}
        <section id="rates" className={s.track} aria-labelledby="lh-rates-h">
          <div className={s.trackHead}>
            <p data-edit="rates.trackNum" data-edit-max="240" data-edit-multiline className={s.trackNum}>02</p>
            <h2 data-edit="rates.trackName" data-edit-max="60" id="lh-rates-h" className={s.trackName}>Rates</h2>
            <p className={s.ms} aria-hidden="true">
              <span data-edit="rates.text" data-edit-max="60">M</span>
              <span data-edit="rates.text2" data-edit-max="60">S</span>
              <span data-edit="rates.text3" data-edit-max="60">R</span>
            </p>
            <span className={s.fader} style={{ '--f': '54%' } as React.CSSProperties} aria-hidden="true" />
            <span className={s.hMeters} style={{ '--l': '58%', '--r': '61%' } as React.CSSProperties} aria-hidden="true" />
          </div>
          <div className={`${s.lane} ${s.laneGrid}`}>
            <p data-edit="rates.laneNote" data-edit-max="240" data-edit-multiline className={s.laneNote}>
              A booking is as long as the clip: an hour, half a day (four
              hours) or a full day (eight). Every session ends with every
              track as WAV, the same day.
            </p>
            <ol className={s.rateScale} aria-hidden="true">
              <li data-edit="rates.item" data-edit-max="80">1 h</li>
              <li data-edit="rates.item2" data-edit-max="80">2 h</li>
              <li data-edit="rates.item3" data-edit-max="80">3 h</li>
              <li data-edit="rates.item4" data-edit-max="80">4 h</li>
              <li data-edit="rates.item5" data-edit-max="80">5 h</li>
              <li data-edit="rates.item6" data-edit-max="80">6 h</li>
              <li data-edit="rates.item7" data-edit-max="80">7 h</li>
              <li data-edit="rates.item8" data-edit-max="80">8 h</li>
            </ol>
            <ul className={s.rateRows}>
              {RATES.map((r, i) => (
                <li key={r.room} className={s.rateRow}>
                  <p data-edit={`rates.rateRoom.${i}`} data-edit-max="240" data-edit-multiline className={s.rateRoom}>{r.room}</p>
                  <div className={s.rateTakes}>
                    <p className={`${s.take} ${s.takeHour}`}>
                      <span data-edit={`rates.takeLabel.${i}`} data-edit-max="60" className={s.takeLabel}>Hour</span>
                      <strong data-edit={`rates.takePrice.${i}`} className={s.takePrice}>{r.hour}</strong>
                    </p>
                    <p className={`${s.take} ${s.takeHalf}`}>
                      <span data-edit={`rates.takeLabel2.${i}`} data-edit-max="60" className={s.takeLabel}>Half day</span>
                      <strong data-edit={`rates.takePrice2.${i}`} className={s.takePrice}>{r.half}</strong>
                    </p>
                    <p className={`${s.take} ${s.takeDay}`}>
                      <span data-edit={`rates.takeLabel3.${i}`} data-edit-max="60" className={s.takeLabel}>Day</span>
                      <strong data-edit={`rates.takePrice3.${i}`} className={s.takePrice}>{r.day}</strong>
                    </p>
                  </div>
                </li>
              ))}
              <li className={`${s.rateRow} ${s.rateEng}`}>
                <p data-edit="rates.rateRoom2" data-edit-max="240" data-edit-multiline className={s.rateRoom}>Engineer</p>
                <div className={s.rateTakes}>
                  <p className={`${s.take} ${s.takeEng}`}>
                    <span data-edit="rates.takeLabel4" data-edit-max="60" className={s.takeLabel}>With any room</span>
                    <strong data-edit="rates.takePrice4" className={s.takePrice}>$35 an hour, or $240 a day</strong>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- EDITING */}
        <section id="editing" className={s.track} aria-labelledby="lh-edit-h">
          <div className={s.trackHead}>
            <p data-edit="editing.trackNum" data-edit-max="240" data-edit-multiline className={s.trackNum}>03</p>
            <h2 data-edit="editing.trackName" data-edit-max="60" id="lh-edit-h" className={s.trackName}>Editing and mixing</h2>
            <p className={s.ms} aria-hidden="true">
              <span data-edit="editing.muteOn" data-edit-max="60" className={s.muteOn}>M</span>
              <span data-edit="editing.text" data-edit-max="60">S</span>
              <span data-edit="editing.text2" data-edit-max="60">R</span>
            </p>
            <span className={s.fader} style={{ '--f': '76%' } as React.CSSProperties} aria-hidden="true" />
            <span className={s.hMeters} style={{ '--l': '84%', '--r': '80%' } as React.CSSProperties} aria-hidden="true" />
          </div>
          <div className={s.lane}>
            <div className={s.editWave}>
              <div data-edit-pattern="editing.field" data-edit-roles="transparent,2,4,3,1" className={s.bars} aria-hidden="true">
                <TabbiedPattern
                  pattern={basse}
                  palette={BARS}
                  fit="grid"
                  cellSize={30}
                  seed="loudhouse-bars"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <p data-edit="editing.clipName" data-edit-max="240" data-edit-multiline className={s.clipName}>episode_041_raw.wav, 58:12 in, 44:30 out</p>
              <ul className={s.markers} aria-hidden="true">
                {MARKERS.map(([label, at], i) => (
                  <li key={at} style={{ '--at': at } as React.CSSProperties}>
                    <span data-edit={`editing.text3.${i}`} data-edit-max="60">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className={s.editList}>
              {EDITS.map((e, i) => (
                <li key={e.name} className={`${s.clip} ${s.tone_clip}`}>
                  <p data-edit={`editing.clipName2.${i}`} data-edit-max="240" data-edit-multiline className={s.clipName}>{e.name}</p>
                  <div className={s.clipBody}>
                    <p data-edit={`editing.clipText.${i}`} data-edit-max="240" data-edit-multiline className={s.clipText}>{e.body}</p>
                    <p className={s.editPrice}>
                      <strong data-edit={`editing.emphasis.${i}`}>{e.price}</strong>
                      <span data-edit={`editing.text4.${i}`} data-edit-max="60">{e.per}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p data-edit="editing.laneNote" data-edit-max="240" data-edit-multiline className={s.laneNote}>
              Back in three working days, or in 24 hours for $40 more. Two
              rounds of notes on every episode.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- REMOTE */}
        <section id="remote" className={s.track} aria-labelledby="lh-remote-h">
          <div className={s.trackHead}>
            <p data-edit="remote.trackNum" data-edit-max="240" data-edit-multiline className={s.trackNum}>04</p>
            <h2 data-edit="remote.trackName" data-edit-max="60" id="lh-remote-h" className={s.trackName}>Remote recording</h2>
            <Artwork slug="loudhouse-podcast-headphones" alt="" inks={['var(--waves)']} className={s.trackIcon} />
            <p className={s.ms} aria-hidden="true">
              <span data-edit="remote.text" data-edit-max="60">M</span>
              <span data-edit="remote.text2" data-edit-max="60">S</span>
              <span data-edit="remote.armOn" data-edit-max="60" className={s.armOn}>R</span>
            </p>
            <span className={s.fader} style={{ '--f': '60%' } as React.CSSProperties} aria-hidden="true" />
            <span className={s.hMeters} style={{ '--l': '46%', '--r': '52%' } as React.CSSProperties} aria-hidden="true" />
          </div>
          <div className={s.lane}>
            <div className={s.remoteGrid}>
              <div className={`${s.clip} ${s.tone_waves} ${s.phonesClip}`}>
                <p data-edit="remote.clipName" data-edit-max="240" data-edit-multiline className={s.clipName}>guest_line_in.wav</p>
                <div className={s.phonesBody}>
                  <Artwork
                    slug="loudhouse-podcast-headphones"
                    alt="A pair of closed studio headphones"
                    inks={['var(--phones)']}
                    className={s.phones}
                  />
                  <p data-edit="remote.phonesCap" data-edit-max="240" data-edit-multiline className={s.phonesCap}>Guests anywhere, sounding like they are in the room</p>
                </div>
              </div>
              <ul className={s.remoteList}>
                {REMOTES.map((r, i) => (
                  <li key={r.name} className={`${s.clip} ${s.tone_waves}`}>
                    <p data-edit={`remote.clipName2.${i}`} data-edit-max="240" data-edit-multiline className={s.clipName}>{r.price}</p>
                    <div className={s.clipBody}>
                      <h3 data-edit={`remote.clipTitle.${i}`} data-edit-max="40" className={s.clipTitle}>{r.name}</h3>
                      <p data-edit={`remote.clipText.${i}`} data-edit-max="240" data-edit-multiline className={s.clipText}>{r.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- LAUNCH */}
        <section id="launch" className={s.track} aria-labelledby="lh-launch-h">
          <div className={s.trackHead}>
            <p data-edit="launch.trackNum" data-edit-max="240" data-edit-multiline className={s.trackNum}>05</p>
            <h2 data-edit="launch.trackName" data-edit-max="60" id="lh-launch-h" className={s.trackName}>Launch package</h2>
            <p className={s.ms} aria-hidden="true">
              <span data-edit="launch.text" data-edit-max="60">M</span>
              <span data-edit="launch.soloOn" data-edit-max="60" className={s.soloOn}>S</span>
              <span data-edit="launch.text2" data-edit-max="60">R</span>
            </p>
            <span className={s.fader} style={{ '--f': '70%' } as React.CSSProperties} aria-hidden="true" />
            <span className={s.hMeters} style={{ '--l': '66%', '--r': '70%' } as React.CSSProperties} aria-hidden="true" />
          </div>
          <div className={s.lane}>
            <div className={s.launchHead}>
              <p className={s.launchPrice}>
                <strong data-edit="launch.emphasis">$1,450</strong>
                <span data-edit="launch.text3" data-edit-max="60">for a new show, start to first episode</span>
              </p>
              <p data-edit="launch.laneNote" data-edit-max="240" data-edit-multiline className={s.laneNote}>
                Three weeks from a name to a show you can search for, with two
                recording sessions in Studio A included.
              </p>
            </div>
            <ol className={s.arrange}>
              {LAUNCH.map((st, i) => (
                <li key={st.name} className={`${s.clip} ${s[`tone_${st.tone}`]}`}>
                  <p data-edit={`launch.clipName.${i}`} data-edit-max="240" data-edit-multiline className={s.clipName}>{st.week}</p>
                  <div className={s.clipBody}>
                    <h3 data-edit={`launch.clipTitle.${i}`} data-edit-max="40" className={s.clipTitle}>{st.name}</h3>
                    <p data-edit={`launch.clipText.${i}`} data-edit-max="240" data-edit-multiline className={s.clipText}>{st.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- SHOWS */}
        <section id="shows" className={s.track} aria-labelledby="lh-shows-h">
          <div className={s.trackHead}>
            <p data-edit="shows.trackNum" data-edit-max="240" data-edit-multiline className={s.trackNum}>06</p>
            <h2 data-edit="shows.trackName" data-edit-max="60" id="lh-shows-h" className={s.trackName}>Shows recorded here</h2>
            <p className={s.ms} aria-hidden="true">
              <span data-edit="shows.text" data-edit-max="60">M</span>
              <span data-edit="shows.text2" data-edit-max="60">S</span>
              <span data-edit="shows.text3" data-edit-max="60">R</span>
            </p>
            <span className={s.fader} style={{ '--f': '64%' } as React.CSSProperties} aria-hidden="true" />
            <span className={s.hMeters} style={{ '--l': '62%', '--r': '57%' } as React.CSSProperties} aria-hidden="true" />
          </div>
          <div className={s.lane}>
            <div data-edit-pattern="shows.field" data-edit-roles="transparent,1,3,4" className={s.dots} aria-hidden="true">
              <TabbiedPattern
                pattern={dotmatrix}
                palette={DOTS}
                options={{ frequency: 0.6 }}
                fit="grid"
                cellSize={36}
                seed="loudhouse-dots"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <ul className={s.shows}>
              {SHOWS.map((sh, i) => (
                <li key={sh.name} className={s.show}>
                  <span className={`${s.cover} ${s[`cover_${sh.cover}`]}`} aria-hidden="true" />
                  <div className={s.showText}>
                    <h3 data-edit={`shows.showName.${i}`} data-edit-max="40" className={s.showName}>{sh.name}</h3>
                    <p data-edit={`shows.showAbout.${i}`} data-edit-max="240" data-edit-multiline className={s.showAbout}>{sh.about}</p>
                    <p data-edit={`shows.showEps.${i}`} data-edit-max="240" data-edit-multiline className={s.showEps}>{sh.eps}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK */}
        <section id="book" className={s.track} aria-labelledby="lh-book-h">
          <div className={s.trackHead}>
            <p data-edit="book.trackNum" data-edit-max="240" data-edit-multiline className={s.trackNum}>07</p>
            <h2 data-edit="book.trackName" data-edit-max="60" id="lh-book-h" className={s.trackName}>Book a session</h2>
            <p className={s.ms} aria-hidden="true">
              <span data-edit="book.text" data-edit-max="60">M</span>
              <span data-edit="book.text2" data-edit-max="60">S</span>
              <span data-edit="book.armOn" data-edit-max="60" className={s.armOn}>R</span>
            </p>
            <span className={s.fader} style={{ '--f': '80%' } as React.CSSProperties} aria-hidden="true" />
            <span className={s.hMeters} style={{ '--l': '88%', '--r': '85%' } as React.CSSProperties} aria-hidden="true" />
          </div>
          <div className={s.lane}>
            <div className={s.bookGrid}>
              <div className={s.bookSide}>
                <div data-edit-pattern="book.field" data-edit-roles="transparent,2,4,1" className={s.take2} aria-hidden="true">
                  <TabbiedPattern
                    pattern={stipplefade}
                    palette={TAKE}
                    fit="grid"
                    cellSize={26}
                    seed="loudhouse-take"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <div className={s.bookInfo}>
                  <p data-edit="book.address" data-edit-max="240" data-edit-multiline className={s.address}>3 Foundry Mews, Eastgate</p>
                  <p data-edit="book.bookText" data-edit-max="240" data-edit-multiline className={s.bookText}>
                    Through the arch off Foundry Street, the green door with the
                    red light over it. When the light is on, we are recording:
                    knock softly.
                  </p>
                  <dl className={s.hours}>
                    <div>
                      <dt data-edit="book.term" data-edit-max="28">Weekdays</dt>
                      <dd data-edit="book.body" data-edit-max="200" data-edit-multiline>08:00-22:00</dd>
                    </div>
                    <div>
                      <dt data-edit="book.term2" data-edit-max="28">Weekends</dt>
                      <dd data-edit="book.body2" data-edit-max="200" data-edit-multiline>10:00-18:00</dd>
                    </div>
                  </dl>
                  <p className={s.contact}>
                    <a data-edit="book.link" data-edit-max="28" href="tel:+15550164410">(555) 016-4410</a>
                  </p>
                  <p className={s.contact}>
                    <a data-edit="book.link2" data-edit-max="28" href="mailto:book@loudhouse.example">book@loudhouse.example</a>
                  </p>
                </div>
              </div>
              <form className={`${s.clip} ${s.tone_clip} ${s.form}`} action="#">
                <p data-edit="book.clipName" data-edit-max="240" data-edit-multiline className={s.clipName}>new_booking.session</p>
                <div className={s.formGrid}>
                  <div className={s.field}>
                    <label data-edit="book.label" htmlFor="lh-name">Name</label>
                    <input id="lh-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label2" htmlFor="lh-email">Email</label>
                    <input id="lh-email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label3" htmlFor="lh-show">Show name</label>
                    <input id="lh-show" name="show" type="text" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label4" htmlFor="lh-room">Room</label>
                    <select id="lh-room" name="room" defaultValue="a">
                      <option value="a">Studio A, four mics</option>
                      <option value="b">Studio B, the booth</option>
                      <option value="v">The video set</option>
                    </select>
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label5" htmlFor="lh-date">Date</label>
                    <input id="lh-date" name="date" type="date" />
                  </div>
                  <div className={s.field}>
                    <label data-edit="book.label6" htmlFor="lh-length">Length</label>
                    <select id="lh-length" name="length" defaultValue="2">
                      <option value="1">One hour</option>
                      <option value="2">Two hours</option>
                      <option value="4">Half day, four hours</option>
                      <option value="8">Full day, eight hours</option>
                    </select>
                  </div>
                  <div className={`${s.check} ${s.fieldWide}`}>
                    <input id="lh-engineer" name="engineer" type="checkbox" defaultChecked />
                    <label data-edit="book.label7" htmlFor="lh-engineer">Add an engineer ($35 an hour)</label>
                  </div>
                  <div className={`${s.field} ${s.fieldWide}`}>
                    <label data-edit="book.label8" htmlFor="lh-notes">Guests, format, anything else</label>
                    <textarea id="lh-notes" name="notes" rows={3} />
                  </div>
                </div>
                <button data-edit="book.btnRec" data-edit-max="24" className={s.btnRec} type="submit">Hold the room</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="transparent,3,2,4,1" className={s.fade} aria-hidden="true">
          <TabbiedPattern
            pattern={fadedbar}
            palette={FADE}
            fit="grid"
            cellSize={36}
            seed="loudhouse-fade"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p className={s.footName}>
            <span className={s.recDot} aria-hidden="true" />
            <span data-edit="footer.text" data-edit-max="60">Loudhouse</span>
          </p>
          <p data-edit="footer.footSmall" data-edit-max="240" data-edit-multiline className={s.footSmall}>3 Foundry Mews, Eastgate. Weekdays 08:00-22:00, weekends 10:00-18:00.</p>
          <p data-edit="footer.footSmall2" data-edit-max="240" data-edit-multiline className={s.footSmall}>A fictional podcast studio; the rooms, rates and shows are invented.</p>
          <p className={s.footSmall}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footSmall3" data-edit-max="240" data-edit-multiline className={s.footSmall}>The microphone and the headphones are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
