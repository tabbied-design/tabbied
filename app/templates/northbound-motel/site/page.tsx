import { TabbiedPattern } from 'tabbied/react';
import { beamspread, bengaline, horizonbands, sunsetrings } from 'tabbied/patterns';
import s from './northbound-motel.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Northbound Motel: Roadside motel on Highway 9, Red Mesa Junction',
  description:
    'Twenty-four rooms, a pool, lawn chairs outside every door and the diner next door, on Highway 9 at Red Mesa Junction. Rooms and rates, what is nearby, house rules and booking.',
};

/* Site colors. The pattern is the sky: wide beams thrown up from the
   horizon behind the mesas, where the photograph's sky is empty. The pool
   on its postcard, the desert under the distance sign, the rings on the
   wall behind the registration desk and the last of the sunset at the foot
   of the page are all fields in the same colors. */
const SAND = '#f4e5cd';
const TEAL = '#1c7c84';
const SUNSET = '#f17a35';
const PINK = '#e75b7e';
const BROWN = '#3a2a1f';

const SKY = ['transparent', PINK, SUNSET, SAND, PINK, SUNSET];
const POOL = [TEAL, SAND, TEAL, SAND, PINK, SAND];
const DESERT = ['transparent', SUNSET, PINK, BROWN, SAND, SAND];
const WALL = [BROWN, SUNSET, PINK, TEAL, SAND];
const DUSK = [PINK, SUNSET, SAND, PINK, SUNSET, BROWN];

const NAV = [
  ['Rooms', '#rooms'],
  ['Postcards', '#postcards'],
  ['Nearby', '#nearby'],
  ['Good to know', '#know'],
  ['Book', '#book'],
  ['Find us', '#find'],
];

type Room = {
  no: string;
  tone: string;
  name: string;
  beds: string;
  sleeps: string;
  extras: string[];
  rate: string;
  weekly: string;
};

const ROOMS: Room[] = [
  {
    no: '4',
    tone: 'fobPink',
    name: 'The King',
    beds: 'One king bed',
    sleeps: 'Sleeps 2',
    extras: ['Door onto the pool', 'Mini fridge and coffee maker', 'Two chairs outside'],
    rate: '$84',
    weekly: '$470 a week',
  },
  {
    no: '11',
    tone: 'fobTeal',
    name: 'Two Queens',
    beds: 'Two queen beds',
    sleeps: 'Sleeps 4',
    extras: ['Mesa-side, the quiet end', 'Mini fridge and microwave', 'Parking at your door'],
    rate: '$96',
    weekly: '$540 a week',
  },
  {
    no: '20',
    tone: 'fobSunset',
    name: 'The Family Suite',
    beds: 'A king and two bunks',
    sleeps: 'Sleeps 5',
    extras: ['Two rooms and a door between', 'Kitchenette with a two-ring stove', 'Crib and games on request'],
    rate: '$138',
    weekly: '$790 a week',
  },
];

const ALSO = [
  ['The pool', 'Heated May to September, 7 am to 10 pm'],
  ['Mesa Maid Diner', 'Next door, breakfast from 6, pie until 9'],
  ['Coffee', 'Free in the office from 5:30, strong'],
  ['Ice and laundry', 'Machines by room 12, quarters at the desk'],
  ['Air cooled', 'Swamp coolers in every room, fans on request'],
  ['Car charging', 'Two chargers by the sign, free for guests'],
];

type Place = {
  name: string;
  dir: string;
  miles: string;
  drive: string;
  note: string;
  tip: string;
};

const NEARBY: Place[] = [
  {
    name: 'Red Mesa Canyon',
    dir: 'West',
    miles: '18',
    drive: '25 min',
    note: 'A two-mile rim trail with the whole canyon below it, and a steep one down to the creek for the brave.',
    tip: 'Go at sunrise and take more water than you think.',
  },
  {
    name: 'Coyote Dam',
    dir: 'North',
    miles: '34',
    drive: '40 min',
    note: 'The concrete arch from 1936, a visitor center with the old turbines, and a swimming beach on the lake behind it.',
    tip: 'Tours on the hour, 9 to 3, closed Mondays.',
  },
  {
    name: 'Silverbell',
    dir: 'South',
    miles: '52',
    drive: '1 hr 5 min',
    note: 'A silver town that emptied in 1911. The bank, the jail and forty roofless houses, on a gravel road.',
    tip: 'Fill up at the Junction. There is no gas after the turn.',
  },
];

const LETTERBOARD = [
  'Check in 3 pm',
  'Check out 11 am',
  'Pets welcome, $15',
  'Quiet hours 10 pm to 7 am',
  'Office open 7 am to 11 pm',
];

const KNOW = [
  ['Late arrivals', 'Call ahead and we leave your key in the lockbox by the office door, with a map.'],
  ['Pets', 'Dogs and cats in rooms 1 to 6, which open onto the grass. One pet per room, $15 a night.'],
  ['Smoking', 'Not in the rooms. There is a bench by the cactus garden for that.'],
  ['Paying', 'Cards or cash. We hold the first night on booking and charge the rest when you leave.'],
  ['Cancelling', 'Free until 2 pm the day before. After that, the first night.'],
];

type Stop = {
  name: string;
  at: string;
  kind: 'town' | 'us' | 'sight';
};

const HIGHWAY: Stop[] = [
  { name: 'Coyote Dam', at: '8%', kind: 'sight' },
  { name: 'Red Mesa Junction', at: '38%', kind: 'town' },
  { name: 'Northbound Motel', at: '52%', kind: 'us' },
  { name: 'Red Mesa Canyon', at: '71%', kind: 'sight' },
  { name: 'Silverbell', at: '93%', kind: 'town' },
];

export default function NorthboundMotelPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--sand': '#f4e5cd',
        '--teal': '#1c7c84',
        '--sunset': '#f17a35',
        '--pink': '#e75b7e',
        '--brown': '#3a2a1f',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="sand,teal,sunset,pink,brown"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Grand+Hotel&family=Monoton&family=Barlow+Semi+Condensed:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Nothing+You+Could+Do&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span data-edit="bar.markScript" data-edit-max="60" className={s.markScript}>Northbound</span>
          <span data-edit="bar.markMotel" data-edit-max="60" className={s.markMotel}>Motel</span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barVacancy" data-edit-max="240" data-edit-multiline className={s.barVacancy}>Vacancy tonight</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The pattern is the sky: the motel photograph's sky is empty, so
            the beams behind it show above the mesas like a sunset. The
            sign stands in front, with the name on it. */}
        <section className={s.hero} aria-labelledby="nb-hero-h">
          <div data-edit-pattern="nbHero.field" data-edit-roles="transparent,3,2,0,3,2" className={s.sky} aria-hidden="true">
            <TabbiedPattern pattern={beamspread} palette={SKY} options={{ frequency: 0.6 }} fit="grid" cellSize={128} seed="northbound-sky" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className={s.scene}>
            <Artwork
              slug="northbound-motel-road"
              alt="A long single-storey roadside motel with a row of doors and two vintage cars parked in front, flat-topped mesas behind it"
              fit="cover"
              inks={['var(--brown)', 'var(--sand)']}
              className={s.road}
            />
          </div>

          <div className={s.shield}>
            <p className={s.shieldRoute}>
              <span data-edit="nbHero.text" data-edit-max="60">Highway</span>
              <strong data-edit="nbHero.emphasis">9</strong>
            </p>
            <p data-edit="nbHero.shieldPlace" data-edit-max="240" data-edit-multiline className={s.shieldPlace}>Red Mesa Junction</p>
          </div>

          <div className={s.sign}>
            <div className={s.signBoard}>
              <h1 id="nb-hero-h" className={s.signName}>
                <span data-edit="nbHero.signScript" data-edit-max="60" className={s.signScript}>Northbound</span>
                <span data-edit="nbHero.signMotel" data-edit-max="60" className={s.signMotel}>Motel</span>
              </h1>
              <p data-edit="nbHero.signSince" data-edit-max="240" data-edit-multiline className={s.signSince}>Since 1958</p>
            </div>
            <span className={s.signArrow} aria-hidden="true" />
            <p className={s.vacancy}>
              <span data-edit="nbHero.vacNo" data-edit-max="60" className={s.vacNo}>No</span>
              <span data-edit="nbHero.vacLit" data-edit-max="60" className={s.vacLit}>Vacancy</span>
            </p>
            <p data-edit="nbHero.signExtras" data-edit-max="240" data-edit-multiline className={s.signExtras}>Pool, color TV, air cooled</p>
            <span className={s.signPole} aria-hidden="true" />
          </div>

          <div className={s.welcome}>
            <p data-edit="nbHero.welcomeHello" data-edit-max="240" data-edit-multiline className={s.welcomeHello}>Pull in, stay a while</p>
            <p data-edit="nbHero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>Twenty-four rooms in a row on Highway 9, lawn chairs outside every door, a pool that stays warm till ten and pie at the diner next door. Rooms from $84 a night.</p>
            <div className={s.heroActions}>
              <a data-edit="nbHero.btn" data-edit-max="28" className={s.btn} href="#book">Book a room</a>
              <a data-edit="nbHero.btnGhost" data-edit-max="28" className={s.btnGhost} href="#rooms">See the rooms</a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- ROOMS
            Three key fobs off the board behind the desk. */}
        <section id="rooms" className={s.sec} aria-labelledby="nb-rooms-h">
          <div className={s.secHead}>
            <p data-edit="rooms.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Off the key board</p>
            <h2 data-edit="rooms.title" data-edit-max="60" id="nb-rooms-h">Rooms</h2>
            <p data-edit="rooms.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>Every room has its own door onto the walkway, a new bed, a good shower and a window that opens. Rates are for the night, tax included.</p>
          </div>

          <ul className={s.rooms}>
            {ROOMS.map((r, i) => (
              <li key={r.no} className={`${s.room} ${s[r.tone]}`}>
                <div className={s.fobWrap}>
                  <span className={s.keyRing} aria-hidden="true" />
                  <span className={s.key} aria-hidden="true" />
                  <div className={s.fob}>
                    <div className={s.fobFace}>
                      <span data-edit={`rooms.fobMotel.${i}`} data-edit-max="60" className={s.fobMotel}>Northbound Motel</span>
                      <span data-edit={`rooms.fobNo.${i}`} data-edit-max="60" className={s.fobNo}>{r.no}</span>
                      <span data-edit={`rooms.fobPost.${i}`} data-edit-max="60" className={s.fobPost}>Drop in any mailbox, we pay postage</span>
                    </div>
                  </div>
                </div>
                <div className={s.roomCard}>
                  <h3 data-edit={`rooms.title2.${i}`} data-edit-max="40">{r.name}</h3>
                  <p className={s.roomBeds}>{`${r.beds}. ${r.sleeps}.`}</p>
                  <ul className={s.roomExtras}>
                    {r.extras.map((e, i2) => (
                      <li data-edit={`rooms.item.${i}.${i2}`} data-edit-max="80" key={e}>{e}</li>
                    ))}
                  </ul>
                  <p className={s.rate}>
                    <strong data-edit={`rooms.emphasis.${i}`}>{r.rate}</strong>
                    <span data-edit={`rooms.text.${i}`} data-edit-max="60">a night</span>
                  </p>
                  <p data-edit={`rooms.weekly.${i}`} data-edit-max="240" data-edit-multiline className={s.weekly}>{r.weekly}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- POSTCARDS
            Three cards off the rack in the office, each with its message
            side: the pool, the chairs and the cactus garden. */}
        <section id="postcards" className={s.rackSec} aria-labelledby="nb-cards-h">
          <div className={s.rackInner}>
            <div className={s.secHead}>
              <p data-edit="postcards.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Ten cents each at the desk</p>
              <h2 data-edit="postcards.title" data-edit-max="60" id="nb-cards-h">Postcards from the Northbound</h2>
            </div>

            <ol className={s.cards}>
              <li className={s.cardPair}>
                <div className={s.front}>
                  <div className={s.view}>
                    <div data-edit-pattern="postcards.field" data-edit-roles="1,0,1,0,3,0" className={s.pool} aria-hidden="true">
                      <TabbiedPattern pattern={bengaline} palette={POOL} fit="grid" cellSize={30} seed="northbound-pool" style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    <span className={s.board} aria-hidden="true" />
                    <p data-edit="postcards.viewScript" data-edit-max="240" data-edit-multiline className={s.viewScript}>Greetings from the pool</p>
                  </div>
                  <p data-edit="postcards.caption" data-edit-max="240" data-edit-multiline className={s.caption}>The pool at the Northbound, heated May to September</p>
                </div>
                <div className={s.back}>
                  <p data-edit="postcards.note" data-edit-max="240" data-edit-multiline className={s.note}>Dear Mom, the pool is cold at 7 and perfect at 4. Dad has not left his chair. Pie tonight. Love, Josie</p>
                  <div className={s.postSide}>
                    <span className={s.stamp} aria-hidden="true" />
                    <p className={s.postmark}>
                      <span data-edit="postcards.text" data-edit-max="60">Red Mesa Jct</span>
                      <span data-edit="postcards.text2" data-edit-max="60">Jun 12</span>
                    </p>
                    <p data-edit="postcards.address" data-edit-max="240" data-edit-multiline className={s.address}>Mrs. D. Ortega, 14 Elm Street, Fairview</p>
                  </div>
                </div>
              </li>

              <li className={s.cardPair}>
                <div className={s.front}>
                  <div className={`${s.view} ${s.viewChair}`}>
                    <Artwork slug="northbound-motel-chair" alt="A vintage shell-back metal lawn chair" mode="tint" inks={['var(--teal)', 'var(--sand)']} className={s.chair} />
                    <p data-edit="postcards.viewScript2" data-edit-max="240" data-edit-multiline className={s.viewScript}>Take a seat</p>
                  </div>
                  <p data-edit="postcards.caption2" data-edit-max="240" data-edit-multiline className={s.caption}>The chairs: two outside every door since 1958, repainted each spring</p>
                </div>
                <div className={s.back}>
                  <p data-edit="postcards.note2" data-edit-max="240" data-edit-multiline className={s.note}>Walt, found your chair. Same one, room 7, still teal. Sat in it till the stars came out. Wish you were here. Ray</p>
                  <div className={s.postSide}>
                    <span className={s.stamp} aria-hidden="true" />
                    <p className={s.postmark}>
                      <span data-edit="postcards.text3" data-edit-max="60">Red Mesa Jct</span>
                      <span data-edit="postcards.text4" data-edit-max="60">Aug 3</span>
                    </p>
                    <p data-edit="postcards.address2" data-edit-max="240" data-edit-multiline className={s.address}>Walter Byrne, 2 Quarry Road, Lindell</p>
                  </div>
                </div>
              </li>

              <li className={s.cardPair}>
                <div className={s.front}>
                  <div className={`${s.view} ${s.viewDusk}`}>
                    <Artwork slug="northbound-motel-cactus" alt="A saguaro cactus with two raised arms" inks={['var(--brown)']} className={s.cactus} />
                    <p data-edit="postcards.viewScript3" data-edit-max="240" data-edit-multiline className={s.viewScript}>Sundown on Highway 9</p>
                  </div>
                  <p data-edit="postcards.caption3" data-edit-max="240" data-edit-multiline className={s.caption}>The cactus garden, and the Mesa Maid Diner just beyond it</p>
                </div>
                <div className={s.back}>
                  <p data-edit="postcards.note3" data-edit-max="240" data-edit-multiline className={s.note}>Kids, the diner next door does pancakes the size of hubcaps. Grandpa had two. The cactus is older than he is. XO Nana</p>
                  <div className={s.postSide}>
                    <span className={s.stamp} aria-hidden="true" />
                    <p className={s.postmark}>
                      <span data-edit="postcards.text5" data-edit-max="60">Red Mesa Jct</span>
                      <span data-edit="postcards.text6" data-edit-max="60">Oct 21</span>
                    </p>
                    <p data-edit="postcards.address3" data-edit-max="240" data-edit-multiline className={s.address}>The Alvarez kids, 88 Birch Lane, Pomeroy</p>
                  </div>
                </div>
              </li>
            </ol>

            <dl className={s.also}>
              {ALSO.map(([what, detail], i) => (
                <div key={what}>
                  <dt data-edit={`postcards.term.${i}`} data-edit-max="28">{what}</dt>
                  <dd data-edit={`postcards.body.${i}`} data-edit-max="200" data-edit-multiline>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- NEARBY
            A distance sign, and the desert under it. */}
        <section id="nearby" className={s.nearSec} aria-labelledby="nb-near-h">
          <div className={s.sec}>
            <div className={s.nearGrid}>
              <div className={s.distance}>
                <h2 data-edit="nearby.distanceHead" data-edit-max="60" id="nb-near-h" className={s.distanceHead}>Nearby</h2>
                <ul className={s.distanceRows}>
                  {NEARBY.map((p, i) => (
                    <li key={p.name}>
                      <span data-edit={`nearby.distanceName.${i}`} data-edit-max="60" className={s.distanceName}>{p.name}</span>
                      <span data-edit={`nearby.distanceMiles.${i}`} data-edit-max="60" className={s.distanceMiles}>{p.miles}</span>
                    </li>
                  ))}
                </ul>
                <span className={`${s.post} ${s.postLeft}`} aria-hidden="true" />
                <span className={`${s.post} ${s.postRight}`} aria-hidden="true" />
              </div>

              <ol className={s.places}>
                {NEARBY.map((p, i) => (
                  <li key={p.name} className={s.place}>
                    <p className={s.placeWhere}>
                      <span data-edit={`nearby.text.${i}`} data-edit-max="60">{p.dir}</span>
                      <span>{`${p.miles} mi`}</span>
                      <span data-edit={`nearby.text2.${i}`} data-edit-max="60">{p.drive}</span>
                    </p>
                    <h3 data-edit={`nearby.title.${i}`} data-edit-max="40">{p.name}</h3>
                    <p data-edit={`nearby.placeNote.${i}`} data-edit-max="240" data-edit-multiline className={s.placeNote}>{p.note}</p>
                    <p data-edit={`nearby.placeTip.${i}`} data-edit-max="240" data-edit-multiline className={s.placeTip}>{p.tip}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div data-edit-pattern="nearby.field" data-edit-roles="transparent,2,3,4,0,0" className={s.desert} aria-hidden="true">
            <TabbiedPattern pattern={horizonbands} palette={DESERT} options={{ frequency: 0.6 }} fit="grid" cellSize={60} seed="northbound-desert" style={{ position: 'absolute', inset: 0 }} />
          </div>
        </section>

        {/* ------------------------------------------------------------ KNOW
            The letter board in the office window. */}
        <section id="know" className={s.sec} aria-labelledby="nb-know-h">
          <div className={s.knowGrid}>
            <div className={s.letterboard}>
              <h2 data-edit="know.boardHead" data-edit-max="60" id="nb-know-h" className={s.boardHead}>Good to know</h2>
              <ul className={s.boardLines}>
                {LETTERBOARD.map((l, i) => (
                  <li data-edit={`know.item.${i}`} data-edit-max="80" key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <dl className={s.know}>
              {KNOW.map(([term, text], i) => (
                <div key={term}>
                  <dt data-edit={`know.term.${i}`} data-edit-max="28">{term}</dt>
                  <dd data-edit={`know.body.${i}`} data-edit-max="200" data-edit-multiline>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ BOOK
            The registration card on the desk, the rings of the office wall
            behind it. */}
        <section id="book" className={s.bookSec} aria-labelledby="nb-book-h">
          <div data-edit-pattern="book.field" data-edit-roles="4,2,3,1,0" className={s.wall} aria-hidden="true">
            <TabbiedPattern pattern={sunsetrings} palette={WALL} fit="grid" cellSize={88} seed="northbound-wall" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <form className={s.register} action="#">
            <div className={s.registerHead}>
              <h2 data-edit="book.registerTitle" data-edit-max="60" id="nb-book-h" className={s.registerTitle}>Book a room</h2>
              <p data-edit="book.registerSub" data-edit-max="240" data-edit-multiline className={s.registerSub}>Northbound Motel, registration card</p>
              <p className={s.roomBox}>
                <span data-edit="book.text" data-edit-max="60">Room no.</span>
                <strong data-edit="book.emphasis">--</strong>
              </p>
            </div>
            <div className={s.registerGrid}>
              <div className={`${s.field} ${s.fieldWide}`}>
                <label data-edit="book.label" htmlFor="nb-name">Name</label>
                <input id="nb-name" name="name" type="text" autoComplete="name" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label2" htmlFor="nb-email">Email</label>
                <input id="nb-email" name="email" type="email" autoComplete="email" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label3" htmlFor="nb-phone">Phone</label>
                <input id="nb-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label4" htmlFor="nb-arrive">Arriving</label>
                <input id="nb-arrive" name="arrive" type="date" />
              </div>
              <div className={s.field}>
                <label data-edit="book.label5" htmlFor="nb-nights">Nights</label>
                <select id="nb-nights" name="nights" defaultValue="1">
                  <option value="1">1 night</option>
                  <option value="2">2 nights</option>
                  <option value="3">3 nights</option>
                  <option value="7">A week</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label6" htmlFor="nb-room">Room</label>
                <select id="nb-room" name="room" defaultValue="king">
                  <option value="king">The King, $84</option>
                  <option value="queens">Two Queens, $96</option>
                  <option value="suite">The Family Suite, $138</option>
                </select>
              </div>
              <div className={s.field}>
                <label data-edit="book.label7" htmlFor="nb-car">Car and plate</label>
                <input id="nb-car" name="car" type="text" placeholder="So we can save your spot" />
              </div>
            </div>
            <div className={s.registerFoot}>
              <button data-edit="book.btn" data-edit-max="24" className={s.btn} type="submit">Hold my room</button>
              <p data-edit="book.body" data-edit-max="240" data-edit-multiline>We confirm by email within the hour. Nothing is charged until you check in.</p>
            </div>
          </form>
        </section>

        {/* ------------------------------------------------------------ FIND */}
        <section id="find" className={s.sec} aria-labelledby="nb-find-h">
          <div className={s.secHead}>
            <p data-edit="find.kicker" data-edit-max="240" data-edit-multiline className={s.kicker}>Mile marker 214</p>
            <h2 data-edit="find.title" data-edit-max="60" id="nb-find-h">Find us</h2>
            <p data-edit="find.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>9140 Highway 9, Red Mesa Junction. Heading north, we are a mile past the Junction on the right; look for the arrow.</p>
          </div>

          <div className={s.map}>
            <span className={s.highway} aria-hidden="true" />
            <ol className={s.stops}>
              {HIGHWAY.map((st, i) => (
                <li key={st.name} className={`${s.stop} ${s[st.kind]}`} style={{ left: st.at }}>
                  <span className={s.stopDot} aria-hidden="true" />
                  <span data-edit={`find.stopName.${i}`} data-edit-max="60" className={s.stopName}>{st.name}</span>
                </li>
              ))}
            </ol>
            <p data-edit="find.mapNorth" data-edit-max="240" data-edit-multiline className={s.mapNorth}>North</p>
          </div>

          <div className={s.findGrid}>
            <p className={s.findItem}>
              <span data-edit="find.text" data-edit-max="60">Call the office</span>
              <a data-edit="find.link" data-edit-max="28" href="tel:+15550190909">(555) 019-0909</a>
            </p>
            <p className={s.findItem}>
              <span data-edit="find.text2" data-edit-max="60">Write</span>
              <a data-edit="find.link2" data-edit-max="28" href="mailto:desk@northbound.example">desk@northbound.example</a>
            </p>
            <p className={s.findItem}>
              <span data-edit="find.text3" data-edit-max="60">Office</span>
              <strong data-edit="find.emphasis">7 am to 11 pm, every day</strong>
            </p>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="3,2,0,3,2,4" className={s.dusk} aria-hidden="true">
          <TabbiedPattern pattern={beamspread} palette={DUSK} fit="grid" cellSize={48} seed="northbound-dusk" style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Northbound Motel</p>
          <p data-edit="footer.body" data-edit-max="240" data-edit-multiline>A fictional roadside motel. The rooms, rates, guests, diner and Highway 9 itself are invented.</p>
          <p>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.body2" data-edit-max="240" data-edit-multiline>The motel, the chair and the cactus are generated images, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
