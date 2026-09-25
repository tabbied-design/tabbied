import {
  gasket, spark, gloaming, ridgeline, glyph, wavelet, mortise, karst,
  hilbert, linocut, cascade, crescendo, perforate, bothways, torsion,
  taper, windowpane, epicentre, halftone, staple, maelstrom, caltrop,
  tailoff, tinting, ring, quire, ribline, stitch, damier, plait, chase,
  tidering, radiance, grainfield, metro, rungs,
  pivot, raking, gutter, swapcut, annulus, sail, reeding, miura, lintel,
  dipole,
  cupola, battlement, clipcorner, birdsmouth, rolloff, prismfold,
  bracket, moleskin, disque, spectrum, ninon, bauhaus, capstan, raku,
  combed, shatter, grosgrain, wale, spit, gesso, bowsprit, mirrorblack,
  sound, cornerbite, fractal, pinwheel,
  midnightblossoms, goldencoil, wovenkhaki, softbubbles, diagonalweave,
  cornernotch, isometricblocks, marbledarcs, tidewashbands, spiralrosette,
  quarterburst, truchetrings, teardropleaves, tealboomerang,
  quartercirclequilt, randomrings, foliage, patternsampler,
  sunsetrings, warpribbon, contourlines, dashfield, paintscribble,
  spinningrings, horizonbands, crosslattice, meridianhatch, diamondember,
  concentricrings, rabbet,
  diamondconfetti, eclipserings, squarelabyrinth, kilngrid, misprint,
  keyway, confettidotfield, scattershrink, radiantswirl,
  confettitriangles, cornerbloom, quoit, apse, circusposter, driftspiral,
  turbulentsunburst, scatteredgems, recession, loophole, isometricweave,
  baste, gyre, lunette, bokeh, ringfield, ogee, sheared, terrain,
  sparkle, garret,
  reedpen, isocube, circuit, lobe, lagoon, curl, frond, ziggy,
  switchback, pebble, lantern, cendal, northstar, gravure, petalcut,
  dogtooth, sunray, hurdle,
} from 'tabbied/patterns';
import type { PatternDefinition } from 'tabbied';

export type NewTemplateSite = {
  slug: string;
  name: string;
  topic: string;
  /** Preset slug, for display labels. */
  patternSlug: string;
  pattern: PatternDefinition;
  paletteName: string;
  /** Background color first - the same hexes the site itself uses. */
  palette: string[];
  seed: string;
};

/**
 * The second template collection: single-page brand sites under
 * /templates/<slug>/site/, each designed around one Tabbied pattern (imagery:
 * docs/image-pipeline.md). Palettes here mirror each page's own constants.
 */
export const NEW_TEMPLATE_SITES: NewTemplateSite[] = [
  { slug: 'mistral-cycles', name: 'Mistral Cycles', topic: 'Handbuilt bicycle frames', patternSlug: 'gasket', pattern: gasket, paletteName: 'Blueprint navy', palette: ['#0D1B2A', '#1B98E0', '#E0FBFC', '#FF7B00', '#FFD23F', '#EAEAEA'], seed: 'dir-mc' },
  { slug: 'zenith-observatory', name: 'Zenith', topic: 'Observatory & planetarium', patternSlug: 'spark', pattern: spark, paletteName: 'Nebula violet', palette: ['#10002B', '#5A189A', '#9D4EDD', '#C77DFF', '#E0AAFF', '#FFD6FF'], seed: 'dir-ze' },
  { slug: 'maison-ambre', name: 'Maison Ambre', topic: 'Perfume house', patternSlug: 'gloaming', pattern: gloaming, paletteName: 'Amber noir', palette: ['#141210', '#C9A227', '#E8D9B0', '#8C6A2F', '#FBF6EA', '#5A4632'], seed: 'dir-ma' },
  { slug: 'cairn-expeditions', name: 'Cairn', topic: 'Alpine guiding service', patternSlug: 'ridgeline', pattern: ridgeline, paletteName: 'Glacier ember', palette: ['#10222E', '#A8CEDE', '#F2F7F9', '#E8734A', '#4E7A8C', '#D8E8EF'], seed: 'dir-ca' },
  { slug: 'hopscotch-museum', name: 'Hopscotch', topic: "Children's discovery museum", patternSlug: 'glyph', pattern: glyph, paletteName: 'Crayon primaries', palette: ['#FFF9EF', '#2B2B33', '#FF5C4D', '#2E86DE', '#27C093', '#FFC53D'], seed: 'dir-ho' },
  { slug: 'cerulean-swim', name: 'Cerulean', topic: 'Swimwear label', patternSlug: 'wavelet', pattern: wavelet, paletteName: 'Lagoon', palette: ['#F2FBFC', '#0FA3B1', '#B5E2E8', '#FF8266', '#FFD97D', '#134D57'], seed: 'dir-ce' },
  { slug: 'oxbow-workshop', name: 'Oxbow', topic: 'Furniture workshop', patternSlug: 'mortise', pattern: mortise, paletteName: 'Oiled oak', palette: ['#F5F1E8', '#2E2A25', '#A9713C', '#6B4F35', '#9AA69B', '#C7BBA5'], seed: 'dir-ox' },
  { slug: 'piquant-provisions', name: 'Piquant Provisions', topic: 'Small-batch hot sauce', patternSlug: 'karst', pattern: karst, paletteName: 'Scoville', palette: ['#0F1A20', '#F4D35E', '#EE964B', '#F95738', '#EFE6DD', '#4C8FBD'], seed: 'dir-pi' },
  { slug: 'quanta-robotics', name: 'Quanta', topic: 'Robotics laboratory', patternSlug: 'hilbert', pattern: hilbert, paletteName: 'Phosphor', palette: ['#0B0E14', '#25E0C8', '#4A5568', '#E8ECF1', '#7A88FF', '#1A2230'], seed: 'dir-qu' },
  { slug: 'madrigal-strings', name: 'Madrigal', topic: 'Violin atelier', patternSlug: 'linocut', pattern: linocut, paletteName: 'Varnish', palette: ['#2D132C', '#801336', '#C72C41', '#EE4540', '#F0C419', '#FFE9C7'], seed: 'dir-md' },
  { slug: 'caldera-rail', name: 'Caldera', topic: 'Scenic railway journeys', patternSlug: 'cascade', pattern: cascade, paletteName: 'Gouache travel', palette: ['#F0EAD6', '#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'], seed: 'dir-cl' },

  // Swiss-minimal set: one design language, five grids. Inter throughout.
  { slug: 'konzerthaus-halden', name: 'Konzerthaus Halden', topic: 'Concert hall', patternSlug: 'crescendo', pattern: crescendo, paletteName: 'Program red', palette: ['#F2F1EE', '#E1261C'], seed: 'dir-kh' },
  { slug: 'institut-vollmer', name: 'Institut Vollmer', topic: 'Materials research', patternSlug: 'perforate', pattern: perforate, paletteName: 'Signal blue', palette: ['#FFFFFF', '#1A1A1A', '#0B4EE0', '#9AA0A6', '#E9EBEE', '#4A4F55'], seed: 'dir-iv' },
  { slug: 'linie-nord', name: 'Linie Nord', topic: 'Regional transit', patternSlug: 'bothways', pattern: bothways, paletteName: 'Signal yellow', palette: ['#F1F1EF', '#17181A', '#FFD400', '#7E858C', '#DCDEDE', '#2A2E33'], seed: 'dir-ln' },
  { slug: 'chronometrie-bex', name: 'Chronométrie Bex', topic: 'Watch manufacture', patternSlug: 'torsion', pattern: torsion, paletteName: 'Bone and steel', palette: ['#EDEDEB', '#0E0E0E', '#FF5A1F', '#9C9C98', '#DAD9D5', '#3A3A38'], seed: 'dir-cb' },
  { slug: 'bogen-papier', name: 'Bogen Papier', topic: 'Paper merchant', patternSlug: 'taper', pattern: taper, paletteName: 'Stock green', palette: ['#FAFAF7', '#14150F', '#2E7D4F', '#C9C4B4', '#E7E5DC', '#6B6656'], seed: 'dir-bp' },

  // Pattern-forward Swiss set: full-bleed pattern fields with a transparent
  // background slot, redrawn on a timer so each page keeps moving.
  { slug: 'werkraum', name: 'Werkraum', topic: 'Architecture practice', patternSlug: 'windowpane', pattern: windowpane, paletteName: 'Basel red', palette: ['#F4F3EF', '#16161A', '#D6001C', '#8E8E88', '#C9C8C1'], seed: 'dir-wr' },
  { slug: 'nordlicht', name: 'Nordlicht', topic: 'Cartography & survey', patternSlug: 'epicentre', pattern: epicentre, paletteName: 'Chart blue', palette: ['#FCFCFA', '#0E1116', '#1B4DFF', '#8A9098', '#C3CBD4'], seed: 'dir-nl' },
  { slug: 'halbfett', name: 'Halbfett', topic: 'Type foundry', patternSlug: 'halftone', pattern: halftone, paletteName: 'Proof vermilion', palette: ['#FFFFFF', '#000000', '#FF3B14', '#9A9A9A', '#DCDCDC'], seed: 'dir-hb' },
  { slug: 'hafen-sechs', name: 'Hafen Sechs', topic: 'Container terminal', patternSlug: 'staple', pattern: staple, paletteName: 'Signal yellow, night', palette: ['#101215', '#F0EFEA', '#FFD400', '#6E747C', '#1C2026'], seed: 'dir-h6' },
  { slug: 'klangwerk', name: 'Klangwerk', topic: 'Electroacoustic studio', patternSlug: 'maelstrom', pattern: maelstrom, paletteName: 'Signal green, dark', palette: ['#08090B', '#E9E9E4', '#00E58A', '#5A6068', '#14161A'], seed: 'dir-kl' },
  { slug: 'mesura', name: 'Mesura', topic: 'Structural engineering', patternSlug: 'caltrop', pattern: caltrop, paletteName: 'Primer orange', palette: ['#F2F1ED', '#15171A', '#FF6A00', '#8C9096', '#D9D8D2'], seed: 'dir-me' },
  { slug: 'seconde', name: 'Seconde', topic: 'Sports timing', patternSlug: 'tailoff', pattern: tailoff, paletteName: 'Finish magenta', palette: ['#F7F7F5', '#101010', '#FF0059', '#8E8E8E', '#D6D6D2'], seed: 'dir-se' },
  { slug: 'cobalt-works', name: 'Cobalt Works', topic: 'Dry pigment mill', patternSlug: 'tinting', pattern: tinting, paletteName: 'Cobalt', palette: ['#F6F4EE', '#14161C', '#0033CC', '#7E8494', '#DEDBD0'], seed: 'dir-co' },
  { slug: 'nullpunkt', name: 'Nullpunkt', topic: 'Calibration laboratory', patternSlug: 'ring', pattern: ring, paletteName: 'One red, four times', palette: ['#FFFFFF', '#0A0A0A', '#E10600', '#9EA2A6', '#DBDBD9'], seed: 'dir-np' },
  { slug: 'sammlung-weiss', name: 'Sammlung Weiss', topic: 'Private art collection', patternSlug: 'quire', pattern: quire, paletteName: 'Achromatic bone', palette: ['#EFEDE6', '#111111', '#6E6A60', '#CFCBBF', '#EAE7DD'], seed: 'dir-sw' },
  { slug: 'frequenz', name: 'Frequenz 94,6', topic: 'Free radio station', patternSlug: 'ribline', pattern: ribline, paletteName: 'On-air amber', palette: ['#121014', '#F2EFE6', '#FFA200', '#6B6560', '#1D1A20'], seed: 'dir-fq' },
  { slug: 'fonds-aubert', name: 'Fonds Aubert', topic: 'Private records archive', patternSlug: 'stitch', pattern: stitch, paletteName: 'Archive olive', palette: ['#F0F0E8', '#1A1C18', '#4C6B2F', '#8C8F84', '#DEDAD4'], seed: 'dir-fa' },
  { slug: 'passform', name: 'Passform', topic: 'Bespoke tailoring', patternSlug: 'damier', pattern: damier, paletteName: 'Thread rust', palette: ['#F5F1EA', '#191512', '#C1440E', '#9A9086', '#E5DFD4'], seed: 'dir-pf' },
  { slug: 'meterware', name: 'Meterware', topic: 'Weaving mill', patternSlug: 'plait', pattern: plait, paletteName: 'Yarn indigo', palette: ['#EFEBE1', '#14161F', '#2B3FAE', '#8E8A7E', '#DCD7C9'], seed: 'dir-mw' },
  { slug: 'sichtbeton', name: 'Sichtbeton', topic: 'Fair-faced concrete', patternSlug: 'chase', pattern: chase, paletteName: 'Safety orange', palette: ['#E9E9E6', '#131313', '#FF5A00', '#8B8B87', '#D3D3CE'], seed: 'dir-sb' },
  { slug: 'kaella', name: 'Källa', topic: 'Municipal water utility', patternSlug: 'tidering', pattern: tidering, paletteName: 'Still water', palette: ['#F2F6F6', '#0F1A1D', '#00A6A6', '#7E9296', '#DCE7E7'], seed: 'dir-ka' },
  { slug: 'nachtzug', name: 'Nachtzug', topic: 'Sleeper trains', patternSlug: 'rungs', pattern: rungs, paletteName: 'Lamplight gold', palette: ['#0B0E1A', '#EDE8DA', '#E0A83C', '#545C74', '#141827'], seed: 'dir-nz' },
  { slug: 'lichtfeld', name: 'Lichtfeld', topic: 'Lighting design', patternSlug: 'radiance', pattern: radiance, paletteName: 'Warm white', palette: ['#0A0A0A', '#FAFAF5', '#F5E663', '#6A6A64', '#151515'], seed: 'dir-lf' },
  { slug: 'silbersalz', name: 'Silbersalz', topic: 'Photographic laboratory', patternSlug: 'grainfield', pattern: grainfield, paletteName: 'Safelight red', palette: ['#EDEBE4', '#101010', '#C8102E', '#8A8880', '#D9D6CC'], seed: 'dir-ss' },
  { slug: 'kryss', name: 'Kryss', topic: 'Wayfinding studio', patternSlug: 'metro', pattern: metro, paletteName: 'Directional green', palette: ['#F4F4F1', '#131416', '#00843D', '#8E9094', '#E2E2DE'], seed: 'dir-ky' },

  // Swiss-bold set: poster-size display type, the full viewport as the
  // measure, no photography and no rules (sections divide by a change of
  // ground or a full-bleed pattern field).
  { slug: 'salzhaus', name: 'Salzhaus', topic: 'Contemporary dance company', patternSlug: 'pivot', pattern: pivot, paletteName: 'Basel scarlet', palette: ['#F3F1EC', '#101014', '#FF2D00', '#8B8B85', '#DEDCD4'], seed: 'bold-sz' },
  { slug: 'zwoelfton', name: 'Zwölfton', topic: 'New-music ensemble', patternSlug: 'raking', pattern: raking, paletteName: 'Acid yellow, night', palette: ['#0B0B0F', '#EFEEE7', '#E8FF00', '#6D6D66', '#22222A'], seed: 'bold-zt' },
  { slug: 'bureau-vektor', name: 'Bureau Vektor', topic: 'Public statistics office', patternSlug: 'gutter', pattern: gutter, paletteName: 'Ultramarine', palette: ['#FFFFFF', '#0C0D10', '#1F3CFF', '#8A8F99', '#E8EAF0'], seed: 'bold-bv' },
  { slug: 'presse-neun', name: 'Presse Neun', topic: 'Screenprint workshop', patternSlug: 'swapcut', pattern: swapcut, paletteName: 'Fluoro pink', palette: ['#F4F2EA', '#141210', '#FF2D78', '#8C8A82', '#E2DFD4'], seed: 'bold-p9' },
  { slug: 'isobar', name: 'Isobar', topic: 'Meteorological service', patternSlug: 'annulus', pattern: annulus, paletteName: 'Storm violet', palette: ['#E9EDF0', '#0D1418', '#6B2BE0', '#7C8792', '#D3DAE1'], seed: 'bold-ib' },
  { slug: 'beaufort', name: 'Ateliers Beaufort', topic: 'Sail loft', patternSlug: 'sail', pattern: sail, paletteName: 'Sea green, navy', palette: ['#0B1B2B', '#EFEAE0', '#00B37A', '#6E808F', '#14293D'], seed: 'bold-bf' },
  { slug: 'grafit', name: 'Grafit', topic: 'Pencil works', patternSlug: 'reeding', pattern: reeding, paletteName: 'Pencil ochre', palette: ['#EEEDE7', '#131313', '#E5A000', '#8A887F', '#DCDAD0'], seed: 'bold-gf' },
  { slug: 'falzbogen', name: 'Falzbogen', topic: 'Trade bookbindery', patternSlug: 'miura', pattern: miura, paletteName: 'Bookcloth crimson', palette: ['#F2EEE4', '#171310', '#B0003A', '#8B857A', '#E0DACB'], seed: 'bold-fb' },
  { slug: 'kubus', name: 'Kubus', topic: 'Kunsthalle', patternSlug: 'lintel', pattern: lintel, paletteName: 'Achromatic', palette: ['#080808', '#FAFAF8', '#8A8A86', '#1C1C1C'], seed: 'bold-kb' },
  { slug: 'tiefsee', name: 'Tiefsee', topic: 'Deep-sea research program', patternSlug: 'dipole', pattern: dipole, paletteName: 'Bioluminescent cyan', palette: ['#04121A', '#E6EEF0', '#00D2E0', '#5D7480', '#0A1F2B'], seed: 'bold-ts' },

  // Swiss-bold with generated imagery: scenes run full-bleed beside the
  // pattern bands; cut-out objects are composited onto a pattern plate drawn
  // on a transparent ground. Palettes match data/image-prompts.json.
  { slug: 'glockenhof', name: 'Glockenhof', topic: 'Bell foundry', patternSlug: 'cupola', pattern: cupola, paletteName: 'Bronze, night', palette: ['#141210', '#F0EAD8', '#C89B3C', '#7C736A', '#221D18'], seed: 'img-gh' },
  { slug: 'orgelwerk', name: 'Orgelwerk', topic: 'Pipe organ builders', patternSlug: 'battlement', pattern: battlement, paletteName: 'Organ pine', palette: ['#F1EFE7', '#141614', '#1D6F5C', '#87887F', '#DFDCD0'], seed: 'img-ow' },
  { slug: 'marais-blanc', name: 'Marais Blanc', topic: 'Sea salt works', patternSlug: 'clipcorner', pattern: clipcorner, paletteName: 'Salt-pan rose', palette: ['#FBFAF7', '#171519', '#C2456B', '#8C8A90', '#E4E1DC'], seed: 'img-mb' },
  { slug: 'ringmark', name: 'Ringmark', topic: 'Bird observatory', patternSlug: 'birdsmouth', pattern: birdsmouth, paletteName: 'Dune lichen', palette: ['#EFEDE3', '#16180F', '#6B7F1E', '#8C8B7C', '#DEDCCE'], seed: 'img-rm' },
  { slug: 'kupferwalz', name: 'Kupferwalz', topic: 'Copper rolling mill', patternSlug: 'rolloff', pattern: rolloff, paletteName: 'Copper, mill night', palette: ['#15100E', '#EFE7DE', '#B4552D', '#7A736D', '#231A16'], seed: 'img-kw' },
  { slug: 'purpurhaus', name: 'Purpurhaus', topic: 'Natural dye works', patternSlug: 'prismfold', pattern: prismfold, paletteName: 'Cochineal plum', palette: ['#F4F0E6', '#191317', '#5E2750', '#8B8279', '#E2DBCB'], seed: 'img-ph' },

  // The idioms set: one visual language per site, none of them Swiss, and no
  // photographs: the patterns are the imagery, each a design no earlier site
  // used.
  { slug: 'betonpark', name: 'Betonpark', topic: 'Indoor skatepark', patternSlug: 'bracket', pattern: bracket, paletteName: 'Concrete and safety green', palette: ['#EDEDEA', '#0B0B0B', '#2BD32B', '#7A7A76', '#D2D2CC'], seed: 'set-bp' },
  { slug: 'revue-marges', name: 'Revue Marges', topic: 'Literary quarterly', patternSlug: 'moleskin', pattern: moleskin, paletteName: 'Cream and oxblood', palette: ['#F6F1E7', '#1E1A17', '#7A1F2B', '#8A8177', '#DED4C3'], seed: 'set-rm' },
  { slug: 'orbital-lounge', name: 'Orbital', topic: 'Listening bar', patternSlug: 'disque', pattern: disque, paletteName: 'Space-age orange', palette: ['#FFF4E3', '#1D1B2B', '#FF6B2C', '#0FA3B1', '#8B8478'], seed: 'set-ol' },
  { slug: 'pixelmelt', name: 'Pixelmelt', topic: 'Independent game studio', patternSlug: 'spectrum', pattern: spectrum, paletteName: 'Vapor pink and cyan', palette: ['#12081F', '#F4EEFF', '#FF5FD2', '#38E0FF', '#7C6F94'], seed: 'set-pm' },
  { slug: 'birk-mobler', name: 'Birk Mobler', topic: 'Furniture maker', patternSlug: 'ninon', pattern: ninon, paletteName: 'Oak on white', palette: ['#FAFAF8', '#1F1F1D', '#B8895A', '#9A9994', '#E6E4DF'], seed: 'set-bm' },
  { slug: 'werkstatt-neun', name: 'Werkstatt Neun', topic: 'Design school workshop', patternSlug: 'bauhaus', pattern: bauhaus, paletteName: 'Three primaries', palette: ['#F2EFE6', '#141414', '#D7263D', '#1F5FBF', '#F2C230'], seed: 'set-wn' },
  { slug: 'hotel-meridien', name: 'Hotel Meridien', topic: 'Grand hotel', patternSlug: 'capstan', pattern: capstan, paletteName: 'Deco gold on green', palette: ['#0E1F1B', '#F3EBD9', '#C9A24B', '#7E8A82', '#1B2F2A'], seed: 'set-hm' },
  { slug: 'kiln-aoi', name: 'Kiln Aoi', topic: 'Ceramics studio', patternSlug: 'raku', pattern: raku, paletteName: 'Clay and moss', palette: ['#EFEAE2', '#2B2926', '#9C6B4E', '#6F7A5C', '#A19C93'], seed: 'set-ka' },
  { slug: 'nullsec', name: 'Nullsec', topic: 'Security research collective', patternSlug: 'combed', pattern: combed, paletteName: 'Terminal green', palette: ['#050807', '#D9F5E3', '#2CFF7A', '#5C7365', '#0E1713'], seed: 'set-ns' },
  { slug: 'bonbon-club', name: 'Bonbon Club', topic: 'After-school club', patternSlug: 'shatter', pattern: shatter, paletteName: 'Memphis sweets', palette: ['#FFF8E7', '#1B1B1F', '#FF4F7B', '#2FC4B2', '#FFC53D', '#6C5CE7'], seed: 'set-bc' },
  { slug: 'sable-and-pine', name: 'Sable and Pine', topic: 'Interiors atelier', patternSlug: 'grosgrain', pattern: grosgrain, paletteName: 'Mustard, olive, terracotta', palette: ['#F3EBDD', '#2A241E', '#D9A428', '#5F6B3A', '#C6633B', '#8F8577'], seed: 'set-sp' },
  { slug: 'harbour-ledger', name: 'The Harbour Ledger', topic: 'Local newspaper', patternSlug: 'wale', pattern: wale, paletteName: 'Newsprint', palette: ['#F7F5EE', '#111111', '#B3261E', '#6B6B66', '#DCD9CF'], seed: 'set-hl' },
  { slug: 'fennel-and-thyme', name: 'Fennel and Thyme', topic: 'Herbal apothecary', patternSlug: 'spit', pattern: spit, paletteName: 'Sage and honey', palette: ['#F4F1E8', '#22302A', '#5F8063', '#C9A16F', '#8E9689', '#DDE3D8'], seed: 'set-ft' },
  { slug: 'norrbolt', name: 'Norrbolt', topic: 'Fastener wholesaler', patternSlug: 'gesso', pattern: gesso, paletteName: 'Safety yellow, steel', palette: ['#F1F1EE', '#15171A', '#FFC300', '#6F7378', '#A9AEB4'], seed: 'set-nb' },
  { slug: 'lantern-rock', name: 'Lantern Rock', topic: 'Lighthouse inn', patternSlug: 'bowsprit', pattern: bowsprit, paletteName: 'Navy and signal red', palette: ['#F5F3EC', '#0F2440', '#C8102E', '#7B8794', '#D9DFE5'], seed: 'set-lr' },
  { slug: 'xerox-riot', name: 'Xerox Riot', topic: 'Zine fair', patternSlug: 'mirrorblack', pattern: mirrorblack, paletteName: 'Photocopy red', palette: ['#F4F4F0', '#0A0A0A', '#FF1E1E', '#6B6B6B', '#CFCFC8'], seed: 'set-xr' },
  { slug: 'tidy-ledger', name: 'Tidy Ledger', topic: 'Bookkeeping app', patternSlug: 'sound', pattern: sound, paletteName: 'Violet and mint', palette: ['#FBFAFF', '#1B1A2E', '#6D5DF5', '#2ED3A5', '#7D7A94', '#ECEAFB'], seed: 'set-tl' },
  { slug: 'atelier-vane', name: 'Atelier Vane', topic: 'Fashion label', patternSlug: 'cornerbite', pattern: cornerbite, paletteName: 'Black on white', palette: ['#FFFFFF', '#000000', '#8C8C8C', '#E4E4E4'], seed: 'set-av' },
  { slug: 'mesa-outfitters', name: 'Mesa Outfitters', topic: 'Desert trail guides', patternSlug: 'fractal', pattern: fractal, paletteName: 'Terracotta and sky', palette: ['#F7EEDF', '#2B1F16', '#C75B2A', '#3B8EA5', '#8C7E6E', '#E4D5BE'], seed: 'set-mo' },
  { slug: 'velo-criterium', name: 'Velo Criterium', topic: 'City-center cycling race', patternSlug: 'pinwheel', pattern: pinwheel, paletteName: 'Lime and electric blue', palette: ['#0B1220', '#F2F5FF', '#C6FF3D', '#2F6BFF', '#6C7590'], seed: 'set-vc' },

  // The minimal set: sites for the businesses that most often need one (a
  // restaurant, a dentist, a plumber), each on its own layout, with the
  // pattern as the only ornament. Seven carry one or two cut-outs generated
  // on gpt-image-2.5-flare; the rest have no pictures at all.
  { slug: 'osteria-lume', name: 'Osteria Lume', topic: 'Neighborhood Italian restaurant', patternSlug: 'midnightblossoms', pattern: midnightblossoms, paletteName: 'Linen and tomato', palette: ['#F7F2E9', '#1E1B18', '#C8402B', '#8A8275', '#E7DFD1', '#6B7A3A'], seed: 'min-ol' },
  { slug: 'morrow-coffee', name: 'Morrow Coffee', topic: 'Coffee shop and roastery', patternSlug: 'goldencoil', pattern: goldencoil, paletteName: 'Oat milk and espresso', palette: ['#F3EEE6', '#231A14', '#B06A3B', '#8D8177', '#E3DACD'], seed: 'min-mc' },
  { slug: 'crumb-bakehouse', name: 'Crumb Bakehouse', topic: 'Neighborhood bakery', patternSlug: 'wovenkhaki', pattern: wovenkhaki, paletteName: 'Flour and crust', palette: ['#FBF7EF', '#2A2118', '#C98B3A', '#9A8F80', '#EDE3D1'], seed: 'min-cb' },
  { slug: 'clearwater-dental', name: 'Clearwater Dental', topic: 'Family dental practice', patternSlug: 'softbubbles', pattern: softbubbles, paletteName: 'Mint and slate', palette: ['#F6FAF9', '#14232B', '#2BA59A', '#7F9096', '#DDEBE8'], seed: 'min-cd' },
  { slug: 'whitlock-ames', name: 'Whitlock & Ames', topic: 'Employment and family law firm', patternSlug: 'diagonalweave', pattern: diagonalweave, paletteName: 'Parchment and oxford', palette: ['#F4F2EC', '#141B26', '#2F4B7C', '#8B8A85', '#DEDBD2'], seed: 'min-wa' },
  { slug: 'tally-and-co', name: 'Tally & Co.', topic: 'Bookkeeping and tax accountants', patternSlug: 'cornernotch', pattern: cornernotch, paletteName: 'Ledger green', palette: ['#FAFAF7', '#151A16', '#1F7A4D', '#8E948F', '#E4E9E4'], seed: 'min-tc' },
  { slug: 'northgate-homes', name: 'Northgate Homes', topic: 'Independent real estate agent', patternSlug: 'isometricblocks', pattern: isometricblocks, paletteName: 'Brick and slate', palette: ['#F6F4F1', '#1B1D22', '#B5523B', '#858A92', '#E3E1DC'], seed: 'min-nh' },
  { slug: 'fringe-salon', name: 'Fringe', topic: 'Hair salon', patternSlug: 'marbledarcs', pattern: marbledarcs, paletteName: 'Blush and charcoal', palette: ['#FAF5F2', '#1F1A1C', '#D96C7B', '#968A8E', '#EFE3E0'], seed: 'min-fs' },
  { slug: 'stropline-barbers', name: 'Stropline Barbers', topic: 'Barbershop', patternSlug: 'tidewashbands', pattern: tidewashbands, paletteName: 'Barber night', palette: ['#121417', '#F1EDE4', '#D63A2F', '#6F737A', '#1D2126'], seed: 'min-sb' },
  { slug: 'stillpoint-yoga', name: 'Stillpoint Yoga', topic: 'Yoga studio', patternSlug: 'spiralrosette', pattern: spiralrosette, paletteName: 'Clay and sage', palette: ['#F5F1EA', '#2A2A26', '#7C8C6E', '#A39C92', '#E6E0D5', '#C0795A'], seed: 'min-sy' },
  { slug: 'forge-strength', name: 'Forge Strength', topic: 'Strength and conditioning gym', patternSlug: 'quarterburst', pattern: quarterburst, paletteName: 'Chalk and ember', palette: ['#F0F0ED', '#121212', '#FF5A1F', '#8C8C88', '#DADAD5'], seed: 'min-fg' },
  { slug: 'northside-plumbing', name: 'Northside Plumbing', topic: 'Plumbing and heating contractor', patternSlug: 'truchetrings', pattern: truchetrings, paletteName: 'Pipe blue and copper', palette: ['#F5F7F9', '#0D1B2A', '#1565C0', '#C46B2E', '#8A96A3', '#E1E7ED'], seed: 'min-np' },
  { slug: 'fernhill-gardens', name: 'Fernhill Gardens', topic: 'Landscaping and garden design', patternSlug: 'teardropleaves', pattern: teardropleaves, paletteName: 'Moss and loam', palette: ['#F3F2EB', '#1E2419', '#4E7A3A', '#9A9A8A', '#E1E3D6'], seed: 'min-fh' },
  { slug: 'maple-street-vets', name: 'Maple Street Vets', topic: 'Veterinary clinic', patternSlug: 'tealboomerang', pattern: tealboomerang, paletteName: 'Teal and apricot', palette: ['#FBF8F3', '#1D2A30', '#1B8A8F', '#F29E6D', '#8C979B', '#E8EFEE'], seed: 'min-ms' },
  { slug: 'little-acorns', name: 'Little Acorns', topic: 'Nursery and daycare', patternSlug: 'quartercirclequilt', pattern: quartercirclequilt, paletteName: 'Crayon soft', palette: ['#FFF9F0', '#2B2A33', '#F28C6B', '#6CB8A8', '#F5C85B', '#A9A2B0'], seed: 'min-la' },
  { slug: 'the-glasshouse', name: 'The Glasshouse', topic: 'Wedding and event venue', patternSlug: 'randomrings', pattern: randomrings, paletteName: 'Champagne and evergreen', palette: ['#F8F5EF', '#1B2420', '#2F5D4E', '#B89B6A', '#E8E2D6'], seed: 'min-gh' },
  { slug: 'wild-stem', name: 'Wild Stem', topic: 'Florist', patternSlug: 'foliage', pattern: foliage, paletteName: 'Peony and stem', palette: ['#FBF7F4', '#22261E', '#C94F6D', '#5E7B4C', '#9C958F', '#EFE6E2'], seed: 'min-ws' },
  { slug: 'dog-eared-books', name: 'Dog-Eared Books', topic: 'Independent bookshop', patternSlug: 'patternsampler', pattern: patternsampler, paletteName: 'Paperback', palette: ['#F6F1E7', '#1C1A17', '#2B59A3', '#8C857A', '#E4DCCB', '#D9A43B'], seed: 'min-db' },
  { slug: 'copperline-brewing', name: 'Copperline Brewing', topic: 'Brewery and taproom', patternSlug: 'sunsetrings', pattern: sunsetrings, paletteName: 'Hops and amber', palette: ['#161A17', '#EFE8D8', '#E0A33B', '#8DB255', '#6D706A', '#232924'], seed: 'min-cl' },
  { slug: 'align-physio', name: 'Align Physio', topic: 'Physiotherapy clinic', patternSlug: 'warpribbon', pattern: warpribbon, paletteName: 'Clinic blue and coral', palette: ['#F7F9FB', '#13202E', '#2F6FDE', '#F2765C', '#8795A5', '#E3EAF2'], seed: 'min-ap' },
  { slug: 'quiet-harbor', name: 'Quiet Harbor Counseling', topic: 'Private therapy practice', patternSlug: 'contourlines', pattern: contourlines, paletteName: 'Fog', palette: ['#F4F3F0', '#2C2E33', '#5C7A8C', '#9EA1A6', '#E6E5E0'], seed: 'min-qh' },
  { slug: 'maren-holt', name: 'Maren Holt', topic: 'Independent brand strategist', patternSlug: 'dashfield', pattern: dashfield, paletteName: 'Ink and signal', palette: ['#FFFFFF', '#111111', '#3B5BDB', '#8C8C8C', '#EDEDED'], seed: 'min-mh' },
  { slug: 'parallel-studio', name: 'Parallel Studio', topic: 'Design and marketing agency', patternSlug: 'paintscribble', pattern: paintscribble, paletteName: 'Studio violet', palette: ['#EDEBE6', '#151515', '#6246EA', '#8A8780', '#D8D5CD'], seed: 'min-ps' },
  { slug: 'relay', name: 'Relay', topic: 'Booking software for small businesses', patternSlug: 'spinningrings', pattern: spinningrings, paletteName: 'Indigo and peach', palette: ['#FCFCFE', '#161A33', '#4F46E5', '#FF9B71', '#7C8094', '#EEF0FA'], seed: 'min-re' },
  { slug: 'common-table', name: 'Common Table', topic: 'Community food bank', patternSlug: 'horizonbands', pattern: horizonbands, paletteName: 'Harvest', palette: ['#FFF8EC', '#22201C', '#E0642E', '#3E7C59', '#9A9285', '#F1E6D2'], seed: 'min-ct' },
  { slug: 'spruce-cleaning', name: 'Spruce', topic: 'Home cleaning service', patternSlug: 'crosslattice', pattern: crosslattice, paletteName: 'Fresh', palette: ['#F9FAF7', '#1A2322', '#5BAF7A', '#F2C94C', '#8E9894', '#E6ECE7'], seed: 'min-sc' },
  { slug: 'kessler-auto', name: 'Kessler Auto', topic: 'Independent auto repair garage', patternSlug: 'meridianhatch', pattern: meridianhatch, paletteName: 'Shop floor', palette: ['#EDECE8', '#16181B', '#D7372B', '#75797F', '#D5D3CE'], seed: 'min-ka' },
  { slug: 'linden-guesthouse', name: 'The Linden Guesthouse', topic: 'Bed and breakfast', patternSlug: 'diamondember', pattern: diamondember, paletteName: 'Linden and terracotta', palette: ['#F5F2EA', '#25271F', '#A45A3C', '#6F7D5C', '#9C978C', '#E7E1D3'], seed: 'min-lg' },
  { slug: 'cadence-music', name: 'Cadence Music School', topic: 'Music lessons for all ages', patternSlug: 'concentricrings', pattern: concentricrings, paletteName: 'Keys and vermilion', palette: ['#FAF8F3', '#1B1A24', '#E0533C', '#8D8A93', '#E9E6DF'], seed: 'min-cm' },
  { slug: 'commons-cowork', name: 'Commons', topic: 'Coworking space', patternSlug: 'rabbet', pattern: rabbet, paletteName: 'Ochre desk', palette: ['#F1F0EC', '#1B1B1D', '#D9A21B', '#8A8A85', '#DCDAD2'], seed: 'min-cw' },

  // Pictures that follow the palette: every picture on these pages is
  // components/Artwork, drawn in the page's own palette variables, so a
  // re-color moves the pictures with the page (docs/image-pipeline.md). The
  // last five use one as a full-bleed background.
  { slug: 'inkwell-tattoo', name: 'Inkwell Tattoo', topic: 'Tattoo studio', patternSlug: 'diamondconfetti', pattern: diamondconfetti, paletteName: 'Flash red', palette: ['#F4EFE6', '#141414', '#C8352B', '#8A857C', '#E4DCCD'], seed: 'art-01' },
  { slug: 'saltline-oyster', name: 'Saltline Oyster Bar', topic: 'Seafood restaurant', patternSlug: 'eclipserings', pattern: eclipserings, paletteName: 'Brine and tide', palette: ['#F2F0EA', '#0F2233', '#2F6F8F', '#8C9296', '#DCE3E6'], seed: 'art-02' },
  { slug: 'bolt-and-bench', name: 'Bolt & Bench', topic: 'Neighborhood hardware store', patternSlug: 'squarelabyrinth', pattern: squarelabyrinth, paletteName: 'Safety orange', palette: ['#F3F1EC', '#1A1A1A', '#E8651A', '#7D7A74', '#DAD6CD'], seed: 'art-03' },
  { slug: 'cellar-door-wines', name: 'Cellar Door', topic: 'Wine shop', patternSlug: 'kilngrid', pattern: kilngrid, paletteName: 'Claret cellar', palette: ['#F5F0E8', '#1F1418', '#7B1E3A', '#8E8479', '#E6DBCF'], seed: 'art-04' },
  { slug: 'platen-press', name: 'Platen Press', topic: 'Letterpress print studio', patternSlug: 'misprint', pattern: misprint, paletteName: 'Letterpress red', palette: ['#F7F4EE', '#161616', '#D1343A', '#8F8A80', '#E5E0D6'], seed: 'art-05' },
  { slug: 'trailhead-club', name: 'Trailhead Club', topic: 'Hiking club', patternSlug: 'contourlines', pattern: contourlines, paletteName: 'Topo', palette: ['#F1EFE7', '#1C2418', '#4F6B3A', '#8D8C80', '#DFDDD1'], seed: 'art-06' },
  { slug: 'keyway-locksmiths', name: 'Keyway Locksmiths', topic: 'Locksmith', patternSlug: 'keyway', pattern: keyway, paletteName: 'Brass', palette: ['#F4F2EC', '#15171B', '#C9962B', '#7F8187', '#DEDBD3'], seed: 'art-07' },
  { slug: 'corner-pharmacy', name: 'Corner Pharmacy', topic: 'Independent pharmacy', patternSlug: 'crosslattice', pattern: crosslattice, paletteName: 'Pharmacy green', palette: ['#F6F8F6', '#13201A', '#1E8A5A', '#86918B', '#DDE7E1'], seed: 'art-08' },
  { slug: 'scoop-and-cone', name: 'Scoop & Cone', topic: 'Ice cream parlor', patternSlug: 'confettidotfield', pattern: confettidotfield, paletteName: 'Sherbet', palette: ['#FFF6EE', '#2A1E24', '#F26D7D', '#6CC3D5', '#F7C948', '#B7A9AD'], seed: 'art-09' },
  { slug: 'bright-smiles-kids', name: 'Bright Smiles', topic: 'Pediatric dentist', patternSlug: 'scattershrink', pattern: scattershrink, paletteName: 'Bubblegum', palette: ['#F7FBFF', '#1D2B45', '#3B82F6', '#F472B6', '#FACC15', '#94A3B8'], seed: 'art-10' },
  { slug: 'wayfarer-travel', name: 'Wayfarer Travel', topic: 'Travel agency', patternSlug: 'radiantswirl', pattern: radiantswirl, paletteName: 'Passport', palette: ['#F5F1E6', '#1B2B3A', '#E0673B', '#2E8B8B', '#E9DFC9'], seed: 'art-11' },
  { slug: 'spoke-and-chain', name: 'Spoke & Chain', topic: 'Bike shop', patternSlug: 'confettitriangles', pattern: confettitriangles, paletteName: 'Chrome and teal', palette: ['#F2F4F3', '#111820', '#0FA3A3', '#F25C54', '#8C959A', '#DCE3E2'], seed: 'art-12' },
  { slug: 'sunday-market', name: 'Sunday Market', topic: 'Farmers market', patternSlug: 'cornerbloom', pattern: cornerbloom, paletteName: 'Market day', palette: ['#FBF7EE', '#26231C', '#E4572E', '#4E8F4A', '#F3B63F', '#A39C8C'], seed: 'art-13' },
  { slug: 'pawsh-grooming', name: 'Pawsh', topic: 'Dog grooming salon', patternSlug: 'quoit', pattern: quoit, paletteName: 'Soap bubble', palette: ['#FDF8F4', '#2A2433', '#7C5CE0', '#F5A3B5', '#A69EB0', '#EFE7F6'], seed: 'art-14' },
  { slug: 'rootbound-nursery', name: 'Rootbound', topic: 'Plant nursery', patternSlug: 'apse', pattern: apse, paletteName: 'Greenhouse', palette: ['#F3F5EF', '#1A261D', '#3E7D4F', '#D98E4A', '#919C92', '#DFE7DC'], seed: 'art-15' },
  { slug: 'el-farolito-truck', name: 'El Farolito', topic: 'Taco truck', patternSlug: 'circusposter', pattern: circusposter, paletteName: 'Papel picado', palette: ['#FFF7EA', '#20161A', '#E23E57', '#2BAE9A', '#F6C343', '#A48F86'], seed: 'art-16' },
  { slug: 'pinecone-camp', name: 'Pinecone Camp', topic: 'Summer day camp', patternSlug: 'driftspiral', pattern: driftspiral, paletteName: 'Lakeside', palette: ['#F4F1E8', '#1D2A24', '#2F7A5B', '#E07A3F', '#8E968F', '#E2E5DB'], seed: 'art-17' },
  { slug: 'slice-theory', name: 'Slice Theory', topic: 'Pizzeria', patternSlug: 'turbulentsunburst', pattern: turbulentsunburst, paletteName: 'Oven', palette: ['#FBF4EA', '#231A15', '#D7422E', '#3E8E41', '#F2B134', '#A58E7D'], seed: 'art-18' },
  { slug: 'polyglot-school', name: 'Polyglot', topic: 'Language school', patternSlug: 'diamondconfetti', pattern: diamondconfetti, paletteName: 'Chalkboard blue', palette: ['#F6F7FB', '#16213E', '#3D5AFE', '#FF7A59', '#8A90A6', '#E6E9F5'], seed: 'art-19' },
  { slug: 'bloom-events', name: 'Bloom Events', topic: 'Party and event planner', patternSlug: 'scatteredgems', pattern: scatteredgems, paletteName: 'Confetti', palette: ['#FFF9F5', '#2B1D2E', '#FF5D8F', '#28C2A0', '#FFC93C', '#B7A7B5'], seed: 'art-20' },
  { slug: 'suds-car-wash', name: 'Suds', topic: 'Car wash', patternSlug: 'recession', pattern: recession, paletteName: 'Suds blue', palette: ['#F3F8FC', '#0F1E33', '#1E88E5', '#FFCA28', '#8795A8', '#DCEAF7'], seed: 'art-21' },
  { slug: 'spin-cycle-laundry', name: 'Spin Cycle', topic: 'Laundromat and wash-and-fold', patternSlug: 'loophole', pattern: loophole, paletteName: 'Rinse', palette: ['#F5F7F7', '#16232B', '#13A6A3', '#F2994A', '#8B989C', '#E1EBEB'], seed: 'art-22' },
  { slug: 'tinker-toys', name: 'Tinker & Co.', topic: 'Toy store', patternSlug: 'bauhaus', pattern: bauhaus, paletteName: 'Toy box', palette: ['#FFF8EE', '#1F2240', '#EF476F', '#118AB2', '#FFD166', '#A6A2B3'], seed: 'art-23' },
  { slug: 'glaze-donuts', name: 'Glaze', topic: 'Donut shop', patternSlug: 'annulus', pattern: annulus, paletteName: 'Glaze', palette: ['#FFF6F1', '#2E1B1B', '#F06292', '#7E57C2', '#FFB74D', '#A1887F'], seed: 'art-24' },
  { slug: 'nori-sushi', name: 'Nori', topic: 'Sushi bar', patternSlug: 'tidering', pattern: tidering, paletteName: 'Nori', palette: ['#F4F1EA', '#121614', '#D1473A', '#2E6B5E', '#8B8C84', '#E0DDD4'], seed: 'art-25' },
  { slug: 'form-and-field', name: 'Form & Field', topic: 'Architecture firm', patternSlug: 'isometricweave', pattern: isometricweave, paletteName: 'Concrete', palette: ['#EEEDEA', '#151515', '#3D5A80', '#8D8C88', '#D8D6D0'], seed: 'art-26' },
  { slug: 'lumen-portraits', name: 'Lumen', topic: 'Portrait photographer', patternSlug: 'halftone', pattern: halftone, paletteName: 'Darkroom', palette: ['#F4F1EC', '#1B1A1A', '#B5563C', '#8C8680', '#E3DDD4'], seed: 'art-27' },
  { slug: 'thread-and-hem', name: 'Thread & Hem', topic: 'Fashion boutique', patternSlug: 'baste', pattern: baste, paletteName: 'Linen', palette: ['#F6F2EC', '#1C1917', '#8C6A4F', '#9A938A', '#E7DFD4'], seed: 'art-28' },
  { slug: 'blue-note-room', name: 'Blue Note Room', topic: 'Jazz club', patternSlug: 'gyre', pattern: gyre, paletteName: 'Midnight', palette: ['#0F1220', '#F1ECE2', '#E3B04B', '#5D6BD6', '#6E7185', '#1A1F33'], seed: 'art-29' },
  { slug: 'keel-wealth', name: 'Keel Wealth', topic: 'Independent financial advisor', patternSlug: 'contourlines', pattern: contourlines, paletteName: 'Harbor navy', palette: ['#F5F4F0', '#111B2B', '#2B5DA8', '#8A8F99', '#E1E3E8'], seed: 'art-30' },
  { slug: 'hewn-furniture', name: 'Hewn', topic: 'Furniture store', patternSlug: 'randomrings', pattern: randomrings, paletteName: 'Walnut', palette: ['#F3EFE8', '#201A16', '#9A5B36', '#8E857B', '#E4DBCF'], seed: 'art-31' },
  { slug: 'restore-clinic', name: 'Restore', topic: 'Chiropractic and massage clinic', patternSlug: 'teardropleaves', pattern: teardropleaves, paletteName: 'Eucalyptus', palette: ['#F3F6F3', '#1B2622', '#5E8C7A', '#C98C6B', '#8F9B96', '#E0E8E3'], seed: 'art-32' },
  { slug: 'hollis-hart', name: 'Hollis & Hart', topic: 'Real estate agency', patternSlug: 'lunette', pattern: lunette, paletteName: 'Ivory and ink', palette: ['#F7F4EE', '#151A1F', '#9B7B4A', '#8C8E90', '#E6E1D7'], seed: 'art-33' },
  { slug: 'grain-and-glow', name: 'Grain & Glow', topic: 'Skincare studio', patternSlug: 'bokeh', pattern: bokeh, paletteName: 'Clay rose', palette: ['#F8F2EF', '#2A1F1F', '#C07A6B', '#9C8F8A', '#EEDFDA'], seed: 'art-34' },
  { slug: 'vinyl-vault', name: 'Vinyl Vault', topic: 'Record store', patternSlug: 'ringfield', pattern: ringfield, paletteName: 'Sleeve', palette: ['#F2EFE9', '#121212', '#E94F37', '#393E41', '#8B8883', '#DCD7CF'], seed: 'art-35' },
  { slug: 'the-wren-hotel', name: 'The Wren', topic: 'Boutique hotel', patternSlug: 'ogee', pattern: ogee, paletteName: 'Wren linen', palette: ['#F4F0EA', '#1E1B18', '#7D5A44', '#A0968B', '#E6DED3'], seed: 'art-36' },
  { slug: 'wheelhouse-ceramics', name: 'Wheelhouse Ceramics', topic: 'Ceramics studio and shop', patternSlug: 'raku', pattern: raku, paletteName: 'Terracotta slip', palette: ['#F6F1EA', '#2B211C', '#C2643E', '#6E8C7B', '#A1968C', '#EADFD2'], seed: 'art-37' },
  { slug: 'stride-sneakers', name: 'Stride', topic: 'Sneaker store', patternSlug: 'sheared', pattern: sheared, paletteName: 'Court flame', palette: ['#F2F2EF', '#121212', '#FF4F1F', '#2D6CDF', '#8E8E8A', '#DEDED9'], seed: 'art-38' },
  { slug: 'offshore-surf', name: 'Offshore Surf Co.', topic: 'Surf shop and surf school', patternSlug: 'sunsetrings', pattern: sunsetrings, paletteName: 'Swell sunset', palette: ['#F1F5F4', '#0E2230', '#1BA3B8', '#F4A259', '#86979E', '#DDE9EA'], seed: 'art-39' },
  { slug: 'wick-and-wax', name: 'Wick & Wax', topic: 'Candle maker', patternSlug: 'teardropleaves', pattern: teardropleaves, paletteName: 'Candle smoke', palette: ['#F6F2EC', '#231F1C', '#B8864B', '#7C6F8E', '#A39A90', '#E8E0D4'], seed: 'art-40' },
  { slug: 'high-pass-lodge', name: 'High Pass Lodge', topic: 'Mountain lodge', patternSlug: 'terrain', pattern: terrain, paletteName: 'Alpine glow', palette: ['#EAF0F2', '#16222B', '#3E6E8E', '#D97B4A', '#8D99A1', '#CBD8DE', '#2F5B45'], seed: 'art-41' },
  { slug: 'lakeshore-cabins', name: 'Lakeshore Cabins', topic: 'Cabin rentals', patternSlug: 'sparkle', pattern: sparkle, paletteName: 'Dusk lake', palette: ['#1B2430', '#EFE9DD', '#E0A458', '#7FA3B5', '#6C7684', '#27313F'], seed: 'art-42' },
  { slug: 'old-town-walks', name: 'Old Town Walks', topic: 'City walking tours', patternSlug: 'garret', pattern: garret, paletteName: 'Old town', palette: ['#F3EDE2', '#232126', '#C4563A', '#3B6E8F', '#8F877D', '#E5DACA', '#E0B04F'], seed: 'art-43' },
  { slug: 'terrace-hill-winery', name: 'Terrace Hill', topic: 'Vineyard and winery', patternSlug: 'teardropleaves', pattern: teardropleaves, paletteName: 'Vineyard rows', palette: ['#F4EFE4', '#241A1F', '#7A2E44', '#6A7F3E', '#B99A5B', '#E3D8C4', '#9A8F84'], seed: 'art-44' },
  { slug: 'pinewood-rv', name: 'Pinewood RV Park', topic: 'Campground and RV park', patternSlug: 'stitch', pattern: stitch, paletteName: 'Pine evening', palette: ['#EEF0EA', '#17201A', '#3F6B4B', '#D9853B', '#8A938B', '#D7DED4'], seed: 'art-45' },

  // Twenty-five more on the same Artwork, the last four with a full-bleed
  // background.
  { slug: 'cleaver-and-co', name: 'Cleaver & Co.', topic: 'Butcher shop', patternSlug: 'reedpen', pattern: reedpen, paletteName: 'Butcher paper', palette: ['#F4EEE4', '#1C1714', '#A8322D', '#8C8378', '#E3D8C8'], seed: 'art-46' },
  { slug: 'hive-and-honey', name: 'Hive & Honey', topic: 'Honey farm and shop', patternSlug: 'isocube', pattern: isocube, paletteName: 'Comb gold', palette: ['#FBF5E6', '#2A2012', '#E0A21B', '#6E7F3A', '#9C9076', '#F1E4C2'], seed: 'art-47' },
  { slug: 'live-wire-electric', name: 'Live Wire Electric', topic: 'Electrician', patternSlug: 'circuit', pattern: circuit, paletteName: 'Hi-vis', palette: ['#F2F2EE', '#111418', '#FFC21A', '#2F5BEA', '#83868C', '#DCDDD8'], seed: 'art-48' },
  { slug: 'meeple-and-mug', name: 'Meeple & Mug', topic: 'Board game cafe', patternSlug: 'damier', pattern: damier, paletteName: 'Game night', palette: ['#F6F0E6', '#1F1B2E', '#E4572E', '#2A9D8F', '#8D8697', '#E8DFD0'], seed: 'art-49' },
  { slug: 'pressed-juice', name: 'Pressed', topic: 'Juice bar', patternSlug: 'lobe', pattern: lobe, paletteName: 'Citrus press', palette: ['#FFF8EC', '#1E2A1C', '#FF8A1F', '#7CB518', '#E63946', '#A09A8A', '#FCE9CF'], seed: 'art-50' },
  { slug: 'little-fins-swim', name: 'Little Fins', topic: 'Swim school for kids', patternSlug: 'lagoon', pattern: lagoon, paletteName: 'Pool deck', palette: ['#F2FAFC', '#0E2A3B', '#00A6D6', '#FF7B54', '#FFD23F', '#8FA3AD'], seed: 'art-51' },
  { slug: 'hachi-ramen', name: 'Hachi Ramen', topic: 'Ramen shop', patternSlug: 'curl', pattern: curl, paletteName: 'Broth and chili', palette: ['#F5EFE4', '#161311', '#C8102E', '#D9A441', '#8A8176', '#E6DCCB'], seed: 'art-52' },
  { slug: 'clear-view-optical', name: 'Clear View Optical', topic: 'Optician and eyewear', patternSlug: 'recession', pattern: recession, paletteName: 'Lens blue', palette: ['#F7F8FA', '#121821', '#2D5BFF', '#F2A541', '#8B93A1', '#E3E7EE'], seed: 'art-53' },
  { slug: 'parkside-family-medicine', name: 'Parkside Family Medicine', topic: 'Family doctor\'s practice', patternSlug: 'frond', pattern: frond, paletteName: 'Clinic sage', palette: ['#F5F8F6', '#15241E', '#2E7D6B', '#E86F4E', '#8C9A94', '#DDE8E3'], seed: 'art-54' },
  { slug: 'double-stack-burgers', name: 'Double Stack', topic: 'Burger joint', patternSlug: 'ziggy', pattern: ziggy, paletteName: 'Diner', palette: ['#FFF6E9', '#231815', '#E03A1E', '#F7B32B', '#2B6CB0', '#A59483'], seed: 'art-55' },
  { slug: 'green-light-driving', name: 'Green Light', topic: 'Driving school', patternSlug: 'switchback', pattern: switchback, paletteName: 'Signal', palette: ['#F3F5F2', '#141A16', '#1F9D55', '#F6C026', '#E5483A', '#858D87'], seed: 'art-56' },
  { slug: 'crux-climbing', name: 'Crux', topic: 'Climbing gym', patternSlug: 'pebble', pattern: pebble, paletteName: 'Chalk and holds', palette: ['#EDEBE7', '#16161A', '#FF5A36', '#3A7BD5', '#8A8A8F', '#D8D5CF'], seed: 'art-57' },
  { slug: 'the-rialto-cinema', name: 'The Rialto', topic: 'Independent cinema', patternSlug: 'lantern', pattern: lantern, paletteName: 'Velvet', palette: ['#120E10', '#F2E8DA', '#C9302C', '#D4A64A', '#756B6E', '#1F191C'], seed: 'art-58' },
  { slug: 'pointe-and-pulse', name: 'Pointe & Pulse', topic: 'Dance school', patternSlug: 'cendal', pattern: cendal, paletteName: 'Rehearsal rose', palette: ['#F7F1EE', '#1E1A22', '#D6456B', '#6B5BD1', '#978E97', '#EDE3E6'], seed: 'art-59' },
  { slug: 'the-gimlet', name: 'The Gimlet', topic: 'Cocktail bar', patternSlug: 'northstar', pattern: northstar, paletteName: 'Lime and brass', palette: ['#0F1A16', '#EDE8DC', '#A7C957', '#C9A35B', '#6E7A73', '#18261F'], seed: 'art-60' },
  { slug: 'cacao-and-co', name: 'Cacao & Co.', topic: 'Chocolate shop', patternSlug: 'gravure', pattern: gravure, paletteName: 'Cocoa', palette: ['#F6EFE8', '#2A1A14', '#8A3B24', '#D19A5A', '#968A82', '#EBDDD2'], seed: 'art-61' },
  { slug: 'veil-and-vow', name: 'Veil & Vow', topic: 'Bridal boutique', patternSlug: 'petalcut', pattern: petalcut, paletteName: 'Ivory lace', palette: ['#FBF8F4', '#26201F', '#B08A6E', '#C9A7B8', '#9D9491', '#EFE8E1'], seed: 'art-62' },
  { slug: 'polish-nail-bar', name: 'Polish', topic: 'Nail salon', patternSlug: 'petalcut', pattern: petalcut, paletteName: 'Lacquer', palette: ['#FFF5F5', '#2A1520', '#E0306D', '#7A5CFA', '#A38D96', '#F9E1E8'], seed: 'art-63' },
  { slug: 'brim-hat-shop', name: 'Brim', topic: 'Hat shop', patternSlug: 'dogtooth', pattern: dogtooth, paletteName: 'Felt', palette: ['#F2EEE7', '#1D1B1A', '#7C5A3A', '#3D6B7D', '#928B82', '#E2DBD0'], seed: 'art-64' },
  { slug: 'satchel-and-strap', name: 'Satchel & Strap', topic: 'Leather goods maker', patternSlug: 'plait', pattern: plait, paletteName: 'Saddle', palette: ['#F4EEE6', '#1E1612', '#A0522D', '#4A5D3F', '#8F857B', '#E6DACB'], seed: 'art-65' },
  { slug: 'tin-roof-guitars', name: 'Tin Roof Guitars', topic: 'Guitar shop', patternSlug: 'sunray', pattern: sunray, paletteName: 'Sunburst', palette: ['#F3EFE8', '#16120F', '#D2691E', '#2E5E4E', '#F2B84B', '#8E867D'], seed: 'art-66' },
  { slug: 'crabapple-orchard', name: 'Crabapple Orchard', topic: 'Pick-your-own orchard', patternSlug: 'frond', pattern: frond, paletteName: 'Orchard', palette: ['#F5F1E6', '#1F2419', '#C0392B', '#5B8C3A', '#E3B23C', '#9A9483', '#E6E0CF'], seed: 'art-67' },
  { slug: 'coral-cove-beach-club', name: 'Coral Cove', topic: 'Beach club', patternSlug: 'lagoon', pattern: lagoon, paletteName: 'Coral and lagoon', palette: ['#FFF4EA', '#16323D', '#FF6F59', '#20A4B8', '#F7C873', '#8FA1A6', '#F8E1D1'], seed: 'art-68' },
  { slug: 'harbor-light-tours', name: 'Harbor Light Tours', topic: 'Boat tours', patternSlug: 'sail', pattern: sail, paletteName: 'Harbor fog', palette: ['#E9EEF1', '#14222D', '#D8503C', '#3B6A87', '#8997A1', '#D3DDE3'], seed: 'art-69' },
  { slug: 'heron-point-golf', name: 'Heron Point', topic: 'Golf club', patternSlug: 'hurdle', pattern: hurdle, paletteName: 'Fairway', palette: ['#EFF2EA', '#172117', '#2F6B3A', '#C8A45A', '#8B9488', '#DCE3D5'], seed: 'art-70' },
];
