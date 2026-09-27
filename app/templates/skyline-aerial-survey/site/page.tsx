import { TabbiedPattern } from 'tabbied/react';
import { blindfold, contourlines, gutter, raking, terrain } from 'tabbied/patterns';
import s from './skyline-aerial-survey.module.css';
import { TemplateMenu } from 'components/template/TemplateMenu';
import { Artwork } from 'components/Artwork';

export const metadata = {
  title: 'Skyline Aerial Survey: Drone mapping and surveying, Westfield Airfield',
  description:
    'Skyline Aerial Survey flies drones out of Hangar 2 at Westfield Airfield: orthomosaic maps, topographic surveys, roof inspections, crop health NDVI and stockpile volumes, measured to 2 cm.',
};

/* Site colors. The NDVI layer is the crop-row pattern with a clear ground,
   so the photograph shows between the rows; the service layers reuse the
   same four roles. */
const DARK = '#10161a';
const WHITE = '#e8ecea';
const GREEN = '#46e07a';
const MAGENTA = '#ff4fa0';

const NDVI = ['transparent', GREEN, GREEN, WHITE, MAGENTA, GREEN];
const NDVI_SAMPLE = ['transparent', GREEN, WHITE, MAGENTA, GREEN, GREEN];
const ORTHO = [DARK, WHITE, GREEN, WHITE, DARK, WHITE];
const CONTOURS = [DARK, GREEN, WHITE, MAGENTA];
const ROOFS = [DARK, WHITE, MAGENTA, WHITE, GREEN, WHITE];
const CROPS = [DARK, GREEN, WHITE, MAGENTA, GREEN, WHITE];
const POINTS = [DARK, DARK, GREEN, WHITE, MAGENTA, GREEN];
const FOOT_CONTOURS = [DARK, GREEN, MAGENTA, WHITE];

const NAV = [
  ['Services', '#services'],
  ['Deliverables', '#deliverables'],
  ['Accuracy', '#accuracy'],
  ['Sample project', '#sample'],
  ['Permissions', '#permissions'],
  ['Pricing', '#pricing'],
  ['Quote', '#quote'],
];

const READOUT = [
  ['EPSG', '27700'],
  ['LAT', '51.4821 N'],
  ['LON', '1.2210 W'],
  ['Z', '42.6 m'],
  ['GSD', '2.1 cm/px'],
  ['RTK', 'FIX, 18 sats'],
  ['SCALE', '1:2 500'],
];

const ORTHO_SPECS = ['GSD 1.5-3 cm', 'GeoTIFF, ECW, KMZ', '48 h turnaround'];
const TOPO_SPECS = ['0.25 m contours', 'DXF, DWG, LandXML', 'Checked on the ground'];
const ROOF_SPECS = ['0.5 cm GSD close passes', 'Annotated PDF report', 'No scaffolding'];
const NDVI_SPECS = ['Multispectral, 5 bands', 'Zones for variable rate', 'Weekly in the season'];
const STOCK_SPECS = ['Cut and fill, to 1%', 'PDF and CSV', 'Monthly site visits'];

const DELIVERABLES = [
  ['01', 'Orthomosaic', 'GeoTIFF, ECW, KMZ', 'OSGB36 / WGS84', '2-12 GB'],
  ['02', 'Surface model (DSM)', 'GeoTIFF, 32-bit float', 'OSGB36 + ODN', '1-4 GB'],
  ['03', 'Terrain model (DTM)', 'GeoTIFF, LandXML', 'OSGB36 + ODN', '0.5-2 GB'],
  ['04', 'Point cloud', 'LAS 1.4, LAZ', 'OSGB36 + ODN', '5-40 GB'],
  ['05', 'Contours', 'DXF, DWG, SHP', 'OSGB36 + ODN', '10-80 MB'],
  ['06', '3D mesh', 'OBJ, SLPK, FBX', 'Local or OSGB36', '1-8 GB'],
  ['07', 'NDVI and zones', 'GeoTIFF, SHP, ISOXML', 'WGS84', '50-400 MB'],
  ['08', 'Report', 'PDF, with check points', 'Stated per job', '5-30 MB'],
];

const ACCURACY_FIGURES = [
  ['1.4 cm', 'horizontal RMSE, last 40 jobs'],
  ['2.1 cm', 'vertical RMSE, last 40 jobs'],
  ['8', 'ground control points on a 100 ha site'],
];

/* Check-point residuals on the last farm job: where each point landed
   against its surveyed position, in centimeters, drawn on the plot. */
const RESIDUALS = [
  { id: 'CP01', dx: '0.6', dy: '-1.1', x: '59%', y: '66.5%' },
  { id: 'CP02', dx: '-1.3', dy: '0.4', x: '30.5%', y: '44%' },
  { id: 'CP03', dx: '0.9', dy: '0.8', x: '63.5%', y: '38%' },
  { id: 'CP04', dx: '-0.4', dy: '-1.6', x: '44%', y: '74%' },
  { id: 'CP05', dx: '1.7', dy: '-0.2', x: '75.5%', y: '53%' },
  { id: 'CP06', dx: '-0.8', dy: '1.4', x: '38%', y: '29%' },
];

const SAMPLE_STATS = [
  ['212 ha', 'flown in one day'],
  ['3 h 40', 'in the air, 11 flights'],
  ['2,960', 'photographs'],
  ['2.4 cm', 'ground sample distance'],
];

const SAMPLE_FINDINGS = [
  ['Field 7, winter wheat', 'Mean NDVI 0.71; a 1.2 ha wet corner at 0.28, traced to a blocked drain.'],
  ['Field 3, oilseed rape', 'Pigeon damage along the hedge, 0.6 ha, mapped for the insurer.'],
  ['Farmyard', 'Grain store roof: 14 slipped sheets, located to the purlin.'],
];

type Permit = {
  name: string;
  ref: string;
  status: string;
};

const PERMITS: Permit[] = [
  { name: 'Operator ID, UK CAA', ref: 'GBR-OP-4471X', status: 'Valid to 03/2027' },
  { name: 'Operational authorisation, specific category', ref: 'UAS-OA-2291', status: 'Valid to 11/2026' },
  { name: 'Remote pilots with GVC, three of three', ref: 'GVC-1180, 1244, 1397', status: 'Current' },
  { name: 'Public liability insurance', ref: '$5,000,000, Hollinsway Aviation', status: 'Valid to 06/2027' },
  { name: 'Airspace checks for every flight', ref: 'FRZ, NOTAM, landowner consent', status: 'Every job' },
  { name: 'Data protection registration', ref: 'ZB-448-120', status: 'Current' },
];

const PRICES = [
  ['Orthomosaic', '$6 per ha', 'Minimum $450, up to 400 ha a day'],
  ['Topographic survey', '$1,200 a day', 'Including control; most sites take one day'],
  ['Roof and structure', '$295 a building', 'Two buildings on one site: $480'],
  ['Crop health NDVI', '$4 per ha a flight', 'Season plan: 6 flights at $3.20'],
  ['Stockpile volumes', '$350 a visit', 'Monthly contract: $290 a visit'],
];

export default function SkylineAerialSurveyPage() {
  return (
    <div
      // Color, declared inline so an edit can override it. The authored
      // defaults stay in the stylesheet as the fallback.
      style={{
        '--dark': '#10161a',
        '--white': '#e8ecea',
        '--green': '#46e07a',
        '--magenta': '#ff4fa0',
      } as React.CSSProperties}
      data-edit-root="vars"
      data-edit-vars="dark,white,green,magenta"
      className={s.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&family=Fira+Code:wght@400..600&display=swap"
      />

      <header className={s.bar}>
        <a className={s.mark} href="#top">
          <span className={s.markReticle} aria-hidden="true" />
          <span className={s.markText}>
            <span data-edit="bar.markName" data-edit-max="60" className={s.markName}>Skyline</span>
            <span data-edit="bar.markSub" data-edit-max="60" className={s.markSub}>Aerial Survey</span>
          </span>
        </a>
        <nav className={s.nav} aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p data-edit="bar.barStatus" data-edit-max="240" data-edit-multiline className={s.barStatus}>RTK FIX</p>
        <TemplateMenu className={s.siteMenu}>
          {NAV.map(([label, href], i) => (
            <a data-edit={`bar.link2.${i}`} data-edit-max="28" key={href} href={href}>{label}</a>
          ))}
        </TemplateMenu>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------ HERO
            The map is the picture: a farm estate from 120 m, with the
            survey drawn over it. The sidebar's layer toggles really switch
            the overlays on and off. */}
        <section className={s.hero} aria-labelledby="hero-h">
          <div className={s.side}>
            <p data-edit="hero.project" data-edit-max="240" data-edit-multiline className={s.project}>Project 26-114, Ashcombe Farm, 14 Sep 2026</p>
            <h1 data-edit="hero.title" data-edit-max="70" id="hero-h" className={s.title}>Skyline Aerial Survey</h1>
            <p data-edit="hero.lede" data-edit-max="240" data-edit-multiline className={s.lede}>
              Drone mapping and surveying from Hangar 2, Westfield Airfield.
              Orthomosaics, topographic surveys and crop health maps, measured
              to two centimeters and delivered in the formats your software
              already reads.
            </p>
            <div className={s.heroActions}>
              <a data-edit="hero.btn" data-edit-max="28" className={s.btn} href="#quote">Request a quote</a>
              <a data-edit="hero.btnLine" data-edit-max="28" className={s.btnLine} href="#sample">Open the sample</a>
            </div>

            <fieldset className={s.layers}>
              <legend data-edit="hero.layersTitle" className={s.layersTitle}>Layers</legend>
              <div className={s.layer}>
                <input id="sk-layer-bounds" className={s.tgBounds} type="checkbox" defaultChecked />
                <label data-edit="hero.label" data-edit-format="emphasis" htmlFor="sk-layer-bounds">
                  <span className={`${s.swatch} ${s.swBounds}`} aria-hidden="true" />
                  Field boundaries
                </label>
              </div>
              <div className={s.layer}>
                <input id="sk-layer-measure" className={s.tgMeasure} type="checkbox" defaultChecked />
                <label data-edit="hero.label2" data-edit-format="emphasis" htmlFor="sk-layer-measure">
                  <span className={`${s.swatch} ${s.swMeasure}`} aria-hidden="true" />
                  Measurements
                </label>
              </div>
              <div className={s.layer}>
                <input id="sk-layer-ndvi" className={s.tgNdvi} type="checkbox" defaultChecked />
                <label data-edit="hero.label3" data-edit-format="emphasis" htmlFor="sk-layer-ndvi">
                  <span className={`${s.swatch} ${s.swNdvi}`} aria-hidden="true" />
                  Crop health, NDVI
                </label>
              </div>
              <div className={s.layer}>
                <input id="sk-layer-grid" className={s.tgGrid} type="checkbox" defaultChecked />
                <label data-edit="hero.label4" data-edit-format="emphasis" htmlFor="sk-layer-grid">
                  <span className={`${s.swatch} ${s.swGrid}`} aria-hidden="true" />
                  National grid, 100 m
                </label>
              </div>
            </fieldset>

            <div className={s.legend}>
              <p data-edit="hero.legendTitle" data-edit-max="240" data-edit-multiline className={s.legendTitle}>NDVI</p>
              <span className={s.ndviBar} aria-hidden="true" />
              <p className={s.ndviScale}>
                <span data-edit="hero.text" data-edit-max="60">-0.2</span>
                <span data-edit="hero.text2" data-edit-max="60">0.2</span>
                <span data-edit="hero.text3" data-edit-max="60">0.5</span>
                <span data-edit="hero.text4" data-edit-max="60">0.9</span>
              </p>
              <p data-edit="hero.ndviNote" data-edit-max="240" data-edit-multiline className={s.ndviNote}>Bare soil and stress to dense, healthy canopy</p>
            </div>
          </div>

          <div className={s.viewport}>
            {/* The sheet has the photograph's own proportions and covers the
                viewport, so every overlay is placed in the picture's frame. */}
            <div className={s.sheet}>
              <Artwork
                slug="skyline-aerial-survey-fields"
                alt="Aerial photograph of a farm: fields in different crops, a farmhouse with barns, a winding road and a river lined with trees"
                fit="cover"
                inks={['var(--map-dark)', 'var(--map-light)']}
                className={s.photo}
              />
              <div data-edit-pattern="hero.field" data-edit-roles="transparent,2,2,1,3,2" className={s.ndvi} aria-hidden="true">
                <TabbiedPattern
                  pattern={blindfold}
                  palette={NDVI}
                  fit="grid"
                  cellSize={28}
                  seed="skyline-ndvi-field-1"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <span className={s.graticule} aria-hidden="true" />

              <svg className={s.overlay} viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden="true">
                <g className={s.bounds}>
                  <polygon points="0,4 488,4 545,120 548,185 470,262 330,320 170,395 0,460" />
                  <polygon points="772,206 955,180 965,382 790,446" />
                  <polygon points="955,180 1110,128 1170,145 1150,235 1118,370 1124,470 1050,524 905,556 796,575 790,446 965,382" />
                  <polygon points="706,862 850,850 1000,838 1150,815 1225,812 1232,1020 706,1020" />
                </g>
                <g className={s.vertices}>
                  <rect x="482" y="-2" width="12" height="12" />
                  <rect x="539" y="114" width="12" height="12" />
                  <rect x="542" y="179" width="12" height="12" />
                  <rect x="464" y="256" width="12" height="12" />
                  <rect x="324" y="314" width="12" height="12" />
                  <rect x="164" y="389" width="12" height="12" />
                  <rect x="766" y="200" width="12" height="12" />
                  <rect x="949" y="174" width="12" height="12" />
                  <rect x="959" y="376" width="12" height="12" />
                  <rect x="784" y="440" width="12" height="12" />
                  <rect x="1104" y="122" width="12" height="12" />
                  <rect x="1164" y="139" width="12" height="12" />
                  <rect x="1112" y="364" width="12" height="12" />
                  <rect x="1044" y="518" width="12" height="12" />
                  <rect x="790" y="569" width="12" height="12" />
                  <rect x="700" y="856" width="12" height="12" />
                  <rect x="1144" y="809" width="12" height="12" />
                  <rect x="1219" y="806" width="12" height="12" />
                </g>
                <g className={s.measure}>
                  <polygon className={s.roof} points="441,433 552,440 550,501 437,493" />
                  <line x1="812" y1="600" x2="1108" y2="500" />
                  <line x1="806" y1="584" x2="818" y2="616" />
                  <line x1="1102" y1="484" x2="1114" y2="516" />
                </g>
              </svg>

              <p className={`${s.tag} ${s.tagArea}`}>
                <span data-edit="hero.tagKey" data-edit-max="60" className={s.tagKey}>Parcel 4</span>
                <span data-edit="hero.tagVal" data-edit-max="60" className={s.tagVal}>4.82 ha</span>
              </p>
              <p className={`${s.tag} ${s.tagDist}`}>
                <span data-edit="hero.tagVal2" data-edit-max="60" className={s.tagVal}>412.6 m</span>
              </p>
              <p className={`${s.tag} ${s.tagRoof}`}>
                <span data-edit="hero.tagKey2" data-edit-max="60" className={s.tagKey}>Grain store roof</span>
                <span data-edit="hero.tagVal3" data-edit-max="60" className={s.tagVal}>612 sq m</span>
              </p>
              <p className={`${s.tag} ${s.tagNdvi}`}>
                <span data-edit="hero.tagKey3" data-edit-max="60" className={s.tagKey}>Field 1, NDVI</span>
                <span data-edit="hero.tagVal4" data-edit-max="60" className={s.tagVal}>mean 0.68</span>
              </p>
              <p className={`${s.tag} ${s.tagField}`}>
                <span data-edit="hero.tagKey4" data-edit-max="60" className={s.tagKey}>Field 7</span>
                <span data-edit="hero.tagVal5" data-edit-max="60" className={s.tagVal}>18.4 ha</span>
              </p>

              <p className={s.crosshair}>
                <span data-edit="hero.crossLabel" data-edit-max="60" className={s.crossLabel}>51.4821 N, 1.2210 W</span>
                <span data-edit="hero.crossSub" data-edit-max="60" className={s.crossSub}>Z 44.1 m ODN</span>
              </p>
            </div>

            <div className={s.mapTools} aria-hidden="true">
              <span data-edit="hero.north" data-edit-max="60" className={s.north}>N</span>
              <span className={s.scale}>
                <span className={s.scaleBar} />
                <span className={s.scaleText}>
                  <span data-edit="hero.text5" data-edit-max="60">0</span>
                  <span data-edit="hero.text6" data-edit-max="60">50</span>
                  <span data-edit="hero.text7" data-edit-max="60">100 m</span>
                </span>
              </span>
            </div>
          </div>

          <dl className={s.readout}>
            {READOUT.map(([key, value], i) => (
              <div key={key}>
                <dt data-edit={`hero.term.${i}`} data-edit-max="28">{key}</dt>
                <dd data-edit={`hero.body.${i}`} data-edit-max="200" data-edit-multiline>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* -------------------------------------------------------- SERVICES
            Five services, five layers: each card carries its layer's look. */}
        <section id="services" className={s.sec} aria-labelledby="services-h">
          <div className={s.secHead}>
            <p data-edit="services.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>01 / Services</p>
            <h2 data-edit="services.secTitle" data-edit-max="60" id="services-h" className={s.secTitle}>What we fly for</h2>
            <p data-edit="services.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              One airframe, five sensors, and a survey office that turns the
              pictures into measurements. Every job ends with a report of how
              accurate it is, not a promise.
            </p>
          </div>

          <ul className={s.services}>
            <li className={s.service}>
              <div data-edit-pattern="services.field" data-edit-roles="0,1,2,1,0,1" className={s.thumb} aria-hidden="true">
                <TabbiedPattern
                  pattern={gutter}
                  palette={ORTHO}
                  fit="grid"
                  cellSize={24}
                  seed="skyline-ortho-tiles"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.serviceBody}>
                <p data-edit="services.layerCode" data-edit-max="240" data-edit-multiline className={s.layerCode}>L01</p>
                <h3 data-edit="services.serviceName" data-edit-max="40" className={s.serviceName}>Orthomosaic maps</h3>
                <p data-edit="services.serviceAbout" data-edit-max="240" data-edit-multiline className={s.serviceAbout}>Thousands of overlapping photographs stitched into one true-scale map, sharp enough to count fence posts.</p>
                <ul className={s.specs}>
                  {ORTHO_SPECS.map((spec, i) => (
                    <li data-edit={`services.item.${i}`} data-edit-max="80" key={spec}>{spec}</li>
                  ))}
                </ul>
                <p data-edit="services.from" data-edit-max="240" data-edit-multiline className={s.from}>from $6 / ha</p>
              </div>
            </li>

            <li className={s.service}>
              <div data-edit-pattern="services.field2" data-edit-roles="0,2,1,3" className={s.thumb} aria-hidden="true">
                <TabbiedPattern
                  pattern={contourlines}
                  palette={CONTOURS}
                  options={{ frequency: 0.3 }}
                  fit="grid"
                  cellSize={40}
                  seed="skyline-topo"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.serviceBody}>
                <p data-edit="services.layerCode2" data-edit-max="240" data-edit-multiline className={s.layerCode}>L02</p>
                <h3 data-edit="services.serviceName2" data-edit-max="40" className={s.serviceName}>Topographic surveys</h3>
                <p data-edit="services.serviceAbout2" data-edit-max="240" data-edit-multiline className={s.serviceAbout}>Levels and contours for architects, drainage and planning, from a point cloud tied to control on the ground.</p>
                <ul className={s.specs}>
                  {TOPO_SPECS.map((spec, i) => (
                    <li data-edit={`services.item2.${i}`} data-edit-max="80" key={spec}>{spec}</li>
                  ))}
                </ul>
                <p data-edit="services.from2" data-edit-max="240" data-edit-multiline className={s.from}>from $1,200 / day</p>
              </div>
            </li>

            <li className={s.service}>
              <div data-edit-pattern="services.field3" data-edit-roles="0,1,3,1,2,1" className={s.thumb} aria-hidden="true">
                <TabbiedPattern
                  pattern={raking}
                  palette={ROOFS}
                  fit="grid"
                  cellSize={26}
                  seed="skyline-roofs"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.serviceBody}>
                <p data-edit="services.layerCode3" data-edit-max="240" data-edit-multiline className={s.layerCode}>L03</p>
                <h3 data-edit="services.serviceName3" data-edit-max="40" className={s.serviceName}>Roof and structure inspections</h3>
                <p data-edit="services.serviceAbout3" data-edit-max="240" data-edit-multiline className={s.serviceAbout}>Every slate, gutter and chimney photographed from a meter away, each defect pinned to a plan.</p>
                <ul className={s.specs}>
                  {ROOF_SPECS.map((spec, i) => (
                    <li data-edit={`services.item3.${i}`} data-edit-max="80" key={spec}>{spec}</li>
                  ))}
                </ul>
                <p data-edit="services.from3" data-edit-max="240" data-edit-multiline className={s.from}>from $295 / building</p>
              </div>
            </li>

            <li className={s.service}>
              <div data-edit-pattern="services.field4" data-edit-roles="0,2,1,3,2,1" className={s.thumb} aria-hidden="true">
                <TabbiedPattern
                  pattern={blindfold}
                  palette={CROPS}
                  fit="grid"
                  cellSize={26}
                  seed="skyline-crop-health"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.serviceBody}>
                <p data-edit="services.layerCode4" data-edit-max="240" data-edit-multiline className={s.layerCode}>L04</p>
                <h3 data-edit="services.serviceName4" data-edit-max="40" className={s.serviceName}>Crop health, NDVI</h3>
                <p data-edit="services.serviceAbout4" data-edit-max="240" data-edit-multiline className={s.serviceAbout}>A near-infrared camera sees stress a week before the eye does. We map it field by field, row by row.</p>
                <ul className={s.specs}>
                  {NDVI_SPECS.map((spec, i) => (
                    <li data-edit={`services.item4.${i}`} data-edit-max="80" key={spec}>{spec}</li>
                  ))}
                </ul>
                <p data-edit="services.from4" data-edit-max="240" data-edit-multiline className={s.from}>from $4 / ha</p>
              </div>
            </li>

            <li className={s.service}>
              <div data-edit-pattern="services.field5" data-edit-roles="0,0,2,1,3,2" className={s.thumb} aria-hidden="true">
                <TabbiedPattern
                  pattern={terrain}
                  palette={POINTS}
                  fit="grid"
                  cellSize={24}
                  seed="skyline-stockpile"
                  style={{ position: 'absolute', inset: 0 }}
                />
              </div>
              <div className={s.serviceBody}>
                <p data-edit="services.layerCode5" data-edit-max="240" data-edit-multiline className={s.layerCode}>L05</p>
                <h3 data-edit="services.serviceName5" data-edit-max="40" className={s.serviceName}>Stockpile volumes</h3>
                <p data-edit="services.serviceAbout5" data-edit-max="240" data-edit-multiline className={s.serviceAbout}>Aggregate, soil, grain and woodchip measured from the air in minutes, with no one climbing the heap.</p>
                <ul className={s.specs}>
                  {STOCK_SPECS.map((spec, i) => (
                    <li data-edit={`services.item5.${i}`} data-edit-max="80" key={spec}>{spec}</li>
                  ))}
                </ul>
                <p data-edit="services.from5" data-edit-max="240" data-edit-multiline className={s.from}>from $350 / visit</p>
              </div>
            </li>
          </ul>
        </section>

        {/* ---------------------------------------------------- DELIVERABLES
            An attribute table, the way the files will show up in your GIS. */}
        <section id="deliverables" className={s.sec} aria-labelledby="deliverables-h">
          <div className={s.secHead}>
            <p data-edit="deliverables.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>02 / Deliverables</p>
            <h2 data-edit="deliverables.secTitle" data-edit-max="60" id="deliverables-h" className={s.secTitle}>Files you can open</h2>
            <p data-edit="deliverables.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              Delivered by download link within 48 hours of the flight, or on a
              drive by post. Every file carries its coordinate system in the
              metadata.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <caption data-edit="deliverables.caption" className={s.caption}>deliverables.shp, attribute table, 8 features</caption>
              <thead>
                <tr>
                  <th data-edit="deliverables.heading" scope="col">FID</th>
                  <th data-edit="deliverables.heading2" scope="col">Deliverable</th>
                  <th data-edit="deliverables.heading3" scope="col">Format</th>
                  <th data-edit="deliverables.heading4" scope="col">Coordinates</th>
                  <th data-edit="deliverables.heading5" scope="col">Typical size</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERABLES.map(([fid, name, format, crs, size], i) => (
                  <tr key={fid}>
                    <td data-edit={`deliverables.fid.${i}`} className={s.fid}>{fid}</td>
                    <th data-edit={`deliverables.heading6.${i}`} scope="row">{name}</th>
                    <td data-edit={`deliverables.cell.${i}`}>{format}</td>
                    <td data-edit={`deliverables.cell2.${i}`}>{crs}</td>
                    <td data-edit={`deliverables.num.${i}`} className={s.num}>{size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -------------------------------------------------------- ACCURACY */}
        <section id="accuracy" className={s.accuracySec} aria-labelledby="accuracy-h">
          <div className={s.accuracyInner}>
            <div className={s.accuracyText}>
              <p data-edit="accuracy.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>03 / Accuracy</p>
              <h2 data-edit="accuracy.secTitle" data-edit-max="60" id="accuracy-h" className={s.secTitle}>What 2 cm means</h2>
              <p data-edit="accuracy.accuracyLede" data-edit-max="240" data-edit-multiline className={s.accuracyLede}>
                Two centimeters is the width of your thumb, and the height of a
                kerb that a wheelchair cannot get over. It is the difference
                between a drain that falls and a drain that ponds.
              </p>
              <p data-edit="accuracy.accuracyBody" data-edit-max="240" data-edit-multiline className={s.accuracyBody}>
                We get there two ways. The drone carries an RTK receiver that
                fixes its own position to a centimeter while it flies. Then we
                lay out ground control, checkerboard targets surveyed with a
                GNSS rover, and hold a few back as check points that play no
                part in the processing. The report tells you how far the map
                missed them.
              </p>
              <dl className={s.figures}>
                {ACCURACY_FIGURES.map(([figure, label], i) => (
                  <div key={label}>
                    <dt data-edit={`accuracy.term.${i}`} data-edit-max="28">{label}</dt>
                    <dd data-edit={`accuracy.body.${i}`} data-edit-max="200" data-edit-multiline>{figure}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure className={s.plot}>
              <div className={s.plotArea}>
                <span className={s.target} aria-hidden="true" />
                {RESIDUALS.map((r, i) => (
                  <span
                    key={r.id}
                    className={s.point}
                    style={{ left: r.x, top: r.y } as React.CSSProperties}>
                    <span data-edit={`accuracy.pointLabel.${i}`} data-edit-max="60" className={s.pointLabel}>{r.id}</span>
                  </span>
                ))}
                <span data-edit="accuracy.text" data-edit-max="60" className={`${s.ring} ${s.ring1}`} aria-hidden="true">1 cm</span>
                <span data-edit="accuracy.text2" data-edit-max="60" className={`${s.ring} ${s.ring2}`} aria-hidden="true">2 cm</span>
                <span data-edit="accuracy.text3" data-edit-max="60" className={`${s.ring} ${s.ring3}`} aria-hidden="true">3 cm</span>
              </div>
              <figcaption data-edit="accuracy.plotCaption" data-edit-max="120" data-edit-multiline className={s.plotCaption}>
                Check-point residuals, Ashcombe Farm. Six targets held back; all six
                landed inside 2 cm.
              </figcaption>
              <table className={s.cpTable}>
                <caption data-edit="accuracy.srOnly" className={s.srOnly}>Residuals in centimeters for each check point</caption>
                <thead>
                  <tr>
                    <th data-edit="accuracy.heading" scope="col">Point</th>
                    <th data-edit="accuracy.heading2" scope="col">dE cm</th>
                    <th data-edit="accuracy.heading3" scope="col">dN cm</th>
                  </tr>
                </thead>
                <tbody>
                  {RESIDUALS.map((r, i) => (
                    <tr key={r.id}>
                      <th data-edit={`accuracy.heading4.${i}`} scope="row">{r.id}</th>
                      <td data-edit={`accuracy.cell.${i}`}>{r.dx}</td>
                      <td data-edit={`accuracy.cell2.${i}`}>{r.dy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </div>
        </section>

        {/* ---------------------------------------------------------- SAMPLE
            The same estate, closer: a crop of the hero's photograph with
            the NDVI layer laid over one field. */}
        <section id="sample" className={s.sec} aria-labelledby="sample-h">
          <div className={s.secHead}>
            <p data-edit="sample.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>04 / Sample project</p>
            <h2 data-edit="sample.secTitle" data-edit-max="60" id="sample-h" className={s.secTitle}>Ashcombe Farm, 212 ha</h2>
            <p data-edit="sample.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
              A mixed arable estate on the River Lode, flown in September for
              the farm manager, the agronomist and the insurer, from one set of
              flights.
            </p>
          </div>

          <div className={s.sample}>
            <div className={s.cropFrame}>
              <div className={s.cropSheet}>
                <Artwork
                  slug="skyline-aerial-survey-fields"
                  alt="Close crop of the estate: the river, the road bridge and field 7 below it"
                  inks={['var(--map-dark)', 'var(--map-light)']}
                  className={s.photo}
                />
                <div data-edit-pattern="sample.field" data-edit-roles="transparent,2,1,3,2,2" className={s.cropNdvi} aria-hidden="true">
                  <TabbiedPattern
                    pattern={blindfold}
                    palette={NDVI_SAMPLE}
                    fit="grid"
                    cellSize={22}
                    seed="skyline-ndvi-field-7"
                    style={{ position: 'absolute', inset: 0 }}
                  />
                </div>
                <svg className={s.overlay} viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden="true">
                  <g className={s.bounds}>
                    <polygon points="706,862 850,850 1000,838 1150,815 1225,812 1232,1020 706,1020" />
                  </g>
                  <g className={s.measure}>
                    <polygon className={s.wet} points="1080,900 1160,880 1200,940 1150,990 1080,975" />
                  </g>
                </svg>
                <p className={`${s.tag} ${s.tagWet}`}>
                  <span data-edit="sample.tagKey" data-edit-max="60" className={s.tagKey}>Wet corner</span>
                  <span data-edit="sample.tagVal" data-edit-max="60" className={s.tagVal}>1.2 ha, 0.28</span>
                </p>
                <p className={`${s.tag} ${s.tagSeven}`}>
                  <span data-edit="sample.tagKey2" data-edit-max="60" className={s.tagKey}>Field 7, NDVI</span>
                  <span data-edit="sample.tagVal2" data-edit-max="60" className={s.tagVal}>mean 0.71</span>
                </p>
              </div>
              <p data-edit="sample.cropBadge" data-edit-max="240" data-edit-multiline className={s.cropBadge}>NDVI, 12 Sep 2026, 11:40</p>
            </div>

            <div className={s.sampleData}>
              <dl className={s.sampleStats}>
                {SAMPLE_STATS.map(([figure, label], i) => (
                  <div key={label}>
                    <dt data-edit={`sample.term.${i}`} data-edit-max="28">{label}</dt>
                    <dd data-edit={`sample.body.${i}`} data-edit-max="200" data-edit-multiline>{figure}</dd>
                  </div>
                ))}
              </dl>
              <h3 data-edit="sample.findingsTitle" data-edit-max="40" className={s.findingsTitle}>What the flights found</h3>
              <dl className={s.findings}>
                {SAMPLE_FINDINGS.map(([where, what], i) => (
                  <div key={where}>
                    <dt data-edit={`sample.term2.${i}`} data-edit-max="28">{where}</dt>
                    <dd data-edit={`sample.body2.${i}`} data-edit-max="200" data-edit-multiline>{what}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- PERMISSIONS */}
        <section id="permissions" className={s.permSec} aria-labelledby="permissions-h">
          <div className={s.permInner}>
            <div className={s.secHead}>
              <p data-edit="permissions.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>05 / Permissions and insurance</p>
              <h2 data-edit="permissions.secTitle" data-edit-max="60" id="permissions-h" className={s.secTitle}>Cleared to fly</h2>
              <p data-edit="permissions.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Copies of everything below go with every quote. We check the
                airspace and ask the landowner before each flight, and we fly
                with a second person watching the sky.
              </p>
            </div>
            <ul className={s.permits}>
              {PERMITS.map((p, i) => (
                <li key={p.name} className={s.permit}>
                  <p data-edit={`permissions.permitStatus.${i}`} data-edit-max="240" data-edit-multiline className={s.permitStatus}>{p.status}</p>
                  <h3 data-edit={`permissions.permitName.${i}`} data-edit-max="40" className={s.permitName}>{p.name}</h3>
                  <p data-edit={`permissions.permitRef.${i}`} data-edit-max="240" data-edit-multiline className={s.permitRef}>{p.ref}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- PRICING */}
        <section id="pricing" className={s.sec} aria-labelledby="pricing-h">
          <div className={s.pricing}>
            <div data-edit-pattern="pricing.field" data-edit-roles="0,2,3,1" className={s.pricingField} aria-hidden="true">
              <TabbiedPattern
                pattern={contourlines}
                palette={FOOT_CONTOURS}
                options={{ frequency: 0.2 }}
                fit="grid"
                cellSize={40}
                seed="skyline-pricing"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <div className={s.pricingBody}>
              <p data-edit="pricing.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>06 / Pricing</p>
              <h2 data-edit="pricing.secTitle" data-edit-max="60" id="pricing-h" className={s.secTitle}>Rates</h2>
              <p data-edit="pricing.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Prices before tax, within 40 miles of Westfield. Past that, $1.10
                a mile, and a night away if the site needs two days.
              </p>
              <dl className={s.rates}>
                {PRICES.map(([service, price, note], i) => (
                  <div key={service}>
                    <dt data-edit={`pricing.term.${i}`} data-edit-max="28">{service}</dt>
                    <dd data-edit={`pricing.rate.${i}`} data-edit-max="200" data-edit-multiline className={s.rate}>{price}</dd>
                    <dd data-edit={`pricing.rateNote.${i}`} data-edit-max="200" data-edit-multiline className={s.rateNote}>{note}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- QUOTE */}
        <section id="quote" className={s.sec} aria-labelledby="quote-h">
          <div className={s.quote}>
            <form className={s.form} action="#">
              <p data-edit="quote.secNo" data-edit-max="240" data-edit-multiline className={s.secNo}>07 / Request a quote</p>
              <h2 data-edit="quote.secTitle" data-edit-max="60" id="quote-h" className={s.secTitle}>Draw us a boundary</h2>
              <p data-edit="quote.secNote" data-edit-max="240" data-edit-multiline className={s.secNote}>
                Tell us where and what, and we reply within a working day with a
                fixed price and a flight date.
              </p>
              <div className={s.formGrid}>
                <div className={s.field}>
                  <label data-edit="quote.label" htmlFor="sk-name">Name</label>
                  <input id="sk-name" name="name" type="text" autoComplete="name" />
                </div>
                <div className={s.field}>
                  <label data-edit="quote.label2" htmlFor="sk-email">Email</label>
                  <input id="sk-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className={s.field}>
                  <label data-edit="quote.label3" htmlFor="sk-site">Site, postcode or grid reference</label>
                  <input id="sk-site" name="site" type="text" placeholder="TL 482 164" />
                </div>
                <div className={s.field}>
                  <label data-edit="quote.label4" htmlFor="sk-area">Area, hectares</label>
                  <input id="sk-area" name="area" type="number" min="0" step="0.1" />
                </div>
                <div className={s.field}>
                  <label data-edit="quote.label5" htmlFor="sk-service">Service</label>
                  <select id="sk-service" name="service" defaultValue="ortho">
                    <option value="ortho">Orthomosaic map</option>
                    <option value="topo">Topographic survey</option>
                    <option value="roof">Roof or structure inspection</option>
                    <option value="ndvi">Crop health, NDVI</option>
                    <option value="stock">Stockpile volumes</option>
                  </select>
                </div>
                <div className={s.field}>
                  <label data-edit="quote.label6" htmlFor="sk-date">Needed by</label>
                  <input id="sk-date" name="date" type="date" />
                </div>
                <div className={`${s.field} ${s.fieldWide}`}>
                  <label data-edit="quote.label7" htmlFor="sk-notes">Anything we should know</label>
                  <textarea id="sk-notes" name="notes" rows={4} />
                </div>
              </div>
              <button data-edit="quote.submit" data-edit-max="24" className={s.submit} type="submit">Send the request</button>
            </form>

            <aside className={s.hangar} aria-labelledby="hangar-h">
              <h3 data-edit="hangar.hangarTitle" data-edit-max="40" id="hangar-h" className={s.hangarTitle}>Hangar 2</h3>
              <p data-edit="hangar.hangarText" data-edit-max="240" data-edit-multiline className={s.hangarText}>Westfield Airfield, Airfield Road, Westfield</p>
              <dl className={s.hangarData}>
                <div>
                  <dt data-edit="hangar.term" data-edit-max="28">Office</dt>
                  <dd data-edit="hangar.body" data-edit-max="200" data-edit-multiline>Mon-Fri 08:00-17:30</dd>
                </div>
                <div>
                  <dt data-edit="hangar.term2" data-edit-max="28">Flying</dt>
                  <dd data-edit="hangar.body2" data-edit-max="200" data-edit-multiline>Any day the wind is under 12 m/s</dd>
                </div>
                <div>
                  <dt data-edit="hangar.term3" data-edit-max="28">Phone</dt>
                  <dd>
                    <a data-edit="hangar.link" data-edit-max="28" href="tel:+15550174402">(555) 017-4402</a>
                  </dd>
                </div>
                <div>
                  <dt data-edit="hangar.term4" data-edit-max="28">Email</dt>
                  <dd>
                    <a data-edit="hangar.link2" data-edit-max="28" href="mailto:survey@skylineaerial.example">survey@skylineaerial.example</a>
                  </dd>
                </div>
              </dl>
              <p data-edit="hangar.hangarNote" data-edit-max="240" data-edit-multiline className={s.hangarNote}>Visitors sign in at the tower; the hangar is the green door past the fuel bay.</p>
            </aside>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div data-edit-pattern="footer.field" data-edit-roles="0,2,1,3,2,1" className={s.footField} aria-hidden="true">
          <TabbiedPattern
            pattern={blindfold}
            palette={CROPS}
            fit="grid"
            cellSize={26}
            seed="skyline-footer-rows"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className={s.footInner}>
          <p data-edit="footer.footName" data-edit-max="240" data-edit-multiline className={s.footName}>Skyline Aerial Survey</p>
          <p data-edit="footer.footText" data-edit-max="240" data-edit-multiline className={s.footText}>A fictional drone survey company. The projects, permits, figures and prices are invented.</p>
          <p className={s.footText}>
            Patterns by <a data-edit="footer.link" data-edit-max="28" href="https://tabbied.com">Tabbied</a>.
          </p>
          <p data-edit="footer.footText2" data-edit-max="240" data-edit-multiline className={s.footText}>The aerial photograph is a generated image, drawn in the page&apos;s own colors.</p>
        </div>
      </footer>
    </div>
  );
}
